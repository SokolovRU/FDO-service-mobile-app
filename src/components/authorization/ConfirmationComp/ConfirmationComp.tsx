import React, { useState } from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../const/colors";
import { Fonts } from "../../../const/fonts";
import { TextField } from "../../general/TextField";
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import { Button } from "../../general/Button";
import { vs, s } from "../../../const/size";
import { func } from "prop-types";

type typeConfirmationComp = {
  confirmationInfo: {
    name: string;
    surname: string;
    patronymic: string;
    card: string;
    photo: string;
  };
  changeConfirmationInfo: any;
  changeTypeScreen: any;
  changeActiveReq: any;
  registerInfo: any;
};

export const ConfirmationComp = (props: typeConfirmationComp) => {
  const {
    confirmationInfo,
    changeConfirmationInfo,
    changeTypeScreen,
    changeActiveReq,
    registerInfo,
  } = props;
  const [nameValue, setNameValue] = useState(confirmationInfo.name);
  const [warningName, setWarningName] = useState(false);
  const regName = new RegExp("^[А-ЯЁ][а-яё]+$");

  const [surnameValue, setSurnameValue] = useState(confirmationInfo.surname);
  const [warningSurname, setWarningSurname] = useState(false);

  const [patronymicValue, setPatronymicValue] = useState(
    confirmationInfo.patronymic
  );
  const [warningPatronymic, setWarningPatronymic] = useState(false);

  const [cardValue, setCardValue] = useState(confirmationInfo.card);
  const [warningCard, setWarningCard] = useState(false);

  const regCard = new RegExp("^[0-9]{11}$");

  const [photoValue, setPhotoValue] = useState(confirmationInfo.photo);
  const [warningPhoto, setWarningPhoto] = useState(false);

  function checkInputs() {
    let check = false;
    if (!regName.test(nameValue)) {
      setWarningName(true);
      check = true;
    } else {
      setWarningName(false);
    }
    if (!regName.test(surnameValue)) {
      setWarningSurname(true);
      check = true;
    } else {
      setWarningSurname(false);
    }
    if (!regName.test(patronymicValue)) {
      setWarningPatronymic(true);
      check = true;
    } else {
      setWarningPatronymic(false);
    }
    if (!regCard.test(cardValue)) {
      setWarningCard(true);
      check = true;
    } else {
      setWarningCard(false);
    }
    return check;
  }

  const hashCode = function (s: string) {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  function actionClickButton() {
    if (checkInputs()) {
      changeActiveReq(false);
      return null;
    }
    authReq();
  }

  async function authReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "create_student",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            group: registerInfo.group,
            email: registerInfo.email,
            login: registerInfo.login,
            password: hashCode(registerInfo.password),
            firstname: nameValue,
            lastname: surnameValue,
            middlename: patronymicValue,
            record_number: cardValue,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json === -1) {
        // warning on login or email
      } else {
        changeTypeScreen("login");
      }
    } catch (error) {
      console.error(error);
    } finally {
      changeActiveReq(false);
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: s(24),
        paddingVertical: vs(24),
        backgroundColor: "#fff",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <Text
        style={{
          fontFamily: Fonts.Inter[900],
          fontSize: 16,
          color: "#000",
          marginBottom: vs(24),
        }}
      >
        Подтверждение
      </Text>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Имя"
          placeholder="Данила"
          text={nameValue}
          setText={setNameValue}
          warning={warningName}
          block={false}
          showPass={false}
        />
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Фамилия"
          placeholder="Ряпалов"
          text={surnameValue}
          setText={setSurnameValue}
          warning={warningSurname}
          block={false}
          showPass={false}
        />
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Отчество"
          placeholder="Александрович"
          text={patronymicValue}
          setText={setPatronymicValue}
          warning={warningPatronymic}
          block={false}
          showPass={false}
        />
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Номер зачетной книжки"
          placeholder="00000000000"
          text={cardValue}
          setText={setCardValue}
          warning={warningCard}
          block={false}
          showPass={false}
        />
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Фотография зачетки"
          placeholder="Загрузить"
          text={photoValue}
          setText={setPhotoValue}
          warning={warningPhoto}
          block={false}
          showPass={false}
        />
      </View>
      <Button
        type="Primary"
        title="Зарегистрироваться"
        action={() => {
          actionClickButton()
        }}
      />
    </View>
  );
};

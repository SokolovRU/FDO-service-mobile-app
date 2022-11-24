import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Colors } from "../../../const/colors";
import { Fonts } from "../../../const/fonts";
import { TextField } from "../../general/TextField";
import RNPickerSelect from "react-native-picker-select";
import Checkbox from "expo-checkbox";
import { Button } from "../../general/Button";
import { Select } from "@mobile-reality/react-native-select-pro";
import { vs, s } from "../../../const/size";
import { func } from "prop-types";
import { RecoveryComp1 } from "./RecCodeComp";

export const RecoveryComp = (props: any) => {
  const [emailValue, setEmailValue] = useState("");
  const [warningEmail, setWarningEmail] = useState(false);

  const [showScreen, setShowScreen] = useState(0);

  const [codeValue, setCodeValue] = useState("");
  const [warningCode, setWarningCode] = useState(false);

  const regEmail = new RegExp(
    "^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$"
  );
  const [passwordValue, setPasswordValue] = useState("");
  const [warningPassword, setWarningPassword] = useState(false);
  const regPassword = new RegExp(
    "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
  );

  function actionEmailClick() {
    if (!regEmail.test(emailValue)) {
      setWarningEmail(true);
      return null;
    } else {
      setWarningEmail(false);
    }
    authReq();
  }

  async function authReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "reset_student_password/",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailValue,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json === -1) {
        // warning on login or email
      } else {
        setShowScreen(1);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  function actionCodeClick() {
    codeReq();
  }

  async function codeReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "reset_student_password/code",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: codeValue,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json === -1) {
        // warning on login or email
      } else {
        setShowScreen(2);
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }

  function actionPassClick() {
    if (!regPassword.test(passwordValue)) {
      setWarningPassword(true);
      return null;
    } else {
      setWarningPassword(false);
    }
    passReq();
  }

  async function passReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" +
          "reset_student_password/new_password",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: hashCode(passwordValue),
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json === -1) {
        // warning on login or email
      } else {
        Alert.alert("Смена пароля", "Вы успешно сменили пароль", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
        props.changeTypeScreen("login");
      }
    } catch (error) {
      console.error(error);
    } finally {
    }
  }
  const hashCode = function (s: string) {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  function RetScreen() {
    if (showScreen === 0) {
      return (
        <View
          style={{
            paddingHorizontal: s(24),
            paddingVertical: vs(24),
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 0,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[900],
              fontSize: 16,
              color: "#000",
            }}
          >
            Восстановление
          </Text>
          <View style={{ marginBottom: vs(16) }}>
            <TextField
              title={null}
              placeholder="Email"
              text={emailValue}
              setText={setEmailValue}
              warning={warningEmail}
              block={false}
              showPass={false}
            />
          </View>
          <Button
            type="Primary"
            title="Восстановить"
            action={() => {
              actionEmailClick();
            }}
          />
        </View>
      );
    } else if (showScreen === 1) {
      return (
        <View
          style={{
            paddingHorizontal: s(24),
            paddingVertical: vs(24),
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[900],
              fontSize: 16,
              color: "#000",
            }}
          >
            Код
          </Text>
          <View style={{ marginBottom: vs(16) }}>
            <TextField
              title={null}
              placeholder="Код из email"
              text={codeValue}
              setText={setCodeValue}
              warning={warningCode}
              block={false}
              showPass={false}
            />
          </View>
          <Button
            type="Primary"
            title="Восстановить"
            action={() => {
              actionCodeClick();
            }}
          />
        </View>
      );
    } else if (showScreen === 2) {
      return (
        <View
          style={{
            paddingHorizontal: s(24),
            paddingVertical: vs(24),
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            zIndex: 2,
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[900],
              fontSize: 16,
              color: "#000",
            }}
          >
            Новый пароль
          </Text>
          <View style={{ marginBottom: vs(16) }}>
            <TextField
              title="Пароль"
              placeholder="Новый пароль"
              text={passwordValue}
              setText={setPasswordValue}
              warning={warningPassword}
              block={false}
              showPass={true}
            />
          </View>
          <Button
            type="Primary"
            title="Создать новый пароль"
            action={() => {
              actionPassClick();
            }}
          />
        </View>
      );
    } else return <></>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ backgroundColor: "#fff" }}
    >
      {RetScreen()}
    </KeyboardAvoidingView>
  );
};

import React, { useState, useEffect } from "react";
import { View, Text, LayoutAnimation } from "react-native";
import { Colors } from "../../../const/colors";
import { Fonts } from "../../../const/fonts";
import { TextField } from "../../general/TextField";
import Checkbox from "expo-checkbox";
import { Button } from "../../general/Button";
import { vs, s } from "../../../const/size";
import { useActions } from "../../../redux/actions";

type typeRegisterComp = {
  registerInfo: {
    login: string;
    password: string;
    repeatPassword: string;
    email: string;
    group: string;
  };
  changeRegisterInfo: any;
  changeTypeScreen: any;
  changeActiveReq: any;
};

export const RegisterComp = (props: typeRegisterComp) => {
  const { connectedApi } = useActions();
  const { changeNavState } = useActions();
  const { updateInfo } = useActions();

  useEffect(() => {
    getListGroupReq();
  }, []);

  const [listGroups, setListGroups] = useState([
    { label: "Football", value: "football" },
    { label: "Baseball", value: "baseball" },
    { label: "Hockey", value: "hockey" },
  ]);

  const getListGroupReq = async () => {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "get_groups",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: loginValue,
            password: hashCode(passwordValue),
          }),
        }
      );
      const json = await response.json();
      if (json === -1) {
        changeNavState("auth");
      } else {
        setListGroups(
          json.map((e: any) => {
            return {
              label: e,
              value: e,
            };
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      changeActiveReq(false);
    }
  };

  const {
    registerInfo,
    changeRegisterInfo,
    changeTypeScreen,
    changeActiveReq,
  } = props;

  const [loginValue, setLoginValue] = useState(registerInfo.login);
  const [warningLogin, setWarningLogin] = useState(false);
  const regLogin = new RegExp("^[A-z0-9_-]{3,16}$");

  const [passwordValue, setPasswordValue] = useState(registerInfo.password);
  const [warningPassword, setWarningPassword] = useState(false);
  const regPassword = new RegExp(
    "^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
  );

  const [repeatPassword, setRepeatPassword] = useState(
    registerInfo.repeatPassword
  );
  const [warningRepeatPassword, setWarningRepeatPassword] = useState(false);

  const [emailValue, setEmailValue] = useState(registerInfo.email);
  const [warningEmail, setWarningEmail] = useState(false);

  const regEmail = new RegExp(
    "^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$"
  );

  const [groupValue, setGroupValue] = useState(registerInfo.group);
  const [warningGroup, setWarningGroup] = useState(false);

  const [isCheckBox, setIsCheckBox] = useState(false);

  function checkInputs() {
    let check = false;
    if (!regLogin.test(loginValue)) {
      setWarningLogin(true);
      check = true;
    } else {
      setWarningLogin(false);
    }
    if (!regPassword.test(passwordValue)) {
      setWarningPassword(true);
      check = true;
    } else {
      setWarningPassword(false);
    }
    if (passwordValue !== repeatPassword || repeatPassword === "") {
      setWarningRepeatPassword(true);
      check = true;
    } else {
      setWarningRepeatPassword(false);
    }
    if (!regEmail.test(emailValue)) {
      setWarningEmail(true);
      check = true;
    } else {
      setWarningEmail(false);
    }
    if (groupValue === "" || groupValue === null) {
      setWarningGroup(true);
      check = true;
    } else {
      setWarningGroup(false);
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
    if (isCheckBox === true) {
      changeRegisterInfo(
        loginValue,
        passwordValue,
        repeatPassword,
        emailValue,
        groupValue
      );
      changeTypeScreen("confirmation");
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    } else {
      console.log(groupValue);
      authReq();
    }
  }

  async function authReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "create_nf_student",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            group: groupValue,
            email: emailValue,
            login: loginValue,
            password: hashCode(passwordValue),
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
        Регистрация
      </Text>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Логин"
          placeholder="user_login"
          text={loginValue}
          setText={setLoginValue}
          warning={warningLogin}
          block={false}
          showPass={false}
        />
        {warningLogin === true ? (
          <View
            style={{
              marginTop: vs(12),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 10,
              }}
            >
              Ошибка логина
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Пароль"
          placeholder="password"
          text={passwordValue}
          setText={setPasswordValue}
          warning={warningPassword}
          block={false}
          showPass={true}
        />
        {warningPassword === true ? (
          <View
            style={{
              marginTop: vs(12),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 10,
              }}
            >
              Ошибка пароля
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Повторите пароль"
          placeholder="password"
          text={repeatPassword}
          setText={setRepeatPassword}
          warning={warningRepeatPassword}
          block={false}
          showPass={true}
        />
        {warningRepeatPassword === true ? (
          <View
            style={{
              marginTop: vs(12),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 10,
              }}
            >
              Пароли не совпадают
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Почта"
          placeholder="pochta@gmail.com"
          text={emailValue}
          setText={setEmailValue}
          warning={warningEmail}
          block={false}
          showPass={false}
        />
        {warningEmail === true ? (
          <View
            style={{
              marginTop: vs(12),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 10,
              }}
            >
              Ошибка логина
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={{ marginBottom: vs(16) }}>
        <TextField
          title="Группа"
          placeholder="Укажите группу"
          text={groupValue}
          setText={setGroupValue}
          warning={warningGroup}
          list={listGroups}
          block={false}
          showPass={false}
          type="select"
        />
        {warningGroup === true ? (
          <View
            style={{
              marginTop: vs(12),
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 10,
              }}
            >
              Ошибка логина
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: vs(16),
        }}
      >
        <Checkbox
          value={isCheckBox}
          onValueChange={setIsCheckBox}
          color={
            isCheckBox ? Colors.Highlight.darkest : Colors.Neutral.light.darkest
          }
          style={{ borderRadius: 6 }}
        />
        <Text
          style={{
            fontFamily: Fonts.Inter[400],
            fontSize: 12,
            color: Colors.Neutral.dark.light,
            marginLeft: s(8),
          }}
        >
          Подтвердить аккаунт сразу
        </Text>
      </View>
      <Button
        type="Primary"
        title="Зарегистрироваться"
        action={() => {
          actionClickButton();
        }}
      />
    </View>
  );
};

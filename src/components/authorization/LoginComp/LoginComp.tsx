import React, { useState } from "react";
import {
  View,
  Text,
  LayoutAnimation,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Fonts } from "../../../const/fonts";
import { Colors } from "../../../const/colors";
import { TextField } from "../../general/TextField";
import { Button } from "../../general/Button";
import { authAPI } from "../../../api/api";
import { infoUserActions } from "../../../redux/infoUser";
import { profileActions } from "../../../redux/profile";
import { useActions } from "../../../redux/actions";
import { vs, s } from "../../../const/size";

type typeLoginComp = {
  loginInfo: {
    login: string;
    password: string;
  };
  changeLoginInfo: any;
  changeTypeScreen: any;
  changeActiveReq: any;
};

export const LoginComp = (props: typeLoginComp) => {
  const baseURL = "http://195.133.147.31:8000/api/";

  const { connectedApi } = useActions();
  const { changeNavState } = useActions();
  const { updateInfo } = useActions()

  const { loginInfo, changeLoginInfo, changeTypeScreen, changeActiveReq } =
    props;

  const [loginValue, setLoginValue] = useState(loginInfo.login);
  const [warningLogin, setWarningLogin] = useState(false);

  const [passwordValue, setPasswordValue] = useState(loginInfo.password);
  const [warningPassword, setWarningPassword] = useState(false);
  
  const [warningText, setWarningText] = useState(false);

  function checkInputEmptiness() {
    if (loginValue === "") {
      setWarningLogin(true);
    } else {
      setWarningLogin(false);
    }
    if (passwordValue === "") {
      setWarningPassword(true);
    } else {
      setWarningPassword(false);
    }
  }

  function allWarning() {
    setWarningLogin(true);
    setWarningPassword(true);
  }

  const hashCode = function (s: string) {
    return s.split("").reduce(function (a, b) {
      a = (a << 5) - a + b.charCodeAt(0);
      return a & a;
    }, 0);
  };

  function actionClickButton() {
    //ßchangeActiveReq(true);
    if (loginValue === "" || passwordValue === "") {
      changeActiveReq(false);
      checkInputEmptiness();
      return null;
    }
    authReq();
  }

  async function authReq() {
    try {
      const response = await fetch(baseURL + "student_auth", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: loginValue,
          password: hashCode(passwordValue),
        }),
      });
      const json = await response.json();
      if (json === -1) {
        allWarning();
      } else {
        connectedApi({ login: loginValue, password: hashCode(passwordValue) });
        updateInfo(json)
        changeNavState('main')
      }
    } catch (error) {
      console.error(error);
    } finally {
      changeActiveReq(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
      style={{ backgroundColor: "#fff" }}
    >
      <View
        style={{
          paddingHorizontal: s(24),
          paddingVertical: vs(40),
          backgroundColor: "#fff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Inter[900],
            fontSize: 24,
            color: "#000",
          }}
        >
          Авторизация
        </Text>
        <TextField
          title={null}
          placeholder="Логин"
          text={loginValue}
          setText={setLoginValue}
          warning={warningLogin}
          block={false}
          showPass={false}
        />
        <TextField
          title={null}
          placeholder="Пароль"
          text={passwordValue}
          setText={setPasswordValue}
          warning={warningPassword}
          block={false}
          showPass={true}
        />
        <View
          style={{
            marginTop: vs(12),
          }}
        ></View>
        {warningLogin === true || warningPassword === true ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                fontFamily: Fonts.Inter[500],
                color: Colors.Support.error.dark,
                fontSize: 14,
              }}
            >
              Ошибка логина или пароля
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={{ marginTop: vs(16), marginBottom: vs(24) }}>
          <Button
            type="Terciary"
            title="Забыли пароль?"
            action={() => {
              changeTypeScreen("recovery");
              LayoutAnimation.configureNext({
                duration: 300,
                create: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
                update: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                },
              });
            }}
          />
        </View>
        <Button
          type="Primary"
          title="Войти"
          action={() => {
            actionClickButton();
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: vs(16),
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 12,
            }}
          >
            Нет аккаунта?{" "}
          </Text>
          <Button
            type="Terciary"
            title="Зарегистрироваться"
            action={() => {
              changeTypeScreen("register");
              LayoutAnimation.configureNext({
                duration: 300,
                create: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                  property: LayoutAnimation.Properties.opacity,
                },
                update: {
                  type: LayoutAnimation.Types.easeInEaseOut,
                },
              });
            }}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

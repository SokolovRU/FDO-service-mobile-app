import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { Colors } from "../../const/colors";
import { useAppSelector } from "../../redux/actions";
import { useActions } from "../../redux/actions";

export const LoadingComp = (props: any) => {
  const application = useAppSelector((state) => state);
  const { connectedApi } = useActions();
  const { changeNavState } = useActions();
  const { updateInfo } = useActions()
  async function authReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "student_auth",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            login: application.persistedReducer.profile.login,
            password: application.persistedReducer.profile.password,
          }),
        }
      );
      const json = await response.json();
      if (json === -1) {
        changeNavState('auth')
        console.log('\nАВТОМАТИЧЕСКАЯ АВТОРИЗАЦИЯ НЕ ПРОШЛА')
        console.log('[log]: - данные сохраненные в стейте устарели\n')
      } else {
        console.log(json)
        connectedApi({
          login: application.persistedReducer.profile.login,
          password: application.persistedReducer.profile.password,
        });
        updateInfo(json)
        changeNavState('main')
        console.log('\nАВТОМАТИЧЕСКАЯ АВТОРИЗАЦИЯ ПРОШЛА УСЕШНО\n')

      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (props.auth === true) {
      if (
        application.persistedReducer.profile.login !== "" &&
        application.persistedReducer.profile.password !== ""
      ) {
        authReq();
      } else {
        changeNavState('auth')
        console.log('\nАВТОМАТИЧЕСКАЯ АВТОРИЗАЦИЯ НЕ ПРОШЛА')
        console.log('[log]: - данных в стейте нет\n')
      }
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.Highlight.lightest,
      }}
    >
      <ActivityIndicator size={"large"} />
    </View>
  );
};

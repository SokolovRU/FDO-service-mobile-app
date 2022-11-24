import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../const/colors";
import { Fonts } from "../../const/fonts";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button } from "../general/Button";
import { useAppSelector } from "../../redux/actions";
import { TextField } from "../general/TextField";
import { SvgXml } from "react-native-svg";
import { s, vs } from "../../const/size";
import { ProfileHelpComp } from "./ProfileHelpComp";
import { useActions } from "../../redux/actions";

const ExitLog = () => (
  <SvgXml xml={_exit} height={vs(24).toString()} width={vs(24).toString()} />
);

export const ProfileComp = () => {
  const { disconnectedApi, connectedApi } = useActions();
  const { changeNavState } = useActions();
  const application = useAppSelector((state) => state);
  const {
    student_email,
    student_eos_login,
    student_eos_password,
    student_confirmed,
    student_firstname,
    student_group,
    student_lastname,
    student_login,
    student_middlename,
    student_record_number,
  } = application.infoUserReducer;
  const [modalVisible, setModalVisible] = useState(false);

  const [showConf, setShowConf] = useState(false);
  function changeShowConf(as: boolean) {
    setShowConf(as);
  }

  const regName = new RegExp("^[А-ЯЁ][а-яё]+$");
  const regCard = new RegExp("^[0-9]{11}$");

  const [nameValue, setNameValue] = useState("");
  const [warningName, setWarningName] = useState(false);

  const [surnameValue, setSurnameValue] = useState("");
  const [warningSurname, setWarningSurname] = useState(false);

  const [patronymicValue, setPatronymicValue] = useState("");
  const [warningPatronymic, setWarningPatronymic] = useState(false);

  const [cardValue, setCardValue] = useState("");
  const [warningCard, setWarningCard] = useState(false);

  const [photoValue, setPhotoValue] = useState("");
  const [warningPhoto, setWarningPhoto] = useState(false);

  const [textSupport, setTextSupport] = useState("");

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

  function actionClickButton() {
    if (checkInputs()) {
      return null;
    }
    authReq();
  }

  async function authReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "create_confirmation_request",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: application.infoUserReducer.student_id,
            firstname: surnameValue,
            lastname: nameValue,
            middlename: patronymicValue,
            record_number: cardValue,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
      if (json === -1) {
        Alert.alert(
          "Ваша заявка уже была сформирована",
          "Ранее вы сформировали заявку.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      } else {
        Alert.alert(
          "Заявка была отправлена",
          "Вы сформировали заявку на подтверждение аккаунта.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setShowConf(false);
    }
  }
  function actionSupport() {
    createSupportOrder();
  }

  async function createSupportOrder() {
    console.log("qweqweqwe");
    console.log(textSupport);
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/create_error_request",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: application.infoUserReducer.student_id,
            theme: "Support",
            message: textSupport,
          }),
        }
      );
      const json = await response.json();
      if (json === -1) {
      } else {
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const InputProfile = (props: any) => {
    const { text } = props;
    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "rgba(0, 0, 0, 0.5)",
          paddingHorizontal: s(16),
          paddingVertical: vs(12),
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Inter[400],
            fontSize: 14,
            color: "#2F3036",
          }}
        >
          {text}
        </Text>
      </View>
    );
  };

  return showConf ? (
    <ProfileHelpComp setShowConf={changeShowConf} />
  ) : (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: s(20),
            marginTop: vs(16),
          }}
        >
          <View style={{ opacity: 0 }}>
            <ExitLog />
          </View>
          <Text
            style={{
              fontFamily: Fonts.Inter[800],
              fontSize: 14,
              color: "#121212",
            }}
          >
            Профиль
          </Text>
          <TouchableOpacity
            onPress={() => {
              connectedApi({ login: "", password: "" });
              changeNavState("auth");
            }}
          >
            <View>
              <ExitLog />
            </View>
          </TouchableOpacity>
        </View>
        {student_confirmed === true ? (
          <>
            <View
              style={{
                flex: 1,
                marginTop: vs(40),
                paddingHorizontal: s(16),
              }}
            >
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile
                  text={
                    "" +
                    student_firstname +
                    " " +
                    student_middlename +
                    " " +
                    student_lastname
                  }
                />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_login} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_email} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_group} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_record_number} />
              </View>
              <Text
                style={{
                  fontFamily: Fonts.Inter[700],
                  fontSize: 12,
                  marginVertical: vs(16),
                }}
              >
                Данные EOS
              </Text>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_eos_login} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_eos_password} />
              </View>
            </View>
            <View style={{ paddingHorizontal: s(16) }}>
              <Button
                type="Secondary"
                title="Тех поддержка"
                action={() => setModalVisible(true)}
              />
            </View>
          </>
        ) : (
          <>
            <View
              style={{
                flex: 1,
                marginTop: vs(40),
                paddingHorizontal: s(16),
              }}
            >
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_login} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_email} />
              </View>
              <View
                style={{
                  marginBottom: vs(12),
                }}
              >
                <InputProfile text={student_group} />
              </View>
            </View>
            <View
              style={{
                paddingHorizontal: s(16),
              }}
            >
              <View
                style={{
                  marginBottom: vs(16),
                }}
              >
                <Button
                  type="Primary"
                  title="Подтвердить аккаунт"
                  action={() => setShowConf(true)}
                />
              </View>
              <View>
                <Button
                  type="Secondary"
                  title="Тех поддержка"
                  action={() => setModalVisible(true)}
                />
              </View>
            </View>
          </>
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text
                style={{
                  fontFamily: Fonts.Inter[700],
                  fontSize: 18,
                  marginBottom: vs(20),
                }}
              >
                Оставить заявку
              </Text>
              <TextInput
                value={textSupport}
                onChangeText={setTextSupport}
                style={{
                  minHeight: vs(80),
                  maxHeight: vs(400),
                  borderWidth: 1,
                  width: s(250),
                  borderRadius: 12,
                  paddingVertical: vs(10),
                  paddingHorizontal: s(7),
                  fontSize: 14,
                  fontFamily: Fonts.Inter[400],
                }}
                multiline={true}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: vs(12),
                }}
              >
                <View
                  style={{
                    flex: 1,
                    marginRight: s(2),
                  }}
                >
                  <Button
                    type="Secondary"
                    title="Отмена"
                    action={() => setModalVisible(false)}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    marginLeft: s(2),
                  }}
                >
                  <Button
                    type="Primary"
                    title="Отправить"
                    action={() => actionSupport()}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

const _exit = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5134 6.15797V5.38048C12.5134 3.68468 11.1384 2.3097 9.44256 2.3097H5.38006C3.68506 2.3097 2.31006 3.68468 2.31006 5.38048V14.6553C2.31006 16.3511 3.68506 17.7261 5.38006 17.7261H9.45089C11.1417 17.7261 12.5134 16.3553 12.5134 14.6645V13.8787" stroke="#006FFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M18.1745 10.0178H8.14038" stroke="#006FFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.7344 7.58862L18.1744 10.0177L15.7344 12.4477" stroke="#006FFD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;

import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../const/colors";
import { Fonts } from "../../const/fonts";
import {
  View,
  Text,
  FlatList,
  LayoutAnimation,
  TouchableOpacity,
} from "react-native";
import { Button } from "../general/Button";
import { useAppSelector } from "../../redux/actions";
import { s, vs } from "../../const/size";

export const DebtsComp = () => {
  const [educationalList, setEducationalList] = useState([]);
  const [paymentList, setPaymentList] = useState([]);
  const application = useAppSelector((state) => state);

  const [showInfo, setShowInfo] = useState("Education");
  function changeShowInfo() {
    if (showInfo === "Education") {
      setShowInfo("Money");
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
    } else {
      setShowInfo("Education");
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
    }
  }

  useEffect(() => {
    getListEducationaReq();
    getListPaymentReq();
  }, []);

  async function getListEducationaReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/get_academic_debts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: application.infoUserReducer.student_id,
          }),
        }
      );
      const json = await response.json();
      if (json === -1) {
      } else {
        setEducationalList(json);
      }
    } catch (error) {
      console.error(error);
    }
  }
  async function getListPaymentReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/get_money_debts",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: application.infoUserReducer.student_id,
          }),
        }
      );
      const json = await response.json();
      if (json === -1) {
      } else {
        setPaymentList(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const InputProfile = (props: any) => {
    const item = props.item;
    if (showInfo === "Education") {
      return (
        <View
          style={{
            borderRadius: 12,
            backgroundColor: "#F8F9FE",
            paddingVertical: vs(12),
            paddingHorizontal: s(12),
            marginVertical: vs(16),
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[800],
              fontSize: 14,
              color: "#ED3241",
              marginBottom: vs(4)
            }}
          >
            {item.academic_subject}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 14,
              color: "#71727A",
            }}
          >
            {item.academic_commentary}
          </Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            borderRadius: 12,
            backgroundColor: "#F8F9FE",
            paddingVertical: vs(12),
            paddingHorizontal: s(12),
            marginVertical: vs(16),
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[800],
              fontSize: 14,
              color: "#ED3241",
              marginBottom: vs(4)
            }}
          >
            {item.money_sum + ' руб'}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 14,
              color: "#71727A",
            }}
          >
            {item.money_commentary}
          </Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Inter[800],
            fontSize: 14,
            color: "#121212",
          }}
        >
          Задолженности
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#EAF2FF",
          borderRadius: 38,
          marginHorizontal: s(16),
          marginTop: vs(30),
        }}
      >
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: showInfo === "Education" ? "#006FFD" : "#EAF2FF",
            paddingVertical: vs(12),
            borderRadius: 38,
          }}
        >
          <TouchableOpacity onPress={() => changeShowInfo()}>
            <Text
              style={{
                fontFamily: Fonts.Inter[600],
                fontSize: 12,
                color: showInfo === "Education" ? "#fff" : "#000",
              }}
            >
              По учебе
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            flex: 1,
            backgroundColor: showInfo !== "Education" ? "#006FFD" : "#EAF2FF",
            paddingVertical: vs(12),
            borderRadius: 38,
          }}
        >
          <TouchableOpacity onPress={() => changeShowInfo()}>
            <Text
              style={{
                fontFamily: Fonts.Inter[600],
                fontSize: 12,
                color: showInfo !== "Education" ? "#fff" : "#000",
              }}
            >
              По оплате
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {showInfo === "Education" ? (
        <FlatList
          data={educationalList}
          renderItem={InputProfile}
          keyExtractor={(item: any) => item.academic_id}
          style={{
            flex: 1,
            marginTop: vs(20),
            paddingHorizontal: s(16),
          }}
        />
      ) : (
        <FlatList
          data={paymentList}
          renderItem={InputProfile}
          keyExtractor={(item: any) => item.money_id}
          style={{
            flex: 1,
            marginTop: vs(20),
            paddingHorizontal: s(16),
          }}
        />
      )}
    </SafeAreaView>
  );
};

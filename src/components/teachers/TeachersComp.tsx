import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../const/colors";
import { Fonts } from "../../const/fonts";
import { View, Text, FlatList } from "react-native";
import { Button } from "../general/Button";
import { useAppSelector } from "../../redux/actions";
import { s, vs } from "../../const/size";

export const TeachersComp = () => {
  const [teacherList, setTeacherList] = useState([]);

  useEffect(() => {
    getListTeachersReq();
  }, []);

  async function getListTeachersReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" + "get_teachers",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        }
      );
      const json = await response.json();
      if (json === -1) {
      } else {
        setTeacherList(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const InputProfile = (props: any) => {
    const item = props.item
    return (
      <View
        style={{
          borderRadius: 12,
          backgroundColor: "#F8F9FE",
          paddingVertical: vs(12),
          paddingHorizontal: s(12),
          marginVertical: vs(16)
        }}
      >
        <Text
          style={{
            fontFamily: Fonts.Inter[800],
            fontSize: 14,
            color: "#2F3036",
            marginBottom: vs(4)
          }}
        >
          {item.teacher_name}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Inter[400],
            fontSize: 14,
            color: "#71727A",
          }}
        >
          {item.teacher_phone}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Inter[400],
            fontSize: 14,
            color: "#71727A",
          }}
        >
          {item.teacher_email}
        </Text>
      </View>
    );
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
          Преподаваатели
        </Text>
      </View>
      <FlatList
        data={teacherList}
        renderItem={InputProfile}
        keyExtractor={(item: any) => item.teacher_id}
        style={{
          flex: 1,
          marginTop: vs(20),
          paddingHorizontal: s(16),
        }}
      />
    </SafeAreaView>
  );
};

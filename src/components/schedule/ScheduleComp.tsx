import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../const/colors";
import { Fonts } from "../../const/fonts";
import { View, Text, FlatList } from "react-native";
import { Button } from "../general/Button";
import { useAppSelector } from "../../redux/actions";
import { s, vs } from "../../const/size";

export const ScheduleComp = () => {
  const [scheduleList, setScheduleList] = useState([]);
  const application = useAppSelector((state) => state);

  useEffect(() => {
    getListScheduleReq();
  }, []);

  async function getListScheduleReq() {
    try {
      const response = await fetch(
        "http://195.133.147.31:8000/api/" +
          "get_groups/shedule/" +
          application.infoUserReducer.student_group,
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
        setScheduleList(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const InputProfile = (props: any) => {
    const item = props.item;
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 10,
              color: "#8F9098",
              marginBottom: vs(4),
            }}
          >
            {item.date + ', ' + item.day_of_week}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 10,
              color: "#8F9098",
              marginBottom: vs(4),
            }}
          >
            {item.department}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 12,
              color: "#2F3036",
              marginBottom: vs(4),
              maxWidth: s(265)
            }}
          >
            {item.subject}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Inter[600],
              fontSize: 14,
              color: "#1F2024",
              marginBottom: vs(4),
            }}
          >
            {item.time.substr(0, 5)}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 10,
              color: "#71727A",
              marginBottom: vs(4),
            }}
          >
            {item.class_type + ', '}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Inter[400],
              fontSize: 10,
              color: "#71727A",
              marginBottom: vs(4),
            }}
          >
            {item.teacher}
          </Text>
        </View>
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
        data={scheduleList}
        renderItem={InputProfile}
        keyExtractor={(item: any) => item.ID}
        style={{
          flex: 1,
          marginTop: vs(20),
          paddingHorizontal: s(16),
        }}
      />
    </SafeAreaView>
  );
};

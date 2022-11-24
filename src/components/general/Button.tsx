import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Colors } from "../../const/colors";
import { Fonts } from "../../const/fonts";
import { vs, s } from "../../const/size";

type typeButton = {
  type: "Primary" | "Secondary" | "Terciary";
  title: string;
  action: any;
};

export const Button = (props: typeButton) => {
  const { type, title, action } = props;

  if (type === "Terciary") {
    return (
      <TouchableOpacity onPress={() => action()}>
        <Text
          style={{
            color: Colors.Highlight.darkest,
            fontFamily: Fonts.Inter[600],
            fontSize: 12,
            lineHeight: 15,
          }}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <TouchableOpacity onPress={() => action()}>
        <View
          style={{
            backgroundColor:
              type === "Secondary" ? "#fff" : Colors.Highlight.darkest,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: s(12),
            paddingVertical: vs(16),
            borderRadius: 12,
            borderWidth: type === "Secondary" ? 1.5 : 0,
            borderColor: Colors.Highlight.darkest,
          }}
        >
          <Text
            style={{
              color: type !== "Secondary" ? "#fff" : Colors.Highlight.darkest,
              fontFamily: Fonts.Inter[600],
              fontSize: vs(12),
              lineHeight: 15,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
};

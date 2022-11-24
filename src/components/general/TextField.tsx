import React, { useState, useRef } from "react";
import { Fonts } from "../../const/fonts";
import { Colors } from "../../const/colors";
import { vs, s } from "../../const/size";
import RNPickerSelect from "react-native-picker-select";
import {Picker} from '@react-native-picker/picker';
import { SvgXml } from "react-native-svg";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";

type typeTextField = {
  title: string | null;
  placeholder: string;
  text: string;
  setText: any;
  warning: boolean;
  block: boolean;
  showPass: boolean;
  setShowPass?: any;
  type?: "text" | "select";
  list?: any;
};

const CloseGlassSvg = () => (
  <SvgXml
    xml={_glassClose}
    width={vs(18).toString()}
    height={vs(18).toString()}
  />
);

const OpenGlassSvg = () => (
  <SvgXml
    xml={_glassOpen}
    width={vs(18).toString()}
    height={vs(18).toString()}
    style={{
      transform: [{ rotate: "180deg" }],
    }}
  />
);

export const TextField = (props: typeTextField) => {
  const {
    title,
    placeholder,
    text,
    setText,
    warning,
    block,
    showPass,
    setShowPass,
    list,
  } = props;

  const [isFocused, setIdFocused] = useState(false);

  const [localShow, setLocalShow] = useState(true);

  let _localShow = useRef(localShow);

  function RetShowGlass() {
    if (localShow === false) {
      return (
        <TouchableOpacity
          onPress={() => {
            _localShow.current = true;
            setLocalShow(true);
          }}
        >
          <CloseGlassSvg />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            _localShow.current = false;
            setLocalShow(false);
          }}
        >
          <OpenGlassSvg />
        </TouchableOpacity>
      );
    }
  }

  function retBorderColo() {
    if (isFocused === true) {
      return Colors.Highlight.darkest;
    } else {
      if (!warning) {
        return Colors.Neutral.light.darkest;
      } else {
        return Colors.Support.error.dark;
      }
    }
  }

  return (
    <View>
      <Text
        style={{
          fontFamily: Fonts.Inter[700],
          fontSize: 12,
          lineHeight: 15,
          marginBottom: vs(8),
        }}
      >
        {title}
      </Text>
      {props.type !== "select" ? (
        <View
          style={{
            borderColor: retBorderColo(),
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: s(16),
            paddingVertical: vs(14),
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            onFocus={() => setIdFocused(true)}
            onBlur={() => setIdFocused(false)}
            cursorColor={Colors.Highlight.darkest}
            placeholder={placeholder}
            value={text}
            onChangeText={setText}
            style={{
              color: Colors.Neutral.dark.darkest,
              fontFamily: Fonts.Inter[400],
              fontSize: vs(14),
              lineHeight: 20,
              flex: 1,
              // height: vs(56),
            }}
            secureTextEntry={showPass ? localShow : false}
          />
          {showPass ? <RetShowGlass /> : <></>}
        </View>
      ) : (
        <View
          style={{
            borderColor: retBorderColo(),
            borderWidth: 1,
            borderRadius: 12,
            paddingHorizontal: Platform.OS !== "ios" ? 0 : s(16),
            paddingVertical: Platform.OS !== "ios" ? 0 : s(14),
          }}
        >
          <RNPickerSelect
            style={customPickerStyles}
            onValueChange={(value) => setText(value)}
            items={list}
            value={text}
            placeholder={{
              label: "Укажите группу",
              value: null,
              placeholderTextColor: "rgba(255, 255, 255, 0.5)",
            }}
          />
        </View>
      )}
    </View>
  );
};

const customPickerStyles = StyleSheet.create({
  inputIOS: {
    color: Colors.Neutral.dark.darkest,
    fontFamily: Fonts.Inter[400],
    fontSize: vs(14),
    lineHeight: 20,
  },
  inputAndroid: {
    color: Colors.Neutral.dark.darkest,
    fontFamily: Fonts.Inter[400],
    fontSize: vs(14),
    lineHeight: 20,
  },
});

const _glassOpen = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.99998 3.7334C5.2635 3.7334 2.88014 5.45212 1.59998 8.00012C2.88014 10.5486 5.2635 12.2668 7.99998 12.2668C10.7365 12.2668 13.1198 10.5486 14.4 8.00012C13.1198 5.45212 10.7365 3.7334 7.99998 3.7334ZM7.99998 10.6668C6.52702 10.6668 5.33326 9.47308 5.33326 8.00012C5.33326 6.52716 6.52702 5.3334 7.99998 5.3334C9.47294 5.3334 10.6667 6.52716 10.6667 8.00012C10.6667 9.47308 9.47294 10.6668 7.99998 10.6668Z" fill="#86878C"/>
<path d="M8.00002 9.5999C8.88368 9.5999 9.60002 8.88356 9.60002 7.9999C9.60002 7.11625 8.88368 6.3999 8.00002 6.3999C7.11637 6.3999 6.40002 7.11625 6.40002 7.9999C6.40002 8.88356 7.11637 9.5999 8.00002 9.5999Z" fill="#86878C"/>
</svg>
`;
const _glassClose = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.0458 3.19995L10.8495 4.39643C9.97281 3.97147 9.01137 3.73323 7.99985 3.73323C5.26337 3.73323 2.88001 5.45195 1.59985 7.99995C2.22913 9.25259 3.12753 10.2995 4.20097 11.0452L3.20001 12.0457L3.95425 12.8L5.14849 11.6057L6.53137 10.2233C6.53137 10.2233 6.53137 10.2233 6.53089 10.2233L12.8 3.95419L12.0458 3.19995ZM8.00001 6.39995C7.11617 6.39995 6.40001 7.11611 6.40001 7.99995C6.40001 8.24635 6.46049 8.47755 6.55985 8.68587L5.77921 9.46667C5.50001 9.04571 5.33329 8.54363 5.33329 7.99995C5.33329 6.52699 6.52705 5.33323 8.00001 5.33323C8.54369 5.33323 9.04577 5.49947 9.46673 5.77915L8.68593 6.55979C8.47697 6.46043 8.24689 6.39995 8.00001 6.39995V6.39995Z" fill="#86878C"/>
<path d="M12.6349 5.62769L10.6297 7.63281C10.6464 7.75425 10.6667 7.87457 10.6667 8.00001C10.6667 9.47297 9.47293 10.6667 7.99997 10.6667C7.87389 10.6667 7.75421 10.6464 7.63277 10.6298L6.24365 12.0194C6.80669 12.1782 7.39373 12.2669 7.99997 12.2669C10.7365 12.2669 13.1198 10.5486 14.4 8.00017C13.9422 7.08865 13.3411 6.28593 12.6349 5.62769Z" fill="#86878C"/>
</svg>
`;

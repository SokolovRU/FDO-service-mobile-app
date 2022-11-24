import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthNavigation } from "./AuthNavigation";
import { LoadingNavigation } from "./LoadingNavigation";
import { useAppSelector } from "../redux/actions";
import { TabNavigation } from "./TabNavigation";

const Stack = createNativeStackNavigator();

function MainNavigation() {
  const application = useAppSelector((state) => state);
  console.log(application)
  if (application.navigationReducer.navigation === "loading") {
    return <LoadingNavigation />;
  } else if (application.navigationReducer.navigation === "auth") {
    return <AuthNavigation />;
  } else if (application.navigationReducer.navigation === "main") {
    return <TabNavigation />;
  } else {
    return <></>;
  }
}

export default MainNavigation;

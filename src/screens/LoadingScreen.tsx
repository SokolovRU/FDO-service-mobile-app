import React from "react";
import { LoadingComp } from "../components/loading/LoadingComp";

export const LoadingScreen = ({ navigation }: any) => {
  return <LoadingComp navigation={navigation} auth={true} />;
};

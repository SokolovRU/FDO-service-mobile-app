import { StatusBar } from "expo-status-bar";
import { StyleSheet, Platform, UIManager } from "react-native";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { Fonts } from "./src/const/fonts";
import { useSelector, Provider } from "react-redux";
import { store } from "./src/redux/store";
import { AuthorizationComp } from "./src/components/authorization/AuthorizationComp";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppSelector } from "./src/redux/actions";
import { persistStore } from "reduxjs-toolkit-persist";
import { LoadingComp } from "./src/components/loading/LoadingComp";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import MainNavigation from "./src/navigations/MainNavigation";
import { AuthNavigation } from "./src/navigations/AuthNavigation";
import { LoadingScreen } from "./src/screens/LoadingScreen";
import { LoadingNavigation } from "./src/navigations/LoadingNavigation";
import { LoginScreen } from "./src/screens/LoginScreen";

const persistor = persistStore(store);

export default function App() {
  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }
  let [fontsLoaded] = useFonts({
    [Fonts.Inter[100]]: Inter_100Thin,
    [Fonts.Inter[200]]: Inter_200ExtraLight,
    [Fonts.Inter[300]]: Inter_300Light,
    [Fonts.Inter[400]]: Inter_400Regular,
    [Fonts.Inter[500]]: Inter_500Medium,
    [Fonts.Inter[600]]: Inter_600SemiBold,
    [Fonts.Inter[700]]: Inter_700Bold,
    [Fonts.Inter[800]]: Inter_800ExtraBold,
    [Fonts.Inter[900]]: Inter_900Black,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<LoadingComp auth={false} />}>
        <SafeAreaProvider style={{ flex: 1 }}>
          <MainNavigation />
          <StatusBar />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

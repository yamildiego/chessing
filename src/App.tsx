import React, { useState, useEffect, useCallback } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./Reducers";

import HomeScreen from "./Screens/HomeScreen";
import ConfigLocalGameScreen from "./Screens/ConfigLocalGameScreen";
import LocalGameScreen from "./Screens/LocalGameScreen";
import Header from "./Components/Header";

import { secondaryColor } from "./Constants/MyColors";

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    CCKillJoy: require("./Assets/fonts/CCKillJoy.ttf"),
    Ubuntu: require("./Assets/fonts/Ubuntu.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer onReady={onLayoutRootView}>
          <Stack.Navigator>
            <Stack.Screen options={{ header: (props) => <Header {...props} /> }} name="HomeScreen" component={HomeScreen} />
            <Stack.Screen
              options={{
                headerStyle: { backgroundColor: "#fff" },
                headerTintColor: secondaryColor,
                title: "Play local",
                headerTitleStyle: { fontFamily: "Ubuntu" },
              }}
              name="ConfigLocalGameScreen"
              component={ConfigLocalGameScreen}
            />
            <Stack.Screen options={{ headerShown: false }} name="LocalGameScreen" component={LocalGameScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

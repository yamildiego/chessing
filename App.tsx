import React, { Suspense } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./src/Reducers";

import PreHomeScreen from "./src/Screens/PreHomeScreen";
import MainScreen from "./src/Screens/MainScreen";

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));
const Stack = createNativeStackNavigator();

const LazyPlaceholder = ({ route }) => (
  <View style={styles.scene}>
    <Text>Loading {route.title}…</Text>
  </View>
);

export default function App() {
  return (
    <View style={styles.container}>
      <Suspense fallback={<Text>Loating./\</Text>}>
        <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen options={{ headerShown: false }} name="PreHomeScreen" component={PreHomeScreen} />
              <Stack.Screen options={{ headerShown: false }} name="MainScreen" component={MainScreen} />
              {/* <Stack.Screen options={{ header: (props) => <Header {...props} /> }} name="HomeScreen" component={HomeScreen} />
              <Stack.Screen
                name="Login"
                options={{ headerStyle: { backgroundColor: primaryColor }, headerTintColor: "#fff" }}
                component={LoginScreen}
              /> */}
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
        <StatusBar style="auto" />
      </Suspense>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducers from "./src/Reducers";

import Game from "./src/Components/Game";

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Game />
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

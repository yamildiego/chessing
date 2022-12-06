import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground, Pressable } from "react-native";
import { Button } from "@react-native-material/core";
import { secondaryColor } from "../Constants/MyColors";
import background from "../Assets/background.jpg";

class HomeScreen extends Component {
  openGameLocal = () => this.props.navigation.navigate("ConfigLocalGameScreen");

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={secondaryColor} barStyle={"dark-content"} style="auto" />
        <ImageBackground source={background} resizeMode="cover" style={styles.imageBackground}>
          <View style={styles.buttons}>
            <Button
              color="secondary"
              style={styles.button}
              title={() => <Text style={styles.buttonText}>PLAY LOCAL</Text>}
              onPress={this.openGameLocal}
            />
            <Button
              color="secondary"
              style={styles.button}
              title={() => <Text style={styles.buttonText}>PLAY ONLINE</Text>}
              onPress={() => alert("🎉🎉🎉")}
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  buttons: {
    alignItems: "center",
    flexDirection: "column",
    marginTop: -100,
  },
  button: {
    alignSelf: "center",
    width: 200,
    padding: 10,
    marginBottom: 50,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontFamily: "Ubuntu",
  },
});

export default HomeScreen;

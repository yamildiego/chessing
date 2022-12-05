import React, { Component } from "react";
import { View, Text, StyleSheet, StatusBar, Image, ImageBackground, Pressable } from "react-native";

import background from "../Assets/background.jpg";

const textColor = "red";
const primaryColor = "yellow";

class PreHomeScreen extends Component {
  openHome = () => this.props.navigation.navigate("MainScreen");

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={primaryColor} color={textColor} barStyle={"light-content"} style="auto" />
        <ImageBackground source={background} resizeMode="cover" style={styles.image}>
          <View style={styles.logoContainer}>
            <View style={styles.centerLogo}>
              <Image style={styles.logo} source={require("../../assets/adaptive-icon.png")} />
            </View>
            <View style={styles.textContainer}>
              <Text style={{ ...styles.text, fontSize: 32, lineHeight: 60 }}>Turn trash into Cash</Text>
              <Text style={styles.text}>
                Find your
                <Text style={styles.textOrange}>{` hidden treasures today!`}</Text>
              </Text>
            </View>
          </View>
          <Pressable style={styles.button} onPress={this.openHome}>
            <Text style={styles.buttonText}>View current auctions</Text>
          </Pressable>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  logoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  centerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    maxWidth: 380,
    maxHeight: 50,
  },
  textContainer: {
    margin: 10,
    padding: 10,
    textAlign: "left",
    backgroundColor: "#00000077",
  },
  text: {
    // fontFamily: "GothamBook",
    fontSize: 16,
    color: "white",
  },
  textOrange: {
    color: "#ff9c00",
  },
  button: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 30,
    marginBottom: 30,
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: primaryColor,
  },
  buttonText: {
    padding: 10,
    fontSize: 22,
    lineHeight: 21,
    color: "white",
    // fontFamily: "Ubuntu",
  },
});

export default PreHomeScreen;

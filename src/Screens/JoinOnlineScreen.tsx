import React, { Component } from "react";
import { Switch, StyleSheet, Text, View } from "react-native";

import Button from "../Components/Button";

import background from "../Assets/background.jpg";
import white from "../Assets/white.png";
import black from "../Assets/black.png";

import { Chess, TypeOfPiece, Color } from "yd-chess-lib";

import { StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import { secondaryColor, logoColor, textColor } from "../Constants/MyColors";
import logo from "../../assets/icon.png";

const times = { 300000: "5", 600000: "10", 900000: "15", 1800000: "30" };
const size = Math.round(Dimensions.get("window").width * 0.06);

interface JoinOnlineScreenProps {
  navigation: any;
}

class JoinOnlineScreen extends Component<JoinOnlineScreenProps> {
  joinGame = () => this.props.navigation.navigate("ConfigOnlineScreen");

  createGame = () => this.props.navigation.navigate("ConfigOnlineScreen");

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Avatar.Image style={{ backgroundColor: "transparent" }} size={size * 5} source={logo} />
          <Text style={{ ...styles.title, color: logoColor, fontSize: size, lineHeight: size * 2 }}>Chessing</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            <Button onPress={this.joinGame}>Join game</Button>
            <Button onPress={this.createGame}>Create game</Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  subContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  logo: {
    marginTop: 38,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "CCKillJoy",
  },
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
});

export default JoinOnlineScreen;

import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import Button from "../Components/Button";
import { primaryColor, secondaryColor, logoColor, textColor } from "../Constants/MyColors";
import logo from "../../assets/icon.png";

import * as config from "../Actions/config";

const size = Math.round(Dimensions.get("window").width * 0.06);

class HomeScreen extends Component {
  openGameLocal = () => {
    this.props.inizialize();
    this.props.navigation.navigate("ConfigLocalGameScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} style="auto" />
        <View style={styles.logo}>
          <Avatar.Image style={{ backgroundColor: "transparent" }} size={size * 5} source={logo} />
          <Text style={{ ...styles.title, color: logoColor, fontSize: size, lineHeight: size * 2 }}>Chessing</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            <Button onPress={this.openGameLocal}>New Game</Button>
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
  button: {
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    color: "white",
    fontFamily: "Ubuntu",
  },
});

function mapStateToProps(state, props) {
  return {};
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  inizialize: config.inizializeConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

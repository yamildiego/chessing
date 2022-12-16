import React, { Component } from "react";
import { connect, MapStateToProps } from "react-redux";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";
import { Button } from "@react-native-material/core";
import { secondaryColor, textColor } from "../Constants/MyColors";
import logo from "../../assets/icon.png";

import * as game from "../Actions/game";

const size = Math.round(Dimensions.get("window").width * 0.06);

class HomeScreen extends Component {
  openGameLocal = () => this.props.navigation.navigate("ConfigLocalGameScreen");

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} style="auto" />
        <View style={styles.logo}>
          <Avatar.Image style={{ backgroundColor: "transparent" }} size={size * 5} source={logo} />
          <Text style={{ ...styles.title, color: textColor, fontSize: size, lineHeight: size * 2 }}>Chessing</Text>
        </View>
        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            <Button
              color="secondary"
              style={styles.button}
              title={() => <Text style={styles.buttonText}>PLAY LOCAL</Text>}
              onPress={this.openGameLocal}
            />
            <Button
              style={styles.button}
              color="secondary"
              title={() => <Text style={styles.buttonText}>PLAY ONLINE</Text>}
              onPress={() => alert("🎉🎉🎉")}
            />
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
  inizialize: game.inizializeConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

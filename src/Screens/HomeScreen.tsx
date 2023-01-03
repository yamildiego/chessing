import React, { Component } from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import { Avatar } from "react-native-paper";

import Button from "../Components/Button";
import Logo from "../Components/Logo";

import { primaryColor, secondaryColor, logoColor, textColor } from "../Constants/MyColors";
import logo from "../../assets/icon.png";

import * as config from "../Actions/config";

const size = Math.round(Dimensions.get("window").width * 0.06);

interface HomeScreenProps {
  inizialize: () => void;
  navigation: any;
}

class HomeScreen extends Component<HomeScreenProps> {
  playOffline = () => {
    this.props.inizialize();
    this.props.navigation.navigate("ConfigOfflineScreen");
  };

  playOnline = () => {
    this.props.inizialize();
    this.props.navigation.navigate("PlayOnlineScreen");
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle={"dark-content"} />
        <Logo />
        <View style={styles.subContainer}>
          <View style={styles.buttons}>
            <Button onPress={this.playOffline}>Play offline</Button>
            <Button onPress={this.playOnline}>Play online</Button>
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

function mapStateToProps() {
  return {};
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  inizialize: config.inizializeConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

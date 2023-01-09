import React from "react";
import { connect, MapDispatchToProps } from "react-redux";
import { View, StyleSheet, StatusBar } from "react-native";

import Button from "../Components/Button";
import Logo from "../Components/Logo";

import * as config from "../Actions/config";

interface HomeScreenProps {
  inizialize: () => void;
  navigation: any;
}

const HomeScreen = (props: HomeScreenProps) => {
  const playOffline = () => {
    props.inizialize();
    props.navigation.navigate("ConfigOfflineScreen");
  };

  const playOnline = () => {
    props.inizialize();
    props.navigation.navigate("PlayOnlineScreen");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} />
      <Logo />
      <View style={styles.subContainer}>
        <View style={styles.buttons}>
          <Button onPress={playOffline}>Play offline</Button>
          <Button onPress={playOnline}>Play online</Button>
        </View>
      </View>
    </View>
  );
};

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

function mapStateToProps(): {} {
  return {};
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  inizialize: config.inizializeConfig,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

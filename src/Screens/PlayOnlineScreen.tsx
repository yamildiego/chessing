import React from "react";
import { StyleSheet, View } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";

import * as match from "../Actions/match";
import * as online from "../Actions/online";

import Logo from "../Components/Logo";
import Button from "../Components/Button";

interface PlayOnlineScreenProps {
  initializedBoard: () => void;
  inizialize: () => void;
  navigation: any;
}

const PlayOnlineScreen = (props: PlayOnlineScreenProps) => {
  const joinGame = () => {
    props.initializedBoard();
    props.inizialize();
    props.navigation.navigate("JoinOnlineScreen");
  };

  const createGame = () => {
    props.initializedBoard();
    props.inizialize();
    props.navigation.navigate("ConfigOnlineScreen");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.subContainer}>
        <View style={styles.buttons}>
          <Button onPress={createGame}>Create game</Button>
          <Button onPress={joinGame}>Join game</Button>
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
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
  },
});

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  initializedBoard: match.initializedBoard,
  inizialize: online.inizialize,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayOnlineScreen);

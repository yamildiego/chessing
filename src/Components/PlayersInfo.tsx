import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  const transformFlip = { transform: !props.executeFunc ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  return (
    <View style={{ ...transformFlip, ...styles.container }}>
      <View style={styles.subContainer}>
        <PlayerInfo timePerPlayer={props.timePerPlayer} isPlaying={props.isPlaying == "W"} color="white" />
        <PlayerInfo timePerPlayer={props.timePerPlayer} isPlaying={props.isPlaying == "B"} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 380,
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
});

export default PlayersInfo;

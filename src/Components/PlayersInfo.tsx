import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <PlayerInfo isPlaying={props.isPlaying == "W"} color="WHITE" />
      <PlayerInfo isPlaying={props.isPlaying == "B"} color="BLACK" />
    </View>
  );
};

export default PlayersInfo;

import React from "react";
import { StyleSheet, View } from "react-native";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  const { executeFunc } = props;
  const transformFlip = { transform: !executeFunc ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  return (
    <View style={{ ...transformFlip, ...styles.container }}>
      <View style={styles.subContainer}>
        <PlayerInfo executeFunc={executeFunc} color="W" />
        <PlayerInfo executeFunc={executeFunc} color="B" />
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

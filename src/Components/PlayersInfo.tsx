import React from "react";
import { StyleSheet, View } from "react-native";
import { Color } from "yd-chess-lib";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  const { executeFunc } = props;
  const transformFlip = { transform: !executeFunc ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  return (
    <View style={{ ...transformFlip, ...styles.container }}>
      <View style={styles.subContainer}>
        <PlayerInfo executeFunc={executeFunc} color={Color.WHITE} />
        <PlayerInfo executeFunc={executeFunc} color={Color.BLACK} />
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

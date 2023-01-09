import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Color } from "yd-chess-lib";

import PlayerInfo from "./PlayerInfo";

interface PlayersInfoProps {
  size_screen: number;
  playerMain: boolean;
}

const PlayersInfo = (props: PlayersInfoProps) => {
  const { size_screen, playerMain } = props;
  const transformFlip = { transform: !playerMain ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  return (
    <View style={{ ...transformFlip, width: size_screen }}>
      <View style={styles.subContainer}>
        <PlayerInfo playerMain={playerMain} color={Color.WHITE} />
        <PlayerInfo playerMain={playerMain} color={Color.BLACK} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  subContainer: {
    flexDirection: "row",
    marginTop: 3,
    marginBottom: 5,
  },
});

function mapStateToProps(state: StateType) {
  return {
    size_screen: state.visual.size_screen,
    margin_screen: state.visual.margin_screen,
  };
}

export default connect(mapStateToProps)(PlayersInfo);

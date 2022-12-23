import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import { Color } from "yd-chess-lib";

import PlayerInfo from "./PlayerInfo";

const PlayersInfo = (props) => {
  const { sizeScreen, marginScreen, playerMain } = props;
  const transformFlip = { transform: !playerMain ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  return (
    <View style={{ ...transformFlip, width: sizeScreen }}>
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

function mapStateToProps(state, props) {
  return {
    sizeScreen: state.visual.sizeScreen,
    marginScreen: state.visual.marginScreen,
  };
}

export default connect(mapStateToProps)(PlayersInfo);

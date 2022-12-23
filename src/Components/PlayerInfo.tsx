import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import Countdown from "yd-react-native-countdown";
import { Color } from "yd-chess-lib";

import * as match from "../Actions/match";

const PlayerInfo = (props) => {
  const { is_playing, time_per_player, playerMain, color, status } = props;
  const fullNameColor = is_playing == Color.BLACK ? "black" : "white";
  const stylesContainer = is_playing == color ? { backgroundColor: fullNameColor, borderColor: fullNameColor } : {};
  const stylesText = is_playing == color ? { color: color == Color.BLACK ? "#fff" : "#444" } : {};
  const stylesCountdownText = is_playing == color ? { color: color == Color.BLACK ? "#fff" : "#444" } : {};

  const callbackTimeout = () => {
    props.setWinner(is_playing == Color.BLACK ? Color.WHITE : Color.BLACK);
    props.setStatus("Timeout");
    props.setModalVisible(true);
  };

  return (
    <View style={{ ...styles.container, ...stylesContainer }}>
      <Text style={{ ...styles.text, ...stylesText }}>Player: {fullNameColor.toUpperCase()}</Text>
      <Countdown
        from={time_per_player}
        isRunning={is_playing == color && status == null}
        style={styles.countdown}
        beatEffectAtTheEnd={true}
        callback={() => (playerMain ? callbackTimeout() : null)}
        styleText={{ ...styles.countdownText, ...stylesCountdownText }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 2,
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderColor: "#D9D9D9",
    flex: 1,
    borderWidth: 2,
  },
  text: {
    padding: 6,
    color: "#979797",
    fontFamily: "Ubuntu",
    lineHeight: 28,
    fontWeight: "bold",
  },
  countdown: {
    backgroundColor: "transparent",
  },
  countdownText: {
    fontSize: 16,
    color: "#979797",
  },
});

const mapStateToProps = (state: AppState) => ({
  is_playing: state.match.is_playing,
  time_per_player: state.config.time_per_player,
  status: state.match.status,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setWinner: match.setWinner,
  setStatus: match.setStatus,
  setModalVisible: match.setModalVisible,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);

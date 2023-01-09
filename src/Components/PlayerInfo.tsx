import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";
import Countdown from "yd-react-native-countdown";
import { Color } from "yd-chess-lib";

import * as match from "../Actions/match";

interface PlayerInfoProps {
  is_playing: Color;
  time_per_player: number;
  playerMain: boolean;
  color: Color;
  status: string | null;
  setDataFinished: (value: { status: string | null; winner: string | null; modal_visible: boolean }) => void;
}

const PlayerInfo = (props: PlayerInfoProps) => {
  const { is_playing, time_per_player, playerMain, color, status } = props;
  const fullNameColor = is_playing == Color.BLACK ? "black" : "white";
  const stylesContainer = is_playing == color ? { backgroundColor: fullNameColor, borderColor: fullNameColor } : {};
  const stylesText = is_playing == color ? { color: color == Color.BLACK ? "#fff" : "#444" } : {};
  const stylesCountdownText = is_playing == color ? { color: color == Color.BLACK ? "#fff" : "#444" } : {};

  const callbackTimeout = () =>
    props.setDataFinished({
      status: "Timeout",
      winner: is_playing == Color.BLACK ? Color.WHITE : Color.BLACK,
      modal_visible: true,
    });

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

const mapStateToProps = (state: any) => ({
  is_playing: state.match.is_playing,
  time_per_player: state.config.time_per_player,
  status: state.match.data_finished.status,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setDataFinished: match.setDataFinished,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerInfo);

import { StyleSheet, Text, View } from "react-native";
import Countdown from "yd-react-native-countdown";

const PlayerInfo = (props) => {
  const stylesContainer = props.isPlaying ? { backgroundColor: props.color, borderColor: props.color } : {};
  const stylesText = props.isPlaying ? { color: props.color == "black" ? "#fff" : "#444" } : {};
  const stylesCountdownText = props.isPlaying ? { color: props.color == "black" ? "#fff" : "#444" } : {};

  return (
    <View style={{ ...styles.container, ...stylesContainer }}>
      <Text style={{ ...styles.text, ...stylesText }}>Player: {props.color.toUpperCase()}</Text>
      <Countdown
        from={props.timePerPlayer}
        isRunning={props.isPlaying}
        style={styles.countdown}
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
    width: "50%",
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

export default PlayerInfo;

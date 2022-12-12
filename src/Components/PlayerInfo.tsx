import Countdown from "yd-react-native-countdown";
import { StyleSheet, Text, View } from "react-native";

const PlayerInfo = (props) => {
  const stylesContainer = !props.isPlaying ? { backgroundColor: "#D9D9D9", borderColor: "#D9D9D9" } : {};
  const stylesText = !props.isPlaying ? { color: "#979797" } : {};
  const stylesCountdownText = !props.isPlaying ? { color: "#979797" } : {};

  return (
    <View style={{ ...styles.container, ...stylesContainer }}>
      <Text style={{ ...styles.text, ...stylesText }}>Player: {props.color}</Text>
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
    backgroundColor: "#007AFF",
    width: "50%",
    borderColor: "#007AFF",
    borderWidth: 2,
  },
  text: {
    padding: 6,
    color: "white",
    fontFamily: "Ubuntu",
    lineHeight: 28,
    fontWeight: "bold",
  },
  countdown: {
    backgroundColor: "transparent",
  },
  countdownText: {
    fontSize: 16,
    color: "#fff",
  },
});

export default PlayerInfo;

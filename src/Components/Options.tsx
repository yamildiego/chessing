import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { connect } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

const Options = (props) => {
  const { sizeScreen, marginScreen, playerMain } = props;
  const transformFlip = { transform: !playerMain ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  const draw = () => {
    Alert.alert("Are you sure you want to offer a draw?", "", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };

  const offerTheDraw = (color) => {
    Alert.alert(`Player ${color} offer you a draw`, "Do you accetp?", [
      {
        text: "No",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "Yes", onPress: () => console.log("OK Pressed") },
    ]);
  };

  return (
    <View style={{ ...transformFlip, ...styles.container }}>
      <View style={{ flexDirection: "row", width: sizeScreen, marginLeft: marginScreen }}>
        <TouchableOpacity style={styles.button} onPress={draw}>
          <FontAwesome5 size={35} name={"handshake"} style={{ textAlign: "center" }} />
          <Text style={{ textAlign: "center" }}>Draw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ ...styles.button, marginLeft: 5 }} onPress={() => {}}>
          <MaterialCommunityIcons size={35} name={"exit-run"} style={{ textAlign: "center" }} />
          <Text style={{ textAlign: "center" }}>Exit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    width: "100%",
  },
  button: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
});

function mapStateToProps(state, props) {
  return {
    sizeScreen: state.visual.sizeScreen,
    marginScreen: state.visual.marginScreen,
  };
}

export default connect(mapStateToProps)(Options);

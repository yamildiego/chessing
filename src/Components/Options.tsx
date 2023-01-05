import { StyleSheet, View, Text, TouchableOpacity, Alert } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";

import * as match from "../Actions/match";
import { Color } from "yd-chess-lib";

interface OptionsProps {
  sizeScreen: number;
  marginScreen: number;
  playerMain: boolean;
  color: Color;
  is_playing: Color;
  setAskForResign: (value: boolean) => void;
  setOfferADraw: (value: boolean) => void;
}

const Options = (props: OptionsProps) => {
  const { sizeScreen, marginScreen, playerMain, color, is_playing } = props;
  const transformFlip = { transform: !playerMain ? [{ scaleX: -1 }, { scaleY: -1 }] : [] };

  const draw = () => {
    Alert.alert("Are you sure you want to offer a draw?", "", [
      { text: "OK", onPress: () => props.setOfferADraw(true) },
      { text: "Cancel", onPress: () => {}, style: "cancel" },
    ]);
  };

  const resign = () => props.setAskForResign(true);

  const disabledStyle = is_playing !== color ? { color: "#979797", backgroundColor: "#D9D9D9" } : {};

  return (
    <View style={{ ...transformFlip, ...styles.container }}>
      <View style={{ flexDirection: "row", width: sizeScreen, marginLeft: marginScreen }}>
        <TouchableOpacity disabled={is_playing !== color} style={{ ...styles.button, ...disabledStyle }} onPress={draw}>
          <FontAwesome5 size={35} name={"handshake"} style={{ textAlign: "center", ...disabledStyle }} />
          <Text style={{ textAlign: "center", ...disabledStyle }}>Draw</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={is_playing !== color} style={{ ...styles.button, marginLeft: 5, ...disabledStyle }} onPress={resign}>
          <MaterialCommunityIcons size={35} name={"exit-run"} style={{ textAlign: "center", ...disabledStyle }} />
          <Text style={{ textAlign: "center", ...disabledStyle }}>Resign</Text>
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

function mapStateToProps(state: StateType) {
  return {
    sizeScreen: state.visual.sizeScreen,
    marginScreen: state.visual.marginScreen,
    is_playing: state.match.is_playing,
  };
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setOfferADraw: match.setOfferADraw,
  setAskForResign: match.setAskForResign,
  setDataFinished: match.setDataFinished,
};

export default connect(mapStateToProps, mapDispatchToProps)(Options);

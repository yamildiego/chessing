import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Button } from "@react-native-material/core";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";

import * as match from "../Actions/match";
import { Color } from "yd-chess-lib";

const ModalWins = (props) => {
  const { winner, modal_visible, status } = props;
  const Tcolor = winner === Color.BLACK ? "#fff" : "#343434";
  const bgColor = winner === Color.BLACK ? "#343434" : "#fff";

  const backHome = () => props.navigation.navigate("HomeScreen");
  const rematch = () => props.navigation.navigate("ConfigLocalGameScreen");

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modal_visible}
      onRequestClose={() => {
        // Alert.alert("Modal has been closed.");
      }}
    >
      <View style={styles.centeredView}>
        <View style={{ ...styles.modalView, backgroundColor: bgColor }}>
          {(status == "Checkmate" || status == "Timeout" || status == "Resign") && (
            <>
              <Text style={{ ...styles.modalTitle, backgroundColor: bgColor, color: Tcolor }}>{`${
                winner === Color.BLACK ? `Blacks` : `Whites`
              } wins!`}</Text>
              <Text style={{ ...styles.modalSubtitle, backgroundColor: bgColor, color: Tcolor }}>By {status}</Text>
            </>
          )}
          {status !== "Checkmate" && status !== "Timeout" && status !== "Resign" && (
            <>
              <Text style={{ ...styles.modalTitle, backgroundColor: bgColor, color: Tcolor }}>{`Draw`}</Text>
              <Text style={{ ...styles.modalSubtitle, backgroundColor: bgColor, color: Tcolor }}>By {status}</Text>
            </>
          )}
          <View style={{ ...styles.modalBody, backgroundColor: Tcolor }}>
            <View style={styles.buttons}>
              <Button
                color="secondary"
                style={styles.button}
                title={() => <Text style={styles.buttonText}>BACK HOME</Text>}
                onPress={backHome}
              />
              <Button
                style={styles.button}
                color="secondary"
                title={() => <Text style={styles.buttonText}>REMATCH</Text>}
                onPress={rematch}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    position: "relative",
    width: "90%",
    maxWidth: 280,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    paddingTop: 15,
    fontFamily: "Ubuntu",
    fontSize: 25,
    width: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    textAlign: "center",
  },
  modalClose: {
    position: "absolute",
    top: 5,
    right: 10,
    zIndex: 50,
  },
  modalTimes: {
    fontSize: 20,
    fontFamily: "Ubuntu",
  },
  modalSubtitle: {
    fontFamily: "Ubuntu",
    textAlign: "center",
    fontSize: 10,
    paddingBottom: 15,
    lineHeight: 10,
  },
  modalBody: {
    paddingTop: 15,
    width: "100%",
    borderTopLeftRadius: 220,
    borderTopRightRadius: 220,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  buttons: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "space-between",
    alignItems: "center",
  },
  button: {
    padding: 10,
    marginBottom: 10,
    width: 150,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 30,
    color: "white",
    fontFamily: "Ubuntu",
  },
});

const mapStateToProps = (state: AppState) => ({
  status: state.match.data_finished.status,
  winner: state.match.data_finished.winner,
  modal_visible: state.match.data_finished.modal_visible,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {};

export default connect(mapStateToProps, mapDispatchToProps)(ModalWins);

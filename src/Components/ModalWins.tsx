import { StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import MyModal from "./MyModal";
import Button from "./Button";
import { Color } from "yd-chess-lib";

interface ModalWinsProps {
  winner: Color;
  status: string;
  modal_visible: boolean;
  navigation: any;
}

const ModalWins = (props: ModalWinsProps) => {
  const { winner, modal_visible, status } = props;
  const Tcolor = winner === Color.BLACK ? "#fff" : "#343434";
  const bgColor = winner === Color.BLACK ? "#343434" : "#fff";

  const backHome = () => props.navigation.navigate("HomeScreen");
  const rematch = () => props.navigation.navigate("ConfigOfflineScreen");
  const onRequestClose = () => props.navigation.navigate("HomeScreen");

  return (
    <MyModal visible={modal_visible} onRequestClose={onRequestClose}>
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
              <Button onPress={backHome} width={150}>
                BACK HOME
              </Button>
              <Button onPress={rematch} width={150}>
                REMATCH
              </Button>
            </View>
          </View>
        </View>
      </View>
    </MyModal>
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
    width: 280,
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
});

const mapStateToProps = (state: StateType) => ({
  status: state.match.data_finished.status,
  winner: state.match.data_finished.winner,
  modal_visible: state.match.data_finished.modal_visible,
});

export default connect(mapStateToProps)(ModalWins);

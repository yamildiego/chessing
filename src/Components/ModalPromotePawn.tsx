import { StyleSheet, Text, View, Modal, TouchableOpacity } from "react-native";
import { Button } from "@react-native-material/core";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import Chess, { Color, TypeOfPiece } from "yd-chess-lib";
import * as match from "../Actions/match";

import MyModal from "./MyModal";

const ModalPromotePawn = (props) => {
  const { is_playing, pawn_promotion_position, status } = props;
  const Tcolor = is_playing === Color.BLACK ? "#666" : "white";
  const bgColor = is_playing === Color.BLACK ? "white" : "#666";
  const options = { queen: TypeOfPiece.QUEEN, rook: TypeOfPiece.ROOK, knight: TypeOfPiece.KNIGHT, bishop: TypeOfPiece.BISHOP };

  const onPress = (type: TypeOfPiece) => {
    let item = pawn_promotion_position.split("x")[1];
    console.log(Chess.getInstance().getBoardInText());
    console.log(pawn_promotion_position, type);
    Chess.getInstance().pawnPromotion(item, type);
    console.log(Chess.getInstance().getBoardInText());
    props.setPawnPromotionPosition(null);
    let isInCheckMate = Chess.getInstance().isInCheckMate(item.color == Color.BLACK ? Color.WHITE : Color.BLACK);
    let isDraw = Chess.getInstance().isDraw(item.color == Color.BLACK ? Color.WHITE : Color.BLACK);
    if (isDraw != null) props.setDataFinished({ status: isDraw, winner: "none", modal_visible: true });
    if (isInCheckMate) props.setDataFinished({ status: "Checkmate", winner: item.color, modal_visible: true });
    else props.switchPlayer();
  };

  return (
    <MyModal visible={pawn_promotion_position !== null && status == null} onRequestClose={() => {}}>
      <View style={{ backgroundColor: bgColor, padding: 10, borderRadius: 20, width: 100, alignItems: "center" }}>
        {Object.keys(options).map((key, index) => {
          return (
            <FontAwesome5.Button
              key={`option_${index}`}
              onPress={() => onPress(options[key])}
              size={45}
              color={Tcolor}
              style={{ backgroundColor: bgColor, paddingLeft: 15 }}
              name={`chess-${key}`}
            />
          );
        })}
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
});

const mapStateToProps = (state: AppState) => ({
  is_playing: state.match.is_playing,
  pawn_promotion_position: state.match.pawn_promotion_position,
  status: state.match.data_finished.status,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setPawnPromotionPosition: match.setPawnPromotionPosition,
  setDataFinished: match.setDataFinished,
  switchPlayer: match.switchPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPromotePawn);

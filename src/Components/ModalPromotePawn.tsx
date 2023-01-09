import { StyleSheet, View } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";

import { Chess, Color, TypeOfPiece } from "yd-chess-lib";
import * as match from "../Actions/match";

import MyModal from "./MyModal";

interface ModalPromotePawnProps {
  is_playing: Color;
  pawn_promotion_position: string;
  status: string | null;
  switchPlayer: () => void;
  setAskForResign: (value: boolean) => void;
  setDataFinished: (value: { status: string | null; winner: string | null; modal_visible: boolean }) => void;
  setPawnPromotionPosition: (value: string | null) => void;
}

const ModalPromotePawn = (props: ModalPromotePawnProps) => {
  const { is_playing, pawn_promotion_position, status } = props;
  const Tcolor = is_playing === Color.BLACK ? "#666" : "white";
  const bgColor = is_playing === Color.BLACK ? "white" : "#666";
  const options: { [key: string]: TypeOfPiece } = {
    queen: TypeOfPiece.QUEEN,
    rook: TypeOfPiece.ROOK,
    knight: TypeOfPiece.KNIGHT,
    bishop: TypeOfPiece.BISHOP,
  };

  const onPress = (type: TypeOfPiece) => {
    let itemPosition = pawn_promotion_position.split("x")[1];
    let item = Chess.getInstance().getSquare(itemPosition);
    Chess.getInstance().pawnPromotion(itemPosition, type);
    props.setPawnPromotionPosition(null);
    if (item !== null) {
      let isInCheckMate = Chess.getInstance().isInCheckMate(item.color == Color.BLACK ? Color.WHITE : Color.BLACK);
      let isDraw = Chess.getInstance().isDraw(item.color == Color.BLACK ? Color.WHITE : Color.BLACK);
      if (isDraw != null) props.setDataFinished({ status: isDraw, winner: "none", modal_visible: true });
      if (isInCheckMate) props.setDataFinished({ status: "Checkmate", winner: item.color, modal_visible: true });
    } else props.switchPlayer();
  };

  const onRequestClose = () => props.setAskForResign(true);

  return (
    <MyModal visible={pawn_promotion_position !== null && status == null} onRequestClose={() => onRequestClose()}>
      <View style={{ backgroundColor: bgColor, ...styles.container }}>
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
  container: { padding: 10, borderRadius: 20, width: 100, alignItems: "center" },
});

const mapStateToProps = (state: StateType) => ({
  is_playing: state.match.is_playing,
  pawn_promotion_position: state.match.pawn_promotion_position,
  status: state.match.data_finished.status,
});

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setAskForResign: match.setAskForResign,
  setPawnPromotionPosition: match.setPawnPromotionPosition,
  setDataFinished: match.setDataFinished,
  switchPlayer: match.switchPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalPromotePawn);

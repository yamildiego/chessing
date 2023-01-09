import { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, PanResponder, TouchableOpacity, View } from "react-native";
import { connect, MapDispatchToProps } from "react-redux";
import { Chess, tPosNS, tPosSN, Color } from "yd-chess-lib";

import Piece from "./Piece";

import * as match from "../Actions/match";
import * as online from "../Actions/online";

interface DraggableProps {
  item: PieceType;
  square_selected: PieceType | null;
  isDraggable: boolean;
  piece_moved: { from: string; to: string };
  status: string | null;
  size_square: number;
  flip: string;
  is_offline: boolean;
  code: string;
  main_player_color: Color | null;
  piece_moved_online: { from: string; to: string } | null;
  switchPlayer: () => void;
  setPieceMoved: (value: { from: string; to: string } | null) => void;
  setSquareSelected: (value: PieceType | null) => void;
  setPawnPromotionPosition: (value: string | null) => void;
  setDataFinished: (value: { status: string | null; winner: string | null; modal_visible: boolean }) => void;
}

const Draggable = (props: DraggableProps) => {
  const [zIndex, setZIndex] = useState(0);
  const {
    item,
    square_selected,
    isDraggable,
    piece_moved,
    status,
    size_square,
    flip,
    is_offline,
    code,
    main_player_color,
    piece_moved_online,
  } = props;

  const getOpponent = (color: Color) => (color == Color.WHITE ? Color.BLACK : Color.WHITE);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      pan.setOffset({ ...getPositionPixeles(item.key, size_square) });
      if (square_selected !== null && Chess.getInstance().isCasteling(square_selected.key, item.key) && piece_moved == null) {
        tryToMove(item);
      } else if (
        square_selected == null ||
        (square_selected !== null && square_selected.color === item.color && square_selected.key !== item.key)
      )
        props.setSquareSelected(item);
    },
    onPanResponderMove: (evt, gesture) => {
      let order =
        (!is_offline && main_player_color == Color.BLACK) || (is_offline && flip == "board" && item.color == Color.BLACK) ? -1 : 1;
      pan.setValue({ x: gesture.dx * order, y: gesture.dy * order });
    },
    onPanResponderRelease: (evt, gestureState) => {
      setZIndex(1);
      if (square_selected !== null && square_selected.key == item.key) {
        const { pageX, pageY } = evt.nativeEvent;
        // pixeles moved
        let x = { ...pan.x };
        let y = { ...pan.y };
        // calculated number of square moved
        let positionMovedX = Math.round(x._value / size_square);
        let positionMovedY = Math.round(y._value / size_square);

        // current position and new position
        let position = tPosSN(item.key);
        let newPosition = { x: position.y + positionMovedX, y: position.x - positionMovedY };
        let newPositionText = tPosNS({ x: newPosition.y, y: newPosition.x });
        let canMove = false;

        pan.flattenOffset();

        //evaluate if its allow to move at the new squeare
        if (item.movementsAllowed.includes(newPositionText) && status == null) {
          Animated.spring(pan, {
            toValue: { ...getPositionPixeles(newPositionText, size_square) },
            useNativeDriver: true,
          }).start(() => {
            movePiece(`${item.key}x${newPositionText}`, item.color, getOpponent(item.color));
          });
        } else {
          let positionTest = { x: 8 - positionMovedY, y: positionMovedX };

          // if ramdom error that give the current coordinates instad of give the pixelesMoved set in the same spot wothout effect
          if (positionTest.y == position.y) {
            pan.setValue({ ...getPositionPixeles(item.key, size_square) });
          } else {
            if (item.key !== newPositionText) props.setSquareSelected(null);

            Animated.spring(pan, {
              toValue: { ...getPositionPixeles(item.key, size_square) },
              useNativeDriver: true,
            }).start();
          }
        }
      }
    },
  });

  const movePiece = (p_movement: string, colorCurrentPlayer: Color, colorOpponent: Color) => {
    let moved = Chess.getInstance().move(p_movement);
    if (moved) {
      props.setSquareSelected(null);
      if (Chess.getInstance().hasToPromoteAPawn()) props.setPawnPromotionPosition(p_movement);
      else {
        let isInCheckMate = Chess.getInstance().isInCheckMate(colorOpponent);
        let isDraw = Chess.getInstance().isDraw(colorOpponent);
        if (isDraw != null) props.setDataFinished({ status: isDraw, winner: "none", modal_visible: true });
        if (isInCheckMate) props.setDataFinished({ status: "Checkmate", winner: colorCurrentPlayer, modal_visible: true });

        if (!is_offline) {
          props.addMovement(code, p_movement, () => {
            props.setPieceMoved(null);
            //loading en  algun lado en false
          });
        } else {
          props.setPieceMoved(null);
          props.switchPlayer();
        }
      }
    }
  };

  const movePieceOnline = (p_movement: string) => {
    let moved = Chess.getInstance().move(p_movement);
    if (moved) {
      let isInCheckMate = Chess.getInstance().isInCheckMate(main_player_color);
      if (main_player_color !== null) {
        let isDraw = Chess.getInstance().isDraw(main_player_color);
        if (isDraw != null) props.setDataFinished({ status: isDraw, winner: "none", modal_visible: true });
      }

      console.log("isInCheckMate", isInCheckMate);
      console.log("main_player_color", main_player_color);

      if (isInCheckMate) {
        let winner = main_player_color == Color.WHITE ? Color.BLACK : Color.WHITE;
        props.setDataFinished({ status: "Checkmate", winner, modal_visible: true });
      }
    }
  };

  useEffect(() => {
    pan.setValue({ ...getPositionPixeles(item.key, size_square) });
  }, [item]);

  useEffect(() => {
    if (piece_moved !== null && piece_moved.from === item.key && status == null) {
      Animated.spring(pan, {
        toValue: { ...getPositionPixeles(piece_moved.to, size_square) },
        useNativeDriver: true,
        speed: 35,
      }).start(() => {
        movePiece(`${piece_moved.from}x${piece_moved.to}`, item.color, getOpponent(item.color));
        // setTimeout(() => , 150);
      });
    }
  }, [piece_moved]);

  useEffect(() => {
    // console.log(piece_moved_online);
    if (piece_moved_online !== null && piece_moved_online.from === item.key && status == null) {
      Animated.spring(pan, {
        toValue: { ...getPositionPixeles(piece_moved_online.to, size_square) },
        useNativeDriver: true,
      }).start(() => {
        console.log("animateion");
        movePieceOnline(`${piece_moved_online.from}x${piece_moved_online.to}`);
        // setTimeout(() =>
        // , 150);
      });
    }
  }, [piece_moved_online]);

  const tryToMove = (p_item: PieceType) => {
    if (square_selected !== null && status == null && piece_moved == null) {
      if (square_selected.movementsAllowed.includes(p_item.key)) props.setPieceMoved({ from: square_selected.key, to: p_item.key });
      props.setSquareSelected(null);
    }
  };

  const propsAnimated = isDraggable ? { ...panResponder.panHandlers } : {};

  let transform = pan.getTranslateTransform();

  if (item.key == "1h") transform = [{ translateX: size_square * 7 }, { translateY: size_square * 7 }];
  if (item.key == "8h") transform = [{ translateX: size_square * 7 }, { translateY: 0 }];

  return (
    <>
      <Animated.View
        {...propsAnimated}
        style={
          isDraggable
            ? [{ transform: transform }, { position: "absolute" }, { zIndex: zIndex }]
            : [
                { left: getPositionPixeles(item.key, size_square).x, top: getPositionPixeles(item.key, size_square).y },
                { position: "absolute" },
              ]
        }
      >
        <TouchableOpacity activeOpacity={1} onPress={() => (!isDraggable ? tryToMove(item) : null)}>
          <View style={{ ...styles.itemDraggable, width: size_square, height: size_square }}>
            <Piece piece={item} />
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({ itemDraggable: { overflow: "hidden" } });

const getPositionPixeles = (key: string, size: number) => ({ x: tPosSN(key).y * size, y: 7 * size - tPosSN(key).x * size });

function mapStateToProps(state: StateType) {
  return {
    square_selected: state.match.square_selected,
    status: state.match.data_finished.status,
    piece_moved: state.match.piece_moved,
    piece_moved_online: state.online.piece_moved,
    size_square: state.visual.size_square,
    flip: state.config.flip,
    is_offline: state.online.code == null,
    code: state.online.code,
    main_player_color: state.online.main_player_color,
  };
}

const mapDispatchToProps: MapDispatchToProps<any, any> = {
  setSquareSelected: match.setSquareSelected,
  switchPlayer: match.switchPlayer,
  setDataFinished: match.setDataFinished,
  setPawnPromotionPosition: match.setPawnPromotionPosition,
  setPieceMoved: match.setPieceMoved,
  addMovement: online.addMovement,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);

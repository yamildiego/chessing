import { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, PanResponder, TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import * as match from "../Actions/match";

import { Chess, tPosNS, tPosSN, Color } from "yd-chess-lib";

const Draggable = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const { item, square_selected, size, isDraggable, piece_moved, status, sizeSquare, flip } = props;

  const getOpponent = (color: Color) => (color == Color.WHITE ? Color.BLACK : Color.WHITE);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      pan.setOffset({ ...getPositionPixeles(item.key, size) });
      if (
        square_selected !== null &&
        item !== null &&
        Chess.getInstance().isCasteling(square_selected.key, item.key) &&
        piece_moved == null
      ) {
        tryToMove(item);
      } else if (
        square_selected == null ||
        (square_selected !== null && square_selected.color === item.color && square_selected.key !== item.key)
      )
        props.setSquareSelected(item);
    },
    onPanResponderMove: (evt, gesture) => {
      let order = flip == "board" && item.color == Color.BLACK ? -1 : 1;
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
        let positionMovedX = Math.round(x._value / size);
        let positionMovedY = Math.round(y._value / size);

        // current position and new position
        let position = tPosSN(item.key);
        let newPosition = { x: position.y + positionMovedX, y: position.x - positionMovedY };
        let newPositionText = tPosNS({ x: newPosition.y, y: newPosition.x });
        let canMove = false;

        pan.flattenOffset();

        //evaluate if its allow to move at the new squeare
        if (item !== null && item.movementsAllowed.includes(newPositionText) && status == null) {
          Animated.spring(pan, {
            toValue: { ...getPositionPixeles(newPositionText, size) },
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            movePiece(`${item.key}x${newPositionText}`, item.color, getOpponent(item.color));
          }, 150);
        } else {
          let positionTest = { x: 8 - positionMovedY, y: positionMovedX };

          // if ramdom error that give the current coordinates instad of give the pixelesMoved set in the same spot wothout effect
          if (positionTest.y == position.y) {
            pan.setValue({ ...getPositionPixeles(item.key, size) });
          } else {
            if (item.key !== newPositionText) props.setSquareSelected(null);

            Animated.spring(pan, {
              toValue: { ...getPositionPixeles(item.key, size) },
              useNativeDriver: false,
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
        else {
          props.setPieceMoved(null);
          props.switchPlayer();
        }
      }
    }
  };

  useEffect(() => {
    if (item !== null) pan.setValue({ ...getPositionPixeles(item.key, size) });

    if (piece_moved !== null && item !== null && piece_moved.from === item.key && status == null) {
      Animated.spring(pan, {
        toValue: { ...getPositionPixeles(piece_moved.to, size) },
        useNativeDriver: false,
        velocity: 150,
        restSpeedThreshold: 20,
        restDisplacementThreshold: 15,
      }).start(() => {
        setTimeout(() => movePiece(`${piece_moved.from}x${piece_moved.to}`, item.color, getOpponent(item.color)), 150);
      });
    }
  }, [item, piece_moved]);

  const tryToMove = (p_item) => {
    if (square_selected !== null && status == null && piece_moved == null) {
      if (square_selected.movementsAllowed.includes(p_item.key)) props.setPieceMoved({ from: square_selected.key, to: p_item.key });
      props.setSquareSelected(null);
    }
  };

  const propsAnimated = item != null && isDraggable ? { ...panResponder.panHandlers } : {};

  let transform = pan.getTranslateTransform();

  if (item !== null && item.key == "1h") transform = [{ translateX: sizeSquare * 7 }, { translateY: sizeSquare * 7 }];
  if (item !== null && item.key == "8h") transform = [{ translateX: sizeSquare * 7 }, { translateY: 0 }];

  return (
    <>
      <Animated.View
        {...propsAnimated}
        style={
          item !== null && isDraggable
            ? [{ transform: transform }, { position: "absolute" }, { zIndex: zIndex }]
            : item !== null
            ? [{ left: getPositionPixeles(item.key, size).x, top: getPositionPixeles(item.key, size).y }, { position: "absolute" }]
            : {}
        }
      >
        {item !== null && (
          <TouchableOpacity activeOpacity={1} onPress={() => (!isDraggable ? tryToMove(item) : null)}>
            <View style={{ ...styles.itemDraggable, width: size, height: size }}>{props.children}</View>
          </TouchableOpacity>
        )}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({ itemDraggable: { overflow: "hidden" } });

const getPositionPixeles = (key, size) => ({ x: tPosSN(key).y * size, y: 7 * size - tPosSN(key).x * size });

function mapStateToProps(state, props) {
  return {
    square_selected: state.match.square_selected,
    status: state.match.status,
    piece_moved: state.match.piece_moved,
    sizeSquare: state.visual.sizeSquare,
    flip: state.config.flip,
  };
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSquareSelected: match.setSquareSelected,
  switchPlayer: match.switchPlayer,
  setDataFinished: match.setDataFinished,
  setPawnPromotionPosition: match.setPawnPromotionPosition,
  setPieceMoved: match.setPieceMoved,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);

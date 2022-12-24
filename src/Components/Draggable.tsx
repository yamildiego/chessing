import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, PanResponder, View, TouchableOpacity, Text } from "react-native";

import { connect } from "react-redux";

import * as match from "../Actions/match";

import Chess, { tPosNS, tPosSN, Color } from "yd-chess-lib";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Draggable = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const { item, square_selected, size, isDraggable, pieceMoved, status } = props;

  const getOpponent = (color: Color) => (color == Color.WHITE ? Color.BLACK : Color.WHITE);

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      pan.setOffset({ ...getPositionPixeles(item.key, size) });
      if (square_selected !== null && item !== null && Chess.getInstance().isCasteling(square_selected.key, item.key)) tryToMove(item);
      else if (
        square_selected == null ||
        (square_selected !== null && square_selected.color === item.color && square_selected.key !== item.key)
      )
        props.setSquareSelected(item);
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
      listener: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
      },
    }),
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
    Chess.getInstance().move(p_movement);
    props.setSquareSelected(null);
    if (Chess.getInstance().hasToPromoteAPawn()) props.setPawnPromotionPosition(p_movement);
    else {
      let isInCheckMate = Chess.getInstance().isInCheckMate(colorOpponent);
      let isDraw = Chess.getInstance().isDraw(colorOpponent);
      if (isDraw != null) props.setDataFinished({ status: isDraw, winner: "none", modal_visible: true });
      if (isInCheckMate) props.setDataFinished({ status: "Checkmate", winner: colorCurrentPlayer, modal_visible: true });
      else props.switchPlayer();
    }
  };

  useEffect(() => {
    if (item !== null) pan.setValue({ ...getPositionPixeles(item.key, size) });

    if (pieceMoved !== null && item !== null && pieceMoved.from === item.key && status == null) {
      Animated.spring(pan, {
        toValue: { ...getPositionPixeles(pieceMoved.to, size) },
        useNativeDriver: false,
        velocity: 150,
        restSpeedThreshold: 20,
        restDisplacementThreshold: 15,
      }).start(() => {
        setTimeout(() => {
          movePiece(`${pieceMoved.from}x${pieceMoved.to}`, item.color, getOpponent(item.color));
        }, 150);
      });
    }
  }, [item, pieceMoved]);

  const tryToMove = (p_item) => {
    if (square_selected !== null && status == null) {
      if (square_selected.movementsAllowed.includes(p_item.key))
        movePiece(`${square_selected.key}x${p_item.key}`, square_selected.color, getOpponent(square_selected.color));
      props.setSquareSelected(null);
    }
  };

  const propsAnimated = item != null && isDraggable ? { ...panResponder.panHandlers } : {};

  return (
    <>
      <Animated.View
        {...propsAnimated}
        style={
          item !== null && isDraggable
            ? [{ transform: pan.getTranslateTransform() }, { position: "absolute" }, { zIndex: zIndex }]
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
  };
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSquareSelected: match.setSquareSelected,
  switchPlayer: match.switchPlayer,
  setDataFinished: match.setDataFinished,
  setPawnPromotionPosition: match.setPawnPromotionPosition,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);

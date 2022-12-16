import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, PanResponder, View, TouchableOpacity, Text, Easing, Dimensions } from "react-native";

import { connect } from "react-redux";
import * as game from "../Actions/game";
import Chess, { tPosNS, tPosSN } from "yd-chess-lib";
var { width, height } = Dimensions.get("window");

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Draggable = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const { item, selected, size, isDraggable, pieceMoved } = props;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      pan.setOffset({ ...getPositionPixeles(item.key, size) });
      if (selected == null || (selected !== null && selected.color === item.color && selected.key !== item.key)) props.setSelected(item);
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
      listener: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
      },
    }),
    onPanResponderRelease: (evt, gestureState) => {
      setZIndex(1);
      if (selected !== null && selected.key == item.key) {
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
        if (item !== null && item.movementsAllowed.includes(newPositionText)) {
          Animated.spring(pan, {
            toValue: { ...getPositionPixeles(newPositionText, size) },
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            Chess.getInstance().move(`${item.key}x${newPositionText}`);
            props.setSelected(null);
            props.switchPlayer();
          }, 150);
        } else {
          let positionTest = { x: 8 - positionMovedY, y: positionMovedX };

          // if ramdom error that give the current coordinates instad of give the pixelesMoved set in the same spot wothout effect
          if (positionTest.y == position.y) {
            pan.setValue({ ...getPositionPixeles(item.key, size) });
          } else {
            if (item.key !== newPositionText) props.setSelected(null);

            Animated.spring(pan, {
              toValue: { ...getPositionPixeles(item.key, size) },
              useNativeDriver: false,
            }).start();
          }
        }
      }
    },
  });

  useEffect(() => {
    if (item !== null) pan.setValue({ ...getPositionPixeles(item.key, size) });

    if (pieceMoved !== null && item !== null && pieceMoved.from === item.key) {
      Animated.spring(pan, {
        toValue: { ...getPositionPixeles(pieceMoved.to, size) },
        useNativeDriver: false,
        velocity: 150,
        restSpeedThreshold: 20,
        restDisplacementThreshold: 15,
      }).start(() => {
        setTimeout(() => {
          Chess.getInstance().move(`${pieceMoved.from}x${pieceMoved.to}`);
          props.setSelected(null);
          props.switchPlayer();
        }, 150);
      });
    }
  }, [item, pieceMoved]);

  const tryToMove = (p_item) => {
    if (selected !== null) {
      if (selected.movementsAllowed.includes(p_item.key)) {
        Chess.getInstance().move(`${selected.key}x${p_item.key}`);
        props.switchPlayer();
      }
      props.setSelected(null);
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
    selected: state.game.selected,
  };
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSelected: game.setSelected,
  switchPlayer: game.switchPlayer,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);

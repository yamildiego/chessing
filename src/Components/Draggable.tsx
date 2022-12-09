import React, { useState, useEffect, useRef, useMemo } from "react";
import { StyleSheet, Animated, PanResponder, View, TouchableOpacity, Text, Easing, Dimensions } from "react-native";

import { connect } from "react-redux";
import * as game from "../Actions/game";
import Chess, { tPosNS, tPosSN } from "yd-chess-lib";
var { width, height } = Dimensions.get("window");

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Draggable = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const { item, selected } = props;
  const oldItemRef = useRef();

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      pan.setOffset({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
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
        let positionMovedX = Math.round(x._value / 45);
        let positionMovedY = Math.round(y._value / 45);

        // current position and new position
        let position = tPosSN(item.key);
        let newPosition = { x: position.y + positionMovedX, y: position.x - positionMovedY };
        let newPositionText = translatePositionNumberToText(newPosition);

        let canMove = false;

        pan.flattenOffset();

        //evaluate if its allow to move at the new squeare
        if (item !== null && item.movementsAllowed.includes(newPositionText)) {
          Animated.spring(pan, {
            toValue: { x: getPosition(newPositionText).x * 45, y: getPositionPixeles(newPositionText).y },
            useNativeDriver: false,
          }).start();
          setTimeout(() => {
            Chess.getInstance().move(`${item.key}x${newPositionText}`);
            props.setSelected(null);
          }, 150);
        } else {
          let positionTest = { x: 8 - positionMovedY, y: positionMovedX };

          // if ramdom error that give the current coordinates instad of give the pixelesMoved set in the same spot wothout effect
          if (positionTest.y == position.y) {
            pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
          } else {
            if (item.key !== newPositionText) props.setSelected(null);

            Animated.spring(pan, {
              toValue: { x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y },
              useNativeDriver: false,
            }).start();
          }
        }
      }
    },
  });

  useEffect(() => {
    if (item !== null && (oldItemRef.current == undefined || oldItemRef.current == null))
      pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });

    if (item !== null && oldItemRef.current !== null && oldItemRef.current !== undefined && item.color !== oldItemRef.current.color)
      pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });

    oldItemRef.current = item;
  }, [item]);

  const isDraggable = item !== null && item.color === "W";

  const tryToMove = (p_item) => {
    if (selected !== null) {
      if (selected.movementsAllowed.includes(p_item.key)) Chess.getInstance().move(`${selected.key}x${p_item.key}`);
      props.setSelected(null);
    }
  };

  return (
    <>
      {item !== null && isDraggable && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[{ transform: pan.getTranslateTransform() }, { position: "absolute" }, { zIndex: zIndex }]}
        >
          <View style={styles.itemDraggable}>{props.children}</View>
        </Animated.View>
      )}

      {item !== null && !isDraggable && (
        <View style={[{ left: getPosition(item.key).x * 45, top: getPositionPixeles(item.key).y }, { position: "absolute" }]}>
          <TouchableOpacity onPress={() => tryToMove(item)}>
            <View style={styles.itemDraggable}>{props.children}</View>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  itemDraggable: {
    width: 46,
    height: 46,
    overflow: "hidden",
  },
});

const getPosition = (key) => ({ x: key.substring(1, 2).charCodeAt(0) - 97, y: parseInt(key.substring(0, 1)) - 1 });
const getPositionPixeles = (key) => ({ x: getPosition(key).x * 45, y: 365 - getPosition(key).y * 45 });

const translatePositionNumberToText = (position) => {
  let y = position.y;
  let x = position.x;
  if (position.y < 0) y = 0;
  if (position.y > 7) y = 7;
  if (position.x < 0) x = 0;
  if (position.x > 7) x = 7;

  return `${y + 1}${letters[x]}`;
};

function mapStateToProps(state, props) {
  return {
    selected: state.game.selected,
  };
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
  setSelected: game.setSelected,
};

export default connect(mapStateToProps, mapDispatchToProps)(Draggable);

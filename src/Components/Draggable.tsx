import React, { useState, useEffect, useRef, useMemo } from "react";
import { StyleSheet, Animated, PanResponder, View, Text, Easing, Dimensions } from "react-native";

import { connect } from "react-redux";
import * as game from "../Actions/game";
import Chess, { tPosNS, tPosSN } from "yd-chess-lib";
var { width, height } = Dimensions.get("window");

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Draggable = (props) => {
  const [zIndex, setZIndex] = useState(0);
  const { item, selected } = props;

  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      // pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
      pan.setOffset({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
      if (selected == null || (selected !== null && selected.color === item.color && selected.key !== item.key)) props.setSelected(item);
      // if (selected == null || (selected !== null && selected.color === item.color && selected.key !== item.key)) {
      // } else {
      //   if (selected.color !== item.color) Chess.getInstance().move(`${selected.key}x${item.key}`);
      //   //   //chequear si esta en los movimientos permidodos
      //   props.setSelected(null);
      // }
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
      listener: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
      },
    }),
    onPanResponderRelease: (evt, gestureState) => {
      setZIndex(1);
      const { pageX, pageY } = evt.nativeEvent;
      let x = { ...pan.x };
      let y = { ...pan.y };
      let positionMovedX = Math.round(x._value / 45);
      let positionMovedY = Math.round(y._value / 45);
      let pixelesMovidosX = positionMovedX * 45;
      let pixelesMovidosY = positionMovedY * 45;
      let position = tPosSN(item.key);
      let newPosition = { x: position.y + positionMovedX, y: position.x - positionMovedY };
      let canMove = false;
      let newPositionText = translatePositionNumberToText(newPosition);
      pan.flattenOffset();
      if (item !== null && item.movementsAllowed.includes(newPositionText)) canMove = true;
      if (item.key !== newPositionText && canMove === true) {
        Animated.spring(pan, {
          toValue: { x: getPosition(newPositionText).x * 45, y: getPositionPixeles(newPositionText).y },

          useNativeDriver: false,
        }).start();
        setTimeout(() => {
          Chess.getInstance().move(`${item.key}x${newPositionText}`);
          props.setSelected(null);
        }, 150);
      } else {
        if (item.key == newPositionText) {
          pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
        } else {
          Animated.spring(pan, {
            toValue: { x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y },
            useNativeDriver: false,
          }).start(() => {
            props.setSelected(null);
          });
        }
      }
    },
    // onPanResponderTerminate: () => {
    //   if (Math.abs(pan.x._value) === 0) {
    //     props.setSelected(item);
    //   }
    // },
  });

  useEffect(() => {
    if (item !== null) {
      // console.log("ME EJECUTO");
      // console.log(item);
      // [].setValue(0);
      // Animated.spring(pan, {
      //   toValue: { x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y },
      //   useNativeDriver: false,
      // }).start();
      pan.setValue({ x: getPosition(item.key).x * 45, y: getPositionPixeles(item.key).y });
    }
  }, [item]);

  // , selected

  return (
    <>
      {item !== null && (
        <Animated.View
          {...panResponder.panHandlers}
          style={[{ transform: pan.getTranslateTransform() }, { position: "absolute" }, { zIndex: zIndex }]}
        >
          <View style={styles.itemDraggable}>{props.children}</View>
        </Animated.View>
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

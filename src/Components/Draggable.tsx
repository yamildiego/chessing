import React, { useState, useEffect, useRef, useMemo } from "react";
import { StyleSheet, Animated, PanResponder, View, Text } from "react-native";
import { connect } from "react-redux";
import * as game from "../Actions/game";
import Chess, { tPosNS, tPosSN } from "yd-chess-lib";

const letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const Draggable = (props) => {
  const animatedView = useRef();
  const [zIndex, setZIndex] = useState(0);
  const { pieces, position } = props;

  const pan = useRef(new Animated.ValueXY());
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setZIndex(1);
      props.setSelected(props.item);
    },
    onPanResponderMove: Animated.event([null, { dx: pan.current.x, dy: pan.current.y }], {
      useNativeDriver: false,
      listener: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
      },
    }),
    onPanResponderRelease: (evt, gestureState) => {
      setZIndex(0);
      const { pageX, pageY } = evt.nativeEvent;

      let x = { ...pan.current.x };
      let y = { ...pan.current.y };

      let positionMovedX = Math.round(x._value / 45);
      let positionMovedY = Math.round(y._value / 45);

      let pixelesMovidosX = positionMovedX * 45;
      let pixelesMovidosY = positionMovedY * 45;

      let position = tPosSN(props.item.key);
      let newPosition = { x: position.y + positionMovedX, y: position.x - positionMovedY };

      pan.current.flattenOffset();

      let canMove = false;

      let newPositionText = translatePositionNumberToText(newPosition);

      if (props.item !== null && props.item.movementsAllowed.includes(newPositionText)) canMove = true;

      props.setSelected(null);
      if (props.item.key !== newPositionText && canMove === true) {
        Chess.getInstance().move(`${props.item.key}x${newPositionText}`);
      } else {
        Animated.spring(pan.current, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  let panStyle = { transform: pan.current.getTranslateTransform() };

  useEffect(() => {
    pan.current.setValue({ x: 0, y: 0 });
    pan.current.setOffset({ x: 0, y: 0 });
  }, [props.item]);

  return (
    <>
      {props.item !== null && (
        <Animated.View
          {...panResponder.panHandlers}
          ref={animatedView}
          style={[
            panStyle,
            { position: "absolute" },
            { left: getPositionPixeles(props.item.key).x, top: getPositionPixeles(props.item.key).y },
            { zIndex: zIndex },
          ]}
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

import React, { Component, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { connect } from "react-redux";

import { FontAwesome5 } from "@expo/vector-icons";
import { TypeOfPiece, Color } from "yd-chess-lib";

const pieces = {
  [TypeOfPiece.PAWN]: "chess-pawn",
  [TypeOfPiece.ROOK]: "chess-rook",
  [TypeOfPiece.KNIGHT]: "chess-knight",
  [TypeOfPiece.BISHOP]: "chess-bishop",
  [TypeOfPiece.QUEEN]: "chess-queen",
  [TypeOfPiece.KING]: "chess-king",
};

const Piece = (props) => {
  const scaleAnimated = useRef(new Animated.Value(1));

  const animatedStyle = {
    transform: [{ scaleY: scaleAnimated.current }, { scaleX: scaleAnimated.current }],
  };

  const onPress = (color) => {
    if (props.flip == "pieces") {
      if (color === Color.WHITE)
        Animated.timing(scaleAnimated.current, {
          duration: 300,
          toValue: 1,
          useNativeDriver: false,
        }).start();

      if (color === Color.BLACK)
        Animated.timing(scaleAnimated.current, {
          duration: 300,
          toValue: -1,
          useNativeDriver: false,
        }).start();
    }
  };

  useEffect(() => onPress(props.is_playing), [props.is_playing]);

  return (
    <Animated.View style={{ position: "relative", height: props.size, ...animatedStyle }}>
      <Text
        style={{
          position: "absolute",
          width: props.size,
          textAlign: "center",
          left: 1,
          top: props.size * 0.192,
        }}
      >
        <FontAwesome5
          style={{ color: props.piece.color === Color.BLACK ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={props.size * 0.58}
        />
      </Text>
      <Text style={{ position: "absolute", width: props.size, textAlign: "center", top: props.size * 0.192 }}>
        <FontAwesome5
          style={{ color: props.piece.color === Color.WHITE ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={props.size * 0.58}
        />
      </Text>
    </Animated.View>
  );
};

function mapStateToProps(state, props) {
  return {
    is_playing: state.match.is_playing,
    flip: state.config.flip,
  };
}

export default connect(mapStateToProps)(Piece);

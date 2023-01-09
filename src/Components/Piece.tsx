import React, { Component, useRef, useEffect } from "react";
import { View, Text, Animated } from "react-native";
import { connect } from "react-redux";

import { FontAwesome5 } from "@expo/vector-icons";
import { TypeOfPiece, Color } from "yd-chess-lib";

const pieces: { [key: string]: string } = {
  [TypeOfPiece.PAWN]: "chess-pawn",
  [TypeOfPiece.ROOK]: "chess-rook",
  [TypeOfPiece.KNIGHT]: "chess-knight",
  [TypeOfPiece.BISHOP]: "chess-bishop",
  [TypeOfPiece.QUEEN]: "chess-queen",
  [TypeOfPiece.KING]: "chess-king",
};

interface PieceProps {
  is_playing: Color;
  flip: string;
  piece: PieceType;
  size_square: number;
  is_offline: boolean;
  main_player_color: Color;
}

const Piece = (props: PieceProps) => {
  const { size_square, is_offline } = props;
  const scaleAnimated = useRef(new Animated.Value(1));

  const animatedStyle =
    props.flip == "pieces" && is_offline == true
      ? { transform: [{ scaleY: scaleAnimated.current }, { scaleX: scaleAnimated.current }] }
      : (props.is_playing == Color.BLACK && is_offline == true) || (props.main_player_color == Color.BLACK && is_offline == false)
      ? { transform: [{ scaleY: -1 }, { scaleX: -1 }] }
      : {};

  const onPress = (color: Color) => {
    if (color === Color.WHITE)
      Animated.timing(scaleAnimated.current, {
        duration: 100,
        toValue: 1,
        useNativeDriver: true,
        speed: 120,
      }).start();

    if (color === Color.BLACK)
      Animated.timing(scaleAnimated.current, {
        duration: 100,
        toValue: -1,
        useNativeDriver: true,
        speed: 120,
      }).start();
  };

  useEffect(() => onPress(props.is_playing), [props.is_playing]);

  return (
    <Animated.View style={{ position: "relative", height: size_square, ...animatedStyle }}>
      <Text
        style={{
          position: "absolute",
          width: size_square,
          textAlign: "center",
          left: 1,
          top: size_square * 0.192,
        }}
      >
        <FontAwesome5
          style={{ color: props.piece.color === Color.BLACK ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={size_square * 0.58}
        />
      </Text>
      <Text style={{ position: "absolute", width: size_square, textAlign: "center", top: size_square * 0.192 }}>
        <FontAwesome5
          style={{ color: props.piece.color === Color.WHITE ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={size_square * 0.58}
        />
      </Text>
    </Animated.View>
  );
};

function mapStateToProps(state: StateType) {
  return {
    is_playing: state.match.is_playing,
    flip: state.config.flip,
    size_square: state.visual.size_square,
    is_offline: state.online.code == null,
    main_player_color: state.online.main_player_color,
  };
}

export default connect(mapStateToProps)(Piece);

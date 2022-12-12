import React, { Component } from "react";
import { View, Text } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { TypeOfPiece } from "yd-chess-lib";

const pieces = {
  [TypeOfPiece.PAWN]: "chess-pawn",
  [TypeOfPiece.ROOK]: "chess-rook",
  [TypeOfPiece.KNIGHT]: "chess-knight",
  [TypeOfPiece.BISHOP]: "chess-bishop",
  [TypeOfPiece.QUEEN]: "chess-queen",
  [TypeOfPiece.KING]: "chess-king",
};

const Piece = (props) => {
  return (
    <View style={{ position: "relative", height: props.size }}>
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
          style={{ color: props.piece.color === "B" ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={props.size * 0.58}
        />
      </Text>
      <Text style={{ position: "absolute", width: props.size, textAlign: "center", top: props.size * 0.192 }}>
        <FontAwesome5
          style={{ color: props.piece.color === "W" ? "white" : "black" }}
          name={pieces[props.piece.type]}
          size={props.size * 0.58}
        />
      </Text>
    </View>
  );
};

export default Piece;

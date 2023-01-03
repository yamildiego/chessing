import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

let row = ["a", "b", "c", "d", "e", "f", "g", "h"];
let board = [row, row, row, row, row, row, row, row];

const initialState = {
  board,
};

export default function game(state = initialState, action: { type: string; value: any }) {
  const newState = cloneDeep(state);
  switch (action.type) {
    default:
      return state;
  }
}

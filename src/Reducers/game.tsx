import cloneDeep from "lodash/cloneDeep";
import * as TYPES from "./types";

let row = { a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null };
let board = { 8: row, 7: row, 6: row, 5: row, 4: row, 3: row, 2: row, 1: row };

const initialState = {
  board,
};

export default function game(state = initialState, action = {}) {
  const newState = cloneDeep(state);
  switch (action.type) {
    default:
      return state;
  }
}

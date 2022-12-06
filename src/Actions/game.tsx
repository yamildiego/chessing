import * as TYPES from "../Reducers/types";

export const setSelected = (value) => ({
  type: TYPES.SET_SELECTED,
  value,
});

export const setShowLegalMoves = (value) => ({
  type: TYPES.SET_SHOW_LEGAL_MOVES,
  value,
});

export const setTimePerPlayer = (value) => ({
  type: TYPES.SET_TIME_PER_PLAY,
  value,
});

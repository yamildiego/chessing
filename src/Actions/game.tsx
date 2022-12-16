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

export const switchPlayer = () => ({
  type: TYPES.SWITCH_PLAYER,
});

export const inizializeConfig = () => ({
  type: TYPES.INITIALIZE_CONFIG,
});

export const initializedBoard = () => ({
  type: TYPES.INITIALIZE_BOARD,
});

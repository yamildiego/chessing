import * as TYPES from "../Reducers/types";

export const initializedBoard = () => ({
  type: TYPES.INITIALIZE_BOARD,
});

export const setSquareSelected = (value) => ({
  type: TYPES.SET_SQUARE_SELECTED,
  value,
});

export const switchPlayer = () => ({
  type: TYPES.SWITCH_PLAYER,
});

export const setStatus = (value) => ({
  type: TYPES.SET_STATUS,
  value,
});

export const setWinner = (value) => ({
  type: TYPES.SET_WINNER,
  value,
});

export const setModalVisible = (value) => ({
  type: TYPES.SET_MODAL_VISIBLE,
  value,
});

import { Dispatch } from "redux";
import * as TYPES from "../Reducers/types";

export const inizializeConfig = () => ({ type: TYPES.INITIALIZE_CONFIG });

export const setShowLegalMoves = (value: boolean) => ({ type: TYPES.SET_SHOW_LEGAL_MOVES, value });

export const setFlip = (value: string) => ({ type: TYPES.SET_FLIP, value });

export const setTimePerPlayer = (value: number) => ({ type: TYPES.SET_TIME_PER_PLAY, value });

export const setIsLoading = (value: boolean) => ({ type: TYPES.SET_IS_LOADING, value });

export const createGame = () => {
  return (dispatch: Dispatch) => {
    dispatch(setIsLoading(true));
    let milliseconds = (Math.floor(Math.random() * 10) + 1) * 1000;
    setTimeout(() => {
      dispatch(setIsLoading(false));
    }, milliseconds);
  };
};

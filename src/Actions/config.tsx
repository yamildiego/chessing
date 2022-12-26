import * as TYPES from "../Reducers/types";

export const inizializeConfig = () => ({ type: TYPES.INITIALIZE_CONFIG });

export const setShowLegalMoves = (value) => ({ type: TYPES.SET_SHOW_LEGAL_MOVES, value });

export const setFlip = (value) => ({ type: TYPES.SET_FLIP, value });

export const setTimePerPlayer = (value) => ({ type: TYPES.SET_TIME_PER_PLAY, value });

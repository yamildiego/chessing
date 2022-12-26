import * as TYPES from "../Reducers/types";

export const initializedBoard = () => ({ type: TYPES.INITIALIZE_BOARD });

export const setSquareSelected = (value) => ({ type: TYPES.SET_SQUARE_SELECTED, value });

export const setPieceMoved = (value) => ({ type: TYPES.SET_PIECE_MOVED, value });

export const switchPlayer = () => ({ type: TYPES.SWITCH_PLAYER });

export const setDataFinished = (value) => ({ type: TYPES.SET_DATA_FINISHED, value });

export const setOfferADraw = (value) => ({ type: TYPES.SET_OFFER_A_DRAW, value });

export const setAskForResign = (value) => ({ type: TYPES.SET_ASK_FOR_RESIGN, value });

export const setPawnPromotionPosition = (value) => ({ type: TYPES.SET_PAWN_PROMOTION_POSITION, value });

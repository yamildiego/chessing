import * as TYPES from "../Reducers/types";

import { Color } from "yd-chess-lib";

export const initializedBoard = () => ({ type: TYPES.INITIALIZE_BOARD });

export const setSquareSelected = (value: PieceType | null) => ({ type: TYPES.SET_SQUARE_SELECTED, value });

export const setPieceMoved = (value: { from: string; to: string } | null) => ({ type: TYPES.SET_PIECE_MOVED, value });

export const switchPlayer = () => ({ type: TYPES.SWITCH_PLAYER });

export const setPlayer = (value: Color) => ({ type: TYPES.SET_PLAYER, value });

export const setDataFinished = (value: { status: string | null; winner: string | null; modal_visible: boolean }) => ({
  type: TYPES.SET_DATA_FINISHED,
  value,
});

export const setOfferADraw = (value: boolean) => ({ type: TYPES.SET_OFFER_A_DRAW, value });

export const setAskForResign = (value: boolean) => ({ type: TYPES.SET_ASK_FOR_RESIGN, value });

export const setPawnPromotionPosition = (value: string | null) => ({ type: TYPES.SET_PAWN_PROMOTION_POSITION, value });

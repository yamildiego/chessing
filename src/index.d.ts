type PieceType = {
  key: string;
  color: Color;
  type: TypeOfPiece;
  movementsAllowed: Array<string>;
  neverMoved?: boolean;
};

type PlayerType = {
  id: number;
  device_id: string;
  color: Color;
  last_connection: Date;
};

type StatusType = {
  players: Array<PlayerType>;
  movements: string;
  last_movement: string;
};

type StateType = {
  game: { board: Array<Array<string>> };
  config: { show_legal_moves: boolean; time_per_player: number; flip: string };
  match: {
    square_selected: PieceType | null;
    is_playing: Color;
    piece_moved: { from: string; to: string } | null;
    data_finished: { status: string | null; winner: string | null; modal_visible: boolean };
    offer_a_draw: boolean;
    ask_for_resign: boolean;
    pawn_promotion_position: string | null;
  };
  visual: { windowWidth: number; sizeScreen: number; marginScreen: number; sizeSquare: number };
  online: {
    is_loading: boolean;
    code: string | null;
    status: { players: Array<PlayerType>; history: Array<string>; last_movement: string | null };
  };
};

declare module "*.png";
declare module "*.jpg";

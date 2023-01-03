type PieceType = {
  key: string;
  color: Color;
  type: TypeOfPiece;
  movementsAllowed: Array<string>;
  neverMoved?: boolean;
};

declare module "*.png";
declare module "*.jpg";

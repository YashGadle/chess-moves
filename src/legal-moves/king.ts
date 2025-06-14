import { Board } from "../board";
import { Piece } from "../piece";

export function allKingMoves(piece: Piece) {
  if (piece.type !== "k") throw new Error("wrong piece type!");

  return [];
}

export function isInCheck(board: Board) {
  return false;
}

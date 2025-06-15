import { Board } from "../board";
import { Piece, type Position } from "../piece";
import { allBishopMoves } from "./bishop";
import { allRookMoves } from "./rook";

export function allQueenMoves(
  piece: Piece,
  board: Board,
  checkForPin = false
): Array<Position> {
  const rookMoves = allRookMoves(piece, board, checkForPin);
  const bishopMoves = allBishopMoves(piece, board, checkForPin);
  const moves: Array<Position> = rookMoves.concat(bishopMoves);

  return moves;
}

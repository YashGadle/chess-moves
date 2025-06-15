import { Board } from "../board";
import { Piece } from "../piece";
import { allBishopMoves } from "./bishop";
import { allRookMoves } from "./rook";

export function allQueenMoves(
  piece: Piece,
  board: Board,
  checkForPin = false
): Array<[number, number]> {
  const rookMoves = allRookMoves(piece, board, checkForPin);
  const bishopMoves = allBishopMoves(piece, board, checkForPin);
  const moves: Array<[number, number]> = rookMoves.concat(bishopMoves);

  return moves;
}

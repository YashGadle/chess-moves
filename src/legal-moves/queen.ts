import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "./king";
import {allBishopMoves} from './bishop';
import {allRookMoves} from './rook';

export function allQueenMoves(
  piece: Piece | null,
  board: Board
): Array<[number, number]> {
  if (!piece) return [];

  if (isPinned(piece)) {
    return [];
  }

  const rookMoves = allRookMoves(piece, board);
  const bishopMoves = allBishopMoves(piece, board);
  const moves: Array<[number, number]> = rookMoves.concat(bishopMoves);

  return moves;
}

function isPinned(piece: Piece) {
  //TODO

  return false;
}

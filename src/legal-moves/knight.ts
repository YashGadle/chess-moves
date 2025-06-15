import { Board } from "../board";
import { Piece } from "../piece";

import filterOutPinnedMoves from "../utils/filter-out-pinned-moves";

export function allKnightMoves(
  piece: Piece,
  board: Board,
  checkForPin = false
): Array<[number, number]> {
  const moves: Array<[number, number]> = [];
  const state = board.getBaordState();
  const [m, n] = piece.position;

  // Run through all 8 knight hops
  const knightMoves = [
    [m + 2, n + 1],
    [m + 2, n - 1],
    [m - 2, n + 1],
    [m - 2, n - 1],
    [m + 1, n + 2],
    [m + 1, n - 2],
    [m - 1, n + 2],
    [m - 1, n - 2],
  ];

  knightMoves.forEach(([x, y]) => {
    if (x < 0 || x >= Board.numRow || y < 0 || y >= Board.numCol) return;
    const targetCell = state[x][y];

    if (targetCell.piece === null) {
      moves.push([x, y]);
    } else if (targetCell.piece) {
      if (targetCell.piece.color !== piece.color) {
        moves.push([x, y]);
      }
    }
  });

  if (checkForPin) {
    return filterOutPinnedMoves(piece, board, moves);
  }

  return moves;
}
import { Board } from "../board";
import { Piece, type Position } from "../piece";

import filterOutPinnedMoves from "../utils/filter-out-pinned-moves";

//TODO: en peasant and promotion
export function allPawnMoves(
  pawn: Piece,
  board: Board,
  checkForPin = false
): Array<Position> {
  const moves: Array<Position> = [];
  const state = board.getBoardState();
  const [m, n] = pawn.position;

  const whitePawnMoves: Array<[number, number, boolean]> = [
    [m - 1, n, false],
    [m - 2, n, false],
    [m - 1, n - 1, true],
    [m - 1, n + 1, true],
  ];
  const blackPawnMoves: Array<[number, number, boolean]> = [
    [m + 1, n, false],
    [m + 2, n, false],
    [m + 1, n - 1, true],
    [m + 1, n + 1, true],
  ];
  const pawnMoves = pawn.color === "w" ? whitePawnMoves : blackPawnMoves;

  for (let i = 0; i < pawnMoves.length; i++) {
    const [x, y, capture] = pawnMoves[i];
    if (x < 0 || x >= Board.numRow || y < 0 || y >= Board.numCol) break;
    const targetCell = state[x][y];

    // Normal move
    if (targetCell.piece === null && !capture) {
      moves.push([x, y]);
    } else if (
      targetCell.piece &&
      targetCell.piece.color !== pawn.color &&
      capture
    ) {
      // Capture move
      moves.push([x, y]);
    } else break;;
  }

  if (checkForPin) {
    return filterOutPinnedMoves(pawn, board, moves);
  }

  return moves;
}

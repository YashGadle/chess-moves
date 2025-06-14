import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "./king";

//TODO: en peasant and promotion
export function allPawnMoves(
  pawn: Piece | null,
  board: Board
): Array<[number, number]> {
  if (!pawn) return [];

  if (isPinned(pawn)) {
    return [];
  }

  const moves: Array<[number, number]> = [];
  const state = board.state;
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

  pawnMoves.forEach(([x, y, capture]) => {
    if (x < 0 || x >= Board.numRow || y < 0 || y >= Board.numCol) return;
    const targetCell = state[x][y];

    // Normal move
    if (targetCell.piece === null && !capture) {
      moves.push([x, y]);
    } else if (targetCell.piece && targetCell.piece.color !== pawn.color && capture) {
      // Capture move
      moves.push([x, y]);
    }
  });

  return moves;
}

function isPinned(piece: Piece) {
  //TODO

  return false;
}

import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "./king";

export function allBishopMoves(
  piece: Piece | null,
  board: Board
): Array<[number, number]> {
  if (!piece) return [];

  if (isPinned(piece)) {
    return [];
  }

  const moves: Array<[number, number]> = [];
  const state = board.state;
  const [m, n] = piece.position;

  // Run through all 4 diagonals of the bishop
  for (
    var i = m + 1, j = n + 1;
    i < Board.numRow && j < Board.numCol;
    i++, j++
  ) {
    if (state[i][j].piece === null) {
      moves.push([i, j]);
    } else if (state[i][j].piece !== null) {
      if (state[i][j].piece?.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break;
    }
  }
  for (var i = m - 1, j = n - 1; i >= 0 && j >= 0; i--, j--) {
    if (state[i][j].piece === null) {
      moves.push([i, j]);
    } else if (state[i][j].piece !== null) {
      if (state[i][j].piece?.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break;
    }
  }
  for (var i = m + 1, j = n - 1; i < Board.numRow && j >= 0; i++, j--) {
    if (state[i][j].piece === null) {
      moves.push([i, j]);
    } else if (state[i][j].piece !== null) {
      if (state[i][j].piece?.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break;
    }
  }
  for (var i = m - 1, j = n + 1; i >= 0 && j < Board.numCol; i--, j++) {
    if (state[i][j].piece === null) {
      moves.push([i, j]);
    } else if (state[i][j].piece !== null) {
      if (state[i][j].piece?.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break;
    }
  }

  return moves;
}

function isPinned(piece: Piece) {
  //TODO

  return false;
}

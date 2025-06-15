import { Board } from "../board";
import { Piece } from "../piece";
import filterOutPinnedMoves from "../utils/filter-out-pinned-moves";

export function allRookMoves(
  piece: Piece,
  board: Board,
  checkForPin = false
): Array<[number, number]> {
  const moves: Array<[number, number]> = [];
  const state = board.getBoardState();
  const [m, n] = piece.position;

  // Run through all vertical and horizontal directions
  for (let i = m + 1, j = n; i < Board.numRow; i++) {
    const targetCell = state[i][j];

    if (targetCell.piece === null) {
      moves.push([i, j]);
    } else if (targetCell.piece) {
      if (targetCell.piece.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break; // Stop if we hit a piece of the same color
    }
  }
  for (let i = m - 1, j = n; i >= 0; i--) {
    const targetCell = state[i][j];

    if (targetCell.piece === null) {
      moves.push([i, j]);
    } else if (targetCell.piece) {
      if (targetCell.piece.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break; // Stop if we hit a piece of the same color
    }
  }
  for (let i = m, j = n + 1; j < Board.numCol; j++) {
    const targetCell = state[i][j];

    if (targetCell.piece === null) {
      moves.push([i, j]);
    } else if (targetCell.piece) {
      if (targetCell.piece.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break; // Stop if we hit a piece of the same color
    }
  }
  for (let i = m, j = n - 1; j >= 0; j--) {
    const targetCell = state[i][j];

    if (targetCell.piece === null) {
      moves.push([i, j]);
    } else if (targetCell.piece) {
      if (targetCell.piece.color !== piece.color) {
        moves.push([i, j]);
        break;
      } else break; // Stop if we hit a piece of the same color
    }
  }

  if (checkForPin) {
    return filterOutPinnedMoves(piece, board, moves);
  }

  return moves;
}
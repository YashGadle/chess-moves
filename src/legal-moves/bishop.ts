import { Board } from "../board";
import { Piece, type Position } from "../piece";

import filterOutPinnedMoves from "../utils/filter-out-pinned-moves";

/**
 * Finds all moves that a bishop can make on the board.
 * @param piece 
 * @param board 
 * @param checkForPin If true, the function will check if the bishop is pinned and filter out moves that would leave the king in check.
 *                    If false, it will return all possible moves without checking for pin.
 *                    A pinned piece cannot move without putting its king in check.
 * @returns All legal moves for the bishop.
 */
export function allBishopMoves(
  piece: Piece,
  board: Board,
  checkForPin = false
): Array<Position> {
  const moves: Array<Position> = [];
  const state = board.getBoardState();
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

  if (checkForPin) {
    return filterOutPinnedMoves(piece, board, moves);
  }

  return moves;
}

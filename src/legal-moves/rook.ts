import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "./king";

export function allRookMoves(
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

  // TODO: Filter out moves that would leave the king in check
  //   moves = moves.filter(([x, y]) => {
  //     const originalPiece = state[x][y].piece;
  //     state[x][y].piece = piece; // Place the knight temporarily
  //     state[piece.position[0]][piece.position[1]].piece = null; // Remove the knight from its original position
  //     const inCheck = isInCheck(board);
  //     state[x][y].piece = originalPiece; // Restore the original piece
  //     state[piece.position[0]][piece.position[1]].piece = piece; // Restore the knight to its original position
  //     return !inCheck;
  //   });

  return moves;
}

function isPinned(piece: Piece) {
  //TODO

  return false;
}

import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "./king";

export function allKnightMoves(
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

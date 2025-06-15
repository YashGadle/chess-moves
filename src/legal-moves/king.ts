import { Board } from "../board";
import { Piece, type Position } from "../piece";
import filterOutPinnedMoves from "../utils/filter-out-pinned-moves";

export function allKingMoves(piece: Piece, board: Board): Array<Position> {
  const [m, n] = piece.position;
  const moves: Array<Position> = [];
  const kingMoves = [
    [m + 1, n], // down
    [m - 1, n], // up
    [m, n + 1], // right
    [m, n - 1], // left
    [m + 1, n + 1], // down-right
    [m + 1, n - 1], // down-left
    [m - 1, n + 1], // up-right
    [m - 1, n - 1], // up-left
  ];

  const state = board.getBoardState();

  kingMoves.forEach(([x, y]) => {
    if (x < 0 || x >= Board.numRow || y < 0 || y >= Board.numCol) return;
    const targetCell = state[x][y];
    if (targetCell.piece === null || targetCell.piece.color !== piece.color) {
      moves.push([x, y]);
    }
  });

  return filterOutPinnedMoves(piece, board, moves);
}

export function isInCheck(color: "w" | "b", board: Board): boolean {
  const [kingX, kingY] = getKingPosition(board, color);
  const state = board.getBoardState();
  const opponentColor = state[kingX][kingY].piece?.color === "w" ? "b" : "w";
  const opponentPieces = state.flatMap((row) =>
    row
      .filter((cell) => cell.piece && cell.piece.color === opponentColor)
      .map((cell) => cell.piece)
  );
  for (const piece of opponentPieces) {
    if (!piece) continue; // Skip if the piece is null
    const legalMoves = piece.getLegalMoves(board, false); // no need to check for pins here
    if (legalMoves.some((move) => move[0] === kingX && move[1] === kingY)) {
      return true; // The king is in check
    }
  }
  // If no opponent piece can attack the king's position, return false
  return false;
}

const getKingPosition = (board: Board, color: "w" | "b"): [number, number] => {
  for (let i = 0; i < Board.numRow; i++) {
    for (let j = 0; j < Board.numCol; j++) {
      const cell = board.getBoardState()[i][j];
      if (cell.piece && cell.piece.type === "k" && cell.piece.color === color) {
        return [i, j]; // Return the position of the king
      }
    }
  }
  throw new Error(`King of color ${color} not found on the board.`);
};

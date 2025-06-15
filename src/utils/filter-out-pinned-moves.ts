import { Board } from "../board";
import { Piece } from "../piece";
import { isInCheck } from "../legal-moves/king";

/**
 * A piece can be pinned if it cannot move without putting its king in check.
 * This function filters out moves that would leave the king in check.
 * (Might not be needed for training the model because it can end the game)
 * @param piece
 * @param board
 * @param moves
 * @returns moves that do not leave the king in check
 */
export default (
  piece: Piece,
  board: Board,
  moves: Array<[number, number]>
): Array<[number, number]> => {
  const [m, n] = piece.position;

  return moves.filter(([x, y]) => {
    board.movePiece([m, n], [x, y], piece); // Move the piece to the new position
    const isPinned = isInCheck(piece.color, board); // Check if the king is in check after the move
    board.movePiece([x, y], [m, n], piece); // Move back to original position
    if (isPinned) {
      return false; // Skip moves that would leave the king in check
    }
    return true;
  });
};

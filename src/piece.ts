import bishop_w from "./assets/bishop_w.svg";
import bishop_b from "./assets/bishop_b.svg";
import knight_w from "./assets/knight_w.svg";
import knight_b from "./assets/knight_b.svg";
import king_w from "./assets/king_w.svg";
import king_b from "./assets/king_b.svg";
import queen_w from "./assets/queen_w.svg";
import queen_b from "./assets/queen_b.svg";
import rook_w from "./assets/rook_w.svg";
import rook_b from "./assets/rook_b.svg";
import pawn_w from "./assets/pawn_w.svg";
import pawn_b from "./assets/pawn_b.svg";

import { Board } from "./board";
import { allPawnMoves } from "./legal-moves/pawn";
import { allQueenMoves } from "./legal-moves/queen";
import { allRookMoves } from "./legal-moves/rook";
import { allBishopMoves } from "./legal-moves/bishop";
import { allKnightMoves } from "./legal-moves/knight";

export type PieceColor = "w" | "b";
export type PieceType = "p" | "r" | "b" | "n" | "q" | "k";
export type Position = [number, number];
export type Promotion = Exclude<PieceType, "p"> | null;

export class Piece {
  color;
  type;
  position;
  lost;
  promotion: Promotion; // probably not needed

  constructor(type: PieceType, color: PieceColor, position: Position) {
    this.color = color; // black pieces or white pieces
    this.type = type; // bishop, knight, rook etc...
    this.position = position; // coordinate [0, 1]
    this.lost = false; // is the piece captured
    this.promotion = null; // only for pawns
    this.getLegalMoves = this.getLegalMoves.bind(this);
  }

  private getPieceImageFromTypeAndColor(type: PieceType, color: PieceColor) {
    if (color === "w") {
      switch (type) {
        case "r":
          return rook_w;
        case "n":
          return knight_w;
        case "b":
          return bishop_w;
        case "q":
          return queen_w;
        case "k":
          return king_w;
        case "p":
          return pawn_w;
        default:
          return "";
      }
    } else {
      switch (type) {
        case "r":
          return rook_b;
        case "n":
          return knight_b;
        case "b":
          return bishop_b;
        case "q":
          return queen_b;
        case "k":
          return king_b;
        case "p":
          return pawn_b;
        default:
          return "";
      }
    }
  }

  renderPiece() {
    const piece = this.getPieceImageFromTypeAndColor(this.type, this.color);
    const pieceNode = document.createElement("img");
    pieceNode.src = piece;
    pieceNode.width = 60;
    pieceNode.height = 60;
    return pieceNode;
  }

  getLegalMoves = (board: Board, checkForPin = false): Array<Position> => {
    switch (this.type) {
      case "p":
        const legalPawnMoves = allPawnMoves(this, board, checkForPin);
        return legalPawnMoves;
      case "q":
        const legalQueenMoves = allQueenMoves(this, board, checkForPin);
        return legalQueenMoves;
      case "n":
        const legalKnightMoves = allKnightMoves(this, board, checkForPin);
        return legalKnightMoves;
      case "r":
        const legalRookMoves = allRookMoves(this, board, checkForPin);
        return legalRookMoves;
      case "b":
        const legalBishopMoves = allBishopMoves(this, board, checkForPin);
        return legalBishopMoves;
      default:
        console.log("Piece type not implemented or not recognized.");
        return [];
    }
  };

  promotePawn(newType: Promotion) {
    // TODO full implementation of pawn promotion

    if (this.type !== "p") {
      throw new Error("Only pawns can be promoted");
    }
    if (!newType || !["r", "n", "b", "q"].includes(newType)) {
      throw new Error("Invalid promotion type");
    }
    this.type = newType;
    this.promotion = newType;
  }
}

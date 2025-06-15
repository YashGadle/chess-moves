import { Piece, type Position } from "./piece";
import coordinatesToNotations from "./utils/coordinates-to-notations";
import { parseFEN, isLowerCase, type parsedFEN } from "./utils/parse-fen";

export type State = Array<Array<Cell>>;

export class Board {
  private state: State; // 2d array of Cells.
  static numRow = 8;
  static numCol = 8;

  constructor(parsedBoard: parsedFEN | null) {
    if (parsedBoard) {
      this.state = parsedBoard.board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (cell === "") {
            return new Cell(null, (rowIndex + colIndex) % 2 === 0 ? "w" : "b");
          } else if (isLowerCase(cell)) {
            const piece = new Piece(cell, "b", [rowIndex, colIndex]);
            return new Cell(piece, (rowIndex + colIndex) % 2 === 0 ? "w" : "b");
          } else {
            const piece = new Piece(cell.toLowerCase(), "w", [
              rowIndex,
              colIndex,
            ]);
            return new Cell(piece, (rowIndex + colIndex) % 2 === 0 ? "w" : "b");
          }
        })
      );
      return;
    }
    this.state = [
      [
        new Cell(new Piece("r", "b", [0, 0]), "w"),
        new Cell(new Piece("n", "b", [0, 1]), "b"),
        new Cell(new Piece("b", "b", [0, 2]), "w"),
        new Cell(new Piece("q", "b", [0, 3]), "b"),
        new Cell(new Piece("k", "b", [0, 4]), "w"),
        new Cell(new Piece("b", "b", [0, 5]), "b"),
        new Cell(new Piece("n", "b", [0, 6]), "w"),
        new Cell(new Piece("r", "b", [0, 7]), "b"),
      ],
      [
        new Cell(new Piece("p", "b", [1, 0]), "b"),
        new Cell(new Piece("p", "b", [1, 1]), "w"),
        new Cell(new Piece("p", "b", [1, 2]), "b"),
        new Cell(new Piece("p", "b", [1, 3]), "w"),
        new Cell(new Piece("p", "b", [1, 4]), "b"),
        new Cell(new Piece("p", "b", [1, 5]), "w"),
        new Cell(new Piece("p", "b", [1, 6]), "b"),
        new Cell(new Piece("p", "b", [1, 7]), "w"),
      ],
      [
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
      ],
      [
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
      ],
      [
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
      ],
      [
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
        new Cell(null, "b"),
        new Cell(null, "w"),
      ],
      [
        new Cell(new Piece("p", "w", [6, 0]), "w"),
        new Cell(new Piece("p", "w", [6, 1]), "b"),
        new Cell(new Piece("p", "w", [6, 2]), "w"),
        new Cell(new Piece("p", "w", [6, 3]), "b"),
        new Cell(new Piece("p", "w", [6, 4]), "w"),
        new Cell(new Piece("p", "w", [6, 5]), "b"),
        new Cell(new Piece("p", "w", [6, 6]), "w"),
        new Cell(new Piece("p", "w", [6, 7]), "b"),
      ],
      [
        new Cell(new Piece("r", "w", [7, 0]), "b"),
        new Cell(new Piece("n", "w", [7, 1]), "w"),
        new Cell(new Piece("b", "w", [7, 2]), "b"),
        new Cell(new Piece("q", "w", [7, 3]), "w"),
        new Cell(new Piece("k", "w", [7, 4]), "b"),
        new Cell(new Piece("b", "w", [7, 5]), "w"),
        new Cell(new Piece("n", "w", [7, 6]), "b"),
        new Cell(new Piece("r", "w", [7, 7]), "w"),
      ],
    ];
  }

  getBoardState() {
    return this.state;
  }

  renderBoard() {
    for (var i = 0; i < Board.numRow; i++) {
      for (var j = 0; j < Board.numCol; j++) {
        const board = document.getElementById("board");
        if (!board) break;

        const cell = this.state[i][j];
        const cellNode = cell.renderCellNode();
        cellNode.addEventListener("click", this.onClick.bind(cell));
        board.appendChild(cellNode);
      }
    }
  }

  onClick(this: Cell) {
    if (!this.piece) return;

    console.log(coordinatesToNotations(this.piece.getLegalMoves(board, true)));
  }

  movePiece(
    from: Position,
    to: Position,
    piece: Piece,
    originalPiece: Piece | null = null
  ) {
    const [fromRow, fromCol] = from;
    const [toRow, toCol] = to;

    // Check if the move is valid
    if (
      fromRow < 0 ||
      fromRow >= Board.numRow ||
      fromCol < 0 ||
      fromCol >= Board.numCol ||
      toRow < 0 ||
      toRow >= Board.numRow ||
      toCol < 0 ||
      toCol >= Board.numCol
    ) {
      console.error("Invalid move");
      return;
    }

    const capturedPiece = this.state[toRow][toCol].piece;
    // Move the piece
    this.state[toRow][toCol].piece = piece;
    this.state[fromRow][fromCol].piece = originalPiece;
    return capturedPiece;
  }
}

export class Cell {
  piece: Piece | null;
  color; // the cell color. (different than piece color)

  constructor(piece: Piece | null, color: "w" | "b") {
    this.piece = piece;
    this.color = color;
  }

  renderCellNode() {
    const cellNode = document.createElement("div");
    const pieceNode = this.piece?.renderPiece();

    cellNode.style.width = "64px";
    cellNode.style.height = "64px";
    cellNode.style.display = "flex";
    cellNode.style.justifyContent = "center";
    cellNode.style.alignItems = "center";
    cellNode.id = this.piece?.type + "_" + this.piece?.color;
    if (pieceNode) cellNode.appendChild(pieceNode);

    if (this.color === "w")
      cellNode.style.backgroundColor = "rgba(236, 218, 185, 1)";
    else cellNode.style.backgroundColor = "rgba(174, 138, 104, 1)";

    return cellNode;
  }
}

export function setupChessBoard() {
  board.renderBoard();
}

const params = new URLSearchParams(window.location.search);
const fen = params.get("fen");

const parsedFEN = fen ? parseFEN(fen) : null;

export const board = new Board(parsedFEN);

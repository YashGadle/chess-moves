import { Piece } from "./piece";

export type State = Array<Array<Cell>>;

export class Board {
  state: State; // 2d array of Cells
  numRow = 8;
  numCol = 8;

  constructor() {
    this.state = [
      [
        new Cell(new Piece("r", "b", [0, 0], false), "w"),
        new Cell(new Piece("n", "b", [0, 1], false), "b"),
        new Cell(new Piece("b", "b", [0, 2], false), "w"),
        new Cell(new Piece("q", "b", [0, 3], false), "b"),
        new Cell(new Piece("k", "b", [0, 4], false), "w"),
        new Cell(new Piece("b", "b", [0, 5], false), "b"),
        new Cell(new Piece("n", "b", [0, 6], false), "w"),
        new Cell(new Piece("r", "b", [0, 7], false), "b"),
      ],
      [
        new Cell(new Piece("p", "b", [1, 0], false), "b"),
        new Cell(new Piece("p", "b", [1, 1], false), "w"),
        new Cell(new Piece("p", "b", [1, 2], false), "b"),
        new Cell(new Piece("p", "b", [1, 3], false), "w"),
        new Cell(new Piece("p", "b", [1, 4], false), "b"),
        new Cell(new Piece("p", "b", [1, 5], false), "w"),
        new Cell(new Piece("p", "b", [1, 6], false), "b"),
        new Cell(new Piece("p", "b", [1, 7], false), "w"),
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
        new Cell(new Piece("p", "w", [6, 0], false), "w"),
        new Cell(new Piece("p", "w", [6, 1], false), "b"),
        new Cell(new Piece("p", "w", [6, 2], false), "w"),
        new Cell(new Piece("p", "w", [6, 3], false), "b"),
        new Cell(new Piece("p", "w", [6, 4], false), "w"),
        new Cell(new Piece("p", "w", [6, 5], false), "b"),
        new Cell(new Piece("p", "w", [6, 6], false), "w"),
        new Cell(new Piece("p", "w", [6, 7], false), "b"),
      ],
      [
        new Cell(new Piece("r", "w", [7, 0], false), "b"),
        new Cell(new Piece("n", "w", [7, 1], false), "w"),
        new Cell(new Piece("b", "w", [7, 2], false), "b"),
        new Cell(new Piece("q", "w", [7, 3], false), "w"),
        new Cell(new Piece("k", "w", [7, 4], false), "b"),
        new Cell(new Piece("b", "w", [7, 5], false), "w"),
        new Cell(new Piece("n", "w", [7, 6], false), "b"),
        new Cell(new Piece("r", "w", [7, 7], false), "w"),
      ],
    ];
  }

  renderBoard() {
    for (var i = 0; i < this.numRow; i++) {
      for (var j = 0; j < this.numCol; j++) {
        const board = document.getElementById("board");
        if (!board) break;

        const cell = this.state[i][j];
        const cellNode = cell.renderCellNode();
        cellNode.addEventListener("click", this.onClick.bind(cell));
        board.appendChild(cellNode);
      }
    }
  }

  onClick() {
    console.log(this);
  }
}

export class Cell {
  piece: Piece | null;
  color; // the cell color. (different than pice color)

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
  new Board().renderBoard();
}

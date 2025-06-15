export type parsedFEN = {
  board: any[][];
  activeColor: string;
  castlingRights: {
    whiteKingSide: boolean;
    whiteQueenSide: boolean;
    blackKingSide: boolean;
    blackQueenSide: boolean;
  };
  enPassantTarget: {
    row: number;
    col: number;
    square: string;
  } | null;
  halfmoveClock: number;
  fullmoveNumber: number;
};

export function parseFEN(fen: string) {
  const [
    piecePlacement,
    activeColor,
    castlingStr,
    enPassantStr,
    halfmoveClock,
    fullmoveNumber,
  ] = fen.split(" ");

  // Parse board layout
  const board = piecePlacement.split("/").map((rank) => {
    const row = [];
    for (const char of rank) {
      if (isNaN(Number(char))) {
        row.push(char);
      } else {
        for (let i = 0; i < parseInt(char, 10); i++) {
          row.push("");
        }
      }
    }
    return row;
  });

  // Castling rights
  const castlingRights = {
    whiteKingSide: castlingStr.includes("K"),
    whiteQueenSide: castlingStr.includes("Q"),
    blackKingSide: castlingStr.includes("k"),
    blackQueenSide: castlingStr.includes("q"),
  };

  // En passant target square → convert to coordinates if present
  let enPassantTarget = null;
  if (enPassantStr !== "-") {
    const file = enPassantStr[0];
    const rank = enPassantStr[1];

    const col = file.charCodeAt(0) - "a".charCodeAt(0); // 'a'→0 ... 'h'→7
    const row = 8 - parseInt(rank, 10); // rank 8→row 0, rank 1→row 7

    enPassantTarget = { row, col, square: enPassantStr };
  }

  return {
    board,
    activeColor,
    castlingRights,
    enPassantTarget, // null or { row, col, square: "e3" }
    halfmoveClock: parseInt(halfmoveClock, 10),
    fullmoveNumber: parseInt(fullmoveNumber, 10),
  };
}

export function isLowerCase(str: string) {
  return str === str.toLowerCase();
}

export function isUpperCase(str: string) {
  return str === str.toUpperCase();
}

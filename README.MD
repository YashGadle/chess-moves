**Description**  
A simple tool for generating and analyzing chess moves. This repository provides utilities to validate chess positions, suggest legal moves, and visualize game progress. Ideal for developers building chess-related applications or learning about chess programming.

**Run locally**  
```bash
# Clone the repository
git clone https://github.com/your-username/chess-moves.git
cd chess-moves

# Install dependencies
npm install

# Start the application
npm run dev
```

**Setting up position**  
Go to https://lichess.org/editor, and create your own position. Then copy the FEN value provided below the chess board.

Then run this project locally and go to *http://localhost:5173/?fen=past_value_here* (Must be a valid position).

Clicking on the pieces will trigger a console log showing all the possible legal moves for that position

**TODO**  
1. Checkmate detection
2. Stalemate detection
3. Pawn en passant moves
4. Pawn promotion moves
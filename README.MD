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

Clicking on the pieces will trigger a console log showing all the possible legal moves for that position - ![Image](https://private-user-images.githubusercontent.com/10195795/455250338-42d9757c-8d2e-4d58-b536-cfc98879ea8b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDk5ODU5MDEsIm5iZiI6MTc0OTk4NTYwMSwicGF0aCI6Ii8xMDE5NTc5NS80NTUyNTAzMzgtNDJkOTc1N2MtOGQyZS00ZDU4LWI1MzYtY2ZjOTg4NzllYThiLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTA2MTUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwNjE1VDExMDY0MVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWNiZjk2ZWY5YTliY2FkM2QwMmFlMTQ0MWY5ODM0M2QzNjUzODJkZjZjNDc3ODA1OGI4ZTA4ODU0ZDRmZTBmMzImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.Q65J2-Q1tSyHQZ0U3Q-b8mq2dam1al9IBaQzsGqNa04 "Title") 

**TODO**  
1. Checkmate detection
2. Stalemate detection
3. Pawn en passant moves
4. Pawn promotion moves
import "./style.css";
import { setupChessBoard } from "./board";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>Chess Board</h1>
    <div id="board" class="board-grid">
    </div>
  </div>
`;

setupChessBoard();
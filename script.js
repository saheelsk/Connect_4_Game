

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM fully loaded and parsed');

  const ROWS = 6;
  const COLUMNS = 7;
  const board = document.getElementById('board');
  const winner = document.getElementById('winner');
  const newGameBtn = document.getElementById('new-game');

  console.log('Board element:', board);
  console.log('Winner element:', winner);
  console.log('New Game button:', newGameBtn);

  let currentPlayer = 'R';
  let gameBoard = [];
  let gameOver = false;

  function createBoard() {
      console.log('Creating board');
      board.innerHTML = '';
      gameBoard = Array(ROWS).fill().map(() => Array(COLUMNS).fill(''));
      gameOver = false;
      currentPlayer = 'R';
      winner.innerText = '';

      for (let row = 0; row < ROWS; row++) {
          for (let col = 0; col < COLUMNS; col++) {
              const cell = document.createElement('div');
              cell.classList.add('tile');
              cell.dataset.row = row;
              cell.dataset.col = col;
              cell.addEventListener('click', () => placePiece(col));
              board.appendChild(cell);
          }
      }
      console.log('Board created');
  }

  function placePiece(col) {
      console.log('Placing piece in column:', col);
      if (gameOver) return;

      for (let row = ROWS - 1; row >= 0; row--) {
          if (gameBoard[row][col] === '') {
              gameBoard[row][col] = currentPlayer;
              const cell = board.querySelector(`[data-row="${row}"][data-col="${col}"]`);
              cell.classList.add(currentPlayer === 'R' ? 'red-piece' : 'yellow-piece');
              console.log('Piece placed');

              if (checkWin(row, col)) {
                  winner.innerText = `${currentPlayer === 'R' ? 'Red' : 'Yellow'} Wins!`;
                  gameOver = true;
                  console.log('Game over - winner');
              } else if (checkDraw()) {
                  winner.innerText = "It's a draw!";
                  gameOver = true;
                  console.log('Game over - draw');
              } else {
                  currentPlayer = currentPlayer === 'R' ? 'Y' : 'R';
                  console.log('Switching player to:', currentPlayer);
              }
              break;
          }
      }
  }

  function checkWin(row, col) {
      const directions = [
          [0, 1],  // horizontal
          [1, 0],  // vertical
          [1, 1],  // diagonal down-right
          [1, -1]  // diagonal down-left
      ];

      for (const [dx, dy] of directions) {
          let count = 1;
          count += countDirection(row, col, dx, dy);
          count += countDirection(row, col, -dx, -dy);

          if (count >= 4) {
              console.log('Win detected');
              return true;
          }
      }

      return false;
  }

  function countDirection(row, col, dx, dy) {
      let count = 0;
      let r = row + dx;
      let c = col + dy;

      while (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && gameBoard[r][c] === currentPlayer) {
          count++;
          r += dx;
          c += dy;
      }

      return count;
  }

  function checkDraw() {
      return gameBoard.every(row => row.every(cell => cell !== ''));
  }

  newGameBtn.addEventListener('click', () => {
      console.log('New Game button clicked');
      createBoard();
  });

  console.log('Setting up initial game');
  createBoard();
});



window.addEventListener("DOMContentLoaded", () => {
  const tiles = Array.from(document.querySelectorAll(".box"));
  const resetbutton = document.getElementById("restart");
  const scoreX = document.getElementById("scoreX");
  const scoreO = document.getElementById("scoreO");
  const winner = document.getElementById("winner");
  const winnerAlert = document.getElementById("winAlert");
  const statusWinner = document.getElementById("statuswinner");

  let board = ["", "", "", "", "", "", "", "", ""];
  let currentPlayer = "X";
  let isgameactive = true;
  let couterX = 0;
  let couterO = 0;

  const winconditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function resultValidation() {
    let roundwon = false;
    for (let i = 0; i < winconditions.length; i++) {
      const wincondition = winconditions[i];
      const column1 = board[wincondition[0]];
      const column2 = board[wincondition[1]];
      const column3 = board[wincondition[2]];

      if (column1 === "" || column2 === "" || column3 === "") {
        continue;
      }
      if (column1 === column2 && column2 === column3) {
        roundwon = true;
        break;
      }
    }

    if (roundwon) {
      announce(currentPlayer === "X" ? "PLAYERX_WON" : "PLAYERO_WON");
      isgameactive = false;
    } else if (!board.includes("")) {
      announce("TIE");
      isgameactive = false;
    }
  }

  const announce = (type) => {
    winnerAlert.style.left='-300px';
    statusWinner.innerHTML='THE PLAYER &nbsp';
    switch (type) {
      case "PLAYERO_WON":
        winner.style.color='#f13a1d';
        winner.innerHTML=' O WON';
        couterO++;
        scoreO.innerHTML = couterO;
        break;
      case "PLAYERX_WON":
        winner.style.color='#cdd11e';
        winner.innerHTML=' X WON';
        couterX++;
        scoreX.innerHTML = couterX;
        break;
      case "TIE":
        statusWinner.innerHTML='TIE';
        break;
    }
  };

  const updateBoard = (index) => {
    board[index] = currentPlayer;

    const currentTile = tiles[index];

    currentTile.classList.add(currentPlayer === "X" ? "playerX" : "playerO");
  };

  const changePlayer = () => {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  };

  const isValidAction = (tile) => {
    return tile.innerHTML === "";
  };

  const userAction = (tile, index) => {
    if (isValidAction(tile) && isgameactive) {
      tile.innerHTML = currentPlayer;
      updateBoard(index);
      resultValidation();
      changePlayer();
    }
  };

  resetbutton.addEventListener("click", function resetboard() {
    board = ["", "", "", "", "", "", "", "", ""];
    isgameactive = true;
    winnerAlert.style.left='100px'; 

    if (currentPlayer === "X") {
      changePlayer();
    } else {
      changePlayer();
    }

    tiles.forEach((tile) => {
      tile.innerHTML = "";
      tile.classList.remove('playerX', 'playerO');
    });
  });

  tiles.forEach((tile, index) => {
    tile.addEventListener("click", () => userAction(tile, index));
  });
});

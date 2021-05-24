const Menubuttons = (() => {
	const menu = document.getElementById("menu");
	const cpuButton = document.createElement("button");
	const restartButton = document.createElement("button");
	
	cpuButton.classList.add("buttons");
	restartButton.classList.add("buttons");
	restartButton.classList.add("hidden");
	
	cpuButton.innerText = "Play against AI?";
	restartButton.innerText = "Next round?";
	
	menu.appendChild(cpuButton);
	menu.appendChild(restartButton);
	
	cpuButton.addEventListener("click", (e) => {
		cpuButton.classList.add("cpuIsOn");
	});
	
	return {cpuButton, restartButton};
})();

const Gameboard = (() => {
	const gameboard = document.getElementById("gameboard");
	
	const aa = document.createElement("button");
	const ab = document.createElement("button");
	const ac = document.createElement("button");
	const ba = document.createElement("button");
	const bb = document.createElement("button");
	const bc = document.createElement("button");
	const ca = document.createElement("button");
	const cb = document.createElement("button");
	const cc = document.createElement("button");
	
	const cellArray = [aa, ab, ac, ba, bb, bc, ca, cb, cc];
	
	cellArray.forEach(cell => {
		cell.classList.add("cells");
		gameboard.appendChild(cell);
	});
	
	return {aa, ab, ac, ba, bb, bc, ca, cb, cc};
})();

/* players */

const playerFactory = (name, symbol, score) => {
	return {name, symbol, score};
};

const player1 = playerFactory(prompt("Player 1's name:", "Player 1"), "O", 0);
const player2 = playerFactory(prompt("Player 2's or AI's name:", "Player 2"), "X", 0);

const Namecheck = (() => {
	if (player1.name === "" || player1.name === null) {
		player1.name = "Player 1";
	}
	if (player2.name === "" || player2.name === null) {
		player2.name = "Player 2";
	}
})();

/* display messages */

const Status = (() => {
	const container = document.getElementById("container");
	const turnMessage = document.createElement("p");
	const scoreMessage = document.createElement("p");
	const playerOneTurn = true;
	
	turnMessage.innerText = `${player1.name}, it's your turn!`;
	scoreMessage.innerText = `${player1.score} : ${player2.score}`;
	
	container.appendChild(turnMessage);
	container.appendChild(scoreMessage);
	
	return {playerOneTurn, turnMessage, scoreMessage};
})();

/* actual game */

const Game = (() => {
	const cellArray = document.querySelectorAll(".cells");
	
	cellArray.forEach(cell => {
		
		cell.addEventListener("click", (e) => {
			
			if (!cell.classList.contains("selected")) {
				
				if (Status.playerOneTurn === true) {
					cell.innerText = player1.symbol;
					cell.classList.add("selected");
					Status.playerOneTurn = false;
					Status.turnMessage.innerText = `${player2.name}, it's your turn!`;
					Referee.winCheck();
					if (Menubuttons.cpuButton.classList.contains("cpuIsOn")) {
						const selectedCells = document.querySelectorAll(".selected");
						
						if (selectedCells.length !== 9) {
							
							const Cpuplay = () => {
								const unselectedCells = document.querySelectorAll("button.cells:not(.selected)");
								const randomIndex = Math.floor(Math.random() * unselectedCells.length);
								const randomValidCell = unselectedCells[randomIndex];
								randomValidCell.innerText = player2.symbol;
								randomValidCell.classList.add("selected");
							};
							
							Cpuplay();
							Status.playerOneTurn = true;
							Status.turnMessage.innerText = `${player1.name}, it's your turn!`;
							Referee.winCheck();
						}
					}
				} else {
					cell.innerText = player2.symbol;
					cell.classList.add("selected");
					Status.playerOneTurn = true;
					Status.turnMessage.innerText = `${player1.name}, it's your turn!`;
					Referee.winCheck();
				}
			}
		});
	});
})();	

const Referee = (() => {
	
	const selectedCells = document.querySelectorAll(".selected");
	
	const winCheck = () => {
		
		const Columncheck = (() => {
			const victory = ((Gameboard.aa.classList.contains("selected") && Gameboard.aa.innerText === Gameboard.ba.innerText && Gameboard.ba.innerText === Gameboard.ca.innerText)
				|| (Gameboard.ab.classList.contains("selected") && Gameboard.ab.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.cb.innerText)
				|| (Gameboard.ac.classList.contains("selected") && Gameboard.ac.innerText === Gameboard.bc.innerText && Gameboard.bc.innerText === Gameboard.cc.innerText)) ? true : false;
			return {victory};
		})();
		
		const Rowcheck = (() => {
			const victory = ((Gameboard.aa.classList.contains("selected") && Gameboard.aa.innerText === Gameboard.ab.innerText && Gameboard.ab.innerText === Gameboard.ac.innerText)
				|| (Gameboard.ba.classList.contains("selected") && Gameboard.ba.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.bc.innerText)
				|| (Gameboard.ca.classList.contains("selected") && Gameboard.ca.innerText === Gameboard.cb.innerText && Gameboard.cb.innerText === Gameboard.cc.innerText)) ? true : false;
			return {victory};
		})();
		
		const Diagonalcheck = (() => {
			const victory = ((Gameboard.aa.classList.contains("selected") && Gameboard.aa.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.cc.innerText)
				|| (Gameboard.ac.classList.contains("selected") && Gameboard.ac.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.ca.innerText)) ? true : false;
			return {victory};
		})();
							
		if (Columncheck.victory || Rowcheck.victory || Diagonalcheck.victory) {
			
			if (Status.playerOneTurn === true) {
				Status.turnMessage.innerText = "Player 2 wins! 🎊 🎉";
				player2.score++;
			} else {
				Status.turnMessage.innerText = "Player 1 wins! 🎊 🎉";
				player1.score++;
			}
					
			const allCells = document.querySelectorAll(".cells");
			
			allCells.forEach(cell => {
				cell.classList.add("selected");
			});
			
			Status.scoreMessage.innerText = `${player1.score} : ${player2.score}`;
			Menubuttons.restartButton.classList.remove("hidden");
		} else if (selectedCells.length === 9) {
			Status.turnMessage.innerText = "It's a tie!";
			Menubuttons.restartButton.classList.remove("hidden");
		}
	}
	return {winCheck};
})();

const Restart = (() => {
	Menubuttons.restartButton.addEventListener("click", (e) => {
		const allCells = document.querySelectorAll(".cells");
		allCells.forEach(cell => {
			cell.classList.remove("selected");
			cell.innerText = "";
		});
		Status.playerOneTurn = true;
		Status.turnMessage.innerText = "Player 1, it's your turn!";
		Menubuttons.restartButton.classList.toggle("hidden");
	});
})();

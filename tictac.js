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

const playerFactory = (name, symbol, score) => {
	return {name, symbol, score};
};

const player1 = playerFactory(prompt("Player 1's name:", "Player 1"), "O", 0);
const player2 = playerFactory(prompt("Player 2's name:", "Player 2"), "X", 0);

const nameChecker = (() => {
	if (player1.name === "" || player1.name === null) {
		player1.name = "Player 1";
	}
	if (player2.name === "" || player2.name === null) {
		player2.name = "Player 2";
	}
})();

const Status = (() => {
	const container = document.getElementById("container");
	const turnMessage = document.createElement("p");
	const scoreMessage = document.createElement("p");
	const restartButton = document.createElement("button");
	turnMessage.innerText = `${player1.name}, it's your turn!`;
	scoreMessage.innerText = `${player1.score} : ${player2.score}`;
	restartButton.innerText = "Rematch?";
	restartButton.id = "restart";
	restartButton.classList.add("hidden");
	container.appendChild(turnMessage);
	container.appendChild(scoreMessage);
	container.appendChild(restartButton);
	const playerOneTurn = true;
	return {playerOneTurn, turnMessage, scoreMessage, restartButton};
})();

const cellSelector = (() => {
	const cellArray = document.querySelectorAll(".cells");
	cellArray.forEach(cell => {
		cell.addEventListener("click", (e) => {
			if (!cell.classList.contains("selected")) {
				if (Status.playerOneTurn === true) {
					cell.innerText = player1.symbol;
					Status.playerOneTurn = false;
					Status.turnMessage.innerText = `${player2.name}, it's your turn!`;
				} else {
					cell.innerText = player2.symbol;
					Status.playerOneTurn = true;
					Status.turnMessage.innerText = `${player1.name}, it's your turn!`;
				}
				cell.classList.add("selected");
				
				const gameEnder = () => {
					const selectedCells = document.querySelectorAll(".selected");
					console.log(selectedCells);
					if ((Gameboard.aa.classList.contains("selected") === true && Gameboard.aa.innerText === Gameboard.ab.innerText && Gameboard.ab.innerText === Gameboard.ac.innerText)
					|| (Gameboard.ba.classList.contains("selected") === true && Gameboard.ba.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.bc.innerText)
					|| (Gameboard.ca.classList.contains("selected") === true && Gameboard.ca.innerText === Gameboard.cb.innerText && Gameboard.cb.innerText === Gameboard.cc.innerText)
					|| (Gameboard.aa.classList.contains("selected") === true && Gameboard.aa.innerText === Gameboard.ba.innerText && Gameboard.ba.innerText === Gameboard.ca.innerText)
					|| (Gameboard.ab.classList.contains("selected") === true && Gameboard.ab.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.cb.innerText)
					|| (Gameboard.ac.classList.contains("selected") === true && Gameboard.ac.innerText === Gameboard.bc.innerText && Gameboard.bc.innerText === Gameboard.cc.innerText)
					|| (Gameboard.aa.classList.contains("selected") === true && Gameboard.aa.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.cc.innerText)
					|| (Gameboard.ac.classList.contains("selected") === true && Gameboard.ac.innerText === Gameboard.bb.innerText && Gameboard.bb.innerText === Gameboard.ca.innerText)) {
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
						Status.restartButton.classList.toggle("hidden");
					} else if (selectedCells.length === 9) {
						Status.turnMessage.innerText = "It's a tie!";
						Status.restartButton.classList.toggle("hidden");
					}
				};
				gameEnder();
			}
		});
	});
})();

const restart = (() => {
	Status.restartButton.addEventListener("click", (e) => {
		console.log("hi");
		const allCells = document.querySelectorAll(".cells");
		allCells.forEach(cell => {
			cell.classList.remove("selected");
			cell.innerText = "";
		});
		Status.playerOneTurn = true;
		Status.turnMessage.innerText = "Player 1, it's your turn!";
		Status.restartButton.classList.toggle("hidden");
	});
})();

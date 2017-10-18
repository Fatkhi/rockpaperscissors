import { MOVES, DRAW_TEXT, PLAYER_1_WINS_TEXT, PLAYER_2_WINS_TEXT } from './constants';
import Events from './utils/events';

class Player {
	constructor() {
		this.move = null;
		this.winner = null;
	}

	setWinner(winner) {
		this.winner = winner;
	}

	isWinner() {
		return this.winner;
	}

	setMove(move) {
		this.move = move;
	}

	getMove() {
		return this.move;
	}

	randomizeMove() {
		const moveIndex = Math.floor(Math.random() * 3);
		this.move = MOVES[moveIndex];
	}
}

export default class Game {
	constructor() {
		this.player1 = new Player();
		this.player2 = new Player();
		this.result = null;

		this.events = new Events();

		//ROCK=0;PAPER=1;SCISSORS=2 the order in MOVES array
		this.winMatrix = [
			[null, 1, 0],
			[0, null, 1],
			[1, 0, null]
		];
	}

	findWinner() {
		const player1Move = MOVES.indexOf(this.player1.move);
		const player2Move = MOVES.indexOf(this.player2.move);


		if (this.player1.move === this.player2.move) {
			this.result = DRAW_TEXT;
		}
		else if (this.winMatrix[player1Move][player2Move]) {
			this.result = PLAYER_1_WINS_TEXT;
			this.player1.setWinner(true);
			this.player2.setWinner(false);
		}
		else {
			this.result = PLAYER_2_WINS_TEXT;
			this.player2.setWinner(true);
			this.player1.setWinner(false);
		}
	}

	resetWinners() {
		this.player1.setWinner(null);
		this.player2.setWinner(null);
	}

	resetMoves() {
		this.player1.setMove(null);
		this.player2.setMove(null);
	}


}
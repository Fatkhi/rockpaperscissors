import { MOVES, DRAW_TEXT, PLAYER_1_WINS_TEXT, PLAYER_2_WINS_TEXT } from './constants';

class Player {
	constructor() {
		this.move = null;
		this.winner = null;
	}

	setMove(move) {
		this.move = move;
	}

	randomizeMove() {
		const moveIndex = Math.floor(Math.random() * 3);
		this.move = MOVES[moveIndex];
	}

	isWinner() {
		return this.winner;
	}
}

export default class Game {
	constructor() {
		this.player1 = new Player();
		this.player2 = new Player();
		this.result = null;

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
		}
		else {
			this.result = PLAYER_2_WINS_TEXT;
		}
	}


}
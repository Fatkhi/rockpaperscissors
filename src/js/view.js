import { qs } from './utils';
import { MOVES, PLAYER_1, PLAYER_2 } from './constants';
import Events from './utils/events';

export default class View {
	constructor() {
		this.events = new Events();

		this.player1 = qs('#player1');
		this.player2 = qs('#player2');
		this.scoreboard = qs('.scoreboard-text');
		this.simulateButton = qs('.js-simulate');
		this.playAgainButton = qs('.js-play-again');

		this.scoreboardDefaultText = this.scoreboard.innerText;

		this.player1Moves = [];
		this.player2Moves = [];

		this.bindListeners();
	}

	bindListeners() {
		MOVES.forEach((move) => {
			const el1 = qs('.js-' + move.toLowerCase(), this.player1);
			const el2 = qs('.js-' + move.toLowerCase(), this.player2);

			this.player1Moves.push(el1);
			this.player2Moves.push(el2);

			el1.addEventListener('click', () => {
				this.events.emit('move selected', move);
			});
		});

		this.simulateButton.addEventListener('click', () => {
			this.events.emit('move simulated');
		});

		this.playAgainButton.addEventListener('click', () => {
			this.events.emit('play again');
		});
	}

	disableClick(disable) {
		this.player1Moves.forEach((node) => {
			if (disable) {
				node.classList.add('disabled');
			}
			else {
				node.classList.remove('disabled');
			}
		});
	}

	addActiveClass(move, player) {
		let moveNodesArr;
		if (player === PLAYER_1) {
			moveNodesArr = this.player1Moves;
		}
		else if (player === PLAYER_2) {
			moveNodesArr = this.player2Moves;
		}
		moveNodesArr[MOVES.indexOf(move)].classList.add('active');
	}

	resetView() {
		this.player1Moves.forEach((node) => {
			node.classList.remove('active');
		});

		this.player2Moves.forEach((node) => {
			node.classList.remove('active');
		});

		this.showPlayAgainButton(false);
		this.setScoreboardText(this.scoreboardDefaultText);
	}

	setScoreboardText(text) {
		this.scoreboard.innerText = text;
	}

	showPlayAgainButton(show) {
		if (show) {
			this.playAgainButton.classList.remove('hidden');
		}
		else {
			this.playAgainButton.classList.add('hidden');
		}
	}

	//TODO decouple logic, add observer, render logic in view, better styling, responsive layout

}
import { qs } from './utils';
import { MOVES } from './constants';
import Model from './model';
import Events from './utils/events';

export default class View {
	constructor() {
		this.model = new Model();
		this.player1 = qs('#player1');
		this.player2 = qs('#player2');
		this.scoreboard = qs('.scoreboard-text');
		this.simulateButton = qs('.js-simulate');
		this.playAgainButton = qs('.js-play-again');

		this.events = new Events();

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
				this.processMove(move);
			});
		});

		this.simulateButton.addEventListener('click', () => {

			this.model.player1.randomizeMove();
			this.model.player2.randomizeMove();
			this.model.findWinner();

			this.addActiveClass(this.model.player1.move, this.player1Moves);
			this.addActiveClass(this.model.player2.move, this.player2Moves);

			this.scoreboard.innerText = this.model.result;
			this.playAgainButton.classList.remove('hidden');
		});

		this.playAgainButton.addEventListener('click', () => {
			this.resetView();
		});
	}

	addActiveClass(move, moveNodesArr) {
		moveNodesArr[MOVES.indexOf(move)].classList.add('active');
	}

	resetView() {
		this.player1Moves.forEach((node) => {
			node.classList.remove('active');
		});

		this.player2Moves.forEach((node) => {
			node.classList.remove('active');
		});

		this.playAgainButton.classList.add('hidden');
		this.scoreboard.innerText = this.scoreboardDefaultText;
	}

	//TODO decouple logic, add observer, render logic in view, better styling, responsive layout
	processMove(move) {
		this.model.player1.setMove(move);
		this.model.player2.randomizeMove();

		this.addActiveClass(this.model.player1.move, this.player1Moves);
		this.addActiveClass(this.model.player2.move, this.player2Moves);

		this.model.findWinner();
		this.scoreboard.innerText = this.model.result;
		this.playAgainButton.classList.remove('hidden');
	}


}
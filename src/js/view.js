import { qs } from './utils';
import { MOVES } from './constants';
import Model from './model';

export default class View {
	constructor() {
		this.model = new Model();
		this.player1 = qs('#player1');
		this.player2 = qs('#player2');
		this.scoreboard = qs('#scoreboard');

		this.player1Moves = [];
		this.player2Moves = [];

		MOVES.forEach((move) => {
			const el1 = qs('.js-' + move.toLowerCase(), this.player1);
			const el2 = qs('.js-' + move.toLowerCase(), this.player2);

			this.player1Moves.push(el1);
			this.player2Moves.push(el2);

			el1.addEventListener('click', () => {
				this.addActiveClass(move, this.player1Moves);
				this.processMove(move);
			});
		});
	}

	addActiveClass(move, moveNodesArr) {
		moveNodesArr[MOVES.indexOf(move)].classList.add('active');
	}

	//TODO decouple logic, add observer, render logic in view, better styling, responsive layout
	processMove(move) {
		this.model.player1.setMove(move);
		this.model.player2.randomizeMove();
		this.model.findWinner();
		this.addActiveClass(this.model.player2.move, this.player2Moves);
		this.scoreboard.innerText = this.model.result;
	}
}
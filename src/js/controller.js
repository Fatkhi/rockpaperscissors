import Events from './utils/events';

import { PLAYER_1, PLAYER_2 } from './constants';

export default class Controller {
	constructor(Model, View) {
		this.events = new Events();
		this.model = new Model();
		this.view = new View();

		this.events.on('move selected', (move) => {
			this.onMoveSelected(move);
		});

		this.events.on('move simulated', () => {
			this.onMoveSimulated();
		});

		this.events.on('play again', () => {
			this.onPlayAgain();
		});
	}

	onMoveSelected(move) {
		if (!this.model.disabled) {
			this.model.player1.setMove(move);

			this.processMove();
		}
	}

	onMoveSimulated() {
		if (!this.model.disabled) {
			this.model.player1.randomizeMove();
			this.processMove();
		}
	}

	disableGame(disabled) {
		this.model.setDisabled(disabled);
		this.view.disableClick(disabled);
	}

	onPlayAgain() {
		this.model.resetAll();

		this.disableGame(false);
		this.view.resetView();
	}

	processMove() {
		this.disableGame(true);
		this.model.player2.randomizeMove();
		this.setActiveClasses();
		this.model.findWinner();

		this.view.setScoreboardText(this.model.result);
		this.setWinAndLoseClasses();
		this.view.showPlayAgainButton(true);
	}

	setActiveClasses() {
		this.view.addActiveClass(this.model.player1.getMove(), PLAYER_1);
		this.view.addActiveClass(this.model.player2.getMove(), PLAYER_2);
	}

	setWinAndLoseClasses() {
		if(this.model.player1.isWinner()) {
			this.view.addWinnerClass(this.model.player1.getMove(), PLAYER_1);
			this.view.addLoserClass(this.model.player2.getMove(), PLAYER_2);
		}
		else if(this.model.player2.isWinner()) {
			this.view.addWinnerClass(this.model.player2.getMove(), PLAYER_2);
			this.view.addLoserClass(this.model.player1.getMove(), PLAYER_1);
		}
	}

}
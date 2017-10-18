import Model from './model';
import Events from './utils/events';
import View from './view';

import { PLAYER_1, PLAYER_2 } from './constants';

export default class Controller {
	constructor() {
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
			this.disableGame(true);

			this.model.disabled = true;
			this.view.disableClick(true);
			this.processMove();
		}
	}

	onMoveSimulated() {
		this.model.player1.randomizeMove();
		this.processMove();
	}

	disableGame(disabled) {
		this.model.disabled = disabled;
		this.view.disableClick(disabled);
	}

	onPlayAgain() {
		this.disableGame(false);
		this.view.resetView();
	}

	processMove() {
		this.model.player2.randomizeMove();
		this.setActiveClasses();
		this.model.findWinner();

		this.view.setScoreboardText(this.model.result);
		this.view.showPlayAgainButton(true);
	}

	setActiveClasses() {
		this.view.addActiveClass(this.model.player1.move, PLAYER_1);
		this.view.addActiveClass(this.model.player2.move, PLAYER_2);
	}

}
/* eslint-disable */
import Controller from '../src/js/controller';
import Model from '../src/js/model';
import Events from '../src/js/utils/events';
import { ROCK } from '../src/js/constants';

class MockView {
	bindListeners() {}

	disableClick() {}

	addActiveClass() {}

	addWinnerClass() {}

	addLoserClass() {}

	resetView() {}

	setScoreboardText() {}

	showPlayAgainButton() {}

	findPlayersNode() {}
}

describe('controller', () => {
	let controller = null;
	let events = new Events();

	beforeEach(() => {
		controller = new Controller(Model, MockView);
	});

	it('reacts on events properly', () => {
		events.emit('move selected', ROCK);

		expect(controller.model.player1.move).to.be.equal(ROCK);
		expect(controller.model.player2.move).to.be.a('string');
		expect(controller.model.disabled).to.be.true;
		expect(controller.model.result).to.be.a('string');

		events.emit('play again');

		expect(controller.model.player1.move).to.be.equal(null);
		expect(controller.model.disabled).to.be.false;

		events.emit('move simulated');

		expect(controller.model.player1.move).to.be.a('string');
		expect(controller.model.player2.move).to.be.a('string');
		expect(controller.model.disabled).to.be.true;
		expect(controller.model.result).to.be.a('string');

	});

});

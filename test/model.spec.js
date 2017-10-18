import Model from '../src/js/model';
import { MOVES, ROCK, PAPER, SCISSORS, DRAW_TEXT, PLAYER_1_WINS_TEXT, PLAYER_2_WINS_TEXT } from '../src/js/constants';

describe('model game', () => {
	let model = null;

	beforeEach(() => {
		model = new Model();
	});

	it('should initialize 2 players', () => {
		const players = ['player1', 'player2'];

		for (let player in players) {
			let pl = players[player];
			expect(model[pl].winner).to.be.equal(null);
			expect(model[pl].move).to.be.equal(null);
			expect(model[pl].setWinner).to.be.a('function');
			expect(model[pl].isWinner).to.be.a('function');
			expect(model[pl].setMove).to.be.a('function');
			expect(model[pl].getMove).to.be.a('function');
			expect(model[pl].randomizeMove).to.be.a('function');
		}
	});

	it('sets rock-paper, finds the winner correctly, sets correct result', () => {
		model.player1.setMove(ROCK);
		model.player2.setMove(PAPER);

		model.findWinner();

		expect(model.player1.getMove()).to.be.equal(ROCK);
		expect(model.player2.getMove()).to.be.equal(PAPER);

		expect(model.player1.isWinner()).to.be.false;
		expect(model.player2.isWinner()).to.be.true;
		expect(model.result).to.be.equal(PLAYER_2_WINS_TEXT);
	});

	it('sets scissors-rock, finds the winner correctly, sets correct result', () => {
		model.player1.setMove(SCISSORS);
		model.player2.setMove(ROCK);

		model.findWinner();

		expect(model.player1.getMove()).to.be.equal(SCISSORS);
		expect(model.player2.getMove()).to.be.equal(ROCK);

		expect(model.player1.isWinner()).to.be.false;
		expect(model.player2.isWinner()).to.be.true;
		expect(model.result).to.be.equal(PLAYER_2_WINS_TEXT);
	});

	it('sets scissors-paper, finds the winner correctly, sets correct result', () => {
		model.player1.setMove(SCISSORS);
		model.player2.setMove(PAPER);

		model.findWinner();

		expect(model.player1.getMove()).to.be.equal(SCISSORS);
		expect(model.player2.getMove()).to.be.equal(PAPER);

		expect(model.player1.isWinner()).to.be.true;
		expect(model.player2.isWinner()).to.be.false;
		expect(model.result).to.be.equal(PLAYER_1_WINS_TEXT);
	});

	for (let i in MOVES) {
		let move = MOVES[i];

		it(`sets ${move.toLowerCase()}-${move.toLowerCase()}, finds the winner correctly, sets correct result`, () => {
			model.player1.setMove(move);
			model.player2.setMove(move);

			model.findWinner();

			expect(model.player1.getMove()).to.be.equal(move);
			expect(model.player1.getMove()).to.be.equal(move);

			expect(model.player1.isWinner()).to.be.false;
			expect(model.player2.isWinner()).to.be.false;
			expect(model.result).to.be.equal(DRAW_TEXT);
		});
	}

	it('resetWinners and resetMoves', () => {
		model.player1.move = ROCK;
		model.player1.winner = true;
		model.player2.move = SCISSORS;
		model.player2.winner = false;

		model.resetWinners();
		model.resetMoves();

		expect(model.player1.move).to.be.equal(null);
		expect(model.player2.move).to.be.equal(null);
		expect(model.player1.winner).to.be.equal(null);
		expect(model.player2.winner).to.be.equal(null);

	})

});
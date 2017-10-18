import Events from '../src/js/utils/events';

describe('events bus', () => {
	let events = new Events();

	beforeEach(() => {
		events = new Events();
	});

	it('is singleton', () => {
		let events2 = new Events();
		events2.on('event', () => {});

		expect(events).to.be.deep.equal(events2);
	});

	it('saves handler for an event and fires it on emit', () => {
		const param = 'param';
		const foo = (a) => { return a };

		events.on('event', foo);

		expect(events.emit('event', param)).to.be.equal(param);
	});
});
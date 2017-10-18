let singleton = null;

export default class Events {
	constructor() {
		if (!singleton) {
			singleton = this;
			this.events = {};
		}
		
		return singleton;
	}

	on(event, handler) {
		this.events[event] = handler;
	}

	emit(event, data) {
		const handler = this.events[event];
		if (handler) {
			return handler(data);
		}
	}
}
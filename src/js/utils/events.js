let singleton = null;

//simple version of EventBus, unsubscribe and multiple listeners should be added
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
interface IEventListener {
	(...args: any[]): void; // eslint-disable-line
  }

  interface ICallbackList {
	[id: string]: IEventListener;
  }

  interface Ilistenres {
	[eventName: string]: ICallbackList;
  }

  interface ISubscribe {
	unsubscribe: () => void;
  }

  interface IEventBus {
	on(eventName: string, callback: IEventListener): ISubscribe;
	once(eventName: string, callback: IEventListener): ISubscribe;
	emit<T extends unknown[]>(eventName: string, ...args: T): void;
	clear(eventName: string): void;
  }

export class EventBus implements IEventBus {
	private _listeners: Ilistenres = {};

	private _callbackId = 0;

	on(eventName: string, callback: IEventListener): ISubscribe {
	  if (!this._listeners[eventName]) {
			this._listeners[eventName] = {};
	  }
	  const id = this._callbackId++;

	  this._listeners[eventName][id] = callback;

	  const unsubscribe = () => {
			delete this._listeners[eventName][id];
			if (Object.keys(this._listeners[eventName]).length === 0) {
		  delete this._listeners[eventName];
			}
	  };
	  return { unsubscribe };
	}

	once(eventName: string, callback: IEventListener): ISubscribe {
	  if (!this._listeners[eventName]) {
			this._listeners[eventName] = {};
	  }
	  const id = "d" + this._callbackId++;
	  this._listeners[eventName][id] = callback;
	  const unsubscribe = () => {
			delete this._listeners[eventName][id];
			if (Object.keys(this._listeners[eventName]).length === 0) {
		  delete this._listeners[eventName];
			}
	  };
	  return { unsubscribe };
	}

	emit<T extends unknown[]>(eventName: string, ...args: T): void {
	  const callbacksObj = this._listeners[eventName];
	  if (!callbacksObj) {
			return console.warn(`Nobody cares about event ${eventName}!`);
	  }
	  Object.entries(callbacksObj).forEach(([callbackId, callback]) => {
			callback(...args);
			if (callbackId[0] === "d") {
		  delete callbacksObj[callbackId];
			}
	  });
	}

	clear(eventName?: string): void {
	  if (!eventName) {
			this._listeners = {};
			return;
	  }
	  delete this._listeners[eventName];
	}
}

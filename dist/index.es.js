var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
var componentEmitter = { exports: {} };
(function(module) {
  {
    module.exports = Emitter2;
  }
  function Emitter2(obj) {
    if (obj)
      return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter2.prototype) {
      obj[key] = Emitter2.prototype[key];
    }
    return obj;
  }
  Emitter2.prototype.on = Emitter2.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter2.prototype.once = function(event, fn) {
    function on() {
      this.off(event, on);
      fn.apply(this, arguments);
    }
    on.fn = fn;
    this.on(event, on);
    return this;
  };
  Emitter2.prototype.off = Emitter2.prototype.removeListener = Emitter2.prototype.removeAllListeners = Emitter2.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (arguments.length == 0) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks)
      return this;
    if (arguments.length == 1) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter2.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    return this;
  };
  Emitter2.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter2.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };
})(componentEmitter);
var Emitter = componentEmitter.exports;
class SocketClientMock extends Emitter {
  constructor(serverMock) {
    super();
    __publicField(this, "connected");
    __publicField(this, "disconnected");
    __publicField(this, "serverMock");
    __publicField(this, "_emitFn");
    __publicField(this, "emit", (event, ...args) => {
      let ack;
      if (typeof args[args.length - 1] === "function") {
        ack = args.pop();
      }
      return this.serverMock.emitEvent(event, args, ack);
    });
    __publicField(this, "fireEvent", (event, ...args) => {
      return this._emitFn(event, ...args);
    });
    __publicField(this, "close", () => {
      this.disconnected = true;
      this.connected = false;
      this.emit("disconnect", "io client disconnect");
      this._emitFn("disconnect", "io client disconnect");
      return this;
    });
    __publicField(this, "disconnect", () => {
      return this.close();
    });
    this.serverMock = serverMock;
    this._emitFn = Emitter.prototype.emit;
    this.connected = false;
    this.disconnected = true;
  }
}
const createArgs = (args) => {
  return args ? JSON.parse(JSON.stringify(args)) : void 0;
};
class SocketServerMock extends Emitter {
  constructor(handshake) {
    super();
    __publicField(this, "clientMock");
    __publicField(this, "handshake");
    __publicField(this, "rooms");
    __publicField(this, "_emitFn");
    __publicField(this, "generalCallbacks");
    __publicField(this, "broadcast");
    __publicField(this, "emitEvent", (event, args, ack) => {
      return this._emitFn(event, ...args.map(createArgs), ack);
    });
    __publicField(this, "onEmit", (event, callback) => {
      this.generalCallbacks[event] = callback;
    });
    __publicField(this, "emit", (event, ...args) => {
      return this.clientMock.fireEvent(event, ...args);
    });
    __publicField(this, "join", (room) => {
      this.rooms.push(room);
    });
    __publicField(this, "leave", (room) => {
      const index = this.rooms.indexOf(room);
      this.rooms.splice(index, 1);
    });
    __publicField(this, "monitor", (value) => {
      return value;
    });
    __publicField(this, "disconnect", () => {
      this.emit("disconnecting", "io server disconnect");
      this.emit("disconnect", "io server disconnect");
      this._emitFn("disconnecting", "io server disconnect");
      this._emitFn("disconnect", "io server disconnect");
      return this;
    });
    __publicField(this, "to", (room) => {
      return {
        emit: (event, ...args) => {
          if (this.generalCallbacks[event]) {
            this.generalCallbacks[event](...args.map(createArgs), room);
          }
        }
      };
    });
    this.handshake = handshake != null ? handshake : {};
    this.clientMock = new SocketClientMock(this);
    this.rooms = [];
    this._emitFn = Emitter.prototype.emit;
    this.generalCallbacks = {};
    this.broadcast = {
      to: (room) => {
        return {
          emit: (event, ...args) => {
            if (this.generalCallbacks[event]) {
              this.generalCallbacks[event](...args.map(createArgs), room);
            }
          }
        };
      }
    };
    this.clientMock.connected = true;
    this.clientMock.disconnected = false;
    this.emit("connect");
  }
}
export { SocketClientMock, SocketServerMock, SocketServerMock as default };
//# sourceMappingURL=index.es.js.map

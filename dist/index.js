"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injectable = Injectable;
exports.Inject = Inject;
exports.default = void 0;

var _injector = _interopRequireDefault(require("./injector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const injector = new _injector.default();

function Injectable(target) {
  injector.add(target.constructor.name, target);
}

function Inject() {
  const resolved = injector.resolve.apply(injector, arguments);
  return function (target, name, descriptor) {
    return extend(target, resolved);
  };
}

function extend(clas, resolved) {
  return class extends clas {
    constructor(...args) {
      super(...resolved, ...args);
    }

  };
}

var _default = injector;
exports.default = _default;
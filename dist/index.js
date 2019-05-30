"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injectable = Injectable;
exports.Inject = Inject;
exports.default = void 0;

var _injector = _interopRequireDefault(require("./injector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const inject = new _injector.default();

function Injectable(target) {
  inject.add(target.constructor.name, target);
}

function Inject(names) {
  return function (target) {
    const resolved = inject.resolve(names);
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

var _default = _injector.default;
exports.default = _default;
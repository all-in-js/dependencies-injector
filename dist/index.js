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

function Inject() {
  const resolved = inject.resolve.apply(inject, arguments);
  return function (target) {
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

var _default = inject;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Injectable = Injectable;
exports.Inject = Inject;
exports.default = void 0;

var _utils = require("@eryue/utils");

var _injector = _interopRequireDefault(require("./injector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const injector = new _injector.default();

function Injectable(target) {
  injector.add(target.name, target);
}

function Inject() {
  const resolved = injector.resolve.apply(injector, arguments);
  return function (target, name, descriptor) {
    if (name && descriptor) {
      const oldValue = descriptor.value; // const raw = descriptor.initializer;

      if ((0, _utils.getArgType)(oldValue).isFunction) {
        // function prop
        descriptor.value = function (...args) {
          return oldValue.apply(this, [...resolved, ...args]);
        };
      } else {
        // value prop
        descriptor.initializer = function () {
          return resolved;
        };
      }

      return descriptor;
    } else {
      // class
      return extend(target, resolved);
    }
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
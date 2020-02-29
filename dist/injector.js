"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("@iuv-tools/utils");

var _lodash = _interopRequireDefault(require("lodash.flatten"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 保护私有栈，防止通过实例调用直接篡改
const dependenciesMap = new Map();

class Injector {
  constructor(initDeps) {
    let depsMap;
    const argType = (0, _utils.getArgType)(initDeps);

    if (argType.isObject) {
      depsMap = (0, _utils.objToMap)(initDeps);
    } else if (argType.isMap) {
      depsMap = initDeps;
    } else {
      depsMap = new Map();
    }

    dependenciesMap.set(this, depsMap); // this.deps = depsMap;
  }

  add(name, value) {
    const nameType = (0, _utils.getArgType)(name);

    if (!value && name) {
      if (nameType.isString) {
        value = name;
      } else if (nameType.isFunction) {
        value = name;
        name = value.name;
      } else {
        value = name;
        name = value.toString();
      }
    }

    if (!name) {
      _utils.log.error(`'name' argument or property must be provided.`, '@eryue/injector');

      process.exit(1);
    } // older will be replaced


    dependenciesMap.get(this).set(name, value);
  }

  resolve() {
    const {
      args,
      fn
    } = parseArgs(Array.from(arguments));
    const resolved = args.map(name => dependenciesMap.get(this).get(name));

    if (fn) {
      fn.apply(this, resolved);
    }

    return resolved;
  }

}

exports.default = Injector;

function parseArgs(args) {
  let fn = null;

  if (args.length) {
    fn = args.pop();

    if (!(0, _utils.getArgType)(fn).isFunction) {
      args.push(fn);
      fn = null;
    } else {
      if (!args.length) {
        // just a callback
        args = (0, _utils.getArgsFromFunc)(fn);
      }
    }

    args = (0, _lodash.default)(args);
  }

  return {
    args,
    fn
  };
} // const a = parseArgs([function(a,b,v) {}]);
// console.log(a);
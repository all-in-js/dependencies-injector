"use strict";

var _injector = _interopRequireDefault(require("./injector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// export default function Injectable () {}
// @Inject('a', 'b')
// export class UserService {
//     constructor(a, b) {
//         this.id = id;
//     }
//     getUserInfo(id) {
//         console.log('id');
//     }
// }
// deps[init obj, add, remove], target => function(...deps) => constructor(...deps)
// Injector.resolve(['a', 'b'], function || constructor);
// const {a, b} = Injector.resolve('a', 'b');
// const [a, b] = Injector.resolve('a', 'b');
const inject = new _injector.default();

function Injectable(target) {
  inject.add(target.constructor.name, target);
}

function Inject(names) {
  return function (target) {
    const resolved = inject.resolve(names); // do sth
  };
}
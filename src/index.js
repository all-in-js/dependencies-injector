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
import Injector from './injector';

const inject = new Injector();

function Injectable(target) {
  inject.add(target.constructor.name, target);
}

function Inject(names) {
  return function(target) {
    const resolved = inject.resolve(names);
    // do sth
  }
}
import Injector from './injector';

const inject = new Injector();

export function Injectable(target) {
  inject.add(target.constructor.name, target);
}

export function Inject(names) {
  return function(target) {
    const resolved = inject.resolve(names);
    return extend(target, resolved);
  }
}

function extend(clas, resolved) {
  return class extends clas {
    constructor(...args) {
      super(...resolved, ...args);
    }
  }
}

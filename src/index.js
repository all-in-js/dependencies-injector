import Injector from './injector';

const inject = new Injector();

export function Injectable(target) {
  inject.add(target.constructor.name, target);
}

export function Inject() {
  const resolved = inject.resolve.apply(inject, arguments);
  return function(target) {
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

export default Injector;
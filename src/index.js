import Injector from './injector';

const injector = new Injector();

export function Injectable(target) {
  injector.add(target.constructor.name, target);
}

export function Inject() {
  const resolved = injector.resolve.apply(injector, arguments);
  return function(target, name, descriptor) {  
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

export default injector;
import {getArgType} from '@eryue/utils';
import Injector from './injector';

const injector = new Injector();

export function Injectable(target) {
  injector.add(target.name, target);
}

export function Inject() {
  const resolved = injector.resolve.apply(injector, arguments);
  return function(target, name, descriptor) {  
    if(name && descriptor) {
      const oldValue = descriptor.value;
      // const raw = descriptor.initializer;

      if(getArgType(oldValue).isFunction) {
        // function prop
        descriptor.value = function(...args) {
          return oldValue.apply(this, [...resolved, ...args]);
        }
      }else{
        // value prop
        descriptor.initializer = function() {
          return resolved;
        };
      }
      return descriptor;
    }else{
      // class
      return extend(target, resolved);
    }
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
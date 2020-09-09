import { getArgType } from '@iuv-tools/utils';
import Injector, { Iinjector, ArgsItemType } from './injector';

interface TypedDescriptor extends TypedPropertyDescriptor<any> {
  initializer: Function;
}

const injector: Iinjector = new Injector();

export function Injectable(target: any) {
  injector.add(target.name, target);
}

export function Inject(...agrs: Array<ArgsItemType>) {
  const resolved = injector.resolve.apply(injector, agrs);
  return function(target: FunctionConstructor, name: string | symbol, descriptor: TypedDescriptor) {  
    if (name && descriptor) {
      const oldValue = descriptor.value;
      // const raw = descriptor.initializer;

      if (getArgType(oldValue).isFunction) {
        // function prop
        descriptor.value = function(...args: Array<any>) {
          return oldValue.apply(this, [resolved, ...args]);
        }
      } else {
        // value prop
        descriptor.initializer = function() {
          return resolved;
        };
      }
      return descriptor;
    } else {
      // class
      return extend(target, resolved);
    }
  }
}

function extend(clas: FunctionConstructor, resolved: Array<any>) {
  return class extends clas {
    constructor(...args: Array<any>) {
      super(...[...resolved, ...args]);
    }
  }
}

export const InjectorClass = Injector;

export default injector;
import { getArgType } from '@all-in-js/utils';
import Container, { IContainer, ArgsItemType } from './container';

interface TypedDescriptor extends TypedPropertyDescriptor<any> {
  initializer: Function;
}

const container: IContainer = new Container();

export function Injectable(target: FunctionConstructor) {
  container.add(target.name, target);
}

export function Inject(...agrs: Array<ArgsItemType>) {
  const resolved = container.resolve.apply(container, agrs);
  return function(target: FunctionConstructor, name: string | symbol, descriptor: TypedDescriptor) {  
    if (name && descriptor) {
      const oldValue = descriptor.value;
      // const raw = descriptor.initializer;

      if (getArgType(oldValue).isFunction) {
        /**
         * 装饰类的方法
         * 将依赖注入第一个参数
         */
        descriptor.value = function(...args: Array<any>) {
          return oldValue.apply(this, [resolved, ...args]);
        }
      } else {
        /**
         * 装饰类的属性
         */
        descriptor.initializer = function() {
          return resolved;
        };
      }
      return descriptor;
    } else {
      // 装饰类
      return extend(target, resolved);
    }
  }
}

function extend(clas: FunctionConstructor, resolved: Array<any>) {
  return class extends clas {
    constructor(...args: Array<any>) {
      super(...[resolved, ...args]);
    }
  }
}

export const ContainerClass = Container;

export default container;
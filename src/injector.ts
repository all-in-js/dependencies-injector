import { getArgsFromFunc, getArgType, objToMap, log } from '@iuv-tools/utils';
import flatten from 'lodash.flatten';

type MapType = Map<any, any>;
type DepsType = object | MapType | undefined;
export type ArgsItemType = string | Function;
export interface Iinjector {
  add: (name: string, value: any) => void;
  resolve: (...agrs: Array<ArgsItemType>) => Array<any>;
}

/**
 * 保护私有栈，防止通过实例调用直接篡改
 * 所有实例的依赖收集池，每一个实例一个独立的依赖收集Map
 * 目前比较流行的是metadata的做法，意义一样，做法的差别
 */
const dependenciesMap: Map<Iinjector, MapType> = new Map();

export default class Injector implements Iinjector {
  constructor(initDeps?: DepsType) {
    let depsMap: MapType;
    const argType = getArgType(initDeps);

    if (argType.isObject) {
      depsMap = objToMap(initDeps);
    } else if (argType.isMap) {
      depsMap = <MapType>initDeps;
    } else {
      depsMap = new Map();
    }
    /**
     * 初始化时注册实例的依赖
     */
    dependenciesMap.set(this, depsMap);
  }
  /**
   * 添加依赖项
   * @param name 依赖的名称
   * @param value 依赖的值
   */
  add(name: string, value: any) {
    const nameType = getArgType(name);

    if (!value && name) {
      if (nameType.isString) {
        value = name;
      } else if (nameType.isFunction) {
        // 函数和类都是function类型
        value = name;
        name = value.name;
      } else {
        value = name;
        name = value.toString();
      }
    }
    
    if (!name) {
      log.error(`'name' argument or property must be provided.`, '@eryue/injector');
      process.exit(1);
    }
    
    // older will be replaced
    const thisMap = <MapType>dependenciesMap.get(this);
    thisMap.set(name, value);
  }
  /**
   * 根据key解析依赖
   */
  resolve() {
    const { args, fn } = parseArgs(Array.from(arguments));
    const resolved: Array<any> = args.map((name: ArgsItemType) => {
      const thisMap = <MapType>dependenciesMap.get(this);
      return thisMap.get(name);
    });
    if (fn) {
      fn.apply(this, resolved);
    }
    return resolved;
  }
}

/**
 * 解析参数
 * eg: const [a, b, c] = resolve('a', 'b', 'c');
 * eg: resolve('a', 'b', 'c', (a, b, c) => {});
 * eg: resolve((a, b, c) => {});
 */
function parseArgs(args: Array<ArgsItemType>) {
  let fn: ArgsItemType = '';
  if (args.length) {
    fn = <ArgsItemType>args.pop();
    if (!getArgType(fn).isFunction) {
      args.push(fn);
      fn = '';
    } else {
      if (!args.length) {
        // just a callback
        args = getArgsFromFunc(fn);
      }
    }
    args = flatten(args);
  }

  return {
    args: <Array<string>>args,
    fn: <Function>fn
  };
}

import { getArgsFromFunc, getArgType, objToMap, log } from '@iuv-tools/utils';
import flatten from 'lodash.flatten';

type MapType = Map<any, any>;
type DepsType = object | MapType | undefined;
export type ArgsItemType = string | Function;
export interface Iinjector {
  add: (name: string, value: any) => void;
  resolve: (...agrs: Array<ArgsItemType>) => Array<any>;
}

// 保护私有栈，防止通过实例调用直接篡改
const dependenciesMap: Map<Iinjector, MapType> = new Map();

export default class Injector implements Iinjector {
  constructor(initDeps?: DepsType) {
    let depsMap: MapType;
    const argType = getArgType(initDeps);

    if (argType.isObject) {
      depsMap = objToMap(initDeps);
    } else if (argType.isMap) {
      depsMap = initDeps as MapType;
    } else {
      depsMap = new Map();
    }
    dependenciesMap.set(this, depsMap);
    // this.deps = depsMap;
  }
  add(name: string, value: any) {
    const nameType = getArgType(name);

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
      log.error(`'name' argument or property must be provided.`, '@eryue/injector');
      process.exit(1);
    }
    
    // older will be replaced
    const thisMap = dependenciesMap.get(this) as MapType;
    thisMap.set(name, value);
  }
  resolve() {
    const { args, fn } = parseArgs(Array.from(arguments));
    const resolved: Array<any> = args.map((name: ArgsItemType) => {
      const thisMap = dependenciesMap.get(this) as MapType;
      return thisMap.get(name);
    });
    if (fn) {
      fn.apply(this, resolved);
    }
    return resolved;
  }
}

function parseArgs(args: Array<ArgsItemType>) {
  let fn: ArgsItemType = '';
  if (args.length) {
    fn = args.pop() as ArgsItemType;
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
    args: args as Array<string>,
    fn: fn as Function
  };
}

// const a = parseArgs([function(a,b,v) {}]);
// console.log(a);

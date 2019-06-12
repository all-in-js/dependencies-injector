import {getArgType, objToMap, assert, _} from '@eryue/utils';

// 保护私有栈，防止通过实例调用直接篡改
const dependenciesMap = new Map();

export default class Injector {
  constructor(initDeps) {
    let depsMap;
    const argType = getArgType(initDeps);

    if(argType.isObject) {
      depsMap = objToMap(initDeps);
    }else if(argType.isMap){
      depsMap = initDeps;
    }else{
      depsMap = new Map();
    }
    dependenciesMap.set(this, depsMap);
    // this.deps = depsMap;
  }
  add(name, value) {
    let depName = name;
    if(!name) {
      if(getArgType(value).isString) {
        depName = value;
      }else if(value.name) {
        depName = value.name;
      }
    }
    
    assert.ok(depName, `'name' argument or property must provided.`);
    
    // older will be replaced
    dependenciesMap.get(this).set(depName, value);
  }
  resolve() {
    const {args, fn} = parseArgs(Array.from(arguments));

    const resolved = args.map(name => dependenciesMap.get(this).get(name));
    
    if(fn) {
      fn.apply(this, resolved);
    }
    return resolved;
  }
}

// const i = new Injector({a:1,b:2});
// i.add('c', 3);
// i.resolve('a', 'b', 'c', function(x, y, z) {
//   console.log(arguments)
// });
// resolve(['a', 'b', 'c'], function(x, y, z) {
  
// });
// resolve(function(a, b, c) {
  
// });
// resolve('a', 'b', 'c');
// resolve(['a', 'b', 'c']);

function parseArgs(args) {
  let fn = null;
  if(args.length) {
    fn = args.pop();
    if(!getArgType(fn).isFunction) {
      args.push(fn);
      fn = null;
    }else{
      if(!args.length) {
        // just a callback
        args = extractArgs(fn);
      }
    }
    args = _.flatten(args);
  }

  return {args, fn};
}


function extractArgs(fn = '') { 
  // reference from angular
  const ARROW_ARG = /^([^\(]+?)=>/; 
  const FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m; 
  const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg; 
  const fnText = fn.toString().replace(STRIP_COMMENTS, '');
  let args = fnText.match(ARROW_ARG) || fnText.match(FN_ARGS) || []; 
  if(args.length) {  
    args = args[1].split(',').map(arg => arg.toString().trim());
  }
  return args; 
}

// const a = parseArgs([function(a,b,v) {}]);
// console.log(a);

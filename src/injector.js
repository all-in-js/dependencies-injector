import {getArgType, objToMap, assert, _} from '@eryue/utils';

export default class Injector {
  constructor(initDeps) {
    let depsMap;
    const argType = getArgType(initDeps);

    if(argType === 'object') {
      depsMap = objToMap(initDeps);
    }else if(argType === 'map'){
      depsMap = initDeps;
    }else{
      depsMap = new Map();
    }
    this.deps = depsMap;
  }
  add(name, value) {
    let depName = name;
    if(!name) {
      if(getArgType(value) === 'string') {
        depName = value;
      }else if(value.name) {
        depName = value.name;
      }
    }
    
    assert.ok(depName, `'name' argument or property must provided.`);
    
    // older will be replaced
    this.deps.set(depName.toLowerCase(), value);
  }
  resolve() {
    const {args, fn} = parseArgs(Array.from(arguments));

    const resolved = args.map(name => this.deps.get(name.toLowerCase()));
    
    if(fn) {
      fn.apply(this, resolved);
    }
    return resolved;
  }
}

// resolve('a', 'b', 'c', function(x, y, z) {

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
    if(getArgType(fn) !== 'function') {
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

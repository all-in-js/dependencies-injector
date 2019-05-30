import {ok as assertOk} from 'assert';

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

    // return 
  }
  add(name, value) {
    let depName = name;
    if(!name) {
      if(getArgType(value) === 'string') {
        depName = value;
      }else if(value.name) {
        depName = value.name.toLowerCase();
      }
    }
    
    assertOk(depName, `'name' argument or property must provided.`);
    
    // older will be replaced
    this.deps.set(depName, value);
  }
  resolve(names, fn) {
    const argType = getArgType(names);
    const depsName = argType === 'string'? [names]: argType === 'array'? names: [];

    const resolved = depsName.map(name => this.deps.get(name));
    
    if(getArgType(fn) === 'function') {
      fn.apply(this, resolved);
    }
    return resolved;
  }
}

function getArgType(agr) {
  return Object.prototype.toString.call(agr).split(/\s/)[1].slice(0, -1).toLowerCase();
}

function objToMap(obj) {
  const map = new Map();
  for (const k of Object.keys(obj)) {
    map.set(k, obj[k]);
  }
  return map;
}


"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@iuv-tools/utils");
const lodash_flatten_1 = __importDefault(require("lodash.flatten"));
/**
 * 保护私有栈，防止通过实例调用直接篡改
 * 所有实例的依赖收集池，每一个实例一个独立的依赖收集Map
 * 目前比较流行的是metadata的做法，意义一样，做法的差别
 */
const dependenciesMap = new Map();
class Injector {
    constructor(initDeps) {
        let depsMap;
        const argType = utils_1.getArgType(initDeps);
        if (argType.isObject) {
            depsMap = utils_1.objToMap(initDeps);
        }
        else if (argType.isMap) {
            depsMap = initDeps;
        }
        else {
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
    add(name, value) {
        const nameType = utils_1.getArgType(name);
        if (!value && name) {
            if (nameType.isString) {
                value = name;
            }
            else if (nameType.isFunction) {
                // 函数和类都是function类型
                value = name;
                name = value.name;
            }
            else {
                value = name;
                name = value.toString();
            }
        }
        if (!name) {
            utils_1.log.error(`'name' argument or property must be provided.`, '@eryue/injector');
            process.exit(1);
        }
        // older will be replaced
        const thisMap = dependenciesMap.get(this);
        thisMap.set(name, value);
    }
    /**
     * 根据key解析依赖
     */
    resolve() {
        const { args, fn } = parseArgs(Array.from(arguments));
        const resolved = args.map((name) => {
            const thisMap = dependenciesMap.get(this);
            return thisMap.get(name);
        });
        if (fn) {
            fn.apply(this, resolved);
        }
        return resolved;
    }
}
exports.default = Injector;
/**
 * 解析参数
 * eg: const [a, b, c] = resolve('a', 'b', 'c');
 * eg: resolve('a', 'b', 'c', (a, b, c) => {});
 * eg: resolve((a, b, c) => {});
 */
function parseArgs(args) {
    let fn = '';
    if (args.length) {
        fn = args.pop();
        if (!utils_1.getArgType(fn).isFunction) {
            args.push(fn);
            fn = '';
        }
        else {
            if (!args.length) {
                // just a callback
                args = utils_1.getArgsFromFunc(fn);
            }
        }
        args = lodash_flatten_1.default(args);
    }
    return {
        args: args,
        fn: fn
    };
}

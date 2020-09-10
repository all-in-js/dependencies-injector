"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("@iuv-tools/utils");
const injector_1 = __importDefault(require("./injector"));
const injector = new injector_1.default();
function Injectable(target) {
    injector.add(target.name, target);
}
exports.Injectable = Injectable;
function Inject(...agrs) {
    const resolved = injector.resolve.apply(injector, agrs);
    return function (target, name, descriptor) {
        if (name && descriptor) {
            const oldValue = descriptor.value;
            // const raw = descriptor.initializer;
            if (utils_1.getArgType(oldValue).isFunction) {
                /**
                 * 装饰类的方法
                 * 将依赖注入第一个参数
                 */
                descriptor.value = function (...args) {
                    return oldValue.apply(this, [resolved, ...args]);
                };
            }
            else {
                /**
                 * 装饰类的属性
                 */
                descriptor.initializer = function () {
                    return resolved;
                };
            }
            return descriptor;
        }
        else {
            // 装饰类
            return extend(target, resolved);
        }
    };
}
exports.Inject = Inject;
function extend(clas, resolved) {
    return class extends clas {
        constructor(...args) {
            super(...[resolved, ...args]);
        }
    };
}
exports.InjectorClass = injector_1.default;
exports.default = injector;

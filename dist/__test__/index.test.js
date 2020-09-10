"use strict";

var _ = _interopRequireWildcard(require("../../"));

var _class;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

let Test = (0, _.Injectable)(_class = class Test {}) || _class;

test('a class can be injected.', () => {
  const resolved = _.default.resolve('Test');

  expect(resolved[0]).toEqual(Test);
});
describe(`a class's props can be injected.`, () => {
  it(`should class's constructor can be injected.`, () => {
    var _dec, _class2;

    let TestInjectConstructor = (_dec = (0, _.Inject)('Test'), _dec(_class2 = class TestInjectConstructor {
      constructor(InjectedTest) {
        this.test = InjectedTest;
      }

    }) || _class2);
    const fromConstructor = new TestInjectConstructor().test;
    expect(fromConstructor[0]).toEqual(Test);
  });
  it(`should class's function prop can be injected.`, () => {
    var _dec2, _class3;

    let TestInjectFunc = (_dec2 = (0, _.Inject)('Test'), (_class3 = class TestInjectFunc {
      test(InjectedTest) {
        return InjectedTest;
      }

    }, (_applyDecoratedDescriptor(_class3.prototype, "test", [_dec2], Object.getOwnPropertyDescriptor(_class3.prototype, "test"), _class3.prototype)), _class3));
    const fromInject = new TestInjectFunc().test();
    expect(fromInject[0]).toEqual(Test);
  });
  it(`should class's prop value can be injected.`, () => {
    var _dec3, _class4, _descriptor, _temp;

    let TestInjectPropValue = (_dec3 = (0, _.Inject)('Test'), (_class4 = (_temp = class TestInjectPropValue {
      constructor() {
        _initializerDefineProperty(this, "test", _descriptor, this);
      }

    }, _temp), (_descriptor = _applyDecoratedDescriptor(_class4.prototype, "test", [_dec3], {
      configurable: true,
      enumerable: true,
      writable: true,
      initializer: function () {
        return 'default value';
      }
    })), _class4));
    const fromInject = new TestInjectPropValue().test;
    expect(fromInject[0]).toEqual(Test);
  });
  it(`when inject to function, should merge injected value and self defined arguments.`, () => {
    var _dec4, _class6;

    let TestInjectFunc = (_dec4 = (0, _.Inject)('Test'), (_class6 = class TestInjectFunc {
      test(InjectedTest, ...myArgs) {
        return [InjectedTest, myArgs];
      }

    }, (_applyDecoratedDescriptor(_class6.prototype, "test", [_dec4], Object.getOwnPropertyDescriptor(_class6.prototype, "test"), _class6.prototype)), _class6));
    const fromInject = new TestInjectFunc().test('myArgs');
    expect(fromInject[0][0]).toEqual(Test);
    expect(fromInject[1][0]).toBe('myArgs');
  });
});
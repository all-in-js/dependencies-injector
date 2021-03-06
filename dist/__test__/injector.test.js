"use strict";

var _ = _interopRequireDefault(require(".."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * @Author: your name
 * @Date: 2021-02-24 16:13:38
 * @LastEditTime: 2021-02-24 19:14:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \workspaced:\opensources\all-in-js\dependencies-injector\src\__test__\injector.test.js
 */
test('support initial dependencies[Map or Object].', () => {
  const initDeps = {
    testObj: function () {
      return true;
    }
  };
  const injector = new _.default(initDeps);
  const [v] = injector.resolve('testObj');
  expect(v()).toBe(true);
});
describe('add one dependency.', () => {
  const injector = new _.default();
  it('add with name.', () => {
    const testObj = {
      v: 1
    };
    injector.add('testObj', testObj);
    const [resolved] = injector.resolve('testObj');
    expect(resolved).toEqual(testObj);
  });
  it('add just one argument.', () => {
    class TestObj {}

    injector.add(TestObj);
    const [resolveClas] = injector.resolve('TestObj');
    expect(resolveClas).toEqual(TestObj);
  });
});
describe('test some way to resolve dependency.', () => {
  const injector = new _.default({
    a: 1,
    b: 2,
    c: 3
  });
  it('resolve with String or Array argument.', () => {
    const [a, b, c] = injector.resolve('a', 'b', 'c');
    const [a1, b1, c1] = injector.resolve(['a', 'b', 'c']);
    expect(a).toBe(1);
    expect(b).toBe(2);
    expect(c).toBe(3);
    expect(a).toBe(a1);
    expect(b).toBe(b1);
    expect(c).toBe(c1);
  });
  it('resolve with last argument is a function.', () => {
    injector.resolve('a', 'b', 'c', function (x, y, z) {
      expect(x).toBe(1);
      expect(y).toBe(2);
      expect(z).toBe(3);
    });
  });
  it('resolve dependencies from function arguments.', () => {
    injector.resolve(function (a, b, c) {
      expect(a).toBe(1);
      expect(b).toBe(2);
      expect(c).toBe(3);
    });
  });
});
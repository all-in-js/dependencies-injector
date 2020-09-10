import injector, {Inject, Injectable} from '../../';

@Injectable
class Test {}

test('a class can be injected.', () => {
  const resolved = injector.resolve('Test');
  expect(resolved[0]).toEqual(Test);
});

describe(`a class's props can be injected.`, () => {
  it(`should class's constructor can be injected.`, () => {
    @Inject('Test')
    class TestInjectConstructor {
      constructor(InjectedTest) {
        this.test = InjectedTest;
      }
    }

    const fromConstructor = new TestInjectConstructor().test;
    expect(fromConstructor[0]).toEqual(Test);
  });

  it(`should class's function prop can be injected.`, () => {
    class TestInjectFunc {
      @Inject('Test')
      test(InjectedTest) {
        return InjectedTest;
      }
    }

    const fromInject = new TestInjectFunc().test();
    expect(fromInject[0]).toEqual(Test);
  });

  it(`should class's prop value can be injected.`, () => {
    class TestInjectPropValue {
      @Inject('Test') test = 'default value';
    }
    const fromInject = new TestInjectPropValue().test;
    expect(fromInject[0]).toEqual(Test);
  });

  it(`when inject to function, should merge injected value and self defined arguments.`, () => {
    class TestInjectFunc {
      @Inject('Test')
      test(InjectedTest, ...myArgs) {
        return [InjectedTest, myArgs];
      }
    }

    const fromInject = new TestInjectFunc().test('myArgs');
    expect(fromInject[0][0]).toEqual(Test);
    expect(fromInject[1][0]).toBe('myArgs');
  });
});
[![npm](https://img.shields.io/npm/v/@eryue/injector.svg?label=version)](https://www.npmjs.com/package/@eryue/injector) [![Build Status](https://travis-ci.org/famanoder/dependencies-injector.svg?branch=master)](https://travis-ci.org/famanoder/dependencies-injector) [![Coverage Status](https://coveralls.io/repos/github/famanoder/dependencies-injector/badge.svg?branch=master)](https://coveralls.io/github/famanoder/dependencies-injector?branch=master)

> a Javascript & Nodejs dependencies injector

### Usage

* **Injector class**

```js
import Injector from '@eryue/injector';

const initDeps = {
  key: function key() {}
};
const inject = new Injector(initDeps);

inject.add(class TestService{});

inject.resolve(['TestService', 'key'], function(testService, key) {});
// or
const [testService] = inject.resolve('TestService');

// this `inject.resolve` support various types, eg:
// `inject.resolve(string[array<string>[function]])` 
// if argument just is a function, it's arguments would be parsed to be an array to be resolved.
```

* **Decorator**

```js
import {Injectable} from '@eryue/injector';

@Injectable
class TestService {}
```

* inject to constructor

```js
import {Inject} from '@eryue/injector';

@Inject('TestService')
class TestControler {
  constructor(testService) {
    this.testService = testService;
  }
}
```

* inject to class's function prop

```js
import {Inject} from '@eryue/injector';

class TestControler {
  @Inject('TestService')
  test(testService) {
    // ...
  }
}
```

* inject to class's value prop

```js
import {Inject} from '@eryue/injector';

class TestControler {
  @Inject('TestService') testService;
  toString() {
    // this.testService
  }
}
```

* when inject to class's function prop, merge injected value and your arguments.

```js
import {Inject} from '@eryue/injector';

class TestControler {
  @Inject('TestService')
  test(testService, yourArguments) {
    // ...
  }
}

new TestControler().test('yourArguments');
```

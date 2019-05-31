> a Javascript & Nodejs dependencies injector

### Usage

* Injector class

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
```

```
// this `inject.resolve` support various types, eg:
// `inject.resolve(string[array<string>[function]])` 
// if argument just is a function, it's arguments would be parsed to be an array to be resolved.
```

* Decorator

```js
import {Injectable, Inject} from '@eryue/injector';

@Injectable
class TestService {}

@Inject('TestService')
class TestControler {
  constructor(testService) {
    this.testService = testService;
  }
}
```

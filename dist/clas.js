"use strict";

class Test {
  constructor(opt) {
    this.a = 123;
    this.a = 12345;
  }

  toString() {
    console.log(this.a);
  }

}

new Test().toString();
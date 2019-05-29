"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Injectable;
exports.UserService = void 0;

var _class;

function Injectable() {}

let UserService = Injectable(_class = class UserService {
  constructor(id) {
    this.id = id;
  }

  getUserInfo(id) {
    console.log('id');
  }

}) || _class;

exports.UserService = UserService;
'use strict';

const Innjector = require('../index');
const injector = new Innjector(process.cwd(), function (err, container) {
  container.get('baseModule').doSomeThing('abcd');
});

injector.load(process.cwd(), function (err, container) {
  console.log('NEW', container);
});

injector.load('/Users/peizanwang/Programs/authentication-server/api/');


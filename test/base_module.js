'use strict';

function baseModule(dbModule) {
  const name = dbModule.read('name');
  console.log('Base module log', name);

  return {
    doSomeThing: function (task) {
      console.log('Doing task', task);
    }
  }
}

module.exports = baseModule;

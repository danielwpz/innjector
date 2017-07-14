'use strict';

function myDao() {
  return {
    read: function (name) {
      return 'Hello from ' + name;
    }
  }
}

myDao._innModuleName = 'dbModule';

module.exports = myDao;

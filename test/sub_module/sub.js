function subModule() {
  return {
    subRun: function() {
      console.log('sub module running...');
    }
  };
}

module.exports = subModule;
module.exports._moduleName = 'subModule';
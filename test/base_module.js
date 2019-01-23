function baseModule(subModule) {
  return {
    run: function() {
      console.log('base module running...');
      return subModule.subRun();
    }
  };
}

module.exports = baseModule;
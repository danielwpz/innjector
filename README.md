# Innjector

Another dependency injection library for JS.

## Usage

```
const Innjector = require('innjector');

async function run() {
  const injector = new Innjector();
  await injector.load(process.cwd());

  const baseModule = injector.container.get('yourApp');
  yourApp.run();
}
```

In your module, the exported function should follow the convention of [dependable](https://github.com/testdouble/dependable) functions.    
And if you want to override the name of the module, just do `module.exports._moduleName = 'myName'`.
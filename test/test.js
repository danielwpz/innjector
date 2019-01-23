const Innjector = require('../index');


async function test() {
  const injector = new Innjector();
  await injector.load(process.cwd());

  const baseModule = injector.container.get('baseModule');
  baseModule.run();
}

test();

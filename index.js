const dependable = require('dependable');
const filewalker = require('filewalker');
const nodePath = require('path');
const _ = require('lodash');
const debug = require('debug')('innjector');


class Innjector {
  constructor() {
    this.container = dependable.container();
  }

  async load(path) {
    await loadFromPath(path, this.container);
    return this;
  }
}

function loadFromPath(path, container) {
  return new Promise((resolve, reject) => {
    filewalker(path)
      .on('file', (p, s, a) => {
        // skip node_modules
        if (p.includes('node_modules')) {
          return;
        }

        if (nodePath.extname(p) === '.js') {
          try {
            const mod = require(a);
            if (mod) {
              const moduleName = getModuleName(p, mod);
              container.register(moduleName, mod);
              debug('registered %s', moduleName);
            }
          } catch (err) {
            debug(err);
          }
        }
      })
      .on('error', err => {
        reject(err);
      })
      .on('done', () => {
        debug('done');
        resolve(container);
      })
      .walk();
  });
}

function getModuleName(path, mod) {
  if (mod._moduleName) {
    return mod._moduleName;
  } else {
    const filename = nodePath.basename(path, nodePath.extname(path));
    return _.camelCase(filename);
  }
}

module.exports = Innjector;
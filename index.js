'use strict';
const dependable = require('dependable');
const filewalker = require('filewalker');
const path = require('path');
const _ = require('lodash');
const logger = require('winston');


const defaultOption = {
  strict: false,
  verbose: false
};

function Innjector(path, opt, cb) {
  if (opt && opt.verbose) {
    logger.level = 'debug';
  }
  this.container = dependable.container();
  this.load.apply(this, arguments);
}

Innjector.prototype.load = function (path, opt, cb) {
  if (!cb) {
    cb = opt;
    opt = {};
  }
  opt = _.defaults(opt, defaultOption);

  loadFromPath(path, this.container, opt, cb);
  return this;
};

function loadFromPath(basePath, container, opt, cb) {
  filewalker(basePath)
    .on('file', (p, s, a) => {
      if (path.extname(p) === '.js') {
        try {
          const mod = require(a);

          if (!opt.strict || (mod && mod._innModule)) {
            doRegistration(container, p, mod);
          }
        } catch (e) {
          logger.debug(e);
        }
      }
    })
    .on('error', err => {
      logger.error(err);
      if (cb) cb(err);
    })
    .on('done', () => {
      logger.debug('Innjector init finished', basePath);
      if (cb) cb(undefined, container);
    })
    .walk();
}

function doRegistration(container, p, mod) {
  const name = getModuleName(p, mod);
  container.register(name, mod._innModule ? mod._innModule : mod);
  logger.debug('Registered', name, p);
}

function getModuleName(p, m) {
  if (m._innModuleName) {
    return m._innModuleName;
  } else {
    const filename = path.basename(p, path.extname(p));
    return _.camelCase(filename);
  }
}

module.exports = Innjector;
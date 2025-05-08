const fp = require('fastify-plugin');
const path = require('node:path');

module.exports = fp(
  async (fastify, options) => {
    options = Object.assign(
      {},
      {
        maxAttempts: 10,
        length: 6,
        dbTableNamePrefix: 't_'
      },
      options
    );

    fastify.register(require('@kne/fastify-namespace'), {
      name: 'shorten',
      options,
      modules: [
        [
          'models',
          await fastify.sequelize.addModels(path.resolve(__dirname, './libs/models'), {
            prefix: options.dbTableNamePrefix
          })
        ],
        ['services', path.resolve(__dirname, './libs/services')]
      ]
    });
  },
  {
    name: 'fastify-shorten'
  }
);

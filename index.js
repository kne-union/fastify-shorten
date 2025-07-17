const fp = require('fastify-plugin');
const path = require('node:path');
const { Unauthorized } = require('http-error');

module.exports = fp(
  async (fastify, options) => {
    options = Object.assign(
      {},
      {
        name: 'shorten',
        headerName: 'x-user-code',
        maxAttempts: 10,
        length: 6,
        dbTableNamePrefix: 't_shorten_'
      },
      options
    );

    fastify.register(require('@kne/fastify-namespace'), {
      name: options.name,
      options,
      modules: [
        [
          'models',
          await fastify.sequelize.addModels(path.resolve(__dirname, './libs/models'), {
            prefix: options.dbTableNamePrefix
          })
        ],
        ['services', path.resolve(__dirname, './libs/services')],
        [
          'authenticate',
          {
            code: async request => {
              const code = request.headers[options.headerName];
              if (!code) {
                throw new Unauthorized(`${options.headerName} is required`);
              }
              try {
                request.shortenCode = code;
                request.authenticatePayload = JSON.parse(await fastify[options.name].services.decode(code));
              } catch (e) {
                throw new Unauthorized(`${options.headerName} is invalid`);
              }
            }
          }
        ]
      ]
    });
  },
  {
    name: 'fastify-shorten'
  }
);

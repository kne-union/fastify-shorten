const fp = require('fastify-plugin');
const path = require('node:path');

module.exports = fp(async (fastify, options) => {
  options = Object.assign({}, {
    name: 'shorten', maxAttempts: 10, length: 6, dbTableNamePrefix: 't_'
  }, options);

  fastify.register(require('@kne/fastify-namespace'), {
    name: options.name,
    options,
    modules: [['models', await fastify.sequelize.addModels(path.resolve(__dirname, './libs/models'), {
      prefix: options.dbTableNamePrefix
    })], ['services', path.resolve(__dirname, './libs/services')], ['authenticate', {
      code: async request => {
        const code = request.headers['x-user-code'];
        if (!code) {
          throw new Error('X-User-Code is required');
        }
        try {
          request.authenticatePayload = JSON.parse(await fastify[options.name].services.decode(code));
        } catch (e) {
          throw new Error('X-User-Code is invalid');
        }
      }
    }]]
  });
}, {
  name: 'fastify-shorten'
});

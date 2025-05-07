const Fastify = require('fastify');
const { test } = require('node:test');

test('Test namespace', async t => {
  const fastify = Fastify();
  fastify.register(require('@kne/fastify-sequelize'), {
    db: {
      dialect: 'sqlite',
      storage: ':memory:'
    }
  });
  fastify.register(require('fastify-plugin')(require('../index')));
  fastify.register(
    require('fastify-plugin')(async fastify => {
      await fastify.sequelize.sync();
    })
  );
  await fastify.ready();
  const inputStr = 'test1';
  const target = await fastify.shorten.services.sign(inputStr);
  t.assert.strictEqual(await fastify.shorten.services.decode(target), inputStr);
});

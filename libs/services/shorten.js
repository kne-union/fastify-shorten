const fp = require('fastify-plugin');
const crypto = require('node:crypto');

// 生成哈希的函数
const generateHash = input => {
  return crypto.createHash('md5').update(input).digest('hex');
};

function generateSecureRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

module.exports = fp(async (fastify, options) => {
  options = Object.assign({}, {
    maxAttempts: 10, length: 6
  }, options);
  const { models } = fastify[options.name];

  const sign = async (target, expires) => {
    const hash = generateHash(target);
    const historyShorten = await models.shorten.findOne({ where: { hash } });
    if (historyShorten?.expires && Date.now() > historyShorten.expires) {
      await historyShorten.destroy();
    } else if (historyShorten) {
      return historyShorten.shorten;
    }

    const generateUniqueShortCode = async () => {
      let shortCode;
      let attempts = 0;
      const maxAttempts = options.maxAttempts; // 最大尝试次数
      do {
        shortCode = generateSecureRandomString(options.length);
        attempts++;
        if (attempts > maxAttempts) {
          throw new Error('Failed to generate unique short code');
        }
      } while ((await models.shorten.count({ where: { shorten: shortCode } })) > 0);
      return shortCode;
    };

    const shorten = (await generateUniqueShortCode()).toUpperCase();

    await models.shorten.create({ target, hash, shorten, expires });

    return shorten;
  };

  const decode = async shorten => {
    const shortenItem = await models.shorten.findOne({ where: { shorten: shorten.toUpperCase() } });
    if (!shortenItem) {
      throw new Error('shorten error');
    }
    const { target, expires } = shortenItem;
    if (expires && Date.now() > expires) {
      throw new Error('shorten expired');
    }
    return target;
  };

  const remove = async shorten => {
    const shortenItem = await models.shorten.findOne({ where: { shorten: shorten.toUpperCase() } });
    if (!shortenItem) {
      return;
    }
    await shortenItem.destroy();
  };

  Object.assign(fastify[options.name].services, {
    sign, decode, remove
  });
});

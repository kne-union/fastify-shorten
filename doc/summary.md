#### 功能概述

Fastify Shorten 是一个专为 Fastify 框架设计的 URL 缩短服务插件，提供完整的短链接生成和管理功能。

#### 核心特性

- 🚀 **高性能短链生成**：基于高效算法快速生成短码
- 🔗 **URL 重定向**：自动将短链接重定向到原始 URL
- 🛠️ **可配置选项**：支持自定义短码长度、重试机制等
- 🗃️ **数据库集成**：自动管理短链接存储表
#### 使用场景

1. 营销活动链接追踪
2. 社交媒体链接优化
3. 企业内部链接管理
4. 需要缩短长URL的任何应用

#### 基本用法
```javascript
const fastify = require('fastify')();
const shortenPlugin = require('@kne/fastify-shorten');

// 注册插件
fastify.register(shortenPlugin, {
  // 此处填写配置项
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log('服务器运行在 3000 端口');
});
```

#### 注意事项
1. 需要预先配置好数据库连接
2. 确保数据库用户有创建表的权限
3. 生产环境建议修改默认表名前缀

#### 许可证
[MIT](https://opensource.org/licenses/MIT)
#### 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `maxAttempts` | number | `10` | 生成唯一短码的最大尝试次数 |
| `length` | number | `6` | 生成的短码长度 |
| `dbTableNamePrefix` | string | `'t_'` | 数据库表名前缀 |

#### 命名空间注册
本插件通过 `@kne/fastify-namespace` 自动注册到 `shorten` 命名空间下，所有相关方法可通过 `fastify.shorten` 访问。

#### 自定义配置示例
```javascript
fastify.register(shortenPlugin, {
  maxAttempts: 15,      // 增加尝试次数
  length: 8,            // 生成长度8的短码
  dbTableNamePrefix: 'short_' // 自定义表前缀
});
```
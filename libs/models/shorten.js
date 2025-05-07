module.exports = ({ DataTypes }) => {
  return {
    model: {
      target: {
        type: DataTypes.TEXT,
        comment: '目标内容'
      },
      hash: {
        type: DataTypes.STRING,
        comment: '目标内容hash'
      },
      shorten: {
        type: DataTypes.STRING,
        comment: '短字符串'
      },
      expires: {
        type: DataTypes.DATE,
        comment: '有效期'
      }
    },
    options: {
      indexes: [
        {
          name: 'shorten_unique_key',
          unique: true,
          fields: ['shorten', 'deleted_at']
        },
        {
          name: 'shorten_hash_unique_key',
          unique: true,
          fields: ['hash', 'deleted_at']
        }
      ]
    }
  };
};

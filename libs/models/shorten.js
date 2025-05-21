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
      comment: '短链接',
      indexes: [
        {
          unique: true,
          fields: ['shorten', 'deleted_at']
        },
        {
          unique: true,
          fields: ['hash', 'deleted_at']
        }
      ]
    }
  };
};


module.exports = (sequelize, DataTypes) => {
  const Shares = sequelize.define('Shares', {
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: DataTypes.STRING,
    allowNull: false,
  }, {});
  Shares.associate = (models) => {
    // associations can be defined here
    Shares.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Shares;
};

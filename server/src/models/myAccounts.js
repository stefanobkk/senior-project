module.exports = (sequelize, DataTypes) => {
  const Api = sequelize.define('Api', {
    exchange: DataTypes.STRING,
    nickname: {
      type: DataTypes.STRING,
      unique: true
    },
    publicApi: {
      type: DataTypes.STRING,
      unique: true
    },
    privateApi: {
      type: DataTypes.STRING,
      unique: true
    }
  })
  return Api
}

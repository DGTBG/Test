const _model = module.exports = {};
_model.findOne = async function (sequelize, condition) {
    return await sequelize.findOne(condition)
  }
  _model.create = async function (sequelize, model) {
    return await sequelize.create(model);
  };
var bcrypt=require("bcrypt-nodejs");
module.exports = function (sequelize, DataTypes) {
    var control_user = sequelize.define('control_user',{
        id: {type: DataTypes.INTEGER(10), allowNull: false, primaryKey: true,autoIncrement:true,comment: '主键ID'},
        name:{type:DataTypes.STRING(255),allowNull:true},
        password:{type:DataTypes.STRING(255),allowNull:true,
          set: function (val) {
              var salt=bcrypt.genSaltSync(10);
              var hash=bcrypt.hashSync(val,salt);
              this.setDataValue('password', hash);
          },
        },
    });
    return control_user;
}

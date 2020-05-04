const bcrypt=require("bcrypt-nodejs");
const jwt=require("jsonwebtoken");
const _model=require('../../models/action');//引入action封装的数据库相应操作
const userSequelize=require('../../models/index').control_user;
module.exports = {
    login: async function (req, res, next) {
      var body={code:'01',result:''};
      try {
        var condition = {
          attributes:['name','password'],
          where: {
            name: req.body.name
          }
        }
        var user = await _model.findOne(userSequelize, condition);
        if (!!user) {
          if(bcrypt.compareSync(req.body.password, user.password)){
            var token = jwt.sign({name:user.name}, req.session.secret, {
              expiresIn: 60*60*24
            })
            body.result=user;
            body.token=token;
          } else {
            body.code='02';
            body.result='Wrong password';
          }
        } else {
          body.code='02';
          body.result='User does not exist';
        }
      } catch (e) {
        body.code='02';
        body.result=e.message;
      }finally {
        res.json(body);
      }
    },
    register:  async function (req, res) {
      var body={code:'01',result:''};
      try{
        var result=await _model.create(userSequelize,req.body);
        body.result=result;
      }catch (e) {
        body.code='02';
        body.result=e.message;
      }finally {
        res.json(body);
      }
    },
  }
const express=require('express');
const jwt=require("jsonwebtoken");
const config = require('../../config');

const router = express.Router();

router.use(function(req, res, next) {
    req.session.secret=config.dev.secret;
    if(req.url!='/login'&&req.url!='/register'){
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token) {
        jwt.verify(token, req.session.secret, function (err, decoded) {
          if (err) {
            return res.json({code:'03', result: 'Failed to authenticate token.'})
          } else {
            next();
          }
        })
      } else {
        return res.json({code:'03', result: 'No token provided.'})
      }
    }else{
      // 输出记录信息
      console.log(req.method, req.url);
      // 继续路由处理
      next();
    }
});

router.post('/login', userContoller.login);
router.post('/register', userContoller.register);
module.exports=router;
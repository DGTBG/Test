import axios from 'axios'
import qs from 'qs'
// import { ElDropdownItem } from 'element-ui/types/dropdown-item';
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:8080/api/v1';

//请求拦截，查看是否存在token
axios.interceptors.request.use((config) => {
    if(config.method  === 'post'){
        let token=localStorage.getItem('token');
        if(token){
          config.data=config.data||{};
          config.data.token=token;
        }
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) =>{
    if(res.status!==200){
        return Promise.reject(res);
    }
    if(res.data.code=='03'){  //无token
      window.location='http://localhost:8080/login?no_token=1';
      return;
    }
    return res;
}, (error) => {
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
            .catch((error) => {
               reject(error)
            })
    })
}

export default{
    /**
     * 用户登陆
     */
    Login(params) {
        return fetch('/login', params)
      },
      /**
       * 用户注册 
       */
      Register(params) {
        return fetch('/register', params)
      },
      /**
       * 提交新创建的问卷
       */
      PostNewQuestionnaire(params){
        return fetch('/post-new-questionnaire',params)
      },
      /**
       * 获取问卷信息生成问卷作答
       */
      GetQuestionnaireToanswer(params){
          return fetch('/get-questionnaire-to-answer',params)
      },
      /**
       * 提交作答结果
       */
      PostAnswers(params){
          return fetch('/post-answers',params)
      },
}
import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import qs from "qs";
import isPlainObject from "lodash/isPlainObject";
import store from "@/store";
import { Toast } from "vant";

axios.defaults.baseURL =
  "http://easymock.jeemoo.net/mock/5eb21b019e09c900161da1a0/test/";
axios.defaults.withCredentials = true;
(axios.defaults.timeout = 1000 * 180),
  /**
   * 请求拦截
   */
  axios.interceptors.request.use(
    config => {
      config.headers["content-type"] = "application/x-www-form-urlencoded";
      config.headers.token = "1";
      // 默认参数
      const defaults = {
        uid: 1
      };

      // 防止缓存，GET请求默认带_t参数
      if (config.method === "get") {
        config.params = {
          ...config.params,
          ...{ _t: new Date().getTime() }
        };
      }
      if (isPlainObject(config.params)) {
        config.params = {
          ...defaults,
          ...config.params
        };
      }
      if (isPlainObject(config.data)) {
        config.data = {
          ...defaults,
          ...config.data
        };
        if (
          /^application\/x-www-form-urlencoded/.test(
            config.headers["content-type"]
          )
        ) {
          config.data = qs.stringify(config.data);
        }
      }
      return config;
    },
    error => Promise.reject(error)
  );

/**
 * 响应拦截
 */
axios.interceptors.response.use(
  response => {
    // if (response.data.code === 1500) {
    //     console.log('登录失效 重新登录')
    //     Cookies.remove('tokenObj')
    //     Cookies.remove('userinfo')
    //     router.go(0)
    //     return Promise.reject(error);
    // }
    return response;
  },
  error => {
    console.error(error); // eslint-disable-line
    return Promise.reject(error);
  }
);

const http = {
  /** get 请求
   * @param  {接口地址} url
   * @param  {请求参数} params
   */
  get: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          Toast.clear();
          Toast.fail("网络不稳定");
          reject(error);
        });
    });
  },
  post: function(url, params) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then(response => {
          // console.log(response)
          if (response.data.code != 200) {
            Toast.clear();
            Toast.fail(response.data.message || "网络不稳定");
            reject(response.data);
          } else {
            Toast.clear();
            resolve(response.data);
          }
        })
        .catch(error => {
          Toast.clear();
          Toast.fail("网络不稳定");
          reject(error);
        });
    });
  }
};

export default http;

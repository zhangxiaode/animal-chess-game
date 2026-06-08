System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Singleton, DataManager, _dec, _class, _crd, ccclass, HttpManager;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "./DataManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }, function (_unresolved_3) {
      DataManager = _unresolved_3.DataManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4b961qhGDJG1LN7XbotPsG9", "HttpManager", undefined);

      __checkObsolete__(['_decorator', 'sys']);

      ({
        ccclass
      } = _decorator);
      /**
       * 请求配置接口
       */

      /**
       * 响应数据接口（与后端约定统一格式）
       */

      _export("HttpManager", HttpManager = (_dec = ccclass('HttpManager'), _dec(_class = class HttpManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          // 基础API地址（根据你的项目修改）
          this._baseUrl = 'https://api.yourdomain.com/v1';
          // 默认超时时间（毫秒）
          this._defaultTimeout = 10000;
          // 默认重试次数
          this._defaultRetry = 1;
          // 是否显示全局加载提示
          this._showGlobalLoading = true;
          // 当前正在请求的数量
          this._pendingRequests = 0;
        }

        /**
         * 初始化HTTP管理器
         * @param baseUrl 基础API地址
         */
        init(baseUrl) {
          if (baseUrl) {
            this._baseUrl = baseUrl;
          }
        }
        /**
         * GET请求
         * @param url 请求地址
         * @param params 请求参数
         * @param config 额外配置
         */


        get(url, params, config) {
          var _this = this;

          return _asyncToGenerator(function* () {
            return _this.request(_extends({
              url,
              method: 'GET',
              data: params
            }, config));
          })();
        }
        /**
         * POST请求（JSON格式）
         * @param url 请求地址
         * @param data 请求数据
         * @param config 额外配置
         */


        post(url, data, config) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            return _this2.request(_extends({
              url,
              method: 'POST',
              data,
              headers: _extends({
                'Content-Type': 'application/json'
              }, config == null ? void 0 : config.headers)
            }, config));
          })();
        }
        /**
         * POST请求（表单格式）
         * @param url 请求地址
         * @param data 请求数据
         * @param config 额外配置
         */


        postForm(url, data, config) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var formData = new FormData();

            if (data) {
              Object.keys(data).forEach(key => {
                formData.append(key, data[key]);
              });
            }

            return _this3.request(_extends({
              url,
              method: 'POST',
              data: formData
            }, config));
          })();
        }
        /**
         * 统一请求方法
         */


        request(config) {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var {
              url,
              method,
              data,
              headers = {},
              timeout = _this4._defaultTimeout,
              retry = _this4._defaultRetry,
              showLoading = _this4._showGlobalLoading,
              loadingText = '加载中...'
            } = config; // 拼接完整URL

            var fullUrl = _this4._buildUrl(url, method, data); // 添加通用请求头


            var finalHeaders = _extends({
              'Accept': 'application/json'
            }, headers); // 添加用户token（如果有）


            var token = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).getInstance().getLocal('token');

            if (token) {
              finalHeaders['Authorization'] = "Bearer " + token;
            } // 显示加载提示


            if (showLoading) {
              _this4._showLoading(loadingText);
            }

            try {
              // 执行请求（带重试）
              var response = yield _this4._executeRequest(fullUrl, method, data, finalHeaders, timeout, retry); // 隐藏加载提示

              if (showLoading) {
                _this4._hideLoading();
              }

              return response;
            } catch (error) {
              // 隐藏加载提示
              if (showLoading) {
                _this4._hideLoading();
              } // 统一错误处理


              _this4._handleError(error);

              throw error;
            }
          })();
        }
        /**
         * 执行请求（带重试逻辑）
         */


        _executeRequest(url, method, data, headers, timeout, retry) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var lastError;

            for (var i = 0; i <= retry; i++) {
              try {
                return yield _this5._fetchWithTimeout(url, method, data, headers, timeout);
              } catch (error) {
                lastError = error;
                console.warn("\u8BF7\u6C42\u5931\u8D25\uFF0C\u91CD\u8BD5 " + (i + 1) + "/" + (retry + 1), error); // 如果是最后一次重试，不再等待

                if (i < retry) {
                  yield _this5._sleep(1000 * (i + 1)); // 指数退避
                }
              }
            }

            throw lastError;
          })();
        }
        /**
         * 带超时的fetch请求
         */


        _fetchWithTimeout(url, method, data, headers, timeout) {
          return new Promise((resolve, reject) => {
            // 创建超时控制器
            var controller = new AbortController();
            var timeoutId = setTimeout(() => {
              controller.abort();
              reject(new Error('请求超时'));
            }, timeout); // 构建请求选项

            var options = {
              method,
              headers,
              signal: controller.signal
            }; // 添加请求体

            if (method === 'POST' && data) {
              if (data instanceof FormData) {
                options.body = data;
              } else {
                options.body = JSON.stringify(data);
              }
            } // 执行请求


            fetch(url, options).then(response => {
              clearTimeout(timeoutId);

              if (!response.ok) {
                throw new Error("HTTP\u9519\u8BEF: " + response.status + " " + response.statusText);
              }

              return response.json();
            }).then(apiResponse => {
              // 根据后端约定的code处理响应
              if (apiResponse.code === 200) {
                resolve(apiResponse.data);
              } else {
                throw new Error(apiResponse.message || '请求失败');
              }
            }).catch(error => {
              clearTimeout(timeoutId);
              reject(error);
            });
          });
        }
        /**
         * 构建完整URL
         */


        _buildUrl(url, method, data) {
          // 如果是完整URL，直接返回
          if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
          } // 拼接基础URL


          var fullUrl = this._baseUrl + url; // GET请求拼接参数

          if (method === 'GET' && data) {
            var params = new URLSearchParams();
            Object.keys(data).forEach(key => {
              if (data[key] !== undefined && data[key] !== null) {
                params.append(key, data[key].toString());
              }
            });
            var queryString = params.toString();

            if (queryString) {
              fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryString;
            }
          }

          return fullUrl;
        }
        /**
         * 显示加载提示
         */


        _showLoading(text) {
          this._pendingRequests++; // 这里可以调用你的全局加载弹窗
          // 示例：PopupManager.getInstance().openPopup('prefabs/popups/LoadingPopup', { text });

          console.log('显示加载:', text);
        }
        /**
         * 隐藏加载提示
         */


        _hideLoading() {
          this._pendingRequests--;

          if (this._pendingRequests <= 0) {
            this._pendingRequests = 0; // 这里可以关闭你的全局加载弹窗
            // 示例：PopupManager.getInstance().closePopup();

            console.log('隐藏加载');
          }
        }
        /**
         * 统一错误处理
         */


        _handleError(error) {
          console.error('HTTP请求错误:', error); // 可以在这里添加全局错误提示
          // 示例：Toast.show(error.message || '网络请求失败，请稍后重试');
          // 处理特定错误码

          if (error.message.includes('401')) {
            // token过期，跳转到登录页
            (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
              error: Error()
            }), DataManager) : DataManager).getInstance().removeLocal('token'); // UIManager.getInstance().backToHome();
          }
        }
        /**
         * 睡眠函数
         */


        _sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
        /**
         * 设置基础API地址
         */


        setBaseUrl(url) {
          this._baseUrl = url;
        }
        /**
         * 设置是否显示全局加载提示
         */


        setShowGlobalLoading(show) {
          this._showGlobalLoading = show;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e910cb3eaa96a186fae8422624fd637735800e8a.js.map
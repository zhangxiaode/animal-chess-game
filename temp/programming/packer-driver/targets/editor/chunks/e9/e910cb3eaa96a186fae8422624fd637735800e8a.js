System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Singleton, DataManager, _dec, _class, _crd, ccclass, HttpManager;

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
        constructor(...args) {
          super(...args);
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


        async get(url, params, config) {
          return this.request({
            url,
            method: 'GET',
            data: params,
            ...config
          });
        }
        /**
         * POST请求（JSON格式）
         * @param url 请求地址
         * @param data 请求数据
         * @param config 额外配置
         */


        async post(url, data, config) {
          return this.request({
            url,
            method: 'POST',
            data,
            headers: {
              'Content-Type': 'application/json',
              ...(config == null ? void 0 : config.headers)
            },
            ...config
          });
        }
        /**
         * POST请求（表单格式）
         * @param url 请求地址
         * @param data 请求数据
         * @param config 额外配置
         */


        async postForm(url, data, config) {
          const formData = new FormData();

          if (data) {
            Object.keys(data).forEach(key => {
              formData.append(key, data[key]);
            });
          }

          return this.request({
            url,
            method: 'POST',
            data: formData,
            ...config
          });
        }
        /**
         * 统一请求方法
         */


        async request(config) {
          const {
            url,
            method,
            data,
            headers = {},
            timeout = this._defaultTimeout,
            retry = this._defaultRetry,
            showLoading = this._showGlobalLoading,
            loadingText = '加载中...'
          } = config; // 拼接完整URL

          const fullUrl = this._buildUrl(url, method, data); // 添加通用请求头


          const finalHeaders = {
            'Accept': 'application/json',
            ...headers
          }; // 添加用户token（如果有）

          const token = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('token');

          if (token) {
            finalHeaders['Authorization'] = `Bearer ${token}`;
          } // 显示加载提示


          if (showLoading) {
            this._showLoading(loadingText);
          }

          try {
            // 执行请求（带重试）
            const response = await this._executeRequest(fullUrl, method, data, finalHeaders, timeout, retry); // 隐藏加载提示

            if (showLoading) {
              this._hideLoading();
            }

            return response;
          } catch (error) {
            // 隐藏加载提示
            if (showLoading) {
              this._hideLoading();
            } // 统一错误处理


            this._handleError(error);

            throw error;
          }
        }
        /**
         * 执行请求（带重试逻辑）
         */


        async _executeRequest(url, method, data, headers, timeout, retry) {
          let lastError;

          for (let i = 0; i <= retry; i++) {
            try {
              return await this._fetchWithTimeout(url, method, data, headers, timeout);
            } catch (error) {
              lastError = error;
              console.warn(`请求失败，重试 ${i + 1}/${retry + 1}`, error); // 如果是最后一次重试，不再等待

              if (i < retry) {
                await this._sleep(1000 * (i + 1)); // 指数退避
              }
            }
          }

          throw lastError;
        }
        /**
         * 带超时的fetch请求
         */


        _fetchWithTimeout(url, method, data, headers, timeout) {
          return new Promise((resolve, reject) => {
            // 创建超时控制器
            const controller = new AbortController();
            const timeoutId = setTimeout(() => {
              controller.abort();
              reject(new Error('请求超时'));
            }, timeout); // 构建请求选项

            const options = {
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
                throw new Error(`HTTP错误: ${response.status} ${response.statusText}`);
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


          let fullUrl = this._baseUrl + url; // GET请求拼接参数

          if (method === 'GET' && data) {
            const params = new URLSearchParams();
            Object.keys(data).forEach(key => {
              if (data[key] !== undefined && data[key] !== null) {
                params.append(key, data[key].toString());
              }
            });
            const queryString = params.toString();

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
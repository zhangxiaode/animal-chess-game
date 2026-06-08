System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, sys, Singleton, _dec, _class, _crd, ccclass, DataManager;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      sys = _cc.sys;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39a79MJysxPyJCmayszbpUE", "DataManager", undefined);

      __checkObsolete__(['_decorator', 'sys']);

      ({
        ccclass
      } = _decorator);

      _export("DataManager", DataManager = (_dec = ccclass('DataManager'), _dec(_class = class DataManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this._localData = {};
          this._globalData = {};
        }

        /**
         * 初始化数据管理器
         */
        init() {
          // 加载本地存储数据
          const savedData = sys.localStorage.getItem('game_data');

          if (savedData) {
            try {
              this._localData = JSON.parse(savedData);
            } catch (e) {
              console.error('解析本地数据失败', e);
              this._localData = {};
            }
          }
        }
        /**
         * 获取本地数据
         * @param key 键名
         * @param defaultValue 默认值
         */


        getLocal(key, defaultValue) {
          return this._localData[key] !== undefined ? this._localData[key] : defaultValue;
        }
        /**
         * 设置本地数据
         * @param key 键名
         * @param value 值
         */


        setLocal(key, value) {
          this._localData[key] = value;

          this._saveLocalData();
        }
        /**
         * 删除本地数据
         * @param key 键名
         */


        removeLocal(key) {
          delete this._localData[key];

          this._saveLocalData();
        }
        /**
         * 清空所有本地数据
         */


        clearLocal() {
          this._localData = {};
          sys.localStorage.removeItem('game_data');
        }
        /**
         * 获取全局临时数据
         * @param key 键名
         * @param defaultValue 默认值
         */


        getGlobal(key, defaultValue) {
          return this._globalData[key] !== undefined ? this._globalData[key] : defaultValue;
        }
        /**
         * 设置全局临时数据
         * @param key 键名
         * @param value 值
         */


        setGlobal(key, value) {
          this._globalData[key] = value;
        }
        /**
         * 删除全局临时数据
         * @param key 键名
         */


        removeGlobal(key) {
          delete this._globalData[key];
        }

        _saveLocalData() {
          sys.localStorage.setItem('game_data', JSON.stringify(this._localData));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=237757f898bea2d77e719b22285426f1f9ec6476.js.map
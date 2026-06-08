System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, resources, SpriteFrame, AudioClip, Prefab, Singleton, _dec, _class, _crd, ccclass, ResManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      resources = _cc.resources;
      SpriteFrame = _cc.SpriteFrame;
      AudioClip = _cc.AudioClip;
      Prefab = _cc.Prefab;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2de71JBapVMcYlBdZxoYux8", "ResManager", undefined);

      __checkObsolete__(['_decorator', 'resources', 'Asset', 'SpriteFrame', 'AudioClip', 'Prefab']);

      ({
        ccclass
      } = _decorator);

      _export("ResManager", ResManager = (_dec = ccclass('ResManager'), _dec(_class = class ResManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this._cache = new Map();
        }

        /**
         * 加载单个资源
         * @param path 资源路径
         * @param type 资源类型
         */
        load(path, type) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (_this._cache.has(path)) {
              return _this._cache.get(path);
            }

            return new Promise(resolve => {
              resources.load(path, type, (error, asset) => {
                if (error || !asset) {
                  console.warn("[ResManager] \u8D44\u6E90\u52A0\u8F7D\u5931\u8D25: " + path, error);
                  resolve(null);
                  return;
                }

                _this._cache.set(path, asset);

                resolve(asset);
              });
            });
          })();
        }
        /**
         * 尝试按多个路径加载同一种资源
         * @param paths 资源路径数组
         * @param type 资源类型
         */


        loadFirst(paths, type) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            for (var path of paths) {
              var asset = yield _this2.load(path, type);

              if (asset) {
                return asset;
              }
            }

            return null;
          })();
        }
        /**
         * 加载多个资源
         * @param paths 资源路径数组
         * @param type 资源类型
         */


        loadAll(paths, type) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var promises = paths.map(path => _this3.load(path, type));
            return Promise.all(promises);
          })();
        }
        /**
         * 加载精灵帧
         * @param path 图片路径
         */


        loadSpriteFrame(path) {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            return _this4.load(path + '/spriteFrame', SpriteFrame);
          })();
        }
        /**
         * 加载音效
         * @param path 音效路径
         */


        loadAudioClip(path) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            return _this5.load(path, AudioClip);
          })();
        }
        /**
         * 加载预制体
         * @param path 预制体路径
         */


        loadPrefab(path) {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            return _this6.load(path, Prefab);
          })();
        }
        /**
         * 释放单个资源
         * @param path 资源路径
         */


        release(path) {
          if (this._cache.has(path)) {
            var asset = this._cache.get(path);

            resources.release(path);

            this._cache.delete(path);
          }
        }
        /**
         * 释放所有资源
         */


        releaseAll() {
          this._cache.forEach((asset, path) => {
            resources.release(path);
          });

          this._cache.clear();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8501847ea404b2c9de4eb76de25022f4e472d006.js.map
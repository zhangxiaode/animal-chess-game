System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, resources, SpriteFrame, AudioClip, Prefab, Singleton, _dec, _class, _crd, ccclass, ResManager;

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
        constructor(...args) {
          super(...args);
          this._cache = new Map();
        }

        /**
         * 加载单个资源
         * @param path 资源路径
         * @param type 资源类型
         */
        async load(path, type) {
          if (this._cache.has(path)) {
            return this._cache.get(path);
          }

          try {
            const asset = await resources.load(path, type);

            if (asset) {
              this._cache.set(path, asset);
            }

            return asset;
          } catch (error) {
            console.warn(`[ResManager] 资源加载失败: ${path}`, error);
            return null;
          }
        }
        /**
         * 加载多个资源
         * @param paths 资源路径数组
         * @param type 资源类型
         */


        async loadAll(paths, type) {
          const promises = paths.map(path => this.load(path, type));
          return Promise.all(promises);
        }
        /**
         * 加载精灵帧
         * @param path 图片路径
         */


        async loadSpriteFrame(path) {
          return this.load(path + '/spriteFrame', SpriteFrame);
        }
        /**
         * 加载音效
         * @param path 音效路径
         */


        async loadAudioClip(path) {
          return this.load(path, AudioClip);
        }
        /**
         * 加载预制体
         * @param path 预制体路径
         */


        async loadPrefab(path) {
          return this.load(path, Prefab);
        }
        /**
         * 释放单个资源
         * @param path 资源路径
         */


        release(path) {
          if (this._cache.has(path)) {
            const asset = this._cache.get(path);

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
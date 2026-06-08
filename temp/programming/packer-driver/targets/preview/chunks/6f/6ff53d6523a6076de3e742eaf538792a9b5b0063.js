System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, game, Game, Node, Singleton, ResManager, _dec, _class, _crd, ccclass, SoundManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "./ResManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      AudioSource = _cc.AudioSource;
      game = _cc.game;
      Game = _cc.Game;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }, function (_unresolved_3) {
      ResManager = _unresolved_3.ResManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4e629AH0MdELbbilaKsN/i+", "SoundManager", undefined);

      __checkObsolete__(['_decorator', 'AudioSource', 'AudioClip', 'game', 'Game', 'Node']);

      ({
        ccclass
      } = _decorator);

      _export("SoundManager", SoundManager = (_dec = ccclass('SoundManager'), _dec(_class = class SoundManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this._bgmSource = null;
          this._effectSource = null;
          this._bgmVolume = 0.5;
          this._effectVolume = 0.7;
          this._bgmEnabled = true;
          this._effectEnabled = true;
          this._currentBgmPath = '';
        }

        /**
         * 初始化音效管理器
         * @param root 根节点
         */
        init(root) {
          // 创建背景音乐节点
          var bgmNode = new Node('bgm_source');
          this._bgmSource = bgmNode.addComponent(AudioSource);
          this._bgmSource.loop = true;
          this._bgmSource.volume = this._bgmVolume;
          root.addChild(bgmNode); // 创建音效节点

          var effectNode = new Node('effect_source');
          this._effectSource = effectNode.addComponent(AudioSource);
          this._effectSource.loop = false;
          this._effectSource.volume = this._effectVolume;
          root.addChild(effectNode); // 游戏进入后台时暂停音乐

          game.on(Game.EVENT_HIDE, () => {
            if (this._bgmEnabled && this._bgmSource.playing) {
              this._bgmSource.pause();
            }
          }); // 游戏回到前台时恢复音乐

          game.on(Game.EVENT_SHOW, () => {
            if (this._bgmEnabled && !this._bgmSource.playing) {
              this._bgmSource.play();
            }
          });
        }
        /**
         * 播放背景音乐
         * @param path 音乐路径
         */


        playBGM(path) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (!_this._bgmEnabled) return;
            if (_this._currentBgmPath === path) return;
            _this._currentBgmPath = path;

            try {
              var clip = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
                error: Error()
              }), ResManager) : ResManager).getInstance().loadAudioClip(path);

              if (!clip || !clip._nativeAsset) {
                console.warn("[SoundManager] \u80CC\u666F\u97F3\u4E50\u4E0D\u5B58\u5728: " + path);
                _this._currentBgmPath = '';
                return;
              }

              _this._bgmSource.stop();

              _this._bgmSource.clip = clip;

              _this._bgmSource.play();
            } catch (error) {
              console.warn("[SoundManager] \u64AD\u653E\u80CC\u666F\u97F3\u4E50\u5931\u8D25: " + path, error);
              _this._currentBgmPath = '';
            }
          })();
        }
        /**
         * 停止背景音乐
         */


        stopBGM() {
          this._bgmSource.stop();

          this._currentBgmPath = '';
        }
        /**
         * 播放音效
         * @param path 音效路径
         */


        playEffect(path) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (!_this2._effectEnabled) return;

            try {
              var clip = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
                error: Error()
              }), ResManager) : ResManager).getInstance().loadAudioClip(path);

              if (!clip || !clip._nativeAsset) {
                console.warn("[SoundManager] \u97F3\u6548\u4E0D\u5B58\u5728: " + path);
                return;
              }

              _this2._effectSource.playOneShot(clip, _this2._effectVolume);
            } catch (error) {
              console.warn("[SoundManager] \u64AD\u653E\u97F3\u6548\u5931\u8D25: " + path, error);
            }
          })();
        }
        /**
         * 设置背景音乐音量
         * @param volume 音量（0-1）
         */


        setBGMVolume(volume) {
          this._bgmVolume = Math.max(0, Math.min(1, volume));
          this._bgmSource.volume = this._bgmVolume;
        }
        /**
         * 设置音效音量
         * @param volume 音量（0-1）
         */


        setEffectVolume(volume) {
          this._effectVolume = Math.max(0, Math.min(1, volume));
          this._effectSource.volume = this._effectVolume;
        }
        /**
         * 开启/关闭背景音乐
         * @param enabled 是否开启
         */


        setBGMEnabled(enabled) {
          this._bgmEnabled = enabled;

          if (enabled) {
            if (this._currentBgmPath) {
              this.playBGM(this._currentBgmPath);
            }
          } else {
            this._bgmSource.stop();
          }
        }
        /**
         * 开启/关闭音效
         * @param enabled 是否开启
         */


        setEffectEnabled(enabled) {
          this._effectEnabled = enabled;

          if (!enabled) {
            this._effectSource.stop();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6ff53d6523a6076de3e742eaf538792a9b5b0063.js.map
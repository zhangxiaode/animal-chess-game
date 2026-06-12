System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, AudioSource, game, Game, Node, Singleton, ResManager, DataManager, _dec, _class, _crd, ccclass, SoundManager;

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
  }

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "./ResManager", _context.meta, extras);
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
      AudioSource = _cc.AudioSource;
      game = _cc.game;
      Game = _cc.Game;
      Node = _cc.Node;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }, function (_unresolved_3) {
      ResManager = _unresolved_3.ResManager;
    }, function (_unresolved_4) {
      DataManager = _unresolved_4.DataManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "4e629AH0MdELbbilaKsN/i+", "SoundManager", undefined);

      __checkObsolete__(['_decorator', 'AudioSource', 'game', 'Game', 'Node']);

      ({
        ccclass
      } = _decorator);

      _export("SoundManager", SoundManager = (_dec = ccclass('SoundManager'), _dec(_class = class SoundManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
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
          this._bgmEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('bgm_enabled', true);
          this._effectEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('effect_enabled', true); // 创建背景音乐节点

          const bgmNode = new Node('bgm_source');
          this._bgmSource = bgmNode.addComponent(AudioSource);
          this._bgmSource.loop = true;
          this._bgmSource.volume = this._bgmVolume;
          root.addChild(bgmNode); // 创建音效节点

          const effectNode = new Node('effect_source');
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
            if (this._bgmEnabled && this._bgmSource.clip && !this._bgmSource.playing) {
              this._bgmSource.play();
            }
          });
        }
        /**
         * 播放背景音乐
         * @param path 音乐路径
         */


        async playBGM(path) {
          if (this._currentBgmPath === path && this._bgmSource.clip) {
            if (this._bgmEnabled && !this._bgmSource.playing) {
              this._bgmSource.play();
            }

            return;
          }

          this._currentBgmPath = path;
          if (!this._bgmEnabled) return;

          try {
            const clip = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadAudioClip(path);

            if (!clip || !clip._nativeAsset) {
              console.warn(`[SoundManager] 背景音乐不存在: ${path}`);
              this._currentBgmPath = '';
              return;
            }

            this._bgmSource.stop();

            this._bgmSource.clip = clip;

            this._bgmSource.play();
          } catch (error) {
            console.warn(`[SoundManager] 播放背景音乐失败: ${path}`, error);
            this._currentBgmPath = '';
          }
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


        async playEffect(path) {
          if (!this._effectEnabled) return;

          try {
            const clip = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadAudioClip(path);

            if (!clip || !clip._nativeAsset) {
              console.warn(`[SoundManager] 音效不存在: ${path}`);
              return;
            }

            this._effectSource.playOneShot(clip, this._effectVolume);
          } catch (error) {
            console.warn(`[SoundManager] 播放音效失败: ${path}`, error);
          }
        }
        /**
         * 播放通用按钮点击反馈：受设置中的震动和音效开关控制。
         */


        playClickFeedback() {
          this.vibrateShort();
          this.playEffect('sounds/click');
        }
        /**
         * 触发短震动
         */


        vibrateShort() {
          if (!(_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('vibration_enabled', true)) return;
          const runtime = globalThis;

          try {
            if (runtime.wx && typeof runtime.wx.vibrateShort === 'function') {
              runtime.wx.vibrateShort({
                type: 'light'
              });
              return;
            }

            if (runtime.tt && typeof runtime.tt.vibrateShort === 'function') {
              runtime.tt.vibrateShort();
              return;
            }

            const navigatorApi = runtime.navigator;

            if (navigatorApi && typeof navigatorApi.vibrate === 'function') {
              navigatorApi.vibrate(15);
            }
          } catch (error) {
            console.warn('[SoundManager] 震动失败', error);
          }
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
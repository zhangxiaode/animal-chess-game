System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Toggle, PopupManager, SoundManager, DataManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, SettingPopup;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "../framework/PopupManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../framework/DataManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      Toggle = _cc.Toggle;
    }, function (_unresolved_2) {
      PopupManager = _unresolved_2.PopupManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      DataManager = _unresolved_4.DataManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "64a46F5YopOObjnvwlORReG", "SettingPopup", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Toggle']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("SettingPopup", SettingPopup = (_dec = ccclass('SettingPopup'), _dec2 = property(Toggle), _dec3 = property(Toggle), _dec4 = property(Button), _dec(_class = (_class2 = class SettingPopup extends Component {
        constructor() {
          super(...arguments);

          // 在编辑器中拖拽绑定这些组件
          _initializerDefineProperty(this, "bgmToggle", _descriptor, this);

          _initializerDefineProperty(this, "effectToggle", _descriptor2, this);

          _initializerDefineProperty(this, "closeBtn", _descriptor3, this);
        }

        start() {
          // 从本地存储读取设置，初始化开关状态
          this.bgmToggle.isChecked = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('bgm_enabled', true);
          this.effectToggle.isChecked = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('effect_enabled', true); // 绑定事件

          this.bgmToggle.node.on(Toggle.EventType.TOGGLE, this._onBgmToggle, this);
          this.effectToggle.node.on(Toggle.EventType.TOGGLE, this._onEffectToggle, this);
          this.closeBtn.node.on(Button.EventType.CLICK, this._onClose, this);
        }
        /**
         * 背景音乐开关切换
         */


        _onBgmToggle(toggle) {
          // 更新音效管理器状态
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setBGMEnabled(toggle.isChecked); // 保存到本地存储

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('bgm_enabled', toggle.isChecked); // 播放点击音效

          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
        }
        /**
         * 音效开关切换
         */


        _onEffectToggle(toggle) {
          // 更新音效管理器状态
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setEffectEnabled(toggle.isChecked); // 保存到本地存储

          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('effect_enabled', toggle.isChecked); // 播放点击音效（如果音效开启的话）

          if (toggle.isChecked) {
            (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
          }
        }
        /**
         * 点击关闭按钮
         */


        _onClose() {
          // 播放点击音效
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click'); // 关闭弹窗，返回结果

          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().closePopup({
            saved: true,
            bgmEnabled: this.bgmToggle.isChecked,
            effectEnabled: this.effectToggle.isChecked
          });
        }
        /**
         * 弹窗显示时自动调用（由PopupManager触发）
         * @param params 传递给弹窗的参数
         */


        onShow(params) {
          console.log('设置弹窗显示，参数：', params);
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bgmToggle", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "effectToggle", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "closeBtn", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0ace8e8ca28a6febd749ca3a15de61c17fb1a446.js.map
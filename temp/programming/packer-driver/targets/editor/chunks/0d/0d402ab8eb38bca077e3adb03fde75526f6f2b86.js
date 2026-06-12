System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, js, Label, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, DataManager, PopupManager, SoundManager, _dec, _class, _crd, ccclass, SettingPopup;

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "../framework/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "../framework/PopupManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Color = _cc.Color;
      Component = _cc.Component;
      js = _cc.js;
      Label = _cc.Label;
      Rect = _cc.Rect;
      resources = _cc.resources;
      Size = _cc.Size;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      DataManager = _unresolved_2.DataManager;
    }, function (_unresolved_3) {
      PopupManager = _unresolved_3.PopupManager;
    }, function (_unresolved_4) {
      SoundManager = _unresolved_4.SoundManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "64a46F5YopOObjnvwlORReG", "SettingPopup", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'js', 'Label', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("SettingPopup", SettingPopup = (_dec = ccclass('SettingPopup'), _dec(_class = class SettingPopup extends Component {
        constructor(...args) {
          super(...args);
          this._dialogSprite = null;
          this._titleSprite = null;
          this._titleLabel = null;
          this._closeButton = null;
          this._closeSprite = null;
          this._closeLabel = null;
          this._switches = {
            vibration: {
              button: null,
              background: null,
              knob: null
            },
            effect: {
              button: null,
              background: null,
              knob: null
            },
            music: {
              button: null,
              background: null,
              knob: null
            }
          };
          this._vibrationEnabled = true;
          this._effectEnabled = true;
          this._musicEnabled = true;
          this._switchBgFrame = null;
          this._switchActiveFrame = null;
          this._switchCircleFrame = null;
        }

        start() {
          this._bindPrefabReferences();

          this._bindEvents();

          this._loadImages();

          this._loadSettings();

          this._refreshView();
        }

        onDestroy() {
          var _this$_closeButton, _this$_switches$vibra, _this$_switches$effec, _this$_switches$music;

          (_this$_closeButton = this._closeButton) == null || (_this$_closeButton = _this$_closeButton.node) == null || _this$_closeButton.off(Button.EventType.CLICK, this._onClose, this);
          (_this$_switches$vibra = this._switches.vibration.button) == null || (_this$_switches$vibra = _this$_switches$vibra.node) == null || _this$_switches$vibra.off(Button.EventType.CLICK, this._onVibrationToggle, this);
          (_this$_switches$effec = this._switches.effect.button) == null || (_this$_switches$effec = _this$_switches$effec.node) == null || _this$_switches$effec.off(Button.EventType.CLICK, this._onEffectToggle, this);
          (_this$_switches$music = this._switches.music.button) == null || (_this$_switches$music = _this$_switches$music.node) == null || _this$_switches$music.off(Button.EventType.CLICK, this._onMusicToggle, this);
        }

        onShow(params) {
          console.log('设置弹窗显示，参数：', params);
        }

        _bindPrefabReferences() {
          this._dialogSprite = this._bindSprite('Dialog');
          this._titleSprite = this._bindSprite('Dialog/TitleBg');
          this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
          this._closeButton = this._bindButton('Dialog/CloseButton');
          this._closeSprite = this._bindSprite('Dialog/CloseButton');
          this._closeLabel = this._bindLabel('Dialog/CloseButton/CloseLabel');

          this._setNodeSize('Dialog/CloseButton', 90, 88);

          this._bindSwitch('vibration', 'Dialog/VibrationToggle', 'Vibration');

          this._bindSwitch('effect', 'Dialog/EffectToggle', 'Effect');

          this._bindSwitch('music', 'Dialog/MusicToggle', 'Music');
        }

        _bindEvents() {
          var _this$_closeButton2, _this$_switches$vibra2, _this$_switches$effec2, _this$_switches$music2;

          (_this$_closeButton2 = this._closeButton) == null || _this$_closeButton2.node.on(Button.EventType.CLICK, this._onClose, this);
          (_this$_switches$vibra2 = this._switches.vibration.button) == null || _this$_switches$vibra2.node.on(Button.EventType.CLICK, this._onVibrationToggle, this);
          (_this$_switches$effec2 = this._switches.effect.button) == null || _this$_switches$effec2.node.on(Button.EventType.CLICK, this._onEffectToggle, this);
          (_this$_switches$music2 = this._switches.music.button) == null || _this$_switches$music2.node.on(Button.EventType.CLICK, this._onMusicToggle, this);
        }

        _loadSettings() {
          this._vibrationEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('vibration_enabled', true);
          this._effectEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('effect_enabled', true);
          this._musicEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('bgm_enabled', true);
        }

        _refreshView() {
          if (this._titleLabel) {
            this._titleLabel.string = '设置';
            this._titleLabel.fontSize = 40;
            this._titleLabel.lineHeight = 48;
            this._titleLabel.color = new Color(255, 255, 255, 255);
          }

          if (this._closeLabel) {
            this._closeLabel.string = '';
          }

          this._setLabel('Dialog/VibrationToggle/VibrationLabel', '震动', 30);

          this._setLabel('Dialog/EffectToggle/EffectLabel', '音效', 30);

          this._setLabel('Dialog/MusicToggle/MusicLabel', '音乐', 30);

          this._updateSwitchState('vibration', this._vibrationEnabled);

          this._updateSwitchState('effect', this._effectEnabled);

          this._updateSwitchState('music', this._musicEnabled);
        }

        async _loadImages() {
          const [,,, switchBgFrame, switchActiveFrame, switchCircleFrame] = await Promise.all([this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[SettingPopup] 弹框背景加载失败: images/popup/dialog_bg'), this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[SettingPopup] 标题背景加载失败: images/popup/title_bg'), this._setSpriteFrame(this._closeSprite, 'images/popup/close', '[SettingPopup] 关闭按钮图片加载失败: images/popup/close'), this._loadImageSpriteFrame('images/popup/switch_bg'), this._loadImageSpriteFrame('images/popup/switch_actived'), this._loadImageSpriteFrame('images/popup/circle')]);
          this._switchBgFrame = switchBgFrame;
          this._switchActiveFrame = switchActiveFrame;
          this._switchCircleFrame = switchCircleFrame;

          this._refreshView();
        }

        _onVibrationToggle() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          this._vibrationEnabled = !this._vibrationEnabled;
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('vibration_enabled', this._vibrationEnabled);

          this._refreshView();
        }

        _onEffectToggle() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          this._effectEnabled = !this._effectEnabled;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setEffectEnabled(this._effectEnabled);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('effect_enabled', this._effectEnabled);

          this._refreshView();
        }

        _onMusicToggle() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          this._musicEnabled = !this._musicEnabled;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setBGMEnabled(this._musicEnabled);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('bgm_enabled', this._musicEnabled);

          this._refreshView();
        }

        _onClose() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().closePopup({
            saved: true,
            vibrationEnabled: this._vibrationEnabled,
            bgmEnabled: this._musicEnabled,
            effectEnabled: this._effectEnabled
          });
        }

        _bindSwitch(key, togglePath, nodePrefix) {
          this._switches[key] = {
            button: this._bindButton(togglePath),
            background: this._bindSprite(`${togglePath}/${nodePrefix}SwitchBg`),
            knob: this._bindSprite(`${togglePath}/${nodePrefix}SwitchBg/${nodePrefix}SwitchKnob`)
          };

          this._bindLabel(`${togglePath}/${nodePrefix}Label`);

          this._setNodeSize(`${togglePath}/${nodePrefix}SwitchBg`, 154, 72);

          this._setNodeSize(`${togglePath}/${nodePrefix}SwitchBg/${nodePrefix}SwitchKnob`, 72, 72);
        }

        _updateSwitchState(key, enabled) {
          const item = this._switches[key];

          if (item.background) {
            item.background.spriteFrame = enabled ? this._switchActiveFrame : this._switchBgFrame;
          }

          if (item.knob) {
            item.knob.spriteFrame = this._switchCircleFrame;
            item.knob.node.setPosition(new Vec3(enabled ? 41 : -41, 0, 0));
          }
        }

        _setLabel(path, text, fontSize) {
          const label = this._bindLabel(path);

          if (!label) return;
          label.string = text;
          label.fontSize = fontSize;
          label.lineHeight = Math.round(fontSize * 1.25);
          label.color = new Color(116, 70, 35, 255);
        }

        _bindButton(path) {
          var _node$getComponent;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const button = (_node$getComponent = node.getComponent(Button)) != null ? _node$getComponent : node.addComponent(Button);
          button.interactable = true;
          button.transition = Button.Transition.SCALE;
          button.target = node;
          return button;
        }

        _bindSprite(path) {
          var _node$getComponent2;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const sprite = (_node$getComponent2 = node.getComponent(Sprite)) != null ? _node$getComponent2 : node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _bindLabel(path) {
          var _node$getComponent3;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const label = (_node$getComponent3 = node.getComponent(Label)) != null ? _node$getComponent3 : node.addComponent(Label);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          return label;
        }

        _setNodeSize(path, width, height) {
          var _node$getComponent4;

          const node = this._findPrefabNode(path);

          if (!node) return;
          const transform = (_node$getComponent4 = node.getComponent(UITransform)) != null ? _node$getComponent4 : node.addComponent(UITransform);
          transform.setContentSize(width, height);
        }

        _preparePrefabNode(node) {
          var _node$getComponent5;

          node.layer = this.node.layer;
          (_node$getComponent5 = node.getComponent(UITransform)) != null ? _node$getComponent5 : node.addComponent(UITransform);
        }

        _findPrefabNode(path) {
          const node = path.split('/').reduce((current, name) => {
            var _current$getChildByNa;

            return (_current$getChildByNa = current == null ? void 0 : current.getChildByName(name)) != null ? _current$getChildByNa : null;
          }, this.node);

          if (!node) {
            console.warn(`[SettingPopup] prefab 缺少节点: ${path}`);
          }

          return node;
        }

        async _setSpriteFrame(sprite, imagePath, failMessage) {
          if (!sprite) {
            console.warn(failMessage);
            return null;
          }

          const spriteFrame = await this._loadImageSpriteFrame(imagePath);

          if (!spriteFrame || !sprite.node.isValid) {
            console.warn(failMessage);
            return null;
          }

          sprite.spriteFrame = spriteFrame;
          return spriteFrame;
        }

        async _loadImageSpriteFrame(path) {
          const spriteFrame = await this._loadOptional(`${path}/spriteFrame`, SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await this._loadOptional(`${path}/texture`, Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
        }

        async _loadOptional(path, type) {
          return new Promise(resolve => {
            resources.load(path, type, (error, asset) => {
              resolve(error || !asset ? null : asset);
            });
          });
        }

        _ensureSpriteFrameSize(spriteFrame, fallbackWidth = 0, fallbackHeight = 0) {
          const rect = spriteFrame.rect;
          const originalSize = spriteFrame.originalSize;
          const width = (rect == null ? void 0 : rect.width) || (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || fallbackWidth;
          const height = (rect == null ? void 0 : rect.height) || (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || fallbackHeight;

          if (width > 0 && height > 0) {
            if (!rect || !rect.width || !rect.height) {
              spriteFrame.rect = new Rect(0, 0, width, height);
            }

            if (!originalSize || !originalSize.width || !originalSize.height) {
              spriteFrame.originalSize = new Size(width, height);
            }

            spriteFrame.offset = Vec2.ZERO;
          }

          return spriteFrame;
        }

      }) || _class));

      js.setClassAlias(SettingPopup, 'SettingPopup');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=0d402ab8eb38bca077e3adb03fde75526f6f2b86.js.map
System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Graphics, js, Label, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, DataManager, PopupManager, SoundManager, _dec, _class, _crd, ccclass, SettingPopup;

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
      Graphics = _cc.Graphics;
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

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'Graphics', 'js', 'Label', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2']);

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
          this._bgmButton = null;
          this._effectButton = null;
          this._bgmStateLabel = null;
          this._effectStateLabel = null;
          this._bgmEnabled = true;
          this._effectEnabled = true;
        }

        start() {
          this._bindPrefabReferences();

          this._bindEvents();

          this._loadImages();

          this._loadSettings();

          this._refreshView();
        }

        onDestroy() {
          var _this$_closeButton, _this$_bgmButton, _this$_effectButton;

          (_this$_closeButton = this._closeButton) == null || _this$_closeButton.node.off(Button.EventType.CLICK, this._onClose, this);
          (_this$_bgmButton = this._bgmButton) == null || _this$_bgmButton.node.off(Button.EventType.CLICK, this._onBgmToggle, this);
          (_this$_effectButton = this._effectButton) == null || _this$_effectButton.node.off(Button.EventType.CLICK, this._onEffectToggle, this);
        }

        onShow(params) {
          console.log('设置弹窗显示，参数：', params);
        }

        _bindPrefabReferences() {
          this._dialogSprite = this._bindSprite('Dialog');
          this._titleSprite = this._bindSprite('Dialog/TitleBg');
          this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
          this._closeButton = this._bindButton('Dialog/CloseButton');

          this._bindLabel('Dialog/CloseButton/CloseLabel');

          this._bgmButton = this._bindButton('Dialog/BgmToggle');
          this._effectButton = this._bindButton('Dialog/EffectToggle');

          this._bindLabel('Dialog/BgmToggle/BgmLabel');

          this._bindLabel('Dialog/EffectToggle/EffectLabel');

          this._bgmStateLabel = this._bindLabel('Dialog/BgmToggle/BgmState');
          this._effectStateLabel = this._bindLabel('Dialog/EffectToggle/EffectState');
        }

        _bindEvents() {
          var _this$_closeButton2, _this$_bgmButton2, _this$_effectButton2;

          (_this$_closeButton2 = this._closeButton) == null || _this$_closeButton2.node.on(Button.EventType.CLICK, this._onClose, this);
          (_this$_bgmButton2 = this._bgmButton) == null || _this$_bgmButton2.node.on(Button.EventType.CLICK, this._onBgmToggle, this);
          (_this$_effectButton2 = this._effectButton) == null || _this$_effectButton2.node.on(Button.EventType.CLICK, this._onEffectToggle, this);
        }

        _loadSettings() {
          this._bgmEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('bgm_enabled', true);
          this._effectEnabled = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().getLocal('effect_enabled', true);
        }

        _refreshView() {
          var _this$_bgmButton$node, _this$_bgmButton3, _this$_effectButton$n, _this$_effectButton3;

          if (this._titleLabel) {
            this._titleLabel.string = '设置';
            this._titleLabel.fontSize = 40;
            this._titleLabel.lineHeight = 48;
            this._titleLabel.color = new Color(255, 255, 255, 255);
          }

          this._setLabel('Dialog/CloseButton/CloseLabel', '×', 42);

          this._setLabel('Dialog/BgmToggle/BgmLabel', '背景音乐', 30);

          this._setLabel('Dialog/EffectToggle/EffectLabel', '游戏音效', 30);

          this._updateToggleState((_this$_bgmButton$node = (_this$_bgmButton3 = this._bgmButton) == null ? void 0 : _this$_bgmButton3.node) != null ? _this$_bgmButton$node : null, this._bgmStateLabel, this._bgmEnabled);

          this._updateToggleState((_this$_effectButton$n = (_this$_effectButton3 = this._effectButton) == null ? void 0 : _this$_effectButton3.node) != null ? _this$_effectButton$n : null, this._effectStateLabel, this._effectEnabled);
        }

        async _loadImages() {
          await Promise.all([this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[SettingPopup] 弹框背景加载失败: images/popup/dialog_bg'), this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[SettingPopup] 标题背景加载失败: images/popup/title_bg')]);
        }

        _onBgmToggle() {
          this._bgmEnabled = !this._bgmEnabled;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setBGMEnabled(this._bgmEnabled);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('bgm_enabled', this._bgmEnabled);
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');

          this._refreshView();
        }

        _onEffectToggle() {
          this._effectEnabled = !this._effectEnabled;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().setEffectEnabled(this._effectEnabled);
          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().setLocal('effect_enabled', this._effectEnabled);

          if (this._effectEnabled) {
            (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
              error: Error()
            }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
          }

          this._refreshView();
        }

        _onClose() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().closePopup({
            saved: true,
            bgmEnabled: this._bgmEnabled,
            effectEnabled: this._effectEnabled
          });
        }

        _updateToggleState(node, label, enabled) {
          var _node$getComponent;

          if (label) {
            label.string = enabled ? '开启' : '关闭';
            label.fontSize = 28;
            label.lineHeight = 36;
            label.color = enabled ? new Color(49, 132, 72, 255) : new Color(150, 82, 70, 255);
          }

          if (!node) return;
          const transform = node.getComponent(UITransform);
          if (!transform) return;
          const graphics = (_node$getComponent = node.getComponent(Graphics)) != null ? _node$getComponent : node.addComponent(Graphics);
          const width = transform.contentSize.width;
          const height = transform.contentSize.height;
          graphics.clear();
          graphics.fillColor = new Color(255, 248, 225, 235);
          graphics.roundRect(-width / 2, -height / 2, width, height, 18);
          graphics.fill();
          graphics.strokeColor = enabled ? new Color(98, 196, 116, 255) : new Color(214, 116, 98, 255);
          graphics.lineWidth = 3;
          graphics.roundRect(-width / 2, -height / 2, width, height, 18);
          graphics.stroke();
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
          var _node$getComponent2;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const button = (_node$getComponent2 = node.getComponent(Button)) != null ? _node$getComponent2 : node.addComponent(Button);
          button.interactable = true;
          button.transition = Button.Transition.SCALE;
          button.target = node;
          return button;
        }

        _bindSprite(path) {
          var _node$getComponent3;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const sprite = (_node$getComponent3 = node.getComponent(Sprite)) != null ? _node$getComponent3 : node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _bindLabel(path) {
          var _node$getComponent4;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const label = (_node$getComponent4 = node.getComponent(Label)) != null ? _node$getComponent4 : node.addComponent(Label);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          return label;
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
            return;
          }

          const spriteFrame = await this._loadImageSpriteFrame(imagePath);

          if (!spriteFrame || !sprite.node.isValid) {
            console.warn(failMessage);
            return;
          }

          sprite.spriteFrame = spriteFrame;
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
System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, js, Label, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, PopupManager, SoundManager, addToDesktopShortcut, _dec, _class, _crd, ccclass, DesktopPopup;

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "../framework/PopupManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfaddToDesktopShortcut(extras) {
    _reporterNs.report("addToDesktopShortcut", "../utils/ShortcutUtils", _context.meta, extras);
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
      Node = _cc.Node;
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
      PopupManager = _unresolved_2.PopupManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      addToDesktopShortcut = _unresolved_4.addToDesktopShortcut;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a628aIhIYVA2IAWJtAuut37", "DesktopPopup", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'js', 'Label', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("DesktopPopup", DesktopPopup = (_dec = ccclass('DesktopPopup'), _dec(_class = class DesktopPopup extends Component {
        constructor(...args) {
          super(...args);
          this._dialogSprite = null;
          this._titleSprite = null;
          this._titleLabel = null;
          this._closeButton = null;
          this._closeSprite = null;
          this._closeLabel = null;
          this._contentSprite = null;
          this._submitButton = null;
          this._submitButtonSprite = null;
          this._submitLabel = null;
          this._isSubmitting = false;
        }

        start() {
          this._bindPrefabReferences();

          this._bindEvents();

          this._loadImages();

          this._refreshView();
        }

        onDestroy() {
          var _this$_closeButton, _this$_submitButton;

          (_this$_closeButton = this._closeButton) == null || (_this$_closeButton = _this$_closeButton.node) == null || _this$_closeButton.off(Button.EventType.CLICK, this._onClose, this);
          (_this$_submitButton = this._submitButton) == null || (_this$_submitButton = _this$_submitButton.node) == null || _this$_submitButton.off(Button.EventType.CLICK, this._onSubmit, this);
        }

        onShow(params) {
          console.log('添加至桌面弹窗显示，参数：', params);
        }

        _bindPrefabReferences() {
          this._dialogSprite = this._bindSprite('Dialog');
          this._titleSprite = this._bindSprite('Dialog/TitleBg');
          this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
          this._closeButton = this._bindButton('Dialog/CloseButton');
          this._closeSprite = this._bindSprite('Dialog/CloseButton');
          this._closeLabel = this._bindLabel('Dialog/CloseButton/CloseLabel');

          this._setNodeSize('Dialog/CloseButton', 90, 88);

          this._contentSprite = this._createContentSprite();

          this._bindSubmitButton();

          ['Dialog/VibrationToggle', 'Dialog/EffectToggle', 'Dialog/MusicToggle'].forEach(path => {
            const node = this._findPrefabNode(path);

            if (node) node.active = false;
          });
        }

        _bindEvents() {
          var _this$_closeButton2, _this$_submitButton2;

          (_this$_closeButton2 = this._closeButton) == null || _this$_closeButton2.node.on(Button.EventType.CLICK, this._onClose, this);
          (_this$_submitButton2 = this._submitButton) == null || _this$_submitButton2.node.on(Button.EventType.CLICK, this._onSubmit, this);
        }

        _refreshView() {
          if (this._titleLabel) {
            this._titleLabel.string = '添加至桌面';
            this._titleLabel.fontSize = 36;
            this._titleLabel.lineHeight = 44;
            this._titleLabel.color = new Color(255, 255, 255, 255);
          }

          if (this._closeLabel) {
            this._closeLabel.string = '';
          }

          if (this._submitLabel) {
            this._submitLabel.string = '提交';
            this._submitLabel.fontSize = 42;
            this._submitLabel.lineHeight = 52;
            this._submitLabel.color = new Color(255, 255, 255, 255);
          }
        }

        async _loadImages() {
          await Promise.all([this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[DesktopPopup] 弹框背景加载失败: images/popup/dialog_bg'), this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[DesktopPopup] 标题背景加载失败: images/popup/title_bg'), this._setSpriteFrame(this._closeSprite, 'images/popup/close', '[DesktopPopup] 关闭按钮图片加载失败: images/popup/close'), this._setSpriteFrame(this._contentSprite, 'images/popup/desktop-img', '[DesktopPopup] 内容图片加载失败: images/popup/desktop-img'), this._setSpriteFrame(this._submitButtonSprite, 'images/popup/btn_yellow', '[DesktopPopup] 提交按钮背景加载失败: images/popup/btn_yellow')]);
        }

        _onClose() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().closePopup({
            action: 'close'
          });
        }

        async _onSubmit() {
          var _this$node;

          if (this._isSubmitting) return;
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          this._isSubmitting = true;

          if (this._submitButton) {
            this._submitButton.interactable = false;
          }

          const result = await (_crd && addToDesktopShortcut === void 0 ? (_reportPossibleCrUseOfaddToDesktopShortcut({
            error: Error()
          }), addToDesktopShortcut) : addToDesktopShortcut)();
          if (!((_this$node = this.node) != null && _this$node.isValid)) return;
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().closePopup({
            action: 'submit',
            addDesktopResult: result
          });
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

        _createContentSprite() {
          var _dialog$getChildByNam, _node$getComponent4, _node$getComponent5;

          const dialog = this._findPrefabNode('Dialog');

          if (!dialog) return null;
          const node = (_dialog$getChildByNam = dialog.getChildByName('ContentImage')) != null ? _dialog$getChildByNam : new Node('ContentImage');

          if (!node.parent) {
            dialog.addChild(node);
          }

          this._preparePrefabNode(node);

          node.setPosition(new Vec3(0, 28, 0));
          const transform = (_node$getComponent4 = node.getComponent(UITransform)) != null ? _node$getComponent4 : node.addComponent(UITransform);
          transform.setContentSize(456, 548);
          const sprite = (_node$getComponent5 = node.getComponent(Sprite)) != null ? _node$getComponent5 : node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _bindSubmitButton() {
          var _dialog$getChildByNam2, _node$getComponent6, _node$getComponent7, _node$getComponent8, _node$getChildByName, _labelNode$getCompone, _labelNode$getCompone2;

          const dialog = this._findPrefabNode('Dialog');

          if (!dialog) return;
          const node = (_dialog$getChildByNam2 = dialog.getChildByName('SubmitButton')) != null ? _dialog$getChildByNam2 : new Node('SubmitButton');

          if (!node.parent) {
            dialog.addChild(node);
          }

          this._preparePrefabNode(node);

          node.setPosition(new Vec3(0, -302, 0));
          const transform = (_node$getComponent6 = node.getComponent(UITransform)) != null ? _node$getComponent6 : node.addComponent(UITransform);
          transform.setContentSize(418, 162);
          this._submitButtonSprite = (_node$getComponent7 = node.getComponent(Sprite)) != null ? _node$getComponent7 : node.addComponent(Sprite);
          this._submitButtonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this._submitButton = (_node$getComponent8 = node.getComponent(Button)) != null ? _node$getComponent8 : node.addComponent(Button);
          this._submitButton.interactable = true;
          this._submitButton.transition = Button.Transition.SCALE;
          this._submitButton.target = node;
          const labelNode = (_node$getChildByName = node.getChildByName('Label')) != null ? _node$getChildByName : new Node('Label');

          if (!labelNode.parent) {
            node.addChild(labelNode);
          }

          this._preparePrefabNode(labelNode);

          labelNode.setPosition(Vec3.ZERO);
          const labelTransform = (_labelNode$getCompone = labelNode.getComponent(UITransform)) != null ? _labelNode$getCompone : labelNode.addComponent(UITransform);
          labelTransform.setContentSize(300, 70);
          this._submitLabel = (_labelNode$getCompone2 = labelNode.getComponent(Label)) != null ? _labelNode$getCompone2 : labelNode.addComponent(Label);
          this._submitLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._submitLabel.verticalAlign = Label.VerticalAlign.CENTER;
          this._submitLabel.overflow = Label.Overflow.CLAMP;
        }

        _setNodeSize(path, width, height) {
          var _node$getComponent9;

          const node = this._findPrefabNode(path);

          if (!node) return;
          const transform = (_node$getComponent9 = node.getComponent(UITransform)) != null ? _node$getComponent9 : node.addComponent(UITransform);
          transform.setContentSize(width, height);
        }

        _preparePrefabNode(node) {
          var _node$getComponent10;

          node.layer = this.node.layer;
          (_node$getComponent10 = node.getComponent(UITransform)) != null ? _node$getComponent10 : node.addComponent(UITransform);
        }

        _findPrefabNode(path) {
          const node = path.split('/').reduce((current, name) => {
            var _current$getChildByNa;

            return (_current$getChildByNa = current == null ? void 0 : current.getChildByName(name)) != null ? _current$getChildByNa : null;
          }, this.node);

          if (!node) {
            console.warn(`[DesktopPopup] prefab 缺少节点: ${path}`);
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
          const resourceAsset = await new Promise(resolve => {
            resources.load(path, type, (error, asset) => {
              resolve(error || !asset ? null : asset);
            });
          });
          if (resourceAsset) return resourceAsset;
          return null;
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

            spriteFrame.offset = new Vec2(0, 0);
          }

          return spriteFrame;
        }

      }) || _class));

      js.setClassAlias(DesktopPopup, 'DesktopPopup');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=966be97855b6b244581ac3bc3debe2dac7f513f0.js.map
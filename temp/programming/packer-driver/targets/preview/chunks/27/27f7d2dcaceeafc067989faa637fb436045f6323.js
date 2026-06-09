System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Label, LabelOutline, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, SoundManager, UIManager, _dec, _class, _crd, ccclass, HomePage;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "../framework/ResManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../framework/UIManager", _context.meta, extras);
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
      Label = _cc.Label;
      LabelOutline = _cc.LabelOutline;
      Node = _cc.Node;
      Rect = _cc.Rect;
      Size = _cc.Size;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ResManager = _unresolved_2.ResManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      UIManager = _unresolved_4.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8233bqCptxI1IfYpg/wfSfC", "HomePage", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'Label', 'LabelOutline', 'Node', 'Rect', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("HomePage", HomePage = (_dec = ccclass('HomePage'), _dec(_class = class HomePage extends Component {
        start() {
          this._createBackground();

          this._createSettingButton();

          this._createLogoImage();

          this._createSideButtons();

          this._createLevelBadge();

          this._createStartGameButton();
        }

        onShow(params) {
          console.log('首页显示');
        }

        onHide() {
          console.log('首页隐藏');
        }

        _createBackground() {
          var _this = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten, _pageTransform$conten2;

            var pageTransform = _this.node.getComponent(UITransform);

            var pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 750;
            var pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 1334;
            var backgroundNode = new Node('Background');
            backgroundNode.layer = _this.node.layer;
            backgroundNode.parent = _this.node;
            backgroundNode.setPosition(Vec3.ZERO);
            backgroundNode.setSiblingIndex(0);
            var backgroundTransform = backgroundNode.addComponent(UITransform);
            backgroundTransform.setContentSize(pageWidth, pageHeight);
            var backgroundSprite = backgroundNode.addComponent(Sprite);
            backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this._loadBackgroundSpriteFrame();

            if (!spriteFrame || !backgroundNode.isValid) {
              console.warn('[HomePage] 背景图加载失败: images/home/bg');
              return;
            }

            backgroundSprite.spriteFrame = spriteFrame;

            _this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
          })();
        }

        _loadBackgroundSpriteFrame() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            return _this2._loadImageSpriteFrame('images/home/bg');
          })();
        }

        _createSettingButton() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten3, _pageTransform$conten4;

            var pageTransform = _this3.node.getComponent(UITransform);

            var pageWidth = (_pageTransform$conten3 = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten3 : 750;
            var pageHeight = (_pageTransform$conten4 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten4 : 1334;
            var buttonSize = 96;
            var margin = 36;
            var settingNode = new Node('SettingButton');
            settingNode.layer = _this3.node.layer;
            settingNode.parent = _this3.node;
            settingNode.setPosition(new Vec3(-pageWidth / 2 + buttonSize / 2 + margin, pageHeight / 2 - buttonSize / 2 - margin, 0));
            var settingTransform = settingNode.addComponent(UITransform);
            settingTransform.setContentSize(buttonSize, buttonSize);
            var settingSprite = settingNode.addComponent(Sprite);
            settingSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var settingButton = settingNode.addComponent(Button);
            settingButton.interactable = true;
            var spriteFrame = yield _this3._loadImageSpriteFrame('images/home/setting');

            if (!spriteFrame || !settingNode.isValid) {
              console.warn('[HomePage] 设置按钮图片加载失败: images/home/setting');
              return;
            }

            settingSprite.spriteFrame = spriteFrame;
          })();
        }

        _createLogoImage() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten5;

            var pageTransform = _this4.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten5 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten5 : 1334;
            var logoNode = new Node('Logo');
            logoNode.layer = _this4.node.layer;
            logoNode.parent = _this4.node;
            logoNode.setPosition(new Vec3(0, pageHeight / 2 - 220, 0));
            var logoTransform = logoNode.addComponent(UITransform);
            logoTransform.setContentSize(240, 200);
            var logoSprite = logoNode.addComponent(Sprite);
            logoSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this4._loadImageSpriteFrame('images/home/logo');

            if (!spriteFrame || !logoNode.isValid) {
              console.warn('[HomePage] Logo 图片加载失败: images/home/logo');
              return;
            }

            logoSprite.spriteFrame = spriteFrame;
          })();
        }

        _createSideButtons() {
          var _pageTransform$conten6, _pageTransform$conten7;

          var pageTransform = this.node.getComponent(UITransform);
          var pageWidth = (_pageTransform$conten6 = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten6 : 750;
          var pageHeight = (_pageTransform$conten7 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten7 : 1334;
          var buttonSize = 144;
          var sideMargin = 56;
          var horizontalOffset = 66;
          var leftX = -pageWidth / 2 + sideMargin + buttonSize / 2 - horizontalOffset;
          var rightX = pageWidth / 2 - sideMargin - buttonSize / 2 + horizontalOffset;
          var inwardOffset = 16;
          var adjustedLeftX = leftX + inwardOffset;
          var adjustedRightX = rightX - inwardOffset;
          var verticalOffset = 120;
          var topY = -pageHeight * 0.06 + verticalOffset;
          var bottomY = -pageHeight * 0.2 + verticalOffset;

          this._createImageButton('RewardButton', 'images/home/reward', new Vec3(adjustedLeftX, topY, 0), buttonSize, '[HomePage] 奖励按钮图片加载失败: images/home/reward');

          this._createImageButton('RankingButton', 'images/home/ranking', new Vec3(adjustedLeftX, bottomY, 0), buttonSize, '[HomePage] 排行按钮图片加载失败: images/home/ranking');

          this._createImageButton('FeedbackButton', 'images/home/feedback', new Vec3(adjustedRightX, topY, 0), buttonSize, '[HomePage] 反馈按钮图片加载失败: images/home/feedback');

          this._createImageButton('CollectButton', 'images/home/collect', new Vec3(adjustedRightX, bottomY, 0), buttonSize, '[HomePage] 收藏按钮图片加载失败: images/home/collect');
        }

        _createImageButton(nodeName, imagePath, position, size, failMessage) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var buttonNode = new Node(nodeName);
            buttonNode.layer = _this5.node.layer;
            buttonNode.parent = _this5.node;
            buttonNode.setPosition(position);
            var buttonTransform = buttonNode.addComponent(UITransform);
            buttonTransform.setContentSize(size, size);
            var buttonSprite = buttonNode.addComponent(Sprite);
            buttonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var button = buttonNode.addComponent(Button);
            button.interactable = true;
            var spriteFrame = yield _this5._loadImageSpriteFrame(imagePath);

            if (!spriteFrame || !buttonNode.isValid) {
              console.warn(failMessage);
              return;
            }

            buttonSprite.spriteFrame = spriteFrame;
          })();
        }

        _createLevelBadge() {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten8;

            var pageTransform = _this6.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten8 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten8 : 1334;
            var badgeWidth = 314;
            var badgeHeight = 114;
            var badgeNode = new Node('LevelBadge');
            badgeNode.layer = _this6.node.layer;
            badgeNode.parent = _this6.node;
            badgeNode.setPosition(new Vec3(0, -pageHeight * 0.34, 0));
            var badgeTransform = badgeNode.addComponent(UITransform);
            badgeTransform.setContentSize(badgeWidth, badgeHeight);
            var badgeSprite = badgeNode.addComponent(Sprite);
            badgeSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var levelLabelNode = new Node('LevelLabel');
            levelLabelNode.layer = _this6.node.layer;
            levelLabelNode.parent = badgeNode;
            levelLabelNode.setPosition(new Vec3(0, 4, 0));
            var levelLabelTransform = levelLabelNode.addComponent(UITransform);
            levelLabelTransform.setContentSize(badgeWidth, badgeHeight);
            var levelLabel = levelLabelNode.addComponent(Label);
            levelLabel.string = '第1关';
            levelLabel.fontSize = 36;
            levelLabel.color = new Color(128, 77, 44, 255);
            levelLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
            levelLabel.verticalAlign = Label.VerticalAlign.CENTER;
            levelLabel.overflow = Label.Overflow.CLAMP;
            var spriteFrame = yield _this6._loadImageSpriteFrame('images/home/level_bg');

            if (!spriteFrame || !badgeNode.isValid) {
              console.warn('[HomePage] 关卡背景图片加载失败: images/home/level_bg');
              return;
            }

            badgeSprite.spriteFrame = spriteFrame;
          })();
        }

        _createStartGameButton() {
          var _this7 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten9;

            var pageTransform = _this7.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten9 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten9 : 1334;
            var buttonWidth = 418;
            var buttonHeight = 162;
            var buttonNode = new Node('StartGameButton');
            buttonNode.layer = _this7.node.layer;
            buttonNode.parent = _this7.node;
            buttonNode.setPosition(new Vec3(0, -pageHeight * 0.45 + 40, 0));
            var buttonTransform = buttonNode.addComponent(UITransform);
            buttonTransform.setContentSize(buttonWidth, buttonHeight);
            var buttonSprite = buttonNode.addComponent(Sprite);
            buttonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var button = buttonNode.addComponent(Button);
            button.interactable = true;
            buttonNode.on(Button.EventType.CLICK, _this7._onStartGame, _this7);
            var labelNode = new Node('Label');
            labelNode.layer = _this7.node.layer;
            labelNode.parent = buttonNode;
            labelNode.setPosition(new Vec3(0, 4, 0));
            var labelTransform = labelNode.addComponent(UITransform);
            labelTransform.setContentSize(buttonWidth, buttonHeight);
            var label = labelNode.addComponent(Label);
            label.string = '开始游戏';
            label.fontSize = 42;
            label.color = new Color(255, 255, 255, 255);
            label.horizontalAlign = Label.HorizontalAlign.CENTER;
            label.verticalAlign = Label.VerticalAlign.CENTER;
            label.overflow = Label.Overflow.CLAMP;
            var labelOutline = labelNode.addComponent(LabelOutline);
            labelOutline.color = new Color(144, 88, 19, 255);
            labelOutline.width = 3;
            var spriteFrame = yield _this7._loadImageSpriteFrame('images/home/btn_yellow');

            if (!spriteFrame || !buttonNode.isValid) {
              console.warn('[HomePage] 开始游戏按钮背景加载失败: images/home/btn_yellow');
              return;
            }

            buttonSprite.spriteFrame = spriteFrame;
          })();
        }

        _onStartGame() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().openPage('prefabs/pages/GamePage', {
            level: 1
          });
        }

        _loadImageSpriteFrame(path) {
          var _this8 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst([path + "/spriteFrame", path], SpriteFrame);
            if (spriteFrame) return _this8._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load(path + "/texture", Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this8._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          var originalSize = spriteFrame.originalSize;
          var imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          var imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          var scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        _ensureSpriteFrameSize(spriteFrame, fallbackWidth, fallbackHeight) {
          if (fallbackWidth === void 0) {
            fallbackWidth = 0;
          }

          if (fallbackHeight === void 0) {
            fallbackHeight = 0;
          }

          var rect = spriteFrame.rect;
          var originalSize = spriteFrame.originalSize;
          var width = (rect == null ? void 0 : rect.width) || (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || fallbackWidth;
          var height = (rect == null ? void 0 : rect.height) || (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || fallbackHeight;

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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=27f7d2dcaceeafc067989faa637fb436045f6323.js.map
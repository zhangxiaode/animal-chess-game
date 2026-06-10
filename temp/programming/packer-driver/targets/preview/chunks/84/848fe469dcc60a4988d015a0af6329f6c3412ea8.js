System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Graphics, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _class, _crd, ccclass, GamePage;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "../framework/ResManager", _context.meta, extras);
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
      Graphics = _cc.Graphics;
      Label = _cc.Label;
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
      UIManager = _unresolved_3.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b116Z08uZFSLOZ3edZ6E3o", "GamePage", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'Graphics', 'Label', 'Node', 'Rect', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("GamePage", GamePage = (_dec = ccclass('GamePage'), _dec(_class = class GamePage extends Component {
        constructor() {
          super(...arguments);
          this._backBtn = null;
        }

        start() {
          var _this = this;

          return _asyncToGenerator(function* () {
            yield _this._createUI();
          })();
        }

        _createUI() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten, _pageTransform$conten2;

            var pageRoot = _this2.node;
            var pageTransform = pageRoot.getComponent(UITransform);
            var pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 640;
            var pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 960;
            yield _this2._createBackground(pageRoot, pageWidth, pageHeight);
            yield _this2._createSettingButton(pageRoot, pageWidth, pageHeight);
            yield _this2._createTitle(pageRoot, pageWidth, pageHeight);

            _this2._createPlayerInfoBoxes(pageRoot, pageWidth, pageHeight);

            _this2._createTurnTip(pageRoot, pageHeight);

            yield _this2._createBoard(pageRoot, pageHeight);
          })();
        }

        _createBackground(parent, pageWidth, pageHeight) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var backgroundNode = new Node('Background');
            backgroundNode.layer = parent.layer;
            backgroundNode.parent = parent;
            backgroundNode.setPosition(Vec3.ZERO);
            backgroundNode.setSiblingIndex(0);
            var backgroundTransform = backgroundNode.addComponent(UITransform);
            backgroundTransform.setContentSize(pageWidth, pageHeight);
            var backgroundSprite = backgroundNode.addComponent(Sprite);
            backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this3._loadBackgroundSpriteFrame();

            if (!spriteFrame || !backgroundNode.isValid) {
              var backgroundGraphics = backgroundNode.addComponent(Graphics);
              backgroundGraphics.fillColor = new Color(245, 247, 250, 255);
              backgroundGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
              backgroundGraphics.fill();
              return;
            }

            backgroundSprite.spriteFrame = spriteFrame;

            _this3._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
          })();
        }

        _loadBackgroundSpriteFrame() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/bg/spriteFrame', 'images/play/bg'], SpriteFrame);
            if (spriteFrame) return _this4._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this4._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
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

        _createSettingButton(parent, pageWidth, pageHeight) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var buttonSize = 96;
            var margin = 36;
            var settingBtnNode = new Node('SettingButton');
            settingBtnNode.layer = parent.layer;
            settingBtnNode.parent = parent;
            settingBtnNode.setPosition(-pageWidth / 2 + buttonSize / 2 + margin, pageHeight / 2 - buttonSize / 2 - margin, 0);
            var settingBtnTransform = settingBtnNode.addComponent(UITransform);
            settingBtnTransform.setContentSize(buttonSize, buttonSize);
            var settingSprite = settingBtnNode.addComponent(Sprite);
            settingSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            _this5._backBtn = settingBtnNode.addComponent(Button);
            _this5._backBtn.interactable = true;

            _this5._backBtn.node.on(Button.EventType.CLICK, _this5._onBack, _this5);

            var spriteFrame = yield _this5._loadSettingSpriteFrame();

            if (!spriteFrame || !settingBtnNode.isValid) {
              console.warn('[GamePage] 设置按钮图片加载失败: images/play/setting');
              return;
            }

            settingSprite.spriteFrame = spriteFrame;
          })();
        }

        _loadSettingSpriteFrame() {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/setting/spriteFrame', 'images/play/setting'], SpriteFrame);
            if (spriteFrame) return _this6._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/setting/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this6._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _createTitle(parent, pageWidth, pageHeight) {
          var _this7 = this;

          return _asyncToGenerator(function* () {
            var titleWidth = 488;
            var titleHeight = 154;
            var topMargin = 22;
            var titleNode = new Node('Title');
            titleNode.layer = parent.layer;
            titleNode.parent = parent;
            titleNode.setPosition(0, pageHeight / 2 - titleHeight / 2 - topMargin, 0);
            var titleTransform = titleNode.addComponent(UITransform);
            titleTransform.setContentSize(titleWidth, titleHeight);
            var titleSprite = titleNode.addComponent(Sprite);
            titleSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this7._loadTitleSpriteFrame();

            if (!spriteFrame || !titleNode.isValid) {
              console.warn('[GamePage] 标题背景图片加载失败: images/play/title_bg');
            } else {
              titleSprite.spriteFrame = spriteFrame;
            }

            var labelNode = new Node('TitleLabel');
            labelNode.layer = parent.layer;
            labelNode.parent = titleNode;
            labelNode.setPosition(Vec3.ZERO);
            var labelTransform = labelNode.addComponent(UITransform);
            labelTransform.setContentSize(titleWidth, titleHeight);
            var titleLabel = labelNode.addComponent(Label);
            titleLabel.string = '欢乐斗兽棋';
            titleLabel.fontSize = 48;
            titleLabel.color = new Color(255, 255, 255, 255);
            titleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
            titleLabel.verticalAlign = Label.VerticalAlign.CENTER;
          })();
        }

        _loadTitleSpriteFrame() {
          var _this8 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/title_bg/spriteFrame', 'images/play/title_bg'], SpriteFrame);
            if (spriteFrame) return _this8._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/title_bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this8._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _createPlayerInfoBoxes(parent, pageWidth, pageHeight) {
          var boxWidth = 294;
          var boxHeight = 164;
          var centerY = pageHeight / 2 - 352;
          var centerOffsetX = pageWidth * 0.26;

          this._createPlayerInfoBox(parent, 'RedPlayerBox', '红方 先手', new Vec3(-centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(224, 68, 68, 255));

          this._createPlayerInfoBox(parent, 'BluePlayerBox', '蓝方 后手', new Vec3(centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(70, 142, 230, 255));
        }

        _createPlayerInfoBox(parent, nodeName, text, position, width, height, accentColor) {
          var boxNode = new Node(nodeName);
          boxNode.layer = parent.layer;
          boxNode.parent = parent;
          boxNode.setPosition(position);
          var boxTransform = boxNode.addComponent(UITransform);
          boxTransform.setContentSize(width, height);
          var boxGraphics = boxNode.addComponent(Graphics);
          boxGraphics.fillColor = new Color(5, 88, 55, 150);
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.fill();
          boxGraphics.strokeColor = accentColor;
          boxGraphics.lineWidth = 4;
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.stroke();
          var labelNode = new Node('Label');
          labelNode.layer = parent.layer;
          labelNode.parent = boxNode;
          labelNode.setPosition(Vec3.ZERO);
          var labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(width, height);
          var label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = 36;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
        }

        _createTurnTip(parent, pageHeight) {
          var tipWidth = 360;
          var tipHeight = 72;
          var tipNode = new Node('TurnTip');
          tipNode.layer = parent.layer;
          tipNode.parent = parent;
          tipNode.setPosition(0, pageHeight / 2 - 560, 0);
          var tipTransform = tipNode.addComponent(UITransform);
          tipTransform.setContentSize(tipWidth, tipHeight);
          var tipLabel = tipNode.addComponent(Label);
          tipLabel.string = '红方回合 - 请选择棋子';
          tipLabel.fontSize = 30;
          tipLabel.color = new Color(255, 255, 255, 255);
          tipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          tipLabel.verticalAlign = Label.VerticalAlign.CENTER;
        }

        _createBoard(parent, pageHeight) {
          var _this9 = this;

          return _asyncToGenerator(function* () {
            var boardSize = 750;
            var boardNode = new Node('Board');
            boardNode.layer = parent.layer;
            boardNode.parent = parent;
            boardNode.setPosition(0, pageHeight / 2 - 990, 0);
            var boardTransform = boardNode.addComponent(UITransform);
            boardTransform.setContentSize(boardSize, boardSize);
            var boardSprite = boardNode.addComponent(Sprite);
            boardSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this9._loadBoardSpriteFrame();

            if (!spriteFrame || !boardNode.isValid) {
              console.warn('[GamePage] 棋盘背景图片加载失败: images/play/play_bg');
              return;
            }

            boardSprite.spriteFrame = spriteFrame;
          })();
        }

        _loadBoardSpriteFrame() {
          var _this10 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/play_bg/spriteFrame', 'images/play/play_bg'], SpriteFrame);
            if (spriteFrame) return _this10._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/play_bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this10._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _onBack() {
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().backPage();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=848fe469dcc60a4988d015a0af6329f6c3412ea8.js.map
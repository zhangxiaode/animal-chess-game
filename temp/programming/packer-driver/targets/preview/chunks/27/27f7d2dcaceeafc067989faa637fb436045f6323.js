System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, js, Label, LabelOutline, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, SoundManager, UIManager, _dec, _class, _crd, ccclass, HomePage;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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
      js = _cc.js;
      Label = _cc.Label;
      LabelOutline = _cc.LabelOutline;
      Rect = _cc.Rect;
      resources = _cc.resources;
      Size = _cc.Size;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
    }, function (_unresolved_2) {
      SoundManager = _unresolved_2.SoundManager;
    }, function (_unresolved_3) {
      UIManager = _unresolved_3.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8233bqCptxI1IfYpg/wfSfC", "HomePage", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'js', 'Label', 'LabelOutline', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2']);

      ({
        ccclass
      } = _decorator);

      _export("HomePage", HomePage = (_dec = ccclass('HomePage'), _dec(_class = class HomePage extends Component {
        constructor() {
          super(...arguments);
          this._backgroundSprite = null;
          this._homeDecorSprite = null;
          this._settingButton = null;
          this._logoSprite = null;
          this._rewardButtonSprite = null;
          this._rankingButtonSprite = null;
          this._feedbackButtonSprite = null;
          this._collectButtonSprite = null;
          this._levelBadgeSprite = null;
          this._levelLabel = null;
          this._startGameButton = null;
          this._startGameButtonSprite = null;
          this._startGameLabel = null;
        }

        start() {
          this._hideLegacyEmptyNodes();

          this._bindPrefabReferences();

          this._applyTextContent();

          this._bindEvents();

          this._loadImageContent();
        }

        onDestroy() {
          var _this$_startGameButto;

          (_this$_startGameButto = this._startGameButton) == null || _this$_startGameButto.node.off(Button.EventType.CLICK, this._onStartGame, this);
        }

        onShow(params) {
          console.log('首页显示');
        }

        onHide() {
          console.log('首页隐藏');
        }

        _hideLegacyEmptyNodes() {
          ['background', 'content', 'ske'].forEach(name => {
            var node = this.node.getChildByName(name);
            if (node) node.active = false;
          });
        }

        _bindPrefabReferences() {
          var _this$_startGameButto2, _this$_startGameButto3;

          this._backgroundSprite = this._bindSprite('Background');
          this._homeDecorSprite = this._bindSprite('HomeDecor');
          this._settingButton = this._bindButton('SettingButton');
          this._logoSprite = this._bindSprite('Logo');
          this._rewardButtonSprite = this._bindButtonSprite('RewardButton');
          this._rankingButtonSprite = this._bindButtonSprite('RankingButton');
          this._feedbackButtonSprite = this._bindButtonSprite('FeedbackButton');
          this._collectButtonSprite = this._bindButtonSprite('CollectButton');
          this._levelBadgeSprite = this._bindSprite('LevelBadge');
          this._levelLabel = this._bindLabel('LevelBadge/LevelLabel');
          this._startGameButton = this._bindButton('StartGameButton');
          this._startGameButtonSprite = (_this$_startGameButto2 = (_this$_startGameButto3 = this._startGameButton) == null ? void 0 : _this$_startGameButto3.node.getComponent(Sprite)) != null ? _this$_startGameButto2 : null;
          this._startGameLabel = this._bindLabel('StartGameButton/Label');
        }

        _applyTextContent() {
          if (this._levelLabel) {
            this._levelLabel.string = '第1关';
            this._levelLabel.fontSize = 36;
            this._levelLabel.lineHeight = 44;
            this._levelLabel.color = new Color(128, 77, 44, 255);
          }

          if (this._startGameLabel) {
            var _this$_startGameLabel;

            this._startGameLabel.string = '开始游戏';
            this._startGameLabel.fontSize = 42;
            this._startGameLabel.lineHeight = 52;
            this._startGameLabel.color = new Color(255, 255, 255, 255);
            var labelOutline = (_this$_startGameLabel = this._startGameLabel.node.getComponent(LabelOutline)) != null ? _this$_startGameLabel : this._startGameLabel.node.addComponent(LabelOutline);
            labelOutline.color = new Color(144, 88, 19, 255);
            labelOutline.width = 3;
          }
        }

        _bindEvents() {
          if (!this._startGameButton) return;

          this._startGameButton.node.off(Button.EventType.CLICK, this._onStartGame, this);

          this._startGameButton.node.on(Button.EventType.CLICK, this._onStartGame, this);
        }

        _loadImageContent() {
          var _this = this;

          return _asyncToGenerator(function* () {
            var _this$_settingButton$, _this$_settingButton;

            yield Promise.all([_this._setSpriteFrame(_this._backgroundSprite, 'images/home/bg', '[HomePage] 背景图加载失败: images/home/bg', true), _this._setSpriteFrame(_this._homeDecorSprite, 'images/home/home-bg', '[HomePage] 中部装饰图加载失败: images/home/home-bg'), _this._setSpriteFrame((_this$_settingButton$ = (_this$_settingButton = _this._settingButton) == null ? void 0 : _this$_settingButton.node.getComponent(Sprite)) != null ? _this$_settingButton$ : null, 'images/home/setting', '[HomePage] 设置按钮图片加载失败: images/home/setting'), _this._setSpriteFrame(_this._logoSprite, 'images/home/logo', '[HomePage] Logo 图片加载失败: images/home/logo'), _this._setSpriteFrame(_this._rewardButtonSprite, 'images/home/reward', '[HomePage] 奖励按钮图片加载失败: images/home/reward'), _this._setSpriteFrame(_this._rankingButtonSprite, 'images/home/ranking', '[HomePage] 排行按钮图片加载失败: images/home/ranking'), _this._setSpriteFrame(_this._feedbackButtonSprite, 'images/home/feedback', '[HomePage] 反馈按钮图片加载失败: images/home/feedback'), _this._setSpriteFrame(_this._collectButtonSprite, 'images/home/collect', '[HomePage] 收藏按钮图片加载失败: images/home/collect'), _this._setSpriteFrame(_this._levelBadgeSprite, 'images/home/level_bg', '[HomePage] 关卡背景图片加载失败: images/home/level_bg'), _this._setSpriteFrame(_this._startGameButtonSprite, 'images/home/btn_yellow', '[HomePage] 开始游戏按钮背景加载失败: images/home/btn_yellow')]);
          })();
        }

        _bindButtonSprite(path) {
          var _button$node$getCompo;

          var button = this._bindButton(path);

          return (_button$node$getCompo = button == null ? void 0 : button.node.getComponent(Sprite)) != null ? _button$node$getCompo : null;
        }

        _bindButton(path) {
          var _node$getComponent;

          var node = this._findPrefabNode(path);

          if (!node) return null;

          var sprite = this._bindSprite(path);

          var button = (_node$getComponent = node.getComponent(Button)) != null ? _node$getComponent : node.addComponent(Button);
          button.interactable = true;
          button.target = node;

          if (sprite) {
            button.transition = Button.Transition.SCALE;
          }

          return button;
        }

        _bindSprite(path) {
          var _node$getComponent2;

          var node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          var sprite = (_node$getComponent2 = node.getComponent(Sprite)) != null ? _node$getComponent2 : node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _bindLabel(path) {
          var _node$getComponent3;

          var node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          var label = (_node$getComponent3 = node.getComponent(Label)) != null ? _node$getComponent3 : node.addComponent(Label);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          return label;
        }

        _preparePrefabNode(node) {
          var _node$getComponent4;

          node.layer = this.node.layer;
          (_node$getComponent4 = node.getComponent(UITransform)) != null ? _node$getComponent4 : node.addComponent(UITransform);
        }

        _findPrefabNode(path) {
          var node = path.split('/').reduce((current, name) => {
            var _current$getChildByNa;

            return (_current$getChildByNa = current == null ? void 0 : current.getChildByName(name)) != null ? _current$getChildByNa : null;
          }, this.node);

          if (!node) {
            console.warn("[HomePage] prefab \u7F3A\u5C11\u8282\u70B9: " + path);
          }

          return node;
        }

        _setSpriteFrame(sprite, imagePath, failMessage, coverPage) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            if (coverPage === void 0) {
              coverPage = false;
            }

            if (!sprite) {
              console.warn(failMessage);
              return;
            }

            var spriteFrame = yield _this2._loadImageSpriteFrame(imagePath);

            if (!spriteFrame || !sprite.node.isValid) {
              console.warn(failMessage);
              return;
            }

            sprite.spriteFrame = spriteFrame;

            if (coverPage) {
              var pageTransform = _this2.node.getComponent(UITransform);

              var backgroundTransform = sprite.node.getComponent(UITransform);

              if (pageTransform && backgroundTransform) {
                _this2._setCoverSize(backgroundTransform, spriteFrame, pageTransform.contentSize.width, pageTransform.contentSize.height);
              }
            }
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
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield _this3._loadOptional(path + "/spriteFrame", SpriteFrame);
            if (spriteFrame) return _this3._ensureSpriteFrameSize(spriteFrame);
            var texture = yield _this3._loadOptional(path + "/texture", Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this3._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _loadOptional(path, type) {
          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              resources.load(path, type, (error, asset) => {
                resolve(error || !asset ? null : asset);
              });
            });
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

      js.setClassAlias(HomePage, 'HomePage');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=27f7d2dcaceeafc067989faa637fb436045f6323.js.map
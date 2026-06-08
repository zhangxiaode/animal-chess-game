System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _class, _crd, ccclass, LoadingPage;

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
      Color = _cc.Color;
      Component = _cc.Component;
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

      _cclegacy._RF.push({}, "745d7eIhMBMAYiqIp+taaIn", "LoadingPage", undefined);

      __checkObsolete__(['_decorator', 'Color', 'Component', 'Label', 'Node', 'Rect', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("LoadingPage", LoadingPage = (_dec = ccclass('LoadingPage'), _dec(_class = class LoadingPage extends Component {
        constructor() {
          super(...arguments);
          this._hasEnteredHome = false;
          this._activeProgressSprite = null;
          this._progressLabel = null;
          this._loadedAssetCount = 0;
          this._loadingStartTime = 0;
          this._progress = 0;
          this._loadingAssetTotal = 8;
          this._minLoadingSeconds = 3;
          this._animalConfigs = [{
            name: 'Lion',
            path: 'images/loading/lion',
            size: 88,
            x: -108
          }, {
            name: 'Elephant',
            path: 'images/loading/elephant',
            size: 120,
            x: 0
          }, {
            name: 'Tiger',
            path: 'images/loading/tiger',
            size: 88,
            x: 108
          }];
        }

        start() {
          if (this.node.parent) {
            this.node.layer = this.node.parent.layer;
          }

          this._startLoading();
        }

        onDestroy() {
          this.unschedule(this._enterHome);
        }

        _startLoading() {
          var _this = this;

          return _asyncToGenerator(function* () {
            _this._loadingStartTime = Date.now();

            _this._setLoadingProgress(0);

            _this._createSubtitle();

            _this._createEnterTip();

            yield Promise.all([_this._createBackground(), _this._createAnimalImages(), _this._createLogoImage(), _this._createDragonImage(), _this._createProgressBar()]);

            _this._setLoadingProgress(1);

            yield _this._waitMinLoadingTime();

            _this._enterHome();
          })();
        }

        _createBackground() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten, _pageTransform$conten2;

            var pageTransform = _this2.node.getComponent(UITransform);

            var pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 750;
            var pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 1334;
            var backgroundNode = new Node('Background');
            backgroundNode.layer = _this2.node.layer;
            backgroundNode.parent = _this2.node;
            backgroundNode.setPosition(Vec3.ZERO);
            backgroundNode.setSiblingIndex(0);
            var backgroundTransform = backgroundNode.addComponent(UITransform);
            backgroundTransform.setContentSize(pageWidth, pageHeight);
            var backgroundSprite = backgroundNode.addComponent(Sprite);
            backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this2._loadBackgroundSpriteFrame();

            if (!spriteFrame || !backgroundNode.isValid) {
              console.warn('[LoadingPage] 背景图加载失败: images/loading/bg');
              return;
            }

            backgroundSprite.spriteFrame = spriteFrame;

            _this2._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
          })();
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          var originalSize = spriteFrame.originalSize;
          var imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          var imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          var scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        _loadBackgroundSpriteFrame() {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            return _this3._loadTrackedImageSpriteFrame('images/loading/bg');
          })();
        }

        _createAnimalImages() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten3;

            var pageTransform = _this4.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten3 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten3 : 1334;
            var centerY = pageHeight / 2 - 150;

            for (var config of _this4._animalConfigs) {
              var animalNode = new Node(config.name);
              animalNode.layer = _this4.node.layer;
              animalNode.parent = _this4.node;
              animalNode.setPosition(new Vec3(config.x, centerY, 0));
              var animalTransform = animalNode.addComponent(UITransform);
              animalTransform.setContentSize(config.size, config.size);
              var animalSprite = animalNode.addComponent(Sprite);
              animalSprite.sizeMode = Sprite.SizeMode.CUSTOM;
              var spriteFrame = yield _this4._loadTrackedImageSpriteFrame(config.path);

              if (!spriteFrame || !animalNode.isValid) {
                console.warn("[LoadingPage] \u56FE\u7247\u52A0\u8F7D\u5931\u8D25: " + config.path);
                continue;
              }

              animalSprite.spriteFrame = spriteFrame;
            }
          })();
        }

        _createLogoImage() {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten4;

            var pageTransform = _this5.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten4 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten4 : 1334;
            var logoNode = new Node('Logo');
            logoNode.layer = _this5.node.layer;
            logoNode.parent = _this5.node;
            logoNode.setPosition(new Vec3(0, pageHeight / 2 - 420, 0));
            var logoTransform = logoNode.addComponent(UITransform);
            logoTransform.setContentSize(240, 200);
            var logoSprite = logoNode.addComponent(Sprite);
            logoSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this5._loadTrackedImageSpriteFrame('images/loading/logo');

            if (!spriteFrame || !logoNode.isValid) {
              console.warn('[LoadingPage] 图片加载失败: images/loading/logo');
              return;
            }

            logoSprite.spriteFrame = spriteFrame;
          })();
        }

        _createSubtitle() {
          var _pageTransform$conten5;

          var pageTransform = this.node.getComponent(UITransform);
          var pageHeight = (_pageTransform$conten5 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten5 : 1334;
          var subtitleNode = new Node('Subtitle');
          subtitleNode.layer = this.node.layer;
          subtitleNode.parent = this.node;
          subtitleNode.setPosition(new Vec3(0, pageHeight / 2 - 540, 0));
          var subtitleTransform = subtitleNode.addComponent(UITransform);
          subtitleTransform.setContentSize(360, 42);
          var subtitleLabel = subtitleNode.addComponent(Label);
          subtitleLabel.string = '经典策略 · 趣味对战';
          subtitleLabel.fontSize = 30;
          subtitleLabel.color = new Color(255, 255, 255, 255);
          subtitleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          subtitleLabel.verticalAlign = Label.VerticalAlign.CENTER;
          subtitleLabel.overflow = Label.Overflow.CLAMP;
        }

        _createDragonImage() {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten6;

            var pageTransform = _this6.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten6 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten6 : 1334;
            var dragonNode = new Node('Dragon');
            dragonNode.layer = _this6.node.layer;
            dragonNode.parent = _this6.node;
            dragonNode.setPosition(new Vec3(0, pageHeight / 2 - 770, 0));
            var dragonTransform = dragonNode.addComponent(UITransform);
            dragonTransform.setContentSize(320, 320);
            var dragonSprite = dragonNode.addComponent(Sprite);
            dragonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this6._loadTrackedImageSpriteFrame('images/loading/dragon');

            if (!spriteFrame || !dragonNode.isValid) {
              console.warn('[LoadingPage] 图片加载失败: images/loading/dragon');
              return;
            }

            dragonSprite.spriteFrame = spriteFrame;
          })();
        }

        _createProgressBar() {
          var _this7 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten7;

            var pageTransform = _this7.node.getComponent(UITransform);

            var pageHeight = (_pageTransform$conten7 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten7 : 1334;
            var progressWidth = 310;
            var progressHeight = 16;
            var progressRoot = new Node('ProgressBar');
            progressRoot.layer = _this7.node.layer;
            progressRoot.parent = _this7.node;
            progressRoot.setPosition(new Vec3(0, pageHeight / 2 - 1060, 0));
            progressRoot.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
            var backgroundNode = new Node('ProgressBackground');
            backgroundNode.layer = _this7.node.layer;
            backgroundNode.parent = progressRoot;
            backgroundNode.setPosition(Vec3.ZERO);
            backgroundNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
            var backgroundSprite = backgroundNode.addComponent(Sprite);
            backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var activeNode = new Node('ProgressActived');
            activeNode.layer = _this7.node.layer;
            activeNode.parent = progressRoot;
            activeNode.setPosition(Vec3.ZERO);
            activeNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
            _this7._activeProgressSprite = activeNode.addComponent(Sprite);
            _this7._activeProgressSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            _this7._activeProgressSprite.type = Sprite.Type.FILLED;
            _this7._activeProgressSprite.fillType = Sprite.FillType.HORIZONTAL;
            var progressLabelNode = new Node('ProgressPercent');
            progressLabelNode.layer = _this7.node.layer;
            progressLabelNode.parent = progressRoot;
            progressLabelNode.setPosition(new Vec3(0, -42, 0));
            progressLabelNode.addComponent(UITransform).setContentSize(160, 36);
            _this7._progressLabel = progressLabelNode.addComponent(Label);
            _this7._progressLabel.string = _this7._getProgressText();
            _this7._progressLabel.fontSize = 26;
            _this7._progressLabel.color = new Color(255, 255, 255, 255);
            _this7._progressLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
            _this7._progressLabel.verticalAlign = Label.VerticalAlign.CENTER;
            _this7._progressLabel.overflow = Label.Overflow.CLAMP;
            var firstLoadTipNode = new Node('FirstLoadTip');
            firstLoadTipNode.layer = _this7.node.layer;
            firstLoadTipNode.parent = progressRoot;
            firstLoadTipNode.setPosition(new Vec3(0, -90, 0));
            firstLoadTipNode.addComponent(UITransform).setContentSize(360, 36);
            var firstLoadTipLabel = firstLoadTipNode.addComponent(Label);
            firstLoadTipLabel.string = '首次加载可能需要一些时间';
            firstLoadTipLabel.fontSize = 24;
            firstLoadTipLabel.color = new Color(255, 255, 255, 128);
            firstLoadTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
            firstLoadTipLabel.verticalAlign = Label.VerticalAlign.CENTER;
            firstLoadTipLabel.overflow = Label.Overflow.CLAMP;
            var [backgroundFrame, activeFrame] = yield Promise.all([_this7._loadTrackedImageSpriteFrame('images/loading/loading'), _this7._loadTrackedImageSpriteFrame('images/loading/loading-actived')]);

            if (backgroundFrame && backgroundNode.isValid) {
              backgroundSprite.spriteFrame = backgroundFrame;
            } else {
              console.warn('[LoadingPage] 图片加载失败: images/loading/loading');
            }

            if (activeFrame && activeNode.isValid && _this7._activeProgressSprite) {
              _this7._activeProgressSprite.spriteFrame = activeFrame;
              _this7._activeProgressSprite.fillStart = 0;
              _this7._activeProgressSprite.fillRange = _this7._progress;
            } else {
              console.warn('[LoadingPage] 图片加载失败: images/loading/loading-actived');
            }
          })();
        }

        _createEnterTip() {
          var _pageTransform$conten8;

          var pageTransform = this.node.getComponent(UITransform);
          var pageHeight = (_pageTransform$conten8 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten8 : 1334;
          var tipNode = new Node('EnterTip');
          tipNode.layer = this.node.layer;
          tipNode.parent = this.node;
          tipNode.setPosition(new Vec3(0, pageHeight / 2 - 970, 0));
          var tipTransform = tipNode.addComponent(UITransform);
          tipTransform.setContentSize(360, 42);
          var tipLabel = tipNode.addComponent(Label);
          tipLabel.string = '正在进入游戏...';
          tipLabel.fontSize = 28;
          tipLabel.color = new Color(255, 255, 255, 255);
          tipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          tipLabel.verticalAlign = Label.VerticalAlign.CENTER;
          tipLabel.overflow = Label.Overflow.CLAMP;
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

        _loadTrackedImageSpriteFrame(path) {
          var _this9 = this;

          return _asyncToGenerator(function* () {
            try {
              return yield _this9._loadImageSpriteFrame(path);
            } finally {
              _this9._loadedAssetCount++;

              _this9._setLoadingProgress(_this9._loadedAssetCount / _this9._loadingAssetTotal);
            }
          })();
        }

        _setLoadingProgress(value) {
          var _this$_activeProgress;

          this._progress = Math.max(0, Math.min(1, value));

          if ((_this$_activeProgress = this._activeProgressSprite) != null && _this$_activeProgress.spriteFrame) {
            this._activeProgressSprite.fillRange = this._progress;
          }

          if (this._progressLabel) {
            this._progressLabel.string = this._getProgressText();
          }
        }

        _getProgressText() {
          return Math.round(this._progress * 100) + "%";
        }

        _waitMinLoadingTime() {
          var _this10 = this;

          return _asyncToGenerator(function* () {
            var elapsed = (Date.now() - _this10._loadingStartTime) / 1000;
            var remaining = Math.max(0, _this10._minLoadingSeconds - elapsed);
            if (remaining <= 0) return;
            yield new Promise(resolve => {
              _this10.scheduleOnce(resolve, remaining);
            });
          })();
        }

        _enterHome() {
          if (this._hasEnteredHome) return;
          this._hasEnteredHome = true;
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().openPage('HomePage');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ffe9cd0e8cb59dde53df7b5ab2ff09cbfa7c4bc7.js.map
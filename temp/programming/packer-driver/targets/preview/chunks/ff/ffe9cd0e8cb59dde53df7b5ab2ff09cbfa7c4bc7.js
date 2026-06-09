System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _crd, ccclass, property, LoadingPage;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
        ccclass,
        property
      } = _decorator);

      _export("LoadingPage", LoadingPage = (_dec = ccclass('LoadingPage'), _dec2 = property(Sprite), _dec3 = property(Sprite), _dec4 = property(Sprite), _dec5 = property(Sprite), _dec6 = property(Sprite), _dec7 = property(Sprite), _dec8 = property(Sprite), _dec9 = property(Sprite), _dec10 = property(Label), _dec11 = property(Label), _dec12 = property(Label), _dec13 = property(SpriteFrame), _dec14 = property(SpriteFrame), _dec15 = property(SpriteFrame), _dec16 = property(SpriteFrame), _dec17 = property(SpriteFrame), _dec18 = property(SpriteFrame), _dec19 = property(SpriteFrame), _dec20 = property(SpriteFrame), _dec(_class = (_class2 = class LoadingPage extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "backgroundSprite", _descriptor, this);

          _initializerDefineProperty(this, "lionSprite", _descriptor2, this);

          _initializerDefineProperty(this, "elephantSprite", _descriptor3, this);

          _initializerDefineProperty(this, "tigerSprite", _descriptor4, this);

          _initializerDefineProperty(this, "logoSprite", _descriptor5, this);

          _initializerDefineProperty(this, "dragonSprite", _descriptor6, this);

          _initializerDefineProperty(this, "progressBackgroundSprite", _descriptor7, this);

          _initializerDefineProperty(this, "progressActivedSprite", _descriptor8, this);

          _initializerDefineProperty(this, "subtitleLabel", _descriptor9, this);

          _initializerDefineProperty(this, "enterTipLabel", _descriptor10, this);

          _initializerDefineProperty(this, "progressLabel", _descriptor11, this);

          _initializerDefineProperty(this, "backgroundFrame", _descriptor12, this);

          _initializerDefineProperty(this, "lionFrame", _descriptor13, this);

          _initializerDefineProperty(this, "elephantFrame", _descriptor14, this);

          _initializerDefineProperty(this, "tigerFrame", _descriptor15, this);

          _initializerDefineProperty(this, "logoFrame", _descriptor16, this);

          _initializerDefineProperty(this, "dragonFrame", _descriptor17, this);

          _initializerDefineProperty(this, "progressBackgroundFrame", _descriptor18, this);

          _initializerDefineProperty(this, "progressActivedFrame", _descriptor19, this);

          this._hasEnteredHome = false;
          this._loadedAssetCount = 0;
          this._loadingStartTime = 0;
          this._progress = 0;
          this._loadingAssetTotal = 8;
          this._minLoadingSeconds = 3;
        }

        start() {
          if (this.node.parent) {
            this.node.layer = this.node.parent.layer;
          }

          this._bindPrefabReferences();

          this._startLoading();
        }

        onDestroy() {
          this.unschedule(this._enterHome);
        }

        _startLoading() {
          var _this = this;

          return _asyncToGenerator(function* () {
            _this._loadingStartTime = Date.now();
            _this._loadedAssetCount = 0;

            _this._setLoadingProgress(0);

            _this._ensureTextContent();

            _this._ensureStaticLayout();

            yield _this._ensureImageContent();

            _this._setLoadingProgress(1);

            yield _this._waitMinLoadingTime();

            _this._enterHome();
          })();
        }

        _bindPrefabReferences() {
          var _this$backgroundSprit, _this$lionSprite, _this$elephantSprite, _this$tigerSprite, _this$logoSprite, _this$dragonSprite, _this$progressBackgro, _this$progressActived, _this$subtitleLabel, _this$enterTipLabel, _this$progressLabel;

          (_this$backgroundSprit = this.backgroundSprite) != null ? _this$backgroundSprit : this.backgroundSprite = this._findSprite('Background');
          (_this$lionSprite = this.lionSprite) != null ? _this$lionSprite : this.lionSprite = this._findSprite('Lion');
          (_this$elephantSprite = this.elephantSprite) != null ? _this$elephantSprite : this.elephantSprite = this._findSprite('Elephant');
          (_this$tigerSprite = this.tigerSprite) != null ? _this$tigerSprite : this.tigerSprite = this._findSprite('Tiger');
          (_this$logoSprite = this.logoSprite) != null ? _this$logoSprite : this.logoSprite = this._findSprite('Logo');
          (_this$dragonSprite = this.dragonSprite) != null ? _this$dragonSprite : this.dragonSprite = this._findSprite('Dragon');
          (_this$progressBackgro = this.progressBackgroundSprite) != null ? _this$progressBackgro : this.progressBackgroundSprite = this._findSprite('ProgressBar/ProgressBackground');
          (_this$progressActived = this.progressActivedSprite) != null ? _this$progressActived : this.progressActivedSprite = this._findSprite('ProgressBar/ProgressActived');
          (_this$subtitleLabel = this.subtitleLabel) != null ? _this$subtitleLabel : this.subtitleLabel = this._findLabel('Subtitle');
          (_this$enterTipLabel = this.enterTipLabel) != null ? _this$enterTipLabel : this.enterTipLabel = this._findLabel('EnterTip');
          (_this$progressLabel = this.progressLabel) != null ? _this$progressLabel : this.progressLabel = this._findLabel('ProgressBar/ProgressPercent');
        }

        _findSprite(path) {
          var _this$_findNode$getCo, _this$_findNode;

          return (_this$_findNode$getCo = (_this$_findNode = this._findNode(path)) == null ? void 0 : _this$_findNode.getComponent(Sprite)) != null ? _this$_findNode$getCo : null;
        }

        _findLabel(path) {
          var _this$_findNode$getCo2, _this$_findNode2;

          return (_this$_findNode$getCo2 = (_this$_findNode2 = this._findNode(path)) == null ? void 0 : _this$_findNode2.getComponent(Label)) != null ? _this$_findNode$getCo2 : null;
        }

        _findNode(path) {
          var parts = path.split('/');
          var current = this.node;

          for (var part of parts) {
            var _current$getChildByNa, _current;

            current = (_current$getChildByNa = (_current = current) == null ? void 0 : _current.getChildByName(part)) != null ? _current$getChildByNa : null;
            if (!current) return null;
          }

          return current;
        }

        _ensureTextContent() {
          if (!this.subtitleLabel) {
            this.subtitleLabel = this._createLabel('Subtitle', '经典策略 · 趣味对战', new Vec3(0, this._pageHeight / 2 - 540, 0), 360, 42, 30);
          }

          if (!this.enterTipLabel) {
            this.enterTipLabel = this._createLabel('EnterTip', '正在进入游戏...', new Vec3(0, this._pageHeight / 2 - 970, 0), 360, 42, 28);
          }

          this.subtitleLabel.string = '经典策略 · 趣味对战';
          this.enterTipLabel.string = '正在进入游戏...';
        }

        _ensureStaticLayout() {
          var _this$backgroundSprit2, _this$lionSprite2, _this$elephantSprite2, _this$tigerSprite2, _this$logoSprite2, _this$dragonSprite2, _this$progressBackgro2, _this$progressActived2;

          this._syncNodeSizeAndPosition((_this$backgroundSprit2 = this.backgroundSprite) == null ? void 0 : _this$backgroundSprit2.node, this._pageWidth, this._pageHeight, Vec3.ZERO, 0);

          this._syncNodeSizeAndPosition((_this$lionSprite2 = this.lionSprite) == null ? void 0 : _this$lionSprite2.node, 88, 88, new Vec3(-108, this._pageHeight / 2 - 150, 0));

          this._syncNodeSizeAndPosition((_this$elephantSprite2 = this.elephantSprite) == null ? void 0 : _this$elephantSprite2.node, 120, 120, new Vec3(0, this._pageHeight / 2 - 150, 0));

          this._syncNodeSizeAndPosition((_this$tigerSprite2 = this.tigerSprite) == null ? void 0 : _this$tigerSprite2.node, 88, 88, new Vec3(108, this._pageHeight / 2 - 150, 0));

          this._syncNodeSizeAndPosition((_this$logoSprite2 = this.logoSprite) == null ? void 0 : _this$logoSprite2.node, 240, 200, new Vec3(0, this._pageHeight / 2 - 420, 0));

          this._syncNodeSizeAndPosition((_this$dragonSprite2 = this.dragonSprite) == null ? void 0 : _this$dragonSprite2.node, 320, 320, new Vec3(0, this._pageHeight / 2 - 770, 0));

          this._syncNodeSizeAndPosition((_this$progressBackgro2 = this.progressBackgroundSprite) == null ? void 0 : _this$progressBackgro2.node, 310, 16, Vec3.ZERO);

          this._syncNodeSizeAndPosition((_this$progressActived2 = this.progressActivedSprite) == null ? void 0 : _this$progressActived2.node, 310, 16, Vec3.ZERO);
        }

        _ensureImageContent() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var _this2$backgroundSpri, _this2$lionSprite, _this2$elephantSprite, _this2$tigerSprite, _this2$logoSprite, _this2$dragonSprite;

            (_this2$backgroundSpri = _this2.backgroundSprite) != null ? _this2$backgroundSpri : _this2.backgroundSprite = _this2._createImage('Background', _this2._pageWidth, _this2._pageHeight, Vec3.ZERO, 0);
            (_this2$lionSprite = _this2.lionSprite) != null ? _this2$lionSprite : _this2.lionSprite = _this2._createImage('Lion', 88, 88, new Vec3(-108, _this2._pageHeight / 2 - 150, 0));
            (_this2$elephantSprite = _this2.elephantSprite) != null ? _this2$elephantSprite : _this2.elephantSprite = _this2._createImage('Elephant', 120, 120, new Vec3(0, _this2._pageHeight / 2 - 150, 0));
            (_this2$tigerSprite = _this2.tigerSprite) != null ? _this2$tigerSprite : _this2.tigerSprite = _this2._createImage('Tiger', 88, 88, new Vec3(108, _this2._pageHeight / 2 - 150, 0));
            (_this2$logoSprite = _this2.logoSprite) != null ? _this2$logoSprite : _this2.logoSprite = _this2._createImage('Logo', 240, 200, new Vec3(0, _this2._pageHeight / 2 - 420, 0));
            (_this2$dragonSprite = _this2.dragonSprite) != null ? _this2$dragonSprite : _this2.dragonSprite = _this2._createImage('Dragon', 320, 320, new Vec3(0, _this2._pageHeight / 2 - 770, 0));

            _this2._ensureProgressBar();

            var imageConfigs = [{
              name: 'Background',
              path: 'images/loading/bg',
              sprite: _this2.backgroundSprite,
              frame: _this2.backgroundFrame
            }, {
              name: 'Lion',
              path: 'images/loading/lion',
              sprite: _this2.lionSprite,
              frame: _this2.lionFrame
            }, {
              name: 'Elephant',
              path: 'images/loading/elephant',
              sprite: _this2.elephantSprite,
              frame: _this2.elephantFrame
            }, {
              name: 'Tiger',
              path: 'images/loading/tiger',
              sprite: _this2.tigerSprite,
              frame: _this2.tigerFrame
            }, {
              name: 'Logo',
              path: 'images/loading/logo',
              sprite: _this2.logoSprite,
              frame: _this2.logoFrame
            }, {
              name: 'Dragon',
              path: 'images/loading/dragon',
              sprite: _this2.dragonSprite,
              frame: _this2.dragonFrame
            }, {
              name: 'ProgressBackground',
              path: 'images/loading/loading',
              sprite: _this2.progressBackgroundSprite,
              frame: _this2.progressBackgroundFrame
            }, {
              name: 'ProgressActived',
              path: 'images/loading/loading-actived',
              sprite: _this2.progressActivedSprite,
              frame: _this2.progressActivedFrame
            }];
            yield Promise.all(imageConfigs.map(config => _this2._applyImageConfig(config)));
          })();
        }

        _ensureProgressBar() {
          var _this$progressBackgro3, _this$progressActived3;

          var progressRoot = this._findNode('ProgressBar');

          if (!progressRoot) {
            progressRoot = new Node('ProgressBar');
            progressRoot.layer = this.node.layer;
            progressRoot.parent = this.node;
            progressRoot.setPosition(new Vec3(0, this._pageHeight / 2 - 1060, 0));
            progressRoot.addComponent(UITransform).setContentSize(310, 16);
          }

          (_this$progressBackgro3 = this.progressBackgroundSprite) != null ? _this$progressBackgro3 : this.progressBackgroundSprite = this._createImage('ProgressBackground', 310, 16, Vec3.ZERO, undefined, progressRoot);
          (_this$progressActived3 = this.progressActivedSprite) != null ? _this$progressActived3 : this.progressActivedSprite = this._createImage('ProgressActived', 310, 16, Vec3.ZERO, undefined, progressRoot);

          if (!this.progressLabel) {
            this.progressLabel = this._createLabel('ProgressPercent', this._getProgressText(), new Vec3(0, -42, 0), 160, 36, 26, progressRoot);
          }

          if (!this._findNode('ProgressBar/FirstLoadTip')) {
            var firstLoadTipLabel = this._createLabel('FirstLoadTip', '首次加载可能需要一些时间', new Vec3(0, -90, 0), 360, 36, 24, progressRoot);

            firstLoadTipLabel.color = new Color(255, 255, 255, 128);
          }

          this._ensureStaticLayout();
        }

        _applyImageConfig(config) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var _config$frame;

            var sprite = config.sprite;

            if (!sprite) {
              _this3._increaseLoadingProgress();

              return;
            }

            sprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = (_config$frame = config.frame) != null ? _config$frame : yield _this3._loadImageSpriteFrame(config.path);

            _this3._increaseLoadingProgress();

            if (!spriteFrame || !sprite.node.isValid) {
              console.warn("[LoadingPage] \u56FE\u7247\u52A0\u8F7D\u5931\u8D25: " + config.path);
              return;
            }

            sprite.spriteFrame = spriteFrame;

            if (config.name === 'Background') {
              var transform = sprite.node.getComponent(UITransform);

              if (transform) {
                _this3._setCoverSize(transform, spriteFrame, _this3._pageWidth, _this3._pageHeight);
              }
            }

            if (config.name === 'ProgressActived') {
              _this3._configureProgressFill(sprite);
            }
          })();
        }

        _createImage(name, width, height, position, siblingIndex, parent) {
          if (parent === void 0) {
            parent = this.node;
          }

          var imageNode = new Node(name);
          imageNode.layer = this.node.layer;
          imageNode.parent = parent;
          imageNode.setPosition(position);

          if (siblingIndex !== undefined) {
            imageNode.setSiblingIndex(siblingIndex);
          }

          imageNode.addComponent(UITransform).setContentSize(width, height);
          var sprite = imageNode.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _createLabel(name, text, position, width, height, fontSize, parent) {
          if (parent === void 0) {
            parent = this.node;
          }

          var labelNode = new Node(name);
          labelNode.layer = this.node.layer;
          labelNode.parent = parent;
          labelNode.setPosition(position);
          labelNode.addComponent(UITransform).setContentSize(width, height);
          var label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = fontSize;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          return label;
        }

        _syncNodeSizeAndPosition(node, width, height, position, siblingIndex) {
          var _node$getComponent;

          if (!node) return;
          node.layer = this.node.layer;
          node.setPosition(position);
          var transform = (_node$getComponent = node.getComponent(UITransform)) != null ? _node$getComponent : node.addComponent(UITransform);
          transform.setContentSize(width, height);

          if (siblingIndex !== undefined) {
            node.setSiblingIndex(siblingIndex);
          }
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          var originalSize = spriteFrame.originalSize;
          var imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          var imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          var scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        _loadImageSpriteFrame(path) {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst([path + "/spriteFrame", path], SpriteFrame);
            if (spriteFrame) return _this4._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load(path + "/texture", Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this4._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
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

        _increaseLoadingProgress() {
          this._loadedAssetCount++;

          this._setLoadingProgress(this._loadedAssetCount / this._loadingAssetTotal);
        }

        _configureProgressFill(sprite) {
          if (!sprite.spriteFrame) return;
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          sprite.type = Sprite.Type.FILLED;
          sprite.fillType = Sprite.FillType.HORIZONTAL;
          sprite.fillStart = 0;
          sprite.fillRange = this._progress;
        }

        _setLoadingProgress(value) {
          var _this$progressActived4;

          this._progress = Math.max(0, Math.min(1, value));

          if ((_this$progressActived4 = this.progressActivedSprite) != null && _this$progressActived4.spriteFrame) {
            this.progressActivedSprite.fillRange = this._progress;
          }

          if (this.progressLabel) {
            this.progressLabel.string = this._getProgressText();
          }
        }

        _getProgressText() {
          return Math.round(this._progress * 100) + "%";
        }

        _waitMinLoadingTime() {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var elapsed = (Date.now() - _this5._loadingStartTime) / 1000;
            var remaining = Math.max(0, _this5._minLoadingSeconds - elapsed);
            if (remaining <= 0) return;
            yield new Promise(resolve => {
              _this5.scheduleOnce(resolve, remaining);
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

        get _pageWidth() {
          var _this$node$getCompone, _this$node$getCompone2;

          return (_this$node$getCompone = (_this$node$getCompone2 = this.node.getComponent(UITransform)) == null ? void 0 : _this$node$getCompone2.contentSize.width) != null ? _this$node$getCompone : 750;
        }

        get _pageHeight() {
          var _this$node$getCompone3, _this$node$getCompone4;

          return (_this$node$getCompone3 = (_this$node$getCompone4 = this.node.getComponent(UITransform)) == null ? void 0 : _this$node$getCompone4.contentSize.height) != null ? _this$node$getCompone3 : 1334;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "backgroundSprite", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "lionSprite", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "elephantSprite", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "tigerSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "logoSprite", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "dragonSprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "progressBackgroundSprite", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "progressActivedSprite", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "subtitleLabel", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "enterTipLabel", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "progressLabel", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "backgroundFrame", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "lionFrame", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "elephantFrame", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "tigerFrame", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "logoFrame", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "dragonFrame", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "progressBackgroundFrame", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "progressActivedFrame", [_dec20], {
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
//# sourceMappingURL=ffe9cd0e8cb59dde53df7b5ab2ff09cbfa7c4bc7.js.map
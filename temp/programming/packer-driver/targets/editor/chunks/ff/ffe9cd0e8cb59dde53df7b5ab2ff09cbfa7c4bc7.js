System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Color, Component, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _class, _crd, ccclass, LoadingPage;

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
        constructor(...args) {
          super(...args);
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

        async _startLoading() {
          this._loadingStartTime = Date.now();

          this._setLoadingProgress(0);

          this._createSubtitle();

          this._createEnterTip();

          await Promise.all([this._createBackground(), this._createAnimalImages(), this._createLogoImage(), this._createDragonImage(), this._createProgressBar()]);

          this._setLoadingProgress(1);

          await this._waitMinLoadingTime();

          this._enterHome();
        }

        async _createBackground() {
          var _pageTransform$conten, _pageTransform$conten2;

          const pageTransform = this.node.getComponent(UITransform);
          const pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 750;
          const pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 1334;
          const backgroundNode = new Node('Background');
          backgroundNode.layer = this.node.layer;
          backgroundNode.parent = this.node;
          backgroundNode.setPosition(Vec3.ZERO);
          backgroundNode.setSiblingIndex(0);
          const backgroundTransform = backgroundNode.addComponent(UITransform);
          backgroundTransform.setContentSize(pageWidth, pageHeight);
          const backgroundSprite = backgroundNode.addComponent(Sprite);
          backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadBackgroundSpriteFrame();

          if (!spriteFrame || !backgroundNode.isValid) {
            console.warn('[LoadingPage] 背景图加载失败: images/loading/bg');
            return;
          }

          backgroundSprite.spriteFrame = spriteFrame;

          this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          const originalSize = spriteFrame.originalSize;
          const imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          const imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        async _loadBackgroundSpriteFrame() {
          return this._loadTrackedImageSpriteFrame('images/loading/bg');
        }

        async _createAnimalImages() {
          var _pageTransform$conten3;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten3 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten3 : 1334;
          const centerY = pageHeight / 2 - 150;

          for (const config of this._animalConfigs) {
            const animalNode = new Node(config.name);
            animalNode.layer = this.node.layer;
            animalNode.parent = this.node;
            animalNode.setPosition(new Vec3(config.x, centerY, 0));
            const animalTransform = animalNode.addComponent(UITransform);
            animalTransform.setContentSize(config.size, config.size);
            const animalSprite = animalNode.addComponent(Sprite);
            animalSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            const spriteFrame = await this._loadTrackedImageSpriteFrame(config.path);

            if (!spriteFrame || !animalNode.isValid) {
              console.warn(`[LoadingPage] 图片加载失败: ${config.path}`);
              continue;
            }

            animalSprite.spriteFrame = spriteFrame;
          }
        }

        async _createLogoImage() {
          var _pageTransform$conten4;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten4 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten4 : 1334;
          const logoNode = new Node('Logo');
          logoNode.layer = this.node.layer;
          logoNode.parent = this.node;
          logoNode.setPosition(new Vec3(0, pageHeight / 2 - 420, 0));
          const logoTransform = logoNode.addComponent(UITransform);
          logoTransform.setContentSize(240, 200);
          const logoSprite = logoNode.addComponent(Sprite);
          logoSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadTrackedImageSpriteFrame('images/loading/logo');

          if (!spriteFrame || !logoNode.isValid) {
            console.warn('[LoadingPage] 图片加载失败: images/loading/logo');
            return;
          }

          logoSprite.spriteFrame = spriteFrame;
        }

        _createSubtitle() {
          var _pageTransform$conten5;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten5 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten5 : 1334;
          const subtitleNode = new Node('Subtitle');
          subtitleNode.layer = this.node.layer;
          subtitleNode.parent = this.node;
          subtitleNode.setPosition(new Vec3(0, pageHeight / 2 - 540, 0));
          const subtitleTransform = subtitleNode.addComponent(UITransform);
          subtitleTransform.setContentSize(360, 42);
          const subtitleLabel = subtitleNode.addComponent(Label);
          subtitleLabel.string = '经典策略 · 趣味对战';
          subtitleLabel.fontSize = 30;
          subtitleLabel.color = new Color(255, 255, 255, 255);
          subtitleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          subtitleLabel.verticalAlign = Label.VerticalAlign.CENTER;
          subtitleLabel.overflow = Label.Overflow.CLAMP;
        }

        async _createDragonImage() {
          var _pageTransform$conten6;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten6 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten6 : 1334;
          const dragonNode = new Node('Dragon');
          dragonNode.layer = this.node.layer;
          dragonNode.parent = this.node;
          dragonNode.setPosition(new Vec3(0, pageHeight / 2 - 770, 0));
          const dragonTransform = dragonNode.addComponent(UITransform);
          dragonTransform.setContentSize(320, 320);
          const dragonSprite = dragonNode.addComponent(Sprite);
          dragonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadTrackedImageSpriteFrame('images/loading/dragon');

          if (!spriteFrame || !dragonNode.isValid) {
            console.warn('[LoadingPage] 图片加载失败: images/loading/dragon');
            return;
          }

          dragonSprite.spriteFrame = spriteFrame;
        }

        async _createProgressBar() {
          var _pageTransform$conten7;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten7 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten7 : 1334;
          const progressWidth = 310;
          const progressHeight = 16;
          const progressRoot = new Node('ProgressBar');
          progressRoot.layer = this.node.layer;
          progressRoot.parent = this.node;
          progressRoot.setPosition(new Vec3(0, pageHeight / 2 - 1060, 0));
          progressRoot.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
          const backgroundNode = new Node('ProgressBackground');
          backgroundNode.layer = this.node.layer;
          backgroundNode.parent = progressRoot;
          backgroundNode.setPosition(Vec3.ZERO);
          backgroundNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
          const backgroundSprite = backgroundNode.addComponent(Sprite);
          backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const activeNode = new Node('ProgressActived');
          activeNode.layer = this.node.layer;
          activeNode.parent = progressRoot;
          activeNode.setPosition(Vec3.ZERO);
          activeNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);
          this._activeProgressSprite = activeNode.addComponent(Sprite);
          this._activeProgressSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this._activeProgressSprite.type = Sprite.Type.FILLED;
          this._activeProgressSprite.fillType = Sprite.FillType.HORIZONTAL;
          const progressLabelNode = new Node('ProgressPercent');
          progressLabelNode.layer = this.node.layer;
          progressLabelNode.parent = progressRoot;
          progressLabelNode.setPosition(new Vec3(0, -42, 0));
          progressLabelNode.addComponent(UITransform).setContentSize(160, 36);
          this._progressLabel = progressLabelNode.addComponent(Label);
          this._progressLabel.string = this._getProgressText();
          this._progressLabel.fontSize = 26;
          this._progressLabel.color = new Color(255, 255, 255, 255);
          this._progressLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._progressLabel.verticalAlign = Label.VerticalAlign.CENTER;
          this._progressLabel.overflow = Label.Overflow.CLAMP;
          const firstLoadTipNode = new Node('FirstLoadTip');
          firstLoadTipNode.layer = this.node.layer;
          firstLoadTipNode.parent = progressRoot;
          firstLoadTipNode.setPosition(new Vec3(0, -90, 0));
          firstLoadTipNode.addComponent(UITransform).setContentSize(360, 36);
          const firstLoadTipLabel = firstLoadTipNode.addComponent(Label);
          firstLoadTipLabel.string = '首次加载可能需要一些时间';
          firstLoadTipLabel.fontSize = 24;
          firstLoadTipLabel.color = new Color(255, 255, 255, 128);
          firstLoadTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          firstLoadTipLabel.verticalAlign = Label.VerticalAlign.CENTER;
          firstLoadTipLabel.overflow = Label.Overflow.CLAMP;
          const [backgroundFrame, activeFrame] = await Promise.all([this._loadTrackedImageSpriteFrame('images/loading/loading'), this._loadTrackedImageSpriteFrame('images/loading/loading-actived')]);

          if (backgroundFrame && backgroundNode.isValid) {
            backgroundSprite.spriteFrame = backgroundFrame;
          } else {
            console.warn('[LoadingPage] 图片加载失败: images/loading/loading');
          }

          if (activeFrame && activeNode.isValid && this._activeProgressSprite) {
            this._activeProgressSprite.spriteFrame = activeFrame;
            this._activeProgressSprite.fillStart = 0;
            this._activeProgressSprite.fillRange = this._progress;
          } else {
            console.warn('[LoadingPage] 图片加载失败: images/loading/loading-actived');
          }
        }

        _createEnterTip() {
          var _pageTransform$conten8;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten8 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten8 : 1334;
          const tipNode = new Node('EnterTip');
          tipNode.layer = this.node.layer;
          tipNode.parent = this.node;
          tipNode.setPosition(new Vec3(0, pageHeight / 2 - 970, 0));
          const tipTransform = tipNode.addComponent(UITransform);
          tipTransform.setContentSize(360, 42);
          const tipLabel = tipNode.addComponent(Label);
          tipLabel.string = '正在进入游戏...';
          tipLabel.fontSize = 28;
          tipLabel.color = new Color(255, 255, 255, 255);
          tipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          tipLabel.verticalAlign = Label.VerticalAlign.CENTER;
          tipLabel.overflow = Label.Overflow.CLAMP;
        }

        async _loadImageSpriteFrame(path) {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst([`${path}/spriteFrame`, path], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load(`${path}/texture`, Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
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

        async _loadTrackedImageSpriteFrame(path) {
          try {
            return await this._loadImageSpriteFrame(path);
          } finally {
            this._loadedAssetCount++;

            this._setLoadingProgress(this._loadedAssetCount / this._loadingAssetTotal);
          }
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
          return `${Math.round(this._progress * 100)}%`;
        }

        async _waitMinLoadingTime() {
          const elapsed = (Date.now() - this._loadingStartTime) / 1000;
          const remaining = Math.max(0, this._minLoadingSeconds - elapsed);
          if (remaining <= 0) return;
          await new Promise(resolve => {
            this.scheduleOnce(resolve, remaining);
          });
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
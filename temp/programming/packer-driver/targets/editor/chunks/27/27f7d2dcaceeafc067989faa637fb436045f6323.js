System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, assetManager, Button, Color, Component, js, Label, LabelOutline, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, PopupManager, SoundManager, UIManager, _dec, _class, _crd, ccclass, HomePage;

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "../framework/PopupManager", _context.meta, extras);
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
      assetManager = _cc.assetManager;
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
      PopupManager = _unresolved_2.PopupManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      UIManager = _unresolved_4.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8233bqCptxI1IfYpg/wfSfC", "HomePage", undefined);

      __checkObsolete__(['_decorator', 'assetManager', 'Button', 'Color', 'Component', 'js', 'Label', 'LabelOutline', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'UITransform', 'Vec2']);

      ({
        ccclass
      } = _decorator);

      _export("HomePage", HomePage = (_dec = ccclass('HomePage'), _dec(_class = class HomePage extends Component {
        constructor(...args) {
          super(...args);
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
          var _this$_settingButton, _this$_startGameButto, _this$_rewardButtonSp, _this$_collectButtonS;

          (_this$_settingButton = this._settingButton) == null || (_this$_settingButton = _this$_settingButton.node) == null || _this$_settingButton.off(Button.EventType.CLICK, this._onSetting, this);
          (_this$_startGameButto = this._startGameButton) == null || (_this$_startGameButto = _this$_startGameButto.node) == null || _this$_startGameButto.off(Button.EventType.CLICK, this._onStartGame, this);
          (_this$_rewardButtonSp = this._rewardButtonSprite) == null || (_this$_rewardButtonSp = _this$_rewardButtonSp.node) == null || _this$_rewardButtonSp.off(Button.EventType.CLICK, this._onDesktop, this);
          (_this$_collectButtonS = this._collectButtonSprite) == null || (_this$_collectButtonS = _this$_collectButtonS.node) == null || _this$_collectButtonS.off(Button.EventType.CLICK, this._onSidebar, this);
          ['RankingButton', 'FeedbackButton'].forEach(path => {
            const node = this._findPrefabNode(path);

            node == null || node.off(Button.EventType.CLICK, this._onEntryButtonClick, this);
          });
        }

        onShow(params) {
          console.log('首页显示');
        }

        onHide() {
          console.log('首页隐藏');
        }

        _hideLegacyEmptyNodes() {
          ['background', 'content', 'ske'].forEach(name => {
            const node = this.node.getChildByName(name);
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
            const labelOutline = (_this$_startGameLabel = this._startGameLabel.node.getComponent(LabelOutline)) != null ? _this$_startGameLabel : this._startGameLabel.node.addComponent(LabelOutline);
            labelOutline.color = new Color(144, 88, 19, 255);
            labelOutline.width = 3;
          }
        }

        _bindEvents() {
          var _this$_settingButton2, _this$_settingButton3, _this$_startGameButto4, _this$_startGameButto5, _this$_rewardButtonSp2, _this$_rewardButtonSp3, _this$_collectButtonS2, _this$_collectButtonS3;

          (_this$_settingButton2 = this._settingButton) == null || (_this$_settingButton2 = _this$_settingButton2.node) == null || _this$_settingButton2.off(Button.EventType.CLICK, this._onSetting, this);
          (_this$_settingButton3 = this._settingButton) == null || _this$_settingButton3.node.on(Button.EventType.CLICK, this._onSetting, this);
          (_this$_startGameButto4 = this._startGameButton) == null || (_this$_startGameButto4 = _this$_startGameButto4.node) == null || _this$_startGameButto4.off(Button.EventType.CLICK, this._onStartGame, this);
          (_this$_startGameButto5 = this._startGameButton) == null || _this$_startGameButto5.node.on(Button.EventType.CLICK, this._onStartGame, this);
          (_this$_rewardButtonSp2 = this._rewardButtonSprite) == null || (_this$_rewardButtonSp2 = _this$_rewardButtonSp2.node) == null || _this$_rewardButtonSp2.off(Button.EventType.CLICK, this._onDesktop, this);
          (_this$_rewardButtonSp3 = this._rewardButtonSprite) == null || _this$_rewardButtonSp3.node.on(Button.EventType.CLICK, this._onDesktop, this);
          (_this$_collectButtonS2 = this._collectButtonSprite) == null || (_this$_collectButtonS2 = _this$_collectButtonS2.node) == null || _this$_collectButtonS2.off(Button.EventType.CLICK, this._onSidebar, this);
          (_this$_collectButtonS3 = this._collectButtonSprite) == null || _this$_collectButtonS3.node.on(Button.EventType.CLICK, this._onSidebar, this);
          ['RankingButton', 'FeedbackButton'].forEach(path => {
            const node = this._findPrefabNode(path);

            node == null || node.off(Button.EventType.CLICK, this._onEntryButtonClick, this);
            node == null || node.on(Button.EventType.CLICK, this._onEntryButtonClick, this);
          });
        }

        async _loadImageContent() {
          var _this$_settingButton$, _this$_settingButton4;

          await Promise.all([this._setSpriteFrame(this._backgroundSprite, 'images/home/bg', '[HomePage] 背景图加载失败: images/home/bg', true), this._setSpriteFrame(this._homeDecorSprite, 'images/home/home-bg', '[HomePage] 中部装饰图加载失败: images/home/home-bg'), this._setSpriteFrame((_this$_settingButton$ = (_this$_settingButton4 = this._settingButton) == null ? void 0 : _this$_settingButton4.node.getComponent(Sprite)) != null ? _this$_settingButton$ : null, 'images/home/setting', '[HomePage] 设置按钮图片加载失败: images/home/setting'), this._setSpriteFrame(this._logoSprite, 'images/home/logo', '[HomePage] Logo 图片加载失败: images/home/logo'), this._setSpriteFrame(this._rewardButtonSprite, 'images/home/desktop', '[HomePage] 奖励按钮图片加载失败: images/home/desktop'), this._setSpriteFrame(this._rankingButtonSprite, 'images/home/ranking', '[HomePage] 排行按钮图片加载失败: images/home/ranking'), this._setSpriteFrame(this._feedbackButtonSprite, 'images/home/feedback', '[HomePage] 反馈按钮图片加载失败: images/home/feedback'), this._setSpriteFrame(this._collectButtonSprite, 'images/home/sidebar', '[HomePage] 收藏按钮图片加载失败: images/home/sidebar'), this._setSpriteFrame(this._levelBadgeSprite, 'images/home/level_bg', '[HomePage] 关卡背景图片加载失败: images/home/level_bg'), this._setSpriteFrame(this._startGameButtonSprite, 'images/home/btn_yellow', '[HomePage] 开始游戏按钮背景加载失败: images/home/btn_yellow')]);
        }

        _bindButtonSprite(path) {
          var _button$node$getCompo;

          const button = this._bindButton(path);

          return (_button$node$getCompo = button == null ? void 0 : button.node.getComponent(Sprite)) != null ? _button$node$getCompo : null;
        }

        _bindButton(path) {
          var _node$getComponent;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          const sprite = this._bindSprite(path);

          const button = (_node$getComponent = node.getComponent(Button)) != null ? _node$getComponent : node.addComponent(Button);
          button.interactable = true;
          button.target = node;

          if (sprite) {
            button.transition = Button.Transition.SCALE;
          }

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

        _preparePrefabNode(node) {
          var _node$getComponent4;

          node.layer = this.node.layer;
          (_node$getComponent4 = node.getComponent(UITransform)) != null ? _node$getComponent4 : node.addComponent(UITransform);
        }

        _findPrefabNode(path) {
          const node = path.split('/').reduce((current, name) => {
            var _current$getChildByNa;

            return (_current$getChildByNa = current == null ? void 0 : current.getChildByName(name)) != null ? _current$getChildByNa : null;
          }, this.node);

          if (!node) {
            console.warn(`[HomePage] prefab 缺少节点: ${path}`);
          }

          return node;
        }

        async _setSpriteFrame(sprite, imagePath, failMessage, coverPage = false) {
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

          if (coverPage) {
            const pageTransform = this.node.getComponent(UITransform);
            const backgroundTransform = sprite.node.getComponent(UITransform);

            if (pageTransform && backgroundTransform) {
              this._setCoverSize(backgroundTransform, spriteFrame, pageTransform.contentSize.width, pageTransform.contentSize.height);
            }
          }
        }

        _onStartGame() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().openPage('prefabs/pages/GamePage', {
            level: 1
          });
        }

        _onSetting() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().openPopup('prefabs/popups/SettingPopup', {
            source: 'home'
          });
        }

        _onDesktop() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().openPopup('prefabs/popups/DesktopPopup', {
            source: 'home'
          });
        }

        _onSidebar() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().openPopup('prefabs/popups/SidebarPopup', {
            source: 'home'
          });
        }

        _onEntryButtonClick() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
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
          return this._loadBundleOptional('home', path, type);
        }

        async _loadBundleOptional(bundleName, path, type) {
          return new Promise(resolve => {
            assetManager.loadBundle(bundleName, (bundleError, bundle) => {
              if (bundleError || !bundle) {
                resolve(null);
                return;
              }

              bundle.load(path, type, (assetError, asset) => {
                resolve(assetError || !asset ? null : asset);
              });
            });
          });
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          const originalSize = spriteFrame.originalSize;
          const imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          const imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
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

      js.setClassAlias(HomePage, 'HomePage');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=27f7d2dcaceeafc067989faa637fb436045f6323.js.map
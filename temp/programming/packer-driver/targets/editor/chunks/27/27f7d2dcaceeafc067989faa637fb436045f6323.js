System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Label, LabelOutline, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3, ResManager, SoundManager, UIManager, _dec, _class, _crd, ccclass, HomePage;

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
            console.warn('[HomePage] 背景图加载失败: images/home/bg');
            return;
          }

          backgroundSprite.spriteFrame = spriteFrame;

          this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
        }

        async _loadBackgroundSpriteFrame() {
          return this._loadImageSpriteFrame('images/home/bg');
        }

        async _createSettingButton() {
          var _pageTransform$conten3, _pageTransform$conten4;

          const pageTransform = this.node.getComponent(UITransform);
          const pageWidth = (_pageTransform$conten3 = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten3 : 750;
          const pageHeight = (_pageTransform$conten4 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten4 : 1334;
          const buttonSize = 96;
          const margin = 36;
          const settingNode = new Node('SettingButton');
          settingNode.layer = this.node.layer;
          settingNode.parent = this.node;
          settingNode.setPosition(new Vec3(-pageWidth / 2 + buttonSize / 2 + margin, pageHeight / 2 - buttonSize / 2 - margin, 0));
          const settingTransform = settingNode.addComponent(UITransform);
          settingTransform.setContentSize(buttonSize, buttonSize);
          const settingSprite = settingNode.addComponent(Sprite);
          settingSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const settingButton = settingNode.addComponent(Button);
          settingButton.interactable = true;
          const spriteFrame = await this._loadImageSpriteFrame('images/home/setting');

          if (!spriteFrame || !settingNode.isValid) {
            console.warn('[HomePage] 设置按钮图片加载失败: images/home/setting');
            return;
          }

          settingSprite.spriteFrame = spriteFrame;
        }

        async _createLogoImage() {
          var _pageTransform$conten5;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten5 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten5 : 1334;
          const logoNode = new Node('Logo');
          logoNode.layer = this.node.layer;
          logoNode.parent = this.node;
          logoNode.setPosition(new Vec3(0, pageHeight / 2 - 220, 0));
          const logoTransform = logoNode.addComponent(UITransform);
          logoTransform.setContentSize(240, 200);
          const logoSprite = logoNode.addComponent(Sprite);
          logoSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadImageSpriteFrame('images/home/logo');

          if (!spriteFrame || !logoNode.isValid) {
            console.warn('[HomePage] Logo 图片加载失败: images/home/logo');
            return;
          }

          logoSprite.spriteFrame = spriteFrame;
        }

        _createSideButtons() {
          var _pageTransform$conten6, _pageTransform$conten7;

          const pageTransform = this.node.getComponent(UITransform);
          const pageWidth = (_pageTransform$conten6 = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten6 : 750;
          const pageHeight = (_pageTransform$conten7 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten7 : 1334;
          const buttonSize = 144;
          const sideMargin = 56;
          const horizontalOffset = 66;
          const leftX = -pageWidth / 2 + sideMargin + buttonSize / 2 - horizontalOffset;
          const rightX = pageWidth / 2 - sideMargin - buttonSize / 2 + horizontalOffset;
          const inwardOffset = 16;
          const adjustedLeftX = leftX + inwardOffset;
          const adjustedRightX = rightX - inwardOffset;
          const verticalOffset = 120;
          const topY = -pageHeight * 0.06 + verticalOffset;
          const bottomY = -pageHeight * 0.2 + verticalOffset;

          this._createImageButton('RewardButton', 'images/home/reward', new Vec3(adjustedLeftX, topY, 0), buttonSize, '[HomePage] 奖励按钮图片加载失败: images/home/reward');

          this._createImageButton('RankingButton', 'images/home/ranking', new Vec3(adjustedLeftX, bottomY, 0), buttonSize, '[HomePage] 排行按钮图片加载失败: images/home/ranking');

          this._createImageButton('FeedbackButton', 'images/home/feedback', new Vec3(adjustedRightX, topY, 0), buttonSize, '[HomePage] 反馈按钮图片加载失败: images/home/feedback');

          this._createImageButton('CollectButton', 'images/home/collect', new Vec3(adjustedRightX, bottomY, 0), buttonSize, '[HomePage] 收藏按钮图片加载失败: images/home/collect');
        }

        async _createImageButton(nodeName, imagePath, position, size, failMessage) {
          const buttonNode = new Node(nodeName);
          buttonNode.layer = this.node.layer;
          buttonNode.parent = this.node;
          buttonNode.setPosition(position);
          const buttonTransform = buttonNode.addComponent(UITransform);
          buttonTransform.setContentSize(size, size);
          const buttonSprite = buttonNode.addComponent(Sprite);
          buttonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const button = buttonNode.addComponent(Button);
          button.interactable = true;
          const spriteFrame = await this._loadImageSpriteFrame(imagePath);

          if (!spriteFrame || !buttonNode.isValid) {
            console.warn(failMessage);
            return;
          }

          buttonSprite.spriteFrame = spriteFrame;
        }

        async _createLevelBadge() {
          var _pageTransform$conten8;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten8 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten8 : 1334;
          const badgeWidth = 314;
          const badgeHeight = 114;
          const badgeNode = new Node('LevelBadge');
          badgeNode.layer = this.node.layer;
          badgeNode.parent = this.node;
          badgeNode.setPosition(new Vec3(0, -pageHeight * 0.34, 0));
          const badgeTransform = badgeNode.addComponent(UITransform);
          badgeTransform.setContentSize(badgeWidth, badgeHeight);
          const badgeSprite = badgeNode.addComponent(Sprite);
          badgeSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const levelLabelNode = new Node('LevelLabel');
          levelLabelNode.layer = this.node.layer;
          levelLabelNode.parent = badgeNode;
          levelLabelNode.setPosition(new Vec3(0, 4, 0));
          const levelLabelTransform = levelLabelNode.addComponent(UITransform);
          levelLabelTransform.setContentSize(badgeWidth, badgeHeight);
          const levelLabel = levelLabelNode.addComponent(Label);
          levelLabel.string = '第1关';
          levelLabel.fontSize = 36;
          levelLabel.color = new Color(128, 77, 44, 255);
          levelLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          levelLabel.verticalAlign = Label.VerticalAlign.CENTER;
          levelLabel.overflow = Label.Overflow.CLAMP;
          const spriteFrame = await this._loadImageSpriteFrame('images/home/level_bg');

          if (!spriteFrame || !badgeNode.isValid) {
            console.warn('[HomePage] 关卡背景图片加载失败: images/home/level_bg');
            return;
          }

          badgeSprite.spriteFrame = spriteFrame;
        }

        async _createStartGameButton() {
          var _pageTransform$conten9;

          const pageTransform = this.node.getComponent(UITransform);
          const pageHeight = (_pageTransform$conten9 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten9 : 1334;
          const buttonWidth = 418;
          const buttonHeight = 162;
          const buttonNode = new Node('StartGameButton');
          buttonNode.layer = this.node.layer;
          buttonNode.parent = this.node;
          buttonNode.setPosition(new Vec3(0, -pageHeight * 0.45 + 40, 0));
          const buttonTransform = buttonNode.addComponent(UITransform);
          buttonTransform.setContentSize(buttonWidth, buttonHeight);
          const buttonSprite = buttonNode.addComponent(Sprite);
          buttonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const button = buttonNode.addComponent(Button);
          button.interactable = true;
          buttonNode.on(Button.EventType.CLICK, this._onStartGame, this);
          const labelNode = new Node('Label');
          labelNode.layer = this.node.layer;
          labelNode.parent = buttonNode;
          labelNode.setPosition(new Vec3(0, 4, 0));
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(buttonWidth, buttonHeight);
          const label = labelNode.addComponent(Label);
          label.string = '开始游戏';
          label.fontSize = 42;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          const labelOutline = labelNode.addComponent(LabelOutline);
          labelOutline.color = new Color(144, 88, 19, 255);
          labelOutline.width = 3;
          const spriteFrame = await this._loadImageSpriteFrame('images/home/btn_yellow');

          if (!spriteFrame || !buttonNode.isValid) {
            console.warn('[HomePage] 开始游戏按钮背景加载失败: images/home/btn_yellow');
            return;
          }

          buttonSprite.spriteFrame = spriteFrame;
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

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=27f7d2dcaceeafc067989faa637fb436045f6323.js.map
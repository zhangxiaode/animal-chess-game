System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Node, Graphics, UITransform, Color, Vec3, Sprite, SpriteFrame, resources, UIManager, SoundManager, GameRuleSystem, UserSystem, RankSystem, RankTier, RankPhase, AIOpponentSystem, _dec, _class, _crd, ccclass, MatchPhase, GamePage;

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../framework/UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfGameRuleSystem(extras) {
    _reporterNs.report("GameRuleSystem", "../game/GameRuleSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPosition(extras) {
    _reporterNs.report("Position", "../game/GameRuleSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUserSystem(extras) {
    _reporterNs.report("UserSystem", "../system/UserSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankSystem(extras) {
    _reporterNs.report("RankSystem", "../game/RankSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankTier(extras) {
    _reporterNs.report("RankTier", "../game/RankSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankPhase(extras) {
    _reporterNs.report("RankPhase", "../game/RankSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfAIOpponentSystem(extras) {
    _reporterNs.report("AIOpponentSystem", "../game/AIOpponentSystem", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Button = _cc.Button;
      Label = _cc.Label;
      Node = _cc.Node;
      Graphics = _cc.Graphics;
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      Vec3 = _cc.Vec3;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      resources = _cc.resources;
    }, function (_unresolved_2) {
      UIManager = _unresolved_2.UIManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      GameRuleSystem = _unresolved_4.GameRuleSystem;
    }, function (_unresolved_5) {
      UserSystem = _unresolved_5.UserSystem;
    }, function (_unresolved_6) {
      RankSystem = _unresolved_6.RankSystem;
      RankTier = _unresolved_6.RankTier;
      RankPhase = _unresolved_6.RankPhase;
    }, function (_unresolved_7) {
      AIOpponentSystem = _unresolved_7.AIOpponentSystem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b116Z08uZFSLOZ3edZ6E3o", "GamePage", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label', 'Node', 'Graphics', 'UITransform', 'Color', 'Vec3', 'Sprite', 'SpriteFrame', 'resources', 'EventTouch']);

      ({
        ccclass
      } = _decorator);

      MatchPhase = /*#__PURE__*/function (MatchPhase) {
        MatchPhase[MatchPhase["PLACEMENT"] = 1] = "PLACEMENT";
        MatchPhase[MatchPhase["DISCARD"] = 2] = "DISCARD";
        MatchPhase[MatchPhase["MOVEMENT"] = 3] = "MOVEMENT";
        MatchPhase[MatchPhase["FINISHED"] = 4] = "FINISHED";
        return MatchPhase;
      }(MatchPhase || {});

      _export("GamePage", GamePage = (_dec = ccclass('GamePage'), _dec(_class = class GamePage extends Component {
        constructor() {
          super(...arguments);
          this._boardSize = 4;
          this._cellSize = 60;
          this._currentLevel = 1;
          this._boardState = [];
          this._backBtn = null;
          this._boardRoot = null;
          this._ruleSystem = (_crd && GameRuleSystem === void 0 ? (_reportPossibleCrUseOfGameRuleSystem({
            error: Error()
          }), GameRuleSystem) : GameRuleSystem).getInstance();
          this._userInfoRoot = null;
          this._usernameLabel = null;
          this._rankLabel = null;
          this._starsLabel = null;
          this._avatarSprite = null;
          this._userActionTipLabel = null;
          // 用户操作提示标签
          this._opponentInfoRoot = null;
          this._opponentUsernameLabel = null;
          this._opponentRankLabel = null;
          this._opponentStarsLabel = null;
          this._opponentAvatarSprite = null;
          this._opponentActionTipLabel = null;
          // 对手操作提示标签
          this._opponentInfo = null;
          this._aiSystem = (_crd && AIOpponentSystem === void 0 ? (_reportPossibleCrUseOfAIOpponentSystem({
            error: Error()
          }), AIOpponentSystem) : AIOpponentSystem).getInstance();
          this._currentTurn = 1;
          // 1=玩家(白), 2=AI(黑)
          this._isAiThinking = false;
          this._isGameOver = false;
          this._matchPhase = MatchPhase.PLACEMENT;
          this._lastPlacerType = 1;
          this._selectedMovePiece = null;
          this._discardPopupRoot = null;
          this._discardPopupMessage = null;
          this._capturePopupRoot = null;
          this._capturePopupMessage = null;
          this._pendingCaptureDecision = null;
          this._pendingDiscardPoint = null;
          this._resultPopupRoot = null;
          this._resultPopupTitle = null;
          this._resultPopupMessage = null;
        }

        _getUiScale(pageTransform) {
          var _pageTransform$conten, _this$node$getCompone, _content$width, _content$height;

          var content = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize) != null ? _pageTransform$conten : (_this$node$getCompone = this.node.getComponent(UITransform)) == null ? void 0 : _this$node$getCompone.contentSize;
          var pageWidth = (_content$width = content == null ? void 0 : content.width) != null ? _content$width : 640;
          var pageHeight = (_content$height = content == null ? void 0 : content.height) != null ? _content$height : 960;
          var scale = Math.min(pageWidth / 640, pageHeight / 960);
          return Math.max(1, scale);
        }

        _scaled(value, scale) {
          return Math.round(value * scale);
        }

        start() {
          this._createUI();

          this._initBoardState();

          this._drawGameBoard();

          this._updateUserInfoDisplay();

          this._updateOpponentInfoDisplay();

          this._updateActionTip();

          this._bindBoardInteraction();
        }
        /**
         * 动态创建UI元素
         */


        _createUI() {
          var _pageSize$width, _pageSize$height;

          var pageRoot = this.node;
          var pageTransform = pageRoot.getComponent(UITransform);

          var uiScale = this._getUiScale(pageTransform);

          var backgroundNode = new Node('Background');
          backgroundNode.parent = pageRoot;
          backgroundNode.setPosition(Vec3.ZERO);
          var backgroundTransform = backgroundNode.addComponent(UITransform);

          if (pageTransform) {
            backgroundTransform.setContentSize(pageTransform.contentSize);
          }

          var backgroundGraphics = backgroundNode.addComponent(Graphics);
          backgroundGraphics.fillColor = new Color(238, 238, 238, 255);
          var backgroundSize = backgroundTransform.contentSize;
          backgroundGraphics.rect(-backgroundSize.width / 2, -backgroundSize.height / 2, backgroundSize.width, backgroundSize.height);
          backgroundGraphics.fill(); // 创建棋盘根节点

          this._boardRoot = new Node('GameBoard');
          this._boardRoot.parent = pageRoot;

          this._boardRoot.setPosition(0, 20, 0);

          this._createUserInfoPanel(pageRoot);

          this._createOpponentInfoPanel(pageRoot);

          this._createActionTipLabels(pageRoot);

          this._createDiscardPopup(pageRoot);

          this._createCapturePopup(pageRoot);

          this._createResultPopup(pageRoot);

          var backBtnNode = new Node('BackBtn');
          backBtnNode.parent = pageRoot;
          var pageSize = pageTransform == null ? void 0 : pageTransform.contentSize;
          var pageWidth = (_pageSize$width = pageSize == null ? void 0 : pageSize.width) != null ? _pageSize$width : 640;
          var pageHeight = (_pageSize$height = pageSize == null ? void 0 : pageSize.height) != null ? _pageSize$height : 960;

          var backBtnHalfWidth = this._scaled(90, uiScale);

          var backBtnHalfHeight = this._scaled(31, uiScale);

          var safeMargin = this._scaled(20, uiScale);

          backBtnNode.setPosition(-pageWidth / 2 + backBtnHalfWidth + safeMargin, pageHeight / 2 - backBtnHalfHeight - safeMargin, 0);
          var backBtnTransform = backBtnNode.addComponent(UITransform);
          backBtnTransform.setContentSize(backBtnHalfWidth * 2, backBtnHalfHeight * 2);
          var backGraphics = backBtnNode.addComponent(Graphics);
          backGraphics.fillColor = new Color(115, 165, 220, 255);
          backGraphics.roundRect(-backBtnHalfWidth, -backBtnHalfHeight, backBtnHalfWidth * 2, backBtnHalfHeight * 2, this._scaled(16, uiScale));
          backGraphics.fill();
          backGraphics.strokeColor = new Color(70, 120, 180, 255);
          backGraphics.lineWidth = 2;
          backGraphics.roundRect(-backBtnHalfWidth, -backBtnHalfHeight, backBtnHalfWidth * 2, backBtnHalfHeight * 2, this._scaled(16, uiScale));
          backGraphics.stroke();
          this._backBtn = backBtnNode.addComponent(Button);
          this._backBtn.interactable = true;
          var backLabelNode = new Node('Label');
          backLabelNode.parent = backBtnNode;
          backLabelNode.addComponent(UITransform);
          var backBtnLabel = backLabelNode.addComponent(Label);
          backBtnLabel.string = '返回';
          backBtnLabel.fontSize = this._scaled(28, uiScale);
          backBtnLabel.color = new Color(255, 255, 255, 255);

          if (this._backBtn) {
            this._backBtn.node.on(Button.EventType.CLICK, this._onBack, this);
          }
        }
        /**
         * 创建弃子确认弹框
         */


        _createDiscardPopup(parent) {
          var _pageSize$width2, _pageSize$height2;

          var pageTransform = parent.getComponent(UITransform);
          var pageSize = pageTransform == null ? void 0 : pageTransform.contentSize;
          var pageWidth = (_pageSize$width2 = pageSize == null ? void 0 : pageSize.width) != null ? _pageSize$width2 : 640;
          var pageHeight = (_pageSize$height2 = pageSize == null ? void 0 : pageSize.height) != null ? _pageSize$height2 : 960;

          var uiScale = this._getUiScale(pageTransform);

          this._discardPopupRoot = new Node('DiscardPopup');
          this._discardPopupRoot.parent = parent;
          this._discardPopupRoot.active = false;

          this._discardPopupRoot.setPosition(Vec3.ZERO);

          var maskTransform = this._discardPopupRoot.addComponent(UITransform);

          maskTransform.setContentSize(pageWidth, pageHeight);

          var maskGraphics = this._discardPopupRoot.addComponent(Graphics);

          maskGraphics.fillColor = new Color(0, 0, 0, 120);
          maskGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
          maskGraphics.fill();
          var dialogNode = new Node('Dialog');
          dialogNode.parent = this._discardPopupRoot;
          dialogNode.setPosition(new Vec3(0, 0, 0));
          var dialogTransform = dialogNode.addComponent(UITransform);

          var dialogWidth = this._scaled(420, uiScale);

          var dialogHeight = this._scaled(220, uiScale);

          dialogTransform.setContentSize(dialogWidth, dialogHeight);
          var dialogGraphics = dialogNode.addComponent(Graphics);
          dialogGraphics.fillColor = new Color(245, 245, 245, 255);
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(18, uiScale));
          dialogGraphics.fill();
          dialogGraphics.strokeColor = new Color(120, 150, 190, 255);
          dialogGraphics.lineWidth = 2;
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(18, uiScale));
          dialogGraphics.stroke();
          var messageNode = new Node('Message');
          messageNode.parent = dialogNode;
          messageNode.setPosition(new Vec3(0, this._scaled(40, uiScale), 0));
          var messageTransform = messageNode.addComponent(UITransform);
          messageTransform.setContentSize(this._scaled(320, uiScale), this._scaled(70, uiScale));
          this._discardPopupMessage = messageNode.addComponent(Label);
          this._discardPopupMessage.string = '确定要弃掉这颗棋子吗？';
          this._discardPopupMessage.fontSize = this._scaled(28, uiScale);
          this._discardPopupMessage.color = new Color(60, 60, 60, 255);
          this._discardPopupMessage.horizontalAlign = Label.HorizontalAlign.CENTER;

          var confirmBtn = this._createPopupButton(dialogNode, 'ConfirmDiscardBtn', '确定', new Vec3(this._scaled(-90, uiScale), this._scaled(-45, uiScale), 0));

          confirmBtn.node.on(Button.EventType.CLICK, this._confirmPlayerDiscard, this);

          var cancelBtn = this._createPopupButton(dialogNode, 'CancelDiscardBtn', '取消', new Vec3(this._scaled(90, uiScale), this._scaled(-45, uiScale), 0));

          cancelBtn.node.on(Button.EventType.CLICK, this._cancelPlayerDiscard, this);
        }
        /**
         * 创建吃子确认弹框
         */


        _createCapturePopup(parent) {
          var _pageSize$width3, _pageSize$height3;

          var pageTransform = parent.getComponent(UITransform);
          var pageSize = pageTransform == null ? void 0 : pageTransform.contentSize;
          var pageWidth = (_pageSize$width3 = pageSize == null ? void 0 : pageSize.width) != null ? _pageSize$width3 : 640;
          var pageHeight = (_pageSize$height3 = pageSize == null ? void 0 : pageSize.height) != null ? _pageSize$height3 : 960;

          var uiScale = this._getUiScale(pageTransform);

          this._capturePopupRoot = new Node('CapturePopup');
          this._capturePopupRoot.parent = parent;
          this._capturePopupRoot.active = false;

          this._capturePopupRoot.setPosition(Vec3.ZERO);

          var maskTransform = this._capturePopupRoot.addComponent(UITransform);

          maskTransform.setContentSize(pageWidth, pageHeight);

          var maskGraphics = this._capturePopupRoot.addComponent(Graphics);

          maskGraphics.fillColor = new Color(0, 0, 0, 120);
          maskGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
          maskGraphics.fill();
          var dialogNode = new Node('Dialog');
          dialogNode.parent = this._capturePopupRoot;
          dialogNode.setPosition(new Vec3(0, 0, 0));
          var dialogTransform = dialogNode.addComponent(UITransform);

          var dialogWidth = this._scaled(500, uiScale);

          var dialogHeight = this._scaled(240, uiScale);

          dialogTransform.setContentSize(dialogWidth, dialogHeight);
          var dialogGraphics = dialogNode.addComponent(Graphics);
          dialogGraphics.fillColor = new Color(245, 245, 245, 255);
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(18, uiScale));
          dialogGraphics.fill();
          dialogGraphics.strokeColor = new Color(120, 150, 190, 255);
          dialogGraphics.lineWidth = 2;
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(18, uiScale));
          dialogGraphics.stroke();
          var messageNode = new Node('Message');
          messageNode.parent = dialogNode;
          messageNode.setPosition(new Vec3(0, this._scaled(42, uiScale), 0));
          var messageTransform = messageNode.addComponent(UITransform);
          messageTransform.setContentSize(this._scaled(420, uiScale), this._scaled(78, uiScale));
          this._capturePopupMessage = messageNode.addComponent(Label);
          this._capturePopupMessage.string = '可吃掉对方 1 颗棋子，是否吃子？';
          this._capturePopupMessage.fontSize = this._scaled(28, uiScale);
          this._capturePopupMessage.color = new Color(60, 60, 60, 255);
          this._capturePopupMessage.horizontalAlign = Label.HorizontalAlign.CENTER;

          var confirmBtn = this._createPopupButton(dialogNode, 'ConfirmCaptureBtn', '确定', new Vec3(this._scaled(-90, uiScale), this._scaled(-50, uiScale), 0));

          confirmBtn.node.on(Button.EventType.CLICK, this._confirmPlayerCapture, this);

          var cancelBtn = this._createPopupButton(dialogNode, 'CancelCaptureBtn', '取消', new Vec3(this._scaled(90, uiScale), this._scaled(-50, uiScale), 0));

          cancelBtn.node.on(Button.EventType.CLICK, this._cancelPlayerCapture, this);
        }

        _createPopupButton(parent, nodeName, text, position) {
          var uiScale = this._getUiScale(this.node.getComponent(UITransform));

          var buttonNode = new Node(nodeName);
          buttonNode.parent = parent;
          buttonNode.setPosition(position);
          var buttonTransform = buttonNode.addComponent(UITransform);

          var buttonWidth = this._scaled(140, uiScale);

          var buttonHeight = this._scaled(60, uiScale);

          buttonTransform.setContentSize(buttonWidth, buttonHeight);
          var graphics = buttonNode.addComponent(Graphics);
          graphics.fillColor = new Color(100, 150, 200, 255);
          graphics.roundRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, this._scaled(14, uiScale));
          graphics.fill();
          graphics.strokeColor = new Color(50, 100, 150, 255);
          graphics.lineWidth = 2;
          graphics.roundRect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight, this._scaled(14, uiScale));
          graphics.stroke();
          var button = buttonNode.addComponent(Button);
          var labelNode = new Node('Label');
          labelNode.parent = buttonNode;
          labelNode.addComponent(UITransform);
          var label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = this._scaled(24, uiScale);
          label.color = new Color(255, 255, 255, 255);
          return button;
        }

        _createResultPopup(parent) {
          var _pageSize$width4, _pageSize$height4;

          var pageTransform = parent.getComponent(UITransform);
          var pageSize = pageTransform == null ? void 0 : pageTransform.contentSize;
          var pageWidth = (_pageSize$width4 = pageSize == null ? void 0 : pageSize.width) != null ? _pageSize$width4 : 640;
          var pageHeight = (_pageSize$height4 = pageSize == null ? void 0 : pageSize.height) != null ? _pageSize$height4 : 960;

          var uiScale = this._getUiScale(pageTransform);

          this._resultPopupRoot = new Node('ResultPopup');
          this._resultPopupRoot.parent = parent;
          this._resultPopupRoot.active = false;

          this._resultPopupRoot.setPosition(Vec3.ZERO);

          var maskTransform = this._resultPopupRoot.addComponent(UITransform);

          maskTransform.setContentSize(pageWidth, pageHeight);

          var maskGraphics = this._resultPopupRoot.addComponent(Graphics);

          maskGraphics.fillColor = new Color(0, 0, 0, 140);
          maskGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
          maskGraphics.fill();
          var dialogNode = new Node('Dialog');
          dialogNode.parent = this._resultPopupRoot;
          dialogNode.setPosition(Vec3.ZERO);
          var dialogTransform = dialogNode.addComponent(UITransform);

          var dialogWidth = this._scaled(440, uiScale);

          var dialogHeight = this._scaled(260, uiScale);

          dialogTransform.setContentSize(dialogWidth, dialogHeight);
          var dialogGraphics = dialogNode.addComponent(Graphics);
          dialogGraphics.fillColor = new Color(245, 245, 245, 255);
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(20, uiScale));
          dialogGraphics.fill();
          dialogGraphics.strokeColor = new Color(120, 150, 190, 255);
          dialogGraphics.lineWidth = 2;
          dialogGraphics.roundRect(-dialogWidth / 2, -dialogHeight / 2, dialogWidth, dialogHeight, this._scaled(20, uiScale));
          dialogGraphics.stroke();
          var titleNode = new Node('Title');
          titleNode.parent = dialogNode;
          titleNode.setPosition(new Vec3(0, this._scaled(55, uiScale), 0));
          var titleTransform = titleNode.addComponent(UITransform);
          titleTransform.setContentSize(this._scaled(320, uiScale), this._scaled(52, uiScale));
          this._resultPopupTitle = titleNode.addComponent(Label);
          this._resultPopupTitle.string = '胜利';
          this._resultPopupTitle.fontSize = this._scaled(36, uiScale);
          this._resultPopupTitle.color = new Color(70, 120, 180, 255);
          this._resultPopupTitle.horizontalAlign = Label.HorizontalAlign.CENTER;
          var messageNode = new Node('Message');
          messageNode.parent = dialogNode;
          messageNode.setPosition(new Vec3(0, this._scaled(-5, uiScale), 0));
          var messageTransform = messageNode.addComponent(UITransform);
          messageTransform.setContentSize(this._scaled(340, uiScale), this._scaled(70, uiScale));
          this._resultPopupMessage = messageNode.addComponent(Label);
          this._resultPopupMessage.string = '恭喜赢得胜利';
          this._resultPopupMessage.fontSize = this._scaled(28, uiScale);
          this._resultPopupMessage.color = new Color(60, 60, 60, 255);
          this._resultPopupMessage.horizontalAlign = Label.HorizontalAlign.CENTER;

          var closeBtn = this._createPopupButton(dialogNode, 'CloseResultBtn', '确定', new Vec3(0, this._scaled(-70, uiScale), 0));

          closeBtn.node.on(Button.EventType.CLICK, this._closeResultPopup, this);
        }
        /**
         * 绑定棋盘触摸事件
         */


        _bindBoardInteraction() {
          if (!this._boardRoot) return;

          this._boardRoot.off(Node.EventType.TOUCH_END, this._onBoardTouch, this);

          this._boardRoot.on(Node.EventType.TOUCH_END, this._onBoardTouch, this);
        }
        /**
         * 创建棋盘下方用户信息区域
         */


        _createUserInfoPanel(parent) {
          var userSystem = (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance();
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance();

          var uiScale = this._getUiScale(parent.getComponent(UITransform));

          this._userInfoRoot = new Node('GameUserInfoPanel');
          this._userInfoRoot.parent = parent;

          this._userInfoRoot.setPosition(new Vec3(0, -300, 0));

          var panelWidth = this._scaled(560, uiScale);

          var panelHeight = this._scaled(120, uiScale);

          var panelHalfWidth = panelWidth / 2;
          var panelHalfHeight = panelHeight / 2;

          var panelTransform = this._userInfoRoot.addComponent(UITransform);

          panelTransform.setContentSize(panelWidth, panelHeight);

          var panelGraphics = this._userInfoRoot.addComponent(Graphics);

          panelGraphics.fillColor = new Color(70, 120, 180, 190);
          panelGraphics.roundRect(-panelHalfWidth, -panelHalfHeight, panelWidth, panelHeight, 14);
          panelGraphics.fill();
          panelGraphics.strokeColor = new Color(40, 80, 140, 255);
          panelGraphics.lineWidth = 2;
          panelGraphics.roundRect(-panelHalfWidth, -panelHalfHeight, panelWidth, panelHeight, 14);
          panelGraphics.stroke();
          var avatarNode = new Node('Avatar');
          avatarNode.parent = this._userInfoRoot;
          avatarNode.setPosition(new Vec3(this._scaled(-225, uiScale), 0, 0));
          var avatarTransform = avatarNode.addComponent(UITransform);
          var avatarSize = panelHeight * 0.5;
          avatarTransform.setContentSize(avatarSize, avatarSize);
          this._avatarSprite = avatarNode.addComponent(Sprite);
          this._avatarSprite.sizeMode = Sprite.SizeMode.CUSTOM;

          this._loadDefaultAvatar(this._avatarSprite);

          var usernameNode = new Node('UsernameLabel');
          usernameNode.parent = this._userInfoRoot;
          usernameNode.setPosition(new Vec3(this._scaled(-35, uiScale), this._scaled(20, uiScale), 0));
          var usernameTransform = usernameNode.addComponent(UITransform);
          usernameTransform.setContentSize(this._scaled(240, uiScale), this._scaled(36, uiScale));
          this._usernameLabel = usernameNode.addComponent(Label);
          this._usernameLabel.string = userSystem.getUsername();
          this._usernameLabel.fontSize = this._scaled(24, uiScale);
          this._usernameLabel.color = new Color(255, 255, 255, 255);
          this._usernameLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          this._usernameLabel.overflow = Label.Overflow.CLAMP;
          var rankNode = new Node('RankLabel');
          rankNode.parent = this._userInfoRoot;
          rankNode.setPosition(new Vec3(this._scaled(-5, uiScale), this._scaled(-20, uiScale), 0));
          var rankTransform = rankNode.addComponent(UITransform);
          rankTransform.setContentSize(this._scaled(300, uiScale), this._scaled(36, uiScale));
          this._rankLabel = rankNode.addComponent(Label);
          this._rankLabel.string = rankSystem.getCurrentRankDisplayName();
          this._rankLabel.fontSize = this._scaled(24, uiScale);
          this._rankLabel.color = new Color(255, 228, 181, 255);
          this._rankLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          this._rankLabel.overflow = Label.Overflow.CLAMP;
          var starsNode = new Node('StarsLabel');
          starsNode.parent = this._userInfoRoot;

          var starsRightPadding = this._scaled(24, uiScale);

          starsNode.setPosition(new Vec3(panelHalfWidth - starsRightPadding - this._scaled(60, uiScale), 0, 0));
          var starsTransform = starsNode.addComponent(UITransform);
          starsTransform.setContentSize(this._scaled(120, uiScale), this._scaled(40, uiScale));
          this._starsLabel = starsNode.addComponent(Label);
          this._starsLabel.string = "\u2B50 " + userSystem.getStars();
          this._starsLabel.fontSize = this._scaled(28, uiScale);
          this._starsLabel.color = new Color(255, 255, 100, 255);
          this._starsLabel.horizontalAlign = Label.HorizontalAlign.RIGHT;
          this._starsLabel.overflow = Label.Overflow.CLAMP;
        }
        /**
         * 创建棋盘上方对手信息区域
         */


        _createOpponentInfoPanel(parent) {
          var uiScale = this._getUiScale(parent.getComponent(UITransform));

          this._opponentInfoRoot = new Node('OpponentInfoPanel');
          this._opponentInfoRoot.parent = parent;

          this._opponentInfoRoot.setPosition(new Vec3(0, 300, 0));

          var panelWidth = this._scaled(560, uiScale);

          var panelHeight = this._scaled(120, uiScale);

          var panelHalfWidth = panelWidth / 2;
          var panelHalfHeight = panelHeight / 2;

          var panelTransform = this._opponentInfoRoot.addComponent(UITransform);

          panelTransform.setContentSize(panelWidth, panelHeight);

          var panelGraphics = this._opponentInfoRoot.addComponent(Graphics);

          panelGraphics.fillColor = new Color(70, 120, 180, 190);
          panelGraphics.roundRect(-panelHalfWidth, -panelHalfHeight, panelWidth, panelHeight, 14);
          panelGraphics.fill();
          panelGraphics.strokeColor = new Color(40, 80, 140, 255);
          panelGraphics.lineWidth = 2;
          panelGraphics.roundRect(-panelHalfWidth, -panelHalfHeight, panelWidth, panelHeight, 14);
          panelGraphics.stroke();
          var avatarNode = new Node('OpponentAvatar');
          avatarNode.parent = this._opponentInfoRoot;
          avatarNode.setPosition(new Vec3(this._scaled(-225, uiScale), 0, 0));
          var avatarTransform = avatarNode.addComponent(UITransform);
          var avatarSize = panelHeight * 0.5;
          avatarTransform.setContentSize(avatarSize, avatarSize);
          this._opponentAvatarSprite = avatarNode.addComponent(Sprite);
          this._opponentAvatarSprite.sizeMode = Sprite.SizeMode.CUSTOM;

          this._loadDefaultAvatar(this._opponentAvatarSprite);

          var usernameNode = new Node('OpponentUsernameLabel');
          usernameNode.parent = this._opponentInfoRoot;
          usernameNode.setPosition(new Vec3(this._scaled(-35, uiScale), this._scaled(20, uiScale), 0));
          var usernameTransform = usernameNode.addComponent(UITransform);
          usernameTransform.setContentSize(this._scaled(240, uiScale), this._scaled(36, uiScale));
          this._opponentUsernameLabel = usernameNode.addComponent(Label);
          this._opponentUsernameLabel.string = '对手';
          this._opponentUsernameLabel.fontSize = this._scaled(24, uiScale);
          this._opponentUsernameLabel.color = new Color(255, 255, 255, 255);
          this._opponentUsernameLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          this._opponentUsernameLabel.overflow = Label.Overflow.CLAMP;
          var rankNode = new Node('OpponentRankLabel');
          rankNode.parent = this._opponentInfoRoot;
          rankNode.setPosition(new Vec3(this._scaled(-5, uiScale), this._scaled(-20, uiScale), 0));
          var rankTransform = rankNode.addComponent(UITransform);
          rankTransform.setContentSize(this._scaled(300, uiScale), this._scaled(36, uiScale));
          this._opponentRankLabel = rankNode.addComponent(Label);
          this._opponentRankLabel.string = '倔强青铜 初期';
          this._opponentRankLabel.fontSize = this._scaled(24, uiScale);
          this._opponentRankLabel.color = new Color(255, 228, 181, 255);
          this._opponentRankLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
          this._opponentRankLabel.overflow = Label.Overflow.CLAMP;
          var starsNode = new Node('OpponentStarsLabel');
          starsNode.parent = this._opponentInfoRoot;

          var starsRightPadding = this._scaled(24, uiScale);

          starsNode.setPosition(new Vec3(panelHalfWidth - starsRightPadding - this._scaled(60, uiScale), 0, 0));
          var starsTransform = starsNode.addComponent(UITransform);
          starsTransform.setContentSize(this._scaled(120, uiScale), this._scaled(40, uiScale));
          this._opponentStarsLabel = starsNode.addComponent(Label);
          this._opponentStarsLabel.string = '⭐ 0';
          this._opponentStarsLabel.fontSize = this._scaled(28, uiScale);
          this._opponentStarsLabel.color = new Color(255, 255, 100, 255);
          this._opponentStarsLabel.horizontalAlign = Label.HorizontalAlign.RIGHT;
          this._opponentStarsLabel.overflow = Label.Overflow.CLAMP;
        }
        /**
         * 创建操作提示标签（在用户信息下方和对手信息上方）
         */


        _createActionTipLabels(parent) {
          var uiScale = this._getUiScale(parent.getComponent(UITransform)); // 用户操作提示（在用户信息下方）


          var userTipNode = new Node('UserActionTip');
          userTipNode.parent = parent;
          userTipNode.setPosition(new Vec3(0, this._scaled(-240, uiScale), 0));
          var userTipTransform = userTipNode.addComponent(UITransform);
          userTipTransform.setContentSize(this._scaled(440, uiScale), this._scaled(40, uiScale));
          this._userActionTipLabel = userTipNode.addComponent(Label);
          this._userActionTipLabel.string = '轮到你下子';
          this._userActionTipLabel.fontSize = this._scaled(22, uiScale);
          this._userActionTipLabel.color = new Color(100, 100, 100, 255);
          this._userActionTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._userActionTipLabel.overflow = Label.Overflow.CLAMP; // 对手操作提示（在对手信息上方）

          var opponentTipNode = new Node('OpponentActionTip');
          opponentTipNode.parent = parent;
          opponentTipNode.setPosition(new Vec3(0, this._scaled(240, uiScale), 0));
          var opponentTipTransform = opponentTipNode.addComponent(UITransform);
          opponentTipTransform.setContentSize(this._scaled(440, uiScale), this._scaled(40, uiScale));
          this._opponentActionTipLabel = opponentTipNode.addComponent(Label);
          this._opponentActionTipLabel.string = '';
          this._opponentActionTipLabel.fontSize = this._scaled(22, uiScale);
          this._opponentActionTipLabel.color = new Color(100, 100, 100, 255);
          this._opponentActionTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._opponentActionTipLabel.overflow = Label.Overflow.CLAMP;
        }
        /**
         * 更新操作提示
         */


        _updateActionTip() {
          var userTip = '';
          var opponentTip = '';

          if (this._currentTurn === 1) {
            // 轮到玩家
            if (this._matchPhase === MatchPhase.PLACEMENT) {
              userTip = '轮到你下子';
            } else if (this._matchPhase === MatchPhase.DISCARD) {
              userTip = '轮到你弃子';
            } else if (this._matchPhase === MatchPhase.MOVEMENT) {
              userTip = '轮到你走子';
            }

            opponentTip = '';
          } else {
            // 轮到AI
            userTip = '';

            if (this._matchPhase === MatchPhase.PLACEMENT) {
              opponentTip = '对手在下子...';
            } else if (this._matchPhase === MatchPhase.DISCARD) {
              opponentTip = '对手在弃子...';
            } else if (this._matchPhase === MatchPhase.MOVEMENT) {
              opponentTip = '对手在走子...';
            }
          }

          if (this._userActionTipLabel) {
            this._userActionTipLabel.string = userTip;
          }

          if (this._opponentActionTipLabel) {
            this._opponentActionTipLabel.string = opponentTip;
          }
        }

        _generateRandomOpponentInfo() {
          var _requirement$starsNee;

          var adjectives = ['神秘', '勇敢', '聪慧', '俊美', '高尚', '优雅', '威武', '睿智', '灿烂', '非凡', '杰出', '伟大'];
          var nouns = ['剑客', '骑士', '术士', '猎手', '盗贼', '圣骑', '法师', '射手', '战士', '智者', '诗人', '骑兵'];
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance();
          var userSystem = (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance();
          var myRank = rankSystem.getCurrentRank();
          var myStars = userSystem.getStars();
          var canPromoteOneStep = !(myRank.tier === (_crd && RankTier === void 0 ? (_reportPossibleCrUseOfRankTier({
            error: Error()
          }), RankTier) : RankTier).KING && myRank.phase === (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
            error: Error()
          }), RankPhase) : RankPhase).LATE);
          var useNextStep = canPromoteOneStep && Math.random() < 0.5;
          var opponentTier = myRank.tier;
          var opponentPhase = myRank.phase;

          if (useNextStep) {
            if (myRank.phase < (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
              error: Error()
            }), RankPhase) : RankPhase).LATE) {
              opponentPhase = myRank.phase + 1;
            } else if (myRank.tier < (_crd && RankTier === void 0 ? (_reportPossibleCrUseOfRankTier({
              error: Error()
            }), RankTier) : RankTier).KING) {
              opponentTier = myRank.tier + 1;
              opponentPhase = (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
                error: Error()
              }), RankPhase) : RankPhase).EARLY;
            }
          }

          var path = rankSystem.getAllRankPath();
          var requirement = path.find(item => item.tier === opponentTier && item.phase === opponentPhase);
          var maxStars = Math.max(1, (_requirement$starsNee = requirement == null ? void 0 : requirement.starsNeeded) != null ? _requirement$starsNee : 10);
          var opponentStars = Math.floor(Math.random() * maxStars);

          if (maxStars > 1 && opponentStars === myStars) {
            opponentStars = (opponentStars + 1) % maxStars;
          }

          var adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
          var noun = nouns[Math.floor(Math.random() * nouns.length)];
          var randomBase = Math.floor(Math.random() * 10000).toString();
          var randomNum = ('0000' + randomBase).slice(-4);
          return {
            username: "" + adjective + noun + randomNum,
            tier: opponentTier,
            phase: opponentPhase,
            stars: opponentStars
          };
        }
        /**
         * 更新对手信息展示
         */


        _updateOpponentInfoDisplay() {
          this._opponentInfo = this._generateRandomOpponentInfo();
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance();

          if (this._opponentUsernameLabel) {
            this._opponentUsernameLabel.string = this._opponentInfo.username;
          }

          if (this._opponentRankLabel) {
            this._opponentRankLabel.string = rankSystem.getRankDisplayName(this._opponentInfo.tier, this._opponentInfo.phase);
          }

          if (this._opponentStarsLabel) {
            this._opponentStarsLabel.string = "\u2B50 " + this._opponentInfo.stars;
          }
        }
        /**
         * 加载默认头像
         */


        _loadDefaultAvatar(sprite) {
          resources.load('images/photo-default/spriteFrame', SpriteFrame, (err, sf) => {
            if (!err && sf) {
              sprite.spriteFrame = sf;
              return;
            }

            resources.load('images/photo-default', SpriteFrame, (fallbackErr, fallbackSf) => {
              if (!fallbackErr && fallbackSf) {
                sprite.spriteFrame = fallbackSf;
              }
            });
          });
        }
        /**
         * 更新用户信息展示
         */


        _updateUserInfoDisplay() {
          var userSystem = (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance();
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance();

          if (this._usernameLabel) {
            this._usernameLabel.string = userSystem.getUsername();
          }

          if (this._rankLabel) {
            this._rankLabel.string = rankSystem.getCurrentRankDisplayName();
          }

          if (this._starsLabel) {
            this._starsLabel.string = "\u2B50 " + userSystem.getStars();
          }
        }
        /**
         * 页面显示时调用（由UIManager触发）
         */


        onShow(params) {
          console.log('游戏页面显示，参数：', params); // 获取关卡信息

          if (params && params.level) {
            this._currentLevel = params.level;
          } // 更新用户信息


          this._updateUserInfoDisplay();

          this._updateOpponentInfoDisplay(); // 播放音效


          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
        }
        /**
         * 绘制游戏棋盘（木色底板 + 网格线 + 交叉点）
         */


        _drawGameBoard() {
          var _pageTransform$conten2, _this$_boardRoot$getC, _this$_boardRoot$posi, _this$_boardRoot, _this$_userInfoRoot$g, _this$_userInfoRoot, _this$_opponentInfoRo, _this$_opponentInfoRo2, _this$_boardRoot$getC2;

          var pageTransform = this.node.getComponent(UITransform);

          var uiScale = this._getUiScale(pageTransform);

          var pageWidth = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten2 : 640;
          var boardPixelSize = pageWidth * 0.85;
          var boardSpan = boardPixelSize;
          this._cellSize = boardSpan / (this._boardSize - 1);

          if (!this._boardRoot) {
            this._boardRoot = new Node('GameBoard');
            this._boardRoot.layer = this.node.layer;
            this._boardRoot.parent = this.node;

            this._boardRoot.setPosition(new Vec3(0, 20, 0));
          }

          var boardTransform = (_this$_boardRoot$getC = this._boardRoot.getComponent(UITransform)) != null ? _this$_boardRoot$getC : this._boardRoot.addComponent(UITransform);
          boardTransform.setContentSize(boardPixelSize, boardPixelSize);

          if (this._backBtn) {
            var _pageTransform$conten3;

            var pageHeight = (_pageTransform$conten3 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten3 : 960;

            var backBtnHalfWidth = this._scaled(90, uiScale);

            var backBtnHalfHeight = this._scaled(31, uiScale);

            var safeMargin = this._scaled(20, uiScale);

            this._backBtn.node.setPosition(-pageWidth / 2 + backBtnHalfWidth + safeMargin, pageHeight / 2 - backBtnHalfHeight - safeMargin, 0);
          }

          var boardCenterY = (_this$_boardRoot$posi = (_this$_boardRoot = this._boardRoot) == null ? void 0 : _this$_boardRoot.position.y) != null ? _this$_boardRoot$posi : 20;

          var infoMargin = this._scaled(24, uiScale);

          var userPanelHalfHeight = ((_this$_userInfoRoot$g = (_this$_userInfoRoot = this._userInfoRoot) == null || (_this$_userInfoRoot = _this$_userInfoRoot.getComponent(UITransform)) == null ? void 0 : _this$_userInfoRoot.contentSize.height) != null ? _this$_userInfoRoot$g : this._scaled(120, uiScale)) / 2;
          var opponentPanelHalfHeight = ((_this$_opponentInfoRo = (_this$_opponentInfoRo2 = this._opponentInfoRoot) == null || (_this$_opponentInfoRo2 = _this$_opponentInfoRo2.getComponent(UITransform)) == null ? void 0 : _this$_opponentInfoRo2.contentSize.height) != null ? _this$_opponentInfoRo : this._scaled(120, uiScale)) / 2;

          if (this._userInfoRoot) {
            this._userInfoRoot.setPosition(new Vec3(0, boardCenterY - boardPixelSize / 2 - infoMargin - userPanelHalfHeight, 0));
          }

          if (this._opponentInfoRoot) {
            this._opponentInfoRoot.setPosition(new Vec3(0, boardCenterY + boardPixelSize / 2 + infoMargin + opponentPanelHalfHeight, 0));
          } // 提示文本跟随信息面板，避免漂移到棋盘区域


          if (this._userActionTipLabel && this._userInfoRoot) {
            this._userActionTipLabel.node.setPosition(new Vec3(0, this._userInfoRoot.position.y - this._scaled(86, uiScale), 0));
          }

          if (this._opponentActionTipLabel && this._opponentInfoRoot) {
            this._opponentActionTipLabel.node.setPosition(new Vec3(0, this._opponentInfoRoot.position.y + this._scaled(86, uiScale), 0));
          }

          var graphics = (_this$_boardRoot$getC2 = this._boardRoot.getComponent(Graphics)) != null ? _this$_boardRoot$getC2 : this._boardRoot.addComponent(Graphics);
          graphics.clear();
          graphics.fillColor = new Color(211, 164, 99, 255);
          graphics.rect(-boardPixelSize / 2, -boardPixelSize / 2, boardPixelSize, boardPixelSize);
          graphics.fill();
          graphics.strokeColor = new Color(124, 88, 46, 255);
          graphics.lineWidth = 2;
          graphics.rect(-boardPixelSize / 2, -boardPixelSize / 2, boardPixelSize, boardPixelSize);
          graphics.stroke();
          graphics.strokeColor = new Color(118, 82, 38, 255);
          graphics.lineWidth = 2.5;

          for (var index = 0; index < this._boardSize; index++) {
            var offset = -boardSpan / 2 + index * this._cellSize;
            graphics.moveTo(offset, boardSpan / 2);
            graphics.lineTo(offset, -boardSpan / 2);
            graphics.moveTo(-boardSpan / 2, offset);
            graphics.lineTo(boardSpan / 2, offset);
          }

          graphics.stroke();
          graphics.fillColor = new Color(0, 0, 0, 255);

          for (var row = 0; row < this._boardSize; row++) {
            for (var col = 0; col < this._boardSize; col++) {
              var x = -boardSpan / 2 + col * this._cellSize;
              var y = boardSpan / 2 - row * this._cellSize;
              graphics.circle(x, y, 8.5);
              graphics.fill();
            }
          } // 按当前棋盘状态绘制棋子


          var pieceRadius = this._cellSize * 0.2;

          for (var _row = 0; _row < this._boardSize; _row++) {
            for (var _col = 0; _col < this._boardSize; _col++) {
              var pieceType = this._boardState[_row][_col];
              if (pieceType === 0) continue;

              var _x = -boardSpan / 2 + _col * this._cellSize;

              var _y = boardSpan / 2 - _row * this._cellSize;

              this._drawStone(graphics, _x, _y, pieceRadius, pieceType === 1);

              var isSelectedMovePiece = !!this._selectedMovePiece && this._selectedMovePiece[0] === _row && this._selectedMovePiece[1] === _col;
              var isPendingDiscardPiece = !!this._pendingDiscardPoint && this._pendingDiscardPoint[0] === _row && this._pendingDiscardPoint[1] === _col;

              if (isSelectedMovePiece || isPendingDiscardPiece) {
                this._drawSelectionMarker(graphics, _x, _y, pieceRadius, isPendingDiscardPiece);
              }
            }
          }
        }

        _drawSelectionMarker(graphics, x, y, radius, isDiscardTarget) {
          // 在棋子中心绘制小型蓝色标记，不遮挡棋子主体
          var centerMarkRadius = Math.max(4, radius * 0.3);
          graphics.fillColor = new Color(65, 150, 255, 235);
          graphics.circle(x, y, centerMarkRadius);
          graphics.fill();
          graphics.strokeColor = new Color(230, 245, 255, 255);
          graphics.lineWidth = 1.8;
          graphics.circle(x, y, centerMarkRadius + 1.5);
          graphics.stroke(); // 细十字线强化“被选中”语义

          graphics.strokeColor = new Color(35, 110, 220, 255);
          graphics.lineWidth = 1.6;
          graphics.moveTo(x - centerMarkRadius * 0.55, y);
          graphics.lineTo(x + centerMarkRadius * 0.55, y);
          graphics.moveTo(x, y - centerMarkRadius * 0.55);
          graphics.lineTo(x, y + centerMarkRadius * 0.55);
          graphics.stroke();
        }
        /**
         * 绘制更接近真实质感的棋子（阴影 + 主体 + 高光）
         */


        _drawStone(graphics, x, y, radius, isWhite) {
          // 1) 轻微投影，增强厚度感
          graphics.fillColor = new Color(0, 0, 0, isWhite ? 55 : 75);
          graphics.circle(x + radius * 0.1, y - radius * 0.12, radius * 1.04);
          graphics.fill(); // 2) 棋子主体

          graphics.fillColor = isWhite ? new Color(240, 240, 240, 255) : new Color(32, 35, 40, 255);
          graphics.circle(x, y, radius);
          graphics.fill(); // 3) 边缘描边

          graphics.strokeColor = isWhite ? new Color(155, 155, 155, 255) : new Color(70, 78, 90, 255);
          graphics.lineWidth = 1.6;
          graphics.circle(x, y, radius);
          graphics.stroke(); // 4) 内层渐亮（用同心圆模拟）

          graphics.fillColor = isWhite ? new Color(252, 252, 252, 120) : new Color(82, 92, 108, 105);
          graphics.circle(x - radius * 0.05, y + radius * 0.05, radius * 0.8);
          graphics.fill();
          graphics.fillColor = isWhite ? new Color(255, 255, 255, 95) : new Color(105, 118, 140, 85);
          graphics.circle(x - radius * 0.1, y + radius * 0.1, radius * 0.58);
          graphics.fill(); // 5) 镜面高光点

          graphics.fillColor = isWhite ? new Color(255, 255, 255, 210) : new Color(200, 210, 220, 125);
          graphics.circle(x - radius * 0.28, y + radius * 0.3, radius * 0.18);
          graphics.fill();
        }
        /**
         * 初始化棋盘状态
         */


        _initBoardState() {
          this._boardState = [];

          for (var i = 0; i < this._boardSize; i++) {
            this._boardState[i] = [];

            for (var j = 0; j < this._boardSize; j++) {
              this._boardState[i][j] = 0;
            }
          }

          this._currentTurn = 1;
          this._isAiThinking = false;
          this._isGameOver = false;
          this._matchPhase = MatchPhase.PLACEMENT;
          this._lastPlacerType = 1;
          this._selectedMovePiece = null;
          this._pendingDiscardPoint = null;

          this._hideDiscardPopup();
        }
        /**
         * 处理棋盘触摸并转换为落子坐标
         */


        _onBoardTouch(event) {
          var _this$_discardPopupRo, _this$_capturePopupRo;

          if (this._isGameOver || this._isAiThinking || this._currentTurn !== 1 || !this._boardRoot || (_this$_discardPopupRo = this._discardPopupRoot) != null && _this$_discardPopupRo.active || (_this$_capturePopupRo = this._capturePopupRoot) != null && _this$_capturePopupRo.active) {
            return;
          }

          var boardTransform = this._boardRoot.getComponent(UITransform);

          if (!boardTransform) return;
          var uiPoint = event.getUILocation();
          var localPoint = boardTransform.convertToNodeSpaceAR(new Vec3(uiPoint.x, uiPoint.y, 0));
          var boardSpan = boardTransform.contentSize.width;
          var boardHalf = boardSpan / 2;
          var col = Math.round((localPoint.x + boardHalf) / this._cellSize);
          var row = Math.round((boardHalf - localPoint.y) / this._cellSize);

          if (row < 0 || row >= this._boardSize || col < 0 || col >= this._boardSize) {
            return;
          }

          var snapX = -boardHalf + col * this._cellSize;
          var snapY = boardHalf - row * this._cellSize;
          var offsetX = localPoint.x - snapX;
          var offsetY = localPoint.y - snapY;
          var touchDistance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

          if (touchDistance > this._cellSize * 0.46) {
            return;
          }

          if (this._matchPhase === MatchPhase.PLACEMENT) {
            this._onBoardClick(row, col);

            return;
          }

          if (this._matchPhase === MatchPhase.DISCARD) {
            this._handlePlayerDiscard(row, col);

            return;
          }

          if (this._matchPhase === MatchPhase.MOVEMENT) {
            this._handlePlayerMovement(row, col);
          }
        }
        /**
         * 玩家下子阶段落子
         */


        _onBoardClick(row, col) {
          if (this._isGameOver || this._isAiThinking || this._currentTurn !== 1 || this._matchPhase !== MatchPhase.PLACEMENT) return;
          if (this._boardState[row][col] !== 0) return;
          this._boardState[row][col] = 1;
          this._lastPlacerType = 1;

          this._drawGameBoard();

          this._resolveCaptureAfterAction(row, col, 1, true, () => {
            this._drawGameBoard();

            if (this._checkLoseByNoPieces()) {
              return;
            }

            if (this._isBoardFull()) {
              this._enterDiscardPhase();

              return;
            }

            this._startAiTurn();
          });
        }
        /**
         * 玩家弃子阶段：在DISCARD阶段时选择一个自己的棋子弃掉
         */


        _handlePlayerDiscard(row, col) {
          if (this._matchPhase !== MatchPhase.DISCARD || this._currentTurn !== 1) {
            return;
          }

          if (this._boardState[row][col] !== 1) return;
          this._pendingDiscardPoint = [row, col];

          this._drawGameBoard();

          this._showDiscardPopup();
        }
        /**
         * 玩家走子阶段：先选己方棋子，再选相邻空位落点
         */


        _handlePlayerMovement(row, col) {
          if (this._matchPhase !== MatchPhase.MOVEMENT) return;

          if (!this._selectedMovePiece) {
            if (this._boardState[row][col] === 1) {
              this._selectedMovePiece = [row, col];

              this._drawGameBoard();
            }

            return;
          }

          var from = this._selectedMovePiece;

          if (from[0] === row && from[1] === col) {
            this._selectedMovePiece = null;

            this._drawGameBoard();

            return;
          }

          if (this._boardState[row][col] === 1) {
            this._selectedMovePiece = [row, col];

            this._drawGameBoard();

            return;
          }

          if (this._boardState[row][col] !== 0) return;
          if (!this._isAdjacentOrthogonal(from[0], from[1], row, col)) return;
          this._boardState[from[0]][from[1]] = 0;
          this._boardState[row][col] = 1;
          this._selectedMovePiece = null;

          this._drawGameBoard();

          this._resolveCaptureAfterAction(row, col, 1, true, () => {
            this._drawGameBoard();

            if (this._checkLoseByNoPieces()) return; // 玩家走子后，检查AI是否有有效的走子

            if (this._canMakeValidMove(2)) {
              this._startAiTurn();
            } else {
              console.log('[GamePage] AI无法走子，玩家需要弃子给对方走');
              this._matchPhase = MatchPhase.DISCARD;
              this._lastPlacerType = 1; // 玩家需要弃子

              this._currentTurn = 1;

              this._updateActionTip();
            }
          });
        }
        /**
         * 进入弃子阶段
         */


        _enterDiscardPhase() {
          this._matchPhase = MatchPhase.DISCARD;
          this._selectedMovePiece = null;
          this._pendingDiscardPoint = null;

          this._hideDiscardPopup();

          this._hideCapturePopup();

          this._updateActionTip();

          if (this._lastPlacerType === 2) {
            this._startAiTurn();
          }
        }
        /**
         * 启动AI回合
         */


        _startAiTurn() {
          if (this._isGameOver) return;
          this._currentTurn = 2;

          this._updateActionTip();

          this._isAiThinking = true;
          this.scheduleOnce(() => {
            this._doAiTurn();
          }, 0.45);
        }
        /**
         * 执行AI回合（按阶段）
         */


        _doAiTurn() {
          if (this._isGameOver) {
            this._isAiThinking = false;
            return;
          }

          if (this._matchPhase === MatchPhase.PLACEMENT) {
            this._doAiPlacement();

            return;
          }

          if (this._matchPhase === MatchPhase.DISCARD) {
            this._doAiDiscard();

            return;
          }

          if (this._matchPhase === MatchPhase.MOVEMENT) {
            this._doAiMovement();

            return;
          }

          this._isAiThinking = false;
        }
        /**
         * AI下子阶段
         */


        _doAiPlacement() {
          var _this$_opponentInfo$t, _this$_opponentInfo, _this$_opponentInfo$p, _this$_opponentInfo2;

          var aiRankTier = (_this$_opponentInfo$t = (_this$_opponentInfo = this._opponentInfo) == null ? void 0 : _this$_opponentInfo.tier) != null ? _this$_opponentInfo$t : (_crd && RankTier === void 0 ? (_reportPossibleCrUseOfRankTier({
            error: Error()
          }), RankTier) : RankTier).BRONZE;
          var aiRankPhase = (_this$_opponentInfo$p = (_this$_opponentInfo2 = this._opponentInfo) == null ? void 0 : _this$_opponentInfo2.phase) != null ? _this$_opponentInfo$p : (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
            error: Error()
          }), RankPhase) : RankPhase).EARLY;

          var move = this._aiSystem.chooseMove(this._boardState, 2, 1, aiRankTier, aiRankPhase);

          if (!move) {
            this._isAiThinking = false;
            this._currentTurn = 1;

            this._updateActionTip();

            return;
          }

          this._boardState[move.row][move.col] = 2;
          this._lastPlacerType = 2;

          this._resolveCaptureAfterAction(move.row, move.col, 2, false);

          this._drawGameBoard();

          if (this._checkLoseByNoPieces()) {
            this._isAiThinking = false;
            return;
          }

          if (this._isBoardFull()) {
            this._isAiThinking = false;

            this._enterDiscardPhase();

            return;
          }

          this._isAiThinking = false;
          this._currentTurn = 1;

          this._updateActionTip();
        }
        /**
         * AI弃子阶段
         */


        _doAiDiscard() {
          if (this._matchPhase !== MatchPhase.DISCARD || this._currentTurn !== 2) {
            this._isAiThinking = false;
            return;
          } // AI弃子


          var ownPieces = this._findPiecesByType(2);

          if (ownPieces.length > 0) {
            var removeIndex = Math.floor(Math.random() * ownPieces.length);
            var removePoint = ownPieces[removeIndex];
            this._boardState[removePoint[0]][removePoint[1]] = 0;
          }

          this._drawGameBoard(); // AI弃子后，检查玩家是否有有效的走子


          if (this._canMakeValidMove(1)) {
            // 玩家能走，转入MOVEMENT阶段
            this._matchPhase = MatchPhase.MOVEMENT;
            this._isAiThinking = false;
            this._currentTurn = 1;

            this._updateActionTip();
          } else {
            // 玩家无法走，AI继续弃子
            console.log('[GamePage] 玩家无法走子，AI继续弃子'); // 保持在DISCARD阶段，继续让AI弃子

            this._isAiThinking = false;
            this.scheduleOnce(() => {
              this._doAiTurn();
            }, 0.45);
          }
        }
        /**
         * AI走子阶段
         */


        _doAiMovement() {
          var _this$_opponentInfo$t2, _this$_opponentInfo3, _this$_opponentInfo$p2, _this$_opponentInfo4;

          var aiRankTier = (_this$_opponentInfo$t2 = (_this$_opponentInfo3 = this._opponentInfo) == null ? void 0 : _this$_opponentInfo3.tier) != null ? _this$_opponentInfo$t2 : (_crd && RankTier === void 0 ? (_reportPossibleCrUseOfRankTier({
            error: Error()
          }), RankTier) : RankTier).BRONZE;
          var aiRankPhase = (_this$_opponentInfo$p2 = (_this$_opponentInfo4 = this._opponentInfo) == null ? void 0 : _this$_opponentInfo4.phase) != null ? _this$_opponentInfo$p2 : (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
            error: Error()
          }), RankPhase) : RankPhase).EARLY;

          var move = this._aiSystem.chooseStepMove(this._boardState, 2, 1, aiRankTier, aiRankPhase);

          if (!move) {
            this._isAiThinking = false;
            this._currentTurn = 1;

            this._updateActionTip();

            return;
          }

          this._boardState[move.fromRow][move.fromCol] = 0;
          this._boardState[move.toRow][move.toCol] = 2;

          this._resolveCaptureAfterAction(move.toRow, move.toCol, 2, false);

          this._drawGameBoard();

          if (this._checkLoseByNoPieces()) {
            this._isAiThinking = false;
            return;
          } // AI走子后，检查玩家是否有有效的走子


          if (this._canMakeValidMove(1)) {
            // 玩家能走，玩家继续走子
            this._isAiThinking = false;
            this._currentTurn = 1;

            this._updateActionTip();
          } else {
            // 玩家无法走，AI需要弃子给对方走
            console.log('[GamePage] 玩家无法走子，AI需要弃子给对方走');
            this._matchPhase = MatchPhase.DISCARD;
            this._lastPlacerType = 2; // AI需要弃子

            this._isAiThinking = false;
            this._currentTurn = 2;

            this._updateActionTip();
          }
        }
        /**
         * 执行吃子决策（玩家可选择吃或不吃）
         */


        _resolveCaptureAfterAction(row, col, pieceType, isPlayer, onComplete) {
          var killedPieces = this._getKillCandidates(row, col, pieceType);

          if (killedPieces.length === 0) {
            onComplete == null || onComplete();
            return;
          }

          if (isPlayer) {
            this._showCapturePopup(killedPieces.length, shouldCapture => {
              if (shouldCapture) {
                for (var i = 0; i < killedPieces.length; i++) {
                  var p = killedPieces[i];
                  this._boardState[p.point[0]][p.point[1]] = 0;
                }
              }

              onComplete == null || onComplete();
            });

            return;
          }

          var shouldCapture = true;
          {
            var _this$_opponentInfo$t3, _this$_opponentInfo5, _this$_opponentInfo$p3, _this$_opponentInfo6;

            var aiRankTier = (_this$_opponentInfo$t3 = (_this$_opponentInfo5 = this._opponentInfo) == null ? void 0 : _this$_opponentInfo5.tier) != null ? _this$_opponentInfo$t3 : (_crd && RankTier === void 0 ? (_reportPossibleCrUseOfRankTier({
              error: Error()
            }), RankTier) : RankTier).BRONZE;
            var aiRankPhase = (_this$_opponentInfo$p3 = (_this$_opponentInfo6 = this._opponentInfo) == null ? void 0 : _this$_opponentInfo6.phase) != null ? _this$_opponentInfo$p3 : (_crd && RankPhase === void 0 ? (_reportPossibleCrUseOfRankPhase({
              error: Error()
            }), RankPhase) : RankPhase).EARLY;
            shouldCapture = this._aiSystem.shouldCapture(aiRankTier, aiRankPhase);
          }

          if (!shouldCapture) {
            onComplete == null || onComplete();
            return;
          }

          for (var i = 0; i < killedPieces.length; i++) {
            var p = killedPieces[i];
            this._boardState[p.point[0]][p.point[1]] = 0;
          }

          onComplete == null || onComplete();
        }

        _showDiscardPopup() {
          if (!this._discardPopupRoot) return;
          this._discardPopupRoot.active = true;

          if (this._discardPopupMessage) {
            this._discardPopupMessage.string = '确定要弃掉这颗棋子吗？';
          }
        }

        _hideDiscardPopup() {
          if (this._discardPopupRoot) {
            this._discardPopupRoot.active = false;
          }
        }

        _showCapturePopup(killCount, onDecision) {
          if (!this._capturePopupRoot) {
            onDecision(true);
            return;
          }

          this._pendingCaptureDecision = onDecision;

          if (this._capturePopupMessage) {
            this._capturePopupMessage.string = "\u53EF\u5403\u6389\u5BF9\u65B9 " + killCount + " \u9897\u68CB\u5B50\uFF0C\u662F\u5426\u5403\u5B50\uFF1F";
          }

          this._capturePopupRoot.active = true;
        }

        _hideCapturePopup() {
          if (this._capturePopupRoot) {
            this._capturePopupRoot.active = false;
          }

          this._pendingCaptureDecision = null;
        }

        _confirmPlayerCapture() {
          var decision = this._pendingCaptureDecision;

          this._hideCapturePopup();

          if (decision) {
            decision(true);
          }
        }

        _cancelPlayerCapture() {
          var decision = this._pendingCaptureDecision;

          this._hideCapturePopup();

          if (decision) {
            decision(false);
          }
        }

        _confirmPlayerDiscard() {
          if (!this._pendingDiscardPoint) {
            this._hideDiscardPopup();

            return;
          }

          var row = this._pendingDiscardPoint[0];
          var col = this._pendingDiscardPoint[1];

          if (this._boardState[row][col] === 1) {
            this._boardState[row][col] = 0;
          }

          this._pendingDiscardPoint = null;

          this._hideDiscardPopup();

          this._drawGameBoard(); // 玩家弃子后，检查AI是否有有效的走子


          if (this._canMakeValidMove(2)) {
            // AI能走，转入MOVEMENT阶段
            this._matchPhase = MatchPhase.MOVEMENT;
            this._currentTurn = 2;

            this._updateActionTip();

            this._startAiTurn();
          } else {
            // AI无法走，玩家继续弃子
            console.log('[GamePage] AI无法走子，玩家继续弃子'); // 保持在DISCARD阶段，_currentTurn仍为1，玩家继续弃子
            // 不需要更新提示，因为玩家仍然轮到
          }
        }

        _cancelPlayerDiscard() {
          this._pendingDiscardPoint = null;

          this._hideDiscardPopup();

          this._drawGameBoard();
        }

        _showResultPopup(isVictory) {
          if (!this._resultPopupRoot || !this._resultPopupTitle || !this._resultPopupMessage) {
            return;
          }

          this._resultPopupRoot.active = true;
          this._resultPopupTitle.string = isVictory ? '胜利' : '失败';
          this._resultPopupTitle.color = isVictory ? new Color(70, 120, 180, 255) : new Color(200, 90, 90, 255);
          this._resultPopupMessage.string = isVictory ? '恭喜赢得胜利' : '失败了，再接再厉';
        }

        _closeResultPopup() {
          if (this._resultPopupRoot) {
            this._resultPopupRoot.active = false;
          }
        }
        /**
         * 判断是否因棋子被吃完而结束
         */


        _checkLoseByNoPieces() {
          if (this._matchPhase !== MatchPhase.MOVEMENT) {
            return false;
          }

          var counts = this._countPieces();

          if (counts.white > 0 && counts.black > 0) {
            return false;
          }

          this._isGameOver = true;
          this._matchPhase = MatchPhase.FINISHED;

          this._showResultPopup(counts.white > 0 && counts.black === 0);

          console.log('[GamePage] 对局结束', counts);
          return true;
        }

        _countPieces() {
          var white = 0;
          var black = 0;
          var empty = 0;

          for (var row = 0; row < this._boardSize; row++) {
            for (var col = 0; col < this._boardSize; col++) {
              var type = this._boardState[row][col];
              if (type === 0) empty += 1;
              if (type === 1) white += 1;
              if (type === 2) black += 1;
            }
          }

          return {
            white,
            black,
            empty
          };
        }

        _isBoardFull() {
          for (var row = 0; row < this._boardSize; row++) {
            for (var col = 0; col < this._boardSize; col++) {
              if (this._boardState[row][col] === 0) {
                return false;
              }
            }
          }

          return true;
        }

        _findPiecesByType(pieceType) {
          var points = [];

          for (var row = 0; row < this._boardSize; row++) {
            for (var col = 0; col < this._boardSize; col++) {
              if (this._boardState[row][col] === pieceType) {
                points.push([row, col]);
              }
            }
          }

          return points;
        }

        _isAdjacentOrthogonal(fromRow, fromCol, toRow, toCol) {
          var rowDistance = Math.abs(fromRow - toRow);
          var colDistance = Math.abs(fromCol - toCol);
          return rowDistance + colDistance === 1;
        }
        /**
         * 获取当前位置下可触发的吃子列表
         */


        _getKillCandidates(row, col, pieceType) {
          var currentPieceList = this._getBoardPieceList();

          var currentPiece = {
            point: [row, col],
            type: pieceType
          };
          return this._ruleSystem.checkKill(currentPiece, currentPieceList);
        }
        /**
         * 获取当前棋盘的所有棋子列表
         */


        _getBoardPieceList() {
          var pieceList = [];

          for (var row = 0; row < this._boardSize; row++) {
            for (var col = 0; col < this._boardSize; col++) {
              var pieceType = this._boardState[row][col];

              if (pieceType !== 0) {
                pieceList.push({
                  point: [row, col],
                  type: pieceType
                });
              }
            }
          }

          return pieceList;
        }
        /**
         * 检查某一方是否有有效的走子（相邻空位）
         * @param pieceType 1=玩家白子, 2=AI黑子
         * @returns true 表示有至少一个棋子可以走到相邻的空位，false 表示无任何有效走子
         */


        _canMakeValidMove(pieceType) {
          var ownPieces = this._findPiecesByType(pieceType);

          for (var piece of ownPieces) {
            var [row, col] = piece; // 检查四个正交方向的相邻格子

            var directions = [[row - 1, col], [row + 1, col], [row, col - 1], [row, col + 1]];

            for (var [r, c] of directions) {
              if (r >= 0 && r < this._boardSize && c >= 0 && c < this._boardSize) {
                if (this._boardState[r][c] === 0) {
                  return true;
                }
              }
            }
          }

          return false;
        }
        /**
         * 返回首页
         */


        _onBack() {
          // 播放点击音效
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click'); // 返回上一页

          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().backPage();
        }
        /**
         * 页面隐藏时调用（可选）
         */


        onHide() {
          console.log('游戏页面隐藏');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=848fe469dcc60a4988d015a0af6329f6c3412ea8.js.map
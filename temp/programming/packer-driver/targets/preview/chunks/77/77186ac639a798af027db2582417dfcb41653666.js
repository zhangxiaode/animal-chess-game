System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Button, Label, Node, UITransform, Color, Graphics, Vec3, UIManager, SoundManager, UserSystem, RankSystem, _dec, _class, _crd, ccclass, HomePage;

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../framework/UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUserSystem(extras) {
    _reporterNs.report("UserSystem", "../system/UserSystem", _context.meta, extras);
  }

  function _reportPossibleCrUseOfRankSystem(extras) {
    _reporterNs.report("RankSystem", "../game/RankSystem", _context.meta, extras);
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
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      UIManager = _unresolved_2.UIManager;
    }, function (_unresolved_3) {
      SoundManager = _unresolved_3.SoundManager;
    }, function (_unresolved_4) {
      UserSystem = _unresolved_4.UserSystem;
    }, function (_unresolved_5) {
      RankSystem = _unresolved_5.RankSystem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8233bqCptxI1IfYpg/wfSfC", "HomePage", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Button', 'Label', 'Node', 'UITransform', 'Color', 'Sprite', 'Graphics', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("HomePage", HomePage = (_dec = ccclass('HomePage'), _dec(_class = class HomePage extends Component {
        constructor() {
          super(...arguments);
          this._startGameBtn = null;
          this._rulesBtn = null;
          this._userInfoPanel = null;
        }

        start() {
          this._createUI();
        }
        /**
         * 动态创建UI元素
         */


        _createUI() {
          var pageRoot = this.node;
          var pageTransform = pageRoot.getComponent(UITransform);
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
          backgroundGraphics.fill(); // 创建用户信息面板

          this._createUserInfoPanel(pageRoot);

          this._startGameBtn = this._createButton(pageRoot, 'StartGameBtn', '开始游戏', new Vec3(0, 50, 0));
          this._rulesBtn = this._createButton(pageRoot, 'RulesBtn', '游戏规则', new Vec3(0, -50, 0));

          if (this._startGameBtn) {
            this._startGameBtn.node.on(Button.EventType.CLICK, this._onStartGame, this);
          }

          if (this._rulesBtn) {
            this._rulesBtn.node.on(Button.EventType.CLICK, this._onShowRules, this);
          }

          console.log('[HomePage] 按钮创建成功');
        }
        /**
         * 创建用户信息面板
         */


        _createUserInfoPanel(parent) {
          var userSystem = (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance();
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance(); // 创建用户信息面板容器

          this._userInfoPanel = new Node('UserInfoPanel');
          this._userInfoPanel.parent = parent;

          this._userInfoPanel.setPosition(new Vec3(0, 260, 0));

          var panelTransform = this._userInfoPanel.addComponent(UITransform);

          panelTransform.setContentSize(400, 160); // 绘制面板背景

          var panelGraphics = this._userInfoPanel.addComponent(Graphics);

          panelGraphics.fillColor = new Color(70, 120, 180, 200);
          panelGraphics.roundRect(-200, -80, 400, 160, 12);
          panelGraphics.fill();
          panelGraphics.strokeColor = new Color(40, 80, 140, 255);
          panelGraphics.lineWidth = 2;
          panelGraphics.roundRect(-200, -80, 400, 160, 12);
          panelGraphics.stroke(); // 用户名标签 - 第一行，左侧

          var usernameNode = new Node('UsernameLabel');
          usernameNode.parent = this._userInfoPanel;
          usernameNode.setPosition(new Vec3(-90, 30, 0));
          var usernameTransform = usernameNode.addComponent(UITransform);
          usernameTransform.setContentSize(180, 50);
          var usernameLabel = usernameNode.addComponent(Label);
          usernameLabel.string = userSystem.getUsername();
          usernameLabel.fontSize = 28;
          usernameLabel.color = new Color(255, 255, 255, 255);
          usernameLabel.overflow = Label.Overflow.CLAMP;
          usernameLabel.horizontalAlign = Label.HorizontalAlign.LEFT; // 星数标签 - 第一行，右侧

          var starsNode = new Node('StarsLabel');
          starsNode.parent = this._userInfoPanel;
          starsNode.setPosition(new Vec3(120, 30, 0));
          var starsTransform = starsNode.addComponent(UITransform);
          starsTransform.setContentSize(110, 50);
          var starsLabel = starsNode.addComponent(Label);
          starsLabel.string = "\u2B50 " + userSystem.getStars();
          starsLabel.fontSize = 28;
          starsLabel.color = new Color(255, 255, 100, 255);
          starsLabel.overflow = Label.Overflow.CLAMP;
          starsLabel.horizontalAlign = Label.HorizontalAlign.RIGHT; // 段位标签 - 第二行，左对齐

          var rankNode = new Node('RankLabel');
          rankNode.parent = this._userInfoPanel;
          rankNode.setPosition(new Vec3(-30, -32, 0));
          var rankTransform = rankNode.addComponent(UITransform);
          rankTransform.setContentSize(300, 50);
          var rankLabel = rankNode.addComponent(Label);
          rankLabel.string = rankSystem.getCurrentRankDisplayName();
          rankLabel.fontSize = 28;
          rankLabel.color = new Color(255, 228, 181, 255);
          rankLabel.overflow = Label.Overflow.CLAMP;
          rankLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
        }

        _createButton(parent, nodeName, text, position) {
          var buttonNode = new Node(nodeName);
          buttonNode.parent = parent;
          buttonNode.setPosition(position);
          var buttonTransform = buttonNode.addComponent(UITransform);
          buttonTransform.setContentSize(200, 80);
          var graphics = buttonNode.addComponent(Graphics);
          graphics.fillColor = new Color(100, 150, 200, 255);
          graphics.rect(-100, -40, 200, 80);
          graphics.fill();
          graphics.strokeColor = new Color(50, 100, 150, 255);
          graphics.lineWidth = 2;
          graphics.rect(-100, -40, 200, 80);
          graphics.stroke();
          var button = buttonNode.addComponent(Button);
          button.interactable = true;
          var labelNode = new Node('Label');
          labelNode.parent = buttonNode;
          labelNode.addComponent(UITransform);
          var buttonLabel = labelNode.addComponent(Label);
          buttonLabel.string = text;
          buttonLabel.fontSize = 28;
          buttonLabel.color = new Color(255, 255, 255, 255);
          return button;
        }
        /**
         * 点击开始游戏按钮
         */


        _onStartGame() {
          // 播放点击音效
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click'); // 打开游戏页面，传递参数：关卡1

          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().openPage('prefabs/pages/GamePage', {
            level: 1
          });
        }
        /**
         * 点击游戏规则按钮
         */


        _onShowRules() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playEffect('sounds/click');
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().openPage('prefabs/pages/RulesPage');
        }
        /**
         * 页面显示时自动调用
         */


        onShow(params) {
          console.log('首页显示'); // 更新用户信息显示

          this._updateUserInfoDisplay(); // 播放背景音乐


          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playBGM('sounds/bgm_home');
        }
        /**
         * 更新用户信息显示
         */


        _updateUserInfoDisplay() {
          if (!this._userInfoPanel) return;
          var userSystem = (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance();
          var rankSystem = (_crd && RankSystem === void 0 ? (_reportPossibleCrUseOfRankSystem({
            error: Error()
          }), RankSystem) : RankSystem).getInstance(); // 更新用户名

          var usernameNode = this._userInfoPanel.getChildByName('UsernameLabel');

          if (usernameNode) {
            var usernameLabel = usernameNode.getComponent(Label);

            if (usernameLabel) {
              usernameLabel.string = userSystem.getUsername();
            }
          } // 更新段位


          var rankNode = this._userInfoPanel.getChildByName('RankLabel');

          if (rankNode) {
            var rankLabel = rankNode.getComponent(Label);

            if (rankLabel) {
              rankLabel.string = rankSystem.getCurrentRankDisplayName();
            }
          } // 更新星数


          var starsNode = this._userInfoPanel.getChildByName('StarsLabel');

          if (starsNode) {
            var starsLabel = starsNode.getComponent(Label);

            if (starsLabel) {
              starsLabel.string = "\u2B50 " + userSystem.getStars();
            }
          }
        }
        /**
         * 页面隐藏时自动调用
         */


        onHide() {
          console.log('首页隐藏');
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=77186ac639a798af027db2582417dfcb41653666.js.map
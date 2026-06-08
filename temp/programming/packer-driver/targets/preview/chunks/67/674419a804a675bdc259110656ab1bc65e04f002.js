System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, game, UITransform, js, UIManager, PopupManager, SoundManager, DataManager, HttpManager, getCurrentPlatform, getPlatformGameInfo, HomePage, UserSystem, _dec, _class, _class2, _crd, ccclass, property, GameMain;

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "./framework/UIManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfPopupManager(extras) {
    _reporterNs.report("PopupManager", "./framework/PopupManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "./framework/SoundManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDataManager(extras) {
    _reporterNs.report("DataManager", "./framework/DataManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHttpManager(extras) {
    _reporterNs.report("HttpManager", "./framework/HttpManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetCurrentPlatform(extras) {
    _reporterNs.report("getCurrentPlatform", "./utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfgetPlatformGameInfo(extras) {
    _reporterNs.report("getPlatformGameInfo", "./utils/Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfHomePage(extras) {
    _reporterNs.report("HomePage", "./pages/HomePage", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUserSystem(extras) {
    _reporterNs.report("UserSystem", "./system/UserSystem", _context.meta, extras);
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
      Node = _cc.Node;
      game = _cc.game;
      UITransform = _cc.UITransform;
      js = _cc.js;
    }, function (_unresolved_2) {
      UIManager = _unresolved_2.UIManager;
    }, function (_unresolved_3) {
      PopupManager = _unresolved_3.PopupManager;
    }, function (_unresolved_4) {
      SoundManager = _unresolved_4.SoundManager;
    }, function (_unresolved_5) {
      DataManager = _unresolved_5.DataManager;
    }, function (_unresolved_6) {
      HttpManager = _unresolved_6.HttpManager;
    }, function (_unresolved_7) {
      getCurrentPlatform = _unresolved_7.getCurrentPlatform;
      getPlatformGameInfo = _unresolved_7.getPlatformGameInfo;
    }, function (_unresolved_8) {
      HomePage = _unresolved_8.HomePage;
    }, function (_unresolved_9) {
      UserSystem = _unresolved_9.UserSystem;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39bb6f/NKBBp698AMS0ih+l", "GameMain", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'game', 'UITransform', 'js']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameMain", GameMain = (_dec = ccclass('GameMain'), _dec(_class = (_class2 = class GameMain extends Component {
        constructor() {
          super(...arguments);
          this._uiRoot = null;
          this._popupRoot = null;
        }

        onLoad() {
          var platform = (_crd && getCurrentPlatform === void 0 ? (_reportPossibleCrUseOfgetCurrentPlatform({
            error: Error()
          }), getCurrentPlatform) : getCurrentPlatform)();
          var gameInfo = (_crd && getPlatformGameInfo === void 0 ? (_reportPossibleCrUseOfgetPlatformGameInfo({
            error: Error()
          }), getPlatformGameInfo) : getPlatformGameInfo)(platform);
          game.frameRate = 60; // 动态创建 UIRoot

          this._uiRoot = new Node('UIRoot');
          this._uiRoot.parent = this.node;

          var uiTransform = this._uiRoot.addComponent(UITransform);

          var canvasTransform = this.node.getComponent(UITransform);

          if (canvasTransform) {
            uiTransform.setContentSize(canvasTransform.contentSize);
          } // 动态创建 PopupRoot


          this._popupRoot = new Node('PopupRoot');
          this._popupRoot.parent = this.node;

          var popupTransform = this._popupRoot.addComponent(UITransform);

          if (canvasTransform) {
            popupTransform.setContentSize(canvasTransform.contentSize);
          } // 初始化所有管理器


          (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance().init();
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().init(this._uiRoot);
          (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance().init(this._popupRoot);
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().init(this.node);
          (_crd && HttpManager === void 0 ? (_reportPossibleCrUseOfHttpManager({
            error: Error()
          }), HttpManager) : HttpManager).getInstance().init(gameInfo.apiBaseUrl); // 初始化用户系统 - 游戏启动时创建或读取用户数据

          (_crd && UserSystem === void 0 ? (_reportPossibleCrUseOfUserSystem({
            error: Error()
          }), UserSystem) : UserSystem).getInstance().initialize();
          GameMain.ui = (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance();
          GameMain.popup = (_crd && PopupManager === void 0 ? (_reportPossibleCrUseOfPopupManager({
            error: Error()
          }), PopupManager) : PopupManager).getInstance();
          GameMain.sound = (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance();
          GameMain.data = (_crd && DataManager === void 0 ? (_reportPossibleCrUseOfDataManager({
            error: Error()
          }), DataManager) : DataManager).getInstance();
          GameMain.http = (_crd && HttpManager === void 0 ? (_reportPossibleCrUseOfHttpManager({
            error: Error()
          }), HttpManager) : HttpManager).getInstance();
          console.log("[GameMain] platform=" + platform + ", app=" + gameInfo.appName);
        }

        start() {
          // 动态创建首页
          var homePageNode = new Node('HomePage');
          homePageNode.parent = this._uiRoot;
          var homeTransform = homePageNode.addComponent(UITransform);

          var uiTransform = this._uiRoot.getComponent(UITransform);

          if (uiTransform) {
            homeTransform.setContentSize(uiTransform.contentSize);
          }

          var homePage = homePageNode.addComponent(_crd && HomePage === void 0 ? (_reportPossibleCrUseOfHomePage({
            error: Error()
          }), HomePage) : HomePage);
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().registerInitialPage(homePageNode, 'HomePage');
          homePage.onShow();
        }

      }, _class2.ui = void 0, _class2.popup = void 0, _class2.sound = void 0, _class2.data = void 0, _class2.http = void 0, _class2)) || _class)); // 兼容场景中使用类名或脚本 UUID 的反序列化查找。


      js.setClassAlias(GameMain, 'GameMain');
      js.setClassAlias(GameMain, '39bb67ff-34a0-41a7-af7c-00c4b48a1fa5');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=674419a804a675bdc259110656ab1bc65e04f002.js.map
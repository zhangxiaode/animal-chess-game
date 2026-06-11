System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7", "__unresolved_8"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, game, UITransform, js, Prefab, instantiate, Widget, Vec3, UIManager, PopupManager, SoundManager, DataManager, HttpManager, getCurrentPlatform, getPlatformGameInfo, UserSystem, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, GameMain;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

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
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Widget = _cc.Widget;
      Vec3 = _cc.Vec3;
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
      UserSystem = _unresolved_8.UserSystem;
    }, function (_unresolved_9) {}],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "39bb6f/NKBBp698AMS0ih+l", "GameMain", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'game', 'UITransform', 'js', 'Prefab', 'instantiate', 'Widget', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("GameMain", GameMain = (_dec = ccclass('GameMain'), _dec2 = property(Prefab), _dec(_class = (_class2 = (_class3 = class GameMain extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "loadingPagePrefab", _descriptor, this);

          this._uiRoot = null;
          this._popupRoot = null;
        }

        onLoad() {
          const platform = (_crd && getCurrentPlatform === void 0 ? (_reportPossibleCrUseOfgetCurrentPlatform({
            error: Error()
          }), getCurrentPlatform) : getCurrentPlatform)();
          const gameInfo = (_crd && getPlatformGameInfo === void 0 ? (_reportPossibleCrUseOfgetPlatformGameInfo({
            error: Error()
          }), getPlatformGameInfo) : getPlatformGameInfo)(platform);
          game.frameRate = 60; // 动态创建 UIRoot

          this._uiRoot = new Node('UIRoot');
          this._uiRoot.layer = this.node.layer;
          this._uiRoot.parent = this.node;

          const uiTransform = this._uiRoot.addComponent(UITransform);

          const canvasTransform = this.node.getComponent(UITransform);

          if (canvasTransform) {
            uiTransform.setContentSize(canvasTransform.contentSize);
          } // 动态创建 PopupRoot


          this._popupRoot = new Node('PopupRoot');
          this._popupRoot.layer = this.node.layer;
          this._popupRoot.parent = this.node;

          const popupTransform = this._popupRoot.addComponent(UITransform);

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
          console.log(`[GameMain] platform=${platform}, app=${gameInfo.appName}`);
        }

        async start() {
          var _loadingPageNode$getC;

          const loadingPageNode = await this._createLoadingPage();
          loadingPageNode.active = false;
          loadingPageNode.layer = this._uiRoot.layer;

          this._disableWidgets(loadingPageNode);

          const loadingTransform = (_loadingPageNode$getC = loadingPageNode.getComponent(UITransform)) != null ? _loadingPageNode$getC : loadingPageNode.addComponent(UITransform);

          const uiTransform = this._uiRoot.getComponent(UITransform);

          if (uiTransform) {
            loadingTransform.setContentSize(uiTransform.contentSize);
          }

          loadingPageNode.setPosition(Vec3.ZERO);
          loadingPageNode.parent = this._uiRoot;
          loadingPageNode.active = true;
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().registerInitialPage(loadingPageNode, 'LoadingPage');
        }

        async _createLoadingPage() {
          if (!this.loadingPagePrefab) {
            throw new Error('[GameMain] 请在编辑器中绑定 assets/prefabs/pages/LoadingPage.prefab 到 loadingPagePrefab，Loading 页面不再使用 TS 动态渲染。');
          }

          return instantiate(this.loadingPagePrefab);
        }

        _disableWidgets(root) {
          root.getComponentsInChildren(Widget).forEach(widget => {
            widget.enabled = false;
          });
        }

      }, _class3.ui = void 0, _class3.popup = void 0, _class3.sound = void 0, _class3.data = void 0, _class3.http = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "loadingPagePrefab", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class)); // 兼容场景中使用类名或脚本 UUID 的反序列化查找。


      js.setClassAlias(GameMain, 'GameMain');
      js.setClassAlias(GameMain, '39bb67ff-34a0-41a7-af7c-00c4b48a1fa5');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=674419a804a675bdc259110656ab1bc65e04f002.js.map
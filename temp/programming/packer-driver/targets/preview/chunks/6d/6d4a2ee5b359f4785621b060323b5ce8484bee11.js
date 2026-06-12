System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, assetManager, Node, Prefab, instantiate, tween, UITransform, Color, Graphics, Input, Vec3, UIOpacity, Singleton, _dec, _class, _crd, ccclass, POPUP_PREFAB_UUID_MAP, POPUP_BUNDLE_MAP, PopupManager;

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfSingleton(extras) {
    _reporterNs.report("Singleton", "./Singleton", _context.meta, extras);
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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      Graphics = _cc.Graphics;
      Input = _cc.Input;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d74c1nHNyhAvbPfxpsABXVB", "PopupManager", undefined);

      __checkObsolete__(['_decorator', 'assetManager', 'Node', 'Prefab', 'instantiate', 'tween', 'UITransform', 'Color', 'Graphics', 'Input', 'EventTouch', 'Vec3', 'UIOpacity']);

      ({
        ccclass
      } = _decorator);
      POPUP_PREFAB_UUID_MAP = {
        SettingPopup: 'a37a4ed6-3b8c-47bd-afd5-52f10ed88395'
      };
      POPUP_BUNDLE_MAP = {
        SettingPopup: 'popups'
      };

      _export("PopupManager", PopupManager = (_dec = ccclass('PopupManager'), _dec(_class = class PopupManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor() {
          super(...arguments);
          this._root = null;
          this._popupStack = [];
          this._mask = null;
        }

        /**
         * 初始化弹窗管理器
         * @param root 弹窗根节点（层级高于页面）
         */
        init(root) {
          this._root = root;

          this._createMask();
        }

        _createMask() {
          this._mask = new Node('popup_mask');

          var uiTransform = this._mask.addComponent(UITransform);

          uiTransform.anchorX = 0.5;
          uiTransform.anchorY = 0.5;

          this._mask.addComponent(Graphics);

          this._refreshMask();

          this._mask.on(Input.EventType.TOUCH_END, this._onMaskClick, this);

          this._mask.active = false;

          this._root.addChild(this._mask);
        }

        _refreshMask() {
          var _rootTransform$conten, _rootTransform$conten2, _this$_mask$getCompon, _this$_mask$getCompon2;

          if (!this._mask) return;

          var rootTransform = this._root.getComponent(UITransform);

          var width = (_rootTransform$conten = rootTransform == null ? void 0 : rootTransform.contentSize.width) != null ? _rootTransform$conten : 750;
          var height = (_rootTransform$conten2 = rootTransform == null ? void 0 : rootTransform.contentSize.height) != null ? _rootTransform$conten2 : 1334;
          var uiTransform = (_this$_mask$getCompon = this._mask.getComponent(UITransform)) != null ? _this$_mask$getCompon : this._mask.addComponent(UITransform);
          uiTransform.setContentSize(width, height);
          var graphics = (_this$_mask$getCompon2 = this._mask.getComponent(Graphics)) != null ? _this$_mask$getCompon2 : this._mask.addComponent(Graphics);
          graphics.clear();
          graphics.fillColor = new Color(0, 0, 0, 150);
          graphics.rect(-width / 2, -height / 2, width, height);
          graphics.fill();
        }
        /**
         * 打开弹窗
         * @param prefabPath 预制体路径（如 prefabs/popups/xxx）
         * @param params 传递给弹窗的参数
         * @param callback 弹窗关闭回调
         * @param closeOnMaskClick 点击遮罩是否关闭
         */


        openPopup(prefabPath, params, callback, closeOnMaskClick) {
          var _this = this;

          return _asyncToGenerator(function* () {
            if (closeOnMaskClick === void 0) {
              closeOnMaskClick = true;
            }

            // 加载并实例化弹窗
            var popupName = _this._extractPopupName(prefabPath);

            var prefab = yield _this._loadPopupPrefab(prefabPath, popupName);

            if (!prefab) {
              console.warn("\u5F39\u7A97\u9884\u5236\u4F53\u52A0\u8F7D\u5931\u8D25: " + prefabPath);
              return;
            }

            var popupNode = instantiate(prefab);
            popupNode.parent = _this._root;
            var popupOpacity = popupNode.addComponent(UIOpacity); // 传递参数

            if (popupNode.getComponent(prefab.data.name)) {
              var comp = popupNode.getComponent(prefab.data.name);

              if (comp['onShow']) {
                comp['onShow'](params);
              }
            } // 添加到弹窗栈


            _this._popupStack.push({
              node: popupNode,
              path: prefabPath,
              callback
            }); // 显示遮罩


            _this._refreshMask();

            _this._mask.active = true;
            _this._mask['closeOnMaskClick'] = closeOnMaskClick;

            _this._mask.setSiblingIndex(popupNode.getSiblingIndex() - 1); // 弹出动画


            popupNode.scale.set(0.8, 0.8, 1);
            popupOpacity.opacity = 0;
            tween(popupNode).to(0.2, {
              scale: new Vec3(1.05, 1.05, 1)
            }).to(0.1, {
              scale: Vec3.ONE
            }).start();
            tween(popupOpacity).to(0.2, {
              opacity: 255
            }).start();
          })();
        }
        /**
         * 关闭最上层弹窗
         * @param result 传递给回调的结果
         */


        closePopup(result) {
          if (this._popupStack.length === 0) return;

          var current = this._popupStack.pop();

          var popupNode = current.node; // 关闭动画

          var popupOpacity = popupNode.getComponent(UIOpacity);
          tween(popupNode).to(0.2, {
            scale: new Vec3(0.8, 0.8, 1)
          }).call(() => {
            popupNode.destroy(); // 执行回调

            if (current.callback) {
              current.callback(result);
            } // 隐藏遮罩


            if (this._popupStack.length === 0) {
              this._mask.active = false;
            } else {
              // 调整遮罩层级
              var topPopup = this._popupStack[this._popupStack.length - 1].node;

              this._mask.setSiblingIndex(topPopup.getSiblingIndex() - 1);
            }
          }).start();

          if (popupOpacity) {
            tween(popupOpacity).to(0.2, {
              opacity: 0
            }).start();
          }
        }
        /**
         * 关闭所有弹窗
         */


        closeAllPopups() {
          while (this._popupStack.length > 0) {
            var current = this._popupStack.pop();

            current.node.destroy();
          }

          this._mask.active = false;
        }

        _onMaskClick(event) {
          if (this._mask['closeOnMaskClick']) {
            this.closePopup();
          }
        }

        _extractPopupName(path) {
          var parts = path.split('/');
          return parts[parts.length - 1];
        }

        _loadPopupPrefab(prefabPath, popupName) {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var bundleName = POPUP_BUNDLE_MAP[popupName];

            if (bundleName) {
              var bundlePrefab = yield _this2._loadBundlePrefab(bundleName, popupName);
              if (bundlePrefab) return bundlePrefab;
            }

            var uuid = POPUP_PREFAB_UUID_MAP[popupName];
            if (!uuid) return null;
            return new Promise(resolve => {
              assetManager.loadAny({
                uuid
              }, Prefab, (error, asset) => {
                resolve(error || !asset ? null : asset);
              });
            });
          })();
        }

        _loadBundlePrefab(bundleName, popupName) {
          return _asyncToGenerator(function* () {
            return new Promise(resolve => {
              assetManager.loadBundle(bundleName, (bundleError, bundle) => {
                if (bundleError || !bundle) {
                  console.warn("\u52A0\u8F7D\u5F39\u7A97\u8D44\u6E90\u5305\u5931\u8D25: " + bundleName, bundleError);
                  resolve(null);
                  return;
                }

                bundle.load(popupName, Prefab, (prefabError, prefab) => {
                  if (prefabError || !prefab) {
                    console.warn("\u5F39\u7A97\u8D44\u6E90\u5305\u9884\u5236\u4F53\u52A0\u8F7D\u5931\u8D25 " + bundleName + ":" + popupName, prefabError);
                    resolve(null);
                    return;
                  }

                  resolve(prefab);
                });
              });
            });
          })();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6d4a2ee5b359f4785621b060323b5ce8484bee11.js.map
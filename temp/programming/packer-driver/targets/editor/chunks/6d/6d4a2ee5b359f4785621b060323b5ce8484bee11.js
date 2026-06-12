System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, assetManager, Node, Prefab, instantiate, tween, UITransform, Color, Graphics, Input, Vec3, UIOpacity, Singleton, _dec, _class, _crd, ccclass, POPUP_PREFAB_UUID_MAP, POPUP_BUNDLE_MAP, PopupManager;

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
        constructor(...args) {
          super(...args);
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

          const uiTransform = this._mask.addComponent(UITransform);

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

          const rootTransform = this._root.getComponent(UITransform);

          const width = (_rootTransform$conten = rootTransform == null ? void 0 : rootTransform.contentSize.width) != null ? _rootTransform$conten : 750;
          const height = (_rootTransform$conten2 = rootTransform == null ? void 0 : rootTransform.contentSize.height) != null ? _rootTransform$conten2 : 1334;
          const uiTransform = (_this$_mask$getCompon = this._mask.getComponent(UITransform)) != null ? _this$_mask$getCompon : this._mask.addComponent(UITransform);
          uiTransform.setContentSize(width, height);
          const graphics = (_this$_mask$getCompon2 = this._mask.getComponent(Graphics)) != null ? _this$_mask$getCompon2 : this._mask.addComponent(Graphics);
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


        async openPopup(prefabPath, params, callback, closeOnMaskClick = true) {
          // 加载并实例化弹窗
          const popupName = this._extractPopupName(prefabPath);

          const prefab = await this._loadPopupPrefab(prefabPath, popupName);

          if (!prefab) {
            console.warn(`弹窗预制体加载失败: ${prefabPath}`);
            return;
          }

          const popupNode = instantiate(prefab);
          popupNode.parent = this._root;
          const popupOpacity = popupNode.addComponent(UIOpacity); // 传递参数

          if (popupNode.getComponent(prefab.data.name)) {
            const comp = popupNode.getComponent(prefab.data.name);

            if (comp['onShow']) {
              comp['onShow'](params);
            }
          } // 添加到弹窗栈


          this._popupStack.push({
            node: popupNode,
            path: prefabPath,
            callback
          }); // 显示遮罩


          this._refreshMask();

          this._mask.active = true;
          this._mask['closeOnMaskClick'] = closeOnMaskClick;

          this._mask.setSiblingIndex(popupNode.getSiblingIndex() - 1); // 弹出动画


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
        }
        /**
         * 关闭最上层弹窗
         * @param result 传递给回调的结果
         */


        closePopup(result) {
          if (this._popupStack.length === 0) return;

          const current = this._popupStack.pop();

          const popupNode = current.node; // 关闭动画

          const popupOpacity = popupNode.getComponent(UIOpacity);
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
              const topPopup = this._popupStack[this._popupStack.length - 1].node;

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
            const current = this._popupStack.pop();

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
          const parts = path.split('/');
          return parts[parts.length - 1];
        }

        async _loadPopupPrefab(prefabPath, popupName) {
          const bundleName = POPUP_BUNDLE_MAP[popupName];

          if (bundleName) {
            const bundlePrefab = await this._loadBundlePrefab(bundleName, popupName);
            if (bundlePrefab) return bundlePrefab;
          }

          const uuid = POPUP_PREFAB_UUID_MAP[popupName];
          if (!uuid) return null;
          return new Promise(resolve => {
            assetManager.loadAny({
              uuid
            }, Prefab, (error, asset) => {
              resolve(error || !asset ? null : asset);
            });
          });
        }

        async _loadBundlePrefab(bundleName, popupName) {
          return new Promise(resolve => {
            assetManager.loadBundle(bundleName, (bundleError, bundle) => {
              if (bundleError || !bundle) {
                console.warn(`加载弹窗资源包失败: ${bundleName}`, bundleError);
                resolve(null);
                return;
              }

              bundle.load(popupName, Prefab, (prefabError, prefab) => {
                if (prefabError || !prefab) {
                  console.warn(`弹窗资源包预制体加载失败 ${bundleName}:${popupName}`, prefabError);
                  resolve(null);
                  return;
                }

                resolve(prefab);
              });
            });
          });
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6d4a2ee5b359f4785621b060323b5ce8484bee11.js.map
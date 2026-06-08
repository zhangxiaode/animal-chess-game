System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Prefab, resources, instantiate, tween, UITransform, Color, Sprite, Input, Vec3, UIOpacity, Singleton, _dec, _class, _crd, ccclass, PopupManager;

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
      Node = _cc.Node;
      Prefab = _cc.Prefab;
      resources = _cc.resources;
      instantiate = _cc.instantiate;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Color = _cc.Color;
      Sprite = _cc.Sprite;
      Input = _cc.Input;
      Vec3 = _cc.Vec3;
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d74c1nHNyhAvbPfxpsABXVB", "PopupManager", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Prefab', 'resources', 'instantiate', 'tween', 'UITransform', 'Color', 'Sprite', 'Input', 'EventTouch', 'Vec3', 'UIOpacity']);

      ({
        ccclass
      } = _decorator);

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

          uiTransform.setContentSize(750, 1334);
          uiTransform.anchorX = 0.5;
          uiTransform.anchorY = 0.5;

          const sprite = this._mask.addComponent(Sprite);

          sprite.color = new Color(0, 0, 0, 180);

          this._mask.on(Input.EventType.TOUCH_END, this._onMaskClick, this);

          this._mask.active = false;

          this._root.addChild(this._mask);
        }
        /**
         * 打开弹窗
         * @param prefabPath 预制体路径（resources/prefabs/popups/xxx）
         * @param params 传递给弹窗的参数
         * @param callback 弹窗关闭回调
         * @param closeOnMaskClick 点击遮罩是否关闭
         */


        async openPopup(prefabPath, params, callback, closeOnMaskClick = true) {
          // 加载并实例化弹窗
          const prefab = await resources.load(prefabPath, Prefab);
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
            popupNode.destroy();
            resources.release(current.path); // 执行回调

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
            resources.release(current.path);
          }

          this._mask.active = false;
        }

        _onMaskClick(event) {
          if (this._mask['closeOnMaskClick']) {
            this.closePopup();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6d4a2ee5b359f4785621b060323b5ce8484bee11.js.map
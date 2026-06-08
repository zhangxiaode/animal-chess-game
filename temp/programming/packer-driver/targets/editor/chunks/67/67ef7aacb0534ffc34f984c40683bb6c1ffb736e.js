System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Node, Prefab, resources, instantiate, tween, UITransform, UIOpacity, Singleton, _dec, _class, _crd, ccclass, PAGE_MODULE_MAP, UIManager;

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
      UIOpacity = _cc.UIOpacity;
    }, function (_unresolved_2) {
      Singleton = _unresolved_2.Singleton;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "f66104E9tVFG4oMti5XArOk", "UIManager", undefined);

      __checkObsolete__(['_decorator', 'Node', 'Prefab', 'resources', 'instantiate', 'tween', 'UITransform', 'UIOpacity']);

      ({
        ccclass
      } = _decorator); // 延迟加载页面脚本，避免 UIManager 与页面脚本之间的循环依赖

      PAGE_MODULE_MAP = {
        LoadingPage: async () => (await _context.import("__unresolved_2")).LoadingPage,
        HomePage: async () => (await _context.import("__unresolved_3")).HomePage,
        GamePage: async () => (await _context.import("__unresolved_4")).GamePage,
        RulesPage: async () => (await _context.import("__unresolved_5")).RulesPage
      };

      _export("UIManager", UIManager = (_dec = ccclass('UIManager'), _dec(_class = class UIManager extends (_crd && Singleton === void 0 ? (_reportPossibleCrUseOfSingleton({
        error: Error()
      }), Singleton) : Singleton) {
        constructor(...args) {
          super(...args);
          this._root = null;
          this._pageStack = [];
        }

        /**
         * 初始化UI管理器
         * @param root UI根节点
         */
        init(root) {
          this._root = root;
        }
        /**
         * 注册初始页面（首页）
         * @param pageNode 已经创建的页面节点
         * @param pagePath 页面路径（用于资源管理）
         */


        registerInitialPage(pageNode, pagePath) {
          this._pageStack.push({
            node: pageNode,
            path: pagePath
          });
        }
        /**
         * 打开新页面（支持预制体加载和动态创建）
         * @param prefabPath 预制体路径（resources/prefabs/pages/xxx）或页面名称
         * @param params 传递给页面的参数
         * @param animation 是否显示切换动画
         */


        async openPage(prefabPath, params, animation = true) {
          var _pageNode$getComponen;

          // 隐藏上一个页面
          if (this._pageStack.length > 0) {
            const lastPage = this._pageStack[this._pageStack.length - 1].node;
            lastPage.active = false;
          } // 提取页面名称


          const pageName = this._extractPageName(prefabPath);

          const loader = PAGE_MODULE_MAP[pageName];
          let pageNode;
          let pageScript = null; // 当前页面只有脚本实现，没有对应 prefab，直接走动态创建。

          if (loader) {
            pageNode = new Node(pageName);
            const ScriptClass = await loader();
            pageScript = pageNode.addComponent(ScriptClass);
          } else {
            try {
              // 尝试从预制体加载
              const prefab = await resources.load(prefabPath, Prefab);

              if (!prefab) {
                throw new Error(`预制体不存在：${prefabPath}`);
              }

              pageNode = instantiate(prefab); // 从预制体的脚本中获取 onShow 方法

              if (prefab.data && prefab.data.name && pageNode.getComponent(prefab.data.name)) {
                pageScript = pageNode.getComponent(prefab.data.name);
              }
            } catch (error) {
              console.warn(`预制体加载失败 ${prefabPath}`, error);
              return;
            }
          }

          pageNode.parent = this._root;

          const rootTransform = this._root.getComponent(UITransform);

          const pageTransform = (_pageNode$getComponen = pageNode.getComponent(UITransform)) != null ? _pageNode$getComponen : pageNode.addComponent(UITransform);

          if (rootTransform) {
            pageTransform.setContentSize(rootTransform.contentSize);
          }

          const pageOpacity = pageNode.addComponent(UIOpacity); // 传递参数给页面脚本的 onShow 方法

          if (pageScript && pageScript.onShow) {
            pageScript.onShow(params);
          } // 添加到页面栈


          this._pageStack.push({
            node: pageNode,
            path: prefabPath
          }); // 淡入动画


          if (animation) {
            pageOpacity.opacity = 0;
            tween(pageOpacity).to(0.3, {
              opacity: 255
            }).start();
          }
        }
        /**
         * 从路径中提取页面名称
         * 例如：'prefabs/pages/GamePage' -> 'GamePage'
         */


        _extractPageName(path) {
          const parts = path.split('/');
          return parts[parts.length - 1];
        }
        /**
         * 返回上一页
         * @param animation 是否显示切换动画
         */


        backPage(animation = true) {
          if (this._pageStack.length <= 1) return; // 移除当前页面

          const current = this._pageStack.pop();

          const currentNode = current.node; // 淡出动画

          if (animation) {
            const currentOpacity = currentNode.getComponent(UIOpacity);
            tween(currentNode).call(() => {
              currentNode.destroy();
              resources.release(current.path);
            }).start();

            if (currentOpacity) {
              tween(currentOpacity).to(0.3, {
                opacity: 0
              }).call(() => {
                currentNode.destroy();
                resources.release(current.path);
              }).start();
            }
          } else {
            currentNode.destroy();
            resources.release(current.path);
          } // 显示上一页


          const lastPage = this._pageStack[this._pageStack.length - 1].node;
          lastPage.active = true;

          if (animation) {
            var _lastPage$getComponen;

            const lastPageOpacity = (_lastPage$getComponen = lastPage.getComponent(UIOpacity)) != null ? _lastPage$getComponen : lastPage.addComponent(UIOpacity);
            lastPageOpacity.opacity = 0;
            tween(lastPageOpacity).to(0.3, {
              opacity: 255
            }).start();
          }
        }
        /**
         * 回到首页
         */


        backToHome() {
          var _homePage$getComponen;

          while (this._pageStack.length > 1) {
            const current = this._pageStack.pop();

            current.node.destroy();
            resources.release(current.path);
          }

          const homePage = this._pageStack[0].node;
          homePage.active = true;
          const homePageOpacity = (_homePage$getComponen = homePage.getComponent(UIOpacity)) != null ? _homePage$getComponen : homePage.addComponent(UIOpacity);
          homePageOpacity.opacity = 255;
        }
        /**
         * 获取当前页面
         */


        getCurrentPage() {
          if (this._pageStack.length === 0) return null;
          return this._pageStack[this._pageStack.length - 1].node;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=67ef7aacb0534ffc34f984c40683bb6c1ffb736e.js.map
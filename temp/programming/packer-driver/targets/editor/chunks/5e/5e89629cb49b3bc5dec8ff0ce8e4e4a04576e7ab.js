System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, getCurrentPlatform, _crd, SIDEBAR_CANDIDATES;

  function addToSidebar() {
    const platform = (_crd && getCurrentPlatform === void 0 ? (_reportPossibleCrUseOfgetCurrentPlatform({
      error: Error()
    }), getCurrentPlatform) : getCurrentPlatform)();
    const runtime = globalThis;
    const api = platform === 'wechat' ? runtime.wx : platform === 'douyin' ? runtime.tt : null;

    if (!api) {
      const message = '当前环境不支持添加侧边栏';
      console.warn(`[SidebarUtils] ${message}`);
      showToast(runtime, '暂不支持');
      return Promise.resolve({
        platform,
        success: false,
        supported: false,
        message
      });
    }

    const candidates = platform === 'wechat' || platform === 'douyin' ? SIDEBAR_CANDIDATES[platform] : [];
    const candidate = candidates.find(item => typeof api[item.method] === 'function');

    if (!candidate) {
      const message = `${platform} 当前基础库不支持添加侧边栏`;
      console.warn(`[SidebarUtils] ${message}`);
      showToast(runtime, '暂不支持');
      return Promise.resolve({
        platform,
        success: false,
        supported: false,
        message
      });
    }

    return callSidebarApi(platform, api, candidate);
  }

  function callSidebarApi(platform, api, candidate) {
    return new Promise(resolve => {
      let settled = false;

      const finish = result => {
        if (settled) return;
        settled = true;
        resolve(result);
      };

      const timer = setTimeout(() => {
        const message = '添加侧边栏超时';
        console.warn(`[SidebarUtils] ${message}`);
        showToast(globalThis, '添加超时');
        finish({
          platform,
          success: false,
          supported: true,
          message,
          method: candidate.method
        });
      }, 5000);

      try {
        api[candidate.method]({ ...candidate.options,
          success: res => {
            const message = '添加侧边栏成功';
            clearTimeout(timer);
            console.log(`[SidebarUtils] ${message}`, res);
            showToast(globalThis, '添加成功');
            finish({
              platform,
              success: true,
              supported: true,
              message,
              method: candidate.method
            });
          },
          fail: error => {
            const message = '添加侧边栏失败，请按提示手动添加';
            clearTimeout(timer);
            console.warn(`[SidebarUtils] ${message}`, error);
            showToast(globalThis, '添加失败');
            finish({
              platform,
              success: false,
              supported: true,
              message,
              method: candidate.method,
              error
            });
          }
        });
      } catch (error) {
        const message = '调用添加侧边栏失败';
        clearTimeout(timer);
        console.warn(`[SidebarUtils] ${message}`, error);
        showToast(globalThis, '添加失败');
        finish({
          platform,
          success: false,
          supported: true,
          message,
          method: candidate.method,
          error
        });
      }
    });
  }

  function showToast(runtime, title) {
    var _runtime$wx;

    const api = (_runtime$wx = runtime.wx) != null ? _runtime$wx : runtime.tt;
    if (!api || typeof api.showToast !== 'function') return;
    api.showToast({
      title,
      icon: 'none',
      duration: 1800
    });
  }

  function _reportPossibleCrUseOfgetCurrentPlatform(extras) {
    _reporterNs.report("getCurrentPlatform", "./Constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMiniGamePlatform(extras) {
    _reporterNs.report("MiniGamePlatform", "./Constants", _context.meta, extras);
  }

  _export("addToSidebar", addToSidebar);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      getCurrentPlatform = _unresolved_2.getCurrentPlatform;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "391d2+vrKdAfoyO22CkBdi+", "SidebarUtils", undefined);

      SIDEBAR_CANDIDATES = {
        wechat: [{
          method: 'addToFavorites',
          options: {}
        }, {
          method: 'addToFavorite',
          options: {}
        }, {
          method: 'showFavoriteGuide',
          options: {
            type: 'bar',
            content: '添加到我的小程序，下次打开更方便'
          }
        }, {
          method: 'addFavorite',
          options: {}
        }],
        douyin: [{
          method: 'navigateToScene',
          options: {
            scene: 'sidebar'
          }
        }]
      };

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5e89629cb49b3bc5dec8ff0ce8e4e4a04576e7ab.js.map
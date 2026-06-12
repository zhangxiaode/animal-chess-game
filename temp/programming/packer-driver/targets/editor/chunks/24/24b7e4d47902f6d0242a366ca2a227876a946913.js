System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, getCurrentPlatform, _crd;

  function addToDesktopShortcut() {
    const platform = (_crd && getCurrentPlatform === void 0 ? (_reportPossibleCrUseOfgetCurrentPlatform({
      error: Error()
    }), getCurrentPlatform) : getCurrentPlatform)();
    const runtime = globalThis;

    if (platform === 'wechat' && runtime.wx && typeof runtime.wx.addShortcut === 'function') {
      return callAddShortcut(platform, runtime.wx);
    }

    if (platform === 'douyin' && runtime.tt && typeof runtime.tt.addShortcut === 'function') {
      return callAddShortcut(platform, runtime.tt);
    }

    const message = platform === 'unknown' ? '当前环境不支持添加到桌面' : `${platform} 当前基础库不支持 addShortcut`;
    console.warn(`[ShortcutUtils] ${message}`);
    showToast(runtime, '暂不支持');
    return Promise.resolve({
      platform,
      success: false,
      supported: false,
      message
    });
  }

  function callAddShortcut(platform, api) {
    return new Promise(resolve => {
      let settled = false;

      const finish = result => {
        if (settled) return;
        settled = true;
        resolve(result);
      };

      const timer = setTimeout(() => {
        const message = '添加桌面超时';
        console.warn(`[ShortcutUtils] ${message}`);
        showToast(globalThis, '添加超时');
        finish({
          platform,
          success: false,
          supported: true,
          message
        });
      }, 5000);

      try {
        api.addShortcut({
          success: res => {
            const message = '添加桌面成功';
            clearTimeout(timer);
            console.log(`[ShortcutUtils] ${message}`, res);
            showToast(globalThis, '添加成功');
            finish({
              platform,
              success: true,
              supported: true,
              message
            });
          },
          fail: error => {
            const message = '添加桌面失败，请按提示手动添加';
            clearTimeout(timer);
            console.warn(`[ShortcutUtils] ${message}`, error);
            showToast(globalThis, '添加失败');
            finish({
              platform,
              success: false,
              supported: true,
              message,
              error
            });
          }
        });
      } catch (error) {
        const message = '调用添加桌面失败';
        clearTimeout(timer);
        console.warn(`[ShortcutUtils] ${message}`, error);
        showToast(globalThis, '添加失败');
        finish({
          platform,
          success: false,
          supported: true,
          message,
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

  _export("addToDesktopShortcut", addToDesktopShortcut);

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

      _cclegacy._RF.push({}, "a7ce3QYgW1IcL4RRURjyXrm", "ShortcutUtils", undefined);

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=24b7e4d47902f6d0242a366ca2a227876a946913.js.map
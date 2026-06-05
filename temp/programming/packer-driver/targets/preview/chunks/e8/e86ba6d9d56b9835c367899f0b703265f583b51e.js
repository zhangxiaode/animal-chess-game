System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, GAME_INFO_CONFIG;

  function getCurrentPlatform() {
    var runtime = globalThis;

    if (runtime.wx && typeof runtime.wx.getSystemInfoSync === 'function') {
      return 'wechat';
    }

    if (runtime.tt && typeof runtime.tt.getSystemInfoSync === 'function') {
      return 'douyin';
    }

    return 'unknown';
  }

  function getPlatformGameInfo(platform) {
    var current = platform != null ? platform : getCurrentPlatform();

    if (current === 'douyin') {
      return GAME_INFO_CONFIG.douyin;
    }

    return GAME_INFO_CONFIG.wechat;
  }

  _export({
    getCurrentPlatform: getCurrentPlatform,
    getPlatformGameInfo: getPlatformGameInfo
  });

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9c011cFB2pIGq6/i1hC32dE", "Constants", undefined);

      _export("GAME_INFO_CONFIG", GAME_INFO_CONFIG = {
        wechat: {
          appName: '小游戏模板-微信',
          appId: 'wx232db1d9a7f57fef',
          envVersion: 'develop',
          version: '0.1.0',
          buildNumber: 1,
          apiBaseUrl: 'https://api-wechat.example.com/v1',
          shareTitle: '来试试这个微信小游戏模板',
          shareImage: 'images/share/wechat-share.png',
          privacyPolicyUrl: 'https://example.com/wechat/privacy',
          serviceEmail: 'support-wechat@example.com',
          adUnitIds: {
            banner: 'wechat-banner-unit-id',
            rewardedVideo: 'wechat-rewarded-unit-id',
            interstitial: 'wechat-interstitial-unit-id'
          }
        },
        douyin: {
          appName: '小游戏模板-抖音',
          appId: 'tt_your_app_id',
          envVersion: 'develop',
          version: '0.1.0',
          buildNumber: 1,
          apiBaseUrl: 'https://api-douyin.example.com/v1',
          shareTitle: '来试试这个抖音小游戏模板',
          shareImage: 'images/share/douyin-share.png',
          privacyPolicyUrl: 'https://example.com/douyin/privacy',
          serviceEmail: 'support-douyin@example.com',
          adUnitIds: {
            banner: 'douyin-banner-unit-id',
            rewardedVideo: 'douyin-rewarded-unit-id',
            interstitial: 'douyin-interstitial-unit-id'
          }
        }
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=e86ba6d9d56b9835c367899f0b703265f583b51e.js.map
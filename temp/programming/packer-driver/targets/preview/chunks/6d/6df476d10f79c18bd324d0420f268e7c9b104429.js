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
          appName: '快杀对决',
          appId: 'wx32ba79b13ebc7f5b',
          envVersion: 'develop',
          version: '1.0.0',
          buildNumber: 1,
          apiBaseUrl: 'https://www.chengyaokj.com/apis',
          shareTitle: '来快杀，体验精彩的对弈！',
          shareImage: 'images/logo.png',
          privacyPolicyUrl: 'https://www.chengyaokj.com/animal-chess/privacy.html',
          serviceEmail: 'chengyaokeji4@126.com',
          adUnitIds: {
            banner: 'wechat-banner-unit-id',
            rewardedVideo: 'wechat-rewarded-unit-id',
            interstitial: 'wechat-interstitial-unit-id'
          }
        },
        douyin: {
          appName: '快杀对决',
          appId: 'tt_your_app_id',
          envVersion: 'develop',
          version: '1.0.0',
          buildNumber: 1,
          apiBaseUrl: 'https://www.chengyaokj.com/apis',
          shareTitle: '来快杀，体验精彩的对弈！',
          shareImage: 'images/logo.png',
          privacyPolicyUrl: 'https://www.chengyaokj.com/animal-chess/privacy.html',
          serviceEmail: 'chengyaokeji4@126.com',
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
//# sourceMappingURL=6df476d10f79c18bd324d0420f268e7c9b104429.js.map
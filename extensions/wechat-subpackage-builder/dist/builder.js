'use strict';

exports.load = function() {
  console.log('[wechat-subpackage-builder] loaded');
};

exports.unload = function() {
  console.log('[wechat-subpackage-builder] unloaded');
};

exports.configs = {
  wechatgame: {
    hooks: './hooks',
  },
  'bytedance-mini-game': {
    hooks: './hooks',
  },
};

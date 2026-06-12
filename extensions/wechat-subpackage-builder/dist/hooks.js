'use strict';

const path = require('node:path');
const { processMiniGameSubpackages } = require('../../../tools/wechat-subpackages.cjs');

exports.throwError = true;

function getProjectRoot() {
  if (global.Editor && Editor.Project && Editor.Project.path) {
    return Editor.Project.path;
  }

  return path.resolve(__dirname, '../../..');
}

function resolveProjectPath(value, projectRoot) {
  if (!value) {
    return path.join(projectRoot, 'build');
  }

  if (value.startsWith('project://')) {
    return path.join(projectRoot, value.slice('project://'.length));
  }

  if (path.isAbsolute(value)) {
    return value;
  }

  return path.join(projectRoot, value);
}

exports.onAfterBuild = async function(options) {
  if (!['wechatgame', 'bytedance-mini-game'].includes(options.platform)) {
    return;
  }

  const projectRoot = getProjectRoot();
  const buildPath = resolveProjectPath(options.buildPath || 'project://build', projectRoot);
  const outputName = options.outputName || options.platform;
  const buildRoot = path.join(buildPath, outputName);
  const result = processMiniGameSubpackages({ projectRoot, buildRoot, outputName });

  console.log(`[wechat-subpackage-builder] ${options.platform} subpackages generated: ${result.subpackages.join(', ')}`);
};

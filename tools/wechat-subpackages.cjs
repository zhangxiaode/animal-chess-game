const fs = require('node:fs');
const path = require('node:path');

const subpackageNames = ['resources', 'home', 'game'];

function assertFile(filePath, projectRoot) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required build file: ${path.relative(projectRoot, filePath)}`);
  }
}

function readJson(filePath, projectRoot) {
  assertFile(filePath, projectRoot);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`);
}

function moveBundleToSubpackage(buildRoot, bundleName, projectRoot) {
  const source = path.join(buildRoot, 'assets', bundleName);
  const targetRoot = path.join(buildRoot, 'subpackages');
  const target = path.join(targetRoot, bundleName);

  fs.mkdirSync(targetRoot, { recursive: true });

  if (fs.existsSync(target)) {
    return;
  }

  if (!fs.existsSync(source)) {
    throw new Error(`Missing bundle output: ${path.relative(projectRoot, source)}`);
  }

  fs.renameSync(source, target);
}

function ensureSubpackageEntry(buildRoot, bundleName, projectRoot) {
  const subpackageRoot = path.join(buildRoot, 'subpackages', bundleName);
  const indexPath = path.join(subpackageRoot, 'index.js');
  const gameJsPath = path.join(subpackageRoot, 'game.js');

  assertFile(indexPath, projectRoot);

  fs.writeFileSync(gameJsPath, "require('./index.js');\n");
}

function updateGameJson(gameJsonPath) {
  const gameJson = JSON.parse(fs.readFileSync(gameJsonPath, 'utf8'));
  const existing = Array.isArray(gameJson.subpackages) ? gameJson.subpackages : [];
  const preserved = existing.filter((item) => {
    return item && !subpackageNames.includes(item.name) && !subpackageNames.some((name) => item.root === `subpackages/${name}`);
  });

  gameJson.subpackages = [
    ...preserved,
    ...subpackageNames.map((name) => ({
      name,
      root: `subpackages/${name}`,
    })),
  ];

  writeJson(gameJsonPath, gameJson);
}

function updateSettings(settingsPath) {
  const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
  settings.assets = settings.assets || {};

  const current = Array.isArray(settings.assets.subpackages) ? settings.assets.subpackages : [];
  settings.assets.subpackages = Array.from(new Set([...current, ...subpackageNames]));

  const preloadBundles = Array.isArray(settings.assets.preloadBundles) ? settings.assets.preloadBundles : [];
  const hasResourcesPreload = preloadBundles.some((item) => item && item.bundle === 'resources');
  settings.assets.preloadBundles = hasResourcesPreload
    ? preloadBundles
    : [{ bundle: 'resources' }, ...preloadBundles];

  writeJson(settingsPath, settings);
}

function removeJunkFiles(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      removeJunkFiles(entryPath);
      continue;
    }

    if (entry.name === '.DS_Store' || entry.name.startsWith('._')) {
      fs.unlinkSync(entryPath);
    }
  }
}

function processWechatSubpackages(options = {}) {
  const projectRoot = options.projectRoot || process.cwd();
  const outputName = options.outputName || 'wechatgame';
  const buildRoot = options.buildRoot || path.join(projectRoot, 'build', outputName);
  const settingsPath = path.join(buildRoot, 'src', 'settings.json');
  const gameJsonPath = path.join(buildRoot, 'game.json');

  assertFile(gameJsonPath, projectRoot);
  assertFile(settingsPath, projectRoot);
  readJson(gameJsonPath, projectRoot);
  readJson(settingsPath, projectRoot);

  for (const bundleName of subpackageNames) {
    moveBundleToSubpackage(buildRoot, bundleName, projectRoot);
    ensureSubpackageEntry(buildRoot, bundleName, projectRoot);
  }

  updateGameJson(gameJsonPath);
  updateSettings(settingsPath);
  removeJunkFiles(buildRoot);

  return {
    buildRoot,
    subpackages: [...subpackageNames],
  };
}

module.exports = {
  processMiniGameSubpackages: processWechatSubpackages,
  processWechatSubpackages,
  subpackageNames,
};

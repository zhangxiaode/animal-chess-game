import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const buildRoot = path.join(projectRoot, 'build', 'wechatgame');
const settingsPath = path.join(buildRoot, 'src', 'settings.json');
const gameJsonPath = path.join(buildRoot, 'game.json');
const subpackageNames = ['resources', 'home', 'game'];

function assertFile(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing required build file: ${path.relative(projectRoot, filePath)}`);
  }
}

function readJson(filePath) {
  assertFile(filePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 4)}\n`);
}

function moveBundleToSubpackage(bundleName) {
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

function updateGameJson() {
  const gameJson = readJson(gameJsonPath);
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

function updateSettings() {
  const settings = readJson(settingsPath);
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

function main() {
  assertFile(gameJsonPath);
  assertFile(settingsPath);

  for (const bundleName of subpackageNames) {
    moveBundleToSubpackage(bundleName);
  }

  updateGameJson();
  updateSettings();

  console.log('[wechat-subpackages] Done: resources, home, game');
}

main();

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { processWechatSubpackages } = require('./wechat-subpackages.cjs');

const outputName = process.argv[2] || 'wechatgame';
const result = processWechatSubpackages({ outputName });

console.log(`[wechat-subpackages] Done: ${result.subpackages.join(', ')}`);

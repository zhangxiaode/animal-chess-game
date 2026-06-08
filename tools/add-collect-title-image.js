const fs = require('fs');
const crypto = require('crypto');

const prefabPath = '/Users/zxd/workspace/project/pour-water-game/assets/CollectPopup/Prefab/CollectPopup.prefab';
const metaPath = '/Users/zxd/workspace/project/pour-water-game/assets/CollectPopup/Res/title-img.png.meta';

const prefab = JSON.parse(fs.readFileSync(prefabPath, 'utf8'));
const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));

const spriteFrameUuid = meta.subMetas?.['title-img']?.uuid ?? crypto.randomUUID();
meta.type = 'sprite';
meta.width = 410;
meta.height = 306;
meta.subMetas = meta.subMetas ?? {};
meta.subMetas['title-img'] = {
  ver: '1.0.6',
  uuid: spriteFrameUuid,
  importer: 'sprite-frame',
  rawTextureUuid: meta.uuid,
  trimType: 'auto',
  trimThreshold: 1,
  rotated: false,
  offsetX: 0,
  offsetY: 0,
  trimX: 0,
  trimY: 0,
  width: 410,
  height: 306,
  rawWidth: 410,
  rawHeight: 306,
  borderTop: 0,
  borderBottom: 0,
  borderLeft: 0,
  borderRight: 0,
  subMetas: {},
};

const frame = prefab[11];
if (!frame || frame._name !== 'frame') {
  throw new Error('CollectPopup content/frame node not found at expected id 11');
}

const existingChild = frame._children.find((child) => prefab[child.__id__]?._name === 'titleImg');
if (existingChild) {
  const node = prefab[existingChild.__id__];
  node._contentSize = { __type__: 'cc.Size', width: 150, height: 112 };
  node._trs = {
    __type__: 'TypedArray',
    ctor: 'Float64Array',
    array: [0, 56, 0, 0, 0, 0, 1, 1, 1, 1],
  };
} else {
  const nodeId = prefab.length;
  const spriteId = nodeId + 1;
  const prefabInfoId = nodeId + 2;

  frame._children = [{ __id__: nodeId }, ...frame._children];
  prefab.push({
    __type__: 'cc.Node',
    _name: 'titleImg',
    _parent: { __id__: 11 },
    _components: [{ __id__: spriteId }],
    _prefab: { __id__: prefabInfoId },
    _contentSize: { __type__: 'cc.Size', width: 150, height: 112 },
    _trs: {
      __type__: 'TypedArray',
      ctor: 'Float64Array',
      array: [0, 56, 0, 0, 0, 0, 1, 1, 1, 1],
    },
  });
  prefab.push({
    __type__: 'cc.Sprite',
    _sizeMode: 0,
    _materials: [{ __uuid__: 'eca5d2f2-8ef6-41c2-bbe6-f9c79d09c432' }],
    _spriteFrame: { __uuid__: spriteFrameUuid },
    node: { __id__: nodeId },
  });
  prefab.push({
    __type__: 'cc.PrefabInfo',
    fileId: 'titleImgCollectPopup01',
    root: { __id__: 1 },
    asset: { __id__: 0 },
  });
}

fs.writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`);
fs.writeFileSync(prefabPath, `${JSON.stringify(prefab, null, 2)}\n`);

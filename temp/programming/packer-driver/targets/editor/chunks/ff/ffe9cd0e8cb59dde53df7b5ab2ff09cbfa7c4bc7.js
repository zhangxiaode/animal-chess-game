System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Sprite, UITransform, Vec3, ResManager, _dec, _class, _crd, ccclass, LoadingPage;

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "../framework/ResManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ResManager = _unresolved_2.ResManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "745d7eIhMBMAYiqIp+taaIn", "LoadingPage", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Sprite', 'SpriteFrame', 'UITransform', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("LoadingPage", LoadingPage = (_dec = ccclass('LoadingPage'), _dec(_class = class LoadingPage extends Component {
        async start() {
          await this._createBackground();
        }

        async _createBackground() {
          var _pageTransform$conten, _pageTransform$conten2;

          const pageTransform = this.node.getComponent(UITransform);
          const pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 750;
          const pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 1334;
          const backgroundNode = new Node('Background');
          backgroundNode.parent = this.node;
          backgroundNode.setPosition(Vec3.ZERO);
          backgroundNode.setSiblingIndex(0);
          const backgroundTransform = backgroundNode.addComponent(UITransform);
          backgroundTransform.setContentSize(pageWidth, pageHeight);
          const backgroundSprite = backgroundNode.addComponent(Sprite);
          backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadSpriteFrame('images/loading/bg');
          if (!spriteFrame || !backgroundNode.isValid) return;
          backgroundSprite.spriteFrame = spriteFrame;

          this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          const imageWidth = spriteFrame.originalSize.width || containerWidth;
          const imageHeight = spriteFrame.originalSize.height || containerHeight;
          const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ffe9cd0e8cb59dde53df7b5ab2ff09cbfa7c4bc7.js.map
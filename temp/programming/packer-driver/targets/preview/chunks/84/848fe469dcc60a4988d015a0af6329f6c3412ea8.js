System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Graphics, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, tween, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _class, _crd, ccclass, GamePage;

  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

  function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

  function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

  function _reportPossibleCrUseOfResManager(extras) {
    _reporterNs.report("ResManager", "../framework/ResManager", _context.meta, extras);
  }

  function _reportPossibleCrUseOfUIManager(extras) {
    _reporterNs.report("UIManager", "../framework/UIManager", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Button = _cc.Button;
      Color = _cc.Color;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      Label = _cc.Label;
      Node = _cc.Node;
      Rect = _cc.Rect;
      Size = _cc.Size;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      ResManager = _unresolved_2.ResManager;
    }, function (_unresolved_3) {
      UIManager = _unresolved_3.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b116Z08uZFSLOZ3edZ6E3o", "GamePage", undefined);

      __checkObsolete__(['_decorator', 'Button', 'Color', 'Component', 'Graphics', 'Label', 'Node', 'Rect', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'tween', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("GamePage", GamePage = (_dec = ccclass('GamePage'), _dec(_class = class GamePage extends Component {
        constructor() {
          super(...arguments);
          this._backBtn = null;
          this._pieceBackFrame = null;
          this._turnTipLabel = null;
          this._redInfoLabel = null;
          this._blueInfoLabel = null;
          this._pieces = [];
          this._selectedPiece = null;
          this._currentTurn = 'red';
          this._isBusy = false;
          this._isGameOver = false;
          this._aiProfile = null;
          this._boardCellSize = 160;
          this._boardStartX = -240;
          this._boardStartY = 240;
        }

        start() {
          var _this = this;

          return _asyncToGenerator(function* () {
            yield _this._createUI();
          })();
        }

        _createUI() {
          var _this2 = this;

          return _asyncToGenerator(function* () {
            var _pageTransform$conten, _pageTransform$conten2;

            var pageRoot = _this2.node;
            var pageTransform = pageRoot.getComponent(UITransform);
            var pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 640;
            var pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 960;
            yield _this2._createBackground(pageRoot, pageWidth, pageHeight);
            yield _this2._createSettingButton(pageRoot, pageWidth, pageHeight);
            yield _this2._createTitle(pageRoot, pageWidth, pageHeight);

            _this2._createPlayerInfoBoxes(pageRoot, pageWidth, pageHeight);

            _this2._createTurnTip(pageRoot, pageHeight);

            yield _this2._createBoard(pageRoot, pageHeight);
            yield _this2._createBottomActionButtons(pageRoot, pageHeight);
          })();
        }

        _createBackground(parent, pageWidth, pageHeight) {
          var _this3 = this;

          return _asyncToGenerator(function* () {
            var backgroundNode = new Node('Background');
            backgroundNode.layer = parent.layer;
            backgroundNode.parent = parent;
            backgroundNode.setPosition(Vec3.ZERO);
            backgroundNode.setSiblingIndex(0);
            var backgroundTransform = backgroundNode.addComponent(UITransform);
            backgroundTransform.setContentSize(pageWidth, pageHeight);
            var backgroundSprite = backgroundNode.addComponent(Sprite);
            backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this3._loadBackgroundSpriteFrame();

            if (!spriteFrame || !backgroundNode.isValid) {
              var backgroundGraphics = backgroundNode.addComponent(Graphics);
              backgroundGraphics.fillColor = new Color(245, 247, 250, 255);
              backgroundGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
              backgroundGraphics.fill();
              return;
            }

            backgroundSprite.spriteFrame = spriteFrame;

            _this3._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
          })();
        }

        _loadBackgroundSpriteFrame() {
          var _this4 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/bg/spriteFrame', 'images/play/bg'], SpriteFrame);
            if (spriteFrame) return _this4._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this4._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          var originalSize = spriteFrame.originalSize;
          var imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          var imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          var scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        _ensureSpriteFrameSize(spriteFrame, fallbackWidth, fallbackHeight) {
          if (fallbackWidth === void 0) {
            fallbackWidth = 0;
          }

          if (fallbackHeight === void 0) {
            fallbackHeight = 0;
          }

          var rect = spriteFrame.rect;
          var originalSize = spriteFrame.originalSize;
          var width = (rect == null ? void 0 : rect.width) || (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || fallbackWidth;
          var height = (rect == null ? void 0 : rect.height) || (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || fallbackHeight;

          if (width > 0 && height > 0) {
            if (!rect || !rect.width || !rect.height) {
              spriteFrame.rect = new Rect(0, 0, width, height);
            }

            if (!originalSize || !originalSize.width || !originalSize.height) {
              spriteFrame.originalSize = new Size(width, height);
            }

            spriteFrame.offset = Vec2.ZERO;
          }

          return spriteFrame;
        }

        _createSettingButton(parent, pageWidth, pageHeight) {
          var _this5 = this;

          return _asyncToGenerator(function* () {
            var buttonSize = 96;
            var margin = 36;
            var settingBtnNode = new Node('SettingButton');
            settingBtnNode.layer = parent.layer;
            settingBtnNode.parent = parent;
            settingBtnNode.setPosition(-pageWidth / 2 + buttonSize / 2 + margin, pageHeight / 2 - buttonSize / 2 - margin, 0);
            var settingBtnTransform = settingBtnNode.addComponent(UITransform);
            settingBtnTransform.setContentSize(buttonSize, buttonSize);
            var settingSprite = settingBtnNode.addComponent(Sprite);
            settingSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            _this5._backBtn = settingBtnNode.addComponent(Button);
            _this5._backBtn.interactable = true;

            _this5._backBtn.node.on(Button.EventType.CLICK, _this5._onBack, _this5);

            var spriteFrame = yield _this5._loadSettingSpriteFrame();

            if (!spriteFrame || !settingBtnNode.isValid) {
              console.warn('[GamePage] 设置按钮图片加载失败: images/play/setting');
              return;
            }

            settingSprite.spriteFrame = spriteFrame;
          })();
        }

        _loadSettingSpriteFrame() {
          var _this6 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/setting/spriteFrame', 'images/play/setting'], SpriteFrame);
            if (spriteFrame) return _this6._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/setting/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this6._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _createTitle(parent, pageWidth, pageHeight) {
          var _this7 = this;

          return _asyncToGenerator(function* () {
            var titleWidth = 488;
            var titleHeight = 154;
            var topMargin = 22;
            var titleNode = new Node('Title');
            titleNode.layer = parent.layer;
            titleNode.parent = parent;
            titleNode.setPosition(0, pageHeight / 2 - titleHeight / 2 - topMargin, 0);
            var titleTransform = titleNode.addComponent(UITransform);
            titleTransform.setContentSize(titleWidth, titleHeight);
            var titleSprite = titleNode.addComponent(Sprite);
            titleSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this7._loadTitleSpriteFrame();

            if (!spriteFrame || !titleNode.isValid) {
              console.warn('[GamePage] 标题背景图片加载失败: images/play/title_bg');
            } else {
              titleSprite.spriteFrame = spriteFrame;
            }

            var labelNode = new Node('TitleLabel');
            labelNode.layer = parent.layer;
            labelNode.parent = titleNode;
            labelNode.setPosition(Vec3.ZERO);
            var labelTransform = labelNode.addComponent(UITransform);
            labelTransform.setContentSize(titleWidth, titleHeight);
            var titleLabel = labelNode.addComponent(Label);
            titleLabel.string = '欢乐斗兽棋';
            titleLabel.fontSize = 48;
            titleLabel.color = new Color(255, 255, 255, 255);
            titleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
            titleLabel.verticalAlign = Label.VerticalAlign.CENTER;
          })();
        }

        _loadTitleSpriteFrame() {
          var _this8 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/title_bg/spriteFrame', 'images/play/title_bg'], SpriteFrame);
            if (spriteFrame) return _this8._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/title_bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this8._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _createPlayerInfoBoxes(parent, pageWidth, pageHeight) {
          var boxWidth = 294;
          var boxHeight = 164;
          var centerY = pageHeight / 2 - 352;
          var centerOffsetX = pageWidth * 0.26;
          this._redInfoLabel = this._createPlayerInfoBox(parent, 'RedPlayerBox', '玩家红方 8枚', new Vec3(-centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(224, 68, 68, 255));
          this._blueInfoLabel = this._createPlayerInfoBox(parent, 'BluePlayerBox', 'AI蓝方 8枚', new Vec3(centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(70, 142, 230, 255));
        }

        _createPlayerInfoBox(parent, nodeName, text, position, width, height, accentColor) {
          var boxNode = new Node(nodeName);
          boxNode.layer = parent.layer;
          boxNode.parent = parent;
          boxNode.setPosition(position);
          var boxTransform = boxNode.addComponent(UITransform);
          boxTransform.setContentSize(width, height);
          var boxGraphics = boxNode.addComponent(Graphics);
          boxGraphics.fillColor = new Color(5, 88, 55, 150);
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.fill();
          boxGraphics.strokeColor = accentColor;
          boxGraphics.lineWidth = 4;
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.stroke();
          var labelNode = new Node('Label');
          labelNode.layer = parent.layer;
          labelNode.parent = boxNode;
          labelNode.setPosition(Vec3.ZERO);
          var labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(width, height);
          var label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = 32;
          label.lineHeight = 42;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          return label;
        }

        _createTurnTip(parent, pageHeight) {
          var tipWidth = 360;
          var tipHeight = 72;
          var tipNode = new Node('TurnTip');
          tipNode.layer = parent.layer;
          tipNode.parent = parent;
          tipNode.setPosition(0, pageHeight / 2 - 560, 0);
          var tipTransform = tipNode.addComponent(UITransform);
          tipTransform.setContentSize(tipWidth, tipHeight);
          this._turnTipLabel = tipNode.addComponent(Label);
          this._turnTipLabel.string = '红方回合 - 翻开暗子或选择己方棋子';
          this._turnTipLabel.fontSize = 30;
          this._turnTipLabel.color = new Color(255, 255, 255, 255);
          this._turnTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._turnTipLabel.verticalAlign = Label.VerticalAlign.CENTER;
        }

        _createBoard(parent, pageHeight) {
          var _this9 = this;

          return _asyncToGenerator(function* () {
            var boardSize = 750;
            var boardNode = new Node('Board');
            boardNode.layer = parent.layer;
            boardNode.parent = parent;
            boardNode.setPosition(0, pageHeight / 2 - 990, 0);
            var boardTransform = boardNode.addComponent(UITransform);
            boardTransform.setContentSize(boardSize, boardSize);
            var boardSprite = boardNode.addComponent(Sprite);
            boardSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this9._loadBoardSpriteFrame();

            if (!spriteFrame || !boardNode.isValid) {
              console.warn('[GamePage] 棋盘背景图片加载失败: images/play/play_bg');
              return;
            }

            boardSprite.spriteFrame = spriteFrame;
            yield _this9._createPieces(boardNode);
          })();
        }

        _loadBoardSpriteFrame() {
          var _this10 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst(['images/play/play_bg/spriteFrame', 'images/play/play_bg'], SpriteFrame);
            if (spriteFrame) return _this10._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load('images/play/play_bg/texture', Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this10._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _createPieces(boardNode) {
          var _this11 = this;

          return _asyncToGenerator(function* () {
            _this11._pieceBackFrame = yield _this11._loadImageSpriteFrame('images/play/piece_bg');

            if (!_this11._pieceBackFrame) {
              console.warn('[GamePage] 棋子背面图片加载失败: images/play/piece_bg');
            }

            _this11._pieces = [];
            _this11._selectedPiece = null;
            _this11._currentTurn = 'red';
            _this11._isBusy = false;
            _this11._isGameOver = false;
            _this11._aiProfile = _this11._createRandomAIProfile();

            var pieces = _this11._shufflePieces(_this11._createPieceData());

            var pieceSize = 146;

            _this11._createBoardCells(boardNode);

            pieces.forEach((piece, index) => {
              var row = Math.floor(index / 4);
              var col = index % 4;

              var gamePiece = _this11._createPieceNode(piece, index, row, col, pieceSize, boardNode.layer);

              gamePiece.node.parent = boardNode;
              gamePiece.node.setPosition(_this11._getCellPosition(row, col));

              _this11._pieces.push(gamePiece);
            });

            _this11._refreshGameInfo();
          })();
        }

        _createRandomAIProfile() {
          var profiles = [{
            difficulty: '初级',
            depth: 0,
            mistakeRate: 0.34,
            revealBias: 0.42,
            riskBias: 0.7,
            minThinkTime: 0.35,
            maxThinkTime: 0.95,
            moodTexts: ['蓝方有点犹豫...', '蓝方随手试探', '蓝方想先看一眼局面']
          }, {
            difficulty: '中级',
            depth: 1,
            mistakeRate: 0.18,
            revealBias: 0.24,
            riskBias: 0.35,
            minThinkTime: 0.55,
            maxThinkTime: 1.15,
            moodTexts: ['蓝方正在权衡一步棋', '蓝方观察相邻威胁', '蓝方试着保持节奏']
          }, {
            difficulty: '高级',
            depth: 2,
            mistakeRate: 0.08,
            revealBias: 0.12,
            riskBias: 0.18,
            minThinkTime: 0.8,
            maxThinkTime: 1.45,
            moodTexts: ['蓝方开始算后续变化', '蓝方盯上了关键位置', '蓝方放慢节奏寻找机会']
          }, {
            difficulty: '地狱',
            depth: 3,
            mistakeRate: 0.02,
            revealBias: 0.04,
            riskBias: 0.05,
            minThinkTime: 1.05,
            maxThinkTime: 1.75,
            moodTexts: ['蓝方冷静计算三步变化', '蓝方几乎没有破绽', '蓝方在压缩你的活动空间']
          }];
          return profiles[Math.floor(Math.random() * profiles.length)];
        }

        _createBoardCells(boardNode) {
          var _this12 = this;

          var _loop = function _loop(row) {
            var _loop2 = function _loop2(col) {
              var cellNode = new Node("Cell_" + row + "_" + col);
              cellNode.layer = boardNode.layer;
              cellNode.parent = boardNode;
              cellNode.setPosition(_this12._getCellPosition(row, col));
              var cellTransform = cellNode.addComponent(UITransform);
              cellTransform.setContentSize(_this12._boardCellSize, _this12._boardCellSize);
              var button = cellNode.addComponent(Button);
              button.interactable = true;
              cellNode.on(Button.EventType.CLICK, () => _this12._onCellClick(row, col), _this12);
            };

            for (var col = 0; col < 4; col++) {
              _loop2(col);
            }
          };

          for (var row = 0; row < 4; row++) {
            _loop(row);
          }
        }

        _getCellPosition(row, col) {
          return new Vec3(this._boardStartX + col * this._boardCellSize, this._boardStartY - row * this._boardCellSize, 0);
        }

        _createPieceData() {
          var animals = ['象', '狮', '虎', '豹', '狼', '狗', '猫', '鼠'];
          return [...animals.map(animal => ({
            animal,
            camp: 'red'
          })), ...animals.map(animal => ({
            animal,
            camp: 'blue'
          }))];
        }

        _shufflePieces(pieces) {
          var shuffled = [...pieces];

          for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }

          return shuffled;
        }

        _createPieceNode(piece, id, row, col, size, layer) {
          var pieceNode = new Node((piece.camp === 'red' ? 'Red' : 'Blue') + "Piece_" + piece.animal);
          pieceNode.layer = layer;
          pieceNode.setScale(Vec3.ONE);
          var transform = pieceNode.addComponent(UITransform);
          transform.setContentSize(size, size);
          var button = pieceNode.addComponent(Button);
          button.interactable = true;
          button.transition = Button.Transition.SCALE;
          button.zoomScale = 0.96;
          var backNode = new Node('Back');
          backNode.parent = pieceNode;
          backNode.layer = pieceNode.layer;
          backNode.setPosition(Vec3.ZERO);
          var backTransform = backNode.addComponent(UITransform);
          backTransform.setContentSize(size, size);
          var backSprite = backNode.addComponent(Sprite);
          backSprite.sizeMode = Sprite.SizeMode.CUSTOM;

          if (this._pieceBackFrame) {
            backSprite.spriteFrame = this._pieceBackFrame;
          } else {
            this._drawFallbackPieceBack(backNode, size);
          }

          var frontNode = this._createPieceFrontNode(piece, size, layer);

          frontNode.parent = pieceNode;
          frontNode.layer = layer;
          frontNode.active = false;
          var gamePiece = {
            id,
            row,
            col,
            animal: piece.animal,
            camp: piece.camp,
            node: pieceNode,
            backNode,
            frontNode,
            isRevealed: false,
            isAlive: true
          };
          pieceNode.on(Button.EventType.CLICK, () => this._onPieceClick(gamePiece), this);
          return gamePiece;
        }

        _createPieceFrontNode(piece, size, layer) {
          var frontNode = new Node('Front');
          frontNode.layer = layer;
          frontNode.setPosition(Vec3.ZERO);
          var transform = frontNode.addComponent(UITransform);
          transform.setContentSize(size, size);
          var graphics = frontNode.addComponent(Graphics);
          var half = size / 2;
          graphics.fillColor = new Color(244, 189, 133, 255);
          graphics.roundRect(-half, -half, size, size, 14);
          graphics.fill();
          graphics.strokeColor = piece.camp === 'red' ? new Color(225, 52, 44, 255) : new Color(40, 124, 232, 255);
          graphics.lineWidth = 5;
          graphics.roundRect(-half + 4, -half + 4, size - 8, size - 8, 12);
          graphics.stroke();
          var labelNode = new Node('Label');
          labelNode.parent = frontNode;
          labelNode.layer = layer;
          labelNode.setPosition(Vec3.ZERO);
          var labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(size, size);
          var label = labelNode.addComponent(Label);
          label.string = piece.animal;
          label.fontSize = 76;
          label.lineHeight = 86;
          label.color = piece.camp === 'red' ? new Color(214, 44, 36, 255) : new Color(34, 112, 224, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          return frontNode;
        }

        _drawFallbackPieceBack(pieceNode, size) {
          var graphics = pieceNode.addComponent(Graphics);
          var half = size / 2;
          graphics.fillColor = new Color(147, 92, 46, 255);
          graphics.roundRect(-half, -half, size, size, 14);
          graphics.fill();
          graphics.strokeColor = new Color(190, 130, 75, 255);
          graphics.lineWidth = 4;
          graphics.roundRect(-half + 3, -half + 3, size - 6, size - 6, 12);
          graphics.stroke();
        }

        _onCellClick(row, col) {
          if (this._isBusy || this._isGameOver || this._currentTurn !== 'red' || !this._selectedPiece) return;
          if (this._getAlivePieceAt(row, col)) return;

          if (!this._isAdjacent(this._selectedPiece.row, this._selectedPiece.col, row, col)) {
            this._setTurnTip('只能移动到相邻空格');

            return;
          }

          this._playMoveTurn(this._selectedPiece, row, col);
        }

        _onPieceClick(piece) {
          if (this._isBusy || this._isGameOver || this._currentTurn !== 'red' || !piece.isAlive) return;

          if (!piece.isRevealed) {
            this._playRevealTurn(piece);

            return;
          }

          if (piece.camp === 'red') {
            this._selectPiece(piece);

            return;
          }

          if (!this._selectedPiece) {
            this._setTurnTip('请选择一个红方棋子');

            return;
          }

          if (!this._canMoveTo(this._selectedPiece, piece)) {
            this._setTurnTip('只能攻击相邻的蓝方棋子');

            return;
          }

          if (!this._canCapture(this._selectedPiece, piece)) {
            this._setTurnTip(this._selectedPiece.animal + " \u5403\u4E0D\u4E86 " + piece.animal);

            return;
          }

          this._playCaptureTurn(this._selectedPiece, piece);
        }

        _playRevealTurn(piece) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip('红方翻开棋子...');

          this._revealPiece(piece, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('blue');

            this._scheduleAITurn();
          });
        }

        _playCaptureTurn(attacker, target) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip(attacker.animal === target.animal ? "\u7EA2\u65B9 " + attacker.animal + " \u4E0E " + target.animal + " \u706B\u5E76" : "\u7EA2\u65B9 " + attacker.animal + " \u5403\u6389 " + target.animal);

          this._capturePiece(attacker, target, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('blue');

            this._scheduleAITurn();
          });
        }

        _playMoveTurn(piece, row, col) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip("\u7EA2\u65B9 " + piece.animal + " \u79FB\u52A8");

          this._movePiece(piece, row, col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('blue');

            this._scheduleAITurn();
          });
        }

        _scheduleAITurn() {
          var profile = this._aiProfile;
          this._isBusy = true;

          if (profile) {
            this._setTurnTip(this._pickRandom(profile.moodTexts));
          }

          var delay = profile ? profile.minThinkTime + Math.random() * (profile.maxThinkTime - profile.minThinkTime) : 0.55;
          this.scheduleOnce(() => this._runAITurn(), delay);
        }

        _runAITurn() {
          if (this._isGameOver || this._currentTurn !== 'blue') return;

          var action = this._chooseAIAction();

          if (!action) {
            this._switchTurn('red');

            return;
          }

          if (action.type === 'capture') {
            var attacker = this._getPieceById(action.pieceId);

            var target = this._getPieceById(action.targetId);

            if (!attacker || !target) {
              this._switchTurn('red');

              return;
            }

            this._setTurnTip(attacker.animal === target.animal ? "\u84DD\u65B9 " + attacker.animal + " \u4E0E " + target.animal + " \u706B\u5E76" : "\u84DD\u65B9 " + attacker.animal + " \u5403\u6389 " + target.animal);

            this._capturePiece(attacker, target, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn('red');
            });

            return;
          }

          if (action.type === 'reveal') {
            var _piece = this._getPieceById(action.pieceId);

            if (!_piece) {
              this._switchTurn('red');

              return;
            }

            this._setTurnTip('蓝方翻开棋子...');

            this._revealPiece(_piece, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn('red');
            });

            return;
          }

          var piece = this._getPieceById(action.pieceId);

          if (!piece || action.row === undefined || action.col === undefined) {
            this._switchTurn('red');

            return;
          }

          this._setTurnTip("\u84DD\u65B9 " + piece.animal + " \u79FB\u52A8");

          this._movePiece(piece, action.row, action.col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('red');
          });
        }

        _chooseAIAction() {
          var _this$_aiProfile, _humanPool$pickIndex;

          var profile = (_this$_aiProfile = this._aiProfile) != null ? _this$_aiProfile : this._createRandomAIProfile();

          var simPieces = this._createSimPieces();

          var actions = this._generateSimActions(simPieces, 'blue');

          if (actions.length <= 0) return null;
          var scoredActions = actions.map(action => {
            var nextPieces = this._applySimAction(simPieces, action);

            var futureScore = profile.depth <= 0 ? this._evaluateSimBoard(nextPieces, profile) : this._scoreFutureBoard(nextPieces, 'red', profile.depth, profile);
            return _extends({}, action, {
              score: this._scoreImmediateAction(simPieces, action, 'blue', profile) + futureScore
            });
          }).sort((a, b) => b.score - a.score);

          if (Math.random() < profile.mistakeRate) {
            var mistakePoolSize = Math.max(1, Math.ceil(scoredActions.length * 0.45));
            var mistakePool = scoredActions.slice(-mistakePoolSize);
            return this._pickRandom(mistakePool);
          }

          var humanPool = scoredActions.slice(0, Math.min(scoredActions.length, profile.difficulty === '地狱' ? 1 : 3));
          var pickIndex = profile.difficulty === '地狱' ? 0 : Math.floor(Math.random() * humanPool.length);
          return (_humanPool$pickIndex = humanPool[pickIndex]) != null ? _humanPool$pickIndex : scoredActions[0];
        }

        _createSimPieces() {
          return this._pieces.map(piece => ({
            id: piece.id,
            row: piece.row,
            col: piece.col,
            animal: piece.animal,
            camp: piece.camp,
            isRevealed: piece.isRevealed,
            isAlive: piece.isAlive
          }));
        }

        _scoreFutureBoard(pieces, turn, depth, profile) {
          var winner = this._getSimWinner(pieces);

          if (winner === 'blue') return 10000 + depth * 100;
          if (winner === 'red') return -10000 - depth * 100;
          if (winner === 'draw') return 0;
          if (depth <= 0) return this._evaluateSimBoard(pieces, profile);

          var actions = this._generateSimActions(pieces, turn).map(action => _extends({}, action, {
            score: this._scoreImmediateAction(pieces, action, turn, profile)
          })).sort((a, b) => turn === 'blue' ? b.score - a.score : a.score - b.score).slice(0, profile.depth >= 2 ? 10 : 16);

          if (actions.length <= 0) return this._evaluateSimBoard(pieces, profile);
          var scores = actions.map(action => {
            var nextPieces = this._applySimAction(pieces, action);

            return this._scoreFutureBoard(nextPieces, turn === 'blue' ? 'red' : 'blue', depth - 1, profile);
          });
          return turn === 'blue' ? Math.max(...scores) : Math.min(...scores);
        }

        _generateSimActions(pieces, camp) {
          var actions = [];
          var ownPieces = pieces.filter(piece => piece.isAlive && piece.camp === camp);
          var enemyPieces = pieces.filter(piece => piece.isAlive && piece.camp !== camp);
          ownPieces.filter(piece => piece.isRevealed).forEach(attacker => {
            enemyPieces.filter(piece => piece.isRevealed).forEach(target => {
              if (!this._isAdjacent(attacker.row, attacker.col, target.row, target.col)) return;
              if (!this._canSimCapture(attacker, target)) return;
              actions.push({
                type: 'capture',
                pieceId: attacker.id,
                targetId: target.id,
                score: 0
              });
            });

            this._getSimEmptyAdjacentCells(pieces, attacker.row, attacker.col).forEach(cell => {
              actions.push({
                type: 'move',
                pieceId: attacker.id,
                row: cell.row,
                col: cell.col,
                score: 0
              });
            });
          });
          pieces.filter(piece => piece.isAlive && !piece.isRevealed).forEach(piece => {
            actions.push({
              type: 'reveal',
              pieceId: piece.id,
              score: 0
            });
          });
          return actions;
        }

        _applySimAction(pieces, action) {
          var nextPieces = pieces.map(piece => _extends({}, piece));
          var piece = nextPieces.find(item => item.id === action.pieceId);
          if (!piece) return nextPieces;

          if (action.type === 'reveal') {
            piece.isRevealed = true;
            return nextPieces;
          }

          if (action.type === 'move') {
            if (action.row !== undefined && action.col !== undefined) {
              piece.row = action.row;
              piece.col = action.col;
            }

            return nextPieces;
          }

          var target = nextPieces.find(item => item.id === action.targetId);
          if (!target) return nextPieces;

          if (piece.animal === target.animal) {
            piece.isAlive = false;
            target.isAlive = false;
            return nextPieces;
          }

          target.isAlive = false;
          piece.row = target.row;
          piece.col = target.col;
          return nextPieces;
        }

        _scoreImmediateAction(pieces, action, camp, profile) {
          var piece = pieces.find(item => item.id === action.pieceId);
          if (!piece) return 0;

          if (action.type === 'capture') {
            var target = pieces.find(item => item.id === action.targetId);
            if (!target) return 0;
            var targetValue = this._getAnimalPower(target.animal) * 12;

            if (piece.animal === target.animal) {
              return targetValue * 0.45 - this._getAnimalPower(piece.animal) * profile.riskBias;
            }

            return targetValue - this._getAnimalPower(piece.animal) * profile.riskBias;
          }

          if (action.type === 'reveal') {
            var centerBias = 2 - (Math.abs(piece.row - 1.5) + Math.abs(piece.col - 1.5)) * 0.2;
            return profile.revealBias * 10 + centerBias;
          }

          var enemyPieces = pieces.filter(item => item.isAlive && item.isRevealed && item.camp !== camp);
          if (enemyPieces.length <= 0 || action.row === undefined || action.col === undefined) return 1;
          var nearestDistance = Math.min(...enemyPieces.map(enemy => Math.abs(enemy.row - action.row) + Math.abs(enemy.col - action.col)));
          return 4 - nearestDistance - profile.riskBias;
        }

        _evaluateSimBoard(pieces, profile) {
          var blueScore = this._evaluateCampInSim(pieces, 'blue', profile);

          var redScore = this._evaluateCampInSim(pieces, 'red', profile);

          return blueScore - redScore;
        }

        _evaluateCampInSim(pieces, camp, profile) {
          var ownPieces = pieces.filter(piece => piece.isAlive && piece.camp === camp);
          var enemyPieces = pieces.filter(piece => piece.isAlive && piece.camp !== camp);
          var materialScore = ownPieces.reduce((score, piece) => score + (piece.isRevealed ? this._getAnimalPower(piece.animal) : 4.5) * 18, 0);
          var revealedScore = ownPieces.filter(piece => piece.isRevealed).length * 2;
          var mobilityScore = ownPieces.filter(piece => piece.isRevealed).reduce((score, piece) => score + this._getSimEmptyAdjacentCells(pieces, piece.row, piece.col).length, 0);
          var threatScore = ownPieces.filter(piece => piece.isRevealed).reduce((score, piece) => score + enemyPieces.filter(enemy => enemy.isRevealed && this._isAdjacent(piece.row, piece.col, enemy.row, enemy.col) && this._canSimCapture(piece, enemy)).length * 14, 0);
          return materialScore + revealedScore + mobilityScore + threatScore - profile.riskBias;
        }

        _getSimWinner(pieces) {
          var redAlive = pieces.some(piece => piece.isAlive && piece.camp === 'red');
          var blueAlive = pieces.some(piece => piece.isAlive && piece.camp === 'blue');
          if (!redAlive && !blueAlive) return 'draw';
          if (!redAlive) return 'blue';
          if (!blueAlive) return 'red';
          return null;
        }

        _getSimEmptyAdjacentCells(pieces, row, col) {
          var candidates = [{
            row: row - 1,
            col
          }, {
            row: row + 1,
            col
          }, {
            row,
            col: col - 1
          }, {
            row,
            col: col + 1
          }];
          return candidates.filter(cell => cell.row >= 0 && cell.row < 4 && cell.col >= 0 && cell.col < 4 && !pieces.some(piece => piece.isAlive && piece.row === cell.row && piece.col === cell.col));
        }

        _canSimCapture(attacker, target) {
          if (attacker.animal === target.animal) return true;
          if (attacker.animal === '鼠' && target.animal === '象') return true;
          if (attacker.animal === '象' && target.animal === '鼠') return false;
          return this._getAnimalPower(attacker.animal) > this._getAnimalPower(target.animal);
        }

        _getPieceById(pieceId) {
          var _this$_pieces$find;

          if (pieceId === undefined) return null;
          return (_this$_pieces$find = this._pieces.find(piece => piece.id === pieceId && piece.isAlive)) != null ? _this$_pieces$find : null;
        }

        _pickRandom(items) {
          return items[Math.floor(Math.random() * items.length)];
        }

        _revealPiece(piece, onComplete) {
          var button = piece.node.getComponent(Button);
          if (button) button.interactable = false;
          tween(piece.node).to(0.12, {
            scale: new Vec3(0.04, 1.06, 1)
          }, {
            easing: 'quadIn'
          }).call(() => {
            piece.isRevealed = true;
            piece.backNode.active = false;
            piece.frontNode.active = true;
            if (button) button.interactable = true;

            this._refreshGameInfo();
          }).to(0.16, {
            scale: Vec3.ONE
          }, {
            easing: 'backOut'
          }).call(onComplete).start();
        }

        _capturePiece(attacker, target, onComplete) {
          if (attacker.animal === target.animal) {
            this._tradePieces(attacker, target, onComplete);

            return;
          }

          var targetPosition = target.node.position.clone();
          var targetButton = target.node.getComponent(Button);
          var attackerButton = attacker.node.getComponent(Button);
          if (targetButton) targetButton.interactable = false;
          if (attackerButton) attackerButton.interactable = false;
          target.isAlive = false;
          attacker.row = target.row;
          attacker.col = target.col;
          tween(target.node).to(0.12, {
            scale: new Vec3(0.2, 0.2, 1)
          }, {
            easing: 'quadIn'
          }).call(() => {
            target.node.active = false;
          }).start();
          tween(attacker.node).to(0.2, {
            position: targetPosition
          }, {
            easing: 'quadOut'
          }).call(() => {
            attacker.node.setScale(Vec3.ONE);
            if (attackerButton) attackerButton.interactable = true;

            this._refreshGameInfo();

            onComplete();
          }).start();
        }

        _tradePieces(attacker, target, onComplete) {
          var targetButton = target.node.getComponent(Button);
          var attackerButton = attacker.node.getComponent(Button);
          if (targetButton) targetButton.interactable = false;
          if (attackerButton) attackerButton.interactable = false;
          target.isAlive = false;
          attacker.isAlive = false;
          tween(target.node).to(0.16, {
            scale: new Vec3(0.2, 0.2, 1)
          }, {
            easing: 'quadIn'
          }).call(() => {
            target.node.active = false;
          }).start();
          tween(attacker.node).to(0.16, {
            scale: new Vec3(0.2, 0.2, 1)
          }, {
            easing: 'quadIn'
          }).call(() => {
            attacker.node.active = false;

            this._refreshGameInfo();

            onComplete();
          }).start();
        }

        _movePiece(piece, row, col, onComplete) {
          var button = piece.node.getComponent(Button);
          if (button) button.interactable = false;
          piece.row = row;
          piece.col = col;
          tween(piece.node).to(0.2, {
            position: this._getCellPosition(row, col)
          }, {
            easing: 'quadOut'
          }).call(() => {
            piece.node.setScale(Vec3.ONE);
            if (button) button.interactable = true;

            this._refreshGameInfo();

            onComplete();
          }).start();
        }

        _selectPiece(piece) {
          if (this._selectedPiece === piece) {
            this._clearSelection();

            this._setTurnTip('红方回合 - 翻开暗子或选择己方棋子');

            return;
          }

          this._clearSelection();

          this._selectedPiece = piece;
          piece.node.setScale(new Vec3(1.08, 1.08, 1));

          this._setTurnTip("\u5DF2\u9009\u62E9\u7EA2\u65B9 " + piece.animal);
        }

        _clearSelection() {
          if (!this._selectedPiece) return;

          if (this._selectedPiece.node.isValid) {
            this._selectedPiece.node.setScale(Vec3.ONE);
          }

          this._selectedPiece = null;
        }

        _switchTurn(turn) {
          this._currentTurn = turn;
          this._isBusy = false;

          this._clearSelection();

          this._refreshGameInfo();
        }

        _finishTurnIfNeeded() {
          var winner = this._getWinner();

          if (!winner) return false;
          this._isGameOver = true;
          this._isBusy = false;

          this._clearSelection();

          if (winner === 'draw') {
            this._setTurnTip('双方同归于尽，平局！');
          } else {
            this._setTurnTip(winner === 'red' ? '红方获胜！蓝方棋子已被吃完' : '蓝方获胜！红方棋子已被吃完');
          }

          this._setAllPieceButtonsEnabled(false);

          this._refreshGameInfo();

          return true;
        }

        _getWinner() {
          var redAlive = this._pieces.some(piece => piece.isAlive && piece.camp === 'red');

          var blueAlive = this._pieces.some(piece => piece.isAlive && piece.camp === 'blue');

          if (!redAlive && !blueAlive) return 'draw';
          if (!redAlive) return 'blue';
          if (!blueAlive) return 'red';
          return null;
        }

        _setAllPieceButtonsEnabled(enabled) {
          this._pieces.forEach(piece => {
            var button = piece.node.getComponent(Button);
            if (button) button.interactable = enabled;
          });
        }

        _refreshGameInfo() {
          var redAlive = this._countAlivePieces('red');

          var blueAlive = this._countAlivePieces('blue');

          var redRevealed = this._countRevealedPieces('red');

          var blueRevealed = this._countRevealedPieces('blue');

          if (this._redInfoLabel) {
            this._redInfoLabel.string = "\u73A9\u5BB6\u7EA2\u65B9 " + redAlive + "\u679A\n\u660E\u5B50 " + redRevealed;
          }

          if (this._blueInfoLabel) {
            var _this$_aiProfile$diff, _this$_aiProfile2;

            this._blueInfoLabel.string = "AI" + ((_this$_aiProfile$diff = (_this$_aiProfile2 = this._aiProfile) == null ? void 0 : _this$_aiProfile2.difficulty) != null ? _this$_aiProfile$diff : '蓝方') + " " + blueAlive + "\u679A\n\u660E\u5B50 " + blueRevealed;
          }

          if (!this._isGameOver) {
            this._setTurnTip(this._currentTurn === 'red' ? '红方回合 - 翻开暗子或选择己方棋子' : '蓝方回合 - AI思考中');
          }
        }

        _countAlivePieces(camp) {
          return this._pieces.filter(piece => piece.isAlive && piece.camp === camp).length;
        }

        _countRevealedPieces(camp) {
          return this._pieces.filter(piece => piece.isAlive && piece.isRevealed && piece.camp === camp).length;
        }

        _setTurnTip(text) {
          if (this._turnTipLabel) {
            this._turnTipLabel.string = text;
          }
        }

        _canMoveTo(attacker, target) {
          if (!attacker.isAlive || !target.isAlive || !attacker.isRevealed || !target.isRevealed) return false;
          if (attacker.camp === target.camp) return false;
          return this._isAdjacent(attacker.row, attacker.col, target.row, target.col);
        }

        _isAdjacent(fromRow, fromCol, toRow, toCol) {
          return Math.abs(fromRow - toRow) + Math.abs(fromCol - toCol) === 1;
        }

        _getAlivePieceAt(row, col) {
          var _this$_pieces$find2;

          return (_this$_pieces$find2 = this._pieces.find(piece => piece.isAlive && piece.row === row && piece.col === col)) != null ? _this$_pieces$find2 : null;
        }

        _getEmptyAdjacentCells(row, col) {
          var candidates = [{
            row: row - 1,
            col
          }, {
            row: row + 1,
            col
          }, {
            row,
            col: col - 1
          }, {
            row,
            col: col + 1
          }];
          return candidates.filter(cell => cell.row >= 0 && cell.row < 4 && cell.col >= 0 && cell.col < 4 && !this._getAlivePieceAt(cell.row, cell.col));
        }

        _canCapture(attacker, target) {
          if (attacker.animal === target.animal) return true;
          if (attacker.animal === '鼠' && target.animal === '象') return true;
          if (attacker.animal === '象' && target.animal === '鼠') return false;
          return this._getAnimalPower(attacker.animal) > this._getAnimalPower(target.animal);
        }

        _getAnimalPower(animal) {
          var _powers$animal;

          var powers = {
            '鼠': 1,
            '猫': 2,
            '狗': 3,
            '狼': 4,
            '豹': 5,
            '虎': 6,
            '狮': 7,
            '象': 8
          };
          return (_powers$animal = powers[animal]) != null ? _powers$animal : 0;
        }

        _createBottomActionButtons(parent, pageHeight) {
          var _this13 = this;

          return _asyncToGenerator(function* () {
            var centerY = -pageHeight / 2 + 102;
            var spacing = 150;
            yield _this13._createBottomActionButton(parent, 'RestartButton', 'images/play/icon1', '重来', new Vec3(-spacing, centerY, 0));
            yield _this13._createBottomActionButton(parent, 'UndoButton', 'images/play/icon2', '悔棋', new Vec3(0, centerY, 0));
            yield _this13._createBottomActionButton(parent, 'HintButton', 'images/play/icon3', '提示', new Vec3(spacing, centerY, 0));
          })();
        }

        _createBottomActionButton(parent, nodeName, iconPath, text, position) {
          var _this14 = this;

          return _asyncToGenerator(function* () {
            var buttonWidth = 120;
            var buttonHeight = 132;
            var iconSize = 74;
            var buttonNode = new Node(nodeName);
            buttonNode.layer = parent.layer;
            buttonNode.parent = parent;
            buttonNode.setPosition(position);
            var buttonTransform = buttonNode.addComponent(UITransform);
            buttonTransform.setContentSize(buttonWidth, buttonHeight);
            var button = buttonNode.addComponent(Button);
            button.interactable = true;
            var iconNode = new Node('Icon');
            iconNode.layer = parent.layer;
            iconNode.parent = buttonNode;
            iconNode.setPosition(0, 24, 0);
            var iconTransform = iconNode.addComponent(UITransform);
            iconTransform.setContentSize(iconSize, iconSize);
            var iconSprite = iconNode.addComponent(Sprite);
            iconSprite.sizeMode = Sprite.SizeMode.CUSTOM;
            var spriteFrame = yield _this14._loadImageSpriteFrame(iconPath);

            if (!spriteFrame || !buttonNode.isValid) {
              console.warn("[GamePage] \u5E95\u90E8\u6309\u94AE\u56FE\u6807\u52A0\u8F7D\u5931\u8D25: " + iconPath);
            } else {
              iconSprite.spriteFrame = spriteFrame;
            }

            var labelNode = new Node('Label');
            labelNode.layer = parent.layer;
            labelNode.parent = buttonNode;
            labelNode.setPosition(0, -46, 0);
            var labelTransform = labelNode.addComponent(UITransform);
            labelTransform.setContentSize(buttonWidth, 40);
            var label = labelNode.addComponent(Label);
            label.string = text;
            label.fontSize = 28;
            label.color = new Color(255, 255, 255, 255);
            label.horizontalAlign = Label.HorizontalAlign.CENTER;
            label.verticalAlign = Label.VerticalAlign.CENTER;
          })();
        }

        _loadImageSpriteFrame(path) {
          var _this15 = this;

          return _asyncToGenerator(function* () {
            var spriteFrame = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().loadFirst([path + "/spriteFrame", path], SpriteFrame);
            if (spriteFrame) return _this15._ensureSpriteFrameSize(spriteFrame);
            var texture = yield (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
              error: Error()
            }), ResManager) : ResManager).getInstance().load(path + "/texture", Texture2D);
            if (!texture) return null;
            var generatedSpriteFrame = new SpriteFrame();
            generatedSpriteFrame.texture = texture;
            return _this15._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
          })();
        }

        _onBack() {
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().backPage();
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=848fe469dcc60a4988d015a0af6329f6c3412ea8.js.map
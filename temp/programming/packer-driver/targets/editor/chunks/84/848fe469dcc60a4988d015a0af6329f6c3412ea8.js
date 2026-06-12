System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, assetManager, Button, Color, Component, Graphics, js, Label, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, tween, UITransform, Vec2, Vec3, SoundManager, UIManager, _dec, _class, _crd, ccclass, GamePage;

  function _reportPossibleCrUseOfSoundManager(extras) {
    _reporterNs.report("SoundManager", "../framework/SoundManager", _context.meta, extras);
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
      assetManager = _cc.assetManager;
      Button = _cc.Button;
      Color = _cc.Color;
      Component = _cc.Component;
      Graphics = _cc.Graphics;
      js = _cc.js;
      Label = _cc.Label;
      Node = _cc.Node;
      Rect = _cc.Rect;
      resources = _cc.resources;
      Size = _cc.Size;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
      Texture2D = _cc.Texture2D;
      tween = _cc.tween;
      UITransform = _cc.UITransform;
      Vec2 = _cc.Vec2;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      SoundManager = _unresolved_2.SoundManager;
    }, function (_unresolved_3) {
      UIManager = _unresolved_3.UIManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8b116Z08uZFSLOZ3edZ6E3o", "GamePage", undefined);

      __checkObsolete__(['_decorator', 'assetManager', 'Button', 'Color', 'Component', 'Graphics', 'js', 'Label', 'Node', 'Rect', 'resources', 'Size', 'Sprite', 'SpriteFrame', 'Texture2D', 'tween', 'UITransform', 'Vec2', 'Vec3']);

      ({
        ccclass
      } = _decorator);

      _export("GamePage", GamePage = (_dec = ccclass('GamePage'), _dec(_class = class GamePage extends Component {
        constructor(...args) {
          super(...args);
          this._backBtn = null;
          this._backgroundSprite = null;
          this._settingSprite = null;
          this._titleSprite = null;
          this._titleLabel = null;
          this._boardNode = null;
          this._boardSprite = null;
          this._pieceBackFrame = null;
          this._turnTipLabel = null;
          this._redInfoLabel = null;
          this._blueInfoLabel = null;
          this._bottomIconSprites = {};
          this._pieces = [];
          this._selectedPiece = null;
          this._currentTurn = 'red';
          this._playerCamp = null;
          this._aiCamp = null;
          this._isBusy = false;
          this._isGameOver = false;
          this._aiProfile = null;
          this._cellHighlights = [];
          this._pieceHighlights = new Map();
          this._aiActionRepeatCounts = new Map();
          this._isAICompromising = false;
          this._boardDimension = 8;
          this._boardCellWidth = 80;
          this._boardCellHeight = 78.5;
          this._boardStartX = -280;
          this._boardStartY = 281;
        }

        async start() {
          this._hideLegacyEmptyNodes();

          this._bindPrefabReferences();

          this._applyStaticText();

          this._drawStaticGraphics();

          this._bindEvents();

          await this._loadStaticImages();
          await this._createPieces(this._boardNode);
        }

        onDestroy() {
          var _this$_backBtn;

          (_this$_backBtn = this._backBtn) == null || (_this$_backBtn = _this$_backBtn.node) == null || _this$_backBtn.off(Button.EventType.CLICK, this._onBack, this);
          ['RestartButton', 'UndoButton', 'HintButton'].forEach(path => {
            const node = this._findPrefabNode(path);

            node == null || node.off(Button.EventType.CLICK, this._onBottomButtonClick, this);
          });
        }

        _setCoverSize(transform, spriteFrame, containerWidth, containerHeight) {
          const originalSize = spriteFrame.originalSize;
          const imageWidth = (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || containerWidth;
          const imageHeight = (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || containerHeight;
          const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);
          transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
        }

        _ensureSpriteFrameSize(spriteFrame, fallbackWidth = 0, fallbackHeight = 0) {
          const rect = spriteFrame.rect;
          const originalSize = spriteFrame.originalSize;
          const width = (rect == null ? void 0 : rect.width) || (originalSize == null ? void 0 : originalSize.width) || spriteFrame.width || fallbackWidth;
          const height = (rect == null ? void 0 : rect.height) || (originalSize == null ? void 0 : originalSize.height) || spriteFrame.height || fallbackHeight;

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

        _hideLegacyEmptyNodes() {
          ['background', 'content', 'ske'].forEach(name => {
            const node = this.node.getChildByName(name);
            if (node) node.active = false;
          });
        }

        _bindPrefabReferences() {
          this._backgroundSprite = this._bindSprite('Background');
          this._settingSprite = this._bindSprite('SettingButton');
          this._backBtn = this._bindButton('SettingButton');
          this._titleSprite = this._bindSprite('Title');
          this._titleLabel = this._bindLabel('Title/TitleLabel');
          this._redInfoLabel = this._bindLabel('RedPlayerBox/Label');
          this._blueInfoLabel = this._bindLabel('BluePlayerBox/Label');
          this._turnTipLabel = this._bindLabel('TurnTip');
          this._boardNode = this._findPrefabNode('Board');
          this._boardSprite = this._bindSprite('Board');
          this._bottomIconSprites = {
            RestartButton: this._bindButtonIcon('RestartButton'),
            UndoButton: this._bindButtonIcon('UndoButton'),
            HintButton: this._bindButtonIcon('HintButton')
          };
        }

        _applyStaticText() {
          if (this._titleLabel) {
            this._titleLabel.string = '丞尧斗兽棋';
            this._titleLabel.fontSize = 48;
            this._titleLabel.lineHeight = 58;
          }

          this._configureInfoLabel(this._redInfoLabel, '红方 16枚');

          this._configureInfoLabel(this._blueInfoLabel, '蓝方 16枚');

          if (this._turnTipLabel) {
            this._turnTipLabel.string = '请翻开第一枚棋子决定阵营';
            this._turnTipLabel.fontSize = 30;
            this._turnTipLabel.lineHeight = 38;
            this._turnTipLabel.color = new Color(255, 255, 255, 255);
          }

          this._configureBottomLabel('RestartButton/Label', '重来');

          this._configureBottomLabel('UndoButton/Label', '悔棋');

          this._configureBottomLabel('HintButton/Label', '提示');
        }

        _configureInfoLabel(label, text) {
          if (!label) return;
          label.string = text;
          label.fontSize = 32;
          label.lineHeight = 42;
          label.color = new Color(255, 255, 255, 255);
        }

        _configureBottomLabel(path, text) {
          const label = this._bindLabel(path);

          if (!label) return;
          label.string = text;
          label.fontSize = 28;
          label.lineHeight = 36;
          label.color = new Color(255, 255, 255, 255);
        }

        _drawStaticGraphics() {
          this._drawPlayerInfoBox('RedPlayerBox', new Color(224, 68, 68, 255));

          this._drawPlayerInfoBox('BluePlayerBox', new Color(70, 142, 230, 255));
        }

        _drawPlayerInfoBox(path, accentColor) {
          var _node$getComponent;

          const node = this._findPrefabNode(path);

          const transform = node == null ? void 0 : node.getComponent(UITransform);
          if (!node || !transform) return;
          const width = transform.contentSize.width;
          const height = transform.contentSize.height;
          const graphics = (_node$getComponent = node.getComponent(Graphics)) != null ? _node$getComponent : node.addComponent(Graphics);
          graphics.clear();
          graphics.fillColor = new Color(5, 88, 55, 150);
          graphics.roundRect(-width / 2, -height / 2, width, height, 18);
          graphics.fill();
          graphics.strokeColor = accentColor;
          graphics.lineWidth = 4;
          graphics.roundRect(-width / 2, -height / 2, width, height, 18);
          graphics.stroke();
        }

        _bindEvents() {
          if (!this._backBtn) return;

          this._backBtn.node.off(Button.EventType.CLICK, this._onBack, this);

          this._backBtn.node.on(Button.EventType.CLICK, this._onBack, this);

          ['RestartButton', 'UndoButton', 'HintButton'].forEach(path => {
            const node = this._findPrefabNode(path);

            node == null || node.off(Button.EventType.CLICK, this._onBottomButtonClick, this);
            node == null || node.on(Button.EventType.CLICK, this._onBottomButtonClick, this);
          });
        }

        async _loadStaticImages() {
          await Promise.all([this._setSpriteFrame(this._backgroundSprite, 'images/play/bg', '[GamePage] 背景图加载失败: images/play/bg', true), this._setSpriteFrame(this._settingSprite, 'images/play/setting', '[GamePage] 设置按钮图片加载失败: images/play/setting'), this._setSpriteFrame(this._titleSprite, 'images/play/title_bg', '[GamePage] 标题背景图片加载失败: images/play/title_bg'), this._setSpriteFrame(this._boardSprite, 'images/play/play_bg', '[GamePage] 棋盘背景图片加载失败: images/play/play_bg'), this._setSpriteFrame(this._bottomIconSprites.RestartButton, 'images/play/icon1', '[GamePage] 底部按钮图标加载失败: images/play/icon1'), this._setSpriteFrame(this._bottomIconSprites.UndoButton, 'images/play/icon2', '[GamePage] 底部按钮图标加载失败: images/play/icon2'), this._setSpriteFrame(this._bottomIconSprites.HintButton, 'images/play/icon3', '[GamePage] 底部按钮图标加载失败: images/play/icon3')]);
        }

        async _setSpriteFrame(sprite, imagePath, failMessage, coverPage = false) {
          if (!sprite) {
            console.warn(failMessage);
            return;
          }

          const spriteFrame = await this._loadImageSpriteFrame(imagePath);

          if (!spriteFrame || !sprite.node.isValid) {
            console.warn(failMessage);
            return;
          }

          sprite.spriteFrame = spriteFrame;

          if (coverPage) {
            const pageTransform = this.node.getComponent(UITransform);
            const transform = sprite.node.getComponent(UITransform);

            if (pageTransform && transform) {
              this._setCoverSize(transform, spriteFrame, pageTransform.contentSize.width, pageTransform.contentSize.height);
            }
          }
        }

        _bindButtonIcon(path) {
          this._bindButton(path);

          return this._bindSprite(`${path}/Icon`);
        }

        _bindButton(path) {
          var _node$getComponent2;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const button = (_node$getComponent2 = node.getComponent(Button)) != null ? _node$getComponent2 : node.addComponent(Button);
          button.interactable = true;
          return button;
        }

        _bindSprite(path) {
          var _node$getComponent3;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const sprite = (_node$getComponent3 = node.getComponent(Sprite)) != null ? _node$getComponent3 : node.addComponent(Sprite);
          sprite.sizeMode = Sprite.SizeMode.CUSTOM;
          return sprite;
        }

        _bindLabel(path) {
          var _node$getComponent4;

          const node = this._findPrefabNode(path);

          if (!node) return null;

          this._preparePrefabNode(node);

          const label = (_node$getComponent4 = node.getComponent(Label)) != null ? _node$getComponent4 : node.addComponent(Label);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          label.overflow = Label.Overflow.CLAMP;
          return label;
        }

        _preparePrefabNode(node) {
          var _node$getComponent5;

          node.layer = this.node.layer;
          (_node$getComponent5 = node.getComponent(UITransform)) != null ? _node$getComponent5 : node.addComponent(UITransform);
        }

        _findPrefabNode(path) {
          const node = path.split('/').reduce((current, name) => {
            var _current$getChildByNa;

            return (_current$getChildByNa = current == null ? void 0 : current.getChildByName(name)) != null ? _current$getChildByNa : null;
          }, this.node);

          if (!node) {
            console.warn(`[GamePage] prefab 缺少节点: ${path}`);
          }

          return node;
        }

        async _createPieces(boardNode) {
          if (!boardNode) {
            console.warn('[GamePage] prefab 缺少节点: Board');
            return;
          }

          [...boardNode.children].forEach(child => child.destroy());
          this._pieceBackFrame = await this._loadImageSpriteFrame('images/play/piece_bg');

          if (!this._pieceBackFrame) {
            console.warn('[GamePage] 棋子背面图片加载失败: images/play/piece_bg');
          }

          this._pieces = [];
          this._selectedPiece = null;
          this._currentTurn = 'red';
          this._playerCamp = null;
          this._aiCamp = null;
          this._isBusy = false;
          this._isGameOver = false;
          this._aiProfile = this._createRandomAIProfile();
          this._cellHighlights = [];

          this._pieceHighlights.clear();

          this._aiActionRepeatCounts.clear();

          this._isAICompromising = false;

          const pieces = this._shufflePieces(this._createPieceData());

          const piecePositions = this._shufflePiecePositions(this._createPiecePositions());

          const pieceSize = 70;

          this._createBoardCells(boardNode);

          pieces.forEach((piece, index) => {
            const {
              row,
              col
            } = piecePositions[index];

            const gamePiece = this._createPieceNode(piece, index, row, col, pieceSize, boardNode.layer);

            gamePiece.node.parent = boardNode;
            gamePiece.node.setPosition(this._getCellPosition(row, col));

            this._pieces.push(gamePiece);
          });

          this._refreshGameInfo();
        }

        _createRandomAIProfile() {
          const profiles = [{
            difficulty: '初级',
            depth: 0,
            mistakeRate: 0.34,
            revealBias: 0.42,
            riskBias: 0.7,
            minThinkTime: 0.35,
            maxThinkTime: 0.95,
            moodTexts: ['AI有点犹豫...', 'AI随手试探', 'AI想先看一眼局面']
          }, {
            difficulty: '中级',
            depth: 1,
            mistakeRate: 0.18,
            revealBias: 0.24,
            riskBias: 0.35,
            minThinkTime: 0.55,
            maxThinkTime: 1.15,
            moodTexts: ['AI正在权衡一步棋', 'AI观察相邻威胁', 'AI试着保持节奏']
          }, {
            difficulty: '高级',
            depth: 2,
            mistakeRate: 0.08,
            revealBias: 0.12,
            riskBias: 0.18,
            minThinkTime: 0.8,
            maxThinkTime: 1.45,
            moodTexts: ['AI开始算后续变化', 'AI盯上了关键位置', 'AI放慢节奏寻找机会']
          }, {
            difficulty: '地狱',
            depth: 3,
            mistakeRate: 0.02,
            revealBias: 0.04,
            riskBias: 0.05,
            minThinkTime: 1.05,
            maxThinkTime: 1.75,
            moodTexts: ['AI冷静计算三步变化', 'AI几乎没有破绽', 'AI在压缩你的活动空间']
          }];
          return profiles[Math.floor(Math.random() * profiles.length)];
        }

        _assignCamps(playerCamp) {
          this._playerCamp = playerCamp;
          this._aiCamp = playerCamp === 'red' ? 'blue' : 'red';
          this._currentTurn = playerCamp;

          this._refreshGameInfo();

          this._setTurnTip(`你成为${this._getCampLabel(playerCamp)}，AI为${this._getCampLabel(this._aiCamp)}`);
        }

        _isPlayerTurn() {
          return !!this._playerCamp && this._currentTurn === this._playerCamp;
        }

        _isAITurn() {
          return !!this._aiCamp && this._currentTurn === this._aiCamp;
        }

        _getCampLabel(camp) {
          if (camp === 'red') return '红方';
          if (camp === 'blue') return '蓝方';
          return '';
        }

        _createBoardCells(boardNode) {
          for (let row = 0; row < this._boardDimension; row++) {
            this._cellHighlights[row] = [];

            for (let col = 0; col < this._boardDimension; col++) {
              const cellNode = new Node(`Cell_${row}_${col}`);
              cellNode.layer = boardNode.layer;
              cellNode.parent = boardNode;
              cellNode.setPosition(this._getCellPosition(row, col));
              const cellTransform = cellNode.addComponent(UITransform);
              cellTransform.setContentSize(this._boardCellWidth, this._boardCellHeight);
              const button = cellNode.addComponent(Button);
              button.interactable = true;
              cellNode.on(Button.EventType.CLICK, () => this._onCellClick(row, col), this);
              const highlightNode = new Node('MoveHighlight');
              highlightNode.layer = boardNode.layer;
              highlightNode.parent = cellNode;
              highlightNode.active = false;
              const highlightTransform = highlightNode.addComponent(UITransform);
              highlightTransform.setContentSize(this._boardCellWidth - 18, this._boardCellHeight - 18);
              const highlightGraphics = highlightNode.addComponent(Graphics);
              const halfWidth = (this._boardCellWidth - 18) / 2;
              const halfHeight = (this._boardCellHeight - 18) / 2;
              highlightGraphics.fillColor = new Color(103, 232, 151, 90);
              highlightGraphics.roundRect(-halfWidth, -halfHeight, this._boardCellWidth - 18, this._boardCellHeight - 18, 14);
              highlightGraphics.fill();
              highlightGraphics.strokeColor = new Color(103, 232, 151, 220);
              highlightGraphics.lineWidth = 4;
              highlightGraphics.roundRect(-halfWidth, -halfHeight, this._boardCellWidth - 18, this._boardCellHeight - 18, 14);
              highlightGraphics.stroke();
              this._cellHighlights[row][col] = highlightNode;
            }
          }
        }

        _getCellPosition(row, col) {
          return new Vec3(this._boardStartX + col * this._boardCellWidth, this._boardStartY - row * this._boardCellHeight, 0);
        }

        _createPieceData() {
          const animals = ['象', '狮', '虎', '豹', '狼', '狗', '猫', '鼠'];
          return [...animals.flatMap(animal => [{
            animal,
            camp: 'red'
          }, {
            animal,
            camp: 'red'
          }]), ...animals.flatMap(animal => [{
            animal,
            camp: 'blue'
          }, {
            animal,
            camp: 'blue'
          }])];
        }

        _createPiecePositions() {
          const positions = [];
          const lastIndex = this._boardDimension - 1;

          for (let col = 0; col < this._boardDimension; col++) {
            positions.push({
              row: 0,
              col
            });
            positions.push({
              row: lastIndex,
              col
            });
          }

          for (let row = 1; row < lastIndex; row++) {
            positions.push({
              row,
              col: 0
            });
            positions.push({
              row,
              col: lastIndex
            });
          }

          const centerLeft = this._boardDimension / 2 - 1;
          const centerRight = this._boardDimension / 2;
          positions.push({
            row: centerLeft,
            col: centerLeft
          }, {
            row: centerLeft,
            col: centerRight
          }, {
            row: centerRight,
            col: centerLeft
          }, {
            row: centerRight,
            col: centerRight
          });
          return positions;
        }

        _shufflePiecePositions(positions) {
          return this._shuffleArray(positions);
        }

        _shufflePieces(pieces) {
          return this._shuffleArray(pieces);
        }

        _shuffleArray(items) {
          const shuffled = [...items];

          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }

          return shuffled;
        }

        _createPieceNode(piece, id, row, col, size, layer) {
          const pieceNode = new Node(`${piece.camp === 'red' ? 'Red' : 'Blue'}Piece_${piece.animal}`);
          pieceNode.layer = layer;
          pieceNode.setScale(Vec3.ONE);
          const transform = pieceNode.addComponent(UITransform);
          transform.setContentSize(size, size);
          const button = pieceNode.addComponent(Button);
          button.interactable = true;
          button.transition = Button.Transition.SCALE;
          button.zoomScale = 0.96;
          const backNode = new Node('Back');
          backNode.parent = pieceNode;
          backNode.layer = pieceNode.layer;
          backNode.setPosition(Vec3.ZERO);
          const backTransform = backNode.addComponent(UITransform);
          backTransform.setContentSize(size, size);
          const backSprite = backNode.addComponent(Sprite);
          backSprite.sizeMode = Sprite.SizeMode.CUSTOM;

          if (this._pieceBackFrame) {
            backSprite.spriteFrame = this._pieceBackFrame;
          } else {
            this._drawFallbackPieceBack(backNode, size);
          }

          const frontNode = this._createPieceFrontNode(piece, size, layer);

          frontNode.parent = pieceNode;
          frontNode.layer = layer;
          frontNode.active = false;

          const highlightNode = this._createPieceHighlightNode(size, layer);

          highlightNode.parent = pieceNode;
          highlightNode.active = false;
          const gamePiece = {
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

          this._pieceHighlights.set(id, highlightNode);

          return gamePiece;
        }

        _createPieceHighlightNode(size, layer) {
          const highlightNode = new Node('CaptureHighlight');
          highlightNode.layer = layer;
          highlightNode.setPosition(Vec3.ZERO);
          const transform = highlightNode.addComponent(UITransform);
          transform.setContentSize(size + 14, size + 14);
          const graphics = highlightNode.addComponent(Graphics);
          const half = (size + 14) / 2;
          graphics.strokeColor = new Color(255, 238, 88, 255);
          graphics.lineWidth = Math.max(4, Math.round(size * 0.055));
          graphics.roundRect(-half, -half, size + 14, size + 14, Math.round(size * 0.12));
          graphics.stroke();
          return highlightNode;
        }

        _createPieceFrontNode(piece, size, layer) {
          const frontNode = new Node('Front');
          frontNode.layer = layer;
          frontNode.setPosition(Vec3.ZERO);
          const transform = frontNode.addComponent(UITransform);
          transform.setContentSize(size, size);
          const graphics = frontNode.addComponent(Graphics);
          const half = size / 2;
          graphics.fillColor = new Color(244, 189, 133, 255);
          graphics.roundRect(-half, -half, size, size, Math.round(size * 0.1));
          graphics.fill();
          graphics.strokeColor = piece.camp === 'red' ? new Color(225, 52, 44, 255) : new Color(40, 124, 232, 255);
          const lineWidth = Math.max(3, Math.round(size * 0.045));
          graphics.lineWidth = lineWidth;
          graphics.roundRect(-half + lineWidth, -half + lineWidth, size - lineWidth * 2, size - lineWidth * 2, Math.round(size * 0.09));
          graphics.stroke();
          const labelNode = new Node('Label');
          labelNode.parent = frontNode;
          labelNode.layer = layer;
          labelNode.setPosition(Vec3.ZERO);
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(size, size);
          const label = labelNode.addComponent(Label);
          label.string = piece.animal;
          label.fontSize = Math.round(size * 0.52);
          label.lineHeight = Math.round(size * 0.6);
          label.color = piece.camp === 'red' ? new Color(214, 44, 36, 255) : new Color(34, 112, 224, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          return frontNode;
        }

        _drawFallbackPieceBack(pieceNode, size) {
          const graphics = pieceNode.addComponent(Graphics);
          const half = size / 2;
          graphics.fillColor = new Color(147, 92, 46, 255);
          graphics.roundRect(-half, -half, size, size, Math.round(size * 0.1));
          graphics.fill();
          graphics.strokeColor = new Color(190, 130, 75, 255);
          const lineWidth = Math.max(3, Math.round(size * 0.04));
          graphics.lineWidth = lineWidth;
          graphics.roundRect(-half + lineWidth, -half + lineWidth, size - lineWidth * 2, size - lineWidth * 2, Math.round(size * 0.09));
          graphics.stroke();
        }

        _onCellClick(row, col) {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          if (this._isBusy || this._isGameOver || !this._isPlayerTurn() || !this._selectedPiece) return;
          if (this._getAlivePieceAt(row, col)) return;

          if (!this._isAdjacent(this._selectedPiece.row, this._selectedPiece.col, row, col)) {
            this._setTurnTip('只能移动到相邻空格');

            return;
          }

          this._playMoveTurn(this._selectedPiece, row, col);
        }

        _onPieceClick(piece) {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          if (this._isBusy || this._isGameOver || !piece.isAlive) return;
          if (!this._playerCamp && piece.isRevealed) return;
          if (this._playerCamp && !this._isPlayerTurn()) return;

          if (!piece.isRevealed) {
            this._playRevealTurn(piece);

            return;
          }

          if (piece.camp === this._playerCamp) {
            this._selectPiece(piece);

            return;
          }

          if (!this._selectedPiece) {
            this._setTurnTip(`请选择一个${this._getCampLabel(this._playerCamp)}棋子`);

            return;
          }

          if (!this._canMoveTo(this._selectedPiece, piece)) {
            this._setTurnTip(`只能攻击相邻的${this._getCampLabel(this._aiCamp)}棋子`);

            return;
          }

          if (!this._canCapture(this._selectedPiece, piece)) {
            this._setTurnTip(`${this._selectedPiece.animal} 吃不了 ${piece.animal}`);

            return;
          }

          this._playCaptureTurn(this._selectedPiece, piece);
        }

        _playRevealTurn(piece) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip(this._playerCamp ? `${this._getCampLabel(this._playerCamp)}翻开棋子...` : '首翻定阵营...');

          this._revealPiece(piece, () => {
            if (!this._playerCamp) {
              this._assignCamps(piece.camp);
            }

            if (this._finishTurnIfNeeded()) return;

            this._switchTurn(this._aiCamp);

            this._scheduleAITurn();
          });
        }

        _playCaptureTurn(attacker, target) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip(attacker.animal === target.animal ? `${this._getCampLabel(attacker.camp)} ${attacker.animal} 与 ${target.animal} 火并` : `${this._getCampLabel(attacker.camp)} ${attacker.animal} 吃掉 ${target.animal}`);

          this._capturePiece(attacker, target, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn(this._aiCamp);

            this._scheduleAITurn();
          });
        }

        _playMoveTurn(piece, row, col) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip(`${this._getCampLabel(piece.camp)} ${piece.animal} 移动`);

          this._movePiece(piece, row, col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn(this._aiCamp);

            this._scheduleAITurn();
          });
        }

        _scheduleAITurn() {
          const profile = this._aiProfile;
          this._isBusy = true;

          if (profile) {
            this._setTurnTip(this._pickRandom(profile.moodTexts));
          }

          const delay = profile ? profile.minThinkTime + Math.random() * (profile.maxThinkTime - profile.minThinkTime) : 0.55;
          this.scheduleOnce(() => this._runAITurn(), delay);
        }

        _runAITurn() {
          if (this._isGameOver || !this._isAITurn()) return;

          const action = this._chooseAIAction();

          if (!action) {
            this._switchTurn(this._playerCamp);

            return;
          }

          if (action.type === 'capture') {
            const attacker = this._getPieceById(action.pieceId);

            const target = this._getPieceById(action.targetId);

            if (!attacker || !target) {
              this._switchTurn(this._playerCamp);

              return;
            }

            this._setTurnTip(attacker.animal === target.animal ? `${this._getCampLabel(attacker.camp)} ${attacker.animal} 与 ${target.animal} 火并` : `${this._getCampLabel(attacker.camp)} ${attacker.animal} 吃掉 ${target.animal}`);

            this._recordAIAction(action, attacker);

            this._capturePiece(attacker, target, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn(this._playerCamp);
            });

            return;
          }

          if (action.type === 'reveal') {
            const piece = this._getPieceById(action.pieceId);

            if (!piece) {
              this._switchTurn(this._playerCamp);

              return;
            }

            this._setTurnTip(`${this._getCampLabel(this._aiCamp)}翻开棋子...`);

            this._revealPiece(piece, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn(this._playerCamp);
            });

            return;
          }

          const piece = this._getPieceById(action.pieceId);

          if (!piece || action.row === undefined || action.col === undefined) {
            this._switchTurn(this._playerCamp);

            return;
          }

          this._setTurnTip(`${this._getCampLabel(piece.camp)} ${piece.animal} 移动`);

          this._recordAIAction(action, piece);

          this._movePiece(piece, action.row, action.col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn(this._playerCamp);
          });
        }

        _chooseAIAction() {
          var _this$_aiProfile, _humanPool$pickIndex;

          const profile = (_this$_aiProfile = this._aiProfile) != null ? _this$_aiProfile : this._createRandomAIProfile();
          const aiCamp = this._aiCamp;
          const playerCamp = this._playerCamp;
          if (!aiCamp || !playerCamp) return null;

          const simPieces = this._createSimPieces();

          const actions = this._generateSimActions(simPieces, aiCamp);

          if (actions.length <= 0) return null;
          let scoredActions = actions.map(action => {
            const nextPieces = this._applySimAction(simPieces, action);

            const futureScore = profile.depth <= 0 ? this._evaluateSimBoard(nextPieces, profile) : this._scoreFutureBoard(nextPieces, playerCamp, profile.depth, profile);
            return { ...action,
              score: this._scoreImmediateAction(simPieces, action, aiCamp, profile) + futureScore
            };
          }).sort((a, b) => b.score - a.score);
          const compromiseActions = scoredActions.filter(action => !this._shouldAICompromiseOnAction(simPieces, action));
          this._isAICompromising = compromiseActions.length > 0 && compromiseActions[0] !== scoredActions[0];

          if (compromiseActions.length > 0) {
            scoredActions = compromiseActions;
          }

          if (Math.random() < profile.mistakeRate) {
            const mistakePoolSize = Math.max(1, Math.ceil(scoredActions.length * 0.45));
            const mistakePool = scoredActions.slice(-mistakePoolSize);
            return this._pickRandom(mistakePool);
          }

          const humanPool = scoredActions.slice(0, Math.min(scoredActions.length, profile.difficulty === '地狱' ? 1 : 3));
          const pickIndex = profile.difficulty === '地狱' ? 0 : Math.floor(Math.random() * humanPool.length);
          return (_humanPool$pickIndex = humanPool[pickIndex]) != null ? _humanPool$pickIndex : scoredActions[0];
        }

        _shouldAICompromiseOnAction(pieces, action) {
          var _this$_aiActionRepeat;

          const key = this._getAIRepeatActionKey(pieces, action);

          return !!key && ((_this$_aiActionRepeat = this._aiActionRepeatCounts.get(key)) != null ? _this$_aiActionRepeat : 0) >= 2;
        }

        _recordAIAction(action, piece) {
          var _this$_aiActionRepeat2;

          const key = this._getAIRepeatActionKey(this._createSimPieces(), action, piece);

          if (!key) return;

          this._aiActionRepeatCounts.set(key, ((_this$_aiActionRepeat2 = this._aiActionRepeatCounts.get(key)) != null ? _this$_aiActionRepeat2 : 0) + 1);

          if (this._isAICompromising) {
            this._setTurnTip('AI放弃重复追击，换一种走法');

            this._isAICompromising = false;
          }
        }

        _getAIRepeatActionKey(pieces, action, livePiece) {
          if (action.type !== 'move') return null;
          if (action.row === undefined || action.col === undefined) return null;
          const piece = livePiece != null ? livePiece : pieces.find(item => item.id === action.pieceId);
          if (!piece) return null;
          const from = `${piece.row},${piece.col}`;
          const to = `${action.row},${action.col}`;
          const edge = [from, to].sort().join('<>');
          return `move:${piece.id}:${edge}`;
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
          const aiCamp = this._aiCamp;
          const playerCamp = this._playerCamp;
          if (!aiCamp || !playerCamp) return 0;

          const winner = this._getSimWinner(pieces);

          if (winner === aiCamp) return 10000 + depth * 100;
          if (winner === playerCamp) return -10000 - depth * 100;
          if (winner === 'draw') return 0;
          if (depth <= 0) return this._evaluateSimBoard(pieces, profile);

          const actions = this._generateSimActions(pieces, turn).map(action => ({ ...action,
            score: this._scoreImmediateAction(pieces, action, turn, profile)
          })).sort((a, b) => turn === aiCamp ? b.score - a.score : a.score - b.score).slice(0, profile.depth >= 2 ? 10 : 16);

          if (actions.length <= 0) return this._evaluateSimBoard(pieces, profile);
          const scores = actions.map(action => {
            const nextPieces = this._applySimAction(pieces, action);

            return this._scoreFutureBoard(nextPieces, turn === aiCamp ? playerCamp : aiCamp, depth - 1, profile);
          });
          return turn === aiCamp ? Math.max(...scores) : Math.min(...scores);
        }

        _generateSimActions(pieces, camp) {
          const actions = [];
          const ownPieces = pieces.filter(piece => piece.isAlive && piece.camp === camp);
          const enemyPieces = pieces.filter(piece => piece.isAlive && piece.camp !== camp);
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
          const nextPieces = pieces.map(piece => ({ ...piece
          }));
          const piece = nextPieces.find(item => item.id === action.pieceId);
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

          const target = nextPieces.find(item => item.id === action.targetId);
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
          const piece = pieces.find(item => item.id === action.pieceId);
          if (!piece) return 0;

          if (action.type === 'capture') {
            const target = pieces.find(item => item.id === action.targetId);
            if (!target) return 0;
            const targetValue = this._getAnimalPower(target.animal) * 12;

            if (piece.animal === target.animal) {
              return targetValue * 0.45 - this._getAnimalPower(piece.animal) * profile.riskBias;
            }

            return targetValue - this._getAnimalPower(piece.animal) * profile.riskBias;
          }

          if (action.type === 'reveal') {
            const boardCenter = (this._boardDimension - 1) / 2;
            const centerBias = 2 - (Math.abs(piece.row - boardCenter) + Math.abs(piece.col - boardCenter)) * 0.2;
            return profile.revealBias * 10 + centerBias;
          }

          const enemyPieces = pieces.filter(item => item.isAlive && item.isRevealed && item.camp !== camp);
          if (enemyPieces.length <= 0 || action.row === undefined || action.col === undefined) return 1;
          const nearestDistance = Math.min(...enemyPieces.map(enemy => Math.abs(enemy.row - action.row) + Math.abs(enemy.col - action.col)));
          return 4 - nearestDistance - profile.riskBias;
        }

        _evaluateSimBoard(pieces, profile) {
          const aiCamp = this._aiCamp;
          const playerCamp = this._playerCamp;
          if (!aiCamp || !playerCamp) return 0;

          const aiScore = this._evaluateCampInSim(pieces, aiCamp, profile);

          const playerScore = this._evaluateCampInSim(pieces, playerCamp, profile);

          return aiScore - playerScore;
        }

        _evaluateCampInSim(pieces, camp, profile) {
          const ownPieces = pieces.filter(piece => piece.isAlive && piece.camp === camp);
          const enemyPieces = pieces.filter(piece => piece.isAlive && piece.camp !== camp);
          const materialScore = ownPieces.reduce((score, piece) => score + (piece.isRevealed ? this._getAnimalPower(piece.animal) : 4.5) * 18, 0);
          const revealedScore = ownPieces.filter(piece => piece.isRevealed).length * 2;
          const mobilityScore = ownPieces.filter(piece => piece.isRevealed).reduce((score, piece) => score + this._getSimEmptyAdjacentCells(pieces, piece.row, piece.col).length, 0);
          const threatScore = ownPieces.filter(piece => piece.isRevealed).reduce((score, piece) => score + enemyPieces.filter(enemy => enemy.isRevealed && this._isAdjacent(piece.row, piece.col, enemy.row, enemy.col) && this._canSimCapture(piece, enemy)).length * 14, 0);
          return materialScore + revealedScore + mobilityScore + threatScore - profile.riskBias;
        }

        _getSimWinner(pieces) {
          const redAlive = pieces.some(piece => piece.isAlive && piece.camp === 'red');
          const blueAlive = pieces.some(piece => piece.isAlive && piece.camp === 'blue');
          if (!redAlive && !blueAlive) return 'draw';
          if (!redAlive) return 'blue';
          if (!blueAlive) return 'red';
          return null;
        }

        _getSimEmptyAdjacentCells(pieces, row, col) {
          const candidates = [{
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
          return candidates.filter(cell => cell.row >= 0 && cell.row < this._boardDimension && cell.col >= 0 && cell.col < this._boardDimension && !pieces.some(piece => piece.isAlive && piece.row === cell.row && piece.col === cell.col));
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
          const button = piece.node.getComponent(Button);
          if (button) button.interactable = false;
          piece.node.setScale(Vec3.ONE);
          piece.backNode.setScale(Vec3.ONE);
          piece.frontNode.setScale(new Vec3(0.04, 1.06, 1));
          piece.backNode.active = true;
          piece.frontNode.active = false;
          tween(piece.backNode).to(0.12, {
            scale: new Vec3(0.04, 1.06, 1)
          }, {
            easing: 'quadIn'
          }).call(() => {
            piece.isRevealed = true;
            piece.backNode.active = false;
            piece.frontNode.active = true;

            this._refreshGameInfo();

            tween(piece.frontNode).to(0.16, {
              scale: Vec3.ONE
            }, {
              easing: 'backOut'
            }).call(() => {
              piece.node.setScale(Vec3.ONE);
              piece.backNode.setScale(Vec3.ONE);
              piece.frontNode.setScale(Vec3.ONE);
              if (button) button.interactable = true;
              onComplete();
            }).start();
          }).start();
        }

        _capturePiece(attacker, target, onComplete) {
          if (attacker.animal === target.animal) {
            this._tradePieces(attacker, target, onComplete);

            return;
          }

          const targetPosition = target.node.position.clone();
          const targetButton = target.node.getComponent(Button);
          const attackerButton = attacker.node.getComponent(Button);
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
          const targetButton = target.node.getComponent(Button);
          const attackerButton = attacker.node.getComponent(Button);
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
          const button = piece.node.getComponent(Button);
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

            this._setTurnTip(`${this._getCampLabel(this._playerCamp)}回合 - 翻开暗子或选择己方棋子`);

            return;
          }

          this._clearSelection();

          this._selectedPiece = piece;
          piece.node.setScale(new Vec3(1.08, 1.08, 1));

          this._refreshSelectionHighlights(piece);

          this._setTurnTip(`已选择${this._getCampLabel(piece.camp)} ${piece.animal}`);
        }

        _clearSelection() {
          this._clearHighlights();

          if (!this._selectedPiece) return;

          if (this._selectedPiece.node.isValid && this._selectedPiece.isAlive) {
            this._selectedPiece.node.setScale(Vec3.ONE);
          }

          this._selectedPiece = null;
        }

        _refreshSelectionHighlights(piece) {
          this._clearHighlights();

          this._getEmptyAdjacentCells(piece.row, piece.col).forEach(cell => {
            var _this$_cellHighlights;

            const highlight = (_this$_cellHighlights = this._cellHighlights[cell.row]) == null ? void 0 : _this$_cellHighlights[cell.col];
            if (highlight) highlight.active = true;
          });

          this._pieces.forEach(target => {
            if (!target.isAlive || !target.isRevealed || target.camp === piece.camp) return;
            if (!this._canMoveTo(piece, target) || !this._canCapture(piece, target)) return;

            const highlight = this._pieceHighlights.get(target.id);

            if (highlight) highlight.active = true;
          });
        }

        _clearHighlights() {
          this._cellHighlights.forEach(row => row.forEach(highlight => {
            if (highlight != null && highlight.isValid) highlight.active = false;
          }));

          this._pieceHighlights.forEach(highlight => {
            if (highlight != null && highlight.isValid) highlight.active = false;
          });
        }

        _switchTurn(turn) {
          this._currentTurn = turn;
          this._isBusy = false;

          this._clearSelection();

          this._refreshGameInfo();
        }

        _finishTurnIfNeeded() {
          const winner = this._getWinner();

          if (!winner) return false;
          this._isGameOver = true;
          this._isBusy = false;

          this._clearSelection();

          if (winner === 'draw') {
            this._setTurnTip('双方同归于尽，平局！');
          } else {
            const winnerRole = winner === this._playerCamp ? '你获胜' : 'AI获胜';

            this._setTurnTip(`${winnerRole}！${this._getCampLabel(winner === 'red' ? 'blue' : 'red')}棋子已被吃完`);
          }

          this._setAllPieceButtonsEnabled(false);

          this._refreshGameInfo();

          return true;
        }

        _getWinner() {
          const redAlive = this._pieces.some(piece => piece.isAlive && piece.camp === 'red');

          const blueAlive = this._pieces.some(piece => piece.isAlive && piece.camp === 'blue');

          if (!redAlive && !blueAlive) return 'draw';
          if (!redAlive) return 'blue';
          if (!blueAlive) return 'red';
          return null;
        }

        _setAllPieceButtonsEnabled(enabled) {
          this._pieces.forEach(piece => {
            const button = piece.node.getComponent(Button);
            if (button) button.interactable = enabled;
          });
        }

        _refreshGameInfo() {
          var _this$_aiProfile$diff, _this$_aiProfile2;

          const redAlive = this._countAlivePieces('red');

          const blueAlive = this._countAlivePieces('blue');

          const redRevealed = this._countRevealedPieces('red');

          const blueRevealed = this._countRevealedPieces('blue');

          const aiDifficulty = (_this$_aiProfile$diff = (_this$_aiProfile2 = this._aiProfile) == null ? void 0 : _this$_aiProfile2.difficulty) != null ? _this$_aiProfile$diff : '';
          const redRole = this._playerCamp === 'red' ? '玩家红方' : this._aiCamp === 'red' ? `AI${aiDifficulty}红方` : '红方';
          const blueRole = this._playerCamp === 'blue' ? '玩家蓝方' : this._aiCamp === 'blue' ? `AI${aiDifficulty}蓝方` : '蓝方';

          if (this._redInfoLabel) {
            this._redInfoLabel.string = `${redRole} ${redAlive}枚\n明子 ${redRevealed}`;
          }

          if (this._blueInfoLabel) {
            this._blueInfoLabel.string = `${blueRole} ${blueAlive}枚\n明子 ${blueRevealed}`;
          }

          if (!this._isGameOver && !this._isBusy) {
            if (!this._playerCamp) {
              this._setTurnTip('请翻开第一枚棋子决定阵营');
            } else if (this._isPlayerTurn()) {
              this._setTurnTip(`${this._getCampLabel(this._playerCamp)}回合 - 翻开暗子或选择己方棋子`);
            } else {
              this._setTurnTip(`${this._getCampLabel(this._aiCamp)}回合 - AI思考中`);
            }
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
          const candidates = [{
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
          return candidates.filter(cell => cell.row >= 0 && cell.row < this._boardDimension && cell.col >= 0 && cell.col < this._boardDimension && !this._getAlivePieceAt(cell.row, cell.col));
        }

        _canCapture(attacker, target) {
          if (attacker.animal === target.animal) return true;
          if (attacker.animal === '鼠' && target.animal === '象') return true;
          if (attacker.animal === '象' && target.animal === '鼠') return false;
          return this._getAnimalPower(attacker.animal) > this._getAnimalPower(target.animal);
        }

        _getAnimalPower(animal) {
          var _powers$animal;

          const powers = {
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

        async _loadImageSpriteFrame(path) {
          const spriteFrame = await this._loadOptional(`${path}/spriteFrame`, SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await this._loadOptional(`${path}/texture`, Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
        }

        async _loadOptional(path, type) {
          const resourceAsset = await new Promise(resolve => {
            resources.load(path, type, (error, asset) => {
              resolve(error || !asset ? null : asset);
            });
          });
          if (resourceAsset) return resourceAsset;
          return this._loadBundleOptional('game', path, type);
        }

        async _loadBundleOptional(bundleName, path, type) {
          return new Promise(resolve => {
            assetManager.loadBundle(bundleName, (bundleError, bundle) => {
              if (bundleError || !bundle) {
                resolve(null);
                return;
              }

              bundle.load(path, type, (assetError, asset) => {
                resolve(assetError || !asset ? null : asset);
              });
            });
          });
        }

        _onBack() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
          (_crd && UIManager === void 0 ? (_reportPossibleCrUseOfUIManager({
            error: Error()
          }), UIManager) : UIManager).getInstance().backPage();
        }

        _onBottomButtonClick() {
          (_crd && SoundManager === void 0 ? (_reportPossibleCrUseOfSoundManager({
            error: Error()
          }), SoundManager) : SoundManager).getInstance().playClickFeedback();
        }

      }) || _class));

      js.setClassAlias(GamePage, 'GamePage');

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=848fe469dcc60a4988d015a0af6329f6c3412ea8.js.map
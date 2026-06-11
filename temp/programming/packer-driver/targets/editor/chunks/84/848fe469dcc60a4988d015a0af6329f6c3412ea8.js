System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Button, Color, Component, Graphics, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, tween, UITransform, Vec2, Vec3, ResManager, UIManager, _dec, _class, _crd, ccclass, GamePage;

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
        constructor(...args) {
          super(...args);
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

        async start() {
          await this._createUI();
        }

        async _createUI() {
          var _pageTransform$conten, _pageTransform$conten2;

          const pageRoot = this.node;
          const pageTransform = pageRoot.getComponent(UITransform);
          const pageWidth = (_pageTransform$conten = pageTransform == null ? void 0 : pageTransform.contentSize.width) != null ? _pageTransform$conten : 640;
          const pageHeight = (_pageTransform$conten2 = pageTransform == null ? void 0 : pageTransform.contentSize.height) != null ? _pageTransform$conten2 : 960;
          await this._createBackground(pageRoot, pageWidth, pageHeight);
          await this._createSettingButton(pageRoot, pageWidth, pageHeight);
          await this._createTitle(pageRoot, pageWidth, pageHeight);

          this._createPlayerInfoBoxes(pageRoot, pageWidth, pageHeight);

          this._createTurnTip(pageRoot, pageHeight);

          await this._createBoard(pageRoot, pageHeight);
          await this._createBottomActionButtons(pageRoot, pageHeight);
        }

        async _createBackground(parent, pageWidth, pageHeight) {
          const backgroundNode = new Node('Background');
          backgroundNode.layer = parent.layer;
          backgroundNode.parent = parent;
          backgroundNode.setPosition(Vec3.ZERO);
          backgroundNode.setSiblingIndex(0);
          const backgroundTransform = backgroundNode.addComponent(UITransform);
          backgroundTransform.setContentSize(pageWidth, pageHeight);
          const backgroundSprite = backgroundNode.addComponent(Sprite);
          backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadBackgroundSpriteFrame();

          if (!spriteFrame || !backgroundNode.isValid) {
            const backgroundGraphics = backgroundNode.addComponent(Graphics);
            backgroundGraphics.fillColor = new Color(245, 247, 250, 255);
            backgroundGraphics.rect(-pageWidth / 2, -pageHeight / 2, pageWidth, pageHeight);
            backgroundGraphics.fill();
            return;
          }

          backgroundSprite.spriteFrame = spriteFrame;

          this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
        }

        async _loadBackgroundSpriteFrame() {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst(['images/play/bg/spriteFrame', 'images/play/bg'], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load('images/play/bg/texture', Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
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

        async _createSettingButton(parent, pageWidth, pageHeight) {
          const buttonSize = 96;
          const margin = 36;
          const settingBtnNode = new Node('SettingButton');
          settingBtnNode.layer = parent.layer;
          settingBtnNode.parent = parent;
          settingBtnNode.setPosition(-pageWidth / 2 + buttonSize / 2 + margin, pageHeight / 2 - buttonSize / 2 - margin, 0);
          const settingBtnTransform = settingBtnNode.addComponent(UITransform);
          settingBtnTransform.setContentSize(buttonSize, buttonSize);
          const settingSprite = settingBtnNode.addComponent(Sprite);
          settingSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          this._backBtn = settingBtnNode.addComponent(Button);
          this._backBtn.interactable = true;

          this._backBtn.node.on(Button.EventType.CLICK, this._onBack, this);

          const spriteFrame = await this._loadSettingSpriteFrame();

          if (!spriteFrame || !settingBtnNode.isValid) {
            console.warn('[GamePage] 设置按钮图片加载失败: images/play/setting');
            return;
          }

          settingSprite.spriteFrame = spriteFrame;
        }

        async _loadSettingSpriteFrame() {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst(['images/play/setting/spriteFrame', 'images/play/setting'], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load('images/play/setting/texture', Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
        }

        async _createTitle(parent, pageWidth, pageHeight) {
          const titleWidth = 488;
          const titleHeight = 154;
          const topMargin = 22;
          const titleNode = new Node('Title');
          titleNode.layer = parent.layer;
          titleNode.parent = parent;
          titleNode.setPosition(0, pageHeight / 2 - titleHeight / 2 - topMargin, 0);
          const titleTransform = titleNode.addComponent(UITransform);
          titleTransform.setContentSize(titleWidth, titleHeight);
          const titleSprite = titleNode.addComponent(Sprite);
          titleSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadTitleSpriteFrame();

          if (!spriteFrame || !titleNode.isValid) {
            console.warn('[GamePage] 标题背景图片加载失败: images/play/title_bg');
          } else {
            titleSprite.spriteFrame = spriteFrame;
          }

          const labelNode = new Node('TitleLabel');
          labelNode.layer = parent.layer;
          labelNode.parent = titleNode;
          labelNode.setPosition(Vec3.ZERO);
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(titleWidth, titleHeight);
          const titleLabel = labelNode.addComponent(Label);
          titleLabel.string = '欢乐斗兽棋';
          titleLabel.fontSize = 48;
          titleLabel.color = new Color(255, 255, 255, 255);
          titleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          titleLabel.verticalAlign = Label.VerticalAlign.CENTER;
        }

        async _loadTitleSpriteFrame() {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst(['images/play/title_bg/spriteFrame', 'images/play/title_bg'], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load('images/play/title_bg/texture', Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
        }

        _createPlayerInfoBoxes(parent, pageWidth, pageHeight) {
          const boxWidth = 294;
          const boxHeight = 164;
          const centerY = pageHeight / 2 - 352;
          const centerOffsetX = pageWidth * 0.26;
          this._redInfoLabel = this._createPlayerInfoBox(parent, 'RedPlayerBox', '玩家红方 8枚', new Vec3(-centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(224, 68, 68, 255));
          this._blueInfoLabel = this._createPlayerInfoBox(parent, 'BluePlayerBox', 'AI蓝方 8枚', new Vec3(centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(70, 142, 230, 255));
        }

        _createPlayerInfoBox(parent, nodeName, text, position, width, height, accentColor) {
          const boxNode = new Node(nodeName);
          boxNode.layer = parent.layer;
          boxNode.parent = parent;
          boxNode.setPosition(position);
          const boxTransform = boxNode.addComponent(UITransform);
          boxTransform.setContentSize(width, height);
          const boxGraphics = boxNode.addComponent(Graphics);
          boxGraphics.fillColor = new Color(5, 88, 55, 150);
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.fill();
          boxGraphics.strokeColor = accentColor;
          boxGraphics.lineWidth = 4;
          boxGraphics.roundRect(-width / 2, -height / 2, width, height, 18);
          boxGraphics.stroke();
          const labelNode = new Node('Label');
          labelNode.layer = parent.layer;
          labelNode.parent = boxNode;
          labelNode.setPosition(Vec3.ZERO);
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(width, height);
          const label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = 32;
          label.lineHeight = 42;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          return label;
        }

        _createTurnTip(parent, pageHeight) {
          const tipWidth = 360;
          const tipHeight = 72;
          const tipNode = new Node('TurnTip');
          tipNode.layer = parent.layer;
          tipNode.parent = parent;
          tipNode.setPosition(0, pageHeight / 2 - 560, 0);
          const tipTransform = tipNode.addComponent(UITransform);
          tipTransform.setContentSize(tipWidth, tipHeight);
          this._turnTipLabel = tipNode.addComponent(Label);
          this._turnTipLabel.string = '红方回合 - 翻开暗子或选择己方棋子';
          this._turnTipLabel.fontSize = 30;
          this._turnTipLabel.color = new Color(255, 255, 255, 255);
          this._turnTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
          this._turnTipLabel.verticalAlign = Label.VerticalAlign.CENTER;
        }

        async _createBoard(parent, pageHeight) {
          const boardSize = 750;
          const boardNode = new Node('Board');
          boardNode.layer = parent.layer;
          boardNode.parent = parent;
          boardNode.setPosition(0, pageHeight / 2 - 990, 0);
          const boardTransform = boardNode.addComponent(UITransform);
          boardTransform.setContentSize(boardSize, boardSize);
          const boardSprite = boardNode.addComponent(Sprite);
          boardSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadBoardSpriteFrame();

          if (!spriteFrame || !boardNode.isValid) {
            console.warn('[GamePage] 棋盘背景图片加载失败: images/play/play_bg');
            return;
          }

          boardSprite.spriteFrame = spriteFrame;
          await this._createPieces(boardNode);
        }

        async _loadBoardSpriteFrame() {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst(['images/play/play_bg/spriteFrame', 'images/play/play_bg'], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load('images/play/play_bg/texture', Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
        }

        async _createPieces(boardNode) {
          this._pieceBackFrame = await this._loadImageSpriteFrame('images/play/piece_bg');

          if (!this._pieceBackFrame) {
            console.warn('[GamePage] 棋子背面图片加载失败: images/play/piece_bg');
          }

          this._pieces = [];
          this._selectedPiece = null;
          this._currentTurn = 'red';
          this._isBusy = false;
          this._isGameOver = false;
          this._aiProfile = this._createRandomAIProfile();

          const pieces = this._shufflePieces(this._createPieceData());

          const pieceSize = 146;

          this._createBoardCells(boardNode);

          pieces.forEach((piece, index) => {
            const row = Math.floor(index / 4);
            const col = index % 4;

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
          for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              const cellNode = new Node(`Cell_${row}_${col}`);
              cellNode.layer = boardNode.layer;
              cellNode.parent = boardNode;
              cellNode.setPosition(this._getCellPosition(row, col));
              const cellTransform = cellNode.addComponent(UITransform);
              cellTransform.setContentSize(this._boardCellSize, this._boardCellSize);
              const button = cellNode.addComponent(Button);
              button.interactable = true;
              cellNode.on(Button.EventType.CLICK, () => this._onCellClick(row, col), this);
            }
          }
        }

        _getCellPosition(row, col) {
          return new Vec3(this._boardStartX + col * this._boardCellSize, this._boardStartY - row * this._boardCellSize, 0);
        }

        _createPieceData() {
          const animals = ['象', '狮', '虎', '豹', '狼', '狗', '猫', '鼠'];
          return [...animals.map(animal => ({
            animal,
            camp: 'red'
          })), ...animals.map(animal => ({
            animal,
            camp: 'blue'
          }))];
        }

        _shufflePieces(pieces) {
          const shuffled = [...pieces];

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
          return gamePiece;
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
          graphics.roundRect(-half, -half, size, size, 14);
          graphics.fill();
          graphics.strokeColor = piece.camp === 'red' ? new Color(225, 52, 44, 255) : new Color(40, 124, 232, 255);
          graphics.lineWidth = 5;
          graphics.roundRect(-half + 4, -half + 4, size - 8, size - 8, 12);
          graphics.stroke();
          const labelNode = new Node('Label');
          labelNode.parent = frontNode;
          labelNode.layer = layer;
          labelNode.setPosition(Vec3.ZERO);
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(size, size);
          const label = labelNode.addComponent(Label);
          label.string = piece.animal;
          label.fontSize = 76;
          label.lineHeight = 86;
          label.color = piece.camp === 'red' ? new Color(214, 44, 36, 255) : new Color(34, 112, 224, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
          return frontNode;
        }

        _drawFallbackPieceBack(pieceNode, size) {
          const graphics = pieceNode.addComponent(Graphics);
          const half = size / 2;
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
            this._setTurnTip(`${this._selectedPiece.animal} 吃不了 ${piece.animal}`);

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

          this._setTurnTip(attacker.animal === target.animal ? `红方 ${attacker.animal} 与 ${target.animal} 火并` : `红方 ${attacker.animal} 吃掉 ${target.animal}`);

          this._capturePiece(attacker, target, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('blue');

            this._scheduleAITurn();
          });
        }

        _playMoveTurn(piece, row, col) {
          this._isBusy = true;

          this._clearSelection();

          this._setTurnTip(`红方 ${piece.animal} 移动`);

          this._movePiece(piece, row, col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('blue');

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
          if (this._isGameOver || this._currentTurn !== 'blue') return;

          const action = this._chooseAIAction();

          if (!action) {
            this._switchTurn('red');

            return;
          }

          if (action.type === 'capture') {
            const attacker = this._getPieceById(action.pieceId);

            const target = this._getPieceById(action.targetId);

            if (!attacker || !target) {
              this._switchTurn('red');

              return;
            }

            this._setTurnTip(attacker.animal === target.animal ? `蓝方 ${attacker.animal} 与 ${target.animal} 火并` : `蓝方 ${attacker.animal} 吃掉 ${target.animal}`);

            this._capturePiece(attacker, target, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn('red');
            });

            return;
          }

          if (action.type === 'reveal') {
            const piece = this._getPieceById(action.pieceId);

            if (!piece) {
              this._switchTurn('red');

              return;
            }

            this._setTurnTip('蓝方翻开棋子...');

            this._revealPiece(piece, () => {
              if (this._finishTurnIfNeeded()) return;

              this._switchTurn('red');
            });

            return;
          }

          const piece = this._getPieceById(action.pieceId);

          if (!piece || action.row === undefined || action.col === undefined) {
            this._switchTurn('red');

            return;
          }

          this._setTurnTip(`蓝方 ${piece.animal} 移动`);

          this._movePiece(piece, action.row, action.col, () => {
            if (this._finishTurnIfNeeded()) return;

            this._switchTurn('red');
          });
        }

        _chooseAIAction() {
          var _this$_aiProfile, _humanPool$pickIndex;

          const profile = (_this$_aiProfile = this._aiProfile) != null ? _this$_aiProfile : this._createRandomAIProfile();

          const simPieces = this._createSimPieces();

          const actions = this._generateSimActions(simPieces, 'blue');

          if (actions.length <= 0) return null;
          const scoredActions = actions.map(action => {
            const nextPieces = this._applySimAction(simPieces, action);

            const futureScore = profile.depth <= 0 ? this._evaluateSimBoard(nextPieces, profile) : this._scoreFutureBoard(nextPieces, 'red', profile.depth, profile);
            return { ...action,
              score: this._scoreImmediateAction(simPieces, action, 'blue', profile) + futureScore
            };
          }).sort((a, b) => b.score - a.score);

          if (Math.random() < profile.mistakeRate) {
            const mistakePoolSize = Math.max(1, Math.ceil(scoredActions.length * 0.45));
            const mistakePool = scoredActions.slice(-mistakePoolSize);
            return this._pickRandom(mistakePool);
          }

          const humanPool = scoredActions.slice(0, Math.min(scoredActions.length, profile.difficulty === '地狱' ? 1 : 3));
          const pickIndex = profile.difficulty === '地狱' ? 0 : Math.floor(Math.random() * humanPool.length);
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
          const winner = this._getSimWinner(pieces);

          if (winner === 'blue') return 10000 + depth * 100;
          if (winner === 'red') return -10000 - depth * 100;
          if (winner === 'draw') return 0;
          if (depth <= 0) return this._evaluateSimBoard(pieces, profile);

          const actions = this._generateSimActions(pieces, turn).map(action => ({ ...action,
            score: this._scoreImmediateAction(pieces, action, turn, profile)
          })).sort((a, b) => turn === 'blue' ? b.score - a.score : a.score - b.score).slice(0, profile.depth >= 2 ? 10 : 16);

          if (actions.length <= 0) return this._evaluateSimBoard(pieces, profile);
          const scores = actions.map(action => {
            const nextPieces = this._applySimAction(pieces, action);

            return this._scoreFutureBoard(nextPieces, turn === 'blue' ? 'red' : 'blue', depth - 1, profile);
          });
          return turn === 'blue' ? Math.max(...scores) : Math.min(...scores);
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
            const centerBias = 2 - (Math.abs(piece.row - 1.5) + Math.abs(piece.col - 1.5)) * 0.2;
            return profile.revealBias * 10 + centerBias;
          }

          const enemyPieces = pieces.filter(item => item.isAlive && item.isRevealed && item.camp !== camp);
          if (enemyPieces.length <= 0 || action.row === undefined || action.col === undefined) return 1;
          const nearestDistance = Math.min(...enemyPieces.map(enemy => Math.abs(enemy.row - action.row) + Math.abs(enemy.col - action.col)));
          return 4 - nearestDistance - profile.riskBias;
        }

        _evaluateSimBoard(pieces, profile) {
          const blueScore = this._evaluateCampInSim(pieces, 'blue', profile);

          const redScore = this._evaluateCampInSim(pieces, 'red', profile);

          return blueScore - redScore;
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
          const button = piece.node.getComponent(Button);
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

            this._setTurnTip('红方回合 - 翻开暗子或选择己方棋子');

            return;
          }

          this._clearSelection();

          this._selectedPiece = piece;
          piece.node.setScale(new Vec3(1.08, 1.08, 1));

          this._setTurnTip(`已选择红方 ${piece.animal}`);
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
          const winner = this._getWinner();

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
          const redAlive = this._countAlivePieces('red');

          const blueAlive = this._countAlivePieces('blue');

          const redRevealed = this._countRevealedPieces('red');

          const blueRevealed = this._countRevealedPieces('blue');

          if (this._redInfoLabel) {
            this._redInfoLabel.string = `玩家红方 ${redAlive}枚\n明子 ${redRevealed}`;
          }

          if (this._blueInfoLabel) {
            var _this$_aiProfile$diff, _this$_aiProfile2;

            this._blueInfoLabel.string = `AI${(_this$_aiProfile$diff = (_this$_aiProfile2 = this._aiProfile) == null ? void 0 : _this$_aiProfile2.difficulty) != null ? _this$_aiProfile$diff : '蓝方'} ${blueAlive}枚\n明子 ${blueRevealed}`;
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

        async _createBottomActionButtons(parent, pageHeight) {
          const centerY = -pageHeight / 2 + 102;
          const spacing = 150;
          await this._createBottomActionButton(parent, 'RestartButton', 'images/play/icon1', '重来', new Vec3(-spacing, centerY, 0));
          await this._createBottomActionButton(parent, 'UndoButton', 'images/play/icon2', '悔棋', new Vec3(0, centerY, 0));
          await this._createBottomActionButton(parent, 'HintButton', 'images/play/icon3', '提示', new Vec3(spacing, centerY, 0));
        }

        async _createBottomActionButton(parent, nodeName, iconPath, text, position) {
          const buttonWidth = 120;
          const buttonHeight = 132;
          const iconSize = 74;
          const buttonNode = new Node(nodeName);
          buttonNode.layer = parent.layer;
          buttonNode.parent = parent;
          buttonNode.setPosition(position);
          const buttonTransform = buttonNode.addComponent(UITransform);
          buttonTransform.setContentSize(buttonWidth, buttonHeight);
          const button = buttonNode.addComponent(Button);
          button.interactable = true;
          const iconNode = new Node('Icon');
          iconNode.layer = parent.layer;
          iconNode.parent = buttonNode;
          iconNode.setPosition(0, 24, 0);
          const iconTransform = iconNode.addComponent(UITransform);
          iconTransform.setContentSize(iconSize, iconSize);
          const iconSprite = iconNode.addComponent(Sprite);
          iconSprite.sizeMode = Sprite.SizeMode.CUSTOM;
          const spriteFrame = await this._loadImageSpriteFrame(iconPath);

          if (!spriteFrame || !buttonNode.isValid) {
            console.warn(`[GamePage] 底部按钮图标加载失败: ${iconPath}`);
          } else {
            iconSprite.spriteFrame = spriteFrame;
          }

          const labelNode = new Node('Label');
          labelNode.layer = parent.layer;
          labelNode.parent = buttonNode;
          labelNode.setPosition(0, -46, 0);
          const labelTransform = labelNode.addComponent(UITransform);
          labelTransform.setContentSize(buttonWidth, 40);
          const label = labelNode.addComponent(Label);
          label.string = text;
          label.fontSize = 28;
          label.color = new Color(255, 255, 255, 255);
          label.horizontalAlign = Label.HorizontalAlign.CENTER;
          label.verticalAlign = Label.VerticalAlign.CENTER;
        }

        async _loadImageSpriteFrame(path) {
          const spriteFrame = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().loadFirst([`${path}/spriteFrame`, path], SpriteFrame);
          if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);
          const texture = await (_crd && ResManager === void 0 ? (_reportPossibleCrUseOfResManager({
            error: Error()
          }), ResManager) : ResManager).getInstance().load(`${path}/texture`, Texture2D);
          if (!texture) return null;
          const generatedSpriteFrame = new SpriteFrame();
          generatedSpriteFrame.texture = texture;
          return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
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
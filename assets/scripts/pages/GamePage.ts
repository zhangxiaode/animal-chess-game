import { _decorator, Button, Color, Component, Graphics, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3 } from 'cc';
import { ResManager } from '../framework/ResManager';
import { UIManager } from '../framework/UIManager';

const { ccclass } = _decorator;

@ccclass('GamePage')
export class GamePage extends Component {
    private _backBtn: Button | null = null;

    async start() {
        await this._createUI();
    }

    private async _createUI() {
        const pageRoot = this.node;
        const pageTransform = pageRoot.getComponent(UITransform);
        const pageWidth = pageTransform?.contentSize.width ?? 640;
        const pageHeight = pageTransform?.contentSize.height ?? 960;

        await this._createBackground(pageRoot, pageWidth, pageHeight);
        await this._createSettingButton(pageRoot, pageWidth, pageHeight);
        await this._createTitle(pageRoot, pageWidth, pageHeight);
        this._createPlayerInfoBoxes(pageRoot, pageWidth, pageHeight);
        this._createTurnTip(pageRoot, pageHeight);
        await this._createBoard(pageRoot, pageHeight);
        await this._createBottomActionButtons(pageRoot, pageHeight);
    }

    private async _createBackground(parent: Node, pageWidth: number, pageHeight: number) {
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

    private async _loadBackgroundSpriteFrame(): Promise<SpriteFrame | null> {
        const spriteFrame = await ResManager.getInstance().loadFirst(
            ['images/play/bg/spriteFrame', 'images/play/bg'],
            SpriteFrame,
        );
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await ResManager.getInstance().load('images/play/bg/texture', Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private _setCoverSize(transform: UITransform, spriteFrame: SpriteFrame, containerWidth: number, containerHeight: number) {
        const originalSize = spriteFrame.originalSize as { width?: number; height?: number } | null;
        const imageWidth = originalSize?.width || spriteFrame.width || containerWidth;
        const imageHeight = originalSize?.height || spriteFrame.height || containerHeight;
        const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);

        transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
    }

    private _ensureSpriteFrameSize(spriteFrame: SpriteFrame, fallbackWidth = 0, fallbackHeight = 0) {
        const rect = spriteFrame.rect as { width?: number; height?: number } | null;
        const originalSize = spriteFrame.originalSize as { width?: number; height?: number } | null;
        const width = rect?.width || originalSize?.width || spriteFrame.width || fallbackWidth;
        const height = rect?.height || originalSize?.height || spriteFrame.height || fallbackHeight;

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

    private async _createSettingButton(parent: Node, pageWidth: number, pageHeight: number) {
        const buttonSize = 96;
        const margin = 36;
        const settingBtnNode = new Node('SettingButton');
        settingBtnNode.layer = parent.layer;
        settingBtnNode.parent = parent;
        settingBtnNode.setPosition(
            -pageWidth / 2 + buttonSize / 2 + margin,
            pageHeight / 2 - buttonSize / 2 - margin,
            0,
        );

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

    private async _loadSettingSpriteFrame(): Promise<SpriteFrame | null> {
        const spriteFrame = await ResManager.getInstance().loadFirst(
            ['images/play/setting/spriteFrame', 'images/play/setting'],
            SpriteFrame,
        );
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await ResManager.getInstance().load('images/play/setting/texture', Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private async _createTitle(parent: Node, pageWidth: number, pageHeight: number) {
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

    private async _loadTitleSpriteFrame(): Promise<SpriteFrame | null> {
        const spriteFrame = await ResManager.getInstance().loadFirst(
            ['images/play/title_bg/spriteFrame', 'images/play/title_bg'],
            SpriteFrame,
        );
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await ResManager.getInstance().load('images/play/title_bg/texture', Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private _createPlayerInfoBoxes(parent: Node, pageWidth: number, pageHeight: number) {
        const boxWidth = 294;
        const boxHeight = 164;
        const centerY = pageHeight / 2 - 352;
        const centerOffsetX = pageWidth * 0.26;

        this._createPlayerInfoBox(parent, 'RedPlayerBox', '红方 先手', new Vec3(-centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(224, 68, 68, 255));
        this._createPlayerInfoBox(parent, 'BluePlayerBox', '蓝方 后手', new Vec3(centerOffsetX, centerY, 0), boxWidth, boxHeight, new Color(70, 142, 230, 255));
    }

    private _createPlayerInfoBox(parent: Node, nodeName: string, text: string, position: Vec3, width: number, height: number, accentColor: Color) {
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
        label.fontSize = 36;
        label.color = new Color(255, 255, 255, 255);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
    }

    private _createTurnTip(parent: Node, pageHeight: number) {
        const tipWidth = 360;
        const tipHeight = 72;
        const tipNode = new Node('TurnTip');
        tipNode.layer = parent.layer;
        tipNode.parent = parent;
        tipNode.setPosition(0, pageHeight / 2 - 560, 0);

        const tipTransform = tipNode.addComponent(UITransform);
        tipTransform.setContentSize(tipWidth, tipHeight);

        const tipLabel = tipNode.addComponent(Label);
        tipLabel.string = '红方回合 - 请选择棋子';
        tipLabel.fontSize = 30;
        tipLabel.color = new Color(255, 255, 255, 255);
        tipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        tipLabel.verticalAlign = Label.VerticalAlign.CENTER;
    }

    private async _createBoard(parent: Node, pageHeight: number) {
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
    }

    private async _loadBoardSpriteFrame(): Promise<SpriteFrame | null> {
        const spriteFrame = await ResManager.getInstance().loadFirst(
            ['images/play/play_bg/spriteFrame', 'images/play/play_bg'],
            SpriteFrame,
        );
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await ResManager.getInstance().load('images/play/play_bg/texture', Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private async _createBottomActionButtons(parent: Node, pageHeight: number) {
        const centerY = -pageHeight / 2 + 102;
        const spacing = 150;

        await this._createBottomActionButton(parent, 'RestartButton', 'images/play/icon1', '重来', new Vec3(-spacing, centerY, 0));
        await this._createBottomActionButton(parent, 'UndoButton', 'images/play/icon2', '悔棋', new Vec3(0, centerY, 0));
        await this._createBottomActionButton(parent, 'HintButton', 'images/play/icon3', '提示', new Vec3(spacing, centerY, 0));
    }

    private async _createBottomActionButton(parent: Node, nodeName: string, iconPath: string, text: string, position: Vec3) {
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

    private async _loadImageSpriteFrame(path: string): Promise<SpriteFrame | null> {
        const spriteFrame = await ResManager.getInstance().loadFirst(
            [`${path}/spriteFrame`, path],
            SpriteFrame,
        );
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await ResManager.getInstance().load(`${path}/texture`, Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private _onBack() {
        UIManager.getInstance().backPage();
    }
}

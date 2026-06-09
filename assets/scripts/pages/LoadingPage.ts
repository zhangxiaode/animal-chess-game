import {
    _decorator,
    Color,
    Component,
    Label,
    Node,
    Rect,
    Size,
    Sprite,
    SpriteFrame,
    Texture2D,
    UITransform,
    Vec2,
    Vec3,
} from 'cc';
import { ResManager } from '../framework/ResManager';
import { UIManager } from '../framework/UIManager';

const { ccclass, property } = _decorator;

type ImageConfig = {
    name: string;
    path: string;
    sprite?: Sprite | null;
    frame?: SpriteFrame | null;
};

@ccclass('LoadingPage')
export class LoadingPage extends Component {
    @property(Sprite)
    public backgroundSprite: Sprite | null = null;

    @property(Sprite)
    public lionSprite: Sprite | null = null;

    @property(Sprite)
    public elephantSprite: Sprite | null = null;

    @property(Sprite)
    public tigerSprite: Sprite | null = null;

    @property(Sprite)
    public logoSprite: Sprite | null = null;

    @property(Sprite)
    public dragonSprite: Sprite | null = null;

    @property(Sprite)
    public progressBackgroundSprite: Sprite | null = null;

    @property(Sprite)
    public progressActivedSprite: Sprite | null = null;

    @property(Label)
    public subtitleLabel: Label | null = null;

    @property(Label)
    public enterTipLabel: Label | null = null;

    @property(Label)
    public progressLabel: Label | null = null;

    @property(SpriteFrame)
    public backgroundFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public lionFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public elephantFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public tigerFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public logoFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public dragonFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public progressBackgroundFrame: SpriteFrame | null = null;

    @property(SpriteFrame)
    public progressActivedFrame: SpriteFrame | null = null;

    private _hasEnteredHome = false;
    private _loadedAssetCount = 0;
    private _loadingStartTime = 0;
    private _progress = 0;
    private readonly _loadingAssetTotal = 8;
    private readonly _minLoadingSeconds = 3;

    start() {
        if (this.node.parent) {
            this.node.layer = this.node.parent.layer;
        }

        this._bindPrefabReferences();
        this._startLoading();
    }

    protected onDestroy() {
        this.unschedule(this._enterHome);
    }

    private async _startLoading() {
        this._loadingStartTime = Date.now();
        this._loadedAssetCount = 0;
        this._setLoadingProgress(0);

        this._ensureTextContent();
        this._ensureStaticLayout();
        await this._ensureImageContent();

        this._setLoadingProgress(1);
        await this._waitMinLoadingTime();
        this._enterHome();
    }

    private _bindPrefabReferences() {
        this.backgroundSprite ??= this._findSprite('Background');
        this.lionSprite ??= this._findSprite('Lion');
        this.elephantSprite ??= this._findSprite('Elephant');
        this.tigerSprite ??= this._findSprite('Tiger');
        this.logoSprite ??= this._findSprite('Logo');
        this.dragonSprite ??= this._findSprite('Dragon');
        this.progressBackgroundSprite ??= this._findSprite('ProgressBar/ProgressBackground');
        this.progressActivedSprite ??= this._findSprite('ProgressBar/ProgressActived');
        this.subtitleLabel ??= this._findLabel('Subtitle');
        this.enterTipLabel ??= this._findLabel('EnterTip');
        this.progressLabel ??= this._findLabel('ProgressBar/ProgressPercent');
    }

    private _findSprite(path: string): Sprite | null {
        return this._findNode(path)?.getComponent(Sprite) ?? null;
    }

    private _findLabel(path: string): Label | null {
        return this._findNode(path)?.getComponent(Label) ?? null;
    }

    private _findNode(path: string): Node | null {
        const parts = path.split('/');
        let current: Node | null = this.node;

        for (const part of parts) {
            current = current?.getChildByName(part) ?? null;
            if (!current) return null;
        }

        return current;
    }

    private _ensureTextContent() {
        if (!this.subtitleLabel) {
            this.subtitleLabel = this._createLabel('Subtitle', '经典策略 · 趣味对战', new Vec3(0, this._pageHeight / 2 - 540, 0), 360, 42, 30);
        }

        if (!this.enterTipLabel) {
            this.enterTipLabel = this._createLabel('EnterTip', '正在进入游戏...', new Vec3(0, this._pageHeight / 2 - 970, 0), 360, 42, 28);
        }

        this.subtitleLabel.string = '经典策略 · 趣味对战';
        this.enterTipLabel.string = '正在进入游戏...';
    }

    private _ensureStaticLayout() {
        this._syncNodeSizeAndPosition(this.backgroundSprite?.node, this._pageWidth, this._pageHeight, Vec3.ZERO, 0);
        this._syncNodeSizeAndPosition(this.lionSprite?.node, 88, 88, new Vec3(-108, this._pageHeight / 2 - 150, 0));
        this._syncNodeSizeAndPosition(this.elephantSprite?.node, 120, 120, new Vec3(0, this._pageHeight / 2 - 150, 0));
        this._syncNodeSizeAndPosition(this.tigerSprite?.node, 88, 88, new Vec3(108, this._pageHeight / 2 - 150, 0));
        this._syncNodeSizeAndPosition(this.logoSprite?.node, 240, 200, new Vec3(0, this._pageHeight / 2 - 420, 0));
        this._syncNodeSizeAndPosition(this.dragonSprite?.node, 320, 320, new Vec3(0, this._pageHeight / 2 - 770, 0));
        this._syncNodeSizeAndPosition(this.progressBackgroundSprite?.node, 310, 16, Vec3.ZERO);
        this._syncNodeSizeAndPosition(this.progressActivedSprite?.node, 310, 16, Vec3.ZERO);
    }

    private async _ensureImageContent() {
        this.backgroundSprite ??= this._createImage('Background', this._pageWidth, this._pageHeight, Vec3.ZERO, 0);
        this.lionSprite ??= this._createImage('Lion', 88, 88, new Vec3(-108, this._pageHeight / 2 - 150, 0));
        this.elephantSprite ??= this._createImage('Elephant', 120, 120, new Vec3(0, this._pageHeight / 2 - 150, 0));
        this.tigerSprite ??= this._createImage('Tiger', 88, 88, new Vec3(108, this._pageHeight / 2 - 150, 0));
        this.logoSprite ??= this._createImage('Logo', 240, 200, new Vec3(0, this._pageHeight / 2 - 420, 0));
        this.dragonSprite ??= this._createImage('Dragon', 320, 320, new Vec3(0, this._pageHeight / 2 - 770, 0));
        this._ensureProgressBar();

        const imageConfigs: ImageConfig[] = [
            { name: 'Background', path: 'images/loading/bg', sprite: this.backgroundSprite, frame: this.backgroundFrame },
            { name: 'Lion', path: 'images/loading/lion', sprite: this.lionSprite, frame: this.lionFrame },
            { name: 'Elephant', path: 'images/loading/elephant', sprite: this.elephantSprite, frame: this.elephantFrame },
            { name: 'Tiger', path: 'images/loading/tiger', sprite: this.tigerSprite, frame: this.tigerFrame },
            { name: 'Logo', path: 'images/loading/logo', sprite: this.logoSprite, frame: this.logoFrame },
            { name: 'Dragon', path: 'images/loading/dragon', sprite: this.dragonSprite, frame: this.dragonFrame },
            { name: 'ProgressBackground', path: 'images/loading/loading', sprite: this.progressBackgroundSprite, frame: this.progressBackgroundFrame },
            { name: 'ProgressActived', path: 'images/loading/loading-actived', sprite: this.progressActivedSprite, frame: this.progressActivedFrame },
        ];

        await Promise.all(imageConfigs.map((config) => this._applyImageConfig(config)));
    }

    private _ensureProgressBar() {
        let progressRoot = this._findNode('ProgressBar');
        if (!progressRoot) {
            progressRoot = new Node('ProgressBar');
            progressRoot.layer = this.node.layer;
            progressRoot.parent = this.node;
            progressRoot.setPosition(new Vec3(0, this._pageHeight / 2 - 1060, 0));
            progressRoot.addComponent(UITransform).setContentSize(310, 16);
        }

        this.progressBackgroundSprite ??= this._createImage('ProgressBackground', 310, 16, Vec3.ZERO, undefined, progressRoot);
        this.progressActivedSprite ??= this._createImage('ProgressActived', 310, 16, Vec3.ZERO, undefined, progressRoot);

        if (!this.progressLabel) {
            this.progressLabel = this._createLabel('ProgressPercent', this._getProgressText(), new Vec3(0, -42, 0), 160, 36, 26, progressRoot);
        }

        if (!this._findNode('ProgressBar/FirstLoadTip')) {
            const firstLoadTipLabel = this._createLabel('FirstLoadTip', '首次加载可能需要一些时间', new Vec3(0, -90, 0), 360, 36, 24, progressRoot);
            firstLoadTipLabel.color = new Color(255, 255, 255, 128);
        }

        this._ensureStaticLayout();
    }

    private async _applyImageConfig(config: ImageConfig) {
        const sprite = config.sprite;
        if (!sprite) {
            this._increaseLoadingProgress();
            return;
        }

        sprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const spriteFrame = config.frame ?? await this._loadImageSpriteFrame(config.path);
        this._increaseLoadingProgress();

        if (!spriteFrame || !sprite.node.isValid) {
            console.warn(`[LoadingPage] 图片加载失败: ${config.path}`);
            return;
        }

        sprite.spriteFrame = spriteFrame;
        if (config.name === 'Background') {
            const transform = sprite.node.getComponent(UITransform);
            if (transform) {
                this._setCoverSize(transform, spriteFrame, this._pageWidth, this._pageHeight);
            }
        }

        if (config.name === 'ProgressActived') {
            this._configureProgressFill(sprite);
        }
    }

    private _createImage(name: string, width: number, height: number, position: Vec3, siblingIndex?: number, parent: Node = this.node): Sprite {
        const imageNode = new Node(name);
        imageNode.layer = this.node.layer;
        imageNode.parent = parent;
        imageNode.setPosition(position);

        if (siblingIndex !== undefined) {
            imageNode.setSiblingIndex(siblingIndex);
        }

        imageNode.addComponent(UITransform).setContentSize(width, height);
        const sprite = imageNode.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        return sprite;
    }

    private _createLabel(name: string, text: string, position: Vec3, width: number, height: number, fontSize: number, parent: Node = this.node): Label {
        const labelNode = new Node(name);
        labelNode.layer = this.node.layer;
        labelNode.parent = parent;
        labelNode.setPosition(position);
        labelNode.addComponent(UITransform).setContentSize(width, height);

        const label = labelNode.addComponent(Label);
        label.string = text;
        label.fontSize = fontSize;
        label.color = new Color(255, 255, 255, 255);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
        label.overflow = Label.Overflow.CLAMP;
        return label;
    }

    private _syncNodeSizeAndPosition(node: Node | null | undefined, width: number, height: number, position: Vec3, siblingIndex?: number) {
        if (!node) return;

        node.layer = this.node.layer;
        node.setPosition(position);
        const transform = node.getComponent(UITransform) ?? node.addComponent(UITransform);
        transform.setContentSize(width, height);

        if (siblingIndex !== undefined) {
            node.setSiblingIndex(siblingIndex);
        }
    }

    private _setCoverSize(transform: UITransform, spriteFrame: SpriteFrame, containerWidth: number, containerHeight: number) {
        const originalSize = spriteFrame.originalSize as { width?: number; height?: number } | null;
        const imageWidth = originalSize?.width || spriteFrame.width || containerWidth;
        const imageHeight = originalSize?.height || spriteFrame.height || containerHeight;
        const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);

        transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
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

    private _increaseLoadingProgress() {
        this._loadedAssetCount++;
        this._setLoadingProgress(this._loadedAssetCount / this._loadingAssetTotal);
    }

    private _configureProgressFill(sprite: Sprite) {
        if (!sprite.spriteFrame) return;

        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.type = Sprite.Type.FILLED;
        sprite.fillType = Sprite.FillType.HORIZONTAL;
        sprite.fillStart = 0;
        sprite.fillRange = this._progress;
    }

    private _setLoadingProgress(value: number) {
        this._progress = Math.max(0, Math.min(1, value));
        if (this.progressActivedSprite?.spriteFrame) {
            this.progressActivedSprite.fillRange = this._progress;
        }
        if (this.progressLabel) {
            this.progressLabel.string = this._getProgressText();
        }
    }

    private _getProgressText() {
        return `${Math.round(this._progress * 100)}%`;
    }

    private async _waitMinLoadingTime() {
        const elapsed = (Date.now() - this._loadingStartTime) / 1000;
        const remaining = Math.max(0, this._minLoadingSeconds - elapsed);
        if (remaining <= 0) return;

        await new Promise<void>((resolve) => {
            this.scheduleOnce(resolve, remaining);
        });
    }

    private _enterHome() {
        if (this._hasEnteredHome) return;

        this._hasEnteredHome = true;
        UIManager.getInstance().openPage('HomePage');
    }

    private get _pageWidth() {
        return this.node.getComponent(UITransform)?.contentSize.width ?? 750;
    }

    private get _pageHeight() {
        return this.node.getComponent(UITransform)?.contentSize.height ?? 1334;
    }
}

import {
    _decorator,
    Color,
    Component,
    js,
    Label,
    Node,
    Rect,
    Size,
    Sprite,
    SpriteFrame,
    Texture2D,
    UITransform,
    Vec2,
    resources,
} from 'cc';
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

    private _firstLoadTipLabel: Label | null = null;
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

        this._hideLegacyEmptyNodes();
        this._bindPrefabReferences();
        this._applyTextContent();
        this._startLoading();
    }

    protected onDestroy() {
        this.unschedule(this._enterHome);
    }

    private async _startLoading() {
        this._loadingStartTime = Date.now();
        this._loadedAssetCount = 0;
        this._setLoadingProgress(0);

        await this._loadImageContent();

        this._setLoadingProgress(1);
        await this._waitMinLoadingTime();
        this._enterHome();
    }

    private _hideLegacyEmptyNodes() {
        ['background', 'content', 'ske'].forEach((name) => {
            const node = this.node.getChildByName(name);
            if (node) node.active = false;
        });
    }

    private _bindPrefabReferences() {
        this.backgroundSprite ??= this._bindSprite('Background');
        this.lionSprite ??= this._bindSprite('Lion');
        this.elephantSprite ??= this._bindSprite('Elephant');
        this.tigerSprite ??= this._bindSprite('Tiger');
        this.logoSprite ??= this._bindSprite('Logo');
        this.dragonSprite ??= this._bindSprite('Dragon');
        this.progressBackgroundSprite ??= this._bindSprite('ProgressBar/ProgressBackground');
        this.progressActivedSprite ??= this._bindSprite('ProgressBar/ProgressActived');
        this.subtitleLabel ??= this._bindLabel('Subtitle');
        this.enterTipLabel ??= this._bindLabel('EnterTip');
        this.progressLabel ??= this._bindLabel('ProgressBar/ProgressPercent');
        this._firstLoadTipLabel = this._bindLabel('ProgressBar/FirstLoadTip');
    }

    private _applyTextContent() {
        if (this.subtitleLabel) {
            this.subtitleLabel.string = '经典策略 · 趣味对战';
            this.subtitleLabel.fontSize = 30;
            this.subtitleLabel.lineHeight = 38;
        }

        if (this.enterTipLabel) {
            this.enterTipLabel.string = '正在进入游戏...';
            this.enterTipLabel.fontSize = 28;
            this.enterTipLabel.lineHeight = 36;
        }

        if (this.progressLabel) {
            this.progressLabel.fontSize = 26;
            this.progressLabel.lineHeight = 34;
            this.progressLabel.string = this._getProgressText();
        }

        if (this._firstLoadTipLabel) {
            this._firstLoadTipLabel.string = '首次加载可能需要一些时间';
            this._firstLoadTipLabel.fontSize = 24;
            this._firstLoadTipLabel.lineHeight = 32;
            this._firstLoadTipLabel.color = new Color(255, 255, 255, 128);
        }
    }

    private async _loadImageContent() {
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
            const pageTransform = this.node.getComponent(UITransform);
            const transform = sprite.node.getComponent(UITransform);
            if (pageTransform && transform) {
                this._setCoverSize(transform, spriteFrame, pageTransform.contentSize.width, pageTransform.contentSize.height);
            }
        }

        if (config.name === 'ProgressActived') {
            this._configureProgressFill(sprite);
        }
    }

    private _bindSprite(path: string): Sprite | null {
        const node = this._findPrefabNode(path);
        if (!node) return null;

        this._preparePrefabNode(node);
        const sprite = node.getComponent(Sprite) ?? node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        return sprite;
    }

    private _bindLabel(path: string): Label | null {
        const node = this._findPrefabNode(path);
        if (!node) return null;

        this._preparePrefabNode(node);
        const label = node.getComponent(Label) ?? node.addComponent(Label);
        label.color = label.color ?? new Color(255, 255, 255, 255);
        label.horizontalAlign = Label.HorizontalAlign.CENTER;
        label.verticalAlign = Label.VerticalAlign.CENTER;
        label.overflow = Label.Overflow.CLAMP;
        return label;
    }

    private _preparePrefabNode(node: Node) {
        node.layer = this.node.layer;
        node.getComponent(UITransform) ?? node.addComponent(UITransform);
    }

    private _findPrefabNode(path: string): Node | null {
        const node = path.split('/').reduce<Node | null>((current, name) => current?.getChildByName(name) ?? null, this.node);
        if (!node) {
            console.warn(`[LoadingPage] prefab 缺少节点: ${path}`);
        }
        return node;
    }

    private _setCoverSize(transform: UITransform, spriteFrame: SpriteFrame, containerWidth: number, containerHeight: number) {
        const originalSize = spriteFrame.originalSize as { width?: number; height?: number } | null;
        const imageWidth = originalSize?.width || spriteFrame.width || containerWidth;
        const imageHeight = originalSize?.height || spriteFrame.height || containerHeight;
        const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);

        transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
    }

    private async _loadImageSpriteFrame(path: string): Promise<SpriteFrame | null> {
        const spriteFrame = await this._loadOptional(`${path}/spriteFrame`, SpriteFrame);
        if (spriteFrame) return this._ensureSpriteFrameSize(spriteFrame);

        const texture = await this._loadOptional(`${path}/texture`, Texture2D);
        if (!texture) return null;

        const generatedSpriteFrame = new SpriteFrame();
        generatedSpriteFrame.texture = texture;
        return this._ensureSpriteFrameSize(generatedSpriteFrame, texture.width, texture.height);
    }

    private async _loadOptional<T extends SpriteFrame | Texture2D>(path: string, type: new () => T): Promise<T | null> {
        return new Promise<T | null>((resolve) => {
            resources.load(path, type, (error, asset) => {
                resolve(error || !asset ? null : asset as T);
            });
        });
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
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        sprite.type = Sprite.Type.FILLED;
        sprite.fillType = Sprite.FillType.HORIZONTAL;
        sprite.fillStart = 0;
        sprite.fillRange = this._progress;
    }

    private _setLoadingProgress(value: number) {
        this._progress = Math.max(0, Math.min(1, value));
        if (this.progressActivedSprite) {
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
        UIManager.getInstance().openPage('prefabs/pages/HomePage');
    }
}

js.setClassAlias(LoadingPage, 'LoadingPage');

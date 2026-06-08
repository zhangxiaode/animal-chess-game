import { _decorator, Color, Component, Label, Node, Rect, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3 } from 'cc';
import { ResManager } from '../framework/ResManager';
import { UIManager } from '../framework/UIManager';

const { ccclass } = _decorator;

@ccclass('LoadingPage')
export class LoadingPage extends Component {
    private _hasEnteredHome = false;
    private _activeProgressSprite: Sprite | null = null;
    private _progressLabel: Label | null = null;
    private _loadedAssetCount = 0;
    private _loadingStartTime = 0;
    private _progress = 0;
    private readonly _loadingAssetTotal = 8;
    private readonly _minLoadingSeconds = 3;
    private readonly _animalConfigs = [
        { name: 'Lion', path: 'images/loading/lion', size: 88, x: -108 },
        { name: 'Elephant', path: 'images/loading/elephant', size: 120, x: 0 },
        { name: 'Tiger', path: 'images/loading/tiger', size: 88, x: 108 },
    ];

    start() {
        if (this.node.parent) {
            this.node.layer = this.node.parent.layer;
        }

        this._startLoading();
    }

    protected onDestroy() {
        this.unschedule(this._enterHome);
    }

    private async _startLoading() {
        this._loadingStartTime = Date.now();
        this._setLoadingProgress(0);

        this._createSubtitle();
        this._createEnterTip();

        await Promise.all([
            this._createBackground(),
            this._createAnimalImages(),
            this._createLogoImage(),
            this._createDragonImage(),
            this._createProgressBar(),
        ]);

        this._setLoadingProgress(1);
        await this._waitMinLoadingTime();
        this._enterHome();
    }

    private async _createBackground() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageWidth = pageTransform?.contentSize.width ?? 750;
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const backgroundNode = new Node('Background');
        backgroundNode.layer = this.node.layer;
        backgroundNode.parent = this.node;
        backgroundNode.setPosition(Vec3.ZERO);
        backgroundNode.setSiblingIndex(0);

        const backgroundTransform = backgroundNode.addComponent(UITransform);
        backgroundTransform.setContentSize(pageWidth, pageHeight);

        const backgroundSprite = backgroundNode.addComponent(Sprite);
        backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const spriteFrame = await this._loadBackgroundSpriteFrame();
        if (!spriteFrame || !backgroundNode.isValid) {
            console.warn('[LoadingPage] 背景图加载失败: images/loading/bg');
            return;
        }

        backgroundSprite.spriteFrame = spriteFrame;
        this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
    }

    private _setCoverSize(transform: UITransform, spriteFrame: SpriteFrame, containerWidth: number, containerHeight: number) {
        const originalSize = spriteFrame.originalSize as { width?: number; height?: number } | null;
        const imageWidth = originalSize?.width || spriteFrame.width || containerWidth;
        const imageHeight = originalSize?.height || spriteFrame.height || containerHeight;
        const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);

        transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
    }

    private async _loadBackgroundSpriteFrame(): Promise<SpriteFrame | null> {
        return this._loadTrackedImageSpriteFrame('images/loading/bg');
    }

    private async _createAnimalImages() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;
        const centerY = pageHeight / 2 - 150;

        for (const config of this._animalConfigs) {
            const animalNode = new Node(config.name);
            animalNode.layer = this.node.layer;
            animalNode.parent = this.node;
            animalNode.setPosition(new Vec3(config.x, centerY, 0));

            const animalTransform = animalNode.addComponent(UITransform);
            animalTransform.setContentSize(config.size, config.size);

            const animalSprite = animalNode.addComponent(Sprite);
            animalSprite.sizeMode = Sprite.SizeMode.CUSTOM;

            const spriteFrame = await this._loadTrackedImageSpriteFrame(config.path);
            if (!spriteFrame || !animalNode.isValid) {
                console.warn(`[LoadingPage] 图片加载失败: ${config.path}`);
                continue;
            }

            animalSprite.spriteFrame = spriteFrame;
        }
    }

    private async _createLogoImage() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const logoNode = new Node('Logo');
        logoNode.layer = this.node.layer;
        logoNode.parent = this.node;
        logoNode.setPosition(new Vec3(0, pageHeight / 2 - 420, 0));

        const logoTransform = logoNode.addComponent(UITransform);
        logoTransform.setContentSize(240, 200);

        const logoSprite = logoNode.addComponent(Sprite);
        logoSprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const spriteFrame = await this._loadTrackedImageSpriteFrame('images/loading/logo');
        if (!spriteFrame || !logoNode.isValid) {
            console.warn('[LoadingPage] 图片加载失败: images/loading/logo');
            return;
        }

        logoSprite.spriteFrame = spriteFrame;
    }

    private _createSubtitle() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const subtitleNode = new Node('Subtitle');
        subtitleNode.layer = this.node.layer;
        subtitleNode.parent = this.node;
        subtitleNode.setPosition(new Vec3(0, pageHeight / 2 - 540, 0));

        const subtitleTransform = subtitleNode.addComponent(UITransform);
        subtitleTransform.setContentSize(360, 42);

        const subtitleLabel = subtitleNode.addComponent(Label);
        subtitleLabel.string = '经典策略 · 趣味对战';
        subtitleLabel.fontSize = 30;
        subtitleLabel.color = new Color(255, 255, 255, 255);
        subtitleLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        subtitleLabel.verticalAlign = Label.VerticalAlign.CENTER;
        subtitleLabel.overflow = Label.Overflow.CLAMP;
    }

    private async _createDragonImage() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const dragonNode = new Node('Dragon');
        dragonNode.layer = this.node.layer;
        dragonNode.parent = this.node;
        dragonNode.setPosition(new Vec3(0, pageHeight / 2 - 770, 0));

        const dragonTransform = dragonNode.addComponent(UITransform);
        dragonTransform.setContentSize(320, 320);

        const dragonSprite = dragonNode.addComponent(Sprite);
        dragonSprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const spriteFrame = await this._loadTrackedImageSpriteFrame('images/loading/dragon');
        if (!spriteFrame || !dragonNode.isValid) {
            console.warn('[LoadingPage] 图片加载失败: images/loading/dragon');
            return;
        }

        dragonSprite.spriteFrame = spriteFrame;
    }

    private async _createProgressBar() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;
        const progressWidth = 310;
        const progressHeight = 16;

        const progressRoot = new Node('ProgressBar');
        progressRoot.layer = this.node.layer;
        progressRoot.parent = this.node;
        progressRoot.setPosition(new Vec3(0, pageHeight / 2 - 1060, 0));
        progressRoot.addComponent(UITransform).setContentSize(progressWidth, progressHeight);

        const backgroundNode = new Node('ProgressBackground');
        backgroundNode.layer = this.node.layer;
        backgroundNode.parent = progressRoot;
        backgroundNode.setPosition(Vec3.ZERO);
        backgroundNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);

        const backgroundSprite = backgroundNode.addComponent(Sprite);
        backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const activeNode = new Node('ProgressActived');
        activeNode.layer = this.node.layer;
        activeNode.parent = progressRoot;
        activeNode.setPosition(Vec3.ZERO);
        activeNode.addComponent(UITransform).setContentSize(progressWidth, progressHeight);

        this._activeProgressSprite = activeNode.addComponent(Sprite);
        this._activeProgressSprite.sizeMode = Sprite.SizeMode.CUSTOM;
        this._activeProgressSprite.type = Sprite.Type.FILLED;
        this._activeProgressSprite.fillType = Sprite.FillType.HORIZONTAL;

        const progressLabelNode = new Node('ProgressPercent');
        progressLabelNode.layer = this.node.layer;
        progressLabelNode.parent = progressRoot;
        progressLabelNode.setPosition(new Vec3(0, -42, 0));
        progressLabelNode.addComponent(UITransform).setContentSize(160, 36);

        this._progressLabel = progressLabelNode.addComponent(Label);
        this._progressLabel.string = this._getProgressText();
        this._progressLabel.fontSize = 26;
        this._progressLabel.color = new Color(255, 255, 255, 255);
        this._progressLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        this._progressLabel.verticalAlign = Label.VerticalAlign.CENTER;
        this._progressLabel.overflow = Label.Overflow.CLAMP;

        const firstLoadTipNode = new Node('FirstLoadTip');
        firstLoadTipNode.layer = this.node.layer;
        firstLoadTipNode.parent = progressRoot;
        firstLoadTipNode.setPosition(new Vec3(0, -90, 0));
        firstLoadTipNode.addComponent(UITransform).setContentSize(360, 36);

        const firstLoadTipLabel = firstLoadTipNode.addComponent(Label);
        firstLoadTipLabel.string = '首次加载可能需要一些时间';
        firstLoadTipLabel.fontSize = 24;
        firstLoadTipLabel.color = new Color(255, 255, 255, 128);
        firstLoadTipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        firstLoadTipLabel.verticalAlign = Label.VerticalAlign.CENTER;
        firstLoadTipLabel.overflow = Label.Overflow.CLAMP;

        const [backgroundFrame, activeFrame] = await Promise.all([
            this._loadTrackedImageSpriteFrame('images/loading/loading'),
            this._loadTrackedImageSpriteFrame('images/loading/loading-actived'),
        ]);

        if (backgroundFrame && backgroundNode.isValid) {
            backgroundSprite.spriteFrame = backgroundFrame;
        } else {
            console.warn('[LoadingPage] 图片加载失败: images/loading/loading');
        }

        if (activeFrame && activeNode.isValid && this._activeProgressSprite) {
            this._activeProgressSprite.spriteFrame = activeFrame;
            this._activeProgressSprite.fillStart = 0;
            this._activeProgressSprite.fillRange = this._progress;
        } else {
            console.warn('[LoadingPage] 图片加载失败: images/loading/loading-actived');
        }
    }

    private _createEnterTip() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const tipNode = new Node('EnterTip');
        tipNode.layer = this.node.layer;
        tipNode.parent = this.node;
        tipNode.setPosition(new Vec3(0, pageHeight / 2 - 970, 0));

        const tipTransform = tipNode.addComponent(UITransform);
        tipTransform.setContentSize(360, 42);

        const tipLabel = tipNode.addComponent(Label);
        tipLabel.string = '正在进入游戏...';
        tipLabel.fontSize = 28;
        tipLabel.color = new Color(255, 255, 255, 255);
        tipLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        tipLabel.verticalAlign = Label.VerticalAlign.CENTER;
        tipLabel.overflow = Label.Overflow.CLAMP;
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

    private async _loadTrackedImageSpriteFrame(path: string): Promise<SpriteFrame | null> {
        try {
            return await this._loadImageSpriteFrame(path);
        } finally {
            this._loadedAssetCount++;
            this._setLoadingProgress(this._loadedAssetCount / this._loadingAssetTotal);
        }
    }

    private _setLoadingProgress(value: number) {
        this._progress = Math.max(0, Math.min(1, value));
        if (this._activeProgressSprite?.spriteFrame) {
            this._activeProgressSprite.fillRange = this._progress;
        }
        if (this._progressLabel) {
            this._progressLabel.string = this._getProgressText();
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
}

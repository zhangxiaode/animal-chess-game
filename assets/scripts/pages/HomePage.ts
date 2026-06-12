import { _decorator, assetManager, Button, Color, Component, js, Label, LabelOutline, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2 } from 'cc';
import { PopupManager } from '../framework/PopupManager';
import { SoundManager } from '../framework/SoundManager';
import { UIManager } from '../framework/UIManager';

const { ccclass } = _decorator;

@ccclass('HomePage')
export class HomePage extends Component {
    private _backgroundSprite: Sprite | null = null;
    private _homeDecorSprite: Sprite | null = null;
    private _settingButton: Button | null = null;
    private _logoSprite: Sprite | null = null;
    private _rewardButtonSprite: Sprite | null = null;
    private _rankingButtonSprite: Sprite | null = null;
    private _feedbackButtonSprite: Sprite | null = null;
    private _collectButtonSprite: Sprite | null = null;
    private _levelBadgeSprite: Sprite | null = null;
    private _levelLabel: Label | null = null;
    private _startGameButton: Button | null = null;
    private _startGameButtonSprite: Sprite | null = null;
    private _startGameLabel: Label | null = null;

    start() {
        this._hideLegacyEmptyNodes();
        this._bindPrefabReferences();
        this._applyTextContent();
        this._bindEvents();
        this._loadImageContent();
    }

    protected onDestroy() {
        this._settingButton?.node.off(Button.EventType.CLICK, this._onSetting, this);
        this._startGameButton?.node.off(Button.EventType.CLICK, this._onStartGame, this);
        ['RewardButton', 'RankingButton', 'FeedbackButton', 'CollectButton'].forEach((path) => {
            const node = this._findPrefabNode(path);
            node?.off(Button.EventType.CLICK, this._onEntryButtonClick, this);
        });
    }

    onShow(params?: any) {
        console.log('首页显示');
    }

    onHide() {
        console.log('首页隐藏');
    }

    private _hideLegacyEmptyNodes() {
        ['background', 'content', 'ske'].forEach((name) => {
            const node = this.node.getChildByName(name);
            if (node) node.active = false;
        });
    }

    private _bindPrefabReferences() {
        this._backgroundSprite = this._bindSprite('Background');
        this._homeDecorSprite = this._bindSprite('HomeDecor');
        this._settingButton = this._bindButton('SettingButton');
        this._logoSprite = this._bindSprite('Logo');
        this._rewardButtonSprite = this._bindButtonSprite('RewardButton');
        this._rankingButtonSprite = this._bindButtonSprite('RankingButton');
        this._feedbackButtonSprite = this._bindButtonSprite('FeedbackButton');
        this._collectButtonSprite = this._bindButtonSprite('CollectButton');
        this._levelBadgeSprite = this._bindSprite('LevelBadge');
        this._levelLabel = this._bindLabel('LevelBadge/LevelLabel');
        this._startGameButton = this._bindButton('StartGameButton');
        this._startGameButtonSprite = this._startGameButton?.node.getComponent(Sprite) ?? null;
        this._startGameLabel = this._bindLabel('StartGameButton/Label');
    }

    private _applyTextContent() {
        if (this._levelLabel) {
            this._levelLabel.string = '第1关';
            this._levelLabel.fontSize = 36;
            this._levelLabel.lineHeight = 44;
            this._levelLabel.color = new Color(128, 77, 44, 255);
        }

        if (this._startGameLabel) {
            this._startGameLabel.string = '开始游戏';
            this._startGameLabel.fontSize = 42;
            this._startGameLabel.lineHeight = 52;
            this._startGameLabel.color = new Color(255, 255, 255, 255);

            const labelOutline = this._startGameLabel.node.getComponent(LabelOutline) ?? this._startGameLabel.node.addComponent(LabelOutline);
            labelOutline.color = new Color(144, 88, 19, 255);
            labelOutline.width = 3;
        }
    }

    private _bindEvents() {
        this._settingButton?.node.off(Button.EventType.CLICK, this._onSetting, this);
        this._settingButton?.node.on(Button.EventType.CLICK, this._onSetting, this);
        this._startGameButton?.node.off(Button.EventType.CLICK, this._onStartGame, this);
        this._startGameButton?.node.on(Button.EventType.CLICK, this._onStartGame, this);
        ['RewardButton', 'RankingButton', 'FeedbackButton', 'CollectButton'].forEach((path) => {
            const node = this._findPrefabNode(path);
            node?.off(Button.EventType.CLICK, this._onEntryButtonClick, this);
            node?.on(Button.EventType.CLICK, this._onEntryButtonClick, this);
        });
    }

    private async _loadImageContent() {
        await Promise.all([
            this._setSpriteFrame(this._backgroundSprite, 'images/home/bg', '[HomePage] 背景图加载失败: images/home/bg', true),
            this._setSpriteFrame(this._homeDecorSprite, 'images/home/home-bg', '[HomePage] 中部装饰图加载失败: images/home/home-bg'),
            this._setSpriteFrame(this._settingButton?.node.getComponent(Sprite) ?? null, 'images/home/setting', '[HomePage] 设置按钮图片加载失败: images/home/setting'),
            this._setSpriteFrame(this._logoSprite, 'images/home/logo', '[HomePage] Logo 图片加载失败: images/home/logo'),
            this._setSpriteFrame(this._rewardButtonSprite, 'images/home/desktop', '[HomePage] 奖励按钮图片加载失败: images/home/desktop'),
            this._setSpriteFrame(this._rankingButtonSprite, 'images/home/ranking', '[HomePage] 排行按钮图片加载失败: images/home/ranking'),
            this._setSpriteFrame(this._feedbackButtonSprite, 'images/home/feedback', '[HomePage] 反馈按钮图片加载失败: images/home/feedback'),
            this._setSpriteFrame(this._collectButtonSprite, 'images/home/sidebar', '[HomePage] 收藏按钮图片加载失败: images/home/sidebar'),
            this._setSpriteFrame(this._levelBadgeSprite, 'images/home/level_bg', '[HomePage] 关卡背景图片加载失败: images/home/level_bg'),
            this._setSpriteFrame(this._startGameButtonSprite, 'images/home/btn_yellow', '[HomePage] 开始游戏按钮背景加载失败: images/home/btn_yellow'),
        ]);
    }

    private _bindButtonSprite(path: string): Sprite | null {
        const button = this._bindButton(path);
        return button?.node.getComponent(Sprite) ?? null;
    }

    private _bindButton(path: string): Button | null {
        const node = this._findPrefabNode(path);
        if (!node) return null;

        const sprite = this._bindSprite(path);
        const button = node.getComponent(Button) ?? node.addComponent(Button);
        button.interactable = true;
        button.target = node;
        if (sprite) {
            button.transition = Button.Transition.SCALE;
        }
        return button;
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
            console.warn(`[HomePage] prefab 缺少节点: ${path}`);
        }
        return node;
    }

    private async _setSpriteFrame(sprite: Sprite | null, imagePath: string, failMessage: string, coverPage = false) {
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
            const backgroundTransform = sprite.node.getComponent(UITransform);
            if (pageTransform && backgroundTransform) {
                this._setCoverSize(backgroundTransform, spriteFrame, pageTransform.contentSize.width, pageTransform.contentSize.height);
            }
        }
    }

    private _onStartGame() {
        SoundManager.getInstance().playClickFeedback();
        UIManager.getInstance().openPage('prefabs/pages/GamePage', { level: 1 });
    }

    private _onSetting() {
        SoundManager.getInstance().playClickFeedback();
        PopupManager.getInstance().openPopup('prefabs/popups/SettingPopup', { source: 'home' });
    }

    private _onEntryButtonClick() {
        SoundManager.getInstance().playClickFeedback();
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
        const resourceAsset = await new Promise<T | null>((resolve) => {
            resources.load(path, type, (error, asset) => {
                resolve(error || !asset ? null : asset as T);
            });
        });
        if (resourceAsset) return resourceAsset;

        return this._loadBundleOptional('home', path, type);
    }

    private async _loadBundleOptional<T extends SpriteFrame | Texture2D>(bundleName: string, path: string, type: new () => T): Promise<T | null> {
        return new Promise<T | null>((resolve) => {
            assetManager.loadBundle(bundleName, (bundleError, bundle) => {
                if (bundleError || !bundle) {
                    resolve(null);
                    return;
                }

                bundle.load(path, type, (assetError, asset) => {
                    resolve(assetError || !asset ? null : asset as T);
                });
            });
        });
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
}

js.setClassAlias(HomePage, 'HomePage');

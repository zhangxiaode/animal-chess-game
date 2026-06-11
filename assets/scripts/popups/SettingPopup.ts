import { _decorator, Button, Color, Component, Graphics, js, Label, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2 } from 'cc';
import { DataManager } from '../framework/DataManager';
import { PopupManager } from '../framework/PopupManager';
import { SoundManager } from '../framework/SoundManager';

const { ccclass } = _decorator;

@ccclass('SettingPopup')
export class SettingPopup extends Component {
    private _dialogSprite: Sprite | null = null;
    private _titleSprite: Sprite | null = null;
    private _titleLabel: Label | null = null;
    private _closeButton: Button | null = null;
    private _bgmButton: Button | null = null;
    private _effectButton: Button | null = null;
    private _bgmStateLabel: Label | null = null;
    private _effectStateLabel: Label | null = null;
    private _bgmEnabled = true;
    private _effectEnabled = true;

    start() {
        this._bindPrefabReferences();
        this._bindEvents();
        this._loadImages();
        this._loadSettings();
        this._refreshView();
    }

    protected onDestroy() {
        this._closeButton?.node.off(Button.EventType.CLICK, this._onClose, this);
        this._bgmButton?.node.off(Button.EventType.CLICK, this._onBgmToggle, this);
        this._effectButton?.node.off(Button.EventType.CLICK, this._onEffectToggle, this);
    }

    onShow(params?: any) {
        console.log('设置弹窗显示，参数：', params);
    }

    private _bindPrefabReferences() {
        this._dialogSprite = this._bindSprite('Dialog');
        this._titleSprite = this._bindSprite('Dialog/TitleBg');
        this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
        this._closeButton = this._bindButton('Dialog/CloseButton');
        this._bindLabel('Dialog/CloseButton/CloseLabel');
        this._bgmButton = this._bindButton('Dialog/BgmToggle');
        this._effectButton = this._bindButton('Dialog/EffectToggle');
        this._bindLabel('Dialog/BgmToggle/BgmLabel');
        this._bindLabel('Dialog/EffectToggle/EffectLabel');
        this._bgmStateLabel = this._bindLabel('Dialog/BgmToggle/BgmState');
        this._effectStateLabel = this._bindLabel('Dialog/EffectToggle/EffectState');
    }

    private _bindEvents() {
        this._closeButton?.node.on(Button.EventType.CLICK, this._onClose, this);
        this._bgmButton?.node.on(Button.EventType.CLICK, this._onBgmToggle, this);
        this._effectButton?.node.on(Button.EventType.CLICK, this._onEffectToggle, this);
    }

    private _loadSettings() {
        this._bgmEnabled = DataManager.getInstance().getLocal('bgm_enabled', true);
        this._effectEnabled = DataManager.getInstance().getLocal('effect_enabled', true);
    }

    private _refreshView() {
        if (this._titleLabel) {
            this._titleLabel.string = '设置';
            this._titleLabel.fontSize = 40;
            this._titleLabel.lineHeight = 48;
            this._titleLabel.color = new Color(255, 255, 255, 255);
        }

        this._setLabel('Dialog/CloseButton/CloseLabel', '×', 42);
        this._setLabel('Dialog/BgmToggle/BgmLabel', '背景音乐', 30);
        this._setLabel('Dialog/EffectToggle/EffectLabel', '游戏音效', 30);
        this._updateToggleState(this._bgmButton?.node ?? null, this._bgmStateLabel, this._bgmEnabled);
        this._updateToggleState(this._effectButton?.node ?? null, this._effectStateLabel, this._effectEnabled);
    }

    private async _loadImages() {
        await Promise.all([
            this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[SettingPopup] 弹框背景加载失败: images/popup/dialog_bg'),
            this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[SettingPopup] 标题背景加载失败: images/popup/title_bg'),
        ]);
    }

    private _onBgmToggle() {
        this._bgmEnabled = !this._bgmEnabled;
        SoundManager.getInstance().setBGMEnabled(this._bgmEnabled);
        DataManager.getInstance().setLocal('bgm_enabled', this._bgmEnabled);
        SoundManager.getInstance().playEffect('sounds/click');
        this._refreshView();
    }

    private _onEffectToggle() {
        this._effectEnabled = !this._effectEnabled;
        SoundManager.getInstance().setEffectEnabled(this._effectEnabled);
        DataManager.getInstance().setLocal('effect_enabled', this._effectEnabled);
        if (this._effectEnabled) {
            SoundManager.getInstance().playEffect('sounds/click');
        }
        this._refreshView();
    }

    private _onClose() {
        SoundManager.getInstance().playEffect('sounds/click');
        PopupManager.getInstance().closePopup({
            saved: true,
            bgmEnabled: this._bgmEnabled,
            effectEnabled: this._effectEnabled,
        });
    }

    private _updateToggleState(node: Node | null, label: Label | null, enabled: boolean) {
        if (label) {
            label.string = enabled ? '开启' : '关闭';
            label.fontSize = 28;
            label.lineHeight = 36;
            label.color = enabled ? new Color(49, 132, 72, 255) : new Color(150, 82, 70, 255);
        }
        if (!node) return;

        const transform = node.getComponent(UITransform);
        if (!transform) return;

        const graphics = node.getComponent(Graphics) ?? node.addComponent(Graphics);
        const width = transform.contentSize.width;
        const height = transform.contentSize.height;
        graphics.clear();
        graphics.fillColor = new Color(255, 248, 225, 235);
        graphics.roundRect(-width / 2, -height / 2, width, height, 18);
        graphics.fill();
        graphics.strokeColor = enabled ? new Color(98, 196, 116, 255) : new Color(214, 116, 98, 255);
        graphics.lineWidth = 3;
        graphics.roundRect(-width / 2, -height / 2, width, height, 18);
        graphics.stroke();
    }

    private _setLabel(path: string, text: string, fontSize: number) {
        const label = this._bindLabel(path);
        if (!label) return;

        label.string = text;
        label.fontSize = fontSize;
        label.lineHeight = Math.round(fontSize * 1.25);
        label.color = new Color(116, 70, 35, 255);
    }

    private _bindButton(path: string): Button | null {
        const node = this._findPrefabNode(path);
        if (!node) return null;

        this._preparePrefabNode(node);
        const button = node.getComponent(Button) ?? node.addComponent(Button);
        button.interactable = true;
        button.transition = Button.Transition.SCALE;
        button.target = node;
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
            console.warn(`[SettingPopup] prefab 缺少节点: ${path}`);
        }
        return node;
    }

    private async _setSpriteFrame(sprite: Sprite | null, imagePath: string, failMessage: string) {
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
}

js.setClassAlias(SettingPopup, 'SettingPopup');

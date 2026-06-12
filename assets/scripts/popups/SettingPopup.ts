import { _decorator, Button, Color, Component, js, Label, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3 } from 'cc';
import { DataManager } from '../framework/DataManager';
import { PopupManager } from '../framework/PopupManager';
import { SoundManager } from '../framework/SoundManager';

const { ccclass } = _decorator;

type SettingKey = 'vibration' | 'effect' | 'music';

type SwitchNodes = {
    button: Button | null;
    background: Sprite | null;
    knob: Sprite | null;
};

@ccclass('SettingPopup')
export class SettingPopup extends Component {
    private _dialogSprite: Sprite | null = null;
    private _titleSprite: Sprite | null = null;
    private _titleLabel: Label | null = null;
    private _closeButton: Button | null = null;
    private _closeSprite: Sprite | null = null;
    private _closeLabel: Label | null = null;
    private _switches: Record<SettingKey, SwitchNodes> = {
        vibration: { button: null, background: null, knob: null },
        effect: { button: null, background: null, knob: null },
        music: { button: null, background: null, knob: null },
    };
    private _vibrationEnabled = true;
    private _effectEnabled = true;
    private _musicEnabled = true;
    private _switchBgFrame: SpriteFrame | null = null;
    private _switchActiveFrame: SpriteFrame | null = null;
    private _switchCircleFrame: SpriteFrame | null = null;

    start() {
        this._bindPrefabReferences();
        this._bindEvents();
        this._loadImages();
        this._loadSettings();
        this._refreshView();
    }

    protected onDestroy() {
        this._closeButton?.node.off(Button.EventType.CLICK, this._onClose, this);
        this._switches.vibration.button?.node.off(Button.EventType.CLICK, this._onVibrationToggle, this);
        this._switches.effect.button?.node.off(Button.EventType.CLICK, this._onEffectToggle, this);
        this._switches.music.button?.node.off(Button.EventType.CLICK, this._onMusicToggle, this);
    }

    onShow(params?: any) {
        console.log('设置弹窗显示，参数：', params);
    }

    private _bindPrefabReferences() {
        this._dialogSprite = this._bindSprite('Dialog');
        this._titleSprite = this._bindSprite('Dialog/TitleBg');
        this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
        this._closeButton = this._bindButton('Dialog/CloseButton');
        this._closeSprite = this._bindSprite('Dialog/CloseButton');
        this._closeLabel = this._bindLabel('Dialog/CloseButton/CloseLabel');
        this._setNodeSize('Dialog/CloseButton', 90, 88);
        this._bindSwitch('vibration', 'Dialog/VibrationToggle', 'Vibration');
        this._bindSwitch('effect', 'Dialog/EffectToggle', 'Effect');
        this._bindSwitch('music', 'Dialog/MusicToggle', 'Music');
    }

    private _bindEvents() {
        this._closeButton?.node.on(Button.EventType.CLICK, this._onClose, this);
        this._switches.vibration.button?.node.on(Button.EventType.CLICK, this._onVibrationToggle, this);
        this._switches.effect.button?.node.on(Button.EventType.CLICK, this._onEffectToggle, this);
        this._switches.music.button?.node.on(Button.EventType.CLICK, this._onMusicToggle, this);
    }

    private _loadSettings() {
        this._vibrationEnabled = DataManager.getInstance().getLocal('vibration_enabled', true);
        this._effectEnabled = DataManager.getInstance().getLocal('effect_enabled', true);
        this._musicEnabled = DataManager.getInstance().getLocal('bgm_enabled', true);
    }

    private _refreshView() {
        if (this._titleLabel) {
            this._titleLabel.string = '设置';
            this._titleLabel.fontSize = 40;
            this._titleLabel.lineHeight = 48;
            this._titleLabel.color = new Color(255, 255, 255, 255);
        }

        if (this._closeLabel) {
            this._closeLabel.string = '';
        }
        this._setLabel('Dialog/VibrationToggle/VibrationLabel', '震动', 30);
        this._setLabel('Dialog/EffectToggle/EffectLabel', '音效', 30);
        this._setLabel('Dialog/MusicToggle/MusicLabel', '音乐', 30);
        this._updateSwitchState('vibration', this._vibrationEnabled);
        this._updateSwitchState('effect', this._effectEnabled);
        this._updateSwitchState('music', this._musicEnabled);
    }

    private async _loadImages() {
        const [, , , switchBgFrame, switchActiveFrame, switchCircleFrame] = await Promise.all([
            this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[SettingPopup] 弹框背景加载失败: images/popup/dialog_bg'),
            this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[SettingPopup] 标题背景加载失败: images/popup/title_bg'),
            this._setSpriteFrame(this._closeSprite, 'images/popup/close', '[SettingPopup] 关闭按钮图片加载失败: images/popup/close'),
            this._loadImageSpriteFrame('images/popup/switch_bg'),
            this._loadImageSpriteFrame('images/popup/switch_actived'),
            this._loadImageSpriteFrame('images/popup/circle'),
        ]);

        this._switchBgFrame = switchBgFrame;
        this._switchActiveFrame = switchActiveFrame;
        this._switchCircleFrame = switchCircleFrame;
        this._refreshView();
    }

    private _onVibrationToggle() {
        this._vibrationEnabled = !this._vibrationEnabled;
        DataManager.getInstance().setLocal('vibration_enabled', this._vibrationEnabled);
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

    private _onMusicToggle() {
        this._musicEnabled = !this._musicEnabled;
        SoundManager.getInstance().setBGMEnabled(this._musicEnabled);
        DataManager.getInstance().setLocal('bgm_enabled', this._musicEnabled);
        SoundManager.getInstance().playEffect('sounds/click');
        this._refreshView();
    }

    private _onClose() {
        SoundManager.getInstance().playEffect('sounds/click');
        PopupManager.getInstance().closePopup({
            saved: true,
            vibrationEnabled: this._vibrationEnabled,
            bgmEnabled: this._musicEnabled,
            effectEnabled: this._effectEnabled,
        });
    }

    private _bindSwitch(key: SettingKey, togglePath: string, nodePrefix: string) {
        this._switches[key] = {
            button: this._bindButton(togglePath),
            background: this._bindSprite(`${togglePath}/${nodePrefix}SwitchBg`),
            knob: this._bindSprite(`${togglePath}/${nodePrefix}SwitchBg/${nodePrefix}SwitchKnob`),
        };

        this._bindLabel(`${togglePath}/${nodePrefix}Label`);
        this._setNodeSize(`${togglePath}/${nodePrefix}SwitchBg`, 154, 72);
        this._setNodeSize(`${togglePath}/${nodePrefix}SwitchBg/${nodePrefix}SwitchKnob`, 72, 72);
    }

    private _updateSwitchState(key: SettingKey, enabled: boolean) {
        const item = this._switches[key];
        if (item.background) {
            item.background.spriteFrame = enabled ? this._switchActiveFrame : this._switchBgFrame;
        }
        if (item.knob) {
            item.knob.spriteFrame = this._switchCircleFrame;
            item.knob.node.setPosition(new Vec3(enabled ? 41 : -41, 0, 0));
        }
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

    private _setNodeSize(path: string, width: number, height: number) {
        const node = this._findPrefabNode(path);
        if (!node) return;

        const transform = node.getComponent(UITransform) ?? node.addComponent(UITransform);
        transform.setContentSize(width, height);
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
            return null;
        }

        const spriteFrame = await this._loadImageSpriteFrame(imagePath);
        if (!spriteFrame || !sprite.node.isValid) {
            console.warn(failMessage);
            return null;
        }

        sprite.spriteFrame = spriteFrame;
        return spriteFrame;
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

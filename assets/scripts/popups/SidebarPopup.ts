import { _decorator, Button, Color, Component, js, Label, Node, Rect, resources, Size, Sprite, SpriteFrame, Texture2D, UITransform, Vec2, Vec3 } from 'cc';
import { PopupManager } from '../framework/PopupManager';
import { SoundManager } from '../framework/SoundManager';
import { addToSidebar } from '../utils/SidebarUtils';

const { ccclass } = _decorator;

@ccclass('SidebarPopup')
export class SidebarPopup extends Component {
    private _dialogSprite: Sprite | null = null;
    private _titleSprite: Sprite | null = null;
    private _titleLabel: Label | null = null;
    private _closeButton: Button | null = null;
    private _closeSprite: Sprite | null = null;
    private _closeLabel: Label | null = null;
    private _contentSprite: Sprite | null = null;
    private _submitButton: Button | null = null;
    private _submitButtonSprite: Sprite | null = null;
    private _submitLabel: Label | null = null;
    private _isSubmitting = false;

    start() {
        this._bindPrefabReferences();
        this._bindEvents();
        this._loadImages();
        this._refreshView();
    }

    protected onDestroy() {
        this._closeButton?.node?.off(Button.EventType.CLICK, this._onClose, this);
        this._submitButton?.node?.off(Button.EventType.CLICK, this._onSubmit, this);
    }

    onShow(params?: any) {
        console.log('我的小程序弹窗显示，参数：', params);
    }

    private _bindPrefabReferences() {
        this._dialogSprite = this._bindSprite('Dialog');
        this._titleSprite = this._bindSprite('Dialog/TitleBg');
        this._titleLabel = this._bindLabel('Dialog/TitleBg/TitleLabel');
        this._closeButton = this._bindButton('Dialog/CloseButton');
        this._closeSprite = this._bindSprite('Dialog/CloseButton');
        this._closeLabel = this._bindLabel('Dialog/CloseButton/CloseLabel');
        this._setNodeSize('Dialog/CloseButton', 90, 88);
        this._contentSprite = this._createContentSprite();
        this._bindSubmitButton();

        ['Dialog/VibrationToggle', 'Dialog/EffectToggle', 'Dialog/MusicToggle'].forEach((path) => {
            const node = this._findPrefabNode(path);
            if (node) node.active = false;
        });
    }

    private _bindEvents() {
        this._closeButton?.node.on(Button.EventType.CLICK, this._onClose, this);
        this._submitButton?.node.on(Button.EventType.CLICK, this._onSubmit, this);
    }

    private _refreshView() {
        if (this._titleLabel) {
            this._titleLabel.string = '我的小程序';
            this._titleLabel.fontSize = 36;
            this._titleLabel.lineHeight = 44;
            this._titleLabel.color = new Color(255, 255, 255, 255);
        }

        if (this._closeLabel) {
            this._closeLabel.string = '';
        }

        if (this._submitLabel) {
            this._submitLabel.string = '提交';
            this._submitLabel.fontSize = 42;
            this._submitLabel.lineHeight = 52;
            this._submitLabel.color = new Color(255, 255, 255, 255);
        }
    }

    private async _loadImages() {
        await Promise.all([
            this._setSpriteFrame(this._dialogSprite, 'images/popup/dialog_bg', '[SidebarPopup] 弹框背景加载失败: images/popup/dialog_bg'),
            this._setSpriteFrame(this._titleSprite, 'images/popup/title_bg', '[SidebarPopup] 标题背景加载失败: images/popup/title_bg'),
            this._setSpriteFrame(this._closeSprite, 'images/popup/close', '[SidebarPopup] 关闭按钮图片加载失败: images/popup/close'),
            this._setSpriteFrame(this._contentSprite, 'images/popup/sidebar-img', '[SidebarPopup] 内容图片加载失败: images/popup/sidebar-img'),
            this._setSpriteFrame(this._submitButtonSprite, 'images/popup/btn_yellow', '[SidebarPopup] 提交按钮背景加载失败: images/popup/btn_yellow'),
        ]);
    }

    private _onClose() {
        SoundManager.getInstance().playClickFeedback();
        PopupManager.getInstance().closePopup({ action: 'close' });
    }

    private async _onSubmit() {
        if (this._isSubmitting) return;

        SoundManager.getInstance().playClickFeedback();
        this._isSubmitting = true;
        if (this._submitButton) {
            this._submitButton.interactable = false;
        }

        const result = await addToSidebar();
        if (!this.node?.isValid) return;

        PopupManager.getInstance().closePopup({
            action: 'submit',
            addSidebarResult: result,
        });
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

    private _createContentSprite(): Sprite | null {
        const dialog = this._findPrefabNode('Dialog');
        if (!dialog) return null;

        const node = dialog.getChildByName('ContentImage') ?? new Node('ContentImage');
        if (!node.parent) {
            dialog.addChild(node);
        }
        this._preparePrefabNode(node);
        node.setPosition(new Vec3(0, 28, 0));

        const transform = node.getComponent(UITransform) ?? node.addComponent(UITransform);
        transform.setContentSize(456, 548);

        const sprite = node.getComponent(Sprite) ?? node.addComponent(Sprite);
        sprite.sizeMode = Sprite.SizeMode.CUSTOM;
        return sprite;
    }

    private _bindSubmitButton() {
        const dialog = this._findPrefabNode('Dialog');
        if (!dialog) return;

        const node = dialog.getChildByName('SubmitButton') ?? new Node('SubmitButton');
        if (!node.parent) {
            dialog.addChild(node);
        }
        this._preparePrefabNode(node);
        node.setPosition(new Vec3(0, -302, 0));

        const transform = node.getComponent(UITransform) ?? node.addComponent(UITransform);
        transform.setContentSize(418, 162);

        this._submitButtonSprite = node.getComponent(Sprite) ?? node.addComponent(Sprite);
        this._submitButtonSprite.sizeMode = Sprite.SizeMode.CUSTOM;
        this._submitButton = node.getComponent(Button) ?? node.addComponent(Button);
        this._submitButton.interactable = true;
        this._submitButton.transition = Button.Transition.SCALE;
        this._submitButton.target = node;

        const labelNode = node.getChildByName('Label') ?? new Node('Label');
        if (!labelNode.parent) {
            node.addChild(labelNode);
        }
        this._preparePrefabNode(labelNode);
        labelNode.setPosition(Vec3.ZERO);

        const labelTransform = labelNode.getComponent(UITransform) ?? labelNode.addComponent(UITransform);
        labelTransform.setContentSize(300, 70);

        this._submitLabel = labelNode.getComponent(Label) ?? labelNode.addComponent(Label);
        this._submitLabel.horizontalAlign = Label.HorizontalAlign.CENTER;
        this._submitLabel.verticalAlign = Label.VerticalAlign.CENTER;
        this._submitLabel.overflow = Label.Overflow.CLAMP;
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
            console.warn(`[SidebarPopup] prefab 缺少节点: ${path}`);
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
        const resourceAsset = await new Promise<T | null>((resolve) => {
            resources.load(path, type, (error, asset) => {
                resolve(error || !asset ? null : asset as T);
            });
        });
        if (resourceAsset) return resourceAsset;

        return null;
    }

    private _ensureSpriteFrameSize(spriteFrame: SpriteFrame, fallbackWidth = 0, fallbackHeight = 0) {
        const rect = spriteFrame.rect as Rect | null;
        const originalSize = spriteFrame.originalSize as Size | null;
        const width = rect?.width || originalSize?.width || spriteFrame.width || fallbackWidth;
        const height = rect?.height || originalSize?.height || spriteFrame.height || fallbackHeight;

        if (width > 0 && height > 0) {
            if (!rect || !rect.width || !rect.height) {
                spriteFrame.rect = new Rect(0, 0, width, height);
            }
            if (!originalSize || !originalSize.width || !originalSize.height) {
                spriteFrame.originalSize = new Size(width, height);
            }
            spriteFrame.offset = new Vec2(0, 0);
        }

        return spriteFrame;
    }
}

js.setClassAlias(SidebarPopup, 'SidebarPopup');

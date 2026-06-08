import { _decorator, Component, Node, Sprite, SpriteFrame, UITransform, Vec3 } from 'cc';
import { ResManager } from '../framework/ResManager';

const { ccclass } = _decorator;

@ccclass('LoadingPage')
export class LoadingPage extends Component {
    async start() {
        await this._createBackground();
    }

    private async _createBackground() {
        const pageTransform = this.node.getComponent(UITransform);
        const pageWidth = pageTransform?.contentSize.width ?? 750;
        const pageHeight = pageTransform?.contentSize.height ?? 1334;

        const backgroundNode = new Node('Background');
        backgroundNode.parent = this.node;
        backgroundNode.setPosition(Vec3.ZERO);
        backgroundNode.setSiblingIndex(0);

        const backgroundTransform = backgroundNode.addComponent(UITransform);
        backgroundTransform.setContentSize(pageWidth, pageHeight);

        const backgroundSprite = backgroundNode.addComponent(Sprite);
        backgroundSprite.sizeMode = Sprite.SizeMode.CUSTOM;

        const spriteFrame = await ResManager.getInstance().loadSpriteFrame('images/loading/bg');
        if (!spriteFrame || !backgroundNode.isValid) return;

        backgroundSprite.spriteFrame = spriteFrame;
        this._setCoverSize(backgroundTransform, spriteFrame, pageWidth, pageHeight);
    }

    private _setCoverSize(transform: UITransform, spriteFrame: SpriteFrame, containerWidth: number, containerHeight: number) {
        const imageWidth = spriteFrame.originalSize.width || containerWidth;
        const imageHeight = spriteFrame.originalSize.height || containerHeight;
        const scale = Math.max(containerWidth / imageWidth, containerHeight / imageHeight);

        transform.setContentSize(Math.ceil(imageWidth * scale), Math.ceil(imageHeight * scale));
    }
}

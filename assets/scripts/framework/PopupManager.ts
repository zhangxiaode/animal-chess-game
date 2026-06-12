import { _decorator, assetManager, Node, Prefab, instantiate, tween, UITransform, Color, Graphics, Input, EventTouch, Vec3, UIOpacity } from 'cc';
import { Singleton } from './Singleton';

const { ccclass } = _decorator;

const POPUP_PREFAB_UUID_MAP: Record<string, string> = {
    SettingPopup: 'a37a4ed6-3b8c-47bd-afd5-52f10ed88395',
};

const POPUP_BUNDLE_MAP: Record<string, string> = {
    SettingPopup: 'popups',
};

@ccclass('PopupManager')
export class PopupManager extends Singleton<PopupManager> {
    private _root: Node = null!;
    private _popupStack: { node: Node; path: string; callback?: Function }[] = [];
    private _mask: Node = null!;

    /**
     * 初始化弹窗管理器
     * @param root 弹窗根节点（层级高于页面）
     */
    init(root: Node) {
        this._root = root;
        this._createMask();
    }

    private _createMask() {
        this._mask = new Node('popup_mask');
        const uiTransform = this._mask.addComponent(UITransform);
        uiTransform.anchorX = 0.5;
        uiTransform.anchorY = 0.5;

        this._mask.addComponent(Graphics);
        this._refreshMask();

        this._mask.on(Input.EventType.TOUCH_END, this._onMaskClick, this);
        this._mask.active = false;
        this._root.addChild(this._mask);
    }

    private _refreshMask() {
        if (!this._mask) return;

        const rootTransform = this._root.getComponent(UITransform);
        const width = rootTransform?.contentSize.width ?? 750;
        const height = rootTransform?.contentSize.height ?? 1334;

        const uiTransform = this._mask.getComponent(UITransform) ?? this._mask.addComponent(UITransform);
        uiTransform.setContentSize(width, height);

        const graphics = this._mask.getComponent(Graphics) ?? this._mask.addComponent(Graphics);
        graphics.clear();
        graphics.fillColor = new Color(0, 0, 0, 150);
        graphics.rect(-width / 2, -height / 2, width, height);
        graphics.fill();
    }

    /**
     * 打开弹窗
     * @param prefabPath 预制体路径（如 prefabs/popups/xxx）
     * @param params 传递给弹窗的参数
     * @param callback 弹窗关闭回调
     * @param closeOnMaskClick 点击遮罩是否关闭
     */
    async openPopup(prefabPath: string, params?: any, callback?: Function, closeOnMaskClick: boolean = true) {
        // 加载并实例化弹窗
        const popupName = this._extractPopupName(prefabPath);
        const prefab = await this._loadPopupPrefab(prefabPath, popupName);
        if (!prefab) {
            console.warn(`弹窗预制体加载失败: ${prefabPath}`);
            return;
        }
        const popupNode = instantiate(prefab) as Node;
        popupNode.parent = this._root;
        const popupOpacity = popupNode.addComponent(UIOpacity);

        // 传递参数
        if (popupNode.getComponent(prefab.data.name)) {
            const comp = popupNode.getComponent(prefab.data.name)!;
            if (comp['onShow']) {
                comp['onShow'](params);
            }
        }

        // 添加到弹窗栈
        this._popupStack.push({ node: popupNode, path: prefabPath, callback });

        // 显示遮罩
        this._refreshMask();
        this._mask.active = true;
        this._mask['closeOnMaskClick'] = closeOnMaskClick;
        this._mask.setSiblingIndex(popupNode.getSiblingIndex() - 1);

        // 弹出动画
        popupNode.scale.set(0.8, 0.8, 1);
        popupOpacity.opacity = 0;
        tween(popupNode)
            .to(0.2, { scale: new Vec3(1.05, 1.05, 1) })
            .to(0.1, { scale: Vec3.ONE })
            .start();
        tween(popupOpacity)
            .to(0.2, { opacity: 255 })
            .start();
    }

    /**
     * 关闭最上层弹窗
     * @param result 传递给回调的结果
     */
    closePopup(result?: any) {
        if (this._popupStack.length === 0) return;

        const current = this._popupStack.pop()!;
        const popupNode = current.node;

        // 关闭动画
        const popupOpacity = popupNode.getComponent(UIOpacity);
        tween(popupNode)
            .to(0.2, { scale: new Vec3(0.8, 0.8, 1) })
            .call(() => {
                popupNode.destroy();
                // 执行回调
                if (current.callback) {
                    current.callback(result);
                }

                // 隐藏遮罩
                if (this._popupStack.length === 0) {
                    this._mask.active = false;
                } else {
                    // 调整遮罩层级
                    const topPopup = this._popupStack[this._popupStack.length - 1].node;
                    this._mask.setSiblingIndex(topPopup.getSiblingIndex() - 1);
                }
            })
            .start();

        if (popupOpacity) {
            tween(popupOpacity)
                .to(0.2, { opacity: 0 })
                .start();
        }
    }

    /**
     * 关闭所有弹窗
     */
    closeAllPopups() {
        while (this._popupStack.length > 0) {
            const current = this._popupStack.pop()!;
            current.node.destroy();
        }
        this._mask.active = false;
    }

    private _onMaskClick(event: EventTouch) {
        if (this._mask['closeOnMaskClick']) {
            this.closePopup();
        }
    }

    private _extractPopupName(path: string) {
        const parts = path.split('/');
        return parts[parts.length - 1];
    }

    private async _loadPopupPrefab(prefabPath: string, popupName: string): Promise<Prefab | null> {
        const bundleName = POPUP_BUNDLE_MAP[popupName];
        if (bundleName) {
            const bundlePrefab = await this._loadBundlePrefab(bundleName, popupName);
            if (bundlePrefab) return bundlePrefab;
        }

        const uuid = POPUP_PREFAB_UUID_MAP[popupName];
        if (!uuid) return null;

        return new Promise<Prefab | null>((resolve) => {
            assetManager.loadAny({ uuid }, Prefab, (error, asset) => {
                resolve(error || !asset ? null : asset as Prefab);
            });
        });
    }

    private async _loadBundlePrefab(bundleName: string, popupName: string): Promise<Prefab | null> {
        return new Promise<Prefab | null>((resolve) => {
            assetManager.loadBundle(bundleName, (bundleError, bundle) => {
                if (bundleError || !bundle) {
                    console.warn(`加载弹窗资源包失败: ${bundleName}`, bundleError);
                    resolve(null);
                    return;
                }

                bundle.load(popupName, Prefab, (prefabError, prefab) => {
                    if (prefabError || !prefab) {
                        console.warn(`弹窗资源包预制体加载失败 ${bundleName}:${popupName}`, prefabError);
                        resolve(null);
                        return;
                    }

                    resolve(prefab);
                });
            });
        });
    }
}

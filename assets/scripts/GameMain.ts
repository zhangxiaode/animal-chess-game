import { _decorator, Component, Node, game, UITransform, js, Prefab, instantiate, Widget, Vec3 } from 'cc';
import { UIManager } from './framework/UIManager';
import { PopupManager } from './framework/PopupManager';
import { SoundManager } from './framework/SoundManager';
import { DataManager } from './framework/DataManager';
import { HttpManager } from './framework/HttpManager';
import { getCurrentPlatform, getPlatformGameInfo } from './utils/Constants';
import { UserSystem } from './system/UserSystem';
import './pages/LoadingPage';

const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    @property(Prefab)
    public loadingPagePrefab: Prefab | null = null;

    public static ui: UIManager;
    public static popup: PopupManager;
    public static sound: SoundManager;
    public static data: DataManager;
    public static http: HttpManager;

    private _uiRoot: Node = null!;
    private _popupRoot: Node = null!;

    onLoad() {
        const platform = getCurrentPlatform();
        const gameInfo = getPlatformGameInfo(platform);

        game.frameRate = 60;

        // 动态创建 UIRoot
        this._uiRoot = new Node('UIRoot');
        this._uiRoot.layer = this.node.layer;
        this._uiRoot.parent = this.node;
        const uiTransform = this._uiRoot.addComponent(UITransform);
        const canvasTransform = this.node.getComponent(UITransform);
        if (canvasTransform) {
            uiTransform.setContentSize(canvasTransform.contentSize);
        }

        // 动态创建 PopupRoot
        this._popupRoot = new Node('PopupRoot');
        this._popupRoot.layer = this.node.layer;
        this._popupRoot.parent = this.node;
        const popupTransform = this._popupRoot.addComponent(UITransform);
        if (canvasTransform) {
            popupTransform.setContentSize(canvasTransform.contentSize);
        }

        // 初始化所有管理器
        DataManager.getInstance().init();
        UIManager.getInstance().init(this._uiRoot);
        PopupManager.getInstance().init(this._popupRoot);
        SoundManager.getInstance().init(this.node);
        HttpManager.getInstance().init(gameInfo.apiBaseUrl);

        // 初始化用户系统 - 游戏启动时创建或读取用户数据
        UserSystem.getInstance().initialize();

        GameMain.ui = UIManager.getInstance();
        GameMain.popup = PopupManager.getInstance();
        GameMain.sound = SoundManager.getInstance();
        GameMain.data = DataManager.getInstance();
        GameMain.http = HttpManager.getInstance();

        console.log(`[GameMain] platform=${platform}, app=${gameInfo.appName}`);
    }

    async start() {
        const loadingPageNode = await this._createLoadingPage();
        loadingPageNode.active = false;
        loadingPageNode.layer = this._uiRoot.layer;
        this._disableWidgets(loadingPageNode);

        const loadingTransform = loadingPageNode.getComponent(UITransform) ?? loadingPageNode.addComponent(UITransform);
        const uiTransform = this._uiRoot.getComponent(UITransform);
        if (uiTransform) {
            loadingTransform.setContentSize(uiTransform.contentSize);
        }
        loadingPageNode.setPosition(Vec3.ZERO);
        loadingPageNode.parent = this._uiRoot;
        loadingPageNode.active = true;

        UIManager.getInstance().registerInitialPage(loadingPageNode, 'LoadingPage');
    }

    private async _createLoadingPage(): Promise<Node> {
        if (!this.loadingPagePrefab) {
            throw new Error('[GameMain] 请在编辑器中绑定 assets/prefabs/pages/LoadingPage.prefab 到 loadingPagePrefab，Loading 页面不再使用 TS 动态渲染。');
        }

        return instantiate(this.loadingPagePrefab) as Node;
    }

    private _disableWidgets(root: Node) {
        root.getComponentsInChildren(Widget).forEach((widget) => {
            widget.enabled = false;
        });
    }
}

// 兼容场景中使用类名或脚本 UUID 的反序列化查找。
js.setClassAlias(GameMain, 'GameMain');
js.setClassAlias(GameMain, '39bb67ff-34a0-41a7-af7c-00c4b48a1fa5');

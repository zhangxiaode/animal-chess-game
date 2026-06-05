import { _decorator, Component, Button, Label, Node, UITransform, Color, Sprite, Graphics, Vec3 } from 'cc';
import { UIManager } from '../framework/UIManager';
import { SoundManager } from '../framework/SoundManager';
import { UserSystem } from '../system/UserSystem';
import { RankSystem } from '../game/RankSystem';

const { ccclass } = _decorator;

@ccclass('HomePage')
export class HomePage extends Component {
    private _startGameBtn: Button | null = null;
    private _rulesBtn: Button | null = null;
    private _userInfoPanel: Node | null = null;

    private _getUiScale(pageTransform?: UITransform | null): number {
        const content = pageTransform?.contentSize ?? this.node.getComponent(UITransform)?.contentSize;
        const pageWidth = content?.width ?? 640;
        const pageHeight = content?.height ?? 960;
        const scale = Math.min(pageWidth / 640, pageHeight / 960);
        return Math.max(1, scale);
    }

    private _scaled(value: number, scale: number): number {
        return Math.round(value * scale);
    }

    start() {
        this._createUI();
    }

    /**
     * 动态创建UI元素
     */
    private _createUI() {
        const pageRoot = this.node;
        const pageTransform = pageRoot.getComponent(UITransform);
        const uiScale = this._getUiScale(pageTransform);
        const pageSize = pageTransform?.contentSize;
        const pageHeight = pageSize?.height ?? 960;

        const backgroundNode = new Node('Background');
        backgroundNode.parent = pageRoot;
        backgroundNode.setPosition(Vec3.ZERO);
        const backgroundTransform = backgroundNode.addComponent(UITransform);
        if (pageTransform) {
            backgroundTransform.setContentSize(pageTransform.contentSize);
        }

        const backgroundGraphics = backgroundNode.addComponent(Graphics);
        backgroundGraphics.fillColor = new Color(238, 238, 238, 255);
        const backgroundSize = backgroundTransform.contentSize;
        backgroundGraphics.rect(-backgroundSize.width / 2, -backgroundSize.height / 2, backgroundSize.width, backgroundSize.height);
        backgroundGraphics.fill();

        // 创建用户信息面板
        this._createUserInfoPanel(pageRoot, uiScale, pageHeight);

        const btnGroupCenterY = -pageHeight * 0.02;
        this._startGameBtn = this._createButton(pageRoot, 'StartGameBtn', '开始游戏', new Vec3(0, btnGroupCenterY + this._scaled(55, uiScale), 0), uiScale);
        this._rulesBtn = this._createButton(pageRoot, 'RulesBtn', '游戏规则', new Vec3(0, btnGroupCenterY - this._scaled(25, uiScale), 0), uiScale);

        if (this._startGameBtn) {
            this._startGameBtn.node.on(Button.EventType.CLICK, this._onStartGame, this);
        }

        if (this._rulesBtn) {
            this._rulesBtn.node.on(Button.EventType.CLICK, this._onShowRules, this);
        }

        console.log('[HomePage] 按钮创建成功');
    }

    /**
     * 创建用户信息面板
     */
    private _createUserInfoPanel(parent: Node, uiScale: number, pageHeight: number) {
        const userSystem = UserSystem.getInstance();
        const rankSystem = RankSystem.getInstance();

        // 创建用户信息面板容器
        this._userInfoPanel = new Node('UserInfoPanel');
        this._userInfoPanel.parent = parent;
        this._userInfoPanel.setPosition(new Vec3(0, pageHeight * 0.18, 0));

        const panelTransform = this._userInfoPanel.addComponent(UITransform);
        const panelWidth = this._scaled(400, uiScale);
        const panelHeight = this._scaled(160, uiScale);
        panelTransform.setContentSize(panelWidth, panelHeight);

        // 绘制面板背景
        const panelGraphics = this._userInfoPanel.addComponent(Graphics);
        panelGraphics.fillColor = new Color(70, 120, 180, 200);
        panelGraphics.roundRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight, this._scaled(12, uiScale));
        panelGraphics.fill();

        panelGraphics.strokeColor = new Color(40, 80, 140, 255);
        panelGraphics.lineWidth = 2;
        panelGraphics.roundRect(-panelWidth / 2, -panelHeight / 2, panelWidth, panelHeight, this._scaled(12, uiScale));
        panelGraphics.stroke();

        // 用户名标签 - 第一行，左侧
        const usernameNode = new Node('UsernameLabel');
        usernameNode.parent = this._userInfoPanel;
        usernameNode.setPosition(new Vec3(this._scaled(-90, uiScale), this._scaled(30, uiScale), 0));
        const usernameTransform = usernameNode.addComponent(UITransform);
        usernameTransform.setContentSize(this._scaled(180, uiScale), this._scaled(50, uiScale));

        const usernameLabel = usernameNode.addComponent(Label);
        usernameLabel.string = userSystem.getUsername();
        usernameLabel.fontSize = this._scaled(28, uiScale);
        usernameLabel.color = new Color(255, 255, 255, 255);
        usernameLabel.overflow = Label.Overflow.CLAMP;
        usernameLabel.horizontalAlign = Label.HorizontalAlign.LEFT;

        // 星数标签 - 第一行，右侧
        const starsNode = new Node('StarsLabel');
        starsNode.parent = this._userInfoPanel;
        starsNode.setPosition(new Vec3(this._scaled(120, uiScale), this._scaled(30, uiScale), 0));
        const starsTransform = starsNode.addComponent(UITransform);
        starsTransform.setContentSize(this._scaled(110, uiScale), this._scaled(50, uiScale));

        const starsLabel = starsNode.addComponent(Label);
        starsLabel.string = `⭐ ${userSystem.getStars()}`;
        starsLabel.fontSize = this._scaled(28, uiScale);
        starsLabel.color = new Color(255, 255, 100, 255);
        starsLabel.overflow = Label.Overflow.CLAMP;
        starsLabel.horizontalAlign = Label.HorizontalAlign.RIGHT;

        // 段位标签 - 第二行，左对齐
        const rankNode = new Node('RankLabel');
        rankNode.parent = this._userInfoPanel;
        rankNode.setPosition(new Vec3(this._scaled(-30, uiScale), this._scaled(-32, uiScale), 0));
        const rankTransform = rankNode.addComponent(UITransform);
        rankTransform.setContentSize(this._scaled(300, uiScale), this._scaled(50, uiScale));

        const rankLabel = rankNode.addComponent(Label);
        rankLabel.string = rankSystem.getCurrentRankDisplayName();
        rankLabel.fontSize = this._scaled(28, uiScale);
        rankLabel.color = new Color(255, 228, 181, 255);
        rankLabel.overflow = Label.Overflow.CLAMP;
        rankLabel.horizontalAlign = Label.HorizontalAlign.LEFT;
    }

    private _createButton(parent: Node, nodeName: string, text: string, position: Vec3, uiScale: number): Button {
        const buttonNode = new Node(nodeName);
        buttonNode.parent = parent;
        buttonNode.setPosition(position);

        const buttonTransform = buttonNode.addComponent(UITransform);
        const buttonWidth = this._scaled(200, uiScale);
        const buttonHeight = this._scaled(80, uiScale);
        buttonTransform.setContentSize(buttonWidth, buttonHeight);

        const graphics = buttonNode.addComponent(Graphics);
        graphics.fillColor = new Color(100, 150, 200, 255);
        graphics.rect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight);
        graphics.fill();

        graphics.strokeColor = new Color(50, 100, 150, 255);
        graphics.lineWidth = 2;
        graphics.rect(-buttonWidth / 2, -buttonHeight / 2, buttonWidth, buttonHeight);
        graphics.stroke();

        const button = buttonNode.addComponent(Button);
        button.interactable = true;

        const labelNode = new Node('Label');
        labelNode.parent = buttonNode;
        labelNode.addComponent(UITransform);
        const buttonLabel = labelNode.addComponent(Label);
        buttonLabel.string = text;
        buttonLabel.fontSize = this._scaled(28, uiScale);
        buttonLabel.color = new Color(255, 255, 255, 255);

        return button;
    }

    /**
     * 点击开始游戏按钮
     */
    private _onStartGame() {
        // 播放点击音效
        SoundManager.getInstance().playEffect('sounds/click');

        // 打开游戏页面，传递参数：关卡1
        UIManager.getInstance().openPage('prefabs/pages/GamePage', { level: 1 });
    }

    /**
     * 点击游戏规则按钮
     */
    private _onShowRules() {
        SoundManager.getInstance().playEffect('sounds/click');
        UIManager.getInstance().openPage('prefabs/pages/RulesPage');
    }

    /**
     * 页面显示时自动调用
     */
    onShow(params?: any) {
        console.log('首页显示');
        // 更新用户信息显示
        this._updateUserInfoDisplay();
        // 播放背景音乐
        SoundManager.getInstance().playBGM('sounds/bgm_home');
    }

    /**
     * 更新用户信息显示
     */
    private _updateUserInfoDisplay() {
        if (!this._userInfoPanel) return;

        const userSystem = UserSystem.getInstance();
        const rankSystem = RankSystem.getInstance();

        // 更新用户名
        const usernameNode = this._userInfoPanel.getChildByName('UsernameLabel');
        if (usernameNode) {
            const usernameLabel = usernameNode.getComponent(Label);
            if (usernameLabel) {
                usernameLabel.string = userSystem.getUsername();
            }
        }

        // 更新段位
        const rankNode = this._userInfoPanel.getChildByName('RankLabel');
        if (rankNode) {
            const rankLabel = rankNode.getComponent(Label);
            if (rankLabel) {
                rankLabel.string = rankSystem.getCurrentRankDisplayName();
            }
        }

        // 更新星数
        const starsNode = this._userInfoPanel.getChildByName('StarsLabel');
        if (starsNode) {
            const starsLabel = starsNode.getComponent(Label);
            if (starsLabel) {
                starsLabel.string = `⭐ ${userSystem.getStars()}`;
            }
        }
    }

    /**
     * 页面隐藏时自动调用
     */
    onHide() {
        console.log('首页隐藏');
    }
}
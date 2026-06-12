import { getCurrentPlatform, MiniGamePlatform } from './Constants';

export interface SidebarResult {
    platform: MiniGamePlatform;
    success: boolean;
    supported: boolean;
    message: string;
    method?: string;
    error?: unknown;
}

type SidebarCandidate = {
    method: string;
    options: Record<string, unknown>;
};

const SIDEBAR_CANDIDATES: Record<'wechat' | 'douyin', SidebarCandidate[]> = {
    wechat: [
        { method: 'addToFavorites', options: {} },
        { method: 'addToFavorite', options: {} },
        { method: 'showFavoriteGuide', options: { type: 'bar', content: '添加到我的小程序，下次打开更方便' } },
        { method: 'addFavorite', options: {} },
    ],
    douyin: [
        { method: 'navigateToScene', options: { scene: 'sidebar' } },
    ],
};

export function addToSidebar(): Promise<SidebarResult> {
    const platform = getCurrentPlatform();
    const runtime = globalThis as any;
    const api = platform === 'wechat' ? runtime.wx : platform === 'douyin' ? runtime.tt : null;

    if (!api) {
        const message = '当前环境不支持添加侧边栏';
        console.warn(`[SidebarUtils] ${message}`);
        showToast(runtime, '暂不支持');
        return Promise.resolve({
            platform,
            success: false,
            supported: false,
            message,
        });
    }

    const candidates = platform === 'wechat' || platform === 'douyin' ? SIDEBAR_CANDIDATES[platform] : [];
    const candidate = candidates.find(item => typeof api[item.method] === 'function');
    if (!candidate) {
        const message = `${platform} 当前基础库不支持添加侧边栏`;
        console.warn(`[SidebarUtils] ${message}`);
        showToast(runtime, '暂不支持');
        return Promise.resolve({
            platform,
            success: false,
            supported: false,
            message,
        });
    }

    return callSidebarApi(platform, api, candidate);
}

function callSidebarApi(platform: MiniGamePlatform, api: any, candidate: SidebarCandidate): Promise<SidebarResult> {
    return new Promise((resolve) => {
        let settled = false;
        const finish = (result: SidebarResult) => {
            if (settled) return;
            settled = true;
            resolve(result);
        };

        const timer = setTimeout(() => {
            const message = '添加侧边栏超时';
            console.warn(`[SidebarUtils] ${message}`);
            showToast(globalThis as any, '添加超时');
            finish({
                platform,
                success: false,
                supported: true,
                message,
                method: candidate.method,
            });
        }, 5000);

        try {
            api[candidate.method]({
                ...candidate.options,
                success: (res: unknown) => {
                    const message = '添加侧边栏成功';
                    clearTimeout(timer);
                    console.log(`[SidebarUtils] ${message}`, res);
                    showToast(globalThis as any, '添加成功');
                    finish({
                        platform,
                        success: true,
                        supported: true,
                        message,
                        method: candidate.method,
                    });
                },
                fail: (error: unknown) => {
                    const message = '添加侧边栏失败，请按提示手动添加';
                    clearTimeout(timer);
                    console.warn(`[SidebarUtils] ${message}`, error);
                    showToast(globalThis as any, '添加失败');
                    finish({
                        platform,
                        success: false,
                        supported: true,
                        message,
                        method: candidate.method,
                        error,
                    });
                },
            });
        } catch (error) {
            const message = '调用添加侧边栏失败';
            clearTimeout(timer);
            console.warn(`[SidebarUtils] ${message}`, error);
            showToast(globalThis as any, '添加失败');
            finish({
                platform,
                success: false,
                supported: true,
                message,
                method: candidate.method,
                error,
            });
        }
    });
}

function showToast(runtime: any, title: string) {
    const api = runtime.wx ?? runtime.tt;
    if (!api || typeof api.showToast !== 'function') return;

    api.showToast({
        title,
        icon: 'none',
        duration: 1800,
    });
}

import { getCurrentPlatform, MiniGamePlatform } from './Constants';

export interface ShortcutResult {
    platform: MiniGamePlatform;
    success: boolean;
    supported: boolean;
    message: string;
    error?: unknown;
}

export function addToDesktopShortcut(): Promise<ShortcutResult> {
    const platform = getCurrentPlatform();
    const runtime = globalThis as any;

    if (platform === 'wechat' && runtime.wx && typeof runtime.wx.addShortcut === 'function') {
        return callAddShortcut(platform, runtime.wx);
    }

    if (platform === 'douyin' && runtime.tt && typeof runtime.tt.addShortcut === 'function') {
        return callAddShortcut(platform, runtime.tt);
    }

    const message = platform === 'unknown' ? '当前环境不支持添加到桌面' : `${platform} 当前基础库不支持 addShortcut`;
    console.warn(`[ShortcutUtils] ${message}`);
    showToast(runtime, '暂不支持');
    return Promise.resolve({
        platform,
        success: false,
        supported: false,
        message,
    });
}

function callAddShortcut(platform: MiniGamePlatform, api: any): Promise<ShortcutResult> {
    return new Promise((resolve) => {
        let settled = false;
        const finish = (result: ShortcutResult) => {
            if (settled) return;
            settled = true;
            resolve(result);
        };

        const timer = setTimeout(() => {
            const message = '添加桌面超时';
            console.warn(`[ShortcutUtils] ${message}`);
            showToast(globalThis as any, '添加超时');
            finish({
                platform,
                success: false,
                supported: true,
                message,
            });
        }, 5000);

        try {
            api.addShortcut({
                success: (res: unknown) => {
                    const message = '添加桌面成功';
                    clearTimeout(timer);
                    console.log(`[ShortcutUtils] ${message}`, res);
                    showToast(globalThis as any, '添加成功');
                    finish({
                        platform,
                        success: true,
                        supported: true,
                        message,
                    });
                },
                fail: (error: unknown) => {
                    const message = '添加桌面失败，请按提示手动添加';
                    clearTimeout(timer);
                    console.warn(`[ShortcutUtils] ${message}`, error);
                    showToast(globalThis as any, '添加失败');
                    finish({
                        platform,
                        success: false,
                        supported: true,
                        message,
                        error,
                    });
                },
            });
        } catch (error) {
            const message = '调用添加桌面失败';
            clearTimeout(timer);
            console.warn(`[ShortcutUtils] ${message}`, error);
            showToast(globalThis as any, '添加失败');
            finish({
                platform,
                success: false,
                supported: true,
                message,
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

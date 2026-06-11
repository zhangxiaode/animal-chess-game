export type MiniGamePlatform = 'wechat' | 'douyin' | 'unknown';

export interface GameInfo {
	appName: string;
	appId: string;
	envVersion: 'develop' | 'trial' | 'release';
	version: string;
	buildNumber: number;
	apiBaseUrl: string;
	shareTitle: string;
	shareImage: string;
	privacyPolicyUrl: string;
	serviceEmail: string;
	adUnitIds: {
		banner: string;
		rewardedVideo: string;
		interstitial: string;
	};
}

export const GAME_INFO_CONFIG: Record<'wechat' | 'douyin', GameInfo> = {
	wechat: {
		appName: '快杀对决',
		appId: 'wx32ba79b13ebc7f5b',
		envVersion: 'develop',
		version: '1.0.0',
		buildNumber: 1,
		apiBaseUrl: 'https://www.chengyaokj.com/apis',
		shareTitle: '来快杀，体验精彩的对弈！',
		shareImage: 'images/logo.png',
		privacyPolicyUrl: 'https://www.chengyaokj.com/animal-chess/privacy.html',
		serviceEmail: 'chengyaokeji4@126.com',
		adUnitIds: {
			banner: 'wechat-banner-unit-id',
			rewardedVideo: 'wechat-rewarded-unit-id',
			interstitial: 'wechat-interstitial-unit-id'
		}
	},
	douyin: {
		appName: '快杀对决',
		appId: 'tt_your_app_id',
		envVersion: 'develop',
		version: '1.0.0',
		buildNumber: 1,
		apiBaseUrl: 'https://www.chengyaokj.com/apis',
		shareTitle: '来快杀，体验精彩的对弈！',
		shareImage: 'images/logo.png',
		privacyPolicyUrl: 'https://www.chengyaokj.com/animal-chess/privacy.html',
		serviceEmail: 'chengyaokeji4@126.com',
		adUnitIds: {
			banner: 'douyin-banner-unit-id',
			rewardedVideo: 'douyin-rewarded-unit-id',
			interstitial: 'douyin-interstitial-unit-id'
		}
	}
};

export function getCurrentPlatform(): MiniGamePlatform {
	const runtime = globalThis as any;

	if (runtime.wx && typeof runtime.wx.getSystemInfoSync === 'function') {
		return 'wechat';
	}

	if (runtime.tt && typeof runtime.tt.getSystemInfoSync === 'function') {
		return 'douyin';
	}

	return 'unknown';
}

export function getPlatformGameInfo(platform?: MiniGamePlatform): GameInfo {
	const current = platform ?? getCurrentPlatform();

	if (current === 'douyin') {
		return GAME_INFO_CONFIG.douyin;
	}

	return GAME_INFO_CONFIG.wechat;
}

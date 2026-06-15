import preferences from "@ohos:data.preferences";
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/ets/utils/Logger";
import { CryptoUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/ets/utils/CryptoUtil";
const TAG = 'LoginStorageUtil';
const LOGIN_STORE = 'loginStore';
/**
 * 登录存储键常量
 */
export class LoginStorageKeys {
    static readonly USER_ID: string = 'login_user_id';
    static readonly USER_NAME: string = 'login_user_name';
    static readonly AVATAR_URL: string = 'login_avatar_url';
    static readonly TOKEN: string = 'login_token';
    static readonly LOGIN_TIME: string = 'login_time';
    static readonly REMEMBER_PASSWORD: string = 'remember_password';
    static readonly SAVED_USERNAME: string = 'saved_username';
    static readonly SAVED_PASSWORD: string = 'saved_password';
    static readonly FAILED_COUNT: string = 'login_failed_count';
    static readonly LIMIT_TIME: string = 'login_limit_time';
}
/**
 * 用户信息接口
 */
export interface UserInfo {
    userId: string;
    userName: string;
    avatarUrl?: string;
    token: string;
    loginTime: number;
}
/**
 * 保存的登录信息
 */
export interface SavedLoginInfo {
    username: string;
    password: string;
}
/**
 * 登录限制检查结果
 */
export interface LoginLimitResult {
    isLimited: boolean;
    remainingTime?: number;
}
/**
 * 登录数据存储工具类
 */
export class LoginStorageUtil {
    private static instance: LoginStorageUtil;
    private preferencesObj: preferences.Preferences | null = null;
    /**
     * 获取单例实例
     */
    public static getInstance(): LoginStorageUtil {
        if (!LoginStorageUtil.instance) {
            LoginStorageUtil.instance = new LoginStorageUtil();
        }
        return LoginStorageUtil.instance;
    }
    /**
     * 初始化Preferences
     */
    async init(context: Context): Promise<void> {
        try {
            this.preferencesObj = await preferences.getPreferences(context, LOGIN_STORE);
            Logger.info(TAG, 'LoginStorageUtil initialized');
        }
        catch (error) {
            Logger.error(TAG, `Init failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 保存用户信息
     */
    async saveUserInfo(userInfo: UserInfo): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            // 保存基本信息
            await this.preferencesObj.put(LoginStorageKeys.USER_ID, userInfo.userId);
            await this.preferencesObj.put(LoginStorageKeys.USER_NAME, userInfo.userName);
            await this.preferencesObj.put(LoginStorageKeys.LOGIN_TIME, userInfo.loginTime);
            // 保存头像URL（可选）
            if (userInfo.avatarUrl) {
                await this.preferencesObj.put(LoginStorageKeys.AVATAR_URL, userInfo.avatarUrl);
            }
            // 加密保存Token
            const encryptedToken = CryptoUtil.encrypt(userInfo.token);
            await this.preferencesObj.put(LoginStorageKeys.TOKEN, encryptedToken);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'User info saved');
        }
        catch (error) {
            Logger.error(TAG, `Save user info failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 获取用户信息
     */
    async getUserInfo(): Promise<UserInfo | undefined> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return undefined;
        }
        try {
            const userId = await this.preferencesObj.get(LoginStorageKeys.USER_ID, '') as string;
            const userName = await this.preferencesObj.get(LoginStorageKeys.USER_NAME, '') as string;
            const encryptedToken = await this.preferencesObj.get(LoginStorageKeys.TOKEN, '') as string;
            const loginTime = await this.preferencesObj.get(LoginStorageKeys.LOGIN_TIME, 0) as number;
            const avatarUrl = await this.preferencesObj.get(LoginStorageKeys.AVATAR_URL, '') as string;
            if (!userId || !userName || !encryptedToken) {
                return undefined;
            }
            // 解密Token
            const token = CryptoUtil.decrypt(encryptedToken);
            return {
                userId,
                userName,
                avatarUrl: avatarUrl || undefined,
                token,
                loginTime
            };
        }
        catch (error) {
            Logger.error(TAG, `Get user info failed: ${JSON.stringify(error)}`);
            return undefined;
        }
    }
    /**
     * 保存Token
     */
    async saveToken(token: string): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            const encryptedToken = CryptoUtil.encrypt(token);
            await this.preferencesObj.put(LoginStorageKeys.TOKEN, encryptedToken);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'Token saved');
        }
        catch (error) {
            Logger.error(TAG, `Save token failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 获取Token
     */
    async getToken(): Promise<string | undefined> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return undefined;
        }
        try {
            const encryptedToken = await this.preferencesObj.get(LoginStorageKeys.TOKEN, '') as string;
            if (!encryptedToken) {
                return undefined;
            }
            return CryptoUtil.decrypt(encryptedToken);
        }
        catch (error) {
            Logger.error(TAG, `Get token failed: ${JSON.stringify(error)}`);
            return undefined;
        }
    }
    /**
     * 清除登录信息
     */
    async clearLoginInfo(): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            await this.preferencesObj.delete(LoginStorageKeys.USER_ID);
            await this.preferencesObj.delete(LoginStorageKeys.USER_NAME);
            await this.preferencesObj.delete(LoginStorageKeys.AVATAR_URL);
            await this.preferencesObj.delete(LoginStorageKeys.TOKEN);
            await this.preferencesObj.delete(LoginStorageKeys.LOGIN_TIME);
            await this.preferencesObj.delete(LoginStorageKeys.FAILED_COUNT);
            await this.preferencesObj.delete(LoginStorageKeys.LIMIT_TIME);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'Login info cleared');
        }
        catch (error) {
            Logger.error(TAG, `Clear login info failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 检查是否存在登录信息
     */
    async hasLoginInfo(): Promise<boolean> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return false;
        }
        try {
            return await this.preferencesObj.has(LoginStorageKeys.TOKEN);
        }
        catch (error) {
            Logger.error(TAG, `Check login info failed: ${JSON.stringify(error)}`);
            return false;
        }
    }
    /**
     * 保存记住密码信息
     */
    async saveRememberInfo(username: string, password: string): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            await this.preferencesObj.put(LoginStorageKeys.REMEMBER_PASSWORD, true);
            await this.preferencesObj.put(LoginStorageKeys.SAVED_USERNAME, username);
            // 加密保存密码
            const encryptedPassword = CryptoUtil.encrypt(password);
            await this.preferencesObj.put(LoginStorageKeys.SAVED_PASSWORD, encryptedPassword);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'Remember info saved');
        }
        catch (error) {
            Logger.error(TAG, `Save remember info failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 获取记住的登录信息
     */
    async getRememberInfo(): Promise<SavedLoginInfo | undefined> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return undefined;
        }
        try {
            const rememberPassword = await this.preferencesObj.get(LoginStorageKeys.REMEMBER_PASSWORD, false) as boolean;
            if (!rememberPassword) {
                return undefined;
            }
            const username = await this.preferencesObj.get(LoginStorageKeys.SAVED_USERNAME, '') as string;
            const encryptedPassword = await this.preferencesObj.get(LoginStorageKeys.SAVED_PASSWORD, '') as string;
            if (!username || !encryptedPassword) {
                return undefined;
            }
            const password = CryptoUtil.decrypt(encryptedPassword);
            return { username, password };
        }
        catch (error) {
            Logger.error(TAG, `Get remember info failed: ${JSON.stringify(error)}`);
            return undefined;
        }
    }
    /**
     * 清除记住密码信息
     */
    async clearRememberInfo(): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            await this.preferencesObj.put(LoginStorageKeys.REMEMBER_PASSWORD, false);
            await this.preferencesObj.delete(LoginStorageKeys.SAVED_USERNAME);
            await this.preferencesObj.delete(LoginStorageKeys.SAVED_PASSWORD);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'Remember info cleared');
        }
        catch (error) {
            Logger.error(TAG, `Clear remember info failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 记录登录失败次数
     */
    async recordFailedCount(): Promise<number> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return 0;
        }
        try {
            let failedCount = await this.preferencesObj.get(LoginStorageKeys.FAILED_COUNT, 0) as number;
            failedCount++;
            await this.preferencesObj.put(LoginStorageKeys.FAILED_COUNT, failedCount);
            // 如果是第一次失败，记录限制开始时间
            if (failedCount === 1) {
                await this.preferencesObj.put(LoginStorageKeys.LIMIT_TIME, Date.now());
            }
            await this.preferencesObj.flush();
            Logger.info(TAG, `Failed count: ${failedCount}`);
            return failedCount;
        }
        catch (error) {
            Logger.error(TAG, `Record failed count failed: ${JSON.stringify(error)}`);
            return 0;
        }
    }
    /**
     * 获取登录失败次数
     */
    async getFailedCount(): Promise<number> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return 0;
        }
        try {
            return await this.preferencesObj.get(LoginStorageKeys.FAILED_COUNT, 0) as number;
        }
        catch (error) {
            Logger.error(TAG, `Get failed count failed: ${JSON.stringify(error)}`);
            return 0;
        }
    }
    /**
     * 重置登录失败次数
     */
    async resetFailedCount(): Promise<void> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            return;
        }
        try {
            await this.preferencesObj.put(LoginStorageKeys.FAILED_COUNT, 0);
            await this.preferencesObj.delete(LoginStorageKeys.LIMIT_TIME);
            await this.preferencesObj.flush();
            Logger.info(TAG, 'Failed count reset');
        }
        catch (error) {
            Logger.error(TAG, `Reset failed count failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 检查是否被限制登录
     */
    async checkLoginLimit(): Promise<LoginLimitResult> {
        if (!this.preferencesObj) {
            Logger.error(TAG, 'Preferences not initialized');
            const result: LoginLimitResult = { isLimited: false };
            return result;
        }
        try {
            const failedCount = await this.getFailedCount();
            if (failedCount < 5) {
                const result: LoginLimitResult = { isLimited: false };
                return result;
            }
            const limitTime = await this.preferencesObj.get(LoginStorageKeys.LIMIT_TIME, 0) as number;
            const currentTime = Date.now();
            const elapsedMinutes = (currentTime - limitTime) / (1000 * 60);
            // 限制时间为5分钟
            if (elapsedMinutes >= 5) {
                // 限制已过期，重置失败次数
                await this.resetFailedCount();
                const result: LoginLimitResult = { isLimited: false };
                return result;
            }
            const remainingTime = Math.ceil(5 - elapsedMinutes);
            const result: LoginLimitResult = { isLimited: true, remainingTime: remainingTime };
            return result;
        }
        catch (error) {
            Logger.error(TAG, `Check login limit failed: ${JSON.stringify(error)}`);
            const result: LoginLimitResult = { isLimited: false };
            return result;
        }
    }
}

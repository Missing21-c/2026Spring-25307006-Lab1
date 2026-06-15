import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { HttpUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { LoginStorageUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { UserInfo, SavedLoginInfo, LoginLimitResult } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { LoginConstants, LoginErrorMessages, LoginResponseCode } from "@bundle:com.huawei.music.musichome/phone@login/ets/constants/LoginConstants";
import { createValidResult, createInvalidResult } from "@bundle:com.huawei.music.musichome/phone@login/ets/viewmodel/LoginModels";
import type { LoginRequest, LoginResponse, VerifyResponse, ValidationResult } from "@bundle:com.huawei.music.musichome/phone@login/ets/viewmodel/LoginModels";
const TAG = 'LoginViewModel';
/**
 * 登录业务逻辑类
 */
class LoginViewModel {
    /**
     * 验证输入
     * @param username 用户名
     * @param password 密码
     * @returns 验证结果
     */
    validateInput(username: string, password: string): ValidationResult {
        // 验证用户名
        if (!username || username.trim().length === 0) {
            return createInvalidResult(LoginErrorMessages.USERNAME_EMPTY);
        }
        if (username.length < LoginConstants.USERNAME_MIN_LENGTH ||
            username.length > LoginConstants.USERNAME_MAX_LENGTH) {
            return createInvalidResult(LoginErrorMessages.USERNAME_FORMAT_ERROR);
        }
        // 验证用户名格式（仅支持字母、数字、下划线）
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!usernameRegex.test(username)) {
            return createInvalidResult(LoginErrorMessages.USERNAME_FORMAT_ERROR);
        }
        // 验证密码
        if (!password || password.length === 0) {
            return createInvalidResult(LoginErrorMessages.PASSWORD_EMPTY);
        }
        if (password.length < LoginConstants.PASSWORD_MIN_LENGTH) {
            return createInvalidResult(LoginErrorMessages.PASSWORD_LENGTH_ERROR);
        }
        return createValidResult();
    }
    /**
     * 执行登录
     * @param username 用户名
     * @param password 密码
     * @returns 登录响应
     */
    async login(username: string, password: string): Promise<LoginResponse> {
        try {
            // 构造登录请求
            const loginRequest: LoginRequest = {
                username: username,
                password: password
            };
            Logger.info(TAG, `Login request: ${username}`);
            // 发送登录请求
            const response = await HttpUtil.post<LoginResponse>(LoginConstants.API_LOGIN_PATH, loginRequest);
            Logger.info(TAG, `Login response code: ${response.data.code}`);
            return response.data;
        }
        catch (error) {
            Logger.error(TAG, `Login failed: ${JSON.stringify(error)}`);
            // 返回网络错误响应
            return {
                code: LoginResponseCode.SERVER_ERROR,
                message: LoginErrorMessages.NETWORK_UNAVAILABLE
            };
        }
    }
    /**
     * 保存登录信息
     * @param userInfo 用户信息
     */
    async saveLoginInfo(userInfo: UserInfo): Promise<void> {
        await LoginStorageUtil.getInstance().saveUserInfo(userInfo);
        Logger.info(TAG, 'Login info saved');
    }
    /**
     * 获取登录信息
     */
    async getLoginInfo(): Promise<UserInfo | undefined> {
        return await LoginStorageUtil.getInstance().getUserInfo();
    }
    /**
     * 清除登录信息
     */
    async clearLoginInfo(): Promise<void> {
        await LoginStorageUtil.getInstance().clearLoginInfo();
        Logger.info(TAG, 'Login info cleared');
    }
    /**
     * 检查是否存在登录信息
     */
    async hasLoginInfo(): Promise<boolean> {
        return await LoginStorageUtil.getInstance().hasLoginInfo();
    }
    /**
     * 保存记住密码信息
     * @param username 用户名
     * @param password 密码
     */
    async saveRememberInfo(username: string, password: string): Promise<void> {
        await LoginStorageUtil.getInstance().saveRememberInfo(username, password);
        Logger.info(TAG, 'Remember info saved');
    }
    /**
     * 获取记住的登录信息
     */
    async getRememberInfo(): Promise<SavedLoginInfo | undefined> {
        return await LoginStorageUtil.getInstance().getRememberInfo();
    }
    /**
     * 清除记住密码信息
     */
    async clearRememberInfo(): Promise<void> {
        await LoginStorageUtil.getInstance().clearRememberInfo();
        Logger.info(TAG, 'Remember info cleared');
    }
    /**
     * 记录登录失败
     */
    async recordFailedAttempt(): Promise<number> {
        return await LoginStorageUtil.getInstance().recordFailedCount();
    }
    /**
     * 检查登录限制
     */
    async checkLoginLimit(): Promise<LoginLimitResult> {
        return await LoginStorageUtil.getInstance().checkLoginLimit();
    }
    /**
     * 重置登录失败次数
     */
    async resetFailedCount(): Promise<void> {
        await LoginStorageUtil.getInstance().resetFailedCount();
        Logger.info(TAG, 'Failed count reset');
    }
    /**
     * 检查Token是否过期
     * @param userInfo 用户信息
     */
    checkTokenExpire(userInfo: UserInfo): boolean {
        if (!userInfo || !userInfo.loginTime) {
            return true;
        }
        const currentTime = Date.now();
        const elapsedDays = (currentTime - userInfo.loginTime) / (1000 * 60 * 60 * 24);
        return elapsedDays > LoginConstants.TOKEN_EXPIRE_DAYS;
    }
    /**
     * 验证Token有效性
     * @param token Token
     */
    async verifyToken(token: string): Promise<boolean> {
        try {
            const headers = new Map<string, string>();
            headers.set('Authorization', `Bearer ${token}`);
            const response = await HttpUtil.get<VerifyResponse>(LoginConstants.API_VERIFY_PATH, headers);
            return response.data.code === LoginResponseCode.SUCCESS &&
                response.data.data?.valid === true;
        }
        catch (error) {
            Logger.error(TAG, `Verify token failed: ${JSON.stringify(error)}`);
            return false;
        }
    }
    /**
     * 检查自动登录
     */
    async checkAutoLogin(): Promise<UserInfo | undefined> {
        try {
            // 检查是否存在登录信息
            const hasInfo = await this.hasLoginInfo();
            if (!hasInfo) {
                Logger.info(TAG, 'No login info found');
                return undefined;
            }
            // 获取用户信息
            const userInfo = await this.getLoginInfo();
            if (!userInfo) {
                Logger.info(TAG, 'User info not found');
                return undefined;
            }
            // 检查Token是否过期
            if (this.checkTokenExpire(userInfo)) {
                Logger.info(TAG, 'Token expired');
                await this.clearLoginInfo();
                return undefined;
            }
            // 验证Token有效性
            const isValid = await this.verifyToken(userInfo.token);
            if (!isValid) {
                Logger.info(TAG, 'Token invalid');
                await this.clearLoginInfo();
                return undefined;
            }
            Logger.info(TAG, 'Auto login success');
            return userInfo;
        }
        catch (error) {
            Logger.error(TAG, `Check auto login failed: ${JSON.stringify(error)}`);
            return undefined;
        }
    }
}
export default new LoginViewModel();

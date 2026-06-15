import { Logger, HttpUtil, LoginStorageUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { UserInfo } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { RegisterConstants, RegisterErrorMessages, RegisterResponseCode } from "@bundle:com.huawei.music.musichome/phone@register/ets/constants/RegisterConstants";
import type { RegisterRequest, RegisterResponse, ValidationResult, FormValidationResult } from './RegisterModels';
const TAG = 'RegisterViewModel';
/**
 * 注册业务逻辑类
 */
export class RegisterViewModel {
    /**
     * 验证表单输入
     */
    public validateForm(username: string, password: string, confirmPassword: string): FormValidationResult {
        const result: FormValidationResult = { isValid: true };
        // 验证用户名
        const usernameResult = this.validateUsername(username);
        if (!usernameResult.isValid) {
            result.isValid = false;
            result.usernameError = usernameResult.errorMessage;
        }
        // 验证密码
        const passwordResult = this.validatePassword(password);
        if (!passwordResult.isValid) {
            result.isValid = false;
            result.passwordError = passwordResult.errorMessage;
        }
        // 验证确认密码
        const confirmResult = this.validateConfirmPassword(password, confirmPassword);
        if (!confirmResult.isValid) {
            result.isValid = false;
            result.confirmPasswordError = confirmResult.errorMessage;
        }
        return result;
    }
    /**
     * 验证用户名
     */
    public validateUsername(username: string): ValidationResult {
        // 空值检查
        if (!username || username.trim().length === 0) {
            return { isValid: false, errorMessage: RegisterErrorMessages.USERNAME_EMPTY };
        }
        // 长度检查
        if (username.length < RegisterConstants.USERNAME_MIN_LENGTH) {
            return { isValid: false, errorMessage: RegisterErrorMessages.USERNAME_TOO_SHORT };
        }
        if (username.length > RegisterConstants.USERNAME_MAX_LENGTH) {
            return { isValid: false, errorMessage: RegisterErrorMessages.USERNAME_TOO_LONG };
        }
        // 格式检查
        if (!RegisterConstants.USERNAME_PATTERN.test(username)) {
            return { isValid: false, errorMessage: RegisterErrorMessages.USERNAME_INVALID_FORMAT };
        }
        return { isValid: true };
    }
    /**
     * 验证密码
     */
    public validatePassword(password: string): ValidationResult {
        // 空值检查
        if (!password || password.length === 0) {
            return { isValid: false, errorMessage: RegisterErrorMessages.PASSWORD_EMPTY };
        }
        // 长度检查
        if (password.length < RegisterConstants.PASSWORD_MIN_LENGTH) {
            return { isValid: false, errorMessage: RegisterErrorMessages.PASSWORD_TOO_SHORT };
        }
        if (password.length > RegisterConstants.PASSWORD_MAX_LENGTH) {
            return { isValid: false, errorMessage: RegisterErrorMessages.PASSWORD_TOO_LONG };
        }
        return { isValid: true };
    }
    /**
     * 验证确认密码
     */
    public validateConfirmPassword(password: string, confirmPassword: string): ValidationResult {
        // 空值检查
        if (!confirmPassword || confirmPassword.length === 0) {
            return { isValid: false, errorMessage: RegisterErrorMessages.CONFIRM_PASSWORD_EMPTY };
        }
        // 一致性检查
        if (password !== confirmPassword) {
            return { isValid: false, errorMessage: RegisterErrorMessages.CONFIRM_PASSWORD_MISMATCH };
        }
        return { isValid: true };
    }
    /**
     * 执行注册
     */
    public async register(username: string, password: string): Promise<RegisterResponse> {
        try {
            // 构造请求参数
            const request: RegisterRequest = {
                username: username,
                password: password
            };
            // 发送注册请求
            const response = await HttpUtil.post<RegisterResponse>(RegisterConstants.API_REGISTER_PATH, request);
            Logger.info(TAG, `Register response: ${JSON.stringify(response)}`);
            return response.data;
        }
        catch (error) {
            Logger.error(TAG, `Register error: ${JSON.stringify(error)}`);
            // 返回网络错误响应
            return {
                code: RegisterResponseCode.SERVER_ERROR,
                message: RegisterErrorMessages.NETWORK_UNAVAILABLE
            };
        }
    }
    /**
     * 保存用户信息并自动登录
     */
    public async saveUserInfo(userInfo: UserInfo): Promise<void> {
        try {
            // 保存用户信息到本地存储
            await LoginStorageUtil.getInstance().saveUserInfo(userInfo);
            // 更新全局登录状态
            AppStorage.setOrCreate('userInfo', userInfo);
            AppStorage.setOrCreate('isLoggedIn', true);
            Logger.info(TAG, 'User info saved and auto login successful');
        }
        catch (error) {
            Logger.error(TAG, `Save user info error: ${JSON.stringify(error)}`);
        }
    }
}

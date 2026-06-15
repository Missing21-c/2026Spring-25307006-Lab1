if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginPage_Params {
    username?: string;
    password?: string;
    rememberPassword?: boolean;
    isLoading?: boolean;
    errorMessage?: string;
    pageIndexInfos?: NavPathStack;
    userInfo?: UserInfo | undefined;
    isLoggedIn?: boolean;
}
import { RouterUrlConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { LoginStorageUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { UserInfo } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import LoginViewModel from "@bundle:com.huawei.music.musichome/phone@login/ets/viewmodel/LoginViewModel";
import { LoginErrorMessages, LoginResponseCode } from "@bundle:com.huawei.music.musichome/phone@login/ets/constants/LoginConstants";
import { LoginHeader } from "@bundle:com.huawei.music.musichome/phone@login/ets/view/LoginHeader";
import { LoginForm } from "@bundle:com.huawei.music.musichome/phone@login/ets/view/LoginForm";
const TAG = 'LoginPage';
export class LoginPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__rememberPassword = new ObservedPropertySimplePU(false, this, "rememberPassword");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__errorMessage = new ObservedPropertySimplePU('', this, "errorMessage");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__userInfo = this.createStorageLink('userInfo', undefined, "userInfo");
        this.__isLoggedIn = this.createStorageLink('isLoggedIn', false, "isLoggedIn");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.rememberPassword !== undefined) {
            this.rememberPassword = params.rememberPassword;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.errorMessage !== undefined) {
            this.errorMessage = params.errorMessage;
        }
    }
    updateStateVars(params: LoginPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__rememberPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__rememberPassword.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    // 用户名
    private __username: ObservedPropertySimplePU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    // 密码
    private __password: ObservedPropertySimplePU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    // 是否记住密码
    private __rememberPassword: ObservedPropertySimplePU<boolean>;
    get rememberPassword() {
        return this.__rememberPassword.get();
    }
    set rememberPassword(newValue: boolean) {
        this.__rememberPassword.set(newValue);
    }
    // 是否正在加载
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    // 错误消息
    private __errorMessage: ObservedPropertySimplePU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    // 导航栈
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    // 用户信息（全局状态）
    private __userInfo: ObservedPropertyAbstractPU<UserInfo | undefined>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfo | undefined) {
        this.__userInfo.set(newValue);
    }
    private __isLoggedIn: ObservedPropertyAbstractPU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
    /**
     * 页面即将显示
     */
    aboutToAppear(): void {
        // 初始化存储工具
        const context = AppStorage.get<Context>('context');
        if (context) {
            LoginStorageUtil.getInstance().init(context);
        }
        // 加载记住的登录信息
        this.loadRememberInfo();
    }
    /**
     * 加载记住的登录信息
     */
    private async loadRememberInfo(): Promise<void> {
        const savedInfo = await LoginViewModel.getRememberInfo();
        if (savedInfo) {
            this.username = savedInfo.username;
            this.password = savedInfo.password;
            this.rememberPassword = true;
        }
    }
    /**
     * 处理登录
     */
    private async handleLogin(): Promise<void> {
        // 清除错误消息
        this.errorMessage = '';
        // 验证输入
        const validationResult = LoginViewModel.validateInput(this.username, this.password);
        if (!validationResult.isValid) {
            this.errorMessage = validationResult.errorMessage || '';
            return;
        }
        // 检查登录限制
        const limitResult = await LoginViewModel.checkLoginLimit();
        if (limitResult.isLimited) {
            this.errorMessage = `${LoginErrorMessages.LOGIN_LIMITED}（剩余${limitResult.remainingTime}分钟）`;
            return;
        }
        // 显示加载状态
        this.isLoading = true;
        try {
            // 执行登录
            const response = await LoginViewModel.login(this.username, this.password);
            // 处理登录结果
            if (response.code === LoginResponseCode.SUCCESS && response.data) {
                // 登录成功
                const userInfo: UserInfo = {
                    userId: response.data.userId,
                    userName: response.data.userName,
                    avatarUrl: response.data.avatarUrl,
                    token: response.data.token,
                    loginTime: Date.now()
                };
                // 保存用户信息
                await LoginViewModel.saveLoginInfo(userInfo);
                // 处理记住密码
                if (this.rememberPassword) {
                    await LoginViewModel.saveRememberInfo(this.username, this.password);
                }
                else {
                    await LoginViewModel.clearRememberInfo();
                }
                // 重置失败次数
                await LoginViewModel.resetFailedCount();
                // 更新全局状态
                this.userInfo = userInfo;
                this.isLoggedIn = true;
                // 显示成功提示
                this.showToast(LoginErrorMessages.LOGIN_SUCCESS);
                // 延迟返回上一页
                setTimeout(() => {
                    this.handleBack();
                }, 1000);
            }
            else {
                // 登录失败
                await LoginViewModel.recordFailedAttempt();
                // 设置错误消息
                if (response.code === LoginResponseCode.USER_NOT_EXIST) {
                    this.errorMessage = LoginErrorMessages.USER_NOT_EXIST;
                }
                else if (response.code === LoginResponseCode.PASSWORD_ERROR) {
                    this.errorMessage = LoginErrorMessages.PASSWORD_ERROR;
                    // 清空密码
                    this.password = '';
                }
                else {
                    this.errorMessage = response.message || LoginErrorMessages.SERVER_ERROR;
                }
            }
        }
        catch (error) {
            Logger.error(TAG, `Login error: ${JSON.stringify(error)}`);
            this.errorMessage = LoginErrorMessages.NETWORK_UNAVAILABLE;
        }
        finally {
            this.isLoading = false;
        }
    }
    /**
     * 处理返回
     */
    private handleBack(): void {
        this.pageIndexInfos.pop();
    }
    /**
     * 显示提示消息
     */
    private showToast(message: string): void {
        try {
            // 使用PromptAction显示提示
            const uiContext = AppStorage.get<UIContext>('uiContext');
            if (uiContext) {
                const promptAction = uiContext.getPromptAction();
                promptAction.showToast({
                    message: message,
                    duration: 2000
                });
            }
        }
        catch (error) {
            console.error('Show toast failed:', error);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#FFFFFF');
            Column.expandSafeArea([SafeAreaType.SYSTEM]);
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 头部
                    LoginHeader(this, {
                        onBack: () => {
                            this.handleBack();
                        }
                    }, undefined, elmtId, () => { }, { page: "features/login/src/main/ets/view/LoginPage.ets", line: 191, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            onBack: () => {
                                this.handleBack();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LoginHeader" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 表单区域
            Column.create();
            // 表单区域
            Column.layoutWeight(1);
            // 表单区域
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Logo或图标
            Image.create({ "id": 150994978, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            // Logo或图标
            Image.width(80);
            // Logo或图标
            Image.height(80);
            // Logo或图标
            Image.margin({ top: 40, bottom: 40 });
        }, Image);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 登录表单
                    LoginForm(this, {
                        username: this.__username,
                        password: this.__password,
                        rememberPassword: this.__rememberPassword,
                        isLoading: this.isLoading,
                        errorMessage: this.errorMessage,
                        onLogin: () => {
                            this.handleLogin();
                        },
                        onGoToRegister: () => {
                            this.pageIndexInfos.pushPath({ name: RouterUrlConstants.REGISTER });
                        }
                    }, undefined, elmtId, () => { }, { page: "features/login/src/main/ets/view/LoginPage.ets", line: 206, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            username: this.username,
                            password: this.password,
                            rememberPassword: this.rememberPassword,
                            isLoading: this.isLoading,
                            errorMessage: this.errorMessage,
                            onLogin: () => {
                                this.handleLogin();
                            },
                            onGoToRegister: () => {
                                this.pageIndexInfos.pushPath({ name: RouterUrlConstants.REGISTER });
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        isLoading: this.isLoading,
                        errorMessage: this.errorMessage
                    });
                }
            }, { name: "LoginForm" });
        }
        // 表单区域
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "LoginPage";
    }
}
registerNamedRoute(() => new LoginPage(undefined, {}), "", { bundleName: "com.huawei.music.musichome", moduleName: "phone", pagePath: "../../../../../features/login/src/main/ets/view/LoginPage", pageFullPath: "features/login/src/main/ets/view/LoginPage", integratedHsp: "false", moduleType: "followWithHap" });

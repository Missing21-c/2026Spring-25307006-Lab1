if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterPage_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    isLoading?: boolean;
    usernameError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    pageIndexInfos?: NavPathStack;
    userInfo?: UserInfo | undefined;
    isLoggedIn?: boolean;
}
import { Logger, LoginStorageUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { UserInfo } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { LoginHeader } from "@bundle:com.huawei.music.musichome/phone@login/Index";
import { RegisterViewModel } from "@bundle:com.huawei.music.musichome/phone@register/ets/viewmodel/RegisterViewModel";
import { RegisterErrorMessages, RegisterResponseCode } from "@bundle:com.huawei.music.musichome/phone@register/ets/constants/RegisterConstants";
import { RegisterForm } from "@bundle:com.huawei.music.musichome/phone@register/ets/view/RegisterForm";
import type { FormValidationResult } from '../viewmodel/RegisterModels';
const TAG = 'RegisterPage';
export class RegisterPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new ObservedPropertySimplePU('', this, "username");
        this.__password = new ObservedPropertySimplePU('', this, "password");
        this.__confirmPassword = new ObservedPropertySimplePU('', this, "confirmPassword");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__usernameError = new ObservedPropertySimplePU('', this, "usernameError");
        this.__passwordError = new ObservedPropertySimplePU('', this, "passwordError");
        this.__confirmPasswordError = new ObservedPropertySimplePU('', this, "confirmPasswordError");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__userInfo = this.createStorageLink('userInfo', undefined, "userInfo");
        this.__isLoggedIn = this.createStorageLink('isLoggedIn', false, "isLoggedIn");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterPage_Params) {
        if (params.username !== undefined) {
            this.username = params.username;
        }
        if (params.password !== undefined) {
            this.password = params.password;
        }
        if (params.confirmPassword !== undefined) {
            this.confirmPassword = params.confirmPassword;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.usernameError !== undefined) {
            this.usernameError = params.usernameError;
        }
        if (params.passwordError !== undefined) {
            this.passwordError = params.passwordError;
        }
        if (params.confirmPasswordError !== undefined) {
            this.confirmPasswordError = params.confirmPasswordError;
        }
    }
    updateStateVars(params: RegisterPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__usernameError.purgeDependencyOnElmtId(rmElmtId);
        this.__passwordError.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPasswordError.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__usernameError.aboutToBeDeleted();
        this.__passwordError.aboutToBeDeleted();
        this.__confirmPasswordError.aboutToBeDeleted();
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
    // 确认密码
    private __confirmPassword: ObservedPropertySimplePU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    // 是否正在加载
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    // 用户名错误消息
    private __usernameError: ObservedPropertySimplePU<string>;
    get usernameError() {
        return this.__usernameError.get();
    }
    set usernameError(newValue: string) {
        this.__usernameError.set(newValue);
    }
    // 密码错误消息
    private __passwordError: ObservedPropertySimplePU<string>;
    get passwordError() {
        return this.__passwordError.get();
    }
    set passwordError(newValue: string) {
        this.__passwordError.set(newValue);
    }
    // 确认密码错误消息
    private __confirmPasswordError: ObservedPropertySimplePU<string>;
    get confirmPasswordError() {
        return this.__confirmPasswordError.get();
    }
    set confirmPasswordError(newValue: string) {
        this.__confirmPasswordError.set(newValue);
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
    }
    /**
     * 处理注册
     */
    private async handleRegister(): Promise<void> {
        // 清除错误消息
        this.usernameError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';
        // 验证输入
        const viewModel = new RegisterViewModel();
        const validationResult: FormValidationResult = viewModel.validateForm(this.username, this.password, this.confirmPassword);
        if (!validationResult.isValid) {
            this.usernameError = validationResult.usernameError || '';
            this.passwordError = validationResult.passwordError || '';
            this.confirmPasswordError = validationResult.confirmPasswordError || '';
            return;
        }
        // 显示加载状态
        this.isLoading = true;
        try {
            // 执行注册
            const response = await viewModel.register(this.username, this.password);
            // 处理注册结果
            if (response.code === RegisterResponseCode.SUCCESS && response.data) {
                // 注册成功
                const userInfo: UserInfo = {
                    userId: response.data.userId,
                    userName: response.data.userName,
                    avatarUrl: response.data.avatarUrl,
                    token: response.data.token,
                    loginTime: Date.now()
                };
                // 保存用户信息并自动登录
                await viewModel.saveUserInfo(userInfo);
                // 更新全局状态
                this.userInfo = userInfo;
                this.isLoggedIn = true;
                // 显示成功提示
                this.showToast(RegisterErrorMessages.REGISTER_SUCCESS);
                // 延迟返回上一页
                setTimeout(() => {
                    this.handleBack();
                }, 1000);
            }
            else {
                // 注册失败
                if (response.code === RegisterResponseCode.USERNAME_EXIST) {
                    this.usernameError = RegisterErrorMessages.USERNAME_EXIST;
                }
                else if (response.code === RegisterResponseCode.PARAM_ERROR) {
                    this.usernameError = RegisterErrorMessages.PARAM_ERROR;
                }
                else {
                    this.usernameError = response.message || RegisterErrorMessages.SERVER_ERROR;
                }
            }
        }
        catch (error) {
            Logger.error(TAG, `Register error: ${JSON.stringify(error)}`);
            this.usernameError = RegisterErrorMessages.NETWORK_UNAVAILABLE;
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
                        title: '用户注册',
                        onBack: () => {
                            this.handleBack();
                        }
                    }, undefined, elmtId, () => { }, { page: "features/register/src/main/ets/view/RegisterPage.ets", line: 163, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: '用户注册',
                            onBack: () => {
                                this.handleBack();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: '用户注册'
                    });
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
                    // 注册表单
                    RegisterForm(this, {
                        username: this.__username,
                        password: this.__password,
                        confirmPassword: this.__confirmPassword,
                        isLoading: this.isLoading,
                        usernameError: this.usernameError,
                        passwordError: this.passwordError,
                        confirmPasswordError: this.confirmPasswordError,
                        onRegister: () => {
                            this.handleRegister();
                        },
                        onGoToLogin: () => {
                            this.handleBack();
                        }
                    }, undefined, elmtId, () => { }, { page: "features/register/src/main/ets/view/RegisterPage.ets", line: 179, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            username: this.username,
                            password: this.password,
                            confirmPassword: this.confirmPassword,
                            isLoading: this.isLoading,
                            usernameError: this.usernameError,
                            passwordError: this.passwordError,
                            confirmPasswordError: this.confirmPasswordError,
                            onRegister: () => {
                                this.handleRegister();
                            },
                            onGoToLogin: () => {
                                this.handleBack();
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        isLoading: this.isLoading,
                        usernameError: this.usernameError,
                        passwordError: this.passwordError,
                        confirmPasswordError: this.confirmPasswordError
                    });
                }
            }, { name: "RegisterForm" });
        }
        // 表单区域
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "RegisterPage";
    }
}
registerNamedRoute(() => new RegisterPage(undefined, {}), "", { bundleName: "com.huawei.music.musichome", moduleName: "phone", pagePath: "../../../../../features/register/src/main/ets/view/RegisterPage", pageFullPath: "features/register/src/main/ets/view/RegisterPage", integratedHsp: "false", moduleType: "followWithHap" });

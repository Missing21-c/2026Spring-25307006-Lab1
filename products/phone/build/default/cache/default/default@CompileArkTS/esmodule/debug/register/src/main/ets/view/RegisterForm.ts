if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface RegisterForm_Params {
    username?: string;
    password?: string;
    confirmPassword?: string;
    isLoading?: boolean;
    usernameError?: string;
    passwordError?: string;
    confirmPasswordError?: string;
    /**
     * 注册回调
     */
    onRegister?: () => void;
    /**
     * 去登录回调
     */
    onGoToLogin?: () => void;
}
import { LoginInputItem } from "@bundle:com.huawei.music.musichome/phone@login/Index";
export class RegisterForm extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new SynchedPropertySimpleTwoWayPU(params.username, this, "username");
        this.__password = new SynchedPropertySimpleTwoWayPU(params.password, this, "password");
        this.__confirmPassword = new SynchedPropertySimpleTwoWayPU(params.confirmPassword, this, "confirmPassword");
        this.__isLoading = new SynchedPropertySimpleOneWayPU(params.isLoading, this, "isLoading");
        this.__usernameError = new SynchedPropertySimpleOneWayPU(params.usernameError, this, "usernameError");
        this.__passwordError = new SynchedPropertySimpleOneWayPU(params.passwordError, this, "passwordError");
        this.__confirmPasswordError = new SynchedPropertySimpleOneWayPU(params.confirmPasswordError, this, "confirmPasswordError");
        this.onRegister = undefined;
        this.onGoToLogin = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: RegisterForm_Params) {
        if (params.isLoading === undefined) {
            this.__isLoading.set(false);
        }
        if (params.usernameError === undefined) {
            this.__usernameError.set('');
        }
        if (params.passwordError === undefined) {
            this.__passwordError.set('');
        }
        if (params.confirmPasswordError === undefined) {
            this.__confirmPasswordError.set('');
        }
        if (params.onRegister !== undefined) {
            this.onRegister = params.onRegister;
        }
        if (params.onGoToLogin !== undefined) {
            this.onGoToLogin = params.onGoToLogin;
        }
    }
    updateStateVars(params: RegisterForm_Params) {
        this.__isLoading.reset(params.isLoading);
        this.__usernameError.reset(params.usernameError);
        this.__passwordError.reset(params.passwordError);
        this.__confirmPasswordError.reset(params.confirmPasswordError);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__usernameError.purgeDependencyOnElmtId(rmElmtId);
        this.__passwordError.purgeDependencyOnElmtId(rmElmtId);
        this.__confirmPasswordError.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__confirmPassword.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__usernameError.aboutToBeDeleted();
        this.__passwordError.aboutToBeDeleted();
        this.__confirmPasswordError.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * 用户名
     */
    private __username: SynchedPropertySimpleTwoWayPU<string>;
    get username() {
        return this.__username.get();
    }
    set username(newValue: string) {
        this.__username.set(newValue);
    }
    /**
     * 密码
     */
    private __password: SynchedPropertySimpleTwoWayPU<string>;
    get password() {
        return this.__password.get();
    }
    set password(newValue: string) {
        this.__password.set(newValue);
    }
    /**
     * 确认密码
     */
    private __confirmPassword: SynchedPropertySimpleTwoWayPU<string>;
    get confirmPassword() {
        return this.__confirmPassword.get();
    }
    set confirmPassword(newValue: string) {
        this.__confirmPassword.set(newValue);
    }
    /**
     * 是否正在加载
     */
    private __isLoading: SynchedPropertySimpleOneWayPU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /**
     * 用户名错误消息
     */
    private __usernameError: SynchedPropertySimpleOneWayPU<string>;
    get usernameError() {
        return this.__usernameError.get();
    }
    set usernameError(newValue: string) {
        this.__usernameError.set(newValue);
    }
    /**
     * 密码错误消息
     */
    private __passwordError: SynchedPropertySimpleOneWayPU<string>;
    get passwordError() {
        return this.__passwordError.get();
    }
    set passwordError(newValue: string) {
        this.__passwordError.set(newValue);
    }
    /**
     * 确认密码错误消息
     */
    private __confirmPasswordError: SynchedPropertySimpleOneWayPU<string>;
    get confirmPasswordError() {
        return this.__confirmPasswordError.get();
    }
    set confirmPasswordError(newValue: string) {
        this.__confirmPasswordError.set(newValue);
    }
    /**
     * 注册回调
     */
    private onRegister?: () => void;
    /**
     * 去登录回调
     */
    private onGoToLogin?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.width('100%');
            Column.padding({ left: 32, right: 32 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 用户名输入框
                    LoginInputItem(this, {
                        placeholder: '请输入用户名',
                        value: this.__username,
                        isPassword: false,
                        errorMessage: this.usernameError
                    }, undefined, elmtId, () => { }, { page: "features/register/src/main/ets/view/RegisterForm.ets", line: 71, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            placeholder: '请输入用户名',
                            value: this.username,
                            isPassword: false,
                            errorMessage: this.usernameError
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        placeholder: '请输入用户名',
                        isPassword: false,
                        errorMessage: this.usernameError
                    });
                }
            }, { name: "LoginInputItem" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 密码输入框
                    LoginInputItem(this, {
                        placeholder: '请输入密码',
                        value: this.__password,
                        isPassword: true,
                        errorMessage: this.passwordError
                    }, undefined, elmtId, () => { }, { page: "features/register/src/main/ets/view/RegisterForm.ets", line: 79, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            placeholder: '请输入密码',
                            value: this.password,
                            isPassword: true,
                            errorMessage: this.passwordError
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        placeholder: '请输入密码',
                        isPassword: true,
                        errorMessage: this.passwordError
                    });
                }
            }, { name: "LoginInputItem" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 确认密码输入框
                    LoginInputItem(this, {
                        placeholder: '请再次输入密码',
                        value: this.__confirmPassword,
                        isPassword: true,
                        errorMessage: this.confirmPasswordError
                    }, undefined, elmtId, () => { }, { page: "features/register/src/main/ets/view/RegisterForm.ets", line: 87, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            placeholder: '请再次输入密码',
                            value: this.confirmPassword,
                            isPassword: true,
                            errorMessage: this.confirmPasswordError
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        placeholder: '请再次输入密码',
                        isPassword: true,
                        errorMessage: this.confirmPasswordError
                    });
                }
            }, { name: "LoginInputItem" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 注册按钮
            Button.createWithChild();
            // 注册按钮
            Button.width('100%');
            // 注册按钮
            Button.height(48);
            // 注册按钮
            Button.backgroundColor(this.isLoading ? '#CCCCCC' : '#4CAF50');
            // 注册按钮
            Button.borderRadius(24);
            // 注册按钮
            Button.enabled(!this.isLoading);
            // 注册按钮
            Button.onClick(() => {
                if (this.onRegister) {
                    this.onRegister();
                }
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(24);
                        LoadingProgress.height(24);
                        LoadingProgress.color(Color.White);
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('注册');
                        Text.fontSize(18);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // 注册按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 已有账号？去登录
            Row.create();
            // 已有账号？去登录
            Row.width('100%');
            // 已有账号？去登录
            Row.justifyContent(FlexAlign.Center);
            // 已有账号？去登录
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('已有账号？');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('去登录');
            Text.fontSize(14);
            Text.fontColor('#4CAF50');
            Text.onClick(() => {
                if (this.onGoToLogin) {
                    this.onGoToLogin();
                }
            });
        }, Text);
        Text.pop();
        // 已有账号？去登录
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

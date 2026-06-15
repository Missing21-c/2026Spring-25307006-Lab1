if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginForm_Params {
    username?: string;
    password?: string;
    rememberPassword?: boolean;
    isLoading?: boolean;
    errorMessage?: string;
    /**
     * 登录回调
     */
    onLogin?: () => void;
    /**
     * 去注册回调
     */
    onGoToRegister?: () => void;
}
import { LoginInputItem } from "@bundle:com.huawei.music.musichome/phone@login/ets/view/LoginInputItem";
export class LoginForm extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__username = new SynchedPropertySimpleTwoWayPU(params.username, this, "username");
        this.__password = new SynchedPropertySimpleTwoWayPU(params.password, this, "password");
        this.__rememberPassword = new SynchedPropertySimpleTwoWayPU(params.rememberPassword, this, "rememberPassword");
        this.__isLoading = new SynchedPropertySimpleOneWayPU(params.isLoading, this, "isLoading");
        this.__errorMessage = new SynchedPropertySimpleOneWayPU(params.errorMessage, this, "errorMessage");
        this.onLogin = undefined;
        this.onGoToRegister = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginForm_Params) {
        if (params.isLoading === undefined) {
            this.__isLoading.set(false);
        }
        if (params.errorMessage === undefined) {
            this.__errorMessage.set('');
        }
        if (params.onLogin !== undefined) {
            this.onLogin = params.onLogin;
        }
        if (params.onGoToRegister !== undefined) {
            this.onGoToRegister = params.onGoToRegister;
        }
    }
    updateStateVars(params: LoginForm_Params) {
        this.__isLoading.reset(params.isLoading);
        this.__errorMessage.reset(params.errorMessage);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__username.purgeDependencyOnElmtId(rmElmtId);
        this.__password.purgeDependencyOnElmtId(rmElmtId);
        this.__rememberPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__username.aboutToBeDeleted();
        this.__password.aboutToBeDeleted();
        this.__rememberPassword.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
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
     * 是否记住密码
     */
    private __rememberPassword: SynchedPropertySimpleTwoWayPU<boolean>;
    get rememberPassword() {
        return this.__rememberPassword.get();
    }
    set rememberPassword(newValue: boolean) {
        this.__rememberPassword.set(newValue);
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
     * 错误消息
     */
    private __errorMessage: SynchedPropertySimpleOneWayPU<string>;
    get errorMessage() {
        return this.__errorMessage.get();
    }
    set errorMessage(newValue: string) {
        this.__errorMessage.set(newValue);
    }
    /**
     * 登录回调
     */
    private onLogin?: () => void;
    /**
     * 去注册回调
     */
    private onGoToRegister?: () => void;
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
                        errorMessage: ''
                    }, undefined, elmtId, () => { }, { page: "features/login/src/main/ets/view/LoginForm.ets", line: 61, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            placeholder: '请输入用户名',
                            value: this.username,
                            isPassword: false,
                            errorMessage: ''
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        placeholder: '请输入用户名',
                        isPassword: false,
                        errorMessage: ''
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
                        errorMessage: ''
                    }, undefined, elmtId, () => { }, { page: "features/login/src/main/ets/view/LoginForm.ets", line: 69, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            placeholder: '请输入密码',
                            value: this.password,
                            isPassword: true,
                            errorMessage: ''
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        placeholder: '请输入密码',
                        isPassword: true,
                        errorMessage: ''
                    });
                }
            }, { name: "LoginInputItem" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 记住密码选项
            Row.create();
            // 记住密码选项
            Row.width('100%');
            // 记住密码选项
            Row.justifyContent(FlexAlign.Start);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Toggle.create({ type: ToggleType.Checkbox, isOn: this.rememberPassword });
            Toggle.onChange((isOn: boolean) => {
                this.rememberPassword = isOn;
            });
            Toggle.width(20);
            Toggle.height(20);
            Toggle.selectedColor('#4CAF50');
        }, Toggle);
        Toggle.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('记住密码');
            Text.fontSize(14);
            Text.fontColor('#666666');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 记住密码选项
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误提示
            if (this.errorMessage && this.errorMessage.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(14);
                        Text.fontColor('#FF4444');
                        Text.width('100%');
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                });
            }
            // 登录按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 登录按钮
            Button.createWithChild();
            // 登录按钮
            Button.width('100%');
            // 登录按钮
            Button.height(48);
            // 登录按钮
            Button.backgroundColor(this.isLoading ? '#CCCCCC' : '#4CAF50');
            // 登录按钮
            Button.borderRadius(24);
            // 登录按钮
            Button.enabled(!this.isLoading);
            // 登录按钮
            Button.onClick(() => {
                if (this.onLogin) {
                    this.onLogin();
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
                        Text.create('登录');
                        Text.fontSize(18);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                });
            }
        }, If);
        If.pop();
        // 登录按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 还没有账号？去注册
            Row.create();
            // 还没有账号？去注册
            Row.width('100%');
            // 还没有账号？去注册
            Row.justifyContent(FlexAlign.Center);
            // 还没有账号？去注册
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('还没有账号？');
            Text.fontSize(14);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('去注册');
            Text.fontSize(14);
            Text.fontColor('#4CAF50');
            Text.onClick(() => {
                if (this.onGoToRegister) {
                    this.onGoToRegister();
                }
            });
        }, Text);
        Text.pop();
        // 还没有账号？去注册
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

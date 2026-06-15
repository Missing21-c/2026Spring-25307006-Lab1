if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LoginInputItem_Params {
    placeholder?: string;
    value?: string;
    isPassword?: boolean;
    errorMessage?: string;
    showPassword?: boolean;
    /**
     * 输入变化回调
     */
    onValueChange?: (value: string) => void;
}
export class LoginInputItem extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__placeholder = new SynchedPropertySimpleOneWayPU(params.placeholder, this, "placeholder");
        this.__value = new SynchedPropertySimpleTwoWayPU(params.value, this, "value");
        this.__isPassword = new SynchedPropertySimpleOneWayPU(params.isPassword, this, "isPassword");
        this.__errorMessage = new SynchedPropertySimpleOneWayPU(params.errorMessage, this, "errorMessage");
        this.__showPassword = new ObservedPropertySimplePU(false, this, "showPassword");
        this.onValueChange = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LoginInputItem_Params) {
        if (params.placeholder === undefined) {
            this.__placeholder.set('');
        }
        if (params.isPassword === undefined) {
            this.__isPassword.set(false);
        }
        if (params.errorMessage === undefined) {
            this.__errorMessage.set('');
        }
        if (params.showPassword !== undefined) {
            this.showPassword = params.showPassword;
        }
        if (params.onValueChange !== undefined) {
            this.onValueChange = params.onValueChange;
        }
    }
    updateStateVars(params: LoginInputItem_Params) {
        this.__placeholder.reset(params.placeholder);
        this.__isPassword.reset(params.isPassword);
        this.__errorMessage.reset(params.errorMessage);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__placeholder.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__isPassword.purgeDependencyOnElmtId(rmElmtId);
        this.__errorMessage.purgeDependencyOnElmtId(rmElmtId);
        this.__showPassword.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__placeholder.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__isPassword.aboutToBeDeleted();
        this.__errorMessage.aboutToBeDeleted();
        this.__showPassword.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /**
     * 占位文本
     */
    private __placeholder: SynchedPropertySimpleOneWayPU<string>;
    get placeholder() {
        return this.__placeholder.get();
    }
    set placeholder(newValue: string) {
        this.__placeholder.set(newValue);
    }
    /**
     * 输入值
     */
    private __value: SynchedPropertySimpleTwoWayPU<string>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: string) {
        this.__value.set(newValue);
    }
    /**
     * 是否为密码框
     */
    private __isPassword: SynchedPropertySimpleOneWayPU<boolean>;
    get isPassword() {
        return this.__isPassword.get();
    }
    set isPassword(newValue: boolean) {
        this.__isPassword.set(newValue);
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
     * 是否显示密码
     */
    private __showPassword: ObservedPropertySimplePU<boolean>;
    get showPassword() {
        return this.__showPassword.get();
    }
    set showPassword(newValue: boolean) {
        this.__showPassword.set(newValue);
    }
    /**
     * 输入变化回调
     */
    private onValueChange?: (value: string) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height(48);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ placeholder: this.placeholder, text: this.value });
            TextInput.type(this.isPassword && !this.showPassword ? InputType.Password : InputType.Normal);
            TextInput.onChange((value: string) => {
                this.value = value;
                if (this.onValueChange) {
                    this.onValueChange(value);
                }
            });
            TextInput.layoutWeight(1);
            TextInput.height(48);
            TextInput.fontSize(16);
            TextInput.fontColor('#333333');
            TextInput.placeholderColor('#999999');
            TextInput.backgroundColor('#F5F5F5');
            TextInput.borderRadius(8);
            TextInput.padding({ left: 16, right: 16 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 密码可见性切换按钮
            if (this.isPassword) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.width(40);
                        Button.height(40);
                        Button.backgroundColor(Color.Transparent);
                        Button.margin({ left: 8 });
                        Button.onClick(() => {
                            this.showPassword = !this.showPassword;
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.showPassword ? { "id": 150995035, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995034, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
                        Image.fillColor('#999999');
                    }, Image);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误提示
            if (this.errorMessage && this.errorMessage.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.errorMessage);
                        Text.fontSize(12);
                        Text.fontColor('#FF4444');
                        Text.margin({ top: 4 });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

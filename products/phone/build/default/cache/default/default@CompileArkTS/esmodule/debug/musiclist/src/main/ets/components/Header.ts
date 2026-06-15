if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Header_Params {
    currentBreakpoint?: string;
    pageIndexInfos?: NavPathStack;
    showDeviceTransfer?: boolean;
}
import { BreakpointType, MenuData } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { HeaderConstants } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/constants/HeaderConstants";
import { DeviceTransferPage } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
export class Header extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__showDeviceTransfer = new ObservedPropertySimplePU(false, this, "showDeviceTransfer");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Header_Params) {
        if (params.showDeviceTransfer !== undefined) {
            this.showDeviceTransfer = params.showDeviceTransfer;
        }
    }
    updateStateVars(params: Header_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__showDeviceTransfer.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
        this.__showDeviceTransfer.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    private __showDeviceTransfer: ObservedPropertySimplePU<boolean>;
    get showDeviceTransfer() {
        return this.__showDeviceTransfer.get();
    }
    set showDeviceTransfer(newValue: boolean) {
        this.__showDeviceTransfer.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width(StyleConstants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.height({ "id": 150995296, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Row.zIndex(HeaderConstants.Z_INDEX);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995027, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995197, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995195, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({ left: { "id": 150995196, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Image.onClick(() => {
                this.pageIndexInfos.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 150995126, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995194, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995193, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995192, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Text.fontWeight(HeaderConstants.TITLE_FONT_WEIGHT);
            Text.fontColor({ "id": 150995150, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.opacity({ "id": 150995302, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.letterSpacing(HeaderConstants.LETTER_SPACING);
            Text.padding({ left: { "id": 150995303, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设备传输按钮
            Image.create({ "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            // 设备传输按钮
            Image.width({ "id": 150995197, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            // 设备传输按钮
            Image.height({ "id": 150995195, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            // 设备传输按钮
            Image.margin({ right: 8 });
            // 设备传输按钮
            Image.onClick(() => {
                this.showDeviceTransfer = true;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995330, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995197, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995195, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({ right: { "id": 150995196, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Image.bindMenu(this.getMenu());
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 设备传输页面
            if (this.showDeviceTransfer) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new DeviceTransferPage(this, {
                                    isShow: this.__showDeviceTransfer,
                                    onComplete: (success: boolean, files: string[]) => {
                                        if (success) {
                                            this.getUIContext().getPromptAction().showToast({
                                                message: `传输完成，共${files.length}个文件`,
                                                duration: 2000
                                            });
                                        }
                                    }
                                }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/Header.ets", line: 73, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShow: this.showDeviceTransfer,
                                        onComplete: (success: boolean, files: string[]) => {
                                            if (success) {
                                                this.getUIContext().getPromptAction().showToast({
                                                    message: `传输完成，共${files.length}个文件`,
                                                    duration: 2000
                                                });
                                            }
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "DeviceTransferPage" });
                    }
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
    getMenu(): MenuData[] {
        let menuItem: MenuData = new MenuData();
        let menuDatas: MenuData[] = [];
        if (canIUse(HeaderConstants.SYSCAP_ETHERNET)) {
            menuItem.value = HeaderConstants.AUDIO_DEVICE_SERVICE;
            menuItem.action = (): void => {
                this.getUIContext().getPromptAction().showToast({
                    message: HeaderConstants.AUDIO_DEVICE_SERVICE,
                    duration: HeaderConstants.TOAST_DURATION
                });
            };
            menuDatas.push(menuItem);
        }
        return menuDatas;
    }
    rerender() {
        this.updateDirtyElements();
    }
}

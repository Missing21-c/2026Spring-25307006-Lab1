if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Header_Params {
    currentBreakpoint?: string;
    pageIndexInfos?: NavPathStack;
}
import { BreakpointType, MenuData } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { HeaderConstants } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/constants/HeaderConstants";
export class Header extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Header_Params) {
    }
    updateStateVars(params: Header_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.height({ "id": 134217970, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.zIndex(HeaderConstants.Z_INDEX);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218002, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217871, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217869, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ left: { "id": 134217870, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            Image.onClick(() => {
                this.pageIndexInfos.pop();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 134217800, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 134217868, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217867, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217866, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Text.fontWeight(HeaderConstants.TITLE_FONT_WEIGHT);
            Text.fontColor({ "id": 134217824, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.opacity({ "id": 134217976, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.letterSpacing(HeaderConstants.LETTER_SPACING);
            Text.padding({ left: { "id": 134217977, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218017, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217871, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217869, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ right: { "id": 134217870, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            Image.bindMenu(this.getMenu());
        }, Image);
        Row.pop();
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

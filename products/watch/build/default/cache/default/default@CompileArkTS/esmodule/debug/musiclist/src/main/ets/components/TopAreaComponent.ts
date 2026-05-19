if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TopAreaComponent_Params {
    currentBreakpoint?: string;
    isShowPlay?: boolean;
}
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { BreakpointType } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
export class TopAreaComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', 'sm', "currentBreakpoint");
        this.__isShowPlay = new SynchedPropertySimpleTwoWayPU(params.isShowPlay, this, "isShowPlay");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TopAreaComponent_Params) {
    }
    updateStateVars(params: TopAreaComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowPlay.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__isShowPlay.aboutToBeDeleted();
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
    private __isShowPlay: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShowPlay() {
        return this.__isShowPlay.get();
    }
    set isShowPlay(newValue: boolean) {
        this.__isShowPlay.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height({ "id": 134217875, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.width(StyleConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218003, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 134217832, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 134217832, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.onClick(() => {
                this.isShowPlay = false;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218020, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(new BreakpointType({
                sm: { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217842, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Image.height(new BreakpointType({
                sm: { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217836, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217842, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Image.objectFit(ImageFit.Contain);
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

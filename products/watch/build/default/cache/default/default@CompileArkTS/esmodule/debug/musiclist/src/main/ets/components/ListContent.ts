if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Content_Params {
    currentBreakpoint?: string;
    topRectHeight?: number;
}
import { BreakpointConstants, GridConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { AlbumCover } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/AlbumCover";
import { PlayList } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/PlayList";
export class Content extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Content_Params) {
    }
    updateStateVars(params: Content_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
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
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                breakpoints: {
                    value: BreakpointConstants.BREAKPOINT_VALUE,
                    reference: BreakpointsReference.WindowSize
                },
                columns: {
                    sm: BreakpointConstants.COLUMN_LG,
                    md: BreakpointConstants.COLUMN_LG,
                    lg: BreakpointConstants.COLUMN_LG
                }
            });
            GridRow.height(StyleConstants.FULL_HEIGHT);
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_SIX, lg: GridConstants.SPAN_FOUR } });
            GridCol.backgroundColor({ "id": 134217805, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.padding({ top: this.getUIContext().px2vp(this.topRectHeight) });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AlbumCover(this, { currentBreakpoint: this.__currentBreakpoint }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/ListContent.ets", line: 38, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentBreakpoint: this.currentBreakpoint
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "AlbumCover" });
        }
        __Common__.pop();
        GridCol.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({ span: { sm: GridConstants.SPAN_TWELVE, md: GridConstants.SPAN_SIX, lg: GridConstants.SPAN_EIGHT } });
            GridCol.borderRadius({ "id": 134217946, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.padding({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 :
                    this.getUIContext().px2vp(this.topRectHeight)
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PlayList(this, { currentBreakpoint: this.__currentBreakpoint }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/ListContent.ets", line: 44, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            currentBreakpoint: this.currentBreakpoint
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PlayList" });
        }
        __Common__.pop();
        GridCol.pop();
        GridRow.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

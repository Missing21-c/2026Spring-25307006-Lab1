if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MusicListPage_Params {
    breakpointSystem?: BreakpointSystem;
    currentBreakpoint?: string;
    deviceHeight?: number;
    topRectHeight?: number;
}
import { BreakpointSystem, MediaService } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { StyleConstants, BreakpointConstants, SongConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { Header } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/components/Header";
import { Player } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/components/Player";
import { Content } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/components/ListContent";
import { songList } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/viewmodel/SongListData";
export class MusicListPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.breakpointSystem = new BreakpointSystem();
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__deviceHeight = this.createStorageLink('deviceHeight', 0, "deviceHeight");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MusicListPage_Params) {
        if (params.breakpointSystem !== undefined) {
            this.breakpointSystem = params.breakpointSystem;
        }
    }
    updateStateVars(params: MusicListPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__deviceHeight.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private breakpointSystem: BreakpointSystem;
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __deviceHeight: ObservedPropertyAbstractPU<number>;
    get deviceHeight() {
        return this.__deviceHeight.get();
    }
    set deviceHeight(newValue: number) {
        this.__deviceHeight.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    aboutToAppear() {
        AppStorage.setOrCreate('songList', songList);
        MediaService.getInstance();
        this.breakpointSystem.register();
    }
    aboutToDisappear() {
        this.breakpointSystem.unregister();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.Top });
            Stack.width(StyleConstants.FULL_WIDTH);
            Stack.backgroundColor(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 150995136, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995135, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Stack.onAreaChange((oldArea: Area, newArea: Area) => {
                if (typeof newArea.height === 'number') {
                    this.deviceHeight = newArea.height;
                }
            });
            Stack.expandSafeArea([SafeAreaType.SYSTEM]);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ top: this.getUIContext().px2vp(this.topRectHeight) });
            __Common__.zIndex(2);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Header(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/view/MusicListPage.ets", line: 42, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Header" });
        }
        __Common__.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Content(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/view/MusicListPage.ets", line: 45, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Content" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Player(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/view/MusicListPage.ets", line: 46, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Player" });
        }
        Stack.pop();
    }
    pageTransition() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            PageTransition.create();
        }, null);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            PageTransitionEnter.create({ duration: SongConstants.TRANSITION_DURATION, curve: Curve.Smooth, type: RouteType.Pop });
        }, null);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            PageTransitionExit.create({ duration: SongConstants.TRANSITION_DURATION, curve: Curve.Smooth, type: RouteType.Push });
        }, null);
        PageTransition.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

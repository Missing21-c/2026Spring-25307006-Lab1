if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MusicControlComponent_Params {
    currentBreakpoint?: string;
    songList?: SongItem[];
    selectIndex?: number;
    imageColor?: string;
    topArea?: number;
    bottomArea?: number;
    currentHeightBreakpoint?: number;
    imageLabel?: PixelMap | Resource;
    isShowControl?: boolean;
    isShowControlLg?: boolean;
    isTablet?: boolean;
    isTabletFalse?: boolean;
    pageShowTime?: number;
    intervalID?: number;
    isShowPlay?: boolean;
    isFoldFull?: boolean;
    context?: common.UIAbilityContext | undefined;
    callback?: Callback<display.FoldDisplayMode>;
}
import display from "@ohos:display";
import image from "@ohos:multimedia.image";
import effectKit from "@ohos:effectKit";
import type common from "@ohos:app.ability.common";
import type { BusinessError } from "@ohos:base";
import type { Callback } from "@ohos:base";
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { ColorConversion, Logger } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { LyricsComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/LyricsComponent";
import { MusicInfoComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/MusicInfoComponent";
import { ControlAreaComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/ControlAreaComponent";
import { TopAreaComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/TopAreaComponent";
import { PlayerConstants } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/constants/PlayerConstants";
const TAG = 'MusicControlComponent';
export class MusicControlComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__selectIndex = this.createStorageProp('selectIndex', 0, "selectIndex");
        this.__imageColor = this.createStorageLink('imageColor', 'rgba(0, 0, 2, 1.00)', "imageColor");
        this.__topArea = this.createStorageLink('topArea', 0, "topArea");
        this.__bottomArea = this.createStorageLink('bottomArea', 0, "bottomArea");
        this.__currentHeightBreakpoint = this.createStorageLink('currentHeightBreakpoint', 0, "currentHeightBreakpoint");
        this.__imageLabel = new ObservedPropertyObjectPU(this.songList[this.selectIndex].label, this, "imageLabel");
        this.__isShowControl = new ObservedPropertySimplePU(true, this, "isShowControl");
        this.__isShowControlLg = new ObservedPropertySimplePU(false, this, "isShowControlLg");
        this.__isTablet = new ObservedPropertySimplePU(true, this, "isTablet");
        this.__isTabletFalse = new ObservedPropertySimplePU(false, this, "isTabletFalse");
        this.__pageShowTime = this.createStorageLink('pageShowTime', 0, "pageShowTime");
        this.__intervalID = new ObservedPropertySimplePU(0, this, "intervalID");
        this.__isShowPlay = new SynchedPropertySimpleTwoWayPU(params.isShowPlay, this, "isShowPlay");
        this.__isFoldFull = this.createStorageLink('isFoldFull', false, "isFoldFull");
        this.context = AppStorage.get('context');
        this.callback = (data: display.FoldDisplayMode) => {
            if (canIUse('SystemCapability.Window.SessionManager')) {
                if (data === display.FoldDisplayMode.FOLD_DISPLAY_MODE_FULL) {
                    this.isFoldFull = true;
                }
                else {
                    this.isFoldFull = false;
                }
            }
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("selectIndex", this.getImageColor);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MusicControlComponent_Params) {
        if (params.imageLabel !== undefined) {
            this.imageLabel = params.imageLabel;
        }
        if (params.isShowControl !== undefined) {
            this.isShowControl = params.isShowControl;
        }
        if (params.isShowControlLg !== undefined) {
            this.isShowControlLg = params.isShowControlLg;
        }
        if (params.isTablet !== undefined) {
            this.isTablet = params.isTablet;
        }
        if (params.isTabletFalse !== undefined) {
            this.isTabletFalse = params.isTabletFalse;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.callback !== undefined) {
            this.callback = params.callback;
        }
    }
    updateStateVars(params: MusicControlComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__imageColor.purgeDependencyOnElmtId(rmElmtId);
        this.__topArea.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomArea.purgeDependencyOnElmtId(rmElmtId);
        this.__currentHeightBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__imageLabel.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowControl.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowControlLg.purgeDependencyOnElmtId(rmElmtId);
        this.__isTablet.purgeDependencyOnElmtId(rmElmtId);
        this.__isTabletFalse.purgeDependencyOnElmtId(rmElmtId);
        this.__pageShowTime.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalID.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoldFull.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__imageColor.aboutToBeDeleted();
        this.__topArea.aboutToBeDeleted();
        this.__bottomArea.aboutToBeDeleted();
        this.__currentHeightBreakpoint.aboutToBeDeleted();
        this.__imageLabel.aboutToBeDeleted();
        this.__isShowControl.aboutToBeDeleted();
        this.__isShowControlLg.aboutToBeDeleted();
        this.__isTablet.aboutToBeDeleted();
        this.__isTabletFalse.aboutToBeDeleted();
        this.__pageShowTime.aboutToBeDeleted();
        this.__intervalID.aboutToBeDeleted();
        this.__isShowPlay.aboutToBeDeleted();
        this.__isFoldFull.aboutToBeDeleted();
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
    private __songList: ObservedPropertyAbstractPU<SongItem[]>;
    get songList() {
        return this.__songList.get();
    }
    set songList(newValue: SongItem[]) {
        this.__songList.set(newValue);
    }
    private __selectIndex: ObservedPropertyAbstractPU<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __imageColor: ObservedPropertyAbstractPU<string>;
    get imageColor() {
        return this.__imageColor.get();
    }
    set imageColor(newValue: string) {
        this.__imageColor.set(newValue);
    }
    private __topArea: ObservedPropertyAbstractPU<number>;
    get topArea() {
        return this.__topArea.get();
    }
    set topArea(newValue: number) {
        this.__topArea.set(newValue);
    }
    private __bottomArea: ObservedPropertyAbstractPU<number>;
    get bottomArea() {
        return this.__bottomArea.get();
    }
    set bottomArea(newValue: number) {
        this.__bottomArea.set(newValue);
    }
    private __currentHeightBreakpoint: ObservedPropertyAbstractPU<number>;
    get currentHeightBreakpoint() {
        return this.__currentHeightBreakpoint.get();
    }
    set currentHeightBreakpoint(newValue: number) {
        this.__currentHeightBreakpoint.set(newValue);
    }
    private __imageLabel: ObservedPropertyObjectPU<PixelMap | Resource>;
    get imageLabel() {
        return this.__imageLabel.get();
    }
    set imageLabel(newValue: PixelMap | Resource) {
        this.__imageLabel.set(newValue);
    }
    private __isShowControl: ObservedPropertySimplePU<boolean>;
    get isShowControl() {
        return this.__isShowControl.get();
    }
    set isShowControl(newValue: boolean) {
        this.__isShowControl.set(newValue);
    }
    private __isShowControlLg: ObservedPropertySimplePU<boolean>;
    get isShowControlLg() {
        return this.__isShowControlLg.get();
    }
    set isShowControlLg(newValue: boolean) {
        this.__isShowControlLg.set(newValue);
    }
    private __isTablet: ObservedPropertySimplePU<boolean>;
    get isTablet() {
        return this.__isTablet.get();
    }
    set isTablet(newValue: boolean) {
        this.__isTablet.set(newValue);
    }
    private __isTabletFalse: ObservedPropertySimplePU<boolean>;
    get isTabletFalse() {
        return this.__isTabletFalse.get();
    }
    set isTabletFalse(newValue: boolean) {
        this.__isTabletFalse.set(newValue);
    }
    private __pageShowTime: ObservedPropertyAbstractPU<number>;
    get pageShowTime() {
        return this.__pageShowTime.get();
    }
    set pageShowTime(newValue: number) {
        this.__pageShowTime.set(newValue);
    }
    private __intervalID: ObservedPropertySimplePU<number>;
    get intervalID() {
        return this.__intervalID.get();
    }
    set intervalID(newValue: number) {
        this.__intervalID.set(newValue);
    }
    private __isShowPlay: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShowPlay() {
        return this.__isShowPlay.get();
    }
    set isShowPlay(newValue: boolean) {
        this.__isShowPlay.set(newValue);
    }
    private __isFoldFull: ObservedPropertyAbstractPU<boolean>;
    get isFoldFull() {
        return this.__isFoldFull.get();
    }
    set isFoldFull(newValue: boolean) {
        this.__isFoldFull.set(newValue);
    }
    private context: common.UIAbilityContext | undefined;
    private callback: Callback<display.FoldDisplayMode>;
    aboutToAppear(): void {
        this.getImageColor();
        try {
            if (canIUse('SystemCapability.Window.SessionManager')) {
                let mode = display.getFoldDisplayMode();
                if (mode === display.FoldDisplayMode.FOLD_DISPLAY_MODE_FULL) {
                    this.isFoldFull = true;
                }
                display.on('foldDisplayModeChange', this.callback);
            }
        }
        catch (exception) {
            Logger.error('Failed to register callback. Code: ' + JSON.stringify(exception));
        }
    }
    aboutToDisappear(): void {
        if (canIUse('SystemCapability.Window.SessionManager')) {
            try {
                display.off('foldDisplayModeChange', this.callback);
            }
            catch (error) {
                Logger.error(TAG, `${error.code} + ${error.message}`);
            }
            this.isFoldFull = false;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.height(StyleConstants.FULL_HEIGHT);
            Stack.width(StyleConstants.FULL_WIDTH);
            Stack.backgroundColor(this.imageColor);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.imageLabel);
            Image.size(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
                {
                    width: PlayerConstants.BACK_IMAGE
                } :
                {
                    height: PlayerConstants.BACK_IMAGE
                });
            Image.aspectRatio(1);
            Image.objectFit(ImageFit.Cover);
            Image.opacity(0.5);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({
                bottom: this.bottomArea,
                top: this.topArea
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if ((this.currentBreakpoint === BreakpointConstants.BREAKPOINT_MD &&
                this.currentHeightBreakpoint === HeightBreakpoint.HEIGHT_MD)) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.layoutWeight(1);
                        Column.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({
                            bottom: { "id": 134217923, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            left: { "id": 134217978, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopAreaComponent(this, { isShowPlay: this.__isShowPlay }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 104, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowPlay: this.isShowPlay
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "TopAreaComponent" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: { md: BreakpointConstants.COLUMN_MD },
                            gutter: BreakpointConstants.GUTTER_MUSIC_X
                        });
                        GridRow.layoutWeight(1);
                        GridRow.margin({
                            bottom: { "id": 134217863, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: { md: BreakpointConstants.SPAN_SM }
                        });
                        GridCol.margin({
                            left: { "id": 134217920, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217920, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MusicInfoComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 116, col: 17 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "MusicInfoComponent" });
                    }
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: { md: BreakpointConstants.SPAN_SM }
                        });
                        GridCol.padding({
                            left: { "id": 134217979, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LyricsComponent(this, { isShowControl: this.__isShowControlLg, isTablet: this.__isTabletFalse }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 126, col: 17 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowControl: this.isShowControlLg,
                                        isTablet: this.isTabletFalse
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LyricsComponent" });
                    }
                    GridCol.pop();
                    GridRow.pop();
                    Column.pop();
                });
            }
            else if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopAreaComponent(this, { isShowPlay: this.__isShowPlay }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 144, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowPlay: this.isShowPlay
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "TopAreaComponent" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: { md: BreakpointConstants.COLUMN_MD, lg: BreakpointConstants.COLUMN_LG },
                            gutter: BreakpointConstants.GUTTER_MUSIC_X
                        });
                        GridRow.layoutWeight(1);
                        GridRow.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            top: { "id": 134217893, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            bottom: { "id": 134217892, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: { md: BreakpointConstants.SPAN_SM, lg: BreakpointConstants.SPAN_SM },
                            offset: { lg: BreakpointConstants.OFFSET_MD }
                        });
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.height(StyleConstants.FULL_HEIGHT);
                        Column.justifyContent(FlexAlign.SpaceBetween);
                        Column.margin({
                            bottom: { "id": 134217837, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.songList[this.selectIndex].label);
                        Image.width(StyleConstants.FULL_WIDTH);
                        Image.aspectRatio(1);
                        Image.borderRadius({ "id": 134217859, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    }, Image);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ControlAreaComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 162, col: 19 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ControlAreaComponent" });
                    }
                    Column.pop();
                    GridCol.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: { md: BreakpointConstants.SPAN_SM, lg: BreakpointConstants.SPAN_MD },
                            offset: { lg: BreakpointConstants.OFFSET_MD }
                        });
                    }, GridCol);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LyricsComponent(this, { isShowControl: this.__isShowControlLg, isTablet: this.__isTablet }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 175, col: 17 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowControl: this.isShowControlLg,
                                        isTablet: this.isTablet
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LyricsComponent" });
                    }
                    GridCol.pop();
                    GridRow.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Stack.create({ alignContent: Alignment.TopStart });
                        Stack.height(StyleConstants.FULL_HEIGHT);
                    }, Stack);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Swiper.create();
                        Swiper.height(StyleConstants.FULL_HEIGHT);
                        Swiper.indicator(new DotIndicator()
                            .top({ "id": 134217931, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" })
                            .selectedColor({ "id": 134217813, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" })
                            .color({ "id": 134217819, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }));
                        Swiper.clip(false);
                        Swiper.loop(false);
                        Swiper.onChange((index: number) => {
                            if (index === 1) {
                                this.isShowControl = true;
                                this.intervalID = setInterval(() => {
                                    this.pageShowTime += 1;
                                    if (this.pageShowTime > 5) {
                                        this.isShowControl = false;
                                        clearInterval(this.intervalID);
                                    }
                                }, 1000);
                            }
                            else {
                                this.pageShowTime = 0;
                                clearInterval(this.intervalID);
                            }
                        });
                    }, Swiper);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({
                            top: { "id": 134217922, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            bottom: { "id": 134217921, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                        __Common__.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MusicInfoComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 189, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "MusicInfoComponent" });
                    }
                    __Common__.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({
                            top: { "id": 134217919, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                        __Common__.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LyricsComponent(this, { isShowControl: this.__isShowControl, isTablet: this.__isTabletFalse }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 198, col: 15 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowControl: this.isShowControl,
                                        isTablet: this.isTabletFalse
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "LyricsComponent" });
                    }
                    __Common__.pop();
                    Swiper.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.padding({
                            left: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            right: { "id": 134217838, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TopAreaComponent(this, { isShowPlay: this.__isShowPlay }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicControlComponent.ets", line: 232, col: 13 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShowPlay: this.isShowPlay
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "TopAreaComponent" });
                    }
                    __Common__.pop();
                    Stack.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
        Stack.pop();
    }
    /**
     * Get largest proportion color of an image.
     */
    getImageColor() {
        if (!this.context) {
            return;
        }
        this.context.resourceManager.getMediaContent(this.songList[this.selectIndex].label.id)
            .then((value: Uint8Array) => {
            let buffer = value.buffer as ArrayBuffer;
            image.createImageSource(buffer).createPixelMap().then((pixelMap) => {
                effectKit.createColorPicker(pixelMap, (error, colorPicker) => {
                    if (error) {
                        Logger.error('Failed to create color picker.');
                    }
                    else {
                        let color = colorPicker.getLargestProportionColor();
                        let colorArr = ColorConversion.dealColor(color.red, color.green, color.blue);
                        this.imageColor = `rgba(${colorArr[0]}, ${colorArr[1]}, ${colorArr[2]}, 1)`;
                    }
                });
                let headFilter = effectKit.createEffect(pixelMap);
                if (headFilter !== null) {
                    headFilter.blur(PlayerConstants.IMAGE_BLUR);
                    headFilter.getEffectPixelMap().then((value) => {
                        this.imageLabel = value;
                    });
                }
            })
                .catch((error: BusinessError) => {
                Logger.error(`${error.code} + ${error.message}`);
            });
        })
            .catch((error: BusinessError) => {
            Logger.error(`${error.code} + ${error.message}`);
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}

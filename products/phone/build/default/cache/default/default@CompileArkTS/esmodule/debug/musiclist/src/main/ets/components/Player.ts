if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Player_Params {
    selectIndex?: number;
    isPlay?: boolean;
    songList?: SongItem[];
    topArea?: number;
    bottomArea?: number;
    currentBreakpoint?: string;
    imageRotate?: number;
    isShowPlay?: boolean;
    componentHeight?: number;
    deviceHeight?: number;
    bottomRectHeight?: number;
    panOption?: PanGestureOptions;
    backDisplaySyncSlow?: displaySync.DisplaySync | undefined;
    context?;
    drawFrame?: (value: displaySync.IntervalInfo) => void;
}
import curves from "@native:ohos.curves";
import window from "@ohos:window";
import displaySync from "@ohos:graphics.displaySync";
import type { BusinessError } from "@ohos:base";
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { BreakpointType, Logger, MediaService } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { PlayerConstants } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/constants/PlayerConstants";
import { MusicControlComponent } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/components/MusicControlComponent";
import type common from "@ohos:app.ability.common";
export class Player extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__selectIndex = this.createStorageProp('selectIndex', 0, "selectIndex");
        this.__isPlay = this.createStorageLink('isPlay', false, "isPlay");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__topArea = this.createStorageLink('topArea', 0, "topArea");
        this.__bottomArea = this.createStorageLink('bottomArea', 0, "bottomArea");
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__imageRotate = new ObservedPropertySimplePU(0, this, "imageRotate");
        this.__isShowPlay = this.createStorageLink('isShowPlay', false, "isShowPlay");
        this.__componentHeight = new ObservedPropertySimplePU(0, this, "componentHeight");
        this.__deviceHeight = this.createStorageLink('deviceHeight', 0, "deviceHeight");
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.panOption = new PanGestureOptions({ direction: PanDirection.Vertical });
        this.backDisplaySyncSlow = undefined;
        this.context = this.getUIContext().getHostContext() as common.UIAbilityContext;
        this.drawFrame = (value: displaySync.IntervalInfo) => {
            if (this.imageRotate >= 360) {
                this.imageRotate = 0;
            }
            this.imageRotate += 1;
        };
        this.setInitiallyProvidedValue(params);
        this.declareWatch("isPlay", this.animationFun);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Player_Params) {
        if (params.imageRotate !== undefined) {
            this.imageRotate = params.imageRotate;
        }
        if (params.componentHeight !== undefined) {
            this.componentHeight = params.componentHeight;
        }
        if (params.panOption !== undefined) {
            this.panOption = params.panOption;
        }
        if (params.backDisplaySyncSlow !== undefined) {
            this.backDisplaySyncSlow = params.backDisplaySyncSlow;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.drawFrame !== undefined) {
            this.drawFrame = params.drawFrame;
        }
    }
    updateStateVars(params: Player_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__topArea.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomArea.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__imageRotate.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__componentHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__selectIndex.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__topArea.aboutToBeDeleted();
        this.__bottomArea.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__imageRotate.aboutToBeDeleted();
        this.__isShowPlay.aboutToBeDeleted();
        this.__componentHeight.aboutToBeDeleted();
        this.__deviceHeight.aboutToBeDeleted();
        this.__bottomRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __selectIndex: ObservedPropertyAbstractPU<number>;
    get selectIndex() {
        return this.__selectIndex.get();
    }
    set selectIndex(newValue: number) {
        this.__selectIndex.set(newValue);
    }
    private __isPlay: ObservedPropertyAbstractPU<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __songList: ObservedPropertyAbstractPU<SongItem[]>;
    get songList() {
        return this.__songList.get();
    }
    set songList(newValue: SongItem[]) {
        this.__songList.set(newValue);
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
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __imageRotate: ObservedPropertySimplePU<number>;
    get imageRotate() {
        return this.__imageRotate.get();
    }
    set imageRotate(newValue: number) {
        this.__imageRotate.set(newValue);
    }
    private __isShowPlay: ObservedPropertyAbstractPU<boolean>;
    get isShowPlay() {
        return this.__isShowPlay.get();
    }
    set isShowPlay(newValue: boolean) {
        this.__isShowPlay.set(newValue);
    }
    private __componentHeight: ObservedPropertySimplePU<number>;
    get componentHeight() {
        return this.__componentHeight.get();
    }
    set componentHeight(newValue: number) {
        this.__componentHeight.set(newValue);
    }
    private __deviceHeight: ObservedPropertyAbstractPU<number>;
    get deviceHeight() {
        return this.__deviceHeight.get();
    }
    set deviceHeight(newValue: number) {
        this.__deviceHeight.set(newValue);
    }
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    private panOption: PanGestureOptions;
    private backDisplaySyncSlow: displaySync.DisplaySync | undefined;
    private context;
    private drawFrame: (value: displaySync.IntervalInfo) => void;
    animationFun() {
        if (this.isPlay) {
            this.backDisplaySyncSlow?.start();
        }
        else {
            this.backDisplaySyncSlow?.stop();
        }
    }
    aboutToAppear() {
        let range: ExpectedFrameRateRange = {
            expected: 30,
            min: 0,
            max: 30
        };
        this.backDisplaySyncSlow = displaySync.create();
        this.backDisplaySyncSlow.setExpectedFrameRateRange(range);
        this.backDisplaySyncSlow.on('frame', this.drawFrame);
    }
    aboutToDisappear(): void {
        this.backDisplaySyncSlow?.off('frame', this.drawFrame);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.backgroundColor({ "id": 150995138, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Row.bindContentCover({ value: this.isShowPlay, changeEvent: newValue => { this.isShowPlay = newValue; } }, { builder: () => {
                    this.musicPlayBuilder.call(this);
                } }, ModalTransition.DEFAULT);
            Row.padding({
                left: { "id": 150995271, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: { "id": 150995271, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: this.getUIContext().px2vp(this.bottomRectHeight)
            });
            Row.position({
                x: 0,
                y: StyleConstants.FULL_HEIGHT
            });
            Row.translate({
                x: 0,
                y: -(48 + this.getUIContext().px2vp(this.bottomRectHeight))
            });
            globalThis.Gesture.create(GesturePriority.Low);
            PanGesture.create(this.panOption);
            PanGesture.onActionEnd((event?: GestureEvent) => {
                if (event && event.offsetY < -10) {
                    this.isShowPlay = true;
                }
            });
            PanGesture.pop();
            globalThis.Gesture.pop();
            Row.height(48 + this.getUIContext().px2vp(this.bottomRectHeight));
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.layoutWeight(PlayerConstants.LAYOUT_WEIGHT_PLAYER_CONTROL);
            Row.onClick(() => {
                this.isShowPlay = true;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.songList[this.selectIndex]?.label);
            Image.height({ "id": 150995173, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995187, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.borderRadius({ "id": 150995214, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({ right: { "id": 150995174, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Image.rotate({ angle: this.imageRotate });
            Image.onAppear(() => {
                this.animationFun();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.songList[this.selectIndex].title);
            Text.fontColor({ "id": 150995146, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995295, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995294, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995293, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995355, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995306, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995308, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({ right: { "id": 150995307, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.songList[this.selectIndex].singer);
            Text.fontColor({ "id": 150995141, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize(new BreakpointType({
                sm: { "id": 150995281, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995280, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995279, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Text.opacity({ "id": 150995278, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.onClick(() => {
                this.isShowPlay = true;
            });
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(new BreakpointType({
                sm: { "id": 150995269, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995269, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995268, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Row.justifyContent(FlexAlign.End);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995341, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995165, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995167, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({ right: { "id": 150995166, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_TWO);
            Image.onClick(() => MediaService.getInstance().playPrevious());
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isPlay ? { "id": 150995338, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995336, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995165, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995167, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_THREE);
            Image.onClick(() => {
                if (MediaService.getInstance().getFirst()) {
                    MediaService.getInstance().loadAssent(0);
                }
                else {
                    this.isPlay ? MediaService.getInstance().pause() : MediaService.getInstance().play();
                }
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995334, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995165, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995167, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.margin({
                right: { "id": 150995166, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                left: { "id": 150995166, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_TWO);
            Image.onClick(() => MediaService.getInstance().playNextAuto(true));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995165, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995167, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.displayPriority(PlayerConstants.DISPLAY_PRIORITY_ONE);
        }, Image);
        Row.pop();
        Row.pop();
    }
    musicPlayBuilder(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(StyleConstants.FULL_WIDTH);
            Column.width(StyleConstants.FULL_HEIGHT);
            Column.justifyContent(FlexAlign.End);
            Column.transition(TransitionEffect.translate({ y: 1000 }).animation({ curve: curves.springMotion(0.6, 0.8) }));
            Column.onAppear(() => {
                window.getLastWindow(this.context).then((windowStage: window.Window) => {
                    try {
                        let area = windowStage.getWindowAvoidArea(window.AvoidAreaType.TYPE_SYSTEM);
                        this.topArea = this.getUIContext().px2vp(area.topRect.height);
                        let bottomArea = windowStage.getWindowAvoidArea(window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR);
                        this.bottomArea = this.getUIContext().px2vp(bottomArea.bottomRect.height);
                        Logger.info('bottomArea ' + this.bottomArea);
                        let sysBarProps: window.SystemBarProperties = {
                            statusBarContentColor: '#FFFFFF'
                        };
                        windowStage.setWindowSystemBarProperties(sysBarProps).catch((error: BusinessError) => {
                            Logger.error(`setWindowSystemBarProperties error ${error.code} + ${error.message}`);
                        });
                    }
                    catch (e) {
                        Logger.error(`getWindowAvoidArea error ${JSON.stringify(e)}`);
                    }
                }).catch((error: BusinessError) => {
                    Logger.error(`${error.code} + ${error.message}`);
                });
            });
            Column.onDisAppear(() => {
                this.componentHeight = 0;
                this.isShowPlay = false;
                window.getLastWindow(this.context).then((windowStage: window.Window) => {
                    let sysBarProps: window.SystemBarProperties = {
                        statusBarContentColor: '#000000'
                    };
                    windowStage.setWindowSystemBarProperties(sysBarProps).catch((error: BusinessError) => {
                        Logger.error(`setWindowSystemBarProperties error ${error.code} + ${error.message}`);
                    });
                }).catch((error: BusinessError) => {
                    Logger.error(`${error.code} + ${error.message}`);
                });
            });
            globalThis.Gesture.create(GesturePriority.Low);
            PanGesture.create(this.panOption);
            PanGesture.onActionUpdate((event?: GestureEvent) => {
                if (event) {
                    let height = event.offsetY / this.deviceHeight * 100;
                    this.componentHeight = height;
                    if (this.componentHeight < 0) {
                        this.componentHeight = 0;
                    }
                }
            });
            PanGesture.onActionEnd(() => {
                if (this.componentHeight > 40) {
                    this.isShowPlay = false;
                }
                else {
                    this.componentHeight = 0;
                }
            });
            PanGesture.pop();
            globalThis.Gesture.pop();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height((100 - this.componentHeight) + '%');
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MusicControlComponent(this, { isShowPlay: this.__isShowPlay }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/Player.ets", line: 190, col: 9 });
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
            }, { name: "MusicControlComponent" });
        }
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

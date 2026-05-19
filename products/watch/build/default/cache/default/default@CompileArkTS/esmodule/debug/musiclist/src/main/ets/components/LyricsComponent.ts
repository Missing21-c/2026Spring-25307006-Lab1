if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LyricsComponent_Params {
    currentBreakpoint?: string;
    time?: number;
    isFoldFull?: boolean;
    progress?: number;
    progressText?: string;
    lyricScrollEffect?: LyricScrollEffect;
    mLrcEntryList?: Array<LrcEntry>;
    songList?: SongItem[];
    selectIndex?: number;
    context?: common.UIAbilityContext | undefined;
    isPlay?: boolean;
    isShowControl?: boolean;
    isTablet?: boolean;
    intervalID?: number;
    pageShowTime?: number;
}
import type common from "@ohos:app.ability.common";
import util from "@ohos:util";
import { BreakpointType, Logger } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import type { LrcEntry } from '../lyric/LrcEntry';
import { parseKrcLyric, parseLrcLyric } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/lyric/LrcUtils";
import LrcView from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/lyric/LrcView";
import type { LyricScrollEffect, LyricTopPosition } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/lyric/LyricConst";
import { ControlAreaComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/ControlAreaComponent";
import { LyricFile } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/lyric/LyricConst";
import { PlayerConstants } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/constants/PlayerConstants";
const TAG = 'LyricsComponent';
export class LyricsComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__time = this.createStorageLink('progress', 0, "time");
        this.__isFoldFull = this.createStorageLink('isFoldFull', false, "isFoldFull");
        this.__progress = new ObservedPropertySimplePU(0.01, this, "progress");
        this.__progressText = new ObservedPropertySimplePU('', this, "progressText");
        this.__lyricScrollEffect = new ObservedPropertySimplePU(0, this, "lyricScrollEffect");
        this.__mLrcEntryList = new ObservedPropertyObjectPU([], this, "mLrcEntryList");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__selectIndex = this.createStorageProp('selectIndex', 0, "selectIndex");
        this.context = AppStorage.get('context');
        this.__isPlay = this.createStorageLink('isPlay', false, "isPlay");
        this.__isShowControl = new SynchedPropertySimpleTwoWayPU(params.isShowControl, this, "isShowControl");
        this.__isTablet = new SynchedPropertySimpleTwoWayPU(params.isTablet, this, "isTablet");
        this.__intervalID = new ObservedPropertySimplePU(0, this, "intervalID");
        this.__pageShowTime = new ObservedPropertySimplePU(0, this, "pageShowTime");
        this.setInitiallyProvidedValue(params);
        this.declareWatch("selectIndex", this.getLrcEntryList);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LyricsComponent_Params) {
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.progressText !== undefined) {
            this.progressText = params.progressText;
        }
        if (params.lyricScrollEffect !== undefined) {
            this.lyricScrollEffect = params.lyricScrollEffect;
        }
        if (params.mLrcEntryList !== undefined) {
            this.mLrcEntryList = params.mLrcEntryList;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.intervalID !== undefined) {
            this.intervalID = params.intervalID;
        }
        if (params.pageShowTime !== undefined) {
            this.pageShowTime = params.pageShowTime;
        }
    }
    updateStateVars(params: LyricsComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoldFull.purgeDependencyOnElmtId(rmElmtId);
        this.__progress.purgeDependencyOnElmtId(rmElmtId);
        this.__progressText.purgeDependencyOnElmtId(rmElmtId);
        this.__lyricScrollEffect.purgeDependencyOnElmtId(rmElmtId);
        this.__mLrcEntryList.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowControl.purgeDependencyOnElmtId(rmElmtId);
        this.__isTablet.purgeDependencyOnElmtId(rmElmtId);
        this.__intervalID.purgeDependencyOnElmtId(rmElmtId);
        this.__pageShowTime.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__isFoldFull.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__progressText.aboutToBeDeleted();
        this.__lyricScrollEffect.aboutToBeDeleted();
        this.__mLrcEntryList.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__isShowControl.aboutToBeDeleted();
        this.__isTablet.aboutToBeDeleted();
        this.__intervalID.aboutToBeDeleted();
        this.__pageShowTime.aboutToBeDeleted();
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
    private __time: ObservedPropertyAbstractPU<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private __isFoldFull: ObservedPropertyAbstractPU<boolean>;
    get isFoldFull() {
        return this.__isFoldFull.get();
    }
    set isFoldFull(newValue: boolean) {
        this.__isFoldFull.set(newValue);
    }
    private __progress: ObservedPropertySimplePU<number>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: number) {
        this.__progress.set(newValue);
    }
    private __progressText: ObservedPropertySimplePU<string>;
    get progressText() {
        return this.__progressText.get();
    }
    set progressText(newValue: string) {
        this.__progressText.set(newValue);
    }
    private __lyricScrollEffect: ObservedPropertySimplePU<LyricScrollEffect>;
    get lyricScrollEffect() {
        return this.__lyricScrollEffect.get();
    }
    set lyricScrollEffect(newValue: LyricScrollEffect) {
        this.__lyricScrollEffect.set(newValue);
    }
    private __mLrcEntryList: ObservedPropertyObjectPU<Array<LrcEntry>>;
    get mLrcEntryList() {
        return this.__mLrcEntryList.get();
    }
    set mLrcEntryList(newValue: Array<LrcEntry>) {
        this.__mLrcEntryList.set(newValue);
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
    private context: common.UIAbilityContext | undefined;
    private __isPlay: ObservedPropertyAbstractPU<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __isShowControl: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShowControl() {
        return this.__isShowControl.get();
    }
    set isShowControl(newValue: boolean) {
        this.__isShowControl.set(newValue);
    }
    private __isTablet: SynchedPropertySimpleTwoWayPU<boolean>;
    get isTablet() {
        return this.__isTablet.get();
    }
    set isTablet(newValue: boolean) {
        this.__isTablet.set(newValue);
    }
    private __intervalID: ObservedPropertySimplePU<number>;
    get intervalID() {
        return this.__intervalID.get();
    }
    set intervalID(newValue: number) {
        this.__intervalID.set(newValue);
    }
    private __pageShowTime: ObservedPropertySimplePU<number>;
    get pageShowTime() {
        return this.__pageShowTime.get();
    }
    set pageShowTime(newValue: number) {
        this.__pageShowTime.set(newValue);
    }
    aboutToAppear() {
        this.getLrcEntryList();
    }
    getLrcEntryList() {
        this.mLrcEntryList = [];
        if (!this.context) {
            return;
        }
        try {
            this.context.resourceManager.getRawFileContent(this.songList[this.selectIndex].lyric)
                .then((value: Uint8Array) => {
                let textDecoder = util.TextDecoder.create(PlayerConstants.ENCODING, { ignoreBOM: true });
                let stringData = textDecoder.decodeToString(value, { stream: false });
                if (this.songList[this.selectIndex].lyric.endsWith(LyricFile.KRC)) {
                    this.mLrcEntryList = parseKrcLyric(stringData);
                }
                else if (this.songList[this.selectIndex].lyric.endsWith(LyricFile.LRC)) {
                    this.mLrcEntryList = parseLrcLyric(stringData);
                }
            });
        }
        catch (error) {
            Logger.error(TAG, `${error.code} + ${error.message}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.onClick(() => {
                this.pageShowTime = 0;
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(StyleConstants.FULL_WIDTH);
                        Row.justifyContent(FlexAlign.Start);
                        Row.margin({
                            top: new BreakpointType({
                                sm: { "id": 134217875, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                md: { "id": 134217983, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                lg: { "id": 134217983, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                            }).getValue(this.currentBreakpoint),
                            bottom: { "id": 134217874, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (!this.isTablet) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(this.songList[this.selectIndex].label);
                                    Image.width(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? { "id": 134217891, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 134217890, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                    Image.borderRadius({ "id": 134217887, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                    Image.margin({
                                        right: { "id": 134217889, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                                    });
                                }, Image);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.songList[this.selectIndex].title);
                        Text.fontSize(new BreakpointType({
                            sm: { "id": 134217975, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            md: { "id": 134217972, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            lg: { "id": 134217971, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        }).getValue(this.currentBreakpoint));
                        Text.fontColor(Color.White);
                        Text.fontWeight(PlayerConstants.FONT_WEIGHT_700);
                        Text.fontFamily(PlayerConstants.FONT_FAMILY_BOLD);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.songList[this.selectIndex].singer);
                        Text.fontSize(new BreakpointType({
                            sm: { "id": 134217950, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            md: { "id": 134217949, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            lg: { "id": 134217948, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        }).getValue(this.currentBreakpoint));
                        Text.fontColor(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 134217816, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 125829243, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        Text.fontWeight(PlayerConstants.FONT_WEIGHT_500);
                        Text.fontFamily(PlayerConstants.FONT_FAMILY_MEDIUM);
                        Text.margin({
                            top: { "id": 134217951, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.layoutWeight(1);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridRow.create({
                            columns: { lg: BreakpointConstants.COLUMN_LYRIC_LG }
                        });
                    }, GridRow);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        GridCol.create({
                            span: { lg: BreakpointConstants.SPAN_LYRIC_LG },
                            offset: BreakpointConstants.OFFSET_MD
                        });
                    }, GridCol);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width(StyleConstants.FULL_WIDTH);
                        Row.justifyContent(FlexAlign.Start);
                        Row.margin({
                            top: new BreakpointType({
                                sm: { "id": 134217875, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                md: { "id": 134217983, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                lg: { "id": 134217983, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                            }).getValue(this.currentBreakpoint),
                            bottom: { "id": 134217874, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.songList[this.selectIndex].title);
                        Text.fontSize(new BreakpointType({
                            sm: { "id": 134217975, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            md: { "id": 134217972, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            lg: { "id": 134217971, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        }).getValue(this.currentBreakpoint));
                        Text.fontColor(Color.White);
                        Text.fontWeight(PlayerConstants.FONT_WEIGHT_700);
                        Text.fontFamily(PlayerConstants.FONT_FAMILY_BOLD);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.songList[this.selectIndex].singer);
                        Text.fontSize(new BreakpointType({
                            sm: { "id": 134217950, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            md: { "id": 134217949, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            lg: { "id": 134217948, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        }).getValue(this.currentBreakpoint));
                        Text.fontColor({ "id": 125829243, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        Text.fontFamily(PlayerConstants.FONT_FAMILY_MEDIUM);
                        Text.margin({
                            top: { "id": 134217951, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Text);
                    Text.pop();
                    Column.pop();
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LrcView(this, {
                                    lyricMilliSecondsTime: this.time,
                                    mLrcEntryList: this.mLrcEntryList,
                                    lyricScrollEffect: this.lyricScrollEffect,
                                    lyricTopPosition: 1
                                }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/LyricsComponent.ets", line: 170, col: 17 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        lyricMilliSecondsTime: this.time,
                                        mLrcEntryList: this.mLrcEntryList,
                                        lyricScrollEffect: this.lyricScrollEffect,
                                        lyricTopPosition: 1
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    lyricMilliSecondsTime: this.time,
                                    mLrcEntryList: this.mLrcEntryList,
                                    lyricScrollEffect: this.lyricScrollEffect
                                });
                            }
                        }, { name: "LrcView" });
                    }
                    __Common__.pop();
                    Column.pop();
                    GridCol.pop();
                    GridRow.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.layoutWeight(1);
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new LrcView(this, {
                                    lyricMilliSecondsTime: this.time,
                                    mLrcEntryList: this.mLrcEntryList,
                                    lyricScrollEffect: this.lyricScrollEffect,
                                    lyricTopPosition: 1
                                }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/LyricsComponent.ets", line: 183, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        lyricMilliSecondsTime: this.time,
                                        mLrcEntryList: this.mLrcEntryList,
                                        lyricScrollEffect: this.lyricScrollEffect,
                                        lyricTopPosition: 1
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    lyricMilliSecondsTime: this.time,
                                    mLrcEntryList: this.mLrcEntryList,
                                    lyricScrollEffect: this.lyricScrollEffect
                                });
                            }
                        }, { name: "LrcView" });
                    }
                    __Common__.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.height({ "id": 134217839, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.justifyContent(FlexAlign.End);
            Row.margin({
                top: { "id": 134217915, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                bottom: new BreakpointType({
                    sm: { "id": 134217911, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 134217910, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 134217909, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 134217914, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    md: { "id": 134217913, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                    lg: { "id": 134217912, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                }).getValue(this.currentBreakpoint)
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isTablet) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 134218030, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        Image.width({ "id": 134217895, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        Image.height({ "id": 134217895, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        Image.objectFit(ImageFit.Contain);
                        Image.margin({
                            right: { "id": 134217896, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 134218016, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 134218015, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(new BreakpointType({
                sm: { "id": 134217918, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217917, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217916, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Image.aspectRatio(1);
            Image.opacity(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? 1 : 0.86);
        }, Image);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isShowControl) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({
                            top: { "id": 134217843, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                            bottom: { "id": 134217921, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                        });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ControlAreaComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/LyricsComponent.ets", line: 230, col: 9 });
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
                    __Common__.pop();
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

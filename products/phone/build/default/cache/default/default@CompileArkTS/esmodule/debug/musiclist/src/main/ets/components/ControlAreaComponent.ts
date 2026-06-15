if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ControlAreaComponent_Params {
    currentBreakpoint?: string;
    isPlay?: boolean;
    currentTime?: string;
    totalTime?: string;
    value?: number;
    max?: number;
    playModeIndex?: number;
    imageColor?: string;
    pageShowTime?: number;
    songList?: SongItem[];
    selectIndex?: number;
}
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { BreakpointType, MediaService } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import { PlayerConstants } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/constants/PlayerConstants";
import { AirDropButton } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
import type { MusicInfo } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
export class ControlAreaComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__isPlay = this.createStorageLink('isPlay', false, "isPlay");
        this.__currentTime = this.createStorageLink('currentTime', '00:00', "currentTime");
        this.__totalTime = this.createStorageLink('totalTime', '00:00', "totalTime");
        this.__value = this.createStorageLink('progress', 0, "value");
        this.__max = this.createStorageLink('progressMax', 0, "max");
        this.__playModeIndex = new ObservedPropertySimplePU(0, this, "playModeIndex");
        this.__imageColor = this.createStorageLink('imageColor', '', "imageColor");
        this.__pageShowTime = this.createStorageLink('pageShowTime', 0, "pageShowTime");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__selectIndex = this.createStorageProp('selectIndex', 0, "selectIndex");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ControlAreaComponent_Params) {
        if (params.playModeIndex !== undefined) {
            this.playModeIndex = params.playModeIndex;
        }
    }
    updateStateVars(params: ControlAreaComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTime.purgeDependencyOnElmtId(rmElmtId);
        this.__totalTime.purgeDependencyOnElmtId(rmElmtId);
        this.__value.purgeDependencyOnElmtId(rmElmtId);
        this.__max.purgeDependencyOnElmtId(rmElmtId);
        this.__playModeIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__imageColor.purgeDependencyOnElmtId(rmElmtId);
        this.__pageShowTime.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__currentTime.aboutToBeDeleted();
        this.__totalTime.aboutToBeDeleted();
        this.__value.aboutToBeDeleted();
        this.__max.aboutToBeDeleted();
        this.__playModeIndex.aboutToBeDeleted();
        this.__imageColor.aboutToBeDeleted();
        this.__pageShowTime.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
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
    private __isPlay: ObservedPropertyAbstractPU<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __currentTime: ObservedPropertyAbstractPU<string>;
    get currentTime() {
        return this.__currentTime.get();
    }
    set currentTime(newValue: string) {
        this.__currentTime.set(newValue);
    }
    private __totalTime: ObservedPropertyAbstractPU<string>;
    get totalTime() {
        return this.__totalTime.get();
    }
    set totalTime(newValue: string) {
        this.__totalTime.set(newValue);
    }
    private __value: ObservedPropertyAbstractPU<number>;
    get value() {
        return this.__value.get();
    }
    set value(newValue: number) {
        this.__value.set(newValue);
    }
    private __max: ObservedPropertyAbstractPU<number>;
    get max() {
        return this.__max.get();
    }
    set max(newValue: number) {
        this.__max.set(newValue);
    }
    private __playModeIndex: ObservedPropertySimplePU<number>;
    get playModeIndex() {
        return this.__playModeIndex.get();
    }
    set playModeIndex(newValue: number) {
        this.__playModeIndex.set(newValue);
    }
    private __imageColor: ObservedPropertyAbstractPU<string>;
    get imageColor() {
        return this.__imageColor.get();
    }
    set imageColor(newValue: string) {
        this.__imageColor.set(newValue);
    }
    private __pageShowTime: ObservedPropertyAbstractPU<number>;
    get pageShowTime() {
        return this.__pageShowTime.get();
    }
    set pageShowTime(newValue: number) {
        this.__pageShowTime.set(newValue);
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995344, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995351, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995350, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Image.onClick(() => {
                this.getUIContext().getPromptAction().showToast({
                    message: '评论功能',
                    duration: 2000
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995330, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Image.onClick(() => {
                this.getUIContext().getPromptAction().showToast({
                    message: '下载功能',
                    duration: 2000
                });
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            __Common__.height(new BreakpointType({
                sm: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995305, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995168, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 投送按钮
                    AirDropButton(this, {
                        musicInfo: this.getCurrentMusicInfo()
                    }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/ControlAreaComponent.ets", line: 81, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            musicInfo: this.getCurrentMusicInfo()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        musicInfo: this.getCurrentMusicInfo()
                    });
                }
            }, { name: "AirDropButton" });
        }
        __Common__.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({
                top: { "id": 150995291, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 150995287, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995286, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Slider.create({ min: 0, max: this.max, step: 1, value: this.value });
            Slider.blockColor({ "id": 150995143, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Slider.selectedColor({ "id": 150995144, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Slider.trackColor({ "id": 150995145, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Slider.blockSize({
                width: { "id": 150995283, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                height: { "id": 150995283, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
            Slider.onChange((value: number, mode: SliderChangeMode) => {
                if (mode === SliderChangeMode.End || mode === SliderChangeMode.Begin) {
                    MediaService.getInstance().seek(value);
                }
                this.pageShowTime = 0;
            });
            Slider.height({ "id": 150995285, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Slider.margin({
                left: new BreakpointType({
                    sm: { "id": 150995290, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995289, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995288, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint),
                right: new BreakpointType({
                    sm: { "id": 150995290, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    md: { "id": 150995289, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                    lg: { "id": 150995288, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
                }).getValue(this.currentBreakpoint)
            });
            Slider.hitTestBehavior(HitTestMode.Block);
        }, Slider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.currentTime);
            Text.fontColor({ "id": 150995137, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize({ "id": 150995281, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontFamily(PlayerConstants.FONT_FAMILY_BLACK);
            Text.lineHeight('14vp');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.totalTime);
            Text.fontColor({ "id": 150995137, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontSize({ "id": 150995281, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontFamily(PlayerConstants.FONT_FAMILY_BLACK);
            Text.lineHeight('14vp');
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width(StyleConstants.FULL_WIDTH);
            Row.justifyContent(FlexAlign.SpaceBetween);
            Row.padding({
                left: { "id": 150995170, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: { "id": 150995170, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995342, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 150995172, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995171, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.onClick(() => {
                MediaService.getInstance().playPrevious();
                this.pageShowTime = 0;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.isPlay ? { "id": 150995348, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995347, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(new BreakpointType({
                sm: { "id": 150995198, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                md: { "id": 150995198, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                lg: { "id": 150995199, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" }
            }).getValue(this.currentBreakpoint));
            Image.onClick(() => {
                if (this.isPlay) {
                    MediaService.getInstance().pause();
                }
                else {
                    if (MediaService.getInstance().getFirst()) {
                        MediaService.getInstance().loadAssent(0);
                    }
                    else {
                        MediaService.getInstance().play();
                    }
                }
                this.pageShowTime = 0;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995346, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            __Image__controlImageBuilder();
            Image.width(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ? { "id": 150995172, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995171, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.onClick(() => {
                MediaService.getInstance().playNextAuto(true);
                this.pageShowTime = 0;
            });
        }, Image);
        Row.pop();
        Column.pop();
    }
    /**
     * 获取当前音乐信息用于投送
     */
    private getCurrentMusicInfo(): MusicInfo | null {
        if (this.songList.length === 0 || this.selectIndex >= this.songList.length) {
            return null;
        }
        const song = this.songList[this.selectIndex];
        return {
            songId: song.title,
            title: song.title,
            singer: song.singer,
            coverUrl: '',
            playProgress: this.value,
            duration: this.max
        };
    }
    rerender() {
        this.updateDirtyElements();
    }
}
function __Image__controlImageBuilder(): void {
    Image.aspectRatio(1);
    Image.opacity(0.86);
    Image.objectFit(ImageFit.Contain);
}

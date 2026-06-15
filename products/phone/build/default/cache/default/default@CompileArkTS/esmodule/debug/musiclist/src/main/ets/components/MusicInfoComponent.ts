if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface MusicInfoComponent_Params {
    currentTabIndex?: number;
    currentBreakpoint?: string;
    isFoldFull?: boolean;
    songList?: SongItem[];
    selectIndex?: number;
    isShowControl?: boolean;
    isShowAirDrop?: boolean;
}
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import type { SongItem } from 'mediacommon';
import { PlayerConstants } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/constants/PlayerConstants";
import { ControlAreaComponent } from "@bundle:com.huawei.music.musichome/phone@musiclist/ets/components/ControlAreaComponent";
import { AirDropPanel } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
import type { MusicInfo } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
export class MusicInfoComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentTabIndex = new ObservedPropertySimplePU(0, this, "currentTabIndex");
        this.__currentBreakpoint = this.createStorageProp('currentBreakpoint', BreakpointConstants.BREAKPOINT_SM, "currentBreakpoint");
        this.__isFoldFull = this.createStorageLink('isFoldFull', false, "isFoldFull");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__selectIndex = this.createStorageProp('selectIndex', 0, "selectIndex");
        this.__isShowControl = new ObservedPropertySimplePU(false, this, "isShowControl");
        this.__isShowAirDrop = new ObservedPropertySimplePU(false, this, "isShowAirDrop");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: MusicInfoComponent_Params) {
        if (params.currentTabIndex !== undefined) {
            this.currentTabIndex = params.currentTabIndex;
        }
        if (params.isShowControl !== undefined) {
            this.isShowControl = params.isShowControl;
        }
        if (params.isShowAirDrop !== undefined) {
            this.isShowAirDrop = params.isShowAirDrop;
        }
    }
    updateStateVars(params: MusicInfoComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentTabIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__isFoldFull.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowControl.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowAirDrop.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentTabIndex.aboutToBeDeleted();
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__isFoldFull.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__isShowControl.aboutToBeDeleted();
        this.__isShowAirDrop.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentTabIndex: ObservedPropertySimplePU<number>;
    get currentTabIndex() {
        return this.__currentTabIndex.get();
    }
    set currentTabIndex(newValue: number) {
        this.__currentTabIndex.set(newValue);
    }
    private __currentBreakpoint: ObservedPropertyAbstractPU<string>;
    get currentBreakpoint() {
        return this.__currentBreakpoint.get();
    }
    set currentBreakpoint(newValue: string) {
        this.__currentBreakpoint.set(newValue);
    }
    private __isFoldFull: ObservedPropertyAbstractPU<boolean>;
    get isFoldFull() {
        return this.__isFoldFull.get();
    }
    set isFoldFull(newValue: boolean) {
        this.__isFoldFull.set(newValue);
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
    private __isShowControl: ObservedPropertySimplePU<boolean>;
    get isShowControl() {
        return this.__isShowControl.get();
    }
    set isShowControl(newValue: boolean) {
        this.__isShowControl.set(newValue);
    }
    private __isShowAirDrop: ObservedPropertySimplePU<boolean>;
    get isShowAirDrop() {
        return this.__isShowAirDrop.get();
    }
    set isShowAirDrop(newValue: boolean) {
        this.__isShowAirDrop.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridRow.create({
                columns: {
                    xs: BreakpointConstants.COLUMN_SM,
                    sm: BreakpointConstants.COLUMN_SM,
                    md: BreakpointConstants.COLUMN_MD
                },
                gutter: BreakpointConstants.GUTTER_MUSIC_X,
                breakpoints: { reference: BreakpointsReference.ComponentSize }
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: {
                    xs: BreakpointConstants.SPAN_SM,
                    sm: BreakpointConstants.SPAN_SM,
                    md: BreakpointConstants.SPAN_MD
                },
                offset: { md: BreakpointConstants.OFFSET_MD }
            });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.height(StyleConstants.FULL_HEIGHT);
            Column.width(StyleConstants.FULL_HEIGHT);
            Column.clip(false);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.justifyContent(FlexAlign.Start);
        }, Column);
        this.CoverInfo.bind(this)();
        this.MusicInfo.bind(this)();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ControlAreaComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicInfoComponent.ets", line: 60, col: 11 });
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
        GridRow.pop();
    }
    CoverInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.aspectRatio(1);
            Row.layoutWeight(1);
            Row.constraintSize({
                maxWidth: '100%'
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.songList[this.selectIndex].label);
            Image.aspectRatio(1);
            Image.borderRadius({ "id": 150995186, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.shadow({
                radius: { "id": 150995273, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                color: { "id": 150995140, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                offsetX: 0,
                offsetY: 8
            });
            Image.margin({ "id": 150995240, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
        }, Image);
        Row.pop();
    }
    MusicInfo(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.margin({ top: { "id": 150995249, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Column.bindSheet({ value: this.isShowAirDrop, changeEvent: newValue => { this.isShowAirDrop = newValue; } }, { builder: () => {
                    this.airDropSheetBuilder.call(this);
                } }, {
                height: '60%',
                backgroundColor: Color.White,
                dragBar: true
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 添加AirDrop多设备传输按钮
            Row.create();
            // 添加AirDrop多设备传输按钮
            Row.width('100%');
            // 添加AirDrop多设备传输按钮
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ type: ButtonType.Circle });
            Button.width(40);
            Button.height(40);
            Button.backgroundColor('rgba(255, 255, 255, 0.2)');
            Button.onClick(() => {
                this.isShowAirDrop = true;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(20);
            Image.height(20);
            Image.fillColor(Color.White);
        }, Image);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('多设备传输');
            Text.fontSize(12);
            Text.fontColor(Color.White);
            Text.opacity(0.86);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 添加AirDrop多设备传输按钮
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 原有的标题和歌手信息
            Flex.create({ justifyContent: FlexAlign.SpaceBetween, alignItems: ItemAlign.Center });
        }, Flex);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.songList[this.selectIndex].title);
            Text.fontSize(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_MD && !this.isFoldFull ? { "id": 150995300, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995299, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontColor(Color.White);
            Text.opacity(0.86);
            Text.fontWeight(FontWeight.Bold);
            Text.fontFamily(PlayerConstants.FONT_FAMILY_BOLD);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995343, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width({ "id": 150995220, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.height({ "id": 150995220, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.objectFit(ImageFit.Contain);
            Image.fillColor(Color.White);
            Image.opacity(0.86);
        }, Image);
        // 原有的标题和歌手信息
        Flex.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.songList[this.selectIndex].singer);
            Text.textAlign(TextAlign.Start);
            Text.fontSize(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_MD && !this.isFoldFull ? { "id": 150995299, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995190, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontColor({ "id": 150995137, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Text.fontFamily(PlayerConstants.FONT_FAMILY_BLACK);
            Text.margin({ top: { "id": 150995250, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } });
            Text.width(StyleConstants.FULL_WIDTH);
            Text.fontWeight(FontWeight.Regular);
        }, Text);
        Text.pop();
        Column.pop();
    }
    airDropSheetBuilder(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AirDropPanel(this, {
                        isShow: this.__isShowAirDrop,
                        musicInfo: {
                            songId: this.songList[this.selectIndex].id.toString(),
                            title: this.songList[this.selectIndex].title,
                            singer: this.songList[this.selectIndex].singer,
                            coverUrl: this.songList[this.selectIndex].src,
                            playProgress: 0,
                            duration: 0,
                            localFilePath: ''
                        } as MusicInfo
                    }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/MusicInfoComponent.ets", line: 154, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isShow: this.isShowAirDrop,
                            musicInfo: {
                                songId: this.songList[this.selectIndex].id.toString(),
                                title: this.songList[this.selectIndex].title,
                                singer: this.songList[this.selectIndex].singer,
                                coverUrl: this.songList[this.selectIndex].src,
                                playProgress: 0,
                                duration: 0,
                                localFilePath: ''
                            } as MusicInfo
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        musicInfo: {
                            songId: this.songList[this.selectIndex].id.toString(),
                            title: this.songList[this.selectIndex].title,
                            singer: this.songList[this.selectIndex].singer,
                            coverUrl: this.songList[this.selectIndex].src,
                            playProgress: 0,
                            duration: 0,
                            localFilePath: ''
                        } as MusicInfo
                    });
                }
            }, { name: "AirDropPanel" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

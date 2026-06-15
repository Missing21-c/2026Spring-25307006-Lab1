if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PlayList_Params {
    currentBreakpoint?: string;
    songList?: SongItem[];
    isShowPlay?: boolean;
    bottomRectHeight?: number;
}
import { BreakpointConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/watch@constantscommon/index";
import { MediaService, BreakpointType } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { SongDataSource } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/viewmodel/SongDataSource";
import { ContentConstants } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/constants/ContentConstants";
import { LocalFileListComponent } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/LocalFileListComponent";
export class PlayList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__currentBreakpoint = new SynchedPropertySimpleTwoWayPU(params.currentBreakpoint, this, "currentBreakpoint");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__isShowPlay = this.createStorageLink('isShowPlay', false, "isShowPlay");
        this.__bottomRectHeight = this.createStorageLink('bottomRectHeight', 0, "bottomRectHeight");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PlayList_Params) {
    }
    updateStateVars(params: PlayList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__currentBreakpoint.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__bottomRectHeight.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__currentBreakpoint.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        this.__isShowPlay.aboutToBeDeleted();
        this.__bottomRectHeight.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __currentBreakpoint: SynchedPropertySimpleTwoWayPU<string>;
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
    private __isShowPlay: ObservedPropertyAbstractPU<boolean>;
    get isShowPlay() {
        return this.__isShowPlay.get();
    }
    set isShowPlay(newValue: boolean) {
        this.__isShowPlay.set(newValue);
    }
    private __bottomRectHeight: ObservedPropertyAbstractPU<number>;
    get bottomRectHeight() {
        return this.__bottomRectHeight.get();
    }
    set bottomRectHeight(newValue: number) {
        this.__bottomRectHeight.set(newValue);
    }
    PlayAll(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height({ "id": 184549582, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.width(StyleConstants.FULL_WIDTH);
            Row.backgroundColor(Color.White);
            Row.padding({
                left: { "id": 184549583, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                right: { "id": 184549583, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
            Row.borderRadius({
                topRight: { "id": 184549584, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                topLeft: { "id": 184549584, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
            Row.position({
                x: 0,
                y: 0
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549674, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549585, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 184549585, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 184549447, "type": 10003, params: [this.songList.length], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.maxLines(ContentConstants.PLAY_ALL_MAX_LINES);
            Text.padding({ left: { "id": 184549586, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            Text.fontColor(Color.Black);
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549589, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549588, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549587, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549670, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ right: { "id": 184549580, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549688, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, Image);
        Row.pop();
    }
    SongItem(item: SongItem, index: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.onClick(() => {
                MediaService.getInstance().loadAssent(index);
                this.isShowPlay = true;
            });
            Row.height({ "id": 184549551, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.width(StyleConstants.FULL_WIDTH);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.title);
            Text.fontColor(Color.Black);
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549534, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549533, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549532, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Text.margin({ bottom: { "id": 184549555, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.mark);
            Image.width({ "id": 184549553, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549553, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ right: { "id": 184549552, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.singer);
            Text.opacity({ "id": 184549600, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontColor(Color.Black);
            Text.fontSize(new BreakpointType({
                sm: { "id": 184549603, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 184549602, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 184549601, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549661, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 184549581, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : { "id": 184549547, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                bottom: 48 + this.getUIContext().px2vp(this.bottomRectHeight)
            });
        }, Column);
        this.PlayAll.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(StyleConstants.FULL_WIDTH);
            List.backgroundColor(Color.White);
            List.margin({ top: { "id": 184549545, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            List.lanes(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
                ContentConstants.COL_TWO : ContentConstants.COL_ONE);
            List.layoutWeight(1);
            List.cachedCount(2);
            List.divider({
                color: { "id": 184549455, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                strokeWidth: { "id": 184549556, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                startMargin: { "id": 184549554, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                endMargin: { "id": 184549554, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
        }, List);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.padding({
                                left: { "id": 184549554, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                right: { "id": 184549554, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
                            });
                        }, Column);
                        this.SongItem.bind(this)(item, index);
                        Column.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: SongItem, index?: number) => (item).toString() + index;
            LazyForEach.create("1", this, new SongDataSource(this.songList), __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.margin({ top: 16 });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 本地文件列表组件
                    LocalFileListComponent(this, {}, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/PlayList.ets", line: 146, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LocalFileListComponent" });
        }
        __Common__.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

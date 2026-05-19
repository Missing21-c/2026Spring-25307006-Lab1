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
            Row.height({ "id": 134217934, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Row.width(StyleConstants.FULL_WIDTH);
            Row.backgroundColor(Color.White);
            Row.padding({
                left: { "id": 134217935, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                right: { "id": 134217935, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
            Row.borderRadius({
                topRight: { "id": 134217936, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                topLeft: { "id": 134217936, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            });
            Row.position({
                x: 0,
                y: 0
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218026, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217937, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217937, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 134217799, "type": 10003, params: [this.songList.length], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.maxLines(ContentConstants.PLAY_ALL_MAX_LINES);
            Text.padding({ left: { "id": 134217938, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            Text.fontColor(Color.Black);
            Text.fontSize(new BreakpointType({
                sm: { "id": 134217941, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217940, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217939, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218022, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ right: { "id": 134217932, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 134218040, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
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
            Row.height({ "id": 134217903, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
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
                sm: { "id": 134217886, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217885, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217884, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
            }).getValue(this.currentBreakpoint));
            Text.margin({ bottom: { "id": 134217907, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(item.mark);
            Image.width({ "id": 134217905, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217905, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.margin({ right: { "id": 134217904, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(item.singer);
            Text.opacity({ "id": 134217952, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Text.fontColor(Color.Black);
            Text.fontSize(new BreakpointType({
                sm: { "id": 134217955, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                md: { "id": 134217954, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                lg: { "id": 134217953, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
            Image.create({ "id": 134218013, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 134217933, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
        }, Image);
        Row.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                top: this.currentBreakpoint === BreakpointConstants.BREAKPOINT_SM ? 0 : { "id": 134217899, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                bottom: 48 + this.getUIContext().px2vp(this.bottomRectHeight)
            });
        }, Column);
        this.PlayAll.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width(StyleConstants.FULL_WIDTH);
            List.backgroundColor(Color.White);
            List.margin({ top: { "id": 134217897, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
            List.lanes(this.currentBreakpoint === BreakpointConstants.BREAKPOINT_LG ?
                ContentConstants.COL_TWO : ContentConstants.COL_ONE);
            List.layoutWeight(1);
            List.cachedCount(2);
            List.divider({
                color: { "id": 134217807, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                strokeWidth: { "id": 134217908, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                startMargin: { "id": 134217906, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                endMargin: { "id": 134217906, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
                                left: { "id": 134217906, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                                right: { "id": 134217906, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }
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
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SongList_Params {
    HOME_BTN_WIDTH?: string;
    pageStack?: NavPathStack;
    songList?: SongItem[];
}
import { LengthMetrics } from "@ohos:arkui.node";
import { ArcList } from "@ohos:arkui.ArcList";
import { ArcListItem } from "@ohos:arkui.ArcList";
import type { ArcListAttribute } from "@ohos:arkui.ArcList";
import type { // The properties of ArcList depend on ArcListAttribute and ArcListItemAttribute objects for import.
ArcListItemAttribute } from "@ohos:arkui.ArcList";
import { MediaService } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { StyleConstants } from "@bundle:com.huawei.music.musichome/watch/ets/constants/StyleConstants";
export function SongListBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SongList(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/view/SongList.ets", line: 28, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SongList" });
    }
}
class SongList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.HOME_BTN_WIDTH = '90%';
        this.__pageStack = this.initializeConsume("pageStack", "pageStack");
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SongList_Params) {
        if (params.HOME_BTN_WIDTH !== undefined) {
            this.HOME_BTN_WIDTH = params.HOME_BTN_WIDTH;
        }
    }
    updateStateVars(params: SongList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__songList.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    readonly HOME_BTN_WIDTH: string;
    private __pageStack: ObservedPropertyAbstractPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private __songList: ObservedPropertyAbstractPU<SongItem[]>;
    get songList() {
        return this.__songList.get();
    }
    set songList(newValue: SongItem[]) {
        this.__songList.set(newValue);
    }
    aboutToAppear(): void {
        MediaService.getInstance();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [Start song_list]
                    Column.create();
                    // [Start song_list]
                    Column.align(Alignment.Center);
                    // [Start song_list]
                    Column.width(StyleConstants.FULL_WIDTH);
                    // [Start song_list]
                    Column.height(StyleConstants.FULL_HEIGHT);
                    // [Start song_list]
                    Column.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ArcList.create({ initialIndex: 0 });
                    ArcList.scrollBar(BarState.Off);
                    ArcList.space(LengthMetrics.vp(5));
                    ArcList.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                    ArcList.focusable(true);
                    ArcList.focusOnTouch(true);
                    ArcList.defaultFocus(true);
                }, ArcList);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index: number) => {
                        const item = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                ArcListItem.create(() => { }, false);
                                ArcListItem.align(Alignment.Center);
                                ArcListItem.onClick(async () => {
                                    await MediaService.getInstance().loadAssent(index);
                                    this.pageStack.replacePathByName('songPage', null);
                                });
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, ArcListItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width(this.HOME_BTN_WIDTH);
                                    Row.height({ "id": 134217751, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                    Row.padding({ left: { "id": 134217757, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, right: { "id": 134217757, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
                                    Row.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                                    Row.focusable(true);
                                    Row.focusOnTouch(true);
                                    Row.backgroundColor({ "id": 134217744, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(item.label);
                                    Image.width({ "id": 134217756, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                    Image.height({ "id": 134217756, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                    Image.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                                }, Image);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Column.create();
                                    Column.layoutWeight(1);
                                }, Column);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.title);
                                    Text.fontWeight(FontWeight.Bold);
                                    Text.fontColor({ "id": 134217743, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                }, Text);
                                Text.pop();
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.singer);
                                    Text.fontColor({ "id": 134217750, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                                }, Text);
                                Text.pop();
                                Column.pop();
                                Row.pop();
                                ArcListItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.songList, forEachItemGenFunction, (item: SongItem, index: number) => JSON.stringify(item) + index, true, true);
                }, ForEach);
                ForEach.pop();
                ArcList.pop();
                // [Start song_list]
                Column.pop();
            }, { moduleName: "watch", pagePath: "products/watch/src/main/ets/view/SongList" });
            NavDestination.hideTitleBar(true);
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("songList", wrapBuilder(SongListBuilder));
    }
})();

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Home_Params {
    pageStack?: NavPathStack;
    HOME_BTN_WIDTH?: string;
    menuList?: Menu[];
}
import { LengthMetrics } from "@ohos:arkui.node";
import { ArcList } from "@ohos:arkui.ArcList";
import { ArcListItem } from "@ohos:arkui.ArcList";
import type { ArcListAttribute // The properties of ArcList depend on the ArcListAttribute object for import.
 } from "@ohos:arkui.ArcList";
import { StyleConstants } from "@bundle:com.huawei.music.musichome/watch/ets/constants/StyleConstants";
class Menu {
    icon: Resource;
    text: Resource;
    pathName: string;
    constructor(icon: Resource, text: Resource, pathName: string) {
        this.icon = icon;
        this.text = text;
        this.pathName = pathName;
    }
}
export class Home extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = this.initializeConsume("pageStack", "pageStack");
        this.HOME_BTN_WIDTH = '90%';
        this.menuList = [
            new Menu({ "id": 184549422, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 184549382, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, 'playList'),
            new Menu({ "id": 184549424, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 184549384, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, 'songList'),
            new Menu({ "id": 184549423, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 184549383, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, 'songPage'),
            new Menu({ "id": 184549433, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 184549385, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, 'setting')
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Home_Params) {
        if (params.HOME_BTN_WIDTH !== undefined) {
            this.HOME_BTN_WIDTH = params.HOME_BTN_WIDTH;
        }
        if (params.menuList !== undefined) {
            this.menuList = params.menuList;
        }
    }
    updateStateVars(params: Home_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: ObservedPropertyAbstractPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    readonly HOME_BTN_WIDTH: string;
    private menuList: Menu[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start home_list]
            Column.create();
            // [Start home_list]
            Column.align(Alignment.Center);
            // [Start home_list]
            Column.width(StyleConstants.FULL_WIDTH);
            // [Start home_list]
            Column.height(StyleConstants.FULL_HEIGHT);
            // [Start home_list]
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
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ArcListItem.create(() => { }, false);
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ArcListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.width(this.HOME_BTN_WIDTH);
                            Row.height({ "id": 184549399, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Row.padding({ left: { "id": 184549405, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, right: { "id": 184549405, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
                            Row.justifyContent(FlexAlign.SpaceBetween);
                            Row.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                            Row.backgroundColor({ "id": 184549392, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Row.onClick(() => {
                                if (item.pathName === 'setting') {
                                    return;
                                }
                                this.pageStack.replacePathByName(item.pathName, null);
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create(item.icon);
                            Image.width({ "id": 184549404, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.height({ "id": 184549404, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                            Image.backgroundColor({ "id": 184549393, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.padding({ "id": 184549403, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.text);
                            Text.fontColor({ "id": 184549391, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Text.fontSize({ "id": 184549401, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 184549419, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.width({ "id": 184549402, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        }, Image);
                        Row.pop();
                        ArcListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.menuList, forEachItemGenFunction, (item: Menu, index: number) => JSON.stringify(item) + index, false, true);
        }, ForEach);
        ForEach.pop();
        ArcList.pop();
        // [Start home_list]
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

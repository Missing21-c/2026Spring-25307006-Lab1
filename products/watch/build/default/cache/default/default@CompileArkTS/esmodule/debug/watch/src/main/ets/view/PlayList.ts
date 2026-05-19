if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface PlayList_Params {
    pageStack?: NavPathStack;
    itemSimpleColor?: Color | number | string;
    selectedItemSimpleColor?: Color | number | string;
    innerSelectedIndex?: number;
    wearableSwiperController?: ArcSwiperController;
    playList?: PlayListSheet[];
}
import { ArcSwiper } from "@ohos:arkui.ArcSwiper";
import type { ArcSwiperAttribute } from "@ohos:arkui.ArcSwiper";
import { // The properties of ArcSwiper depend on the ArcSwiperAttribute object for import.
ArcSwiperController } from "@ohos:arkui.ArcSwiper";
import { StyleConstants } from "@bundle:com.huawei.music.musichome/watch/ets/constants/StyleConstants";
export function PlayListBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new PlayList(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/view/PlayList.ets", line: 25, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "PlayList" });
    }
}
class PlayListSheet {
    name: Resource;
    background: Resource;
    title: Resource;
    constructor(name: Resource, background: Resource, title: Resource) {
        this.name = name;
        this.background = background;
        this.title = title;
    }
}
export class PlayList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = this.initializeConsume("pageStack", "pageStack");
        this.__itemSimpleColor = new ObservedPropertySimplePU('', this, "itemSimpleColor");
        this.__selectedItemSimpleColor = new ObservedPropertySimplePU('', this, "selectedItemSimpleColor");
        this.innerSelectedIndex = 0;
        this.wearableSwiperController = new ArcSwiperController();
        this.playList = [
            new PlayListSheet({ "id": 134217739, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 134217781, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 134217741, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }),
            new PlayListSheet({ "id": 134217740, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 134217782, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, { "id": 134217742, "type": 10003, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" })
        ];
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: PlayList_Params) {
        if (params.itemSimpleColor !== undefined) {
            this.itemSimpleColor = params.itemSimpleColor;
        }
        if (params.selectedItemSimpleColor !== undefined) {
            this.selectedItemSimpleColor = params.selectedItemSimpleColor;
        }
        if (params.innerSelectedIndex !== undefined) {
            this.innerSelectedIndex = params.innerSelectedIndex;
        }
        if (params.wearableSwiperController !== undefined) {
            this.wearableSwiperController = params.wearableSwiperController;
        }
        if (params.playList !== undefined) {
            this.playList = params.playList;
        }
    }
    updateStateVars(params: PlayList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
        this.__itemSimpleColor.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedItemSimpleColor.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        this.__itemSimpleColor.aboutToBeDeleted();
        this.__selectedItemSimpleColor.aboutToBeDeleted();
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
    private __itemSimpleColor: ObservedPropertySimplePU<Color | number | string>;
    get itemSimpleColor() {
        return this.__itemSimpleColor.get();
    }
    set itemSimpleColor(newValue: Color | number | string) {
        this.__itemSimpleColor.set(newValue);
    }
    private __selectedItemSimpleColor: ObservedPropertySimplePU<Color | number | string>;
    get selectedItemSimpleColor() {
        return this.__selectedItemSimpleColor.get();
    }
    set selectedItemSimpleColor(newValue: Color | number | string) {
        this.__selectedItemSimpleColor.set(newValue);
    }
    private innerSelectedIndex: number;
    private wearableSwiperController: ArcSwiperController;
    private playList: PlayListSheet[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [Start play_list]
                    Column.create();
                    // [Start play_list]
                    Column.width(StyleConstants.FULL_WIDTH);
                    // [Start play_list]
                    Column.height(StyleConstants.FULL_HEIGHT);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ArcSwiper.create(this.wearableSwiperController);
                    ArcSwiper.index(0);
                    ArcSwiper.duration(400);
                    ArcSwiper.focusable(true);
                    ArcSwiper.focusOnTouch(true);
                    ArcSwiper.defaultFocus(true);
                    ArcSwiper.vertical(true);
                    ArcSwiper.indicator(false);
                    ArcSwiper.disableSwipe(false);
                    ArcSwiper.digitalCrownSensitivity(CrownSensitivity.MEDIUM);
                    ArcSwiper.disableTransitionAnimation(false);
                    ArcSwiper.onAnimationStart((index: number, targetIndex: number) => {
                        this.innerSelectedIndex = targetIndex;
                    });
                    ArcSwiper.onGestureRecognizerJudgeBegin((event: BaseGestureEvent, current: GestureRecognizer): GestureJudgeResult => {
                        if (current) {
                            let target = current.getEventTargetInfo();
                            if (target && current.isBuiltIn() && current.getType() == GestureControl.GestureType.PAN_GESTURE) {
                                // Here, the condition `swiperTarget.isBegin()` or `innerSelectedIndex === 0` indicates that the ArcSwiper has been swiped to the beginning.
                                let swiperTarget = target as ScrollableTargetInfo;
                                if (swiperTarget instanceof ScrollableTargetInfo &&
                                    (swiperTarget.isBegin() || this.innerSelectedIndex === 0)) {
                                    let panEvent = event as PanGestureEvent;
                                    if (panEvent && panEvent.offsetX > 0 && (swiperTarget.isBegin() || this.innerSelectedIndex === 0)) {
                                        return GestureJudgeResult.REJECT;
                                    }
                                }
                            }
                        }
                        return GestureJudgeResult.CONTINUE;
                    });
                }, ArcSwiper);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create({ space: 10 });
                            Column.width(StyleConstants.FULL_WIDTH);
                            Column.height(StyleConstants.FULL_HEIGHT);
                            Column.backgroundImage(item.background, ImageRepeat.NoRepeat);
                            Column.backgroundImageSize({ width: StyleConstants.FULL_WIDTH, height: StyleConstants.FULL_HEIGHT });
                            Column.justifyContent(FlexAlign.SpaceBetween);
                            Column.padding({ top: { "id": 134217767, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, bottom: { "id": 134217767, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
                            Column.onClick(() => {
                                this.pageStack.replacePathByName('songList', null);
                            });
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.fontWeight(FontWeight.Bold);
                            Text.fontColor({ "id": 134217743, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Text.fontSize({ "id": 134217753, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 134217771, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.width({ "id": 134217754, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.margin({ left: { "id": 134217766, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
                        }, Image);
                        Row.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Image.create({ "id": 134217780, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.width({ "id": 134217763, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.height({ "id": 134217763, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                            Image.position({ x: '25%', y: '65%' });
                        }, Image);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.title);
                        }, Text);
                        Text.pop();
                        Column.pop();
                    };
                    this.forEachUpdateFunction(elmtId, this.playList, forEachItemGenFunction, (item: PlayListSheet, index?: number) => index + JSON.stringify(item), false, true);
                }, ForEach);
                ForEach.pop();
                ArcSwiper.pop();
                // [Start play_list]
                Column.pop();
            }, { moduleName: "watch", pagePath: "products/watch/src/main/ets/view/PlayList" });
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
        NavigationBuilderRegister("playList", wrapBuilder(PlayListBuilder));
    }
})();

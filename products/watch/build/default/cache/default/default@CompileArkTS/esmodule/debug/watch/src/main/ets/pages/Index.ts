if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    pageStack?: NavPathStack;
    innerSelectedIndex?: number;
    wearableSwiperController?: ArcSwiperController;
    arcDotIndicator?: ArcDotIndicator;
}
import { ArcSwiper } from "@ohos:arkui.ArcSwiper";
import type { ArcSwiperAttribute } from "@ohos:arkui.ArcSwiper";
import { // The properties of ArcSwiper depend on the ArcSwiperAttribute object for import.
ArcDotIndicator } from "@ohos:arkui.ArcSwiper";
import { ArcDirection } from "@ohos:arkui.ArcSwiper";
import { ArcSwiperController } from "@ohos:arkui.ArcSwiper";
import { Home } from "@bundle:com.huawei.music.musichome/watch/ets/view/Home";
import { PlayList } from "@bundle:com.huawei.music.musichome/watch/ets/view/PlayList";
import { MediaService } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { songList } from "@bundle:com.huawei.music.musichome/watch@musiclist/Index";
import { StyleConstants } from "@bundle:com.huawei.music.musichome/watch/ets/constants/StyleConstants";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageStack = new ObservedPropertyObjectPU(new NavPathStack(), this, "pageStack");
        this.addProvidedVar("pageStack", this.__pageStack, false);
        this.innerSelectedIndex = 0;
        this.wearableSwiperController = new ArcSwiperController();
        this.arcDotIndicator = new ArcDotIndicator();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.pageStack !== undefined) {
            this.pageStack = params.pageStack;
        }
        if (params.innerSelectedIndex !== undefined) {
            this.innerSelectedIndex = params.innerSelectedIndex;
        }
        if (params.wearableSwiperController !== undefined) {
            this.wearableSwiperController = params.wearableSwiperController;
        }
        if (params.arcDotIndicator !== undefined) {
            this.arcDotIndicator = params.arcDotIndicator;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageStack.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageStack.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageStack: ObservedPropertyObjectPU<NavPathStack>;
    get pageStack() {
        return this.__pageStack.get();
    }
    set pageStack(newValue: NavPathStack) {
        this.__pageStack.set(newValue);
    }
    private innerSelectedIndex: number;
    private wearableSwiperController: ArcSwiperController;
    private arcDotIndicator: ArcDotIndicator;
    aboutToAppear(): void {
        AppStorage.setOrCreate('songList', songList);
        MediaService.getInstance();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageStack, { moduleName: "watch", pagePath: "products/watch/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.hideTitleBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start home_swiper]
            Column.create();
            // [Start home_swiper]
            Column.width(StyleConstants.FULL_WIDTH);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.height(StyleConstants.FULL_HEIGHT);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ArcSwiper.create(this.wearableSwiperController);
            ArcSwiper.duration(400);
            ArcSwiper.indicator(this.arcDotIndicator
                .arcDirection(ArcDirection.SIX_CLOCK_DIRECTION)
                .selectedItemColor('#FE1B48'));
            ArcSwiper.onAnimationStart((index: number, targetIndex: number) => {
                this.innerSelectedIndex = targetIndex;
            });
            ArcSwiper.onGestureRecognizerJudgeBegin((event: BaseGestureEvent, current: GestureRecognizer, others: Array<GestureRecognizer>): GestureJudgeResult => {
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new Home(this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/pages/Index.ets", line: 48, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "Home" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PlayList(this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/pages/Index.ets", line: 49, col: 13 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "PlayList" });
        }
        ArcSwiper.pop();
        Row.pop();
        // [Start home_swiper]
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.music.musichome", moduleName: "watch", pagePath: "pages/Index", pageFullPath: "products/watch/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

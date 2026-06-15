if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface SongPage_Params {
    songList?: SongItem[];
    selectIndex?: number;
    isPlay?: boolean;
    time?: number;
    max?: number;
    isFirstLaunch?: boolean;
    HALF_WIDTH?: string;
}
import { MediaService } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { SongItem } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { StyleConstants } from "@bundle:com.huawei.music.musichome/watch/ets/constants/StyleConstants";
import { VolumeSlider } from "@bundle:com.huawei.music.musichome/watch/ets/view/VolumeSliderComponent";
export function SongPageBuilder(parent = null) {
    {
        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
            if (isInitialRender) {
                let componentCall = new SongPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/view/SongPage.ets", line: 22, col: 3 });
                ViewPU.create(componentCall);
                let paramsLambda = () => {
                    return {};
                };
                componentCall.paramsGenerator_ = paramsLambda;
            }
            else {
                (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
            }
        }, { name: "SongPage" });
    }
}
class SongPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__songList = this.createStorageLink('songList', [], "songList");
        this.__selectIndex = this.createStorageLink('selectIndex', 0, "selectIndex");
        this.__isPlay = this.createStorageLink('isPlay', false, "isPlay");
        this.__time = this.createStorageLink('progress', 0, "time");
        this.__max = this.createStorageLink('progressMax', 0, "max");
        this.__isFirstLaunch = this.createStorageLink('isFirstLaunch', true, "isFirstLaunch");
        this.HALF_WIDTH = '50%';
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: SongPage_Params) {
        if (params.HALF_WIDTH !== undefined) {
            this.HALF_WIDTH = params.HALF_WIDTH;
        }
    }
    updateStateVars(params: SongPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__songList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectIndex.purgeDependencyOnElmtId(rmElmtId);
        this.__isPlay.purgeDependencyOnElmtId(rmElmtId);
        this.__time.purgeDependencyOnElmtId(rmElmtId);
        this.__max.purgeDependencyOnElmtId(rmElmtId);
        this.__isFirstLaunch.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__songList.aboutToBeDeleted();
        this.__selectIndex.aboutToBeDeleted();
        this.__isPlay.aboutToBeDeleted();
        this.__time.aboutToBeDeleted();
        this.__max.aboutToBeDeleted();
        this.__isFirstLaunch.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
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
    private __isPlay: ObservedPropertyAbstractPU<boolean>;
    get isPlay() {
        return this.__isPlay.get();
    }
    set isPlay(newValue: boolean) {
        this.__isPlay.set(newValue);
    }
    private __time: ObservedPropertyAbstractPU<number>;
    get time() {
        return this.__time.get();
    }
    set time(newValue: number) {
        this.__time.set(newValue);
    }
    private __max: ObservedPropertyAbstractPU<number>;
    get max() {
        return this.__max.get();
    }
    set max(newValue: number) {
        this.__max.set(newValue);
    }
    private __isFirstLaunch: ObservedPropertyAbstractPU<boolean>;
    get isFirstLaunch() {
        return this.__isFirstLaunch.get();
    }
    set isFirstLaunch(newValue: boolean) {
        this.__isFirstLaunch.set(newValue);
    }
    readonly HALF_WIDTH: string;
    aboutToAppear(): void {
        if (this.isFirstLaunch) {
            MediaService.getInstance().loadAssent(0, true);
        }
        AppStorage.setOrCreate('isFirstLaunch', false);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [Start song_page]
                    Column.create();
                    // [Start song_page]
                    Column.width(StyleConstants.FULL_WIDTH);
                    // [Start song_page]
                    Column.height(StyleConstants.FULL_HEIGHT);
                    // [Start song_page]
                    Column.padding({ top: { "id": 184549407, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" }, bottom: { "id": 184549407, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } });
                    // [Start song_page]
                    Column.justifyContent(FlexAlign.SpaceAround);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.songList[this.selectIndex].title);
                    Text.fontWeight(FontWeight.Bold);
                    Text.fontColor({ "id": 184549391, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.songList[this.selectIndex].singer);
                    Text.fontColor({ "id": 184549394, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.justifyContent(FlexAlign.SpaceAround);
                    Row.width('85%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        MediaService.getInstance().playPrevious();
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549431, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549410, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // [EndExclude song_page]
                    Stack.create();
                    // [EndExclude song_page]
                    Stack.width(this.HALF_WIDTH);
                    // [EndExclude song_page]
                    Stack.align(Alignment.Center);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.songList[this.selectIndex].label);
                    Image.width({ "id": 184549406, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.height({ "id": 184549406, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.borderRadius(StyleConstants.CIRCLE_BORDER_RADIUS);
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Progress.create({ value: this.time, total: this.max, type: ProgressType.Ring });
                    Progress.width({ "id": 184549409, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Progress.backgroundColor(Color.Transparent);
                    Progress.color({ "id": 184549391, "type": 10001, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Progress);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549427, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549410, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.visibility(this.isPlay === true ? Visibility.None : Visibility.Visible);
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
                    // [EndExclude song_page]
                    Image.create({ "id": 184549426, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    // [EndExclude song_page]
                    Image.width({ "id": 184549410, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    // [EndExclude song_page]
                    Image.visibility(this.isPlay === true ? Visibility.Visible : Visibility.None);
                    // [EndExclude song_page]
                    Image.onClick(() => {
                        MediaService.getInstance().pause();
                    });
                }, Image);
                // [EndExclude song_page]
                Stack.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.onClick(() => {
                        MediaService.getInstance().playNextAuto(true);
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549425, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549410, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                Column.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width('60%');
                    Row.justifyContent(FlexAlign.SpaceAround);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549420, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549408, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549432, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549408, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 184549421, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                    Image.width({ "id": 184549408, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
                }, Image);
                Row.pop();
                // [Start song_page]
                Column.pop();
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new 
                            // [End song_page]
                            VolumeSlider(this, {}, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/view/SongPage.ets", line: 133, col: 7 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "VolumeSlider" });
                }
            }, { moduleName: "watch", pagePath: "products/watch/src/main/ets/view/SongPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.focusable(true);
            NavDestination.focusOnTouch(true);
            NavDestination.defaultFocus(true);
            NavDestination.linearGradient({
                direction: GradientDirection.Bottom,
                colors: [
                    ['#5E4C4B', 1.0],
                    ['#695951', 1.0]
                ]
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
(function () {
    if (typeof NavigationBuilderRegister === "function") {
        NavigationBuilderRegister("songPage", wrapBuilder(SongPageBuilder));
    }
})();

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface VolumeSlider_Params {
    volume?: number;
    valueOptionsConstructorOptions?: ArcSliderValueOptionsConstructorOptions;
    layoutOptionsConstructorOptions?: ArcSliderLayoutOptionsConstructorOptions;
    styleOptionsConstructorOptions?: ArcSliderStyleOptionsConstructorOptions;
    valueOptions?: ArcSliderValueOptions;
    layoutOptions?: ArcSliderLayoutOptions;
    styleOptions?: ArcSliderStyleOptions;
    arcSliderOptionsConstructorOptions?: ArcSliderOptionsConstructorOptions;
    arcSliderOptions?: ArcSliderOptions;
}
import { ArcSlider } from "@ohos:arkui.advanced.ArcSlider";
import { ArcSliderLayoutOptions } from "@ohos:arkui.advanced.ArcSlider";
import type { ArcSliderLayoutOptionsConstructorOptions } from "@ohos:arkui.advanced.ArcSlider";
import { ArcSliderOptions } from "@ohos:arkui.advanced.ArcSlider";
import type { ArcSliderOptionsConstructorOptions } from "@ohos:arkui.advanced.ArcSlider";
import { ArcSliderPosition } from "@ohos:arkui.advanced.ArcSlider";
import { ArcSliderStyleOptions } from "@ohos:arkui.advanced.ArcSlider";
import type { ArcSliderStyleOptionsConstructorOptions } from "@ohos:arkui.advanced.ArcSlider";
import { ArcSliderValueOptions } from "@ohos:arkui.advanced.ArcSlider";
import type { ArcSliderValueOptionsConstructorOptions } from "@ohos:arkui.advanced.ArcSlider";
import type { BusinessError } from "@ohos:base";
import { MediaService } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import hilog from "@ohos:hilog";
export class VolumeSlider extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__volume = this.createStorageLink('volume', 0.4, "volume");
        this.valueOptionsConstructorOptions = {
            progress: this.volume * 100,
            min: 0,
            max: 100
        };
        this.layoutOptionsConstructorOptions = {
            reverse: true,
            position: ArcSliderPosition.RIGHT
        };
        this.styleOptionsConstructorOptions = {
            trackThickness: 5,
            activeTrackThickness: 8,
            trackColor: '#33f1ebeb',
            selectedColor: '#FE1B48',
            trackBlur: 20
        };
        this.valueOptions = new ArcSliderValueOptions(this.valueOptionsConstructorOptions);
        this.layoutOptions = new ArcSliderLayoutOptions(this.layoutOptionsConstructorOptions);
        this.styleOptions = new ArcSliderStyleOptions(this.styleOptionsConstructorOptions);
        this.arcSliderOptionsConstructorOptions = {
            valueOptions: this.valueOptions,
            layoutOptions: this.layoutOptions,
            styleOptions: this.styleOptions,
            digitalCrownSensitivity: CrownSensitivity.LOW,
            onChange: (progress: number) => {
                this.setAVPlayerVolume(progress);
            },
        };
        this.arcSliderOptions = new ArcSliderOptions(this.arcSliderOptionsConstructorOptions);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: VolumeSlider_Params) {
        if (params.valueOptionsConstructorOptions !== undefined) {
            this.valueOptionsConstructorOptions = params.valueOptionsConstructorOptions;
        }
        if (params.layoutOptionsConstructorOptions !== undefined) {
            this.layoutOptionsConstructorOptions = params.layoutOptionsConstructorOptions;
        }
        if (params.styleOptionsConstructorOptions !== undefined) {
            this.styleOptionsConstructorOptions = params.styleOptionsConstructorOptions;
        }
        if (params.valueOptions !== undefined) {
            this.valueOptions = params.valueOptions;
        }
        if (params.layoutOptions !== undefined) {
            this.layoutOptions = params.layoutOptions;
        }
        if (params.styleOptions !== undefined) {
            this.styleOptions = params.styleOptions;
        }
        if (params.arcSliderOptionsConstructorOptions !== undefined) {
            this.arcSliderOptionsConstructorOptions = params.arcSliderOptionsConstructorOptions;
        }
        if (params.arcSliderOptions !== undefined) {
            this.arcSliderOptions = params.arcSliderOptions;
        }
    }
    updateStateVars(params: VolumeSlider_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__volume.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__volume.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __volume: ObservedPropertyAbstractPU<number>;
    get volume() {
        return this.__volume.get();
    }
    set volume(newValue: number) {
        this.__volume.set(newValue);
    }
    private valueOptionsConstructorOptions: ArcSliderValueOptionsConstructorOptions;
    private layoutOptionsConstructorOptions: ArcSliderLayoutOptionsConstructorOptions;
    private styleOptionsConstructorOptions: ArcSliderStyleOptionsConstructorOptions;
    private valueOptions: ArcSliderValueOptions;
    private layoutOptions: ArcSliderLayoutOptions;
    private styleOptions: ArcSliderStyleOptions;
    private arcSliderOptionsConstructorOptions: ArcSliderOptionsConstructorOptions;
    private arcSliderOptions: ArcSliderOptions;
    setAVPlayerVolume(progress: number) {
        try {
            MediaService.getInstance().avPlayer?.setVolume(progress / 100);
        }
        catch (error) {
            hilog.error(0x0000, 'volumeSlider', 'ArcSlider setVolume failed', (error as BusinessError).code);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // [Start volume_slider]
            Column.create();
            // [Start volume_slider]
            Column.hitTestBehavior(HitTestMode.Transparent);
            // [Start volume_slider]
            Column.position({
                top: 0,
                right: 0
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.focusable(true);
            __Common__.focusOnTouch(true);
            __Common__.defaultFocus(true);
            __Common__.zIndex(999);
            __Common__.onDigitalCrown((event: CrownEvent) => {
                event.stopPropagation();
                const STEP_DEGREE = 20;
                let newVolume = this.volume + event.degree / STEP_DEGREE;
                newVolume = Math.max(0, Math.min(100, newVolume));
                this.setAVPlayerVolume(newVolume);
            });
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ArcSlider(this, { options: this.arcSliderOptions }, undefined, elmtId, () => { }, { page: "products/watch/src/main/ets/view/VolumeSliderComponent.ets", line: 77, col: 7 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            options: this.arcSliderOptions
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "ArcSlider" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549434, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width({ "id": 184549418, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.height({ "id": 184549418, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.rotate({ angle: '-30deg' });
            Image.position({
                right: { "id": 184549416, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
                top: { "id": 184549417, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" },
            });
        }, Image);
        // [Start volume_slider]
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AirDropButton_Params {
    musicInfo?: MusicInfo | null;
    isShowPanel?: boolean;
    /** 投送完成回调 */
    onComplete?: (success: boolean) => void;
}
import type { MusicInfo } from '../viewmodel/AirDropModels';
import { AirDropPanel } from "@bundle:com.huawei.music.musichome/watch@airdrop/ets/view/AirDropPanel";
export class AirDropButton extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__musicInfo = new SynchedPropertyObjectOneWayPU(params.musicInfo, this, "musicInfo");
        this.__isShowPanel = new ObservedPropertySimplePU(false, this, "isShowPanel");
        this.onComplete = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AirDropButton_Params) {
        if (params.musicInfo === undefined) {
            this.__musicInfo.set(null);
        }
        if (params.isShowPanel !== undefined) {
            this.isShowPanel = params.isShowPanel;
        }
        if (params.onComplete !== undefined) {
            this.onComplete = params.onComplete;
        }
    }
    updateStateVars(params: AirDropButton_Params) {
        this.__musicInfo.reset(params.musicInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__musicInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isShowPanel.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__musicInfo.aboutToBeDeleted();
        this.__isShowPanel.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 音乐信息 */
    private __musicInfo: SynchedPropertySimpleOneWayPU<MusicInfo | null>;
    get musicInfo() {
        return this.__musicInfo.get();
    }
    set musicInfo(newValue: MusicInfo | null) {
        this.__musicInfo.set(newValue);
    }
    /** 是否显示面板 */
    private __isShowPanel: ObservedPropertySimplePU<boolean>;
    get isShowPanel() {
        return this.__isShowPanel.get();
    }
    set isShowPanel(newValue: boolean) {
        this.__isShowPanel.set(newValue);
    }
    /** 投送完成回调 */
    private onComplete?: (success: boolean) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.bindSheet({ value: this.isShowPanel, changeEvent: newValue => { this.isShowPanel = newValue; } }, { builder: () => {
                    this.panelBuilder.call(this);
                } }, {
                height: 400,
                backgroundColor: Color.Transparent,
                dragBar: false
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 投送按钮
            Button.createWithChild();
            // 投送按钮
            Button.width(44);
            // 投送按钮
            Button.height(44);
            // 投送按钮
            Button.backgroundColor('#4CAF50');
            // 投送按钮
            Button.borderRadius(22);
            // 投送按钮
            Button.onClick(() => {
                this.isShowPanel = true;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549667, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(Color.White);
        }, Image);
        // 投送按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 投送面板（使用bindSheet）
            if (this.isShowPanel) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.panelBuilder.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    panelBuilder(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new AirDropPanel(this, {
                        isShow: this.__isShowPanel,
                        musicInfo: this.musicInfo,
                        onComplete: (success: boolean) => {
                            if (this.onComplete) {
                                this.onComplete(success);
                            }
                        }
                    }, undefined, elmtId, () => { }, { page: "features/airdrop/src/main/ets/view/AirDropButton.ets", line: 63, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isShow: this.isShowPanel,
                            musicInfo: this.musicInfo,
                            onComplete: (success: boolean) => {
                                if (this.onComplete) {
                                    this.onComplete(success);
                                }
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        musicInfo: this.musicInfo
                    });
                }
            }, { name: "AirDropPanel" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

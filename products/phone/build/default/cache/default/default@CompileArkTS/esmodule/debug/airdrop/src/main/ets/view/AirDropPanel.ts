if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AirDropPanel_Params {
    isShow?: boolean;
    musicInfo?: MusicInfo | null;
    sendFile?: boolean;
    deviceList?: DeviceInfo[];
    selectedDevice?: DeviceInfo | null;
    isLoading?: boolean;
    progress?: TransferProgress | null;
    statusMessage?: string;
    /** 投送完成回调 */
    onComplete?: (success: boolean) => void;
    viewModel?: AirDropViewModel;
}
import { AirDropViewModel } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/viewmodel/AirDropViewModel";
import type { DeviceInfo, MusicInfo, TransferProgress } from '../viewmodel/AirDropModels';
import { AirDropMessages } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/constants/AirDropConstants";
const TAG = 'AirDropPanel';
export class AirDropPanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new SynchedPropertySimpleTwoWayPU(params.isShow, this, "isShow");
        this.__musicInfo = new SynchedPropertyObjectOneWayPU(params.musicInfo, this, "musicInfo");
        this.__sendFile = new ObservedPropertySimplePU(false, this, "sendFile");
        this.__deviceList = new ObservedPropertyObjectPU([], this, "deviceList");
        this.__selectedDevice = new ObservedPropertyObjectPU(null, this, "selectedDevice");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__progress = new ObservedPropertyObjectPU(null, this, "progress");
        this.__statusMessage = new ObservedPropertySimplePU('', this, "statusMessage");
        this.onComplete = undefined;
        this.viewModel = AirDropViewModel.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AirDropPanel_Params) {
        if (params.musicInfo === undefined) {
            this.__musicInfo.set(null);
        }
        if (params.sendFile !== undefined) {
            this.sendFile = params.sendFile;
        }
        if (params.deviceList !== undefined) {
            this.deviceList = params.deviceList;
        }
        if (params.selectedDevice !== undefined) {
            this.selectedDevice = params.selectedDevice;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.progress !== undefined) {
            this.progress = params.progress;
        }
        if (params.statusMessage !== undefined) {
            this.statusMessage = params.statusMessage;
        }
        if (params.onComplete !== undefined) {
            this.onComplete = params.onComplete;
        }
        if (params.viewModel !== undefined) {
            this.viewModel = params.viewModel;
        }
    }
    updateStateVars(params: AirDropPanel_Params) {
        this.__musicInfo.reset(params.musicInfo);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__musicInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__sendFile.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDevice.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__progress.purgeDependencyOnElmtId(rmElmtId);
        this.__statusMessage.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__musicInfo.aboutToBeDeleted();
        this.__sendFile.aboutToBeDeleted();
        this.__deviceList.aboutToBeDeleted();
        this.__selectedDevice.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__progress.aboutToBeDeleted();
        this.__statusMessage.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 是否显示面板 */
    private __isShow: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    /** 音乐信息 */
    private __musicInfo: SynchedPropertySimpleOneWayPU<MusicInfo | null>;
    get musicInfo() {
        return this.__musicInfo.get();
    }
    set musicInfo(newValue: MusicInfo | null) {
        this.__musicInfo.set(newValue);
    }
    /** 是否发送文件 */
    private __sendFile: ObservedPropertySimplePU<boolean>;
    get sendFile() {
        return this.__sendFile.get();
    }
    set sendFile(newValue: boolean) {
        this.__sendFile.set(newValue);
    }
    /** 设备列表 */
    private __deviceList: ObservedPropertyObjectPU<DeviceInfo[]>;
    get deviceList() {
        return this.__deviceList.get();
    }
    set deviceList(newValue: DeviceInfo[]) {
        this.__deviceList.set(newValue);
    }
    /** 选中的设备 */
    private __selectedDevice: ObservedPropertyObjectPU<DeviceInfo | null>;
    get selectedDevice() {
        return this.__selectedDevice.get();
    }
    set selectedDevice(newValue: DeviceInfo | null) {
        this.__selectedDevice.set(newValue);
    }
    /** 是否正在加载 */
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /** 传输进度 */
    private __progress: ObservedPropertyObjectPU<TransferProgress | null>;
    get progress() {
        return this.__progress.get();
    }
    set progress(newValue: TransferProgress | null) {
        this.__progress.set(newValue);
    }
    /** 状态消息 */
    private __statusMessage: ObservedPropertySimplePU<string>;
    get statusMessage() {
        return this.__statusMessage.get();
    }
    set statusMessage(newValue: string) {
        this.__statusMessage.set(newValue);
    }
    /** 投送完成回调 */
    private onComplete?: (success: boolean) => void;
    private viewModel: AirDropViewModel;
    async aboutToAppear() {
        await this.loadDevices();
    }
    private async loadDevices(): Promise<void> {
        this.isLoading = true;
        this.deviceList = await this.viewModel.discoverDevices();
        this.isLoading = false;
        if (this.deviceList.length === 0) {
            this.statusMessage = AirDropMessages.NO_DEVICE_FOUND;
        }
    }
    private async handleSend(): Promise<void> {
        if (!this.selectedDevice || !this.musicInfo) {
            return;
        }
        this.isLoading = true;
        this.statusMessage = AirDropMessages.TRANSFERRING;
        const success = await this.viewModel.doAirDrop({
            targetDeviceId: this.selectedDevice.deviceId,
            musicInfo: this.musicInfo,
            sendFile: this.sendFile
        }, (p: TransferProgress) => {
            this.progress = p;
        });
        this.isLoading = false;
        this.statusMessage = success ? AirDropMessages.TRANSFER_SUCCESS : AirDropMessages.TRANSFER_FAILED;
        if (this.onComplete) {
            this.onComplete(success);
        }
        // 成功后延迟关闭
        if (success) {
            setTimeout(() => {
                this.isShow = false;
            }, 1500);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#FFFFFF');
            Column.borderRadius({ topLeft: 16, topRight: 16 });
            Column.shadow({ radius: 20, color: '#33000000', offsetY: -4 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.padding({ left: 16, right: 8, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('投送到设备');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.width(40);
            Button.height(40);
            Button.backgroundColor(Color.Transparent);
            Button.onClick(() => {
                this.isShow = false;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('×');
            Text.fontSize(24);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.width('100%');
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 设备列表
            if (this.isLoading && this.deviceList.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(150);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(40);
                        LoadingProgress.height(40);
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在搜索设备...');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.deviceList.length > 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('100%');
                        List.layoutWeight(1);
                        List.padding({ left: 16, right: 16 });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const device = _item;
                            {
                                const itemCreation = (elmtId, isInitialRender) => {
                                    ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                                    ListItem.create(deepRenderFunction, true);
                                    if (!isInitialRender) {
                                        ListItem.pop();
                                    }
                                    ViewStackProcessor.StopGetAccessRecording();
                                };
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    ListItem.create(deepRenderFunction, true);
                                    ListItem.margin({ top: 8 });
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Row.create();
                                        Row.width('100%');
                                        Row.padding(12);
                                        Row.backgroundColor(this.selectedDevice?.deviceId === device.deviceId ? '#E8F5E9' : '#FFFFFF');
                                        Row.borderRadius(8);
                                        Row.onClick(() => {
                                            this.selectedDevice = device;
                                        });
                                    }, Row);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 设备图标
                                        Image.create({ "id": 150994980, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                                        // 设备图标
                                        Image.width(40);
                                        // 设备图标
                                        Image.height(40);
                                        // 设备图标
                                        Image.borderRadius(8);
                                    }, Image);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        // 设备信息
                                        Column.create();
                                        // 设备信息
                                        Column.alignItems(HorizontalAlign.Start);
                                        // 设备信息
                                        Column.margin({ left: 12 });
                                        // 设备信息
                                        Column.layoutWeight(1);
                                    }, Column);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(device.deviceName);
                                        Text.fontSize(16);
                                        Text.fontColor('#333333');
                                    }, Text);
                                    Text.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Text.create(device.deviceType);
                                        Text.fontSize(12);
                                        Text.fontColor('#999999');
                                    }, Text);
                                    Text.pop();
                                    // 设备信息
                                    Column.pop();
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        If.create();
                                        // 选中状态
                                        if (this.selectedDevice?.deviceId === device.deviceId) {
                                            this.ifElseBranchUpdateFunction(0, () => {
                                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                                    Image.create({ "id": 150995338, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                                                    Image.width(24);
                                                    Image.height(24);
                                                    Image.fillColor('#4CAF50');
                                                }, Image);
                                            });
                                        }
                                        else {
                                            this.ifElseBranchUpdateFunction(1, () => {
                                            });
                                        }
                                    }, If);
                                    If.pop();
                                    Row.pop();
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.deviceList, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(150);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.statusMessage || AirDropMessages.NO_DEVICE_FOUND);
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 发送文件选项
            if (this.musicInfo?.localFilePath) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Toggle.create({ type: ToggleType.Checkbox, isOn: this.sendFile });
                        Toggle.onChange((isOn: boolean) => {
                            this.sendFile = isOn;
                        });
                        Toggle.width(20);
                        Toggle.height(20);
                        Toggle.selectedColor('#4CAF50');
                    }, Toggle);
                    Toggle.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('同时发送音乐文件');
                        Text.fontSize(14);
                        Text.fontColor('#333333');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            // 进度显示
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 进度显示
            if (this.progress) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.progress.fileName}`);
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Progress.create({ value: this.progress.percent, total: 100, type: ProgressType.Linear });
                        Progress.width('100%');
                        Progress.margin({ top: 4 });
                    }, Progress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`${this.progress.percent}%`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            // 状态消息
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 状态消息
            if (this.statusMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.statusMessage);
                        Text.fontSize(14);
                        Text.fontColor(this.statusMessage === AirDropMessages.TRANSFER_SUCCESS ? '#4CAF50' : '#FF4444');
                        Text.padding({ left: 16, right: 16, top: 8, bottom: 8 });
                    }, Text);
                    Text.pop();
                });
            }
            // 发送按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 发送按钮
            Button.createWithLabel('发送');
            // 发送按钮
            Button.width('90%');
            // 发送按钮
            Button.height(44);
            // 发送按钮
            Button.backgroundColor(this.selectedDevice ? '#4CAF50' : '#CCCCCC');
            // 发送按钮
            Button.fontColor(Color.White);
            // 发送按钮
            Button.borderRadius(22);
            // 发送按钮
            Button.enabled(!!this.selectedDevice && !this.isLoading);
            // 发送按钮
            Button.margin({ top: 12, bottom: 16 });
            // 发送按钮
            Button.onClick(() => {
                this.handleSend();
            });
        }, Button);
        // 发送按钮
        Button.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}

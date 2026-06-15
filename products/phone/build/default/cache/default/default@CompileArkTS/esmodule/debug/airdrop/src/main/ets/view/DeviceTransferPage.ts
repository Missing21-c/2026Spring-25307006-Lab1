if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceTransferPage_Params {
    isShow?: boolean;
    /** 传输完成回调 */
    onComplete?: (success: boolean, files: string[]) => void;
    deviceList?: ExtendedDeviceInfo[];
    selectedDevice?: ExtendedDeviceInfo | null;
    selectedFiles?: PendingTransferFile[];
    currentTask?: TransferTask | null;
    isScanning?: boolean;
    isTransferring?: boolean;
    showFilePicker?: boolean;
    showHistory?: boolean;
    currentStep?: 'device' | 'file' | 'transfer';
    transferViewModel?: DeviceTransferViewModel;
    notificationService?: NotificationService;
}
import { DeviceListView } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/view/DeviceListView";
import { FilePickerPanel } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/view/FilePickerPanel";
import { TransferProgressView } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/view/TransferProgressView";
import { TransferHistoryPage } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/view/TransferHistoryPage";
import { DeviceTransferViewModel } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/viewmodel/DeviceTransferViewModel";
import { NotificationService } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/viewmodel/NotificationService";
import type { ExtendedDeviceInfo, PendingTransferFile, TransferTask } from '../viewmodel/TransferModels';
/**
 * 步骤项接口
 */
interface StepItem {
    step: string;
    label: string;
    icon: Resource;
}
export class DeviceTransferPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new SynchedPropertySimpleTwoWayPU(params.isShow, this, "isShow");
        this.onComplete = undefined;
        this.__deviceList = new ObservedPropertyObjectPU([], this, "deviceList");
        this.__selectedDevice = new ObservedPropertyObjectPU(null, this, "selectedDevice");
        this.__selectedFiles = new ObservedPropertyObjectPU([], this, "selectedFiles");
        this.__currentTask = new ObservedPropertyObjectPU(null, this, "currentTask");
        this.__isScanning = new ObservedPropertySimplePU(false, this, "isScanning");
        this.__isTransferring = new ObservedPropertySimplePU(false, this, "isTransferring");
        this.__showFilePicker = new ObservedPropertySimplePU(false, this, "showFilePicker");
        this.__showHistory = new ObservedPropertySimplePU(false, this, "showHistory");
        this.__currentStep = new ObservedPropertySimplePU('device', this, "currentStep");
        this.transferViewModel = DeviceTransferViewModel.getInstance();
        this.notificationService = NotificationService.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceTransferPage_Params) {
        if (params.onComplete !== undefined) {
            this.onComplete = params.onComplete;
        }
        if (params.deviceList !== undefined) {
            this.deviceList = params.deviceList;
        }
        if (params.selectedDevice !== undefined) {
            this.selectedDevice = params.selectedDevice;
        }
        if (params.selectedFiles !== undefined) {
            this.selectedFiles = params.selectedFiles;
        }
        if (params.currentTask !== undefined) {
            this.currentTask = params.currentTask;
        }
        if (params.isScanning !== undefined) {
            this.isScanning = params.isScanning;
        }
        if (params.isTransferring !== undefined) {
            this.isTransferring = params.isTransferring;
        }
        if (params.showFilePicker !== undefined) {
            this.showFilePicker = params.showFilePicker;
        }
        if (params.showHistory !== undefined) {
            this.showHistory = params.showHistory;
        }
        if (params.currentStep !== undefined) {
            this.currentStep = params.currentStep;
        }
        if (params.transferViewModel !== undefined) {
            this.transferViewModel = params.transferViewModel;
        }
        if (params.notificationService !== undefined) {
            this.notificationService = params.notificationService;
        }
    }
    updateStateVars(params: DeviceTransferPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__deviceList.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDevice.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFiles.purgeDependencyOnElmtId(rmElmtId);
        this.__currentTask.purgeDependencyOnElmtId(rmElmtId);
        this.__isScanning.purgeDependencyOnElmtId(rmElmtId);
        this.__isTransferring.purgeDependencyOnElmtId(rmElmtId);
        this.__showFilePicker.purgeDependencyOnElmtId(rmElmtId);
        this.__showHistory.purgeDependencyOnElmtId(rmElmtId);
        this.__currentStep.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__deviceList.aboutToBeDeleted();
        this.__selectedDevice.aboutToBeDeleted();
        this.__selectedFiles.aboutToBeDeleted();
        this.__currentTask.aboutToBeDeleted();
        this.__isScanning.aboutToBeDeleted();
        this.__isTransferring.aboutToBeDeleted();
        this.__showFilePicker.aboutToBeDeleted();
        this.__showHistory.aboutToBeDeleted();
        this.__currentStep.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 是否显示页面 */
    private __isShow: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    /** 传输完成回调 */
    private onComplete?: (success: boolean, files: string[]) => void;
    private __deviceList: ObservedPropertyObjectPU<ExtendedDeviceInfo[]>;
    get deviceList() {
        return this.__deviceList.get();
    }
    set deviceList(newValue: ExtendedDeviceInfo[]) {
        this.__deviceList.set(newValue);
    }
    private __selectedDevice: ObservedPropertyObjectPU<ExtendedDeviceInfo | null>;
    get selectedDevice() {
        return this.__selectedDevice.get();
    }
    set selectedDevice(newValue: ExtendedDeviceInfo | null) {
        this.__selectedDevice.set(newValue);
    }
    private __selectedFiles: ObservedPropertyObjectPU<PendingTransferFile[]>;
    get selectedFiles() {
        return this.__selectedFiles.get();
    }
    set selectedFiles(newValue: PendingTransferFile[]) {
        this.__selectedFiles.set(newValue);
    }
    private __currentTask: ObservedPropertyObjectPU<TransferTask | null>;
    get currentTask() {
        return this.__currentTask.get();
    }
    set currentTask(newValue: TransferTask | null) {
        this.__currentTask.set(newValue);
    }
    private __isScanning: ObservedPropertySimplePU<boolean>;
    get isScanning() {
        return this.__isScanning.get();
    }
    set isScanning(newValue: boolean) {
        this.__isScanning.set(newValue);
    }
    private __isTransferring: ObservedPropertySimplePU<boolean>;
    get isTransferring() {
        return this.__isTransferring.get();
    }
    set isTransferring(newValue: boolean) {
        this.__isTransferring.set(newValue);
    }
    private __showFilePicker: ObservedPropertySimplePU<boolean>;
    get showFilePicker() {
        return this.__showFilePicker.get();
    }
    set showFilePicker(newValue: boolean) {
        this.__showFilePicker.set(newValue);
    }
    private __showHistory: ObservedPropertySimplePU<boolean>;
    get showHistory() {
        return this.__showHistory.get();
    }
    set showHistory(newValue: boolean) {
        this.__showHistory.set(newValue);
    }
    private __currentStep: ObservedPropertySimplePU<'device' | 'file' | 'transfer'>;
    get currentStep() {
        return this.__currentStep.get();
    }
    set currentStep(newValue: 'device' | 'file' | 'transfer') {
        this.__currentStep.set(newValue);
    }
    private transferViewModel: DeviceTransferViewModel;
    private notificationService: NotificationService;
    aboutToAppear() {
        this.initialize();
        this.scanDevices();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#0d0d1a');
            Column.bindSheet({ value: this.showHistory, changeEvent: newValue => { this.showHistory = newValue; } }, { builder: () => {
                    this.HistorySheet.call(this);
                } }, {
                height: '80%',
                backgroundColor: '#1a1a2e',
                dragBar: true
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995362, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#FFFFFF');
            Image.onClick(() => {
                this.closePage();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('设备传输');
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 历史按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 历史按钮
            Button.width(36);
            // 历史按钮
            Button.height(36);
            // 历史按钮
            Button.backgroundColor('#2a2a4a');
            // 历史按钮
            Button.onClick(() => {
                this.showHistory = true;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995369, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(20);
            Image.height(20);
            Image.fillColor('#FFFFFF');
        }, Image);
        // 历史按钮
        Button.pop();
        // 标题栏
        Row.pop();
        // 步骤指示器
        this.StepIndicator.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 内容区域
            Column.create();
            // 内容区域
            Column.width('100%');
            // 内容区域
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentStep === 'device') {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 设备选择步骤
                                DeviceListView(this, {
                                    devices: this.deviceList,
                                    selectedDevice: this.__selectedDevice,
                                    isLoading: this.isScanning,
                                    onRefresh: () => {
                                        this.scanDevices();
                                    }
                                }, undefined, elmtId, () => { }, { page: "features/airdrop/src/main/ets/view/DeviceTransferPage.ets", line: 105, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        devices: this.deviceList,
                                        selectedDevice: this.selectedDevice,
                                        isLoading: this.isScanning,
                                        onRefresh: () => {
                                            this.scanDevices();
                                        }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    devices: this.deviceList,
                                    isLoading: this.isScanning
                                });
                            }
                        }, { name: "DeviceListView" });
                    }
                });
            }
            else if (this.currentStep === 'file') {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new 
                                // 文件选择步骤
                                FilePickerPanel(this, {
                                    isShow: this.__showFilePicker,
                                    selectedFiles: this.__selectedFiles
                                }, undefined, elmtId, () => { }, { page: "features/airdrop/src/main/ets/view/DeviceTransferPage.ets", line: 115, col: 11 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        isShow: this.showFilePicker,
                                        selectedFiles: this.selectedFiles
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "FilePickerPanel" });
                    }
                });
            }
            else if (this.currentStep === 'transfer') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 传输进度步骤
                        if (this.currentTask) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new TransferProgressView(this, {
                                                task: this.currentTask,
                                                onCancel: () => {
                                                    this.cancelTransfer();
                                                },
                                                onPauseOrResume: () => {
                                                    this.retryTransfer();
                                                }
                                            }, undefined, elmtId, () => { }, { page: "features/airdrop/src/main/ets/view/DeviceTransferPage.ets", line: 122, col: 13 });
                                            ViewPU.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    task: this.currentTask,
                                                    onCancel: () => {
                                                        this.cancelTransfer();
                                                    },
                                                    onPauseOrResume: () => {
                                                        this.retryTransfer();
                                                    }
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                task: this.currentTask
                                            });
                                        }
                                    }, { name: "TransferProgressView" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        // 内容区域
        Column.pop();
        // 底部操作栏
        this.ActionBar.bind(this)();
        Column.pop();
    }
    /**
     * 步骤指示器
     */
    StepIndicator(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.width(40);
                    Row.height(40);
                    Row.borderRadius(20);
                    Row.backgroundColor(item.step === this.currentStep ? '#2a2a4a' : 'transparent');
                    Row.justifyContent(FlexAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.getStepIndex(item.step) < this.getStepIndex(this.currentStep)) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 已完成步骤
                                Image.create({ "id": 150995366, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                                // 已完成步骤
                                Image.width(24);
                                // 已完成步骤
                                Image.height(24);
                                // 已完成步骤
                                Image.fillColor('#4CAF50');
                            }, Image);
                        });
                    }
                    else if (item.step === this.currentStep) {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 当前步骤
                                Image.create(item.icon);
                                // 当前步骤
                                Image.width(24);
                                // 当前步骤
                                Image.height(24);
                                // 当前步骤
                                Image.fillColor('#4CAF50');
                            }, Image);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(2, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                // 未完成步骤
                                Image.create(item.icon);
                                // 未完成步骤
                                Image.width(24);
                                // 未完成步骤
                                Image.height(24);
                                // 未完成步骤
                                Image.fillColor('#666666');
                            }, Image);
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.label);
                    Text.fontSize(12);
                    Text.fontColor(item.step === this.currentStep ? '#4CAF50' : '#999999');
                    Text.margin({ top: 4 });
                }, Text);
                Text.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.step !== 'transfer') {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.width(40);
                                Divider.color(this.getStepIndex(item.step) < this.getStepIndex(this.currentStep) ? '#4CAF50' : '#2a2a4a');
                                Divider.strokeWidth(2);
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, [
                { step: 'device', label: '选择设备', icon: { "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } },
                { step: 'file', label: '选择文件', icon: { "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } },
                { step: 'transfer', label: '传输中', icon: { "id": 150995368, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } }
            ] as StepItem[], forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    /**
     * 底部操作栏
     */
    ActionBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentStep === 'device') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 设备选择步骤的操作按钮
                        Button.createWithLabel('下一步');
                        // 设备选择步骤的操作按钮
                        Button.fontSize(16);
                        // 设备选择步骤的操作按钮
                        Button.height(44);
                        // 设备选择步骤的操作按钮
                        Button.backgroundColor(this.selectedDevice ? '#4CAF50' : '#2a2a4a');
                        // 设备选择步骤的操作按钮
                        Button.fontColor('#FFFFFF');
                        // 设备选择步骤的操作按钮
                        Button.layoutWeight(1);
                        // 设备选择步骤的操作按钮
                        Button.enabled(!!this.selectedDevice);
                        // 设备选择步骤的操作按钮
                        Button.onClick(() => {
                            this.currentStep = 'file';
                        });
                    }, Button);
                    // 设备选择步骤的操作按钮
                    Button.pop();
                });
            }
            else if (this.currentStep === 'file') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 文件选择步骤的操作按钮
                        Button.createWithLabel('上一步');
                        // 文件选择步骤的操作按钮
                        Button.fontSize(16);
                        // 文件选择步骤的操作按钮
                        Button.height(44);
                        // 文件选择步骤的操作按钮
                        Button.backgroundColor('#2a2a4a');
                        // 文件选择步骤的操作按钮
                        Button.fontColor('#FFFFFF');
                        // 文件选择步骤的操作按钮
                        Button.layoutWeight(1);
                        // 文件选择步骤的操作按钮
                        Button.onClick(() => {
                            this.currentStep = 'device';
                        });
                    }, Button);
                    // 文件选择步骤的操作按钮
                    Button.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.width(16);
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(`发送 (${this.selectedFiles.length})`);
                        Button.fontSize(16);
                        Button.height(44);
                        Button.backgroundColor(this.selectedFiles.length > 0 ? '#4CAF50' : '#2a2a4a');
                        Button.fontColor('#FFFFFF');
                        Button.layoutWeight(1);
                        Button.enabled(this.selectedFiles.length > 0);
                        Button.onClick(() => {
                            this.startTransfer();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else if (this.currentStep === 'transfer') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // 传输步骤的操作按钮
                        if (this.currentTask?.status === 'completed' || this.currentTask?.status === 'failed') {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Button.createWithLabel('完成');
                                    Button.fontSize(16);
                                    Button.height(44);
                                    Button.backgroundColor('#4CAF50');
                                    Button.fontColor('#FFFFFF');
                                    Button.layoutWeight(1);
                                    Button.onClick(() => {
                                        this.closePage();
                                    });
                                }, Button);
                                Button.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    /**
     * 历史弹窗
     */
    HistorySheet(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TransferHistoryPage(this, {
                        isShow: this.__showHistory
                    }, undefined, elmtId, () => { }, { page: "features/airdrop/src/main/ets/view/DeviceTransferPage.ets", line: 275, col: 5 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            isShow: this.showHistory
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "TransferHistoryPage" });
        }
    }
    /**
     * 初始化
     */
    private initialize(): void {
        // 设置事件监听
        this.transferViewModel.setEvents({
            onDeviceListUpdated: (devices) => {
                this.deviceList = devices;
            },
            onTransferProgress: (task) => {
                this.currentTask = task;
            },
            onTransferComplete: (success, task) => {
                this.currentTask = task;
                this.isTransferring = false;
                // 显示通知
                if (task.files.length > 0) {
                    this.notificationService.showCompleteNotification(success, task.files[0].fileName);
                }
                // 触发完成回调
                const filePaths = task.files.map(f => f.filePath);
                this.onComplete?.(success, filePaths);
            },
            onError: (error) => {
                console.error(`Transfer error: ${error.message}`);
            }
        });
    }
    /**
     * 扫描设备
     */
    private async scanDevices(): Promise<void> {
        this.isScanning = true;
        try {
            await this.transferViewModel.scanDevices(true);
        }
        catch (error) {
            console.error(`Scan devices failed: ${JSON.stringify(error)}`);
        }
        this.isScanning = false;
    }
    /**
     * 开始传输
     */
    private async startTransfer(): Promise<void> {
        if (!this.selectedDevice || this.selectedFiles.length === 0) {
            return;
        }
        this.isTransferring = true;
        this.currentStep = 'transfer';
        try {
            // 创建传输任务
            const task = await this.transferViewModel.createTransferTask(this.selectedDevice, this.selectedFiles);
            this.currentTask = task;
            // 显示进度通知
            await this.notificationService.showProgressNotification(task);
            // 执行传输
            await this.transferViewModel.executeTask(task, (updatedTask) => {
                this.currentTask = updatedTask;
                this.notificationService.updateProgressNotification(updatedTask);
            });
        }
        catch (error) {
            console.error(`Start transfer failed: ${JSON.stringify(error)}`);
            this.isTransferring = false;
        }
    }
    /**
     * 取消传输
     */
    private async cancelTransfer(): Promise<void> {
        await this.transferViewModel.cancelTask();
        this.isTransferring = false;
        this.currentStep = 'file';
    }
    /**
     * 重试传输
     */
    private async retryTransfer(): Promise<void> {
        await this.transferViewModel.retryFailed();
    }
    /**
     * 关闭页面
     */
    private closePage(): void {
        if (this.isTransferring) {
            AlertDialog.show({
                title: '提示',
                message: '文件正在传输中，确定要关闭吗？',
                primaryButton: {
                    value: '取消',
                    action: () => { }
                },
                secondaryButton: {
                    value: '关闭',
                    fontColor: '#F44336',
                    action: () => {
                        this.cancelTransfer();
                        this.isShow = false;
                    }
                }
            });
        }
        else {
            this.isShow = false;
        }
    }
    /**
     * 获取步骤索引
     */
    private getStepIndex(step: string): number {
        switch (step) {
            case 'device':
                return 0;
            case 'file':
                return 1;
            case 'transfer':
                return 2;
            default:
                return 0;
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

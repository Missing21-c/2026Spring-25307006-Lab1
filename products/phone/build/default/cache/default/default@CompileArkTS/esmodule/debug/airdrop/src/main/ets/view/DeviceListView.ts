if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface DeviceListView_Params {
    devices?: ExtendedDeviceInfo[];
    selectedDevice?: ExtendedDeviceInfo | null;
    isLoading?: boolean;
    /** 刷新事件 */
    onRefresh?: () => void;
}
import type { ExtendedDeviceInfo } from '../viewmodel/TransferModels';
export class DeviceListView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__devices = new SynchedPropertyObjectOneWayPU(params.devices, this, "devices");
        this.__selectedDevice = new SynchedPropertyObjectTwoWayPU(params.selectedDevice, this, "selectedDevice");
        this.__isLoading = new SynchedPropertySimpleOneWayPU(params.isLoading, this, "isLoading");
        this.onRefresh = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: DeviceListView_Params) {
        if (params.devices === undefined) {
            this.__devices.set([]);
        }
        if (params.isLoading === undefined) {
            this.__isLoading.set(false);
        }
        if (params.onRefresh !== undefined) {
            this.onRefresh = params.onRefresh;
        }
    }
    updateStateVars(params: DeviceListView_Params) {
        this.__devices.reset(params.devices);
        this.__isLoading.reset(params.isLoading);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__devices.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedDevice.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__devices.aboutToBeDeleted();
        this.__selectedDevice.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 设备列表 */
    private __devices: SynchedPropertySimpleOneWayPU<ExtendedDeviceInfo[]>;
    get devices() {
        return this.__devices.get();
    }
    set devices(newValue: ExtendedDeviceInfo[]) {
        this.__devices.set(newValue);
    }
    /** 选中的设备 */
    private __selectedDevice: SynchedPropertySimpleOneWayPU<ExtendedDeviceInfo | null>;
    get selectedDevice() {
        return this.__selectedDevice.get();
    }
    set selectedDevice(newValue: ExtendedDeviceInfo | null) {
        this.__selectedDevice.set(newValue);
    }
    /** 是否正在加载 */
    private __isLoading: SynchedPropertySimpleOneWayPU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    /** 刷新事件 */
    private onRefresh?: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#1a1a2e');
            Column.borderRadius(12);
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
            Text.create('选择设备');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 刷新按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 刷新按钮
            Button.width(36);
            // 刷新按钮
            Button.height(36);
            // 刷新按钮
            Button.backgroundColor('#2a2a4a');
            // 刷新按钮
            Button.onClick(() => {
                this.onRefresh?.();
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995367, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(20);
            Image.height(20);
        }, Image);
        // 刷新按钮
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 设备列表
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 加载状态
                        Column.create();
                        // 加载状态
                        Column.width('100%');
                        // 加载状态
                        Column.height(200);
                        // 加载状态
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(48);
                        LoadingProgress.height(48);
                        LoadingProgress.color('#4CAF50');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在扫描设备...');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    // 加载状态
                    Column.pop();
                });
            }
            else if (this.devices.length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 空状态
                        Column.create();
                        // 空状态
                        Column.width('100%');
                        // 空状态
                        Column.height(200);
                        // 空状态
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(64);
                        Image.height(64);
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未发现附近设备');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 16 });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请确保其他设备已登录同一账号');
                        Text.fontSize(12);
                        Text.fontColor('#666666');
                        Text.margin({ top: 8 });
                    }, Text);
                    Text.pop();
                    // 空状态
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 设备列表
                        List.create();
                        // 设备列表
                        List.width('100%');
                        // 设备列表
                        List.layoutWeight(1);
                        // 设备列表
                        List.divider({ strokeWidth: 1, color: '#2a2a4a' });
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
                                };
                                const deepRenderFunction = (elmtId, isInitialRender) => {
                                    itemCreation(elmtId, isInitialRender);
                                    this.DeviceItem.bind(this)(device);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.devices, forEachItemGenFunction, (device: ExtendedDeviceInfo) => device.deviceId, false, false);
                    }, ForEach);
                    ForEach.pop();
                    // 设备列表
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 设备项组件
     */
    DeviceItem(device: ExtendedDeviceInfo, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.backgroundColor(this.selectedDevice?.deviceId === device.deviceId ? '#2a2a4a' : 'transparent');
            Row.borderRadius(8);
            Row.onClick(() => {
                this.selectedDevice = device;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设备图标
            Image.create(this.getDeviceIcon(device.deviceType));
            // 设备图标
            Image.width(40);
            // 设备图标
            Image.height(40);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 设备信息
            Column.create();
            // 设备信息
            Column.layoutWeight(1);
            // 设备信息
            Column.alignItems(HorizontalAlign.Start);
            // 设备信息
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(device.deviceName);
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Medium);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getDeviceTypeText(device.deviceType));
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 在线状态
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Circle.create();
            Circle.width(8);
            Circle.height(8);
        }, Circle);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(device.isOnline ? '在线' : '离线');
            Text.fontSize(12);
            Text.fontColor(device.isOnline ? '#4CAF50' : '#999999');
            Text.margin({ left: 4 });
        }, Text);
        Text.pop();
        // 在线状态
        Row.pop();
        Row.pop();
        // 设备信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 选中标记
            if (this.selectedDevice?.deviceId === device.deviceId) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995366, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
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
    }
    /**
     * 获取设备图标
     */
    private getDeviceIcon(deviceType: string): Resource {
        switch (deviceType) {
            case 'phone':
                return { "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
            case 'tablet':
                return { "id": 150995359, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
            case 'watch':
                return { "id": 150995360, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
            default:
                return { "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
        }
    }
    /**
     * 获取设备类型文本
     */
    private getDeviceTypeText(deviceType: string): string {
        switch (deviceType) {
            case 'phone':
                return '手机';
            case 'tablet':
                return '平板';
            case 'watch':
                return '手表';
            default:
                return '未知设备';
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

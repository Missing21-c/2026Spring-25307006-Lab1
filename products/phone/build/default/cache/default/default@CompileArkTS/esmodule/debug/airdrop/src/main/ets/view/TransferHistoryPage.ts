if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TransferHistoryPage_Params {
    isShow?: boolean;
    historyList?: TransferHistoryRecord[];
    isLoading?: boolean;
    selectedRecord?: TransferHistoryRecord | null;
    showDetail?: boolean;
    historyService?: TransferHistoryService;
}
import type { TransferHistoryRecord } from '../viewmodel/TransferModels';
import { TransferHistoryService } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/viewmodel/TransferHistoryService";
export class TransferHistoryPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new SynchedPropertySimpleTwoWayPU(params.isShow, this, "isShow");
        this.__historyList = new ObservedPropertyObjectPU([], this, "historyList");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__selectedRecord = new ObservedPropertyObjectPU(null, this, "selectedRecord");
        this.__showDetail = new ObservedPropertySimplePU(false, this, "showDetail");
        this.historyService = TransferHistoryService.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TransferHistoryPage_Params) {
        if (params.historyList !== undefined) {
            this.historyList = params.historyList;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.selectedRecord !== undefined) {
            this.selectedRecord = params.selectedRecord;
        }
        if (params.showDetail !== undefined) {
            this.showDetail = params.showDetail;
        }
        if (params.historyService !== undefined) {
            this.historyService = params.historyService;
        }
    }
    updateStateVars(params: TransferHistoryPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__historyList.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedRecord.purgeDependencyOnElmtId(rmElmtId);
        this.__showDetail.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__historyList.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__selectedRecord.aboutToBeDeleted();
        this.__showDetail.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 是否显示 */
    private __isShow: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    private __historyList: ObservedPropertyObjectPU<TransferHistoryRecord[]>;
    get historyList() {
        return this.__historyList.get();
    }
    set historyList(newValue: TransferHistoryRecord[]) {
        this.__historyList.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __selectedRecord: ObservedPropertyObjectPU<TransferHistoryRecord | null>;
    get selectedRecord() {
        return this.__selectedRecord.get();
    }
    set selectedRecord(newValue: TransferHistoryRecord | null) {
        this.__selectedRecord.set(newValue);
    }
    private __showDetail: ObservedPropertySimplePU<boolean>;
    get showDetail() {
        return this.__showDetail.get();
    }
    set showDetail(newValue: boolean) {
        this.__showDetail.set(newValue);
    }
    private historyService: TransferHistoryService;
    aboutToAppear() {
        this.loadHistory();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#1a1a2e');
            Column.bindSheet({ value: this.showDetail, changeEvent: newValue => { this.showDetail = newValue; } }, { builder: () => {
                    this.DetailSheet.call(this);
                } }, {
                height: 300,
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
                this.isShow = false;
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('传输历史');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
            Text.margin({ left: 12 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 清空按钮
            Button.createWithLabel('清空');
            // 清空按钮
            Button.fontSize(14);
            // 清空按钮
            Button.height(32);
            // 清空按钮
            Button.backgroundColor('#F44336');
            // 清空按钮
            Button.fontColor('#FFFFFF');
            // 清空按钮
            Button.onClick(() => {
                this.showClearConfirm();
            });
        }, Button);
        // 清空按钮
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 历史列表
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(48);
                        LoadingProgress.height(48);
                        LoadingProgress.color('#4CAF50');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('加载中...');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.historyList.length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.layoutWeight(1);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(64);
                        Image.height(64);
                        Image.fillColor('#666666');
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('暂无传输记录');
                        Text.fontSize(16);
                        Text.fontColor('#999999');
                        Text.margin({ top: 16 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create();
                        List.width('100%');
                        List.layoutWeight(1);
                        List.divider({ strokeWidth: 1, color: '#2a2a4a' });
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const record = _item;
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
                                    this.HistoryItem.bind(this)(record);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.historyList, forEachItemGenFunction, (record: TransferHistoryRecord) => record.recordId, false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 历史记录项
     */
    HistoryItem(record: TransferHistoryRecord, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(16);
            Row.onClick(() => {
                this.selectedRecord = record;
                this.showDetail = true;
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 方向图标
            Column.create();
            // 方向图标
            Column.width(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(record.direction === 'send' ? { "id": 150995363, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" } : { "id": 150995361, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(24);
            Image.height(24);
            Image.fillColor(record.direction === 'send' ? '#4CAF50' : '#2196F3');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.direction === 'send' ? '发送' : '接收');
            Text.fontSize(10);
            Text.fontColor(record.direction === 'send' ? '#4CAF50' : '#2196F3');
        }, Text);
        Text.pop();
        // 方向图标
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件信息
            Column.create();
            // 文件信息
            Column.layoutWeight(1);
            // 文件信息
            Column.alignItems(HorizontalAlign.Start);
            // 文件信息
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.fileName);
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(record.peerDeviceName);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(' • ');
            Text.fontSize(12);
            Text.fontColor('#666666');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(record.transferTime));
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        // 文件信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 状态图标
            Column.create();
            // 状态图标
            Column.width(50);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (record.status === 'completed') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995366, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(20);
                        Image.height(20);
                        Image.fillColor('#4CAF50');
                    }, Image);
                });
            }
            else if (record.status === 'failed') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(20);
                        Image.height(20);
                        Image.fillColor('#F44336');
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(20);
                        Image.height(20);
                        Image.fillColor('#FF9800');
                    }, Image);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.getStatusText(record.status));
            Text.fontSize(10);
            Text.fontColor(this.getStatusColor(record.status));
        }, Text);
        Text.pop();
        // 状态图标
        Column.pop();
        Row.pop();
    }
    /**
     * 详情弹窗
     */
    DetailSheet(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(20);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.selectedRecord) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 标题
                        Text.create('传输详情');
                        // 标题
                        Text.fontSize(18);
                        // 标题
                        Text.fontWeight(FontWeight.Bold);
                        // 标题
                        Text.fontColor('#FFFFFF');
                        // 标题
                        Text.margin({ bottom: 16 });
                    }, Text);
                    // 标题
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 详情信息
                        Column.create();
                        // 详情信息
                        Column.width('100%');
                        // 详情信息
                        Column.alignItems(HorizontalAlign.Start);
                    }, Column);
                    this.DetailItem.bind(this)('文件名', this.selectedRecord.fileName);
                    this.DetailItem.bind(this)('文件大小', this.formatSize(this.selectedRecord.fileSize));
                    this.DetailItem.bind(this)('传输方向', this.selectedRecord.direction === 'send' ? '发送' : '接收');
                    this.DetailItem.bind(this)('对方设备', this.selectedRecord.peerDeviceName);
                    this.DetailItem.bind(this)('传输时间', this.formatDateTime(this.selectedRecord.transferTime));
                    this.DetailItem.bind(this)('耗时', this.formatDuration(this.selectedRecord.duration));
                    this.DetailItem.bind(this)('状态', this.getStatusText(this.selectedRecord.status));
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedRecord.localPath) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailItem.bind(this)('保存路径', this.selectedRecord.localPath);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.selectedRecord.errorMessage) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.DetailItem.bind(this)('错误信息', this.selectedRecord.errorMessage);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    // 详情信息
                    Column.pop();
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
    /**
     * 详情项
     */
    DetailItem(label: string, value: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${label}:`);
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.width(80);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(value);
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        Row.pop();
    }
    /**
     * 加载历史记录
     */
    private async loadHistory(): Promise<void> {
        this.isLoading = true;
        try {
            this.historyList = await this.historyService.getHistoryList();
        }
        catch (error) {
            console.error(`Load history failed: ${JSON.stringify(error)}`);
        }
        this.isLoading = false;
    }
    /**
     * 显示清空确认对话框
     */
    private showClearConfirm(): void {
        AlertDialog.show({
            title: '确认清空',
            message: '确定要清空所有传输历史记录吗？',
            primaryButton: {
                value: '取消',
                action: () => { }
            },
            secondaryButton: {
                value: '清空',
                fontColor: '#F44336',
                action: async () => {
                    await this.historyService.clearAll();
                    await this.loadHistory();
                }
            }
        });
    }
    /**
     * 格式化文件大小
     */
    private formatSize(size: number): string {
        if (size < 1024) {
            return `${size} B`;
        }
        else if (size < 1024 * 1024) {
            return `${(size / 1024).toFixed(2)} KB`;
        }
        else if (size < 1024 * 1024 * 1024) {
            return `${(size / 1024 / 1024).toFixed(2)} MB`;
        }
        else {
            return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
        }
    }
    /**
     * 格式化时间
     */
    private formatTime(timestamp: number): string {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - timestamp;
        if (diff < 60000) {
            return '刚刚';
        }
        else if (diff < 3600000) {
            return `${Math.floor(diff / 60000)}分钟前`;
        }
        else if (diff < 86400000) {
            return `${Math.floor(diff / 3600000)}小时前`;
        }
        else {
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        }
    }
    /**
     * 格式化日期时间
     */
    private formatDateTime(timestamp: number): string {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    }
    /**
     * 格式化持续时间
     */
    private formatDuration(ms: number): string {
        const seconds = Math.floor(ms / 1000);
        if (seconds < 60) {
            return `${seconds}秒`;
        }
        else if (seconds < 3600) {
            const minutes = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${minutes}分${secs}秒`;
        }
        else {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            return `${hours}时${minutes}分`;
        }
    }
    /**
     * 获取状态文本
     */
    private getStatusText(status: string): string {
        switch (status) {
            case 'completed':
                return '成功';
            case 'failed':
                return '失败';
            case 'cancelled':
                return '已取消';
            default:
                return '未知';
        }
    }
    /**
     * 获取状态颜色
     */
    private getStatusColor(status: string): string {
        switch (status) {
            case 'completed':
                return '#4CAF50';
            case 'failed':
                return '#F44336';
            case 'cancelled':
                return '#FF9800';
            default:
                return '#999999';
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

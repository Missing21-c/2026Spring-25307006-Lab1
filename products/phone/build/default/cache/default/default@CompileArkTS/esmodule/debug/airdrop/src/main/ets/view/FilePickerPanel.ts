if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FilePickerPanel_Params {
    isShow?: boolean;
    selectedFiles?: PendingTransferFile[];
    supportedFormats?: string[];
    maxSelectCount?: number;
    maxTotalSize?: number;
    files?: PendingTransferFile[];
    isLoading?: boolean;
    currentFilter?: string;
    fileSelectionService?: FileSelectionService;
}
import type { PendingTransferFile } from '../viewmodel/TransferModels';
import { FileSelectionService } from "@bundle:com.huawei.music.musichome/phone@airdrop/ets/viewmodel/FileSelectionService";
export class FilePickerPanel extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__isShow = new SynchedPropertySimpleTwoWayPU(params.isShow, this, "isShow");
        this.__selectedFiles = new SynchedPropertyObjectTwoWayPU(params.selectedFiles, this, "selectedFiles");
        this.__supportedFormats = new SynchedPropertyObjectOneWayPU(params.supportedFormats, this, "supportedFormats");
        this.__maxSelectCount = new SynchedPropertySimpleOneWayPU(params.maxSelectCount, this, "maxSelectCount");
        this.__maxTotalSize = new SynchedPropertySimpleOneWayPU(params.maxTotalSize, this, "maxTotalSize");
        this.__files = new ObservedPropertyObjectPU([], this, "files");
        this.__isLoading = new ObservedPropertySimplePU(false, this, "isLoading");
        this.__currentFilter = new ObservedPropertySimplePU('all', this, "currentFilter");
        this.fileSelectionService = FileSelectionService.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FilePickerPanel_Params) {
        if (params.supportedFormats === undefined) {
            this.__supportedFormats.set(['mp3', 'wav', 'flac', 'aac']);
        }
        if (params.maxSelectCount === undefined) {
            this.__maxSelectCount.set(50);
        }
        if (params.maxTotalSize === undefined) {
            this.__maxTotalSize.set(500 * 1024 * 1024);
        }
        if (params.files !== undefined) {
            this.files = params.files;
        }
        if (params.isLoading !== undefined) {
            this.isLoading = params.isLoading;
        }
        if (params.currentFilter !== undefined) {
            this.currentFilter = params.currentFilter;
        }
        if (params.fileSelectionService !== undefined) {
            this.fileSelectionService = params.fileSelectionService;
        }
    }
    updateStateVars(params: FilePickerPanel_Params) {
        this.__supportedFormats.reset(params.supportedFormats);
        this.__maxSelectCount.reset(params.maxSelectCount);
        this.__maxTotalSize.reset(params.maxTotalSize);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedFiles.purgeDependencyOnElmtId(rmElmtId);
        this.__supportedFormats.purgeDependencyOnElmtId(rmElmtId);
        this.__maxSelectCount.purgeDependencyOnElmtId(rmElmtId);
        this.__maxTotalSize.purgeDependencyOnElmtId(rmElmtId);
        this.__files.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoading.purgeDependencyOnElmtId(rmElmtId);
        this.__currentFilter.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__selectedFiles.aboutToBeDeleted();
        this.__supportedFormats.aboutToBeDeleted();
        this.__maxSelectCount.aboutToBeDeleted();
        this.__maxTotalSize.aboutToBeDeleted();
        this.__files.aboutToBeDeleted();
        this.__isLoading.aboutToBeDeleted();
        this.__currentFilter.aboutToBeDeleted();
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
    /** 已选文件列表 */
    private __selectedFiles: SynchedPropertySimpleOneWayPU<PendingTransferFile[]>;
    get selectedFiles() {
        return this.__selectedFiles.get();
    }
    set selectedFiles(newValue: PendingTransferFile[]) {
        this.__selectedFiles.set(newValue);
    }
    /** 支持的文件格式 */
    private __supportedFormats: SynchedPropertySimpleOneWayPU<string[]>;
    get supportedFormats() {
        return this.__supportedFormats.get();
    }
    set supportedFormats(newValue: string[]) {
        this.__supportedFormats.set(newValue);
    }
    /** 最大选择数量 */
    private __maxSelectCount: SynchedPropertySimpleOneWayPU<number>;
    get maxSelectCount() {
        return this.__maxSelectCount.get();
    }
    set maxSelectCount(newValue: number) {
        this.__maxSelectCount.set(newValue);
    }
    /** 最大总大小(字节) */
    private __maxTotalSize: SynchedPropertySimpleOneWayPU<number>; // 500MB
    get maxTotalSize() {
        return this.__maxTotalSize.get();
    }
    set maxTotalSize(newValue: number) {
        this.__maxTotalSize.set(newValue);
    }
    private __files: ObservedPropertyObjectPU<PendingTransferFile[]>;
    get files() {
        return this.__files.get();
    }
    set files(newValue: PendingTransferFile[]) {
        this.__files.set(newValue);
    }
    private __isLoading: ObservedPropertySimplePU<boolean>;
    get isLoading() {
        return this.__isLoading.get();
    }
    set isLoading(newValue: boolean) {
        this.__isLoading.set(newValue);
    }
    private __currentFilter: ObservedPropertySimplePU<string>;
    get currentFilter() {
        return this.__currentFilter.get();
    }
    set currentFilter(newValue: string) {
        this.__currentFilter.set(newValue);
    }
    private fileSelectionService: FileSelectionService;
    aboutToAppear() {
        this.loadFiles();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
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
            Text.create('选择文件');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 关闭按钮
            Button.createWithChild({ type: ButtonType.Circle });
            // 关闭按钮
            Button.width(36);
            // 关闭按钮
            Button.height(36);
            // 关闭按钮
            Button.backgroundColor('#2a2a4a');
            // 关闭按钮
            Button.onClick(() => {
                this.isShow = false;
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995364, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(20);
            Image.height(20);
            Image.fillColor('#FFFFFF');
        }, Image);
        // 关闭按钮
        Button.pop();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 筛选栏
            Row.create();
            // 筛选栏
            Row.width('100%');
            // 筛选栏
            Row.padding({ left: 16, right: 16, top: 8, bottom: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('格式筛选:');
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('全部');
            Button.fontSize(12);
            Button.height(28);
            Button.backgroundColor(this.currentFilter === 'all' ? '#4CAF50' : '#2a2a4a');
            Button.fontColor(this.currentFilter === 'all' ? '#FFFFFF' : '#999999');
            Button.onClick(() => {
                this.currentFilter = 'all';
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const format = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Button.createWithLabel(format.toUpperCase());
                    Button.fontSize(12);
                    Button.height(28);
                    Button.backgroundColor(this.currentFilter === format ? '#4CAF50' : '#2a2a4a');
                    Button.fontColor(this.currentFilter === format ? '#FFFFFF' : '#999999');
                    Button.margin({ left: 8 });
                    Button.onClick(() => {
                        this.currentFilter = format;
                    });
                }, Button);
                Button.pop();
            };
            this.forEachUpdateFunction(elmtId, this.supportedFormats, forEachItemGenFunction);
        }, ForEach);
        ForEach.pop();
        // 筛选栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 文件列表
            if (this.isLoading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(300);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(48);
                        LoadingProgress.height(48);
                        LoadingProgress.color('#4CAF50');
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('正在扫描文件...');
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ top: 12 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else if (this.getFilteredFiles().length === 0) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.height(300);
                        Column.justifyContent(FlexAlign.Center);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(64);
                        Image.height(64);
                        Image.fillColor('#666666');
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('未找到音频文件');
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
                            const file = _item;
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
                                    this.FileItem.bind(this)(file);
                                    ListItem.pop();
                                };
                                this.observeComponentCreation2(itemCreation2, ListItem);
                                ListItem.pop();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.getFilteredFiles(), forEachItemGenFunction, (file: PendingTransferFile) => file.fileId, false, false);
                    }, ForEach);
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部操作栏
            Row.create();
            // 底部操作栏
            Row.width('100%');
            // 底部操作栏
            Row.padding(16);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 全选按钮
            Button.createWithLabel('全选');
            // 全选按钮
            Button.fontSize(14);
            // 全选按钮
            Button.height(36);
            // 全选按钮
            Button.backgroundColor('#2a2a4a');
            // 全选按钮
            Button.fontColor('#FFFFFF');
            // 全选按钮
            Button.onClick(() => {
                this.selectAll();
            });
        }, Button);
        // 全选按钮
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消全选');
            Button.fontSize(14);
            Button.height(36);
            Button.backgroundColor('#2a2a4a');
            Button.fontColor('#FFFFFF');
            Button.margin({ left: 8 });
            Button.onClick(() => {
                this.deselectAll();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 已选信息
            Column.create();
            // 已选信息
            Column.alignItems(HorizontalAlign.End);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`已选 ${this.selectedFiles.length} 个文件`);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`总大小: ${this.formatSize(this.getTotalSize())}`);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        // 已选信息
        Column.pop();
        // 底部操作栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 警告提示
            if (this.isOverLimit()) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.padding({ left: 16, right: 16, bottom: 8 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(16);
                        Image.height(16);
                        Image.fillColor('#FF9800');
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.getLimitWarning());
                        Text.fontSize(12);
                        Text.fontColor('#FF9800');
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
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
     * 文件项组件
     */
    FileItem(file: PendingTransferFile, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding(12);
            Row.onClick(() => {
                file.isSelected = !file.isSelected;
                this.updateSelectedFiles();
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 复选框
            Checkbox.create();
            // 复选框
            Checkbox.select(file.isSelected);
            // 复选框
            Checkbox.selectedColor('#4CAF50');
            // 复选框
            Checkbox.onChange((isChecked: boolean) => {
                file.isSelected = isChecked;
                this.updateSelectedFiles();
            });
        }, Checkbox);
        // 复选框
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件图标
            Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            // 文件图标
            Image.width(36);
            // 文件图标
            Image.height(36);
            // 文件图标
            Image.fillColor('#4CAF50');
            // 文件图标
            Image.margin({ left: 12 });
        }, Image);
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
            Text.create(file.fileName);
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
            Text.create(this.formatSize(file.fileSize));
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(file.fileFormat.toUpperCase());
            Text.fontSize(12);
            Text.fontColor('#4CAF50');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        // 文件信息
        Column.pop();
        Row.pop();
    }
    /**
     * 加载文件
     */
    private async loadFiles(): Promise<void> {
        this.isLoading = true;
        try {
            this.files = await this.fileSelectionService.scanLocalAudioFiles();
        }
        catch (error) {
            console.error(`Load files failed: ${JSON.stringify(error)}`);
        }
        this.isLoading = false;
    }
    /**
     * 获取筛选后的文件
     */
    private getFilteredFiles(): PendingTransferFile[] {
        if (this.currentFilter === 'all') {
            return this.files;
        }
        return this.files.filter(file => file.fileFormat === this.currentFilter);
    }
    /**
     * 更新已选文件
     */
    private updateSelectedFiles(): void {
        this.selectedFiles = this.files.filter(file => file.isSelected);
    }
    /**
     * 全选
     */
    private selectAll(): void {
        const filteredFiles = this.getFilteredFiles();
        filteredFiles.forEach(file => file.isSelected = true);
        this.updateSelectedFiles();
    }
    /**
     * 取消全选
     */
    private deselectAll(): void {
        this.files.forEach(file => file.isSelected = false);
        this.updateSelectedFiles();
    }
    /**
     * 获取总大小
     */
    private getTotalSize(): number {
        return this.selectedFiles.reduce((sum, file) => sum + file.fileSize, 0);
    }
    /**
     * 是否超过限制
     */
    private isOverLimit(): boolean {
        return this.selectedFiles.length > this.maxSelectCount || this.getTotalSize() > this.maxTotalSize;
    }
    /**
     * 获取限制警告
     */
    private getLimitWarning(): string {
        if (this.selectedFiles.length > this.maxSelectCount) {
            return `文件数量超过限制(${this.maxSelectCount}个)`;
        }
        if (this.getTotalSize() > this.maxTotalSize) {
            return `总大小超过限制(${this.formatSize(this.maxTotalSize)})`;
        }
        return '';
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
    rerender() {
        this.updateDirtyElements();
    }
}

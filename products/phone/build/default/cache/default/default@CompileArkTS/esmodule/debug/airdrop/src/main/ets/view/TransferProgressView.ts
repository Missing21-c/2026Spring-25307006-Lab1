if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface TransferProgressView_Params {
    task?: TransferTask;
    /** 取消事件 */
    onCancel?: () => void;
    /** 暂停/继续事件 */
    onPauseOrResume?: () => void;
}
import type { TransferTask } from '../viewmodel/TransferModels';
export class TransferProgressView extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__task = new SynchedPropertyObjectOneWayPU(params.task, this, "task");
        this.onCancel = undefined;
        this.onPauseOrResume = undefined;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TransferProgressView_Params) {
        if (params.onCancel !== undefined) {
            this.onCancel = params.onCancel;
        }
        if (params.onPauseOrResume !== undefined) {
            this.onPauseOrResume = params.onPauseOrResume;
        }
    }
    updateStateVars(params: TransferProgressView_Params) {
        this.__task.reset(params.task);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__task.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__task.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    /** 传输任务 */
    private __task: SynchedPropertySimpleOneWayPU<TransferTask>;
    get task() {
        return this.__task.get();
    }
    set task(newValue: TransferTask) {
        this.__task.set(newValue);
    }
    /** 取消事件 */
    private onCancel?: () => void;
    /** 暂停/继续事件 */
    private onPauseOrResume?: () => void;
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
            Text.create('传输进度');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        // 状态图标
        this.StatusIcon.bind(this)();
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 目标设备信息
            Row.create();
            // 目标设备信息
            Row.width('100%');
            // 目标设备信息
            Row.padding({ left: 16, right: 16, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(20);
            Image.height(20);
            Image.fillColor('#4CAF50');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`发送到: ${this.task.targetDeviceName}`);
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 目标设备信息
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 当前文件信息
            if (this.task.files.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.width('100%');
                        Column.alignItems(HorizontalAlign.Start);
                        Column.padding({ left: 16, right: 16, bottom: 12 });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`正在传输: ${this.getCurrentFileName()}`);
                        Text.fontSize(14);
                        Text.fontColor('#FFFFFF');
                        Text.maxLines(1);
                        Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`文件 ${this.task.currentFileIndex + 1} / ${this.task.files.length}`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                        Text.margin({ top: 4 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            // 进度条
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 进度条
            Column.create();
            // 进度条
            Column.width('100%');
            // 进度条
            Column.padding({ left: 16, right: 16, bottom: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Progress.create({
                value: this.getProgressPercent(),
                total: 100,
                type: ProgressType.Linear
            });
            Progress.width('100%');
            Progress.color('#4CAF50');
            Progress.backgroundColor('#2a2a4a');
        }, Progress);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.margin({ top: 8 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.getProgressPercent()}%`);
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`${this.formatSize(this.task.transferredSize)} / ${this.formatSize(this.task.totalSize)}`);
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        // 进度条
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 传输速度
            Row.create();
            // 传输速度
            Row.width('100%');
            // 传输速度
            Row.padding({ left: 16, right: 16, bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('传输速度:');
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatSpeed(this.task.speed));
            Text.fontSize(14);
            Text.fontColor('#4CAF50');
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 传输时间
            if (this.task.startTime) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`已用时: ${this.formatDuration(Date.now() - this.task.startTime)}`);
                        Text.fontSize(12);
                        Text.fontColor('#999999');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        // 传输速度
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 错误信息
            if (this.task.status === 'failed' && this.task.errorMessage) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.padding({ left: 16, right: 16, bottom: 12 });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(16);
                        Image.height(16);
                        Image.fillColor('#F44336');
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.task.errorMessage);
                        Text.fontSize(12);
                        Text.fontColor('#F44336');
                        Text.margin({ left: 8 });
                        Text.layoutWeight(1);
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            // 操作按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
            // 操作按钮
            Row.width('100%');
            // 操作按钮
            Row.padding({ left: 16, right: 16, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.task.status === 'transferring') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('取消传输');
                        Button.fontSize(14);
                        Button.height(40);
                        Button.backgroundColor('#F44336');
                        Button.fontColor('#FFFFFF');
                        Button.layoutWeight(1);
                        Button.onClick(() => {
                            this.onCancel?.();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else if (this.task.status === 'failed') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel('重试');
                        Button.fontSize(14);
                        Button.height(40);
                        Button.backgroundColor('#4CAF50');
                        Button.fontColor('#FFFFFF');
                        Button.layoutWeight(1);
                        Button.onClick(() => {
                            this.onPauseOrResume?.();
                        });
                    }, Button);
                    Button.pop();
                });
            }
            else if (this.task.status === 'completed') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.width('100%');
                        Row.justifyContent(FlexAlign.Center);
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995366, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(20);
                        Image.height(20);
                        Image.fillColor('#4CAF50');
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('传输完成');
                        Text.fontSize(16);
                        Text.fontColor('#4CAF50');
                        Text.fontWeight(FontWeight.Bold);
                        Text.margin({ left: 8 });
                    }, Text);
                    Text.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                });
            }
        }, If);
        If.pop();
        // 操作按钮
        Row.pop();
        Column.pop();
    }
    /**
     * 状态图标
     */
    StatusIcon(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.task.status === 'transferring') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.width(24);
                        LoadingProgress.height(24);
                        LoadingProgress.color('#4CAF50');
                    }, LoadingProgress);
                });
            }
            else if (this.task.status === 'completed') {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995366, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
                        Image.fillColor('#4CAF50');
                    }, Image);
                });
            }
            else if (this.task.status === 'failed') {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
                        Image.fillColor('#F44336');
                    }, Image);
                });
            }
            else if (this.task.status === 'paused') {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995347, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
                        Image.fillColor('#FF9800');
                    }, Image);
                });
            }
            else /**
             * 获取当前文件名
             */ {
                this.ifElseBranchUpdateFunction(4, () => {
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 获取当前文件名
     */
    private getCurrentFileName(): string {
        if (this.task.currentFileIndex < this.task.files.length) {
            return this.task.files[this.task.currentFileIndex].fileName;
        }
        return '';
    }
    /**
     * 获取进度百分比
     */
    private getProgressPercent(): number {
        if (this.task.totalSize === 0) {
            return 0;
        }
        return Math.floor((this.task.transferredSize / this.task.totalSize) * 100);
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
     * 格式化传输速度
     */
    private formatSpeed(speed: number): string {
        if (speed < 1024) {
            return `${speed.toFixed(0)} B/s`;
        }
        else if (speed < 1024 * 1024) {
            return `${(speed / 1024).toFixed(2)} KB/s`;
        }
        else {
            return `${(speed / 1024 / 1024).toFixed(2)} MB/s`;
        }
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
    rerender() {
        this.updateDirtyElements();
    }
}

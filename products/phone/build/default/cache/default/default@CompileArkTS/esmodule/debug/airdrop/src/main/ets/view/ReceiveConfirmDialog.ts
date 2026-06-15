if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ReceiveConfirmDialog_Params {
    controller?: CustomDialogController;
    isShow?: boolean;
    request?: ReceiveRequest;
    /** 接受事件 */
    onAccept?: () => void;
    /** 拒绝事件 */
    onReject?: () => void;
    remainingTime?: number;
    timer?: number;
}
import type { ReceiveRequest } from '../viewmodel/TransferModels';
export class ReceiveConfirmDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.__isShow = new SynchedPropertySimpleTwoWayPU(params.isShow, this, "isShow");
        this.__request = new SynchedPropertyObjectOneWayPU(params.request, this, "request");
        this.onAccept = undefined;
        this.onReject = undefined;
        this.__remainingTime = new ObservedPropertySimplePU(30, this, "remainingTime");
        this.timer = -1;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ReceiveConfirmDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.onAccept !== undefined) {
            this.onAccept = params.onAccept;
        }
        if (params.onReject !== undefined) {
            this.onReject = params.onReject;
        }
        if (params.remainingTime !== undefined) {
            this.remainingTime = params.remainingTime;
        }
        if (params.timer !== undefined) {
            this.timer = params.timer;
        }
    }
    updateStateVars(params: ReceiveConfirmDialog_Params) {
        this.__request.reset(params.request);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__isShow.purgeDependencyOnElmtId(rmElmtId);
        this.__request.purgeDependencyOnElmtId(rmElmtId);
        this.__remainingTime.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__isShow.aboutToBeDeleted();
        this.__request.aboutToBeDeleted();
        this.__remainingTime.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    /** 是否显示 */
    private __isShow: SynchedPropertySimpleTwoWayPU<boolean>;
    get isShow() {
        return this.__isShow.get();
    }
    set isShow(newValue: boolean) {
        this.__isShow.set(newValue);
    }
    /** 接收请求 */
    private __request: SynchedPropertySimpleOneWayPU<ReceiveRequest>;
    get request() {
        return this.__request.get();
    }
    set request(newValue: ReceiveRequest) {
        this.__request.set(newValue);
    }
    /** 接受事件 */
    private onAccept?: () => void;
    /** 拒绝事件 */
    private onReject?: () => void;
    private __remainingTime: ObservedPropertySimplePU<number>;
    get remainingTime() {
        return this.__remainingTime.get();
    }
    set remainingTime(newValue: number) {
        this.__remainingTime.set(newValue);
    }
    private timer: number;
    aboutToAppear() {
        this.remainingTime = Math.floor(this.request.timeout / 1000);
        this.startTimer();
    }
    aboutToDisappear() {
        this.stopTimer();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.backgroundColor('#1a1a2e');
            Column.borderRadius(16);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题
            Row.create();
            // 标题
            Row.width('100%');
            // 标题
            Row.justifyContent(FlexAlign.Center);
            // 标题
            Row.padding({ top: 20, bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995358, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(24);
            Image.height(24);
            Image.fillColor('#4CAF50');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('文件接收请求');
            Text.fontSize(18);
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor('#FFFFFF');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 标题
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 发送方信息
            Column.create();
            // 发送方信息
            Column.width('100%');
            // 发送方信息
            Column.padding({ left: 20, right: 20, bottom: 16 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('发送方:');
            Text.fontSize(14);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.request.senderDeviceName);
            Text.fontSize(14);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Medium);
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.color('#2a2a4a');
            Divider.margin({ top: 12, bottom: 12 });
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件信息
            Row.create();
            // 文件信息
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(40);
            Image.height(40);
            Image.fillColor('#4CAF50');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.layoutWeight(1);
            Column.alignItems(HorizontalAlign.Start);
            Column.margin({ left: 12 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.request.fileName);
            Text.fontSize(16);
            Text.fontColor('#FFFFFF');
            Text.fontWeight(FontWeight.Medium);
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatSize(this.request.fileSize));
            Text.fontSize(12);
            Text.fontColor('#999999');
            Text.margin({ top: 4 });
        }, Text);
        Text.pop();
        Column.pop();
        // 文件信息
        Row.pop();
        // 发送方信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 超时提示
            Row.create();
            // 超时提示
            Row.width('100%');
            // 超时提示
            Row.justifyContent(FlexAlign.Center);
            // 超时提示
            Row.padding({ bottom: 16 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 150995365, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
            Image.width(16);
            Image.height(16);
            Image.fillColor('#FF9800');
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(`将在 ${this.remainingTime} 秒后自动拒绝`);
            Text.fontSize(12);
            Text.fontColor('#FF9800');
            Text.margin({ left: 8 });
        }, Text);
        Text.pop();
        // 超时提示
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
            // 操作按钮
            Row.width('100%');
            // 操作按钮
            Row.padding({ left: 20, right: 20, bottom: 20 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('拒绝');
            Button.fontSize(16);
            Button.height(44);
            Button.backgroundColor('#2a2a4a');
            Button.fontColor('#FFFFFF');
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.reject();
            });
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.width(16);
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('接收');
            Button.fontSize(16);
            Button.height(44);
            Button.backgroundColor('#4CAF50');
            Button.fontColor('#FFFFFF');
            Button.layoutWeight(1);
            Button.onClick(() => {
                this.accept();
            });
        }, Button);
        Button.pop();
        // 操作按钮
        Row.pop();
        Column.pop();
    }
    /**
     * 启动定时器
     */
    private startTimer(): void {
        this.timer = setInterval(() => {
            this.remainingTime--;
            if (this.remainingTime <= 0) {
                this.stopTimer();
                this.reject();
            }
        }, 1000);
    }
    /**
     * 停止定时器
     */
    private stopTimer(): void {
        if (this.timer !== -1) {
            clearInterval(this.timer);
            this.timer = -1;
        }
    }
    /**
     * 接受
     */
    private accept(): void {
        this.stopTimer();
        this.isShow = false;
        this.onAccept?.();
    }
    /**
     * 拒绝
     */
    private reject(): void {
        this.stopTimer();
        this.isShow = false;
        this.onReject?.();
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

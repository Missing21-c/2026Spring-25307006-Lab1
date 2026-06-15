if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface LocalFileListComponent_Params {
    localFiles?: LocalFile[];
    currentPlayingPath?: string;
    localMusicService?: LocalMusicService;
    filePickerService?: FilePickerService;
    context?: common.UIAbilityContext | null;
    airDropViewModel?: AirDropViewModel;
}
import { LocalMusicService, FilePickerService } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import type { LocalFile, FileObject } from "@bundle:com.huawei.music.musichome/watch@mediacommon/index";
import { FilePickerComponent, ButtonStyle } from "@bundle:com.huawei.music.musichome/watch@musiclist/ets/components/FilePickerComponent";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
import { AirDropViewModel } from "@bundle:com.huawei.music.musichome/watch@airdrop/Index";
export class LocalFileListComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__localFiles = new ObservedPropertyObjectPU([], this, "localFiles");
        this.__currentPlayingPath = this.createStorageLink('currentPlayingPath', '', "currentPlayingPath");
        this.localMusicService = LocalMusicService.getInstance();
        this.filePickerService = FilePickerService.getInstance();
        this.context = null;
        this.airDropViewModel = AirDropViewModel.getInstance();
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: LocalFileListComponent_Params) {
        if (params.localFiles !== undefined) {
            this.localFiles = params.localFiles;
        }
        if (params.localMusicService !== undefined) {
            this.localMusicService = params.localMusicService;
        }
        if (params.filePickerService !== undefined) {
            this.filePickerService = params.filePickerService;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
        if (params.airDropViewModel !== undefined) {
            this.airDropViewModel = params.airDropViewModel;
        }
    }
    updateStateVars(params: LocalFileListComponent_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__localFiles.purgeDependencyOnElmtId(rmElmtId);
        this.__currentPlayingPath.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__localFiles.aboutToBeDeleted();
        this.__currentPlayingPath.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __localFiles: ObservedPropertyObjectPU<LocalFile[]>;
    get localFiles() {
        return this.__localFiles.get();
    }
    set localFiles(newValue: LocalFile[]) {
        this.__localFiles.set(newValue);
    }
    private __currentPlayingPath: ObservedPropertyAbstractPU<string>;
    get currentPlayingPath() {
        return this.__currentPlayingPath.get();
    }
    set currentPlayingPath(newValue: string) {
        this.__currentPlayingPath.set(newValue);
    }
    private localMusicService: LocalMusicService;
    private filePickerService: FilePickerService;
    private context: common.UIAbilityContext | null;
    private airDropViewModel: AirDropViewModel;
    aboutToAppear() {
        const context = AppStorage.get<common.UIAbilityContext>('context');
        this.context = context ?? null;
        this.loadRecentFiles();
        this.setupFileReceiver();
    }
    /**
     * 设置文件接收监听
     */
    private setupFileReceiver(): void {
        this.airDropViewModel.setupFileReceiver(async (fileName: string, fileData: ArrayBuffer) => {
            try {
                // 保存接收的文件
                const localPath = await this.airDropViewModel.saveReceivedFile(fileName, fileData);
                // 添加到本地音乐列表
                const localFile: LocalFile = {
                    id: Date.now().toString(),
                    name: fileName,
                    path: localPath,
                    size: fileData.byteLength,
                    duration: 0,
                    addTime: Date.now(),
                    lastPlayTime: Date.now()
                };
                await this.localMusicService.addToRecentList(localFile);
                // 重新加载列表
                await this.loadRecentFiles();
                // 显示提示
                this.getUIContext().getPromptAction().showToast({
                    message: `已接收: ${fileName}`,
                    duration: 2000
                });
            }
            catch (error) {
                console.error('处理接收文件失败:', error);
            }
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding(16);
            Column.backgroundColor('#1a1a2e');
            Column.borderRadius(12);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 标题栏
            Row.create();
            // 标题栏
            Row.width('100%');
            // 标题栏
            Row.margin({ bottom: 12 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('本地文件');
            Text.fontSize(18);
            Text.fontColor(Color.White);
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.localFiles.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(`共${this.localFiles.length}个`);
                        Text.fontSize(14);
                        Text.fontColor('#999999');
                        Text.margin({ right: 12 });
                    }, Text);
                    Text.pop();
                });
            }
            // 文件选择按钮
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new 
                    // 文件选择按钮
                    FilePickerComponent(this, { buttonStyle: ButtonStyle.Compact }, undefined, elmtId, () => { }, { page: "features/musiclist/src/main/ets/components/LocalFileListComponent.ets", line: 97, col: 9 });
                    ViewPU.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            buttonStyle: ButtonStyle.Compact
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        buttonStyle: ButtonStyle.Compact
                    });
                }
            }, { name: "FilePickerComponent" });
        }
        // 标题栏
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // 文件列表
            if (this.localFiles.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.EmptyView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.FileListView.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    /**
     * 空状态视图
     */
    EmptyView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.padding({ top: 32, bottom: 32 });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 184549632, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            Image.width(64);
            Image.height(64);
            Image.opacity(0.4);
            Image.margin({ bottom: 16 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('暂无本地文件');
            Text.fontSize(16);
            Text.fontColor('#cccccc');
            Text.margin({ bottom: 8 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('点击右上角"选择文件"按钮添加');
            Text.fontSize(14);
            Text.fontColor('#999999');
            Text.margin({ bottom: 16 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 快速操作按钮
            Button.createWithLabel('立即添加');
            // 快速操作按钮
            Button.fontSize(14);
            // 快速操作按钮
            Button.fontColor(Color.White);
            // 快速操作按钮
            Button.backgroundColor('#4CAF50');
            // 快速操作按钮
            Button.borderRadius(20);
            // 快速操作按钮
            Button.height(36);
            // 快速操作按钮
            Button.padding({ left: 24, right: 24 });
            // 快速操作按钮
            Button.onClick(() => {
                this.triggerFilePick();
            });
        }, Button);
        // 快速操作按钮
        Button.pop();
        Column.pop();
    }
    /**
     * 文件列表视图
     */
    FileListView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.width('100%');
            List.layoutWeight(1);
            List.scrollBar(BarState.Off);
            List.divider({
                color: '#333333',
                strokeWidth: 1,
                startMargin: 0,
                endMargin: 0
            });
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
            this.forEachUpdateFunction(elmtId, this.localFiles, forEachItemGenFunction, (file: LocalFile) => file.id, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    /**
     * 文件项视图
     */
    FileItem(file: LocalFile, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.padding({ top: 12, bottom: 12 });
            Row.backgroundColor(this.currentPlayingPath === file.path ? '#2a2a4a' : 'transparent');
            Row.borderRadius(8);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件图标
            Image.create({ "id": 184549632, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            // 文件图标
            Image.width(40);
            // 文件图标
            Image.height(40);
            // 文件图标
            Image.borderRadius(4);
            // 文件图标
            Image.margin({ right: 12 });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 文件信息
            Column.create();
            // 文件信息
            Column.alignItems(HorizontalAlign.Start);
            // 文件信息
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(file.name);
            Text.fontSize(14);
            Text.fontColor(Color.White);
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.margin({ top: 4 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.formatTime(file.lastPlayTime));
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
            Text.create(this.formatFileSize(file.size));
            Text.fontSize(12);
            Text.fontColor('#999999');
        }, Text);
        Text.pop();
        Row.pop();
        // 文件信息
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 操作按钮
            Row.create();
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 播放按钮
            Image.create(this.currentPlayingPath === file.path ? { "id": 184549682, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" } : { "id": 184549683, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            // 播放按钮
            Image.width(24);
            // 播放按钮
            Image.height(24);
            // 播放按钮
            Image.onClick(() => {
                this.playFile(file);
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 删除按钮
            Image.create({ "id": 184549654, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "watch" });
            // 删除按钮
            Image.width(20);
            // 删除按钮
            Image.height(20);
            // 删除按钮
            Image.margin({ left: 12 });
            // 删除按钮
            Image.onClick(() => {
                this.showDeleteDialog(file);
            });
        }, Image);
        // 操作按钮
        Row.pop();
        Row.pop();
    }
    /**
     * 加载最近文件列表
     */
    private async loadRecentFiles(): Promise<void> {
        this.localFiles = await this.localMusicService.getRecentList();
    }
    /**
     * 播放文件
     */
    private async playFile(file: LocalFile): Promise<void> {
        try {
            // 更新当前播放路径
            this.currentPlayingPath = file.path;
            // 更新最后播放时间
            await this.localMusicService.updateLastPlayTime(file.id);
            // 重新加载列表以更新排序
            await this.loadRecentFiles();
            // 显示提示
            this.getUIContext().getPromptAction().showToast({
                message: `正在播放: ${file.name}`,
                duration: 2000
            });
            // TODO: 实际播放逻辑需要集成MediaService
            // const mediaService = MediaService.getInstance();
            // await mediaService.playLocalFile(file.path);
        }
        catch (error) {
            console.error('播放文件失败:', error);
            this.getUIContext().getPromptAction().showToast({
                message: '播放失败',
                duration: 2000
            });
        }
    }
    /**
     * 显示删除确认对话框
     */
    private showDeleteDialog(file: LocalFile): void {
        this.getUIContext().getPromptAction().showDialog({
            title: '确认删除',
            message: `确定要从列表中移除 "${file.name}" 吗？`,
            buttons: [
                { text: '取消', color: '#666666' },
                { text: '删除', color: '#FF4444' }
            ]
        }, async (error, data) => {
            if (data.index === 1) {
                await this.removeFile(file);
            }
        });
    }
    /**
     * 移除文件
     */
    private async removeFile(file: LocalFile): Promise<void> {
        try {
            await this.localMusicService.removeFile(file);
            await this.loadRecentFiles();
            this.getUIContext().getPromptAction().showToast({
                message: '已从列表中移除',
                duration: 2000
            });
        }
        catch (error) {
            console.error('移除文件失败:', error);
            this.getUIContext().getPromptAction().showToast({
                message: '移除失败',
                duration: 2000
            });
        }
    }
    /**
     * 格式化时间戳
     */
    private formatTime(timestamp: number): string {
        const date = new Date(timestamp);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${month}/${day} ${hours}:${minutes.toString().padStart(2, '0')}`;
    }
    /**
     * 格式化文件大小
     */
    private formatFileSize(size: number): string {
        if (size < 1024) {
            return size + ' B';
        }
        else if (size < 1024 * 1024) {
            return (size / 1024).toFixed(1) + ' KB';
        }
        else if (size < 1024 * 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(1) + ' MB';
        }
        else {
            return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
        }
    }
    /**
     * 触发文件选择
     */
    private async triggerFilePick(): Promise<void> {
        try {
            // 检查权限
            const hasPermission = await this.checkPermission();
            if (!hasPermission) {
                const granted = await this.requestPermission();
                if (!granted) {
                    this.showPermissionDeniedDialog();
                    return;
                }
            }
            // 选择文件
            const file: FileObject | null = await this.filePickerService.selectMP3File();
            if (!file) {
                this.getUIContext().getPromptAction().showToast({
                    message: '未选择文件',
                    duration: 2000
                });
                return;
            }
            // 添加到最近列表
            const localFile: LocalFile = {
                id: Date.now().toString(),
                name: file.name,
                path: file.uri,
                size: file.size,
                duration: 0,
                addTime: Date.now(),
                lastPlayTime: Date.now()
            };
            await this.localMusicService.addToRecentList(localFile);
            // 重新加载列表
            await this.loadRecentFiles();
            // 显示成功提示
            this.getUIContext().getPromptAction().showToast({
                message: `已添加: ${file.name}`,
                duration: 2000
            });
        }
        catch (error) {
            console.error('文件选择失败:', error);
            this.getUIContext().getPromptAction().showToast({
                message: '文件选择失败，请重试',
                duration: 2000
            });
        }
    }
    /**
     * 检查文件读取权限
     */
    private async checkPermission(): Promise<boolean> {
        try {
            const atManager = abilityAccessCtrl.createAtManager();
            const context = this.context || AppStorage.get<common.UIAbilityContext>('context');
            if (!context) {
                return false;
            }
            const grantStatus = await atManager.verifyAccessToken(context.applicationInfo.accessTokenId, 'ohos.permission.READ_MEDIA');
            return grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
        }
        catch (error) {
            console.error('检查权限失败:', error);
            return false;
        }
    }
    /**
     * 请求文件读取权限
     */
    private async requestPermission(): Promise<boolean> {
        try {
            const context = this.context || AppStorage.get<common.UIAbilityContext>('context');
            if (!context) {
                return false;
            }
            const atManager = abilityAccessCtrl.createAtManager();
            const permissions: Permissions[] = ['ohos.permission.READ_MEDIA'];
            const result = await atManager.requestPermissionsFromUser(context, permissions);
            return result.authResults[0] === 0;
        }
        catch (error) {
            console.error('请求权限失败:', error);
            return false;
        }
    }
    /**
     * 显示权限拒绝对话框
     */
    private showPermissionDeniedDialog(): void {
        this.getUIContext().getPromptAction().showDialog({
            title: '权限不足',
            message: '需要文件读取权限才能选择本地音乐文件，请在设置中授予权限',
            buttons: [
                { text: '取消', color: '#666666' },
                { text: '去设置', color: '#4CAF50' }
            ]
        }, (error, data) => {
            if (data.index === 1) {
                this.getUIContext().getPromptAction().showToast({
                    message: '请在设置中授予权限',
                    duration: 2000
                });
            }
        });
    }
    rerender() {
        this.updateDirtyElements();
    }
}

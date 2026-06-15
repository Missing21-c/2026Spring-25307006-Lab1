if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface FilePickerComponent_Params {
    pageIndexInfos?: NavPathStack;
    buttonStyle?: ButtonStyle;
    filePickerService?: FilePickerService;
    localMusicService?: LocalMusicService;
    context?: common.UIAbilityContext | null;
}
import { FilePickerService, LocalMusicService, MediaService, SongItem } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { FileObject, LocalFile } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import abilityAccessCtrl from "@ohos:abilityAccessCtrl";
import type { Permissions } from "@ohos:abilityAccessCtrl";
import type common from "@ohos:app.ability.common";
/**
 * 按钮样式枚举
 * 用于控制FilePickerComponent的显示样式
 */
export enum ButtonStyle {
    Normal = // 常规样式（用于独立显示）
     0,
    Compact = 1 // 紧凑样式（用于标题栏）
}
export class FilePickerComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__buttonStyle = new SynchedPropertySimpleOneWayPU(params.buttonStyle, this, "buttonStyle");
        this.filePickerService = FilePickerService.getInstance();
        this.localMusicService = LocalMusicService.getInstance();
        this.context = null;
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: FilePickerComponent_Params) {
        if (params.buttonStyle === undefined) {
            this.__buttonStyle.set(ButtonStyle.Normal);
        }
        if (params.filePickerService !== undefined) {
            this.filePickerService = params.filePickerService;
        }
        if (params.localMusicService !== undefined) {
            this.localMusicService = params.localMusicService;
        }
        if (params.context !== undefined) {
            this.context = params.context;
        }
    }
    updateStateVars(params: FilePickerComponent_Params) {
        this.__buttonStyle.reset(params.buttonStyle);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__buttonStyle.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__pageIndexInfos.aboutToBeDeleted();
        this.__buttonStyle.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    private __buttonStyle: SynchedPropertySimpleOneWayPU<ButtonStyle>; // 按钮样式属性
    get buttonStyle() {
        return this.__buttonStyle.get();
    }
    set buttonStyle(newValue: ButtonStyle) {
        this.__buttonStyle.set(newValue);
    }
    private filePickerService: FilePickerService;
    private localMusicService: LocalMusicService;
    private context: common.UIAbilityContext | null;
    aboutToAppear() {
        const context = AppStorage.get<common.UIAbilityContext>('context');
        this.context = context ?? null;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.buttonStyle === ButtonStyle.Compact) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 紧凑样式（用于标题栏）
                        Row.create();
                        // 紧凑样式（用于标题栏）
                        Row.padding({ left: 12, right: 12, top: 6, bottom: 6 });
                        // 紧凑样式（用于标题栏）
                        Row.backgroundColor('#4CAF50');
                        // 紧凑样式（用于标题栏）
                        Row.borderRadius(16);
                        // 紧凑样式（用于标题栏）
                        Row.onClick(() => {
                            this.handleFilePick();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(20);
                        Image.height(20);
                        Image.margin({ right: 4 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('选择文件');
                        Text.fontSize(14);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                    // 紧凑样式（用于标题栏）
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 常规样式（用于独立显示）
                        Row.create();
                        // 常规样式（用于独立显示）
                        Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
                        // 常规样式（用于独立显示）
                        Row.backgroundColor('#4CAF50');
                        // 常规样式（用于独立显示）
                        Row.borderRadius(8);
                        // 常规样式（用于独立显示）
                        Row.onClick(() => {
                            this.handleFilePick();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 150995332, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(24);
                        Image.height(24);
                        Image.margin({ right: 8 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('选择本地文件');
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                    // 常规样式（用于独立显示）
                    Row.pop();
                });
            }
        }, If);
        If.pop();
    }
    /**
     * 处理文件选择
     */
    private async handleFilePick(): Promise<void> {
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
            // 播放文件
            await this.playFile(file.uri, file.name);
            // 显示成功提示
            this.getUIContext().getPromptAction().showToast({
                message: `已选择: ${file.name}`,
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
                // 打开设置页面
                // 实际应用中可以跳转到应用设置页面
                this.getUIContext().getPromptAction().showToast({
                    message: '请在设置中授予权限',
                    duration: 2000
                });
            }
        });
    }
    /**
     * 播放文件
     * @param uri 文件URI
     * @param name 文件名
     */
    private async playFile(uri: string, name: string): Promise<void> {
        try {
            // 使用MediaService播放本地文件
            const mediaService = MediaService.getInstance();
            // 创建本地歌曲信息
            const localSong = new SongItem();
            localSong.id = Date.now();
            localSong.title = name.replace('.mp3', '').replace('.MP3', '');
            localSong.singer = '本地文件';
            localSong.src = uri; // 使用URI作为资源路径
            // 播放
            // 注意：这里需要根据实际的MediaService实现进行调整
            // 可能需要添加专门处理本地文件的方法
            this.getUIContext().getPromptAction().showToast({
                message: `正在播放: ${name}`,
                duration: 2000
            });
        }
        catch (error) {
            console.error('播放文件失败:', error);
            this.getUIContext().getPromptAction().showToast({
                message: '播放失败，请重试',
                duration: 2000
            });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}

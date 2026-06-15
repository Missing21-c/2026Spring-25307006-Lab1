import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { DeviceInfo, MusicInfo, TransferProgress, AirDropRequest } from './AirDropModels';
import distributedDeviceManager from "@ohos:distributedDeviceManager";
import fs from "@ohos:file.fs";
import type common from "@ohos:app.ability.common";
const TAG = 'AirDropViewModel';
/**
 * 空投送业务逻辑
 */
export class AirDropViewModel {
    private static instance: AirDropViewModel;
    private devices: DeviceInfo[] = [];
    private currentProgress: TransferProgress | null = null;
    private dmInstance: distributedDeviceManager.DeviceManager | null = null;
    private context: common.UIAbilityContext | null = null;
    private constructor() { }
    public static getInstance(): AirDropViewModel {
        if (!AirDropViewModel.instance) {
            AirDropViewModel.instance = new AirDropViewModel();
        }
        return AirDropViewModel.instance;
    }
    /**
     * 初始化设备管理器
     */
    public async initialize(context: common.UIAbilityContext): Promise<void> {
        this.context = context;
        try {
            this.dmInstance = distributedDeviceManager.createDeviceManager('MusicHome');
            Logger.info(TAG, 'Device manager initialized');
        }
        catch (error) {
            Logger.error(TAG, `Init device manager failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 发现附近设备
     */
    public async discoverDevices(): Promise<DeviceInfo[]> {
        Logger.info(TAG, 'Start discovering devices');
        try {
            if (!this.dmInstance) {
                const context = AppStorage.get<common.UIAbilityContext>('context');
                if (context) {
                    await this.initialize(context);
                }
            }
            if (this.dmInstance) {
                // 使用真实的DeviceManager API
                const deviceList = await this.dmInstance.getAvailableDeviceList();
                const devices: DeviceInfo[] = [];
                for (let i = 0; i < deviceList.length; i++) {
                    const device = deviceList[i];
                    const deviceTypeNum = Number(device.deviceType);
                    devices.push({
                        deviceId: device.deviceId,
                        deviceName: device.deviceName,
                        deviceType: deviceTypeNum === 0 ? 'phone' :
                            deviceTypeNum === 1 ? 'tablet' :
                                deviceTypeNum === 2 ? 'watch' : 'unknown',
                        isOnline: true
                    });
                }
                this.devices = devices;
                Logger.info(TAG, `Found ${devices.length} devices`);
                return devices;
            }
            // 如果DeviceManager不可用，返回空列表
            Logger.warn(TAG, 'Device manager not available');
            return [];
        }
        catch (error) {
            Logger.error(TAG, `Discover devices failed: ${JSON.stringify(error)}`);
            return [];
        }
    }
    /**
     * 发送音乐信息
     */
    public async sendMusicInfo(deviceId: string, musicInfo: MusicInfo): Promise<boolean> {
        Logger.info(TAG, `Send music info to ${deviceId}: ${musicInfo.title}`);
        try {
            // 实际实现: 使用分布式数据同步或Socket发送
            const data = JSON.stringify(musicInfo);
            Logger.info(TAG, `Music info data: ${data}`);
            return true;
        }
        catch (error) {
            Logger.error(TAG, `Send music info failed: ${JSON.stringify(error)}`);
            return false;
        }
    }
    /**
     * 发送音乐文件
     */
    public async sendMusicFile(deviceId: string, filePath: string, onProgress?: (progress: TransferProgress) => void): Promise<boolean> {
        Logger.info(TAG, `Send music file to ${deviceId}: ${filePath}`);
        try {
            // 读取文件
            const file = await fs.open(filePath, fs.OpenMode.READ_ONLY);
            const stat = await fs.stat(file.fd);
            const totalSize = stat.size;
            const buffer = new ArrayBuffer(totalSize);
            await fs.read(file.fd, buffer);
            await fs.close(file.fd);
            const fileName = filePath.split('/').pop() || 'music.mp3';
            const transferId = `transfer_${Date.now()}`;
            // 模拟文件传输（实际应使用Socket或分布式文件系统）
            // 这里仅演示进度更新
            for (let i = 0; i <= 100; i += 10) {
                const progress: TransferProgress = {
                    transferId: transferId,
                    fileName: fileName,
                    totalSize: totalSize,
                    transferredSize: totalSize * i / 100,
                    percent: i,
                    status: i < 100 ? 'transferring' : 'completed'
                };
                this.currentProgress = progress;
                onProgress?.(progress);
                await new Promise<void>(resolve => setTimeout(resolve, 100));
            }
            Logger.info(TAG, 'File transfer completed');
            return true;
        }
        catch (error) {
            Logger.error(TAG, `Send music file failed: ${JSON.stringify(error)}`);
            return false;
        }
    }
    /**
     * 执行投送（信息+文件）
     */
    public async doAirDrop(request: AirDropRequest, onProgress?: (progress: TransferProgress) => void): Promise<boolean> {
        Logger.info(TAG, `Start air drop to ${request.targetDeviceId}`);
        // 1. 发送音乐信息
        const infoResult = await this.sendMusicInfo(request.targetDeviceId, request.musicInfo);
        if (!infoResult) {
            return false;
        }
        // 2. 如果需要发送文件
        if (request.sendFile && request.musicInfo.localFilePath) {
            const fileResult = await this.sendMusicFile(request.targetDeviceId, request.musicInfo.localFilePath, onProgress);
            return fileResult;
        }
        return true;
    }
    /**
     * 获取当前传输进度
     */
    public getCurrentProgress(): TransferProgress | null {
        return this.currentProgress;
    }
    /**
     * 取消传输
     */
    public cancelTransfer(): void {
        Logger.info(TAG, 'Cancel transfer');
        this.currentProgress = null;
    }
    /**
     * 设置文件接收监听
     */
    public setupFileReceiver(onFileReceived: (fileName: string, fileData: ArrayBuffer) => void): void {
        Logger.info(TAG, 'Setup file receiver');
        // 实际应使用Socket监听或分布式数据监听
        // 这里仅作为接口预留
        Logger.info(TAG, 'File receiver setup completed');
    }
    /**
     * 保存接收的文件
     */
    public async saveReceivedFile(fileName: string, fileData: ArrayBuffer): Promise<string> {
        Logger.info(TAG, `Save received file: ${fileName}`);
        try {
            // 保存到本地文件目录
            const context = this.context || AppStorage.get<common.UIAbilityContext>('context');
            if (!context) {
                throw new Error('Context not available');
            }
            const localPath = `${context.filesDir}/${fileName}`;
            const file = await fs.open(localPath, fs.OpenMode.CREATE | fs.OpenMode.WRITE_ONLY);
            await fs.write(file.fd, fileData);
            await fs.close(file.fd);
            Logger.info(TAG, `File saved to: ${localPath}`);
            return localPath;
        }
        catch (error) {
            Logger.error(TAG, `Save file failed: ${JSON.stringify(error)}`);
            throw new Error('Save file failed');
        }
    }
}

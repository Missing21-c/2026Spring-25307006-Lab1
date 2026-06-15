/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Logger } from 'mediacommon';
import { AirDropViewModel } from './AirDropViewModel';
import { TransferHistoryService } from './TransferHistoryService';
import { FileSelectionService } from './FileSelectionService';
import {
  ExtendedDeviceInfo,
  PendingTransferFile,
  TransferTask,
  ReceiveRequest,
  TransferHistoryRecord
} from './TransferModels';
import { DeviceInfo } from './AirDropModels';
import common from '@ohos.app.ability.common';

const TAG = 'DeviceTransferViewModel';
const DEVICE_CACHE_DURATION = 30000; // 30秒设备缓存

/**
 * 设备传输视图模型事件接口
 */
export interface DeviceTransferViewModelEvents {
  /** 设备列表更新事件 */
  onDeviceListUpdated?: (devices: ExtendedDeviceInfo[]) => void;
  /** 传输进度更新事件 */
  onTransferProgress?: (task: TransferTask) => void;
  /** 传输完成事件 */
  onTransferComplete?: (success: boolean, task: TransferTask) => void;
  /** 接收请求事件 */
  onReceiveRequest?: (request: ReceiveRequest) => void;
  /** 错误事件 */
  onError?: (error: Error) => void;
}

/**
 * 设备传输视图模型
 * 协调设备发现、文件选择、传输执行
 */
export class DeviceTransferViewModel {
  private static instance: DeviceTransferViewModel;
  private airDropViewModel: AirDropViewModel;
  private historyService: TransferHistoryService;
  private fileSelectionService: FileSelectionService;

  private currentTask: TransferTask | null = null;
  private deviceCache: ExtendedDeviceInfo[] = [];
  private lastScanTime: number = 0;
  private events: DeviceTransferViewModelEvents = {};
  private isTransferring: boolean = false;

  private constructor() {
    this.airDropViewModel = AirDropViewModel.getInstance();
    this.historyService = TransferHistoryService.getInstance();
    this.fileSelectionService = FileSelectionService.getInstance();
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): DeviceTransferViewModel {
    if (!DeviceTransferViewModel.instance) {
      DeviceTransferViewModel.instance = new DeviceTransferViewModel();
    }
    return DeviceTransferViewModel.instance;
  }

  /**
   * 设置事件监听器
   */
  public setEvents(events: DeviceTransferViewModelEvents): void {
    this.events = events;
  }

  /**
   * 扫描附近设备
   */
  public async scanDevices(forceRefresh: boolean = false): Promise<ExtendedDeviceInfo[]> {
    try {
      // 检查缓存是否有效
      const now = Date.now();
      if (!forceRefresh && this.deviceCache.length > 0 && (now - this.lastScanTime) < DEVICE_CACHE_DURATION) {
        Logger.info(TAG, 'Using cached device list');
        return this.deviceCache;
      }

      Logger.info(TAG, 'Scanning devices...');
      const devices = await this.airDropViewModel.discoverDevices();

      // 转换为扩展设备信息
      const extendedDevices: ExtendedDeviceInfo[] = devices.map(device => {
        const extDevice: ExtendedDeviceInfo = {
          deviceId: device.deviceId,
          deviceName: device.deviceName,
          deviceType: device.deviceType,
          isOnline: device.isOnline,
          lastDiscoveredTime: now
        };
        return extDevice;
      });

      this.deviceCache = extendedDevices;
      this.lastScanTime = now;

      // 触发事件
      this.events.onDeviceListUpdated?.(extendedDevices);

      Logger.info(TAG, `Found ${extendedDevices.length} devices`);
      return extendedDevices;
    } catch (error) {
      Logger.error(TAG, `Scan devices failed: ${JSON.stringify(error)}`);
      this.events.onError?.(new Error(`扫描设备失败: ${JSON.stringify(error)}`));
      return [];
    }
  }

  /**
   * 创建传输任务
   */
  public async createTransferTask(
    targetDevice: DeviceInfo,
    files: PendingTransferFile[]
  ): Promise<TransferTask> {
    const taskId = `task_${Date.now()}_${Math.random()}`;
    const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);

    const task: TransferTask = {
      taskId: taskId,
      targetDeviceId: targetDevice.deviceId,
      targetDeviceName: targetDevice.deviceName,
      files: files,
      totalSize: totalSize,
      transferredSize: 0,
      status: 'pending',
      currentFileIndex: 0,
      speed: 0
    };

    Logger.info(TAG, `Created transfer task: ${taskId}, files: ${files.length}, size: ${totalSize}`);
    return task;
  }

  /**
   * 执行传输任务
   */
  public async executeTask(
    task: TransferTask,
    onProgress?: (task: TransferTask) => void
  ): Promise<boolean> {
    if (this.isTransferring) {
      Logger.error(TAG, 'Another transfer is in progress');
      return false;
    }

    this.isTransferring = true;
    this.currentTask = task;
    task.status = 'transferring';
    task.startTime = Date.now();

    try {
      Logger.info(TAG, `Starting transfer task: ${task.taskId}`);

      // 逐个传输文件
      for (let i = 0; i < task.files.length; i++) {
        // 检查是否已取消
        if (this.currentTask === null || this.currentTask.status === 'cancelled') {
          task.status = 'cancelled';
          Logger.info(TAG, 'Transfer cancelled');
          break;
        }

        task.currentFileIndex = i;
        const file = task.files[i];

        Logger.info(TAG, `Transferring file ${i + 1}/${task.files.length}: ${file.fileName}`);

        // 调用AirDropViewModel传输文件
        const success = await this.airDropViewModel.sendMusicFile(
          task.targetDeviceId,
          file.filePath,
          (progress) => {
            // 更新任务进度
            task.transferredSize = task.files.slice(0, i).reduce((sum, f) => sum + f.fileSize, 0) + progress.transferredSize;
            task.speed = progress.transferredSize > 0 ? progress.transferredSize / ((Date.now() - task.startTime!) / 1000) : 0;

            // 触发进度回调
            onProgress?.(task);
            this.events.onTransferProgress?.(task);
          }
        );

        if (!success) {
          task.status = 'failed';
          task.errorMessage = `文件传输失败: ${file.fileName}`;
          Logger.error(TAG, `Transfer failed: ${file.fileName}`);
          break;
        }
      }

      // 检查是否全部完成
      if (task.status === 'transferring') {
        task.status = 'completed';
        task.endTime = Date.now();
        task.transferredSize = task.totalSize;
        Logger.info(TAG, 'Transfer task completed');
      }

      // 保存历史记录
      await this.saveTransferHistory(task);

      // 触发完成事件
      const success = task.status === 'completed';
      this.events.onTransferComplete?.(success, task);

      return success;
    } catch (error) {
      task.status = 'failed';
      task.errorMessage = `传输异常: ${JSON.stringify(error)}`;
      Logger.error(TAG, `Execute task failed: ${JSON.stringify(error)}`);

      await this.saveTransferHistory(task);
      this.events.onTransferComplete?.(false, task);
      this.events.onError?.(new Error(`传输失败: ${JSON.stringify(error)}`));

      return false;
    } finally {
      this.isTransferring = false;
      this.currentTask = null;
    }
  }

  /**
   * 保存传输历史
   */
  private async saveTransferHistory(task: TransferTask): Promise<void> {
    for (const file of task.files) {
      const record: TransferHistoryRecord = {
        recordId: `record_${Date.now()}_${Math.random()}`,
        fileName: file.fileName,
        fileSize: file.fileSize,
        direction: 'send',
        peerDeviceId: task.targetDeviceId,
        peerDeviceName: task.targetDeviceName,
        status: task.status === 'completed' ? 'completed' : 'failed',
        transferTime: task.startTime || Date.now(),
        duration: (task.endTime || Date.now()) - (task.startTime || Date.now()),
        errorMessage: task.errorMessage
      };

      await this.historyService.saveRecord(record);
    }
  }

  /**
   * 取消传输任务
   */
  public async cancelTask(): Promise<void> {
    if (this.currentTask) {
      this.currentTask.status = 'cancelled';
      this.airDropViewModel.cancelTransfer();
      Logger.info(TAG, 'Transfer task cancelled');
    }
  }

  /**
   * 重试失败的传输
   */
  public async retryFailed(): Promise<boolean> {
    if (!this.currentTask || this.currentTask.status !== 'failed') {
      Logger.error(TAG, 'No failed task to retry');
      return false;
    }

    Logger.info(TAG, 'Retrying failed transfer');
    this.currentTask.status = 'pending';
    this.currentTask.errorMessage = undefined;
    return await this.executeTask(this.currentTask);
  }

  /**
   * 设置接收监听
   */
  public setupReceiveListener(
    onRequest: (request: ReceiveRequest) => void,
    onReceive: (file: string, data: ArrayBuffer) => void
  ): void {
    Logger.info(TAG, 'Setting up receive listener');

    // 设置文件接收监听
    this.airDropViewModel.setupFileReceiver((fileName, fileData) => {
      Logger.info(TAG, `Received file: ${fileName}`);
      onReceive(fileName, fileData);
    });

    // 监听接收请求（实际应通过Socket或分布式数据监听）
    // 这里预留接口
    Logger.info(TAG, 'Receive listener setup completed');
  }

  /**
   * 处理接收请求
   */
  public async handleReceiveRequest(
    request: ReceiveRequest,
    accept: boolean
  ): Promise<string | null> {
    if (!accept) {
      Logger.info(TAG, `Rejected receive request: ${request.requestId}`);
      // 通知发送方（实际应通过Socket发送拒绝消息）
      return null;
    }

    Logger.info(TAG, `Accepting receive request: ${request.requestId}`);
    // 实际接收逻辑在setupReceiveListener中处理
    return null;
  }

  /**
   * 获取当前传输任务
   */
  public getCurrentTask(): TransferTask | null {
    return this.currentTask;
  }

  /**
   * 是否正在传输
   */
  public isTransferringInProgress(): boolean {
    return this.isTransferring;
  }

  /**
   * 获取缓存的设备列表
   */
  public getCachedDevices(): ExtendedDeviceInfo[] {
    return this.deviceCache;
  }
}

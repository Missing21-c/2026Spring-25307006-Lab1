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

import { DeviceListView } from './DeviceListView';
import { FilePickerPanel } from './FilePickerPanel';
import { TransferProgressView } from './TransferProgressView';
import { TransferHistoryPage } from './TransferHistoryPage';
import { DeviceTransferViewModel } from '../viewmodel/DeviceTransferViewModel';
import { NotificationService } from '../viewmodel/NotificationService';
import {
  ExtendedDeviceInfo,
  PendingTransferFile,
  TransferTask
} from '../viewmodel/TransferModels';

/**
 * 步骤项接口
 */
interface StepItem {
  step: string;
  label: string;
  icon: Resource;
}

@Component
export struct DeviceTransferPage {
  /** 是否显示页面 */
  @Link isShow: boolean;
  /** 传输完成回调 */
  onComplete?: (success: boolean, files: string[]) => void;

  @State deviceList: ExtendedDeviceInfo[] = [];
  @State selectedDevice: ExtendedDeviceInfo | null = null;
  @State selectedFiles: PendingTransferFile[] = [];
  @State currentTask: TransferTask | null = null;
  @State isScanning: boolean = false;
  @State isTransferring: boolean = false;
  @State showFilePicker: boolean = false;
  @State showHistory: boolean = false;
  @State currentStep: 'device' | 'file' | 'transfer' = 'device';

  private transferViewModel: DeviceTransferViewModel = DeviceTransferViewModel.getInstance();
  private notificationService: NotificationService = NotificationService.getInstance();

  aboutToAppear() {
    this.initialize();
    this.scanDevices();
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Image($r('app.media.ic_public_arrow_left'))
          .width(24)
          .height(24)
          .fillColor('#FFFFFF')
          .onClick(() => {
            this.closePage();
          })

        Text('设备传输')
          .fontSize(20)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .margin({ left: 12 })

        // 历史按钮
        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.ic_public_time'))
            .width(20)
            .height(20)
            .fillColor('#FFFFFF')
        }
        .width(36)
        .height(36)
        .backgroundColor('#2a2a4a')
        .onClick(() => {
          this.showHistory = true;
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // 步骤指示器
      this.StepIndicator()

      // 内容区域
      Column() {
        if (this.currentStep === 'device') {
          // 设备选择步骤
          DeviceListView({
            devices: this.deviceList,
            selectedDevice: $selectedDevice,
            isLoading: this.isScanning,
            onRefresh: () => {
              this.scanDevices();
            }
          })
        } else if (this.currentStep === 'file') {
          // 文件选择步骤
          FilePickerPanel({
            isShow: $showFilePicker,
            selectedFiles: $selectedFiles
          })
        } else if (this.currentStep === 'transfer') {
          // 传输进度步骤
          if (this.currentTask) {
            TransferProgressView({
              task: this.currentTask,
              onCancel: () => {
                this.cancelTransfer();
              },
              onPauseOrResume: () => {
                this.retryTransfer();
              }
            })
          }
        }
      }
      .width('100%')
      .layoutWeight(1)

      // 底部操作栏
      this.ActionBar()
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#0d0d1a')
    .bindSheet($$this.showHistory, this.HistorySheet(), {
      height: '80%',
      backgroundColor: '#1a1a2e',
      dragBar: true
    })
  }

  /**
   * 步骤指示器
   */
  @Builder
  StepIndicator() {
    Row() {
      ForEach([
        { step: 'device', label: '选择设备', icon: $r('app.media.ic_device_phone') },
        { step: 'file', label: '选择文件', icon: $r('app.media.ic_music_list') },
        { step: 'transfer', label: '传输中', icon: $r('app.media.ic_public_send') }
      ] as StepItem[], (item: StepItem) => {
        Column() {
          Row() {
            if (this.getStepIndex(item.step) < this.getStepIndex(this.currentStep)) {
              // 已完成步骤
              Image($r('app.media.ic_public_ok'))
                .width(24)
                .height(24)
                .fillColor('#4CAF50')
            } else if (item.step === this.currentStep) {
              // 当前步骤
              Image(item.icon)
                .width(24)
                .height(24)
                .fillColor('#4CAF50')
            } else {
              // 未完成步骤
              Image(item.icon)
                .width(24)
                .height(24)
                .fillColor('#666666')
            }
          }
          .width(40)
          .height(40)
          .borderRadius(20)
          .backgroundColor(item.step === this.currentStep ? '#2a2a4a' : 'transparent')
          .justifyContent(FlexAlign.Center)

          Text(item.label)
            .fontSize(12)
            .fontColor(item.step === this.currentStep ? '#4CAF50' : '#999999')
            .margin({ top: 4 })
        }
        .layoutWeight(1)

        if (item.step !== 'transfer') {
          Divider()
            .width(40)
            .color(this.getStepIndex(item.step) < this.getStepIndex(this.currentStep) ? '#4CAF50' : '#2a2a4a')
            .strokeWidth(2)
        }
      })
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
  }

  /**
   * 底部操作栏
   */
  @Builder
  ActionBar() {
    Row() {
      if (this.currentStep === 'device') {
        // 设备选择步骤的操作按钮
        Button('下一步')
          .fontSize(16)
          .height(44)
          .backgroundColor(this.selectedDevice ? '#4CAF50' : '#2a2a4a')
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .enabled(!!this.selectedDevice)
          .onClick(() => {
            this.currentStep = 'file';
          })
      } else if (this.currentStep === 'file') {
        // 文件选择步骤的操作按钮
        Button('上一步')
          .fontSize(16)
          .height(44)
          .backgroundColor('#2a2a4a')
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .onClick(() => {
            this.currentStep = 'device';
          })

        Blank()
          .width(16)

        Button(`发送 (${this.selectedFiles.length})`)
          .fontSize(16)
          .height(44)
          .backgroundColor(this.selectedFiles.length > 0 ? '#4CAF50' : '#2a2a4a')
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .enabled(this.selectedFiles.length > 0)
          .onClick(() => {
            this.startTransfer();
          })
      } else if (this.currentStep === 'transfer') {
        // 传输步骤的操作按钮
        if (this.currentTask?.status === 'completed' || this.currentTask?.status === 'failed') {
          Button('完成')
            .fontSize(16)
            .height(44)
            .backgroundColor('#4CAF50')
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .onClick(() => {
              this.closePage();
            })
        }
      }
    }
    .width('100%')
    .padding(16)
  }

  /**
   * 历史弹窗
   */
  @Builder
  HistorySheet() {
    TransferHistoryPage({
      isShow: $showHistory
    })
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
    } catch (error) {
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
      const task = await this.transferViewModel.createTransferTask(
        this.selectedDevice,
        this.selectedFiles
      );

      this.currentTask = task;

      // 显示进度通知
      await this.notificationService.showProgressNotification(task);

      // 执行传输
      await this.transferViewModel.executeTask(task, (updatedTask) => {
        this.currentTask = updatedTask;
        this.notificationService.updateProgressNotification(updatedTask);
      });
    } catch (error) {
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
          action: () => {}
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
    } else {
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
}

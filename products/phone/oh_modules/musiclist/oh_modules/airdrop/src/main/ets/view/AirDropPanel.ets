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
import { AirDropViewModel } from '../viewmodel/AirDropViewModel';
import { DeviceInfo, MusicInfo, TransferProgress } from '../viewmodel/AirDropModels';
import { AirDropMessages } from '../constants/AirDropConstants';

const TAG = 'AirDropPanel';

/**
 * 空投送面板组件
 */
@Component
export struct AirDropPanel {
  /** 是否显示面板 */
  @Link isShow: boolean;
  /** 音乐信息 */
  @Prop musicInfo: MusicInfo | null = null;
  /** 是否发送文件 */
  @State sendFile: boolean = false;
  /** 设备列表 */
  @State deviceList: DeviceInfo[] = [];
  /** 选中的设备 */
  @State selectedDevice: DeviceInfo | null = null;
  /** 是否正在加载 */
  @State isLoading: boolean = false;
  /** 传输进度 */
  @State progress: TransferProgress | null = null;
  /** 状态消息 */
  @State statusMessage: string = '';

  /** 投送完成回调 */
  onComplete?: (success: boolean) => void;

  private viewModel: AirDropViewModel = AirDropViewModel.getInstance();

  async aboutToAppear() {
    await this.loadDevices();
  }

  private async loadDevices(): Promise<void> {
    this.isLoading = true;
    this.deviceList = await this.viewModel.discoverDevices();
    this.isLoading = false;
    if (this.deviceList.length === 0) {
      this.statusMessage = AirDropMessages.NO_DEVICE_FOUND;
    }
  }

  private async handleSend(): Promise<void> {
    if (!this.selectedDevice || !this.musicInfo) {
      return;
    }

    this.isLoading = true;
    this.statusMessage = AirDropMessages.TRANSFERRING;

    const success = await this.viewModel.doAirDrop(
      {
        targetDeviceId: this.selectedDevice.deviceId,
        musicInfo: this.musicInfo,
        sendFile: this.sendFile
      },
      (p: TransferProgress) => {
        this.progress = p;
      }
    );

    this.isLoading = false;
    this.statusMessage = success ? AirDropMessages.TRANSFER_SUCCESS : AirDropMessages.TRANSFER_FAILED;

    if (this.onComplete) {
      this.onComplete(success);
    }

    // 成功后延迟关闭
    if (success) {
      setTimeout(() => {
        this.isShow = false;
      }, 1500);
    }
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('投送到设备')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .layoutWeight(1)

        Button() {
          Text('×')
            .fontSize(24)
            .fontColor('#666666')
        }
        .width(40)
        .height(40)
        .backgroundColor(Color.Transparent)
        .onClick(() => {
          this.isShow = false;
        })
      }
      .width('100%')
      .padding({ left: 16, right: 8, top: 12, bottom: 12 })

      Divider().width('100%')

      // 设备列表
      if (this.isLoading && this.deviceList.length === 0) {
        Column() {
          LoadingProgress()
            .width(40)
            .height(40)
          Text('正在搜索设备...')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 8 })
        }
        .width('100%')
        .height(150)
        .justifyContent(FlexAlign.Center)
      } else if (this.deviceList.length > 0) {
        List() {
          ForEach(this.deviceList, (device: DeviceInfo) => {
            ListItem() {
              Row() {
                // 设备图标
                Image($r('app.media.icon'))
                  .width(40)
                  .height(40)
                  .borderRadius(8)

                // 设备信息
                Column() {
                  Text(device.deviceName)
                    .fontSize(16)
                    .fontColor('#333333')
                  Text(device.deviceType)
                    .fontSize(12)
                    .fontColor('#999999')
                }
                .alignItems(HorizontalAlign.Start)
                .margin({ left: 12 })
                .layoutWeight(1)

                // 选中状态
                if (this.selectedDevice?.deviceId === device.deviceId) {
                  Image($r('app.media.ic_play'))
                    .width(24)
                    .height(24)
                    .fillColor('#4CAF50')
                }
              }
              .width('100%')
              .padding(12)
              .backgroundColor(this.selectedDevice?.deviceId === device.deviceId ? '#E8F5E9' : '#FFFFFF')
              .borderRadius(8)
              .onClick(() => {
                this.selectedDevice = device;
              })
            }
            .margin({ top: 8 })
          })
        }
        .width('100%')
        .layoutWeight(1)
        .padding({ left: 16, right: 16 })
      } else {
        Column() {
          Text(this.statusMessage || AirDropMessages.NO_DEVICE_FOUND)
            .fontSize(14)
            .fontColor('#999999')
        }
        .width('100%')
        .height(150)
        .justifyContent(FlexAlign.Center)
      }

      // 发送文件选项
      if (this.musicInfo?.localFilePath) {
        Row() {
          Toggle({ type: ToggleType.Checkbox, isOn: this.sendFile })
            .onChange((isOn: boolean) => {
              this.sendFile = isOn;
            })
            .width(20)
            .height(20)
            .selectedColor('#4CAF50')

          Text('同时发送音乐文件')
            .fontSize(14)
            .fontColor('#333333')
            .margin({ left: 8 })
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 12, bottom: 12 })
      }

      // 进度显示
      if (this.progress) {
        Column() {
          Text(`${this.progress.fileName}`)
            .fontSize(12)
            .fontColor('#666666')
          Progress({ value: this.progress.percent, total: 100, type: ProgressType.Linear })
            .width('100%')
            .margin({ top: 4 })
          Text(`${this.progress.percent}%`)
            .fontSize(12)
            .fontColor('#999999')
        }
        .width('100%')
        .padding({ left: 16, right: 16, top: 8, bottom: 8 })
      }

      // 状态消息
      if (this.statusMessage) {
        Text(this.statusMessage)
          .fontSize(14)
          .fontColor(this.statusMessage === AirDropMessages.TRANSFER_SUCCESS ? '#4CAF50' : '#FF4444')
          .padding({ left: 16, right: 16, top: 8, bottom: 8 })
      }

      // 发送按钮
      Button('发送')
        .width('90%')
        .height(44)
        .backgroundColor(this.selectedDevice ? '#4CAF50' : '#CCCCCC')
        .fontColor(Color.White)
        .borderRadius(22)
        .enabled(!!this.selectedDevice && !this.isLoading)
        .margin({ top: 12, bottom: 16 })
        .onClick(() => {
          this.handleSend();
        })
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .borderRadius({ topLeft: 16, topRight: 16 })
    .shadow({ radius: 20, color: '#33000000', offsetY: -4 })
  }
}

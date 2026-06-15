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

import { ExtendedDeviceInfo } from '../viewmodel/TransferModels';

/**
 * 设备列表视图组件
 * 显示附近在线设备，支持选择和刷新
 */
@Component
export struct DeviceListView {
  /** 设备列表 */
  @Prop devices: ExtendedDeviceInfo[] = [];
  /** 选中的设备 */
  @Link selectedDevice: ExtendedDeviceInfo | null;
  /** 是否正在加载 */
  @Prop isLoading: boolean = false;
  /** 刷新事件 */
  onRefresh?: () => void;

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('选择设备')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .layoutWeight(1)

        // 刷新按钮
        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.ic_public_refresh'))
            .width(20)
            .height(20)
        }
        .width(36)
        .height(36)
        .backgroundColor('#2a2a4a')
        .onClick(() => {
          this.onRefresh?.();
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // 设备列表
      if (this.isLoading) {
        // 加载状态
        Column() {
          LoadingProgress()
            .width(48)
            .height(48)
            .color('#4CAF50')

          Text('正在扫描设备...')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 12 })
        }
        .width('100%')
        .height(200)
        .justifyContent(FlexAlign.Center)
      } else if (this.devices.length === 0) {
        // 空状态
        Column() {
          Image($r('app.media.ic_public_fail'))
            .width(64)
            .height(64)

          Text('未发现附近设备')
            .fontSize(16)
            .fontColor('#999999')
            .margin({ top: 16 })

          Text('请确保其他设备已登录同一账号')
            .fontSize(12)
            .fontColor('#666666')
            .margin({ top: 8 })
        }
        .width('100%')
        .height(200)
        .justifyContent(FlexAlign.Center)
      } else {
        // 设备列表
        List() {
          ForEach(this.devices, (device: ExtendedDeviceInfo) => {
            ListItem() {
              this.DeviceItem(device)
            }
          }, (device: ExtendedDeviceInfo) => device.deviceId)
        }
        .width('100%')
        .layoutWeight(1)
        .divider({ strokeWidth: 1, color: '#2a2a4a' })
      }
    }
    .width('100%')
    .backgroundColor('#1a1a2e')
    .borderRadius(12)
  }

  /**
   * 设备项组件
   */
  @Builder
  DeviceItem(device: ExtendedDeviceInfo) {
    Row() {
      // 设备图标
      Image(this.getDeviceIcon(device.deviceType))
        .width(40)
        .height(40)

      // 设备信息
      Column() {
        Text(device.deviceName)
          .fontSize(16)
          .fontColor('#FFFFFF')
          .fontWeight(FontWeight.Medium)

        Row() {
          Text(this.getDeviceTypeText(device.deviceType))
            .fontSize(12)
            .fontColor('#999999')

          Blank()

          // 在线状态
          Row() {
            Circle()
              .width(8)
              .height(8)

            Text(device.isOnline ? '在线' : '离线')
              .fontSize(12)
              .fontColor(device.isOnline ? '#4CAF50' : '#999999')
              .margin({ left: 4 })
          }
        }
        .width('100%')
        .margin({ top: 4 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })

      // 选中标记
      if (this.selectedDevice?.deviceId === device.deviceId) {
        Image($r('app.media.ic_public_ok'))
          .width(24)
          .height(24)
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor(this.selectedDevice?.deviceId === device.deviceId ? '#2a2a4a' : 'transparent')
    .borderRadius(8)
    .onClick(() => {
      this.selectedDevice = device;
    })
  }

  /**
   * 获取设备图标
   */
  private getDeviceIcon(deviceType: string): Resource {
    switch (deviceType) {
      case 'phone':
        return $r('app.media.ic_device_phone');
      case 'tablet':
        return $r('app.media.ic_device_tablet');
      case 'watch':
        return $r('app.media.ic_device_watch');
      default:
        return $r('app.media.ic_device_phone');
    }
  }

  /**
   * 获取设备类型文本
   */
  private getDeviceTypeText(deviceType: string): string {
    switch (deviceType) {
      case 'phone':
        return '手机';
      case 'tablet':
        return '平板';
      case 'watch':
        return '手表';
      default:
        return '未知设备';
    }
  }
}

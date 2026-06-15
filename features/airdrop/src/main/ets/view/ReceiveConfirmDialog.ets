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

import { ReceiveRequest } from '../viewmodel/TransferModels';

/**
 * 接收确认对话框组件
 * 显示发送方信息和文件信息，提供接收和拒绝选项
 */
@CustomDialog
export struct ReceiveConfirmDialog {
  controller: CustomDialogController;
  /** 是否显示 */
  @Link isShow: boolean;
  /** 接收请求 */
  @Prop request: ReceiveRequest;
  /** 接受事件 */
  onAccept?: () => void;
  /** 拒绝事件 */
  onReject?: () => void;

  @State remainingTime: number = 30;
  private timer: number = -1;

  aboutToAppear() {
    this.remainingTime = Math.floor(this.request.timeout / 1000);
    this.startTimer();
  }

  aboutToDisappear() {
    this.stopTimer();
  }

  build() {
    Column() {
      // 标题
      Row() {
        Image($r('app.media.ic_device_phone'))
          .width(24)
          .height(24)
          .fillColor('#4CAF50')

        Text('文件接收请求')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .margin({ left: 8 })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .padding({ top: 20, bottom: 16 })

      // 发送方信息
      Column() {
        Row() {
          Text('发送方:')
            .fontSize(14)
            .fontColor('#999999')

          Text(this.request.senderDeviceName)
            .fontSize(14)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Medium)
            .margin({ left: 8 })
        }
        .width('100%')

        Divider()
          .color('#2a2a4a')
          .margin({ top: 12, bottom: 12 })

        // 文件信息
        Row() {
          Image($r('app.media.ic_music_list'))
            .width(40)
            .height(40)
            .fillColor('#4CAF50')

          Column() {
            Text(this.request.fileName)
              .fontSize(16)
              .fontColor('#FFFFFF')
              .fontWeight(FontWeight.Medium)
              .maxLines(2)
              .textOverflow({ overflow: TextOverflow.Ellipsis })

            Text(this.formatSize(this.request.fileSize))
              .fontSize(12)
              .fontColor('#999999')
              .margin({ top: 4 })
          }
          .layoutWeight(1)
          .alignItems(HorizontalAlign.Start)
          .margin({ left: 12 })
        }
        .width('100%')
      }
      .width('100%')
      .padding({ left: 20, right: 20, bottom: 16 })

      // 超时提示
      Row() {
        Image($r('app.media.ic_public_fail'))
          .width(16)
          .height(16)
          .fillColor('#FF9800')

        Text(`将在 ${this.remainingTime} 秒后自动拒绝`)
          .fontSize(12)
          .fontColor('#FF9800')
          .margin({ left: 8 })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .padding({ bottom: 16 })

      // 操作按钮
      Row() {
        Button('拒绝')
          .fontSize(16)
          .height(44)
          .backgroundColor('#2a2a4a')
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .onClick(() => {
            this.reject();
          })

        Blank()
          .width(16)

        Button('接收')
          .fontSize(16)
          .height(44)
          .backgroundColor('#4CAF50')
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .onClick(() => {
            this.accept();
          })
      }
      .width('100%')
      .padding({ left: 20, right: 20, bottom: 20 })
    }
    .width('100%')
    .backgroundColor('#1a1a2e')
    .borderRadius(16)
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
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
  }
}

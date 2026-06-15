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

import { TransferTask } from '../viewmodel/TransferModels';

/**
 * 传输进度视图组件
 * 显示传输进度、速度、状态
 */
@Component
export struct TransferProgressView {
  /** 传输任务 */
  @Prop task: TransferTask;
  /** 取消事件 */
  onCancel?: () => void;
  /** 暂停/继续事件 */
  onPauseOrResume?: () => void;

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('传输进度')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .layoutWeight(1)

        // 状态图标
        this.StatusIcon()
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // 目标设备信息
      Row() {
        Image($r('app.media.ic_device_phone'))
          .width(20)
          .height(20)
          .fillColor('#4CAF50')

        Text(`发送到: ${this.task.targetDeviceName}`)
          .fontSize(14)
          .fontColor('#999999')
          .margin({ left: 8 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 12 })

      // 当前文件信息
      if (this.task.files.length > 0) {
        Column() {
          Text(`正在传输: ${this.getCurrentFileName()}`)
            .fontSize(14)
            .fontColor('#FFFFFF')
            .maxLines(1)
            .textOverflow({ overflow: TextOverflow.Ellipsis })

          Text(`文件 ${this.task.currentFileIndex + 1} / ${this.task.files.length}`)
            .fontSize(12)
            .fontColor('#999999')
            .margin({ top: 4 })
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .padding({ left: 16, right: 16, bottom: 12 })
      }

      // 进度条
      Column() {
        Progress({
          value: this.getProgressPercent(),
          total: 100,
          type: ProgressType.Linear
        })
          .width('100%')
          .color('#4CAF50')
          .backgroundColor('#2a2a4a')

        Row() {
          Text(`${this.getProgressPercent()}%`)
            .fontSize(16)
            .fontColor('#FFFFFF')
            .fontWeight(FontWeight.Bold)

          Blank()

          Text(`${this.formatSize(this.task.transferredSize)} / ${this.formatSize(this.task.totalSize)}`)
            .fontSize(12)
            .fontColor('#999999')
        }
        .width('100%')
        .margin({ top: 8 })
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 12 })

      // 传输速度
      Row() {
        Text('传输速度:')
          .fontSize(12)
          .fontColor('#999999')

        Text(this.formatSpeed(this.task.speed))
          .fontSize(14)
          .fontColor('#4CAF50')
          .fontWeight(FontWeight.Bold)
          .margin({ left: 8 })

        Blank()

        // 传输时间
        if (this.task.startTime) {
          Text(`已用时: ${this.formatDuration(Date.now() - this.task.startTime)}`)
            .fontSize(12)
            .fontColor('#999999')
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 12 })

      // 错误信息
      if (this.task.status === 'failed' && this.task.errorMessage) {
        Row() {
          Image($r('app.media.ic_public_fail'))
            .width(16)
            .height(16)
            .fillColor('#F44336')

          Text(this.task.errorMessage)
            .fontSize(12)
            .fontColor('#F44336')
            .margin({ left: 8 })
            .layoutWeight(1)
        }
        .width('100%')
        .padding({ left: 16, right: 16, bottom: 12 })
      }

      // 操作按钮
      Row() {
        if (this.task.status === 'transferring') {
          Button('取消传输')
            .fontSize(14)
            .height(40)
            .backgroundColor('#F44336')
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .onClick(() => {
              this.onCancel?.();
            })
        } else if (this.task.status === 'failed') {
          Button('重试')
            .fontSize(14)
            .height(40)
            .backgroundColor('#4CAF50')
            .fontColor('#FFFFFF')
            .layoutWeight(1)
            .onClick(() => {
              this.onPauseOrResume?.();
            })
        } else if (this.task.status === 'completed') {
          Row() {
            Image($r('app.media.ic_public_ok'))
              .width(20)
              .height(20)
              .fillColor('#4CAF50')

            Text('传输完成')
              .fontSize(16)
              .fontColor('#4CAF50')
              .fontWeight(FontWeight.Bold)
              .margin({ left: 8 })
          }
          .width('100%')
          .justifyContent(FlexAlign.Center)
        }
      }
      .width('100%')
      .padding({ left: 16, right: 16, bottom: 16 })
    }
    .width('100%')
    .backgroundColor('#1a1a2e')
    .borderRadius(12)
  }

  /**
   * 状态图标
   */
  @Builder
  StatusIcon() {
    if (this.task.status === 'transferring') {
      LoadingProgress()
        .width(24)
        .height(24)
        .color('#4CAF50')
    } else if (this.task.status === 'completed') {
      Image($r('app.media.ic_public_ok'))
        .width(24)
        .height(24)
        .fillColor('#4CAF50')
    } else if (this.task.status === 'failed') {
      Image($r('app.media.ic_public_fail'))
        .width(24)
        .height(24)
        .fillColor('#F44336')
    } else if (this.task.status === 'paused') {
      Image($r('app.media.ic_public_pause'))
        .width(24)
        .height(24)
        .fillColor('#FF9800')
    }
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
    } else if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(2)} KB`;
    } else if (size < 1024 * 1024 * 1024) {
      return `${(size / 1024 / 1024).toFixed(2)} MB`;
    } else {
      return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`;
    }
  }

  /**
   * 格式化传输速度
   */
  private formatSpeed(speed: number): string {
    if (speed < 1024) {
      return `${speed.toFixed(0)} B/s`;
    } else if (speed < 1024 * 1024) {
      return `${(speed / 1024).toFixed(2)} KB/s`;
    } else {
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
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}分${secs}秒`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours}时${minutes}分`;
    }
  }
}

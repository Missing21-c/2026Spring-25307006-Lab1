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

import { TransferHistoryRecord } from '../viewmodel/TransferModels';
import { TransferHistoryService } from '../viewmodel/TransferHistoryService';

/**
 * 传输历史页面组件
 * 显示所有传输记录
 */
@Component
export struct TransferHistoryPage {
  /** 是否显示 */
  @Link isShow: boolean;

  @State historyList: TransferHistoryRecord[] = [];
  @State isLoading: boolean = false;
  @State selectedRecord: TransferHistoryRecord | null = null;
  @State showDetail: boolean = false;

  private historyService: TransferHistoryService = TransferHistoryService.getInstance();

  aboutToAppear() {
    this.loadHistory();
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
            this.isShow = false;
          })

        Text('传输历史')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .layoutWeight(1)
          .margin({ left: 12 })

        // 清空按钮
        Button('清空')
          .fontSize(14)
          .height(32)
          .backgroundColor('#F44336')
          .fontColor('#FFFFFF')
          .onClick(() => {
            this.showClearConfirm();
          })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // 历史列表
      if (this.isLoading) {
        Column() {
          LoadingProgress()
            .width(48)
            .height(48)
            .color('#4CAF50')

          Text('加载中...')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 12 })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      } else if (this.historyList.length === 0) {
        Column() {
          Image($r('app.media.ic_public_fail'))
            .width(64)
            .height(64)
            .fillColor('#666666')

          Text('暂无传输记录')
            .fontSize(16)
            .fontColor('#999999')
            .margin({ top: 16 })
        }
        .width('100%')
        .layoutWeight(1)
        .justifyContent(FlexAlign.Center)
      } else {
        List() {
          ForEach(this.historyList, (record: TransferHistoryRecord) => {
            ListItem() {
              this.HistoryItem(record)
            }
          }, (record: TransferHistoryRecord) => record.recordId)
        }
        .width('100%')
        .layoutWeight(1)
        .divider({ strokeWidth: 1, color: '#2a2a4a' })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a2e')
    .bindSheet($$this.showDetail, this.DetailSheet(), {
      height: 300,
      backgroundColor: '#1a1a2e',
      dragBar: true
    })
  }

  /**
   * 历史记录项
   */
  @Builder
  HistoryItem(record: TransferHistoryRecord) {
    Row() {
      // 方向图标
      Column() {
        Image(record.direction === 'send' ? $r('app.media.ic_public_arrow_up') : $r('app.media.ic_public_arrow_down'))
          .width(24)
          .height(24)
          .fillColor(record.direction === 'send' ? '#4CAF50' : '#2196F3')

        Text(record.direction === 'send' ? '发送' : '接收')
          .fontSize(10)
          .fontColor(record.direction === 'send' ? '#4CAF50' : '#2196F3')
      }
      .width(50)

      // 文件信息
      Column() {
        Text(record.fileName)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        Row() {
          Text(record.peerDeviceName)
            .fontSize(12)
            .fontColor('#999999')

          Text(' • ')
            .fontSize(12)
            .fontColor('#666666')

          Text(this.formatTime(record.transferTime))
            .fontSize(12)
            .fontColor('#999999')
        }
        .margin({ top: 4 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })

      // 状态图标
      Column() {
        if (record.status === 'completed') {
          Image($r('app.media.ic_public_ok'))
            .width(20)
            .height(20)
            .fillColor('#4CAF50')
        } else if (record.status === 'failed') {
          Image($r('app.media.ic_public_fail'))
            .width(20)
            .height(20)
            .fillColor('#F44336')
        } else {
          Image($r('app.media.ic_public_fail'))
            .width(20)
            .height(20)
            .fillColor('#FF9800')
        }

        Text(this.getStatusText(record.status))
          .fontSize(10)
          .fontColor(this.getStatusColor(record.status))
      }
      .width(50)
    }
    .width('100%')
    .padding(16)
    .onClick(() => {
      this.selectedRecord = record;
      this.showDetail = true;
    })
  }

  /**
   * 详情弹窗
   */
  @Builder
  DetailSheet() {
    Column() {
      if (this.selectedRecord) {
        // 标题
        Text('传输详情')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .margin({ bottom: 16 })

        // 详情信息
        Column() {
          this.DetailItem('文件名', this.selectedRecord.fileName)
          this.DetailItem('文件大小', this.formatSize(this.selectedRecord.fileSize))
          this.DetailItem('传输方向', this.selectedRecord.direction === 'send' ? '发送' : '接收')
          this.DetailItem('对方设备', this.selectedRecord.peerDeviceName)
          this.DetailItem('传输时间', this.formatDateTime(this.selectedRecord.transferTime))
          this.DetailItem('耗时', this.formatDuration(this.selectedRecord.duration))
          this.DetailItem('状态', this.getStatusText(this.selectedRecord.status))

          if (this.selectedRecord.localPath) {
            this.DetailItem('保存路径', this.selectedRecord.localPath)
          }

          if (this.selectedRecord.errorMessage) {
            this.DetailItem('错误信息', this.selectedRecord.errorMessage)
          }
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
      }
    }
    .width('100%')
    .padding(20)
  }

  /**
   * 详情项
   */
  @Builder
  DetailItem(label: string, value: string) {
    Row() {
      Text(`${label}:`)
        .fontSize(14)
        .fontColor('#999999')
        .width(80)

      Text(value)
        .fontSize(14)
        .fontColor('#FFFFFF')
        .layoutWeight(1)
    }
    .width('100%')
    .margin({ bottom: 12 })
  }

  /**
   * 加载历史记录
   */
  private async loadHistory(): Promise<void> {
    this.isLoading = true;
    try {
      this.historyList = await this.historyService.getHistoryList();
    } catch (error) {
      console.error(`Load history failed: ${JSON.stringify(error)}`);
    }
    this.isLoading = false;
  }

  /**
   * 显示清空确认对话框
   */
  private showClearConfirm(): void {
    AlertDialog.show({
      title: '确认清空',
      message: '确定要清空所有传输历史记录吗？',
      primaryButton: {
        value: '取消',
        action: () => {}
      },
      secondaryButton: {
        value: '清空',
        fontColor: '#F44336',
        action: async () => {
          await this.historyService.clearAll();
          await this.loadHistory();
        }
      }
    });
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
   * 格式化时间
   */
  private formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - timestamp;

    if (diff < 60000) {
      return '刚刚';
    } else if (diff < 3600000) {
      return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
      return `${Math.floor(diff / 3600000)}小时前`;
    } else {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
  }

  /**
   * 格式化日期时间
   */
  private formatDateTime(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
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

  /**
   * 获取状态文本
   */
  private getStatusText(status: string): string {
    switch (status) {
      case 'completed':
        return '成功';
      case 'failed':
        return '失败';
      case 'cancelled':
        return '已取消';
      default:
        return '未知';
    }
  }

  /**
   * 获取状态颜色
   */
  private getStatusColor(status: string): string {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'failed':
        return '#F44336';
      case 'cancelled':
        return '#FF9800';
      default:
        return '#999999';
    }
  }
}

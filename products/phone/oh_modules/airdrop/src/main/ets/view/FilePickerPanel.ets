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

import { PendingTransferFile } from '../viewmodel/TransferModels';
import { FileSelectionService } from '../viewmodel/FileSelectionService';

/**
 * 文件选择面板组件
 * 支持多选、筛选和预览
 */
@Component
export struct FilePickerPanel {
  /** 是否显示面板 */
  @Link isShow: boolean;
  /** 已选文件列表 */
  @Link selectedFiles: PendingTransferFile[];
  /** 支持的文件格式 */
  @Prop supportedFormats: string[] = ['mp3', 'wav', 'flac', 'aac'];
  /** 最大选择数量 */
  @Prop maxSelectCount: number = 50;
  /** 最大总大小(字节) */
  @Prop maxTotalSize: number = 500 * 1024 * 1024; // 500MB

  @State files: PendingTransferFile[] = [];
  @State isLoading: boolean = false;
  @State currentFilter: string = 'all';

  private fileSelectionService: FileSelectionService = FileSelectionService.getInstance();

  aboutToAppear() {
    this.loadFiles();
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('选择文件')
          .fontSize(18)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
          .layoutWeight(1)

        // 关闭按钮
        Button({ type: ButtonType.Circle }) {
          Image($r('app.media.ic_public_cancel'))
            .width(20)
            .height(20)
            .fillColor('#FFFFFF')
        }
        .width(36)
        .height(36)
        .backgroundColor('#2a2a4a')
        .onClick(() => {
          this.isShow = false;
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })

      // 筛选栏
      Row() {
        Text('格式筛选:')
          .fontSize(14)
          .fontColor('#999999')

        Button('全部')
          .fontSize(12)
          .height(28)
          .backgroundColor(this.currentFilter === 'all' ? '#4CAF50' : '#2a2a4a')
          .fontColor(this.currentFilter === 'all' ? '#FFFFFF' : '#999999')
          .onClick(() => {
            this.currentFilter = 'all';
          })

        ForEach(this.supportedFormats, (format: string) => {
          Button(format.toUpperCase())
            .fontSize(12)
            .height(28)
            .backgroundColor(this.currentFilter === format ? '#4CAF50' : '#2a2a4a')
            .fontColor(this.currentFilter === format ? '#FFFFFF' : '#999999')
            .margin({ left: 8 })
            .onClick(() => {
              this.currentFilter = format;
            })
        })
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 8, bottom: 8 })

      // 文件列表
      if (this.isLoading) {
        Column() {
          LoadingProgress()
            .width(48)
            .height(48)
            .color('#4CAF50')

          Text('正在扫描文件...')
            .fontSize(14)
            .fontColor('#999999')
            .margin({ top: 12 })
        }
        .width('100%')
        .height(300)
        .justifyContent(FlexAlign.Center)
      } else if (this.getFilteredFiles().length === 0) {
        Column() {
          Image($r('app.media.ic_public_fail'))
            .width(64)
            .height(64)
            .fillColor('#666666')

          Text('未找到音频文件')
            .fontSize(16)
            .fontColor('#999999')
            .margin({ top: 16 })
        }
        .width('100%')
        .height(300)
        .justifyContent(FlexAlign.Center)
      } else {
        List() {
          ForEach(this.getFilteredFiles(), (file: PendingTransferFile) => {
            ListItem() {
              this.FileItem(file)
            }
          }, (file: PendingTransferFile) => file.fileId)
        }
        .width('100%')
        .layoutWeight(1)
        .divider({ strokeWidth: 1, color: '#2a2a4a' })
      }

      // 底部操作栏
      Row() {
        // 全选按钮
        Button('全选')
          .fontSize(14)
          .height(36)
          .backgroundColor('#2a2a4a')
          .fontColor('#FFFFFF')
          .onClick(() => {
            this.selectAll();
          })

        Button('取消全选')
          .fontSize(14)
          .height(36)
          .backgroundColor('#2a2a4a')
          .fontColor('#FFFFFF')
          .margin({ left: 8 })
          .onClick(() => {
            this.deselectAll();
          })

        Blank()

        // 已选信息
        Column() {
          Text(`已选 ${this.selectedFiles.length} 个文件`)
            .fontSize(12)
            .fontColor('#999999')

          Text(`总大小: ${this.formatSize(this.getTotalSize())}`)
            .fontSize(12)
            .fontColor('#999999')
        }
        .alignItems(HorizontalAlign.End)
      }
      .width('100%')
      .padding(16)

      // 警告提示
      if (this.isOverLimit()) {
        Row() {
          Image($r('app.media.ic_public_fail'))
            .width(16)
            .height(16)
            .fillColor('#FF9800')

          Text(this.getLimitWarning())
            .fontSize(12)
            .fontColor('#FF9800')
            .margin({ left: 8 })
        }
        .width('100%')
        .padding({ left: 16, right: 16, bottom: 8 })
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#1a1a2e')
    .borderRadius(12)
  }

  /**
   * 文件项组件
   */
  @Builder
  FileItem(file: PendingTransferFile) {
    Row() {
      // 复选框
      Checkbox()
        .select(file.isSelected)
        .selectedColor('#4CAF50')
        .onChange((isChecked: boolean) => {
          file.isSelected = isChecked;
          this.updateSelectedFiles();
        })

      // 文件图标
      Image($r('app.media.ic_music_list'))
        .width(36)
        .height(36)
        .fillColor('#4CAF50')
        .margin({ left: 12 })

      // 文件信息
      Column() {
        Text(file.fileName)
          .fontSize(14)
          .fontColor('#FFFFFF')
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })

        Row() {
          Text(this.formatSize(file.fileSize))
            .fontSize(12)
            .fontColor('#999999')

          Text(file.fileFormat.toUpperCase())
            .fontSize(12)
            .fontColor('#4CAF50')
            .margin({ left: 8 })
        }
        .margin({ top: 4 })
      }
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Start)
      .margin({ left: 12 })
    }
    .width('100%')
    .padding(12)
    .onClick(() => {
      file.isSelected = !file.isSelected;
      this.updateSelectedFiles();
    })
  }

  /**
   * 加载文件
   */
  private async loadFiles(): Promise<void> {
    this.isLoading = true;
    try {
      this.files = await this.fileSelectionService.scanLocalAudioFiles();
    } catch (error) {
      console.error(`Load files failed: ${JSON.stringify(error)}`);
    }
    this.isLoading = false;
  }

  /**
   * 获取筛选后的文件
   */
  private getFilteredFiles(): PendingTransferFile[] {
    if (this.currentFilter === 'all') {
      return this.files;
    }
    return this.files.filter(file => file.fileFormat === this.currentFilter);
  }

  /**
   * 更新已选文件
   */
  private updateSelectedFiles(): void {
    this.selectedFiles = this.files.filter(file => file.isSelected);
  }

  /**
   * 全选
   */
  private selectAll(): void {
    const filteredFiles = this.getFilteredFiles();
    filteredFiles.forEach(file => file.isSelected = true);
    this.updateSelectedFiles();
  }

  /**
   * 取消全选
   */
  private deselectAll(): void {
    this.files.forEach(file => file.isSelected = false);
    this.updateSelectedFiles();
  }

  /**
   * 获取总大小
   */
  private getTotalSize(): number {
    return this.selectedFiles.reduce((sum, file) => sum + file.fileSize, 0);
  }

  /**
   * 是否超过限制
   */
  private isOverLimit(): boolean {
    return this.selectedFiles.length > this.maxSelectCount || this.getTotalSize() > this.maxTotalSize;
  }

  /**
   * 获取限制警告
   */
  private getLimitWarning(): string {
    if (this.selectedFiles.length > this.maxSelectCount) {
      return `文件数量超过限制(${this.maxSelectCount}个)`;
    }
    if (this.getTotalSize() > this.maxTotalSize) {
      return `总大小超过限制(${this.formatSize(this.maxTotalSize)})`;
    }
    return '';
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

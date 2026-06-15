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

import { LocalMusicService, LocalFile, FilePickerService, FileObject } from 'mediacommon';
import { StyleConstants } from 'constantscommon';
import { FilePickerComponent, ButtonStyle } from './FilePickerComponent';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';
import { AirDropViewModel } from 'airdrop';

/**
 * 本地文件列表组件
 * 显示最近播放的本地MP3文件
 */
@Component
export struct LocalFileListComponent {
  @State localFiles: LocalFile[] = [];
  @StorageLink('currentPlayingPath') currentPlayingPath: string = '';
  private localMusicService: LocalMusicService = LocalMusicService.getInstance();
  private filePickerService: FilePickerService = FilePickerService.getInstance();
  private context: common.UIAbilityContext | null = null;
  private airDropViewModel: AirDropViewModel = AirDropViewModel.getInstance();

  aboutToAppear() {
    const context = AppStorage.get<common.UIAbilityContext>('context');
    this.context = context ?? null;
    this.loadRecentFiles();
    this.setupFileReceiver();
  }

  /**
   * 设置文件接收监听
   */
  private setupFileReceiver(): void {
    this.airDropViewModel.setupFileReceiver(async (fileName: string, fileData: ArrayBuffer) => {
      try {
        // 保存接收的文件
        const localPath = await this.airDropViewModel.saveReceivedFile(fileName, fileData);
        
        // 添加到本地音乐列表
        const localFile: LocalFile = {
          id: Date.now().toString(),
          name: fileName,
          path: localPath,
          size: fileData.byteLength,
          duration: 0,
          addTime: Date.now(),
          lastPlayTime: Date.now()
        };
        await this.localMusicService.addToRecentList(localFile);
        
        // 重新加载列表
        await this.loadRecentFiles();
        
        // 显示提示
        this.getUIContext().getPromptAction().showToast({
          message: `已接收: ${fileName}`,
          duration: 2000
        });
      } catch (error) {
        console.error('处理接收文件失败:', error);
      }
    });
  }

  build() {
    Column() {
      // 标题栏
      Row() {
        Text('本地文件')
          .fontSize(18)
          .fontColor(Color.White)
          .fontWeight(FontWeight.Bold)

        Blank()

        if (this.localFiles.length > 0) {
          Text(`共${this.localFiles.length}个`)
            .fontSize(14)
            .fontColor('#999999')
            .margin({ right: 12 })
        }

        // 文件选择按钮
        FilePickerComponent({ buttonStyle: ButtonStyle.Compact })
      }
      .width('100%')
      .margin({ bottom: 12 })

      // 文件列表
      if (this.localFiles.length === 0) {
        this.EmptyView()
      } else {
        this.FileListView()
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#1a1a2e')
    .borderRadius(12)
  }

  /**
   * 空状态视图
   */
  @Builder
  EmptyView() {
    Column() {
      Image($r('app.media.ic_album'))
        .width(64)
        .height(64)
        .opacity(0.4)
        .margin({ bottom: 16 })

      Text('暂无本地文件')
        .fontSize(16)
        .fontColor('#cccccc')
        .margin({ bottom: 8 })

      Text('点击右上角"选择文件"按钮添加')
        .fontSize(14)
        .fontColor('#999999')
        .margin({ bottom: 16 })

      // 快速操作按钮
      Button('立即添加')
        .fontSize(14)
        .fontColor(Color.White)
        .backgroundColor('#4CAF50')
        .borderRadius(20)
        .height(36)
        .padding({ left: 24, right: 24 })
        .onClick(() => {
          this.triggerFilePick();
        })
    }
    .width('100%')
    .padding({ top: 32, bottom: 32 })
  }

  /**
   * 文件列表视图
   */
  @Builder
  FileListView() {
    List() {
      ForEach(this.localFiles, (file: LocalFile) => {
        ListItem() {
          this.FileItem(file)
        }
      }, (file: LocalFile) => file.id)
    }
    .width('100%')
    .layoutWeight(1)
    .scrollBar(BarState.Off)
    .divider({
      color: '#333333',
      strokeWidth: 1,
      startMargin: 0,
      endMargin: 0
    })
  }

  /**
   * 文件项视图
   */
  @Builder
  FileItem(file: LocalFile) {
    Row() {
      // 文件图标
      Image($r('app.media.ic_album'))
        .width(40)
        .height(40)
        .borderRadius(4)
        .margin({ right: 12 })

      // 文件信息
      Column() {
        Text(file.name)
          .fontSize(14)
          .fontColor(Color.White)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .width('100%')

        Row() {
          Text(this.formatTime(file.lastPlayTime))
            .fontSize(12)
            .fontColor('#999999')

          Text(' • ')
            .fontSize(12)
            .fontColor('#666666')

          Text(this.formatFileSize(file.size))
            .fontSize(12)
            .fontColor('#999999')
        }
        .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      // 操作按钮
      Row() {
        // 播放按钮
        Image(this.currentPlayingPath === file.path ? 
          $r('app.media.ic_public_pause') : $r('app.media.ic_public_play'))
          .width(24)
          .height(24)
          .onClick(() => {
            this.playFile(file);
          })

        // 删除按钮
        Image($r('app.media.ic_download'))
          .width(20)
          .height(20)
          .margin({ left: 12 })
          .onClick(() => {
            this.showDeleteDialog(file);
          })
      }
    }
    .width('100%')
    .padding({ top: 12, bottom: 12 })
    .backgroundColor(this.currentPlayingPath === file.path ? '#2a2a4a' : 'transparent')
    .borderRadius(8)
  }

  /**
   * 加载最近文件列表
   */
  private async loadRecentFiles(): Promise<void> {
    this.localFiles = await this.localMusicService.getRecentList();
  }

  /**
   * 播放文件
   */
  private async playFile(file: LocalFile): Promise<void> {
    try {
      // 更新当前播放路径
      this.currentPlayingPath = file.path;

      // 更新最后播放时间
      await this.localMusicService.updateLastPlayTime(file.id);

      // 重新加载列表以更新排序
      await this.loadRecentFiles();

      // 显示提示
      this.getUIContext().getPromptAction().showToast({
        message: `正在播放: ${file.name}`,
        duration: 2000
      });

      // TODO: 实际播放逻辑需要集成MediaService
      // const mediaService = MediaService.getInstance();
      // await mediaService.playLocalFile(file.path);

    } catch (error) {
      console.error('播放文件失败:', error);
      this.getUIContext().getPromptAction().showToast({
        message: '播放失败',
        duration: 2000
      });
    }
  }

  /**
   * 显示删除确认对话框
   */
  private showDeleteDialog(file: LocalFile): void {
    this.getUIContext().getPromptAction().showDialog({
      title: '确认删除',
      message: `确定要从列表中移除 "${file.name}" 吗？`,
      buttons: [
        { text: '取消', color: '#666666' },
        { text: '删除', color: '#FF4444' }
      ]
    }, async (error, data) => {
      if (data.index === 1) {
        await this.removeFile(file);
      }
    });
  }

  /**
   * 移除文件
   */
  private async removeFile(file: LocalFile): Promise<void> {
    try {
      await this.localMusicService.removeFile(file);
      await this.loadRecentFiles();

      this.getUIContext().getPromptAction().showToast({
        message: '已从列表中移除',
        duration: 2000
      });
    } catch (error) {
      console.error('移除文件失败:', error);
      this.getUIContext().getPromptAction().showToast({
        message: '移除失败',
        duration: 2000
      });
    }
  }

  /**
   * 格式化时间戳
   */
  private formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}/${day} ${hours}:${minutes.toString().padStart(2, '0')}`;
  }

  /**
   * 格式化文件大小
   */
  private formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(1) + ' MB';
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }
  }

  /**
   * 触发文件选择
   */
  private async triggerFilePick(): Promise<void> {
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

      // 重新加载列表
      await this.loadRecentFiles();

      // 显示成功提示
      this.getUIContext().getPromptAction().showToast({
        message: `已添加: ${file.name}`,
        duration: 2000
      });

    } catch (error) {
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

      const grantStatus = await atManager.verifyAccessToken(
        context.applicationInfo.accessTokenId,
        'ohos.permission.READ_MEDIA'
      );
      
      return grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
    } catch (error) {
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
    } catch (error) {
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
        this.getUIContext().getPromptAction().showToast({
          message: '请在设置中授予权限',
          duration: 2000
        });
      }
    });
  }
}

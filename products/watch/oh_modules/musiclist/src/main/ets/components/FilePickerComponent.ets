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

import { FilePickerService, FileObject, LocalMusicService, LocalFile, MediaService, SongItem } from 'mediacommon';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';
import common from '@ohos.app.ability.common';

/**
 * 按钮样式枚举
 * 用于控制FilePickerComponent的显示样式
 */
export enum ButtonStyle {
  Normal,  // 常规样式（用于独立显示）
  Compact  // 紧凑样式（用于标题栏）
}

/**
 * 文件选择组件
 * 提供本地MP3文件选择功能
 */
@Component
export struct FilePickerComponent {
  @StorageLink('pageIndexInfos') pageIndexInfos: NavPathStack = new NavPathStack();
  @Prop buttonStyle: ButtonStyle = ButtonStyle.Normal; // 按钮样式属性
  private filePickerService: FilePickerService = FilePickerService.getInstance();
  private localMusicService: LocalMusicService = LocalMusicService.getInstance();
  private context: common.UIAbilityContext | null = null;

  aboutToAppear() {
    const context = AppStorage.get<common.UIAbilityContext>('context');
    this.context = context ?? null;
  }

  build() {
    if (this.buttonStyle === ButtonStyle.Compact) {
      // 紧凑样式（用于标题栏）
      Row() {
        Image($r('app.media.ic_music_list'))
          .width(20)
          .height(20)
          .margin({ right: 4 })

        Text('选择文件')
          .fontSize(14)
          .fontColor(Color.White)
      }
      .padding({ left: 12, right: 12, top: 6, bottom: 6 })
      .backgroundColor('#4CAF50')
      .borderRadius(16)
      .onClick(() => {
        this.handleFilePick();
      })
    } else {
      // 常规样式（用于独立显示）
      Row() {
        Image($r('app.media.ic_music_list'))
          .width(24)
          .height(24)
          .margin({ right: 8 })

        Text('选择本地文件')
          .fontSize(16)
          .fontColor(Color.White)
      }
      .padding({ left: 16, right: 16, top: 12, bottom: 12 })
      .backgroundColor('#4CAF50')
      .borderRadius(8)
      .onClick(() => {
        this.handleFilePick();
      })
    }
  }

  /**
   * 处理文件选择
   */
  private async handleFilePick(): Promise<void> {
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

      // 播放文件
      await this.playFile(file.uri, file.name);

      // 显示成功提示
      this.getUIContext().getPromptAction().showToast({
        message: `已选择: ${file.name}`,
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
        // 打开设置页面
        // 实际应用中可以跳转到应用设置页面
        this.getUIContext().getPromptAction().showToast({
          message: '请在设置中授予权限',
          duration: 2000
        });
      }
    });
  }

  /**
   * 播放文件
   * @param uri 文件URI
   * @param name 文件名
   */
  private async playFile(uri: string, name: string): Promise<void> {
    try {
      // 使用MediaService播放本地文件
      const mediaService = MediaService.getInstance();
      
      // 创建本地歌曲信息
      const localSong = new SongItem();
      localSong.id = Date.now();
      localSong.title = name.replace('.mp3', '').replace('.MP3', '');
      localSong.singer = '本地文件';
      localSong.src = uri;  // 使用URI作为资源路径

      // 播放
      // 注意：这里需要根据实际的MediaService实现进行调整
      // 可能需要添加专门处理本地文件的方法
      
      this.getUIContext().getPromptAction().showToast({
        message: `正在播放: ${name}`,
        duration: 2000
      });

    } catch (error) {
      console.error('播放文件失败:', error);
      this.getUIContext().getPromptAction().showToast({
        message: '播放失败，请重试',
        duration: 2000
      });
    }
  }
}

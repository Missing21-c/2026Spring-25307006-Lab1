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

import preferences from '@ohos.data.preferences';

/**
 * 本地文件信息接口
 */
export interface LocalFile {
  id: string;           // 文件唯一标识
  name: string;         // 文件名
  path: string;         // 文件路径
  size: number;         // 文件大小(字节)
  duration: number;     // 时长(秒)
  addTime: number;      // 添加时间戳
  lastPlayTime: number; // 最后播放时间戳
}

/**
 * 本地音乐管理服务
 * 用于管理最近播放的本地文件列表
 */
export class LocalMusicService {
  private static instance: LocalMusicService;
  private prefs: preferences.Preferences | null = null;
  private readonly RECENT_FILES_KEY = 'recent_local_files';
  private readonly MAX_RECENT_FILES = 20;  // 最多保存20个最近文件

  /**
   * 获取服务实例
   */
  static getInstance(): LocalMusicService {
    if (!LocalMusicService.instance) {
      LocalMusicService.instance = new LocalMusicService();
    }
    return LocalMusicService.instance;
  }

  /**
   * 初始化服务
   * @param context 应用上下文
   */
  async init(context: Context): Promise<void> {
    try {
      this.prefs = await preferences.getPreferences(context, 'local_music_prefs');
    } catch (error) {
      console.error('LocalMusicService初始化失败:', error);
    }
  }

  /**
   * 添加文件到最近列表
   * @param file 本地文件信息
   */
  async addToRecentList(file: LocalFile): Promise<void> {
    try {
      let recentFiles = await this.getRecentList();

      // 移除已存在的相同文件
      recentFiles = recentFiles.filter(f => f.path !== file.path);

      // 添加到列表开头
      recentFiles.unshift(file);

      // 限制列表长度
      if (recentFiles.length > this.MAX_RECENT_FILES) {
        recentFiles = recentFiles.slice(0, this.MAX_RECENT_FILES);
      }

      // 保存到持久化存储
      this.saveRecentList(recentFiles);
    } catch (error) {
      console.error('添加到最近列表失败:', error);
    }
  }

  /**
   * 获取最近播放列表
   */
  async getRecentList(): Promise<LocalFile[]> {
    try {
      if (!this.prefs) {
        return [];
      }

      const data = await this.prefs.get(this.RECENT_FILES_KEY, '[]') as string;
      return JSON.parse(data);
    } catch (error) {
      console.error('获取最近列表失败:', error);
      return [];
    }
  }

  /**
   * 清空最近播放列表
   */
  clearRecentList(): void {
    try {
      if (this.prefs) {
        this.prefs.put(this.RECENT_FILES_KEY, '[]');
        this.prefs.flush();
      }
    } catch (error) {
      console.error('清空最近列表失败:', error);
    }
  }

  /**
   * 从最近列表中移除文件
   * @param file 要移除的文件
   */
  async removeFile(file: LocalFile): Promise<void> {
    try {
      let recentFiles = await this.getRecentList();
      recentFiles = recentFiles.filter(f => f.id !== file.id);
      this.saveRecentList(recentFiles);
    } catch (error) {
      console.error('移除文件失败:', error);
    }
  }

  /**
   * 更新文件的最后播放时间
   * @param fileId 文件ID
   */
  async updateLastPlayTime(fileId: string): Promise<void> {
    try {
      let recentFiles = await this.getRecentList();
      const file = recentFiles.find(f => f.id === fileId);
      
      if (file) {
        file.lastPlayTime = Date.now();
        this.saveRecentList(recentFiles);
      }
    } catch (error) {
      console.error('更新播放时间失败:', error);
    }
  }

  /**
   * 检查文件是否在最近列表中
   * @param filePath 文件路径
   */
  async isInRecentList(filePath: string): Promise<boolean> {
    const recentFiles = await this.getRecentList();
    return recentFiles.some(f => f.path === filePath);
  }

  /**
   * 获取最近列表数量
   */
  async getRecentCount(): Promise<number> {
    const list = await this.getRecentList();
    return list.length;
  }

  /**
   * 保存最近列表到持久化存储
   * @param files 文件列表
   */
  private saveRecentList(files: LocalFile[]): void {
    try {
      if (this.prefs) {
        this.prefs.put(this.RECENT_FILES_KEY, JSON.stringify(files));
        this.prefs.flush();
      }
    } catch (error) {
      console.error('保存最近列表失败:', error);
    }
  }

  /**
   * 格式化时长
   * @param seconds 秒数
   */
  formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  }

  /**
   * 格式化时间戳
   * @param timestamp 时间戳
   */
  formatTimestamp(timestamp: number): string {
    const date = new Date(timestamp);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${month}/${day} ${hours}:${minutes.toString().padStart(2, '0')}`;
  }
}

export default LocalMusicService.getInstance();

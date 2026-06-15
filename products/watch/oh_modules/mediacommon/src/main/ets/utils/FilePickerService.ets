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

import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';

/**
 * 文件对象接口
 */
export interface FileObject {
  uri: string;        // 文件URI
  name: string;       // 文件名
  size: number;       // 文件大小
  type: string;       // 文件类型
}

/**
 * 文件元数据接口
 */
export interface FileMetadata {
  title: string;      // 标题
  artist: string;     // 艺术家
  album: string;      // 专辑
  duration: number;   // 时长(毫秒)
  bitrate: number;    // 比特率
}

/**
 * 文件选择服务
 * 用于选择和读取设备中的MP3文件
 */
export class FilePickerService {
  private static instance: FilePickerService;

  /**
   * 获取服务实例
   */
  static getInstance(): FilePickerService {
    if (!FilePickerService.instance) {
      FilePickerService.instance = new FilePickerService();
    }
    return FilePickerService.instance;
  }

  /**
   * 选择MP3文件
   * 打开文件选择器，只显示MP3文件
   */
  async selectMP3File(): Promise<FileObject> {
    try {
      // 创建文件选择选项
      const documentSelectOptions = new picker.DocumentSelectOptions();
      documentSelectOptions.maxSelectNumber = 1;
      documentSelectOptions.fileSuffixFilters = ['.mp3', '.MP3'];

      // 创建文件选择器
      const documentPicker = new picker.DocumentViewPicker();
      
      // 打开选择器
      const result = await documentPicker.select(documentSelectOptions);

      // 检查选择结果
      if (result && result.length > 0) {
        const uri = result[0];
        
        // 获取文件信息
        const stat = await fs.stat(uri);
        
        return {
          uri: uri,
          name: this.getFileName(uri),
          size: stat.size,
          type: 'audio/mpeg'
        };
      }

      throw new Error('未选择文件');
    } catch (error) {
      console.error('文件选择失败:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * 读取文件内容
   * @param uri 文件URI
   */
  async readFileContent(uri: string): Promise<ArrayBuffer> {
    try {
      // 打开文件
      const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
      
      // 获取文件大小
      const stat = await fs.stat(file.fd);
      
      // 创建缓冲区
      const buffer = new ArrayBuffer(stat.size);
      
      // 读取文件内容
      await fs.read(file.fd, buffer);
      
      // 关闭文件
      await fs.close(file.fd);
      
      return buffer;
    } catch (error) {
      console.error('文件读取失败:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * 获取文件元数据
   * @param uri 文件URI
   */
  async getFileMetadata(uri: string): Promise<FileMetadata> {
    try {
      // 获取文件名作为标题
      const fileName = this.getFileName(uri);
      const title = fileName.replace('.mp3', '').replace('.MP3', '');
      
      // 简单实现，返回基本信息
      // 实际应用中可以使用专业的MP3元数据解析库
      return {
        title: title,
        artist: '未知艺术家',
        album: '本地文件',
        duration: 0,
        bitrate: 0
      };
    } catch (error) {
      console.error('获取元数据失败:', error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error(String(error));
      }
    }
  }

  /**
   * 从URI中提取文件名
   * @param uri 文件URI
   */
  private getFileName(uri: string): string {
    try {
      const parts = uri.split('/');
      return parts[parts.length - 1] || 'unknown.mp3';
    } catch (error) {
      return 'unknown.mp3';
    }
  }

  /**
   * 检查文件是否为MP3格式
   * @param fileName 文件名
   */
  isMP3File(fileName: string): boolean {
    const lowerName = fileName.toLowerCase();
    return lowerName.endsWith('.mp3');
  }

  /**
   * 格式化文件大小
   * @param size 文件大小(字节)
   */
  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else if (size < 1024 * 1024 * 1024) {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    } else {
      return (size / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
    }
  }
}

export default FilePickerService.getInstance();

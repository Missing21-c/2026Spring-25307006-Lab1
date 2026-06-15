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

/**
 * 设备信息
 */
export interface DeviceInfo {
  /** 设备ID */
  deviceId: string;
  /** 设备名称 */
  deviceName: string;
  /** 设备类型 */
  deviceType: 'phone' | 'tablet' | 'watch' | 'unknown';
  /** 是否在线 */
  isOnline: boolean;
}

/**
 * 音乐信息
 */
export interface MusicInfo {
  /** 歌曲ID */
  songId: string;
  /** 歌曲名称 */
  title: string;
  /** 歌手 */
  singer: string;
  /** 封面URL */
  coverUrl: string;
  /** 播放进度(毫秒) */
  playProgress: number;
  /** 总时长(毫秒) */
  duration: number;
  /** 本地文件路径(如果有) */
  localFilePath?: string;
}

/**
 * 传输进度
 */
export interface TransferProgress {
  /** 传输ID */
  transferId: string;
  /** 文件名 */
  fileName: string;
  /** 总大小(字节) */
  totalSize: number;
  /** 已传输大小(字节) */
  transferredSize: number;
  /** 进度百分比(0-100) */
  percent: number;
  /** 传输状态 */
  status: 'pending' | 'transferring' | 'completed' | 'failed';
  /** 错误信息 */
  errorMessage?: string;
}

/**
 * 投送请求
 */
export interface AirDropRequest {
  /** 目标设备ID */
  targetDeviceId: string;
  /** 音乐信息 */
  musicInfo: MusicInfo;
  /** 是否发送文件 */
  sendFile: boolean;
}

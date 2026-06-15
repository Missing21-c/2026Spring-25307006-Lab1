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

import { DeviceInfo } from './AirDropModels';

/**
 * 扩展的设备信息（在原有DeviceInfo基础上增加字段）
 */
export interface ExtendedDeviceInfo extends DeviceInfo {
  /** 设备图标资源 */
  iconResource?: Resource;
  /** 最后发现时间 */
  lastDiscoveredTime?: number;
}

/**
 * 待传输文件信息
 */
export interface PendingTransferFile {
  /** 文件ID */
  fileId: string;
  /** 文件名 */
  fileName: string;
  /** 文件路径 */
  filePath: string;
  /** 文件大小(字节) */
  fileSize: number;
  /** 文件格式 */
  fileFormat: 'mp3' | 'wav' | 'flac' | 'aac' | 'm4a' | 'ogg' | 'other';
  /** 文件时长(毫秒) */
  duration?: number;
  /** 是否选中 */
  isSelected: boolean;
}

/**
 * 传输任务
 */
export interface TransferTask {
  /** 任务ID */
  taskId: string;
  /** 目标设备ID */
  targetDeviceId: string;
  /** 目标设备名称 */
  targetDeviceName: string;
  /** 文件列表 */
  files: PendingTransferFile[];
  /** 总大小 */
  totalSize: number;
  /** 已传输大小 */
  transferredSize: number;
  /** 传输状态 */
  status: 'pending' | 'transferring' | 'paused' | 'completed' | 'failed' | 'cancelled';
  /** 开始时间 */
  startTime?: number;
  /** 结束时间 */
  endTime?: number;
  /** 当前传输文件索引 */
  currentFileIndex: number;
  /** 传输速度(字节/秒) */
  speed: number;
  /** 错误信息 */
  errorMessage?: string;
}

/**
 * 传输历史记录
 */
export interface TransferHistoryRecord {
  /** 记录ID */
  recordId: string;
  /** 文件名 */
  fileName: string;
  /** 文件大小 */
  fileSize: number;
  /** 传输方向 */
  direction: 'send' | 'receive';
  /** 对方设备ID */
  peerDeviceId: string;
  /** 对方设备名称 */
  peerDeviceName: string;
  /** 传输状态 */
  status: 'completed' | 'failed' | 'cancelled';
  /** 传输时间 */
  transferTime: number;
  /** 耗时(毫秒) */
  duration: number;
  /** 本地文件路径(接收时) */
  localPath?: string;
  /** 错误信息 */
  errorMessage?: string;
}

/**
 * 接收请求
 */
export interface ReceiveRequest {
  /** 请求ID */
  requestId: string;
  /** 发送方设备ID */
  senderDeviceId: string;
  /** 发送方设备名称 */
  senderDeviceName: string;
  /** 文件名 */
  fileName: string;
  /** 文件大小 */
  fileSize: number;
  /** 请求时间 */
  requestTime: number;
  /** 超时时间(毫秒) */
  timeout: number;
}

/**
 * 文件验证结果
 */
export interface ValidationResult {
  /** 是否有效 */
  isValid: boolean;
  /** 错误信息列表 */
  errors: string[];
}

/**
 * 历史记录查询过滤器
 */
export interface HistoryFilter {
  /** 传输方向 */
  direction?: 'send' | 'receive';
  /** 状态 */
  status?: 'completed' | 'failed' | 'cancelled';
  /** 开始时间 */
  startTime?: number;
  /** 结束时间 */
  endTime?: number;
  /** 设备ID */
  deviceId?: string;
}

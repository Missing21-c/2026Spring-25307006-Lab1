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

import { Logger } from 'mediacommon';
import { TransferTask } from './TransferModels';
import notificationManager from '@ohos.notificationManager';
import wantAgent from '@ohos.app.ability.wantAgent';
import common from '@ohos.app.ability.common';

const TAG = 'NotificationService';

/**
 * 通知服务
 * 负责传输进度和结果的通知显示
 */
export class NotificationService {
  private static instance: NotificationService;
  private context: common.UIAbilityContext | null = null;
  private progressNotificationId: number = -1;

  private constructor() {}

  /**
   * 获取单例实例
   */
  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  /**
   * 初始化服务
   */
  public initialize(context: common.UIAbilityContext): void {
    this.context = context;
    Logger.info(TAG, 'NotificationService initialized');
  }

  /**
   * 显示传输进度通知
   */
  public async showProgressNotification(task: TransferTask): Promise<void> {
    try {
      if (!this.context) {
        Logger.error(TAG, 'Context not initialized');
        return;
      }

      const currentFile = task.files[task.currentFileIndex];
      const percent = Math.floor((task.transferredSize / task.totalSize) * 100);
      const speedMB = (task.speed / 1024 / 1024).toFixed(2);

      // 创建WantAgent用于点击通知返回应用
      const wantAgentInfo: wantAgent.WantAgentInfo = {
        wants: [
          {
            bundleName: this.context.abilityInfo.bundleName,
            abilityName: this.context.abilityInfo.name
          }
        ],
        operationType: wantAgent.OperationType.START_ABILITY,
        requestCode: 0,
        wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
      };

      const agent = await wantAgent.getWantAgent(wantAgentInfo);

      // 创建通知内容
      const notificationContent: notificationManager.NotificationContent = {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
        normal: {
          title: '文件传输中',
          text: `${currentFile.fileName} (${percent}%)`,
          additionalText: `${speedMB} MB/s`
        }
      };

      const notificationRequest: notificationManager.NotificationRequest = {
        id: this.progressNotificationId === -1 ? Date.now() : this.progressNotificationId,
        content: notificationContent,
        wantAgent: agent,
        isOngoing: true,
        isUnremovable: false
      };

      this.progressNotificationId = notificationRequest.id !== undefined ? notificationRequest.id : -1;
      await notificationManager.publish(notificationRequest);

      Logger.info(TAG, `Progress notification shown: ${percent}%`);
    } catch (error) {
      Logger.error(TAG, `Show progress notification failed: ${JSON.stringify(error)}`);
    }
  }

  /**
   * 更新进度通知
   */
  public async updateProgressNotification(task: TransferTask): Promise<void> {
    await this.showProgressNotification(task);
  }

  /**
   * 显示完成通知
   */
  public async showCompleteNotification(success: boolean, fileName: string): Promise<void> {
    try {
      if (!this.context) {
        Logger.error(TAG, 'Context not initialized');
        return;
      }

      // 先取消进度通知
      if (this.progressNotificationId !== -1) {
        await this.cancelNotification(this.progressNotificationId.toString());
        this.progressNotificationId = -1;
      }

      // 创建WantAgent
      const wantAgentInfo: wantAgent.WantAgentInfo = {
        wants: [
          {
            bundleName: this.context.abilityInfo.bundleName,
            abilityName: this.context.abilityInfo.name
          }
        ],
        operationType: wantAgent.OperationType.START_ABILITY,
        requestCode: 0,
        wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
      };

      const agent = await wantAgent.getWantAgent(wantAgentInfo);

      // 创建通知内容
      const notificationContent: notificationManager.NotificationContent = {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
        normal: {
          title: success ? '传输完成' : '传输失败',
          text: success ? `文件 ${fileName} 已成功传输` : `文件 ${fileName} 传输失败`,
          additionalText: success ? '✓' : '✗'
        }
      };

      const notificationRequest: notificationManager.NotificationRequest = {
        id: Date.now(),
        content: notificationContent,
        wantAgent: agent,
        isOngoing: false,
        isUnremovable: false
      };

      await notificationManager.publish(notificationRequest);

      Logger.info(TAG, `Complete notification shown: ${success ? 'success' : 'failed'}`);
    } catch (error) {
      Logger.error(TAG, `Show complete notification failed: ${JSON.stringify(error)}`);
    }
  }

  /**
   * 显示接收请求通知
   */
  public async showReceiveRequestNotification(
    senderDeviceName: string,
    fileName: string,
    fileSize: number
  ): Promise<void> {
    try {
      if (!this.context) {
        Logger.error(TAG, 'Context not initialized');
        return;
      }

      const sizeMB = (fileSize / 1024 / 1024).toFixed(2);

      // 创建WantAgent
      const wantAgentInfo: wantAgent.WantAgentInfo = {
        wants: [
          {
            bundleName: this.context.abilityInfo.bundleName,
            abilityName: this.context.abilityInfo.name
          }
        ],
        operationType: wantAgent.OperationType.START_ABILITY,
        requestCode: 0,
        wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
      };

      const agent = await wantAgent.getWantAgent(wantAgentInfo);

      // 创建通知内容
      const notificationContent: notificationManager.NotificationContent = {
        notificationContentType: notificationManager.ContentType.NOTIFICATION_CONTENT_BASIC_TEXT,
        normal: {
          title: '文件接收请求',
          text: `${senderDeviceName} 想要发送 ${fileName}`,
          additionalText: `${sizeMB} MB`
        }
      };

      const notificationRequest: notificationManager.NotificationRequest = {
        id: Date.now(),
        content: notificationContent,
        wantAgent: agent,
        isOngoing: false,
        isUnremovable: false
      };

      await notificationManager.publish(notificationRequest);

      Logger.info(TAG, 'Receive request notification shown');
    } catch (error) {
      Logger.error(TAG, `Show receive request notification failed: ${JSON.stringify(error)}`);
    }
  }

  /**
   * 取消通知
   */
  public async cancelNotification(notificationId: string): Promise<void> {
    try {
      const id = parseInt(notificationId);
      await notificationManager.cancel(id);
      Logger.info(TAG, `Notification cancelled: ${notificationId}`);
    } catch (error) {
      Logger.error(TAG, `Cancel notification failed: ${JSON.stringify(error)}`);
    }
  }

  /**
   * 取消所有通知
   */
  public async cancelAllNotifications(): Promise<void> {
    try {
      await notificationManager.cancelAll();
      Logger.info(TAG, 'All notifications cancelled');
    } catch (error) {
      Logger.error(TAG, `Cancel all notifications failed: ${JSON.stringify(error)}`);
    }
  }
}

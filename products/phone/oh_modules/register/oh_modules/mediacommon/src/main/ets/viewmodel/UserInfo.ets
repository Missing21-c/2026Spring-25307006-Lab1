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
 * 用户信息数据模型
 */
export interface UserInfo {
  /**
   * 用户唯一标识
   */
  userId: string;

  /**
   * 用户名
   */
  userName: string;

  /**
   * 用户头像URL
   */
  avatarUrl?: string;

  /**
   * 认证令牌
   */
  token: string;

  /**
   * 登录时间戳
   */
  loginTime: number;
}

/**
 * 创建默认用户信息
 */
export function createDefaultUserInfo(): UserInfo {
  return {
    userId: '',
    userName: '',
    token: '',
    loginTime: 0
  };
}

/**
 * 检查用户信息是否有效
 */
export function isValidUserInfo(userInfo: UserInfo | undefined): boolean {
  if (!userInfo) {
    return false;
  }
  return userInfo.userId.length > 0 && userInfo.userName.length > 0 && userInfo.token.length > 0;
}

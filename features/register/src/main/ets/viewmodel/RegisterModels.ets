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
 * 注册请求参数
 */
export interface RegisterRequest {
  /** 用户名（3-20位字母数字下划线） */
  username: string;
  /** 密码（6-20位字符） */
  password: string;
}

/**
 * 注册响应数据内容
 */
export interface RegisterResponseData {
  /** 用户唯一标识 */
  userId: string;
  /** 用户名 */
  userName: string;
  /** 用户头像URL（可选） */
  avatarUrl?: string;
  /** 认证Token */
  token: string;
}

/**
 * 注册响应数据
 */
export interface RegisterResponse {
  /** 响应码 */
  code: number;
  /** 响应消息 */
  message: string;
  /** 响应数据 */
  data?: RegisterResponseData;
}

/**
 * 验证结果
 */
export interface ValidationResult {
  /** 是否验证通过 */
  isValid: boolean;
  /** 错误消息 */
  errorMessage?: string;
}

/**
 * 表单验证结果（包含多个字段）
 */
export interface FormValidationResult {
  /** 是否全部验证通过 */
  isValid: boolean;
  /** 用户名错误消息 */
  usernameError?: string;
  /** 密码错误消息 */
  passwordError?: string;
  /** 确认密码错误消息 */
  confirmPasswordError?: string;
}

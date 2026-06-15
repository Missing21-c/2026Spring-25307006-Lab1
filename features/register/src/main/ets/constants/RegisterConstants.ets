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
 * 注册功能常量
 */
export class RegisterConstants {
  /** 用户名最小长度 */
  static readonly USERNAME_MIN_LENGTH: number = 3;
  /** 用户名最大长度 */
  static readonly USERNAME_MAX_LENGTH: number = 20;
  /** 用户名格式正则 */
  static readonly USERNAME_PATTERN: RegExp = /^[a-zA-Z0-9_]+$/;

  /** 密码最小长度 */
  static readonly PASSWORD_MIN_LENGTH: number = 6;
  /** 密码最大长度 */
  static readonly PASSWORD_MAX_LENGTH: number = 20;

  /** 注册API路径 */
  static readonly API_REGISTER_PATH: string = '/api/user/register';
}

/**
 * 注册错误消息
 */
export class RegisterErrorMessages {
  static readonly USERNAME_EMPTY: string = '请输入用户名';
  static readonly USERNAME_TOO_SHORT: string = '用户名长度不能少于3位';
  static readonly USERNAME_TOO_LONG: string = '用户名长度不能超过20位';
  static readonly USERNAME_INVALID_FORMAT: string = '用户名只能包含字母、数字和下划线';
  static readonly PASSWORD_EMPTY: string = '请输入密码';
  static readonly PASSWORD_TOO_SHORT: string = '密码长度不能少于6位';
  static readonly PASSWORD_TOO_LONG: string = '密码长度不能超过20位';
  static readonly CONFIRM_PASSWORD_EMPTY: string = '请再次输入密码';
  static readonly CONFIRM_PASSWORD_MISMATCH: string = '两次输入的密码不一致';
  static readonly USERNAME_EXIST: string = '用户名已被注册';
  static readonly PARAM_ERROR: string = '注册信息有误，请检查';
  static readonly NETWORK_UNAVAILABLE: string = '网络不可用，请检查网络连接';
  static readonly SERVER_ERROR: string = '服务器异常，请稍后再试';
  static readonly REGISTER_SUCCESS: string = '注册成功';
}

/**
 * 注册响应码
 */
export class RegisterResponseCode {
  static readonly SUCCESS: number = 0;
  static readonly USERNAME_EXIST: number = 1004;
  static readonly PARAM_ERROR: number = 1003;
  static readonly SERVER_ERROR: number = 5000;
}

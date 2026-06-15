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
 * 登录请求参数
 */
export interface LoginRequest {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
}
/**
 * 登录响应数据内容
 */
export interface LoginResponseData {
    userId: string;
    userName: string;
    avatarUrl?: string;
    token: string;
}
/**
 * 登录响应数据
 */
export interface LoginResponse {
    /**
     * 响应码
     */
    code: number;
    /**
     * 响应消息
     */
    message: string;
    /**
     * 响应数据
     */
    data?: LoginResponseData;
}
/**
 * Token验证响应数据内容
 */
export interface VerifyResponseData {
    valid: boolean;
}
/**
 * Token验证响应
 */
export interface VerifyResponse {
    /**
     * 响应码
     */
    code: number;
    /**
     * 响应消息
     */
    message: string;
    /**
     * 响应数据
     */
    data?: VerifyResponseData;
}
/**
 * 验证结果
 */
export interface ValidationResult {
    /**
     * 是否验证通过
     */
    isValid: boolean;
    /**
     * 错误消息
     */
    errorMessage?: string;
}
/**
 * 保存的登录信息
 */
export interface SavedLoginInfo {
    /**
     * 用户名
     */
    username: string;
    /**
     * 密码
     */
    password: string;
}
/**
 * 登录状态
 */
export class LoginState {
    /**
     * 是否已登录
     */
    isLoggedIn: boolean = false;
    /**
     * 用户信息
     */
    userInfo?: UserInfo;
    /**
     * 登录失败次数
     */
    failedCount: number = 0;
    /**
     * 是否记住密码
     */
    rememberPassword: boolean = false;
    /**
     * 保存的用户名
     */
    savedUsername?: string;
    /**
     * 保存的密码（加密）
     */
    savedPassword?: string;
}
/**
 * 用户信息（从common层导入）
 */
export interface UserInfo {
    userId: string;
    userName: string;
    avatarUrl?: string;
    token: string;
    loginTime: number;
}
/**
 * 创建验证成功结果
 */
export function createValidResult(): ValidationResult {
    return { isValid: true };
}
/**
 * 创建验证失败结果
 */
export function createInvalidResult(errorMessage: string): ValidationResult {
    return { isValid: false, errorMessage };
}

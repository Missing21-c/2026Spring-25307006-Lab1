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
 * 登录功能常量定义
 */
export class LoginConstants {
    // ========== 输入验证规则 ==========
    /**
     * 用户名最小长度
     */
    static readonly USERNAME_MIN_LENGTH: number = 3;
    /**
     * 用户名最大长度
     */
    static readonly USERNAME_MAX_LENGTH: number = 20;
    /**
     * 密码最小长度
     */
    static readonly PASSWORD_MIN_LENGTH: number = 6;
    /**
     * 密码最大长度
     */
    static readonly PASSWORD_MAX_LENGTH: number = 20;
    // ========== 登录限制参数 ==========
    /**
     * 最大登录失败次数
     */
    static readonly MAX_FAILED_COUNT: number = 5;
    /**
     * 登录限制时间（分钟）
     */
    static readonly LIMIT_MINUTES: number = 5;
    /**
     * Token过期天数
     */
    static readonly TOKEN_EXPIRE_DAYS: number = 7;
    // ========== API路径 ==========
    /**
     * 登录接口路径
     */
    static readonly API_LOGIN_PATH: string = '/api/user/login';
    /**
     * Token验证接口路径
     */
    static readonly API_VERIFY_PATH: string = '/api/user/verify';
}
/**
 * 登录错误消息常量
 */
export class LoginErrorMessages {
    /**
     * 用户名为空
     */
    static readonly USERNAME_EMPTY: string = '请输入用户名';
    /**
     * 用户名格式错误
     */
    static readonly USERNAME_FORMAT_ERROR: string = '用户名格式不正确';
    /**
     * 密码为空
     */
    static readonly PASSWORD_EMPTY: string = '请输入密码';
    /**
     * 密码长度不足
     */
    static readonly PASSWORD_LENGTH_ERROR: string = '密码长度不能少于6位';
    /**
     * 用户不存在
     */
    static readonly USER_NOT_EXIST: string = '用户不存在';
    /**
     * 密码错误
     */
    static readonly PASSWORD_ERROR: string = '密码错误';
    /**
     * 网络不可用
     */
    static readonly NETWORK_UNAVAILABLE: string = '网络不可用，请检查网络连接';
    /**
     * 网络请求超时
     */
    static readonly NETWORK_TIMEOUT: string = '网络请求超时，请重试';
    /**
     * 服务器错误
     */
    static readonly SERVER_ERROR: string = '服务器异常，请稍后再试';
    /**
     * 登录失败次数过多
     */
    static readonly LOGIN_LIMITED: string = '登录失败次数过多，请稍后再试';
    /**
     * 登录成功
     */
    static readonly LOGIN_SUCCESS: string = '登录成功';
    /**
     * 退出登录成功
     */
    static readonly LOGOUT_SUCCESS: string = '已退出登录';
}
/**
 * 登录响应码
 */
export class LoginResponseCode {
    /**
     * 成功
     */
    static readonly SUCCESS: number = 0;
    /**
     * 用户不存在
     */
    static readonly USER_NOT_EXIST: number = 1001;
    /**
     * 密码错误
     */
    static readonly PASSWORD_ERROR: number = 1002;
    /**
     * 参数错误
     */
    static readonly PARAM_ERROR: number = 1003;
    /**
     * 服务器错误
     */
    static readonly SERVER_ERROR: number = 5000;
}

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
 * 空投送常量
 */
export class AirDropConstants {
    /** 传输超时时间(毫秒) */
    static readonly TRANSFER_TIMEOUT: number = 30000;
    /** 缓冲区大小 */
    static readonly BUFFER_SIZE: number = 4096;
    /** 服务名称 */
    static readonly SERVICE_NAME: string = 'MusicHomeAirDrop';
}
/**
 * 空投送消息
 */
export class AirDropMessages {
    static readonly NO_DEVICE_FOUND: string = '未发现附近设备';
    static readonly TRANSFER_SUCCESS: string = '投送成功';
    static readonly TRANSFER_FAILED: string = '投送失败';
    static readonly TRANSFER_CANCELLED: string = '投送已取消';
    static readonly DEVICE_DISCONNECTED: string = '设备已断开连接';
    static readonly FILE_NOT_FOUND: string = '文件不存在';
    static readonly TRANSFERRING: string = '正在投送...';
}

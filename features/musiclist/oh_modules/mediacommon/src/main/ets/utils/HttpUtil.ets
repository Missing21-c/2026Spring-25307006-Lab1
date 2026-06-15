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

import { http } from '@kit.NetworkKit';
import { Logger } from './Logger';
import { BusinessError } from '@kit.BasicServicesKit';

const TAG = 'HttpUtil';

/**
 * HTTP请求头项
 */
export interface HttpHeaderItem {
  key: string;
  value: string;
}

/**
 * HTTP请求配置
 */
interface HttpConfig {
  timeout: number;
  headers: Map<string, string>;
}

/**
 * HTTP响应结果
 */
export interface HttpResponse<T> {
  statusCode: number;
  data: T;
  headers: HttpHeaderItem[];
}

/**
 * 合并两个Map
 */
function mergeMaps(base: Map<string, string>, extra: Map<string, string> | undefined): Map<string, string> {
  const result = new Map<string, string>();
  base.forEach((value: string, key: string) => {
    result.set(key, value);
  });
  if (extra) {
    extra.forEach((value: string, key: string) => {
      result.set(key, value);
    });
  }
  return result;
}

/**
 * 将Map转换为HTTP请求头对象
 */
function mapToHeaderObject(map: Map<string, string>): object {
  const obj: Record<string, string> = {};
  map.forEach((value: string, key: string) => {
    obj[key] = value;
  });
  return obj;
}

/**
 * 获取默认请求头
 */
function getDefaultHeaders(): Map<string, string> {
  const headers = new Map<string, string>();
  headers.set('Content-Type', 'application/json');
  headers.set('Accept', 'application/json');
  return headers;
}

const DEFAULT_TIMEOUT: number = 30000;
const BASE_URL: string = 'https://api.musichome.com';

/**
 * HTTP网络请求工具类
 */
export class HttpUtil {
  private static requestMap: Map<string, http.HttpRequest> = new Map();

  /**
   * 发送POST请求
   */
  static async post<T>(url: string, data: object, headers?: Map<string, string>): Promise<HttpResponse<T>> {
    const httpRequest = http.createHttp();
    const requestId = `post_${Date.now()}`;
    HttpUtil.requestMap.set(requestId, httpRequest);

    try {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      const mergedHeaders = mergeMaps(getDefaultHeaders(), headers);

      Logger.info(TAG, `POST request: ${fullUrl}`);

      const response = await httpRequest.request(fullUrl, {
        method: http.RequestMethod.POST,
        header: mapToHeaderObject(mergedHeaders),
        extraData: data,
        connectTimeout: DEFAULT_TIMEOUT,
        readTimeout: DEFAULT_TIMEOUT
      });

      HttpUtil.requestMap.delete(requestId);
      Logger.info(TAG, `POST response: ${response.responseCode}`);

      if (response.responseCode === http.ResponseCode.OK) {
        const result = response.result;
        let responseData: T;
        if (typeof result === 'string') {
          responseData = JSON.parse(result) as T;
        } else {
          responseData = result as T;
        }

        const headerItems: HttpHeaderItem[] = [];
        if (response.header) {
          const headerObj = response.header as Record<string, string>;
          const keys = Object.keys(headerObj);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            headerItems.push({ key: key, value: headerObj[key] });
          }
        }

        return {
          statusCode: response.responseCode,
          data: responseData,
          headers: headerItems
        };
      } else {
        throw new Error(`HTTP error: ${response.responseCode}`);
      }
    } catch (error) {
      HttpUtil.requestMap.delete(requestId);
      const err = error as BusinessError;
      Logger.error(TAG, `POST request failed: ${err.code} - ${err.message}`);
      throw new Error(err.message);
    } finally {
      httpRequest.destroy();
    }
  }

  /**
   * 发送GET请求
   */
  static async get<T>(url: string, headers?: Map<string, string>): Promise<HttpResponse<T>> {
    const httpRequest = http.createHttp();
    const requestId = `get_${Date.now()}`;
    HttpUtil.requestMap.set(requestId, httpRequest);

    try {
      const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
      const mergedHeaders = mergeMaps(getDefaultHeaders(), headers);

      Logger.info(TAG, `GET request: ${fullUrl}`);

      const response = await httpRequest.request(fullUrl, {
        method: http.RequestMethod.GET,
        header: mapToHeaderObject(mergedHeaders),
        connectTimeout: DEFAULT_TIMEOUT,
        readTimeout: DEFAULT_TIMEOUT
      });

      HttpUtil.requestMap.delete(requestId);
      Logger.info(TAG, `GET response: ${response.responseCode}`);

      if (response.responseCode === http.ResponseCode.OK) {
        const result = response.result;
        let responseData: T;
        if (typeof result === 'string') {
          responseData = JSON.parse(result) as T;
        } else {
          responseData = result as T;
        }

        const headerItems: HttpHeaderItem[] = [];
        if (response.header) {
          const headerObj = response.header as Record<string, string>;
          const keys = Object.keys(headerObj);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            headerItems.push({ key: key, value: headerObj[key] });
          }
        }

        return {
          statusCode: response.responseCode,
          data: responseData,
          headers: headerItems
        };
      } else {
        throw new Error(`HTTP error: ${response.responseCode}`);
      }
    } catch (error) {
      HttpUtil.requestMap.delete(requestId);
      const err = error as BusinessError;
      Logger.error(TAG, `GET request failed: ${err.code} - ${err.message}`);
      throw new Error(err.message);
    } finally {
      httpRequest.destroy();
    }
  }

  /**
   * 取消请求
   */
  static cancelRequest(requestId: string): void {
    const httpRequest = HttpUtil.requestMap.get(requestId);
    if (httpRequest) {
      httpRequest.destroy();
      HttpUtil.requestMap.delete(requestId);
      Logger.info(TAG, `Request cancelled: ${requestId}`);
    }
  }

  /**
   * 取消所有请求
   */
  static cancelAllRequests(): void {
    HttpUtil.requestMap.forEach((httpRequest: http.HttpRequest, requestId: string) => {
      httpRequest.destroy();
      Logger.info(TAG, `Request cancelled: ${requestId}`);
    });
    HttpUtil.requestMap.clear();
  }

  /**
   * 设置基础URL
   */
  static setBaseUrl(baseUrl: string): void {
    Logger.info(TAG, `Base URL would be set to: ${baseUrl}`);
  }
}

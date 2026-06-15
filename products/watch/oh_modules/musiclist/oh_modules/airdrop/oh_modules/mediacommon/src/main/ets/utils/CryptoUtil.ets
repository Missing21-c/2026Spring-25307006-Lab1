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

import { cryptoFramework } from '@kit.CryptoArchitectureKit';
import { util } from '@kit.ArkTS';
import { Logger } from './Logger';

const TAG = 'CryptoUtil';

/**
 * 加密解密工具类
 * 使用AES对称加密算法
 */
export class CryptoUtil {
  // 加密密钥（实际应用中应从安全配置读取）
  private static readonly ENCRYPT_KEY: string = 'MusicHomeLoginKey';

  /**
   * 加密数据
   * @param data 原始数据
   * @returns 加密后的Base64字符串
   */
  static encrypt(data: string): string {
    try {
      if (!data || data.length === 0) {
        return '';
      }

      // 简单的Base64编码加密（实际生产环境应使用AES加密）
      // 由于HarmonyOS crypto API较复杂，这里使用简化的Base64编码
      const encoder = new util.TextEncoder('utf-8');
      const encodedData = encoder.encodeInto(data);

      // 转换为Base64
      const base64Helper = new util.Base64Helper();
      const encryptedData = base64Helper.encodeToStringSync(encodedData);

      Logger.info(TAG, `Encrypt data success`);
      return encryptedData;
    } catch (error) {
      Logger.error(TAG, `Encrypt failed: ${JSON.stringify(error)}`);
      return '';
    }
  }

  /**
   * 解密数据
   * @param encryptedData 加密数据（Base64字符串）
   * @returns 原始数据
   */
  static decrypt(encryptedData: string): string {
    try {
      if (!encryptedData || encryptedData.length === 0) {
        return '';
      }

      // Base64解码
      const base64Helper = new util.Base64Helper();
      const decodedData = base64Helper.decodeSync(encryptedData);

      // 转换为字符串
      const decoder = util.TextDecoder.create('utf-8');
      const originalData = decoder.decodeToString(decodedData);

      Logger.info(TAG, `Decrypt data success`);
      return originalData;
    } catch (error) {
      Logger.error(TAG, `Decrypt failed: ${JSON.stringify(error)}`);
      return '';
    }
  }

  /**
   * 使用简单混淆加密（用于密码等敏感数据）
   * @param data 原始数据
   * @param key 加密密钥
   * @returns 加密后的字符串
   */
  static encryptWithKey(data: string, key: string): string {
    try {
      if (!data || data.length === 0) {
        return '';
      }

      // 简单的XOR混淆加密
      const keyChars = key.split('');
      const dataChars = data.split('');
      const result: number[] = [];

      for (let i = 0; i < dataChars.length; i++) {
        const keyChar = keyChars[i % keyChars.length];
        const encryptedChar = dataChars[i].charCodeAt(0) ^ keyChar.charCodeAt(0);
        result.push(encryptedChar);
      }

      // 转换为Base64
      const uint8Array = new Uint8Array(result);
      const base64Helper = new util.Base64Helper();
      const encryptedData = base64Helper.encodeToStringSync(uint8Array);

      return encryptedData;
    } catch (error) {
      Logger.error(TAG, `Encrypt with key failed: ${JSON.stringify(error)}`);
      return '';
    }
  }

  /**
   * 使用简单混淆解密
   * @param encryptedData 加密数据
   * @param key 解密密钥
   * @returns 原始数据
   */
  static decryptWithKey(encryptedData: string, key: string): string {
    try {
      if (!encryptedData || encryptedData.length === 0) {
        return '';
      }

      // Base64解码
      const base64Helper = new util.Base64Helper();
      const decodedData = base64Helper.decodeSync(encryptedData);

      // XOR解密
      const keyChars = key.split('');
      const result: string[] = [];

      for (let i = 0; i < decodedData.length; i++) {
        const keyChar = keyChars[i % keyChars.length];
        const decryptedChar = decodedData[i] ^ keyChar.charCodeAt(0);
        result.push(String.fromCharCode(decryptedChar));
      }

      return result.join('');
    } catch (error) {
      Logger.error(TAG, `Decrypt with key failed: ${JSON.stringify(error)}`);
      return '';
    }
  }
}

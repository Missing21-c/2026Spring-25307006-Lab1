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

import { LoginInputItem } from 'login';

/**
 * 注册表单组件
 */
@Component
export struct RegisterForm {
  /**
   * 用户名
   */
  @Link username: string;

  /**
   * 密码
   */
  @Link password: string;

  /**
   * 确认密码
   */
  @Link confirmPassword: string;

  /**
   * 是否正在加载
   */
  @Prop isLoading: boolean = false;

  /**
   * 用户名错误消息
   */
  @Prop usernameError: string = '';

  /**
   * 密码错误消息
   */
  @Prop passwordError: string = '';

  /**
   * 确认密码错误消息
   */
  @Prop confirmPasswordError: string = '';

  /**
   * 注册回调
   */
  onRegister?: () => void;

  /**
   * 去登录回调
   */
  onGoToLogin?: () => void;

  build() {
    Column({ space: 16 }) {
      // 用户名输入框
      LoginInputItem({
        placeholder: '请输入用户名',
        value: $username,
        isPassword: false,
        errorMessage: this.usernameError
      })

      // 密码输入框
      LoginInputItem({
        placeholder: '请输入密码',
        value: $password,
        isPassword: true,
        errorMessage: this.passwordError
      })

      // 确认密码输入框
      LoginInputItem({
        placeholder: '请再次输入密码',
        value: $confirmPassword,
        isPassword: true,
        errorMessage: this.confirmPasswordError
      })

      // 注册按钮
      Button() {
        if (this.isLoading) {
          LoadingProgress()
            .width(24)
            .height(24)
            .color(Color.White)
        } else {
          Text('注册')
            .fontSize(18)
            .fontColor(Color.White)
        }
      }
      .width('100%')
      .height(48)
      .backgroundColor(this.isLoading ? '#CCCCCC' : '#4CAF50')
      .borderRadius(24)
      .enabled(!this.isLoading)
      .onClick(() => {
        if (this.onRegister) {
          this.onRegister();
        }
      })

      // 已有账号？去登录
      Row() {
        Text('已有账号？')
          .fontSize(14)
          .fontColor('#666666')

        Text('去登录')
          .fontSize(14)
          .fontColor('#4CAF50')
          .onClick(() => {
            if (this.onGoToLogin) {
              this.onGoToLogin();
            }
          })
      }
      .width('100%')
      .justifyContent(FlexAlign.Center)
      .margin({ top: 8 })
    }
    .width('100%')
    .padding({ left: 32, right: 32 })
  }
}

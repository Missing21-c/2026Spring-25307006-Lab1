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

import { LoginInputItem } from './LoginInputItem';

/**
 * 登录表单组件
 */
@Component
export struct LoginForm {
  /**
   * 用户名
   */
  @Link username: string;

  /**
   * 密码
   */
  @Link password: string;

  /**
   * 是否记住密码
   */
  @Link rememberPassword: boolean;

  /**
   * 是否正在加载
   */
  @Prop isLoading: boolean = false;

  /**
   * 错误消息
   */
  @Prop errorMessage: string = '';

  /**
   * 登录回调
   */
  onLogin?: () => void;

  /**
   * 去注册回调
   */
  onGoToRegister?: () => void;

  build() {
    Column({ space: 16 }) {
      // 用户名输入框
      LoginInputItem({
        placeholder: '请输入用户名',
        value: $username,
        isPassword: false,
        errorMessage: ''
      })

      // 密码输入框
      LoginInputItem({
        placeholder: '请输入密码',
        value: $password,
        isPassword: true,
        errorMessage: ''
      })

      // 记住密码选项
      Row() {
        Toggle({ type: ToggleType.Checkbox, isOn: this.rememberPassword })
          .onChange((isOn: boolean) => {
            this.rememberPassword = isOn;
          })
          .width(20)
          .height(20)
          .selectedColor('#4CAF50')

        Text('记住密码')
          .fontSize(14)
          .fontColor('#666666')
          .margin({ left: 8 })
      }
      .width('100%')
      .justifyContent(FlexAlign.Start)

      // 错误提示
      if (this.errorMessage && this.errorMessage.length > 0) {
        Text(this.errorMessage)
          .fontSize(14)
          .fontColor('#FF4444')
          .width('100%')
          .textAlign(TextAlign.Center)
      }

      // 登录按钮
      Button() {
        if (this.isLoading) {
          LoadingProgress()
            .width(24)
            .height(24)
            .color(Color.White)
        } else {
          Text('登录')
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
        if (this.onLogin) {
          this.onLogin();
        }
      })

      // 还没有账号？去注册
      Row() {
        Text('还没有账号？')
          .fontSize(14)
          .fontColor('#666666')

        Text('去注册')
          .fontSize(14)
          .fontColor('#4CAF50')
          .onClick(() => {
            if (this.onGoToRegister) {
              this.onGoToRegister();
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

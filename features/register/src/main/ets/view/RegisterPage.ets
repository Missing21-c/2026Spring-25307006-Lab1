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

import { RouterUrlConstants } from 'constantscommon';
import { Logger, LoginStorageUtil, UserInfo } from 'mediacommon';
import { LoginHeader } from 'login';
import { RegisterViewModel } from '../viewmodel/RegisterViewModel';
import { RegisterErrorMessages, RegisterResponseCode } from '../constants/RegisterConstants';
import { RegisterForm } from './RegisterForm';
import { FormValidationResult } from '../viewmodel/RegisterModels';

const TAG = 'RegisterPage';

/**
 * 注册页面主组件
 */
@Entry
@Component
export struct RegisterPage {
  // 用户名
  @State private username: string = '';
  // 密码
  @State private password: string = '';
  // 确认密码
  @State private confirmPassword: string = '';
  // 是否正在加载
  @State private isLoading: boolean = false;
  // 用户名错误消息
  @State private usernameError: string = '';
  // 密码错误消息
  @State private passwordError: string = '';
  // 确认密码错误消息
  @State private confirmPasswordError: string = '';
  // 导航栈
  @StorageLink('pageIndexInfos') private pageIndexInfos: NavPathStack = new NavPathStack();

  // 用户信息（全局状态）
  @StorageLink('userInfo') private userInfo: UserInfo | undefined = undefined;
  @StorageLink('isLoggedIn') private isLoggedIn: boolean = false;

  /**
   * 页面即将显示
   */
  aboutToAppear(): void {
    // 初始化存储工具
    const context = AppStorage.get<Context>('context');
    if (context) {
      LoginStorageUtil.getInstance().init(context);
    }
  }

  /**
   * 处理注册
   */
  private async handleRegister(): Promise<void> {
    // 清除错误消息
    this.usernameError = '';
    this.passwordError = '';
    this.confirmPasswordError = '';

    // 验证输入
    const viewModel = new RegisterViewModel();
    const validationResult: FormValidationResult = viewModel.validateForm(this.username, this.password, this.confirmPassword);

    if (!validationResult.isValid) {
      this.usernameError = validationResult.usernameError || '';
      this.passwordError = validationResult.passwordError || '';
      this.confirmPasswordError = validationResult.confirmPasswordError || '';
      return;
    }

    // 显示加载状态
    this.isLoading = true;

    try {
      // 执行注册
      const response = await viewModel.register(this.username, this.password);

      // 处理注册结果
      if (response.code === RegisterResponseCode.SUCCESS && response.data) {
        // 注册成功
        const userInfo: UserInfo = {
          userId: response.data.userId,
          userName: response.data.userName,
          avatarUrl: response.data.avatarUrl,
          token: response.data.token,
          loginTime: Date.now()
        };

        // 保存用户信息并自动登录
        await viewModel.saveUserInfo(userInfo);

        // 更新全局状态
        this.userInfo = userInfo;
        this.isLoggedIn = true;

        // 显示成功提示
        this.showToast(RegisterErrorMessages.REGISTER_SUCCESS);

        // 延迟返回上一页
        setTimeout(() => {
          this.handleBack();
        }, 1000);
      } else {
        // 注册失败
        if (response.code === RegisterResponseCode.USERNAME_EXIST) {
          this.usernameError = RegisterErrorMessages.USERNAME_EXIST;
        } else if (response.code === RegisterResponseCode.PARAM_ERROR) {
          this.usernameError = RegisterErrorMessages.PARAM_ERROR;
        } else {
          this.usernameError = response.message || RegisterErrorMessages.SERVER_ERROR;
        }
      }
    } catch (error) {
      Logger.error(TAG, `Register error: ${JSON.stringify(error)}`);
      this.usernameError = RegisterErrorMessages.NETWORK_UNAVAILABLE;
    } finally {
      this.isLoading = false;
    }
  }

  /**
   * 处理返回
   */
  private handleBack(): void {
    this.pageIndexInfos.pop();
  }

  /**
   * 显示提示消息
   */
  private showToast(message: string): void {
    try {
      // 使用PromptAction显示提示
      const uiContext = AppStorage.get<UIContext>('uiContext');
      if (uiContext) {
        const promptAction = uiContext.getPromptAction();
        promptAction.showToast({
          message: message,
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Show toast failed:', error);
    }
  }

  build() {
    Column() {
      // 头部
      LoginHeader({
        title: '用户注册',
        onBack: () => {
          this.handleBack();
        }
      })

      // 表单区域
      Column() {
        // Logo或图标
        Image($r('app.media.ic_music'))
          .width(80)
          .height(80)
          .margin({ top: 40, bottom: 40 })

        // 注册表单
        RegisterForm({
          username: $username,
          password: $password,
          confirmPassword: $confirmPassword,
          isLoading: this.isLoading,
          usernameError: this.usernameError,
          passwordError: this.passwordError,
          confirmPasswordError: this.confirmPasswordError,
          onRegister: () => {
            this.handleRegister();
          },
          onGoToLogin: () => {
            this.handleBack();
          }
        })
      }
      .layoutWeight(1)
      .width('100%')
    }
    .width('100%')
    .height('100%')
    .backgroundColor('#FFFFFF')
    .expandSafeArea([SafeAreaType.SYSTEM])
  }
}

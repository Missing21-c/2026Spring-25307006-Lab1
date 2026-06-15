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
import { StyleConstants } from 'constantscommon';
import { Logger } from 'mediacommon';
import { LoginStorageUtil, UserInfo } from 'mediacommon';
import LoginViewModel from '../viewmodel/LoginViewModel';
import { LoginErrorMessages, LoginResponseCode } from '../constants/LoginConstants';
import { LoginHeader } from './LoginHeader';
import { LoginForm } from './LoginForm';

const TAG = 'LoginPage';

/**
 * 登录页面主组件
 */
@Entry
@Component
export struct LoginPage {
  // 用户名
  @State private username: string = '';
  // 密码
  @State private password: string = '';
  // 是否记住密码
  @State private rememberPassword: boolean = false;
  // 是否正在加载
  @State private isLoading: boolean = false;
  // 错误消息
  @State private errorMessage: string = '';
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

    // 加载记住的登录信息
    this.loadRememberInfo();
  }

  /**
   * 加载记住的登录信息
   */
  private async loadRememberInfo(): Promise<void> {
    const savedInfo = await LoginViewModel.getRememberInfo();
    if (savedInfo) {
      this.username = savedInfo.username;
      this.password = savedInfo.password;
      this.rememberPassword = true;
    }
  }

  /**
   * 处理登录
   */
  private async handleLogin(): Promise<void> {
    // 清除错误消息
    this.errorMessage = '';

    // 验证输入
    const validationResult = LoginViewModel.validateInput(this.username, this.password);
    if (!validationResult.isValid) {
      this.errorMessage = validationResult.errorMessage || '';
      return;
    }

    // 检查登录限制
    const limitResult = await LoginViewModel.checkLoginLimit();
    if (limitResult.isLimited) {
      this.errorMessage = `${LoginErrorMessages.LOGIN_LIMITED}（剩余${limitResult.remainingTime}分钟）`;
      return;
    }

    // 显示加载状态
    this.isLoading = true;

    try {
      // 执行登录
      const response = await LoginViewModel.login(this.username, this.password);

      // 处理登录结果
      if (response.code === LoginResponseCode.SUCCESS && response.data) {
        // 登录成功
        const userInfo: UserInfo = {
          userId: response.data.userId,
          userName: response.data.userName,
          avatarUrl: response.data.avatarUrl,
          token: response.data.token,
          loginTime: Date.now()
        };

        // 保存用户信息
        await LoginViewModel.saveLoginInfo(userInfo);

        // 处理记住密码
        if (this.rememberPassword) {
          await LoginViewModel.saveRememberInfo(this.username, this.password);
        } else {
          await LoginViewModel.clearRememberInfo();
        }

        // 重置失败次数
        await LoginViewModel.resetFailedCount();

        // 更新全局状态
        this.userInfo = userInfo;
        this.isLoggedIn = true;

        // 显示成功提示
        this.showToast(LoginErrorMessages.LOGIN_SUCCESS);

        // 延迟返回上一页
        setTimeout(() => {
          this.handleBack();
        }, 1000);
      } else {
        // 登录失败
        await LoginViewModel.recordFailedAttempt();

        // 设置错误消息
        if (response.code === LoginResponseCode.USER_NOT_EXIST) {
          this.errorMessage = LoginErrorMessages.USER_NOT_EXIST;
        } else if (response.code === LoginResponseCode.PASSWORD_ERROR) {
          this.errorMessage = LoginErrorMessages.PASSWORD_ERROR;
          // 清空密码
          this.password = '';
        } else {
          this.errorMessage = response.message || LoginErrorMessages.SERVER_ERROR;
        }
      }
    } catch (error) {
      Logger.error(TAG, `Login error: ${JSON.stringify(error)}`);
      this.errorMessage = LoginErrorMessages.NETWORK_UNAVAILABLE;
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

        // 登录表单
        LoginForm({
          username: $username,
          password: $password,
          rememberPassword: $rememberPassword,
          isLoading: this.isLoading,
          errorMessage: this.errorMessage,
          onLogin: () => {
            this.handleLogin();
          },
          onGoToRegister: () => {
            this.pageIndexInfos.pushPath({ name: RouterUrlConstants.REGISTER });
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

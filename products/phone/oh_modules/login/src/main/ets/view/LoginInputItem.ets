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
 * 登录输入框组件
 */
@Component
export struct LoginInputItem {
  /**
   * 占位文本
   */
  @Prop placeholder: string = '';

  /**
   * 输入值
   */
  @Link value: string;

  /**
   * 是否为密码框
   */
  @Prop isPassword: boolean = false;

  /**
   * 错误消息
   */
  @Prop errorMessage: string = '';

  /**
   * 是否显示密码
   */
  @State private showPassword: boolean = false;

  /**
   * 输入变化回调
   */
  onValueChange?: (value: string) => void;

  build() {
    Column() {
      Row() {
        TextInput({ placeholder: this.placeholder, text: this.value })
          .type(this.isPassword && !this.showPassword ? InputType.Password : InputType.Normal)
          .onChange((value: string) => {
            this.value = value;
            if (this.onValueChange) {
              this.onValueChange(value);
            }
          })
          .layoutWeight(1)
          .height(48)
          .fontSize(16)
          .fontColor('#333333')
          .placeholderColor('#999999')
          .backgroundColor('#F5F5F5')
          .borderRadius(8)
          .padding({ left: 16, right: 16 })

        // 密码可见性切换按钮
        if (this.isPassword) {
          Button() {
            Image(this.showPassword ? $r('app.media.ic_eye_open') : $r('app.media.ic_eye_close'))
              .width(24)
              .height(24)
              .fillColor('#999999')
          }
          .width(40)
          .height(40)
          .backgroundColor(Color.Transparent)
          .margin({ left: 8 })
          .onClick(() => {
            this.showPassword = !this.showPassword;
          })
        }
      }
      .width('100%')
      .height(48)
      .justifyContent(FlexAlign.SpaceBetween)

      // 错误提示
      if (this.errorMessage && this.errorMessage.length > 0) {
        Text(this.errorMessage)
          .fontSize(12)
          .fontColor('#FF4444')
          .margin({ top: 4 })
          .width('100%')
      }
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }
}

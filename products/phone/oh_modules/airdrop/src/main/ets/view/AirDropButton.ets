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

import { MusicInfo } from '../viewmodel/AirDropModels';
import { AirDropPanel } from './AirDropPanel';

/**
 * 空投送按钮组件
 */
@Component
export struct AirDropButton {
  /** 音乐信息 */
  @Prop musicInfo: MusicInfo | null = null;
  /** 是否显示面板 */
  @State private isShowPanel: boolean = false;

  /** 投送完成回调 */
  onComplete?: (success: boolean) => void;

  build() {
    Column() {
      // 投送按钮
      Button() {
        Image($r('app.media.ic_music_list'))
          .width(24)
          .height(24)
          .fillColor(Color.White)
      }
      .width(44)
      .height(44)
      .backgroundColor('#4CAF50')
      .borderRadius(22)
      .onClick(() => {
        this.isShowPanel = true;
      })

      // 投送面板（使用bindSheet）
      if (this.isShowPanel) {
        this.panelBuilder()
      }
    }
    .bindSheet($$this.isShowPanel, this.panelBuilder(), {
      height: 400,
      backgroundColor: Color.Transparent,
      dragBar: false
    })
  }

  @Builder
  panelBuilder() {
    AirDropPanel({
      isShow: $isShowPanel,
      musicInfo: this.musicInfo,
      onComplete: (success: boolean) => {
        if (this.onComplete) {
          this.onComplete(success);
        }
      }
    })
  }
}

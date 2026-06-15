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

import { BreakpointConstants, RouterUrlConstants, StyleConstants } from 'constantscommon';
import { LivePage } from 'live';
import { MusicListPage } from 'musiclist';
import { MusicCommentPage } from 'musiccomment';
import { LoginPage, LoginViewModel } from 'login';
import { RegisterPage } from 'register';
import IndexItem from '../viewmodel/IndexItem';
import IndexViewModel from '../viewmodel/IndexViewModel';
import { HomeConstants } from '../common/constants/HomeConstants';
import { LoginStorageUtil, UserInfo } from 'mediacommon';

@Entry
@Component
struct Index {
  @State indexItemList: IndexItem[] = IndexViewModel.getIndexItemList();
  @StorageLink('pageIndexInfos') pageIndexInfos: NavPathStack = new NavPathStack();
  @StorageLink('topRectHeight') topRectHeight: number = 0;
  // 登录状态
  @StorageLink('userInfo') userInfo: UserInfo | undefined = undefined;
  @StorageLink('isLoggedIn') isLoggedIn: boolean = false;

  /**
   * 页面即将显示
   */
  aboutToAppear(): void {
    // 初始化登录状态
    this.initLoginState();
  }

  /**
   * 初始化登录状态
   */
  private async initLoginState(): Promise<void> {
    // 初始化存储工具
    const context = AppStorage.get<Context>('context');
    if (context) {
      await LoginStorageUtil.getInstance().init(context);
    }

    // 检查自动登录
    const userInfo = await LoginViewModel.checkAutoLogin();
    if (userInfo) {
      this.userInfo = userInfo;
      this.isLoggedIn = true;
    } else {
      this.userInfo = undefined;
      this.isLoggedIn = false;
    }
  }

  /**
   * 处理登录入口点击
   */
  private handleLoginClick(): void {
    if (this.isLoggedIn) {
      // 已登录，显示用户菜单（可扩展）
      // 这里暂时只做退出登录
      this.showLogoutDialog();
    } else {
      // 未登录，跳转登录页
      this.pageIndexInfos.pushPathByName(RouterUrlConstants.LOGIN, null);
    }
  }

  /**
   * 显示退出登录对话框
   */
  private showLogoutDialog(): void {
    const uiContext = AppStorage.get<UIContext>('uiContext');
    if (uiContext) {
      const promptAction = uiContext.getPromptAction();
      promptAction.showDialog({
        title: '提示',
        message: '确定要退出登录吗？',
        buttons: [
          { text: '取消', color: '#666666' },
          { text: '确定', color: '#FF4444' }
        ]
      }, (error, data) => {
        if (data.index === 1) {
          this.handleLogout();
        }
      });
    }
  }

  /**
   * 处理退出登录
   */
  private async handleLogout(): Promise<void> {
    try {
      await LoginViewModel.clearLoginInfo();
      this.userInfo = undefined;
      this.isLoggedIn = false;

      // 显示提示
      const uiContext = AppStorage.get<UIContext>('uiContext');
      if (uiContext) {
        const promptAction = uiContext.getPromptAction();
        promptAction.showToast({
          message: '已退出登录',
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  /**
   * 根据功能URL获取对应的底部栏图标资源
   */
  private getTabIcon(url: string): Resource {
    if (url === RouterUrlConstants.MUSIC_LIST) {
      return $r('app.media.ic_music_icon');
    } else if (url === RouterUrlConstants.LIVE) {
      return $r('app.media.ic_live');
    }
    return $r('app.media.ic_music');
  }

  @Builder
  PagesMap(name: string, param?: object) {
    if (name === RouterUrlConstants.LIVE) {
      NavDestination() {
        LivePage()
      }
      .hideTitleBar(true)
    } else if (name === RouterUrlConstants.MUSIC_LIST) {
      NavDestination() {
        MusicListPage()
      }
      .hideTitleBar(true)
    } else if (name === RouterUrlConstants.MUSIC_COMMENT) {
      NavDestination() {
        MusicCommentPage()
      }
      .hideTitleBar(true)
    } else if (name === RouterUrlConstants.LOGIN) {
      NavDestination() {
        LoginPage()
      }
      .hideTitleBar(true)
    } else if (name === RouterUrlConstants.REGISTER) {
      NavDestination() {
        RegisterPage()
      }
      .hideTitleBar(true)
    }
  }

  build() {
    Navigation(this.pageIndexInfos) {
      Column() {
        // 顶部区域：用户信息/登录
        Row() {
          if (this.isLoggedIn && this.userInfo) {
            // 已登录：显示用户信息
            Row() {
              Image(this.userInfo.avatarUrl || $r('app.media.ic_music'))
                .width(40)
                .height(40)
                .borderRadius(20)
                .margin({ right: 8 })

              Text(this.userInfo.userName)
                .fontSize(16)
                .fontColor(Color.White)
            }
            .onClick(() => {
              this.handleLoginClick();
            })
          } else {
            // 未登录：显示登录按钮
            Button('登录')
              .fontSize(14)
              .fontColor(Color.White)
              .backgroundColor('#4CAF50')
              .borderRadius(16)
              .height(32)
              .padding({ left: 16, right: 16 })
              .onClick(() => {
                this.handleLoginClick();
              })
          }
        }
        .width('100%')
        .justifyContent(FlexAlign.End)
        .padding({ left: 16, right: 16, top: 12, bottom: 12 })
        .backgroundColor('#3a3a5a')

        // 中间区域：歌曲推荐
        Scroll() {
          Column() {
            // 推荐标题
            Text('为你推荐')
              .fontSize(24)
              .fontColor(Color.White)
              .fontWeight(FontWeight.Bold)
              .margin({ top: 20, bottom: 16 })
              .width('100%')
              .padding({ left: 16 })

            // 推荐歌曲列表
            GridRow({
              breakpoints: {
                value: BreakpointConstants.BREAKPOINT_VALUE,
                reference: BreakpointsReference.WindowSize
              },
              columns: {
                sm: BreakpointConstants.COLUMN_SM,
                md: BreakpointConstants.COLUMN_MD,
                lg: BreakpointConstants.COLUMN_LG
              },
              gutter: { x: BreakpointConstants.GUTTER_X },
              direction: GridRowDirection.Row
            }) {
              GridCol({
                span: {
                  sm: BreakpointConstants.SPAN_SM,
                  md: BreakpointConstants.SPAN_MD,
                  lg: BreakpointConstants.SPAN_LG
                },
                offset: {
                  md: BreakpointConstants.OFFSET_MD,
                  lg: BreakpointConstants.OFFSET_LG
                }
              }) {
                Column({ space: HomeConstants.COLUMN_SPACE }) {
                  ForEach(this.indexItemList, (item: IndexItem) => {
                    Column() {
                      Text(item.title)
                        .fontSize($r('app.float.title_font_size'))
                        .fontColor(Color.White)
                      Blank()
                    }
                    .width(StyleConstants.FULL_WIDTH)
                    .padding($r('app.float.item_padding'))
                    .alignItems(HorizontalAlign.Start)
                    .justifyContent(FlexAlign.SpaceBetween)
                    .borderRadius($r('app.float.item_border_radius'))
                    .backgroundImage(item.icon)
                    .backgroundImageSize(ImageSize.Cover)
                    .onClick(() => {
                      this.pageIndexInfos.pushPathByName(item.url, null);
                    })
                    .stateStyles({
                      normal: {
                        .opacity(1)
                      },
                      pressed: {
                        .opacity(HomeConstants.CARD_PRESSED_OPACITY)
                      }
                    })
                  }, (item: IndexItem, index?: number) => index + JSON.stringify(item))
                }
              }
            }
            .padding({
              left: $r('app.float.column_padding_left'),
              right: $r('app.float.column_padding_right'),
              bottom: 16
            })
          }
          .width('100%')
        }
        .scrollBar(BarState.Off)
        .layoutWeight(1)

        // 底部区域：功能按钮（排除评论）
        Row() {
          ForEach(this.indexItemList.filter((item: IndexItem) => item.url !== RouterUrlConstants.MUSIC_COMMENT),
            (item: IndexItem) => {
              Column() {
                Image(this.getTabIcon(item.url))
                  .width(HomeConstants.TAB_ICON_SIZE)
                  .height(HomeConstants.TAB_ICON_SIZE)
                  .margin({ bottom: HomeConstants.TAB_ICON_MARGIN })

                Text(item.title)
                  .fontSize(HomeConstants.TAB_TEXT_SIZE)
                  .fontColor(Color.White)
              }
              .layoutWeight(1)
              .padding({
                top: HomeConstants.TAB_PADDING,
                bottom: HomeConstants.TAB_PADDING
              })
              .onClick(() => {
                this.pageIndexInfos.pushPathByName(item.url, null);
              })
            }, (item: IndexItem, index?: number) => index + JSON.stringify(item))
        }
        .width(StyleConstants.FULL_WIDTH)
        .height(HomeConstants.BOTTOM_BAR_HEIGHT)
        .backgroundColor(HomeConstants.BOTTOM_BAR_COLOR)
        .justifyContent(FlexAlign.SpaceEvenly)
        .margin({ bottom: 0 })
      }
      .width('100%')
      .height('100%')
      .margin({ top: this.getUIContext().px2vp(this.topRectHeight) })
      .expandSafeArea([SafeAreaType.SYSTEM])
    }
    .mode(NavigationMode.Stack)
    .navDestination(this.PagesMap)
    .height(StyleConstants.FULL_HEIGHT)
    .hideTitleBar(true)
    .hideToolBar(true)
  }
}
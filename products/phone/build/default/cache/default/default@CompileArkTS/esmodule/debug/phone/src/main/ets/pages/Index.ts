if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface Index_Params {
    indexItemList?: IndexItem[];
    pageIndexInfos?: NavPathStack;
    topRectHeight?: number;
    userInfo?: UserInfo | undefined;
    isLoggedIn?: boolean;
}
import { BreakpointConstants, RouterUrlConstants, StyleConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import { LivePage } from "@bundle:com.huawei.music.musichome/phone@live/Index";
import { MusicListPage } from "@bundle:com.huawei.music.musichome/phone@musiclist/Index";
import { MusicCommentPage } from "@bundle:com.huawei.music.musichome/phone@musiccomment/Index";
import { LoginPage, LoginViewModel } from "@bundle:com.huawei.music.musichome/phone@login/Index";
import { RegisterPage } from "@bundle:com.huawei.music.musichome/phone@register/Index";
import type IndexItem from '../viewmodel/IndexItem';
import IndexViewModel from "@bundle:com.huawei.music.musichome/phone/ets/viewmodel/IndexViewModel";
import { HomeConstants } from "@bundle:com.huawei.music.musichome/phone/ets/common/constants/HomeConstants";
import { LoginStorageUtil } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { UserInfo } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
class Index extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__indexItemList = new ObservedPropertyObjectPU(IndexViewModel.getIndexItemList(), this, "indexItemList");
        this.__pageIndexInfos = this.createStorageLink('pageIndexInfos', new NavPathStack(), "pageIndexInfos");
        this.__topRectHeight = this.createStorageLink('topRectHeight', 0, "topRectHeight");
        this.__userInfo = this.createStorageLink('userInfo', undefined, "userInfo");
        this.__isLoggedIn = this.createStorageLink('isLoggedIn', false, "isLoggedIn");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: Index_Params) {
        if (params.indexItemList !== undefined) {
            this.indexItemList = params.indexItemList;
        }
    }
    updateStateVars(params: Index_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__indexItemList.purgeDependencyOnElmtId(rmElmtId);
        this.__pageIndexInfos.purgeDependencyOnElmtId(rmElmtId);
        this.__topRectHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__userInfo.purgeDependencyOnElmtId(rmElmtId);
        this.__isLoggedIn.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__indexItemList.aboutToBeDeleted();
        this.__pageIndexInfos.aboutToBeDeleted();
        this.__topRectHeight.aboutToBeDeleted();
        this.__userInfo.aboutToBeDeleted();
        this.__isLoggedIn.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __indexItemList: ObservedPropertyObjectPU<IndexItem[]>;
    get indexItemList() {
        return this.__indexItemList.get();
    }
    set indexItemList(newValue: IndexItem[]) {
        this.__indexItemList.set(newValue);
    }
    private __pageIndexInfos: ObservedPropertyAbstractPU<NavPathStack>;
    get pageIndexInfos() {
        return this.__pageIndexInfos.get();
    }
    set pageIndexInfos(newValue: NavPathStack) {
        this.__pageIndexInfos.set(newValue);
    }
    private __topRectHeight: ObservedPropertyAbstractPU<number>;
    get topRectHeight() {
        return this.__topRectHeight.get();
    }
    set topRectHeight(newValue: number) {
        this.__topRectHeight.set(newValue);
    }
    // 登录状态
    private __userInfo: ObservedPropertyAbstractPU<UserInfo | undefined>;
    get userInfo() {
        return this.__userInfo.get();
    }
    set userInfo(newValue: UserInfo | undefined) {
        this.__userInfo.set(newValue);
    }
    private __isLoggedIn: ObservedPropertyAbstractPU<boolean>;
    get isLoggedIn() {
        return this.__isLoggedIn.get();
    }
    set isLoggedIn(newValue: boolean) {
        this.__isLoggedIn.set(newValue);
    }
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
        }
        else {
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
        }
        else {
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
        }
        catch (error) {
            console.error('Logout failed:', error);
        }
    }
    /**
     * 根据功能URL获取对应的底部栏图标资源
     */
    private getTabIcon(url: string): Resource {
        if (url === RouterUrlConstants.MUSIC_LIST) {
            return { "id": 150994979, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
        }
        else if (url === RouterUrlConstants.LIVE) {
            return { "id": 150994977, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
        }
        return { "id": 150994978, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" };
    }
    PagesMap(name: string, param?: object, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (name === RouterUrlConstants.LIVE) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LivePage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 141, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "LivePage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.MUSIC_LIST) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MusicListPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 146, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "MusicListPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.MUSIC_COMMENT) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MusicCommentPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 151, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "MusicCommentPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.LOGIN) {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new LoginPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 156, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "LoginPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else if (name === RouterUrlConstants.REGISTER) {
                this.ifElseBranchUpdateFunction(4, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        NavDestination.create(() => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new RegisterPage(this, {}, undefined, elmtId, () => { }, { page: "products/phone/src/main/ets/pages/Index.ets", line: 161, col: 9 });
                                        ViewPU.create(componentCall);
                                        let paramsLambda = () => {
                                            return {};
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {});
                                    }
                                }, { name: "RegisterPage" });
                            }
                        }, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index" });
                        NavDestination.hideTitleBar(true);
                    }, NavDestination);
                    NavDestination.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(5, () => {
                });
            }
        }, If);
        If.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageIndexInfos, { moduleName: "phone", pagePath: "products/phone/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.mode(NavigationMode.Stack);
            Navigation.navDestination({ builder: this.PagesMap.bind(this) });
            Navigation.height(StyleConstants.FULL_HEIGHT);
            Navigation.hideTitleBar(true);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.margin({ top: this.getUIContext().px2vp(this.topRectHeight) });
            Column.expandSafeArea([SafeAreaType.SYSTEM]);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 顶部区域：用户信息/登录
            Row.create();
            // 顶部区域：用户信息/登录
            Row.width('100%');
            // 顶部区域：用户信息/登录
            Row.justifyContent(FlexAlign.End);
            // 顶部区域：用户信息/登录
            Row.padding({ left: 16, right: 16, top: 12, bottom: 12 });
            // 顶部区域：用户信息/登录
            Row.backgroundColor('#3a3a5a');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isLoggedIn && this.userInfo) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 已登录：显示用户信息
                        Row.create();
                        // 已登录：显示用户信息
                        Row.onClick(() => {
                            this.handleLoginClick();
                        });
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.userInfo.avatarUrl || { "id": 150994978, "type": 20000, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                        Image.width(40);
                        Image.height(40);
                        Image.borderRadius(20);
                        Image.margin({ right: 8 });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.userInfo.userName);
                        Text.fontSize(16);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                    // 已登录：显示用户信息
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 未登录：显示登录按钮
                        Button.createWithLabel('登录');
                        // 未登录：显示登录按钮
                        Button.fontSize(14);
                        // 未登录：显示登录按钮
                        Button.fontColor(Color.White);
                        // 未登录：显示登录按钮
                        Button.backgroundColor('#4CAF50');
                        // 未登录：显示登录按钮
                        Button.borderRadius(16);
                        // 未登录：显示登录按钮
                        Button.height(32);
                        // 未登录：显示登录按钮
                        Button.padding({ left: 16, right: 16 });
                        // 未登录：显示登录按钮
                        Button.onClick(() => {
                            this.handleLoginClick();
                        });
                    }, Button);
                    // 未登录：显示登录按钮
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        // 顶部区域：用户信息/登录
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 中间区域：歌曲推荐
            Scroll.create();
            // 中间区域：歌曲推荐
            Scroll.scrollBar(BarState.Off);
            // 中间区域：歌曲推荐
            Scroll.layoutWeight(1);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 推荐标题
            Text.create('为你推荐');
            // 推荐标题
            Text.fontSize(24);
            // 推荐标题
            Text.fontColor(Color.White);
            // 推荐标题
            Text.fontWeight(FontWeight.Bold);
            // 推荐标题
            Text.margin({ top: 20, bottom: 16 });
            // 推荐标题
            Text.width('100%');
            // 推荐标题
            Text.padding({ left: 16 });
        }, Text);
        // 推荐标题
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 推荐歌曲列表
            GridRow.create({
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
            });
            // 推荐歌曲列表
            GridRow.padding({
                left: { "id": 150994968, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                right: { "id": 150994969, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" },
                bottom: 16
            });
        }, GridRow);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            GridCol.create({
                span: {
                    sm: BreakpointConstants.SPAN_SM,
                    md: BreakpointConstants.SPAN_MD,
                    lg: BreakpointConstants.SPAN_LG
                },
                offset: {
                    md: BreakpointConstants.OFFSET_MD,
                    lg: BreakpointConstants.OFFSET_LG
                }
            });
        }, GridCol);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: HomeConstants.COLUMN_SPACE });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width(StyleConstants.FULL_WIDTH);
                    Column.padding({ "id": 150994975, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Column.alignItems(HorizontalAlign.Start);
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.borderRadius({ "id": 150994973, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Column.backgroundImage(item.icon);
                    Column.backgroundImageSize(ImageSize.Cover);
                    Column.onClick(() => {
                        this.pageIndexInfos.pushPathByName(item.url, null);
                    });
                    ViewStackProcessor.visualState("normal");
                    Column.opacity(1);
                    ViewStackProcessor.visualState("pressed");
                    Column.opacity(HomeConstants.CARD_PRESSED_OPACITY);
                    ViewStackProcessor.visualState();
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize({ "id": 150994976, "type": 10002, params: [], "bundleName": "com.huawei.music.musichome", "moduleName": "phone" });
                    Text.fontColor(Color.White);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Blank.create();
                }, Blank);
                Blank.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.indexItemList, forEachItemGenFunction, (item: IndexItem, index?: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        Column.pop();
        GridCol.pop();
        // 推荐歌曲列表
        GridRow.pop();
        Column.pop();
        // 中间区域：歌曲推荐
        Scroll.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 底部区域：功能按钮（排除评论）
            Row.create();
            // 底部区域：功能按钮（排除评论）
            Row.width(StyleConstants.FULL_WIDTH);
            // 底部区域：功能按钮（排除评论）
            Row.height(HomeConstants.BOTTOM_BAR_HEIGHT);
            // 底部区域：功能按钮（排除评论）
            Row.backgroundColor(HomeConstants.BOTTOM_BAR_COLOR);
            // 底部区域：功能按钮（排除评论）
            Row.justifyContent(FlexAlign.SpaceEvenly);
            // 底部区域：功能按钮（排除评论）
            Row.margin({ bottom: 0 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.layoutWeight(1);
                    Column.padding({
                        top: HomeConstants.TAB_PADDING,
                        bottom: HomeConstants.TAB_PADDING
                    });
                    Column.onClick(() => {
                        this.pageIndexInfos.pushPathByName(item.url, null);
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(this.getTabIcon(item.url));
                    Image.width(HomeConstants.TAB_ICON_SIZE);
                    Image.height(HomeConstants.TAB_ICON_SIZE);
                    Image.margin({ bottom: HomeConstants.TAB_ICON_MARGIN });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.title);
                    Text.fontSize(HomeConstants.TAB_TEXT_SIZE);
                    Text.fontColor(Color.White);
                }, Text);
                Text.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.indexItemList.filter((item: IndexItem) => item.url !== RouterUrlConstants.MUSIC_COMMENT), forEachItemGenFunction, (item: IndexItem, index?: number) => index + JSON.stringify(item), false, true);
        }, ForEach);
        ForEach.pop();
        // 底部区域：功能按钮（排除评论）
        Row.pop();
        Column.pop();
        Navigation.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.huawei.music.musichome", moduleName: "phone", pagePath: "pages/Index", pageFullPath: "products/phone/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });

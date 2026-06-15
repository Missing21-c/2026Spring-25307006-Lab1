import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import display from "@ohos:display";
import window from "@ohos:window";
import { BreakpointConstants } from "@bundle:com.huawei.music.musichome/phone@constantscommon/index";
import type { BusinessError } from "@ohos:base";
import { AirDropViewModel, TransferHistoryService, FileSelectionService, DeviceTransferViewModel, NotificationService } from "@bundle:com.huawei.music.musichome/phone@airdrop/Index";
export default class EntryAbility extends UIAbility {
    private windowObj?: window.Window;
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam) {
        AppStorage.setOrCreate('context', this.context);
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onCreate');
        // 初始化传输服务
        this.initializeTransferServices();
    }
    /**
     * 初始化传输服务
     */
    private async initializeTransferServices(): Promise<void> {
        try {
            // 初始化 AirDropViewModel
            const airDropViewModel = AirDropViewModel.getInstance();
            await airDropViewModel.initialize(this.context);
            // 初始化传输历史服务
            const historyService = TransferHistoryService.getInstance();
            await historyService.initialize(this.context);
            // 初始化文件选择服务
            const fileSelectionService = FileSelectionService.getInstance();
            fileSelectionService.initialize(this.context);
            // 初始化通知服务
            const notificationService = NotificationService.getInstance();
            notificationService.initialize(this.context);
            // 设置接收监听
            const transferViewModel = DeviceTransferViewModel.getInstance();
            transferViewModel.setupReceiveListener((request) => {
                hilog.info(0x0000, 'TransferService', `Received transfer request: ${request.fileName}`);
            }, (fileName, fileData) => {
                hilog.info(0x0000, 'TransferService', `Received file: ${fileName}, size: ${fileData.byteLength}`);
            });
            hilog.info(0x0000, 'TransferService', 'All transfer services initialized');
        }
        catch (error) {
            hilog.error(0x0000, 'TransferService', `Initialize failed: ${JSON.stringify(error)}`);
        }
    }
    onDestroy() {
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onDestroy');
    }
    onWindowStageCreate(windowStage: window.WindowStage) {
        // Main window is created, set main page for this ability
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageCreate');
        windowStage.loadContent('pages/Index', (err) => {
            try {
                AppStorage.setOrCreate('uiContext', windowStage.getMainWindowSync().getUIContext());
            }
            catch (error) {
                hilog.error(0x0000, 'testTag', `getMainWindowSync error ${JSON.stringify(error)}`);
            }
            if (err.code) {
                hilog.error(0x0000, 'testTag', 'Failed to load the content. Cause: %{public}s', JSON.stringify(err) ?? '');
                return;
            }
            hilog.info(0x0000, 'testTag', 'Succeeded in loading the content.');
            windowStage.getMainWindow().then((data: window.Window) => {
                try {
                    this.windowObj = data;
                    let uiContext = data.getUIContext();
                    this.updateBreakpoint(this.windowObj.getWindowProperties().windowRect.width, uiContext);
                    this.windowObj.on('windowSizeChange', (windowSize: window.Size) => {
                        this.updateBreakpoint(windowSize.width, uiContext);
                    });
                    data.setWindowLayoutFullScreen(true).then(() => {
                        hilog.info(0x0000, 'EntryAbility', 'Succeeded in setting the window layout to full-screen mode.');
                    }).catch((err: BusinessError) => {
                        hilog.info(0x0000, 'EntryAbility', `Failed to set the window layout to full-screen mode. Cause: code=${err.code}, message=${err.message}`);
                    });
                    let type = window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR;
                    let avoidArea = data.getWindowAvoidArea(type);
                    let bottomRectHeight = avoidArea.bottomRect.height;
                    AppStorage.setOrCreate('bottomRectHeight', bottomRectHeight);
                    type = window.AvoidAreaType.TYPE_SYSTEM;
                    avoidArea = data.getWindowAvoidArea(type);
                    let topRectHeight = avoidArea.topRect.height;
                    AppStorage.setOrCreate('topRectHeight', topRectHeight);
                }
                catch (err) {
                    let error = err as BusinessError;
                    hilog.error(0x0000, 'GesturesShare', `getWindowProperties error ${error.code} ${error.message}`);
                }
            }).catch((error: BusinessError) => {
                hilog.error(0x0000, 'testTag', 'Failed to getMainWindow. Cause: ', JSON.stringify(error.code) + JSON.stringify(error.message));
            });
        });
    }
    private updateBreakpoint(windowWidth: number, uiContext: UIContext): void {
        try {
            let windowWidthVp = windowWidth / display.getDefaultDisplaySync().densityPixels;
            let curBp: string = '';
            if (windowWidthVp < BreakpointConstants.BREAKPOINT_VALUE_NUMBER[1]) {
                curBp = BreakpointConstants.BREAKPOINT_SM;
            }
            else if (windowWidthVp < BreakpointConstants.BREAKPOINT_VALUE_NUMBER[2]) {
                curBp = BreakpointConstants.BREAKPOINT_MD;
            }
            else {
                curBp = BreakpointConstants.BREAKPOINT_LG;
            }
            AppStorage.setOrCreate('currentBreakpoint', curBp);
            let currentHeightBreakpoint = uiContext.getWindowHeightBreakpoint();
            AppStorage.setOrCreate('currentHeightBreakpoint', currentHeightBreakpoint);
        }
        catch (error) {
            hilog.error(0x0000, 'testTag', 'Failed to updateBreakpoint. Cause: %{public}s', JSON.stringify(error) ?? '');
        }
    }
    onWindowStageDestroy() {
        // Main window is destroyed, release UI related resources
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onWindowStageDestroy');
    }
    onForeground() {
        // Ability has brought to foreground
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onForeground');
    }
    onBackground() {
        // Ability has back to background
        hilog.info(0x0000, 'testTag', '%{public}s', 'Ability onBackground');
    }
}

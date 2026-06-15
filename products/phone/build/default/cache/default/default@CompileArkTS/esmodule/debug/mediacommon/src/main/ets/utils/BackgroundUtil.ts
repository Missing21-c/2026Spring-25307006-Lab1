import wantAgent from "@ohos:app.ability.wantAgent";
import type common from "@ohos:app.ability.common";
import backgroundTaskManager from "@ohos:resourceschedule.backgroundTaskManager";
import type { BusinessError } from "@ohos:base";
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/ets/utils/Logger";
export class BackgroundUtil {
    /**
     * Start background task.
     *
     * @param context
     */
    public static startContinuousTask(context?: common.UIAbilityContext): void {
        if (!context) {
            Logger.error('this avPlayer: ', `context undefined`);
            return;
        }
        let wantAgentInfo: wantAgent.WantAgentInfo = {
            wants: [
                {
                    bundleName: context.abilityInfo.bundleName,
                    abilityName: context.abilityInfo.name
                }
            ],
            operationType: wantAgent.OperationType.START_ABILITY,
            requestCode: 0,
            wantAgentFlags: [wantAgent.WantAgentFlags.UPDATE_PRESENT_FLAG]
        };
        wantAgent.getWantAgent(wantAgentInfo).then((wantAgentObj: Object) => {
            try {
                if (canIUse('SystemCapability.ResourceSchedule.BackgroundTaskManager.Core')) {
                    backgroundTaskManager.startBackgroundRunning(context, backgroundTaskManager.BackgroundMode.AUDIO_PLAYBACK, wantAgentObj).then(() => {
                        Logger.info('this avPlayer: ', 'startBackgroundRunning succeeded');
                    }).catch((error: BusinessError) => {
                        Logger.error('this avPlayer: ', `startBackgroundRunning failed Cause: code ${error.code}`);
                    });
                }
            }
            catch (error) {
                Logger.error('this avPlayer: ', `startBackgroundRunning failed. code ${(error as BusinessError).code} message ${(error as BusinessError).message}`);
            }
        }).catch((err: BusinessError) => {
            Logger.error(`getWantAgent failed, code: ${JSON.stringify(err.code)}, message: ${JSON.stringify(err.message)}`);
        });
    }
    /**
     * Stop background task.
     *
     * @param context
     */
    public static stopContinuousTask(context: common.UIAbilityContext): void {
        if (canIUse('SystemCapability.ResourceSchedule.BackgroundTaskManager.Core')) {
            try {
                backgroundTaskManager.stopBackgroundRunning(context).then(() => {
                    Logger.info('this avPlayer: ', 'stopBackgroundRunning succeeded');
                }).catch((error: BusinessError) => {
                    Logger.error('this avPlayer: ', `stopBackgroundRunning failed Cause: code ${error.code}`);
                });
            }
            catch (error) {
                Logger.error('this avPlayer: ', `stopBackgroundRunning failed. code ${(error as BusinessError).code} message ${(error as BusinessError).message}`);
            }
        }
    }
}

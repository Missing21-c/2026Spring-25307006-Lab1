import image from "@ohos:multimedia.image";
import type common from "@ohos:app.ability.common";
import type resourceManager from "@ohos:resourceManager";
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/ets/utils/Logger";
const TAG = 'MediaTools';
export class MediaTools {
    static async getPixelMapFromResource(context: common.UIAbilityContext, name: resourceManager.Resource): Promise<PixelMap> {
        let fileData: Uint8Array = new Uint8Array([]);
        try {
            let resourceMgr = context.resourceManager;
            fileData = await resourceMgr.getMediaContent(name.id);
        }
        catch (e) {
            Logger.error(TAG, `getPixelMapFromResource error: ${JSON.stringify(e)}`);
        }
        return await image.createImageSource(fileData.buffer as ArrayBuffer).createPixelMap();
    }
    static async getPixelMapFromFile(id: string, path: string): Promise<image.PixelMap> {
        Logger.info(TAG, 'getPixelMapFromFile id:' + id + ', path:' + path);
        return await image.createImageSource(path).createPixelMap();
    }
    /**
     * 日期不足两位补 0
     *
     * @param {string} value - 数据值
     * @return {string} - 日期不足两位补 0
     */
    private static fill(value: number): string {
        return value.toString().padStart(2, '0');
    }
    static msToCountdownTime(ms: number): string {
        if (!ms) {
            return '00:00';
        }
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((ms % (1000 * 60)) / 1000);
        return `${(days ? MediaTools.fill(days) + ':' : '')}${(hours ? MediaTools.fill(hours) + ':' : '')}
      ${MediaTools.fill(minutes)}:${MediaTools.fill(seconds)} `.trim();
    }
}

import type common from "@ohos:app.ability.common";
import type resourceManager from "@ohos:resourceManager";
import type { BusinessError } from "@ohos:base";
import type { SongItem } from '../viewmodel/SongData';
import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/ets/utils/Logger";
export default class SongItemBuilder {
    private context: common.UIAbilityContext | undefined = AppStorage.get('context');
    private realUrl?: resourceManager.RawFileDescriptor;
    private songItem: SongItem | null = null;
    public async build(songItem: SongItem): Promise<SongItem> {
        this.songItem = songItem;
        if (!this.context) {
            return this.songItem;
        }
        let rawfileFd = await this.context.resourceManager.getRawFd(songItem.src)
            .catch((error: BusinessError) => {
            Logger.error(`resourceManager error code ${error.code} message ${error.message}`);
        });
        if (rawfileFd) {
            this.realUrl = rawfileFd;
        }
        else {
            Logger.error('get rawfileFd failed');
        }
        Logger.info('MediaAssetBuilder build realUrl:' + this.realUrl);
        return this.songItem;
    }
    public getRealUrl(): resourceManager.RawFileDescriptor | undefined {
        Logger.info(`url ${this.realUrl}`);
        return this.realUrl;
    }
    public async release(): Promise<void> {
        if (this.context && this.context !== null && this.songItem !== null) {
            try {
                this.context.resourceManager.closeRawFd(this.songItem.src);
            }
            catch (error) {
                Logger.error('Failed to closeRawFd');
            }
        }
        this.songItem = null;
    }
}

import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { TransferHistoryRecord, HistoryFilter } from './TransferModels';
import dataPreferences from "@ohos:data.preferences";
import type common from "@ohos:app.ability.common";
const TAG = 'TransferHistoryService';
const PREFERENCES_NAME = 'transfer_history_prefs';
const KEY_HISTORY = 'transfer_history_records';
const MAX_RECORDS = 100;
/**
 * 传输统计信息
 */
export interface TransferStatistics {
    totalCount: number;
    sendCount: number;
    receiveCount: number;
    successCount: number;
    failedCount: number;
}
/**
 * 传输历史服务
 * 负责传输历史记录的持久化存储和管理
 */
export class TransferHistoryService {
    private static instance: TransferHistoryService;
    private preferences: dataPreferences.Preferences | null = null;
    private historyCache: TransferHistoryRecord[] = [];
    private constructor() { }
    /**
     * 获取单例实例
     */
    public static getInstance(): TransferHistoryService {
        if (!TransferHistoryService.instance) {
            TransferHistoryService.instance = new TransferHistoryService();
        }
        return TransferHistoryService.instance;
    }
    /**
     * 初始化服务
     */
    public async initialize(context: common.UIAbilityContext): Promise<void> {
        try {
            this.preferences = await dataPreferences.getPreferences(context, PREFERENCES_NAME);
            await this.loadHistoryFromPreferences();
            Logger.info(TAG, 'TransferHistoryService initialized');
        }
        catch (error) {
            Logger.error(TAG, `Initialize failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 从Preferences加载历史记录
     */
    private async loadHistoryFromPreferences(): Promise<void> {
        if (!this.preferences) {
            return;
        }
        try {
            const historyStr = await this.preferences.get(KEY_HISTORY, '[]') as string;
            this.historyCache = JSON.parse(historyStr) as TransferHistoryRecord[];
            Logger.info(TAG, `Loaded ${this.historyCache.length} history records`);
        }
        catch (error) {
            Logger.error(TAG, `Load history failed: ${JSON.stringify(error)}`);
            this.historyCache = [];
        }
    }
    /**
     * 保存历史记录到Preferences
     */
    private async saveHistoryToPreferences(): Promise<void> {
        if (!this.preferences) {
            return;
        }
        try {
            const historyStr = JSON.stringify(this.historyCache);
            await this.preferences.put(KEY_HISTORY, historyStr);
            await this.preferences.flush();
            Logger.info(TAG, 'History saved to preferences');
        }
        catch (error) {
            Logger.error(TAG, `Save history failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 获取历史记录列表
     */
    public async getHistoryList(): Promise<TransferHistoryRecord[]> {
        return this.historyCache.sort((a, b) => b.transferTime - a.transferTime);
    }
    /**
     * 保存历史记录
     */
    public async saveRecord(record: TransferHistoryRecord): Promise<void> {
        try {
            // 添加到缓存
            this.historyCache.unshift(record);
            // 如果超过最大记录数，删除最旧的记录
            if (this.historyCache.length > MAX_RECORDS) {
                this.historyCache = this.historyCache.slice(0, MAX_RECORDS);
                Logger.info(TAG, `Trimmed history to ${MAX_RECORDS} records`);
            }
            // 保存到Preferences
            await this.saveHistoryToPreferences();
            Logger.info(TAG, `Saved record: ${record.fileName}`);
        }
        catch (error) {
            Logger.error(TAG, `Save record failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 删除单条记录
     */
    public async deleteRecord(recordId: string): Promise<void> {
        try {
            const index = this.historyCache.findIndex(r => r.recordId === recordId);
            if (index !== -1) {
                this.historyCache.splice(index, 1);
                await this.saveHistoryToPreferences();
                Logger.info(TAG, `Deleted record: ${recordId}`);
            }
        }
        catch (error) {
            Logger.error(TAG, `Delete record failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 清空所有历史
     */
    public async clearAll(): Promise<void> {
        try {
            this.historyCache = [];
            await this.saveHistoryToPreferences();
            Logger.info(TAG, 'All history cleared');
        }
        catch (error) {
            Logger.error(TAG, `Clear history failed: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 按条件查询
     */
    public async query(filter: HistoryFilter): Promise<TransferHistoryRecord[]> {
        let results = this.historyCache;
        // 按传输方向过滤
        if (filter.direction) {
            results = results.filter(r => r.direction === filter.direction);
        }
        // 按状态过滤
        if (filter.status) {
            results = results.filter(r => r.status === filter.status);
        }
        // 按时间范围过滤
        if (filter.startTime) {
            results = results.filter(r => r.transferTime >= filter.startTime!);
        }
        if (filter.endTime) {
            results = results.filter(r => r.transferTime <= filter.endTime!);
        }
        // 按设备ID过滤
        if (filter.deviceId) {
            results = results.filter(r => r.peerDeviceId === filter.deviceId);
        }
        // 按时间倒序排序
        return results.sort((a, b) => b.transferTime - a.transferTime);
    }
    /**
     * 获取统计信息
     */
    public getStatistics(): TransferStatistics {
        const sendCount = this.historyCache.filter(r => r.direction === 'send').length;
        const receiveCount = this.historyCache.filter(r => r.direction === 'receive').length;
        const successCount = this.historyCache.filter(r => r.status === 'completed').length;
        const failedCount = this.historyCache.filter(r => r.status === 'failed').length;
        const stats: TransferStatistics = {
            totalCount: this.historyCache.length,
            sendCount: sendCount,
            receiveCount: receiveCount,
            successCount: successCount,
            failedCount: failedCount
        };
        return stats;
    }
}

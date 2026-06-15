import { Logger } from "@bundle:com.huawei.music.musichome/phone@mediacommon/index";
import type { PendingTransferFile, ValidationResult } from './TransferModels';
import fs from "@ohos:file.fs";
import type common from "@ohos:app.ability.common";
const TAG = 'FileSelectionService';
const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
/**
 * 文件选择服务
 * 负责本地音频文件的扫描、筛选和验证
 */
export class FileSelectionService {
    private static instance: FileSelectionService;
    private readonly SUPPORTED_FORMATS = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'];
    private context: common.UIAbilityContext | null = null;
    private constructor() { }
    /**
     * 获取单例实例
     */
    public static getInstance(): FileSelectionService {
        if (!FileSelectionService.instance) {
            FileSelectionService.instance = new FileSelectionService();
        }
        return FileSelectionService.instance;
    }
    /**
     * 初始化服务
     */
    public initialize(context: common.UIAbilityContext): void {
        this.context = context;
        Logger.info(TAG, 'FileSelectionService initialized');
    }
    /**
     * 扫描本地音频文件
     */
    public async scanLocalAudioFiles(directory?: string): Promise<PendingTransferFile[]> {
        try {
            const scanPath = directory || (this.context ? this.context.filesDir : '/storage/media/100/local/files');
            Logger.info(TAG, `Scanning audio files in: ${scanPath}`);
            const files: PendingTransferFile[] = [];
            await this.scanDirectory(scanPath, files);
            Logger.info(TAG, `Found ${files.length} audio files`);
            return files;
        }
        catch (error) {
            Logger.error(TAG, `Scan audio files failed: ${JSON.stringify(error)}`);
            return [];
        }
    }
    /**
     * 递归扫描目录
     */
    private async scanDirectory(dirPath: string, fileList: PendingTransferFile[]): Promise<void> {
        try {
            const isDir = fs.statSync(dirPath).isDirectory();
            if (!isDir) {
                return;
            }
            const files = fs.listFileSync(dirPath);
            for (const fileName of files) {
                const filePath = `${dirPath}/${fileName}`;
                try {
                    const stat = fs.statSync(filePath);
                    if (stat.isDirectory()) {
                        // 递归扫描子目录
                        await this.scanDirectory(filePath, fileList);
                    }
                    else if (stat.isFile()) {
                        // 检查是否是支持的音频格式
                        const fileFormat = this.getFileFormat(fileName);
                        if (fileFormat !== 'other') {
                            const fileInfo: PendingTransferFile = {
                                fileId: `file_${Date.now()}_${Math.random()}`,
                                fileName: fileName,
                                filePath: filePath,
                                fileSize: stat.size,
                                fileFormat: fileFormat,
                                isSelected: false
                            };
                            fileList.push(fileInfo);
                        }
                    }
                }
                catch (error) {
                    Logger.error(TAG, `Process file failed: ${filePath}, error: ${JSON.stringify(error)}`);
                }
            }
        }
        catch (error) {
            Logger.error(TAG, `Scan directory failed: ${dirPath}, error: ${JSON.stringify(error)}`);
        }
    }
    /**
     * 获取文件格式
     */
    private getFileFormat(fileName: string): 'mp3' | 'wav' | 'flac' | 'aac' | 'm4a' | 'ogg' | 'other' {
        const ext = fileName.split('.').pop()?.toLowerCase();
        if (ext && this.SUPPORTED_FORMATS.includes(ext)) {
            return ext as 'mp3' | 'wav' | 'flac' | 'aac' | 'm4a' | 'ogg';
        }
        return 'other';
    }
    /**
     * 获取文件信息
     */
    public async getFileInfo(filePath: string): Promise<PendingTransferFile | null> {
        try {
            const stat = fs.statSync(filePath);
            const fileName = filePath.split('/').pop() || 'unknown';
            const fileFormat = this.getFileFormat(fileName);
            const fileInfo: PendingTransferFile = {
                fileId: `file_${Date.now()}_${Math.random()}`,
                fileName: fileName,
                filePath: filePath,
                fileSize: stat.size,
                fileFormat: fileFormat,
                isSelected: false
            };
            return fileInfo;
        }
        catch (error) {
            Logger.error(TAG, `Get file info failed: ${filePath}, error: ${JSON.stringify(error)}`);
            return null;
        }
    }
    /**
     * 验证单个文件
     */
    public async validateFile(file: PendingTransferFile): Promise<boolean> {
        try {
            // 检查文件是否存在
            const exists = fs.accessSync(file.filePath);
            if (!exists) {
                Logger.error(TAG, `File not exists: ${file.filePath}`);
                return false;
            }
            // 检查文件格式
            if (file.fileFormat === 'other') {
                Logger.error(TAG, `Unsupported file format: ${file.fileFormat}`);
                return false;
            }
            // 检查文件大小
            const stat = fs.statSync(file.filePath);
            if (stat.size > MAX_FILE_SIZE) {
                Logger.error(TAG, `File too large: ${stat.size} > ${MAX_FILE_SIZE}`);
                return false;
            }
            return true;
        }
        catch (error) {
            Logger.error(TAG, `Validate file failed: ${JSON.stringify(error)}`);
            return false;
        }
    }
    /**
     * 批量验证文件
     */
    public async validateFiles(files: PendingTransferFile[]): Promise<Map<string, ValidationResult>> {
        const results = new Map<string, ValidationResult>();
        for (const file of files) {
            const errors: string[] = [];
            try {
                // 检查文件是否存在
                const exists = fs.accessSync(file.filePath);
                if (!exists) {
                    errors.push('文件不存在');
                }
                // 检查文件格式
                if (file.fileFormat === 'other') {
                    errors.push('不支持的文件格式');
                }
                // 检查文件大小
                const stat = fs.statSync(file.filePath);
                if (stat.size > MAX_FILE_SIZE) {
                    errors.push(`文件大小超过限制(${MAX_FILE_SIZE / 1024 / 1024}MB)`);
                }
            }
            catch (error) {
                errors.push(`验证失败: ${JSON.stringify(error)}`);
            }
            results.set(file.fileId, {
                isValid: errors.length === 0,
                errors: errors
            });
        }
        return results;
    }
    /**
     * 按格式筛选文件
     */
    public filterByFormat(files: PendingTransferFile[], formats: string[]): PendingTransferFile[] {
        return files.filter(file => formats.includes(file.fileFormat));
    }
    /**
     * 按大小筛选文件
     */
    public filterBySize(files: PendingTransferFile[], maxSize: number): PendingTransferFile[] {
        return files.filter(file => file.fileSize <= maxSize);
    }
    /**
     * 计算总大小
     */
    public calculateTotalSize(files: PendingTransferFile[]): number {
        return files.reduce((total, file) => total + file.fileSize, 0);
    }
    /**
     * 获取支持的格式列表
     */
    public getSupportedFormats(): string[] {
        return [...this.SUPPORTED_FORMATS];
    }
    /**
     * 获取最大文件大小限制
     */
    public getMaxFileSize(): number {
        return MAX_FILE_SIZE;
    }
}

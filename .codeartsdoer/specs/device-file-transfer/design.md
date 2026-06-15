# 技术设计文档

## 文档信息
- **功能名称**: 多设备音乐文件互传功能
- **创建日期**: 2025-06-14
- **版本**: v1.0
- **关联需求**: spec.md v1.0

## 1. 设计概述

### 1.1 设计目标
基于现有的 `airdrop` 模块，构建完整的多设备音乐文件互传功能。设计目标包括：
- 提供完整的用户交互界面，包括设备发现、文件选择、传输管理
- 实现可靠的文件传输机制，支持进度跟踪和断点续传
- 建立传输历史记录系统，便于用户查看和管理
- 确保与现有音乐播放功能的无缝集成

### 1.2 技术选型

| 技术项 | 选择方案 | 选择理由 |
|--------|----------|----------|
| 设备发现 | HarmonyOS DistributedDeviceManager API | 系统原生支持，稳定可靠 |
| 文件传输 | Socket + 分布式文件系统 | 现有airdrop模块已实现基础能力 |
| 状态管理 | @State/@Link 装饰器 | ArkUI原生状态管理，响应式更新 |
| 数据持久化 | Preferences + 文件存储 | 轻量级存储，适合传输历史记录 |
| UI框架 | ArkUI (ArkTS) | 项目统一技术栈 |
| 权限管理 | HarmonyOS AccessToken | 系统标准权限机制 |

### 1.3 设计约束
- 必须复用现有 `airdrop` 模块的核心能力
- UI风格必须与现有应用保持一致
- 不得破坏现有音乐播放功能
- 遵循HarmonyOS应用开发规范
- 支持多设备形态（直板机、折叠屏、平板）

## 2. 架构设计

### 2.1 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                      用户界面层 (UI Layer)                    │
├─────────────────────────────────────────────────────────────┤
│  DeviceTransferPage    FilePickerPanel    TransferHistory   │
│  DeviceListView        TransferProgress   ReceiveDialog     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    业务逻辑层 (Business Layer)                │
├─────────────────────────────────────────────────────────────┤
│  DeviceTransferViewModel    TransferHistoryService          │
│  FileSelectionService       NotificationService             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    基础能力层 (Foundation Layer)              │
├─────────────────────────────────────────────────────────────┤
│  AirDropViewModel (现有)     LocalMusicService (现有)        │
│  FilePickerService (现有)    MediaService (现有)             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    系统服务层 (System Layer)                  │
├─────────────────────────────────────────────────────────────┤
│  DistributedDeviceManager   Socket API     FileSystem API    │
│  NotificationManager        Preferences    AccessToken       │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 模块划分

| 模块名称 | 职责 | 位置 |
|----------|------|------|
| DeviceTransferPage | 设备传输主页面，协调各子组件 | features/airdrop/src/main/ets/view/ |
| DeviceListView | 设备列表展示与选择 | features/airdrop/src/main/ets/view/ |
| FilePickerPanel | 文件选择面板，支持多选 | features/airdrop/src/main/ets/view/ |
| TransferProgressView | 传输进度展示组件 | features/airdrop/src/main/ets/view/ |
| ReceiveConfirmDialog | 接收确认对话框 | features/airdrop/src/main/ets/view/ |
| TransferHistoryPage | 传输历史页面 | features/airdrop/src/main/ets/view/ |
| DeviceTransferViewModel | 设备传输业务逻辑 | features/airdrop/src/main/ets/viewmodel/ |
| TransferHistoryService | 传输历史管理服务 | features/airdrop/src/main/ets/viewmodel/ |
| TransferModels | 数据模型定义 | features/airdrop/src/main/ets/viewmodel/ |

### 2.3 组件设计

#### 2.3.1 组件关系图

```
DeviceTransferPage (主页面)
├── DeviceListView (设备列表)
│   └── DeviceItem (设备项)
├── FilePickerPanel (文件选择面板)
│   ├── FileFilterBar (文件筛选栏)
│   └── FileList (文件列表)
│       └── FileItem (文件项)
├── TransferProgressView (传输进度)
│   ├── ProgressBar (进度条)
│   └── SpeedIndicator (速度指示器)
└── TransferActionBar (操作栏)
    ├── SendButton (发送按钮)
    └── CancelButton (取消按钮)

TransferHistoryPage (历史页面)
├── HistoryList (历史列表)
│   └── HistoryItem (历史项)
└── HistoryActionBar (操作栏)
    └── ClearButton (清空按钮)
```

## 3. 数据设计

### 3.1 数据模型

#### 3.1.1 设备信息模型 (扩展现有 DeviceInfo)

```typescript
/**
 * 设备信息（扩展）
 */
export interface DeviceInfo {
  /** 设备ID */
  deviceId: string;
  /** 设备名称 */
  deviceName: string;
  /** 设备类型 */
  deviceType: 'phone' | 'tablet' | 'watch' | 'unknown';
  /** 是否在线 */
  isOnline: boolean;
  /** 设备图标资源 */
  iconResource?: Resource;
  /** 最后发现时间 */
  lastDiscoveredTime?: number;
}
```

#### 3.1.2 待传输文件模型

```typescript
/**
 * 待传输文件信息
 */
export interface PendingTransferFile {
  /** 文件ID */
  fileId: string;
  /** 文件名 */
  fileName: string;
  /** 文件路径 */
  filePath: string;
  /** 文件大小(字节) */
  fileSize: number;
  /** 文件格式 */
  fileFormat: 'mp3' | 'wav' | 'flac' | 'aac' | 'other';
  /** 文件时长(毫秒) */
  duration?: number;
  /** 是否选中 */
  isSelected: boolean;
}
```

#### 3.1.3 传输任务模型

```typescript
/**
 * 传输任务
 */
export interface TransferTask {
  /** 任务ID */
  taskId: string;
  /** 目标设备ID */
  targetDeviceId: string;
  /** 目标设备名称 */
  targetDeviceName: string;
  /** 文件列表 */
  files: PendingTransferFile[];
  /** 总大小 */
  totalSize: number;
  /** 已传输大小 */
  transferredSize: number;
  /** 传输状态 */
  status: 'pending' | 'transferring' | 'paused' | 'completed' | 'failed' | 'cancelled';
  /** 开始时间 */
  startTime?: number;
  /** 结束时间 */
  endTime?: number;
  /** 当前传输文件索引 */
  currentFileIndex: number;
  /** 传输速度(字节/秒) */
  speed: number;
  /** 错误信息 */
  errorMessage?: string;
}
```

#### 3.1.4 传输历史记录模型

```typescript
/**
 * 传输历史记录
 */
export interface TransferHistoryRecord {
  /** 记录ID */
  recordId: string;
  /** 文件名 */
  fileName: string;
  /** 文件大小 */
  fileSize: number;
  /** 传输方向 */
  direction: 'send' | 'receive';
  /** 对方设备ID */
  peerDeviceId: string;
  /** 对方设备名称 */
  peerDeviceName: string;
  /** 传输状态 */
  status: 'completed' | 'failed' | 'cancelled';
  /** 传输时间 */
  transferTime: number;
  /** 耗时(毫秒) */
  duration: number;
  /** 本地文件路径(接收时) */
  localPath?: string;
  /** 错误信息 */
  errorMessage?: string;
}
```

#### 3.1.5 接收请求模型

```typescript
/**
 * 接收请求
 */
export interface ReceiveRequest {
  /** 请求ID */
  requestId: string;
  /** 发送方设备ID */
  senderDeviceId: string;
  /** 发送方设备名称 */
  senderDeviceName: string;
  /** 文件名 */
  fileName: string;
  /** 文件大小 */
  fileSize: number;
  /** 请求时间 */
  requestTime: number;
  /** 超时时间 */
  timeout: number;
}
```

### 3.2 数据流

#### 3.2.1 发送文件数据流

```
用户选择文件
    │
    ▼
FilePickerPanel (收集选中的文件)
    │
    ▼
DeviceTransferViewModel.createTransferTask()
    │
    ▼
AirDropViewModel.doAirDrop() (逐个传输文件)
    │
    ├─► 更新 TransferTask 状态
    │       │
    │       ▼
    │   TransferProgressView (UI更新)
    │
    ├─► 传输完成
    │       │
    │       ▼
    │   TransferHistoryService.saveRecord()
    │
    └─► LocalMusicService.addToRecentList() (接收端)
```

#### 3.2.2 接收文件数据流

```
AirDropViewModel.setupFileReceiver() (监听)
    │
    ▼
收到传输请求
    │
    ▼
ReceiveConfirmDialog (用户确认)
    │
    ├─► 用户接受
    │       │
    │       ▼
    │   AirDropViewModel.saveReceivedFile()
    │       │
    │       ▼
    │   LocalMusicService.addToRecentList()
    │       │
    │       ▼
    │   TransferHistoryService.saveRecord()
    │
    └─► 用户拒绝
            │
            ▼
        通知发送方
```

### 3.3 状态管理

#### 3.3.1 页面状态

```typescript
/**
 * 设备传输页面状态
 */
@State deviceList: DeviceInfo[] = [];           // 设备列表
@State selectedDevice: DeviceInfo | null = null; // 选中的设备
@State selectedFiles: PendingTransferFile[] = []; // 选中的文件
@State currentTask: TransferTask | null = null;  // 当前传输任务
@State isScanning: boolean = false;              // 是否正在扫描设备
@State isTransferring: boolean = false;          // 是否正在传输
```

#### 3.3.2 全局状态 (AppStorage)

```typescript
// 当前传输任务（用于通知栏显示）
AppStorage.setOrCreate<TransferTask | null>('currentTransferTask', null);

// 传输历史记录
AppStorage.setOrCreate<TransferHistoryRecord[]>('transferHistory', []);

// 接收请求队列
AppStorage.setOrCreate<ReceiveRequest[]>('receiveRequests', []);
```

## 4. 接口设计

### 4.1 组件接口

#### 4.1.1 DeviceTransferPage

```typescript
@Component
export struct DeviceTransferPage {
  /** 是否显示页面 */
  @Link isShow: boolean;
  /** 初始选中的音乐信息（可选） */
  @Prop initialMusicInfo?: MusicInfo;
  /** 传输完成回调 */
  onComplete?: (success: boolean, files: string[]) => void;
}
```

#### 4.1.2 DeviceListView

```typescript
@Component
export struct DeviceListView {
  /** 设备列表 */
  @Prop devices: DeviceInfo[] = [];
  /** 选中的设备 */
  @Link selectedDevice: DeviceInfo | null;
  /** 是否正在加载 */
  @Prop isLoading: boolean = false;
  /** 刷新事件 */
  onRefresh?: () => void;
}
```

#### 4.1.3 FilePickerPanel

```typescript
@Component
export struct FilePickerPanel {
  /** 是否显示面板 */
  @Link isShow: boolean;
  /** 已选文件列表 */
  @Link selectedFiles: PendingTransferFile[] = [];
  /** 支持的文件格式 */
  @Prop supportedFormats: string[] = ['mp3', 'wav', 'flac', 'aac'];
  /** 最大选择数量 */
  @Prop maxSelectCount: number = 50;
  /** 最大总大小(字节) */
  @Prop maxTotalSize: number = 500 * 1024 * 1024; // 500MB
}
```

#### 4.1.4 TransferProgressView

```typescript
@Component
export struct TransferProgressView {
  /** 传输任务 */
  @Prop task: TransferTask;
  /** 取消事件 */
  onCancel?: () => void;
  /** 暂停/继续事件 */
  onPauseOrResume?: () => void;
}
```

#### 4.1.5 ReceiveConfirmDialog

```typescript
@Component
export struct ReceiveConfirmDialog {
  /** 是否显示 */
  @Link isShow: boolean;
  /** 接收请求 */
  @Prop request: ReceiveRequest;
  /** 接受事件 */
  onAccept?: () => void;
  /** 拒绝事件 */
  onReject?: () => void;
}
```

### 4.2 事件接口

#### 4.2.1 DeviceTransferViewModel 事件

```typescript
/**
 * 设备传输视图模型事件接口
 */
export interface DeviceTransferViewModelEvents {
  /** 设备列表更新事件 */
  onDeviceListUpdated: (devices: DeviceInfo[]) => void;
  /** 传输进度更新事件 */
  onTransferProgress: (task: TransferTask) => void;
  /** 传输完成事件 */
  onTransferComplete: (success: boolean, task: TransferTask) => void;
  /** 接收请求事件 */
  onReceiveRequest: (request: ReceiveRequest) => void;
  /** 错误事件 */
  onError: (error: Error) => void;
}
```

### 4.3 数据接口

#### 4.3.1 TransferHistoryService

```typescript
/**
 * 传输历史服务接口
 */
export class TransferHistoryService {
  /** 获取历史记录列表 */
  async getHistoryList(): Promise<TransferHistoryRecord[]>;

  /** 保存历史记录 */
  async saveRecord(record: TransferHistoryRecord): Promise<void>;

  /** 删除历史记录 */
  async deleteRecord(recordId: string): Promise<void>;

  /** 清空所有历史 */
  async clearAll(): Promise<void>;

  /** 按条件查询 */
  async query(filter: HistoryFilter): Promise<TransferHistoryRecord[]>;
}
```

#### 4.3.2 FileSelectionService

```typescript
/**
 * 文件选择服务接口
 */
export class FileSelectionService {
  /** 扫描本地音频文件 */
  async scanLocalAudioFiles(): Promise<PendingTransferFile[]>;

  /** 按格式筛选 */
  filterByFormat(files: PendingTransferFile[], formats: string[]): PendingTransferFile[];

  /** 计算总大小 */
  calculateTotalSize(files: PendingTransferFile[]): number;

  /** 验证文件有效性 */
  async validateFiles(files: PendingTransferFile[]): Promise<ValidationResult>;
}
```

## 5. 详细设计

### 5.1 DeviceTransferViewModel

#### 职责
- 协调设备发现、文件选择、传输执行
- 管理传输任务状态
- 处理传输异常和重试逻辑

#### 实现

```typescript
export class DeviceTransferViewModel {
  private static instance: DeviceTransferViewModel;
  private airDropViewModel: AirDropViewModel;
  private historyService: TransferHistoryService;
  private currentTask: TransferTask | null = null;

  public static getInstance(): DeviceTransferViewModel;

  /**
   * 扫描附近设备
   */
  public async scanDevices(): Promise<DeviceInfo[]>;

  /**
   * 创建传输任务
   */
  public async createTransferTask(
    targetDevice: DeviceInfo,
    files: PendingTransferFile[]
  ): Promise<TransferTask>;

  /**
   * 执行传输任务
   */
  public async executeTask(
    task: TransferTask,
    onProgress?: (task: TransferTask) => void
  ): Promise<boolean>;

  /**
   * 取消传输任务
   */
  public async cancelTask(): Promise<void>;

  /**
   * 重试失败的传输
   */
  public async retryFailed(): Promise<boolean>;

  /**
   * 设置接收监听
   */
  public setupReceiveListener(
    onRequest: (request: ReceiveRequest) => void,
    onReceive: (file: string, data: ArrayBuffer) => void
  ): void;
}
```

#### 接口

| 方法 | 参数 | 返回值 | 说明 |
|------|------|--------|------|
| scanDevices | - | Promise<DeviceInfo[]> | 扫描附近在线设备 |
| createTransferTask | device, files | Promise<TransferTask> | 创建传输任务 |
| executeTask | task, onProgress | Promise<boolean> | 执行传输任务 |
| cancelTask | - | Promise<void> | 取消当前任务 |
| retryFailed | - | Promise<boolean> | 重试失败的传输 |

### 5.2 TransferHistoryService

#### 职责
- 管理传输历史记录的持久化存储
- 提供历史记录的查询、添加、删除功能

#### 实现

```typescript
export class TransferHistoryService {
  private static instance: TransferHistoryService;
  private preferences: dataPreferences.Preferences | null = null;
  private readonly KEY_HISTORY = 'transfer_history';
  private readonly MAX_RECORDS = 100; // 最多保存100条记录

  public static getInstance(): TransferHistoryService;

  /**
   * 初始化服务
   */
  public async initialize(context: common.UIAbilityContext): Promise<void>;

  /**
   * 获取历史记录
   */
  public async getHistoryList(): Promise<TransferHistoryRecord[]>;

  /**
   * 保存记录
   */
  public async saveRecord(record: TransferHistoryRecord): Promise<void>;

  /**
   * 删除记录
   */
  public async deleteRecord(recordId: string): Promise<void>;

  /**
   * 清空历史
   */
  public async clearAll(): Promise<void>;
}
```

### 5.3 FileSelectionService

#### 职责
- 扫描设备本地音频文件
- 提供文件筛选和验证功能

#### 实现

```typescript
export class FileSelectionService {
  private static instance: FileSelectionService;
  private readonly SUPPORTED_FORMATS = ['mp3', 'wav', 'flac', 'aac', 'm4a', 'ogg'];

  public static getInstance(): FileSelectionService;

  /**
   * 扫描本地音频文件
   */
  public async scanLocalAudioFiles(directory?: string): Promise<PendingTransferFile[]>;

  /**
   * 获取文件信息
   */
  public async getFileInfo(filePath: string): Promise<PendingTransferFile | null>;

  /**
   * 验证文件
   */
  public async validateFile(file: PendingTransferFile): Promise<boolean>;

  /**
   * 批量验证
   */
  public async validateFiles(files: PendingTransferFile[]): Promise<Map<string, boolean>>;
}
```

### 5.4 NotificationService

#### 职责
- 管理传输进度通知
- 处理通知点击事件

#### 实现

```typescript
export class NotificationService {
  private static instance: NotificationService;

  public static getInstance(): NotificationService;

  /**
   * 显示传输进度通知
   */
  public showProgressNotification(task: TransferTask): void;

  /**
   * 更新进度通知
   */
  public updateProgressNotification(task: TransferTask): void;

  /**
   * 显示完成通知
   */
  public showCompleteNotification(success: boolean, fileName: string): void;

  /**
   * 取消通知
   */
  public cancelNotification(notificationId: string): void;
}
```

## 6. 样式设计

### 6.1 样式规范

#### 6.1.1 颜色规范

```typescript
export class TransferColors {
  // 主色调
  static readonly PRIMARY = '#4CAF50';        // 绿色（发送/确认）
  static readonly ACCENT = '#2196F3';         // 蓝色（信息）

  // 状态色
  static readonly SUCCESS = '#4CAF50';        // 成功
  static readonly WARNING = '#FF9800';        // 警告
  static readonly ERROR = '#F44336';          // 错误
  static readonly INFO = '#2196F3';           // 信息

  // 背景色
  static readonly BG_PRIMARY = '#1a1a2e';     // 主背景
  static readonly BG_SECONDARY = '#2a2a4a';   // 次背景
  static readonly BG_CARD = '#FFFFFF';        // 卡片背景

  // 文字色
  static readonly TEXT_PRIMARY = '#FFFFFF';   // 主文字
  static readonly TEXT_SECONDARY = '#999999'; // 次文字
  static readonly TEXT_HINT = '#666666';      // 提示文字
}
```

#### 6.1.2 尺寸规范

```typescript
export class TransferDimensions {
  // 图标尺寸
  static readonly ICON_SMALL = 20;
  static readonly ICON_NORMAL = 24;
  static readonly ICON_LARGE = 40;

  // 按钮尺寸
  static readonly BUTTON_HEIGHT = 44;
  static readonly BUTTON_RADIUS = 22;

  // 列表项高度
  static readonly LIST_ITEM_HEIGHT = 64;

  // 间距
  static readonly SPACING_SMALL = 8;
  static readonly SPACING_NORMAL = 12;
  static readonly SPACING_LARGE = 16;
}
```

### 6.2 资源管理

使用应用现有资源，不新增额外图标资源：
- 设备图标：`$r('app.media.icon')`
- 音乐图标：`$r('app.media.ic_music_list')`
- 播放图标：`$r('app.media.ic_public_play')`
- 暂停图标：`$r('app.media.ic_public_pause')`
- 专辑图标：`$r('app.media.ic_album')`

## 7. 性能设计

### 7.1 性能目标

| 指标 | 目标值 | 说明 |
|------|--------|------|
| 设备发现时间 | < 5秒 | 从发起扫描到显示设备列表 |
| 文件列表加载 | < 2秒 | 扫描并显示100个文件 |
| 传输速度 | > 2MB/s | 局域网环境 |
| UI响应时间 | < 200ms | 用户操作到界面响应 |
| 内存占用 | < 100MB | 传输过程中 |

### 7.2 优化策略

#### 7.2.1 设备发现优化
- 使用缓存机制，避免频繁扫描
- 实现增量更新，只更新变化的设备
- 设置合理的扫描间隔（默认30秒）

#### 7.2.2 文件传输优化
- 使用分块传输，每块4KB
- 实现并行传输（最多3个文件同时传输）
- 使用缓冲区减少IO操作

#### 7.2.3 UI渲染优化
- 使用虚拟列表渲染大量文件
- 避免频繁的状态更新
- 使用 LazyForEach 懒加载

#### 7.2.4 内存优化
- 及时释放已传输文件的数据
- 限制并发传输数量
- 使用流式传输而非全量加载

## 8. 异常处理

### 8.1 异常场景

| 异常类型 | 场景描述 | 错误码 |
|----------|----------|--------|
| 设备离线 | 传输过程中目标设备断开连接 | ERR_DEVICE_OFFLINE |
| 网络异常 | 网络中断或不稳定 | ERR_NETWORK_ERROR |
| 文件不存在 | 选择的文件已被删除或移动 | ERR_FILE_NOT_FOUND |
| 权限不足 | 未获得必要的存储权限 | ERR_PERMISSION_DENIED |
| 存储空间不足 | 接收设备空间不足 | ERR_STORAGE_FULL |
| 文件过大 | 文件超过500MB限制 | ERR_FILE_TOO_LARGE |
| 传输超时 | 传输时间超过限制 | ERR_TRANSFER_TIMEOUT |
| 格式不支持 | 文件格式不在支持列表中 | ERR_FORMAT_UNSUPPORTED |

### 8.2 处理策略

#### 8.2.1 重试机制
- 网络异常：自动重试3次，间隔5秒
- 设备离线：不自动重试，提示用户
- 其他异常：不重试，显示错误信息

#### 8.2.2 错误提示

```typescript
export class ErrorMessages {
  static readonly ERR_DEVICE_OFFLINE = '目标设备已离线，请确认设备状态后重试';
  static readonly ERR_NETWORK_ERROR = '网络连接异常，正在重试...';
  static readonly ERR_FILE_NOT_FOUND = '文件不存在，可能已被删除或移动';
  static readonly ERR_PERMISSION_DENIED = '缺少必要权限，请在设置中授权';
  static readonly ERR_STORAGE_FULL = '设备存储空间不足，请清理后重试';
  static readonly ERR_FILE_TOO_LARGE = '文件大小超过限制(500MB)';
  static readonly ERR_TRANSFER_TIMEOUT = '传输超时，请检查网络后重试';
  static readonly ERR_FORMAT_UNSUPPORTED = '不支持的文件格式';
}
```

#### 8.2.3 降级策略
- 设备发现失败：显示上次缓存的设备列表
- 文件扫描失败：允许手动选择文件
- 通知显示失败：仅在应用内显示提示

## 9. 测试设计

### 9.1 测试策略

| 测试类型 | 覆盖范围 | 工具/方法 |
|----------|----------|-----------|
| 单元测试 | ViewModel、Service | Jest/Hvigor |
| 集成测试 | 组件交互 | UI测试框架 |
| 性能测试 | 传输速度、响应时间 | 性能分析工具 |
| 兼容性测试 | 多设备形态 | 真机测试 |

### 9.2 测试用例

#### 9.2.1 功能测试用例

| 用例ID | 测试场景 | 预期结果 |
|--------|----------|----------|
| TC-001 | 扫描设备 | 5秒内显示在线设备列表 |
| TC-002 | 选择单个文件发送 | 文件成功传输，显示进度 |
| TC-003 | 选择多个文件发送 | 批量传输，逐个显示进度 |
| TC-004 | 取消传输 | 立即停止，清理临时文件 |
| TC-005 | 接收文件 | 显示确认对话框，保存成功 |
| TC-006 | 拒绝接收 | 通知发送方，不保存文件 |
| TC-007 | 查看历史 | 显示所有传输记录 |
| TC-008 | 清空历史 | 所有记录被删除 |

#### 9.2.2 异常测试用例

| 用例ID | 测试场景 | 预期结果 |
|--------|----------|----------|
| TC-E01 | 设备离线 | 显示错误提示，提供重试 |
| TC-E02 | 网络中断 | 自动重试，显示重试状态 |
| TC-E03 | 文件不存在 | 显示错误提示，跳过该文件 |
| TC-E04 | 空间不足 | 显示错误提示，停止传输 |
| TC-E05 | 权限拒绝 | 引导用户授权 |

#### 9.2.3 性能测试用例

| 用例ID | 测试场景 | 性能指标 |
|--------|----------|----------|
| TC-P01 | 扫描100个设备 | < 5秒 |
| TC-P02 | 传输100MB文件 | > 2MB/s |
| TC-P03 | 显示1000条历史 | < 1秒 |
| TC-P04 | UI响应 | < 200ms |

## 10. 部署方案

### 10.1 部署步骤

1. **代码集成**
   - 将新组件添加到 `features/airdrop` 模块
   - 更新模块的 Index.ets 导出

2. **资源准备**
   - 确认所需图标资源已存在
   - 添加必要的字符串资源

3. **权限配置**
   - 在 module.json5 中确认权限声明：
     - `ohos.permission.READ_MEDIA`
     - `ohos.permission.WRITE_MEDIA`
     - `ohos.permission.DISTRIBUTED_DATASYNC`

4. **功能入口**
   - 在音乐列表页添加"设备传输"按钮
   - 在播放页添加"分享"按钮

5. **测试验证**
   - 执行单元测试
   - 执行集成测试
   - 真机测试

### 10.2 回滚方案

1. **代码回滚**
   - 使用Git回滚到上一版本
   - 删除新增的组件文件

2. **数据回滚**
   - 清空传输历史记录
   - 删除接收的临时文件

3. **配置回滚**
   - 移除新增的权限声明
   - 移除功能入口

## 11. 扩展设计

### 11.1 未来扩展点

1. **断点续传**
   - 记录已传输的字节位置
   - 支持从断点继续传输

2. **云端中转**
   - 当设备不在同一局域网时
   - 通过云端服务器中转传输

3. **传输加密**
   - 对传输内容进行加密
   - 保护用户隐私

4. **批量操作**
   - 支持全选、反选
   - 支持按文件夹选择

### 11.2 接口预留

```typescript
/**
 * 扩展接口（预留）
 */
export interface TransferExtension {
  /** 断点续传 */
  resumeTransfer(taskId: string): Promise<boolean>;

  /** 云端中转 */
  enableCloudRelay(enable: boolean): void;

  /** 传输加密 */
  enableEncryption(enable: boolean, key?: string): void;

  /** 批量选择 */
  selectByDirectory(directory: string): Promise<PendingTransferFile[]>;
}
```

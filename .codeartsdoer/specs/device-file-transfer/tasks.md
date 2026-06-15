# 编码任务文档

## 文档信息
- **功能名称**: 多设备音乐文件互传功能
- **创建日期**: 2025-06-14
- **版本**: v1.0
- **关联需求**: spec.md v1.0
- **关联设计**: design.md v1.0

## 任务概览

本文档将多设备音乐文件互传功能分解为 **12个主任务**，共 **28个子任务**。任务按照依赖关系和优先级排序，确保开发过程清晰有序。

---

## 任务 1: 数据模型定义

### 任务描述
定义传输功能所需的核心数据模型，为后续开发提供数据结构基础。

### 输入
- design.md 中的数据模型设计

### 输出
- `features/airdrop/src/main/ets/viewmodel/TransferModels.ets` 文件

### 子任务

#### 1.1 定义扩展的设备信息模型
在 `TransferModels.ets` 中定义 `DeviceInfo` 接口扩展，添加 `iconResource` 和 `lastDiscoveredTime` 字段。

#### 1.2 定义待传输文件模型
定义 `PendingTransferFile` 接口，包含文件ID、名称、路径、大小、格式、时长、选中状态等字段。

#### 1.3 定义传输任务模型
定义 `TransferTask` 接口，包含任务ID、目标设备、文件列表、传输状态、进度、速度等字段。

#### 1.4 定义传输历史记录模型
定义 `TransferHistoryRecord` 接口，包含记录ID、文件信息、传输方向、设备信息、状态、时间等字段。

#### 1.5 定义接收请求模型
定义 `ReceiveRequest` 接口，包含请求ID、发送方设备信息、文件信息、超时时间等字段。

### 验收标准
- 所有数据模型定义完整，字段类型正确
- 添加必要的JSDoc注释
- 导出所有模型供其他模块使用

### 优先级
高

### 预估工时
2小时

---

## 任务 2: 传输历史服务实现

### 任务描述
实现传输历史记录的持久化存储和管理服务。

### 输入
- TransferHistoryRecord 数据模型
- HarmonyOS Preferences API

### 输出
- `features/airdrop/src/main/ets/viewmodel/TransferHistoryService.ets` 文件

### 子任务

#### 2.1 创建 TransferHistoryService 类
创建单例模式的 `TransferHistoryService` 类，包含初始化方法。

#### 2.2 实现历史记录保存功能
实现 `saveRecord()` 方法，将传输记录保存到 Preferences，限制最多100条记录。

#### 2.3 实现历史记录查询功能
实现 `getHistoryList()` 方法，按时间倒序返回所有历史记录。

#### 2.4 实现历史记录删除功能
实现 `deleteRecord()` 和 `clearAll()` 方法，支持删除单条记录和清空所有记录。

#### 2.5 添加错误处理
在所有方法中添加 try-catch 错误处理，记录日志。

### 验收标准
- 历史记录能正确保存和读取
- 记录数量超过100条时自动删除最旧记录
- 清空功能正常工作

### 优先级
中

### 预估工时
3小时

---

## 任务 3: 文件选择服务实现

### 任务描述
实现本地音频文件扫描、筛选和验证服务。

### 输入
- PendingTransferFile 数据模型
- HarmonyOS FileSystem API

### 输出
- `features/airdrop/src/main/ets/viewmodel/FileSelectionService.ets` 文件

### 子任务

#### 3.1 创建 FileSelectionService 类
创建单例模式的 `FileSelectionService` 类，定义支持的音频格式常量。

#### 3.2 实现文件扫描功能
实现 `scanLocalAudioFiles()` 方法，扫描指定目录下的音频文件。

#### 3.3 实现文件信息获取功能
实现 `getFileInfo()` 方法，获取单个文件的详细信息（名称、大小、格式等）。

#### 3.4 实现文件验证功能
实现 `validateFile()` 和 `validateFiles()` 方法，验证文件是否存在、格式是否支持、大小是否超限。

#### 3.5 实现文件筛选功能
实现按格式、大小等条件筛选文件的方法。

### 验收标准
- 能正确扫描本地音频文件
- 文件验证逻辑正确
- 支持多种音频格式筛选

### 优先级
高

### 预估工时
4小时

---

## 任务 4: 设备传输视图模型实现

### 任务描述
实现设备传输的核心业务逻辑，协调设备发现、文件选择和传输执行。

### 输入
- AirDropViewModel（现有）
- TransferHistoryService
- FileSelectionService

### 输出
- `features/airdrop/src/main/ets/viewmodel/DeviceTransferViewModel.ets` 文件

### 子任务

#### 4.1 创建 DeviceTransferViewModel 类
创建单例模式的 `DeviceTransferViewModel` 类，依赖注入 AirDropViewModel 和其他服务。

#### 4.2 实现设备扫描功能
实现 `scanDevices()` 方法，调用 AirDropViewModel 的设备发现功能，添加缓存机制。

#### 4.3 实现传输任务创建功能
实现 `createTransferTask()` 方法，创建传输任务并初始化任务状态。

#### 4.4 实现传输任务执行功能
实现 `executeTask()` 方法，逐个传输文件，更新进度，处理异常。

#### 4.5 实现任务取消和重试功能
实现 `cancelTask()` 和 `retryFailed()` 方法，支持取消传输和重试失败的任务。

#### 4.6 实现接收监听设置
实现 `setupReceiveListener()` 方法，设置文件接收监听器。

### 验收标准
- 设备扫描正常工作
- 传输任务能正确创建和执行
- 进度更新及时准确
- 取消和重试功能正常

### 优先级
高

### 预估工时
6小时

---

## 任务 5: 通知服务实现

### 任务描述
实现传输进度和结果的通知显示功能。

### 输入
- HarmonyOS Notification API
- TransferTask 数据模型

### 输出
- `features/airdrop/src/main/ets/viewmodel/NotificationService.ets` 文件

### 子任务

#### 5.1 创建 NotificationService 类
创建单例模式的 `NotificationService` 类。

#### 5.2 实现进度通知显示
实现 `showProgressNotification()` 和 `updateProgressNotification()` 方法，显示传输进度通知。

#### 5.3 实现完成通知显示
实现 `showCompleteNotification()` 方法，显示传输成功或失败通知。

#### 5.4 实现通知取消功能
实现 `cancelNotification()` 方法，取消指定通知。

### 验收标准
- 通知能正确显示和更新
- 点击通知能返回应用
- 通知在传输完成后自动消失

### 优先级
中

### 预估工时
3小时

---

## 任务 6: 设备列表组件实现

### 任务描述
实现设备列表展示和选择功能的UI组件。

### 输入
- DeviceInfo 数据模型
- DeviceTransferViewModel

### 输出
- `features/airdrop/src/main/ets/view/DeviceListView.ets` 文件

### 子任务

#### 6.1 创建 DeviceListView 组件
创建 `@Component` 装饰的 `DeviceListView` 组件，定义属性和状态。

#### 6.2 实现设备列表渲染
使用 `List` 和 `ForEach` 渲染设备列表，显示设备图标、名称、类型、在线状态。

#### 6.3 实现设备选择功能
实现设备点击选择逻辑，显示选中状态，更新 `selectedDevice` 状态。

#### 6.4 实现刷新功能
实现下拉刷新或刷新按钮，触发 `onRefresh` 回调。

#### 6.5 实现空状态显示
当设备列表为空时，显示"未发现附近设备"提示。

#### 6.6 实现加载状态显示
在扫描设备时显示加载动画。

### 验收标准
- 设备列表正确显示
- 设备选择功能正常
- 刷新功能正常
- 空状态和加载状态正确显示

### 优先级
高

### 预估工时
4小时

---

## 任务 7: 文件选择面板组件实现

### 任务描述
实现本地音频文件选择面板，支持多选、筛选和预览。

### 输入
- PendingTransferFile 数据模型
- FileSelectionService

### 输出
- `features/airdrop/src/main/ets/view/FilePickerPanel.ets` 文件

### 子任务

#### 7.1 创建 FilePickerPanel 组件
创建 `@Component` 装饰的 `FilePickerPanel` 组件，定义属性和状态。

#### 7.2 实现文件列表渲染
使用虚拟列表渲染文件列表，显示文件图标、名称、大小、格式。

#### 7.3 实现文件多选功能
实现文件复选框选择逻辑，支持多选，显示已选数量和总大小。

#### 7.4 实现文件筛选功能
实现按格式筛选文件的下拉菜单或标签栏。

#### 7.5 实现全选和取消全选功能
提供全选和取消全选按钮。

#### 7.6 实现文件验证提示
当选择的文件超过大小限制或数量限制时，显示警告提示。

#### 7.7 实现空状态显示
当没有音频文件时，显示空状态提示。

### 验收标准
- 文件列表正确显示
- 多选功能正常
- 筛选功能正常
- 限制验证正确

### 优先级
高

### 预估工时
5小时

---

## 任务 8: 传输进度组件实现

### 任务描述
实现传输进度显示组件，包括进度条、速度、状态等。

### 输入
- TransferTask 数据模型

### 输出
- `features/airdrop/src/main/ets/view/TransferProgressView.ets` 文件

### 子任务

#### 8.1 创建 TransferProgressView 组件
创建 `@Component` 装饰的 `TransferProgressView` 组件，定义属性和状态。

#### 8.2 实现进度条显示
使用 `Progress` 组件显示传输进度百分比。

#### 8.3 实现传输信息显示
显示当前文件名、已传输大小、总大小、传输速度。

#### 8.4 实现状态图标显示
根据传输状态显示对应的图标（传输中、完成、失败）。

#### 8.5 实现操作按钮
提供取消、暂停/继续按钮，触发对应回调。

### 验收标准
- 进度条正确显示和更新
- 传输信息准确
- 操作按钮功能正常

### 优先级
高

### 预估工时
3小时

---

## 任务 9: 接收确认对话框组件实现

### 任务描述
实现文件接收确认对话框，显示发送方信息和文件信息。

### 输入
- ReceiveRequest 数据模型

### 输出
- `features/airdrop/src/main/ets/view/ReceiveConfirmDialog.ets` 文件

### 子任务

#### 9.1 创建 ReceiveConfirmDialog 组件
创建 `@Component` 装饰的 `ReceiveConfirmDialog` 组件，使用 `CustomDialog` 或自定义弹窗。

#### 9.2 实现请求信息显示
显示发送方设备名称、文件名、文件大小。

#### 9.3 实现操作按钮
提供"接收"和"拒绝"按钮，触发对应回调。

#### 9.4 实现超时处理
设置超时定时器，超时后自动拒绝。

### 验收标准
- 对话框正确显示
- 接收和拒绝功能正常
- 超时处理正确

### 优先级
高

### 预估工时
2小时

---

## 任务 10: 传输历史页面实现

### 任务描述
实现传输历史记录查看页面。

### 输入
- TransferHistoryRecord 数据模型
- TransferHistoryService

### 输出
- `features/airdrop/src/main/ets/view/TransferHistoryPage.ets` 文件

### 子任务

#### 10.1 创建 TransferHistoryPage 组件
创建 `@Component` 装饰的 `TransferHistoryPage` 组件。

#### 10.2 实现历史列表渲染
使用 `List` 和 `ForEach` 渲染历史记录列表，显示文件名、时间、设备、方向、状态。

#### 10.3 实现记录详情查看
点击记录时显示详细信息（文件大小、耗时、路径等）。

#### 10.4 实现清空历史功能
提供清空历史按钮，确认后清空所有记录。

#### 10.5 实现空状态显示
当没有历史记录时，显示空状态提示。

### 验收标准
- 历史列表正确显示
- 详情查看功能正常
- 清空功能正常

### 优先级
中

### 预估工时
3小时

---

## 任务 11: 设备传输主页面实现

### 任务描述
实现设备传输功能的主页面，协调各子组件。

### 输入
- DeviceListView
- FilePickerPanel
- TransferProgressView
- DeviceTransferViewModel

### 输出
- `features/airdrop/src/main/ets/view/DeviceTransferPage.ets` 文件

### 子任务

#### 11.1 创建 DeviceTransferPage 组件
创建 `@Component` 装饰的 `DeviceTransferPage` 组件，定义页面状态。

#### 11.2 实现页面布局
使用 `Column` 和 `Row` 布局，包含标题栏、设备列表、文件选择区域、操作栏。

#### 11.3 集成设备列表组件
集成 `DeviceListView` 组件，处理设备选择事件。

#### 11.4 集成文件选择组件
集成 `FilePickerPanel` 组件，处理文件选择事件。

#### 11.5 集成传输进度组件
集成 `TransferProgressView` 组件，显示传输进度。

#### 11.6 实现发送功能
实现发送按钮点击逻辑，创建并执行传输任务。

#### 11.7 实现取消功能
实现取消按钮点击逻辑，取消当前传输任务。

#### 11.8 实现页面关闭功能
实现关闭按钮，关闭传输页面。

### 验收标准
- 页面布局正确
- 各子组件集成正常
- 发送和取消功能正常
- 页面关闭功能正常

### 优先级
高

### 预估工时
5小时

---

## 任务 12: 功能集成与入口添加

### 任务描述
将设备传输功能集成到应用中，添加功能入口。

### 输入
- DeviceTransferPage
- 现有音乐列表页和播放页

### 输出
- 更新的音乐列表页和播放页
- 更新的模块导出文件

### 子任务

#### 12.1 更新模块导出
在 `features/airdrop/Index.ets` 中导出新增的组件和服务。

#### 12.2 在音乐列表页添加入口
在音乐列表页添加"设备传输"按钮，点击打开 `DeviceTransferPage`。

#### 12.3 在播放页添加入口
在播放页添加"分享"按钮，点击打开 `DeviceTransferPage` 并传入当前音乐信息。

#### 12.4 在本地文件列表添加入口
在 `LocalFileListComponent` 中添加"发送到设备"按钮。

#### 12.5 初始化服务
在应用启动时初始化 `TransferHistoryService` 和 `DeviceTransferViewModel`。

#### 12.6 设置接收监听
在应用启动时设置文件接收监听，处理接收请求。

### 验收标准
- 功能入口正确显示
- 点击入口能打开传输页面
- 服务初始化正常
- 接收监听正常工作

### 优先级
高

### 预估工时
4小时

---

## 任务依赖关系

```
任务1 (数据模型)
  │
  ├─► 任务2 (历史服务)
  │
  ├─► 任务3 (文件选择服务)
  │
  └─► 任务4 (传输视图模型)
        │
        ├─► 任务5 (通知服务)
        │
        ├─► 任务6 (设备列表组件)
        │
        ├─► 任务7 (文件选择组件)
        │
        ├─► 任务8 (传输进度组件)
        │
        ├─► 任务9 (接收确认对话框)
        │
        ├─► 任务10 (历史页面)
        │
        └─► 任务11 (主页面)
              │
              └─► 任务12 (功能集成)
```

## 任务优先级汇总

| 优先级 | 任务数量 | 任务编号 |
|--------|----------|----------|
| 高 | 9个 | 1, 3, 4, 6, 7, 8, 9, 11, 12 |
| 中 | 3个 | 2, 5, 10 |

## 预估总工时

**总计**: 44小时

## 开发建议

1. **按依赖顺序开发**：严格按照任务依赖关系顺序开发，避免阻塞
2. **优先完成高优先级任务**：确保核心功能优先实现
3. **单元测试同步**：每个任务完成后编写对应的单元测试
4. **代码审查**：关键任务（如任务4、任务11）完成后进行代码审查
5. **集成测试**：任务12完成后进行完整的集成测试

## 风险提示

1. **设备发现不稳定**：可能需要多次测试和优化
2. **传输性能**：大文件传输可能影响性能，需要充分测试
3. **权限问题**：确保所有必要权限已正确配置
4. **兼容性**：在不同设备形态上测试UI适配

---

## 附录：代码生成提示

### 任务 1 代码生成提示
```
在 features/airdrop/src/main/ets/viewmodel/ 目录下创建 TransferModels.ets 文件。
定义以下接口：
1. PendingTransferFile - 待传输文件信息
2. TransferTask - 传输任务
3. TransferHistoryRecord - 传输历史记录
4. ReceiveRequest - 接收请求
扩展现有 DeviceInfo 接口，添加 iconResource 和 lastDiscoveredTime 字段。
所有接口添加完整的 JSDoc 注释。
```

### 任务 2 代码生成提示
```
在 features/airdrop/src/main/ets/viewmodel/ 目录下创建 TransferHistoryService.ets 文件。
实现单例模式的 TransferHistoryService 类。
使用 @ohos.data.preferences 进行数据持久化。
实现以下方法：
- initialize(context): 初始化服务
- saveRecord(record): 保存历史记录
- getHistoryList(): 获取历史列表
- deleteRecord(recordId): 删除单条记录
- clearAll(): 清空所有记录
限制最多保存100条记录，超过时自动删除最旧记录。
添加完整的错误处理和日志记录。
```

### 任务 3 代码生成提示
```
在 features/airdrop/src/main/ets/viewmodel/ 目录下创建 FileSelectionService.ets 文件。
实现单例模式的 FileSelectionService 类。
使用 @ohos.file.fs 进行文件操作。
实现以下方法：
- scanLocalAudioFiles(directory): 扫描本地音频文件
- getFileInfo(filePath): 获取文件信息
- validateFile(file): 验证单个文件
- validateFiles(files): 批量验证文件
支持的音频格式：mp3, wav, flac, aac, m4a, ogg。
文件大小限制：500MB。
```

### 任务 4 代码生成提示
```
在 features/airdrop/src/main/ets/viewmodel/ 目录下创建 DeviceTransferViewModel.ets 文件。
实现单例模式的 DeviceTransferViewModel 类。
依赖注入 AirDropViewModel、TransferHistoryService、FileSelectionService。
实现以下方法：
- scanDevices(): 扫描附近设备
- createTransferTask(device, files): 创建传输任务
- executeTask(task, onProgress): 执行传输任务
- cancelTask(): 取消当前任务
- retryFailed(): 重试失败任务
- setupReceiveListener(onRequest, onReceive): 设置接收监听
使用 Promise 和 async/await 处理异步操作。
添加完整的错误处理和重试机制。
```

### 任务 5 代码生成提示
```
在 features/airdrop/src/main/ets/viewmodel/ 目录下创建 NotificationService.ets 文件。
实现单例模式的 NotificationService 类。
使用 @ohos.notification 进行通知管理。
实现以下方法：
- showProgressNotification(task): 显示进度通知
- updateProgressNotification(task): 更新进度通知
- showCompleteNotification(success, fileName): 显示完成通知
- cancelNotification(notificationId): 取消通知
通知应包含传输进度、文件名、操作按钮。
```

### 任务 6 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 DeviceListView.ets 文件。
使用 @Component 装饰器定义 DeviceListView 组件。
组件属性：
- devices: DeviceInfo[] - 设备列表
- selectedDevice: DeviceInfo - 选中的设备（@Link）
- isLoading: boolean - 是否正在加载
- onRefresh: () => void - 刷新回调
使用 List 和 ForEach 渲染设备列表。
每个设备项显示：图标、名称、类型、在线状态、选中标记。
实现点击选择、刷新、空状态、加载状态。
```

### 任务 7 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 FilePickerPanel.ets 文件。
使用 @Component 装饰器定义 FilePickerPanel 组件。
组件属性：
- isShow: boolean - 是否显示（@Link）
- selectedFiles: PendingTransferFile[] - 已选文件（@Link）
- supportedFormats: string[] - 支持的格式
- maxSelectCount: number - 最大选择数量
- maxTotalSize: number - 最大总大小
使用虚拟列表渲染文件列表。
实现：文件多选、格式筛选、全选/取消全选、大小验证、空状态。
显示已选文件数量和总大小。
```

### 任务 8 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 TransferProgressView.ets 文件。
使用 @Component 装饰器定义 TransferProgressView 组件。
组件属性：
- task: TransferTask - 传输任务
- onCancel: () => void - 取消回调
- onPauseOrResume: () => void - 暂停/继续回调
使用 Progress 组件显示进度条。
显示：当前文件名、已传输/总大小、传输速度、进度百分比、状态图标。
提供取消和暂停/继续按钮。
```

### 任务 9 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 ReceiveConfirmDialog.ets 文件。
使用 @Component 装饰器定义 ReceiveConfirmDialog 组件。
组件属性：
- isShow: boolean - 是否显示（@Link）
- request: ReceiveRequest - 接收请求
- onAccept: () => void - 接受回调
- onReject: () => void - 拒绝回调
使用 CustomDialog 或自定义弹窗实现。
显示：发送方设备名称、文件名、文件大小。
提供"接收"和"拒绝"按钮。
设置30秒超时，超时自动拒绝。
```

### 任务 10 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 TransferHistoryPage.ets 文件。
使用 @Component 装饰器定义 TransferHistoryPage 组件。
使用 TransferHistoryService 获取历史记录。
使用 List 和 ForEach 渲染历史列表。
每条记录显示：文件名、传输时间、对方设备、方向图标、状态图标。
点击记录显示详细信息对话框。
提供清空历史按钮，确认后清空。
实现空状态显示。
```

### 任务 11 代码生成提示
```
在 features/airdrop/src/main/ets/view/ 目录下创建 DeviceTransferPage.ets 文件。
使用 @Component 装饰器定义 DeviceTransferPage 组件。
组件属性：
- isShow: boolean - 是否显示（@Link）
- initialMusicInfo: MusicInfo - 初始音乐信息（可选）
- onComplete: (success, files) => void - 完成回调
页面布局：
- 标题栏（标题 + 关闭按钮）
- 设备列表区域（DeviceListView）
- 文件选择区域（FilePickerPanel）
- 传输进度区域（TransferProgressView）
- 操作栏（发送按钮 + 取消按钮）
使用 DeviceTransferViewModel 处理业务逻辑。
实现设备选择、文件选择、发送、取消、关闭功能。
```

### 任务 12 代码生成提示
```
1. 更新 features/airdrop/Index.ets，导出新增的组件和服务。
2. 在 features/musiclist/src/main/ets/view/MusicListPage.ets 中添加"设备传输"按钮。
3. 在播放页组件中添加"分享"按钮。
4. 在 LocalFileListComponent 中添加"发送到设备"按钮。
5. 在 products/phone/src/main/ets/entryability/EntryAbility.ets 中初始化服务：
   - TransferHistoryService.initialize(context)
   - DeviceTransferViewModel.setupReceiveListener()
6. 确保所有按钮点击能正确打开 DeviceTransferPage。
```

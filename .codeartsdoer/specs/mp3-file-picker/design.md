# MP3文件选择播放功能 - 技术设计文档

## 文档信息
- **功能名称**: MP3文件选择播放 (mp3-file-picker)
- **创建日期**: 2026-05-26
- **版本**: v1.0
- **关联需求**: spec.md v1.0

---

## 1. 系统架构

### 1.1 整体架构
```
┌─────────────────────────────────────┐
│           UI Layer                   │
│  ┌─────────────────────────────┐   │
│  │   FilePickerComponent       │   │
│  │   LocalFileListComponent    │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│        Business Layer                │
│  ┌─────────────────────────────┐   │
│  │   FilePickerService         │   │
│  │   LocalMusicService         │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│         Data Layer                   │
│  ┌─────────────────────────────┐   │
│  │   FileSystemService         │   │
│  │   MediaService              │   │
│  └─────────────────────────────┘   │
└─────────────────────────────────────┘
```

---

## 2. 组件设计

### 2.1 FilePickerComponent
**职责**: 文件选择器UI组件

**属性**:
```typescript
@State isPickerOpen: boolean = false
@State selectedFile: FileObject | null = null
@State recentFiles: LocalFile[] = []
```

**方法**:
```typescript
openPicker(): void          // 打开文件选择器
closePicker(): void         // 关闭文件选择器
onFileSelected(file: FileObject): void  // 文件选择回调
```

---

### 2.2 LocalFileListComponent
**职责**: 本地文件列表显示组件

**属性**:
```typescript
@State localFiles: LocalFile[] = []
@State currentPlaying: string = ''
```

**方法**:
```typescript
loadRecentFiles(): void     // 加载最近文件
playFile(file: LocalFile): void  // 播放文件
removeFile(file: LocalFile): void  // 移除文件
```

---

### 2.3 FilePickerService
**职责**: 文件选择业务逻辑

**方法**:
```typescript
async selectMP3File(): Promise<FileObject>
async readFile(file: FileObject): Promise<ArrayBuffer>
async getFileMetadata(file: FileObject): Promise<FileMetadata>
```

---

### 2.4 LocalMusicService
**职责**: 本地音乐管理服务

**方法**:
```typescript
addToRecentList(file: LocalFile): void
getRecentList(): LocalFile[]
clearRecentList(): void
saveToPreference(file: LocalFile): void
```

---

## 3. 数据模型

### 3.1 LocalFile
```typescript
interface LocalFile {
  id: string              // 文件唯一标识
  name: string            // 文件名
  path: string            // 文件路径
  size: number            // 文件大小
  duration: number        // 时长(秒)
  addTime: number         // 添加时间戳
  lastPlayTime: number    // 最后播放时间
}
```

### 3.2 FileMetadata
```typescript
interface FileMetadata {
  title: string           // 标题
  artist: string          // 艺术家
  album: string           // 专辑
  duration: number        // 时长
  bitrate: number         // 比特率
}
```

### 3.3 FileObject
```typescript
interface FileObject {
  uri: string             // 文件URI
  name: string            // 文件名
  size: number            // 文件大小
  type: string            // 文件类型
}
```

---

## 4. API设计

### 4.1 文件选择API
```typescript
// 打开文件选择器
async function openFilePicker(): Promise<FileObject> {
  const picker = new picker.PhotoViewPicker();
  const result = await picker.select({
    maxSelectNumber: 1,
    fileSuffixFilters: ['.mp3']
  });
  return result.photoUris[0];
}
```

### 4.2 文件读取API
```typescript
// 读取文件内容
async function readFileContent(uri: string): Promise<ArrayBuffer> {
  const file = await fs.open(uri, fs.OpenMode.READ_ONLY);
  const stat = await fs.stat(file.fd);
  const buffer = new ArrayBuffer(stat.size);
  await fs.read(file.fd, buffer);
  await fs.close(file.fd);
  return buffer;
}
```

### 4.3 媒体播放API
```typescript
// 播放本地文件
async function playLocalFile(file: LocalFile): Promise<void> {
  const mediaInfo = await media.createAVMediaSource(file.path);
  const player = await media.createAVPlayer();
  await player.setSource(mediaInfo);
  await player.prepare();
  await player.play();
}
```

---

## 5. 界面设计

### 5.1 文件选择按钮
**位置**: 音乐列表页面顶部
**样式**: 
- 图标: 文件夹图标
- 文字: "选择本地文件"
- 颜色: 与主题一致

### 5.2 文件选择器
**类型**: HarmonyOS系统文件选择器
**过滤**: 只显示.mp3文件
**多选**: 否（单选模式）

### 5.3 本地文件列表
**位置**: 音乐列表页面底部
**显示**:
- 文件名
- 添加时间
- 播放按钮
- 删除按钮

---

## 6. 流程设计

### 6.1 文件选择流程
```
用户点击"选择文件" 
  → 请求文件权限
  → 打开文件选择器
  → 用户选择文件
  → 读取文件内容
  → 提取元数据
  → 添加到最近列表
  → 开始播放
```

### 6.2 文件播放流程
```
用户选择本地文件
  → 读取文件路径
  → 创建媒体源
  → 初始化播放器
  → 准备播放
  → 开始播放
  → 更新UI状态
```

---

## 7. 权限设计

### 7.1 需要的权限
```json
{
  "requestPermissions": [
    {
      "name": "ohos.permission.READ_MEDIA",
      "reason": "需要读取媒体文件",
      "usedScene": {
        "abilities": ["MainAbility"],
        "when": "inuse"
      }
    }
  ]
}
```

### 7.2 权限处理流程
```
检查权限状态
  → 如果已授权，直接执行
  → 如果未授权，请求权限
  → 用户同意，执行操作
  → 用户拒绝，显示提示
```

---

## 8. 错误处理

### 8.1 错误类型
- 文件不存在
- 文件格式错误
- 权限被拒绝
- 文件读取失败
- 播放失败

### 8.2 错误处理策略
```typescript
try {
  await selectAndPlayFile();
} catch (error) {
  if (error.code === 'PERMISSION_DENIED') {
    showPermissionDialog();
  } else if (error.code === 'FILE_NOT_FOUND') {
    showToast('文件不存在');
  } else {
    showToast('操作失败，请重试');
  }
}
```

---

## 9. 性能优化

### 9.1 文件读取优化
- 使用异步读取
- 大文件分块读取
- 缓存文件元数据

### 9.2 播放优化
- 预加载文件
- 使用流式播放
- 优化内存使用

---

## 10. 测试策略

### 10.1 单元测试
- 文件选择逻辑测试
- 文件读取测试
- 元数据提取测试

### 10.2 集成测试
- 完整流程测试
- 权限处理测试
- 错误处理测试

### 10.3 UI测试
- 界面显示测试
- 交互测试
- 边界条件测试

---

**文档状态**: ✅ 完成
**下一步**: 创建任务清单

# MP3文件选择播放功能 - 任务清单

## 文档信息
- **功能名称**: MP3文件选择播放 (mp3-file-picker)
- **创建日期**: 2026-05-26
- **版本**: v1.0
- **关联文档**: spec.md v1.0, design.md v1.0

---

## 任务概览

| 任务ID | 任务名称 | 优先级 | 预估工时 | 依赖 |
|--------|---------|--------|---------|------|
| 1 | 添加文件读取权限配置 | 高 | 5分钟 | 无 |
| 2 | 创建FilePickerService服务 | 高 | 20分钟 | 任务1 |
| 3 | 创建LocalMusicService服务 | 高 | 15分钟 | 无 |
| 4 | 创建FilePickerComponent组件 | 高 | 25分钟 | 任务2 |
| 5 | 创建LocalFileListComponent组件 | 中 | 20分钟 | 任务3 |
| 6 | 集成到音乐列表页面 | 高 | 15分钟 | 任务4, 任务5 |
| 7 | 测试验证 | 高 | 15分钟 | 任务6 |

**总计**: 7个主任务，预估总工时115分钟

---

## 任务 1: 添加文件读取权限配置

### 任务描述
在module.json5中添加文件读取权限配置

### 输入
- 现有文件：`products/phone/src/main/module.json5`

### 输出
- 更新后的module.json5文件

### 实现步骤
1. 打开module.json5文件
2. 在requestPermissions中添加READ_MEDIA权限
3. 保存文件

### 代码实现提示
```json
{
  "requestPermissions": [
    {
      "name": "ohos.permission.READ_MEDIA",
      "reason": "$string:read_media_reason",
      "usedScene": {
        "abilities": ["EntryAbility"],
        "when": "inuse"
      }
    }
  ]
}
```

### 验收标准
- [ ] 权限配置正确
- [ ] reason字符串已定义
- [ ] 配置无语法错误

---

## 任务 2: 创建FilePickerService服务

### 任务描述
创建文件选择服务，处理文件选择和读取逻辑

### 输入
- HarmonyOS文件选择器API
- 文件系统API

### 输出
- 新文件：`common/mediacommon/src/main/ets/utils/FilePickerService.ets`

### 实现步骤
1. 创建FilePickerService.ets文件
2. 实现selectMP3File方法
3. 实现readFileContent方法
4. 实现getFileMetadata方法
5. 导出服务实例

### 代码实现提示
```typescript
import picker from '@ohos.file.picker';
import fs from '@ohos.file.fs';

export class FilePickerService {
  private static instance: FilePickerService;
  
  static getInstance(): FilePickerService {
    if (!FilePickerService.instance) {
      FilePickerService.instance = new FilePickerService();
    }
    return FilePickerService.instance;
  }
  
  async selectMP3File(): Promise<FileObject> {
    const photoSelectOptions = new picker.PhotoSelectOptions();
    photoSelectOptions.maxSelectNumber = 1;
    photoSelectOptions.fileSuffixFilters = ['.mp3'];
    
    const photoPicker = new picker.PhotoViewPicker();
    const result = await photoPicker.select(photoSelectOptions);
    
    if (result.photoUris && result.photoUris.length > 0) {
      return {
        uri: result.photoUris[0],
        name: this.getFileName(result.photoUris[0]),
        size: 0,
        type: 'audio/mpeg'
      };
    }
    throw new Error('No file selected');
  }
  
  private getFileName(uri: string): string {
    const parts = uri.split('/');
    return parts[parts.length - 1];
  }
}

export interface FileObject {
  uri: string;
  name: string;
  size: number;
  type: string;
}
```

### 验收标准
- [ ] 文件选择器能正常打开
- [ ] 只显示MP3文件
- [ ] 能正确返回选择的文件信息

---

## 任务 3: 创建LocalMusicService服务

### 任务描述
创建本地音乐管理服务，管理最近播放列表

### 输入
- Preferences API
- LocalFile数据模型

### 输出
- 新文件：`common/mediacommon/src/main/ets/utils/LocalMusicService.ets`

### 实现步骤
1. 创建LocalMusicService.ets文件
2. 实现addToRecentList方法
3. 实现getRecentList方法
4. 实现clearRecentList方法
5. 实现数据持久化

### 代码实现提示
```typescript
import preferences from '@ohos.data.preferences';

export class LocalMusicService {
  private static instance: LocalMusicService;
  private prefs: preferences.Preferences | null = null;
  private readonly RECENT_FILES_KEY = 'recent_local_files';
  private readonly MAX_RECENT_FILES = 20;
  
  static getInstance(): LocalMusicService {
    if (!LocalMusicService.instance) {
      LocalMusicService.instance = new LocalMusicService();
    }
    return LocalMusicService.instance;
  }
  
  async init(context: Context): Promise<void> {
    this.prefs = await preferences.getPreferences(context, 'local_music_prefs');
  }
  
  addToRecentList(file: LocalFile): void {
    let recentFiles = this.getRecentList();
    
    // 移除已存在的相同文件
    recentFiles = recentFiles.filter(f => f.path !== file.path);
    
    // 添加到列表开头
    recentFiles.unshift(file);
    
    // 限制列表长度
    if (recentFiles.length > this.MAX_RECENT_FILES) {
      recentFiles = recentFiles.slice(0, this.MAX_RECENT_FILES);
    }
    
    // 保存
    this.prefs?.put(this.RECENT_FILES_KEY, JSON.stringify(recentFiles));
    this.prefs?.flush();
  }
  
  getRecentList(): LocalFile[] {
    const data = this.prefs?.get(this.RECENT_FILES_KEY, '[]') as string;
    return JSON.parse(data);
  }
  
  clearRecentList(): void {
    this.prefs?.put(this.RECENT_FILES_KEY, '[]');
    this.prefs?.flush();
  }
}

export interface LocalFile {
  id: string;
  name: string;
  path: string;
  size: number;
  duration: number;
  addTime: number;
  lastPlayTime: number;
}
```

### 验收标准
- [ ] 能添加文件到列表
- [ ] 能获取最近列表
- [ ] 能清空列表
- [ ] 数据持久化正常

---

## 任务 4: 创建FilePickerComponent组件

### 任务描述
创建文件选择UI组件，提供文件选择入口

### 输入
- FilePickerService
- UI设计规范

### 输出
- 新文件：`features/musiclist/src/main/ets/components/FilePickerComponent.ets`

### 实现步骤
1. 创建FilePickerComponent.ets文件
2. 实现UI布局
3. 实现文件选择逻辑
4. 实现权限处理
5. 实现错误处理

### 代码实现提示
```typescript
import { FilePickerService, FileObject } from 'mediacommon';
import { LocalMusicService, LocalFile } from 'mediacommon';
import abilityAccessCtrl, { Permissions } from '@ohos.abilityAccessCtrl';

@Component
export struct FilePickerComponent {
  @StorageLink('pageIndexInfos') pageIndexInfos: NavPathStack = new NavPathStack();
  private filePickerService: FilePickerService = FilePickerService.getInstance();
  private localMusicService: LocalMusicService = LocalMusicService.getInstance();
  
  build() {
    Row() {
      Image($r('app.media.ic_folder'))
        .width(24)
        .height(24)
        .margin({ right: 8 })
      
      Text('选择本地文件')
        .fontSize(16)
        .fontColor(Color.White)
    }
    .padding({ left: 16, right: 16, top: 12, bottom: 12 })
    .backgroundColor('#4CAF50')
    .borderRadius(8)
    .onClick(() => {
      this.handleFilePick();
    })
  }
  
  private async handleFilePick(): Promise<void> {
    try {
      // 检查权限
      const hasPermission = await this.checkPermission();
      if (!hasPermission) {
        await this.requestPermission();
      }
      
      // 选择文件
      const file = await this.filePickerService.selectMP3File();
      
      // 添加到最近列表
      const localFile: LocalFile = {
        id: Date.now().toString(),
        name: file.name,
        path: file.uri,
        size: file.size,
        duration: 0,
        addTime: Date.now(),
        lastPlayTime: Date.now()
      };
      this.localMusicService.addToRecentList(localFile);
      
      // 播放文件
      await this.playFile(file.uri);
      
    } catch (error) {
      this.getUIContext().getPromptAction().showToast({
        message: '文件选择失败: ' + error.message,
        duration: 2000
      });
    }
  }
  
  private async checkPermission(): Promise<boolean> {
    const atManager = abilityAccessCtrl.createAtManager();
    const grantStatus = await atManager.verifyAccessToken(
      globalThis.abilityContext.applicationInfo.accessTokenId,
      'ohos.permission.READ_MEDIA'
    );
    return grantStatus === abilityAccessCtrl.GrantStatus.PERMISSION_GRANTED;
  }
  
  private async requestPermission(): Promise<void> {
    // 请求权限逻辑
  }
  
  private async playFile(uri: string): Promise<void> {
    // 播放文件逻辑
  }
}
```

### 验收标准
- [ ] UI显示正常
- [ ] 点击能打开文件选择器
- [ ] 权限处理正确
- [ ] 错误处理完善

---

## 任务 5: 创建LocalFileListComponent组件

### 任务描述
创建本地文件列表组件，显示最近播放的本地文件

### 输入
- LocalMusicService
- UI设计规范

### 输出
- 新文件：`features/musiclist/src/main/ets/components/LocalFileListComponent.ets`

### 实现步骤
1. 创建LocalFileListComponent.ets文件
2. 实现列表UI
3. 实现文件加载
4. 实现播放功能
5. 实现删除功能

### 代码实现提示
```typescript
import { LocalMusicService, LocalFile } from 'mediacommon';

@Component
export struct LocalFileListComponent {
  @State localFiles: LocalFile[] = [];
  @StorageLink('currentPlayingPath') currentPlayingPath: string = '';
  private localMusicService: LocalMusicService = LocalMusicService.getInstance();
  
  aboutToAppear() {
    this.loadRecentFiles();
  }
  
  build() {
    Column() {
      Text('本地文件')
        .fontSize(18)
        .fontColor(Color.White)
        .fontWeight(FontWeight.Bold)
        .margin({ bottom: 12 })
      
      if (this.localFiles.length === 0) {
        Text('暂无本地文件')
          .fontSize(14)
          .fontColor('#999999')
          .margin({ top: 20 })
      } else {
        List() {
          ForEach(this.localFiles, (file: LocalFile) => {
            ListItem() {
              this.FileItem(file)
            }
          }, (file: LocalFile) => file.id)
        }
        .width('100%')
        .layoutWeight(1)
      }
    }
    .width('100%')
    .padding(16)
  }
  
  @Builder
  FileItem(file: LocalFile) {
    Row() {
      Column() {
        Text(file.name)
          .fontSize(14)
          .fontColor(Color.White)
          .maxLines(1)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
        
        Text(this.formatTime(file.lastPlayTime))
          .fontSize(12)
          .fontColor('#999999')
          .margin({ top: 4 })
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)
      
      Row() {
        Image($r('app.media.ic_public_play'))
          .width(24)
          .height(24)
          .onClick(() => {
            this.playFile(file);
          })
        
        Image($r('app.media.ic_delete'))
          .width(20)
          .height(20)
          .margin({ left: 12 })
          .onClick(() => {
            this.removeFile(file);
          })
      }
    }
    .width('100%')
    .padding({ top: 8, bottom: 8 })
  }
  
  private loadRecentFiles(): void {
    this.localFiles = this.localMusicService.getRecentList();
  }
  
  private async playFile(file: LocalFile): Promise<void> {
    // 播放文件
  }
  
  private removeFile(file: LocalFile): void {
    // 移除文件
  }
  
  private formatTime(timestamp: number): string {
    const date = new Date(timestamp);
    return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
  }
}
```

### 验收标准
- [ ] 列表显示正常
- [ ] 能加载最近文件
- [ ] 能播放文件
- [ ] 能删除文件

---

## 任务 6: 集成到音乐列表页面

### 任务描述
将文件选择组件集成到音乐列表页面

### 输入
- FilePickerComponent
- LocalFileListComponent
- MusicListPage

### 输出
- 更新后的MusicListPage.ets

### 实现步骤
1. 在MusicListPage中导入组件
2. 在页面顶部添加FilePickerComponent
3. 在页面底部添加LocalFileListComponent
4. 调整布局

### 代码实现提示
```typescript
import { FilePickerComponent } from '../components/FilePickerComponent';
import { LocalFileListComponent } from '../components/LocalFileListComponent';

// 在Header下方添加
FilePickerComponent()
  .margin({
    left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
      $r('app.float.margin_left_sm') : $r('app.float.margin_left'),
    right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
      $r('app.float.margin_right_sm') : $r('app.float.margin_right'),
    top: 8,
    bottom: 8
  })

// 在列表底部添加
LocalFileListComponent()
  .margin({
    left: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
      $r('app.float.margin_left_sm') : $r('app.float.margin_left'),
    right: this.currentBp === BreakpointConstants.BREAKPOINT_SM ?
      $r('app.float.margin_right_sm') : $r('app.float.margin_right'),
    top: 16
  })
```

### 验收标准
- [ ] 组件显示正常
- [ ] 布局协调
- [ ] 功能正常

---

## 任务 7: 测试验证

### 任务描述
测试文件选择和播放功能

### 输入
- 完成的代码

### 输出
- 测试报告

### 测试用例
1. 文件选择器打开测试
2. 文件过滤测试
3. 文件读取测试
4. 文件播放测试
5. 最近列表测试
6. 权限处理测试

### 验收标准
- [ ] 所有测试用例通过
- [ ] 无明显bug
- [ ] 性能良好

---

## 任务依赖关系图

```
任务1: 添加权限配置
    │
    ├──→ 任务2: 创建FilePickerService
    │         │
任务3: 创建LocalMusicService    │
    │         │                 │
    │         └──→ 任务4: 创建FilePickerComponent
    │                   │
    └──→ 任务5: 创建LocalFileListComponent
              │         │
              └─────────┴──→ 任务6: 集成到页面
                                │
                                └──→ 任务7: 测试验证
```

---

**文档状态**: ✅ 完成
**下一步**: 开始执行任务

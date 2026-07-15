# MusicHome 功能修改文档

## 项目简介

基于华为开源鸿蒙（HarmonyOS）多设备音乐界面示例工程 MusicHome 进行二次开发。原工程实现了基于自适应和响应式布局的多端音乐专辑应用，支持直板机、双折叠、平板和智能穿戴设备。在原工程基础上，新增了三大核心功能模块：**用户登录注册系统**、**设备间音乐文件传输**、以及**本地音乐文件管理**。

---

## 一、用户登录功能（Login 模块）

### 1.1 功能描述

新增用户登录模块，支持用户通过用户名和密码进行身份认证，实现个性化音乐体验。登录功能包含完整的输入验证、安全存储、登录限制和自动登录机制。

### 1.2 新增文件清单

| 文件路径 | 说明 |
|---------|------|
| features/login/Index.ets | 模块导出入口 |
| features/login/src/main/ets/view/LoginPage.ets | 登录页面主组件 |
| features/login/src/main/ets/view/LoginHeader.ets | 登录页头部组件（含返回按钮和标题） |
| features/login/src/main/ets/view/LoginForm.ets | 登录表单组件（用户名、密码输入框及登录按钮） |
| features/login/src/main/ets/view/LoginInputItem.ets | 通用输入框组件（支持密码可见性切换） |
| features/login/src/main/ets/viewmodel/LoginViewModel.ets | 登录业务逻辑类 |
| features/login/src/main/ets/viewmodel/LoginModels.ets | 登录数据模型定义 |
| features/login/src/main/ets/constants/LoginConstants.ets | 登录常量、错误消息和响应码定义 |
| features/login/src/main/resources/base/element/string.json | 字符串资源 |
| features/login/src/main/resources/base/media/ic_eye_open.svg | 密码可见图标 |
| features/login/src/main/resources/base/media/ic_eye_close.svg | 密码隐藏图标 |

### 1.3 核心功能点

- **输入验证**：用户名长度3-20位（仅支持字母、数字、下划线），密码长度6-20位
- **登录请求**：通过 HTTP POST 请求调用 /api/user/login 接口
- **Token 认证**：登录成功后获取 Token，支持 Token 有效性验证（/api/user/verify）
- **记住密码**：用户可选择记住密码，下次自动填充（密码加密存储）
- **登录限制**：连续5次登录失败后锁定5分钟，防止暴力破解
- **自动登录**：应用启动时检查已保存的登录信息，验证 Token 有效性后自动登录
- **全局状态管理**：通过 AppStorage 的 userInfo 和 isLoggedIn 管理全局登录状态
- **密码可见性切换**：输入框支持显示/隐藏密码

### 1.4 安全机制

- Token 使用 CryptoUtil 加密后存储到 Preferences
- 记住的密码同样加密存储
- 登录失败次数限制（5次失败后锁定5分钟）
- Token 7天过期机制

---

## 二、用户注册功能（Register 模块）

### 2.1 功能描述

新增用户注册模块，支持新用户创建账号。注册成功后自动登录并返回主页。注册模块复用了登录模块的 LoginInputItem 输入框组件和 LoginHeader 头部组件。

### 2.2 新增文件清单

| 文件路径 | 说明 |
|---------|------|
| features/register/Index.ets | 模块导出入口 |
| features/register/src/main/ets/view/RegisterPage.ets | 注册页面主组件 |
| features/register/src/main/ets/view/RegisterForm.ets | 注册表单组件（用户名、密码、确认密码） |
| features/register/src/main/ets/viewmodel/RegisterViewModel.ets | 注册业务逻辑类 |
| features/register/src/main/ets/viewmodel/RegisterModels.ets | 注册数据模型定义 |
| features/register/src/main/ets/constants/RegisterConstants.ets | 注册常量、错误消息和响应码定义 |
| features/register/src/main/resources/base/element/string.json | 字符串资源 |

### 2.3 核心功能点

- **表单验证**：用户名（3-20位字母数字下划线）、密码（6-20位）、确认密码一致性检查
- **注册请求**：通过 HTTP POST 请求调用 /api/user/register 接口
- **自动登录**：注册成功后自动保存用户信息并登录
- **错误处理**：用户名已存在、参数错误、网络异常等场景的错误提示
- **页面导航**：登录页和注册页之间可互相跳转

---

## 三、设备间音乐文件传输功能（AirDrop 模块扩展）

### 3.1 功能描述

在原有 AirDrop 简单投送功能基础上，大幅扩展了设备间音乐文件传输能力。新增了完整的设备发现与选择、本地音频文件扫描与选择、传输进度跟踪、传输历史记录、系统通知推送、接收确认等子功能，形成了一套完整的跨设备音乐分享解决方案。

### 3.2 新增文件清单

| 文件路径 | 说明 |
|---------|------|
| features/airdrop/src/main/ets/view/DeviceTransferPage.ets | 设备传输主页面（三步骤向导：选设备-选文件-传输） |
| features/airdrop/src/main/ets/view/DeviceListView.ets | 设备列表视图组件（设备发现、选择、刷新） |
| features/airdrop/src/main/ets/view/FilePickerPanel.ets | 文件选择面板组件（本地音频扫描、多选、格式筛选） |
| features/airdrop/src/main/ets/view/TransferProgressView.ets | 传输进度视图组件（进度条、速度、状态显示） |
| features/airdrop/src/main/ets/view/ReceiveConfirmDialog.ets | 接收确认对话框组件（超时自动拒绝） |
| features/airdrop/src/main/ets/view/TransferHistoryPage.ets | 传输历史页面组件（历史列表、详情查看、清空） |
| features/airdrop/src/main/ets/viewmodel/DeviceTransferViewModel.ets | 设备传输视图模型 |
| features/airdrop/src/main/ets/viewmodel/FileSelectionService.ets | 文件选择服务（本地音频扫描、验证、筛选） |
| features/airdrop/src/main/ets/viewmodel/TransferHistoryService.ets | 传输历史服务（持久化存储、查询、统计） |
| features/airdrop/src/main/ets/viewmodel/NotificationService.ets | 通知服务（传输进度和结果通知） |
| features/airdrop/src/main/ets/viewmodel/TransferModels.ets | 传输数据模型定义 |

### 3.3 核心功能点

#### 3.3.1 设备传输主页面（DeviceTransferPage）

- **三步骤向导**：选择设备 -> 选择文件 -> 传输中
- **步骤指示器**：可视化显示当前步骤、已完成步骤和未完成步骤
- **底部操作栏**：根据当前步骤动态显示"下一步"、"上一步"、"发送"、"完成"按钮
- **传输中关闭保护**：传输进行中关闭页面时弹出确认对话框
- **历史记录入口**：右上角历史按钮，以半模态弹窗展示传输历史

#### 3.3.2 设备列表视图（DeviceListView）

- **设备扫描**：自动扫描附近在线设备，支持手动刷新
- **设备展示**：显示设备名称、类型（手机/平板/手表）、在线状态
- **设备选择**：点击选择目标设备，选中状态高亮显示
- **空状态处理**：未发现设备时显示友好提示

#### 3.3.3 文件选择面板（FilePickerPanel）

- **本地音频扫描**：自动扫描设备上的音频文件（mp3/wav/flac/aac/m4a/ogg）
- **格式筛选**：支持按音频格式筛选文件
- **多选操作**：支持全选、取消全选、单文件选择
- **选择限制**：最多50个文件，总大小不超过500MB
- **文件信息展示**：显示文件名、大小、格式

#### 3.3.4 传输进度视图（TransferProgressView）

- **实时进度**：进度条显示当前传输百分比
- **传输速度**：实时显示传输速度（B/s、KB/s、MB/s）
- **文件信息**：显示当前传输文件名和文件序号
- **状态管理**：支持传输中、已完成、失败、暂停等状态
- **操作按钮**：传输中可取消，失败可重试

#### 3.3.5 接收确认对话框（ReceiveConfirmDialog）

- **发送方信息**：显示发送方设备名称
- **文件信息**：显示待接收文件名和大小
- **超时机制**：30秒倒计时自动拒绝
- **操作按钮**：接收/拒绝按钮

#### 3.3.6 传输历史页面（TransferHistoryPage）

- **历史列表**：按时间倒序显示所有传输记录
- **记录信息**：显示文件名、对方设备、传输时间、状态
- **详情查看**：点击记录查看详细信息（半模态弹窗）
- **清空功能**：支持清空所有历史记录（二次确认）
- **状态标识**：成功（绿色）、失败（红色）、已取消（橙色）

#### 3.3.7 文件选择服务（FileSelectionService）

- **本地扫描**：递归扫描指定目录下的音频文件
- **格式支持**：mp3、wav、flac、aac、m4a、ogg
- **文件验证**：检查文件存在性、格式有效性、大小限制（500MB）
- **批量验证**：支持批量文件验证，返回每个文件的验证结果

#### 3.3.8 传输历史服务（TransferHistoryService）

- **持久化存储**：使用 Preferences 存储传输历史，应用重启后数据不丢失
- **记录管理**：保存、删除、清空历史记录
- **条件查询**：支持按传输方向、状态、时间范围、设备ID过滤
- **统计信息**：提供总次数、发送/接收次数、成功/失败次数统计
- **记录上限**：最多保存100条记录，超出自动删除最旧记录

#### 3.3.9 通知服务（NotificationService）

- **进度通知**：传输过程中显示进度通知（百分比、速度）
- **完成通知**：传输完成或失败时显示结果通知
- **接收请求通知**：收到文件传输请求时显示通知
- **通知管理**：支持取消指定通知和全部通知
- **点击跳转**：点击通知可返回应用

---

## 四、公共能力层扩展（mediacommon 模块）

### 4.1 新增工具类

| 文件路径 | 说明 |
|---------|------|
| common/mediacommon/src/main/ets/utils/LoginStorageUtil.ets | 登录数据存储工具（用户信息、Token、记住密码、登录限制） |
| common/mediacommon/src/main/ets/utils/CryptoUtil.ets | 加密解密工具（Token和密码的加密存储） |
| common/mediacommon/src/main/ets/utils/HttpUtil.ets | HTTP 请求工具（登录注册接口调用） |
| common/mediacommon/src/main/ets/utils/FilePickerService.ets | 文件选择服务（系统文件选择器封装） |
| common/mediacommon/src/main/ets/utils/LocalMusicService.ets | 本地音乐服务（本地音乐文件管理） |
| common/mediacommon/src/main/ets/viewmodel/UserInfo.ets | 用户信息数据模型 |

### 4.2 核心工具说明

#### LoginStorageUtil
- 基于 HarmonyOS Preferences 的持久化存储
- 单例模式，全局共享
- 支持用户信息保存/读取/清除
- Token 加密存储（AES）
- 记住密码功能（密码加密存储）
- 登录失败次数记录与限制检查

#### CryptoUtil
- 提供 encrypt/decrypt 静态方法
- 用于 Token 和密码的加密存储

#### HttpUtil
- 封装 HTTP GET/POST 请求
- 支持 Bearer Token 认证头
- 统一错误处理

---

## 五、路由与导航扩展

### 5.1 新增路由

在 RouterUrlConstants 中新增两个路由常量：

| 路由名称 | 常量值 | 说明 |
|---------|--------|------|
| LOGIN | 'LoginPage' | 登录页面 |
| REGISTER | 'RegisterPage' | 注册页面 |

### 5.2 导航注册

在 products/phone/src/main/ets/pages/Index.ets 的 PagesMap 中注册了 LoginPage 和 RegisterPage 的 NavDestination，支持通过 NavPathStack 进行页面导航。

---

## 六、主页面集成

### 6.1 登录状态展示

在手机端主页（PhoneLayout）顶部新增用户状态区域：

- **未登录状态**：显示绿色"登录"按钮，点击跳转登录页
- **已登录状态**：显示用户头像和用户名，点击弹出退出登录确认框

### 6.2 平板端集成

在平板端主页（TabletLayout）的侧边导航 TabletSideNav 中集成了登录入口。

### 6.3 自动登录

应用启动时（aboutToAppear）自动检查登录状态：
1. 初始化 LoginStorageUtil
2. 调用 LoginViewModel.checkAutoLogin() 检查已保存的登录信息
3. 验证 Token 有效性和过期时间
4. 有效则自动恢复登录状态，无效则清除登录信息

---

## 七、技术架构总结

### 7.1 架构分层

```
├── common/                    // 公共能力层
│   ├── constantscommon/       //   公共常量（路由、样式、断点等）
│   └── mediacommon/           //   公共媒体方法（工具类、数据模型）
├── features/                  // 基础特性层
│   ├── login/                 //   登录功能（新增）
│   ├── register/              //   注册功能（新增）
│   ├── airdrop/               //   设备传输功能（大幅扩展）
│   ├── live/                  //   直播页（原有）
│   ├── musiccomment/          //   音乐评论页（原有）
│   └── musiclist/             //   歌曲列表页（原有，有修改）
└── products/                  // 产品定制层
    ├── phone/                 //   手机/折叠/平板端（有修改）
    └── watch/                 //   智能穿戴端（原有）
```

### 7.2 设计模式

- **MVVM 模式**：View（页面组件）- ViewModel（业务逻辑）- Model（数据模型）分层清晰
- **单例模式**：LoginStorageUtil、AirDropViewModel、DeviceTransferViewModel、FileSelectionService、TransferHistoryService、NotificationService 均采用单例
- **观察者模式**：DeviceTransferViewModel 通过事件回调通知 UI 更新
- **服务模式**：文件选择、传输历史、通知等功能封装为独立 Service

### 7.3 关键技术

| 技术 | 用途 |
|------|------|
| ArkTS | 开发语言 |
| ArkUI 声明式开发范式 | UI 框架 |
| @StorageLink / @StorageProp | 全局状态管理 |
| Preferences | 轻量级数据持久化 |
| NavPathStack | 页面导航 |
| notificationManager | 系统通知 |
| @ohos.file.fs | 文件系统操作 |
| HTTP 请求 | 网络通信 |
| CryptoUtil | 数据加密 |

### 7.4 兼容性

- HarmonyOS 5.1.0 Release 及以上
- DevEco Studio 6.0.2 Release 及以上
- HarmonyOS 6.0.2 Release SDK 及以上
- 支持设备：直板机、双折叠、平板、智能穿戴

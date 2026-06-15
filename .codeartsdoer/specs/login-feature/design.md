# 登录功能技术设计文档

## 文档信息
- **项目名称**: MusicHome - 多设备音乐界面应用
- **功能模块**: 用户登录功能
- **版本号**: v1.0
- **创建日期**: 2026-05-19
- **最后更新**: 2026-05-19
- **关联需求文档**: spec.md v1.0

## 1. 设计概述

### 1.1 设计目标
- 实现符合HarmonyOS设计规范的登录功能
- 遵循项目现有的三层架构模式（common、features、products）
- 确保登录功能可扩展、可维护、可测试
- 支持多设备适配（手机、平板、折叠屏）

### 1.2 设计原则
- **单一职责原则**: 每个模块和组件只负责一个功能
- **开闭原则**: 对扩展开放，对修改关闭
- **依赖倒置原则**: 依赖抽象而非具体实现
- **接口隔离原则**: 使用最小化的接口
- **模块化设计**: 功能模块独立，降低耦合度

### 1.3 技术选型
| 技术项 | 选型方案 | 选型理由 |
|-------|---------|---------|
| 开发语言 | ArkTS | HarmonyOS官方推荐语言，声明式UI范式 |
| 状态管理 | @State/@StorageLink | HarmonyOS原生状态管理机制 |
| 本地存储 | Preferences | 轻量级键值对存储，适合存储用户信息 |
| 网络请求 | @kit.NetworkKit | HarmonyOS原生网络库 |
| 加密算法 | AES | 对称加密，适合本地数据加密 |
| 路由管理 | Navigation + NavPathStack | 项目现有路由方案 |

## 2. 架构设计

### 2.1 整体架构
遵循项目现有的三层架构模式：

```
┌─────────────────────────────────────────────────────────┐
│                    products层（产品定制层）                │
│  ┌─────────────────────────────────────────────────┐   │
│  │  phone模块                                        │   │
│  │  - LoginPage.ets (登录页面)                       │   │
│  │  - Index.ets (主页，添加登录入口)                  │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                   features层（基础特性层）                 │
│  ┌─────────────────────────────────────────────────┐   │
│  │  login模块                                        │   │
│  │  - view/                                          │   │
│  │    - LoginPage.ets (登录页面组件)                  │   │
│  │    - LoginHeader.ets (登录页头部)                  │   │
│  │    - LoginForm.ets (登录表单组件)                  │   │
│  │  - viewmodel/                                     │   │
│  │    - LoginViewModel.ets (登录业务逻辑)             │   │
│  │    - LoginState.ets (登录状态管理)                 │   │
│  │  - constants/                                     │   │
│  │    - LoginConstants.ets (登录常量)                 │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────┐
│                    common层（公共能力层）                  │
│  ┌─────────────────────────────────────────────────┐   │
│  │  mediacommon模块                                  │   │
│  │  - utils/                                         │   │
│  │    - PreferencesUtil.ets (本地存储工具，扩展)      │   │
│  │    - HttpUtil.ets (网络请求工具，新增)             │   │
│  │    - CryptoUtil.ets (加密工具，新增)               │   │
│  │  - viewmodel/                                     │   │
│  │    - UserInfo.ets (用户信息模型，新增)             │   │
│  └─────────────────────────────────────────────────┘   │
│  ┌─────────────────────────────────────────────────┐   │
│  │  constantscommon模块                              │   │
│  │  - constants/                                     │   │
│  │    - RouterUrlConstants.ets (路由常量，扩展)       │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### 2.2 模块划分

#### 2.2.1 common层模块
| 模块名称 | 职责 | 新增/扩展 |
|---------|-----|----------|
| mediacommon | 公共工具和数据模型 | 扩展 |
| constantscommon | 公共常量定义 | 扩展 |

#### 2.2.2 features层模块
| 模块名称 | 职责 | 新增/扩展 |
|---------|-----|----------|
| login | 登录功能实现 | 新增 |

#### 2.2.3 products层模块
| 模块名称 | 职责 | 新增/扩展 |
|---------|-----|----------|
| phone | 手机端产品定制 | 扩展 |

### 2.3 依赖关系
```
phone (products层)
  ├── login (features层)
  │    ├── mediacommon (common层)
  │    └── constantscommon (common层)
  ├── mediacommon (common层)
  └── constantscommon (common层)
```

## 3. 组件设计

### 3.1 组件列表
| 组件名称 | 组件职责 | 所属模块 | 复用性 |
|---------|---------|---------|--------|
| LoginPage | 登录页面主组件 | login | 高 |
| LoginHeader | 登录页头部组件 | login | 中 |
| LoginForm | 登录表单组件 | login | 高 |
| LoginInputItem | 登录输入框组件 | login | 高 |
| LoginButton | 登录按钮组件 | login | 中 |
| UserAvatar | 用户头像组件 | login | 高 |

### 3.2 组件详细设计

#### 3.2.1 LoginPage（登录页面主组件）
- **功能描述**: 登录页面的主容器组件，负责组合各个子组件
- **输入属性**: 无
- **输出事件**: 无
- **内部状态**:
  - `username: string` - 用户名输入值
  - `password: string` - 密码输入值
  - `rememberPassword: boolean` - 是否记住密码
  - `isLoading: boolean` - 是否正在加载
- **依赖组件**: LoginHeader, LoginForm
- **代码结构**:
```typescript
@Component
export struct LoginPage {
  @State username: string = '';
  @State password: string = '';
  @State rememberPassword: boolean = false;
  @State isLoading: boolean = false;
  
  build() {
    Column() {
      LoginHeader()
      LoginForm({
        username: this.username,
        password: this.password,
        rememberPassword: this.rememberPassword,
        isLoading: this.isLoading,
        onUsernameChange: (value: string) => { this.username = value; },
        onPasswordChange: (value: string) => { this.password = value; },
        onRememberChange: (value: boolean) => { this.rememberPassword = value; },
        onLogin: () => { this.handleLogin(); }
      })
    }
  }
  
  private async handleLogin(): Promise<void> {
    // 登录处理逻辑
  }
}
```

#### 3.2.2 LoginForm（登录表单组件）
- **功能描述**: 包含用户名、密码输入框和登录按钮的表单组件
- **输入属性**:
  - `username: string` - 用户名
  - `password: string` - 密码
  - `rememberPassword: boolean` - 记住密码标志
  - `isLoading: boolean` - 加载状态
- **输出事件**:
  - `onUsernameChange: (value: string) => void` - 用户名变化
  - `onPasswordChange: (value: string) => void` - 密码变化
  - `onRememberChange: (value: boolean) => void` - 记住密码变化
  - `onLogin: () => void` - 登录点击
- **内部状态**: 无
- **依赖组件**: LoginInputItem, LoginButton

#### 3.2.3 LoginInputItem（登录输入框组件）
- **功能描述**: 可复用的输入框组件，支持密码密文显示
- **输入属性**:
  - `placeholder: string` - 占位文本
  - `value: string` - 输入值
  - `inputType: InputType` - 输入类型
  - `isPassword: boolean` - 是否为密码框
- **输出事件**:
  - `onChange: (value: string) => void` - 值变化事件
- **内部状态**:
  - `showPassword: boolean` - 是否显示密码明文

#### 3.2.4 UserAvatar（用户头像组件）
- **功能描述**: 显示用户头像或默认头像，支持点击事件
- **输入属性**:
  - `avatarUrl: string | undefined` - 头像URL
  - `userName: string` - 用户名
  - `isLoggedIn: boolean` - 是否已登录
- **输出事件**:
  - `onClick: () => void` - 点击事件
- **内部状态**: 无

## 4. 数据设计

### 4.1 数据模型

#### 4.1.1 UserInfo（用户信息模型）
```typescript
/**
 * 用户信息数据模型
 */
export interface UserInfo {
  /**
   * 用户唯一标识
   */
  userId: string;
  
  /**
   * 用户名
   */
  userName: string;
  
  /**
   * 用户头像URL
   */
  avatarUrl?: string;
  
  /**
   * 认证令牌
   */
  token: string;
  
  /**
   * 登录时间戳
   */
  loginTime: number;
}
```

#### 4.1.2 LoginRequest（登录请求模型）
```typescript
/**
 * 登录请求参数
 */
export interface LoginRequest {
  /**
   * 用户名
   */
  username: string;
  
  /**
   * 密码（已加密）
   */
  password: string;
}
```

#### 4.1.3 LoginResponse（登录响应模型）
```typescript
/**
 * 登录响应数据
 */
export interface LoginResponse {
  /**
   * 响应码
   */
  code: number;
  
  /**
   * 响应消息
   */
  message: string;
  
  /**
   * 响应数据
   */
  data?: {
    userId: string;
    userName: string;
    avatarUrl?: string;
    token: string;
  };
}
```

#### 4.1.4 LoginState（登录状态模型）
```typescript
/**
 * 登录状态
 */
export class LoginState {
  /**
   * 是否已登录
   */
  isLoggedIn: boolean = false;
  
  /**
   * 用户信息
   */
  userInfo?: UserInfo;
  
  /**
   * 登录失败次数
   */
  failedCount: number = 0;
  
  /**
   * 是否记住密码
   */
  rememberPassword: boolean = false;
  
  /**
   * 保存的用户名
   */
  savedUsername?: string;
  
  /**
   * 保存的密码（加密）
   */
  savedPassword?: string;
}
```

### 4.2 数据流转
```
用户输入 → LoginForm组件
    ↓
LoginViewModel验证
    ↓
HttpUtil发送请求 → 后端API
    ↓
LoginResponse响应
    ↓
LoginViewModel处理响应
    ↓
PreferencesUtil保存数据 → 本地存储
    ↓
AppStorage更新状态 → UI更新
```

### 4.3 数据存储

#### 4.3.1 Preferences存储键定义
```typescript
/**
 * 登录相关存储键
 */
export class LoginStorageKeys {
  static readonly USER_ID: string = 'login_user_id';
  static readonly USER_NAME: string = 'login_user_name';
  static readonly AVATAR_URL: string = 'login_avatar_url';
  static readonly TOKEN: string = 'login_token';
  static readonly LOGIN_TIME: string = 'login_time';
  static readonly REMEMBER_PASSWORD: string = 'remember_password';
  static readonly SAVED_USERNAME: string = 'saved_username';
  static readonly SAVED_PASSWORD: string = 'saved_password';
  static readonly FAILED_COUNT: string = 'login_failed_count';
}
```

#### 4.3.2 存储策略
| 数据项 | 存储方式 | 加密 | 过期策略 |
|-------|---------|-----|---------|
| userId | Preferences | 否 | 手动清除 |
| userName | Preferences | 否 | 手动清除 |
| token | Preferences | 是（AES） | 7天过期 |
| loginTime | Preferences | 否 | 无 |
| savedPassword | Preferences | 是（AES） | 手动清除 |

## 5. 接口设计

### 5.1 内部接口

#### 5.1.1 LoginViewModel接口
```typescript
/**
 * 登录业务逻辑接口
 */
export interface ILoginViewModel {
  /**
   * 执行登录
   */
  login(username: string, password: string): Promise<LoginResponse>;
  
  /**
   * 验证输入
   */
  validateInput(username: string, password: string): ValidationResult;
  
  /**
   * 保存登录信息
   */
  saveLoginInfo(userInfo: UserInfo): Promise<void>;
  
  /**
   * 清除登录信息
   */
  clearLoginInfo(): Promise<void>;
  
  /**
   * 检查登录状态
   */
  checkLoginStatus(): Promise<boolean>;
  
  /**
   * 获取保存的登录信息
   */
  getSavedLoginInfo(): Promise<SavedLoginInfo>;
}
```

#### 5.1.2 IStorageUtil接口（扩展PreferencesUtil）
```typescript
/**
 * 存储工具接口
 */
export interface IStorageUtil {
  /**
   * 保存数据
   */
  put<T>(key: string, value: T, encrypt?: boolean): Promise<void>;
  
  /**
   * 获取数据
   */
  get<T>(key: string, decrypt?: boolean): Promise<T | undefined>;
  
  /**
   * 删除数据
   */
  delete(key: string): Promise<void>;
  
  /**
   * 检查是否存在
   */
  has(key: string): Promise<boolean>;
  
  /**
   * 清除所有数据
   */
  clear(): Promise<void>;
}
```

### 5.2 外部接口

#### 5.2.1 登录接口
- **接口路径**: `/api/user/login`
- **请求方法**: POST
- **请求头**:
  - `Content-Type: application/json`
- **请求参数**:
```json
{
  "username": "string",
  "password": "string"
}
```
- **响应数据**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "userId": "string",
    "userName": "string",
    "avatarUrl": "string",
    "token": "string"
  }
}
```
- **错误码定义**:
  - `0`: 成功
  - `1001`: 用户不存在
  - `1002`: 密码错误
  - `1003`: 参数错误
  - `5000`: 服务器错误

#### 5.2.2 Token验证接口
- **接口路径**: `/api/user/verify`
- **请求方法**: GET
- **请求头**:
  - `Authorization: Bearer {token}`
- **响应数据**:
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "valid": true
  }
}
```

### 5.3 接口时序

#### 5.3.1 登录流程时序
```
用户          LoginPage      LoginViewModel      HttpUtil        后端API
 │               │                │                │              │
 │─输入信息────→│                │                │              │
 │               │─验证输入────→│                │              │
 │               │←─验证结果───│                │              │
 │               │─执行登录────→│                │              │
 │               │                │─发送请求────→│              │
 │               │                │                │─POST请求──→│
 │               │                │                │←─响应──────│
 │               │                │←─响应数据────│              │
 │               │                │─保存信息────→│              │
 │               │←─登录结果───│                │              │
 │←─显示结果────│                │                │              │
```

## 6. 状态管理

### 6.1 状态定义

#### 6.1.1 全局状态（AppStorage）
```typescript
/**
 * 登录相关全局状态
 */
// 用户信息
AppStorage.setOrCreate('userInfo', undefined as UserInfo | undefined);

// 登录状态
AppStorage.setOrCreate('isLoggedIn', false);

// 登录失败次数
AppStorage.setOrCreate('loginFailedCount', 0);
```

#### 6.1.2 组件状态（@State）
```typescript
// LoginPage组件状态
@State username: string = '';
@State password: string = '';
@State rememberPassword: boolean = false;
@State isLoading: boolean = false;
@State errorMessage: string = '';
```

### 6.2 状态流转

#### 6.2.1 登录状态流转图
```
┌─────────────┐
│  未登录状态  │
└──────┬──────┘
       │ 用户点击登录
       ↓
┌─────────────┐
│  输入中状态  │
└──────┬──────┘
       │ 点击登录按钮
       ↓
┌─────────────┐
│  验证中状态  │
└──────┬──────┘
       │ 验证通过
       ↓
┌─────────────┐
│  登录中状态  │
└──────┬──────┘
       │ 登录成功/失败
       ↓
┌─────────────┐    ┌─────────────┐
│  已登录状态  │    │  登录失败    │
└─────────────┘    └──────┬──────┘
                          │ 重试
                          ↓
                   ┌─────────────┐
                   │  输入中状态  │
                   └─────────────┘
```

### 6.3 状态持久化

#### 6.3.1 持久化策略
- **登录成功时**: 保存用户信息、Token、登录时间到Preferences
- **应用启动时**: 从Preferences读取用户信息，验证Token有效性
- **Token过期时**: 清除本地登录信息，重置登录状态
- **退出登录时**: 清除所有登录相关数据

#### 6.3.2 自动登录流程
```
应用启动
    ↓
读取Preferences中的Token
    ↓
Token存在？
    ├─ 是 → 调用验证接口
    │        ↓
    │      Token有效？
    │        ├─ 是 → 恢复登录状态
    │        └─ 否 → 清除本地数据
    └─ 否 → 显示未登录状态
```

## 7. 路由设计

### 7.1 页面路由

#### 7.1.1 路由常量扩展
```typescript
/**
 * 路由信息常量（扩展）
 */
export class RouterUrlConstants {
  static readonly LIVE: string = 'LivePage';
  static readonly MUSIC_LIST: string = 'MusicListPage';
  static readonly MUSIC_COMMENT: string = 'MusicCommentPage';
  static readonly LOGIN: string = 'LoginPage';  // 新增
}
```

#### 7.1.2 路由配置
在Index.ets的PagesMap中添加登录页面路由：
```typescript
@Builder
PagesMap(name: string, param?: object) {
  if (name === RouterUrlConstants.LIVE) {
    NavDestination() { LivePage() }
  } else if (name === RouterUrlConstants.MUSIC_LIST) {
    NavDestination() { MusicListPage() }
  } else if (name === RouterUrlConstants.MUSIC_COMMENT) {
    NavDestination() { MusicCommentPage() }
  } else if (name === RouterUrlConstants.LOGIN) {
    NavDestination() { LoginPage() }  // 新增
  }
}
```

### 7.2 路由参数
- **登录页面**: 无需参数
- **登录成功后**: 返回上一页或跳转至主页

## 8. 安全设计

### 8.1 数据安全

#### 8.1.1 密码加密存储
```typescript
/**
 * 加密工具类
 */
export class CryptoUtil {
  /**
   * 加密数据
   * @param data 原始数据
   * @param key 加密密钥
   * @returns 加密后的Base64字符串
   */
  static encrypt(data: string, key: string): string;
  
  /**
   * 解密数据
   * @param encryptedData 加密数据
   * @param key 解密密钥
   * @returns 原始数据
   */
  static decrypt(encryptedData: string, key: string): string;
}
```

#### 8.1.2 Token管理
- Token存储时使用AES加密
- Token设置7天过期时间
- 每次请求携带Token进行身份验证
- Token过期时自动清除并提示重新登录

### 8.2 通信安全

#### 8.2.1 HTTPS配置
- 所有API请求使用HTTPS协议
- 配置SSL证书验证
- 禁止明文传输敏感数据

#### 8.2.2 请求安全
```typescript
/**
 * HTTP请求配置
 */
const HttpConfig = {
  // 请求超时时间
  timeout: 30000,
  // 是否启用HTTPS
  useHttps: true,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};
```

### 8.3 存储安全

#### 8.3.1 敏感数据存储
| 数据项 | 存储方式 | 安全措施 |
|-------|---------|---------|
| 密码 | Preferences | AES加密存储 |
| Token | Preferences | AES加密存储 |
| 用户ID | Preferences | 明文存储 |
| 用户名 | Preferences | 明文存储 |

#### 8.3.2 防暴力破解
- 记录登录失败次数
- 连续失败5次后限制登录
- 限制时间为5分钟
- 限制期间显示倒计时

## 9. 性能设计

### 9.1 性能指标
| 指标项 | 目标值 | 说明 |
|-------|-------|-----|
| 登录页面加载时间 | < 1秒 | 从点击到页面完全渲染 |
| 登录请求响应时间 | < 3秒 | 从发送请求到收到响应 |
| 本地状态检查时间 | < 100ms | 读取Preferences数据 |
| 界面响应时间 | < 100ms | 用户操作到界面反馈 |

### 9.2 优化策略

#### 9.2.1 界面优化
- 使用LazyForEach懒加载列表项
- 避免不必要的组件重新渲染
- 使用@Prop替代@State减少状态监听范围
- 图片资源使用缩略图

#### 9.2.2 网络优化
- 请求超时设置（30秒）
- 请求失败重试机制（最多3次）
- 响应数据缓存
- 请求取消机制

#### 9.2.3 存储优化
- 异步读写Preferences
- 批量写入减少IO次数
- 数据压缩存储

## 10. 异常处理

### 10.1 异常分类

#### 10.1.1 输入验证异常
| 异常类型 | 错误码 | 处理方式 |
|---------|-------|---------|
| 用户名为空 | INPUT_001 | 提示"请输入用户名" |
| 密码为空 | INPUT_002 | 提示"请输入密码" |
| 用户名格式错误 | INPUT_003 | 提示"用户名格式不正确" |
| 密码长度不足 | INPUT_004 | 提示"密码长度不能少于6位" |

#### 10.1.2 网络异常
| 异常类型 | 错误码 | 处理方式 |
|---------|-------|---------|
| 网络不可用 | NET_001 | 提示"网络不可用，请检查网络连接" |
| 请求超时 | NET_002 | 提示"网络请求超时，请重试" |
| 服务器错误 | NET_003 | 提示"服务器异常，请稍后再试" |

#### 10.1.3 业务异常
| 异常类型 | 错误码 | 处理方式 |
|---------|-------|---------|
| 用户不存在 | BIZ_001 | 提示"用户不存在" |
| 密码错误 | BIZ_002 | 提示"密码错误" |
| 登录受限 | BIZ_003 | 提示"登录失败次数过多，请稍后再试" |
| Token过期 | BIZ_004 | 清除登录信息，跳转登录页 |

### 10.2 处理策略

#### 10.2.1 异常处理流程
```
异常发生
    ↓
捕获异常
    ↓
分类异常类型
    ↓
┌─────────────┬─────────────┬─────────────┐
│ 输入异常     │ 网络异常     │ 业务异常     │
└──────┬──────┴──────┬──────┴──────┬──────┘
       │             │             │
       ↓             ↓             ↓
   显示提示       显示提示      特殊处理
       │             │             │
       └─────────────┴─────────────┘
                     ↓
               记录日志
```

#### 10.2.2 错误提示组件
```typescript
/**
 * 错误提示配置
 */
interface ErrorTip {
  // 提示消息
  message: string;
  // 提示类型
  type: 'error' | 'warning' | 'info';
  // 显示时长（毫秒）
  duration: number;
  // 是否可关闭
  closable: boolean;
}
```

## 11. 测试设计

### 11.1 测试策略

#### 11.1.1 单元测试
- **测试范围**: LoginViewModel、CryptoUtil、HttpUtil
- **测试框架**: Jest
- **覆盖率要求**: > 80%

#### 11.1.2 集成测试
- **测试范围**: 登录流程、状态管理、数据存储
- **测试方式**: 模拟API响应

#### 11.1.3 UI测试
- **测试范围**: 登录页面交互、多设备适配
- **测试工具**: DevEco Studio UI测试工具

### 11.2 测试用例

#### 11.2.1 单元测试用例
| 用例编号 | 测试项 | 输入 | 预期输出 |
|---------|-------|-----|---------|
| UT-001 | 用户名验证-空 | '' | 验证失败 |
| UT-002 | 用户名验证-正常 | 'user123' | 验证通过 |
| UT-003 | 密码验证-长度不足 | '12345' | 验证失败 |
| UT-004 | 密码加密 | 'password' | 加密字符串 |
| UT-005 | 密码解密 | 加密字符串 | 'password' |

#### 11.2.2 集成测试用例
| 用例编号 | 测试项 | 操作流程 | 预期结果 |
|---------|-------|---------|---------|
| IT-001 | 正常登录 | 输入正确信息→点击登录 | 登录成功 |
| IT-002 | 登录失败 | 输入错误密码→点击登录 | 显示错误提示 |
| IT-003 | 自动登录 | 已登录→重启应用 | 自动恢复登录状态 |
| IT-004 | 退出登录 | 点击退出登录 | 清除登录信息 |

## 12. 部署设计

### 12.1 部署架构
- 登录功能作为应用内置模块，随应用一起打包部署
- 无需独立部署服务器
- 依赖后端API服务

### 12.2 配置管理

#### 12.2.1 环境配置
```typescript
/**
 * 环境配置
 */
interface EnvConfig {
  // API基础URL
  apiBaseUrl: string;
  // 是否启用HTTPS
  enableHttps: boolean;
  // Token过期时间（天）
  tokenExpireDays: number;
  // 登录失败限制次数
  maxFailedCount: number;
  // 限制时间（分钟）
  limitMinutes: number;
}

// 开发环境配置
const DevConfig: EnvConfig = {
  apiBaseUrl: 'http://dev.api.musichome.com',
  enableHttps: false,
  tokenExpireDays: 7,
  maxFailedCount: 5,
  limitMinutes: 5
};

// 生产环境配置
const ProdConfig: EnvConfig = {
  apiBaseUrl: 'https://api.musichome.com',
  enableHttps: true,
  tokenExpireDays: 7,
  maxFailedCount: 5,
  limitMinutes: 5
};
```

## 附录

### A. 架构图

#### A.1 整体架构图
```
┌────────────────────────────────────────────────────────────────┐
│                         应用层                                  │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                    Index.ets (主页)                       │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │ │
│  │  │  音乐列表    │  │   直播页     │  │  登录入口    │      │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │ │
│  └──────────────────────────────────────────────────────────┘ │
│                           ↓                                    │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                  LoginPage.ets (登录页)                   │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐      │ │
│  │  │ LoginHeader │  │  LoginForm  │  │ LoginButton │      │ │
│  │  └─────────────┘  └─────────────┘  └─────────────┘      │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│                        业务逻辑层                               │
│  ┌──────────────────────────────────────────────────────────┐ │
│  │                 LoginViewModel.ets                        │ │
│  │  - 输入验证                                                │ │
│  │  - 登录处理                                                │ │
│  │  - 状态管理                                                │ │
│  └──────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────┘
                           ↓
┌────────────────────────────────────────────────────────────────┐
│                         数据层                                  │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐  │
│  │  HttpUtil.ets  │  │ PreferencesUtil│  │  CryptoUtil    │  │
│  │  (网络请求)     │  │  (本地存储)     │  │  (加密工具)     │  │
│  └────────────────┘  └────────────────┘  └────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

### B. 流程图

#### B.1 登录流程图
```
开始
  │
  ↓
用户输入用户名和密码
  │
  ↓
点击登录按钮
  │
  ↓
验证输入格式 ──否──→ 显示错误提示
  │是
  ↓
检查登录失败次数 ──超过限制──→ 显示限制提示
  │未超过
  ↓
显示加载状态
  │
  ↓
发送登录请求
  │
  ↓
请求成功？ ──否──→ 网络错误处理
  │是
  ↓
登录成功？ ──否──→ 业务错误处理
  │是
  ↓
保存用户信息
  │
  ↓
更新登录状态
  │
  ↓
跳转页面
  │
  ↓
结束
```

### C. 时序图

#### C.1 登录成功时序图
```
用户          LoginPage      LoginForm      LoginViewModel      HttpUtil        后端API      PreferencesUtil
 │               │              │                │                 │              │              │
 │─输入信息────→│              │                │                 │              │              │
 │               │─渲染表单───→│                │                 │              │              │
 │               │              │─用户输入────→│                 │              │              │
 │               │              │                │─验证输入─────→│              │              │
 │               │              │                │←─验证通过────│              │              │
 │               │              │                │─发送请求────→│              │              │
 │               │              │                │                 │─POST请求──→│              │
 │               │              │                │                 │              │─处理请求───│
 │               │              │                │                 │              │←─返回数据──│
 │               │              │                │                 │←─响应数据──│              │
 │               │              │                │←─登录成功────│              │              │
 │               │              │                │─保存信息──────────────────────────────────→│
 │               │              │                │                 │              │              │─写入数据
 │               │              │                │                 │              │              │←─完成
 │               │              │                │←─保存完成─────────────────────────────────│
 │               │              │←─更新状态───│                 │              │              │
 │               │←─显示成功──│              │                 │              │              │
 │←─跳转页面────│              │                │                 │              │              │
```

### D. 类图

#### D.1 核心类关系图
```
┌─────────────────────┐
│    LoginPage        │
│  ─────────────────  │
│  - username: string │
│  - password: string │
│  - isLoading: bool  │
│  ─────────────────  │
│  + handleLogin()    │
└──────────┬──────────┘
           │ uses
           ↓
┌─────────────────────┐         ┌─────────────────────┐
│   LoginViewModel    │────────→│      HttpUtil       │
│  ─────────────────  │  uses   │  ─────────────────  │
│  - loginState       │         │  + post()           │
│  ─────────────────  │         │  + get()            │
│  + login()          │         └─────────────────────┘
│  + validateInput()  │
│  + saveLoginInfo()  │         ┌─────────────────────┐
│  + clearLoginInfo() │────────→│   PreferencesUtil   │
└──────────┬──────────┘  uses   │  ─────────────────  │
           │                    │  + put()            │
           │                    │  + get()            │
           │                    │  + delete()         │
           │                    └─────────────────────┘
           │
           │ uses
           ↓
┌─────────────────────┐
│     CryptoUtil      │
│  ─────────────────  │
│  + encrypt()        │
│  + decrypt()        │
└─────────────────────┘
```

### E. 状态图

#### E.1 登录状态图
```
┌─────────────┐
│  未登录      │
└──────┬──────┘
       │ 点击登录入口
       ↓
┌─────────────┐
│  输入中      │←─────────────┐
└──────┬──────┘              │
       │ 点击登录             │ 输入错误
       ↓                     │
┌─────────────┐              │
│  验证中      │──验证失败──→┘
└──────┬──────┘
       │ 验证通过
       ↓
┌─────────────┐
│  登录中      │
└──────┬──────┘
       │
       ├─登录成功─→┌─────────────┐
       │           │  已登录      │
       │           └──────┬──────┘
       │                  │ 退出登录
       │                  ↓
       │           ┌─────────────┐
       │           │  未登录      │
       │           └─────────────┘
       │
       └─登录失败─→┌─────────────┐
                   │  登录失败    │
                   └──────┬──────┘
                          │ 重试
                          ↓
                   ┌─────────────┐
                   │  输入中      │
                   └─────────────┘
```

# 技术设计文档

## 文档信息
- **项目名称**: MusicHome音乐应用
- **功能模块**: 用户注册功能
- **版本号**: v1.0
- **创建日期**: 2026-05-19
- **最后更新**: 2026-05-19
- **关联需求文档**: spec.md v1.0

## 1. 设计概述

### 1.1 设计目标
为MusicHome HarmonyOS音乐应用实现用户注册功能，复用现有登录功能的架构模式和工具类，确保注册功能与登录功能风格一致、体验流畅，实现注册成功后自动登录并返回上一页的完整流程。

### 1.2 设计原则
- **架构一致性**: 遵循现有登录功能的分层架构（View-ViewModel-Model）
- **代码复用**: 复用HttpUtil、LoginStorageUtil、CryptoUtil等工具类
- **组件复用**: 复用LoginInputItem、LoginHeader等UI组件
- **类型安全**: 使用ArkTS强类型定义，避免any类型
- **单一职责**: 每个组件和类职责清晰，易于维护和测试
- **声明式UI**: 使用ArkTS声明式UI范式开发

### 1.3 技术选型
| 技术项 | 选择方案 | 选择理由 |
|-------|---------|---------|
| 开发语言 | ArkTS | HarmonyOS官方推荐，基于TypeScript扩展，类型安全 |
| UI框架 | ArkUI声明式 | 声明式UI范式，代码简洁，性能优秀 |
| 状态管理 | @State/@Link/@Prop | ArkTS内置状态管理，响应式更新 |
| 网络请求 | HttpUtil | 复用现有工具类，统一请求处理 |
| 本地存储 | Preferences + LoginStorageUtil | 复用现有存储工具，支持加密存储 |
| 数据加密 | CryptoUtil | 复用现有加密工具，保障Token安全 |
| 路由导航 | NavPathStack | HarmonyOS标准导航方案 |

## 2. 架构设计

### 2.1 整体架构
采用三层架构设计，与登录功能保持一致：

```
┌─────────────────────────────────────────┐
│           表现层 (View Layer)            │
│  RegisterPage, RegisterForm, LoginHeader │
│  LoginInputItem (复用)                   │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│       业务逻辑层 (ViewModel Layer)       │
│         RegisterViewModel               │
└─────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────┐
│          数据层 (Data Layer)             │
│  HttpUtil, LoginStorageUtil, CryptoUtil │
│  RegisterModels (数据模型定义)           │
└─────────────────────────────────────────┘
```

### 2.2 模块划分
| 模块名称 | 职责说明 | 文件路径 |
|---------|---------|---------|
| RegisterPage | 注册页面主组件，协调各子组件 | features/register/src/main/ets/view/RegisterPage.ets |
| RegisterForm | 注册表单组件，处理表单展示和交互 | features/register/src/main/ets/view/RegisterForm.ets |
| RegisterViewModel | 注册业务逻辑，处理验证和请求 | features/register/src/main/ets/viewmodel/RegisterViewModel.ets |
| RegisterModels | 注册相关数据模型定义 | features/register/src/main/ets/viewmodel/RegisterModels.ets |
| RegisterConstants | 注册常量定义（验证规则、错误消息等） | features/register/src/main/ets/constants/RegisterConstants.ets |

### 2.3 依赖关系
```
RegisterPage
    ├── RegisterForm
    │   └── LoginInputItem (复用)
    ├── LoginHeader (复用)
    └── RegisterViewModel
        ├── RegisterModels
        ├── RegisterConstants
        ├── HttpUtil (复用)
        └── LoginStorageUtil (复用)
```

## 3. 组件设计

### 3.1 组件列表
| 组件名称 | 组件职责 | 所属模块 | 复用性 |
|---------|---------|---------|--------|
| RegisterPage | 注册页面主组件，管理页面状态和业务流程 | 表现层 | 低 |
| RegisterForm | 注册表单组件，处理表单展示和用户交互 | 表现层 | 中 |
| LoginInputItem | 输框组件（从登录模块复用） | 表现层 | 高 |
| LoginHeader | 页面头部组件（从登录模块复用） | 表现层 | 高 |

### 3.2 组件详细设计

#### RegisterPage
- **功能描述**: 注册页面主组件，负责页面整体布局、状态管理、业务流程协调
- **输入属性**: 无（使用@State管理内部状态）
- **输出事件**: 无
- **内部状态**:
  - `username: string` - 用户名输入值
  - `password: string` - 密码输入值
  - `confirmPassword: string` - 确认密码输入值
  - `isLoading: boolean` - 加载状态
  - `errorMessage: string` - 错误消息
  - `pageIndexInfos: NavPathStack` - 导航栈（@StorageLink）
  - `userInfo: UserInfo | undefined` - 用户信息（@StorageLink）
  - `isLoggedIn: boolean` - 登录状态（@StorageLink）
- **依赖组件**: RegisterForm, LoginHeader
- **生命周期**:
  - `aboutToAppear()`: 初始化LoginStorageUtil

#### RegisterForm
- **功能描述**: 注册表单组件，展示输入框、错误提示、注册按钮
- **输入属性**:
  - `@Link username: string` - 用户名（双向绑定）
  - `@Link password: string` - 密码（双向绑定）
  - `@Link confirmPassword: string` - 确认密码（双向绑定）
  - `@Prop isLoading: boolean` - 加载状态
  - `@Prop errorMessage: string` - 错误消息
- **输出事件**:
  - `onRegister?: () => void` - 注册回调
  - `onGoToLogin?: () => void` - 跳转登录页回调
- **内部状态**: 无
- **依赖组件**: LoginInputItem

#### LoginInputItem（复用）
- **功能描述**: 通用输入框组件，支持文本和密码输入
- **输入属性**:
  - `@Prop placeholder: string` - 占位文本
  - `@Link value: string` - 输入值（双向绑定）
  - `@Prop isPassword: boolean` - 是否为密码框
  - `@Prop errorMessage: string` - 错误消息
- **输出事件**:
  - `onValueChange?: (value: string) => void` - 值变化回调
- **内部状态**:
  - `showPassword: boolean` - 密码显示状态

## 4. 数据设计

### 4.1 数据模型

```typescript
/**
 * 注册请求参数
 */
export interface RegisterRequest {
  /**
   * 用户名（3-20位字母数字下划线）
   */
  username: string;

  /**
   * 密码（6-20位字符）
   */
  password: string;
}

/**
 * 注册响应数据内容
 */
export interface RegisterResponseData {
  /**
   * 用户唯一标识
   */
  userId: string;

  /**
   * 用户名
   */
  userName: string;

  /**
   * 用户头像URL（可选）
   */
  avatarUrl?: string;

  /**
   * 认证Token
   */
  token: string;
}

/**
 * 注册响应数据
 */
export interface RegisterResponse {
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
  data?: RegisterResponseData;
}

/**
 * 验证结果
 */
export interface ValidationResult {
  /**
   * 是否验证通过
   */
  isValid: boolean;

  /**
   * 错误消息
   */
  errorMessage?: string;
}

/**
 * 表单验证结果（包含多个字段）
 */
export interface FormValidationResult {
  /**
   * 是否全部验证通过
   */
  isValid: boolean;

  /**
   * 用户名错误消息
   */
  usernameError?: string;

  /**
   * 密码错误消息
   */
  passwordError?: string;

  /**
   * 确认密码错误消息
   */
  confirmPasswordError?: string;
}
```

### 4.2 数据流转
```
用户输入
    ↓
RegisterForm (表单组件)
    ↓ @Link双向绑定
RegisterPage (页面状态)
    ↓ 调用验证
RegisterViewModel.validateForm()
    ↓ 验证通过
RegisterViewModel.register()
    ↓ HTTP请求
HttpUtil.post('/api/user/register')
    ↓ 响应处理
RegisterViewModel处理响应
    ↓ 成功时保存
LoginStorageUtil.saveUserInfo()
    ↓ 更新全局状态
AppStorage (userInfo, isLoggedIn)
```

### 4.3 数据存储
注册成功后的数据存储策略：

| 数据项 | 存储位置 | 存储方式 | 说明 |
|-------|---------|---------|-----|
| userId | Preferences | 明文存储 | 用户唯一标识 |
| userName | Preferences | 明文存储 | 用户名 |
| avatarUrl | Preferences | 明文存储 | 用户头像URL（可选） |
| token | Preferences | 加密存储 | 使用CryptoUtil加密后存储 |
| loginTime | Preferences | 明文存储 | 登录时间戳 |

**存储工具**: 复用`LoginStorageUtil.getInstance().saveUserInfo(userInfo)`

## 5. 接口设计

### 5.1 内部接口

#### RegisterViewModel类接口
```typescript
class RegisterViewModel {
  /**
   * 验证表单输入
   * @param username 用户名
   * @param password 密码
   * @param confirmPassword 确认密码
   * @returns 表单验证结果
   */
  validateForm(
    username: string,
    password: string,
    confirmPassword: string
  ): FormValidationResult;

  /**
   * 验证用户名
   * @param username 用户名
   * @returns 验证结果
   */
  validateUsername(username: string): ValidationResult;

  /**
   * 验证密码
   * @param password 密码
   * @returns 验证结果
   */
  validatePassword(password: string): ValidationResult;

  /**
   * 验证确认密码
   * @param password 密码
   * @param confirmPassword 确认密码
   * @returns 验证结果
   */
  validateConfirmPassword(
    password: string,
    confirmPassword: string
  ): ValidationResult;

  /**
   * 执行注册
   * @param username 用户名
   * @param password 密码
   * @returns 注册响应
   */
  async register(
    username: string,
    password: string
  ): Promise<RegisterResponse>;

  /**
   * 保存用户信息
   * @param userInfo 用户信息
   */
  async saveUserInfo(userInfo: UserInfo): Promise<void>;
}
```

### 5.2 外部接口

#### 注册API接口
- **接口路径**: `/api/user/register`
- **请求方法**: POST
- **请求头**:
  - Content-Type: application/json
  - Accept: application/json
- **请求参数**:
  ```json
  {
    "username": "string (3-20位字母数字下划线)",
    "password": "string (6-20位字符)"
  }
  ```
- **成功响应** (code: 0):
  ```json
  {
    "code": 0,
    "message": "注册成功",
    "data": {
      "userId": "string",
      "userName": "string",
      "avatarUrl": "string (可选)",
      "token": "string"
    }
  }
  ```
- **失败响应**:
  - 用户名已存在 (code: 1004):
    ```json
    {
      "code": 1004,
      "message": "用户名已被注册"
    }
    ```
  - 参数错误 (code: 1003):
    ```json
    {
      "code": 1003,
      "message": "参数错误"
    }
    ```
  - 服务器错误 (code: 5000):
    ```json
    {
      "code": 5000,
      "message": "服务器内部错误"
    }
    ```

### 5.3 接口时序

```
用户                RegisterPage         RegisterViewModel        HttpUtil           服务器
 │                      │                      │                    │                  │
 │─输入表单数据────────→│                      │                    │                  │
 │                      │                      │                    │                  │
 │─点击注册按钮────────→│                      │                    │                  │
 │                      │─validateForm()────→│                    │                  │
 │                      │                      │─验证规则─────────→│                  │
 │                      │←─验证结果──────────│                    │                  │
 │                      │                      │                    │                  │
 │                      │─register()────────→│                    │                  │
 │                      │                      │─post()──────────→│                  │
 │                      │                      │                    │─HTTP POST─────→│
 │                      │                      │                    │                  │
 │                      │                      │                    │←─响应──────────│
 │                      │                      │←─RegisterResponse─│                  │
 │                      │←─RegisterResponse──│                    │                  │
 │                      │                      │                    │                  │
 │                      │─saveUserInfo()────→│                    │                  │
 │                      │                      │─saveUserInfo()──→│                  │
 │                      │←─保存完成──────────│                    │                  │
 │                      │                      │                    │                  │
 │←─显示成功提示────────│                      │                    │                  │
 │←─自动返回上一页──────│                      │                    │                  │
```

## 6. 状态管理

### 6.1 状态定义

#### 页面级状态（RegisterPage）
| 状态名称 | 类型 | 初始值 | 说明 |
|---------|------|--------|-----|
| username | string | '' | 用户名输入值 |
| password | string | '' | 密码输入值 |
| confirmPassword | string | '' | 确认密码输入值 |
| isLoading | boolean | false | 是否正在加载 |
| errorMessage | string | '' | 错误提示消息 |

#### 全局状态（AppStorage）
| 状态名称 | 类型 | 说明 |
|---------|------|-----|
| userInfo | UserInfo \| undefined | 用户信息 |
| isLoggedIn | boolean | 是否已登录 |
| pageIndexInfos | NavPathStack | 导航栈 |

### 6.2 状态流转

```
初始状态
    ↓
[用户输入] → 更新username/password/confirmPassword
    ↓
[点击注册] → isLoading = true
    ↓
[验证失败] → isLoading = false, 显示errorMessage
    ↓
[验证成功] → 发送注册请求
    ↓
[注册成功] → 更新userInfo, isLoggedIn = true, isLoading = false
    ↓
[显示成功提示] → 延迟1秒
    ↓
[返回上一页] → 调用pageIndexInfos.pop()
```

### 6.3 状态持久化
注册成功后需要持久化的状态：
- **用户信息**: 通过`LoginStorageUtil.saveUserInfo()`保存到Preferences
- **Token**: 加密后存储到Preferences
- **登录状态**: 通过AppStorage的`@StorageLink`全局共享

## 7. 路由设计

### 7.1 页面路由

#### 路由配置
在`RouterUrlConstants`中添加注册页面路由常量：
```typescript
export class RouterUrlConstants {
  // ... 现有路由常量
  
  /**
   * 注册页面
   */
  static readonly REGISTER: string = 'RegisterPage';
}
```

#### 路由注册
在应用路由配置中注册RegisterPage：
```typescript
// 在路由配置文件中添加
RegisterPage: () => new RegisterPage()
```

### 7.2 路由参数
注册页面不需要路由参数，所有数据通过内部状态管理。

#### 页面跳转
- **登录页 → 注册页**: 在LoginForm中添加"注册账号"链接
- **注册页 → 登录页**: 
  - 点击"已有账号？去登录"链接
  - 点击页面返回按钮
  - 注册成功后自动返回

## 8. 安全设计

### 8.1 数据安全

#### 密码安全
- **传输安全**: 密码在传输前不进行前端加密，依赖HTTPS加密传输
- **存储安全**: 注册成功后Token使用CryptoUtil加密存储
- **显示安全**: 密码输入框默认显示为密文，支持切换显示状态

#### Token安全
- **存储加密**: 使用CryptoUtil.encrypt()加密后存储到Preferences
- **读取解密**: 使用CryptoUtil.decrypt()解密后使用
- **有效期管理**: 通过loginTime字段管理Token有效期

### 8.2 通信安全
- **HTTPS**: 所有API请求使用HTTPS协议
- **请求头**: 设置Content-Type和Accept为application/json
- **超时设置**: 请求超时时间设置为10秒（符合需求规格）

### 8.3 存储安全
- **敏感数据加密**: Token使用CryptoUtil加密存储
- **存储隔离**: 使用独立的Preferences实例（loginStore）
- **数据清理**: 退出登录时清除所有敏感数据

## 9. 性能设计

### 9.1 性能指标
| 性能项 | 目标值 | 实现方案 |
|-------|--------|---------|
| 页面加载时间 | < 1秒 | 组件懒加载，避免复杂初始化 |
| 输入验证响应 | < 100毫秒 | 同步验证，无网络请求 |
| 注册请求超时 | 10秒 | HttpUtil配置超时时间 |
| 页面返回延迟 | 1秒 | 注册成功后延迟返回，展示成功提示 |

### 9.2 优化策略

#### UI优化
- **组件复用**: 复用LoginInputItem、LoginHeader组件，减少代码体积
- **状态优化**: 使用@Link双向绑定，减少不必要的状态传递
- **条件渲染**: 错误提示使用条件渲染，无错误时不渲染

#### 网络优化
- **请求复用**: 复用HttpUtil，统一管理HTTP连接
- **错误处理**: 统一错误处理机制，避免重复代码
- **加载状态**: 请求期间禁用按钮，防止重复提交

#### 内存优化
- **及时清理**: 页面销毁时清理状态
- **避免泄漏**: 使用ArkTS生命周期管理资源

## 10. 异常处理

### 10.1 异常分类

| 异常类型 | 异常场景 | 错误码 | 处理方式 |
|---------|---------|--------|---------|
| 输入验证异常 | 用户名为空 | - | 显示"请输入用户名" |
| 输入验证异常 | 用户名格式错误 | - | 显示格式错误提示 |
| 输入验证异常 | 密码为空 | - | 显示"请输入密码" |
| 输入验证异常 | 密码长度不足 | - | 显示"密码长度不能少于6位" |
| 输入验证异常 | 确认密码不一致 | - | 显示"两次输入的密码不一致" |
| 业务异常 | 用户名已存在 | 1004 | 显示"用户名已被注册" |
| 业务异常 | 参数错误 | 1003 | 显示"注册信息有误，请检查" |
| 网络异常 | 网络不可用 | - | 显示"网络不可用，请检查网络连接" |
| 网络异常 | 请求超时 | - | 显示"网络请求超时，请重试" |
| 服务器异常 | 服务器错误 | 5000 | 显示"服务器异常，请稍后再试" |

### 10.2 处理策略

#### 输入验证异常
```typescript
// 在RegisterViewModel中实现
validateForm(username, password, confirmPassword): FormValidationResult {
  const result: FormValidationResult = { isValid: true };
  
  // 验证用户名
  const usernameResult = this.validateUsername(username);
  if (!usernameResult.isValid) {
    result.isValid = false;
    result.usernameError = usernameResult.errorMessage;
  }
  
  // 验证密码
  const passwordResult = this.validatePassword(password);
  if (!passwordResult.isValid) {
    result.isValid = false;
    result.passwordError = passwordResult.errorMessage;
  }
  
  // 验证确认密码
  const confirmResult = this.validateConfirmPassword(password, confirmPassword);
  if (!confirmResult.isValid) {
    result.isValid = false;
    result.confirmPasswordError = confirmResult.errorMessage;
  }
  
  return result;
}
```

#### 网络异常
```typescript
// 在register方法中捕获异常
async register(username, password): Promise<RegisterResponse> {
  try {
    const response = await HttpUtil.post<RegisterResponse>(
      RegisterConstants.API_REGISTER_PATH,
      { username, password }
    );
    return response.data;
  } catch (error) {
    Logger.error(TAG, `Register failed: ${JSON.stringify(error)}`);
    return {
      code: RegisterResponseCode.SERVER_ERROR,
      message: RegisterErrorMessages.NETWORK_UNAVAILABLE
    };
  }
}
```

#### 业务异常
```typescript
// 在RegisterPage中处理响应
if (response.code === RegisterResponseCode.SUCCESS && response.data) {
  // 注册成功处理
} else if (response.code === RegisterResponseCode.USERNAME_EXIST) {
  this.errorMessage = RegisterErrorMessages.USERNAME_EXIST;
} else if (response.code === RegisterResponseCode.PARAM_ERROR) {
  this.errorMessage = RegisterErrorMessages.PARAM_ERROR;
} else {
  this.errorMessage = response.message || RegisterErrorMessages.SERVER_ERROR;
}
```

## 11. 测试设计

### 11.1 测试策略
- **单元测试**: 测试RegisterViewModel的验证逻辑和业务逻辑
- **集成测试**: 测试注册流程的完整链路
- **UI测试**: 测试用户交互和界面展示

### 11.2 测试用例

#### 单元测试用例
| 测试项 | 输入 | 预期输出 |
|-------|------|---------|
| validateUsername - 正常 | "testuser" | { isValid: true } |
| validateUsername - 空值 | "" | { isValid: false, errorMessage: "请输入用户名" } |
| validateUsername - 过短 | "ab" | { isValid: false, errorMessage: "用户名长度不能少于3位" } |
| validateUsername - 过长 | "a...a"(21位) | { isValid: false, errorMessage: "用户名长度不能超过20位" } |
| validateUsername - 非法字符 | "test@user" | { isValid: false, errorMessage: "用户名只能包含字母、数字和下划线" } |
| validatePassword - 正常 | "123456" | { isValid: true } |
| validatePassword - 空值 | "" | { isValid: false, errorMessage: "请输入密码" } |
| validatePassword - 过短 | "12345" | { isValid: false, errorMessage: "密码长度不能少于6位" } |
| validateConfirmPassword - 一致 | "123456", "123456" | { isValid: true } |
| validateConfirmPassword - 不一致 | "123456", "654321" | { isValid: false, errorMessage: "两次输入的密码不一致" } |

#### 集成测试用例
| 测试场景 | 操作步骤 | 预期结果 |
|---------|---------|---------|
| 成功注册 | 输入有效信息 → 点击注册 | 显示成功提示 → 自动登录 → 返回上一页 |
| 用户名已存在 | 输入已注册用户名 → 点击注册 | 显示"用户名已被注册" |
| 网络异常 | 断开网络 → 点击注册 | 显示"网络不可用，请检查网络连接" |
| 重复提交防护 | 快速多次点击注册按钮 | 只发送一次请求 |

#### UI测试用例
| 测试场景 | 操作步骤 | 预期结果 |
|---------|---------|---------|
| 页面展示 | 打开注册页面 | 显示完整的注册表单 |
| 密码显示切换 | 点击密码显示图标 | 切换密码明文/密文显示 |
| 返回登录页 | 点击"已有账号？去登录" | 返回登录页面 |
| 加载状态 | 点击注册按钮 | 按钮显示加载动画并禁用 |

## 12. 部署设计

### 12.1 部署架构
注册功能作为独立模块部署在features/register目录下，通过HAR包形式集成到主应用。

```
products/phone (主应用)
    └── features/register (注册模块HAR)
        ├── src/main/ets
        │   ├── constants (常量)
        │   ├── view (UI组件)
        │   └── viewmodel (业务逻辑)
        └── Index.ets (模块导出)
```

### 12.2 配置管理

#### 模块配置
在`features/register`目录下的`oh-package.json5`中配置：
```json
{
  "name": "register",
  "version": "1.0.0",
  "description": "用户注册功能模块",
  "main": "Index.ets",
  "author": "",
  "license": "Apache-2.0",
  "dependencies": {
    "mediacommon": "file:../../common/mediacommon",
    "constantscommon": "file:../../common/constantscommon"
  }
}
```

#### 主应用集成
在`products/phone`目录下的`oh-package.json5`中添加依赖：
```json
{
  "dependencies": {
    "register": "file:../../features/register"
  }
}
```

## 附录

### A. 架构图

```
┌──────────────────────────────────────────────────────────────┐
│                        MusicHome App                          │
├──────────────────────────────────────────────────────────────┤
│  products/phone (主应用)                                      │
│      ├── features/login (登录模块)                            │
│      ├── features/register (注册模块) ← 新增                  │
│      ├── features/musiclist (音乐列表模块)                    │
│      └── features/musiccomment (音乐评论模块)                 │
├──────────────────────────────────────────────────────────────┤
│  common (公共模块)                                            │
│      ├── mediacommon (媒体公共模块)                           │
│      │   ├── HttpUtil (网络请求)                              │
│      │   ├── LoginStorageUtil (存储工具)                      │
│      │   ├── CryptoUtil (加密工具)                            │
│      │   └── Logger (日志工具)                                │
│      └── constantscommon (常量公共模块)                       │
│          └── RouterUrlConstants (路由常量)                    │
└──────────────────────────────────────────────────────────────┘
```

### B. 流程图

#### 注册流程
```
开始
  │
  ├─ 用户打开注册页面
  │
  ├─ 输入用户名、密码、确认密码
  │
  ├─ 点击注册按钮
  │
  ├─ 验证输入格式
  │   ├─ 失败 → 显示错误提示 → 返回输入步骤
  │   └─ 成功 → 继续
  │
  ├─ 发送注册请求
  │
  ├─ 等待服务器响应
  │   ├─ 网络异常 → 显示网络错误 → 返回输入步骤
  │   ├─ 用户名已存在 → 显示错误提示 → 返回输入步骤
  │   ├─ 服务器错误 → 显示错误提示 → 返回输入步骤
  │   └─ 注册成功 → 继续
  │
  ├─ 保存用户信息和Token
  │
  ├─ 更新全局登录状态
  │
  ├─ 显示成功提示
  │
  ├─ 延迟1秒
  │
  ├─ 返回上一页
  │
结束
```

### C. 时序图

```
┌────────┐  ┌─────────────┐  ┌──────────────────┐  ┌─────────┐  ┌────────┐
│  User  │  │RegisterPage │  │RegisterViewModel │  │HttpUtil │  │ Server │
└────────┘  └─────────────┘  └──────────────────┘  └─────────┘  └────────┘
    │              │                    │                 │            │
    │─输入表单────→│                    │                 │            │
    │              │                    │                 │            │
    │─点击注册────→│                    │                 │            │
    │              │─validateForm()────→│                 │            │
    │              │                    │─验证规则──────→│            │
    │              │←─验证结果─────────│                 │            │
    │              │                    │                 │            │
    │              │─register()────────→│                 │            │
    │              │                    │─post()────────→│            │
    │              │                    │                 │─HTTP────→│
    │              │                    │                 │           │
    │              │                    │                 │←─响应────│
    │              │                    │←─response───────│            │
    │              │←─response─────────│                 │            │
    │              │                    │                 │            │
    │              │─saveUserInfo()────→│                 │            │
    │              │                    │─save()────────→│            │
    │              │←─保存完成─────────│                 │            │
    │              │                    │                 │            │
    │←─成功提示────│                    │                 │            │
    │              │                    │                 │            │
    │←─返回上一页──│                    │                 │            │
    │              │                    │                 │            │
```

### D. 类图

```
┌─────────────────────────────────────────────────────────────┐
│                      RegisterPage                            │
├─────────────────────────────────────────────────────────────┤
│ - username: string                                           │
│ - password: string                                           │
│ - confirmPassword: string                                    │
│ - isLoading: boolean                                         │
│ - errorMessage: string                                       │
│ - pageIndexInfos: NavPathStack                               │
│ - userInfo: UserInfo | undefined                             │
│ - isLoggedIn: boolean                                        │
├─────────────────────────────────────────────────────────────┤
│ + aboutToAppear(): void                                      │
│ + handleRegister(): Promise<void>                            │
│ + handleBack(): void                                         │
│ + showToast(message: string): void                           │
│ + build(): void                                              │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 使用
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                   RegisterViewModel                          │
├─────────────────────────────────────────────────────────────┤
├─────────────────────────────────────────────────────────────┤
│ + validateForm(...): FormValidationResult                    │
│ + validateUsername(username): ValidationResult               │
│ + validatePassword(password): ValidationResult               │
│ + validateConfirmPassword(...): ValidationResult             │
│ + register(username, password): Promise<RegisterResponse>    │
│ + saveUserInfo(userInfo): Promise<void>                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ 使用
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      RegisterConstants                        │
├─────────────────────────────────────────────────────────────┤
│ + USERNAME_MIN_LENGTH: number = 3                            │
│ + USERNAME_MAX_LENGTH: number = 20                           │
│ + PASSWORD_MIN_LENGTH: number = 6                            │
│ + PASSWORD_MAX_LENGTH: number = 20                           │
│ + API_REGISTER_PATH: string = '/api/user/register'           │
├─────────────────────────────────────────────────────────────┤
│ RegisterErrorMessages (错误消息常量)                          │
│ RegisterResponseCode (响应码常量)                             │
└─────────────────────────────────────────────────────────────┘
```

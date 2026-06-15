# 编码任务清单

## 文档信息
- **功能名称**: 底部UI优化 (bottom-ui-optimization)
- **创建日期**: 2026-05-26
- **版本**: v1.0
- **关联文档**: spec.md v1.0, design.md v1.0

## 任务概览

| 任务ID | 任务名称 | 优先级 | 预估工时 | 依赖 |
|--------|---------|--------|---------|------|
| 1 | 扩展HomeConstants常量定义 | 高 | 10分钟 | 无 |
| 2 | 修复底部栏图标显示问题 | 高 | 20分钟 | 任务1 |
| 3 | 优化卡片交互方式 | 高 | 15分钟 | 无 |
| 4 | 测试验证与调试 | 高 | 15分钟 | 任务2, 任务3 |

**总计**: 4个主任务，预估总工时60分钟

---

## 任务 1: 扩展HomeConstants常量定义

### 任务描述
在HomeConstants类中新增底部栏和卡片交互相关的常量定义，提高代码可维护性。

### 输入
- 现有文件：`products/phone/src/main/ets/common/constants/HomeConstants.ets`
- 设计文档中定义的常量值

### 输出
- 更新后的HomeConstants.ets文件

### 实现步骤
1. 打开 `HomeConstants.ets` 文件
2. 在现有常量后添加底部栏相关常量
3. 添加卡片交互相关常量
4. 保存文件

### 代码实现提示
```typescript
export class HomeConstants {
  static readonly COLUMN_SPACE: string = '12vp';
  static readonly TEXT_OPACITY: number = 0.6;
  
  // 底部栏常量
  static readonly BOTTOM_BAR_HEIGHT: number = 72;
  static readonly TAB_ICON_SIZE: number = 28;
  static readonly TAB_TEXT_SIZE: number = 13;
  static readonly TAB_ICON_MARGIN: number = 6;
  static readonly TAB_PADDING: number = 10;
  static readonly BOTTOM_BAR_COLOR: string = '#3a3a5a';
  
  // 卡片交互常量
  static readonly CARD_PRESSED_OPACITY: number = 0.8;
}
```

### 验收标准
- [ ] HomeConstants类包含所有新增常量
- [ ] 常量命名清晰，符合命名规范
- [ ] 常量值与设计文档一致
- [ ] 代码编译无错误

### 关联需求
- FR-001: 底部区域完整显示
- FR-002: 功能项布局规范

---

## 任务 2: 修复底部栏图标显示问题

### 任务描述
修复底部功能栏图标显示异常问题，为每个功能项配置正确的图标资源，确保图标清晰显示。

### 输入
- 现有文件：`products/phone/src/main/ets/pages/Index.ets`
- 图标资源：ic_music_icon.png, ic_live.png
- HomeConstants新增常量

### 输出
- 更新后的Index.ets文件，包含修复后的底部栏代码

### 实现步骤
1. 打开 `Index.ets` 文件
2. 在Index组件中添加 `getTabIcon()` 私有方法
3. 修改底部栏Row组件中的Image组件，使用getTabIcon方法获取图标
4. 使用HomeConstants常量替换硬编码的样式值
5. 保存文件

### 代码实现提示

**步骤1: 添加getTabIcon方法**（在handleLogout方法后添加）
```typescript
/**
 * 根据功能URL获取对应的底部栏图标资源
 */
private getTabIcon(url: string): Resource {
  if (url === RouterUrlConstants.MUSIC_LIST) {
    return $r('app.media.ic_music_icon');
  } else if (url === RouterUrlConstants.LIVE) {
    return $r('app.media.ic_live');
  }
  return $r('app.media.ic_music');
}
```

**步骤2: 修改底部栏代码**（替换第289-311行的底部栏代码）
```typescript
// 底部区域：功能按钮（排除评论）
Row() {
  ForEach(this.indexItemList.filter((item: IndexItem) => 
    item.url !== RouterUrlConstants.MUSIC_COMMENT), 
    (item: IndexItem) => {
      Column() {
        Image(this.getTabIcon(item.url))
          .width(HomeConstants.TAB_ICON_SIZE)
          .height(HomeConstants.TAB_ICON_SIZE)
          .margin({ bottom: HomeConstants.TAB_ICON_MARGIN })

        Text(item.title)
          .fontSize(HomeConstants.TAB_TEXT_SIZE)
          .fontColor(Color.White)
      }
      .layoutWeight(1)
      .padding({ 
        top: HomeConstants.TAB_PADDING, 
        bottom: HomeConstants.TAB_PADDING 
      })
      .onClick(() => {
        this.pageIndexInfos.pushPathByName(item.url, null);
      })
    }, (item: IndexItem, index?: number) => index + JSON.stringify(item))
}
.width(StyleConstants.FULL_WIDTH)
.height(HomeConstants.BOTTOM_BAR_HEIGHT)
.backgroundColor(HomeConstants.BOTTOM_BAR_COLOR)
.justifyContent(FlexAlign.SpaceEvenly)
```

### 验收标准
- [ ] 底部栏高度为72vp，完整显示
- [ ] 音乐功能显示ic_music_icon图标
- [ ] 直播功能显示ic_live图标
- [ ] 图标清晰无模糊
- [ ] 点击功能项可正常导航
- [ ] 代码编译无错误

### 关联需求
- FR-001: 底部区域完整显示
- FR-003: 图标清晰显示
- FR-004: 正确的图标资源配置

---

## 任务 3: 优化卡片交互方式

### 任务描述
移除卡片内的Button组件，实现点击整个卡片区域触发导航，并添加点击视觉反馈效果。

### 输入
- 现有文件：`products/phone/src/main/ets/pages/Index.ets`
- HomeConstants新增常量

### 输出
- 更新后的Index.ets文件，包含优化后的卡片代码

### 实现步骤
1. 打开 `Index.ets` 文件
2. 定位到卡片Column组件（第234-273行）
3. 删除卡片内的Button相关代码
4. 为卡片Column添加onClick事件
5. 为卡片Column添加stateStyles状态样式
6. 保存文件

### 代码实现提示

**修改卡片组件**（替换第234-273行的卡片代码）
```typescript
Column() {
  Text(item.title)
    .fontSize($r('app.float.title_font_size'))
    .fontColor(Color.White)
  
  Text(item.description)
    .fontSize($r('app.float.description_font_size'))
    .opacity(HomeConstants.TEXT_OPACITY)
    .fontColor(Color.White)
    .margin({
      top: $r('app.float.description_margin_top')
    })
  
  Blank()
}
.width(StyleConstants.FULL_WIDTH)
.padding($r('app.float.item_padding'))
.alignItems(HorizontalAlign.Start)
.justifyContent(FlexAlign.SpaceBetween)
.borderRadius($r('app.float.item_border_radius'))
.backgroundImage(item.icon)
.backgroundImageSize(ImageSize.Cover)
.onClick(() => {
  this.pageIndexInfos.pushPathByName(item.url, null);
})
.stateStyles({
  normal: {
    .opacity(1)
  },
  pressed: {
    .opacity(HomeConstants.CARD_PRESSED_OPACITY)
  }
})
```

### 验收标准
- [ ] 卡片内无Button组件
- [ ] 点击卡片任意位置可触发导航
- [ ] 按下卡片时透明度变为0.8
- [ ] 松开后透明度恢复为1
- [ ] 卡片原有视觉样式保持不变
- [ ] 代码编译无错误

### 关联需求
- FR-005: 移除卡片按钮
- FR-006: 点击卡片触发导航
- FR-007: 点击视觉反馈

---

## 任务 4: 测试验证与调试

### 任务描述
对修改后的代码进行编译、运行和功能测试，确保所有需求得到满足，修复发现的问题。

### 输入
- 修改后的Index.ets文件
- 修改后的HomeConstants.ets文件

### 输出
- 测试报告
- 问题修复记录（如有）

### 实现步骤
1. 编译项目，检查编译错误
2. 运行应用到模拟器或真机
3. 执行功能测试用例
4. 记录测试结果
5. 修复发现的问题
6. 回归测试

### 测试用例清单

#### TC-001: 底部栏完整显示测试
**操作步骤**:
1. 启动应用
2. 查看首页底部区域

**预期结果**:
- 底部栏高度为72vp
- 背景色为深紫色(#3a3a5a)
- 底部栏完整显示，无裁剪

---

#### TC-002: 底部图标显示测试
**操作步骤**:
1. 查看底部栏功能图标
2. 检查音乐功能图标
3. 检查直播功能图标

**预期结果**:
- 音乐功能显示音乐图标(ic_music_icon)
- 直播功能显示直播图标(ic_live)
- 图标清晰，无模糊或色块现象
- 图标尺寸为28x28vp

---

#### TC-003: 底部功能项点击测试
**操作步骤**:
1. 点击底部音乐功能项
2. 返回首页
3. 点击底部直播功能项

**预期结果**:
- 点击音乐项，导航到音乐列表页面
- 点击直播项，导航到直播页面
- 导航响应时间<50ms

---

#### TC-004: 卡片无按钮测试
**操作步骤**:
1. 查看首页卡片区域
2. 检查卡片内容

**预期结果**:
- 卡片显示标题和描述
- 卡片显示背景图片
- 卡片内无"播放音乐"或"观看直播"按钮

---

#### TC-005: 卡片点击导航测试
**操作步骤**:
1. 点击音乐卡片任意位置
2. 返回首页
3. 点击直播卡片任意位置

**预期结果**:
- 点击音乐卡片，导航到音乐列表页面
- 点击直播卡片，导航到直播页面
- 点击响应时间<50ms

---

#### TC-006: 卡片点击反馈测试
**操作步骤**:
1. 按下音乐卡片（不松开）
2. 观察卡片状态
3. 松开手指
4. 观察卡片状态

**预期结果**:
- 按下时，卡片透明度变为0.8
- 松开后，卡片透明度恢复为1
- 状态切换流畅，无闪烁

---

#### TC-007: UI一致性测试
**操作步骤**:
1. 查看首页整体布局
2. 对比底部栏与顶部区域样式
3. 检查卡片样式

**预期结果**:
- 底部栏与顶部区域背景色一致
- 文字颜色和大小符合设计规范
- 整体风格统一协调

---

### 验收标准
- [ ] 项目编译成功，无错误
- [ ] 应用可正常启动运行
- [ ] 所有测试用例通过
- [ ] 无明显性能问题
- [ ] UI显示正常，无异常

### 关联需求
- 所有功能需求 (FR-001 ~ FR-008)
- 所有非功能需求

---

## 任务依赖关系图

```
任务1: 扩展HomeConstants常量定义
    │
    ├──→ 任务2: 修复底部栏图标显示问题
    │
任务3: 优化卡片交互方式
    │
    └──→ 任务4: 测试验证与调试 ←──┘
```

**执行顺序建议**:
1. 先执行任务1（无依赖）
2. 任务1完成后，可并行执行任务2和任务3
3. 任务2和任务3都完成后，执行任务4

---

## 风险与注意事项

### 技术风险
1. **图标资源缺失**: 如果ic_music_icon.png不存在，需要使用ic_music.png替代
2. **stateStyles兼容性**: 部分低版本系统可能不支持stateStyles，需要测试兼容性
3. **ForEach键值**: 修改后需确保ForEach的键值生成函数正确

### 注意事项
1. 修改代码前建议先备份原文件
2. 使用Git进行版本控制，便于回滚
3. 测试时需要覆盖不同屏幕尺寸
4. 注意检查是否有其他页面引用了被修改的组件

---

## 完成标准

所有任务完成的标志：
- [x] 任务1: HomeConstants常量扩展完成
- [x] 任务2: 底部栏图标修复完成
- [x] 任务3: 卡片交互优化完成
- [x] 任务4: 测试验证通过
- [x] 代码已提交到版本控制系统
- [x] 相关文档已更新

---

## 附录

### A. 文件修改清单

| 文件 | 修改类型 | 修改行数 | 说明 |
|-----|---------|---------|------|
| HomeConstants.ets | 新增 | +8行 | 新增常量定义 |
| Index.ets | 修改 | ~50行 | 底部栏修复+卡片优化 |

### B. 资源依赖

| 资源名称 | 类型 | 路径 | 状态 |
|---------|------|------|------|
| ic_music_icon.png | 图标 | base/media/ | 需确认 |
| ic_live.png | 图标 | base/media/ | 存在 |
| ic_music.png | 图标 | base/media/ | 存在 |

### C. 相关文档链接
- 需求规格: `.codeartsdoer/specs/bottom-ui-optimization/spec.md`
- 技术设计: `.codeartsdoer/specs/bottom-ui-optimization/design.md`
- 任务清单: `.codeartsdoer/specs/bottom-ui-optimization/tasks.md`

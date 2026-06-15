# GitHub 新分支上传指南

## 🎯 目标仓库
https://github.com/Missing21-c/2026Spring-25307006-Lab1

## 🌿 新分支名称
`device-file-transfer-feature`

## 🚀 快速上传（使用脚本）

### 方法1: Windows 批处理脚本
```bash
# 双击运行或在命令行执行
upload_new_branch.bat
```

### 方法2: PowerShell 脚本（推荐）
```powershell
# 使用默认分支名
.\upload_new_branch.ps1

# 或自定义分支名
.\upload_new_branch.ps1 -BranchName "my-feature-branch"
```

## 📝 手动执行步骤

### 步骤1: 创建并切换到新分支
```bash
# 创建新分支
git checkout -b device-file-transfer-feature

# 或从当前分支创建
git branch device-file-transfer-feature
git checkout device-file-transfer-feature
```

### 步骤2: 添加文件
```bash
# 添加所有修改的文件
git add .
```

### 步骤3: 创建提交
```bash
git commit -m "feat: 实现设备间音乐文件传输功能

- 完整的设备发现和文件传输功能
- 传输历史管理和通知提醒
- 14个SVG图标资源
- 所有编译错误已修复

🤖 Generated with CodeArts Agent"
```

### 步骤4: 推送新分支到 GitHub
```bash
# 推送新分支
git push -u origin device-file-transfer-feature
```

## 🔄 完整工作流程

### 1. 创建新分支
```bash
git checkout -b device-file-transfer-feature
```

### 2. 开发和提交
```bash
git add .
git commit -m "feat: 实现设备间音乐文件传输功能"
```

### 3. 推送到远程
```bash
git push -u origin device-file-transfer-feature
```

### 4. 创建 Pull Request
访问 GitHub 创建 PR:
```
https://github.com/Missing21-c/2026Spring-25307006-Lab1/compare/device-file-transfer-feature
```

### 5. 合并到主分支（可选）
在 GitHub 上合并 PR，或本地合并：
```bash
# 切换到主分支
git checkout master

# 合并新分支
git merge device-file-transfer-feature

# 推送主分支
git push origin master
```

## 📊 分支管理命令

### 查看所有分支
```bash
# 本地分支
git branch

# 远程分支
git branch -r

# 所有分支
git branch -a
```

### 切换分支
```bash
# 切换到已有分支
git checkout device-file-transfer-feature

# 切换到主分支
git checkout master
```

### 删除分支
```bash
# 删除本地分支（已合并）
git branch -d device-file-transfer-feature

# 强制删除本地分支
git branch -D device-file-transfer-feature

# 删除远程分支
git push origin --delete device-file-transfer-feature
```

### 更新分支
```bash
# 从主分支更新当前分支
git checkout device-file-transfer-feature
git merge master

# 或使用 rebase
git rebase master
```

## 🎨 分支命名建议

### 功能分支
- `feature/device-transfer` - 新功能
- `feat/file-transfer` - 简写

### 修复分支
- `fix/transfer-bug` - Bug 修复
- `bugfix/notification-error` - 错误修复

### 其他类型
- `refactor/code-cleanup` - 重构
- `docs/update-readme` - 文档
- `test/add-unit-tests` - 测试

## ✅ 验证上传成功

### 1. 查看远程分支
```bash
git branch -r
```

### 2. 访问 GitHub
```
https://github.com/Missing21-c/2026Spring-25307006-Lab1/branches
```

### 3. 查看特定分支
```
https://github.com/Missing21-c/2026Spring-25307006-Lab1/tree/device-file-transfer-feature
```

## 🔧 常见问题解决

### 问题1: 分支已存在
```bash
# 切换到已存在的分支
git checkout device-file-transfer-feature

# 或删除后重新创建
git branch -D device-file-transfer-feature
git checkout -b device-file-transfer-feature
```

### 问题2: 推送失败
```bash
# 先拉取远程更改
git pull origin device-file-transfer-feature

# 再推送
git push -u origin device-file-transfer-feature
```

### 问题3: 合并冲突
```bash
# 查看冲突文件
git status

# 手动解决冲突后
git add .
git commit -m "resolve merge conflicts"
```

### 问题4: 需要认证
```bash
# 使用个人访问令牌
git remote set-url origin https://<token>@github.com/Missing21-c/2026Spring-25307006-Lab1.git
```

## 📋 提交信息规范

使用约定式提交（Conventional Commits）:

```
feat: 新功能
fix: Bug 修复
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

示例:
```
feat: 实现设备间音乐文件传输功能
fix: 修复通知显示错误
docs: 更新 README
refactor: 优化传输性能
```

## 🎯 本次上传内容

### 新增文件 (25个)
- 11个代码文件 (.ets)
- 14个SVG图标资源 (.svg)

### 修改文件 (3个)
- features/airdrop/Index.ets
- features/musiclist/src/main/ets/components/Header.ets
- products/phone/src/main/ets/entryability/EntryAbility.ets

### 文档文件 (多个)
- SDD 文档 (spec.md, design.md, tasks.md)
- 实现总结
- 错误修复记录
- 上传指南

## 🚀 快速命令参考

```bash
# 创建并切换分支
git checkout -b device-file-transfer-feature

# 添加文件
git add .

# 提交
git commit -m "feat: 实现设备间音乐文件传输功能"

# 推送
git push -u origin device-file-transfer-feature

# 查看分支
git branch -a

# 切换回主分支
git checkout master
```

## 🎉 完成！

选择一种方法执行：
1. ✅ 双击 `upload_new_branch.bat`
2. ✅ 运行 `.\upload_new_branch.ps1` (推荐)
3. ✅ 手动执行 Git 命令

上传成功后，新分支将出现在 GitHub 仓库中，您可以创建 Pull Request 进行代码审查！🎯

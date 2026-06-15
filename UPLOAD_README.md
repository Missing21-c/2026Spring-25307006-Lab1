# GitHub 上传快速指南

## 🎯 目标仓库
https://github.com/Missing21-c/2026Spring-25307006-Lab1

## 🚀 快速上传（3步）

### 方法1: 使用脚本（推荐）

**Windows 批处理脚本**:
```bash
# 双击运行或在命令行执行
upload_github.bat
```

**PowerShell 脚本**:
```powershell
# 在 PowerShell 中执行
.\upload_github.ps1
```

### 方法2: 手动执行（3条命令）

```bash
# 1. 添加所有文件
git add .

# 2. 创建提交
git commit -m "feat: 实现设备间音乐文件传输功能"

# 3. 推送到 GitHub
git push -u origin master
```

## 📦 本次上传内容

### 新增文件 (25个)
- **代码文件**: 11个 (.ets)
- **图标资源**: 14个 (.svg)

### 修改文件 (3个)
- features/airdrop/Index.ets
- features/musiclist/src/main/ets/components/Header.ets
- products/phone/src/main/ets/entryability/EntryAbility.ets

### 文档文件 (6个)
- GITHUB_UPLOAD_GUIDE.md
- upload_github.bat
- upload_github.ps1
- .codeartsdoer/specs/device-file-transfer/*.md

## ⚠️ 常见问题

### 问题1: Git 未安装
**解决方案**: 下载安装 Git
- 官网: https://git-scm.com/downloads
- 安装后重启命令行

### 问题2: 需要认证
**解决方案**: 使用个人访问令牌
1. GitHub → Settings → Developer settings → Personal access tokens
2. 创建新令牌（勾选 repo 权限）
3. 使用令牌作为密码

### 问题3: 推送被拒绝
**解决方案**: 先拉取再推送
```bash
git pull origin master --allow-unrelated-histories
git push -u origin master
```

### 问题4: 远程仓库已存在
**解决方案**: 更新远程地址
```bash
git remote set-url origin https://github.com/Missing21-c/2026Spring-25307006-Lab1.git
```

## ✅ 验证上传成功

上传后访问: https://github.com/Missing21-c/2026Spring-25307006-Lab1

检查:
- [ ] 文件列表中有新文件
- [ ] 提交记录显示最新提交
- [ ] 代码可以在线浏览

## 📝 提交信息模板

```
feat: 实现设备间音乐文件传输功能

- 完整的设备发现和文件传输功能
- 传输历史管理和通知提醒
- 14个SVG图标资源
- 所有编译错误已修复

🤖 Generated with CodeArts Agent
```

## 🔧 配置 Git（首次使用）

```bash
# 配置用户信息
git config --global user.name "Missing21-c"
git config --global user.email "your-email@example.com"

# 配置远程仓库
git remote add origin https://github.com/Missing21-c/2026Spring-25307006-Lab1.git

# 查看配置
git config --list
```

## 📚 详细文档

查看完整上传指南: `GITHUB_UPLOAD_GUIDE.md`

## 🎉 完成！

选择一种方法执行即可完成上传。

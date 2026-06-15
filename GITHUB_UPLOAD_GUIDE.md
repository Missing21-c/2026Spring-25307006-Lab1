# GitHub 上传指南

## 目标仓库
https://github.com/Missing21-c/2026Spring-25307006-Lab1

## 上传步骤

### 1. 初始化 Git（如果尚未初始化）

```bash
# 进入项目目录
cd D:\kaiyuan\MusicHome-master\MusicHome-master

# 初始化 Git 仓库（如果还没有）
git init

# 添加远程仓库
git remote add origin https://github.com/Missing21-c/2026Spring-25307006-Lab1.git
```

### 2. 配置 Git 用户信息

```bash
# 配置用户名和邮箱（如果尚未配置）
git config user.name "Missing21-c"
git config user.email "your-email@example.com"
```

### 3. 检查当前状态

```bash
# 查看当前状态
git status

# 查看远程仓库
git remote -v
```

### 4. 添加所有文件

```bash
# 添加所有修改的文件
git add .

# 或者逐个添加
git add features/airdrop/
git add products/phone/src/main/resources/base/media/
git add .codeartsdoer/specs/device-file-transfer/
```

### 5. 创建提交

```bash
# 创建提交
git commit -m "feat: 实现设备间音乐文件传输功能

- 新增数据模型定义 (TransferModels.ets)
- 实现传输历史服务 (TransferHistoryService.ets)
- 实现文件选择服务 (FileSelectionService.ets)
- 实现设备传输业务逻辑 (DeviceTransferViewModel.ets)
- 实现通知服务 (NotificationService.ets)
- 新增设备列表组件 (DeviceListView.ets)
- 新增文件选择面板 (FilePickerPanel.ets)
- 新增传输进度组件 (TransferProgressView.ets)
- 新增接收确认对话框 (ReceiveConfirmDialog.ets)
- 新增传输历史页面 (TransferHistoryPage.ets)
- 新增设备传输主页面 (DeviceTransferPage.ets)
- 添加14个SVG图标资源
- 集成到音乐列表页面
- 完善所有编译错误修复

🤖 Generated with CodeArts Agent"
```

### 6. 推送到 GitHub

```bash
# 推送到主分支
git push -u origin master

# 或者如果主分支是 main
git push -u origin main

# 如果需要强制推送（谨慎使用）
git push -f origin master
```

## 需要上传的主要文件

### 新增文件 (11个代码文件)
```
features/airdrop/src/main/ets/viewmodel/TransferModels.ets
features/airdrop/src/main/ets/viewmodel/TransferHistoryService.ets
features/airdrop/src/main/ets/viewmodel/FileSelectionService.ets
features/airdrop/src/main/ets/viewmodel/DeviceTransferViewModel.ets
features/airdrop/src/main/ets/viewmodel/NotificationService.ets
features/airdrop/src/main/ets/view/DeviceListView.ets
features/airdrop/src/main/ets/view/FilePickerPanel.ets
features/airdrop/src/main/ets/view/TransferProgressView.ets
features/airdrop/src/main/ets/view/ReceiveConfirmDialog.ets
features/airdrop/src/main/ets/view/TransferHistoryPage.ets
features/airdrop/src/main/ets/view/DeviceTransferPage.ets
```

### 新增图标资源 (14个SVG文件)
```
products/phone/src/main/resources/base/media/ic_device_phone.svg
products/phone/src/main/resources/base/media/ic_device_tablet.svg
products/phone/src/main/resources/base/media/ic_device_watch.svg
products/phone/src/main/resources/base/media/ic_public_ok.svg
products/phone/src/main/resources/base/media/ic_public_fail.svg
products/phone/src/main/resources/base/media/ic_public_cancel.svg
products/phone/src/main/resources/base/media/ic_public_refresh.svg
products/phone/src/main/resources/base/media/ic_public_arrow_left.svg
products/phone/src/main/resources/base/media/ic_public_arrow_up.svg
products/phone/src/main/resources/base/media/ic_public_arrow_down.svg
products/phone/src/main/resources/base/media/ic_public_time.svg
products/phone/src/main/resources/base/media/ic_public_send.svg
products/phone/src/main/resources/base/media/ic_public_pause.svg
products/phone/src/main/resources/base/media/ic_music_list.svg
```

### 修改文件 (3个)
```
features/airdrop/Index.ets
features/musiclist/src/main/ets/components/Header.ets
products/phone/src/main/ets/entryability/EntryAbility.ets
```

### 文档文件 (5个)
```
.codeartsdoer/specs/device-file-transfer/spec.md
.codeartsdoer/specs/device-file-transfer/design.md
.codeartsdoer/specs/device-file-transfer/tasks.md
.codeartsdoer/specs/device-file-transfer/IMPLEMENTATION_SUMMARY.md
.codeartsdoer/specs/device-file-transfer/ICON_RESOURCE_ADDED.md
.codeartsdoer/specs/device-file-transfer/FINAL_ERROR_FIX.md
```

## 可能遇到的问题及解决方案

### 问题1: remote origin already exists
```bash
# 删除现有的远程仓库
git remote remove origin

# 重新添加
git remote add origin https://github.com/Missing21-c/2026Spring-25307006-Lab1.git
```

### 问题2: 拒绝推送（非快进）
```bash
# 先拉取远程更改
git pull origin master --allow-unrelated-histories

# 解决冲突后再推送
git push -u origin master
```

### 问题3: 需要认证
```bash
# 使用个人访问令牌（推荐）
# 在 GitHub Settings -> Developer settings -> Personal access tokens 创建令牌
git remote set-url origin https://<token>@github.com/Missing21-c/2026Spring-25307006-Lab1.git

# 或使用 SSH
git remote set-url origin git@github.com:Missing21-c/2026Spring-25307006-Lab1.git
```

### 问题4: 大文件上传失败
```bash
# 使用 Git LFS 处理大文件
git lfs install
git lfs track "*.png"
git lfs track "*.jpg"
git add .gitattributes
```

## 验证上传成功

上传完成后，访问以下链接验证：
https://github.com/Missing21-c/2026Spring-25307006-Lab1

检查以下内容：
- [ ] 所有新文件都已上传
- [ ] 修改的文件已更新
- [ ] 提交信息清晰
- [ ] 代码可以正常浏览

## 快速执行脚本

创建一个 `upload.sh` 脚本：

```bash
#!/bin/bash

echo "开始上传到 GitHub..."

# 添加所有文件
git add .

# 创建提交
git commit -m "feat: 实现设备间音乐文件传输功能

- 完整的设备发现和文件传输功能
- 传输历史管理和通知提醒
- 14个SVG图标资源
- 所有编译错误已修复

🤖 Generated with CodeArts Agent"

# 推送到 GitHub
git push -u origin master

echo "上传完成！"
echo "访问: https://github.com/Missing21-c/2026Spring-25307006-Lab1"
```

执行脚本：
```bash
chmod +x upload.sh
./upload.sh
```

## 注意事项

1. **备份重要**: 上传前建议先备份项目
2. **检查敏感信息**: 确保没有上传密钥、密码等敏感信息
3. **.gitignore**: 检查 .gitignore 文件，确保不需要的文件被忽略
4. **分支名称**: 确认主分支名称是 master 还是 main
5. **权限**: 确保有仓库的写入权限

## 需要忽略的文件

建议在 .gitignore 中添加：
```
# 构建输出
build/
output/
*.hap

# 临时文件
*.tmp
*.temp

# IDE 配置
.idea/
.vscode/

# 日志
*.log

# 依赖
oh_modules/
node_modules/
```

## 完成！

按照以上步骤操作即可成功上传项目到 GitHub。

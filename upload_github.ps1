# GitHub 上传脚本 (PowerShell)
# 使用方法: .\upload_github.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub 上传脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 步骤1: 检查 Git
Write-Host "[1/6] 检查 Git..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "Git 版本: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "错误: Git 未安装或不在 PATH 中" -ForegroundColor Red
    Write-Host "请先安装 Git: https://git-scm.com/downloads" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# 步骤2: 检查远程仓库
Write-Host "[2/6] 检查远程仓库..." -ForegroundColor Yellow
$remote = git remote -v
if ($remote -like "*github.com*") {
    Write-Host "远程仓库已配置" -ForegroundColor Green
    Write-Host $remote
} else {
    Write-Host "添加远程仓库..." -ForegroundColor Yellow
    git remote add origin https://github.com/Missing21-c/2026Spring-25307006-Lab1.git
}
Write-Host ""

# 步骤3: 添加文件
Write-Host "[3/6] 添加所有文件..." -ForegroundColor Yellow
git add .
Write-Host "文件已添加" -ForegroundColor Green
Write-Host ""

# 步骤4: 查看状态
Write-Host "[4/6] 查看待提交文件..." -ForegroundColor Yellow
git status
Write-Host ""

# 步骤5: 创建提交
Write-Host "[5/6] 创建提交..." -ForegroundColor Yellow
$commitMessage = @"
feat: 实现设备间音乐文件传输功能

- 完整的设备发现和文件传输功能
- 传输历史管理和通知提醒
- 14个SVG图标资源
- 所有编译错误已修复

🤖 Generated with CodeArts Agent
"@
git commit -m $commitMessage
Write-Host "提交已创建" -ForegroundColor Green
Write-Host ""

# 步骤6: 推送到 GitHub
Write-Host "[6/6] 推送到 GitHub..." -ForegroundColor Yellow
try {
    git push -u origin master
    Write-Host "推送成功！" -ForegroundColor Green
} catch {
    Write-Host "推送到 master 失败，尝试推送到 main..." -ForegroundColor Yellow
    try {
        git push -u origin main
        Write-Host "推送成功！" -ForegroundColor Green
    } catch {
        Write-Host "推送失败，请检查:" -ForegroundColor Red
        Write-Host "1. 是否有仓库写入权限" -ForegroundColor Yellow
        Write-Host "2. 是否需要认证（个人访问令牌）" -ForegroundColor Yellow
        Write-Host "3. 网络连接是否正常" -ForegroundColor Yellow
        exit 1
    }
}
Write-Host ""

# 完成
Write-Host "========================================" -ForegroundColor Green
Write-Host "上传完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "访问您的仓库:" -ForegroundColor Cyan
Write-Host "https://github.com/Missing21-c/2026Spring-25307006-Lab1" -ForegroundColor White
Write-Host ""

@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 上传脚本
echo ========================================
echo.

echo [1/6] 检查 Git 状态...
git status
echo.

echo [2/6] 添加所有文件...
git add .
echo.

echo [3/6] 查看待提交文件...
git status
echo.

echo [4/6] 创建提交...
git commit -m "feat: 实现设备间音乐文件传输功能" -m "- 完整的设备发现和文件传输功能" -m "- 传输历史管理和通知提醒" -m "- 14个SVG图标资源" -m "- 所有编译错误已修复" -m "" -m "🤖 Generated with CodeArts Agent"
echo.

echo [5/6] 推送到 GitHub...
git push -u origin master
if %errorlevel% neq 0 (
    echo 推送失败，尝试推送到 main 分支...
    git push -u origin main
)
echo.

echo [6/6] 完成！
echo.
echo 访问您的仓库: https://github.com/Missing21-c/2026Spring-25307006-Lab1
echo.
pause

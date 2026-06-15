@echo off
chcp 65001 >nul
echo ========================================
echo GitHub 新分支上传脚本
echo ========================================
echo.

set BRANCH_NAME=device-file-transfer-feature

echo [1/7] 检查当前状态...
git status
echo.

echo [2/7] 创建并切换到新分支: %BRANCH_NAME%...
git checkout -b %BRANCH_NAME%
echo.

echo [3/7] 添加所有文件...
git add .
echo.

echo [4/7] 查看待提交文件...
git status
echo.

echo [5/7] 创建提交...
git commit -m "feat: 实现设备间音乐文件传输功能" -m "- 完整的设备发现和文件传输功能" -m "- 传输历史管理和通知提醒" -m "- 14个SVG图标资源" -m "- 所有编译错误已修复" -m "" -m "🤖 Generated with CodeArts Agent"
echo.

echo [6/7] 推送新分支到 GitHub...
git push -u origin %BRANCH_NAME%
echo.

echo [7/7] 完成！
echo.
echo ========================================
echo 新分支已创建并推送成功！
echo ========================================
echo.
echo 分支名称: %BRANCH_NAME%
echo 访问仓库: https://github.com/Missing21-c/2026Spring-25307006-Lab1
echo 查看分支: https://github.com/Missing21-c/2026Spring-25307006-Lab1/tree/%BRANCH_NAME%
echo.
echo 您可以在 GitHub 上创建 Pull Request 合并到主分支
echo.
pause

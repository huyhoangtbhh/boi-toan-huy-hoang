@echo off
chcp 65001 > nul
title Cập Nhật Dữ Liệu Xổ Số 30 Ngày
echo ========================================================
echo   🔄 ĐANG CẬP NHẬT KẾT QUẢ XỔ SỐ MIỀN BẮC MỚI NHẤT
echo ========================================================
echo.
.\.venv\Scripts\python.exe update_lottery.py
echo.
echo Hoàn tất! Bấm phím bất kỳ để thoát.
pause > nul

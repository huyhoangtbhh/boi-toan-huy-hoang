@echo off
chcp 65001 > nul
title AI Fortune & Lottery Analytics - Tac gia: Bui Huy Hoang
echo =================================================================
echo    🔮 AI FORTUNE & LOTTERY ANALYTICS (ĐA CHU KỲ 30 - 60 - 100 NGÀY)
echo    ⭐ Tác giả & Bản quyền: Bùi Huy Hoàng
echo =================================================================
echo.
echo [*] Đang khởi động máy chủ...
echo [*] Máy tính (Local):   http://127.0.0.1:5000
echo [*] Điện thoại (Wi-Fi): http://192.168.1.21:5000
echo.
echo [*] Bấm biểu tượng 📱 trên giao diện để quét mã QR mở trên điện thoại!
echo.

start http://127.0.0.1:5000
.\.venv\Scripts\python.exe app.py
pause

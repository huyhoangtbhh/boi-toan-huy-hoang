@echo off
chcp 65001 > nul
title AI Fortune & Lottery - CHIA SẺ TRUY CẬP ONLINE
echo =================================================================
echo    🔮 AI FORTUNE & LOTTERY ANALYTICS - PHIÊN BẢN ONLINE
echo    ⭐ Tác giả & Bản quyền: Bùi Huy Hoàng
echo =================================================================
echo.
echo [*] Đang khởi động Server Local (Port 5000)...
start /b .\.venv\Scripts\python.exe app.py
timeout /t 2 /nobreak > nul

echo.
echo [*] Đang mở đường hầm Internet công khai (Secure HTTPS Tunnel)...
echo [*] Bất kỳ ai dùng 4G/5G hoặc mạng Wi-Fi khác đều truy cập được!
echo =================================================================
echo  >>> HÃY COPY ĐƯỜNG LINK HTTPS DƯỚI ĐÂY GỬI CHO MỌI NGƯỜI: <<<
echo =================================================================
echo.

ssh -p 443 -o StrictHostKeyChecking=no -R0:localhost:5000 a.pinggy.io

pause

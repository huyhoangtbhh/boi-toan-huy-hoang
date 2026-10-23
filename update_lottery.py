"""
Script cập nhật Kết Quả Xổ Số Miền Bắc 30 ngày độc lập.
Có thể chạy thủ công hoặc lên lịch tự động bằng Windows Task Scheduler vào 18h40 mỗi ngày.
"""

import sys
import io
import os

# Ensure UTF-8 output on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

from scraper import get_kqxsmb_30days

def main():
    print("=" * 60)
    print("🔄 ĐANG CÀO VÀ CẬP NHẬT KẾT QUẢ XỔ SỐ MIỀN BẮC 30 NGÀY...")
    print("=" * 60)
    
    days, last_updated = get_kqxsmb_30days(force_refresh=True)
    
    if days:
        latest = days[0]
        print(f"✅ ĐÃ CẬP NHẬT THÀNH CÔNG {len(days)} NGÀY!")
        print(f"📅 Ngày mở thưởng mới nhất: {latest.get('date')}")
        print(f"👑 Giải Đặc Biệt (Đề): {latest.get('special_prize')} (Lô 2 số: {latest.get('special_loto')})")
        print(f"🎯 Mẫu loto 2 số: {', '.join(latest.get('loto_2digits', [])[:10])}...")
        print(f"⏰ Thời gian cập nhật: {last_updated}")
        print(f"💾 File cache lưu tại: data/kqxsmb_30days.json")
    else:
        print("❌ Cập nhật thất bại. Vui lòng kiểm tra lại kết nối mạng!")

if __name__ == '__main__':
    main()

# 🔮 AI Fortune & Lottery Analytics (Thầy Bói AI, Thần Số Học & Thống Kê Xổ Số 30 Ngày)

Ứng dụng web toàn diện kết hợp **Tâm Linh Học Hiện Đại & Thần Số Học AI (Google Gemini Vision & Multimodal)** cùng **Khoa Học Dữ Liệu Thống Kê Xổ Số Miền Bắc (KQXSMB 30 Ngày Thực Tế)**.

Người dùng có thể nhập tâm sự/giấc mơ, tải ảnh điềm báo, tra cứu Thần số học Pythagorean, hoặc khám phá các mô hình thống kê chuyên sâu như Cầu tam giác Pascal, Tổng Đề 0-9, Xiên 3 và Biểu đồ tương tác Chart.js.

---

## 🌟 Tính Năng Nổi Bật (Features)

### 1. 🔮 AI Fortuneteller & Giải Mã Giấc Mơ Đa Phương Thức (Multimodal Vision)
- **Nhập liệu tự nhiên**: Nhập đoạn chat, giấc mơ, tâm sự hoặc chọn từ gợi ý nhanh.
- **👁️ Nhìn hình đoán điềm (Gemini Vision)**: Hỗ trợ kéo thả, chọn ảnh chụp điềm báo (chim bay vào nhà, đồ vật vỡ, hiện tượng lạ) hoặc **dán trực tiếp từ Clipboard (Ctrl + V)** để AI giải mã điềm báo và luận số.
- **Phân tích cảm xúc**: Biểu đồ phân bổ cảm xúc vui nhộn (Ví dụ: 63% Hóng hớt drama, 30% Tâm linh mách bảo, 7% Khát khao đổi đời).
- **Lời phán quẻ cát tường**: Lời sấm truyền sâu sắc, dí dỏm, mang lại năng lượng tích cực.
- **Con số may mắn & Cặp song thủ**: Luận giải chi tiết dựa trên giấc mơ dân gian kết hợp tư duy hiện đại.
- **🎨 Xuất thẻ bài & Sao chép Clipboard**: Bấm 1 chạm để tải ảnh thẻ bài PNG độ nét cao hoặc **sao chép trực tiếp vào bộ nhớ tạm** để dán gửi Zalo/Facebook/Telegram ngay lập tức.
- **Đa tầng AI**: Hỗ trợ Google Gemini API (`gemini-3.8-flash`, `gemini-2.5-flash`, `gemini-1.5-flash`) kèm bộ **Heuristic Oracle Fallback** tự động dự phòng nếu không có mạng hay chưa cấu hình API Key.

### 2. 🔢 Khám Phá Thần Số Học AI (Pythagorean Numerology)
- **Con số chủ đạo (Life Path 2 - 11, 22, 33)**: Tính toán chính xác theo chuẩn Pitago kèm luận giải tính cách, thế mạnh, định hướng sự nghiệp và ngũ hành bản mệnh.
- **Biểu đồ ngày sinh 3x3 (Birth Chart Matrix)**:
  - Phân tích 9 ô tần suất số sinh (1 đến 9).
  - Tự động nhận diện các **Mũi tên sức mạnh** (Quyết tâm 1-5-9, Kế hoạch 1-2-3, Nhạy bén tâm linh 3-5-7,...) hoặc **Mũi tên trống** cần khắc phục.
- **Năm cá nhân 2026 (Personal Year)**: Thông điệp vận hạn, cơ hội và kim chỉ nam hành động trong năm hiện tại.
- **Chỉ số tên riêng**: Tính toán Số Linh Hồn (Soul Urge) và Số Sứ Mệnh (Destiny) với thuật toán chuẩn hóa tiếng Việt loại bỏ dấu thanh điệu.
- **Đối chiếu số sinh với KQXS 30 ngày**: Bảng tra cứu trực quan các con số phong thủy của bạn đã nổ bao nhiêu lần trong 30 ngày qua.

### 3. 📐 Mô Hình Thống Kê & Soi Cầu Chuyên Sâu
- **Cầu Tam Giác Pascal (Pascal Pyramid Modulo 10)**:
  - Ghép Giải Đặc Biệt + Giải Nhất thành dãy 10 chữ số, cộng dồn modulo 10 liên tiếp hình thành kim tự tháp đến đỉnh 2 chữ số.
  - **Backtest lịch sử 30 ngày**: Tự động kiểm thử tỷ lệ nổ thực tế của cầu Pascal qua 30 kỳ quay (thống kê chính xác tỷ lệ ăn cầu ~45-55%).
- **Thống kê Tổng Đề (0 - 9)**:
  - Phân tích tổng 2 số cuối giải Đặc Biệt trong 30 ngày.
  - Nhận diện Tổng Siêu Hot và Tổng Gan (lâu chưa ra).
  - Phân tích cơ cấu **Chẵn - Lẻ** (Chẵn-Chẵn, Chẵn-Lẻ, Lẻ-Chẵn, Lẻ-Lẻ) và **Tài - Xỉu** (>=50 vs <50).
- **Thống kê Cặp Xiên 3 (Top Triplets)**:
  - Thuật toán tổ hợp quét toàn bộ 810 giải của 30 ngày, tìm ra Top 10 bộ ba số hay về cùng nhau nhất trong cùng 1 kỳ quay.

### 4. 📈 Biểu Đồ Thống Kê Trực Quan (Interactive Chart.js)
- **Bar Chart (00 - 99)**: Toàn cảnh tần suất xuất hiện của tất cả 100 con số loto với nút lọc nhanh: *Chỉ số Hot*, *Chỉ số Gan*, *Tất cả 00-99*.
- **Radar Chart (Mạng Nhện Đầu vs Đuôi)**: So sánh đối xứng sức mạnh phân bổ của 10 đầu số (0-9) và 10 đuôi số (0-9).
- **Doughnut Chart (Cơ Cấu Giải Đặc Biệt)**: Biểu đồ tròn thể hiện tỷ lệ Tài/Xỉu và Chẵn/Lẻ của 2 số cuối Đặc Biệt.

### 5. 🎨 Giao Diện Cyber-Mystic & Âm Thanh Web Audio API
- **Hiệu ứng Glassmorphism & Neon Glow**: Vàng hoàng kim, Tím huyền bí, Hồng rực rỡ và Cyan băng giá.
- **Bộ tổng hợp âm thanh chuyên nghiệp (Web Audio API Synthesizer)**:
  - Âm thanh lắc quẻ xủng xoảng.
  - Tiếng tích tắc quay số loto neon 3D.
  - Tiếng chuông khánh chimes khi khóa số.
  - **Chuông chùa Tây Tạng (Tibetan Bell)**: Âm ngân vang thanh tịnh khi mở quẻ thần số học.
  - **Nhạc mừng Đại Thắng (Jackpot Arpeggio)**: Giai điệu hân hoan khi con số mở trúng số Siêu HOT!
  - Nút bật/tắt âm thanh tiện lợi.

---

## 🛠️ Công Nghệ Sử Dụng (Tech Stack)

- **Backend**: Python 3.14 + Flask (Modular routes, RESTful API).
- **AI Engine**: Google Gemini API (`gemini-3.8-flash`, `gemini-2.5-flash`, `gemini-1.5-flash`) Multimodal Vision + Heuristic Oracle Fallback.
- **Scraper / Data**: `requests` + `beautifulsoup4` tự động đồng bộ kết quả mới nhất lúc 18h35 hàng ngày.
- **Data Visualization**: Chart.js v4.4.1 (Responsive, Canvas-based, Dark-mode tailored).
- **Frontend**: HTML5 Semantic, Vanilla CSS3 (Custom Glassmorphism Design System, CSS Grid/Flexbox), Vanilla JavaScript (ES6+), Web Audio API Synthesizer.

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### 1. Kích hoạt môi trường ảo & cài đặt thư viện
```powershell
# Di chuyển vào thư mục dự án
cd "d:\Giải toán Python"

# Kích hoạt virtualenv có sẵn
.venv\Scripts\activate

# Hoặc cài đặt các gói cần thiết:
pip install -r requirements.txt
```

### 2. Cấu hình Gemini API Key (Tùy chọn)
Chỉnh sửa file `.env` hoặc cấu hình biến môi trường:
```env
GEMINI_API_KEY=AIzaSy...
PORT=5000
FLASK_ENV=development
```
*(Nếu chưa có API Key, hệ thống tự động chuyển sang bộ giải thuật Heuristic Oracle & Vision thông minh mà không gặp lỗi).*

### 3. Khởi động Web Server
Chạy trực tiếp file `run.bat` hoặc lệnh:
```powershell
.venv\Scripts\python.exe app.py
```

Mở trình duyệt và truy cập:
👉 **http://127.0.0.1:5000**

---

## 📡 Danh Sách API Endpoints

| Phương thức | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/` | Giao diện Dashboard chính (7 Tab chuyên sâu: Khai Quẻ AI, Thần Số Học, Cầu Pascal & Tổng Đề, Biểu Đồ 100 Số, Bảng KQXS 27 Giải, Bạc Nhớ, Sổ Mơ) |
| `POST` | `/api/fortune` | Khai quẻ AI từ văn bản/giấc mơ & đối chiếu số 30 ngày |
| `POST` | `/api/vision-fortune` | Tải ảnh/chụp ảnh điềm báo, Gemini Vision giải mã và luận số |
| `POST` | `/api/numerology` | Tính toán Thần số học Pitago, ma trận 3x3 và bảng đối chiếu XS |
| `GET` | `/api/lottery/pascal` | Tính toán Cầu tam giác Pascal và backtest tỷ lệ nổ 30 ngày |
| `GET` | `/api/lottery/tong-de` | Thống kê tần suất Tổng Đề (0-9), chu kỳ gan, Tài/Xỉu & Chẵn/Lẻ |
| `GET` | `/api/lottery/xien-3` | Lấy danh sách Top 10 bộ Xiên 3 về cùng nhau nhiều nhất |
| `GET` | `/api/lottery/full-frequency` | Tần suất chi tiết đầy đủ 100 số từ 00 đến 99 cho Chart.js |
| `GET` | `/api/lottery/overview` | Lấy dữ liệu tổng quan, top 5 hot, top 5 gan 30 ngày |
| `GET` | `/api/lottery/analyze?number=68` | Tra cứu tần suất 30 ngày của 1 con số bất kỳ |
| `POST` | `/api/lottery/refresh` | Kích hoạt crawl lại dữ liệu mới nhất từ xosodaiphat.com |

---

## 👨‍💻 Tác Giả & Bản Quyền
- **Tác giả**: Bùi Huy Hoàng
- **Bản quyền**: © 2026 Bùi Huy Hoàng. Toàn quyền bảo lưu.

---

## ⚠️ Tuyên Bố Miễn Trừ Trách Nhiệm (Disclaimer)
Ứng dụng được thiết kế cho mục đích **giải trí, phong thủy vui vẻ và nghiên cứu phân tích khoa học dữ liệu thống kê**. Chúng tôi không khuyến khích và không chịu trách nhiệm cho các hành vi cá cược, cờ bạc trái phép dưới bất kỳ hình thức nào.


import os
import re
import json
import random
import requests
from dotenv import load_dotenv

# Load local environment variables from .env
load_dotenv()

DEFAULT_MODELS = [
    "gemini-3.8-flash",
    "gemini-2.5-flash",
    "gemini-1.5-flash",
    "gemini-flash-latest"
]

# Dream & Keyword Dictionary based on Vietnamese folk wisdom ("Sổ Mơ Lô Đề") & witty interpretation
FOLK_DREAM_DICT = {
    "rắn": {"nums": ["32", "72"], "reason": "Rắn rồng tương ứng, thần tài ngự đỉnh, lộc lá bò vào nhà!"},
    "tiền": {"nums": ["52", "68", "79"], "reason": "Thấy tiền sinh tiền, thần tài gõ cửa mang lộc 68 tụ bảo tài!"},
    "vàng": {"nums": ["83", "99"], "reason": "Vàng sáng lấp lánh báo hiệu quẻ đại cát, tài lộc đỉnh nóc kịch trần!"},
    "chó": {"nums": ["11", "51", "91"], "reason": "Chó sủa đuổi xui xẻo, trung thành giữ của, lộc về bất thình lình!"},
    "mèo": {"nums": ["14", "54", "94"], "reason": "Mèo tới tuy mễ nhưng mang thần bí linh thiêng, lộc đảo nghịch chuyển!"},
    "cá": {"nums": ["01", "41", "81"], "reason": "Cá lội ngược dòng hoá rồng vàng, sóng lộc dâng trào!"},
    "nước": {"nums": ["29", "69"], "reason": "Nước chảy chỗ trũng, tiền tài như thác đổ không gì cản nổi!"},
    "lửa": {"nums": ["07", "47", "87"], "reason": "Lửa bốc ngùn ngụt, vận may rực đỏ như son, số nổ vang trời!"},
    "xe": {"nums": ["12", "52", "92"], "reason": "Bánh xe lăn bánh rước tài lộc bon bon về tận cửa ngõ!"},
    "người yêu": {"nums": ["27", "72"], "reason": "Tình duyên thăng hoa thì tài lộc cũng phải x2 năng lượng tích cực!"},
    "cãi nhau": {"nums": ["65", "56"], "reason": "Lời qua tiếng lại giải phóng năng lượng xui, nhường chỗ cho thần tài vào!"},
    "rụng răng": {"nums": ["31", "52"], "reason": "Thay răng đổi vận, lột xác đón hồng ân tài lộc từ vũ trụ!"},
    "ma": {"nums": ["22", "62"], "reason": "Cõi linh thiêng mách bảo, bóng dáng huyền bí chở che mở lối!"},
    "bay": {"nums": ["05", "45", "85"], "reason": "Hồn phiêu lãng trên chín tầng mây, số trời chỉ điểm thăng hoa tuyệt đỉnh!"},
    "mất": {"nums": ["89", "98"], "reason": "Trong cái rủi có cái may cực lớn, mất một sẽ được bù lại mười lần!"},
    "cơm": {"nums": ["24", "64"], "reason": "Bát cơm no ấm đủ đầy, lộc ăn uống chuyển thành lộc vàng ròng!"},
    "rùa": {"nums": ["27", "67"], "reason": "Quy linh hiển ứng, sống lâu trường thọ, tài lộc bền vững muôn đời!"},
    "hổ": {"nums": ["06", "46", "86"], "reason": "Hổ gầm rung chuyển giang sơn, uy quyền mang lại khoản lộc bất ngờ!"},
    "chuột": {"nums": ["15", "55", "95"], "reason": "Chuột sa chĩnh gạo, tha lộc về tổ, ấm no trọn vẹn!"},
    "gà": {"nums": ["28", "68"], "reason": "Gà gáy sáng xua tan bóng tối, lộc phát tài khai quang sáng chói!"}
}

MOOD_PALETTES = [
    {"label": "Khát khao đổi đời", "color": "#ec4899"},
    {"label": "Tâm linh mách bảo", "color": "#8b5cf6"},
    {"label": "Hóng hớt drama", "color": "#06b6d4"},
    {"label": "Bất an nhẹ ví tiền", "color": "#f59e0b"},
    {"label": "Vận đỏ tiềm ẩn", "color": "#10b981"},
    {"label": "Cảm giác thần tài độ", "color": "#3b82f6"}
]

ELEMENTS = [
    "Kim (Vàng ròng phát tài - Hợp hướng Tây)",
    "Thủy (Biển lộc mênh mông - Hợp hướng Bắc)",
    "Mộc (Cây xanh đâm chồi trúng đậm - Hợp hướng Đông)",
    "Hỏa (Lửa hừng hực bừng sáng - Hợp hướng Nam)",
    "Thổ (Đất lành chim đậu tích vàng - Hợp trung cung)"
]

def generate_heuristic_fortune(user_text):
    """
    Intelligent Vietnamese Oracle Fallback when API key is not supplied or network fails.
    Uses contextual keyword matching, folk dream dictionary, and witty humor.
    """
    text_lower = user_text.lower().strip()
    
    # 1. Detect matching dream/event keywords
    matched_keyword = None
    matched_data = None
    for kw, data in FOLK_DREAM_DICT.items():
        if kw in text_lower:
            matched_keyword = kw
            matched_data = data
            break
            
    if matched_data:
        lucky_number = random.choice(matched_data["nums"])
        reason = f"Theo giải mã giấc mơ dân gian: '{matched_keyword}' ứng với điềm báo {matched_data['reason']}"
    else:
        # Calculate deterministic or seeded number from hash of user text for uniqueness
        seed = sum(ord(c) for c in text_lower) if text_lower else 42
        lucky_int = (seed * 17 + 23) % 100
        lucky_number = f"{lucky_int:02d}"
        reasons = [
            f"Tâm trí bạn toát lên tần số rung động cực mạnh hướng về con số {lucky_number}. Các luân xa đang đồng thanh hô vang tài lộc!",
            f"Vũ trụ vừa quét qua trường năng lượng trong dòng suy nghĩ của bạn và phản hồi lại đúng mã số may mắn {lucky_number}!",
            f"Dấu hiệu phong thủy chỉ ra rằng hôm nay các vì sao chiếu mệnh tập trung năng lượng vào con số {lucky_number}, không lệch đi đâu được!",
            f"Trực giác của bạn đang phát tín hiệu cầu cứu thần tài, và ngài đã gửi tín hiệu ngầm thông qua con số {lucky_number}!"
        ]
        reason = random.choice(reasons)

    # Lucky pair (reverse digits or complementary)
    if len(lucky_number) == 2:
        rev = lucky_number[::-1]
        lucky_pair = [lucky_number, rev] if rev != lucky_number else [lucky_number, f"{(int(lucky_number)+10)%100:02d}"]
    else:
        lucky_pair = [lucky_number, "86"]

    # Mood Breakdown
    random.shuffle(MOOD_PALETTES)
    p1 = random.randint(45, 65)
    p2 = random.randint(20, 35)
    p3 = 100 - p1 - p2
    mood_breakdown = [
        {"label": MOOD_PALETTES[0]["label"], "percent": p1, "color": MOOD_PALETTES[0]["color"]},
        {"label": MOOD_PALETTES[1]["label"], "percent": p2, "color": MOOD_PALETTES[1]["color"]},
        {"label": MOOD_PALETTES[2]["label"], "percent": p3, "color": MOOD_PALETTES[2]["color"]}
    ]

    # Humorous Prophecies
    prophecies = [
        f"Hôm nay vận khí ngút ngàn, ra ngõ gặp quý nhân, vào nhà gặp tài lộc. Thần tài đang đứng ở đầu ngõ, chỉ chờ bạn bước đúng nhịp!",
        f"Sao Thái Dương chiếu rọi đỉnh đầu, tiền bạc có dấu hiệu muốn chảy vào túi. Đừng chớp mắt kẻo vận may phóng qua vụt mất!",
        f"Quẻ bói báo hiệu hôm nay bạn 'đỉnh nóc kịch trần bay phấp phới'! Mọi bế tắc tan biến, linh tính mách bảo con số cực nhạy!",
        f"Tâm tịnh thì phúc sinh, lòng vui thì lộc tới. Nay chớ vội mua hết cả đại lý vé số, chơi vui một chút lấy lộc khai xuân!",
        f"Trời sinh bạn mang số hưởng, nay vũ trụ ưu ái cấp riêng một quẻ may mắn. Hãy giữ vững nụ cười vì tài lộc đang trên đường ship tới!"
    ]
    prophecy = random.choice(prophecies)

    advices = [
        "Bước chân phải ra cửa, mỉm cười với ít nhất 1 người lạ để kích hoạt từ trường may mắn.",
        "Uống một cốc nước ấm, tránh cãi nhau chuyện cỏn con để giữ trọn vẹn trường khí tài lộc.",
        "Mặc trang phục có tông màu sáng, giữ tinh thần lạc quan, tuyệt đối không cho ai vay tiền hôm nay!",
        "Nếu gặp việc khó, hít thở sâu 3 lần và nghĩ đến con số may mắn, may mắn sẽ tự khắc tới."
    ]

    return {
        "source": "heuristic_oracle",
        "mood_breakdown": mood_breakdown,
        "prophecy": prophecy,
        "lucky_number": lucky_number,
        "lucky_pair": lucky_pair,
        "reason": reason,
        "element": random.choice(ELEMENTS),
        "action_advice": random.choice(advices),
        "ai_model": "Thầy Bói Dân Gian AI (Heuristic Oracle)"
    }

def call_gemini_api(user_text, api_key=None, model="gemini-3.8-flash"):
    """
    Calls Google Gemini API with structured prompt for fortune telling.
    Falls back smoothly if API call fails or quota is exhausted.
    """
    key = api_key or os.getenv("GEMINI_API_KEY")
    if not key or key.strip() == "":
        return generate_heuristic_fortune(user_text)

    prompt = f"""
Bạn là một "Thầy Bói AI & Thần Số Học Siêu Hài Hước", uyên bác, dí dỏm, mang đậm phong cách văn hóa mạng và tử vi dân gian Việt Nam.
Người dùng vừa chia sẻ câu chuyện, giấc mơ hoặc tâm sự sau:
\"\"\"{user_text}\"\"\"

Hãy phân tích tâm trạng, giải mã giấc mơ/tâm sự và phán một quẻ bói thật hài hước, sắc bén nhưng tích cực.
BẮT BUỘC trả về DUY NHẤT một chuỗi JSON thuần túy (không bọc trong markdown ```json ```, không kèm lời dẫn), có các trường chính xác như sau:
{{
  "mood_breakdown": [
    {{"label": "Tên cảm xúc vui 1", "percent": 55, "color": "#ec4899"}},
    {{"label": "Tên cảm xúc vui 2", "percent": 30, "color": "#f59e0b"}},
    {{"label": "Tên cảm xúc vui 3", "percent": 15, "color": "#10b981"}}
  ],
  "prophecy": "Lời phán / quẻ bói hôm nay (1-2 câu hài hước, sâu cay nhưng mang lại năng lượng tích cực)",
  "lucky_number": "Một con số duy nhất từ 00 đến 99, 2 chữ số (ví dụ: '68')",
  "lucky_pair": ["số chính", "số lộn hoặc bóng âm dương"],
  "reason": "Giải mã giấc mơ / ngữ cảnh cực kỳ bá đạo, thuyết phục dựa trên chi tiết người dùng vừa kể",
  "element": "Mệnh phong thủy hợp hôm nay (Kim, Mộc, Thủy, Hỏa hoặc Thổ) kèm ghi chú hài hước",
  "action_advice": "Lời khuyên hành động hôm nay (nên làm gì / kiêng gì ngắn gọn dí dỏm)"
}}
Lưu ý:
- Tổng phần trăm của mood_breakdown phải bằng 100%.
- lucky_number phải là chuỗi 2 chữ số từ "00" đến "99".
"""

    # Try requested model, and fallback to alternatives if model not found
    candidate_models = [model] + [m for m in DEFAULT_MODELS if m != model]
    
    for mod in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{mod}:generateContent?key={key}"
        payload = {
            "contents": [{
                "parts": [{"text": prompt}]
            }],
            "generationConfig": {
                "temperature": 0.85,
                "topP": 0.95,
                "maxOutputTokens": 800
            }
        }
        try:
            resp = requests.post(url, json=payload, timeout=12)
            if resp.status_code == 200:
                data = resp.json()
                raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                # Clean possible markdown wrapping
                if raw_text.startswith("```"):
                    raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text)
                    raw_text = re.sub(r"\s*```$", "", raw_text)
                parsed = json.loads(raw_text)
                
                # Normalize lucky_number
                num_str = str(parsed.get("lucky_number", "68")).strip()
                if num_str.isdigit():
                    parsed["lucky_number"] = f"{int(num_str):02d}"
                else:
                    parsed["lucky_number"] = "68"
                    
                parsed["source"] = "gemini_api"
                parsed["ai_model"] = mod
                return parsed
            else:
                print(f"[AI Oracle] Gemini model {mod} returned {resp.status_code}: {resp.text[:120]}")
        except Exception as e:
            print(f"[AI Oracle] Error with model {mod}: {e}")

    # If all API attempts fail, fallback gracefully
    print("[AI Oracle] Falling back to intelligent heuristic oracle...")
    fallback = generate_heuristic_fortune(user_text)
    fallback["api_notice"] = "Đã chuyển sang Thầy Bói Heuristic do kết nối API Gemini gặp sự cố hoặc vượt giới hạn."
    return fallback

# ==============================================================================
# SỔ MƠ TOÀN TẬP DÂN GIAN & AI SEARCH
# ==============================================================================

def search_dream_book(query='', category=''):
    """
    Searches the comprehensive folk dream book by keyword or category.
    Returns filtered dream list.
    """
    file_path = os.path.join(os.path.dirname(__file__), 'data', 'dream_book.json')
    if not os.path.exists(file_path):
        return []
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        dreams = data.get('dreams', [])
    except Exception as e:
        print(f"[DreamBook Error] {e}")
        return []

    q = (query or '').strip().lower()
    cat = (category or '').strip().lower()

    results = []
    for d in dreams:
        if cat and cat != 'all' and d.get('category', '').lower() != cat:
            continue
        if q:
            combined = f"{d.get('title', '')} {d.get('meaning', '')} {d.get('advice', '')} {' '.join(d.get('numbers', []))}".lower()
            if q not in combined:
                continue
        results.append(d)
    return results

# ==============================================================================
# ĐÀM ĐẠO VỚI THẦY BÓI AI (MULTI-TURN CHAT ORACLE)
# ==============================================================================

ORACLE_SYSTEM_PROMPT = """Bạn là "Thầy Bói AI & Chuyên Gia Phong Thủy 4.0", do Bùi Huy Hoàng phát triển.
Xưng hô: Tự xưng "Thầy", gọi người hỏi là "Con" hoặc "Thí chủ".
QUY TẮC CỐT TỬ: Trả lời RÕ RÀNG, SÚC TÍCH, DỄ NHÌN, KHÔNG DÔNG DÀI, KHÔNG RỐI MẮT.

BẮT BUỘC trình bày theo đúng cấu trúc 3 phần sau (dùng icon và gạch đầu dòng rõ ràng):

🔮 **Lời Phán:**
(1-2 câu nhận định ngắn gọn, thấu hiểu, hóm hỉnh và đi thẳng vào câu hỏi của con)

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** (1 hành động thiết thực, tích cực)
• **Việc nên kiêng:** (1 điều cần tránh ngắn gọn)
• **Phong thủy trợ mệnh:** (Hướng xuất hành / Giờ tốt / Màu sắc may mắn ngắn gọn)

🎲 **Con Số Tài Lộc:**
[Số lộc] (Ví dụ: [ 68 ] hoặc [ 68 - 86 ]) • (Lời chúc ngắn gọn 1 câu)

Yêu cầu nghiêm ngặt:
- Tổng độ dài toàn bài dưới 120 từ.
- Mỗi mục phải xuống dòng rõ ràng, không gộp thành một khối văn bản dài ngoằng."""

def generate_heuristic_chat_response(last_message):
    """
    Generates structured, clean, witty offline responses based on intent detection.
    Formatted into 3 distinct, beautiful sections.
    """
    msg = (last_message or '').lower().strip()

    # Intent: GREETING (Chào hỏi)
    if any(k in msg for k in ['chào', 'hello', 'hi', 'thầy ơi', 'bắt đầu', 'alo']):
        return """🔮 **Lời Phán:**
A di đà Phật! Cơ duyên lành đưa lối con ghé thăm am thất Thầy Bói AI 4.0 hôm nay. Thầy thấy hào quang quanh con rất sáng, vận hội mới đang bắt đầu!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Nhấp ngụm trà ấm, thả lỏng tâm trí và kể thầy nghe điều con băn khoăn nhất.
• **Việc nên kiêng:** Chớ để âu lo công việc làm phiền bữa ăn giấc ngủ.
• **Phong thủy trợ mệnh:** Hướng xuất hành tốt hôm nay là Đông Nam, giờ hoàng đạo giờ Thìn (7h-9h).

🎲 **Con Số Tài Lộc:**
[ 68 - 86 ] • Chúc con vạn sự hanh thông, khởi đầu đại cát!"""

    # Intent: TÌNH DUYÊN / TÌNH CẢM
    if any(k in msg for k in ['người yêu', 'tình duyên', 'tình cảm', 'ế', 'crush', 'chia tay', 'cưới', 'bồ', 'hẹn hò', 'yêu']):
        return """🔮 **Lời Phán:**
Đường tơ duyên của con như sóng mạng 5G vậy, thỉnh thoảng hơi mất kết nối một tẹo nhưng khi bắt trúng tần số thì hạnh phúc ngập tràn!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Yêu thương bản thân nhiều hơn, mỉm cười tự tin khi ra ngoài.
• **Việc nên kiêng:** Đừng níu kéo quá khứ đã qua, không cưỡng cầu điều không thuộc về mình.
• **Phong thủy trợ mệnh:** Hợp trang phục màu hồng phấn hoặc trắng thanh khiết, hướng đào hoa phía Đông.

🎲 **Con Số Tài Lộc:**
[ 27 - 72 ] • Duyên lành sẽ tự tìm tới đúng lúc, an tâm con nhé!"""

    # Intent: TIỀN BẠC / TÀI LỘC / LÀM ĂN
    if any(k in msg for k in ['tiền', 'tài lộc', 'giàu', 'nghèo', 'làm ăn', 'kinh doanh', 'nợ', 'lương', 'đầu tư', 'ví']):
        return """🔮 **Lời Phán:**
Thần tài đang trên đường vận chuyển lộc đến nhà con, đường trần có thể hơi kẹt xe nhưng chắc chắn sẽ giao tận tay!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Mạnh dạn đề xuất ý tưởng sáng tạo trong công việc, lập sổ tiết kiệm kỷ luật.
• **Việc nên kiêng:** Tuyệt đối không nghe lời rủ rê đầu tư rủi ro hoặc cho người lạ vay mượn.
• **Phong thủy trợ mệnh:** Giờ hoàng đạo kích tài là giờ Thân (15h-17h), màu vàng kim phát lộc.

🎲 **Con Số Tài Lộc:**
[ 39 - 79 ] • Tiền vào như nước sông Đà, tiền ra nhỏ giọt!"""

    # Intent: GIẤC MƠ / CHIÊM BAO
    if any(k in msg for k in ['mơ', 'mộng', 'chiêm bao', 'ngủ thấy']):
        return """🔮 **Lời Phán:**
Giấc mơ này là bức mật thư tiềm thức báo hiệu vận trình của con sắp có bước chuyển mình rực rỡ từ tĩnh sang động!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Tin vào giác quan thứ sáu của mình, chớp lấy cơ hội đầu tiên xuất hiện hôm nay.
• **Việc nên kiêng:** Đừng suy diễn quá mức làm ảnh hưởng đến tinh thần làm việc.
• **Phong thủy trợ mệnh:** Sang tab "Sổ Mơ Toàn Tập" để tra cứu thêm ý nghĩa chi tiết các con số linh ứng.

🎲 **Con Số Tài Lộc:**
[ 14 - 59 ] • Điềm lành hiển hiện, vạn sự cát tường!"""

    # Intent: XUẤT HÀNH / GIỜ HOÀNG ĐẠO / HƯỚNG TỐT
    if any(k in msg for k in ['xuất hành', 'giờ tốt', 'giờ hoàng đạo', 'hướng', 'ngày tốt', 'đi đâu']):
        return """🔮 **Lời Phán:**
Hôm nay thiên can địa chi tương hợp, trời đất mở cửa đón sinh khí tốt lành cho những ai chủ động bước tới!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Bước chân phải ra cửa trước, nở một nụ cười tươi với người đầu tiên gặp mặt.
• **Việc nên kiêng:** Tránh tranh cãi va chạm giao thông, nhường nhịn một bước trời cao biển rộng.
• **Phong thủy trợ mệnh:** Giờ đẹp nhất là 8h30 - 10h00 sáng, hướng đón Hỷ Thần là hướng Đông Nam.

🎲 **Con Số Tài Lộc:**
[ 18 - 81 ] • Đi một ngày đàng, rước một sàng tài lộc!"""

    # Intent: MÀU SẮC / BẢN MỆNH / PHONG THỦY
    if any(k in msg for k in ['màu', 'mệnh', 'hợp màu', 'phong thủy', 'mặc', 'đồ']):
        return """🔮 **Lời Phán:**
Ngũ hành hôm nay tương sinh mạnh mẽ, chọn đúng sắc diện sẽ giúp con đẩy lùi tà khí và thu hút quý nhân trợ vận!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Mặc trang phục có tông màu Vàng kim, Tím huyền bí hoặc Trắng ngọc thanh thoát.
• **Việc nên kiêng:** Tránh diện đồ đen xì hoặc u ám làm suy giảm sinh khí từ trường.
• **Phong thủy trợ mệnh:** Đeo thêm đồng hồ kim loại hoặc vòng phong thủy sáng màu ở tay trái.

🎲 **Con Số Tài Lộc:**
[ 08 - 88 ] • Khí sắc rạng ngời, tài vận bừng sáng!"""

    # Intent: BUỒN PHIỀN / ÁP LỰC / CĂNG THẲNG
    if any(k in msg for k in ['buồn', 'mệt', 'chán', 'áp lực', 'stress', 'khóc', 'khổ', 'nản']):
        return """🔮 **Lời Phán:**
Thầy nhìn thấy bờ vai con đang gánh nhiều toan tính. Nhưng con hãy nhớ: Qua cơn bĩ cực ắt đến hồi thái lai, đoạn dốc khó nhất sắp vượt qua rồi!

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Uống ngay 1 cốc nước ấm, thở sâu 3 nhịp và tự thưởng cho mình một bữa ăn thật ngon.
• **Việc nên kiêng:** Không thức khuya quá 23h, việc chưa giải quyết được hôm nay cứ để mai tính!
• **Phong thủy trợ mệnh:** Dành 10 phút đi dạo dưới bóng cây xanh để nạp lại nguồn năng lượng an lành.

🎲 **Con Số Tài Lộc:**
[ 33 - 77 ] • Bình an trong tâm chính là phong thủy tốt nhất!"""

    # DEFAULT (Mặc định cho các câu hỏi khác)
    lucky = random.choice(["68 - 86", "39 - 79", "12 - 21", "24 - 42", "58 - 85"])
    return f"""🔮 **Lời Phán:**
Vạn sự tùy duyên! Quẻ bói chỉ ra điều con đang băn khoăn sẽ sớm tìm được đáp án sáng tỏ trong 2-3 ngày tới.

🧭 **Chỉ Điểm Hành Động:**
• **Việc nên làm:** Giữ vững lập trường, kiên nhẫn hoàn thành từng mục tiêu nhỏ đã định.
• **Việc nên kiêng:** Chớ nghe theo lời bàn tán bên ngoài làm lung lay ý chí của bản thân.
• **Phong thủy trợ mệnh:** Không gian làm việc thoáng đãng, hướng Tây Nam mang lại cơ hội bất ngờ.

🎲 **Con Số Tài Lộc:**
[ {lucky} ] • Giữ trọn niềm tin, phúc đức ắt tự sinh sôi!"""

def chat_with_oracle(messages, api_key=None, model="gemini-3.8-flash"):
    """
    Handles multi-turn dialogue with AI Fortune Oracle.
    Uses Gemini API when available, falls back to Heuristic Chatbot smoothly.
    """
    key = api_key or os.getenv("GEMINI_API_KEY")
    last_user_msg = ""
    for m in reversed(messages):
        if m.get("role") == "user":
            last_user_msg = m.get("text", "")
            break

    if not key or key.strip() == "":
        reply = generate_heuristic_chat_response(last_user_msg)
        return {
            "success": True,
            "reply": reply,
            "source": "heuristic_oracle",
            "model": "Thầy Bói Dân Gian AI (Offline Chatbot)"
        }

    # Format history for Gemini API
    gemini_contents = []
    for m in messages[-8:]:  # Keep recent context
        role = "user" if m.get("role") == "user" else "model"
        text = m.get("text", "").strip()
        if text:
            gemini_contents.append({
                "role": role,
                "parts": [{"text": text}]
            })

    if not gemini_contents:
        gemini_contents.append({
            "role": "user",
            "parts": [{"text": "Chào Thầy Bói AI!"}]
        })

    candidate_models = [model] + [m for m in DEFAULT_MODELS if m != model]
    for mod in candidate_models:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{mod}:generateContent?key={key}"
        payload = {
            "system_instruction": {
                "parts": [{"text": ORACLE_SYSTEM_PROMPT}]
            },
            "contents": gemini_contents,
            "generationConfig": {
                "temperature": 0.85,
                "topP": 0.95,
                "maxOutputTokens": 600
            }
        }
        try:
            resp = requests.post(url, json=payload, timeout=12)
            if resp.status_code == 200:
                data = resp.json()
                reply_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                return {
                    "success": True,
                    "reply": reply_text,
                    "source": "gemini_api",
                    "model": mod
                }
            else:
                print(f"[AI Chat] Model {mod} error {resp.status_code}: {resp.text[:120]}")
        except Exception as e:
            print(f"[AI Chat] Exception with {mod}: {e}")

    # Fallback if API fails
    reply = generate_heuristic_chat_response(last_user_msg)
    return {
        "success": True,
        "reply": reply,
        "source": "heuristic_oracle",
        "model": "Thầy Bói Dân Gian AI (Dự phòng)"
    }

# ==============================================================================
# THẦN SỐ HỌC PYTHAGORAS & NGÀY SINH (NUMEROLOGY)
# ==============================================================================

PYTHAGOREAN_LETTER_VALUES = {
    'A': 1, 'J': 1, 'S': 1,
    'B': 2, 'K': 2, 'T': 2,
    'C': 3, 'L': 3, 'U': 3,
    'D': 4, 'M': 4, 'V': 4,
    'E': 5, 'N': 5, 'W': 5,
    'F': 6, 'O': 6, 'X': 6,
    'G': 7, 'P': 7, 'Y': 7,
    'H': 8, 'Q': 8, 'Z': 8,
    'I': 9, 'R': 9
}

NUMEROLOGY_PROFILES = {
    "2": {
        "title": "Sứ Giả Hòa Bình & Trực Giác Tinh Tế",
        "description": "Bạn sở hữu trực giác bẩm sinh cực kỳ nhạy bén, giàu lòng trắc ẩn, yêu chuộng hòa bình và khả năng kết nối tuyệt vời. Trong tài chính, bạn thích sự an toàn, bền vững.",
        "lucky_numbers": ["02", "20", "22", "12", "92"],
        "element": "Thủy (Dịu dàng nuôi dưỡng, lộc bền vững)",
        "career": "Ngoại giao, đàm phán, tâm lý, nghệ thuật, cố vấn"
    },
    "3": {
        "title": "Tâm Hồn Nghệ Sĩ & Ngọn Lửa Hài Hước",
        "description": "Bạn là linh hồn của các bữa tiệc với trí tưởng tượng bay bổng, tư duy nhạy bén và khiếu hài hước tự nhiên. Tiền tài đến với bạn qua giao tiếp và sáng tạo.",
        "lucky_numbers": ["03", "30", "33", "36", "39"],
        "element": "Hỏa (Sôi động sáng chói, lộc phát bất ngờ)",
        "career": "Truyền thông, marketing, sáng tạo nội dung, diễn xuất, kinh doanh"
    },
    "4": {
        "title": "Kỷ Luật Sắt & Bàn Thạch Thực Tế",
        "description": "Vững chãi, đáng tin cậy và có óc tổ chức hàng đầu. Bạn xây dựng tài sản từ những viên gạch vững chắc nhất và ghét sự may rủi mạo hiểm.",
        "lucky_numbers": ["04", "40", "44", "14", "84"],
        "element": "Thổ (Vững như bàn thạch, tích lũy vàng ròng)",
        "career": "Quản lý, kỹ thuật, tài chính, kiểm toán, xây dựng, kiến trúc"
    },
    "5": {
        "title": "Cánh Chim Tự Do & Bậc Thầy Thích Ứng",
        "description": "Yêu tự do, thích phiêu lưu và ghét sự rập khuôn. Bạn có giác quan thứ sáu cực nhạy bén với cơ hội kiếm tiền mới lạ và bất ngờ.",
        "lucky_numbers": ["05", "50", "55", "25", "75"],
        "element": "Mộc (Vươn cao đón nắng, lộc nảy mầm không ngừng)",
        "career": "Du lịch, xuất nhập khẩu, khởi nghiệp, tự do (freelancer), sự kiện"
    },
    "6": {
        "title": "Trái Tim Yêu Thương & Vòng Tay Che Chở",
        "description": "Mang tình mẫu tử/phụ tử bao la, giàu tính thẩm mỹ và luôn muốn chăm lo cho gia đình. Phúc đức từ tâm mang lại của cải dồi dào.",
        "lucky_numbers": ["06", "60", "66", "36", "96"],
        "element": "Kim (Sáng đẹp thuần khiết, lộc gia đạo bình an)",
        "career": "Giáo dục, y tế, thiết kế nội thất, ẩm thực, tổ chức phi lợi nhuận"
    },
    "7": {
        "title": "Người Kiếm Tìm Chân Lý & Bậc Triết Nhân",
        "description": "Chiêm nghiệm sâu sắc, thích nghiên cứu quy luật vũ trụ. Sau những thăng trầm thử thách, bạn tích lũy được kho tàng trí tuệ và tài sản đáng nể.",
        "lucky_numbers": ["07", "70", "77", "37", "79"],
        "element": "Thủy (Biển sâu huyền bí, lộc sâu sắc ngấm dần)",
        "career": "Nghiên cứu khoa học, triết học, công nghệ, phân tích dữ liệu, giảng dạy"
    },
    "8": {
        "title": "Bản Lĩnh Thủ Lĩnh & Năng Lực Tài Chính Đỉnh Cao",
        "description": "Con số của sự thịnh vượng, quyền lực và tự chủ tài chính. Bạn sinh ra để làm chủ cuộc chơi, có trực giác bén ngọt với các con số.",
        "lucky_numbers": ["08", "80", "88", "28", "68"],
        "element": "Kim (Vàng ròng phát tài, hút lộc tứ phương)",
        "career": "CEO, giám đốc tài chính, đầu tư, ngân hàng, bất động sản"
    },
    "9": {
        "title": "Hoài Bão Lớn & Trái Tim Bồ Tát",
        "description": "Rộng lượng, nhân đạo và luôn hướng về đại cục. Càng cho đi bạn càng nhận lại nhiều phúc lộc ngoài sức tưởng tượng.",
        "lucky_numbers": ["09", "90", "99", "19", "89"],
        "element": "Hỏa (Ngọn lửa ấm áp, lộc từ phúc đức tổ tiên)",
        "career": "Nhà hoạt động xã hội, giáo dục đại học, y bác sĩ, lãnh đạo cộng đồng"
    },
    "10": {
        "title": "Khí Chất Tiên Phong & Khả Năng Thích Nghi Vô Tận",
        "description": "Tự tin, quyết đoán, dễ dàng vượt qua nghịch cảnh và tái sinh mạnh mẽ. Bạn luôn là người dẫn đầu xu hướng.",
        "lucky_numbers": ["01", "10", "11", "21", "91"],
        "element": "Kim (Kim cương lấp lánh, bản lĩnh tiên phong)",
        "career": "Nhà sáng lập, quản lý cấp cao, bán hàng xuất chúng, thể thao"
    },
    "11": {
        "title": "Bậc Thầy Trực Giác & Giác Ngộ Tâm Linh",
        "description": "Tần số năng lượng tâm linh cực cao, giác quan thứ sáu siêu phàm. Bạn thường có những giấc mơ tiên tri chính xác đến kinh ngạc.",
        "lucky_numbers": ["11", "22", "66", "77", "99"],
        "element": "Thần Khí (Tâm linh chỉ đường, giác quan thứ 6)",
        "career": "Chuyên gia tâm lý, nhà trị liệu, tâm linh, cố vấn chiến lược"
    },
    "22": {
        "title": "Master Builder - Kiến Trúc Sư Đại Tài",
        "description": "Con số quyền lực bậc nhất Pythagoras. Bạn có năng lực biến những ý tưởng vĩ mô táo bạo thành hiện thực với khối tài sản khổng lồ.",
        "lucky_numbers": ["22", "44", "88", "24", "42"],
        "element": "Đại Địa (Kiến tạo giang sơn, kho báu vô tận)",
        "career": "Chính khách, nhà phát triển hạ tầng, tỷ phú công nghiệp, kiến trúc sư trưởng"
    },
    "33": {
        "title": "Master Teacher - Năng Lượng Chữa Lành Vũ Trụ",
        "description": "Lòng trắc ẩn vô bờ bến và trách nhiệm phụng sự cộng đồng. Tấm lòng Bồ tát đem lại hào quang may mắn chở che trọn đời.",
        "lucky_numbers": ["33", "66", "99", "36", "63"],
        "element": "Quang Minh (Ánh sáng cứu rỗi, đại phúc đại lộc)",
        "career": "Bậc thầy truyền cảm hứng, bác sĩ thiện nguyện, nghệ sĩ nhân dân"
    }
}

PERSONAL_YEAR_ADVICE = {
    1: "Năm khởi đầu chu kỳ 9 năm: Năm của hành động, gieo mầm dự án mới, tự tin bứt phá!",
    2: "Năm của kết nối và hợp tác: Học cách lắng nghe, xây dựng quan hệ bền chặt, tài lộc êm đềm.",
    3: "Năm của bùng nổ sáng tạo: Giao lưu mở rộng, tinh thần lạc quan, cơ hội kiếm tiền bất ngờ.",
    4: "Năm củng cố nền tảng: Tập trung kỷ luật, tiết kiệm, tránh đầu tư mạo hiểm không kiểm soát.",
    5: "Năm của thay đổi và tự do: Cơ hội dịch chuyển, công tác, đón nhận luồng gió mới thịnh vượng.",
    6: "Năm của gia đình và yêu thương: Đón tin vui gia đạo, lộc từ người thân và đối tác tin cậy.",
    7: "Năm của chiêm nghiệm và tĩnh lặng: Học tập, nâng cao kỹ năng nội tại, đúc rút bài học vàng.",
    8: "Năm của tiền tài và quyền lực: Đỉnh cao tài chính trong chu kỳ 9 năm! Tự tin gặt hái thành quả lớn.",
    9: "Năm khép lại và viên mãn: Hoàn tất các dự án tồn đọng, tha thứ, bao dung và đón chào chu kỳ mới."
}

def remove_vietnamese_accents(text):
    import unicodedata
    if not text:
        return ""
    nfkd = unicodedata.normalize('NFKD', text)
    res = ''.join([c for c in nfkd if not unicodedata.combining(c)])
    return res.replace('đ', 'd').replace('Đ', 'D')

def reduce_number(n, keep_master=True):
    while n > 9:
        if keep_master and n in (11, 22, 33):
            return n
        n = sum(int(d) for d in str(n))
    return n

def calculate_numerology(birth_date_str, full_name=''):
    """
    Calculates comprehensive Pythagorean Numerology:
    - Life Path Number (Con Số Chủ Đạo)
    - Personal Year 2026 (Năm Cá Nhân)
    - Soul Urge (Số Linh Hồn), Personality (Số Biểu Đạt), Destiny (Số Sứ Mệnh)
    - Birth Chart Matrix (Biểu Đồ Ngày Sinh 3x3) & Arrows
    - Lucky Numbers & Element
    """
    import datetime
    
    day, month, year = 1, 1, 2000
    m = re.search(r'(\d{1,4})[-/.](\d{1,2})[-/.](\d{1,4})', str(birth_date_str))
    if m:
        parts = [int(p) for p in m.groups()]
        if parts[0] > 1900:
            year, month, day = parts[0], parts[1], parts[2]
        else:
            day, month, year = parts[0], parts[1], parts[2]
    else:
        nums = [int(x) for x in re.findall(r'\d+', str(birth_date_str))]
        if len(nums) >= 3:
            day, month, year = nums[0], nums[1], nums[2]
            if day > 1900: day, year = year, day

    d_red = reduce_number(day, keep_master=False)
    m_red = reduce_number(month, keep_master=False)
    y_red = reduce_number(year, keep_master=False)
    
    total = d_red + m_red + y_red
    life_path = reduce_number(total, keep_master=True)
    if life_path == 1:
        life_path = 10
        
    life_path_str = str(life_path)
    profile = NUMEROLOGY_PROFILES.get(life_path_str, NUMEROLOGY_PROFILES["8"])

    current_year = datetime.datetime.now().year
    py_total = d_red + m_red + reduce_number(current_year, keep_master=False)
    personal_year = reduce_number(py_total, keep_master=False)
    py_advice = PERSONAL_YEAR_ADVICE.get(personal_year, "Năm nhiều vận may và cơ hội bứt phá!")

    date_digits = f"{day:02d}{month:02d}{year}"
    matrix_counts = {str(i): date_digits.count(str(i)) for i in range(1, 10)}
    
    arrows = []
    if matrix_counts['1'] > 0 and matrix_counts['2'] > 0 and matrix_counts['3'] > 0:
        arrows.append("🏹 Mũi tên Kế hoạch (1-2-3): Có trật tự, phương pháp làm việc khoa học")
    elif matrix_counts['1'] == 0 and matrix_counts['2'] == 0 and matrix_counts['3'] == 0:
        arrows.append("⚠️ Trống Mũi tên Kế hoạch: Cần rèn luyện tính ngăn nắp và lập kế hoạch rõ ràng")
        
    if matrix_counts['4'] > 0 and matrix_counts['5'] > 0 and matrix_counts['6'] > 0:
        arrows.append("🏹 Mũi tên Ý chí (4-5-6): Kiên cường, bất khuất trước mọi sóng gió")
        
    if matrix_counts['7'] > 0 and matrix_counts['8'] > 0 and matrix_counts['9'] > 0:
        arrows.append("🏹 Mũi tên Hoạt bát (7-8-9): Năng động, thích khám phá và hành động ngay")
        
    if matrix_counts['1'] > 0 and matrix_counts['5'] > 0 and matrix_counts['9'] > 0:
        arrows.append("🏹 Mũi tên Quyết tâm (1-5-9): Kiên định theo đuổi mục tiêu đến cùng")
        
    if matrix_counts['3'] > 0 and matrix_counts['6'] > 0 and matrix_counts['9'] > 0:
        arrows.append("🏹 Mũi tên Sáng suốt (3-6-9): Trí tuệ nhạy bén, tư duy logic và trí nhớ tốt")
        
    if matrix_counts['2'] > 0 and matrix_counts['5'] > 0 and matrix_counts['8'] > 0:
        arrows.append("🏹 Mũi tên Nhạy cảm (2-5-8): Trực giác tâm hồn sâu sắc, đồng cảm tuyệt vời")

    if not arrows:
        arrows.append("✨ Năng lượng các con số hòa hợp, linh hoạt theo từng hoàn cảnh")

    name_clean = remove_vietnamese_accents(full_name).upper()
    letters = [c for c in name_clean if c in PYTHAGOREAN_LETTER_VALUES]
    
    soul_val = 0
    pers_val = 0
    dest_val = 0
    vowels = set(['A', 'E', 'I', 'O', 'U', 'Y'])
    
    for c in letters:
        val = PYTHAGOREAN_LETTER_VALUES[c]
        dest_val += val
        if c in vowels:
            soul_val += val
        else:
            pers_val += val
            
    soul_num = reduce_number(soul_val, keep_master=True) if soul_val > 0 else None
    pers_num = reduce_number(pers_val, keep_master=True) if pers_val > 0 else None
    dest_num = reduce_number(dest_val, keep_master=True) if dest_val > 0 else None

    return {
        "birth_date": f"{day:02d}/{month:02d}/{year}",
        "full_name": full_name.strip() or "Ẩn Danh Chi Sĩ",
        "life_path_number": life_path,
        "title": profile["title"],
        "description": profile["description"],
        "element": profile["element"],
        "career_orientation": profile["career"],
        "lucky_numbers": profile["lucky_numbers"],
        "personal_year_2026": personal_year,
        "personal_year_advice": py_advice,
        "matrix_counts": matrix_counts,
        "arrows": arrows,
        "name_numbers": {
            "soul_urge": soul_num,
            "personality": pers_num,
            "destiny": dest_num
        } if letters else None
    }

# ==============================================================================
# MULTIMODAL AI VISION (SOI CẦU QUA HÌNH ẢNH)
# ==============================================================================

def call_gemini_vision(image_base64_data, mime_type="image/jpeg", caption="", api_key=None, model="gemini-2.5-flash"):
    """
    Multimodal Gemini Vision Oracle: Decodes mystical omens and signs from images.
    """
    key = api_key or os.getenv("GEMINI_API_KEY")
    clean_b64 = re.sub(r"^data:image\/[a-zA-Z]+;base64,", "", image_base64_data).strip()

    prompt = f"""
Bạn là Thầy Bói AI & Chuyên Gia Phong Thủy Số Học đại tài.
Người dùng gửi một bức ảnh kèm tâm sự: \"\"\"{caption}\"\"\".
Hãy soi kỹ từng chi tiết trong bức ảnh (con vật, đồ vật, số nhà, biển số xe, màu sắc chủ đạo, thời điểm, thần thái...), giải mã điềm báo phong thủy / tâm linh một cách cực kỳ hóm hỉnh, sâu sắc và tích cực.
BẮT BUỘC trả về DUY NHẤT một chuỗi JSON thuần túy (không bọc trong markdown ```json ```, không kèm lời dẫn), có các trường chính xác như sau:
{{
  "vision_description": "Mô tả chi tiết những gì Thầy Bói nhìn thấy trong ảnh bằng giọng văn hài hước, sắc sảo",
  "prophecy": "Lời phán quẻ cát tường dựa trên hình ảnh (1-2 câu)",
  "lucky_number": "Một con số duy nhất từ 00 đến 99, 2 chữ số (ví dụ: '68')",
  "lucky_pair": ["số chính", "số lộn hoặc bóng âm dương"],
  "reason": "Luận giải điềm báo hình ảnh ứng với các con số này cực kỳ thuyết phục và bá đạo",
  "element": "Ngũ hành phong thủy hợp mệnh",
  "action_advice": "Lời khuyên hành động hôm nay"
}}
"""

    if key and clean_b64:
        candidate_models = [model, "gemini-2.5-flash", "gemini-1.5-flash", "gemini-3.8-flash"]
        for mod in candidate_models:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/{mod}:generateContent?key={key}"
            payload = {
                "contents": [{
                    "parts": [
                        {"text": prompt},
                        {
                            "inline_data": {
                                "mime_type": mime_type or "image/jpeg",
                                "data": clean_b64
                            }
                        }
                    ]
                }],
                "generationConfig": {
                    "temperature": 0.85,
                    "topP": 0.95,
                    "maxOutputTokens": 800
                }
            }
            try:
                resp = requests.post(url, json=payload, timeout=18)
                if resp.status_code == 200:
                    data = resp.json()
                    raw_text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                    if raw_text.startswith("```"):
                        raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text)
                        raw_text = re.sub(r"\s*```$", "", raw_text)
                    parsed = json.loads(raw_text)
                    num_str = str(parsed.get("lucky_number", "68")).strip()
                    parsed["lucky_number"] = f"{int(num_str):02d}" if num_str.isdigit() else "68"
                    parsed["source"] = "gemini_vision"
                    parsed["ai_model"] = mod
                    return parsed
                else:
                    print(f"[Vision Oracle] {mod} returned {resp.status_code}: {resp.text[:120]}")
            except Exception as e:
                print(f"[Vision Oracle] Error with {mod}: {e}")

    # Fallback Heuristic Vision
    print("[Vision Oracle] Using intelligent heuristic vision fallback...")
    text_to_seed = caption or "anh_diem_bao_may_man"
    fallback = generate_heuristic_fortune(text_to_seed)
    fallback["vision_description"] = f"Bức ảnh toát lên linh khí huyền bí, vượng khí ngập tràn quanh tâm niệm: '{caption or 'Điềm báo vũ trụ'}'. Các luân xa vũ trụ đang soi rọi vào điềm lành này!"
    fallback["source"] = "heuristic_vision"
    fallback["ai_model"] = "Thầy Bói Heuristic Vision (Dự phòng)"
    return fallback

if __name__ == '__main__':
    import io
    sys_out = io.TextIOWrapper(os.sys.stdout.buffer, encoding='utf-8')
    sys_out.write("Testing Heuristic Fortune...\n")
    res = generate_heuristic_fortune("Đêm qua nằm mơ thấy bắt được con rùa vàng bơi trên sông")
    sys_out.write(json.dumps(res, indent=2, ensure_ascii=False) + "\n")



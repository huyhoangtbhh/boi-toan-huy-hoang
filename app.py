import os
from datetime import datetime
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv

from scraper import (
    get_kqxsmb_30days, 
    get_kqxsmb_data,
    get_historical_gan_records,
    get_matrix_100_heatmap,
    analyze_lottery_data,
    get_structured_draw,
    get_all_draws_summary,
    analyze_dau_duoi_aggregate,
    analyze_lo_roi,
    analyze_bac_nho,
    analyze_cap_di_cung_nhau,
    analyze_pascal_triangle,
    analyze_tong_de,
    analyze_xien_3,
    fetch_live_kqxsmb
)
from ai_oracle import (
    call_gemini_api, 
    generate_heuristic_fortune,
    search_dream_book,
    chat_with_oracle,
    calculate_numerology,
    call_gemini_vision
)

# Load environment
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'ai-fortune-lottery-secret-key-2026')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/favicon.ico')
def favicon():
    return ('', 204)

@app.route('/api/fortune', methods=['POST'])
def fortune():
    """
    Main endpoint: Receives user thoughts/dream/mood, gets AI fortune prophecy & lucky number,
    and correlates it with real 30-day lottery statistics.
    """
    try:
        data = request.get_json(force=True, silent=True) or {}
        user_text = data.get('text', '').strip()
        custom_api_key = data.get('api_key', '').strip()
        model = data.get('model', 'gemini-3.8-flash').strip()

        if not user_text:
            return jsonify({
                'success': False,
                'error': 'Vui lòng nhập đoạn tâm sự, giấc mơ hoặc suy nghĩ của bạn!'
            }), 400

        # 1. AI Fortuneteller Analysis
        fortune_res = call_gemini_api(user_text, api_key=custom_api_key, model=model)
        lucky_number = fortune_res.get('lucky_number', '68')

        # 2. Multi-Horizon Lottery Data Analytics (30, 60, or 100 days)
        timeframe = int(data.get('timeframe', 30))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        lottery_stats = analyze_lottery_data(lucky_number, days_data)

        # 3. Analyze complementary/pair number if available
        pair_stats = None
        lucky_pair = fortune_res.get('lucky_pair', [])
        if lucky_pair and len(lucky_pair) >= 2:
            companion_num = lucky_pair[1] if lucky_pair[0] == lucky_number else lucky_pair[0]
            if companion_num != lucky_number:
                companion_analysis = analyze_lottery_data(companion_num, days_data)
                pair_stats = {
                    'number': companion_num,
                    'total_hits': companion_analysis['total_hits'],
                    'status_label': companion_analysis['status_label'],
                    'days_unseen': companion_analysis['days_unseen']
                }

        return jsonify({
            'success': True,
            'fortune': fortune_res,
            'lottery_stats': lottery_stats,
            'pair_stats': pair_stats,
            'lottery_updated': last_updated,
            'timeframe': len(days_data)
        })

    except Exception as e:
        print(f"[API Error] /api/fortune error: {e}")
        return jsonify({
            'success': False,
            'error': f'Đã xảy ra lỗi trong quá trình xin quẻ: {str(e)}'
        }), 500

@app.route('/api/lottery/analyze', methods=['GET'])
def analyze_custom_number():
    """
    Inspects stats for any arbitrary number 00-99 across selected timeframe.
    """
    try:
        number = request.args.get('number', '').strip()
        timeframe = int(request.args.get('timeframe', 30))
        if not number or not number.isdigit() or not (0 <= int(number) <= 99):
            return jsonify({
                'success': False,
                'error': 'Số không hợp lệ! Vui lòng nhập số từ 00 đến 99.'
            }), 400

        formatted_num = f"{int(number):02d}"
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        stats = analyze_lottery_data(formatted_num, days_data)

        return jsonify({
            'success': True,
            'stats': stats,
            'timeframe': len(days_data),
            'lottery_updated': last_updated
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/lottery/overview', methods=['GET'])
def lottery_overview():
    """
    Returns general summary, top hot, top gan, and latest draw info for requested timeframe.
    """
    try:
        timeframe = int(request.args.get('timeframe', 30))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        sample_stats = analyze_lottery_data('00', days_data)
        latest_day = days_data[0] if days_data else {}

        return jsonify({
            'success': True,
            'total_days': len(days_data),
            'last_updated': last_updated,
            'latest_draw': {
                'date': latest_day.get('date', 'N/A'),
                'special_prize': latest_day.get('special_prize', 'N/A'),
                'special_loto': latest_day.get('special_loto', 'N/A')
            },
            'top_5_hot': sample_stats['top_5_hot'],
            'top_5_gan': sample_stats['top_5_gan'],
            'average_frequency': sample_stats['average_frequency']
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/lottery/matrix-100', methods=['GET'])
def lottery_matrix_100():
    """
    Returns 100-number interactive heatmap matrix (00-99) with hot/gan status and historical records.
    """
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        matrix_data = get_matrix_100_heatmap(days_data)
        return jsonify({
            'success': True,
            'timeframe': len(days_data),
            'last_updated': last_updated,
            'matrix': matrix_data.get('matrix', []),
            'hot_count': matrix_data.get('hot_count', 0),
            'gan_count': matrix_data.get('gan_count', 0),
            'data': matrix_data
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/historical-records', methods=['GET'])
def historical_records():
    """Returns 10-15 year Gan records for all numbers."""
    try:
        records = get_historical_gan_records()
        return jsonify({
            'success': True,
            'total': len(records),
            'records': records
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/refresh', methods=['POST'])
def refresh_lottery():
    """
    Forces a fresh crawl of KQXSMB from the web.
    """
    try:
        days_data, last_updated = get_kqxsmb_data(timeframe=100, force_refresh=True)
        return jsonify({
            'success': True,
            'message': f'Đã cập nhật thành công {len(days_data)} ngày kết quả xổ số mới nhất!',
            'total_days': len(days_data),
            'last_updated': last_updated
        })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f'Lỗi khi làm mới dữ liệu: {str(e)}'
        }), 500

@app.route('/api/lottery/draws', methods=['GET'])
def get_draws():
    """Returns summary list of all draws for date selection."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        draws = get_all_draws_summary(days_data)
        return jsonify({
            'success': True,
            'draws': draws,
            'total': len(draws),
            'last_updated': last_updated
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/draw-detail', methods=['GET'])
def get_draw_detail():
    """Returns full 27 prizes and head-tail (đầu đuôi) table for a specific draw index or date across selected timeframe."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        if not days_data:
            return jsonify({'success': False, 'error': 'Chưa có dữ liệu xổ số'}), 404

        index = request.args.get('index')
        date_str = request.args.get('date', '').strip()

        target_day = None
        if index is not None and index.isdigit():
            idx = int(index)
            if 0 <= idx < len(days_data):
                target_day = days_data[idx]
        elif date_str:
            for d in days_data:
                if d.get('date', '') == date_str:
                    target_day = d
                    break

        if not target_day:
            target_day = days_data[0]

        structured = get_structured_draw(target_day)
        return jsonify({
            'success': True,
            'draw': structured,
            'timeframe': len(days_data)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/live', methods=['GET'])
def get_live_draw():
    """
    Returns live XSMB drawing data (18h15 - 18h30) from xskt.com.vn.
    Provides real-time structured prizes, lotos, head-tail maps, and progress.
    """
    try:
        now = datetime.now()
        is_live_window = (now.hour == 18 and 14 <= now.minute <= 36)
        live_data = fetch_live_kqxsmb()
        
        return jsonify({
            'success': True,
            'is_live_window': is_live_window,
            'is_drawing': live_data['is_drawing'],
            'is_completed': live_data['is_completed'],
            'total_drawn': live_data['total_drawn'],
            'target_count': 27,
            'draw': live_data
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/advanced-stats', methods=['GET'])
def get_advanced_stats():
    """Returns Head/Tail statistics, Lô Rơi from Special Prize, streaks, and top pairs for requested timeframe."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        dau_duoi = analyze_dau_duoi_aggregate(days_data)
        lo_roi = analyze_lo_roi(days_data)
        top_pairs = analyze_cap_di_cung_nhau(days_data)

        return jsonify({
            'success': True,
            'dau_duoi': dau_duoi,
            'lo_roi': lo_roi,
            'top_pairs': top_pairs,
            'total_days': len(days_data),
            'last_updated': last_updated
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/bac-nho', methods=['GET'])
def get_bac_nho():
    """Returns empirical Bạc nhớ for target number (which numbers followed it next day) across timeframe (default 100 days for high accuracy)."""
    try:
        number = request.args.get('number', '68').strip()
        timeframe = int(request.args.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        res = analyze_bac_nho(number, days_data)
        return jsonify({
            'success': True,
            'timeframe': len(days_data),
            'bac_nho': res
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/dream-book', methods=['GET'])
def get_dream_book():
    """Searches folk dream book by keyword or category."""
    try:
        query = request.args.get('query', '').strip()
        category = request.args.get('category', '').strip()
        results = search_dream_book(query=query, category=category)
        return jsonify({
            'success': True,
            'total': len(results),
            'dreams': results
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/chat', methods=['POST'])
def chat():
    """Multi-turn interactive AI Fortune Oracle Chatbot endpoint."""
    try:
        data = request.get_json(force=True, silent=True) or {}
        message = data.get('message', '').strip()
        history = data.get('history', [])
        custom_api_key = data.get('api_key', '').strip()
        model = data.get('model', 'gemini-3.8-flash').strip()

        if not message and not history:
            return jsonify({'success': False, 'error': 'Nội dung tin nhắn không được để trống'}), 400

        messages = list(history)
        if message:
            messages.append({'role': 'user', 'text': message})

        chat_res = chat_with_oracle(messages, api_key=custom_api_key, model=model)
        return jsonify(chat_res)
    except Exception as e:
        print(f"[API Error] /api/chat error: {e}")
        return jsonify({'success': False, 'error': f'Lỗi trò chuyện: {str(e)}'}), 500

@app.route('/api/numerology', methods=['POST'])
def numerology():
    """
    Computes Pythagorean Numerology based on birth date and full name.
    Correlates resulting lucky numbers with real 30-day lottery statistics.
    """
    try:
        data = request.get_json(force=True, silent=True) or {}
        birth_date = data.get('birth_date', '').strip()
        full_name = data.get('full_name', '').strip()

        if not birth_date:
            return jsonify({'success': False, 'error': 'Vui lòng nhập ngày tháng năm sinh!'}), 400

        result = calculate_numerology(birth_date, full_name)
        
        # Correlate lucky numbers with dynamic multi-horizon lottery data (30, 60, or 100 days)
        timeframe = int(data.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        lucky_stats = []
        for num in result.get('lucky_numbers', []):
            st = analyze_lottery_data(num, days_data)
            lucky_stats.append({
                'number': num,
                'total_hits': st['total_hits'],
                'status': st.get('status', 'normal'),
                'status_label': st['status_label'],
                'status_desc': st.get('status_desc', ''),
                'badge_color': st.get('badge_color', '#f59e0b'),
                'days_unseen': st['days_unseen'],
                'special_hits': st['special_prize_hits']
            })
            
        result['lucky_lottery_stats'] = lucky_stats
        result['timeframe'] = len(days_data)
        return jsonify({'success': True, 'data': result})
    except Exception as e:
        print(f"[API Error] /api/numerology error: {e}")
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/vision-fortune', methods=['POST'])
def vision_fortune():
    """
    Multimodal Gemini Vision Oracle endpoint.
    Receives image (base64) + caption, analyzes omen and correlates with lottery stats.
    """
    try:
        data = request.get_json(force=True, silent=True) or {}
        image_data = data.get('image', '').strip()
        caption = data.get('caption', '').strip()
        custom_api_key = data.get('api_key', '').strip()
        model = data.get('model', 'gemini-2.5-flash').strip()
        timeframe = int(data.get('timeframe', 30))

        if not image_data:
            return jsonify({'success': False, 'error': 'Vui lòng chọn hoặc tải lên một bức ảnh điềm báo!'}), 400

        mime_type = 'image/jpeg'
        if 'data:image/png' in image_data:
            mime_type = 'image/png'
        elif 'data:image/webp' in image_data:
            mime_type = 'image/webp'

        fortune_res = call_gemini_vision(image_data, mime_type=mime_type, caption=caption, api_key=custom_api_key, model=model)
        lucky_number = fortune_res.get('lucky_number', '68')

        # Multi-Horizon Lottery Data Analytics
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        lottery_stats = analyze_lottery_data(lucky_number, days_data)

        # Companion number
        pair_stats = None
        lucky_pair = fortune_res.get('lucky_pair', [])
        if lucky_pair and len(lucky_pair) >= 2:
            companion_num = lucky_pair[1] if lucky_pair[0] == lucky_number else lucky_pair[0]
            if companion_num != lucky_number:
                companion_analysis = analyze_lottery_data(companion_num, days_data)
                pair_stats = {
                    'number': companion_num,
                    'total_hits': companion_analysis['total_hits'],
                    'status_label': companion_analysis['status_label'],
                    'days_unseen': companion_analysis['days_unseen']
                }

        return jsonify({
            'success': True,
            'fortune': fortune_res,
            'lottery_stats': lottery_stats,
            'pair_stats': pair_stats,
            'lottery_updated': last_updated,
            'timeframe': len(days_data)
        })
    except Exception as e:
        print(f"[API Error] /api/vision-fortune error: {e}")
        return jsonify({'success': False, 'error': f'Lỗi soi quẻ hình ảnh: {str(e)}'}), 500

@app.route('/api/lottery/pascal', methods=['GET'])
def get_pascal():
    """Returns Pascal Triangle calculation and multi-horizon backtest (30, 60, or 100 days)."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        index = request.args.get('index', '0')
        idx = int(index) if index.isdigit() else 0
        pascal_data = analyze_pascal_triangle(days_data, target_day_index=idx)
        return jsonify({
            'success': True,
            'pascal': pascal_data,
            'timeframe': len(days_data)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/tong-de', methods=['GET'])
def get_tong_de():
    """Returns Tổng Đề 0-9, Parity, and Tài/Xỉu analytics across selected timeframe."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        res = analyze_tong_de(days_data)
        return jsonify({
            'success': True,
            'tong_de': res,
            'timeframe': len(days_data)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/xien-3', methods=['GET'])
def get_xien_3():
    """Returns top Xiên 3 triplets appearing together across selected timeframe."""
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, _ = get_kqxsmb_data(timeframe=timeframe)
        res = analyze_xien_3(days_data)
        return jsonify({
            'success': True,
            'top_triplets': res,
            'timeframe': len(days_data)
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/lottery/full-frequency', methods=['GET'])
def full_frequency():
    """
    Returns full frequency distribution of all 100 numbers (00-99)
    for Chart.js rendering and interactive exploration.
    Supports timeframe=30|60|100.
    """
    try:
        timeframe = int(request.args.get('timeframe', 100))
        days_data, last_updated = get_kqxsmb_data(timeframe=timeframe)
        stats = analyze_lottery_data('00', days_data)
        freq_map = stats['all_frequencies']
        items = [{'number': f"{i:02d}", 'hits': freq_map.get(f"{i:02d}", 0)} for i in range(100)]
        return jsonify({
            'success': True,
            'frequencies': items,
            'total_days': len(days_data),
            'timeframe': len(days_data),
            'last_updated': last_updated
        })
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def get_local_ip():
    """Returns local LAN/Wi-Fi IPv4 address for mobile access."""
    import socket
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

@app.route('/api/network-info', methods=['GET'])
def network_info():
    """Returns connection URLs for desktop and mobile devices."""
    port = int(os.getenv('PORT', 5000))
    ip = get_local_ip()
    return jsonify({
        'success': True,
        'local_ip': ip,
        'port': port,
        'desktop_url': f"http://127.0.0.1:{port}",
        'mobile_url': f"http://{ip}:{port}",
        'author': 'Bùi Huy Hoàng'
    })

def start_background_updater():
    """
    Starts a background daemon thread to automatically synchronize lottery results every day.
    """
    import threading
    import time
    from datetime import datetime

    def sync_loop():
        print("[Auto-Sync] Background lottery synchronizer active.")
        while True:
            try:
                days, updated = get_kqxsmb_30days()
                latest_date = days[0].get('date', '') if days else ''
                print(f"[Auto-Sync] Ready. Latest draw: {latest_date} (Updated: {updated})")
            except Exception as e:
                print(f"[Auto-Sync] Error during background sync: {e}")

            now = datetime.now()
            # XSMB draw window: 18:15 - 18:35. During 18:20 - 19:30, check every 5 minutes
            if 18 <= now.hour <= 19:
                time.sleep(300)   # 5 mins
            else:
                time.sleep(1800)  # 30 mins

    if not os.environ.get("WERKZEUG_RUN_MAIN") or os.environ.get("WERKZEUG_RUN_MAIN") == "true":
        t = threading.Thread(target=sync_loop, daemon=True)
        t.start()

start_background_updater()

if __name__ == '__main__':
    port = int(os.getenv('PORT', 5000))
    local_ip = get_local_ip()
    print("=================================================================")
    print("  * AI FORTUNE & LOTTERY ANALYTICS")
    print("  * Tac gia: Bui Huy Hoang (Ban quyen 2026)")
    print("=================================================================")
    print(f"  * May tinh (Local):   http://127.0.0.1:{port}")
    print(f"  * Dien thoai (Wi-Fi): http://{local_ip}:{port}")
    print("=================================================================")
    app.run(host='0.0.0.0', port=port, debug=True)




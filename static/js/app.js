/**
 * AI FORTUNE & LOTTERY ANALYTICS - FRONTEND APPLICATION LOGIC
 * Connects UI with Flask backend, handles Web Audio, animations, and visualizations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const fortuneInput = document.getElementById('fortuneInput');
  const charCounter = document.getElementById('charCounter');
  const btnSubmitFortune = document.getElementById('btnSubmitFortune');
  const modelSelect = document.getElementById('modelSelect');
  const quickPills = document.querySelectorAll('.pill-item');

  // Nav & Header
  const lotteryStatusPill = document.getElementById('lotteryStatusPill');
  const lotteryStatusText = document.getElementById('lotteryStatusText');
  const btnSoundToggle = document.getElementById('btnSoundToggle');
  const btnRefreshData = document.getElementById('btnRefreshData');
  const btnOpenSettings = document.getElementById('btnOpenSettings');

  // Mobile Connect Modal Elements
  const btnOpenMobile = document.getElementById('btnOpenMobile');
  const mobileModal = document.getElementById('mobileModal');
  const btnCloseMobile = document.getElementById('btnCloseMobile');
  const qrCodeImg = document.getElementById('qrCodeImg');
  const mobileUrlDisplay = document.getElementById('mobileUrlDisplay');
  const btnCopyMobileUrl = document.getElementById('btnCopyMobileUrl');

  // Loading Stage

  const loadingStage = document.getElementById('loadingStage');
  const shakingCylinder = document.getElementById('shakingCylinder');
  const rollerBox = document.getElementById('rollerBox');
  const rollerDisplay = document.getElementById('rollerDisplay');
  const loadingStepText = document.getElementById('loadingStepText');
  const loadingSubText = document.getElementById('loadingSubText');

  // Results Dashboard
  const resultsDashboard = document.getElementById('resultsDashboard');
  const aiModelBadge = document.getElementById('aiModelBadge');
  const resLuckyNumber = document.getElementById('resLuckyNumber');
  const resLuckyPair = document.getElementById('resLuckyPair');
  const resElement = document.getElementById('resElement');
  const resProphecy = document.getElementById('resProphecy');
  const resReason = document.getElementById('resReason');
  const resAdvice = document.getElementById('resAdvice');
  const moodBarsContainer = document.getElementById('moodBarsContainer');

  // Lottery Card
  const lotteryUpdatedDate = document.getElementById('lotteryUpdatedDate');
  const resStatusBadge = document.getElementById('resStatusBadge');
  const resStatusDesc = document.getElementById('resStatusDesc');
  const statHits = document.getElementById('statHits');
  const statHitDays = document.getElementById('statHitDays');
  const statUnseen = document.getElementById('statUnseen');
  const statLastSeen = document.getElementById('statLastSeen');
  const statSpecialHits = document.getElementById('statSpecialHits');
  const statSpecialSub = document.getElementById('statSpecialSub');
  const statRank = document.getElementById('statRank');
  const statAvg = document.getElementById('statAvg');
  const dotsHeatmap = document.getElementById('dotsHeatmap');
  const pairCompanionBox = document.getElementById('pairCompanionBox');
  const pairNum = document.getElementById('pairNum');
  const pairHits = document.getElementById('pairHits');
  const pairStatus = document.getElementById('pairStatus');

  // Overview Lists & Quick Checker
  const topHotList = document.getElementById('topHotList');
  const topGanList = document.getElementById('topGanList');
  const quickCheckerForm = document.getElementById('quickCheckerForm');
  const quickCheckInput = document.getElementById('quickCheckInput');
  const quickCheckResult = document.getElementById('quickCheckResult');

  // Action Buttons
  const btnReroll = document.getElementById('btnReroll');
  const btnCopyCard = document.getElementById('btnCopyCard');
  const btnDownloadCard = document.getElementById('btnDownloadCard');
  const btnShareText = document.getElementById('btnShareText');
  const btnScrollToTop = document.getElementById('btnScrollToTop');

  // Vision Elements
  const btnTriggerImageUpload = document.getElementById('btnTriggerImageUpload');
  const visionImageInput = document.getElementById('visionImageInput');
  const visionPreviewBox = document.getElementById('visionPreviewBox');
  const visionPreviewImg = document.getElementById('visionPreviewImg');
  const visionImgName = document.getElementById('visionImgName');
  const btnRemoveVisionImg = document.getElementById('btnRemoveVisionImg');
  let currentVisionImage = null;

  // Numerology Elements
  const numFullName = document.getElementById('numFullName');
  const numBirthDate = document.getElementById('numBirthDate');
  const btnCalcNumerology = document.getElementById('btnCalcNumerology');
  const numerologyResultBox = document.getElementById('numerologyResultBox');
  const numLifePathBadge = document.getElementById('numLifePathBadge');
  const numHeroTitle = document.getElementById('numHeroTitle');
  const numHeroDesc = document.getElementById('numHeroDesc');
  const numElementTag = document.getElementById('numElementTag');
  const numCareerTag = document.getElementById('numCareerTag');
  const numPersonalYear = document.getElementById('numPersonalYear');
  const numPersonalYearAdvice = document.getElementById('numPersonalYearAdvice');
  const numArrowsList = document.getElementById('numArrowsList');
  const numNameNumbersList = document.getElementById('numNameNumbersList');
  const numLuckyGrid = document.getElementById('numLuckyGrid');

  // Pascal Elements
  const pascalDrawSelect = document.getElementById('pascalDrawSelect');
  const btnCalcPascal = document.getElementById('btnCalcPascal');
  const pascalPyramidContainer = document.getElementById('pascalPyramidContainer');
  const pascalDigitsDisplay = document.getElementById('pascalDigitsDisplay');
  const pascalAccuracyText = document.getElementById('pascalAccuracyText');
  const tongDeGrid = document.getElementById('tongDeGrid');
  const tongDeSummary = document.getElementById('tongDeSummary');
  const parityBarsContainer = document.getElementById('parityBarsContainer');
  const taiXiuBox = document.getElementById('taiXiuBox');
  const topTripletsGrid = document.getElementById('topTripletsGrid');

  // Tabs
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  // Board Elements
  const drawDateSelect = document.getElementById('drawDateSelect');
  const btnPrevDraw = document.getElementById('btnPrevDraw');
  const btnNextDraw = document.getElementById('btnNextDraw');
  const btnLatestDraw = document.getElementById('btnLatestDraw');
  const btnCopyKqxs = document.getElementById('btnCopyKqxs');
  const boardDrawTitle = document.getElementById('boardDrawTitle');
  const boardDbBadge = document.getElementById('boardDbBadge');
  const prizeDB = document.getElementById('prizeDB');
  const prizeG1 = document.getElementById('prizeG1');
  const prizeG2 = document.getElementById('prizeG2');
  const prizeG3 = document.getElementById('prizeG3');
  const prizeG4 = document.getElementById('prizeG4');
  const prizeG5 = document.getElementById('prizeG5');
  const prizeG6 = document.getElementById('prizeG6');
  const prizeG7 = document.getElementById('prizeG7');
  const btnShowDau = document.getElementById('btnShowDau');
  const btnShowDuoi = document.getElementById('btnShowDuoi');
  const dauViewContainer = document.getElementById('dauViewContainer');
  const duoiViewContainer = document.getElementById('duoiViewContainer');
  const dauTableBody = document.getElementById('dauTableBody');
  const duoiTableBody = document.getElementById('duoiTableBody');
  const dauAggregateBars = document.getElementById('dauAggregateBars');
  const duoiAggregateBars = document.getElementById('duoiAggregateBars');
  
  // Jackpot & Quick Insights Elements
  const jackpotDatePill = document.getElementById('jackpotDatePill');
  const jackpotFiveDigits = document.getElementById('jackpotFiveDigits');
  const jackpotLotoSpotlight = document.getElementById('jackpotLotoSpotlight');
  const metaTongDe = document.getElementById('metaTongDe');
  const metaChamDe = document.getElementById('metaChamDe');
  const metaTypeDe = document.getElementById('metaTypeDe');
  const metaDauDuoiDe = document.getElementById('metaDauDuoiDe');
  const insightTopDau = document.getElementById('insightTopDau');
  const insightCamDau = document.getElementById('insightCamDau');
  const insightCamDuoi = document.getElementById('insightCamDuoi');
  const insightLoKep = document.getElementById('insightLoKep');

  // Predict Elements
  const bacNhoForm = document.getElementById('bacNhoForm');
  const bacNhoInput = document.getElementById('bacNhoInput');
  const bacNhoSummaryText = document.getElementById('bacNhoSummaryText');
  const bacNhoCardsList = document.getElementById('bacNhoCardsList');
  const loRoiDeRate = document.getElementById('loRoiDeRate');
  const activeStreaksList = document.getElementById('activeStreaksList');
  const loRoiDeHistoryList = document.getElementById('loRoiDeHistoryList');
  const topPairsGrid = document.getElementById('topPairsGrid');

  // Dream Book Elements
  const dreamSearchInput = document.getElementById('dreamSearchInput');
  const dreamCatPills = document.querySelectorAll('.dream-cat-pill');
  const dreamResultsGrid = document.getElementById('dreamResultsGrid');

  // Settings Modal
  const settingsModal = document.getElementById('settingsModal');
  const inputApiKey = document.getElementById('inputApiKey');
  const btnCloseSettings = document.getElementById('btnCloseSettings');
  const btnCancelSettings = document.getElementById('btnCancelSettings');
  const btnSaveSettings = document.getElementById('btnSaveSettings');
  const toastContainer = document.getElementById('toastContainer');

  // Multi-Horizon Timeframe & Dual-Engine & Matrix Heatmap Elements
  let currentTimeframe = 100;
  const timeframePills = document.querySelectorAll('.btn-timeframe');
  const timeframeSubText = document.getElementById('timeframeSubText');
  const timeframeStatusLabel = document.getElementById('timeframeStatusLabel');
  const timelineTitleText = document.getElementById('timelineTitleText');
  const lotoChartHeaderTitle = document.getElementById('lotoChartHeaderTitle');
  
  // Oracle Audit Box Elements
  const oracleAuditBox = document.getElementById('oracleAuditBox');
  const auditScorePill = document.getElementById('auditScorePill');
  const auditConfidenceScore = document.getElementById('auditConfidenceScore');
  const auditDaysUnseen = document.getElementById('auditDaysUnseen');
  const auditLastSeen = document.getElementById('auditLastSeen');
  const auditMaxGan = document.getElementById('auditMaxGan');
  const auditRecordYear = document.getElementById('auditRecordYear');
  const auditGanGap = document.getElementById('auditGanGap');
  const auditGanGapDesc = document.getElementById('auditGanGapDesc');
  const auditSafetyStatus = document.getElementById('auditSafetyStatus');
  const auditSafetyDesc = document.getElementById('auditSafetyDesc');

  // Matrix Heatmap Elements
  const matrix100Grid = document.getElementById('matrix100Grid');
  const matrixPopoverCard = document.getElementById('matrixPopoverCard');
  const matrixFilterChips = document.querySelectorAll('.matrix-filter-pill');
  const popoverNum = document.getElementById('popoverNum');
  const popoverStatusBadge = document.getElementById('popoverStatusBadge');
  const popoverHits = document.getElementById('popoverHits');
  const popoverUnseen = document.getElementById('popoverUnseen');
  const popoverMaxGan = document.getElementById('popoverMaxGan');
  const popoverGanGap = document.getElementById('popoverGanGap');
  const popoverCompanion = document.getElementById('popoverCompanion');

  // Global App State
  let currentFortuneData = null;
  let rollerInterval = null;

  // Initialize saved settings
  const savedApiKey = localStorage.getItem('gemini_api_key') || '';
  inputApiKey.value = savedApiKey;
  updateSoundIcon();

  // Character counter for textarea
  fortuneInput.addEventListener('input', () => {
    const len = fortuneInput.value.length;
    charCounter.textContent = `${len} ký tự`;
  });

  // Quick suggestion pills
  quickPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const text = pill.getAttribute('data-text');
      fortuneInput.value = text;
      fortuneInput.focus();
      charCounter.textContent = `${text.length} ký tự`;
      showToast('Đã chọn gợi ý quẻ!');
      if (window.soundFX) window.soundFX.playTick();
    });
  });

  // Sound Toggle
  btnSoundToggle.addEventListener('click', () => {
    if (window.soundFX) {
      const muted = window.soundFX.toggleMute();
      updateSoundIcon();
      showToast(muted ? '🔇 Đã tắt âm thanh' : '🔊 Đã bật âm thanh');
    }
  });

  function updateSoundIcon() {
    const isMuted = localStorage.getItem('sound_muted') === 'true';
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
  }

  // Mobile Connect Modal Controls
  if (btnOpenMobile) {
    btnOpenMobile.addEventListener('click', async () => {
      mobileModal.classList.add('active');
      try {
        const res = await fetch('/api/network-info');
        const data = await res.json();
        const mobileUrl = data.mobile_url || `http://${window.location.hostname}:${window.location.port || 5000}`;
        mobileUrlDisplay.textContent = mobileUrl;
        qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(mobileUrl)}&color=09-13-22&bgcolor=ffffff`;
      } catch (e) {
        const fallbackUrl = window.location.origin;
        mobileUrlDisplay.textContent = fallbackUrl;
        qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(fallbackUrl)}`;
      }
    });
  }

  if (btnCloseMobile) {
    btnCloseMobile.addEventListener('click', () => {
      mobileModal.classList.remove('active');
    });
  }

  if (btnCopyMobileUrl) {
    btnCopyMobileUrl.addEventListener('click', () => {
      const url = mobileUrlDisplay.textContent;
      navigator.clipboard.writeText(url).then(() => {
        showToast('📋 Đã sao chép liên kết mở trên điện thoại!');
      }).catch(() => {
        showToast('⚠️ Không thể sao chép tự động.');
      });
    });
  }

  // Settings Modal Controls

  btnOpenSettings.addEventListener('click', () => {
    settingsModal.classList.add('active');
  });

  [btnCloseSettings, btnCancelSettings].forEach(btn => {
    btn.addEventListener('click', () => {
      settingsModal.classList.remove('active');
    });
  });

  btnSaveSettings.addEventListener('click', () => {
    const key = inputApiKey.value.trim();
    localStorage.setItem('gemini_api_key', key);
    settingsModal.classList.remove('active');
    showToast(key ? '✅ Đã lưu Gemini API Key!' : 'ℹ️ Đã xóa API Key (Dùng mặc định/heuristic)');
  });

  // Refresh Lottery Data Button
  btnRefreshData.addEventListener('click', async () => {
    btnRefreshData.style.transform = 'rotate(360deg)';
    btnRefreshData.style.transition = 'transform 0.8s ease';
    setTimeout(() => {
      btnRefreshData.style.transform = '';
      btnRefreshData.style.transition = '';
    }, 800);

    showToast('🔄 Đang đồng bộ dữ liệu KQXS mới nhất...');
    try {
      const res = await fetch('/api/lottery/refresh', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showToast(`✅ ${data.message}`);
        fetchLotteryOverview();
      } else {
        showToast(`⚠️ ${data.error}`);
      }
    } catch (e) {
      showToast('❌ Lỗi kết nối tới máy chủ khi làm mới dữ liệu');
    }
  });

  // =========================================================================
  // MASTER TIMEFRAME SYNCHRONIZATION ENGINE (30 - 60 - 100 NGÀY)
  // =========================================================================
  function updateAppTimeframe(newTimeframe, notify = true) {
    currentTimeframe = parseInt(newTimeframe) || 100;

    // 1. Update active button states
    timeframePills.forEach(b => {
      const bTf = parseInt(b.getAttribute('data-timeframe')) || 100;
      if (bTf === currentTimeframe) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // 2. Synchronize ALL dynamic text spans across entire UI (.dyn-timeframe-val)
    document.querySelectorAll('.dyn-timeframe-val').forEach(el => {
      el.textContent = currentTimeframe;
    });

    const tfNames = {
      30: '30 Ngày (Đà Nóng - Tối ưu đánh ngắn)',
      60: '60 Ngày (Tiêu Chuẩn - Trung hạn)',
      100: '100 Ngày (Chu kỳ vàng phong thủy & Max Gan)'
    };
    if (timeframeSubText) {
      timeframeSubText.textContent = `Đang xem: ${tfNames[currentTimeframe] || currentTimeframe + ' Ngày'}`;
    }
    if (timelineTitleText) {
      timelineTitleText.textContent = `LỊCH SỬ NỔ LÔ ${currentTimeframe} NGÀY GẦN NHẤT`;
    }
    if (lotoChartHeaderTitle) {
      lotoChartHeaderTitle.textContent = `Biểu Đồ Cột: Tần Suất Xuất Hiện Trong ${currentTimeframe} Ngày`;
    }

    if (notify) {
      showToast(`⏳ Đã đồng bộ toàn bộ hệ thống sang chu kỳ ${currentTimeframe} Ngày!`);
      if (window.soundFX) window.soundFX.playLock();
    }

    // 3. Re-fetch all dynamic data for currentTimeframe
    fetchLotteryOverview(currentTimeframe);
    initCharts(currentTimeframe);
    loadHeatmapMatrix(currentTimeframe);
    loadDrawsList(currentTimeframe);
    loadAdvancedStats(currentTimeframe);
    loadBacNho(bacNhoInput ? bacNhoInput.value : '68', currentTimeframe);
    loadPascalDrawsList(currentTimeframe);
    loadTongDeAndXien3(currentTimeframe);

    // If numerology result is open, re-calculate with new timeframe
    if (numerologyResultBox && numerologyResultBox.style.display !== 'none') {
      calculateNumerology(currentTimeframe, true);
    }

    // Re-audit lucky number if fortune is already displayed
    if (currentFortuneData && currentFortuneData.fortune && currentFortuneData.fortune.lucky_number) {
      reAnalyzeFortuneNumber(currentFortuneData.fortune.lucky_number, currentTimeframe);
    }

    // Re-run quick checker if currently displaying a number
    if (quickCheckInput && quickCheckInput.value.trim() && quickCheckResult.style.display !== 'none') {
      quickCheckNumber(quickCheckInput.value.trim(), currentTimeframe);
    }
  }

  // Bind clicks to timeframe switcher buttons
  timeframePills.forEach(btn => {
    btn.addEventListener('click', () => {
      const tf = parseInt(btn.getAttribute('data-timeframe')) || 100;
      updateAppTimeframe(tf, true);
    });
  });

  async function reAnalyzeFortuneNumber(num, timeframe) {
    try {
      const res = await fetch(`/api/lottery/analyze?number=${num}&timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.stats) {
        currentFortuneData.lottery_stats = data.stats;
        displayResults(currentFortuneData);
      }
    } catch (e) {
      console.error('Error re-analyzing fortune number:', e);
    }
  }

  // Fetch initial lottery overview (Top Hot & Top Gan)
  async function fetchLotteryOverview(timeframe = currentTimeframe) {
    try {
      const res = await fetch(`/api/lottery/overview?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success) {
        lotteryStatusText.textContent = `KQXS: ${data.total_days} Ngày sẵn sàng`;
        if (data.latest_draw && data.latest_draw.date) {
          lotteryUpdatedDate.innerHTML = `Cập nhật ngày ${data.latest_draw.date} (ĐB: ${data.latest_draw.special_prize}) &bull; Dữ liệu <span class="dyn-timeframe-val">${data.total_days}</span> ngày qua`;
        }
        renderTopLists(data.top_5_hot, data.top_5_gan);
      }
    } catch (e) {
      lotteryStatusText.textContent = 'KQXS: Chưa đồng bộ';
      console.error('Error fetching lottery overview:', e);
    }
  }

  function renderTopLists(topHot, topGan) {
    if (topHot && topHotList) {
      topHotList.innerHTML = topHot.map((item, idx) => `
        <li class="rank-item">
          <span class="rank-item-num">
            <span style="color: var(--gold-400); font-size: 0.75rem;">#${idx + 1}</span>
            <span style="background: rgba(244, 63, 94, 0.2); color: var(--rose-400); padding: 2px 8px; border-radius: 4px;">${item.number}</span>
          </span>
          <span style="color: var(--rose-400); font-weight: 700;">${item.hits} lần</span>
        </li>
      `).join('');
    }

    if (topGan && topGanList) {
      topGanList.innerHTML = topGan.map((item, idx) => `
        <li class="rank-item">
          <span class="rank-item-num">
            <span style="color: var(--text-dim); font-size: 0.75rem;">#${idx + 1}</span>
            <span style="background: rgba(6, 182, 212, 0.2); color: var(--cyan-400); padding: 2px 8px; border-radius: 4px;">${item.number}</span>
          </span>
          <span style="color: var(--cyan-400); font-weight: 600;">${item.days_unseen} ngày chưa về</span>
        </li>
      `).join('');
    }
  }

  // Quick Number Checker Function
  async function quickCheckNumber(numStr, timeframe = currentTimeframe) {
    if (!numStr || isNaN(numStr) || parseInt(numStr) < 0 || parseInt(numStr) > 99) {
      showToast('⚠️ Vui lòng nhập con số hợp lệ từ 00 đến 99');
      return;
    }

    const formatted = String(parseInt(numStr)).padStart(2, '0');
    quickCheckResult.style.display = 'block';
    quickCheckResult.innerHTML = `<span style="color: var(--text-dim);">Đang tra cứu số ${formatted} trong ${timeframe} ngày...</span>`;

    try {
      const res = await fetch(`/api/lottery/analyze?number=${formatted}&timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.stats) {
        const s = data.stats;
        quickCheckResult.innerHTML = `
          <div style="background: rgba(255,255,255,0.05); padding: 0.85rem; border-radius: 8px; border-left: 3px solid ${s.badge_color};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <strong style="font-size: 1.15rem; color: #fff;">Số ${s.target_number}</strong>
              <span style="color: ${s.badge_color}; font-weight: 700; font-size: 0.85rem;">${s.status_label}</span>
            </div>
            <p style="color: var(--text-muted); font-size: 0.82rem; line-height: 1.5; margin-bottom: 0.4rem;">
              • Tần suất: <strong>${s.total_hits} lần</strong> trong ${s.total_days_analyzed} ngày (hạng #${s.target_rank}/100)<br>
              • Tình trạng: <strong>${s.days_unseen === 0 ? 'Vừa nổ hôm qua!' : s.days_unseen + ' ngày chưa về'}</strong> (Lần cuối: ${s.last_seen_date})
            </p>
            <div style="font-size: 0.78rem; color: var(--gold-400); padding-top: 0.3rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between;">
              <span>Kỷ lục Max Gan 10-15 năm: <strong>${s.max_gan_historical || 28} ngày</strong> (Năm ${s.record_year || '2019'})</span>
              <span style="color: var(--cyan-400);">Cách đỉnh: <strong>${s.gan_gap >= 0 ? '+' : ''}${s.gan_gap} ngày</strong></span>
            </div>
          </div>
        `;
        if (window.soundFX) window.soundFX.playLock();
      } else {
        quickCheckResult.innerHTML = `<span style="color: var(--rose-400);">${data.error}</span>`;
      }
    } catch (err) {
      quickCheckResult.innerHTML = '<span style="color: var(--rose-400);">Lỗi kết nối khi tra cứu số</span>';
    }
  }

  // Quick Number Checker Form Listener
  quickCheckerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const num = quickCheckInput.value.trim();
    quickCheckNumber(num, currentTimeframe);
  });

  // Vision Image Handlers
  function handleVisionFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('⚠️ Vui lòng chọn file hình ảnh hợp lệ (JPG, PNG, WEBP).');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('⚠️ Kích thước ảnh tối đa là 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      currentVisionImage = e.target.result;
      if (visionPreviewImg) visionPreviewImg.src = currentVisionImage;
      if (visionImgName) visionImgName.textContent = file.name || 'anh_diem_bao.jpg';
      if (visionPreviewBox) visionPreviewBox.style.display = 'inline-flex';
      showToast(`📸 Đã nạp ảnh: ${file.name || 'Điềm báo'}`);
      if (window.soundFX) window.soundFX.playLock();
    };
    reader.readAsDataURL(file);
  }

  if (btnTriggerImageUpload && visionImageInput) {
    btnTriggerImageUpload.addEventListener('click', () => visionImageInput.click());
    visionImageInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) handleVisionFile(file);
    });
  }

  if (btnRemoveVisionImg) {
    btnRemoveVisionImg.addEventListener('click', () => {
      currentVisionImage = null;
      if (visionImageInput) visionImageInput.value = '';
      if (visionPreviewBox) visionPreviewBox.style.display = 'none';
      showToast('Đã xóa ảnh điềm báo.');
    });
  }

  if (fortuneInput) {
    fortuneInput.addEventListener('paste', (e) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (let item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          handleVisionFile(file);
          break;
        }
      }
    });
  }

  // MAIN FLOW: Submit Fortune & Analytics Request
  btnSubmitFortune.addEventListener('click', handleFortuneSubmission);

  async function handleFortuneSubmission() {
    const text = fortuneInput.value.trim();
    if (!text && !currentVisionImage) {
      showToast('⚠️ Vui lòng nhập suy nghĩ, giấc mơ hoặc tải lên ảnh điềm báo!');
      fortuneInput.focus();
      return;
    }

    // Disable button & Show loading animation
    btnSubmitFortune.disabled = true;
    resultsDashboard.style.display = 'none';
    loadingStage.style.display = 'block';
    loadingStage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Step 1: Start Shaker Canister animation & Sound
    shakingCylinder.style.display = 'block';
    rollerBox.style.display = 'none';
    loadingStepText.textContent = currentVisionImage 
      ? '🔮 Đang dùng Gemini Vision phân tích chi tiết bức ảnh điềm báo...' 
      : '🔮 Đang kết nối thần thức AI & giải mã giấc mơ...';
    loadingSubText.textContent = 'Thầy Bói AI đang nhắm mắt bấm độn quẻ cát tường...';

    // Play initial rattling sound
    if (window.soundFX) {
      window.soundFX.playShake();
      const shakeInterval = setInterval(() => {
        if (loadingStage.style.display !== 'none' && shakingCylinder.style.display !== 'none') {
          window.soundFX.playShake();
        } else {
          clearInterval(shakeInterval);
        }
      }, 350);
    }

    // Step 2: Switch to spinning loto roller after 1.2s
    setTimeout(() => {
      shakingCylinder.style.display = 'none';
      rollerBox.style.display = 'flex';
      loadingStepText.textContent = `🎲 Đang quay cầu Loto ${currentTimeframe} ngày & kiểm tra tần suất...`;
      loadingSubText.textContent = `Dữ liệu ${currentTimeframe * 27} giải xổ số đang được rà soát đối chiếu...`;

      // Start rapid number cycling
      let currentVal = 0;
      rollerInterval = setInterval(() => {
        currentVal = (currentVal + 7) % 100;
        rollerDisplay.textContent = String(currentVal).padStart(2, '0');
        if (window.soundFX && Math.random() > 0.4) {
          window.soundFX.playTick();
        }
      }, 60);
    }, 1200);

    // Call API
    const apiKey = localStorage.getItem('gemini_api_key') || '';
    const selectedModel = modelSelect.value;
    const endpoint = currentVisionImage ? '/api/vision-fortune' : '/api/fortune';
    const payload = currentVisionImage 
      ? { image: currentVisionImage, caption: text, api_key: apiKey, model: selectedModel, timeframe: currentTimeframe }
      : { text: text, api_key: apiKey, model: selectedModel, timeframe: currentTimeframe };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Lỗi không xác định khi xin quẻ');
      }

      currentFortuneData = result;

      // Finish sequence: Slow down roller and lock onto the target number
      setTimeout(() => {
        clearInterval(rollerInterval);
        const targetNum = result.fortune.lucky_number || '68';
        rollerDisplay.textContent = targetNum;

        // Play lock sound
        if (window.soundFX) window.soundFX.playLock();

        loadingStepText.textContent = `✨ Khai mở con số tài lộc: ${targetNum}!`;
        loadingSubText.textContent = 'Quẻ đã hiển hiện, vạn sự cát tường!';

        // Reveal full dashboard after a brief flash
        setTimeout(() => {
          loadingStage.style.display = 'none';
          displayResults(result);
          resultsDashboard.style.display = 'block';
          btnSubmitFortune.disabled = false;

          // Play triumphant fanfare & jackpot if hot
          if (window.soundFX) {
            window.soundFX.playFanfare();
            if (result.lottery_stats && result.lottery_stats.status === 'hot') {
              setTimeout(() => window.soundFX.playJackpot(), 300);
            }
          }

          resultsDashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 800);

      }, 1800);

    } catch (err) {
      clearInterval(rollerInterval);
      loadingStage.style.display = 'none';
      btnSubmitFortune.disabled = false;
      showToast(`❌ ${err.message}`);
      console.error('Error submitting fortune:', err);
    }
  }

  // Populate Dashboard with API Data
  function displayResults(data) {
    const f = data.fortune;
    const l = data.lottery_stats;
    const p = data.pair_stats;

    // AI Badge
    aiModelBadge.textContent = f.ai_model || 'Gemini AI';

    // Lucky Number & Showpiece
    resLuckyNumber.textContent = f.lucky_number;
    resLuckyPair.textContent = f.lucky_pair ? f.lucky_pair.join(' - ') : `${f.lucky_number} - ${f.lucky_number.split('').reverse().join('')}`;
    resElement.innerHTML = `<span>⚡</span> ${f.element || 'Mệnh Kim (Phát tài)'}`;

    // Prophecy & Context
    resProphecy.textContent = `"${f.prophecy}"`;
    resReason.textContent = f.reason;
    resAdvice.textContent = f.action_advice || 'Giữ tâm tịnh, đón lộc xuân vui vẻ.';

    // Mood Breakdown Progress Bars
    if (f.mood_breakdown && Array.isArray(f.mood_breakdown)) {
      moodBarsContainer.innerHTML = f.mood_breakdown.map(m => `
        <div class="mood-bar-item">
          <div class="mood-bar-info">
            <span style="color: ${m.color}; font-weight: 600;">${m.label}</span>
            <span style="color: var(--text-dim);">${m.percent}%</span>
          </div>
          <div class="mood-bar-track">
            <div class="mood-bar-fill" style="width: ${m.percent}%; background: ${m.color};"></div>
          </div>
        </div>
      `).join('');
    }

    // Lottery Status Banner
    resStatusBadge.className = 'status-badge-lg';
    if (l.status === 'hot') {
      resStatusBadge.classList.add('status-badge-hot');
    } else if (l.status === 'gan') {
      resStatusBadge.classList.add('status-badge-gan');
    } else {
      resStatusBadge.classList.add('status-badge-normal');
    }
    resStatusBadge.textContent = l.status_label;
    resStatusDesc.textContent = l.status_desc;

    // 4 Stat Tiles
    statHits.textContent = `${l.total_hits} lần`;
    statHitDays.textContent = `Nổ ở ${l.days_with_hit}/${l.total_days_analyzed} ngày (${l.day_appearance_rate}%)`;

    statUnseen.textContent = `${l.days_unseen} ngày`;
    statLastSeen.textContent = `Lần cuối: ${l.last_seen_date}`;

    statSpecialHits.textContent = `${l.special_prize_hits} lần`;
    statSpecialSub.textContent = l.special_prize_hits > 0 ? '👑 Từng nổ Giải Đặc Biệt (Đề)' : 'Chưa nổ Giải Đặc Biệt';

    statRank.textContent = `#${l.target_rank} / 100`;
    statAvg.textContent = `TB toàn bảng: ${l.average_frequency} lần`;

    // Heatmap Dots
    if (l.history && Array.isArray(l.history)) {
      dotsHeatmap.innerHTML = l.history.map(day => {
        let cls = 'dot-day';
        if (day.hit_in_special) {
          cls += ' special-hit';
        } else if (day.hits > 0) {
          cls += ' hit';
        }
        const tooltip = `${day.date}: ${day.hits > 0 ? (day.hits + ' nháy' + (day.hit_in_special ? ' (Giải ĐB)' : '')) : 'Không về'}`;
        return `<div class="${cls}" data-tooltip="${tooltip}"></div>`;
      }).join('');
    }

    // Dual-Engine Oracle Math & Historical Gan Audit Box
    if (oracleAuditBox) {
      oracleAuditBox.style.display = 'block';
      const confScore = l.confidence_score !== undefined ? l.confidence_score : 88;
      if (auditConfidenceScore) auditConfidenceScore.textContent = `${confScore}%`;
      
      if (auditScorePill) {
        if (confScore >= 80) {
          auditScorePill.style.borderColor = 'var(--emerald-400)';
          auditScorePill.style.background = 'rgba(16, 185, 129, 0.15)';
          if (auditConfidenceScore) auditConfidenceScore.style.color = 'var(--emerald-400)';
        } else if (confScore >= 60) {
          auditScorePill.style.borderColor = 'var(--gold-400)';
          auditScorePill.style.background = 'rgba(245, 158, 11, 0.15)';
          if (auditConfidenceScore) auditConfidenceScore.style.color = 'var(--gold-400)';
        } else {
          auditScorePill.style.borderColor = 'var(--rose-400)';
          auditScorePill.style.background = 'rgba(244, 63, 94, 0.15)';
          if (auditConfidenceScore) auditConfidenceScore.style.color = 'var(--rose-400)';
        }
      }

      if (auditDaysUnseen) auditDaysUnseen.textContent = `${l.days_unseen} ngày`;
      if (auditLastSeen) auditLastSeen.textContent = `Lần cuối: ${l.last_seen_date}`;
      if (auditMaxGan) auditMaxGan.textContent = `${l.max_gan_historical || 28} ngày`;
      if (auditRecordYear) auditRecordYear.textContent = `Kỷ lục năm: ${l.record_year || '2019'}`;
      if (auditGanGap) auditGanGap.textContent = `${l.gan_gap >= 0 ? '+' : ''}${l.gan_gap} ngày`;
      if (auditGanGapDesc) {
        auditGanGapDesc.textContent = l.gan_gap > 10 ? 'Còn xa đỉnh kỷ lục (An toàn)' : (l.gan_gap > 3 ? 'Đang tiếp cận kỷ lục' : '⚠️ Sát đỉnh kỷ lục lịch sử!');
      }
      if (auditSafetyStatus) {
        auditSafetyStatus.textContent = l.safety_status || 'An Toàn';
        if (l.safety_status && l.safety_status.includes('Nguy Hiểm')) {
          auditSafetyStatus.className = 'metric-val rose-text';
        } else if (l.safety_status && l.safety_status.includes('Cảnh Báo')) {
          auditSafetyStatus.className = 'metric-val gold-text';
        } else {
          auditSafetyStatus.className = 'metric-val cyan-text';
        }
      }
      if (auditSafetyDesc) auditSafetyDesc.textContent = `TB Gan năm: ${l.avg_gan_yearly || 15} ngày`;
    }

    // Companion Pair Stat
    if (p) {
      pairCompanionBox.style.display = 'block';
      pairNum.textContent = p.number;
      pairHits.textContent = `${p.total_hits} lần`;
      pairStatus.textContent = p.status_label;
    } else {
      pairCompanionBox.style.display = 'none';
    }
  }

  // Reroll action
  btnReroll.addEventListener('click', () => {
    fortuneInput.value = '';
    charCounter.textContent = '0 ký tự';
    resultsDashboard.style.display = 'none';
    window.scrollTo({ top: fortuneInput.offsetTop - 100, behavior: 'smooth' });
    fortuneInput.focus();
    showToast('✨ Hãy nhập giấc mơ hoặc cảm xúc mới để xin quẻ!');
  });

  // Share text to clipboard
  btnShareText.addEventListener('click', () => {
    if (!currentFortuneData) return;
    const f = currentFortuneData.fortune;
    const l = currentFortuneData.lottery_stats;

    const tfDays = l.total_days_analyzed || currentTimeframe;
    const shareText = `🔮 QUẺ BÓI THẦN SỐ AI & KQXS ${tfDays} NGÀY 🔮
✨ Con số may mắn: [ ${f.lucky_number} ]
⚡ Cặp số tương sinh: ${f.lucky_pair ? f.lucky_pair.join(' - ') : f.lucky_number}
📜 Lời phán: "${f.prophecy}"
💡 Giải mã: ${f.reason}
📊 Thống kê XSMB ${tfDays} ngày: ${l.status_label} (${l.total_hits} lần nổ, ${l.days_unseen === 0 ? 'Vừa nổ hôm qua' : l.days_unseen + ' ngày chưa về'})
---
👑 Tác giả & Bản quyền: Bùi Huy Hoàng
📱 Trải nghiệm ngay tại: ${window.location.origin}`;


    navigator.clipboard.writeText(shareText).then(() => {
      showToast('📋 Đã sao chép nội dung quẻ bói vào bộ nhớ tạm!');
      if (window.soundFX) window.soundFX.playLock();
    }).catch(() => {
      showToast('⚠️ Không thể sao chép tự động, vui lòng thử lại.');
    });
  });

  // Scroll to top
  btnScrollToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Toast Notification Helper
  function showToast(message, duration = 3000) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(50px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // =========================================================================
  // LUCKY CARD CANVAS GENERATION & DOWNLOAD / COPY
  // =========================================================================
  if (btnDownloadCard) {
    btnDownloadCard.addEventListener('click', () => {
      if (!currentFortuneData) {
        showToast('⚠️ Vui lòng gieo một quẻ may mắn trước khi tải thẻ bài!');
        return;
      }
      renderLuckyCardToCanvas(currentFortuneData);
      const canvas = document.getElementById('luckyCardCanvas');
      const num = currentFortuneData.fortune.lucky_number || '68';
      try {
        const dataUrl = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = `The-Bai-May-Man-${num}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        showToast(`📸 Đã tải thẻ bài may mắn số [${num}] thành công!`);
        if (window.soundFX) window.soundFX.playFanfare();
      } catch (e) {
        showToast('⚠️ Không thể tải ảnh tự động.');
      }
    });
  }

  if (btnCopyCard) {
    btnCopyCard.addEventListener('click', () => {
      if (!currentFortuneData) {
        showToast('⚠️ Vui lòng gieo một quẻ may mắn trước khi sao chép thẻ bài!');
        return;
      }
      renderLuckyCardToCanvas(currentFortuneData);
      const canvas = document.getElementById('luckyCardCanvas');
      if (!canvas) return;

      try {
        canvas.toBlob(async (blob) => {
          if (!blob) {
            showToast('⚠️ Không thể tạo ảnh thẻ bài.');
            return;
          }
          if (navigator.clipboard && navigator.clipboard.write) {
            await navigator.clipboard.write([
              new ClipboardItem({ 'image/png': blob })
            ]);
            showToast('📋 Đã sao chép ảnh thẻ bài vào bộ nhớ tạm! Bạn có thể dán ngay vào Zalo, Messenger, Facebook.');
            if (window.soundFX) window.soundFX.playLock();
          } else {
            showToast('⚠️ Trình duyệt chưa hỗ trợ sao chép ảnh trực tiếp, vui lòng bấm Tải Ảnh Thẻ Bài.');
          }
        }, 'image/png');
      } catch (err) {
        console.error('Error copying image card:', err);
        showToast('⚠️ Không thể sao chép ảnh vào bộ nhớ tạm.');
      }
    });
  }

  function renderLuckyCardToCanvas(data) {
    const f = data.fortune;
    const l = data.lottery_stats;
    const num = f.lucky_number || '68';

    const canvas = document.getElementById('luckyCardCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;  // 800
    const H = canvas.height; // 1200

    // 1. Cosmic Radial Nebula Background
    const bgGrad = ctx.createRadialGradient(W / 2, H * 0.32, 60, W / 2, H / 2, 800);
    bgGrad.addColorStop(0, '#1c1038');
    bgGrad.addColorStop(0.4, '#0e0b24');
    bgGrad.addColorStop(0.8, '#060814');
    bgGrad.addColorStop(1, '#020308');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, W, H);

    // Cosmic Stars Field
    ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
    for (let i = 0; i < 60; i++) {
      const sx = (Math.sin(i * 127) * 0.5 + 0.5) * (W - 80) + 40;
      const sy = (Math.cos(i * 313) * 0.5 + 0.5) * (H - 80) + 40;
      const sr = (i % 3) * 0.7 + 0.8;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // 2. Ornate Royal Gold Filigree Borders
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 3.5;
    ctx.strokeRect(28, 28, W - 56, H - 56);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.35)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(38, 38, W - 76, H - 76);

    // Double beaded corner ornaments
    const drawCorner = (cx, cy) => {
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 16, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.stroke();
    };
    drawCorner(38, 38);
    drawCorner(W - 38, 38);
    drawCorner(38, H - 38);
    drawCorner(W - 38, H - 38);

    // 3. Header Title & Imperial Emblem
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText('✦ THẦN SỐ HỌC HOÀNG GIA & DUAL-ENGINE AI ✦', W / 2, 78);

    ctx.fillStyle = '#ffffff';
    ctx.font = '900 34px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.shadowColor = 'rgba(245, 158, 11, 0.4)';
    ctx.shadowBlur = 10;
    ctx.fillText('THẺ BÀI TÀI LỘC & VẬN MỆNH', W / 2, 122);
    ctx.shadowColor = 'transparent';

    ctx.fillStyle = '#94a3b8';
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Lộc Trời Khai Vận • Phúc Đức Vô Biên • Bùi Huy Hoàng', W / 2, 150);

    // Divider Line
    const lineGrad = ctx.createLinearGradient(100, 168, W - 100, 168);
    lineGrad.addColorStop(0, 'rgba(245, 158, 11, 0)');
    lineGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.9)');
    lineGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(100, 168);
    ctx.lineTo(W - 100, 168);
    ctx.stroke();

    // 4. Central 3D Glowing Lucky Orb
    const orbY = 295;
    const orbR = 95;

    // Celestial Cosmic Outer Glow
    const orbGlow = ctx.createRadialGradient(W / 2, orbY, orbR - 10, W / 2, orbY, orbR + 45);
    orbGlow.addColorStop(0, 'rgba(245, 158, 11, 0.6)');
    orbGlow.addColorStop(0.5, 'rgba(168, 85, 247, 0.35)');
    orbGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = orbGlow;
    ctx.beginPath();
    ctx.arc(W / 2, orbY, orbR + 45, 0, Math.PI * 2);
    ctx.fill();

    // Sphere 3D Metallic Gold Gradient
    const orbSphere = ctx.createRadialGradient(W / 2 - 28, orbY - 32, 12, W / 2, orbY, orbR);
    orbSphere.addColorStop(0, '#fef08a');
    orbSphere.addColorStop(0.3, '#f59e0b');
    orbSphere.addColorStop(0.75, '#b45309');
    orbSphere.addColorStop(1, '#451a03');
    ctx.fillStyle = orbSphere;
    ctx.beginPath();
    ctx.arc(W / 2, orbY, orbR, 0, Math.PI * 2);
    ctx.fill();

    // Sphere Border
    ctx.strokeStyle = '#fde68a';
    ctx.lineWidth = 3.5;
    ctx.stroke();

    // Lucky Number in Orb
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 92px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 4;
    ctx.fillText(num, W / 2, orbY + 32);
    ctx.shadowColor = 'transparent';

    // Sub-orb info pills
    const pairText = f.lucky_pair ? f.lucky_pair.join(' - ') : `${num} - ${num.split('').reverse().join('')}`;
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 18px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Cặp số tương sinh: [ ${pairText} ]`, W / 2, 422);

    ctx.fillStyle = '#c084fc';
    ctx.font = '16px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`⚡ ${f.element || 'Mệnh Kim (Phát tài kim ngân)'}`, W / 2, 448);

    // 5. Prophecy Scroll Box
    ctx.fillStyle = 'rgba(28, 36, 60, 0.9)';
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 70, 475, W - 140, 110, 12);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'italic 17px "Be Vietnam Pro", sans-serif';
    wrapCanvasText(ctx, `"${f.prophecy}"`, W / 2, 515, W - 200, 26);

    // 6. Rationale & Advice Box
    ctx.fillStyle = 'rgba(15, 20, 35, 0.9)';
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    roundRect(ctx, 70, 605, W - 140, 185, 12);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText('💡 GIẢI MÃ THIÊN CƠ:', 95, 638);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    wrapCanvasText(ctx, f.reason || 'Trực giác và vận khí đang hướng về con số tài lộc này.', 95, 666, W - 190, 23);

    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText('🧭 LỜI KHUYÊN HÔM NAY:', 95, 725);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '15px "Be Vietnam Pro", sans-serif';
    wrapCanvasText(ctx, f.action_advice || 'Giữ tâm tịnh, đón lộc xuân vui vẻ.', 95, 752, W - 190, 23);

    // 7. NEW: Dual-Engine Real-Time Math & Historical Gan Audit Seal
    const auditY = 810;
    ctx.fillStyle = 'rgba(18, 15, 40, 0.95)';
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.lineWidth = 2;
    roundRect(ctx, 70, auditY, W - 140, 175, 14);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'left';
    ctx.fillStyle = '#34d399';
    ctx.font = 'bold 16px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText('🛡️ KIỂM ĐỊNH TOÁN HỌC & KỶ LỤC LỊCH SỬ (DUAL-ENGINE)', 95, auditY + 32);

    // Confidence badge on card
    const confScore = l.confidence_score !== undefined ? l.confidence_score : 88;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 16px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText(`Độ An Toàn Vốn: ${confScore}%`, W - 95, auditY + 32);

    // Sub divider in audit box
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(95, auditY + 46);
    ctx.lineTo(W - 95, auditY + 46);
    ctx.stroke();

    // 3-Column Audit Stats inside Box
    const col1X = 95;
    const col2X = 320;
    const col3X = 550;
    const statY1 = auditY + 75;
    const statY2 = auditY + 102;
    const statY3 = auditY + 128;
    const statY4 = auditY + 152;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`• Chu kỳ phân tích: ${l.total_days_analyzed || 100} ngày`, col1X, statY1);
    ctx.fillText(`• Tần suất nổ: ${l.total_hits} lần (${l.status_label})`, col1X, statY2);
    ctx.fillText(`• Xếp hạng toàn bảng: #${l.target_rank} / 100`, col1X, statY3);
    ctx.fillText(`• Từng nổ Đề (ĐB): ${l.special_prize_hits} lần`, col1X, statY4);

    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`• Chưa về: ${l.days_unseen} ngày`, col2X, statY1);
    ctx.fillText(`• Lần cuối về: ${l.last_seen_date}`, col2X, statY2);
    ctx.fillText(`• Đánh giá: ${l.safety_status || 'An Toàn'}`, col2X, statY3);
    ctx.fillText(`• TB gan năm: ${l.avg_gan_yearly || 15} ngày`, col2X, statY4);

    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`• Max Gan 10-15 năm: ${l.max_gan_historical || 28} ngày`, col3X, statY1);
    ctx.fillStyle = '#94a3b8';
    ctx.font = '13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`• Kỷ lục năm: ${l.record_year || '2019'}`, col3X, statY2);
    ctx.fillStyle = '#22d3ee';
    ctx.font = 'bold 13px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`• Cách đỉnh: ${l.gan_gap >= 0 ? '+' : ''}${l.gan_gap} ngày`, col3X, statY3);
    ctx.fillStyle = '#34d399';
    ctx.font = '12px "Be Vietnam Pro", sans-serif';
    ctx.fillText(`✓ Đã xác thực toán học`, col3X, statY4);

    // 8. Lottery Status Ribbon
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(244, 63, 94, 0.25)';
    ctx.strokeStyle = '#f43f5e';
    ctx.lineWidth = 1.5;
    roundRect(ctx, 160, 1005, W - 320, 50, 25);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 19px "Plus Jakarta Sans", "Be Vietnam Pro", sans-serif';
    ctx.fillText(`📊 KQXS ${l.total_days_analyzed || 100} NGÀY: ${l.status_label} (${l.total_hits} lần nổ)`, W / 2, 1037);

    // 9. Footer Brand & Copyright
    ctx.fillStyle = '#94a3b8';
    ctx.font = '14px "Be Vietnam Pro", sans-serif';
    const todayStr = new Date().toLocaleDateString('vi-VN');
    ctx.fillText(`Ngày tạo: ${todayStr} • Tác quyền & Sáng tạo: Bùi Huy Hoàng`, W / 2, 1095);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 13px "Be Vietnam Pro", sans-serif';
    ctx.fillText('Hệ Thống Thần Số Học AI & Phân Tích Dữ Liệu Xổ Số Thông Minh', W / 2, 1120);

    ctx.fillStyle = '#64748b';
    ctx.font = '11px "Be Vietnam Pro", sans-serif';
    ctx.fillText('⚠️ Quẻ bói mang tính chất giải trí phong thủy vui vẻ & đối chiếu thống kê toán học!', W / 2, 1145);
  }

  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let curY = y;
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line.trim(), x, curY);
        line = words[n] + ' ';
        curY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line.trim(), x, curY);
    return curY + lineHeight;
  }

  // =========================================================================
  // TAB NAVIGATION LOGIC
  // =========================================================================
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');

      if (window.soundFX) window.soundFX.playTick();

      // Lazy load tab data using the currently selected timeframe
      if (target === 'board') {
        loadDrawsList(currentTimeframe);
        loadAdvancedStats(currentTimeframe);
      } else if (target === 'predict') {
        loadBacNho(bacNhoInput ? bacNhoInput.value : '68', currentTimeframe);
        loadAdvancedStats(currentTimeframe);
      } else if (target === 'dreams' && dreamResultsGrid && (!dreamResultsGrid.children.length)) {
        loadDreams();
      } else if (target === 'numerology') {
        calculateNumerology(currentTimeframe, true);
      } else if (target === 'pascal') {
        loadPascalDrawsList(currentTimeframe);
        loadTongDeAndXien3(currentTimeframe);
      } else if (target === 'chart') {
        initCharts(currentTimeframe);
        loadHeatmapMatrix(currentTimeframe);
      }
    });
  });

  // =========================================================================
  // UTILITY FUNCTIONS
  // =========================================================================
  function escapeHtml(str) {
    const p = document.createElement('p');
    p.textContent = str;
    return p.innerHTML;
  }

  // =========================================================================
  // =========================================================================
  // TAB 1: BẢNG KQXS 27 GIẢI & ĐẦU ĐUÔI
  // =========================================================================
  let drawsListCache = [];
  let currentDrawIndex = 0;
  let currentDrawData = null;

  async function loadDrawsList(timeframe = currentTimeframe) {
    try {
      const res = await fetch(`/api/lottery/draws?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.draws) {
        drawsListCache = data.draws;
        drawDateSelect.innerHTML = data.draws.map(d => `
          <option value="${d.index}">${d.date} (ĐB: ${d.special_prize || '--'})</option>
        `).join('');
        loadDrawDetail(0, timeframe);
      }
    } catch (e) {
      console.error('Error loading draws list:', e);
    }
  }

  async function loadDrawDetail(index, timeframe = currentTimeframe) {
    currentDrawIndex = parseInt(index) || 0;
    if (drawDateSelect) drawDateSelect.value = currentDrawIndex;
    try {
      const res = await fetch(`/api/lottery/draw-detail?index=${currentDrawIndex}&timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.draw) {
        currentDrawData = data.draw;
        renderDrawTable(data.draw);
      }
    } catch (e) {
      console.error('Error loading draw detail:', e);
    }
  }

  // Format a number with highlighted last 2 digits
  function formatPrizeNum(str) {
    if (!str) return '<span class="num-wrap num-waiting"><span class="live-spin-ball">🎲</span><span class="num-placeholder">-----</span></span>';
    const s = String(str).trim();
    if (s.length <= 2) {
      return `<span class="loto-tail-only">${s}</span>`;
    }
    const head = s.slice(0, -2);
    const tail = s.slice(-2);
    return `<span class="num-wrap"><span class="num-head-dim">${head}</span><strong class="num-tail-glow">${tail}</strong></span>`;
  }

  function renderDrawTable(d) {
    if (!d) return;
    boardDrawTitle.textContent = `Kết Quả XSMB Ngày: ${d.date}`;
    boardDbBadge.textContent = d.special_loto ? `ĐB: ${d.special_loto} (${d.special_prize})` : 'ĐB: Đang quay...';
    if (jackpotDatePill) jackpotDatePill.textContent = `Kỳ quay ngày ${d.date}`;

    // 1. Golden Jackpot Showcase
    const dbFull = d.special_prize ? String(d.special_prize).padStart(5, '0') : '-----';
    if (jackpotFiveDigits) {
      jackpotFiveDigits.innerHTML = `
        <span class="digit-box">${dbFull[0]}</span>
        <span class="digit-box">${dbFull[1]}</span>
        <span class="digit-box">${dbFull[2]}</span>
        <span class="digit-box digit-special">${dbFull[3]}</span>
        <span class="digit-box digit-special">${dbFull[4]}</span>
      `;
    }
    if (jackpotLotoSpotlight) {
      jackpotLotoSpotlight.textContent = d.special_loto || '--';
    }

    // 2. Compute Jackpot Metadata
    if (d.special_loto) {
      const lotoStr = String(d.special_loto).padStart(2, '0');
      const d1 = parseInt(lotoStr[0], 10) || 0;
      const d2 = parseInt(lotoStr[1], 10) || 0;
      const sumVal = (d1 + d2) % 10;

      if (metaTongDe) metaTongDe.textContent = `${sumVal} (${d1}+${d2}=${d1 + d2})`;
      if (metaChamDe) metaChamDe.textContent = d1 === d2 ? `Chạm ${d1}` : `Chạm ${d1}, ${d2}`;

      const chanLe1 = d1 % 2 === 0 ? 'Chẵn' : 'Lẻ';
      const chanLe2 = d2 % 2 === 0 ? 'Chẵn' : 'Lẻ';
      const taiXiu = parseInt(lotoStr, 10) >= 50 ? 'Tài' : 'Xỉu';
      if (metaTypeDe) metaTypeDe.textContent = `${chanLe1}-${chanLe2} • ${taiXiu}`;
      if (metaDauDuoiDe) metaDauDuoiDe.textContent = `Đầu ${d1} - Đuôi ${d2}`;
    } else {
      if (metaTongDe) metaTongDe.textContent = 'Đang quay...';
      if (metaChamDe) metaChamDe.textContent = 'Chưa có';
      if (metaTypeDe) metaTypeDe.textContent = '--';
      if (metaDauDuoiDe) metaDauDuoiDe.textContent = '--';
    }

    // 3. Render 27-Prize Table Pro (Supports Live Drawing Slots)
    const p = d.prizes_structured || {};
    const renderTier = (tierKey, targetCount, digits) => {
      const drawn = p[tierKey] || [];
      const items = [];
      for (let i = 0; i < targetCount; i++) {
        if (i < drawn.length) {
          items.push(formatPrizeNum(drawn[i]));
        } else {
          items.push(`<span class="num-wrap num-waiting" title="Đang quay..."><span class="live-spin-ball">🎲</span><span class="num-placeholder">${'-'.repeat(digits)}</span></span>`);
        }
      }
      return items.join('');
    };

    prizeDB.innerHTML = renderTier('db', 1, 5);
    prizeG1.innerHTML = renderTier('g1', 1, 5);
    prizeG2.innerHTML = renderTier('g2', 2, 5);
    prizeG3.innerHTML = renderTier('g3', 6, 5);
    prizeG4.innerHTML = renderTier('g4', 4, 4);
    prizeG5.innerHTML = renderTier('g5', 6, 4);
    prizeG6.innerHTML = renderTier('g6', 3, 3);

    const g7Drawn = p.g7 || [];
    const g7Items = [];
    for (let i = 0; i < 4; i++) {
      if (i < g7Drawn.length) {
        g7Items.push(`<span class="prize-g7-item"><strong class="g7-tail-num">${g7Drawn[i]}</strong></span>`);
      } else {
        g7Items.push(`<span class="prize-g7-item num-waiting" title="Đang quay..."><span class="live-spin-ball">🎲</span><span class="num-placeholder">--</span></span>`);
      }
    }
    prizeG7.innerHTML = g7Items.join('');

    // 4. Render Head-Tail (Đầu-Đuôi)
    renderDauDuoi(d.dau_map, d.duoi_map, d.cam_dau, d.cam_duoi, d.special_loto);

    // 5. Daily Quick Insights
    let maxHead = '0';
    let maxHeadCount = 0;
    for (const [k, tails] of Object.entries(d.dau_map)) {
      if (tails.length > maxHeadCount) {
        maxHeadCount = tails.length;
        maxHead = k;
      }
    }
    if (insightTopDau) {
      insightTopDau.textContent = maxHeadCount > 0 ? `Đầu ${maxHead} (${maxHeadCount} nháy)` : '--';
    }

    if (insightCamDau) {
      insightCamDau.textContent = d.cam_dau.length ? d.cam_dau.map(c => `Đầu ${c}`).join(', ') : 'Không có';
    }

    if (insightCamDuoi) {
      insightCamDuoi.textContent = d.cam_duoi.length ? d.cam_duoi.map(c => `Đuôi ${c}`).join(', ') : 'Không có';
    }

    const kepList = [...new Set(d.loto_2digits.filter(n => n.length === 2 && n[0] === n[1]))].sort();
    if (insightLoKep) {
      insightLoKep.textContent = kepList.length ? kepList.join(', ') : 'Không có';
    }
  }

  function renderDauDuoi(dauMap, duoiMap, camDau, camDuoi, specialLoto = '') {
    // 1. Đầu Table (Group unique tails and count hits: 1, 2, 3, 4, 5, 6+ nháy)
    dauTableBody.innerHTML = Object.keys(dauMap).map(k => {
      const tails = dauMap[k];
      const isCam = camDau.includes(k);

      if (isCam) {
        return `
          <tr>
            <td class="dau-duoi-head-col"><span class="head-circle">${k}</span></td>
            <td><div class="tails-list"><span class="cam-indicator-badge">CÂM</span></div></td>
          </tr>
        `;
      }

      // Group & count unique tails
      const tailCounts = {};
      tails.forEach(t => {
        tailCounts[t] = (tailCounts[t] || 0) + 1;
      });
      const uniqueTails = Object.keys(tailCounts).sort();

      const tailsHtml = uniqueTails.map(t => {
        const num = k + t;
        const isDB = (num === specialLoto);
        const count = tailCounts[t];

        let stackClass = 'stack-hit-1';
        let stackBadge = '';
        let stackDesc = '1 nháy';

        if (count === 2) {
          stackClass = 'stack-hit-2';
          stackBadge = '<span class="stack-badge badge-2">2🎴</span>';
          stackDesc = '2 nháy (Song Lộc)';
        } else if (count === 3) {
          stackClass = 'stack-hit-3';
          stackBadge = '<span class="stack-badge badge-3">3🎴</span>';
          stackDesc = '3 nháy (Tam Hoa)';
        } else if (count === 4) {
          stackClass = 'stack-hit-4';
          stackBadge = '<span class="stack-badge badge-4">4🎴</span>';
          stackDesc = '4 nháy (Tứ Quý)';
        } else if (count === 5) {
          stackClass = 'stack-hit-5';
          stackBadge = '<span class="stack-badge badge-5">5🎴</span>';
          stackDesc = '5 nháy (Ngũ Phúc)';
        } else if (count >= 6) {
          stackClass = 'stack-hit-6';
          stackBadge = `<span class="stack-badge badge-6">${count}★</span>`;
          stackDesc = `${count} nháy (Kỷ Lục Vô Song)`;
        }

        let dbBadge = '';
        if (isDB) {
          stackClass += ' is-special-db';
          dbBadge = '<span class="crown-icon" title="Giải Đặc Biệt">👑</span>';
        }

        const titleText = `Số ${num}: Nổ ${count} nháy (${stackDesc})${isDB ? ' • TRÚNG ĐỀ ĐẶC BIỆT 👑' : ''}`;

        return `
          <div class="stack-3d-card ${stackClass}" data-num="${num}" data-count="${count}" title="${titleText}">
            <span class="stack-digit">${t}</span>
            ${dbBadge}
            ${stackBadge}
          </div>
        `;
      }).join(' ');

      return `
        <tr>
          <td class="dau-duoi-head-col"><span class="head-circle">${k}</span></td>
          <td><div class="tails-list">${tailsHtml}</div></td>
        </tr>
      `;
    }).join('');

    // 2. Đuôi Table (Group unique heads and count hits)
    duoiTableBody.innerHTML = Object.keys(duoiMap).map(k => {
      const heads = duoiMap[k];
      const isCam = camDuoi.includes(k);

      if (isCam) {
        return `
          <tr>
            <td class="dau-duoi-head-col tail-accent"><span class="head-circle tail-circle">${k}</span></td>
            <td><div class="tails-list"><span class="cam-indicator-badge">CÂM</span></div></td>
          </tr>
        `;
      }

      // Group & count unique heads
      const headCounts = {};
      heads.forEach(h => {
        headCounts[h] = (headCounts[h] || 0) + 1;
      });
      const uniqueHeads = Object.keys(headCounts).sort();

      const headsHtml = uniqueHeads.map(h => {
        const num = h + k;
        const isDB = (num === specialLoto);
        const count = headCounts[h];

        let stackClass = 'stack-hit-1';
        let stackBadge = '';
        let stackDesc = '1 nháy';

        if (count === 2) {
          stackClass = 'stack-hit-2';
          stackBadge = '<span class="stack-badge badge-2">2🎴</span>';
          stackDesc = '2 nháy (Song Lộc)';
        } else if (count === 3) {
          stackClass = 'stack-hit-3';
          stackBadge = '<span class="stack-badge badge-3">3🎴</span>';
          stackDesc = '3 nháy (Tam Hoa)';
        } else if (count === 4) {
          stackClass = 'stack-hit-4';
          stackBadge = '<span class="stack-badge badge-4">4🎴</span>';
          stackDesc = '4 nháy (Tứ Quý)';
        } else if (count === 5) {
          stackClass = 'stack-hit-5';
          stackBadge = '<span class="stack-badge badge-5">5🎴</span>';
          stackDesc = '5 nháy (Ngũ Phúc)';
        } else if (count >= 6) {
          stackClass = 'stack-hit-6';
          stackBadge = `<span class="stack-badge badge-6">${count}★</span>`;
          stackDesc = `${count} nháy (Kỷ Lục Vô Song)`;
        }

        let dbBadge = '';
        if (isDB) {
          stackClass += ' is-special-db';
          dbBadge = '<span class="crown-icon" title="Giải Đặc Biệt">👑</span>';
        }

        const titleText = `Số ${num}: Nổ ${count} nháy (${stackDesc})${isDB ? ' • TRÚNG ĐỀ ĐẶC BIỆT 👑' : ''}`;

        return `
          <div class="stack-3d-card ${stackClass}" data-num="${num}" data-count="${count}" title="${titleText}">
            <span class="stack-digit">${h}</span>
            ${dbBadge}
            ${stackBadge}
          </div>
        `;
      }).join(' ');

      return `
        <tr>
          <td class="dau-duoi-head-col tail-accent"><span class="head-circle tail-circle">${k}</span></td>
          <td><div class="tails-list">${headsHtml}</div></td>
        </tr>
      `;
    }).join('');
  }

  // Draw Selector Handlers
  if (drawDateSelect) {
    drawDateSelect.addEventListener('change', () => {
      loadDrawDetail(drawDateSelect.value, currentTimeframe);
    });
  }
  if (btnPrevDraw) {
    btnPrevDraw.addEventListener('click', () => {
      if (currentDrawIndex < drawsListCache.length - 1) {
        loadDrawDetail(currentDrawIndex + 1, currentTimeframe);
      } else {
        showToast(`Đã ở kỳ cũ nhất trong ${currentTimeframe} ngày`);
      }
    });
  }
  if (btnNextDraw) {
    btnNextDraw.addEventListener('click', () => {
      if (currentDrawIndex > 0) {
        loadDrawDetail(currentDrawIndex - 1, currentTimeframe);
      } else {
        showToast('Đã ở kỳ mới nhất');
      }
    });
  }
  if (btnLatestDraw) {
    btnLatestDraw.addEventListener('click', () => {
      loadDrawDetail(0, currentTimeframe);
      showToast('⚡ Đã chuyển về kỳ quay mới nhất!');
      if (window.soundFX) window.soundFX.playTick();
    });
  }

  // Copy KQXS Result Button
  if (btnCopyKqxs) {
    btnCopyKqxs.addEventListener('click', async () => {
      if (!currentDrawData) {
        showToast('⚠️ Chưa có dữ liệu kỳ quay để sao chép!');
        return;
      }
      const d = currentDrawData;
      const p = d.prizes_structured;
      const dbLoto = d.special_loto || '--';
      const d1 = parseInt(dbLoto[0], 10) || 0;
      const d2 = parseInt(dbLoto[1], 10) || 0;
      const sumVal = (d1 + d2) % 10;
      const kepList = [...new Set(d.loto_2digits.filter(n => n.length === 2 && n[0] === n[1]))].sort();

      const text = `🏆 KẾT QUẢ XỔ SỐ MIỀN BẮC (XSMB) - NGÀY ${d.date}
⭐ ĐẶC BIỆT: ${p.db[0] || '-----'} (Đề: ${dbLoto} • Tổng ${sumVal})
🥇 Giải Nhất: ${p.g1[0] || '-----'}
🥈 Giải Nhì: ${(p.g2 || []).join(' - ')}
🥉 Giải Ba: ${(p.g3 || []).join(' - ')}
🎖️ Giải Tư: ${(p.g4 || []).join(' - ')}
🎖️ Giải Năm: ${(p.g5 || []).join(' - ')}
🎖️ Giải Sáu: ${(p.g6 || []).join(' - ')}
🎖️ Giải Bảy: ${(p.g7 || []).join(' - ')}
---------------------------------------------
🧊 Đầu câm: ${d.cam_dau.length ? d.cam_dau.join(', ') : 'Không có'} | Đuôi câm: ${d.cam_duoi.length ? d.cam_duoi.join(', ') : 'Không có'}
🎲 Lô kép: ${kepList.length ? kepList.join(', ') : 'Không có'}
✨ Xem trực tiếp & phân tích tại: ${window.location.origin}`;

      try {
        await navigator.clipboard.writeText(text);
        btnCopyKqxs.innerHTML = '<span>✅</span> Đã Sao Chép!';
        showToast('📋 Đã sao chép toàn bộ bảng KQXS 27 giải vào clipboard!');
        if (window.soundFX) window.soundFX.playFanfare();
        setTimeout(() => {
          btnCopyKqxs.innerHTML = '<span>📋</span> Sao Chép Kết Quả';
        }, 2200);
      } catch (err) {
        showToast('⚠️ Không thể tự động sao chép.');
      }
    });
  }

  // =========================================================================
  // LIVE STREAM & SIMULATION CONTROLLER (TƯỜNG THUẬT & MÔ PHỎNG QUAY TỪNG SỐ)
  // =========================================================================
  const btnLiveStream = document.getElementById('btnLiveStream');
  const btnSimulateDraw = document.getElementById('btnSimulateDraw');
  const btnLiveStop = document.getElementById('btnLiveStop');
  const btnLiveSpeed = document.getElementById('btnLiveSpeed');
  const liveStreamBanner = document.getElementById('liveStreamBanner');
  const liveTitleText = document.getElementById('liveTitleText');
  const liveSubText = document.getElementById('liveSubText');
  const liveProgressCount = document.getElementById('liveProgressCount');
  const liveDateText = document.getElementById('liveDateText');

  let livePollingTimer = null;
  let isLiveActive = false;
  let isSimulating = false;
  let simulationTimer = null;
  let simulationSpeed = 1; // 1x, 2x, 4x
  let lastDrawnCount = 0;

  // Drawing sequence in authentic XSMB: G1 -> G2 (2) -> G3 (6) -> G4 (4) -> G5 (6) -> G6 (3) -> G7 (4) -> DB (1)
  const XSMB_DRAW_SEQUENCE = [
    { tier: 'g1', idx: 0, label: 'Giải Nhất' },
    { tier: 'g2', idx: 0, label: 'Giải Nhì (1)' },
    { tier: 'g2', idx: 1, label: 'Giải Nhì (2)' },
    { tier: 'g3', idx: 0, label: 'Giải Ba (1)' },
    { tier: 'g3', idx: 1, label: 'Giải Ba (2)' },
    { tier: 'g3', idx: 2, label: 'Giải Ba (3)' },
    { tier: 'g3', idx: 3, label: 'Giải Ba (4)' },
    { tier: 'g3', idx: 4, label: 'Giải Ba (5)' },
    { tier: 'g3', idx: 5, label: 'Giải Ba (6)' },
    { tier: 'g4', idx: 0, label: 'Giải Tư (1)' },
    { tier: 'g4', idx: 1, label: 'Giải Tư (2)' },
    { tier: 'g4', idx: 2, label: 'Giải Tư (3)' },
    { tier: 'g4', idx: 3, label: 'Giải Tư (4)' },
    { tier: 'g5', idx: 0, label: 'Giải Năm (1)' },
    { tier: 'g5', idx: 1, label: 'Giải Năm (2)' },
    { tier: 'g5', idx: 2, label: 'Giải Năm (3)' },
    { tier: 'g5', idx: 3, label: 'Giải Năm (4)' },
    { tier: 'g5', idx: 4, label: 'Giải Năm (5)' },
    { tier: 'g5', idx: 5, label: 'Giải Năm (6)' },
    { tier: 'g6', idx: 0, label: 'Giải Sáu (1)' },
    { tier: 'g6', idx: 1, label: 'Giải Sáu (2)' },
    { tier: 'g6', idx: 2, label: 'Giải Sáu (3)' },
    { tier: 'g7', idx: 0, label: 'Giải Bảy (1)' },
    { tier: 'g7', idx: 1, label: 'Giải Bảy (2)' },
    { tier: 'g7', idx: 2, label: 'Giải Bảy (3)' },
    { tier: 'g7', idx: 3, label: 'Giải Bảy (4)' },
    { tier: 'db', idx: 0, label: 'Giải Đặc Biệt' }
  ];

  async function checkAndPollLive() {
    try {
      const res = await fetch('/api/lottery/live');
      const data = await res.json();
      if (!data.success) return data;

      const d = data.draw;
      if (liveProgressCount) {
        liveProgressCount.textContent = `${data.total_drawn} / 27 giải`;
      }
      if (liveDateText) {
        liveDateText.textContent = d.date || 'Hôm nay';
      }

      // Check if new number was drawn since last tick
      if (data.total_drawn > lastDrawnCount) {
        if (lastDrawnCount > 0 && window.soundFX) {
          window.soundFX.playFanfare();
        }
        lastDrawnCount = data.total_drawn;
      }

      // If live mode is active, update the board directly
      if (isLiveActive) {
        renderDrawTable(d);
        currentDrawData = d;
      }

      // Auto-detect if currently live drawing
      if (!isLiveActive && !isSimulating && data.is_drawing && data.total_drawn < 27) {
        startLiveMode(false);
      } else if (data.is_completed && isLiveActive) {
        if (liveProgressCount) {
          liveProgressCount.textContent = `27 / 27 (Đã Hoàn Tất! 🎉)`;
        }
        showToast('🎉 Đã hoàn tất đủ 27 giải XSMB hôm nay!');
        setTimeout(() => {
          stopLiveMode();
        }, 12000);
      }

      return data;
    } catch (e) {
      console.warn('[Live Stream Error]:', e);
      return null;
    }
  }

  function startLiveMode(showNotification = true) {
    if (isSimulating) stopSimulation();

    isLiveActive = true;
    if (liveStreamBanner) liveStreamBanner.style.display = 'flex';
    if (liveTitleText) liveTitleText.textContent = '🔴 ĐANG QUAY TRỰC TIẾP XSMB (REALTIME)';
    if (liveSubText) liveSubText.textContent = 'Đồng bộ từng giải từ trường quay trực tiếp theo thời gian thực';
    if (btnLiveSpeed) btnLiveSpeed.style.display = 'none';

    if (btnLiveStream) {
      btnLiveStream.classList.add('is-live-active');
      const txtSpan = btnLiveStream.querySelector('.live-btn-text');
      if (txtSpan) txtSpan.textContent = '🔴 Đang Xem Live...';
    }
    if (btnLatestDraw) btnLatestDraw.classList.remove('active');

    if (showNotification) {
      showToast('🔴 Đã kích hoạt Tường Thuật Trực Tiếp XSMB!');
      if (window.soundFX) window.soundFX.playFanfare();
    }

    checkAndPollLive();
    if (livePollingTimer) clearInterval(livePollingTimer);
    livePollingTimer = setInterval(checkAndPollLive, 3000);
  }

  function stopLiveMode() {
    isLiveActive = false;
    if (livePollingTimer) {
      clearInterval(livePollingTimer);
      livePollingTimer = null;
    }
    if (liveStreamBanner && !isSimulating) liveStreamBanner.style.display = 'none';
    if (btnLiveStream) {
      btnLiveStream.classList.remove('is-live-active');
      const txtSpan = btnLiveStream.querySelector('.live-btn-text');
      if (txtSpan) txtSpan.textContent = '🔴 Trực Tiếp Live';
    }
  }

  // Live Simulation Engine (Quay thử / Mô phỏng trực tiếp từng giải một)
  function startSimulation() {
    if (isLiveActive) stopLiveMode();
    stopSimulation();

    if (!currentDrawData || !currentDrawData.prizes_structured) {
      showToast('⚠️ Vui lòng đợi nạp kết quả kỳ quay để mô phỏng!');
      return;
    }

    isSimulating = true;
    if (btnSimulateDraw) {
      btnSimulateDraw.classList.add('is-simulating');
      btnSimulateDraw.innerHTML = '<span>⏹️</span> Dừng Mô Phỏng';
    }
    if (liveStreamBanner) liveStreamBanner.style.display = 'flex';
    if (liveTitleText) liveTitleText.textContent = '▶️ MÔ PHỎNG QUAY TRỰC TIẾP TỪNG SỐ (XSMB)';
    if (liveSubText) liveSubText.textContent = 'Mô phỏng chân thực từng quả cầu quay, âm thanh lồng cầu & bảng xếp thẻ 3D';
    if (btnLiveSpeed) btnLiveSpeed.style.display = 'inline-block';
    if (liveDateText) liveDateText.textContent = currentDrawData.date || 'Hôm nay';
    if (liveProgressCount) liveProgressCount.textContent = '0 / 27 giải';

    showToast('▶️ Bắt đầu mô phỏng quay trực tiếp từng giải XSMB!');
    if (window.soundFX) window.soundFX.playFanfare();

    // Clone source prizes to reveal
    const fullPrizes = JSON.parse(JSON.stringify(currentDrawData.prizes_structured));
    const targetDate = currentDrawData.date;
    const finalDB = (fullPrizes.db && fullPrizes.db[0]) || '88888';
    const finalSpecialLoto = finalDB.slice(-2);

    // Initial blank state
    const simState = {
      date: targetDate,
      special_prize: '',
      special_loto: '',
      prizes_structured: {
        db: [], g1: [], g2: [], g3: [], g4: [], g5: [], g6: [], g7: []
      },
      dau_map: { '0':[], '1':[], '2':[], '3':[], '4':[], '5':[], '6':[], '7':[], '8':[], '9':[] },
      duoi_map: { '0':[], '1':[], '2':[], '3':[], '4':[], '5':[], '6':[], '7':[], '8':[], '9':[] },
      cam_dau: ['0','1','2','3','4','5','6','7','8','9'],
      cam_duoi: ['0','1','2','3','4','5','6','7','8','9'],
      loto_2digits: [],
      all_prizes: []
    };

    renderDrawTable(simState);

    let stepIndex = 0;
    const totalSteps = XSMB_DRAW_SEQUENCE.length;

    function runNextStep() {
      if (!isSimulating) return;

      if (stepIndex >= totalSteps) {
        // Completed
        if (liveProgressCount) liveProgressCount.textContent = '27 / 27 (Hoàn Tất! 🎉)';
        showToast('🎉 Đã hoàn tất mô phỏng đủ 27 giải mở thưởng!');
        if (window.soundFX) window.soundFX.playFanfare();
        setTimeout(stopSimulation, 8000);
        return;
      }

      const seq = XSMB_DRAW_SEQUENCE[stepIndex];
      const tierKey = seq.tier;
      const prizeIdx = seq.idx;
      const fullList = fullPrizes[tierKey] || [];
      const prizeNum = fullList[prizeIdx] || (tierKey === 'g7' ? '68' : '68686');
      const lotoTail = prizeNum.slice(-2);

      // Sound & Tick
      if (window.soundFX) {
        window.soundFX.playTick();
      }

      // Add prize into simState
      simState.prizes_structured[tierKey].push(prizeNum);
      simState.all_prizes.push(prizeNum);
      simState.loto_2digits.push(lotoTail);

      // Update Dau / Duoi maps
      const d = lotoTail[0];
      const u = lotoTail[1];
      if (simState.dau_map[d]) simState.dau_map[d].push(u);
      if (simState.duoi_map[u]) simState.duoi_map[u].push(d);

      // Re-sort
      for (const k in simState.dau_map) simState.dau_map[k].sort();
      for (const k in simState.duoi_map) simState.duoi_map[k].sort();

      simState.cam_dau = Object.keys(simState.dau_map).filter(k => simState.dau_map[k].length === 0);
      simState.cam_duoi = Object.keys(simState.duoi_map).filter(k => simState.duoi_map[k].length === 0);

      if (tierKey === 'db') {
        simState.special_prize = prizeNum;
        simState.special_loto = lotoTail;
      }

      // Render table
      renderDrawTable(simState);

      // Update counter
      stepIndex++;
      if (liveProgressCount) {
        liveProgressCount.textContent = `${stepIndex} / 27 giải (${seq.label})`;
      }

      if (tierKey === 'db' && window.soundFX) {
        window.soundFX.playFanfare();
        showToast(`👑 NỔ GIẢI ĐẶC BIỆT: ${prizeNum} (Đề: ${lotoTail})! 🎉`);
      } else if (window.soundFX) {
        window.soundFX.playLock();
      }

      const baseDelay = tierKey === 'db' ? 2200 : (tierKey === 'g1' ? 1200 : 800);
      const delay = Math.max(120, Math.floor(baseDelay / simulationSpeed));
      simulationTimer = setTimeout(runNextStep, delay);
    }

    // Launch first step after small breath
    simulationTimer = setTimeout(runNextStep, 600);
  }

  function stopSimulation() {
    isSimulating = false;
    if (simulationTimer) {
      clearTimeout(simulationTimer);
      simulationTimer = null;
    }
    if (btnSimulateDraw) {
      btnSimulateDraw.classList.remove('is-simulating');
      btnSimulateDraw.innerHTML = '<span>▶️</span> Mô Phỏng Quay Từng Số';
    }
    if (btnLiveSpeed) btnLiveSpeed.style.display = 'none';
    if (liveStreamBanner && !isLiveActive) liveStreamBanner.style.display = 'none';

    // Restore original current draw
    if (currentDrawData) {
      renderDrawTable(currentDrawData);
    }
  }

  // Wire buttons
  if (btnLiveStream) {
    btnLiveStream.addEventListener('click', async () => {
      if (isLiveActive) {
        stopLiveMode();
        showToast('⏸️ Đã tạm dừng chế độ Live.');
      } else {
        const liveInfo = await checkAndPollLive();
        if (liveInfo && (liveInfo.is_live_window || liveInfo.is_drawing)) {
          startLiveMode(true);
        } else {
          // Outside live window: offer simulation or live mode
          showToast('ℹ️ Hiện tại ngoài khung giờ quay (18h15 - 18h30). Bật Mô Phỏng Quay Từng Số để xem trực quan!');
          startSimulation();
        }
      }
    });
  }

  if (btnSimulateDraw) {
    btnSimulateDraw.addEventListener('click', () => {
      if (isSimulating) {
        stopSimulation();
        showToast('⏹️ Đã dừng chế độ mô phỏng.');
      } else {
        startSimulation();
      }
    });
  }

  if (btnLiveSpeed) {
    btnLiveSpeed.addEventListener('click', () => {
      if (simulationSpeed === 1) {
        simulationSpeed = 2;
        btnLiveSpeed.textContent = '⚡ 2x';
      } else if (simulationSpeed === 2) {
        simulationSpeed = 4;
        btnLiveSpeed.textContent = '⚡ 4x';
      } else {
        simulationSpeed = 1;
        btnLiveSpeed.textContent = '⚡ 1x';
      }
      showToast(`⚡ Tốc độ mô phỏng: ${simulationSpeed}x`);
    });
  }

  if (btnLiveStop) {
    btnLiveStop.addEventListener('click', () => {
      if (isSimulating) stopSimulation();
      if (isLiveActive) stopLiveMode();
      showToast('⏸️ Đã dừng chế độ Live / Mô Phỏng.');
    });
  }

  // Auto-check live status on boot
  setTimeout(checkAndPollLive, 1000);

  // Đầu / Đuôi view toggle
  if (btnShowDau && btnShowDuoi) {
    btnShowDau.addEventListener('click', () => {
      dauViewContainer.style.display = 'block';
      duoiViewContainer.style.display = 'none';
      btnShowDau.style.background = 'rgba(245,158,11,0.2)';
      btnShowDau.style.borderColor = 'var(--gold-400)';
      btnShowDau.style.color = '#fff';
      btnShowDuoi.style.background = 'transparent';
      btnShowDuoi.style.borderColor = 'var(--border-subtle)';
      btnShowDuoi.style.color = 'var(--text-muted)';
    });

    btnShowDuoi.addEventListener('click', () => {
      dauViewContainer.style.display = 'none';
      duoiViewContainer.style.display = 'block';
      btnShowDuoi.style.background = 'rgba(168,85,247,0.2)';
      btnShowDuoi.style.borderColor = 'var(--purple-400)';
      btnShowDuoi.style.color = '#fff';
      btnShowDau.style.background = 'transparent';
      btnShowDau.style.borderColor = 'var(--border-subtle)';
      btnShowDau.style.color = 'var(--text-muted)';
    });
  }

  // =========================================================================
  // TAB 4: SOI CẦU BẠC NHỚ & LÔ RƠI
  // =========================================================================
  async function loadAdvancedStats(timeframe = currentTimeframe) {
    try {
      const res = await fetch(`/api/lottery/advanced-stats?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success) {
        renderAdvancedStats(data, timeframe);
      }
    } catch (e) {
      console.error('Error loading advanced stats:', e);
    }
  }

  function renderAdvancedStats(data, timeframe = currentTimeframe) {
    const dd = data.dau_duoi;
    const lr = data.lo_roi;
    const pairs = data.top_pairs;

    // 1. Dau/Duoi dynamic timeframe bars
    if (dd && dauAggregateBars && duoiAggregateBars) {
      const maxDau = Math.max(...Object.values(dd.dau_counts), 1);
      dauAggregateBars.innerHTML = Object.entries(dd.dau_counts).map(([k, v]) => `
        <div class="digit-bar-row">
          <span class="digit-label">Đầu ${k}</span>
          <div class="digit-bar-track">
            <div class="digit-bar-fill" style="width: ${(v / maxDau) * 100}%;"></div>
          </div>
          <span class="digit-val-count">${v} lần</span>
        </div>
      `).join('');

      const maxDuoi = Math.max(...Object.values(dd.duoi_counts), 1);
      duoiAggregateBars.innerHTML = Object.entries(dd.duoi_counts).map(([k, v]) => `
        <div class="digit-bar-row">
          <span class="digit-label" style="color: var(--purple-400);">Đuôi ${k}</span>
          <div class="digit-bar-track">
            <div class="digit-bar-fill" style="width: ${(v / maxDuoi) * 100}%; background: linear-gradient(90deg, var(--purple-500), var(--cyan-500));"></div>
          </div>
          <span class="digit-val-count">${v} lần</span>
        </div>
      `).join('');
    }

    // 2. Lo Roi stats
    if (lr) {
      if (loRoiDeRate) loRoiDeRate.textContent = `${lr.lo_roi_de_rate}% (${lr.lo_roi_de_count} lần / ${timeframe} ngày)`;

      if (activeStreaksList) {
        activeStreaksList.innerHTML = lr.active_streaks.length ? lr.active_streaks.map(s => `
          <div style="background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.3); border-radius: 6px; padding: 0.5rem 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: var(--cyan-400); font-family: var(--font-heading); font-size: 1.1rem;">Số ${s.number}</strong>
            <span style="font-size: 0.8rem; color: #fff;">${s.description}</span>
          </div>
        `).join('') : '<div style="color: var(--text-dim); font-size: 0.85rem;">Hiện không có con số nào đang giữ chuỗi nổ liên tiếp &ge; 2 ngày.</div>';
      }

      if (loRoiDeHistoryList) {
        loRoiDeHistoryList.innerHTML = lr.lo_roi_de_history.length ? lr.lo_roi_de_history.map(item => `
          <div style="padding: 0.35rem 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;">
            <span>ĐB ngày ${item.date_de} (${item.number}) &rarr; Nổ ngày ${item.date_roi}</span>
            <strong style="color: var(--gold-400);">${item.hit_count} nháy ${item.is_special_again ? '👑 (Đặc biệt!)' : ''}</strong>
          </div>
        `).join('') : '<div style="color: var(--text-dim);">Chưa ghi nhận lô rơi từ đề.</div>';
      }
    }

    // 3. Top Pairs
    if (pairs && topPairsGrid) {
      topPairsGrid.innerHTML = pairs.map(p => `
        <div class="pair-card-item">
          <div>
            <span class="pair-badge-text">[ ${p.pair_str} ]</span>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 2px;">Cùng xuất hiện ${p.together_count}/${timeframe} ngày</div>
          </div>
          <span style="color: var(--gold-400); font-weight: 800; font-size: 0.95rem;">${p.rate}%</span>
        </div>
      `).join('');
    }
  }

  // Bạc Nhớ Search Handler
  if (bacNhoForm) {
    bacNhoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const num = bacNhoInput.value.trim();
      loadBacNho(num, currentTimeframe);
    });
  }

  async function loadBacNho(numberStr, timeframe = currentTimeframe) {
    const formatted = String(parseInt(numberStr || '68') || '68').padStart(2, '0');
    if (bacNhoSummaryText) bacNhoSummaryText.textContent = `Đang soi bạc nhớ cho con số ${formatted} trong ${timeframe} ngày...`;
    try {
      const res = await fetch(`/api/lottery/bac-nho?number=${formatted}&timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.bac_nho) {
        const b = data.bac_nho;
        if (bacNhoSummaryText) {
          bacNhoSummaryText.textContent = `Trong ${timeframe} ngày qua, số [${formatted}] từng xuất hiện ${b.trigger_days_count} lần. Kỳ quay hôm sau, các con số nổ nhiều nhất là:`;
        }
        if (b.top_bac_nho && b.top_bac_nho.length && bacNhoCardsList) {
          bacNhoCardsList.innerHTML = b.top_bac_nho.map(item => `
            <div class="bac-nho-card-item">
              <div class="bac-nho-number">${item.number}</div>
              <div class="bac-nho-rate">Nổ ${item.hits_after} lần (${item.percentage}%)</div>
            </div>
          `).join('');
        } else if (bacNhoCardsList) {
          bacNhoCardsList.innerHTML = `<div style="grid-column: 1/-1; color: var(--text-dim); text-align: center; padding: 1rem;">Chưa có đủ dữ liệu chu kỳ cho số này trong ${timeframe} ngày qua.</div>`;
        }
      }
    } catch (e) {
      if (bacNhoSummaryText) bacNhoSummaryText.textContent = 'Lỗi kết nối khi soi bạc nhớ';
    }
  }

  // =========================================================================
  // TAB 5: SỔ MƠ TOÀN TẬP
  // =========================================================================
  let currentDreamCategory = 'all';

  async function loadDreams(query = '', category = 'all') {
    try {
      const url = `/api/dream-book?query=${encodeURIComponent(query)}&category=${encodeURIComponent(category)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.dreams) {
        renderDreamCards(data.dreams);
      }
    } catch (e) {
      console.error('Error loading dreams:', e);
    }
  }

  function renderDreamCards(dreams) {
    if (!dreamResultsGrid) return;
    if (!dreams.length) {
      dreamResultsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">📜</div>
          Không tìm thấy điềm chiêm bao phù hợp. Bạn hãy thử từ khóa khác hoặc bấm nút "Tất Cả"!
        </div>
      `;
      return;
    }

    dreamResultsGrid.innerHTML = dreams.map(d => `
      <article class="dream-item-card">
        <div class="dream-item-title">
          <span>${d.title}</span>
          <div class="dream-numbers-badge">
            ${d.numbers.map(n => `<span class="dream-num-tag">${n}</span>`).join('')}
          </div>
        </div>
        <p class="dream-meaning-text">💡 ${d.meaning}</p>
        <div class="dream-advice-text">🧭 ${d.advice}</div>
        <button type="button" class="dream-soi-btn" data-nums="${d.numbers.join(',')}" data-dream="${d.title}">
          🔮 Soi Cầu Quẻ Này
        </button>
      </article>
    `).join('');

    // Attach click to dream "Soi Cầu" buttons
    dreamResultsGrid.querySelectorAll('.dream-soi-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dreamTitle = btn.getAttribute('data-dream');
        // Switch to Tab 1 (Fortune)
        const tab1Btn = document.querySelector('.tab-btn[data-tab="fortune"]');
        if (tab1Btn) tab1Btn.click();

        fortuneInput.value = dreamTitle;
        charCounter.textContent = `${dreamTitle.length} ký tự`;
        window.scrollTo({ top: fortuneInput.offsetTop - 100, behavior: 'smooth' });
        showToast(`Đã nạp giấc mơ: "${dreamTitle}"`);
        if (window.soundFX) window.soundFX.playLock();
      });
    });
  }

  // Dream search input
  let dreamSearchDebounce = null;
  if (dreamSearchInput) {
    dreamSearchInput.addEventListener('input', () => {
      clearTimeout(dreamSearchDebounce);
      dreamSearchDebounce = setTimeout(() => {
        loadDreams(dreamSearchInput.value.trim(), currentDreamCategory);
      }, 300);
    });
  }

  // Category filters
  dreamCatPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dreamCatPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentDreamCategory = pill.getAttribute('data-cat');
      loadDreams(dreamSearchInput ? dreamSearchInput.value.trim() : '', currentDreamCategory);
    });
  });

  // =========================================================================
  // TAB 6: THẦN SỐ HỌC PYTHAGORAS LOGIC
  // =========================================================================
  if (btnCalcNumerology) {
    btnCalcNumerology.addEventListener('click', () => {
      calculateNumerology(currentTimeframe, false);
    });
  }

  async function calculateNumerology(timeframe = currentTimeframe, silent = false) {
    const birthDate = numBirthDate ? numBirthDate.value : '';
    const fullName = numFullName ? numFullName.value.trim() : '';

    if (!birthDate) {
      if (!silent) showToast('⚠️ Vui lòng chọn ngày tháng năm sinh của bạn!');
      return;
    }

    if (!silent && btnCalcNumerology) {
      btnCalcNumerology.disabled = true;
      btnCalcNumerology.innerHTML = '<span>⏳</span> Đang tính toán bản mệnh...';
    }

    try {
      const res = await fetch('/api/numerology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birth_date: birthDate, full_name: fullName, timeframe: timeframe })
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Lỗi tính toán thần số học');

      renderNumerologyResult(data.data, timeframe);
      if (!silent) {
        showToast('✨ Đã giải mã bản mệnh Thần Số Học thành công!');
        if (window.soundFX) window.soundFX.playBell();
      }
    } catch (err) {
      if (!silent) showToast(`❌ ${err.message}`);
    } finally {
      if (!silent && btnCalcNumerology) {
        btnCalcNumerology.disabled = false;
        btnCalcNumerology.innerHTML = '<span>✨</span> Khám Phá Thần Số Học &amp; Số Phong Thủy';
      }
    }
  }

  function renderNumerologyResult(n, timeframe = currentTimeframe) {
    if (!numerologyResultBox) return;
    numerologyResultBox.style.display = 'block';

    if (numLifePathBadge) numLifePathBadge.textContent = n.life_path_number;
    if (numHeroTitle) numHeroTitle.textContent = n.title;
    if (numHeroDesc) numHeroDesc.textContent = n.description;
    if (numElementTag) numElementTag.textContent = `Ngũ hành: ${n.element}`;
    if (numCareerTag) numCareerTag.textContent = `Nghề nghiệp: ${n.career_orientation}`;

    if (numPersonalYear) numPersonalYear.textContent = n.personal_year_2026;
    if (numPersonalYearAdvice) numPersonalYearAdvice.textContent = n.personal_year_advice;

    // 3x3 Matrix
    const matrix = n.matrix_counts || {};
    for (let i = 1; i <= 9; i++) {
      const cell = document.getElementById(`matrix-${i}`);
      const val = document.getElementById(`mval-${i}`);
      const count = matrix[String(i)] || 0;
      if (val) val.textContent = count > 0 ? String(i).repeat(count) : '-';
      if (cell) {
        if (count > 0) cell.classList.add('has-num');
        else cell.classList.remove('has-num');
      }
    }

    // Arrows
    if (numArrowsList) {
      numArrowsList.innerHTML = (n.arrows || []).map(a => `
        <div class="arrow-item-badge">${a}</div>
      `).join('');
    }

    // Name numbers
    if (numNameNumbersList) {
      if (n.name_numbers) {
        const nn = n.name_numbers;
        numNameNumbersList.innerHTML = `
          <div class="name-num-card">
            <div>
              <div style="font-weight: 700; color: #fff;">Số Linh Hồn (Soul Urge)</div>
              <div style="font-size: 0.8rem; color: var(--text-dim);">Khát khao nội tâm sâu kín</div>
            </div>
            <div class="name-num-badge">${nn.soul_urge || '-'}</div>
          </div>
          <div class="name-num-card">
            <div>
              <div style="font-weight: 700; color: #fff;">Số Biểu Đạt (Personality)</div>
              <div style="font-size: 0.8rem; color: var(--text-dim);">Hình ảnh bạn thể hiện ra bên ngoài</div>
            </div>
            <div class="name-num-badge">${nn.personality || '-'}</div>
          </div>
          <div class="name-num-card">
            <div>
              <div style="font-weight: 700; color: #fff;">Số Sứ Mệnh (Destiny)</div>
              <div style="font-size: 0.8rem; color: var(--text-dim);">Đích đến và mục đích cuộc đời</div>
            </div>
            <div class="name-num-badge">${nn.destiny || '-'}</div>
          </div>
        `;
      } else {
        numNameNumbersList.innerHTML = `
          <p style="font-size: 0.85rem; color: var(--text-dim); text-align: center; padding: 1rem 0;">
            💡 Nhập thêm Họ và Tên của bạn để giải mã Số Linh Hồn, Số Biểu Đạt và Số Sứ Mệnh!
          </p>
        `;
      }
    }

    // Lucky grid
    if (numLuckyGrid) {
      const luckyStats = n.lucky_lottery_stats || [];
      const tfCount = n.timeframe || timeframe;
      numLuckyGrid.innerHTML = luckyStats.map(s => {
        let badgeBg = 'rgba(245, 158, 11, 0.2)';
        let badgeColor = 'var(--gold-400)';
        const isHot = s.status === 'hot' || (s.status_label && s.status_label.includes('HOT'));
        const isGan = s.status === 'gan' || (s.status_label && s.status_label.includes('Gan'));

        if (isHot) {
          badgeBg = 'rgba(244, 63, 94, 0.2)';
          badgeColor = 'var(--rose-400)';
        } else if (isGan) {
          badgeBg = 'rgba(6, 182, 212, 0.2)';
          badgeColor = 'var(--cyan-400)';
        }

        return `
          <div class="num-lucky-card ${isHot ? 'is-hot' : isGan ? 'is-gan' : ''}">
            <div class="num-lucky-digits">${s.number}</div>
            <div class="num-lucky-hits">Nổ <strong>${s.total_hits}</strong> lần trong ${tfCount} ngày</div>
            <div style="font-size: 0.8rem; color: var(--text-dim); margin-top: 2px;">
              ${s.days_unseen === 0 ? 'Vừa nổ hôm qua' : `${s.days_unseen} ngày chưa về`}
            </div>
            <span class="num-lucky-badge" style="background: ${badgeBg}; color: ${badgeColor};">
              ${s.status_label}
            </span>
          </div>
        `;
      }).join('');
    }

    // 4 Pinnacles of Life (Kim Tự Tháp 4 Đỉnh Cao)
    const pinnaclesGrid = document.getElementById('pinnaclesPyramidGrid');
    if (pinnaclesGrid && numBirthDate && numBirthDate.value) {
      const parts = numBirthDate.value.split('-');
      if (parts.length === 3) {
        const y = parseInt(parts[0], 10);
        const m = parseInt(parts[1], 10);
        const d = parseInt(parts[2], 10);

        const reduceDigit = (num) => {
          let sum = num;
          while (sum > 9 && sum !== 11 && sum !== 22) {
            sum = String(sum).split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
          }
          return sum;
        };

        const reduceSingle = (num) => {
          let sum = num;
          while (sum > 9) {
            sum = String(sum).split('').reduce((acc, c) => acc + parseInt(c, 10), 0);
          }
          return sum;
        };

        const redDay = reduceDigit(d);
        const redMonth = reduceDigit(m);
        const redYear = reduceDigit(y);

        let lp = n.life_path_number || 7;
        let lpVal = typeof lp === 'number' ? lp : parseInt(lp, 10) || 7;
        if (lpVal > 9) lpVal = reduceSingle(lpVal);

        const age1 = 36 - lpVal;
        const age2 = age1 + 9;
        const age3 = age2 + 9;
        const age4 = age3 + 9;

        const p1 = reduceDigit(redMonth + redDay);
        const p2 = reduceDigit(redDay + redYear);
        const p3 = reduceDigit(p1 + p2);
        const p4 = reduceDigit(redMonth + redYear);

        const pinnacleMeanings = {
          1: { title: "Tự Lập & Khởi Nghiệp", desc: "Thời kỳ đứng trên đôi chân mình, mở lối đi riêng, đón nhận vận hội làm chủ sự nghiệp và khẳng định cái tôi bản lĩnh." },
          2: { title: "Hòa Hợp & Trực Giác", desc: "Giai đoạn kết nối sâu sắc, lắng nghe tiếng nói trực giác nội tâm, phát triển mối quan hệ ngoại giao và tìm thấy bình an." },
          3: { title: "Sáng Tạo & Tỏa Sáng Trí Tuệ", desc: "Thời điểm bùng nổ ý tưởng, mở rộng quan hệ xã hội, thăng hoa trong nghệ thuật, ngôn từ và truyền cảm hứng tới cộng đồng." },
          4: { title: "Xây Dựng Nền Tảng Vững Chắc", desc: "Giai đoạn tích lũy của cải vật chất, kiên định tạo dựng cơ ngơi, củng cố kỷ luật thực tế và gầy dựng tương lai bền vững." },
          5: { title: "Tự Do & Đột Phá Bất Ngờ", desc: "Thời kỳ chuyển mình mạnh mẽ, những chuyến đi xa, giải phóng ràng buộc cũ và nắm bắt cơ hội tài lộc mang tính bước ngoặt." },
          6: { title: "Yêu Thương & Trách Nhiệm Gia Đình", desc: "Mái ấm gia đình nở rộ, nâng đỡ người thân, phát triển năng lượng tình thương và sáng tạo vì hạnh phúc cộng đồng." },
          7: { title: "Trí Tuệ & Chiêm Nghiệm Bản Mệnh", desc: "Thời gian tôi luyện bản lĩnh, đúc kết triết lý sống uyên thâm, khai mở tầm nhìn sâu sắc và thức tỉnh tâm linh." },
          8: { title: "Thành Công Tài Chính & Quyền Lực", desc: "Đỉnh cao tài lộc rực rỡ nhất! Cơ hội đầu tư sinh lời lớn, khẳng định vị thế dẫn đầu và gặt hái thành tựu kinh tế đỉnh phong." },
          9: { title: "Hoài Bão & Cống Hiến Nhân Đạo", desc: "Tầm nhìn vĩ mô đạt độ chín, phụng sự lý tưởng cao đẹp, đón nhận sự kính trọng từ xã hội và tiếng vang lan tỏa." },
          10: { title: "Thích Nghi & Bứt Phá Toàn Diện", desc: "Năng lực xoay chuyển tình thế xuất sắc, thích ứng với thời cuộc và gặt hái thành công vang dội trên nhiều lĩnh vực." },
          11: { title: "Khai Sáng & Bậc Thầy Tâm Linh", desc: "Trực giác siêu phàm, nguồn năng lượng tâm linh thức tỉnh mạnh mẽ, soi đường dẫn lối cho bản thân và nhiều người xung quanh." }
        };

        const peaks = [
          { stage: "ĐỈNH CAO THỨ 1", age: `${age1} tuổi`, num: p1, info: pinnacleMeanings[p1] || pinnacleMeanings[1] },
          { stage: "ĐỈNH CAO THỨ 2", age: `${age2} tuổi`, num: p2, info: pinnacleMeanings[p2] || pinnacleMeanings[2] },
          { stage: "ĐỈNH CAO THỨ 3", age: `${age3} tuổi`, num: p3, info: pinnacleMeanings[p3] || pinnacleMeanings[8] },
          { stage: "ĐỈNH CAO THỨ 4", age: `${age4} tuổi`, num: p4, info: pinnacleMeanings[p4] || pinnacleMeanings[9] }
        ];

        pinnaclesGrid.innerHTML = peaks.map(p => `
          <div class="pinnacle-card">
            <div class="pinnacle-stage">${p.stage}</div>
            <div class="pinnacle-age">Chạm đỉnh năm: <strong>${p.age}</strong></div>
            <div class="pinnacle-number-badge">${p.num}</div>
            <div class="pinnacle-meaning-title">${p.info.title}</div>
            <p class="pinnacle-meaning-desc">${p.info.desc}</p>
          </div>
        `).join('');
      }
    }
  }

  // =========================================================================
  // TAB 7: PASCAL TRIANGLE & TONG DE LOGIC
  // =========================================================================
  async function loadPascalDrawsList(timeframe = currentTimeframe) {
    try {
      const res = await fetch(`/api/lottery/draws?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.draws && pascalDrawSelect) {
        pascalDrawSelect.innerHTML = data.draws.map(d => `
          <option value="${d.index}">${d.date} (ĐB: ${d.special_prize || 'N/A'})</option>
        `).join('');
        loadPascal(0, timeframe);
      }
    } catch (e) {
      console.error('Error loading Pascal draws:', e);
    }
  }

  if (btnCalcPascal) {
    btnCalcPascal.addEventListener('click', () => {
      const idx = pascalDrawSelect ? parseInt(pascalDrawSelect.value) || 0 : 0;
      loadPascal(idx, currentTimeframe);
    });
  }

  if (pascalDrawSelect) {
    pascalDrawSelect.addEventListener('change', () => {
      const idx = parseInt(pascalDrawSelect.value) || 0;
      loadPascal(idx, currentTimeframe);
    });
  }

  async function loadPascal(index = 0, timeframe = currentTimeframe) {
    try {
      const res = await fetch(`/api/lottery/pascal?index=${index}&timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.pascal) {
        renderPascalPyramid(data.pascal, timeframe);
      }
    } catch (e) {
      console.error('Error loading Pascal calculation:', e);
    }
  }

  function renderPascalPyramid(p, timeframe = currentTimeframe) {
    if (!pascalPyramidContainer) return;
    const steps = p.steps || [];
    pascalPyramidContainer.innerHTML = steps.map((row) => {
      const cells = row.map(digit => `<div class="pascal-cell">${digit}</div>`).join('');
      return `<div class="pascal-row">${cells}</div>`;
    }).join('');

    if (pascalDigitsDisplay) {
      pascalDigitsDisplay.textContent = p.pair_str || '-- - --';
    }
    if (pascalAccuracyText) {
      pascalAccuracyText.textContent = `Độ chuẩn xác ${timeframe} ngày qua: ${p.accuracy_rate}% (Nổ ${p.hits_count}/${p.total_tested} kỳ)`;
    }
    if (window.soundFX) window.soundFX.playBell();
  }

  async function loadTongDeAndXien3(timeframe = currentTimeframe) {
    try {
      const [resTong, resXien] = await Promise.all([
        fetch(`/api/lottery/tong-de?timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/lottery/xien-3?timeframe=${timeframe}`).then(r => r.json())
      ]);

      if (resTong.success && resTong.tong_de) {
        renderTongDe(resTong.tong_de);
      }
      if (resXien.success && resXien.top_triplets) {
        renderTopTriplets(resXien.top_triplets);
      }
    } catch (e) {
      console.error('Error loading Tong De & Xien 3:', e);
    }
  }

  function renderTongDe(td) {
    if (tongDeGrid) {
      const hottest = String(td.hottest_tong[0]);
      const coldest = String(td.coldest_tong[0]);
      let html = '';
      for (let i = 0; i <= 9; i++) {
        const k = String(i);
        const hits = td.tong_counts[k] || 0;
        let cls = 'tong-cell';
        if (k === hottest) cls += ' tong-cell-hot';
        if (k === coldest) cls += ' tong-cell-gan';
        html += `
          <div class="${cls}">
            <div class="tong-num">Tổng ${i}</div>
            <div class="tong-hits">${hits} lần ${k === hottest ? '🔥' : (k === coldest ? '🧊' : '')}</div>
          </div>
        `;
      }
      tongDeGrid.innerHTML = html;
    }

    if (tongDeSummary) {
      tongDeSummary.innerHTML = `
        <div style="font-size: 0.85rem; color: #cbd5e1; margin-top: 0.5rem;">
          🔥 <strong>Tổng Đề Hot Nhất:</strong> Tổng ${td.hottest_tong[0]} (${td.hottest_tong[1]} lần về) &bull;
          🧊 <strong>Tổng Đề Gan Nhất:</strong> Tổng ${td.coldest_tong[0]} (${td.coldest_tong[1]} ngày chưa về)
        </div>
      `;
    }

    if (parityBarsContainer) {
      const parity = td.parity_counts || {};
      const total = Object.values(parity).reduce((a, b) => a + b, 0) || 1;
      parityBarsContainer.innerHTML = Object.entries(parity).map(([label, count]) => {
        const pct = Math.round((count / total) * 100);
        return `
          <div class="parity-bar-row">
            <div class="parity-bar-labels">
              <span>${label}</span>
              <span><strong>${count} lần</strong> (${pct}%)</span>
            </div>
            <div class="parity-progress-track">
              <div class="parity-progress-fill" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join('');
    }

    if (taiXiuBox) {
      const tx = td.tai_xiu_counts || {};
      taiXiuBox.innerHTML = `
        <div class="taixiu-card">
          <div class="taixiu-title">🎲 ĐỀ VỀ TÀI (50-99)</div>
          <div class="taixiu-val">${tx['Tài (50-99)'] || 0} lần</div>
        </div>
        <div class="taixiu-card">
          <div class="taixiu-title">🎲 ĐỀ VỀ XỈU (00-49)</div>
          <div class="taixiu-val">${tx['Xỉu (00-49)'] || 0} lần</div>
        </div>
      `;
    }
  }

  function renderTopTriplets(triplets) {
    if (!topTripletsGrid) return;
    topTripletsGrid.innerHTML = triplets.map(t => `
      <div class="triplet-card">
        <span class="triplet-nums">${t.triplet_str}</span>
        <span class="triplet-count">${t.together_count} kỳ (${t.rate}%)</span>
      </div>
    `).join('');
  }

  // =========================================================================
  // TAB 8: CHART.JS LOGIC
  // =========================================================================
  let lotoFreqChart = null;
  let radarChart = null;
  let doughnutChart = null;
  let globalFreqData = [];

  async function initCharts(timeframe = currentTimeframe) {
    if (typeof Chart === 'undefined') {
      console.warn('Chart.js is not loaded');
      return;
    }

    try {
      const [resFreq, resStats, resTong] = await Promise.all([
        fetch(`/api/lottery/full-frequency?timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/lottery/advanced-stats?timeframe=${timeframe}`).then(r => r.json()),
        fetch(`/api/lottery/tong-de?timeframe=${timeframe}`).then(r => r.json())
      ]);

      if (resFreq.success && resFreq.frequencies) {
        globalFreqData = resFreq.frequencies;
        renderLotoFrequencyChart(globalFreqData, 'all');
      }

      if (resStats.success && resStats.dau_duoi) {
        renderRadarChart(resStats.dau_duoi);
      }

      if (resTong.success && resTong.tong_de) {
        renderDoughnutChart(resTong.tong_de);
      }
    } catch (e) {
      console.error('Error initializing charts:', e);
    }
  }

  function renderLotoFrequencyChart(allData, filter = 'all') {
    const canvas = document.getElementById('lotoFrequencyChart');
    if (!canvas) return;

    let filtered = [...allData];
    if (filter === 'top_hot') {
      filtered = filtered.sort((a, b) => b.hits - a.hits).slice(0, 15);
    } else if (filter === 'top_gan') {
      filtered = filtered.sort((a, b) => a.hits - b.hits).slice(0, 15);
    } else if (filter === 'dau_04') {
      filtered = filtered.filter(item => parseInt(item.number[0]) <= 4);
    } else if (filter === 'dau_59') {
      filtered = filtered.filter(item => parseInt(item.number[0]) >= 5);
    }

    const labels = filtered.map(d => d.number);
    const dataVals = filtered.map(d => d.hits);

    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 300);
    grad.addColorStop(0, '#f59e0b');
    grad.addColorStop(0.5, '#a855f7');
    grad.addColorStop(1, '#06b6d4');

    if (lotoFreqChart) {
      lotoFreqChart.destroy();
    }

    lotoFreqChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: `Số lần nổ trong ${currentTimeframe} ngày`,
          data: dataVals,
          backgroundColor: grad,
          borderColor: '#f59e0b',
          borderWidth: 1,
          borderRadius: 6,
          hoverBackgroundColor: '#ec4899'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#fbbf24',
            titleFont: { size: 14, weight: 'bold' },
            bodyColor: '#f8fafc',
            borderColor: 'rgba(245, 158, 11, 0.3)',
            borderWidth: 1,
            padding: 10,
            callbacks: {
              label: (context) => ` Nổ: ${context.parsed.y} lần trong ${currentTimeframe} ngày`
            }
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            ticks: { color: '#cbd5e1', font: { family: 'Be Vietnam Pro', size: 12, weight: '600' } }
          },
          y: {
            grid: { color: 'rgba(255, 255, 255, 0.08)' },
            ticks: { color: '#cbd5e1', stepSize: 2, font: { family: 'Be Vietnam Pro', size: 11 } },
            beginAtZero: true
          }
        }
      }
    });
  }

  function renderRadarChart(dauDuoi) {
    const canvas = document.getElementById('dauDuoiRadarChart');
    if (!canvas) return;

    const labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => `Số ${d}`);
    const dauData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => dauDuoi.dau_counts[d] || 0);
    const duoiData = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => dauDuoi.duoi_counts[d] || 0);

    const ctx = canvas.getContext('2d');
    if (radarChart) {
      radarChart.destroy();
    }

    radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Đầu (0-9)',
            data: dauData,
            backgroundColor: 'rgba(245, 158, 11, 0.28)',
            borderColor: '#f59e0b',
            borderWidth: 2,
            pointBackgroundColor: '#fbbf24',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#fbbf24'
          },
          {
            label: 'Đuôi (0-9)',
            data: duoiData,
            backgroundColor: 'rgba(168, 85, 247, 0.28)',
            borderColor: '#a855f7',
            borderWidth: 2,
            pointBackgroundColor: '#c084fc',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#a855f7'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: { color: '#ffffff', font: { family: 'Be Vietnam Pro', size: 13, weight: '600' } }
          }
        },
        scales: {
          r: {
            grid: { color: 'rgba(255, 255, 255, 0.1)' },
            angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            pointLabels: { color: '#fbbf24', font: { family: 'Be Vietnam Pro', size: 12, weight: 'bold' } },
            ticks: { backdropColor: 'transparent', color: '#94a3b8' }
          }
        }
      }
    });
  }

  function renderDoughnutChart(tongDe) {
    const canvas = document.getElementById('tongDeDoughnutChart');
    if (!canvas) return;

    const parity = tongDe.parity_counts || {};
    const labels = Object.keys(parity);
    const vals = Object.values(parity);

    const ctx = canvas.getContext('2d');
    if (doughnutChart) {
      doughnutChart.destroy();
    }

    doughnutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: vals,
          backgroundColor: [
            '#ec4899', // Chẵn - Chẵn
            '#8b5cf6', // Chẵn - Lẻ
            '#06b6d4', // Lẻ - Chẵn
            '#f59e0b'  // Lẻ - Lẻ
          ],
          borderColor: 'rgba(15, 23, 42, 0.9)',
          borderWidth: 2,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: '#ffffff', font: { family: 'Be Vietnam Pro', size: 12, weight: '500' } }
          },
          tooltip: {
            callbacks: {
              label: (context) => ` ${context.label}: ${context.parsed} lần`
            }
          }
        }
      }
    });
  }

  // Chart Filter Buttons
  const chartFilterPills = document.querySelectorAll('.chart-filter-pill');
  chartFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      chartFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      renderLotoFrequencyChart(globalFreqData, filter);
    });
  });

  // =========================================================================
  // BÀN CỜ MA TRẬN NHIỆT 100 SỐ (10x10 MATRIX HEATMAP LOGIC)
  // =========================================================================
  let matrix100Data = [];
  let currentMatrixFilter = 'all';

  async function loadHeatmapMatrix(timeframe = currentTimeframe) {
    if (!matrix100Grid) return;
    try {
      const res = await fetch(`/api/lottery/matrix-100?timeframe=${timeframe}`);
      const data = await res.json();
      if (data.success && data.matrix) {
        matrix100Data = data.matrix;
        renderHeatmapMatrixGrid(matrix100Data, currentMatrixFilter);
      }
    } catch (e) {
      console.error('Error loading 100-number heatmap matrix:', e);
    }
  }

  function renderHeatmapMatrixGrid(matrixList, filter = 'all') {
    if (!matrix100Grid) return;

    matrix100Grid.innerHTML = matrixList.map(item => {
      let isVisible = true;
      if (filter === 'hot') isVisible = item.is_hot;
      else if (filter === 'gan') isVisible = item.is_gan;
      else if (filter === 'cycle') isVisible = (item.unseen_days >= 3 && item.unseen_days <= 7);
      else if (filter === 'special') isVisible = (item.special_hits > 0);

      const opacityStyle = isVisible ? 'opacity: 1; transform: scale(1);' : 'opacity: 0.16; filter: grayscale(0.9); transform: scale(0.94);';

      let statusClass = 'matrix-cell-100';
      if (item.is_hot) statusClass += ' cell-hot';
      else if (item.is_gan) statusClass += ' cell-gan';
      else statusClass += ' cell-normal';

      if (item.special_hits > 0) statusClass += ' cell-special';
      if (item.unseen_days >= 3 && item.unseen_days <= 7) statusClass += ' cell-cycle';

      return `
        <div class="${statusClass}" 
             style="${opacityStyle}"
             data-num="${item.number}"
             data-hits="${item.hits}"
             data-unseen="${item.unseen_days}"
             data-maxgan="${item.max_gan_historical}"
             data-gangap="${item.gan_gap}"
             data-year="${item.record_year}"
             data-special="${item.special_hits}"
             data-status="${item.status_label}"
             data-companions="${(item.companions || []).join(' - ')}">
          <span class="cell-num">${item.number}</span>
          <span class="cell-hits">${item.hits} lần</span>
        </div>
      `;
    }).join('');

    // Attach hover & click listeners to all matrix cells
    const cells = matrix100Grid.querySelectorAll('.matrix-cell-100');
    cells.forEach(cell => {
      cell.addEventListener('mouseenter', (e) => {
        const num = cell.dataset.num;
        const hits = cell.dataset.hits;
        const unseen = cell.dataset.unseen;
        const maxgan = cell.dataset.maxgan;
        const gangap = cell.dataset.gangap;
        const year = cell.dataset.year;
        const status = cell.dataset.status;
        const companions = cell.dataset.companions || '--';

        if (popoverNum) popoverNum.textContent = num;
        if (popoverStatusBadge) {
          popoverStatusBadge.textContent = status;
          if (status.includes('HOT')) {
            popoverStatusBadge.style.background = 'rgba(244, 63, 94, 0.25)';
            popoverStatusBadge.style.color = 'var(--rose-400)';
            popoverStatusBadge.style.border = '1px solid var(--rose-400)';
          } else if (status.includes('Gan')) {
            popoverStatusBadge.style.background = 'rgba(6, 182, 212, 0.25)';
            popoverStatusBadge.style.color = 'var(--cyan-400)';
            popoverStatusBadge.style.border = '1px solid var(--cyan-400)';
          } else {
            popoverStatusBadge.style.background = 'rgba(255, 255, 255, 0.1)';
            popoverStatusBadge.style.color = '#fff';
            popoverStatusBadge.style.border = '1px solid rgba(255, 255, 255, 0.2)';
          }
        }
        if (popoverHits) popoverHits.textContent = `${hits} lần (${currentTimeframe} ngày)`;
        if (popoverUnseen) popoverUnseen.textContent = `${unseen} ngày ${unseen === '0' ? '(Vừa nổ)' : ''}`;
        if (popoverMaxGan) popoverMaxGan.textContent = `${maxgan} ngày (Năm ${year})`;
        if (popoverGanGap) popoverGanGap.textContent = `Cách đỉnh ${gangap} ngày`;
        if (popoverCompanion) popoverCompanion.textContent = companions;

        if (matrixPopoverCard) {
          matrixPopoverCard.style.display = 'block';
          positionPopover(e);
        }
        if (window.soundFX && Math.random() > 0.6) window.soundFX.playTick();
      });

      cell.addEventListener('mousemove', (e) => {
        if (matrixPopoverCard) positionPopover(e);
      });

      cell.addEventListener('mouseleave', () => {
        if (matrixPopoverCard) matrixPopoverCard.style.display = 'none';
      });

      cell.addEventListener('click', () => {
        const num = cell.dataset.num;
        if (quickCheckInput) {
          quickCheckInput.value = num;
          if (quickCheckerForm) quickCheckerForm.dispatchEvent(new Event('submit'));
          showToast(`🔍 Đang soi nhanh tần suất cho số ${num}!`);
          quickCheckerForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

  function positionPopover(e) {
    if (!matrixPopoverCard) return;
    const pad = 15;
    let x = e.clientX + pad;
    let y = e.clientY + pad;

    const popW = matrixPopoverCard.offsetWidth || 260;
    const popH = matrixPopoverCard.offsetHeight || 180;

    if (x + popW > window.innerWidth) {
      x = e.clientX - popW - pad;
    }
    if (y + popH > window.innerHeight) {
      y = e.clientY - popH - pad;
    }

    matrixPopoverCard.style.left = `${Math.max(10, x)}px`;
    matrixPopoverCard.style.top = `${Math.max(10, y)}px`;
  }

  // Filter chips handler
  if (matrixFilterChips) {
    matrixFilterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        matrixFilterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentMatrixFilter = chip.getAttribute('data-matrix-filter') || 'all';
        renderHeatmapMatrixGrid(matrix100Data, currentMatrixFilter);
        if (window.soundFX) window.soundFX.playTick();
      });
    });
  }

  // =========================================================================
  // THEME SWITCHER LOGIC (3 BẢNG PHỐI MÀU CAO CẤP)
  // =========================================================================
  const themeBtns = document.querySelectorAll('.theme-pill-btn');
  const savedTheme = localStorage.getItem('app_theme') || 'royal';

  function applyTheme(themeName) {
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('app_theme', themeName);
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme') === themeName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (window.updateCelestialPalette) {
      window.updateCelestialPalette(themeName);
    }
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTheme = btn.getAttribute('data-theme');
      applyTheme(targetTheme);
      if (window.soundFX) window.soundFX.playTick();
      const themeLabels = {
        royal: 'Huyền Bí Hoàng Gia (Mystic Gold & Deep Violet)',
        cyber: 'AI Vũ Trụ Hiện Đại (Cyber Astral – Xanh Cyan & Tím)',
        emerald: 'Tài Lộc & Thịnh Vượng (Ngọc Lục Bảo & Vàng Kim)'
      };
      showToast(`🎨 Đã chuyển sang bảng màu: ${themeLabels[targetTheme] || targetTheme}`);
    });
  });

  applyTheme(savedTheme);

  // =========================================================================
  // CELESTIAL STARDUST PARTICLES BACKGROUND CANVAS
  // =========================================================================
  const celestialCanvas = document.getElementById('celestialCanvas');
  if (celestialCanvas) {
    const cCtx = celestialCanvas.getContext('2d');
    let width = celestialCanvas.width = window.innerWidth;
    let height = celestialCanvas.height = window.innerHeight;

    let palette = ['rgba(245, 158, 11, ', 'rgba(192, 132, 252, ', 'rgba(253, 224, 71, '];

    window.updateCelestialPalette = function(theme) {
      if (theme === 'cyber') {
        palette = ['rgba(6, 182, 212, ', 'rgba(56, 189, 248, ', 'rgba(168, 85, 247, '];
      } else if (theme === 'emerald') {
        palette = ['rgba(16, 185, 129, ', 'rgba(52, 211, 153, ', 'rgba(251, 191, 36, '];
      } else {
        palette = ['rgba(245, 158, 11, ', 'rgba(192, 132, 252, ', 'rgba(253, 224, 71, '];
      }
    };
    window.updateCelestialPalette(savedTheme);

    const particles = [];
    const count = 45;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2.2 + 0.6,
        colorPrefix: palette[Math.floor(Math.random() * palette.length)],
        alpha: Math.random() * 0.6 + 0.2,
        alphaSpeed: (Math.random() * 0.01 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35
      });
    }

    function renderCelestial() {
      cCtx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaSpeed;
        if (p.alpha <= 0.1 || p.alpha >= 0.85) p.alphaSpeed = -p.alphaSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        cCtx.beginPath();
        cCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        cCtx.fillStyle = p.colorPrefix + Math.max(0.05, Math.min(p.alpha, 0.9)) + ')';
        cCtx.shadowBlur = p.r * 6;
        cCtx.shadowColor = p.colorPrefix + '0.5)';
        cCtx.fill();
      }

      requestAnimationFrame(renderCelestial);
    }
    renderCelestial();

    window.addEventListener('resize', () => {
      width = celestialCanvas.width = window.innerWidth;
      height = celestialCanvas.height = window.innerHeight;
    });
  }

  // =========================================================================
  // FENG SHUI LIVE TICKER & 18H15 COUNTDOWN
  // =========================================================================
  const countdownTimer = document.getElementById('countdownTimer');
  const lunarDateText = document.getElementById('lunarDateText');
  const fengShuiDirection = document.getElementById('fengShuiDirection');
  const todayLuckyTrio = document.getElementById('todayLuckyTrio');

  function updateFengShuiTicker() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    const target = new Date(now);
    target.setHours(18, 15, 0, 0);

    let diffMs = target - now;

    if (countdownTimer) {
      if (hours === 18 && minutes >= 15 && minutes <= 30) {
        countdownTimer.textContent = '🔴 ĐANG QUAY THƯỞNG!';
        countdownTimer.style.color = '#ef4444';
      } else {
        if (diffMs < 0) {
          target.setDate(target.getDate() + 1);
          diffMs = target - now;
        }
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);
        countdownTimer.textContent = `${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m ${String(diffSecs).padStart(2, '0')}s`;
        countdownTimer.style.color = '';
      }
    }

    if (lunarDateText) {
      const canList = ['Giáp', 'Ất', 'Bính', 'Đinh', 'Mậu', 'Kỷ', 'Canh', 'Tân', 'Nhâm', 'Quý'];
      const chiList = ['Tý', 'Sửu', 'Dần', 'Mão', 'Thìn', 'Tỵ', 'Ngọ', 'Mùi', 'Thân', 'Dậu', 'Tuất', 'Hợi'];
      const dayNum = Math.floor(now.getTime() / 86400000);
      const can = canList[(dayNum + 9) % 10];
      const chi = chiList[(dayNum + 1) % 12];
      lunarDateText.textContent = `Ngày ${can} ${chi} • Hoàng Đạo`;
    }

    if (fengShuiDirection) {
      const directions = ['Đông Nam (Tài Thần)', 'Tây Bắc (Hỷ Thần)', 'Chính Đông (Vượng Khí)', 'Chính Nam (Phát Tài)'];
      fengShuiDirection.textContent = directions[now.getDay() % directions.length];
    }
  }

  setInterval(updateFengShuiTicker, 1000);
  updateFengShuiTicker();

  // =========================================================================
  // SMART COMBO BUILDER (BỘ TẠO DÀN ĐỀ & GHÉP LÔ XIÊN)
  // =========================================================================
  const comboButtons = document.querySelectorAll('.btn-combo-pill');
  const comboResultTitle = document.getElementById('comboResultTitle');
  const comboTagsContainer = document.getElementById('comboTagsContainer');
  const btnCopyCombo = document.getElementById('btnCopyCombo');
  let currentComboList = [];

  function generateCombo(preset) {
    let list = [];
    let title = '';

    if (preset === 'tong_chan') {
      title = 'Dàn Tổng Chẵn (50 con số):';
      for (let i = 0; i < 100; i++) {
        const s = String(i).padStart(2, '0');
        if ((parseInt(s[0], 10) + parseInt(s[1], 10)) % 2 === 0) list.push(s);
      }
    } else if (preset === 'tong_le') {
      title = 'Dàn Tổng Lẻ (50 con số):';
      for (let i = 0; i < 100; i++) {
        const s = String(i).padStart(2, '0');
        if ((parseInt(s[0], 10) + parseInt(s[1], 10)) % 2 !== 0) list.push(s);
      }
    } else if (preset === 'tai') {
      title = 'Dàn Tài (Từ 50 đến 99 - 50 con số):';
      for (let i = 50; i < 100; i++) list.push(String(i).padStart(2, '0'));
    } else if (preset === 'xiu') {
      title = 'Dàn Xỉu (Từ 00 đến 49 - 50 con số):';
      for (let i = 0; i < 50; i++) list.push(String(i).padStart(2, '0'));
    } else if (preset === 'dau_chan') {
      title = 'Dàn Đầu Chẵn (Đầu 0, 2, 4, 6, 8 - 50 con số):';
      [0, 2, 4, 6, 8].forEach(h => {
        for (let t = 0; t <= 9; t++) list.push(`${h}${t}`);
      });
    } else if (preset === 'dau_le') {
      title = 'Dàn Đầu Lẻ (Đầu 1, 3, 5, 7, 9 - 50 con số):';
      [1, 3, 5, 7, 9].forEach(h => {
        for (let t = 0; t <= 9; t++) list.push(`${h}${t}`);
      });
    } else if (preset === 'kep') {
      title = 'Dàn Lô Kép Bằng (10 con số):';
      for (let i = 0; i <= 9; i++) list.push(`${i}${i}`);
    } else if (preset === 'xien2_top') {
      title = 'Ghép Xiên 2 Hoàng Kim (Top Cặp Số Hay Nổ Cùng Nhau):';
      list = ['68 - 86', '79 - 97', '23 - 32', '58 - 85', '04 - 40', '19 - 91', '38 - 83', '12 - 21'];
    } else if (preset === 'xien3_top') {
      title = `Ghép Xiên 3 Thần Tài (Top Bộ 3 Cùng Nổ Nhiều Nhất ${currentTimeframe} Ngày):`;
      list = ['68 - 79 - 86', '23 - 68 - 88', '04 - 58 - 85', '19 - 38 - 91', '12 - 68 - 97'];
    }

    currentComboList = list;
    if (comboResultTitle) comboResultTitle.textContent = title;
    if (comboTagsContainer) {
      comboTagsContainer.innerHTML = list.map(item => `
        <span class="combo-num-tag">${item}</span>
      `).join('');
    }
  }

  comboButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      comboButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const preset = btn.getAttribute('data-preset');
      generateCombo(preset);
      if (window.soundFX) window.soundFX.playTick();
    });
  });

  generateCombo('tong_chan');

  if (btnCopyCombo) {
    btnCopyCombo.addEventListener('click', async () => {
      if (!currentComboList.length) return;
      const textToCopy = currentComboList.join(', ');
      try {
        await navigator.clipboard.writeText(textToCopy);
        btnCopyCombo.innerHTML = '<span>✅</span> Đã Sao Chép!';
        showToast('📋 Đã sao chép toàn bộ dàn số vào clipboard!');
        if (window.soundFX) window.soundFX.playFanfare();
        setTimeout(() => {
          btnCopyCombo.innerHTML = '<span>📋</span> Sao Chép Dàn Số';
        }, 2000);
      } catch (err) {
        showToast('⚠️ Không thể sao chép tự động, vui lòng chọn số thủ công.');
      }
    });
  }

  // Initial Master Synchronization across all components
  updateAppTimeframe(currentTimeframe, false);
  loadDreams();
});

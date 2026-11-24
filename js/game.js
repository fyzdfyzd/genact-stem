'use strict';
/* Game Trạm 3 "Khắc họa chân dung nghề nghiệp STEM của bạn" – bản tĩnh: chạy trọn trong trình duyệt,
   chọn ảnh minh họa dựng sẵn (thư viện màu nước), không gửi dữ liệu người chơi đi đâu. */
(function () {
  const $ = id => document.getElementById(id);
  const DS_ANH = ["an-ninh-mang-khong-an-dinh", "an-ninh-mang-nam-mong", "an-ninh-mang-nam-thai", "an-ninh-mang-nam", "an-ninh-mang-nu-mong", "an-ninh-mang-nu-thai", "an-ninh-mang-nu", "an-ninh-mang-phi-nhi-nguyen", "canh-bao-thien-tai-khong-an-dinh", "canh-bao-thien-tai-nam-mong", "canh-bao-thien-tai-nam-thai", "canh-bao-thien-tai-nam", "canh-bao-thien-tai-nu-mong", "canh-bao-thien-tai-nu-thai", "canh-bao-thien-tai-nu", "canh-bao-thien-tai-phi-nhi-nguyen", "du-lich-so-khong-an-dinh", "du-lich-so-nam-mong", "du-lich-so-nam-thai", "du-lich-so-nam", "du-lich-so-nu-mong", "du-lich-so-nu-thai", "du-lich-so-nu", "du-lich-so-phi-nhi-nguyen", "giao-duc-so-khong-an-dinh", "giao-duc-so-nam-mong", "giao-duc-so-nam-thai", "giao-duc-so-nam", "giao-duc-so-nu-mong", "giao-duc-so-nu-thai", "giao-duc-so-nu", "giao-duc-so-phi-nhi-nguyen", "hang-khong-khong-an-dinh", "hang-khong-nam-mong", "hang-khong-nam-thai", "hang-khong-nam", "hang-khong-nu-mong", "hang-khong-nu-thai", "hang-khong-nu", "hang-khong-phi-nhi-nguyen", "nang-luong-nuoc-khong-an-dinh", "nang-luong-nuoc-nam-mong", "nang-luong-nuoc-nam-thai", "nang-luong-nuoc-nam", "nang-luong-nuoc-nu-mong", "nang-luong-nuoc-nu-thai", "nang-luong-nuoc-nu", "nang-luong-nuoc-phi-nhi-nguyen", "nong-nghiep-khong-an-dinh", "nong-nghiep-nam-mong", "nong-nghiep-nam-thai", "nong-nghiep-nam", "nong-nghiep-nu-mong", "nong-nghiep-nu-thai", "nong-nghiep-nu", "nong-nghiep-phi-nhi-nguyen", "y-te-tu-xa-khong-an-dinh", "y-te-tu-xa-nam-mong", "y-te-tu-xa-nam-thai", "y-te-tu-xa-nam", "y-te-tu-xa-nu-mong", "y-te-tu-xa-nu-thai", "y-te-tu-xa-nu", "y-te-tu-xa-phi-nhi-nguyen"];
  const LUOT_TOI_DA = 3;
  const DO_DAI_TOI_DA = 300;
  const KHOA_LUOT = 'genact-tram3-luot-da-dung';

  const NHOM = [
    { ma: 'gioi', buoc: 1, ten: 'Giới tính', hoi: 'Nhân vật của bạn là ai?', the: [
      { ma: 'nam', ten: 'Nam', vi: 'một chàng trai' },
      { ma: 'nu', ten: 'Nữ', vi: 'một cô gái' },
      { ma: 'phi-nhi-nguyen', ten: 'Phi nhị nguyên', vi: 'một bạn trẻ phi nhị nguyên' },
      { ma: 'khong-an-dinh', ten: 'Không ấn định', vi: 'một bạn trẻ' },
    ] },
    { ma: 'nghe', buoc: 2, ten: 'Nghề nghiệp', hoi: 'Nhân vật làm nghề STEM nào?', the: [
      { ma: 'nong-nghiep', vi: 'làm nông nghiệp thông minh', ten: 'Nông nghiệp thông minh', emoji: '🌾' },
      { ma: 'du-lich-so', vi: 'làm du lịch số và số hoá di sản 3D', ten: 'Du lịch số & di sản 3D', emoji: '🏛️' },
      { ma: 'y-te-tu-xa', vi: 'làm y tế từ xa', ten: 'Y tế từ xa', emoji: '🩺' },
      { ma: 'canh-bao-thien-tai', vi: 'làm cảnh báo sớm thiên tai', ten: 'Cảnh báo sớm thiên tai', emoji: '🌧️' },
      { ma: 'hang-khong', vi: 'làm kỹ thuật hàng không', ten: 'Kỹ thuật hàng không', emoji: '✈️' },
      { ma: 'nang-luong-nuoc', vi: 'làm năng lượng tái tạo và nước sạch', ten: 'Năng lượng tái tạo & nước sạch', emoji: '☀️' },
      { ma: 'giao-duc-so', vi: 'làm giáo dục số bằng ngôn ngữ bản địa', ten: 'Giáo dục số ngôn ngữ bản địa', emoji: '📚' },
      { ma: 'an-ninh-mang', vi: 'làm an ninh mạng cho cộng đồng', ten: 'An ninh mạng cộng đồng', emoji: '🛡️' },
    ] },
    { ma: 'trangphuc', buoc: 3, ten: 'Bản sắc trang phục', hoi: 'Nhân vật mặc gì?',
      ghiChu: 'Trang phục được vẽ tôn trọng, giản dị; AI có thể chưa vẽ đúng hoạ tiết.', the: [
      { ma: 'thai', ten: 'Đồ truyền thống người Thái Điện Biên', vi: 'mặc đồ truyền thống người Thái Điện Biên' },
      { ma: 'mong', ten: 'Đồ truyền thống người Mông Điện Biên', vi: 'mặc đồ truyền thống người Mông Điện Biên' },
      { ma: 'bao-ho', ten: 'Đồ bảo hộ hiện đại', vi: 'mặc đồ bảo hộ hiện đại' },
      { ma: 'chuyen-dung', ten: 'Đồ chuyên dụng của nghề', vi: 'mặc đồ chuyên dụng của nghề' },
    ] },
    { ma: 'boicanh', buoc: 4, ten: 'Bối cảnh', hoi: 'Nhân vật đang ở đâu?', the: [
      { ma: 'muong-thanh', ten: 'Cánh đồng Mường Thanh', vi: 'giữa cánh đồng Mường Thanh' },
      { ma: 'muong-ang', ten: 'Đồi cà phê Mường Ảng', vi: 'trên đồi cà phê Mường Ảng' },
      { ma: 'hoa-ban', ten: 'Rừng hoa ban trắng', vi: 'bên rừng hoa ban trắng' },
      { ma: 'san-bay', ten: 'Sân bay Điện Biên', vi: 'tại sân bay Điện Biên' },
      { ma: 'ban-lang', ten: 'Bản làng vùng cao', vi: 'trong một bản làng vùng cao' },
      { ma: 'noi-lam-viec', ten: 'Nơi làm việc của nghề', vi: 'tại nơi làm việc của nghề' },
    ] },
  ];

  const GOI_Y = [
    'Một cô gái người Thái điều khiển drone tưới cà phê trên đồi Mường Ảng lúc bình minh',
    'Một nhóm bạn trẻ lắp tấm pin mặt trời cho trường học trong bản vùng cao',
    'Một chàng trai người Mông khám bệnh từ xa qua máy tính bảng bên rừng hoa ban',
  ];

  // Từ khoá nghề (so khớp cụm từ sau khi bỏ dấu) cho luồng tự viết
  const TU_KHOA_NGHE = {
    'nong-nghiep': ['nong nghiep', 'nong dan', 'trong trot', 'cay trong', 'ca phe', 'ruong', 'ruong lua', 'cay lua', 'tuoi', 'drone', 'nong trai', 'chan nuoi', 'cam bien dat', 'nha kinh', 'trang trai', 'thu hoach'],
    'du-lich-so': ['du lich', 'di san', '3d', 'bao tang', 'quet', 'thuc te ao', 'vr', 'huong dan vien', 'di tich', 'lich su', 'khach'],
    'y-te-tu-xa': ['y te', 'kham', 'benh', 'kham benh', 'bac si', 'y ta', 'thuoc', 'suc khoe', 'tram y te', 'ong nghe', 'dieu duong', 'y si'],
    'canh-bao-thien-tai': ['thien tai', 'canh bao', 'lu', 'lu lut', 'sat lo', 'thoi tiet', 'khi tuong', 'dong dat', 'tram do', 'thuy van', 'mua lu'],
    'hang-khong': ['hang khong', 'may bay', 'phi cong', 'san bay', 'vu tru', 'ten lua', 'phi hanh gia', 'tiep vien', 'dong co'],
    'nang-luong-nuoc': ['nang luong', 'pin mat troi', 'mat troi', 'dien mat troi', 'dien gio', 'nuoc sach', 'loc nuoc', 'thuy dien', 'tai tao', 'moi truong'],
    'giao-duc-so': ['giao duc', 'giao vien', 'co giao', 'thay giao', 'day hoc', 'giang day', 'truong hoc', 'lop hoc', 'tre em', 'hoc sinh', 'ngon ngu', 'tieng thai', 'tieng mong'],
    'an-ninh-mang': ['an ninh mang', 'an ninh', 'bao mat', 'hacker', 'lap trinh', 'may tinh', 'phan mem', 'tri tue nhan tao', 'du lieu', 'cong nghe thong tin', 'it', 'robot', 'lua dao', 'mang internet'],
  };

  const TU_CHAN_CO_DAU = [
    'địt', 'đéo', 'cặc', 'lồn', 'buồi', 'đụ', 'đĩ', 'điếm', 'khỏa thân', 'khoả thân', 'lộ hàng', 'gợi cảm', 'ngực trần',
    'giết', 'chém', 'súng', 'bom', 'khủng bố', 'ma túy', 'ma tuý', 'thuốc phiện', 'máu me', 'xác chết', 'tự tử', 'đánh nhau',
    'mọi rợ', 'thấp hèn', 'lạc hậu', 'man rợ', 'nhà quê', 'đen đúi', 'xấu xí', 'béo phì', 'ngu dốt', 'mán',
    'hồ chí minh', 'bác hồ', 'tổng bí thư', 'chủ tịch nước', 'thủ tướng', 'phản động', 'biểu tình', 'chính trị', 'sơn tùng',
  ];
  const TU_CHAN_KHONG_DAU = [
    'sex', 'sexy', 'nude', 'naked', 'porn', 'hentai', 'bikini', 'fuck', 'shit', 'bitch', 'vcl', 'vkl', 'dcm', 'dmm', 'clgt',
    'kill', 'gun', 'blood', 'gore', 'weapon', 'drug', 'heroin', 'cocaine',
    'khoa than', 'ma tuy', 'khung bo', 'thuoc phien', 'giet nguoi', 'ho chi minh', 'son tung',
    'trump', 'putin', 'ronaldo', 'messi', 'elon musk',
  ];

  const boDau = s => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
  const tachCoDau = s => ` ${String(s || '').normalize('NFC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim()} `;
  const tachKhongDau = s => ` ${boDau(s).replace(/[^a-z0-9]+/g, ' ').trim()} `;
  const coCum = (chu, cum) => chu.includes(` ${cum} `);

  function locCauLenh(raw) {
    const cauLenh = String(raw || '').replace(/[\u0000-\u001f\u007f<>{}[\]\\`]/g, ' ').replace(/\s+/g, ' ').trim().normalize('NFC');
    if (cauLenh.length < 8) return { ok: false, cauLenh, loi: 'Câu lệnh hơi ngắn, bạn tả thêm một chút nhé.' };
    if (cauLenh.length > DO_DAI_TOI_DA) return { ok: false, cauLenh, loi: `Câu lệnh dài quá ${DO_DAI_TOI_DA} ký tự, bạn rút gọn giúp nhé.` };
    const cd = tachCoDau(cauLenh);
    const kd = tachKhongDau(cauLenh);
    if (TU_CHAN_CO_DAU.some(t => coCum(cd, t)) || TU_CHAN_KHONG_DAU.some(t => coCum(kd, t))) {
      return { ok: false, cauLenh, loi: 'Câu lệnh có từ ngữ chưa phù hợp với hội chợ. Bạn viết lại theo hướng nghề STEM tích cực nhé.' };
    }
    return { ok: true, cauLenh, loi: '' };
  }

  // ===== Chọn ảnh theo quy tắc thư viện (docs/game-2411/THU-VIEN-ANH.md) =====
  const ngauNhien = arr => (arr.length ? arr[Math.floor(Math.random() * arr.length)] : null);
  const ANH_CU = DS_ANH.filter(t => !/-(thai|mong)$/.test(t));

  function chonAnh(nghe, gioi, trangPhuc) {
    if (nghe && (trangPhuc === 'thai' || trangPhuc === 'mong')) {
      const ds = gioi === 'nu' || gioi === 'nam' ? [gioi] : (Math.random() < 0.5 ? ['nu', 'nam'] : ['nam', 'nu']);
      for (const g of ds) if (DS_ANH.includes(`${nghe}-${g}-${trangPhuc}`)) return `${nghe}-${g}-${trangPhuc}`;
    }
    if (nghe) {
      if (ANH_CU.includes(`${nghe}-${gioi}`)) return `${nghe}-${gioi}`;
      if (gioi === 'khong-an-dinh' && ANH_CU.includes(`${nghe}-phi-nhi-nguyen`)) return `${nghe}-phi-nhi-nguyen`;
      const cungNghe = ngauNhien(ANH_CU.filter(t => t.startsWith(`${nghe}-`))) || ngauNhien(DS_ANH.filter(t => t.startsWith(`${nghe}-`)));
      if (cungNghe) return cungNghe;
    }
    // Không rõ nghề: ảnh ngẫu nhiên đúng giới (và trang phục) nếu có
    let ung = DS_ANH;
    if (gioi === 'nu' || gioi === 'nam') ung = ung.filter(t => new RegExp(`-${gioi}(-thai|-mong)?$`).test(t));
    else if (gioi === 'phi-nhi-nguyen' || gioi === 'khong-an-dinh') ung = ung.filter(t => t.endsWith(`-${gioi}`));
    if (trangPhuc === 'thai' || trangPhuc === 'mong') {
      const tp = ung.filter(t => t.endsWith(`-${trangPhuc}`));
      if (tp.length) ung = tp;
    }
    return ngauNhien(ung.length ? ung : DS_ANH);
  }

  // Đọc câu tự viết: nghề theo từ khoá, giới, trang phục Thái/Mông
  function docCauTuViet(cau) {
    const kd = tachKhongDau(cau);
    let nghe = null;
    let diemMax = 0;
    Object.keys(TU_KHOA_NGHE).forEach(ma => {
      let diem = 0;
      TU_KHOA_NGHE[ma].forEach(k => { if (coCum(kd, k)) diem += k.split(' ').length; });
      if (diem > diemMax) { diemMax = diem; nghe = ma; }
    });
    const co = arr => arr.some(k => coCum(kd, k));
    const cd = tachCoDau(cau);
    const coD = arr => arr.some(k => coCum(cd, k));
    let gioi = 'khong-an-dinh';
    if (coD(['nhóm', 'các bạn', 'mọi người', 'tập thể', 'đội ngũ', 'team'])) gioi = 'khong-an-dinh';
    else if (co(['phi nhi nguyen', 'non binary', 'nonbinary'])) gioi = 'phi-nhi-nguyen';
    else if (coD(['cô gái', 'nữ', 'chị', 'bà', 'em gái', 'phụ nữ', 'cô giáo', 'nữ sinh', 'bạn gái', 'cô', 'mẹ'])) gioi = 'nu';
    else if (coD(['chàng trai', 'nam', 'anh', 'ông', 'cậu', 'em trai', 'đàn ông', 'thầy giáo', 'bạn trai', 'thầy', 'bố'])) gioi = 'nam';
    let trangPhuc = '';
    if (co(['nguoi thai', 'dan toc thai', 'thai dien bien', 'do thai', 'ao thai']) || (coCum(kd, 'thai') && !coCum(kd, 'thai lan'))) trangPhuc = 'thai';
    if (co(['mong', 'hmong', 'h mong'])) trangPhuc = 'mong';
    return { nghe, gioi, trangPhuc };
  }

  // ===== Lượt chơi (localStorage, bọc try/catch) =====
  function docLuotDaDung() {
    try { const n = Number(localStorage.getItem(KHOA_LUOT)); return Number.isFinite(n) && n > 0 ? n : 0; } catch (e) { return 0; }
  }
  function ghiLuotDaDung(n) {
    try { localStorage.setItem(KHOA_LUOT, String(n)); } catch (e) { /* bỏ qua */ }
  }

  const S = { buoc: 0, chon: {}, luotDaDung: docLuotDaDung(), ketQua: null };
  const luotConLai = () => Math.max(0, LUOT_TOI_DA - S.luotDaDung);

  function veTienDo(ol, buoc) {
    ol.innerHTML = [0, 1, 2, 3, 4, 5].map(i => `<li class="${i < buoc ? 'xong' : i === buoc ? 'dang' : ''}"></li>`).join('');
  }
  function hien(ten) {
    document.querySelectorAll('.man').forEach(el => { el.hidden = el.dataset.man !== ten; });
    document.querySelectorAll('ol.buoc-nho[data-buoc]').forEach(ol => veTienDo(ol, Number(ol.dataset.buoc)));
    window.scrollTo(0, 0);
  }
  function baoLoi(id, msg) { const el = $(id); el.textContent = msg || ''; el.hidden = !msg; }
  function capNhatLuot() {
    $('so-luot').textContent = `${LUOT_TOI_DA} lượt`;
    $('luot-con').textContent = luotConLai() > 0
      ? `Bạn còn ${luotConLai()} lượt trên điện thoại này.`
      : 'Bạn đã dùng hết lượt. Nhường bạn khác chơi nhé!';
    $('nut-choi-lai').disabled = luotConLai() <= 0;
  }
  function demChu(oId, demId) { $(demId).textContent = `${$(oId).value.length}/${DO_DAI_TOI_DA}`; }

  // ===== Ghép 4 mảnh =====
  function veBuoc() {
    const nhom = NHOM[S.buoc];
    $('ghep-buoc').textContent = `BƯỚC ${S.buoc + 1}/6 · ${nhom.ten.toUpperCase()}`;
    $('ghep-hoi').textContent = nhom.hoi;
    $('ghep-ghi-chu').textContent = nhom.ghiChu || '';
    $('ghep-ghi-chu').hidden = !nhom.ghiChu;
    veTienDo($('buoc-nho'), S.buoc);
    const luoi = $('luoi-the');
    luoi.innerHTML = '';
    nhom.the.forEach(t => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'the';
      b.setAttribute('role', 'radio');
      b.setAttribute('aria-checked', String(S.chon[nhom.ma] === t.ma));
      b.dataset.ma = t.ma;
      if (t.emoji) { const bt = document.createElement('span'); bt.className = 'bt'; bt.textContent = t.emoji; b.appendChild(bt); }
      const chu = document.createElement('span'); chu.textContent = t.ten; b.appendChild(chu);
      b.addEventListener('click', () => {
        S.chon[nhom.ma] = t.ma;
        luoi.querySelectorAll('.the').forEach(x => x.setAttribute('aria-checked', String(x.dataset.ma === t.ma)));
        $('ghep-tiep').disabled = false;
      });
      luoi.appendChild(b);
    });
    $('ghep-tiep').disabled = !S.chon[nhom.ma];
    $('ghep-tiep').textContent = S.buoc === 3 ? 'Xem câu lệnh' : 'Tiếp';
  }
  const theDaChon = ma => NHOM.find(n => n.ma === ma).the.find(t => t.ma === S.chon[ma]);
  function cauLenhGhep() {
    const c = `${theDaChon('gioi').vi} ${theDaChon('nghe').vi}, ${theDaChon('trangphuc').vi}, ${theDaChon('boicanh').vi}`;
    return c.charAt(0).toUpperCase() + c.slice(1);
  }
  function veXemLenh() {
    const hop = $('manh-da-chon');
    hop.innerHTML = '';
    NHOM.forEach(n => {
      const span = document.createElement('span'); span.className = 'manh';
      const b = document.createElement('b'); b.textContent = n.buoc; span.appendChild(b);
      span.appendChild(document.createTextNode(theDaChon(n.ma).ten));
      hop.appendChild(span);
    });
    $('lenh-ghep').value = cauLenhGhep();
    demChu('lenh-ghep', 'dem-ghep');
    baoLoi('loi-ghep', '');
    hien('xem-lenh');
  }

  // ===== Màn "đang tạo" giả lập 3–5 giây =====
  const ngu = ms => new Promise(r => setTimeout(r, ms));
  async function taoAnh(cach, cauLenhRaw, oLoiId) {
    if (luotConLai() <= 0) { baoLoi(oLoiId, 'Bạn đã dùng hết lượt trên điện thoại này. Nhường bạn khác chơi nhé!'); return; }
    const loc = locCauLenh(cauLenhRaw);
    if (!loc.ok) { baoLoi(oLoiId, loc.loi); return; }
    let ten;
    if (cach === 'ghep') ten = chonAnh(S.chon.nghe, S.chon.gioi, S.chon.trangphuc);
    else { const d = docCauTuViet(loc.cauLenh); ten = chonAnh(d.nghe, d.gioi, d.trangPhuc); }
    const url = `thu-vien/${ten}.jpg`;
    const taiTruoc = new Image(); taiTruoc.src = url;
    $('lenh-dang-tao').textContent = loc.cauLenh;
    $('trang-thai-cho').textContent = 'Đang gửi câu lệnh…';
    hien('dang-tao');
    const thoiGian = 3000 + Math.floor(Math.random() * 2000);
    const batDau = Date.now();
    const dat = p => { $('thanh-chay').style.width = `${p}%`; $('phan-tram').textContent = `${Math.round(p)}%`; };
    dat(2);
    const hen = setInterval(() => {
      const t = (Date.now() - batDau) / thoiGian;
      if (t > 0.2) $('trang-thai-cho').textContent = 'AI đang vẽ chân dung của bạn…';
      dat(Math.min(95, 95 * (1 - Math.exp(-2.6 * t))));
    }, 150);
    await ngu(thoiGian);
    clearInterval(hen);
    dat(100);
    S.luotDaDung += 1;
    ghiLuotDaDung(S.luotDaDung);
    capNhatLuot();
    S.ketQua = { url, ten, id: Math.random().toString(36).slice(2, 10) };
    await ngu(250);
    $('anh-kq').src = url;
    $('anh-dau').src = url;
    $('lenh-da-dung').textContent = loc.cauLenh;
    $('nut-tai').href = url;
    $('nut-tai').setAttribute('download', `chan-dung-stem-${S.ketQua.id}.jpg`);
    $('chia-se-tb').hidden = true;
    hien('ket-qua');
  }

  // ===== Gắn sự kiện =====
  $('goi-y').innerHTML = '';
  GOI_Y.forEach(txt => {
    const b = document.createElement('button'); b.type = 'button'; b.textContent = txt;
    b.addEventListener('click', () => { $('lenh-tu-viet').value = txt; demChu('lenh-tu-viet', 'dem-tu-viet'); baoLoi('loi-tu-viet', ''); });
    $('goi-y').appendChild(b);
  });
  $('nut-bat-dau').addEventListener('click', () => { S.buoc = 0; veBuoc(); hien('ghep'); });
  document.querySelectorAll('[data-ve]').forEach(b => b.addEventListener('click', () => hien(b.dataset.ve)));
  $('nut-tu-viet').addEventListener('click', () => { baoLoi('loi-tu-viet', ''); demChu('lenh-tu-viet', 'dem-tu-viet'); hien('tu-viet'); });
  $('ghep-lui').addEventListener('click', () => { if (S.buoc === 0) { hien('chao'); return; } S.buoc -= 1; veBuoc(); });
  $('ghep-tiep').addEventListener('click', () => { if (S.buoc < 3) { S.buoc += 1; veBuoc(); window.scrollTo(0, 0); return; } veXemLenh(); });
  $('xem-lui').addEventListener('click', () => { S.buoc = 3; veBuoc(); hien('ghep'); });
  $('lenh-ghep').addEventListener('input', () => demChu('lenh-ghep', 'dem-ghep'));
  $('lenh-tu-viet').addEventListener('input', () => { demChu('lenh-tu-viet', 'dem-tu-viet'); baoLoi('loi-tu-viet', ''); });
  $('tao-ghep').addEventListener('click', () => taoAnh('ghep', $('lenh-ghep').value.trim() || cauLenhGhep(), 'loi-ghep'));
  $('tao-tu-viet').addEventListener('click', () => taoAnh('tu-viet', $('lenh-tu-viet').value.trim(), 'loi-tu-viet'));
  $('nut-choi-lai').addEventListener('click', () => { S.chon = {}; S.buoc = 0; $('lenh-tu-viet').value = ''; $('chia-se-tb').hidden = true; hien('chao'); });
  $('nut-dong-dau').addEventListener('click', () => {
    $('gio-xong').textContent = `Hoàn thành lúc ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;
    hien('dong-dau');
  });
  $('dau-lui').addEventListener('click', () => hien('ket-qua'));
  $('loi-thu-lai').addEventListener('click', () => hien('chao'));

  // Chia sẻ: Web Share API kèm tệp ảnh nếu máy hỗ trợ, dự phòng link sharer Facebook tới trang game
  $('nut-chia-se').addEventListener('click', async () => {
    if (!S.ketQua) return;
    const urlGame = location.href.split('#')[0].split('?')[0];
    const loiNhan = 'Chân dung nghề nghiệp STEM của mình ở Trạm 3, Hội chợ STEM #GENACT Điện Biên!';
    const tb = $('chia-se-tb');
    tb.hidden = true;
    try {
      if (navigator.share) {
        let duLieu = { title: 'Hội chợ STEM #GENACT', text: loiNhan, url: urlGame };
        try {
          const blob = await (await fetch(S.ketQua.url)).blob();
          const tep = new File([blob], `chan-dung-stem-${S.ketQua.id}.jpg`, { type: 'image/jpeg' });
          if (navigator.canShare && navigator.canShare({ files: [tep] })) duLieu = { title: duLieu.title, text: `${loiNhan} #GENACT`, files: [tep] };
        } catch (e) { /* chia sẻ link nếu không lấy được tệp */ }
        await navigator.share(duLieu);
        return;
      }
    } catch (err) {
      if (err && err.name === 'AbortError') return;
    }
    const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlGame)}`;
    const w = window.open(fb, '_blank');
    if (w) { try { w.opener = null; } catch (e) { /* bỏ qua */ } } else { location.href = fb; }
    tb.textContent = 'Đang mở Facebook để chia sẻ…';
    tb.hidden = false;
  });

  capNhatLuot();
  window.__tram3 = { chonAnh, docCauTuViet };
})();

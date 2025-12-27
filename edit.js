/* === DATABASE & LOGIC LENGKAP === */
const templateAspects = [
    { name: "SEJARAH", img: "background.jpg" },
    { name: "BAHASA", img: "licensed-image.jpg" },
    { name: "AKSARA", img: "tari-kecak.webp" },
    { name: "BUDAYA/TRADISI", img: "about-us.jpeg" }
];

function createDummyData(aspectName) {
    let data = [];
    for(let i=1; i<=4; i++) {
        data.push({
            title: `${aspectName} - Item ${i}`,
            img: "background.jpg",
            desc: `Penjelasan lengkap dan detail mengenai ${aspectName} item ke-${i}.`
        });
    }
    return data;
}

const db = [
    {
        id: 'indo', title: 'INDONESIA', img: 'background.jpg', type: 'video', hasAspects: false, 
        listData: [
            { title: "Geografi", img: "background.jpg", desc: "Indonesia adalah negara kepulauan terbesar..." },
            { title: "Demografi", img: "licensed-image.jpg", desc: "Penduduk Indonesia mencapai lebih dari 270 juta jiwa..." },
            { title: "Ekonomi", img: "oke.jpg", desc: "Ekonomi Indonesia merupakan yang terbesar di Asia Tenggara..." },
            { title: "Pariwisata", img: "tari-kecak.webp", desc: "Sektor pariwisata memegang peranan penting..." }
        ]
    },
    { id: 'bali', title: 'BALI', img: 'tari-kecak.webp', type: 'image', hasAspects: true, aspects: templateAspects.map(a => ({ name: a.name, img: a.img, data: createDummyData(a.name) })) },
    { id: 'd2', title: 'DAERAH 2', img: 'apaj.jpg', type: 'image', hasAspects: true, aspects: templateAspects.map(a => ({ name: a.name, img: a.img, data: createDummyData(a.name) })) },
    { id: 'd3', title: 'DAERAH 3', img: 'download.png', type: 'image', hasAspects: true, aspects: templateAspects.map(a => ({ name: a.name, img: a.img, data: createDummyData(a.name) })) },
    { id: 'd4', title: 'DAERAH 4', img: 'gmbar-tmbhn.jpg', type: 'image', hasAspects: true, aspects: templateAspects.map(a => ({ name: a.name, img: a.img, data: createDummyData(a.name) })) },
    { id: 'd5', title: 'DAERAH 5', img: 'unnamed.jpg', type: 'image', hasAspects: true, aspects: templateAspects.map(a => ({ name: a.name, img: a.img, data: createDummyData(a.name) })) }
];

const members = [
    { nama: "ANGGOTA 1", jur: "Teknik Informatika", kelas: "XII A", thn: "2024/2025" },
    { nama: "ANGGOTA 2", jur: "Desain Grafis", kelas: "XII B", thn: "2024/2025" },
    { nama: "ANGGOTA 3", jur: "Multimedia", kelas: "XII C", thn: "2024/2025" },
    { nama: "ANGGOTA 4", jur: "Jaringan", kelas: "XII D", thn: "2024/2025" }
];

const contacts = [
    { nama: "CONTACT 1", jur: "Email Admin", kelas: "-", thn: "admin@sekolah.sch.id" },
    { nama: "CONTACT 2", jur: "WhatsApp", kelas: "-", thn: "+62 812 3456 7890" },
    { nama: "CONTACT 3", jur: "Instagram", kelas: "-", thn: "@sekolah_official" },
    { nama: "CONTACT 4", jur: "Kantor", kelas: "Ruang TU", thn: "Gedung A Lt.1" }
];

let currentIndex = 0;
let currentView = 'home'; 
let historyStack = []; 

window.onload = () => {
    loadSlide(0);
    setTimeout(() => {
        const intro = document.getElementById('intro-txt');
        if(intro) intro.classList.add('show');
    }, 2000); 
};

function mulai() {
    document.getElementById('intro-screen').style.transform = "translateY(-100%)";
    const v = document.getElementById('bg-video');
    if(v) v.muted = false;
    setTimeout(() => {
        document.querySelector('header').classList.add('ui-active');
        document.getElementById('slider-area').classList.add('ui-active');
    }, 500);
}

function loadSlide(idx) {
    const d = db[idx];
    document.getElementById('header-text').innerText = d.title;
    document.getElementById('card-title').innerText = d.title;
    document.getElementById('card-img').src = d.img;
    const imgLayer = document.getElementById('image-layer');
    if(d.type === 'video') { imgLayer.style.opacity = '0'; } 
    else { imgLayer.style.backgroundImage = `url('${d.img}')`; imgLayer.style.opacity = '1'; }
}

function geser(arah) {
    currentIndex += arah;
    if(currentIndex >= db.length) currentIndex = 0;
    if(currentIndex < 0) currentIndex = db.length - 1;
    loadSlide(currentIndex);
}

function bukaKonten() {
    const d = db[currentIndex];
    document.getElementById('slider-area').style.display = 'none';
    document.getElementById('header-text').classList.add('hidden'); 
    document.getElementById('btn-home-top').style.display = 'block';
    
    const contentLayer = document.getElementById('content-layer');
    contentLayer.style.display = 'flex';
    contentLayer.classList.remove('active-zoom');
    void contentLayer.offsetWidth; 
    contentLayer.classList.add('active-zoom');

    historyStack = ['home']; 
    if (d.hasAspects) { renderAspects(d); currentView = 'aspect'; } 
    else { renderListData(d.listData, d.title); currentView = 'list'; }
}

function renderAspects(dataDb) {
    const grid = document.getElementById('content-grid');
    document.getElementById('content-title').innerText = "PILIH ASPEK - " + dataDb.title;
    document.getElementById('btn-back-content').style.display = "none";
    grid.innerHTML = '';
    dataDb.aspects.forEach((asp, index) => {
        let card = document.createElement('div');
        card.className = 'content-card';
        card.style.animationDelay = `${index * 0.1}s`; 
        card.innerHTML = `<img src="${asp.img}"><div class="label">${asp.name}</div>`;
        card.onclick = () => {
            historyStack.push('aspect');
            renderListData(asp.data, asp.name);
            currentView = 'list';
        };
        grid.appendChild(card);
    });
}

function renderListData(dataList, title) {
    const grid = document.getElementById('content-grid');
    document.getElementById('content-title').innerText = title;
    const btnBack = document.getElementById('btn-back-content');
    if(db[currentIndex].hasAspects) btnBack.style.display = "inline-block";
    else btnBack.style.display = "none"; 
    grid.innerHTML = '';
    dataList.forEach((item, index) => {
        let card = document.createElement('div');
        card.className = 'content-card';
        card.style.animationDelay = `${index * 0.1}s`;
        card.innerHTML = `<img src="${item.img}"><div class="label">${item.title}</div>`;
        card.onclick = () => { bukaDetail(item); };
        grid.appendChild(card);
    });
}

function bukaDetail(item) {
    historyStack.push(currentView);
    currentView = 'detail';
    const detail = document.getElementById('detail-view');
    document.getElementById('detail-img-src').src = item.img;
    document.getElementById('detail-head').innerText = item.title;
    document.getElementById('detail-desc').innerText = item.desc;
    
    const btnContainer = document.querySelector('.detail-text');
    const oldBtn = document.getElementById('dynamic-back-btn');
    if(oldBtn) oldBtn.remove();
    
    const btn = document.createElement('button');
    btn.innerText = "KEMBALI";
    btn.className = "btn-back-detail"; 
    btn.id = "dynamic-back-btn";
    btn.onclick = goBack;
    btnContainer.appendChild(btn);

    detail.style.display = 'block';
}

function goBack() {
    if (currentView === 'detail') {
        document.getElementById('detail-view').style.display = 'none';
        currentView = historyStack.pop();
    } else if (currentView === 'list') {
        const d = db[currentIndex];
        if (d.hasAspects) { renderAspects(d); currentView = 'aspect'; } 
        else { goHome(); }
    }
}

function goHome() {
    document.getElementById('detail-view').style.display = 'none';
    const contentLayer = document.getElementById('content-layer');
    contentLayer.style.display = 'none';
    contentLayer.classList.remove('active-zoom');
    document.getElementById('btn-home-top').style.display = 'none';
    document.getElementById('header-text').classList.remove('hidden'); 
    const slider = document.getElementById('slider-area');
    slider.style.display = 'flex';
    setTimeout(() => slider.classList.add('ui-active'), 100);
    currentView = 'home';
    historyStack = [];
}

function bukaModal(type) {
    document.getElementById('sidebar').classList.remove('active');
    const modal = document.getElementById('modal-overlay');
    const container = document.getElementById('accordion-container');
    const title = document.getElementById('modal-title');
    const box = document.getElementById('modal-box');
    modal.classList.add('show');
    container.innerHTML = '';
    let dataset, modalBg, cardBg;
    if(type === 'about') { title.innerText = "ABOUT US"; dataset = members; modalBg = 'licensed-image.jpg'; cardBg = 'about-us.jpeg'; } 
    else { title.innerText = "CONTACT US"; dataset = contacts; modalBg = 'oke.jpg'; cardBg = 'contact-us.jpeg'; }
    box.style.backgroundImage = `url('${modalBg}')`;
    dataset.forEach((item, index) => {
        let card = document.createElement('div');
        card.className = 'acc-card';
        if(index === 0) card.classList.add('active'); 
        card.style.backgroundImage = `url('${cardBg}')`;
        card.innerHTML = `<div class="acc-overlay"><div class="acc-title-vertical">${item.nama}</div><div class="acc-content"><div class="acc-info"><h3>${item.nama}</h3><p>${item.jur}</p><p>${item.kelas}</p><p>${item.thn}</p></div></div></div>`;
        card.onclick = function() {
            document.querySelectorAll('.acc-card').forEach(c => c.classList.remove('active'));
            this.classList.add('active'); 
        };
        container.appendChild(card);
    });
}
function tutupModal() { document.getElementById('modal-overlay').classList.remove('show'); }
function toggleSidebar() { document.getElementById('sidebar').classList.toggle('active'); }
/* global React */
// ─────────────────────────────────────────────────────────────
// Cerria — Sample data (Bahasa Indonesia)
// ─────────────────────────────────────────────────────────────

const BOOKS = [
  { id: 'b1', title: 'Pulau Misterius', author: 'Jessinia Neilvart', theme: 'sunset', age: '6-8', genre: 'petualangan', chapters: 12, progress: 0.71, currentChapter: 8, reads: 19359, likes: 16571, summary: 'Sebuah botol. Sebuah gulungan. Pulau penuh kejutan! Bersama Kira dan Bima, ikuti petualangan seru di Pulau Berbisik.' },
  { id: 'b2', title: 'Hutan Bercerita',  author: 'Pak Doni',          theme: 'forest', age: '6-8', genre: 'petualangan', chapters: 8, progress: 0.30, currentChapter: 3, reads: 8420,  likes: 5210,  summary: 'Pohon-pohon tua menyimpan dongeng. Apa yang akan kamu temukan di sana?' },
  { id: 'b3', title: 'Sahabat Bintang',   author: 'Bu Ratna',         theme: 'night',  age: '3-5', genre: 'fabel',       chapters: 6, progress: 0.0,  currentChapter: 1, reads: 12044, likes: 9930,  summary: 'Setiap malam, Lila bertemu sahabat di langit.' },
  { id: 'b4', title: 'Kucing Pemberani',  author: 'Kak Iqbal',        theme: 'meadow', age: '3-5', genre: 'humor',       chapters: 5, progress: 1.0,  currentChapter: 5, reads: 3120,  likes: 2810,  summary: 'Si Mio takut tikus — tapi cuma yang besar!' },
  { id: 'b5', title: 'Penjelajah Laut',   author: 'Tim Cerria',       theme: 'ocean',  age: '9-12',genre: 'edukasi',     chapters: 10, progress: 0.10, currentChapter: 1, reads: 7611,  likes: 6020,  summary: 'Selami fakta-fakta seru penghuni laut.' },
  { id: 'b6', title: 'Negeri Awan Ungu',  author: 'Mira S.',          theme: 'purple', age: '6-8', genre: 'petualangan', chapters: 9, progress: 0.45, currentChapter: 4, reads: 5510,  likes: 4101,  summary: 'Awan bisa menjadi rumah?' },
];

// Reader page — words array with audio timing (ms relative to play start)
const READER_TEXT = [
  // Chapter 8 of "Pulau Misterius"
  { w: 'Sore', t: 0    }, { w: 'itu', t: 380  }, { w: 'matahari', t: 700 }, { w: 'pelan-pelan', t: 1180 },
  { w: 'turun', t: 1700 }, { w: 'di', t: 1980 }, { w: 'balik', t: 2160 }, { w: 'bukit.', t: 2480 },
  { w: 'Kira', t: 2900 }, { w: 'berdiri', t: 3220 }, { w: 'di', t: 3580 }, { w: 'tepi', t: 3760 },
  { w: 'pantai,', t: 4040 }, { w: 'memandang', t: 4480 }, { w: 'camar', t: 4880 }, { w: 'putih', t: 5160 },
  { w: 'yang', t: 5420 }, { w: 'terbang', t: 5640 }, { w: 'rendah.', t: 6020 },
  { w: 'Tiba-tiba,', t: 6500 }, { w: 'sesuatu', t: 7020 }, { w: 'berkilau', t: 7440 }, { w: 'di', t: 7800 },
  { w: 'pasir.', t: 7980 }, { w: 'Sebuah', t: 8420 }, { w: 'botol', t: 8780 }, { w: 'kecil', t: 9080 },
  { w: 'dengan', t: 9360 }, { w: 'pesan', t: 9620 }, { w: 'di', t: 9920 }, { w: 'dalamnya.', t: 10100 },
];

// Modul Belajar
const SUBJECTS = [
  { id: 'mat', name: 'Matematika', color: '#4EA8DE', icon: '➕', progress: 0.42 },
  { id: 'bin', name: 'Bahasa Indonesia', color: '#FF8C42', icon: '✏️', progress: 0.65 },
  { id: 'eng', name: 'Bahasa Inggris', color: '#9B59B6', icon: 'A', progress: 0.20 },
  { id: 'sci', name: 'Sains', color: '#3BB273', icon: '🔬', progress: 0.10 },
];

const LEVELS = [
  { id: 1, title: 'Mengenal Angka',     status: 'done',     stars: 3 },
  { id: 2, title: 'Menjumlah Sampai 10', status: 'done',    stars: 3 },
  { id: 3, title: 'Menjumlah Sampai 20', status: 'done',    stars: 2 },
  { id: 4, title: 'Mengurangi',          status: 'current', stars: 0 },
  { id: 5, title: 'Bilangan Genap',      status: 'locked' },
  { id: 6, title: 'Bilangan Ganjil',     status: 'locked' },
  { id: 7, title: 'Pola Angka',          status: 'locked' },
  { id: 8, title: 'Bos: Si Naga Angka',  status: 'locked', boss: true },
];

// One mission question
const MISSION = {
  prompt: 'Ada 7 apel di keranjang. Kira makan 2. Berapa sisanya?',
  scene: 'apples',
  options: [
    { id: 'a', label: '4', correct: false },
    { id: 'b', label: '5', correct: true  },
    { id: 'c', label: '6', correct: false },
    { id: 'd', label: '3', correct: false },
  ],
};

// Video book episodes
const EPISODES = [
  { id: 'v1', title: 'Si Kelinci & Sahabat Hutan', duration: '4:32', thumb: 'forest', theme: 'forest' },
  { id: 'v2', title: 'Petualangan Kapten Buah',     duration: '6:08', thumb: 'island', theme: 'sunset' },
  { id: 'v3', title: 'Bintang yang Hilang',         duration: '3:50', thumb: 'island', theme: 'night' },
];

// Magazine articles (lighter — used in Home recommendations)
const MAGAZINE = {
  edition: 'Edisi Mei 2026 — Negeri Air',
  articles: [
    { tag: 'Sains',  color: '#3BB273', tagBg: '#D6EBC9', tagColor: '#2F6B4A', title: 'Mengapa Laut Asin?',        mins: 3 },
    { tag: 'Seni',   color: '#FF7A93', tagBg: '#FFE8F0', tagColor: '#C0395B', title: 'Mewarnai Ikan Pelangi',     mins: 5 },
    { tag: 'Alam',   color: '#4EA8DE', tagBg: '#CFE7F5', tagColor: '#1F5C8A', title: 'Hewan-hewan di Sungai',     mins: 4 },
    { tag: 'Kuis',   color: '#FFC857', tagBg: '#FFE3CD', tagColor: '#C44A1E', title: 'Tebak Suara Binatang Air',  mins: 2 },
  ],
};

window.CERRIA_DATA = { BOOKS, READER_TEXT, SUBJECTS, LEVELS, MISSION, EPISODES, MAGAZINE };

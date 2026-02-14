// ============================================================
// Valentine Quest – Array Dialog (mudah dikustomisasi!)
// ============================================================

export const startScreenDialogs = ['heLow Pacarku, hari ini kyaknya ada yang beda dari biasanya.', 'Ada sesuatu yang nungguin kamu, ASEQQ.', 'Udah siap belum? Ayo mulai', 'Ini dunia kecil yang aku bikin buat kamu, Pacarre abii.'];

// ── Level 1 – Pagi Valentine ──────────────────────────────
export const level1Intro = ['Pagi, Pacarkuu~ bangun dong, jangan males.', 'Jam wekernya ngamuk tuh. Kabur yuk!', 'Ada hati ku bertebaran. Ambil semua, ya aseQ!'];

export const level1Pickup = [
  'Eh dapet hati. Kecil-kecil gitu, kayak kamu.',
  'Satu lagi sayang, ayooo..',
  'Cie koleksi hatinya nambah terus.',
  'Hatinya langsung jinak pas kamu pegang.',
  'Yang ini udah lama nungguin kamu, Suayangg.',
  'Tiap hati yang kamu ambil itu nambah sayangku ke kamu aseQ',
];

export const level1Hit = ['Aduh, wekernya jahat banget!', 'Pacarku jangan nabrak ya!', 'Weker itu nggak tau lagi berurusan sama siapa.'];

export const level1Complete = ['Pagi selesai! Kamu resmi jadi pengumpul hatiku yang paling lucu, UASEQQ.'];

// ── Level 2 – Persiapan untuk Silvia ──────────────────────────
export const level2Intro = ['Siapin sesuatu buat orang spesial, nih~', 'Bunga, cokelat, surat cinta. Kumpulin semua ya!', 'Persiapan romantis dimulai, Suayang, Letsgooo!'];

export const level2Pickup = [
  'Mawar! Cantik, tapi masih cantikan kamu.',
  'Cokelat dapet. Manis kayak yang ngambil~',
  'Surat cinta! Ish, siapa sih yang nulis.',
  'Satu bunga lagi buat buket kamu.',
  'Cokelat ini ada nama kamu, Pacar aku. Serius aseQ.',
  'Isi suratnya? Hmm... mending nggak usah dibaca dulu.',
];

export const level2Hit = ['Kaktus! Nggak romantis sama sekali.', 'Ups, hati-hati Sayangkuu. Duri tuh!', 'Tanaman galak. Minggir aja deh.'];

export const level2Complete = ['Semua siap! Tinggal ketemuannya, sama Pacarku AseaQ.'];

// ── Level 3 – Waktu Kencan ─────────────────────────────────────
export const level3Intro = ['Okei, ini bagian favoritku. Jalan bareng yu', 'Langit malemnya bagus. Cocok buat kita berdua aseQQ.', 'Santai aja, Sayangkuu. Nggak usah buru-buru.'];

export const level3Pickup = [
  'Bintang jatuh! Cepet bikin permintaan.',
  'Lentera kecil. Romantis banget nggak sih.',
  'Eh dapet jimat! Simpan baik-baik ya.',
  'Kunang-kunang ikutan jalan. Aesthetic.',
  'Bintang itu ngedip ke kamu, Sayang ahaY.',
  'Cahaya bulannya cocok sama kamu. Cuma bilang aja.',
];

export const level3Dialog = [
  'Jalan sama kamu tuh... beda aja rasanya.',
  'Kamu tau nggak? Tawa kamu itu suara favorit aku.',
  'Kalau ini film, ini pasti scene paling bagus.',
  'Suayangku, semoga malem ini nggak selesai-selesai.',
  'Kamu bikin pixel art aja keliatan lebih bagus.',
  'Ya ampun, aku kehabisan kata-kata. Kamu sih.',
  'Worth it sih semua rintangannya, asal sama kamu.',
];

export const level3Hit = ['Kok ada genangan! Sepatu pixel kamu basah tuh.', 'Bangku nongol tiba-tiba. Kaget nggak?', 'Kucing nyebrang~ sial? Nggak lah, kamu mah beruntung.'];

export const level3Complete = ['Jalan-jalannya seru kan, Sayangkuu. Tapi yang terbaik masih belum.'];

// ── Level 4 – Jalan Malam ─────────────────────────────────────
export const level4Intro = ['Sayanggku, ikutin Bintangnya. Percaya aku.', 'Malemnya sepi. Cuma kamu sama bintang di depan.', 'Bentar lagi sampai. Ada sesuatu di sana.'];

export const level4Pickup = ['Bintangnya makin terang pas kamu deket.', 'Berkedip-kedip kayak detak jantung.', 'Makin deket... bisa ngerasa nggak?', 'Bintangnya anget kan. Kayak di deketmu ASEQQ.', 'Dikit lagi. Jangan berhenti.'];

export const level4Complete = ['Kamu nangkep hati yang nyala itu. Dan mungkin... hatiku juga AWOK.'];

// ── Pengakuan / Ending ──────────────────────────────────────
export const confessionLines = [
  'Sayangku.',
  'Jadi... aku bikin game mini ini buat kamu, Aseq mini awoK.',
  'Setiap hati, setiap bintang, setiap dialog random tadi...',
  'Itu caraku ngomong hal yang kadang susah aku bilang langsung.',
  'Kamu tuh bikin hari-hari biasa jadi luar biasa.',
  'Senyum kamu bisa nge-fix hari terburuk aku.',
  'Aku nggak butuh semuanya sempurna.',
  'Aku cuma butuh kamu ada di hatiku, Selalu.',
  'Selamat Hari Valentine, Sayangku.',
  'Makasih udah jadi kamu. Selalu.',
  '— dari seseorang yang tulus cinta kamu walau jauh dimata mu.',
];

// ── Random helper ────────────────────────────────────────────
export const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];

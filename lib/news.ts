export type CategorySlug =
  | 'nasional'
  | 'daerah'
  | 'politik'
  | 'ekonomi'
  | 'olahraga'
  | 'teknologi'
  | 'lifestyle'

export interface Category {
  slug: CategorySlug
  name: string
  description: string
}

export interface Article {
  slug: string
  title: string
  excerpt: string
  category: CategorySlug
  province?: string
  author: string
  authorRole: string
  publishedAt: string
  readingMinutes: number
  image: string
  imageAlt: string
  imageCaption: string
  tags: string[]
  views: number
  body: string[]
  is_demo?: boolean
}

export { SITE_NAME, SITE_URL } from '@/lib/site'

export const categories: Category[] = [
  { slug: 'nasional', name: 'Nasional', description: 'Kebijakan, pemerintahan, dan isu strategis berskala nasional.' },
  { slug: 'daerah', name: 'Daerah', description: 'Kabar dari 38 provinsi, dari Sabang sampai Merauke.' },
  { slug: 'politik', name: 'Politik', description: 'Dinamika parlemen, partai, dan kebijakan publik.' },
  { slug: 'ekonomi', name: 'Ekonomi', description: 'Pasar, bisnis, keuangan, dan kesejahteraan rakyat.' },
  { slug: 'olahraga', name: 'Olahraga', description: 'Sepak bola, bulu tangkis, dan prestasi atlet Indonesia.' },
  { slug: 'teknologi', name: 'Teknologi', description: 'Startup, inovasi digital, dan kebijakan teknologi.' },
  { slug: 'lifestyle', name: 'Lifestyle', description: 'Budaya, kuliner, wisata, dan gaya hidup.' },
]

export const articles: Article[] = [
  {
    slug: 'pemindahan-asn-ke-ikn-gelombang-pertama-januari-2027',
    title: 'Pemerintah Percepat Pemindahan ASN ke IKN, Gelombang Pertama Dimulai Januari 2027',
    excerpt:
      'Sebanyak 12.000 aparatur sipil negara dari 16 kementerian dijadwalkan pindah ke Ibu Kota Nusantara pada tahap awal, seiring rampungnya hunian dan perkantoran inti.',
    category: 'nasional',
    province: 'Kalimantan Timur',
    author: 'Rahmat Hidayat',
    authorRole: 'Redaktur Nasional',
    publishedAt: '2026-10-12T07:30:00+07:00',
    readingMinutes: 6,
    image: '/images/nasional-ikn.png',
    imageAlt: 'Kawasan inti pemerintahan Ibu Kota Nusantara yang sedang dibangun saat matahari terbenam',
    imageCaption: 'Kawasan Inti Pusat Pemerintahan IKN, Kalimantan Timur.',
    tags: ['IKN', 'ASN', 'Ibu Kota Nusantara', 'Kebijakan Publik'],
    views: 48210,
    is_demo: true,
    body: [
      'Pemerintah memastikan pemindahan aparatur sipil negara (ASN) ke Ibu Kota Nusantara (IKN) akan dimulai pada Januari 2027. Gelombang pertama mencakup sekitar 12.000 pegawai dari 16 kementerian dan lembaga yang kantornya telah rampung dibangun di Kawasan Inti Pusat Pemerintahan.',
      'Kepala Otorita IKN dalam konferensi pers di Jakarta, Senin (12/10/2026), menyebut kesiapan hunian vertikal untuk ASN telah mencapai 87 persen. Fasilitas pendukung seperti sekolah, puskesmas, dan transportasi listrik otonom juga dijadwalkan beroperasi sebelum akhir tahun.',
      '"Kami tidak ingin ASN pindah ke kota yang belum siap. Karena itu, pemindahan dilakukan bertahap dan berbasis kesiapan layanan dasar," ujarnya.',
      'Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi menambahkan, ASN yang pindah akan menerima tunjangan kemahalan serta prioritas fasilitas pendidikan bagi anak. Sejumlah serikat pegawai meminta pemerintah membuka ruang konsultasi bagi pegawai dengan kondisi keluarga khusus.',
      'Pengamat kebijakan publik menilai keberhasilan tahap awal akan menjadi penentu kepercayaan publik terhadap proyek IKN. Ia menekankan pentingnya transparansi anggaran dan evaluasi berkala yang dapat diakses masyarakat.',
    ],
  },
  {
    slug: 'dpr-sahkan-aturan-turunan-perlindungan-data-pribadi',
    title: 'DPR Sahkan Aturan Turunan Perlindungan Data Pribadi, Sanksi Korporasi Diperberat',
    excerpt:
      'Rapat paripurna menyetujui penguatan lembaga pengawas data pribadi dan denda hingga 2 persen dari pendapatan tahunan bagi korporasi yang lalai.',
    category: 'politik',
    author: 'Dewi Kartika',
    authorRole: 'Jurnalis Politik',
    publishedAt: '2026-10-12T06:45:00+07:00',
    readingMinutes: 5,
    image: '/images/politik-sidang.png',
    imageAlt: 'Suasana rapat paripurna di ruang sidang parlemen dengan anggota dewan duduk berbaris',
    imageCaption: 'Rapat paripurna di Kompleks Parlemen, Senayan, Jakarta.',
    tags: ['DPR', 'Data Pribadi', 'Regulasi', 'Keamanan Siber'],
    views: 31540,
    is_demo: true,
    body: [
      'Dewan Perwakilan Rakyat (DPR) mengesahkan aturan turunan tentang perlindungan data pribadi dalam rapat paripurna di Senayan, Jakarta. Seluruh fraksi menyatakan setuju setelah pembahasan intensif selama empat bulan.',
      'Aturan baru ini memperkuat kewenangan lembaga pengawas data pribadi, termasuk hak melakukan audit mendadak terhadap pengendali data. Korporasi yang terbukti lalai dapat dikenai denda administratif hingga 2 persen dari pendapatan tahunan.',
      'Ketua Komisi I DPR menyatakan regulasi ini merupakan respons atas sejumlah insiden kebocoran data yang merugikan masyarakat dalam beberapa tahun terakhir.',
      'Koalisi masyarakat sipil menyambut baik pengesahan tersebut, namun mengingatkan agar lembaga pengawas benar-benar independen dari kepentingan pemerintah maupun industri.',
    ],
  },
  {
    slug: 'ekspor-nonmigas-naik-tanjung-priok-rekor-bongkar-muat',
    title: 'Ekspor Nonmigas Naik 8,4 Persen, Tanjung Priok Catat Rekor Bongkar Muat',
    excerpt:
      'Lonjakan permintaan produk hilirisasi nikel dan minyak sawit mendorong kinerja ekspor kuartal III melampaui proyeksi pemerintah.',
    category: 'ekonomi',
    province: 'DKI Jakarta',
    author: 'Bima Prasetyo',
    authorRole: 'Jurnalis Ekonomi',
    publishedAt: '2026-10-12T05:50:00+07:00',
    readingMinutes: 4,
    image: '/images/ekonomi-pelabuhan.png',
    imageAlt: 'Derek pelabuhan memuat peti kemas berwarna-warni ke kapal kargo saat fajar',
    imageCaption: 'Aktivitas bongkar muat peti kemas di pelabuhan.',
    tags: ['Ekspor', 'Perdagangan', 'Pelabuhan', 'Hilirisasi'],
    views: 22870,
    is_demo: true,
    body: [
      'Badan Pusat Statistik mencatat nilai ekspor nonmigas Indonesia pada kuartal III 2026 tumbuh 8,4 persen secara tahunan. Kenaikan ini ditopang produk hilirisasi nikel, minyak sawit olahan, serta komponen elektronik.',
      'Seiring lonjakan tersebut, Pelabuhan Tanjung Priok mencatat rekor bongkar muat 2,1 juta TEUs dalam satu kuartal, tertinggi sepanjang sejarah operasionalnya.',
      'Ekonom menilai tren positif ini perlu dijaga dengan diversifikasi pasar tujuan, mengingat permintaan dari sejumlah negara mitra utama mulai melambat.',
      'Kementerian Perdagangan menyatakan akan memperluas perjanjian dagang dengan negara-negara Afrika dan Timur Tengah untuk mengurangi ketergantungan pada pasar tradisional.',
    ],
  },
  {
    slug: 'timnas-indonesia-tekuk-vietnam-jaga-asa-piala-asia',
    title: 'Timnas Indonesia Tekuk Vietnam 2-1, Jaga Asa ke Putaran Final Piala Asia',
    excerpt:
      'Gol sundulan di menit ke-88 memastikan tiga poin penting bagi Garuda di hadapan 70 ribu suporter di Stadion Utama Gelora Bung Karno.',
    category: 'olahraga',
    author: 'Yoga Saputra',
    authorRole: 'Jurnalis Olahraga',
    publishedAt: '2026-10-11T22:15:00+07:00',
    readingMinutes: 4,
    image: '/images/olahraga-timnas.png',
    imageAlt: 'Para pemain berseragam merah merayakan gol di stadion yang penuh penonton pada malam hari',
    imageCaption: 'Pemain merayakan gol kemenangan di menit akhir.',
    tags: ['Timnas', 'Sepak Bola', 'Piala Asia', 'GBK'],
    views: 56320,
    is_demo: true,
    body: [
      'Tim nasional Indonesia meraih kemenangan dramatis 2-1 atas Vietnam dalam lanjutan kualifikasi Piala Asia di Stadion Utama Gelora Bung Karno, Jakarta, Minggu (11/10/2026) malam.',
      'Indonesia sempat tertinggal lebih dulu pada menit ke-23 sebelum menyamakan kedudukan lewat tendangan bebas di awal babak kedua. Gol penentu lahir dari sundulan bek tengah pada menit ke-88 memanfaatkan sepak pojok.',
      'Pelatih timnas memuji mentalitas para pemain yang tidak menyerah meski tertekan di babak pertama. "Dukungan suporter malam ini luar biasa, mereka pemain ke-12 kami," katanya.',
      'Dengan hasil ini, Indonesia naik ke posisi kedua klasemen sementara grup dan akan menghadapi Filipina pada laga tandang bulan depan.',
    ],
  },
  {
    slug: 'startup-ai-lokal-pendanaan-seri-b-model-bahasa-daerah',
    title: 'Startup AI Lokal Raih Pendanaan Seri B Rp 1,2 Triliun untuk Model Bahasa Daerah',
    excerpt:
      'Dana segar akan digunakan untuk mengembangkan model kecerdasan buatan yang memahami lebih dari 40 bahasa daerah di Indonesia.',
    category: 'teknologi',
    province: 'DKI Jakarta',
    author: 'Nadia Putri',
    authorRole: 'Jurnalis Teknologi',
    publishedAt: '2026-10-11T19:00:00+07:00',
    readingMinutes: 5,
    image: '/images/teknologi-startup.png',
    imageAlt: 'Para insinyur perangkat lunak muda bekerja dengan laptop di kantor startup modern',
    imageCaption: 'Tim pengembang di kantor startup di Jakarta Selatan.',
    tags: ['Startup', 'Kecerdasan Buatan', 'Pendanaan', 'Bahasa Daerah'],
    views: 27410,
    is_demo: true,
    body: [
      'Sebuah perusahaan rintisan kecerdasan buatan asal Jakarta mengumumkan pendanaan Seri B senilai Rp 1,2 triliun yang dipimpin konsorsium investor regional.',
      'Pendiri perusahaan menyebut dana tersebut akan dipakai untuk melatih model bahasa yang mampu memahami lebih dari 40 bahasa daerah, termasuk Jawa, Sunda, Bugis, Minangkabau, dan sejumlah bahasa di Papua.',
      '"Jutaan warga Indonesia lebih nyaman berbahasa daerah. Teknologi seharusnya beradaptasi dengan mereka, bukan sebaliknya," ujarnya.',
      'Perusahaan juga berkomitmen bekerja sama dengan universitas dan komunitas adat untuk memastikan pengumpulan data dilakukan secara etis dan dengan persetujuan penutur.',
    ],
  },
  {
    slug: 'batik-tulis-diburu-generasi-muda-perajin-pekalongan-kewalahan',
    title: 'Batik Tulis Kembali Diburu Generasi Muda, Perajin Pekalongan Kewalahan Pesanan',
    excerpt:
      'Tren busana etnik di media sosial membuat permintaan batik tulis melonjak hingga tiga kali lipat dibanding tahun lalu.',
    category: 'lifestyle',
    province: 'Jawa Tengah',
    author: 'Sari Wulandari',
    authorRole: 'Jurnalis Gaya Hidup',
    publishedAt: '2026-10-11T15:20:00+07:00',
    readingMinutes: 4,
    image: '/images/lifestyle-batik.png',
    imageAlt: 'Tangan perajin melukis malam pada kain batik menggunakan canting',
    imageCaption: 'Perajin batik tulis di Pekalongan, Jawa Tengah.',
    tags: ['Batik', 'UMKM', 'Budaya', 'Fesyen'],
    views: 18960,
    is_demo: true,
    body: [
      'Permintaan batik tulis dari kalangan anak muda melonjak tajam dalam beberapa bulan terakhir. Sejumlah perajin di Pekalongan, Jawa Tengah, mengaku kewalahan memenuhi pesanan yang datang dari berbagai kota.',
      'Salah satu pemilik rumah batik menyebut pesanannya naik hingga tiga kali lipat. Kebanyakan pembeli berusia 20-30 tahun dan mengetahui produknya dari konten video pendek di media sosial.',
      'Kenaikan permintaan ini menjadi angin segar bagi regenerasi perajin. Beberapa sanggar kini membuka kelas membatik untuk pemuda setempat agar keterampilan tradisional tidak punah.',
      'Pemerintah daerah berencana memperluas program sertifikasi batik tulis agar konsumen dapat membedakannya dari kain bermotif batik hasil cetak massal.',
    ],
  },
  {
    slug: 'subak-bali-irigasi-pintar-produksi-padi-tabanan-naik',
    title: 'Subak Bali Terapkan Irigasi Pintar, Produksi Padi Tabanan Naik 15 Persen',
    excerpt:
      'Perpaduan sistem subak warisan budaya dunia dengan sensor kelembapan tanah membantu petani menghemat air di tengah musim kemarau panjang.',
    category: 'daerah',
    province: 'Bali',
    author: 'I Made Surya',
    authorRole: 'Kontributor Bali',
    publishedAt: '2026-10-12T08:10:00+07:00',
    readingMinutes: 4,
    image: '/images/daerah-bali.png',
    imageAlt: 'Petani bekerja di sawah terasering Bali yang diselimuti kabut pagi',
    imageCaption: 'Sawah terasering di Kabupaten Tabanan, Bali.',
    tags: ['Bali', 'Pertanian', 'Subak', 'Teknologi Pertanian'],
    views: 15230,
    is_demo: true,
    body: [
      'Kelompok subak di Kabupaten Tabanan, Bali, mulai memadukan sistem irigasi tradisional dengan sensor kelembapan tanah berbasis tenaga surya. Hasilnya, produksi padi musim ini naik sekitar 15 persen.',
      'Ketua subak setempat menjelaskan, sensor membantu menentukan waktu pembagian air yang lebih tepat tanpa mengubah prinsip Tri Hita Karana yang menjadi landasan subak.',
      'Program ini merupakan kolaborasi pemerintah daerah, perguruan tinggi, dan komunitas petani. Rencananya, teknologi serupa akan diperluas ke 40 subak lain pada tahun depan.',
    ],
  },
  {
    slug: 'festival-danau-toba-2026-targetkan-wisatawan-mancanegara',
    title: 'Festival Danau Toba 2026 Targetkan 200 Ribu Wisatawan Mancanegara',
    excerpt:
      'Rangkaian pertunjukan budaya Batak, lomba solu bolon, dan konser musik digelar selama sepekan di tujuh kabupaten sekitar danau.',
    category: 'daerah',
    province: 'Sumatera Utara',
    author: 'Hotman Siregar',
    authorRole: 'Kontributor Sumatera Utara',
    publishedAt: '2026-10-11T13:40:00+07:00',
    readingMinutes: 3,
    image: '/images/daerah-toba.png',
    imageAlt: 'Rumah adat Batak di tepi Danau Toba dengan latar pegunungan',
    imageCaption: 'Rumah adat Batak di tepi Danau Toba, Sumatera Utara.',
    tags: ['Danau Toba', 'Pariwisata', 'Budaya Batak', 'Sumatera Utara'],
    views: 12480,
    is_demo: true,
    body: [
      'Pemerintah Provinsi Sumatera Utara menargetkan 200 ribu wisatawan mancanegara selama penyelenggaraan Festival Danau Toba 2026 yang digelar pekan depan.',
      'Festival menghadirkan pertunjukan tortor, lomba perahu tradisional solu bolon, pameran ulos, serta konser musik yang melibatkan musisi lokal dan nasional.',
      'Pelaku usaha penginapan di Parapat dan Samosir melaporkan tingkat pemesanan kamar sudah mencapai 80 persen menjelang acara.',
    ],
  },
  {
    slug: 'raja-ampat-batasi-kuota-penyelam-pulihkan-terumbu-karang',
    title: 'Raja Ampat Batasi Kuota Penyelam demi Pulihkan Terumbu Karang',
    excerpt:
      'Mulai November, jumlah penyelam di 12 titik selam utama dibatasi maksimal 150 orang per hari dengan sistem pemesanan daring.',
    category: 'daerah',
    province: 'Papua Barat Daya',
    author: 'Yohanes Wambrauw',
    authorRole: 'Kontributor Papua',
    publishedAt: '2026-10-11T10:05:00+07:00',
    readingMinutes: 4,
    image: '/images/daerah-raja-ampat.png',
    imageAlt: 'Foto udara gugusan pulau karst hijau dan laut biru toska di Raja Ampat',
    imageCaption: 'Gugusan pulau karst di Raja Ampat, Papua Barat Daya.',
    tags: ['Raja Ampat', 'Konservasi', 'Pariwisata', 'Papua'],
    views: 20110,
    is_demo: true,
    body: [
      'Pemerintah Kabupaten Raja Ampat akan memberlakukan kuota harian bagi penyelam di 12 titik selam utama mulai November 2026. Setiap titik dibatasi maksimal 150 penyelam per hari.',
      'Kebijakan ini diambil setelah survei terbaru menunjukkan sebagian terumbu karang mengalami tekanan akibat aktivitas wisata yang padat dan kenaikan suhu laut.',
      'Masyarakat adat setempat dilibatkan sebagai pengawas lapangan, sementara pendapatan dari tarif konservasi akan dialokasikan untuk program rehabilitasi karang.',
    ],
  },
  {
    slug: 'mrt-fase-2-beroperasi-penuh-penumpang-harian-tembus-250-ribu',
    title: 'MRT Fase 2 Beroperasi Penuh, Penumpang Harian Tembus 250 Ribu Orang',
    excerpt:
      'Rute baru hingga kawasan Kota Tua membuat waktu tempuh warga dari Lebak Bulus terpangkas hingga 45 menit dibanding jalur darat.',
    category: 'daerah',
    province: 'DKI Jakarta',
    author: 'Fajar Nugroho',
    authorRole: 'Jurnalis Metropolitan',
    publishedAt: '2026-10-12T06:00:00+07:00',
    readingMinutes: 3,
    image: '/images/daerah-jakarta.png',
    imageAlt: 'Penumpang naik kereta MRT di stasiun layang Jakarta pada jam sibuk sore hari',
    imageCaption: 'Penumpang MRT pada jam sibuk di Jakarta.',
    tags: ['MRT', 'Transportasi Publik', 'Jakarta'],
    views: 34770,
    is_demo: true,
    body: [
      'Operasional penuh MRT Jakarta Fase 2 hingga kawasan Kota Tua mendorong jumlah penumpang harian menembus 250 ribu orang pada pekan pertama.',
      'Direksi PT MRT Jakarta menyebut waktu tempuh dari Lebak Bulus ke Kota Tua kini sekitar 45 menit, jauh lebih cepat dibanding perjalanan darat pada jam sibuk.',
      'Pemerintah Provinsi DKI Jakarta berencana menambah layanan bus pengumpan di sejumlah stasiun untuk memperluas jangkauan transportasi terintegrasi.',
    ],
  },
  {
    slug: 'galangan-pinisi-bulukumba-banjir-pesanan-kapal-wisata-eropa',
    title: 'Galangan Pinisi Bulukumba Banjir Pesanan Kapal Wisata dari Eropa',
    excerpt:
      'Para panrita lopi atau ahli pembuat kapal tradisional kini menerima pesanan hingga dua tahun ke depan.',
    category: 'daerah',
    province: 'Sulawesi Selatan',
    author: 'Andi Rahmawati',
    authorRole: 'Kontributor Sulawesi Selatan',
    publishedAt: '2026-10-10T16:30:00+07:00',
    readingMinutes: 4,
    image: '/images/daerah-makassar.png',
    imageAlt: 'Kapal layar kayu pinisi bersandar di pelabuhan saat matahari terbenam',
    imageCaption: 'Kapal pinisi bersandar di pelabuhan rakyat, Sulawesi Selatan.',
    tags: ['Pinisi', 'Sulawesi Selatan', 'Ekonomi Kreatif', 'Maritim'],
    views: 9860,
    is_demo: true,
    body: [
      'Galangan kapal pinisi di Tanah Beru, Bulukumba, Sulawesi Selatan, kebanjiran pesanan kapal wisata dari pembeli Eropa dan Australia.',
      'Seorang panrita lopi mengatakan antrean pesanan kini mencapai dua tahun. Satu kapal pinisi wisata berukuran sedang membutuhkan waktu pengerjaan delapan hingga sepuluh bulan.',
      'Pemerintah daerah mendorong pelatihan pemuda setempat agar keahlian membuat pinisi, yang telah diakui UNESCO sebagai warisan budaya takbenda, terus terjaga.',
    ],
  },
  {
    slug: 'malioboro-uji-coba-bebas-kendaraan-bermotor-akhir-pekan',
    title: 'Malioboro Uji Coba Bebas Kendaraan Bermotor Setiap Akhir Pekan',
    excerpt:
      'Kawasan ikonik Yogyakarta itu akan steril dari kendaraan bermotor mulai Sabtu pagi hingga Minggu malam selama tiga bulan uji coba.',
    category: 'daerah',
    province: 'DI Yogyakarta',
    author: 'Galih Pratama',
    authorRole: 'Kontributor Yogyakarta',
    publishedAt: '2026-10-10T11:15:00+07:00',
    readingMinutes: 3,
    image: '/images/daerah-yogyakarta.png',
    imageAlt: 'Jalan tradisional Yogyakarta yang ramai dengan becak dan pedagang kaki lima saat senja',
    imageCaption: 'Suasana senja di kawasan Malioboro, Yogyakarta.',
    tags: ['Malioboro', 'Yogyakarta', 'Pariwisata', 'Ruang Publik'],
    views: 14320,
    is_demo: true,
    body: [
      'Pemerintah Kota Yogyakarta memulai uji coba kawasan Malioboro bebas kendaraan bermotor setiap akhir pekan selama tiga bulan ke depan.',
      'Becak, andong, dan sepeda tetap diizinkan melintas. Pemerintah menyiapkan kantong parkir dan bus pengumpan di sejumlah titik sekitar kawasan.',
      'Pedagang kaki lima menyambut positif kebijakan ini, meski berharap ada evaluasi berkala terkait dampaknya terhadap omzet harian.',
    ],
  },
  {
    slug: 'bank-indonesia-tahan-suku-bunga-acuan',
    title: 'Bank Indonesia Tahan Suku Bunga Acuan di Level 5,25 Persen',
    excerpt:
      'Keputusan diambil untuk menjaga stabilitas rupiah di tengah ketidakpastian global, sambil tetap mendorong pertumbuhan kredit.',
    category: 'ekonomi',
    author: 'Lestari Handayani',
    authorRole: 'Redaktur Ekonomi',
    publishedAt: '2026-10-10T14:00:00+07:00',
    readingMinutes: 4,
    image: '/images/ekonomi-rupiah.png',
    imageAlt: 'Tangan teller bank menghitung tumpukan uang kertas rupiah',
    imageCaption: 'Petugas bank menghitung uang rupiah.',
    tags: ['Bank Indonesia', 'Suku Bunga', 'Rupiah', 'Moneter'],
    views: 25690,
    is_demo: true,
    body: [
      'Rapat Dewan Gubernur Bank Indonesia memutuskan mempertahankan suku bunga acuan BI-Rate di level 5,25 persen.',
      'Gubernur Bank Indonesia menyatakan keputusan tersebut konsisten dengan upaya menjaga inflasi dalam sasaran dan stabilitas nilai tukar rupiah di tengah gejolak pasar keuangan global.',
      'Kalangan perbankan menilai keputusan ini memberi kepastian bagi dunia usaha. Pertumbuhan kredit diperkirakan tetap berada di kisaran 10-11 persen hingga akhir tahun.',
    ],
  },
  {
    slug: 'ganda-putra-indonesia-juara-denmark-open',
    title: 'Ganda Putra Indonesia Juara Denmark Open Usai Rubber Game Dramatis',
    excerpt:
      'Pasangan Merah Putih menundukkan unggulan pertama asal Tiongkok dengan skor 21-19, 18-21, 23-21 di Odense.',
    category: 'olahraga',
    author: 'Yoga Saputra',
    authorRole: 'Jurnalis Olahraga',
    publishedAt: '2026-10-11T23:40:00+07:00',
    readingMinutes: 3,
    image: '/images/olahraga-bulutangkis.png',
    imageAlt: 'Pemain bulu tangkis melompat melakukan smes di arena dalam ruangan',
    imageCaption: 'Smes keras di partai final ganda putra.',
    tags: ['Bulu Tangkis', 'Denmark Open', 'BWF'],
    views: 29880,
    is_demo: true,
    body: [
      'Ganda putra Indonesia keluar sebagai juara Denmark Open setelah menundukkan unggulan pertama asal Tiongkok melalui pertarungan tiga gim yang menegangkan di Odense.',
      'Pada gim penentuan, pasangan Indonesia sempat tertinggal 17-20 sebelum membalikkan keadaan dan menutup laga dengan skor 23-21.',
      'Gelar ini menjadi yang ketiga bagi pasangan tersebut sepanjang musim 2026 dan mengerek posisi mereka ke peringkat dua dunia.',
    ],
  },
]

export const breakingNews = [
  'Gempa M 5,2 guncang Maluku Utara, BMKG pastikan tidak berpotensi tsunami',
  'Rupiah menguat ke Rp 15.420 per dolar AS pada pembukaan perdagangan pagi',
  'Timnas Indonesia naik ke posisi kedua klasemen kualifikasi Piala Asia',
  'Pemerintah umumkan jadwal pemindahan ASN gelombang pertama ke IKN',
  'BMKG: Musim hujan diprediksi mulai akhir Oktober di sebagian besar Jawa',
]

export const trendingTopics = [
  'IKN',
  'Timnas Indonesia',
  'Suku Bunga',
  'Data Pribadi',
  'Danau Toba',
  'MRT Jakarta',
  'Startup',
  'Batik',
]

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug)
}

export function getArticlesByCategory(slug: string) {
  return sortByDate(articles.filter((a) => a.category === slug))
}

export function sortByDate(list: Article[]) {
  return [...list].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
}

export function getPopularArticles(limit = 5) {
  return [...articles].sort((a, b) => b.views - a.views).slice(0, limit)
}

export function getRelatedArticles(article: Article, limit = 3) {
  const sameCategory = articles.filter((a) => a.slug !== article.slug && a.category === article.category)
  const others = articles.filter(
    (a) => a.slug !== article.slug && a.category !== article.category && a.tags.some((t) => article.tags.includes(t)),
  )
  const fallback = sortByDate(articles.filter((a) => a.slug !== article.slug))
  const unique = Array.from(new Map([...sameCategory, ...others, ...fallback].map((a) => [a.slug, a])).values())
  return unique.slice(0, limit)
}

export function searchArticles(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return sortByDate(
    articles.filter((a) =>
      [a.title, a.excerpt, a.province ?? '', a.category, ...a.tags, ...a.body].join(' ').toLowerCase().includes(q),
    ),
  )
}

const longFormatter = new Intl.DateTimeFormat('id-ID', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
})

const shortFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Asia/Jakarta',
})

export function formatLongDate(iso: string) {
  return `${longFormatter.format(new Date(iso))} WIB`
}

export function formatShortDate(iso: string) {
  return `${shortFormatter.format(new Date(iso))} WIB`
}

export function formatViews(views: number) {
  return new Intl.NumberFormat('id-ID').format(views)
}

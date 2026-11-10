# PRD Web Portofolio – Snowsant1999

Nov 10, 2026 · @Alie

## Ringkasan & latar belakang

Web portofolio ini membuat pengunjung memahami kemampuan Snowsant1999 dan menghubunginya dalam kurang dari 2 menit, lewat proyek nyata dari GitHub.

[Profil GitHub](https://github.com/Snowsant1999) saat ini punya 9 repositori, 2 pengikut, dan 1 bintang (Alice\_Ai). Karyanya lintas bidang: web (Laravel/PHP), aplikasi desktop (Java), AI pribadi (Python), blockchain (Solidity), dan roadmap cloud (JavaScript). Belum ada README profil atau halaman yang merangkum semuanya, jadi portofolio mengisi celah itu.

## Target pengguna & tolok ukur sukses

| Pengguna | Yang dicari | Aksi yang diharapkan |
| --- | --- | --- |
| Rekruter / HRD | Stack, kedalaman proyek, bukti kerja | Buka detail proyek, hubungi |
| Dosen / pembimbing | Proyek praktikum dan tugas akhir | Buka repo, baca penjelasan |
| Klien kecil / UMKM | Contoh sistem nyata (POS, restoran) | Kirim pesan kerja sama |
| Sesama developer | Kode dan arsitektur | Buka repo, beri bintang |

Target awal (usulan, bisa diubah):

- Pengunjung menemukan tombol kontak dalam 2 klik atau kurang.
- Skor Lighthouse performa dan aksesibilitas minimal 90.
- Minimal 1 klik ke repo GitHub per 3 sesi.

## Proyek yang ditampilkan

Enam repositori unggulan di profil GitHub menjadi isi awal halaman Proyek.

| Proyek | Deskripsi di GitHub | Stack | Kategori | Yang perlu dilengkapi |
| --- | --- | --- | --- | --- |
| [Alice\_Ai](https://github.com/Snowsant1999/Alice_Ai) | AI pribadi, dibantu Gemini Flash 3.7; 1 bintang | Python | AI | Demo, fitur utama |
| [WebsiteKeluhanSiswa](https://github.com/Snowsant1999/WebsiteKeluhanSiswa) | Proyek Laravel 11 | PHP | Web | Tujuan, screenshot |
| [MyRestaurant](https://github.com/Snowsant1999/MyRestaurant) | Belum ada deskripsi | PHP | Web | Deskripsi, screenshot |
| [POS\_Amplang](https://github.com/Snowsant1999/POS_Amplang) | Belum ada deskripsi | Java | Aplikasi desktop | Deskripsi, screenshot |
| [CC\_Roadmap](https://github.com/Snowsant1999/CC_Roadmap) | Roadmap Cloud Computing | JavaScript | Cloud | Tautan situs, ringkasan |
| [Praktikun\_Blockchain](https://github.com/Snowsant1999/Praktikun_Blockchain) | Belum ada deskripsi | Solidity | Blockchain | Deskripsi, hasil praktikum |

Kandidat tambahan, perlu konfirmasi karena tidak muncul di daftar populer: Lentera (aplikasi Android Jetpack Compose) dan WonderIsland (varian pribadi dari Oyenza Studio). Tiga dari sembilan repositori belum terbaca dan README tiap repo belum dibuka.

## Kebutuhan fungsional

Situs satu halaman utama dengan halaman detail per proyek.

| ID | Fitur | Prioritas | Kriteria penerimaan |
| --- | --- | --- | --- |
| F1 | Hero: nama, peran singkat, tombol "Lihat Proyek" dan "Hubungi" | Wajib | Terlihat tanpa scroll di layar 360 px |
| F2 | Daftar proyek dengan filter kategori (Web, AI, Desktop, Cloud, Blockchain) | Wajib | Filter bekerja tanpa muat ulang halaman |
| F3 | Halaman detail proyek: masalah, solusi, stack, screenshot, tautan repo | Wajib | Setiap proyek unggulan punya 1 halaman lengkap |
| F4 | Bagian Tentang dan daftar skill dari bahasa yang dipakai di repo | Wajib | Memuat PHP, Java, Python, JavaScript, Solidity |
| F5 | Kontak: tautan GitHub, email, formulir sederhana | Wajib | Pesan terkirim dan ada konfirmasi |
| F6 | Sinkron otomatis daftar repo, bahasa, dan bintang dari GitHub API | Disarankan | Repo baru muncul tanpa edit kode |
| F7 | Unduh CV (PDF) | Disarankan | Berkas terbuka dalam 1 klik |
| F8 | Mode gelap/terang | Opsional | Mengikuti pengaturan perangkat |
| F9 | Dwibahasa Indonesia/Inggris | Opsional | Pilihan bahasa tersimpan |

## Non-fungsional, desain, dan teknologi

Situs statis yang cepat dan murah dihosting adalah pilihan paling cocok untuk portofolio.

- **Performa:** halaman utama termuat di bawah 2 detik pada jaringan 4G.
- **Responsif:** nyaman dari lebar 360 px sampai desktop.
- **Aksesibilitas:** kontras teks sesuai WCAG AA, bisa dipakai dengan keyboard.
- **SEO:** judul, deskripsi, dan gambar pratinjau (Open Graph) per halaman.
- **Desain:** bersih, satu warna aksen, kode proyek dan screenshot sebagai pusat perhatian.
- **Teknologi (usulan):** Astro atau Next.js dengan Tailwind CSS, GitHub REST API untuk F6, hosting di Vercel, Netlify, atau GitHub Pages. Laravel tidak diperlukan karena tidak ada basis data.

## Sistem desain

Alice Blue (#F0F8FF) menjadi warna dasar situs. Karena hampir putih, ia dipakai sebagai permukaan, sedangkan tombol dan tautan memakai biru yang lebih tua agar kontrasnya lolos WCAG AA.

### Warna

| Token | Terang | Gelap | Kegunaan |
| --- | --- | --- | --- |
| `--bg` | #F0F8FF (Alice Blue) | #0B1F33 | Latar halaman |
| `--surface` | #FFFFFF | #12304D | Kartu, navbar |
| `--surface-tint` | #E1EFFB | #1A4166 | Hover, bagian selang-seling |
| `--border` | #CFE3F5 | #25507A | Garis kartu dan input |
| `--text` | #0B1F33 | #F0F8FF | Teks utama |
| `--text-muted` | #4A5F75 | #A9C3DC | Teks pendukung |
| `--accent` | #1D5FA8 | #8EC5FF | Tombol, tautan, fokus |
| `--accent-text` | #FFFFFF | #0B1F33 | Teks di atas aksen |

Kontras terhitung: teks utama di atas Alice Blue sekitar 15:1, teks pendukung sekitar 6:1, tombol aksen dengan teks putih sekitar 6,4:1.

### Tipografi

| Gaya | Font | Ukuran / tinggi baris | Bobot |
| --- | --- | --- | --- |
| H1 | Inter | 48 / 56 px | 700 |
| H2 | Inter | 32 / 40 px | 600 |
| H3 | Inter | 24 / 32 px | 600 |
| Isi | Inter | 16 / 26 px | 400 |
| Kecil | Inter | 14 / 22 px | 400 |
| Kode, tag stack | JetBrains Mono | 14 / 22 px | 500 |

Di layar di bawah 640 px, H1 turun ke 36 / 44 px dan H2 ke 26 / 34 px.

### Jarak, bentuk, dan gerak

- **Jarak:** kelipatan 4 px (4, 8, 16, 24, 32, 48, 64); lebar konten maksimal 1120 px.
- **Sudut:** 8 px untuk tombol dan input, 12 px untuk kartu.
- **Bayangan:** satu level lembut, `0 2px 8px` biru tua dengan opasitas 8%.
- **Gerak:** transisi 150 ms; hormati pengaturan "kurangi gerakan" di perangkat.

### Komponen

| Komponen | Spesifikasi |
| --- | --- |
| Tombol utama | Isi `--accent`, teks `--accent-text`, tinggi 44 px |
| Tombol sekunder | Garis `--accent`, isi transparan |
| Kartu proyek | Latar `--surface`, garis `--border`, screenshot di atas, judul, deskripsi 2 baris, tag stack |
| Tag stack | Latar `--surface-tint`, font mono, sudut penuh (pil) |
| Filter kategori | Deretan pil; yang aktif berlatar `--accent` |
| Navbar | Tempel di atas, latar `--surface`, menu: Proyek, Tentang, Kontak |
| Input form | Tinggi 44 px, garis `--border`, label selalu terlihat |
| Fokus | Cincin 2 px `--accent` dengan jarak 2 px, pada semua elemen interaktif |

## Rencana rilis, risiko, dan pertanyaan terbuka

1. **Fase 1, konten (1 minggu):** lengkapi README dan screenshot enam proyek, siapkan foto, bio, dan CV.
2. **Fase 2, MVP (1-2 minggu):** F1 sampai F5, deploy ke domain publik.
3. **Fase 3, peningkatan (1 minggu):** F6, F7, F8, optimasi Lighthouse.
4. **Fase 4, pengembangan lanjutan:** F9 dan blog singkat tentang proses tiap proyek.

Risiko:

- Tiga repo tanpa deskripsi membuat halaman detail tampak kosong; selesaikan README lebih dulu.
- Repo praktikum atau tugas kampus bisa terkesan kurang matang; tampilkan hanya yang paling kuat.
- Kunci atau data pribadi di repo publik harus diperiksa sebelum tautan dibagikan.

Pertanyaan terbuka:

- [ ] Siapa target utama: rekruter, dosen, atau klien?
- [ ] Apakah Lentera dan WonderIsland ikut ditampilkan?
- [ ] Email dan tautan sosial apa yang boleh dipublikasikan?
- [ ] Pilihan stack dan nama domain sudah ada?
- [ ] Bahasa utama situs: Indonesia, Inggris, atau keduanya?

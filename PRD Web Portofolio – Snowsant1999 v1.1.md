# PRD Web Portofolio – Snowsant1999 (v1.1)

Nov 10, 2026 · @Alie · Revisi dari v1.0

> **Perubahan dari v1.0:** target utama ditetapkan (asumsi), F5 diberi layanan formulir, sumber konten dipisah dari GitHub API, analitik ditambahkan, filter kategori diturunkan prioritasnya, token `--border-strong` ditambahkan agar input lolos WCAG 1.4.11, kontras mode gelap dihitung, ditambah bagian non-goals, asumsi, Definition of Done, dan fallback konten. Butir bertanda **[Asumsi]** perlu dikonfirmasi pemilik.

## Ringkasan & latar belakang

Web portofolio ini membuat pengunjung memahami kemampuan Snowsant1999 dan menghubunginya dalam kurang dari 2 menit, lewat proyek nyata dari GitHub.

[Profil GitHub](https://github.com/Snowsant1999) (data per 10 Nov 2026, verifikasi ulang sebelum rilis) punya 9 repositori, 2 pengikut, dan 1 bintang (Alice\_Ai). Karyanya lintas bidang: web (Laravel/PHP), aplikasi desktop (Java), AI pribadi (Python), blockchain (Solidity), dan roadmap cloud (JavaScript). Belum ada README profil atau halaman yang merangkum semuanya, jadi portofolio mengisi celah itu.

## Target pengguna & tolok ukur sukses

**Target utama [Asumsi]: rekruter / HRD.** Sekunder: klien kecil / UMKM. Dosen dan sesama developer dilayani lewat tautan repo, tanpa konten khusus.

| Pengguna | Prioritas | Yang dicari | Aksi yang diharapkan |
| --- | --- | --- | --- |
| Rekruter / HRD | Utama | Stack, kedalaman proyek, peran pribadi, CV | Unduh CV, hubungi |
| Klien kecil / UMKM | Sekunder | Contoh sistem nyata (POS, restoran) | Kirim pesan kerja sama |
| Dosen / pembimbing | Tersier | Proyek praktikum dan tugas akhir | Buka repo |
| Sesama developer | Tersier | Kode dan arsitektur | Buka repo, beri bintang |

Konsekuensi untuk desain: urutan halaman utama adalah Hero → Proyek unggulan → Skill & Tentang → Kontak. Tombol "Unduh CV" muncul di Hero.

### Metrik

Diukur dengan analitik ringan tanpa cookie (Plausible atau Umami), 60 hari setelah rilis.

| Metrik | Jenis | Target |
| --- | --- | --- |
| Konversi kontak (pesan terkirim + klik email + unduh CV) per sesi | **Utama** | ≥ 3% |
| Klik ke repo GitHub per sesi | Pendukung | ≥ 33% (1 per 3 sesi) |
| Skor Lighthouse performa, aksesibilitas, SEO, best practices | Kualitas | ≥ 90 di mobile |
| Tombol kontak dapat dicapai dari halaman mana pun | Kualitas | ≤ 2 klik |

## Non-goals

- Tidak ada CMS, panel admin, atau basis data.
- Tidak ada blog di MVP (dipindah ke Fase 4).
- Tidak ada akun pengguna, komentar, atau fitur sosial.
- Tidak menampilkan seluruh repo; hanya proyek yang lolos kurasi.

## Asumsi

- Situs dikerjakan dan dirawat satu orang (Snowsant1999).
- Anggaran hosting Rp0 (tier gratis), domain berbayar opsional.
- Screenshot proyek klien (POS\_Amplang, MyRestaurant) boleh dipublikasikan, atau disamarkan bila belum ada izin.

## Proyek yang ditampilkan

Enam repositori unggulan menjadi kandidat awal. Sebuah proyek baru tampil di situs kalau memenuhi **standar konten minimum**: deskripsi 1 kalimat, masalah, solusi, peran pribadi, minimal 1 screenshot, stack, tautan repo.

| Proyek | Deskripsi di GitHub | Stack | Kategori | Yang perlu dilengkapi |
| --- | --- | --- | --- | --- |
| [Alice\_Ai](https://github.com/Snowsant1999/Alice_Ai) | AI pribadi, dibantu Gemini; 1 bintang | Python | AI | Demo (GIF/video), fitur utama |
| [WebsiteKeluhanSiswa](https://github.com/Snowsant1999/WebsiteKeluhanSiswa) | Proyek Laravel 11 | PHP | Web | Tujuan, screenshot |
| [MyRestaurant](https://github.com/Snowsant1999/MyRestaurant) | Belum ada deskripsi | PHP | Web | Deskripsi, screenshot |
| [POS\_Amplang](https://github.com/Snowsant1999/POS_Amplang) | Belum ada deskripsi | Java | Desktop | Deskripsi, screenshot |
| [CC\_Roadmap](https://github.com/Snowsant1999/CC_Roadmap) | Roadmap Cloud Computing | JavaScript | Cloud | Tautan situs, ringkasan |
| [Praktikun\_Blockchain](https://github.com/Snowsant1999/Praktikun_Blockchain) | Belum ada deskripsi | Solidity | Blockchain | Deskripsi, hasil praktikum; nama tampilan "Praktikum Blockchain" |

**Fallback:** kalau di akhir Fase 1 baru 3–4 proyek memenuhi standar, MVP tetap dirilis dengan proyek itu saja. Sisanya ditambahkan setelah siap.

Kandidat tambahan, perlu konfirmasi: Lentera (aplikasi Android Jetpack Compose) dan WonderIsland (varian pribadi dari Oyenza Studio). Untuk proyek kelompok atau turunan, wajib ditulis bagian mana yang dikerjakan sendiri.

## Kebutuhan fungsional

Situs satu halaman utama dengan halaman detail per proyek.

| ID | Fitur | Prioritas | Kriteria penerimaan |
| --- | --- | --- | --- |
| F1 | Hero: nama, peran singkat, tombol "Lihat Proyek", "Hubungi", dan tautan "Unduh CV" | Wajib | Nama, peran, dan kedua tombol terlihat tanpa scroll di viewport 360 × 640 px |
| F2 | Daftar proyek (kartu) | Wajib | Semua proyek yang lolos kurasi tampil; tiap kartu menuju halaman detail |
| F3 | Halaman detail proyek: masalah, solusi, peran pribadi, stack, screenshot, tautan repo (dan demo bila ada) | Wajib | Setiap proyek yang tampil memenuhi standar konten minimum |
| F4 | Bagian Tentang dan daftar skill | Wajib | Memuat PHP, Java, Python, JavaScript, Solidity, beserta framework utama (Laravel, dll.) |
| F5 | Kontak: tautan GitHub, email, formulir sederhana via layanan pihak ketiga (Web3Forms atau Formspree) | Wajib | Pesan sampai ke email pemilik; pengunjung melihat konfirmasi sukses atau pesan galat; ada proteksi spam (honeypot) |
| F7 | Unduh CV (PDF) | Wajib | Berkas terbuka dalam 1 klik, ukuran < 1 MB |
| F10 | Halaman 404 | Wajib | URL tak dikenal menampilkan 404 dengan tautan kembali ke beranda |
| F11 | Analitik tanpa cookie | Wajib | Event tercatat: kirim formulir, klik email, unduh CV, klik repo |
| F2b | Filter kategori proyek | Disarankan | Aktif hanya bila ada ≥ 8 proyek; filter tanpa muat ulang halaman |
| F6 | Sinkron metadata repo (bahasa, bintang, tanggal update) dari GitHub API | Disarankan | Diambil saat build, dijadwalkan rebuild harian; bila API gagal, build tetap jalan dengan data terakhir |
| F8 | Mode gelap/terang | Opsional | Mengikuti pengaturan perangkat, bisa diubah manual, pilihan tersimpan |
| F9 | Dwibahasa Indonesia/Inggris | Opsional | Pilihan bahasa tersimpan; struktur rute disiapkan sejak MVP (lihat Teknologi) |

Catatan: F7 naik dari "Disarankan" ke "Wajib" karena target utama adalah rekruter.

## Non-fungsional, desain, dan teknologi

- **Performa:** LCP < 2,5 detik dan total halaman utama < 500 KB pada profil "Slow 4G" Lighthouse; gambar dalam format WebP/AVIF dengan ukuran responsif.
- **Responsif:** nyaman dari lebar 360 px sampai desktop.
- **Aksesibilitas:** kontras teks WCAG AA (4,5:1), komponen UI 3:1, bisa dipakai penuh dengan keyboard, semua gambar punya teks alternatif.
- **SEO:** judul, deskripsi, dan gambar pratinjau (Open Graph) per halaman; sitemap.xml dan robots.txt.
- **Privasi:** email ditampilkan sebagai tautan `mailto:` yang dirakit lewat JavaScript untuk mengurangi scraping; tidak ada cookie pelacak.
- **Kompatibilitas:** dua versi terakhir Chrome, Firefox, Safari, Edge; Chrome Android dan Safari iOS.
- **Desain:** bersih, satu warna aksen, kode proyek dan screenshot sebagai pusat perhatian.

### Teknologi

| Bagian | Pilihan | Alasan |
| --- | --- | --- |
| Framework | **Astro** | Situs konten statis, JavaScript minimal secara default, dukungan MDX dan i18n bawaan |
| Styling | Tailwind CSS, token warna sebagai CSS variable | Sesuai sistem desain di bawah |
| Konten proyek | File MDX per proyek di repo (content collections) | GitHub API tidak menyediakan masalah, solusi, dan screenshot |
| Metadata repo | GitHub REST API saat build (F6) | Hindari rate limit 60 req/jam di sisi pengunjung |
| Formulir | Web3Forms atau Formspree (tier gratis) | Tanpa backend sendiri |
| Analitik | Plausible atau Umami | Tanpa cookie, tidak perlu banner persetujuan |
| Hosting | Vercel atau Netlify | Deploy otomatis dari GitHub, rebuild terjadwal |
| i18n | Rute `/` untuk bahasa utama, `/en/` disiapkan meski belum diisi | Menambah bahasa nanti tidak mengubah struktur URL |

## Sistem desain

Alice Blue (#F0F8FF) menjadi warna dasar situs. Karena hampir putih, ia dipakai sebagai permukaan, sedangkan tombol dan tautan memakai biru yang lebih tua agar kontrasnya lolos WCAG AA.

### Warna

| Token | Terang | Gelap | Kegunaan |
| --- | --- | --- | --- |
| `--bg` | #F0F8FF (Alice Blue) | #0B1F33 | Latar halaman |
| `--surface` | #FFFFFF | #12304D | Kartu, navbar |
| `--surface-tint` | #E1EFFB | #1A4166 | Hover, bagian selang-seling, tag stack |
| `--border` | #CFE3F5 | #25507A | Garis dekoratif kartu dan pemisah |
| `--border-strong` | #6F8BA5 | #5682AD | Garis input form dan kontrol (baru) |
| `--text` | #0B1F33 | #F0F8FF | Teks utama |
| `--text-muted` | #4A5F75 | #A9C3DC | Teks pendukung |
| `--accent` | #1D5FA8 | #8EC5FF | Tombol, tautan, fokus |
| `--accent-text` | #FFFFFF | #0B1F33 | Teks di atas aksen |

**Kontras terukur (rumus WCAG 2.x):**

| Pasangan | Terang | Gelap | Syarat |
| --- | --- | --- | --- |
| `--text` di `--bg` | 15,56:1 | 15,56:1 | 4,5:1 ✅ |
| `--text-muted` di `--bg` | 6,15:1 | 9,16:1 | 4,5:1 ✅ |
| `--text-muted` di `--surface-tint` | 5,63:1 | 5,79:1 | 4,5:1 ✅ |
| `--accent-text` di `--accent` | 6,45:1 | 9,21:1 | 4,5:1 ✅ |
| `--accent` (tautan) di `--bg` | 6,01:1 | 9,21:1 | 4,5:1 ✅ |
| `--accent` di `--surface-tint` | 5,51:1 | 5,81:1 | 4,5:1 ✅ |
| `--border` di `--bg` | 1,23:1 | 1,99:1 | Dekoratif saja, tidak untuk input |
| `--border-strong` di `--bg` / `--surface` | 3,31 / 3,55:1 | 4,13 / 3,34:1 | 3:1 ✅ |

### Tipografi

| Gaya | Font | Ukuran / tinggi baris | Bobot |
| --- | --- | --- | --- |
| H1 | Inter | 48 / 56 px | 700 |
| H2 | Inter | 32 / 40 px | 600 |
| H3 | Inter | 24 / 32 px | 600 |
| Isi | Inter | 16 / 26 px | 400 |
| Kecil | Inter | 14 / 22 px | 400 |
| Kode, tag stack | JetBrains Mono | 14 / 22 px | 500 |

Di layar di bawah 640 px, H1 turun ke 36 / 44 px dan H2 ke 26 / 34 px. Font di-host sendiri (subset Latin, `font-display: swap`) untuk menjaga performa.

### Jarak, bentuk, dan gerak

- **Jarak:** kelipatan 4 px (4, 8, 16, 24, 32, 48, 64); lebar konten maksimal 1120 px.
- **Sudut:** 8 px untuk tombol dan input, 12 px untuk kartu.
- **Bayangan:** satu level lembut, `0 2px 8px` biru tua dengan opasitas 8%.
- **Gerak:** transisi 150 ms; hormati pengaturan "kurangi gerakan" di perangkat.

### Komponen

| Komponen | Spesifikasi |
| --- | --- |
| Tombol utama | Isi `--accent`, teks `--accent-text`, tinggi 44 px |
| Tombol sekunder | Garis `--accent`, isi transparan, teks `--accent` |
| Kartu proyek | Latar `--surface`, garis `--border`, screenshot di atas, judul, deskripsi 2 baris, tag stack |
| Tag stack | Latar `--surface-tint`, font mono, sudut penuh (pil) |
| Filter kategori (F2b) | Deretan pil; yang aktif berlatar `--accent` |
| Navbar | Tempel di atas, latar `--surface`, menu: Proyek, Tentang, Kontak; menu jadi tombol hamburger di bawah 640 px |
| Input form | Tinggi 44 px, garis `--border-strong`, label selalu terlihat, pesan galat di bawah field |
| Fokus | Cincin 2 px `--accent` dengan jarak 2 px, pada semua elemen interaktif |
| Status formulir | Sukses, galat, dan sedang mengirim; tombol nonaktif saat mengirim |

## Rencana rilis

| Fase | Durasi | Isi | Definition of Done |
| --- | --- | --- | --- |
| 1. Konten | 1–2 minggu | README dan screenshot proyek, foto, bio, CV; cek kunci/data pribadi di repo publik | Minimal 3 proyek memenuhi standar konten minimum; CV PDF final; repo bersih dari rahasia |
| 2. MVP | 1–2 minggu | F1–F5, F7, F10, F11; deploy ke domain publik | Semua kriteria penerimaan Wajib lolos; Lighthouse mobile ≥ 90; uji keyboard dan 2 peramban mobile |
| 3. Peningkatan | 1 minggu | F6, F8, F2b (bila proyek ≥ 8), optimasi gambar | Kriteria penerimaan fitur terkait lolos; metrik analitik mulai ditinjau |
| 4. Lanjutan | – | F9, blog singkat proses tiap proyek | Ditentukan setelah tinjauan metrik 60 hari |

## Risiko

| Risiko | Dampak | Mitigasi |
| --- | --- | --- |
| Konten proyek tidak selesai tepat waktu | MVP mundur | Fallback rilis dengan 3–4 proyek; Fase 1 diberi 2 minggu |
| Repo tanpa deskripsi membuat halaman detail kosong | Kesan tidak profesional | Standar konten minimum sebagai syarat tampil |
| Repo praktikum terkesan kurang matang | Menurunkan kesan ke rekruter | Tampilkan hanya yang paling kuat; beri konteks "praktikum" secara jujur |
| Kunci API atau data pribadi di repo publik | Kebocoran keamanan | Pindai dengan `gitleaks` atau GitHub secret scanning sebelum tautan dibagikan; rotasi kunci yang bocor |
| Screenshot sistem klien tanpa izin | Masalah etika/hukum | Minta izin atau samarkan data |
| Spam lewat formulir | Kotak masuk penuh | Honeypot, dan captcha dari layanan formulir bila spam muncul |
| Layanan pihak ketiga (formulir, API) berubah atau gagal | Fitur mati | Email tetap ditampilkan sebagai jalur cadangan; data API di-cache saat build |

## Pertanyaan terbuka

- [ ] Konfirmasi target utama: rekruter (asumsi v1.1), atau lainnya?
- [ ] Apakah Lentera dan WonderIsland ikut ditampilkan? Bagian mana yang dikerjakan sendiri?
- [ ] Email dan tautan sosial apa yang boleh dipublikasikan (LinkedIn, dll.)?
- [ ] Nama domain: beli domain sendiri atau pakai subdomain gratis (`*.vercel.app` / `*.netlify.app`)?
- [ ] Bahasa utama situs: Indonesia atau Inggris? (Untuk rekruter, Inggris biasanya lebih luas jangkauannya.)
- [ ] Apakah sudah ada izin menampilkan screenshot POS\_Amplang dan MyRestaurant?


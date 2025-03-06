# ePesantren-Toko-WebApp

![ePesantren Toko Logo](https://camo.githubusercontent.com/c9980da00de26732f310eabebaf7f9767efd23d2a0a9665eb6b29175886ef85f/68747470733a2f2f65706573616e7472656e2e636f2e69642f77702d636f6e74656e742f75706c6f6164732f323032312f30392f65706573616e7472656e5f6869746d2d31353336783333322e706e67)
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

> Sistem Tabungan & Pembayaran Santri berbasis Google Apps Script untuk Pesantren

## 📋 Deskripsi

ePesantren-Tabungan adalah aplikasi web yang dibangun di atas Google Apps Script untuk memudahkan pengelolaan tabungan santri di lingkungan pesantren. Aplikasi ini terintegrasi dengan API ePesantren dan menyediakan antarmuka yang mudah digunakan untuk melihat data santri, mengelola saldo tabungan, dan memproses transaksi pembayaran.

### ✨ Fitur Utama

- **Data Santri Terpadu**: Menampilkan informasi santri dari database ePesantren
- **Manajemen Tabungan**: Melihat dan mengelola saldo tabungan santri
- **Proses Pembayaran**: Memproses pembayaran menggunakan saldo tabungan santri
- **Integrasi RFID**: Mendukung penggunaan kartu RFID untuk identifikasi santri
- **Pencarian & Filter**: Mencari dan memfilter data santri dengan mudah
- **Statistik Real-time**: Menampilkan statistik jumlah santri, total saldo, dan RFID aktif
- **Responsif**: Antarmuka yang responsif untuk berbagai ukuran layar

## 🚀 Cara Menggunakan

### Prasyarat

- Akun Google (untuk Google Apps Script)
- Akses ke API ePesantren (memerlukan API key)

### Instalasi

1. **Buat Project Google Apps Script Baru**
   - Buka [Google Apps Script](https://script.google.com/) dan buat project baru

2. **Salin Kode**
   - Buat file `Code.gs` dan salin isi dari file `Code.gs` di repositori ini
   - Buat file `Index.html` dan salin isi dari file `Index.html` di repositori ini

3. **Konfigurasi API Key**
   - Ubah `API_KEY` dan `API_BASE_URL` di file `Code.gs` sesuai dengan kredensial ePesantren Anda

4. **Deploy Aplikasi**
   - Klik "Deploy" > "New deployment"
   - Pilih jenis: "Web app"
   - Atur akses: "Anyone" atau "Anyone within [your organization]"
   - Klik "Deploy" dan salin URL yang diberikan

5. **Akses Aplikasi**
   - Buka URL yang telah di-deploy untuk mengakses aplikasi

## 📚 Dokumentasi API

Aplikasi ini menggunakan endpoint API berikut dari ePesantren:

| Endpoint | Deskripsi | Parameter |
|----------|-----------|-----------|
| `get_data` | Mendapatkan data semua santri | `key` |
| `get_data_first` | Mendapatkan data santri tunggal | `key`, `nis` |
| `use_saving` | Memproses transaksi pembayaran | `key`, `nis`, `nominal` |

## 🖼️ Screenshot

![Dashboard](https://blog.classy.id/upload/gambar_berita/e5d6839ec60f281443323caffce9c029_20250306133352.png)
![Transaksi](https://blog.classy.id/upload/gambar_berita/acdd662ef3e7bf268a752321383edc03_20250306133537.png)

## 🔧 Pengembangan

### Struktur Proyek

```
ePesantren-Tabungan/
├── Code.gs              # Backend Google Apps Script
├── Index.html           # Antarmuka pengguna (UI)
├── README.md            # Dokumentasi proyek
└── LICENSE              # Lisensi proyek
```

### Kontribusi

Kontribusi sangat diterima! Jika Anda ingin berkontribusi:

1. Fork repositori ini
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan Anda (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

## 📄 Lisensi

Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## 🙏 Penghargaan

- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Font Awesome](https://fontawesome.com/) - Icon set
- [jQuery](https://jquery.com/) - Library JavaScript
- [Google Apps Script](https://developers.google.com/apps-script) - Platform pengembangan

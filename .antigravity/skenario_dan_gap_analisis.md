# Skenario Testing End-to-End & Gap Analysis (GGP 02 Juli 2026)

Dokumen ini berisi skenario pengujian (Positif & Negatif) untuk memastikan kesesuaian sistem FSTrack dengan kebutuhan hasil rapat, serta daftar fitur yang belum terimplementasi di _codebase_ saat ini.

---

## 1. Analisis Kesenjangan (Gap Analysis) pada _Codebase_ Saat Ini

Berdasarkan pengecekan pada script `LhoReport.jsx`, `DetailLaporan.jsx`, dan alur sistem *Fastrack* saat ini, berikut adalah fitur-fitur dari catatan rapat yang **BELUM** terimplementasikan sepenuhnya:

### 🔴 Belum Diimplementasikan (Menunggu Backend / Frontend)
1. **Pemisahan Checklist Unit dan Implement:** Pada `LhoReport.jsx`, saat ini checklist masih digabung dalam 1 tabel ("pengecekan unit"). Belum ada pembagian spesifik antara form evaluasi Unit dan form evaluasi Implement.
2. **Kondisi HM Unit (Hours Meter) & Solar:** Di `LhoReport.jsx` (baris 530), fitur HM dan Solar masih berstatus *Hardcode* dengan keterangan `belum disediakan backend`.
3. **Conformity Kedalaman (Conformity Depth):** Belum ada variabel atau metrik di UI (baik di Detail Laporan maupun LHO) untuk menampilkan data kesesuaian kedalaman.
4. **Intercept Luasan GPS vs Klaim Operator (Sistem Overwritten):** Di UI `DetailLaporan.jsx`, kolom "Klaim Operator" dan "Klaim Kasie" sudah ada, tetapi belum ada keterangan visual *kapan* dan *oleh siapa* data tersebut di-intercept/dikoreksi oleh Kasie.
5. **Dashboard Web (Jarak Antar Lintasan):** Rata-rata Jarak sudah muncul di LHO Report individu, namun di Dashboard Global (seperti `LokasiDashboardCharts.jsx`), metrik atau chart khusus untuk "Jarak antar lintasan" sepertinya belum ada.
6. **Mobile / Tablet UX:** Kebutuhan spesifik *mobile* seperti "nomor seri di implement", "menghilangkan side scroll bar", "operator yang dipilih dibatas per PG", dan "hilangkan deskripsi jika good" sebagian besar ada di *repo* Mobile/Tablet, tetapi API Endpoint harus dipastikan mendukung filtering dan field tersebut.

### 🟢 Sudah Diimplementasikan (Siap Diuji)
1. **Urutan Approval (Kasie FEQ -> Kasie PG):** Sudah ada logika di `LhoReport.jsx` (baris 586-627) di mana tombol *Approve Kasie PG* baru muncul setelah FEQ menyetujui.
2. **Checklist Hanya "After":** Sudah diimplementasikan di `LhoReport.jsx` (baris 267) dengan mengambil `lho?.checklist?.after?.checks`.
3. **Menampilkan Jarak Antar Lintasan di LHO:** Sudah muncul dalam UI (Rata-Rata Jarak).

---

## 2. Skenario Testing End-to-End (E2E)

Berikut adalah skenario pengujian E2E dari proses Operator (Mobile/Tablet) hingga Approval (Sistem Web).

### Skenario 1: Input Laporan dari Mobile/Tablet
**Tujuan:** Memastikan Operator dapat mengisi data LHO sesuai aturan baru.

*   **Skenario Positif:**
    1.  Operator *login*, memilih PG. Sistem hanya menampilkan Operator yang tergabung dalam PG tersebut.
    2.  Operator memilih Unit dan Implement. Nomor seri Implement muncul di layar.
    3.  Operator melakukan *Checklist Unit* dan *Checklist Implement* (terpisah).
    4.  Operator mencentang kondisi "Good". *Field* deskripsi hilang/ter-disable.
    5.  Operator menyelesaikan tugas, checklist akhir (*after*) muncul di *slide* akhir dengan format (No, Judul, Good/Not Good).
    6.  Operator menginput luas klaim, data berhasil terkirim (*Submit*).
*   **Skenario Negatif:**
    1.  Operator memilih kondisi "Not Good", lalu mengosongkan deskripsi. Sistem **menolak** *submit* laporan dan meminta isi deskripsi.
    2.  Operator mencoba mengisi *checklist* "Before". Sistem tidak meminta data tersebut di akhir pelaporan (karena aturan baru hanya *after*).

### Skenario 2: Intercept & Overwritten Klaim (oleh Kasie)
**Tujuan:** Menguji fungsi koreksi luasan saat `GPS > Klaim Operator`.

*   **Skenario Positif:**
    1.  Kasie PG melihat data LHO yang *Submitted*.
    2.  Luasan GPS tercatat 10 Ha, Klaim Operator 8 Ha.
    3.  Kasie PG mengubah klaim menjadi 10 Ha.
    4.  Sistem menyimpan data (Overwritten) dan merekam secara otomatis *timestamp* (kapan) dan *user* (siapa) yang melakukan koreksi.
    5.  Riwayat koreksi tampil di halaman Detail Laporan.
*   **Skenario Negatif:**
    1.  Kasie PG mengosongkan kolom klaim saat mencoba *overwrite*. Sistem **menolak** penyimpanan.

### Skenario 3: Alur Approval (Kasie FEQ -> Kasie PG)
**Tujuan:** Memastikan hierarki persetujuan berjalan sesuai hasil *meeting*.

*   **Skenario Positif:**
    1.  Kasie FEQ membuka menu LHO (*Status: Submitted*).
    2.  Tombol persetujuan untuk Kasie FEQ muncul. Kasie PG **tidak bisa** melakukan *Approve*.
    3.  Kasie FEQ klik *Approve*. Status berubah, dan _Seal_ FEQ berubah hijau.
    4.  Kasie PG sekarang melihat tombol *Approve* aktif.
    5.  Kasie PG menekan *Approve*. LHO ditutup (*Approved*).
*   **Skenario Negatif (Tolak/Reject):**
    1.  Kasie FEQ menyetujui LHO.
    2.  Kasie PG menekan tombol *Tolak LHO*.
    3.  Kasie PG tidak memasukkan alasan (*notes*). Sistem **menolak** dan mewajibkan isi alasan.
    4.  Kasie PG mengisi alasan dan menyimpan. LHO berstatus *Rejected*.

### Skenario 4: Pengecekan Halaman "LhoReport" dan "DetailLaporan"
**Tujuan:** Memastikan data yang dirender sesuai dengan UI yang diminta (tidak ada duplikasi, metrik spesifik tampil).

*   **Skenario Positif:**
    1.  Buka halaman Detail Laporan. Pastikan HM Unit tampil (jika data *backend* ada).
    2.  Buka LhoReport. Pastikan metrik "Conformity Kedalaman" dan "Jarak Antar Lintasan" tampil valid.
    3.  Pastikan tidak ada duplikasi baris/data yang mirip di dalam _Summary_ atau tabel Aktivitas.
*   **Skenario Negatif:**
    1.  LHO dipanggil namun data API belum mengirimkan HM Unit atau Conformity. Pastikan UI merender *fallback* (misalnya tanda "—" atau peringatan) tanpa mengalami *crash / white screen*.

### Skenario 5: Dashboard Keseluruhan
**Tujuan:** Memastikan ringkasan pada *Dashboard* Global akurat.

*   **Skenario Positif:**
    1.  Navigasi ke halaman *Dashboard* utama.
    2.  Lihat grafik/statistik baru untuk "Rata-Rata Jarak Antar Lintasan".
    3.  Ubah filter (Bulan/PG), grafik harus ter-*update* dengan hitungan agregasi yang benar.
*   **Skenario Negatif:**
    1.  Data LHO di *database* belum memiliki parameter jarak lintas. Grafik harus menangani *null value* (misal dirender sebagai 0) tanpa memunculkan eror konsole.

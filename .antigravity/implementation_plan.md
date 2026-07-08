# Rencana Implementasi Penyesuaian UI Frontend (Detail Laporan & LHO Report)

Dokumen ini merangkum rencana pengerjaan penyesuaian antarmuka (UI) khusus untuk *Frontend* web berdasarkan hasil *meeting* GGP 02 Juli 2026. 

Sesuai arahan Anda, kita akan fokus mengeksekusi poin-poin yang murni urusan UI Frontend terlebih dahulu dan menunda fitur-fitur yang masih terblokir oleh *Backend*.

> [!WARNING]
> **Fitur yang DITUNDA (Menunggu Backend):**
> 1. **Pisahkan Checklist Implement dan Unit:** Terblokir karena API belum menyertakan `type` (UNIT/IMPLEMENT).
> 2. **Tampilkan HM Unit & Solar:** Terblokir karena API belum memiliki _field_ data ini (hanya ada _hardcode_ UI).
> 3. **Log Intercept Kasie (Overwritten):** Terblokir karena API belum memiliki _field_ log keterangan siapa dan kapan nilai di-intersep.
> 4. **Conformity Kedalaman (Conformity Depth):** API saat ini hanya mengirimkan `conformityPercent` secara general. Jika kedalaman memiliki angka kesesuaian sendiri, backend harus mengirimkannya.

## Penyesuaian UI yang SIAP Dieksekusi 🚀

Kita akan melakukan perbaikan tata letak (*layout*) dan pembersihan data pada halaman `DetailLaporan.jsx` dan `LhoReport.jsx`.

### 1. Penyesuaian Urutan (Lokasi dan Summary)
**Target File:** `subsoil/src/pages/raker/DetailLaporan.jsx`
* Memindahkan Card **"Ringkasan Laporan" (Report Summary)** agar posisinya disesuaikan. Saat ini lokasinya ada di paling bawah. Kita akan menaikkannya ke posisi di bawah "Informasi Dasar" atau bersebelahan agar lebih mudah dibaca oleh Kasie.

### 2. Checklist Slide/Bagian Paling Akhir
**Target File:** `subsoil/src/pages/raker/LhoReport.jsx`
* Saat ini tabel *Checklist* berada di tengah-tengah laporan (sebelum tabel *Timeline/Activity*). 
* Kita akan **memindahkan tabel Checklist ke posisi paling bawah** halaman agar sesuai dengan instruksi "checklist ditaruh di akhir".

### 3. Checklist Hanya "After"
**Target File:** `subsoil/src/pages/raker/LhoReport.jsx`
* Memastikan tab atau bagian yang merender _Checklist Before_ dihapus atau disembunyikan sepenuhnya, karena instruksinya adalah murni merender data akhir saja (*"checklist after saja"*).

### 4. Hapus Duplikasi & Hilangkan Rentang
**Target File:** `subsoil/src/pages/raker/LhoReport.jsx` & `DetailLaporan.jsx`
* Menelusuri seluruh *Card* laporan dan membuang elemen UI teks "rentang" yang mungkin sebelumnya ada.
* Membersihkan _layout_ agar tidak ada metrik angka yang ditampilkan berulang (duplikasi data yang mirip).

---

## 🙋‍♂️ Pertanyaan untuk Anda (Open Questions)

Sebelum saya mengeksekusi pengubahan kodenya, mohon konfirmasi untuk satu hal ini:
> Di instruksi rapat disebutkan **"tambahkan Jarak Antar Lintasan"**. Saat ini di `LhoReport.jsx` sudah ada komponen UI tabel *Rata-Rata Jarak*. Apakah komponen yang sama juga perlu saya masukkan / gandakan ke halaman `DetailLaporan.jsx`? Atau cukup merapikan letak yang sudah ada saja?

Silakan setujui rencana ini (atau jawab pertanyaan di atas), dan saya akan langsung mulai mengeksekusi kodenya!

# Speed Star Championship Registration — React.js

Versi React dari proyek HTML/CSS/JavaScript `ssc-register`. UI tetap menggunakan Bootstrap 5, sedangkan data tetap dibaca dan ditulis melalui Google Apps Script API yang terhubung ke Google Sheets.

## 1. Teknologi

- React.js
- Vite
- Bootstrap 5
- Bootstrap Icons
- Google Apps Script API
- Google Sheets

## 2. Struktur Folder

```text
ssc-register-react/
├── index.html
├── package.json
├── .env.example
├── README.md
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── styles.css
    ├── services/
    │   └── api.js
    ├── utils/
    │   └── validation.js
    └── components/
        ├── ui/
        │   ├── AlertMessage.jsx
        │   ├── LoadingButton.jsx
        │   └── SectionHeading.jsx
        ├── layout/
        │   ├── Navbar.jsx
        │   └── Footer.jsx
        ├── registration/
        │   ├── HeroSection.jsx
        │   ├── RegistrationTabs.jsx
        │   ├── NewParticipantForm.jsx
        │   ├── DriverIdentityFields.jsx
        │   ├── RacingFields.jsx
        │   ├── SocialFields.jsx
        │   ├── UsedNumbersCard.jsx
        │   └── InfoCard.jsx
        ├── checkin/
        │   ├── CheckInPanel.jsx
        │   └── ParticipantResult.jsx
        └── success/
            └── SuccessPage.jsx
```

## 3. Mengapa Dipecah Menjadi Komponen?

Setiap bagian tampilan yang mempunyai satu tanggung jawab dipisahkan. Contohnya `Navbar` hanya menampilkan navbar dan status pendaftaran, `UsedNumbersCard` hanya menampilkan nomor yang sudah dipakai, dan `NewParticipantForm` hanya menangani form peserta baru.

Dengan cara ini, perubahan pada satu bagian tidak memaksa kita mengubah seluruh `App.jsx`.

## 4. Persiapan

Pastikan Node.js sudah terpasang. Cek di terminal:

```bash
node -v
npm -v
```

Masuk ke folder project:

```bash
cd ssc-register-react
```

Install dependency:

```bash
npm install
```

## 5. Mengatur URL Google Apps Script

Cara yang disarankan adalah menggunakan file `.env`.

Salin `.env.example` menjadi `.env`:

```bash
copy .env.example .env
```

Pada macOS/Linux:

```bash
cp .env.example .env
```

Isi `.env`:

```env
VITE_API_URL=https://script.google.com/macros/s/DEPLOYMENT_ID/exec
```

Ganti `DEPLOYMENT_ID` dengan URL deployment Google Apps Script Anda.

Jika `.env` belum dibuat, `src/services/api.js` masih mempunyai fallback ke URL Apps Script dari proyek lama.

Setelah mengubah `.env`, restart Vite.

## 6. Menjalankan Project

```bash
npm run dev
```

Vite akan menampilkan alamat seperti:

```text
http://localhost:5173
```

Buka alamat tersebut di browser.

## 7. Build Production

```bash
npm run build
```

Hasil build berada di folder:

```text
dist/
```

Untuk mencoba hasil build:

```bash
npm run preview
```

## 8. Alur `App.jsx`

`App.jsx` menjadi pusat state utama aplikasi:

- mengambil `config` dari Apps Script;
- mengambil daftar nomor balap terpakai;
- menentukan tab `Peserta Baru` atau `Check-In`;
- menentukan apakah halaman sukses ditampilkan.

Data konfigurasi diambil dengan:

```jsx
const configResult = await apiGet('config');
```

Daftar nomor terpakai:

```jsx
const result = await apiGet('usedNumbers');
```

## 9. Service API

Semua komunikasi HTTP diletakkan di:

```text
src/services/api.js
```

GET:

```jsx
apiGet('config');
```

GET dengan parameter:

```jsx
apiGet('findParticipant', {
  steamGuid: guid,
});
```

POST:

```jsx
apiPost({
  action: 'register',
  fullName: 'Khaidir',
  ...
});
```

Komponen tidak perlu mengetahui detail `fetch()`.

## 10. Validasi Nomor Balap

Validasi dipisahkan ke:

```text
src/utils/validation.js
```

Aturan:

- hanya angka;
- minimal 1;
- maksimal 999;
- maksimal tiga digit;
- tidak boleh `0`;
- tidak boleh `01`, `007`, dan format lain yang diawali 0;
- tidak boleh menggunakan nomor yang sudah terdaftar.

Regex utama:

```js
/^[1-9][0-9]{0,2}$/
```

Contoh:

```text
1     valid
7     valid
97    valid
999   valid
0     tidak valid
007   tidak valid
01    tidak valid
```

## 11. Pendaftaran Peserta Baru

File:

```text
src/components/registration/NewParticipantForm.jsx
```

State form disimpan dengan `useState`:

```jsx
const [form, setForm] = useState(initialForm);
```

Saat tombol daftar ditekan, data dikirim:

```jsx
const result = await apiPost({
  action: 'register',
  fullName: form.fullName.trim(),
  teamName: form.teamName.trim(),
  racingNumber: Number(form.racingNumber),
  steamGuid: form.steamGuid.trim(),
  discordUsername: form.discordUsername.trim(),
  instagramUsername: form.instagramUsername.trim(),
});
```

Jika berhasil, daftar nomor di-refresh dan halaman sukses ditampilkan.

## 12. Validasi Steam GUID

Ketika input Steam GUID kehilangan fokus (`onBlur`), React memanggil:

```jsx
apiGet('findParticipant', {
  steamGuid: guid,
});
```

Jika ditemukan, pengguna diberi informasi bahwa GUID sudah terdaftar dan sebaiknya menggunakan Check-In.

Validasi final tetap harus dilakukan di Google Apps Script, bukan hanya di React.

## 13. Check-In Peserta Lama

File utama:

```text
src/components/checkin/CheckInPanel.jsx
```

Cari peserta:

```jsx
const response = await apiGet('findParticipant', {
  steamGuid: cleanGuid,
});
```

Check-in:

```jsx
const response = await apiPost({
  action: 'checkin',
  steamGuid: guid.trim(),
});
```

Informasi peserta yang ditemukan ditampilkan oleh komponen kecil:

```text
ParticipantResult.jsx
```

## 14. Status Pendaftaran

React membaca:

```jsx
config.registrationOpen
```

Jika `false`, form peserta baru dan check-in otomatis dinonaktifkan.

Perubahan status tetap dilakukan dari Google Sheets/Google Apps Script seperti proyek sebelumnya.

## 15. Apps Script yang Dibutuhkan

Frontend React ini mengharapkan endpoint yang sama seperti versi sebelumnya:

### GET

```text
?action=config
?action=usedNumbers
?action=findParticipant&steamGuid=...
```

### POST register

```json
{
  "action": "register",
  "fullName": "Nama Driver",
  "teamName": "Nama Tim",
  "racingNumber": 97,
  "steamGuid": "7656119...",
  "discordUsername": "driver",
  "instagramUsername": "driver"
}
```

### POST check-in

```json
{
  "action": "checkin",
  "steamGuid": "7656119..."
}
```

Jadi backend Google Apps Script yang sudah dibuat tidak perlu diubah hanya karena frontend dipindahkan ke React.

## 16. Catatan Keamanan

Validasi React berfungsi untuk UX. Apps Script tetap harus mengecek ulang:

- status pendaftaran;
- nomor balap 1-999;
- nomor balap unik;
- Steam GUID unik;
- peserta tidak melakukan check-in dua kali pada ronde yang sama.

Jangan mengandalkan validasi browser sebagai validasi utama.

## 17. Pengembangan Selanjutnya

Struktur ini sudah siap dikembangkan untuk:

- Entry List ronde aktif;
- halaman detail championship;
- pemilihan championship;
- halaman admin;
- riwayat ronde peserta;
- edit profil peserta;
- kelas mobil/category;
- dashboard statistik peserta.

## Multi Bahasa ID / EN

Project sekarang memiliki pilihan bahasa Indonesia dan English pada navbar.

Komponen utama untuk fitur bahasa berada di:

```text
src/i18n/LanguageContext.jsx
```

Bahasa default adalah `id`. Pilihan user disimpan ke `localStorage` dengan key:

```text
ssc-language
```

Sehingga setelah browser direfresh, bahasa terakhir yang dipilih tetap digunakan.

Untuk menambah teks baru, tambahkan key yang sama pada object `id` dan `en`, lalu panggil dari komponen:

```jsx
const { t } = useLanguage();

<h1>{t('contoh.judul')}</h1>
```

Switch bahasa berada di:

```text
src/components/layout/Navbar.jsx
```

Tombol `ID` mengaktifkan Bahasa Indonesia dan tombol `EN` mengaktifkan English tanpa reload halaman.

## Logo Navbar

Logo 97 Sim Racing disimpan di:

```text
src/assets/97-horizontal.png
```

Komponen navbar mengimpor logo tersebut dari `src/components/layout/Navbar.jsx`. Ukuran logo diatur melalui class `.navbar-logo` di `src/styles.css` agar tetap responsif pada desktop dan mobile.

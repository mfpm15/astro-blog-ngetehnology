---
title: Contoh Blok Kode Firefly
published: 2025-08-20
pinned: false
description: Bagaimana tampilan blok kode di Markdown menggunakan Expressive Code di Firefly.
tags: [Markdown, Firefly]
category: Contoh Postingan
draft: false
---

Di sini, kita akan menjelajahi cara menampilkan blok kode menggunakan [Expressive Code](https://expressive-code.com/). Contoh yang diberikan didasarkan pada dokumentasi resmi, yang dapat Anda rujuk untuk detail lebih lanjut.

## Expressive Code

### Penyorotan Sintaks

[Penyorotan Sintaks](https://expressive-code.com/key-features/syntax-highlighting/)

#### Penyorotan Sintaks Biasa

```js
console.log('Kode ini memiliki penyorotan sintaks!')
```

#### Merender Urutan Escape ANSI

```ansi
ANSI colors:
- Regular: [31mRed[0m [32mGreen[0m [33mYellow[0m [34mBlue[0m [35mMagenta[0m [36mCyan[0m
- Bold:    [1;31mRed[0m [1;32mGreen[0m [1;33mYellow[0m [1;34mBlue[0m [1;35mMagenta[0m [1;36mCyan[0m
- Dimmed:  [2;31mRed[0m [2;32mGreen[0m [2;33mYellow[0m [2;34mBlue[0m [2;35mMagenta[0m [2;36mCyan[0m

256 colors (showing colors 160-177):
[38;5;160m160 [38;5;161m161 [38;5;162m162 [38;5;163m163 [38;5;164m164 [38;5;165m165[0m
[38;5;166m166 [38;5;167m167 [38;5;168m168 [38;5;169m169 [38;5;170m170 [38;5;171m171[0m
[38;5;172m172 [38;5;173m173 [38;5;174m174 [38;5;175m175 [38;5;176m176 [38;5;177m177[0m

Full RGB colors:
[38;2;34;139;34mForestGreen - RGB(34, 139, 34)[0m

Text formatting: [1mBold[0m [2mDimmed[0m [3mItalic[0m [4mUnderline[0m
```

### Kerangka Editor dan Terminal

[Kerangka Editor dan Terminal](https://expressive-code.com/key-features/frames/)

#### Kerangka Editor Kode

```js title="file-tes-saya.js"
console.log('Contoh atribut judul')
```

---

```html
<!-- src/content/index.html -->
<div>Contoh komentar nama file</div>
```

#### Kerangka Terminal

```bash
echo "Kerangka terminal ini tidak memiliki judul"
```

---

```powershell title="Contoh Terminal PowerShell"
Write-Output "Yang ini punya judul!"
```

#### Mengganti Jenis Kerangka

```sh frame="none"
echo "Lihat, tidak ada kerangka!"
```

---

```ps frame="code" title="PowerShell Profile.ps1"
# Jika tidak diganti, ini akan menjadi kerangka terminal
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

### Penanda Teks dan Baris

[Penanda Teks dan Baris](https://expressive-code.com/key-features/text-markers/)

#### Menandai Seluruh Baris dan Rentang Baris

```js {1, 4, 7-8}
// Baris 1 - ditargetkan oleh nomor baris
// Baris 2
// Baris 3
// Baris 4 - ditargetkan oleh nomor baris
// Baris 5
// Baris 6
// Baris 7 - ditargetkan oleh rentang "7-8"
// Baris 8 - ditargetkan oleh rentang "7-8"
```

#### Memilih Jenis Penanda Baris (mark, ins, del)

```js title="penanda-baris.js" del={2} ins={3-4} {6}
function demo() {
  console.log('Baris ini ditandai sebagai dihapus')
  // Baris ini dan baris berikutnya ditandai sebagai disisipkan
  console.log('Ini adalah baris sisipan kedua')

  return 'Baris ini menggunakan jenis penanda default netral'
}
```

#### Menambahkan Label ke Penanda Baris

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// penanda-baris-berlabel.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

#### Menambahkan Label Panjang pada Baris Terpisah

```jsx {"1. Sediakan prop nilai di sini:":5-6} del={"2. Hapus status nonaktif dan aktif:":8-10} ins={"3. Tambahkan ini untuk merender anak-anak di dalam tombol:":12-15}
// penanda-baris-berlabel.jsx
<button
  role="button"
  {...props}

  value={value}
  className={buttonClassName}

  disabled={disabled}
  active={active}
>

  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

#### Menggunakan Sintaks Mirip Diff

```diff
+Baris ini akan ditandai sebagai disisipkan
-Baris ini akan ditandai sebagai dihapus
Ini adalah baris biasa
```

---

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+ini adalah file diff yang sebenarnya
-semua konten akan tetap tidak dimodifikasi
 tidak ada spasi putih yang akan dihapus juga
```

#### Menggabungkan Penyorotan Sintaks dan Sintaks Mirip Diff

```diff lang="js"
  function iniAdalahJavaScript() {
    // Seluruh blok akan disorot sebagai JavaScript,
    // dan kita masih bisa menambahkan penanda diff ke dalamnya!
-   console.log('kode lama untuk dihapus')
+   console.log('kode baru yang mengkilap!')
  }
```

#### Menandai Teks Terpisah di Dalam Baris

```js "teks yang diberikan"
function demo() {
  // Menandai setiap teks yang diberikan di dalam baris
  return 'Mendukung beberapa kecocokan dari teks yang diberikan';
}
```

#### Ekspresi Reguler

```ts /ye[sp]/
console.log('Kata yes dan yep akan ditandai.')
```

#### Melepaskan Garis Miring

```sh /\/ho.*\//
echo "Test" > /home/test.txt
```

#### Memilih Jenis Penanda Inline (mark, ins, del)

```js "return true;" ins="disisipkan" del="dihapus"
function demo() {
  console.log('Ini adalah jenis penanda sisipan dan hapus');
  // Pernyataan return menggunakan jenis penanda default
  return true;
}
```

### Bungkus Kata Otomatis

[Bungkus Kata Otomatis](https://expressive-code.com/key-features/word-wrap/)

#### Mengkonfigurasi Bungkus Kata untuk Setiap Blok

```js wrap
// Contoh dengan bungkus kata diaktifkan
function getLongString() {
  return 'Ini adalah string yang sangat panjang yang kemungkinan besar tidak akan muat di ruang yang tersedia kecuali wadahnya sangat lebar'
}
```

---

```js wrap=false
// Contoh dengan wrap=false
function getLongString() {
  return 'Ini adalah string yang sangat panjang yang kemungkinan besar tidak akan muat di ruang yang tersedia kecuali wadahnya sangat lebar'
}
```

#### Mengkonfigurasi Indentasi Bungkus Kata

```js wrap preserveIndent
// Contoh preserveIndent (diaktifkan secara default)
function getLongString() {
  return 'Ini adalah string yang sangat panjang yang kemungkinan besar tidak akan muat di ruang yang tersedia kecuali wadahnya sangat lebar'
}
```

---

```js wrap preserveIndent=false
// Contoh dengan preserveIndent=false
function getLongString() {
  return 'Ini adalah string yang sangat panjang yang kemungkinan besar tidak akan muat di ruang yang tersedia kecuali wadahnya sangat lebar'
}
```

## Bagian yang Dapat Dilipat

[Bagian yang Dapat Dilipat](https://expressive-code.com/plugins/collapsible-sections/)

```js collapse={1-5, 12-14, 21-24}
// Semua kode boilerplate ini akan dilipat
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// Bagian kode ini terlihat secara default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // Anda dapat memiliki beberapa bagian yang dapat dilipat
  const a = 1
  const b = 2
  const c = a + b

  // Ini akan tetap terlihat
  console.log(`Hasil perhitungan: ${a} + ${b} = ${c}`)
  return c
}

// Semua kode hingga akhir blok akan dilipat lagi
engine.closeConnection()
engine.freeMemory()
engine.shutdown({ reason: 'Kode boilerplate contoh berakhir' })
```

## Nomor Baris

[Nomor Baris](https://expressive-code.com/plugins/line-numbers/)

### Menampilkan Nomor Baris untuk Setiap Blok

```js showLineNumbers
// Blok kode ini akan menampilkan nomor baris
console.log('Salam dari baris 2!')
console.log('Saya di baris 3')
```

---

```js showLineNumbers=false
// Blok ini menonaktifkan nomor baris
console.log('Halo?')
console.log('Maaf, Anda tahu di baris mana saya?')
```

### Mengubah Nomor Baris Awal

```js showLineNumbers startLineNumber=5
console.log('Salam dari baris 5!')
console.log('Saya di baris 6')
```

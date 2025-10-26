---
title: Tutorial Markdown
published: 2023-01-01
pinned: false
description: Contoh postingan blog Markdown yang ringkas.
tags: [Contoh Postingan]
category: Contoh Postingan
licenseName: "Tidak Berlisensi"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false

---

# Tutorial Markdown

Ini adalah contoh yang menunjukkan cara menulis file Markdown. Dokumen ini merangkum sintaks inti dan ekstensi umum (GFM).

- [Elemen Blok](#block-elements)
    - [Paragraf dan Baris Baru](#paragraphs-and-line-breaks)
    - [Judul](#headers)
    - [Kutipan](#blockquotes)
    - [Daftar](#lists)
    - [Blok Kode](#code-blocks)
    - [Garis Pemisah](#horizontal-rules)
    - [Tabel](#table)
- [Elemen Inline](#span-elements)
    - [Tautan](#links)
    - [Penekanan](#emphasis)
    - [Kode Inline](#code)
    - [Gambar](#images)
    - [Coretan](#strikethrough)
- [Lain-lain](#miscellaneous)
    - [Tautan Otomatis](#automatic-links)
    - [Escape Karakter](#backslash-escapes)
- [HTML Inline](#inline-html)

<a id="block-elements"></a>
## Elemen Blok

<a id="paragraphs-and-line-breaks"></a>
### Paragraf dan Baris Baru

#### Paragraf

Tag HTML: `<p>`

Gunakan satu atau lebih baris kosong untuk memisahkan paragraf. (Baris yang hanya berisi **spasi** atau **tab** juga dianggap sebagai baris kosong.)

Kode:

    Ini akan menjadi
    satu baris.

    Ini adalah paragraf kedua.

Pratinjau:

---

Ini akan menjadi
satu baris.

Ini adalah paragraf kedua.

---

#### Baris Baru

Tag HTML: `<br />`

Tambahkan **dua atau lebih spasi** di akhir baris untuk membuat baris baru.

Kode:

    Ini tidak akan menjadi  
    satu baris.

Pratinjau:

---

Ini tidak akan menjadi  
satu baris.

---

<a id="headers"></a>
### Judul

Markdown mendukung dua gaya judul: Setext dan atx.

#### Setext

Tag HTML: `<h1>`, `<h2>`

Gunakan **tanda sama dengan (=)** untuk `<h1>` dan **tanda hubung (-)** untuk `<h2>`, dalam jumlah berapa pun, sebagai "garis bawah".

Kode:

    Ini adalah H1
    =============
    Ini adalah H2
    -------------

Pratinjau:

---

# Ini adalah H1

## Ini adalah H2

---

#### atx

Tag HTML: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`

Gunakan 1-6 **tanda pagar (#)** di awal baris, sesuai dengan `<h1>` hingga `<h6>`.

Kode:

    # Ini adalah H1
    ## Ini adalah H2
    ###### Ini adalah H6

Pratinjau:

---

# Ini adalah H1

## Ini adalah H2

###### Ini adalah H6

---

Opsional: Anda dapat "menutup" judul atx di akhir baris. Jumlah tanda pagar di akhir **tidak harus sama** dengan di awal.

Kode:

    # Ini adalah H1 #
    ## Ini adalah H2 ##
    ### Ini adalah H3 ######

Pratinjau:

---

# Ini adalah H1

## Ini adalah H2

### Ini adalah H3

---

<a id="blockquotes"></a>
### Kutipan

Tag HTML: `<blockquote>`

Markdown menggunakan gaya email **>** sebagai simbol kutipan. Untuk hasil terbaik, ganti baris secara manual dan tambahkan > di depan setiap baris.

Kode:

    > Ini adalah kutipan dengan dua paragraf. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    >
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.

Pratinjau:

---

> Ini adalah kutipan dengan dua paragraf. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

---

Markdown memungkinkan cara "malas": dalam paragraf dengan baris baru yang keras, cukup tambahkan > di baris pertama.

Kode:

    > Ini adalah kutipan dengan dua paragraf. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.

Pratinjau:

---

> Ini adalah kutipan dengan dua paragraf. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

---

Kutipan dapat bersarang (kutipan di dalam kutipan) dengan menambah level >.

Kode:

    > Ini adalah level kutipan pertama.
    >
    > > Ini adalah kutipan bersarang.
    >
    > Kembali ke level pertama.

Pratinjau:

---

> Ini adalah level kutipan pertama.
>
> > Ini adalah kutipan bersarang.
>
> Kembali ke level pertama.

---

Kutipan dapat berisi elemen Markdown lainnya, termasuk judul, daftar, dan blok kode.

Kode:

    > ## Ini adalah judul.
    >
    > 1.   Ini adalah item daftar pertama.
    > 2.   Ini adalah item daftar kedua.
    >
    > Berikut adalah contoh kode:
    >
    >     return shell_exec("echo $input | $markdown_script");

Pratinjau:

---

> ## Ini adalah judul.
>
> 1.  Ini adalah item daftar pertama.
> 2.  Ini adalah item daftar kedua.
>
> Berikut adalah contoh kode:
>
>     return shell_exec("echo $input | $markdown_script");

---

<a id="lists"></a>
### Daftar

Markdown mendukung daftar berurutan (angka) dan tidak berurutan (poin).

#### Daftar Tidak Berurutan

Tag HTML: `<ul>`

Daftar tidak berurutan dapat menggunakan **tanda bintang (*)**, **tanda tambah (+)**, atau **tanda hubung (-)**.

Kode:

    *   Merah
    *   Hijau
    *   Biru

Pratinjau:

---

- Merah
- Hijau
- Biru

---

Sama dengan:

Kode:

    +   Merah
    +   Hijau
    +   Biru

Atau:

Kode:

    -   Merah
    -   Hijau
    -   Biru

#### Daftar Berurutan

Tag HTML: `<ol>`

Daftar berurutan menggunakan angka diikuti titik:

Kode:

    1.  Burung
    2.  McHale
    3.  Parish

Pratinjau:

---

1.  Burung
2.  McHale
3.  Parish

---

Perhatian: Penulisan seperti di bawah ini dapat "secara tidak sengaja" memicu daftar berurutan:

Kode:

    1986. Musim yang luar biasa.

Pratinjau:

---

1986. Musim yang luar biasa.

---

Anda dapat menggunakan **escape karakter backslash (\\)** pada titik:

Kode:

    1986\. Musim yang luar biasa.

Pratinjau:

---

1986\. Musim yang luar biasa.

---

#### Konten dengan Indentasi dalam Daftar

##### Kutipan dalam Item Daftar

Untuk menempatkan kutipan di dalam item daftar, Anda perlu mengindentasi simbol >:

Kode:

    *   Item daftar dengan kutipan:

        > Ini adalah kutipan
        > di dalam item daftar.

Pratinjau:

---

- Item daftar dengan kutipan:

  > Ini adalah kutipan
  > di dalam item daftar.

---

##### Blok Kode dalam Item Daftar

Untuk menempatkan blok kode di dalam item daftar, Anda perlu mengindentasi dua kali — **8 spasi** atau **dua Tab**:

Kode:

    *   Item daftar dengan blok kode:

            <kode di sini>

Pratinjau:

---

- Item daftar dengan blok kode:

      <kode di sini>

---

##### Daftar Bersarang

Kode:

    * A
      * A1
      * A2
    * B
    * C

Pratinjau:

---

- A
  - A1
  - A2
- B
- C

---

<a id="code-blocks"></a>
### Blok Kode

Tag HTML: `<pre>`

Indentasi setiap baris blok kode dengan setidaknya **4 spasi** atau **1 tab**.

Kode:

    Ini adalah paragraf biasa:

        Ini adalah blok kode.

Pratinjau:

---

Ini adalah paragraf biasa:

    Ini adalah blok kode.

---

Blok kode berlanjut hingga baris tanpa indentasi (atau akhir dokumen).

Di dalam blok kode, **ampersan (&)** dan kurung sudut **(< >)** secara otomatis diubah menjadi entitas HTML.

Kode:

        <div class="footer">
            &copy; 2004 Foo Corporation
        </div>

Pratinjau:

---

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>

---

"Blok kode berpagar" dan "penyorotan sintaks" di bawah ini adalah sintaks yang diperluas, Anda juga dapat menggunakannya untuk menulis blok kode.

#### Blok Kode Berpagar

Gunakan pasangan backtick (seperti yang ditunjukkan di bawah) untuk mengelilinginya, sehingga Anda tidak perlu indentasi empat spasi.

Kode:

    Berikut contohnya:

    ```
    function test() {
      console.log("perhatikan baris kosong sebelum fungsi ini?");
    }
    ```

Pratinjau:

---

Berikut contohnya:

```
function test() {
  console.log("perhatikan baris kosong sebelum fungsi ini?");
}
```

---

#### Penyorotan Sintaks

Tambahkan pengenal bahasa opsional setelah blok kode berpagar untuk mengaktifkan penyorotan sintaks (lihat daftar bahasa yang didukung).

Kode:

    ```ruby
    require 'redcarpet'
    markdown = Redcarpet.new("Hello World!")
    puts markdown.to_html
    ```

Pratinjau:

---

```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```

---

<a id="horizontal-rules"></a>
### Garis Pemisah (Garis Horizontal)

Tag HTML: `<hr />`
Tempatkan **tiga atau lebih tanda hubung (-), tanda bintang (*), atau garis bawah (_)** pada satu baris. Spasi di antara simbol-simbol tersebut diperbolehkan.

Kode:

    * * *
    ***
    *****
    - - -
    ---------------------------------------
    ___

Pratinjau:

---

---

---

---

---

---

---

---

<a id="table"></a>
### Tabel

Tag HTML: `<table>`

Ini adalah sintaks yang diperluas.

Gunakan **garis vertikal (|)** untuk memisahkan kolom, **tanda hubung (-)** untuk memisahkan header, dan **titik dua (:)** untuk menentukan perataan.

**Garis vertikal (|)** di kedua sisi dan perataan bersifat opsional. Saat digunakan untuk pemisah header, setiap kolom membutuhkan setidaknya **3 tanda hubung**.

Kode:

```
| Kiri | Tengah | Kanan |
|:-----|:------:|------:|
|aaa   |bbb     |ccc    |
|ddd   |eee     |fff    |

 A | B
---|---
123|456


A |B
--|--
12|45
```

Pratinjau:

---

| Kiri | Tengah | Kanan |
| :--- | :----: | ----: |
| aaa  |  bbb   |   ccc |
| ddd  |  eee   |   fff |

| A   | B   |
| --- | --- |
| 123 | 456 |

| A   | B   |
| --- | --- |
| 12  | 45  |

---

<a id="span-elements"></a>
## Elemen Inline

<a id="links"></a>
### Tautan

Tag HTML: `<a>`

Markdown mendukung dua gaya tautan: inline dan referensi.

#### Tautan Inline

Format tautan inline: `[Teks](URL "Judul")`

Judul bersifat opsional.

Kode:

    Ini adalah [contoh](http://example.com/ "Judul") tautan inline.

    [Tautan ini](http://example.net/) tidak memiliki atribut judul.

Pratinjau:

---

Ini adalah [contoh](http://example.com/ "Judul") tautan inline.

[Tautan ini](http://example.net/) tidak memiliki atribut judul.

---

Jika Anda mereferensikan sumber daya lokal di situs yang sama, Anda dapat menggunakan path relatif:

Kode:

    Lihat halaman [Tentang Saya](/about/) saya untuk detailnya.

Pratinjau:

---

Lihat halaman [Tentang Saya](/about/) saya untuk detailnya.

---

#### Tautan Referensi

Anda dapat mendefinisikan referensi tautan terlebih dahulu. Format definisi: `[id]: URL "Judul"`

Judul juga opsional. Saat mereferensikan, gunakan: `[Teks][id]`

Kode:

    [id]: http://example.com/  "Judul Opsional Di Sini"
    Ini adalah [contoh][id] tautan gaya referensi.

Pratinjau:

---

[id]: http://example.com/ "Judul Opsional Di Sini"

Ini adalah [contoh][id] tautan gaya referensi.

---

Keterangan:

- Kurung siku berisi pengenal tautan (**tidak peka huruf besar-kecil**, dapat diindentasi hingga tiga spasi di sebelah kiri);
- Diikuti oleh titik dua;
- Kemudian satu atau lebih spasi (atau tab);
- Kemudian URL tautan;
- URL dapat secara opsional diapit oleh kurung sudut;
- Secara opsional diikuti oleh atribut judul, diapit oleh tanda kutip atau kurung.

Ketiga definisi berikut ini setara:

Kode:

    [foo]: http://example.com/  "Judul Opsional Di Sini"
    [foo]: http://example.com/  'Judul Opsional Di Sini'
    [foo]: http://example.com/  (Judul Opsional Di Sini)
    [foo]: <http://example.com/>  "Judul Opsional Di Sini"

Jika Anda menggunakan kurung siku kosong, teks tautan itu sendiri akan digunakan sebagai nama.

Kode:

    [Google]: http://google.com/
    [Google][]

Pratinjau:

---

[Google]: http://google.com/

[Google][]

---

<a id="emphasis"></a>
### Penekanan

Tag HTML: `<em>`, `<strong>`

Markdown menggunakan **tanda bintang (*)** atau **garis bawah (_)** untuk menunjukkan penekanan. **Satu pemisah** sesuai dengan `<em>`; **dua pemisah** sesuai dengan `<strong>`.

Kode:

    *satu tanda bintang*

    _satu garis bawah_

    **dua tanda bintang**

    __dua garis bawah__

Pratinjau:

---

_satu tanda bintang_

_satu garis bawah_

**dua tanda bintang**

**dua garis bawah**

---

Tetapi jika ada spasi di kedua sisi, itu akan dianggap sebagai karakter biasa, bukan sintaks penekanan.

Anda dapat menggunakan backslash untuk escape:

Kode:

    \*teks ini dikelilingi oleh tanda bintang harfiah\*

Pratinjau:

---

\*teks ini dikelilingi oleh tanda bintang harfiah\*

---

<a id="code"></a>
### Kode Inline

Tag HTML: `<code>`

Bungkus dengan **backtick (`)**.

Kode:

    Gunakan fungsi `printf()`.

Pratinjau:

---

Gunakan fungsi `printf()`.

---

Jika kode inline Anda perlu menyertakan karakter backtick, Anda dapat menggunakan **beberapa backtick** sebagai pembatas:

Kode:

    ``Ada backtick harfiah (`) di sini.``

Pratinjau:

---

``Ada backtick harfiah (`) di sini.``

---

Pembatas di kedua sisi kode inline dapat berisi spasi (satu di awal, satu di akhir), yang nyaman untuk menempatkan karakter backtick di awal atau akhir kode:

Kode:

    Satu backtick dalam rentang kode: `` ` ``

    String yang dibatasi backtick dalam rentang kode: `` `foo` ``

Pratinjau:

---

Satu backtick dalam rentang kode: `` ` ``

String yang dibatasi backtick dalam rentang kode: `` `foo` ``

---

<a id="images"></a>
### Gambar

Tag HTML: `<img />`

Sintaks gambar Markdown mirip dengan tautan, mendukung gaya inline dan referensi.

#### Gambar Inline

Sintaks gambar inline: `![Teks Alternatif](URL "Judul")`

Judul bersifat opsional.

Kode:

    ![Teks Alt](/path/to/img.jpg)

    ![Teks Alt](/path/to/img.jpg "Judul opsional")

Pratinjau:

---

![Teks Alt](https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp)

![Teks Alt](https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp "Judul opsional")

---

Keterangan:

- Satu tanda seru !;
- Diikuti oleh kurung siku, menempatkan teks alternatif gambar;
- Kemudian kurung, berisi URL/path gambar, dan judul opsional (diapit tanda kutip).

#### Gambar Referensi

Sintaks gambar referensi: `![Teks Alternatif][id]`

Kode:

    [id img]: https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp  "Atribut judul opsional"
    ![Teks Alt][id img]

Pratinjau:

---

[id img]: https://s2.loli.net/2024/08/20/5fszgXeOxmL3Wdv.webp "Atribut judul opsional"

![Teks Alt][id img]

---

<a id="strikethrough"></a>
### Coretan

Tag HTML: `<del>`

Ini adalah sintaks yang diperluas.

GFM menambahkan sintaks coretan.

Kode:

```
~~Teks yang salah.~~
```

Pratinjau:

---

~~Teks yang salah.~~

---

<a id="miscellaneous"></a>
## Lain-lain

<a id="automatic-links"></a>
### Tautan Otomatis

Markdown mendukung cara mudah untuk membuat "tautan otomatis" (URL dan alamat email): cukup bungkus dengan kurung sudut.

Kode:

    <http://example.com/>

    <address@example.com>

Pratinjau:

---

<http://example.com/>

<address@example.com>

---

GFM secara otomatis mengenali URL standar dan mengubahnya menjadi tautan.

Kode:

```
https://github.com/emn178/markdown
```

Pratinjau:

---

https://github.com/emn178/markdown

---

<a id="backslash-escapes"></a>
### Escape Karakter Backslash

Markdown memungkinkan penggunaan backslash untuk escape karakter khusus sintaks Markdown, sehingga ditampilkan secara harfiah.

Kode:

    \*tanda bintang harfiah\*

Pratinjau:

---

\*tanda bintang harfiah\*

---

Karakter berikut dapat di-escape dengan backslash untuk output harfiah:

Kode:

    \   backslash
    `   backtick
    *   tanda bintang
    _   garis bawah
    {}  kurung kurawal
    []  kurung siku
    ()  kurung
    #   tanda pagar
    +   tanda tambah
    -   tanda kurang (hubung)
    .   titik
    !   tanda seru

<a id="inline-html"></a>
## HTML Inline

Untuk markup yang tidak dicakup oleh sintaks Markdown, Anda dapat menggunakan HTML asli secara langsung. Tidak perlu deklarasi khusus untuk beralih dari Markdown ke HTML, cukup tulis tagnya.

Kode:

    Ini adalah paragraf biasa.

    <table>
        <tr>
            <td>Foo</td>
        </tr>
    </table>

    Ini adalah paragraf biasa lainnya.

Pratinjau:

---

Ini adalah paragraf biasa.

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

Ini adalah paragraf biasa lainnya.

---

Harap dicatat: Sintaks Markdown tidak akan diproses di dalam **tag HTML tingkat blok**.

Berbeda dengan tag tingkat blok, sintaks Markdown akan diproses di dalam **tag tingkat inline**.

Kode:

    <span>**Bekerja**</span>

    <div>
        **Tidak Bekerja**
    </div>

Pratinjau:

---

<span>**Bekerja**</span>

<div>
  **Tidak Bekerja**
</div>
***
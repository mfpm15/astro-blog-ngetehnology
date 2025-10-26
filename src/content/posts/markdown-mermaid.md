---
title: Diagram Mermaid di Markdown
published: 2023-10-01
pinned: false
description: Contoh sederhana postingan blog Markdown yang menyertakan Mermaid.
tags: [Markdown, Blog, Mermaid, Firefly]
category: Contoh Postingan
draft: false
---
# Panduan Lengkap Diagram Mermaid di Markdown

Artikel ini mendemonstrasikan cara menggunakan Mermaid di dokumen Markdown untuk membuat berbagai diagram kompleks, termasuk diagram alur, diagram urutan, diagram Gantt, diagram kelas, dan diagram keadaan.

## Contoh Diagram Alur

Diagram alur sangat ideal untuk merepresentasikan proses atau langkah-langkah algoritma.

```mermaid
graph TD
    A[Mulai] --> B{Pemeriksaan Kondisi}
    B -->|Ya| C[Langkah Proses 1]
    B -->|Tidak| D[Langkah Proses 2]
    C --> E[Sub-proses]
    D --> E
    subgraph E [Detail Sub-proses]
        E1[Langkah Sub 1] --> E2[Langkah Sub 2]
        E2 --> E3[Langkah Sub 3]
    end
    E --> F{Keputusan Lain}
    F -->|Opsi 1| G[Hasil 1]
    F -->|Opsi 2| H[Hasil 2]
    F -->|Opsi 3| I[Hasil 3]
    G --> J[Selesai]
    H --> J
    I --> J
```

## Contoh Diagram Urutan

Diagram urutan menunjukkan interaksi antar objek dari waktu ke waktu.

```mermaid
sequenceDiagram
    participant User as Pengguna
    participant WebApp as Aplikasi Web
    participant Server as Server
    participant Database as Database

    User->>WebApp: Mengirim permintaan login
    WebApp->>Server: Mengirim permintaan otentikasi
    Server->>Database: Meminta kredensial pengguna
    Database-->>Server: Mengembalikan data pengguna
    Server-->>WebApp: Mengembalikan hasil otentikasi
    
    alt Otentikasi Berhasil
        WebApp->>User: Menampilkan halaman selamat datang
        WebApp->>Server: Meminta data pengguna
        Server->>Database: Mengambil preferensi pengguna
        Database-->>Server: Mengembalikan pengaturan preferensi
        Server-->>WebApp: Mengembalikan data pengguna
        WebApp->>User: Memuat antarmuka yang dipersonalisasi
    else Otentikasi Gagal
        WebApp->>User: Menampilkan pesan kesalahan
        WebApp->>User: Meminta untuk memasukkan kembali
    end
```

## Contoh Diagram Gantt

Diagram Gantt sangat bagus untuk menampilkan kemajuan proyek dan linimasa.

```mermaid
gantt
    title Linimasa Proyek Pengembangan Website
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d
    
    section Tahap Desain
    Analisis Kebutuhan      :a1, 2023-10-01, 7d
    Desain UI                 :a2, after a1, 10d
    Pembuatan Prototipe        :a3, after a2, 5d
    
    section Tahap Pengembangan
    Pengembangan Frontend      :b1, 2023-10-20, 15d
    Pengembangan Backend       :b2, after a2, 18d
    Desain Database           :b3, after a1, 12d
    
    section Tahap Pengujian
    Pengujian Unit              :c1, after b1, 8d
    Pengujian Integrasi       :c2, after b2, 10d
    Pengujian Penerimaan Pengguna   :c3, after c2, 7d
    
    section Penerapan
    Penerapan Lingkungan Produksi     :d1, after c3, 3d
    Rilis                    :milestone, after d1, 0d
```

## Contoh Diagram Kelas

Diagram kelas menunjukkan struktur statis sistem, termasuk kelas, atribut, metode, dan hubungannya.

```mermaid
classDiagram
    class User {
        +String username
        +String password
        +String email
        +Boolean active
        +login()
        +logout()
        +updateProfile()
    }
    
    class Article {
        +String title
        +String content
        +Date publishDate
        +Boolean published
        +publish()
        +edit()
        +delete()
    }
    
    class Comment {
        +String content
        +Date commentDate
        +addComment()
        +deleteComment()
    }
    
    class Category {
        +String name
        +String description
        +addArticle()
        +removeArticle()
    }
    
    User "1" -- "*" Article : Menulis
    User "1" -- "*" Comment : Memposting
    Article "1" -- "*" Comment : Memiliki
    Article "1" -- "*" Category : Termasuk dalam
```

## Contoh Diagram Keadaan

Diagram keadaan menunjukkan urutan keadaan yang dialami objek selama siklus hidupnya.

```mermaid
stateDiagram-v2
    [*] --> Draf
    
    Draf --> Dalam Tinjauan : Kirim
    Dalam Tinjauan --> Draf : Tolak
    Dalam Tinjauan --> Disetujui : Setujui
    Disetujui --> Diterbitkan : Terbitkan
    Diterbitkan --> Diarsipkan : Arsipkan
    Diterbitkan --> Draf : Tarik
    
    state Diterbitkan {
        [*] --> Aktif
        Aktif --> Tersembunyi : Sembunyikan sementara
        Tersembunyi --> Aktif : Pulihkan
        Aktif --> [*]
        Tersembunyi --> [*]
    }
    
    Diarsipkan --> [*]
```

## Contoh Diagram Pai

Diagram pai sangat bagus untuk menampilkan data proporsi dan persentase.

```mermaid
pie title Analisis Sumber Lalu Lintas Website
    "Mesin Pencari" : 45.6
    "Akses Langsung" : 30.1
    "Media Sosial" : 15.3
    "Tautan Rujukan" : 6.4
    "Sumber Lain" : 2.6
```

## Ringkasan

Mermaid adalah alat yang kuat untuk membuat berbagai jenis diagram dalam dokumen Markdown. Artikel ini mendemonstrasikan cara menggunakan diagram alur, diagram urutan, diagram Gantt, diagram kelas, diagram keadaan, dan diagram pai. Diagram-diagram ini dapat membantu Anda mengekspresikan konsep, proses, dan struktur data yang kompleks dengan lebih jelas.

Untuk menggunakan Mermaid, cukup tentukan bahasa `mermaid` dalam blok kode dan gunakan sintaks teks sederhana untuk mendeskripsikan diagram. Mermaid akan secara otomatis mengubah deskripsi ini menjadi diagram visual yang indah.

Cobalah menggunakan diagram Mermaid di postingan blog teknis atau dokumentasi proyek Anda berikutnya - mereka akan membuat konten Anda lebih profesional dan lebih mudah dipahami!

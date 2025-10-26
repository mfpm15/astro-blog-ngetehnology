---
title: Fitur Tambahan Markdown
published: 2024-05-01
updated: 2024-11-29
description: 'Pelajari tentang fitur Markdown di Firefly'
image: ''
tags: [Demo, Contoh, Markdown, Firefly]
category: 'Contoh Postingan'
draft: false 
---

## Kartu Repositori GitHub
Anda dapat menambahkan kartu dinamis yang tertaut ke repositori GitHub. Saat halaman dimuat, informasi repositori akan diambil dari API GitHub.

::github{repo="CuteLeaf/Firefly"}

Gunakan kode `::github{repo="CuteLeaf/Firefly"}` untuk membuat kartu repositori GitHub.

```markdown
::github{repo="CuteLeaf/Firefly"}
```

## Kotak Peringatan

Jenis kotak peringatan berikut didukung: `note` `tip` `important` `warning` `caution`

:::note
Menyoroti informasi yang harus dipertimbangkan pengguna, bahkan saat membaca sekilas.
:::

:::tip
Informasi opsional untuk membantu pengguna menjadi lebih sukses.
:::

:::important
Informasi penting yang diperlukan untuk keberhasilan pengguna.
:::

:::warning
Konten penting yang memerlukan perhatian segera dari pengguna karena potensi risiko.
:::

:::caution
Potensi konsekuensi negatif dari suatu tindakan.
:::

### Sintaks Dasar

```markdown
:::note
Menyoroti informasi yang harus dipertimbangkan pengguna, bahkan saat membaca sekilas.
:::

:::tip
Informasi opsional untuk membantu pengguna menjadi lebih sukses.
:::
```

### Judul Kustom

Anda dapat menyesuaikan judul kotak peringatan.

:::note[Judul Kustom Saya]
Ini adalah catatan dengan judul kustom.
:::

```markdown
:::note[Judul Kustom Saya]
Ini adalah catatan dengan judul kustom.
:::
```

### Sintaks GitHub

> [!TIP]
> Sintaks [GitHub](https://github.com/orgs/community/discussions/16925) juga didukung.

```
> [!NOTE]
> Sintaks GitHub juga didukung.

> [!TIP]
> Sintaks GitHub juga didukung.
```

### Spoiler

Anda dapat menambahkan spoiler ke teks. Teks juga mendukung sintaks **Markdown**.

Konten :spoiler[disembunyikan **haha**]!

```markdown
Konten :spoiler[disembunyikan **haha**]!
```
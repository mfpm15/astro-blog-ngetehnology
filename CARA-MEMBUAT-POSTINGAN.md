# 📝 Panduan Lengkap Membuat Postingan Blog NgetehNology

Dokumentasi lengkap untuk membuat dan mengelola postingan blog di NgetehNology menggunakan Visual Studio Code dan Git.

---

## 📋 Daftar Isi

1. [Persiapan Awal](#persiapan-awal)
2. [Cara Membuat Postingan Baru](#cara-membuat-postingan-baru)
3. [Struktur Front-matter](#struktur-front-matter)
4. [Fitur Markdown yang Tersedia](#fitur-markdown-yang-tersedia)
5. [Preview Lokal](#preview-lokal)
6. [Publish ke Netlify](#publish-ke-netlify)
7. [Tips & Best Practices](#tips--best-practices)

---

## 🚀 Persiapan Awal

### 1. Install Dependencies
```bash
cd /Users/980078/Documents/pribadi/Projek\ Pribadi/Kumpulan\ Dashboard/BlogAstroPribadi
pnpm install
```

### 2. Jalankan Dev Server
```bash
pnpm dev
```

Server akan berjalan di: `http://localhost:4321`

### 3. Tools yang Diperlukan
- **VS Code**: Editor untuk menulis markdown
- **Git**: Untuk version control
- **Terminal**: Untuk menjalankan perintah

---

## ✍️ Cara Membuat Postingan Baru

Ada **3 cara** untuk membuat postingan baru:

### 🤖 Metode 1: Menggunakan AI Agent (RECOMMENDED)

Cara paling mudah! AI akan membantu membuat postingan lengkap.

**Langkah-langkah:**

1. Di Claude Code, ketik:
   ```
   /create-blog-post
   ```

2. AI akan menanyakan:
   - **Topik**: Apa yang ingin ditulis? (contoh: "Pengenalan SQL Injection")
   - **Target Audience**: Pemula, Menengah, atau Lanjut?
   - **Panjang Artikel**: Singkat (500-1000 kata), Sedang (1000-2000 kata), atau Panjang (2000+ kata)
   - **Referensi**: Apakah ada sumber khusus yang ingin digunakan?

3. AI akan membuat:
   - Folder post dengan slug otomatis
   - File `index.md` dengan konten lengkap
   - Front-matter yang sudah terisi
   - Struktur artikel yang rapi

4. Review dan edit jika perlu
5. Commit dan push (lihat bagian [Publish ke Netlify](#publish-ke-netlify))

**Contoh:**
```
User: /create-blog-post

AI: Saya akan membantu membuat postingan blog tentang keamanan siber.
    Topik apa yang ingin ditulis?

User: Buatkan tutorial tentang SQL Injection untuk pemula

AI: [Akan membuat postingan lengkap dengan contoh code, tips, dan warning]
```

---

### ⚡ Metode 2: Menggunakan Script new-post

Cara cepat untuk membuat file template kosong.

**Langkah-langkah:**

1. Jalankan perintah:
   ```bash
   pnpm run new-post -- nama-post-baru
   ```

2. File akan dibuat di:
   ```
   src/content/posts/nama-post-baru.md
   ```

3. Isi konten secara manual

**Contoh:**
```bash
# Membuat post tentang XSS Attack
pnpm run new-post -- pengenalan-xss-attack

# Output:
# Post src/content/posts/pengenalan-xss-attack.md created
```

**Template yang dihasilkan:**
```markdown
---
title: pengenalan-xss-attack
published: 2025-10-27
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
---

[Tulis konten di sini]
```

---

### 📁 Metode 3: Membuat Manual (Dengan Folder)

Untuk postingan dengan banyak gambar atau file tambahan.

**Langkah-langkah:**

1. Buat folder baru:
   ```bash
   mkdir -p src/content/posts/nama-post-dengan-folder
   ```

2. Buat file `index.md`:
   ```bash
   touch src/content/posts/nama-post-dengan-folder/index.md
   ```

3. Tambahkan cover image (opsional):
   ```bash
   # Copy gambar cover ke folder
   cp /path/to/image.webp src/content/posts/nama-post-dengan-folder/cover.webp
   ```

4. Edit `index.md` dengan VS Code

**Struktur folder:**
```
src/content/posts/nama-post-dengan-folder/
├── index.md           # Konten utama
├── cover.webp         # Gambar cover
├── screenshot1.png    # Gambar tambahan
└── diagram.svg        # Gambar lainnya
```

---

## 📄 Struktur Front-matter

Front-matter adalah metadata di awal setiap file markdown. Wajib ada!

### Template Dasar

```markdown
---
title: "Judul Post Anda"
published: 2025-10-27
description: "Deskripsi singkat 1-2 kalimat tentang post ini"
image: "./cover.webp"
tags: ["Keamanan Siber", "Tutorial", "SQL Injection"]
category: "Keamanan Siber"
draft: false
lang: "id"
---
```

### Penjelasan Field

| Field | Wajib? | Deskripsi | Contoh |
|-------|--------|-----------|--------|
| `title` | ✅ Ya | Judul artikel | `"Pengenalan SQL Injection untuk Pemula"` |
| `published` | ✅ Ya | Tanggal publish (YYYY-MM-DD) | `2025-10-27` |
| `description` | ✅ Ya | Deskripsi singkat untuk SEO | `"Pelajari dasar-dasar SQL Injection dan cara mencegahnya"` |
| `image` | ⚠️ Direkomendasikan | Path ke gambar cover | `"./cover.webp"` atau `""` |
| `tags` | ⚠️ Direkomendasikan | Array tag untuk kategorisasi | `["Tutorial", "Web Security"]` |
| `category` | ⚠️ Direkomendasikan | Kategori utama | `"Keamanan Siber"` |
| `draft` | ❌ Opsional | Status draft (default: false) | `false` atau `true` |
| `lang` | ❌ Opsional | Kode bahasa (default: id) | `"id"` atau `"en"` |

### Kategori yang Tersedia

- **Keamanan Siber** - Web security, network security, dll
- **Penetration Testing** - Tools dan teknik pentesting
- **Tutorial** - Step-by-step guides
- **CTF** - Capture The Flag writeups
- **Bug Bounty** - Tips dan trik bug hunting
- **Security Tools** - Review dan tutorial tools
- **Privacy** - Privasi dan anonymity

### Tags yang Umum Digunakan

```
Web Security, Network Security, Linux, Windows, Metasploit,
Burp Suite, Nmap, OWASP, SQL Injection, XSS, CSRF,
Ethical Hacking, Bug Bounty, CTF, Tutorial, Pemula
```

---

## 🎨 Fitur Markdown yang Tersedia

Blog NgetehNology menggunakan **Firefly theme** dengan banyak fitur Markdown extended.

### 1. Basic Markdown

```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
~~Strikethrough~~

- Bullet list
- Item 2

1. Numbered list
2. Item 2

[Link text](https://example.com)
![Image alt](./image.webp)
```

---

### 2. Code Blocks dengan Syntax Highlighting

#### Basic Code Block

````markdown
```python
def hello():
    print("Hello World")
```
````

#### Code Block dengan Fitur Lengkap

````markdown
```python title="exploit.py" showLineNumbers {5,8-10} ins={3} del={12}
# Baris 1
# Baris 2
# Baris 3 - marked as inserted
# Baris 4
# Baris 5 - highlighted
# Baris 6-7
# Baris 8
# Baris 9
# Baris 10 - highlighted
code here...
# Baris 11
# Baris 12 - marked as deleted
```
````

**Fitur yang tersedia:**

| Fitur | Sintaks | Kegunaan |
|-------|---------|----------|
| **Filename** | `title="filename.py"` | Menampilkan nama file di atas code block |
| **Line Numbers** | `showLineNumbers` | Menampilkan nomor baris |
| **Highlight Lines** | `{1,4,7-8}` | Highlight baris tertentu |
| **Insert Marker** | `ins={3-4}` | Tandai baris sebagai "ditambahkan" (hijau) |
| **Delete Marker** | `del={2}` | Tandai baris sebagai "dihapus" (merah) |
| **Collapse** | `collapse={1-5}` | Lipat/collapse baris tertentu |
| **Word Wrap** | `wrap` | Enable word wrap |

**Contoh Lengkap:**

````markdown
```bash title="scan.sh" showLineNumbers {3-5} ins={3}
#!/bin/bash
# Network scanner
nmap -sV 192.168.1.0/24
echo "Scan complete"
```
````

---

### 3. Admonitions (Kotak Peringatan)

Admonitions adalah kotak khusus untuk catatan, tips, atau peringatan.

#### Tipe Admonitions

**Note (Catatan)**
```markdown
:::note
Ini adalah catatan penting untuk pembaca.
:::
```

**Tip (Tips)**
```markdown
:::tip
Tips berguna untuk meningkatkan keamanan.
:::
```

**Important (Penting)**
```markdown
:::important
Informasi yang sangat krusial!
:::
```

**Warning (Peringatan)**
```markdown
:::warning
Hati-hati dengan risiko ini!
:::
```

**Caution (Awas)**
```markdown
:::caution
Jangan lakukan ini tanpa izin!
:::
```

#### Admonition dengan Custom Title

```markdown
:::note[Perhatian Khusus]
Anda dapat memberikan judul custom pada admonition.
:::

:::warning[Legal Notice]
Hanya gunakan teknik ini untuk **ethical hacking** dengan izin tertulis!
:::
```

#### Contoh Praktis

```markdown
:::important[Ethical Hacking Notice]
Tutorial ini hanya untuk tujuan edukasi. Selalu:
- Dapatkan izin tertulis sebelum melakukan penetration testing
- Gunakan hanya di environment yang Anda miliki
- Patuhi hukum yang berlaku di negara Anda
:::

:::tip[Pro Tips]
Gunakan virtual machine untuk berlatih:
1. Install VirtualBox atau VMware
2. Download vulnerable VM seperti DVWA atau Metasploitable
3. Practice di environment yang aman
:::
```

---

### 4. GitHub Repository Cards

Tampilkan kartu GitHub repository yang menarik.

```markdown
::github{repo="username/repository-name"}
```

**Contoh:**
```markdown
::github{repo="sqlmapproject/sqlmap"}
::github{repo="OWASP/wstg"}
```

Ini akan menampilkan kartu dengan info repo (stars, description, dll).

---

### 5. Spoiler Text

Sembunyikan text yang bisa dibuka dengan klik.

```markdown
Konten :spoiler[disembunyikan **haha**]!
```

Berguna untuk:
- Flag CTF
- Answer dari challenge
- Informasi sensitif yang perlu di-blur

**Contoh:**
```markdown
Flag untuk challenge ini adalah: :spoiler[FLAG{s3cr3t_k3y_123}]

Password default adalah: :spoiler[admin:admin]
```

---

### 6. Images

#### Gambar dari Folder Post

```markdown
![SQL Injection Diagram](./sqli-diagram.webp)
```

#### Gambar dari URL

```markdown
![Metasploit Logo](https://example.com/metasploit-logo.png "Metasploit Framework")
```

#### Gambar dengan Caption

```markdown
![Burp Suite Interface](./burp-suite.webp)
*Screenshot Burp Suite menunjukkan HTTP request*
```

---

### 7. Tables

```markdown
| Vulnerability | Risk Level | CVSS Score |
|---------------|------------|------------|
| SQL Injection | Critical   | 9.8        |
| XSS           | High       | 7.5        |
| CSRF          | Medium     | 6.1        |
```

---

### 8. Blockquotes

```markdown
> "The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room with armed guards."
> — Gene Spafford
```

---

## 🎯 Template Artikel Lengkap

Berikut template lengkap untuk artikel keamanan siber:

```markdown
---
title: "Pengenalan SQL Injection untuk Pemula"
published: 2025-10-27
description: "Pelajari dasar-dasar SQL Injection, bagaimana cara kerjanya, dan cara mencegahnya dengan contoh praktis."
image: "./cover.webp"
tags: ["Web Security", "SQL Injection", "OWASP", "Tutorial", "Pemula"]
category: "Keamanan Siber"
draft: false
lang: "id"
---

## Pendahuluan

SQL Injection adalah salah satu vulnerability paling umum dan berbahaya di aplikasi web. Dalam tutorial ini, kita akan belajar:

- Apa itu SQL Injection
- Bagaimana cara kerjanya
- Contoh serangan (dalam lab environment)
- Cara mencegahnya

:::important[Ethical Hacking Notice]
Tutorial ini hanya untuk tujuan edukasi. Selalu dapatkan izin tertulis sebelum melakukan testing pada sistem apapun.
:::

## Apa itu SQL Injection?

SQL Injection adalah teknik serangan dimana attacker memasukkan kode SQL berbahaya ke dalam input field untuk memanipulasi database.

### Bagaimana Cara Kerjanya?

Bayangkan ada form login dengan code seperti ini:

```php title="vulnerable-login.php" showLineNumbers {3}
<?php
$username = $_POST['username'];
$password = $_POST['password'];
$query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
$result = mysqli_query($conn, $query);
?>
```

:::warning[Kode Vulnerable]
Code di atas **sangat berbahaya** karena tidak melakukan sanitasi input!
:::

Attacker bisa memasukkan:
```
Username: admin' OR '1'='1
Password: anything
```

Query yang dihasilkan:
```sql
SELECT * FROM users WHERE username='admin' OR '1'='1' AND password='anything'
```

Karena `'1'='1'` selalu bernilai TRUE, query akan mengembalikan semua user!

## Contoh Praktis (Lab Environment)

:::tip[Safe Practice Environment]
Gunakan aplikasi vulnerable untuk belajar:
- **DVWA** (Damn Vulnerable Web Application)
- **bWAPP**
- **WebGoat**

::github{repo="digininja/DVWA"}
:::

### Step 1: Setup Lab

```bash title="setup-dvwa.sh" showLineNumbers
# Install DVWA dengan Docker
git clone https://github.com/digininja/DVWA.git
cd DVWA
docker-compose up -d
```

### Step 2: Eksploitasi (Educational Purpose)

```python title="exploit.py" showLineNumbers {8-10}
import requests

url = "http://localhost/login.php"

# Payload SQL Injection
payload = {
    'username': "admin' OR '1'='1",
    'password': "anything",
    'submit': 'Login'
}

response = requests.post(url, data=payload)
print(response.text)
```

:::caution
Jangan gunakan script ini pada website yang bukan milik Anda!
:::

## Cara Mencegah SQL Injection

### 1. Gunakan Prepared Statements

```php title="secure-login.php" showLineNumbers ins={3-4}
<?php
$stmt = $conn->prepare("SELECT * FROM users WHERE username=? AND password=?");
$stmt->bind_param("ss", $username, $password);
$stmt->execute();
$result = $stmt->get_result();
?>
```

### 2. Input Validation

```php title="input-validation.php"
<?php
// Validasi input
$username = filter_var($_POST['username'], FILTER_SANITIZE_STRING);
$password = filter_var($_POST['password'], FILTER_SANITIZE_STRING);
?>
```

### 3. Principle of Least Privilege

Database user hanya diberi permission minimal:

```sql
-- Jangan gunakan root!
CREATE USER 'webapp'@'localhost' IDENTIFIED BY 'strong_password';
GRANT SELECT ON database.users TO 'webapp'@'localhost';
```

## Best Practices

| Praktik | Deskripsi |
|---------|-----------|
| ✅ Prepared Statements | Gunakan parameterized queries |
| ✅ Input Validation | Validasi semua input dari user |
| ✅ Least Privilege | Batasi permission database user |
| ✅ Error Handling | Jangan tampilkan error detail ke user |
| ✅ WAF | Gunakan Web Application Firewall |

## Kesimpulan

SQL Injection masih menjadi ancaman serius di 2025. Sebagai developer dan security researcher, kita harus:

1. **Memahami** cara kerja vulnerability ini
2. **Menggunakan** coding practice yang aman
3. **Testing** aplikasi secara rutin
4. **Update** framework dan library

:::tip[Next Steps]
Pelajari juga:
- **XSS (Cross-Site Scripting)**
- **CSRF (Cross-Site Request Forgery)**
- **OWASP Top 10**
:::

## Referensi

- [OWASP SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [PortSwigger SQL Injection Labs](https://portswigger.net/web-security/sql-injection)

::github{repo="sqlmapproject/sqlmap"}

---

**Tags**: #WebSecurity #SQLInjection #OWASP #Tutorial #EthicalHacking

📝 Ditulis dengan ☕ di NgetehNology
```

---

## 👀 Preview Lokal

### Jalankan Dev Server

```bash
cd /Users/980078/Documents/pribadi/Projek\ Pribadi/Kumpulan\ Dashboard/BlogAstroPribadi
pnpm dev
```

### Akses Blog

Buka browser: `http://localhost:4321`

### Live Reload

Setiap kali Anda save file `.md`, browser akan auto-refresh!

### Check Post Baru

1. Lihat di homepage: `http://localhost:4321`
2. Akses langsung: `http://localhost:4321/posts/nama-post-anda`

---

## 🚀 Publish ke Netlify

### Workflow Git

#### 1. Check Status

```bash
git status
```

#### 2. Add Files

```bash
# Add post baru
git add src/content/posts/nama-post-baru/

# Atau add semua changes
git add .
```

#### 3. Commit

```bash
git commit -m "Add new post: Pengenalan SQL Injection untuk Pemula"
```

**Format commit message:**
- `Add new post: [Judul]` - Post baru
- `Update post: [Judul]` - Edit post existing
- `Fix typo in: [Judul]` - Perbaikan typo
- `Add cover image for: [Judul]` - Tambah gambar

#### 4. Push ke GitHub

```bash
git push origin master
```

#### 5. Auto Deploy

Netlify akan **otomatis** detect push dan:
1. Build site dengan `pnpm run build`
2. Deploy ke production
3. Selesai dalam 2-5 menit

### Check Deployment

1. Buka: https://app.netlify.com
2. Login dengan akun Anda
3. Pilih site: **blog-ngetehnology**
4. Lihat status deployment

Atau langsung check live site:
**https://blog-ngetehnology.netlify.app**

---

## 💡 Tips & Best Practices

### Writing Tips

1. **Judul yang Menarik**
   - ✅ "Pengenalan SQL Injection untuk Pemula: Panduan Lengkap 2025"
   - ❌ "SQL Injection"

2. **Gunakan Admonitions**
   - Selalu tambahkan warning untuk ethical hacking
   - Gunakan tip boxes untuk pro tips
   - Important untuk hal krusial

3. **Code Examples**
   - Selalu beri `title` pada code block
   - Gunakan syntax highlighting yang tepat
   - Highlight baris penting dengan `{}`

4. **Images**
   - Gunakan format `.webp` untuk ukuran kecil
   - Compress images sebelum upload
   - Beri alt text yang deskriptif

5. **SEO Friendly**
   - Description 1-2 kalimat yang menarik
   - Tags yang relevan (3-7 tags)
   - Title < 60 karakter

### Content Guidelines

#### Bahasa Indonesia
- Gunakan bahasa yang mudah dipahami pemula
- Hindari jargon tanpa penjelasan
- Tone friendly seperti "ngobrol sambil ngeteh"

#### Ethical Hacking
Selalu ingatkan:
```markdown
:::important[Ethical Hacking Notice]
Tutorial ini hanya untuk tujuan edukasi. Selalu:
- Dapatkan izin tertulis sebelum testing
- Gunakan hanya di environment sendiri
- Patuhi hukum yang berlaku
:::
```

#### Struktur Artikel
1. **Pendahuluan** - Apa yang akan dipelajari
2. **Teori** - Penjelasan konsep
3. **Praktik** - Contoh hands-on
4. **Prevention** - Cara mencegah
5. **Kesimpulan** - Summary dan next steps
6. **Referensi** - Sumber belajar

### Topik yang Cocok

- ✅ Keamanan Siber (Web, Network, Mobile)
- ✅ Penetration Testing Tools
- ✅ Ethical Hacking Tutorials
- ✅ Bug Bounty Tips
- ✅ CTF Writeups
- ✅ Security Tools Reviews
- ✅ OWASP Vulnerabilities
- ✅ Secure Coding Practices
- ✅ Privacy & Anonymity

### File Organization

```
src/content/posts/
├── pengenalan-sql-injection/
│   ├── index.md           # Konten artikel
│   ├── cover.webp         # Cover image (16:9 ratio)
│   ├── screenshot1.png    # Screenshot
│   └── diagram.svg        # Diagram
├── tutorial-metasploit/
│   ├── index.md
│   └── cover.webp
└── owasp-top-10/
    ├── index.md
    └── cover.webp
```

### Image Guidelines

**Cover Image:**
- Aspect ratio: 16:9
- Format: `.webp` (lebih kecil dari .jpg/.png)
- Size: < 500KB
- Resolution: 1200x675px (recommended)

**Screenshots:**
- Format: `.webp` atau `.png`
- Crop hanya bagian penting
- Compress dengan tools online

**Compress Tools:**
- [Squoosh](https://squoosh.app/)
- [TinyPNG](https://tinypng.com/)
- [ImageOptim](https://imageoptim.com/)

---

## 🆘 Troubleshooting

### Dev Server Tidak Jalan

```bash
# Clean cache dan rebuild
rm -rf .astro dist node_modules/.vite
pnpm dev
```

### Post Tidak Muncul

**Check:**
1. Front-matter valid?
2. `draft: false`?
3. File di folder `src/content/posts/`?
4. Restart dev server?

### Error saat Build

```bash
# Check syntax error
pnpm run check

# Rebuild
pnpm run build
```

### Git Push Gagal

```bash
# Pull dulu
git pull origin master

# Resolve conflict jika ada
# Lalu push lagi
git push origin master
```

---

## 🎓 Resources

### Belajar Markdown
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Flavored Markdown](https://github.github.com/gfm/)

### Belajar Keamanan Siber
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [PortSwigger Web Security Academy](https://portswigger.net/web-security)
- [HackTheBox](https://www.hackthebox.com/)
- [TryHackMe](https://tryhackme.com/)

### Practice Labs
- [DVWA](http://www.dvwa.co.uk/)
- [bWAPP](http://www.itsecgames.com/)
- [WebGoat](https://owasp.org/www-project-webgoat/)
- [Metasploitable](https://github.com/rapid7/metasploitable3)

---

## 📞 Support

Jika ada pertanyaan atau issue:

1. **Check dokumentasi ini** terlebih dahulu
2. **Tanya AI Agent** dengan `/create-blog-post`
3. **Review tutorial posts** di blog
4. **Check git history** untuk lihat contoh commit

---

## 🎉 Quick Start Checklist

Checklist untuk membuat post pertama Anda:

- [ ] Install dependencies (`pnpm install`)
- [ ] Jalankan dev server (`pnpm dev`)
- [ ] Gunakan AI agent (`/create-blog-post`) atau script (`pnpm run new-post`)
- [ ] Tulis konten dengan fitur Markdown
- [ ] Tambahkan front-matter yang lengkap
- [ ] Preview di browser (`http://localhost:4321`)
- [ ] Commit changes (`git add . && git commit -m "..."`)
- [ ] Push ke GitHub (`git push origin master`)
- [ ] Check deployment di Netlify
- [ ] Visit live site (https://blog-ngetehnology.netlify.app)

---

**Happy Writing! 📝☕**

Selamat nge-blog tentang keamanan siber di NgetehNology!

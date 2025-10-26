// File data konfigurasi linimasa
// Digunakan untuk mengelola data pada halaman linimasa

export interface TimelineItem {
  id: string;
  title: string;
  description: string;
  type: "education" | "work" | "project" | "achievement";
  startDate: string;
  endDate?: string; // Jika kosong, berarti saat ini
  location?: string;
  organization?: string;
  position?: string;
  skills?: string[];
  achievements?: string[];
  links?: {
    name: string;
    url: string;
    type: "website" | "certificate" | "project" | "other";
  }[];
  icon?: string; // Nama ikon Iconify
  color?: string;
  featured?: boolean;
}

export const timelineData: TimelineItem[] = [
  {
    id: "current-study",
    title: "Mahasiswa Jurusan Komputer di Universitas Ternama",
    description:
      "[Data Demo] Saat ini sedang menempuh pendidikan di jurusan Ilmu Komputer, dengan fokus pada pengembangan full-stack dan kecerdasan buatan.",
    type: "education",
    startDate: "2022-09-01",
    location: "Sebuah Kota Besar",
    organization: "Universitas Teknologi Ternama",
    skills: ["Java", "Python", "JavaScript", "HTML/CSS", "MySQL"],
    achievements: [
      "IPK saat ini: 3.8/4.0 (data virtual)",
      "Menyelesaikan beberapa proyek algoritma dan struktur data",
      "Berpartisipasi dalam proyek inovasi dan kewirausahaan kampus",
    ],
    icon: "material-symbols:school",
    color: "#059669",
    featured: true,
  },
  {
    id: "firefly-blog-project",
    title: "Proyek Tema Blog Open Source",
    description:
      "[Proyek Demo] Mengembangkan tema blog berdasarkan kerangka kerja frontend modern, mendukung berbagai fitur dan opsi kustomisasi.",
    type: "project",
    startDate: "2024-06-01",
    endDate: "2024-08-01",
    skills: ["Astro", "TypeScript", "Tailwind CSS", "Git"],
    achievements: [
      "Mendapatkan 500+ bintang di GitHub (data virtual)",
      "Mengimplementasikan desain responsif penuh",
      "Mendukung multi-bahasa dan pergantian tema",
    ],
    links: [
      {
        name: "Repositori GitHub",
        url: "https://github.com/example/demo-blog",
        type: "project",
      },
      {
        name: "Demo Online",
        url: "https://demo-blog.example.com",
        type: "website",
      },
    ],
    icon: "material-symbols:code",
    color: "#7C3AED",
    featured: true,
  },
  {
    id: "summer-internship-2024",
    title: "Magang di Perusahaan Internet Ternama",
    description:
      "[Pengalaman Demo] Bekerja sebagai intern pengembang frontend di sebuah perusahaan internet ternama, berpartisipasi dalam pengembangan produk inti.",
    type: "work",
    startDate: "2024-07-01",
    endDate: "2024-08-31",
    location: "Sebuah Kota Besar",
    organization: "Perusahaan Internet Ternama",
    position: "Intern Pengembang Frontend",
    skills: ["React", "JavaScript", "CSS3", "Git", "Figma"],
    achievements: [
      "Bertanggung jawab atas pengembangan komponen UI untuk produk dengan 100.000+ pengguna (data virtual)",
      "Berpartisipasi dalam tinjauan kode dan berbagi pengetahuan teknis",
      "Menerima penghargaan intern terbaik departemen",
    ],
    icon: "material-symbols:work",
    color: "#DC2626",
    featured: true,
  },
  {
    id: "web-development-course",
    title: "Kursus Sertifikasi Pengembangan Full-Stack",
    description:
      "[Pencapaian Demo] Menyelesaikan kursus sertifikasi pengembangan full-stack dari platform pendidikan online ternama dan memperoleh sertifikasi profesional.",
    type: "achievement",
    startDate: "2024-01-15",
    endDate: "2024-05-30",
    organization: "Platform Pendidikan Online Ternama",
    skills: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    achievements: [
      "Menerima sertifikat profesional (skor 98/100)",
      "Menyelesaikan 8 proyek praktis komprehensif",
      "Menguasai tumpukan teknologi pengembangan full-stack modern",
    ],
    links: [
      {
        name: "Sertifikat",
        url: "https://demo-certificates.example.com/fullstack",
        type: "certificate",
      },
    ],
    icon: "material-symbols:verified",
    color: "#059669",
  },
  {
    id: "student-management-system",
    title: "Proyek Sistem Manajemen Perusahaan",
    description:
      "[Proyek Demo] Mengembangkan sistem manajemen perusahaan lengkap, termasuk manajemen pengguna, kontrol akses, dan fitur lainnya.",
    type: "project",
    startDate: "2023-11-01",
    endDate: "2023-12-15",
    skills: ["Java", "MySQL", "Spring Boot", "Vue.js"],
    achievements: [
      "Memenangkan penghargaan pertama proyek kursus (penghargaan virtual)",
      "Mendukung 1000+ akses pengguna bersamaan",
      "Mengimplementasikan sistem manajemen izin lengkap",
    ],
    icon: "material-symbols:database",
    color: "#EA580C",
  },
  {
    id: "programming-contest",
    title: "Kompetisi Pemrograman ACM",
    description:
      "[Pencapaian Demo] Berpartisipasi dalam Kompetisi Pemrograman Perguruan Tinggi Internasional (ICPC), mencapai hasil luar biasa dalam algoritma dan pemrograman.",
    type: "achievement",
    startDate: "2023-10-20",
    location: "Universitas Ternama",
    organization: "Panitia Kompetisi ACM",
    skills: ["C++", "Desain Algoritma", "Struktur Data", "Pemodelan Matematika"],
    achievements: [
      "Memenangkan medali perak di kompetisi regional (penghargaan virtual)",
      "Menyelesaikan 15 masalah algoritma kompleks",
      "Peningkatan signifikan dalam kemampuan kerja tim",
    ],
    icon: "material-symbols:emoji-events",
    color: "#7C3AED",
  },
  {
    id: "part-time-tutor",
    title: "Pengajar Pemrograman Online",
    description:
      "[Pengalaman Demo] Bekerja sebagai pengajar pemrograman di platform pendidikan online ternama, memberikan pengajaran pemrograman berkualitas tinggi kepada siswa.",
    type: "work",
    startDate: "2023-09-01",
    endDate: "2024-01-31",
    position: "Pengajar Pemrograman Senior",
    skills: ["Python", "Java", "Desain Instruksional", "Pengembangan Kurikulum"],
    achievements: [
      "Mengajar lebih dari 500 siswa (data virtual)",
      "Tingkat kepuasan kursus mencapai 98%",
      "Mengembangkan 3 kursus pengajaran orisinal",
    ],
    icon: "material-symbols:school",
    color: "#059669",
  },
  {
    id: "high-school-graduation",
    title: "Lulus dari SMA Unggulan",
    description:
      "[Pendidikan Demo] Lulus dengan predikat istimewa dari SMA unggulan provinsi, berhasil diterima di jurusan Ilmu Komputer di universitas teknologi ternama.",
    type: "education",
    startDate: "2019-09-01",
    endDate: "2022-06-30",
    location: "Sebuah Ibu Kota Provinsi",
    organization: "SMA Unggulan Provinsi",
    achievements: [
      "Skor ujian masuk perguruan tinggi: 1% teratas di provinsi (data virtual)",
      "Menerima gelar siswa berprestasi tingkat provinsi",
      "Juara pertama kompetisi matematika nasional",
    ],
    icon: "material-symbols:school",
    color: "#2563EB",
  },
  {
    id: "first-programming-experience",
    title: "Pengalaman Pemrograman Pertama",
    description: "Pertama kali mengenal pemrograman di kelas teknologi informasi SMA, mulai belajar sintaks dasar Python.",
    type: "education",
    startDate: "2021-03-01",
    skills: ["Python", "Konsep Dasar Pemrograman"],
    achievements: [
      'Menyelesaikan program "Hello World" pertama',
      "Mempelajari perulangan dasar dan pernyataan kondisional",
      "Mengembangkan minat dalam pemrograman",
    ],
    icon: "material-symbols:code",
    color: "#7C3AED",
  },
];

// Mendapatkan statistik linimasa
export const getTimelineStats = () => {
  const total = timelineData.length;
  const byType = {
    education: timelineData.filter((item) => item.type === "education").length,
    work: timelineData.filter((item) => item.type === "work").length,
    project: timelineData.filter((item) => item.type === "project").length,
    achievement: timelineData.filter((item) => item.type === "achievement")
      .length,
  };

  return { total, byType };
};

// Mendapatkan item linimasa berdasarkan jenis
export const getTimelineByType = (type?: string) => {
  if (!type || type === "all") {
    return timelineData.sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
  }
  return timelineData
    .filter((item) => item.type === type)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
};

// Mendapatkan item linimasa unggulan
export const getFeaturedTimeline = () => {
  return timelineData
    .filter((item) => item.featured)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    );
};

// Mendapatkan item yang sedang berlangsung
export const getCurrentItems = () => {
  return timelineData.filter((item) => !item.endDate);
};

// Menghitung total pengalaman kerja
export const getTotalWorkExperience = () => {
  const workItems = timelineData.filter((item) => item.type === "work");
  let totalMonths = 0;

  workItems.forEach((item) => {
    const startDate = new Date(item.startDate);
    const endDate = item.endDate ? new Date(item.endDate) : new Date();
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    totalMonths += diffMonths;
  });

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12,
  };
};
// File data konfigurasi proyek
// Digunakan untuk mengelola data pada halaman pameran proyek

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: "web" | "mobile" | "desktop" | "other";
  techStack: string[];
  status: "completed" | "in-progress" | "planned";
  liveDemo?: string;
  sourceCode?: string;
  startDate: string;
  endDate?: string;
  featured?: boolean;
  tags?: string[];
}

export const projectsData: Project[] = [
  {
    id: "firefly-blog",
    title: "Tema Blog Firefly",
    description:
      "Tema blog modern yang dikembangkan berdasarkan kerangka Astro, mendukung multi-bahasa, mode gelap, dan desain responsif.",
    image: "",
    category: "web",
    techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
    status: "completed",
    liveDemo: "https://blog.example.com",
    sourceCode: "https://github.com/Cuteleaf/Firefly",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    featured: true,
    tags: ["Blog", "Tema", "Open Source"],
  },
  {
    id: "portfolio-website",
    title: "Situs Web Portofolio Pribadi",
    description: "Situs web portofolio pribadi untuk memamerkan pengalaman proyek dan keterampilan teknis.",
    image: "",
    category: "web",
    techStack: ["React", "Next.js", "TypeScript", "Framer Motion"],
    status: "completed",
    liveDemo: "https://portfolio.example.com",
    sourceCode: "https://github.com/example/portfolio",
    startDate: "2023-09-01",
    endDate: "2023-12-01",
    featured: true,
    tags: ["Portofolio", "React", "Animasi"],
  },
  {
    id: "task-manager-app",
    title: "Aplikasi Manajemen Tugas",
    description: "Aplikasi manajemen tugas lintas platform yang mendukung kolaborasi tim dan manajemen proyek.",
    image: "",
    category: "mobile",
    techStack: ["React Native", "TypeScript", "Redux", "Firebase"],
    status: "in-progress",
    startDate: "2024-03-01",
    tags: ["Aplikasi Seluler", "Alat Produktivitas", "Kolaborasi Tim"],
  },
  {
    id: "data-visualization-tool",
    title: "Alat Visualisasi Data",
    description: "Alat visualisasi data yang mendukung berbagai jenis grafik dan analisis interaktif.",
    image: "",
    category: "web",
    techStack: ["Vue.js", "D3.js", "TypeScript", "Node.js"],
    status: "planned",
    liveDemo: "https://dataviz.example.com",
    startDate: "2023-06-01",
    endDate: "2023-11-01",
    tags: ["Visualisasi Data", "Alat Analisis", "Grafik"],
  },
];

// Mendapatkan statistik proyek
export const getProjectStats = () => {
  const total = projectsData.length;
  const completed = projectsData.filter((p) => p.status === "completed").length;
  const inProgress = projectsData.filter(
    (p) => p.status === "in-progress"
  ).length;
  const planned = projectsData.filter((p) => p.status === "planned").length;

  return {
    total,
    byStatus: {
      completed,
      inProgress,
      planned,
    },
  };
};

// Mendapatkan proyek berdasarkan kategori
export const getProjectsByCategory = (category?: string) => {
  if (!category || category === "all") {
    return projectsData;
  }
  return projectsData.filter((p) => p.category === category);
};

// Mendapatkan proyek unggulan
export const getFeaturedProjects = () => {
  return projectsData.filter((p) => p.featured);
};

// Mendapatkan semua tumpukan teknologi
export const getAllTechStack = () => {
  const techSet = new Set<string>();
  projectsData.forEach((project) => {
    project.techStack.forEach((tech) => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};
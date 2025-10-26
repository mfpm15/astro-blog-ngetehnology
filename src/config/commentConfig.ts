import type { CommentConfig } from "../types/config";

export const commentConfig: CommentConfig = {
  enable: false, // Aktifkan fitur komentar. Jika false, komponen komentar tidak akan ditampilkan.
  enableVisitorCount: true, // Aktifkan penghitung pengunjung. Memerlukan `enable` dan `enableVisitorCount` keduanya true.
  twikoo: {
    envId: "https://twikoo.vercel.app",
    lang: "id", // Atur bahasa sistem komentar Twikoo
  },
};
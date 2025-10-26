import type { FriendLink } from "../types/config";

// Anda dapat menulis konten kustom di bawah halaman tautan teman di src/content/spec/friends.md

// Konfigurasi Tautan Teman
export const friendsConfig: FriendLink[] = [
  {
    title: "NgetehNology",
    imgurl:
      "https://avatars.githubusercontent.com/u/108973439?v=4", // Ganti dengan URL avatar Anda
    desc: "Blog tentang Keamanan Siber dan Teknologi.",
    siteurl: "https://github.com/mfpm15/astro-blog-ngetehnology", // Ganti dengan URL situs Anda
    tags: ["Blog", "Teknologi"],
    weight: 10, // Bobot, angka yang lebih tinggi akan diurutkan lebih dulu
    enabled: true, // Apakah akan diaktifkan
  },
];

// Dapatkan tautan teman yang diaktifkan dan urutkan berdasarkan bobot
export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight); // Urutkan berdasarkan bobot secara menurun
};
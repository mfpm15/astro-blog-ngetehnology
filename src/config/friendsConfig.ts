import type { FriendLink } from "../types/config";
import friendsData from "../data/friends.json";

// Anda dapat menulis konten kustom di bawah halaman tautan teman di src/content/spec/friends.md

// Konfigurasi Tautan Teman
export const friendsConfig: FriendLink[] = (friendsData.items ?? []) as FriendLink[];

// Dapatkan tautan teman yang diaktifkan dan urutkan berdasarkan bobot
export const getEnabledFriends = (): FriendLink[] => {
  return friendsConfig
    .filter((friend) => friend.enabled)
    .sort((a, b) => b.weight - a.weight); // Urutkan berdasarkan bobot secara menurun
};

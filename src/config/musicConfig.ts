import type { MusicPlayerConfig } from "../types/config";

// Konfigurasi Pemutar Musik
export const musicPlayerConfig: MusicPlayerConfig = {
  // Saklar fungsionalitas dasar
  enable: true, // Aktifkan fitur pemutar musik

  // Konfigurasi mode pemutar
  mode: "local", // Mode pemutar: "local" untuk musik lokal, "meting" untuk musik online

  // Konfigurasi API Meting
  meting: {
    // Alamat API Meting, default menggunakan layanan gratis yang disediakan oleh bilibili.uno
    // Anda juga dapat menggunakan layanan API Meting lain atau layanan yang di-host sendiri
    api: "https://www.bilibili.uno/api?server=:server&type=:type&id=:id&auth=:auth&r=:r",

    // Konfigurasi playlist
    playlist: {
      id: "8814137515", // ID Playlist
      server: "netease", // Platform musik: netease, tencent, kugou, xiami, baidu
      type: "playlist", // Jenis: playlist, album, song
    },

    // Konfigurasi API cadangan (digunakan saat API utama gagal)
    fallbackApis: [
      "https://api.injahow.cn/bete/?server=:server&type=:type&id=:id",
      "https://api.uomg.com/api/other/163music?format=json&id=:id",
    ],
  },

  // Konfigurasi musik lokal
  local: {
    // Playlist lokal
    // Path file musik lokal (relatif terhadap direktori public)
    playlist: [
      {
        id: 1,
        title: "Contoh Lagu",
        artist: "Artis Tidak Dikenal",
        cover: "/assets/music/cover/109951169585655912.jpg",
        url: "/assets/music/使一颗心免于哀伤-哼唱.wav", // Ganti dengan path lagu Anda
        duration: 240,
      },
    ],
  },

  // Konfigurasi perilaku pemutar
  behavior: {
    // Putar otomatis (catatan: browser modern biasanya memblokir putar otomatis)
    autoplay: false,

    // Volume default (0-1)
    defaultVolume: 0.7,

    // Mode pemutaran default
    defaultShuffle: false, // Putar acak
    defaultRepeat: 2, // Mode pengulangan: 0=tidak ada, 1=satu lagu, 2=playlist

    // Posisi pemutar
    position: {
      bottom: 16, // Jarak dari bawah (px)
      right: 16, // Jarak dari kanan (px)
      left: "auto", // Jarak dari kiri (px), atur ke "auto" untuk menggunakan posisi kanan
    },
  },

  // Konfigurasi antarmuka pengguna
  ui: {
    // Konfigurasi animasi
    animation: {
      // Animasi putar sampul
      coverRotation: {
        enable: true, // Aktifkan putaran sampul
        speed: 3, // Kecepatan putaran (detik/putaran)
        pauseOnHover: true, // Jeda saat mouse melayang
      },
    },

    // Konfigurasi tampilan
    display: {
      // Apakah akan menampilkan tombol playlist
      showPlaylistButton: true,

      // Apakah akan menampilkan kontrol volume
      showVolumeControl: true,

      // Apakah akan menampilkan tombol putar acak
      showShuffleButton: true,

      // Apakah akan menampilkan tombol pengulangan
      showRepeatButton: true,

      // Apakah akan menampilkan tombol lewati (sebelumnya/berikutnya)
      showSkipButtons: true,
    },

    // Konfigurasi playlist
    playlist: {
      // Tinggi maksimum panel playlist (px)
      maxHeight: 384,

      // Lebar panel playlist (px)
      width: 320,

      // Apakah akan menampilkan nomor trek lagu
      showTrackNumbers: true,

      // Apakah akan menampilkan durasi lagu
      showDuration: true,
    },
  },

  // Konfigurasi responsif
  responsive: {
    // Konfigurasi seluler
    mobile: {
      // Posisi pemutar di seluler
      position: {
        bottom: 8,
        right: 8,
        left: 8,
      },
    },

    // Konfigurasi layar kecil (≤480px)
    smallScreen: {},
  },

  // Konfigurasi penanganan kesalahan
  errorHandling: {
    // Apakah akan menampilkan pesan kesalahan
    showErrorMessages: true,

    // Durasi tampilan pesan kesalahan (ms)
    errorDisplayDuration: 3000,

    // Apakah akan otomatis melompat ke lagu berikutnya jika terjadi kesalahan pemutaran
    autoSkipOnError: true,
  },
};
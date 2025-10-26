<script lang="ts">
import { DARK_MODE, LIGHT_MODE, SYSTEM_MODE } from "@constants/constants.ts";
import Icon from "@iconify/svelte";
import {
	getStoredTheme,
	setTheme,
	resolveTheme,
	setupSystemThemeListener,
} from "@utils/setting-utils.ts";
import type { LIGHT_DARK_MODE } from "@/types/config.ts";

const seq: LIGHT_DARK_MODE[] = [LIGHT_MODE, DARK_MODE, SYSTEM_MODE];
let mode: LIGHT_DARK_MODE = $state(getStoredTheme());

function switchScheme(newMode: LIGHT_DARK_MODE) {
	mode = newMode;
	setTheme(newMode);
}

function toggleScheme() {
	let i = 0;
	for (; i < seq.length; i++) {
		if (seq[i] === mode) {
			break;
		}
	}
	switchScheme(seq[(i + 1) % seq.length]);
}

// Tambahkan listener hook Swup untuk menyinkronkan status tema setelah pergantian halaman
if (typeof window !== 'undefined') {
  // Dengarkan event penggantian konten Swup
  const handleContentReplace = () => {
    // Gunakan requestAnimationFrame untuk memastikan status diperbarui pada frame berikutnya, menghindari konflik render
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
    });
  };
  
  // Periksa apakah Swup sudah dimuat
  if ((window as any).swup && (window as any).swup.hooks) {
    (window as any).swup.hooks.on('content:replace', handleContentReplace);
  } else {
    document.addEventListener('swup:enable', () => {
      if ((window as any).swup && (window as any).swup.hooks) {
        (window as any).swup.hooks.on('content:replace', handleContentReplace);
      }
    });
  }
  
  // Sinkronkan status sekali setelah halaman dimuat dan atur listener sistem
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
      
      // Jika mode saat ini adalah sistem, atur listener tema sistem
      if (newMode === SYSTEM_MODE) {
        setupSystemThemeListener();
      }
    });
  });
}
</script>

<div class="relative z-50">
    <button aria-label="Mode Terang/Gelap/Sistem" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onclick={toggleScheme}>
        <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
            <Icon icon="material-symbols:wb-sunny-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
            <Icon icon="material-symbols:dark-mode-outline-rounded" class="text-[1.25rem]"></Icon>
        </div>
        <div class="absolute" class:opacity-0={mode !== SYSTEM_MODE}>
            <Icon icon="material-symbols:computer-outline" class="text-[1.25rem]"></Icon>
        </div>
    </button>
</div>

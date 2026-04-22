<script lang="ts">
import { DARK_MODE, LIGHT_MODE, SYSTEM_MODE } from "@constants/constants.ts";
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

if (typeof window !== 'undefined') {
  const handleContentReplace = () => {
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
    });
  };
  
  if ((window as any).swup && (window as any).swup.hooks) {
    (window as any).swup.hooks.on('content:replace', handleContentReplace);
  } else {
    document.addEventListener('swup:enable', () => {
      if ((window as any).swup && (window as any).swup.hooks) {
        (window as any).swup.hooks.on('content:replace', handleContentReplace);
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
      const newMode = getStoredTheme();
      if (mode !== newMode) {
        mode = newMode;
      }
      
      if (newMode === SYSTEM_MODE) {
        setupSystemThemeListener();
      }
    });
  });
}
</script>

<div class="relative z-50">
    <button aria-label="Light/Dark/System Mode" class="relative btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90" id="scheme-switch" onclick={toggleScheme}>
        <div class="absolute" class:opacity-0={mode !== LIGHT_MODE}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[1.25rem]">
              <path fill="currentColor" d="M11 3V2q0-.425.288-.712T12 1t.713.288T13 2v1q0 .425-.288.713T12 4t-.712-.288T11 3m0 19v-1q0-.425.288-.712T12 20t.713.288T13 21v1q0 .425-.288.713T12 23t-.712-.288T11 22m11-9h-1q-.425 0-.712-.288T20 12t.288-.712T21 11h1q.425 0 .713.288T23 12t-.288.713T22 13M3 13H2q-.425 0-.712-.288T1 12t.288-.712T2 11h1q.425 0 .713.288T4 12t-.288.713T3 13m16.75-7.325l-.35.35q-.275.275-.687.275T18 6q-.275-.275-.288-.687t.263-.713l.375-.375q.275-.3.7-.3t.725.3t.288.725t-.313.725M6.025 19.4l-.375.375q-.275.3-.7.3t-.725-.3t-.288-.725t.313-.725l.35-.35q.275-.275.688-.275T6 18q.275.275.288.688t-.263.712m12.3.35l-.35-.35q-.275-.275-.275-.687T18 18q.275-.275.688-.287t.712.262l.375.375q.3.275.3.7t-.3.725t-.725.288t-.725-.313M4.6 6.025l-.375-.375q-.3-.275-.3-.7t.3-.725t.725-.288t.725.313l.35.35q.275.275.275.688T6 6q-.275.275-.687.288T4.6 6.025M12 18q-2.5 0-4.25-1.75T6 12t1.75-4.25T12 6t4.25 1.75T18 12t-1.75 4.25T12 18m0-2q1.675 0 2.838-1.162T16 12t-1.162-2.838T12 8T9.162 9.163T8 12t1.163 2.838T12 16m0-4" />
            </svg>
        </div>
        <div class="absolute" class:opacity-0={mode !== DARK_MODE}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[1.25rem]">
              <path fill="currentColor" d="M12 21q-3.775 0-6.387-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.325-.05.575.088t.4.362t.163.525t-.188.575q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.275-.175.563-.162t.512.137q.25.125.388.375t.087.6q-.35 3.45-2.937 5.725T12 21m0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19m-.25-6.75" />
            </svg>
        </div>
        <div class="absolute" class:opacity-0={mode !== SYSTEM_MODE}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="text-[1.25rem]">
              <path fill="currentColor" d="M1 21v-2h22v2zm3-3q-.825 0-1.412-.587T2 16V5q0-.825.588-1.412T4 3h16q.825 0 1.413.588T22 5v11q0 .825-.587 1.413T20 18zm0-2h16V5H4zm0 0V5z" />
            </svg>
        </div>
    </button>
</div>

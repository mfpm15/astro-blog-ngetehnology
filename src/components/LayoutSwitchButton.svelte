<script lang="ts">
  import { onMount } from 'svelte';
  import { siteConfig } from '../config/siteConfig';
  
  export let currentLayout: 'list' | 'grid' = 'list';
  
  let mounted = false;
  let isSmallScreen = false;
  
  function checkScreenSize() {
    isSmallScreen = window.innerWidth < 1200;
    if (isSmallScreen) {
      currentLayout = 'list';
    }
  }

  onMount(() => {
    mounted = true;
    checkScreenSize();
    
    // Baca preferensi pengguna dari localStorage, jika tidak ada, gunakan nilai default yang dilewatkan
    const savedLayout = localStorage.getItem('postListLayout');
    if (savedLayout && (savedLayout === 'list' || savedLayout === 'grid')) {
      currentLayout = savedLayout;
    } else {
      // Jika tidak ada preferensi yang disimpan, gunakan tata letak default yang dilewatkan (dari props)
      // currentLayout sudah diatur dengan nilai default saat deklarasi
    }
    
    // Dengarkan perubahan ukuran jendela
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  });
  
  function switchLayout() {
    if (!mounted || isSmallScreen) return;
    
    currentLayout = currentLayout === 'list' ? 'grid' : 'list';
    localStorage.setItem('postListLayout', currentLayout);
    
    // Picu event kustom untuk memberi tahu komponen induk bahwa tata letak telah berubah
    const event = new CustomEvent('layoutChange', {
      detail: { layout: currentLayout }
    });
    window.dispatchEvent(event);
  }
  
  // Dengarkan event perubahan tata letak
  onMount(() => {
    const handleCustomEvent = (event: any) => {
      currentLayout = event.detail.layout;
    };

    window.addEventListener('layoutChange', handleCustomEvent);

    return () => {
      window.removeEventListener('layoutChange', handleCustomEvent);
    };
  });

  // Dengarkan event inisialisasi tata letak dari PostPage
  onMount(() => {
    const handleLayoutInit = () => {
      // Dapatkan status tata letak saat ini dari PostPage
      const postListContainer = document.getElementById('post-list-container');
      if (postListContainer) {
        const isGridMode = postListContainer.classList.contains('grid-mode');
        currentLayout = isGridMode ? 'grid' : 'list';
      }
    };

    // Jalankan dengan sedikit penundaan untuk memastikan PostPage telah diinisialisasi
    setTimeout(handleLayoutInit, 100);

    return () => {
      // Fungsi pembersihan
    };
  });
</script>

{#if mounted && siteConfig.postListLayout.allowSwitch && !isSmallScreen}
  <button 
    aria-label="Ubah Tata Letak Daftar Postingan" 
    class="btn-plain scale-animation rounded-lg h-11 w-11 active:scale-90 flex items-center justify-center" 
    on:click={switchLayout}
    title={currentLayout === 'list' ? 'Beralih ke mode petak' : 'Beralih ke mode daftar'}
  >
      {#if currentLayout === 'list'}
        <!-- Ikon Daftar -->
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
        </svg>
    {:else}
      <!-- Ikon Petak -->
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z"/>
      </svg>
    {/if}
  </button>
{/if}
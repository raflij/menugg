<script>
    import Icon from '@iconify/svelte';
    import { onMount } from 'svelte';
  
  let isSidebarOpen = false;
  
  // Close the sidebar when the user clicks outside of the sidebar and main screen
  const closeSidebar = (event) => {
    const isClickInsideSidebar = event.target.closest('.sidebar');
    if (!isClickInsideSidebar) {
      isSidebarOpen = false;
    }
  }

  onMount(() => {
    // Close the sidebar when the user clicks outside of the sidebar and main screen
    document.addEventListener('click', closeSidebar);
  });

  const toggleSidebar = (event) => {
    event.stopPropagation(); // Prevent event propagation
    isSidebarOpen = !isSidebarOpen;
  }
</script>

<div class='px-4 sm:py-6 py-4 border-b-[3px] border-gray-200/60'>
    <div class='flex items-center'>
        <div class='mr-4'>
            <button on:click={toggleSidebar} class='rounded-full p-2 flex justify-center items-center bg-orange-100/80'>
                    <Icon icon="bi:list" class="w-[18px] h-[18px] text-orange-500" />
            </button>
        </div>
        <div>
            <h1 class="text-lg font-semibold">The Cozy Corner Cafe (CCC)</h1>
        </div>
    </div>
</div>
<div class="overlay {isSidebarOpen ? 'visible' : ''}"></div>
<div class="sidebar {isSidebarOpen ? 'open' : ''}">
  <div class="relative overflow-hidden">
    <div class="absolute bg-black h-[55px] w-[140px] z-10 translate -top-[20px] -right-[40px] rotate-[43deg]"></div>
    <div class="absolute top-[6px] right-[6px] z-20">
      <Icon icon="uil:times" class="text-white w-[26px] h-[26px]" />
    </div>
    <div class="relative z-0">
      <img
          src="./assets/images/bg.jpg"
          class="w-[288px] opacity-90"
          alt="The Cozy Corner Cafe"
      />
    </div>

  </div>
  <div class="flex flex-col bg-gray-100">
      <div class="border-b border-gray-200 flex px-5 py-2 items-center justify-start bg-orange-600 relative">
        <div class="absolute left-0 h-[100%] w-[4px] bg-stone-950"></div>
        <div class="relative flex items-center justify-start">
          <span class="mr-4"><Icon icon="ion:home" class="text-white" /></span><span class="text-white">Home</span> 
        </div>
      </div>
      <div class="border-b border-t border-gray-200 flex px-5 py-2 items-center justify-start">
        <span class="mr-4"><Icon icon="material-symbols:history" class="text-gray-900 w-[18px] h-[18px]" /></span><span class="text-gray-900">Riwayat Pesanan</span> 
      </div>
  </div>
</div>
<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    background-color: #ffffff;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .sidebar.open {
    transform: translateX(0);
  }
  /* Additional style for the main page when sidebar is open */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 50;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }

  .overlay.visible {
    opacity: 1;
    pointer-events: auto;
  }
</style>
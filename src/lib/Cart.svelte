<script>
    import Icon from "@iconify/svelte";
    let showModal = false;
  
    function toggleModal() {
      showModal = !showModal;
      document.body.style.overflow = showModal ? "hidden" : "auto";
    }
</script>


{#if showModal}
  <div class="mx-auto max-w-[600px] z-[9999999] min-h-screen fixed top-0 bg-white">
    <div class="pt-6 pb-12">
        <div class="flex items-center px-3">
            <button on:click={toggleModal}>
                <Icon icon="icon-park-outline:left" class="w-[22px] h-[22px] fill-gray-900" />
            </button>
            <div class="text-center w-full">
                <h1 class="sm:text-lg text-md font-semibold">Bakmi Jowo Mbah Urip</h1>
            </div>
        </div>
        <div class="p-2 mt-4">
            <div>
                <h1 class="text-lg font-semibold text-gray-800">Pesanan Saya</h1>
            </div>
        </div>
    </div>
    <button on:click={toggleModal}>Close Modal</button>
    <div class="bg-cyan-400 w-[600px] h-[2px]"></div>
  </div>
{/if}
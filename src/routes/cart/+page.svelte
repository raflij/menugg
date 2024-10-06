<script>
    import Icon from "@iconify/svelte";
    import { onMount } from "svelte";
    import { cartItems } from "$lib/cart.js";
    import { goto } from "$app/navigation";
    import { derived } from "svelte/store";
    import { slide, scale } from "svelte/transition";
    import { formatHarga } from "$lib/menu.js";
    import Modal from "./NoteModal.svelte";

    let showModal = false;
    let noteValue = "";
    let modalType = "";

    const goBack = () => {
        goto("/"); // Redirect to the /cart page
    };

    let cart = [];

    cartItems.subscribe((items) => {
        cart = items.sort((a, b) => a.id.localeCompare(b.id));
    });
    onMount(() => {
    });

    const totalHarga = derived(cartItems, ($cartItems) => {
        return $cartItems.reduce(
            (total, item) =>
                total + parseInt(item.jumlah) * parseInt(item.menu.harga),
            0
        );
    });

    const duplicateCart = (id) => {
        let foundItem = null;
        cartItems.subscribe((items) => {
            foundItem = items.find((cartItem) => cartItem.id === id);
        });

        if (foundItem) {
            foundItem.jumlah += 1;
            cartItems.update((items) => [...items]);
        }
    };

    const deleteCartItem = (id) => {
        cartItems.update((items) => {
            const index = items.findIndex((item) => item.id === id);
            if (index !== -1) {
                if (items[index].jumlah > 1) {
                    items[index].jumlah -= 1;
                } else {
                    items.splice(index, 1);
                }
            }
            return items;
        });
    };

    let menuDetails = [];
    const modalNote = (menu) => {
        const item = {
            kategori: menu.kategori,
            id: menu.id,
            menu: {
                name: menu.menu.name,
                harga: menu.menu.harga,
                imgUrl: menu.menu.imgUrl,
            },
            note: menu.note,
        };
        menuDetails = item;
        noteValue = menuDetails.note;
        modalType = "note";
    };

    const saveNote = () => {
        const index = cart.findIndex((item) => item.id === menuDetails.id);
        if (index !== -1) {
            cart[index].note = noteValue;
        }
        showModal = false;
    };

    let namaPemesan = "";
    let nomorMeja = "";
    let catatan = "";
    let errorMessage = "";

    let messageWA = "";
    let hasNote = cart.some((item) => item.note !== "");
    const handleSubmit = () => {
        const user = {
            namaPemesan: namaPemesan,
            nomorMeja: nomorMeja,
            catatan: catatan,
        };
        const order = {
            user: user,
            order: cart,
        };
        if (!namaPemesan) {
            errorMessage = "Nama Pemesan harus diisi";
            const namaPemesanInput =
                document.getElementById("namaPemesanInput");
            namaPemesanInput.focus();
            return;
        }
        showModal = true;
        modalType = "order";
        messageWA = `Hallo kak,
Aku pesan lewat menu digital restaurant kakak nih,
Ini ada beberapa menu yang aku pesan ya kak

${cart.map((hasil, i) => {
    return `*${hasil.jumlah}x ${hasil.menu.name}* @ Rp ${formatHarga(hasil.menu.harga)}`;
}).join('\n')}

${hasNote === true ? `Oh ya kak, ini ada sedikit catatan untuk pesanannya
${cart.map((hasil, i) => {
    if (hasil.note !== "")
        return `- *${hasil.menu.name} (${hasil.kategori})* : ${hasil.note}`;
}).join('\n')}`: ""}

Atas nama ${namaPemesan} ya kak!

Terima kasih`;
    };

    const sendWA = () => {
        const phoneNumber = "+6281225335284";
        const encodedMessage = encodeURIComponent(messageWA);
        const link = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
        window.open(link);
    };
    function handleInput() {
        errorMessage = "";
    }
</script>

<svelte:head>
	<title>MenuGG - Pesanan Saya</title>
	<meta name="description" content="Menu digital untuk restaurant, cafe, rumah makan, warung, dll kekinian tanpa download aplikasi bisa dilihat di semua gadget" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, follow, nocache" />
    <meta name="googlebot" content="index, nofollow" />
    <meta property="og:title" content="MenuGG - Digital Menu Kekinian" />
    <meta property="og:description" content="Menu digital untuk restaurant, cafe, rumah makan, warung, dll kekinian tanpa download aplikasi bisa dilihat di semua gadget" />
    <meta property="og:url" content="https://menugg.vercel.app/" />
    <meta property="og:locale" content="id_ID" />
    <meta property="og:image" content="https://menugg.vercel.app/assets/images/bg.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="MenuGG - Digital Menu Kekinia" />
    <meta name="twitter:description" content="Menu digital untuk restaurant, cafe, rumah makan, warung, dll kekinian tanpa download aplikasi bisa dilihat di semua gadget" />
    <meta name="twitter:image" content="https://menugg.vercel.app/assets/images/bg.jpg" />
    <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Roboto+Slab:wght@100;300;500;600;800&display=swap"
        rel="stylesheet"
    />
</svelte:head>
<section>
<main class="max-w-[600px] mx-auto bg-white" in:slide={{ duration: 600 }}>
<div class="mx-auto max-w-[600px] bg-white w-full">
    <div class="sm:pt-6 pt-4 pb-12">
        <div class="flex items-center px-3">
            <button on:click={goBack}>
                <Icon icon="icon-park-outline:left" class="w-[22px] h-[22px] fill-gray-900" />
            </button>
            <div class="text-center w-full">
                <h1 class="sm:text-lg text-md font-semibold">The Cozy Corner Cafe (CCC)</h1>
            </div>
        </div>
        <div class="p-2 mt-4">
            <div>
                <h1 class="sm:text-md text-base font-semibold text-gray-800">Pesanan Saya</h1>
            </div>
            <div class="mt-4">
              <div 
              class={
              (cart.length > 3) 
              ? 'flex flex-col overflow-auto h-[368px] hide-scrollbar' : 'flex flex-col'}
            >
                    {#each cart as list (list.id)}
  <div class="rounded-xl border border-slate-50 p-4 shadow mb-4"
  out:slide={{ duration: 300 }}>
                        <div class="flex space-x-3 items-start">
                            <div class="sm:h-[88px] sm:w-[88px] h-[66px] w-[66px] rounded-xl bg-gray-200 flex-shrink-0">
                                {#if list.menu.imgUrl !== ""}
                                <img src={list.menu.imgUrl} alt="Cappucino" class="w-full h-full rounded-xl">
                                {/if}
                            </div> 
                            <div class="flex-grow">
                                <div>
                                    <h3 class="sm:text-lg text-sm font-semibold text-gray-600">{list.menu.name}</h3>
                                    <h3 class="text-xs sm:text-sm text-gray-400 capitalize">{list.kategori}. Keterangan Atau Deskripsi</h3>
                                    {#if list.note !== ''}
                                    <div class="flex items-center relative">
                                        <h3 class="absolute top-0 text-sm text-gray-600 font-bold">Catatan :</h3>
                                        <div class="whitespace-pre-line indent-16 text-gray-600 text-sm">{list.note}</div>
                                    </div>
                                    {/if}
                                </div> 
                                    <div class="flex justify-start items-center mt-3">
                                        <button on:click={() => deleteCartItem(list.id)} class="flex items-center justify-center sm:w-7 sm:h-7 h-5 w-5 border border-amber-500">
                                            <h2 class="font-medium sm:text-2xl text-lg text-amber-600">-</h2>
                                        </button>
                                        <div class="p-2 flex items-center justify-center sm:w-14 sm:h-7 w-8 h-5">
                                            {#key list.jumlah}
                                            <h2 class="text-amber-600 font-semibold sm:text-base text-sm" in:scale={{duration:100}}>{list.jumlah}</h2>
                                            {/key}
                                        </div>
                                        <button on:click={() => duplicateCart(list.id)} class="flex items-center justify-center sm:w-7 sm:h-7 h-5 w-5 border border-amber-500">
                                            <h2 class="font-medium sm:text-2xl text-lg text-amber-600">+</h2>
                                        </button>
                                    </div>
                            </div> 
                            <div class="flex-shrink-0">
                                <button on:click={() => {modalNote(list); showModal = true}} class="rounded-3xl border border-slate-300/60 sm:px-4 px-3 py-1 sm:py-2 flex items-center font-medium">
                                    <span class="mr-1"><Icon icon="wpf:note" class="h-[13px] w-[13px]" /></span>
                                    <span class="sm:text-sm text-xs font-bold">Catatan</span>
                                </button> 
                                <div class="mt-8 font-semibold text-amber-600 text-right sm:text-base text-sm">Rp {formatHarga(list.menu.harga)}</div>
                            </div>
                        </div>
                    </div>
                        {/each}
                </div>
            </div>
            <div class="mt-6 py-6 px-4 bg-gray-100">
                <div class="flex justify-between items-center">
                    <div>
                        <h2 class="sm:text-md text-base font-semibold text-gray-800">Total Harga</h2>
                    </div>
                    <div>
                        {#key formatHarga($totalHarga)}
                        <h2 class="font-semibold text-gray-600 sm:text-base text-sm" in:scale={{duration:200}}>Rp {formatHarga($totalHarga)}</h2>
                        {/key}
                    </div>
                </div>
            </div>
            <div class="my-6 px-4">
                <form on:submit|preventDefault={handleSubmit}>
                    <div class="grid grid-cols-1 gap-4">
                        <label class="block">
                          <span class="text-gray-600 font-semibold text-sm">Nama Pemesan</span>
                          <div class="relative mt-2">
                            <span class={`absolute inset-y-0 left-0 pl-0 flex items-center ${errorMessage ? 'text-red-600' : 'text-zinc-500'} `}>
                              <Icon icon="mdi:user" class="w-[18px] h-[18px]" />
                            </span>
                            <input
                              type="text"
                              placeholder="Nama anda"
                              bind:value={namaPemesan}
                              class={`mt-0 block w-full font-normal text-sm text-zinc-900 pl-6 pb-2 pr-1 px-1 
                              border-0 border-b-2 ${errorMessage ? 'border-red-600 focus:border-red-600' : 'border-gray-300 focus:border-amber-500'} focus:ring-0 `}
                              autoComplete="off"
                              id="namaPemesanInput"
                              class:error={errorMessage}
                              on:input={handleInput}
                            />
                          </div>
                          {#if errorMessage}
                            <p class="text-red-500 mt-1 text-sm">{errorMessage}</p>
                          {/if}
                        </label>
                        <label class="block">
                          <span class="text-gray-600 font-semibold text-sm">Nomor Meja</span>
                          <div class="relative mt-2">
                            <span class="absolute inset-y-0 left-0 pl-0 flex items-center text-zinc-500">
                                <Icon icon="icon-park-outline:round" class="w-[18px] h-[18px]" />
                            </span>
                            <input type="text" placeholder="Nomor Meja (Opsional)" bind:value={nomorMeja} class="mt-0 block w-full font-normal text-sm text-zinc-900 pl-6 pb-2 pr-1 px-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-amber-500" autoComplete="off" />
                          </div>
                        </label>
                        <label class="block">
                          <span class="text-gray-600 font-semibold text-sm">Catatan</span>
                          <div class="relative mt-2">
                            <span class="absolute inset-y-0 left-0 pl-0 flex items-center text-zinc-500">
                                <Icon icon="wpf:note" class="w-[16px] h-[16px]" />
                            </span>
                            <input type="text" placeholder="Catatan (Opsional)" bind:value={catatan} class="mt-0 block w-full font-normal text-sm text-zinc-900 pl-6 pb-2 pr-1 px-1 border-0 border-b-2 border-gray-300 focus:ring-0 focus:border-amber-500" autoComplete="off" />
                          </div>
                        </label>
                        </div> 
                        <button class="mt-6 py-2 hover:bg-amber-600 flex rounded-md bg-amber-500 text-white font-bold w-full items-center justify-center">
                            Kirim Pesanan
                            </button>
                </form>
            </div>
            <div class="h-[48px]"></div>
        </div>
    </div>
  </div>
  </main>   
</section>

<Modal bind:showModal>
    {#if modalType === 'note'}
    <div class="flex flex-col space-y-1 mt-4 p-[1em]">
        <div class="flex justify-between items-center">
            <h3 class="text-xl font-bold text-gray-950 capitalize">
                {menuDetails.menu.name}
            </h3>
            <h3 class="text-gray-800 font-bold text-xl">
                Rp {formatHarga(menuDetails.menu.harga)}
            </h3>
        </div>
        <div class="">
            <h4 class="text-sm text-stone-600 capitalize">
                {menuDetails.kategori}. Keterangan atau deskripsi
            </h4>
        </div>
    </div> 
    
        <div class="bg-orange-50 p-[1em] pb-[24px]">
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-bold">Catatan 
                    <span class="ml-1 text-xs">(Opsional)</span></h2>
            </div>
            <div class="mt-3 mb-4">
                <div class="relative">
                    <span class="absolute top-3 left-0 sm:pl-4 pl-2 flex items-center text-dark icon">
                        <Icon icon="ph:note-pencil-light" />
                    </span>
                    <textarea
                        type="text"
                        placeholder="Contoh: banyakin porsinya ya"
                        class="w-full bg-white sm:py-2 py-2 sm:text-sm text-sm border
                     border-stone-400 rounded-md focus:ring-0 focus:border
                     focus:border-yellow-400 px-2 sm:pl-10 pl-8"
                        rows="6"
                        bind:value={noteValue}
                    ></textarea>
                </div>
            </div>
        </div>
        <div class="absolute left-0 right-0 bottom-4 px-[1em] flex justify-between items-center space-x-4">
            <button 
            class="basis-1/2 flex justify-center items-center text-amber-500
            rounded-full py-2 font-bold border border-amber-500 w-full"
            on:click={() => (showModal = false)}>Batal</button>
            <button 
            class="basis-1/2 flex justify-center items-center text-white
            rounded-full py-2 font-bold bg-amber-500"
            on:click={saveNote}>Simpan</button>
        </div>
    {:else if modalType === 'order'}
    <div class="p-[1em] pb-16">
        <div class="flex items-center justify-center mt-8 ">
            <div class="flex items-center justify-center p-2 bg-green-500 text-white rounded-full">
                <Icon icon="ic:round-check" width="48" height="48" />
            </div>
        </div>
        <div class="mt-6 flex items-center justify-center">
            <h1 class="text-gray-800 font-bold text-xl sm:text-2xl">Pesananmu Berhasil</h1>
        </div>
        <div class="mt-8 flex justify-center items-center bg-green-100 p-[1em] rounded-lg px relative">
             <h1 class="text-green-600 font-medium text-base sm:text-xl text-center leading-8 tracking-[-0.01em]">Tunjukkan pesananmu ke kasir
                <br />atau<br />
                Kamu bisa mengirimkannya ke whatsapp
             </h1>  
        </div>
        </div>  
        <!-- <div class="absolute left-0 right-0 bottom-4 px-[1em] flex justify-center items-center">
            <button 
            on:click={sendWA}
            class="rounded-xl py-2 px-4 bg-green-500 flex items-center text-white font-bold">
                <span class="mr-1">
                    <Icon icon="ic:baseline-whatsapp" width="24" height="24" />
                </span> Kirim ke Whatsapp</button>
        </div> -->
    {/if}
</Modal>

  <style>
  /* Hide the default scrollbar */
  .hide-scrollbar::-webkit-scrollbar {
    width: 0.5em;
    background-color: #fff9ed;
  }

  /* Track */
  .hide-scrollbar::-webkit-scrollbar-track {
    background: #fff9ed;
  }

  /* Handle */
  .hide-scrollbar::-webkit-scrollbar-thumb {
    background: #fce1ac;
    border-radius: 0.25em;
  }

  /* Handle on hover */
  .hide-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #f7a940;
  }

  </style>
<script>
	import Icon from "@iconify/svelte";
	import { onMount } from "svelte";
	import { derived } from "svelte/store";
	import { cartItems } from "../lib/cart";
    import { note } from "$lib/note.js";
	import { fly, fade, scale } from "svelte/transition";
	import { viewCart, formatHarga } from "../lib/menu";
	import Modal from "./MenuModal.svelte";
    import { kategori } from "$lib/menuList";

	let showModal = false;

	let activeCategory = 0; // Initialize the active category to the first item

	const handleAnchorClick = (event, index) => {
		event.preventDefault();
		activeCategory = index; // Update the active category

		const link = event.currentTarget;
		const anchorId = new URL(link.href).hash.replace("#", "");
		const anchor = document.getElementById(anchorId);
		const offset = 64; // Adjust the offset value as needed
		window.scrollTo({
			top: anchor.offsetTop - offset,
			behavior: "smooth",
		});
	};

	const handleScroll = () => {
		const sections = document.querySelectorAll('[id^="kategori_"]');
		const offset = 64; // Adjust the offset value as needed
		const currentPosition = window.pageYOffset + offset;

		let activeIndex = 0;
		let minDistance = Infinity;

		sections.forEach((section, index) => {
			const sectionTop = section.offsetTop;
			const distance = Math.abs(sectionTop - currentPosition);
			if (distance < minDistance) {
				minDistance = distance;
				activeIndex = index;
			}
		});

		activeCategory = activeIndex;
	};

	onMount(() => {
		if (cart.length !== 0) {
			cartVisible = true;
		}
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	});

	let searchQuery = "";
	let filteredMenu = [];
	$: {
		filteredMenu = kategori.map((kategoriItem) => {
			let categoryMenusFound = false;

			const filtered = kategoriItem.menu.filter((menu) => {
				const found = menu.name
					.toLowerCase()
					.includes(searchQuery.toLowerCase());
				if (found) {
					categoryMenusFound = true;
				}
				return found;
			});

			return {
				...kategoriItem,
				menu: filtered,
				menusFound: categoryMenusFound,
			};
		});
	}

	let cartVisible = false;

	let pesanberapa = 0;
	let totalpesan = 0;

	const add = () => {
		pesanberapa += 1;
		totalpesan = menuDetails.menu.harga * pesanberapa;
	};

	const min = () => {
		if (pesanberapa <= 1) {
			pesanberapa = 1;
		} else {
			pesanberapa -= 1;
			totalpesan = menuDetails.menu.harga * pesanberapa;
		}
	};

	const addToCart = (kategoriItem, menu, id, v) => {
		showModal = false;
		cartVisible = true;
		let foundItem = null;
		cartItems.subscribe((items) => {
			foundItem = items.find((cartItem) => cartItem.id === id);
		});
        let catatan = '';
        if($note === undefined) {
            catatan = '';
        } else {
            catatan = $note;
        }
		if (v === 1) {
			const item = {
				kategori: kategoriItem.name,
				id: id,
				jumlah: 1,
				menu: {
					name: menu.name,
					harga: menu.harga,
					imgUrl: menu.imgUrl,
				},
                note: catatan
			};

			if (foundItem) {
				foundItem.jumlah += 1;
				cartItems.update((items) => [...items]);
			} else {
				cartItems.update((items) => [...items, item]);
			}
		}
        if (v === 2) {
			const item = {
				kategori: kategoriItem.name,
				id: id,
				jumlah: pesanberapa,
				menu: {
					name: menu.name,
					harga: menu.harga,
					imgUrl: menu.imgUrl,
				},
                note: catatan
			};
			if (foundItem) {
				foundItem.jumlah += pesanberapa;
				cartItems.update((items) => [...items]);
			} else {
				cartItems.update((items) => [...items, item]);
			}
        }
	};

	let cart = [];
	let countJumlah = 0;

	cartItems.subscribe((items) => {
		countJumlah = items.reduce((acc, item) => acc + item.jumlah, 0);
		cart = items;
	});

	const totalHarga = derived(cartItems, ($cartItems) => {
		return $cartItems.reduce(
			(total, item) =>
				total + parseInt(item.jumlah) * parseInt(item.menu.harga),
			0
		);
	});

	let selectedElement = -1;

	let menuDetails = [];

	const setViewMenu = (menu, kategori, id) => {
		const item = {
			kategori: kategori.name,
			id: id,
			menu: {
				name: menu.name,
				harga: menu.harga,
				imgUrl: menu.imgUrl,
			},
            note: kategori.note
		};
		menuDetails = item;
		pesanberapa = 1;
		totalpesan = menu.harga;
	};
</script>



<div class="">
    <div class="">
        <div class="sticky bg-white top-0 pb-2 pt-4 flex justify-start items-center z-20 overflow-auto hide-scrollbar">
            {#each kategori as item, i (i)}
                <a href="#kategori_{i}" on:click={(event) => handleAnchorClick(event, i)}
                    class="flex-shrink-0">
                    <div class={`pb-3 border-b-4 ${
                            i === activeCategory
                                ? "border-amber-400"
                                : "border-slate-100"
                        }`}>
                        <div class="px-4 sm:px-6">
                            <h3  class="sm:text-base text-sm font-semibold text-gray-600 capitalize">
                                {item.name}
                            </h3>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
        <div class="bg-slate-100 h-[4px] -mt-3" />
        <div class="pt-6 pb-4 z-10">
            <div class="px-4">
                <div class="relative">
                    <span class="absolute inset-y-0 left-0 sm:pl-3 pl-2 flex items-center text-zinc-500 icon">
                        <Icon icon="heroicons-outline:search" width="20" height="20" />
                    </span>
                    <input
                        type="text"
                        placeholder="Cari menu"
                        class="w-full bg-slate-100 sm:py-3 py-2 sm:text-base text-sm shadow-xl border border-slate-300/60 rounded-lg focus:ring-0 focus:border-yellow-600 px-2 sm:pl-9 pl-8"
                        bind:value={searchQuery}
                    />
                </div>
            </div>
        </div>
        <div class="py-4">
            {#each filteredMenu as kategoriItem, i (i)}
                {#if kategoriItem.menu.length > 0}
                    <div id={`kategori_${i}`} class="" key={i}>
                        <div class="px-4">
                            <h2 class="sm:text-2xl text-lg font-semibold text-gray-700 capitalize">
                                {kategoriItem.name}
                            </h2>
                        </div>
                        <div class="py-4 flex flex-col space-y-3">
                            {#each kategoriItem.menu as list, ii}
                                <div 
                                    key={ii}
                                    class={`px-4 flex space-x-3 items-start ${
                                        ii === kategoriItem.menu.length - 1
                                        ? ""
                                        : "sm:border-b-[3px] border-b-[1px] border-slate-100"
                                    } pb-3`}>
                                    <button on:click={() => {showModal = true; setViewMenu(list, kategoriItem, `${i}${ii}`)}} class="sm:h-[100px] sm:w-[100px] h-[72px] w-[72px] rounded-xl bg-gray-200">
                                        {#if list.imgUrl !== ""}
                                        <div class='bg-no-repeat bg-cover w-full h-full rounded-xl bg-center' style={`background-image: url("${list.imgUrl}");`}>
                                            </div>
                                        {/if}
                                    </button>
                                    <div class="flex-grow">
                                        <div>
                                            <h3 class="sm:text-xl text-sm font-semibold text-gray-600">
                                                {list.name} 
                                                {#if selectedElement === `${i}${ii}`}
                                                <span class="text-orange-500 sm:font-semibold font-normal ml-1" in:fly out:fly>ditambahkan</span>
                                                {/if}
                                            </h3>
                                        </div>
                                        <div class="mt-8 font-semibold text-gray-600 sm:text-base text-xs">
                                            Rp {formatHarga(list.harga)}
                                        </div>
                                    </div>
                                    <button on:click={() => {
                                        addToCart(kategoriItem, list, `${i}${ii}`, 1);
                                        selectedElement = `${i}${ii}`;
                                        setTimeout(() => {
                                          selectedElement = -1;
                                        }, 400); // Adjust the timeout duration (in milliseconds) as desired
                                      }} class="rounded-lg border border-orange-600 sm:px-4 px-3 sm:text-base text-sm py-[2px] font-medium">
                                      Tambah
                                    </button>
                                </div>
                            {/each}
                        </div>
                    </div>
                    <div class="md:h-[7px] h-[3px] w-full bg-slate-100 mb-2" />
                {/if}
            {/each}
            {#if filteredMenu.every((kategoriItem) => !kategoriItem.menusFound)}
                <div class="text-center">
                    <span class="text-slate-400 italic">Menu tidak ditemukan</span>
                </div>
            {/if}
        </div>
    </div>
    {#if cartVisible}
    <div in:fly={{ duration: 300, y: 100}} class="fixed left-0 right-0 bottom-4 mx-auto max-w-[600px] p-2 z-30">
        <div class="bg-gradient-to-t from-stone-900 to-zinc-700 px-6 py-3 rounded-lg">
            <div in:fly={{ duration: 500, y: 100}} class="flex justify-between items-center">
                <div>
                    {#key cart.length}
                    <p class="font-bold text-amber-500 sm:text-sm text-xs" in:fade={{duration:100}}>Rp {formatHarga($totalHarga)}</p>
                    <p class="mt-1 text-white sm:text-sm text-xs" in:fade={{duration:100}}>{countJumlah} item ditambahkan</p>
                    {/key}
                </div>
                <div class="">
                    <button on:click={() => viewCart()} 
                    class="sm:px-3 px-2 py-2 rounded-lg text-white bg-amber-600 sm:text-sm text-xs flex items-center font-semibold">
                    Lihat Pesanan 
                        <span class="ml-1">
                        <Icon icon="mingcute:right-line" />
                    </span>
                </button>
                </div>
            </div>
        </div>
    </div>
    {/if}
</div>

<Modal bind:showModal>
    <div slot="gambarMenu"
    class="top-0 h-[246px] w-full flex justify-center items-center overflow-hidden relative">
    {#if menuDetails.menu.imgUrl}
    <img src={menuDetails.menu.imgUrl} alt={menuDetails.menu.name} class="w-full object-top">
    {:else}
        <div class="bg-gray-200 w-full h-full"></div>
    {/if}
    </div>
    <div class="flex flex-col space-y-1">
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
    <div slot="add_to_cart" class="absolute bottom-3 left-0 right-0 flex flex-col items-center z-10 bg-white">
        <div class="bg-gradient-to-t from-gray-300/50 via-gray-100 to-gray-50 w-full h-[5px] mb-5"></div>
        <div class="px-[1em] w-full">
        <div class="relative flex justify-between items-center w-full mb-3">
            <div><h2 class="text-sm text-gray-900">Mau pesan berapa?</h2></div>
            <div>
                <div>
                    <div class="flex items-center bg-white p-2 rounded-md space-x-4">
                        <button 
                        on:click={min} 
                        class={`flex items-center justify-center p-1 text-dark rounded-full border
                         ${pesanberapa <= 1 ? 'border-gray-600 text-gray-600' 
                         : 'border-orange-600 text-orange-600'}`}>
                            <Icon icon="fe:minus" width="14" height="14" class="stroke-[4px]"/>
                        </button>
                        <div>
                            {#key pesanberapa}
                            <h2 
                            in:scale={{duration:100}}
                            class="font-extrabold text-sm text-stone-950">{pesanberapa}</h2>
                            {/key}
                        </div>
                        <button on:click={add} class="flex items-center justify-center p-1 text-dark rounded-full border border-orange-600 text-orange-600">
                            <Icon icon="fe:plus" width="14" height="14"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="relative rounded-full px-5 bg-gradient-to-t from-orange-600 to-orange-500/90 flex justify-between items-center w-full">
            <div class="flex flex-col justify-between items-start py-2 space-y-[1px]">
                <div class="">
                        <h2 class="text-white sm:text-sm text-xs">Total</h2>
                </div>
                <div class="">
                    {#key pesanberapa}
                        <h2 
                        in:scale={{duration:200}}
                        class="text-white font-bold sm:text-base text-sm">Rp {formatHarga(totalpesan)}</h2>
                        {/key}
                </div>
            </div>
            <button
            class=""
            on:click={() => {
                addToCart({'name': menuDetails.kategori}, menuDetails.menu, menuDetails.id, 2);
                selectedElement = menuDetails.id;
                setTimeout(() => {
                  selectedElement = -1;
                }, 400); // Adjust the timeout duration (in milliseconds) as desired
              }}>
                <h2 class="text-slate-100 font-semibold flex items-center sm:text-base text-sm">
                    Tambah Pesanan
                </h2>
            </button>
        </div>
        </div>
    </div>
</Modal>


<style>
.overlayMenu {
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

  .overlayMenu.visible {
    opacity: 1;
    pointer-events: auto;
  }
    /* Hide the default scrollbar */
    .hide-scrollbar::-webkit-scrollbar {
      height: 4px;
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
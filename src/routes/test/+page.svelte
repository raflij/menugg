<script>
	import { clickOutside } from './click_outside.js';
    import Icon from "@iconify/svelte";
    import { fly } from "svelte/transition";
    import { note } from "$lib/note.js";

	let showModal = false;

    let numRows = 1;
  let noteValue = '';

const handleInput = (event) => {
const textareaValue = event.target.value;
const lineBreaks = (textareaValue.match(/\n/g) || []).length;
numRows = Math.max(1, lineBreaks + 1);

noteValue = textareaValue; // Update the noteValue
note.set(noteValue); // Save the noteValue to the store
};

const handleKeyDown = (event) => {
if (event.key === 'Backspace') {
  const textareaValue = event.target.value;
  const lineBreaks = (textareaValue.match(/\n/g) || []).length;
  numRows = Math.max(1, lineBreaks + 1);

  noteValue = textareaValue; // Update the noteValue
  note.set(noteValue); // Save the noteValue to the store
}
};
</script>

<button on:click={() => (showModal = true)}>Show Modal</button>
<button on:click={() => (showModal = false)}>Close Modal</button>
{#if showModal}
	<div class="fixed flex flex-col
    mx-auto max-w-[546px] w-full max-h-screen min-h-screen z-[999999] bg-white" use:clickOutside on:outclick={() => (showModal = false)}>
    
    <div class="relative h-full overflow-auto">
        <div class="flex justify-between absolute top-0 left-0 right-0 p-[1em] z-10">
            <div class="bg-white rounded-full flex justify-center items-center p-1">
                <button on:click={() => (showModal = false)} class="">
                    <Icon
                        icon="ph:arrow-left-bold"
                        class="text-dark"
                        width="20"
                        height="20"
                    />
                </button>
            </div>
            <div class="bg-white rounded-full flex justify-center items-center p-1">
                <Icon
                    icon="material-symbols:share"
                    class="text-dark"
                    width="20"
                    height="20"
                />
            </div>
        </div>
        <slot name="gambarMenu" />
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:click|stopPropagation
            class="flex flex-col relative h-full container">
            <div class="flex flex-col">
                <div class="flex flex-col space-y-1">
                    <div class="flex justify-between items-center">
                        <h3 class="text-xl font-bold text-gray-950 capitalize">
                            nama
                        </h3>
                        <h3 class="text-gray-800 font-bold text-xl">
                            Rp 99
                        </h3>
                    </div>
                    <div class="">
                        <h4 class="text-sm text-stone-600 capitalize">
                            kategori. Keterangan atau deskripsi
                        </h4>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-orange-50 p-[1em] pb-[48px]">
            <div class="flex justify-between items-center">
                <h2 class="text-sm font-bold">Catatan </h2>
            </div>
            <div class="mt-3 mb-4">
                <div class="relative">
                    <span class="absolute bottom-4 left-0 sm:pl-4 pl-2 flex items-center text-dark icon">
                        <Icon icon="ph:note-pencil-light" />
                    </span>
                    <textarea
                    bind:value={noteValue}
                        type="text"
                        placeholder="Contoh: banyakin porsinya ya"
                        class="w-full bg-white sm:py-2 py-2 sm:text-sm text-sm border
                     border-stone-400 rounded-md focus:ring-0 focus:border
                     focus:border-yellow-400 px-2 sm:pl-10 pl-8"
                        rows={numRows}
                        on:input={handleInput}
                        on:keydown={handleKeyDown}
                    />
                </div>
                <span class="mt-1 text-xs">Opsional</span>
            </div>
        </div>
        <div class="h-[96px]" />
    </div>
    Click outside me!</div>
{/if}

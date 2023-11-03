<script>
    import Icon from "@iconify/svelte";
    import { fly } from "svelte/transition";
    import { note } from "$lib/note.js";

    export let showModal;

    let dialog;
  let numRows = 1;
  let noteValue = '';

    function resetModal() {
        numRows = 1;
        noteValue = '';
        note.set();
    }

    $: if (typeof document !== 'undefined' && dialog && showModal) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
    } else if (typeof document !== 'undefined') {
        document.body.style.overflow = "";
        resetModal();
    }


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


{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <dialog
        bind:this={dialog}
        on:click|self={() => (showModal = false)}
        transition:fly={{ duration: 200, y: 200 }}
        class="fixed flex flex-col
        mx-auto max-w-[546px] w-full max-h-screen min-h-screen z-[999999] bg-white"
    >
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
                    <slot />
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
            <slot name="add_to_cart" />
    </dialog>
{/if}

<style>
    dialog {
        padding: 0;
    }
    .container {
        padding: 1em;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
    button {
        display: block;
    }
</style>

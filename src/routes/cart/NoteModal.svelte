<script>
    import { fly } from "svelte/transition";

    
    export let showModal;
    let dialog;

    $: if (typeof document !== 'undefined' && dialog && showModal && !dialog.hasAttribute('open')) {
        dialog.showModal();
        document.body.style.overflow = "hidden";
    } else if (typeof document !== 'undefined') {
        document.body.style.overflow = "";
    }
</script>

{#if showModal}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
    <dialog
        bind:this={dialog}
        on:click|self={() => (showModal = false)}
        transition:fly={{ duration: 200, y: 200 }}
        class="fixed flex flex-col left-0 right-0 top-auto
        mx-auto max-w-[546px] w-full z-[999999] bg-white rounded-t-lg"
    >
        <div class="relative h-full overflow-auto w-full">
            <slot />
            <div class="h-[96px]" />
        </div>
    </dialog>
{/if}

<style>
    dialog {
        padding: 0;
    }
    dialog::backdrop {
        background: rgba(0, 0, 0, 0.3);
    }
</style>

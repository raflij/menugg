<script>
    import Icon from '@iconify/svelte';
</script>
<div class=''>
    <div class='px-4 py-6 bg-no-repeat bg-cover relative h-[236px]' style={`background-image: url("./assets/images/bg.jpg");`}>
        <div class='h-full w-[85%] absolute bg-gradient-to-r opacity-60 from-zinc-100 via-zinc-50 to-transparent top-0 bottom-0 left-0 right-0'></div>
        <div class='relative'>
            <div>
                <h1 class='sm:text-3xl text-2xl font-semibold text-gray-800'>The Cozy Corner Cafe</h1>
            </div>
            <div class='mt-3'>
                <p class=''>Cafe, Restaurant, Aneka Nasi</p>
                <p class='text-xs text-gray-800 mt-1 font-semibold'>Jl. Ringroad Selatan no. 69, Yogyakarta</p>
            </div>
            <div class='mt-4 flex items-center'>
                <span class="mr-1"><Icon icon="simple-icons:googlemaps" size='16' /></span> <span class='font-medium'>The Cozy Corner Cafe</span>
            </div>
        </div>
    </div>
    <div class='overflow-hidden z-10 relative rounded-b-2xl py-8 border-b-[4px] border-darkblack bg-gradient-to-tr from-amber-500 via-yellow-500 to-yellow-300 flex justify-center items-center'>
        <div class='absolute w-[80px] h-[80px] z-0 bg-amber-300/30 rounded-full -top-[18px] -left-[20px]'></div>
        <div class='absolute w-[110px] h-[110px] z-0 bg-yellow-200/30 rounded-full -bottom-[18px] -right-[26px]'></div>
        <div class='relative sm:text-sm text-xs text-gray-800'>
            <p class='flex items-center'>
                <span class='mr-1'><Icon icon="bi:clock" size='14' /> </span>
                <span class='font-bold'>Senin - Jum'at : </span>
                <span class='font-semibold'> 11:00 - 24:00</span>
            </p>
            <p class='flex items-center mt-[2px]'>
                <span class='mr-1'><Icon icon="bi:clock" size='14' /> </span>
                <span class='font-bold'>Sabtu & Minggu : </span>
                <span class='font-semibold'> 07:00 - 24:00</span>
            </p>
        </div>
    </div>
</div>
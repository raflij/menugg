<script>
	import Navbar from "$lib/Navbar.svelte";
	import Menu from "$lib/Menu.svelte";
	import Banner from "$lib/Banner.svelte";
</script>

<svelte:head>
	<title>MenuGG - Digital Menu Kekinian</title>
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
    <main class="max-w-[600px] mx-auto bg-white">
        <section id="navbar">
            <Navbar />
        </section>
        <section id="banner">
            <Banner />
        </section>
        <section id="menu">
            <Menu />
        </section>
        <section id="footer">
            <div class="h-[88px]" />
        </section>
    </main>
</section>
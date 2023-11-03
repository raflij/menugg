import { goto } from '$app/navigation';

export const formatHarga = (number) => {
    const parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return parts.join(".");
}

export const viewCart = () => {
    goto('/cart'); // Redirect to the /cart page
}
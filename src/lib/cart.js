import { writable } from 'svelte/store';

export const cartItems = writable([]);

export function updateCartItems(items) {
  cartItems.update(() => items);
}

export function setCartItems(items) {
  cartItems.set(items);
}

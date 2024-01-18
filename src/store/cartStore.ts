import { ActionTypes, CartType } from '@/types'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0
}

export const useCartStore = create(persist<CartType & ActionTypes>((set, get) => ({
    products: INITIAL_STATE.products,
    totalItems: INITIAL_STATE.totalItems,
    totalPrice: INITIAL_STATE.totalPrice,
    addToCart: (item) => {

        const products = get().products;
        const findProduct = products.find(p => p.id === item.id)

        if (findProduct) {
            const updatedProducts = products.map(pr => (
                pr.id === findProduct.id ? {
                    ...item,
                    quntity: item.quantity + pr.quantity,
                    price: item.price + pr.price
                } : item
            ))

            set((state) => ({
                products: updatedProducts,
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
            }))
        } else {
            set((state) => ({
                products: [...state.products, item],
                totalItems: state.totalItems + item.quantity,
                totalPrice: state.totalPrice + item.price
            }))
        }
    },
    removeFromCart: (item) => {
        set((state) => (
            {
                products: state.products.filter(p => p.id !== item.id),
                totalItem: state.totalItems - item.quantity,
                totalPrice: state.totalPrice - item.price
            }
        ))
    }
}), { name: "cart" }))
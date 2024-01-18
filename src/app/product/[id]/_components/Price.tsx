"use client";

import { useCartStore } from "@/store/cartStore";
import { ProductType } from "@/types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type Props = {
    product: ProductType
};

const Price = ({ product }: Props) => {
    const [total, setTotal] = useState(product.price);
    const [quantity, setQuantity] = useState(1);
    const [selected, setSelected] = useState(0);
    const { addToCart } = useCartStore()

    useEffect(() => {
        setTotal(
            quantity * product.price
        );
    }, [quantity, selected, product]);

    const handleOnClick = () => {

        addToCart(
            {
                id: product.id,
                title: product.title,
                img: product.img,
                price: total,
                quantity: quantity
            }
        )
        toast.success("Cart has been updated!")
    }

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">${total}</h2>
            {/* OPTIONS CONTAINER */}
            <div className="flex justify-between items-center">
                <div className="flex justify-between w-full p-3 ring-1 ring-red-500">
                    <span>Quantity</span>
                    <div className="flex gap-4 items-center">
                        <button
                            onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
                        >
                            {"<"}
                        </button>
                        <span>{quantity}</span>
                        <button
                            onClick={() => setQuantity((prev) => (prev < 9 ? prev + 1 : 9))}
                        >
                            {">"}
                        </button>
                    </div>
                </div>
                <button onClick={handleOnClick} className="uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-500">
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default Price;
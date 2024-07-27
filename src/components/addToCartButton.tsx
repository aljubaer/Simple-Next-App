"use client";
import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import React from "react";
import { useShallow } from "zustand/react/shallow";

export default function AddToCartButton({ product }: { product: Product }) {
  const { total, add, cartProducts, setTotal } = useStore(
    useShallow((state) => ({
      total: state.total,
      add: state.addProduct,
      cartProducts: state.products,
      setTotal: state.setTotal,
    }))
  );

  const addToCart = (product: Product) => {
    add(product);
    setTotal(total + product.productPrice.price);
  };

  const foundProduct = (product: Product) =>
    cartProducts.find((_product: Product) => _product.id === product.id);

  return (
    <div
      onClick={() => addToCart(product)}
      className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
    >
      {foundProduct(product) ? "Added" : "Add to Cart"}
    </div>
  );
}

import AddToCartButton from "@/components/addToCartButton";
import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useShallow } from "zustand/react/shallow";

async function getProducts(): Promise<Product[]> {
  const productsResponse = await fetch("http://localhost:5000/products", {
    cache: "force-cache",
  });

  return productsResponse.json();
}

export default async function Products() {
  const products = await getProducts();

  return (
    <>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.featuredImageUrl}
                  alt={product.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 pb-0">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mb-4">
                    {product.productPrice.price}
                  </p>
                </div>
              </Link>
              <div className="p-4 pt-0">
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

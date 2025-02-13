import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import Loading from "./loading";
import { redirect } from "next/navigation";

const STATIC_ELEMENT = 5;

export async function generateStaticParams() {
  const postsResponse = await fetch(`${process.env.API_BASE_URI}/products`);

  const products = await postsResponse.json();

  return products.slice(0, STATIC_ELEMENT).map((product: Product) => ({
    id: String(product.id),
  }));
}

async function fetchProduct(id: string): Promise<Product> {
  let product;

  try {
    const productResponse = await fetch(
      `${process.env.API_BASE_URI}/products/${id}`,
      { next: { revalidate: 40 } }
    );
    product = await productResponse.json();
  } catch (error) {
    redirect("/404");
  }

  return product;
}

export default async function ProductDetails({ params, searchParams }: any) {
  const { id } = params;

  const product = await fetchProduct(id);

  return (
    <Suspense fallback={<Loading />}>
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={product.featuredImageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-96 object-cover"
          />
          <div className="p-6">
            <p className="text-gray-600 mb-4">{product.productPrice.price}</p>
            <p className="text-gray-800 mb-6">
              {product.shortDescription || ""} Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Deserunt nemo, vero labore aliquid
              quos, atque, aspernatur odio excepturi voluptate mollitia sint
              neque a officiis delectus ratione soluta natus quaerat aperiam.{" "}
            </p>
            <Link href="/products">
              <div className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                Back to Products
              </div>
            </Link>
          </div>
        </div>
      </main>
    </Suspense>
  );
}

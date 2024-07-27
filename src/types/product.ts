export type Product = {
    id: string;
    name: string;
    seName: string;
    colorVariants: string | null;
    shortDescription: string | null;
    featuredImageUrl: string;
    productPrice: ProductPrice;
}

export type ProductPrice = {
    oldPrice: number;
    price: number;
}

export type CartProduct = Product & { qty: number };

"use client";

import { useShowCartStore } from "@/store/store";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Cart from "./cart";
import { ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/products",
    label: "Products",
  },
  {
    href: "/create-post",
    label: "Create post",
  },
];

export default function Header() {
  const pathname = usePathname();

  const show = useShowCartStore((state) => state.show);
  const open = useShowCartStore((state) => state.open);
  const close = useShowCartStore((state) => state.close);

  return (
    <header className="flex justify-between items-center py-4 px-7 border-b">
      <Link href="/">
        {/* <Image
          src="https://bytegrad.com/course-assets/youtube/example-logo.png"
          alt="Logo"
          className="w-[35px] h-[35px]"
          width="35"
          height="35"
        /> */}
      </Link>
      <div className="mr-5">
        <button
          onClick={() => open()}
          type="button"
          className="relative inline-flex items-center text-sm font-medium text-center"
        >
          <ShoppingBagIcon aria-hidden="true" className="h-8 w-8" />
          <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
            2
          </div>
        </button>
      </div>
      <Cart />
    </header>
  );
}

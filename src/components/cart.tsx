"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline";
import { useStore } from "@/store/store";
import { useShallow } from "zustand/react/shallow";
import { Product } from "@/types/product";

export default function Cart() {
  const { show, open, close, products, remove, increase, decrease, total, setTotal } = useStore(
    useShallow((state) => ({
      show: state.show,
      open: state.open,
      close: state.close,
      products: state.products,
      remove: state.removeProduct,
      increase: state.increaseQuatity,
      decrease: state.decreaseQuantity,
      total: state.total,
      setTotal: state.setTotal,
    }))
  );

  const removeFromCart = (product: Product) => {
    remove(product.id);
    setTotal(total - product.productPrice.price);
  };

  const increaseProductQuatity = (product: Product) => {
    increase(product.id);
    setTotal(total + product.productPrice.price);
  };

  const decreaseProductQuatity = (product: Product) => {
    decrease(product.id);
    setTotal(total - product.productPrice.price);
  };

  return (
    <Dialog open={show} onClose={() => null} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => close()}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {products.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={"product.featuredImageUrl"}
                                src={product.featuredImageUrl}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={`/products/${product.id}`}>
                                      {product.name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    {product.productPrice.price}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <button onClick={() => increaseProductQuatity(product)} className="p-2 cursor-pointer hover:bg-gray-400">
                                  <PlusIcon
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                  />
                                </button>
                                <span className="text-gray-500 mb-2">
                                  Qty {product.qty}
                                </span>
                                <button onClick={() => decreaseProductQuatity(product)} className="p-2 cursor-pointer hover:bg-gray-400">
                                  <MinusIcon
                                    aria-hidden="true"
                                    className="h-6 w-6"
                                  />
                                </button>

                                <div className="flex">
                                  <button
                                    type="button"
                                    className="font-medium text-red-600 hover:text-red-500"
                                    onClick={() => removeFromCart(product)}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>${total}.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={() => open()}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

"use client";

import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatNumberToTwoDecimals } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";

const CartItem = ({ item }: any) => {
  const { increaseQuantity, decreaseQuantity, itemQuantity, removeItem } =
    useCartStore();

  return (
    <div className="py-4">
      <h1 className="text-lg font-semibold">{item.name}</h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-2 mt-2">
          <Button
            variant="outline"
            className="rounded-none"
            onClick={(e) => decreaseQuantity(item.id)}
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Input
            type="number"
            className="w-[60px] text-xl font-semibold rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={itemQuantity(item.id)}
            onChange={(e) => console.log(e.target.value)}
          />
          <Button
            variant="outline"
            className="rounded-none"
            onClick={(e) => increaseQuantity(item.id)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        <div className="mt-2 text-xl font-bold tracking-wider">
          $
          {formatNumberToTwoDecimals(
            parseFloat(item.price) * itemQuantity(item.id)
          )}
        </div>
      </div>
      <div className="flex mt-2 justify-end gap-2 items-center">
        <p className="hover:underline text-xs cursor-pointer">Favorite</p>
        <div className="h-4 bg-stone-600 w-[1px] ml-3"></div>
        <Button variant="ghost" onClick={(e) => removeItem(item.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const CartButton = () => {
  const { items, getTotalCartPrice, getCartQuantity } = useCartStore();

  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button variant="outline" className="border-orange-400">
          <ShoppingCart className="w-4 h-4 mr-2" />
          Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="p-8 min-w-[400px] max-w-full">
        <div className="flex flex-col h-full">
          <h2 className="mb-4 text-2xl font-bold">
            Coffee Cart <span>({getCartQuantity()})</span>
          </h2>
          {items.length === 0 ? (
            <p className="flex-1 text-center">Your cart is empty.</p>
          ) : (
            <div className="flex-1 flex flex-col divide-y overflow-y-auto">
              {items.map((item: any, index) => (
                <CartItem key={index} item={item} />
              ))}
            </div>
          )}
          <div className="mt-4">
            <Button
              className="w-full flex items-center text-md justify-center gap-2"
              size="lg"
            >
              Proceed to Checkout{" "}
              <span className="text-black/[55%]">(${getTotalCartPrice()})</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartButton;

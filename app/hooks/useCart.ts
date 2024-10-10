import { useRouteLoaderData } from "@remix-run/react";
import { Jsonify } from "@remix-run/server-runtime/dist/jsonify";
import { CartReturn } from "@shopify/hydrogen";
import { useEffect, useState } from "react";
import { RootLoader } from "~/root";

export function useCart() {
    const rootData = useRouteLoaderData<RootLoader>('root');
    const [cart, setCart] = useState<Jsonify<CartReturn> | null>(null);

    const loadCartData = async () => {
        if (!rootData) return null;

        setCart(await rootData.cart);
    }

    useEffect(() => {
        loadCartData();
    }, [rootData]);


    return cart;
}
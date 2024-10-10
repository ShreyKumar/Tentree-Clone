import { Await, useRouteLoaderData } from "@remix-run/react";
import { RootLoader } from "~/root";

export const loader = async () => {
    return { title: 'Wishlist' }
}

export default function Wishlist() {
    const rootData = useRouteLoaderData<RootLoader>('root');

    if (!rootData) return null;

    return (
        <div>
            <h1>Wishlist</h1>
            <Await
                resolve={rootData.cart}
                errorElement={<div>An error occurred</div>}
            >
                {(cart) => {
                    return (
                        <div>
                            <h2>Cart</h2>
                            <pre>{JSON.stringify(cart, null, 2)}</pre>
                        </div>
                    )
                }}
            </Await>
        </div>
    )
}
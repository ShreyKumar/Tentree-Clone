import { Await, Link, useLoaderData, useRouteLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/server-runtime";
import { PRODUCT_QUERY } from "./($locale).products.$handle";
import { getSelectedProductOptions, Image, Money } from "@shopify/hydrogen";
import { Product } from "@shopify/hydrogen/storefront-api-types";
import { Jsonify } from "@remix-run/server-runtime/dist/jsonify";

export const loader = async ({ context, params, request }: LoaderFunctionArgs) => {
    const { cart } = context

    const resolvedCart = await cart.get()

    const wishlistItemHandles = JSON.parse(resolvedCart?.metafield?.value || '[]') as string[]

    const wishlistProducts = await Promise.all(wishlistItemHandles.map((handle: string) => {
        return context.storefront.query(PRODUCT_QUERY, {
            variables: { handle: handle, selectedOptions: getSelectedProductOptions(request) },
        })
    })) as { product: Product }[]

    console.log(JSON.stringify({ wishlistProducts }))

    return { title: 'Wishlist', wishlistProducts, cart: resolvedCart }
}

export default function Wishlist() {
    const { wishlistProducts } = useLoaderData<typeof loader>();

    if (!wishlistProducts) return null;

    return (
        <div>
            <h1>Wishlist</h1>
            <ul>
                {wishlistProducts.map(({ product }: Jsonify<{ product: Product }>) => (
                    <Link key={product.id} to={`/products/${product.handle}`}>
                        <Image data={product.variants.nodes[0].image || {}} sizes="100vw" />
                        <h2>{product.title}</h2>
                        <small>
                            <Money data={product.variants.nodes[0].price} />
                        </small>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
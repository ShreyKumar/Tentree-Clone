import { useFetcher } from '@remix-run/react';
import { type FetcherWithComponents } from '@remix-run/react';
import { cartAttributesUpdateDefault, CartForm, type OptimisticCartLineInput } from '@shopify/hydrogen';
import { Product } from '@shopify/hydrogen/storefront-api-types';
import { useCart } from '~/hooks/useCart';

interface OptimisticWishlistInput {
    selectedVariant: unknown;
}

export function AddToWishlistButton({
    // analytics,
    // children,
    // disabled,
    lines,
    // onClick,
}: {
    // analytics?: unknown;
    // children: React.ReactNode;
    // disabled?: boolean;
    lines: Array<OptimisticWishlistInput>
    // onClick?: () => void;
}) {
    const fetcher = useFetcher()
    const cart = useCart()
    const originalWishlistItems = JSON.parse(cart?.metafield?.value ??
        '[]'
    ) as string[]
    const selectedVariantHandles = lines.map(({ selectedVariant }) => (selectedVariant as { product: Product }).product.handle)

    const handleAddWishlist = () => {
        const newWishlistItems = [...originalWishlistItems, ...selectedVariantHandles]

        fetcher.submit(
            {
                [CartForm.INPUT_NAME]: JSON.stringify({
                    action: CartForm.ACTIONS.MetafieldsSet,
                    inputs: {
                        metafields: [{
                            key: 'custom.wishlistItem',
                            type: 'string',
                            value: JSON.stringify(newWishlistItems),
                        }]
                    },
                }),
            },
            { method: 'POST', action: '/cart' }
        )
    }

    const handleRemoveWishlist = () => {
        const newWishlistItems = originalWishlistItems.filter((handle) => !selectedVariantHandles.includes(handle))

        fetcher.submit(
            {
                [CartForm.INPUT_NAME]: JSON.stringify({
                    action: CartForm.ACTIONS.MetafieldsSet,
                    inputs: {
                        metafields: [{
                            key: 'custom.wishlistItem',
                            type: 'string',
                            value: JSON.stringify(newWishlistItems),
                        }]
                    },
                }),
            },
            { method: 'POST', action: '/cart' }
        )
    }

    const inWishlist = selectedVariantHandles.some((handle) => originalWishlistItems.includes(handle))

    if (inWishlist) {
        return (
            <button onClick={handleRemoveWishlist}>Remove from Wishlist</button>
        )
    }
    return (
        <button onClick={handleAddWishlist}>Add to Wishlist</button>
    )

    // return (
    //     <div>
    //         <input type="button" value="Add to Wishlist" onClick={() => {
    //             fetcher.submit(
    //                 {
    //                     [CartForm.INPUT_NAME]: JSON.stringify({
    //                         action: CartForm.ACTIONS.MetafieldsSet,
    //                         inputs: {
    //                             metafields: [{
    //                                 key: 'custom.wishlistItem',
    //                                 type: 'product_reference',
    //                                 value: ,
    //                             }],
    //                         },
    //                     }),
    //                 },
    //                 { method: 'POST', action: '/cart' }
    //             )
    //         }} />
    //     </div>
    // );
}

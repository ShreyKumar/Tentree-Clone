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

    const handleWishlist = () => {
        console.log('lines', lines)

        const selectedVariantIds = lines.map(({ selectedVariant }) => (selectedVariant as { product: Product }).product.handle)

        const originalWishlistItems = JSON.parse(cart?.metafield?.value ??
            '[]'
        ) as string[]
        const newWishlistItems = [...originalWishlistItems, ...selectedVariantIds]

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

    return (
        <button onClick={handleWishlist}>Add to Wishlist</button>
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

import { useAside } from "../Aside";
import { HeaderProps } from "./types";
import { Suspense } from "react";
import { Await, Link, useAsyncValue } from "@remix-run/react";
import { CartApiQueryFragment } from "storefrontapi.generated";
import { CartViewPayload, useAnalytics, useOptimisticCart } from "@shopify/hydrogen";

import magnifyingGlass from '~/assets/icons/search-bold.svg'
import shoppingBag from '~/assets/icons/shopping-bag-bold.svg'
import burgerMenu from '~/assets/icons/burger-menu-bold.svg'
import heart from '~/assets/icons/heart.svg'

export function CartBadge({ count }: { count: number | null }) {
    const { open } = useAside();
    const { publish, shop, cart, prevCart } = useAnalytics();

    return (
        <a
            href="/cart"
            onClick={(e) => {
                e.preventDefault();
                open('cart');
                publish('cart_viewed', {
                    cart,
                    prevCart,
                    shop,
                    url: window.location.href || '',
                } as CartViewPayload);
            }}
            className='relative'
        >
            <img src={shoppingBag} alt="Cart" />
            <span className='absolute top-[13px] left-[13px] pr-1 pl-1 text-white bg-primary rounded-full text-xs'>{count === null ? <span>&nbsp;</span> : count}</span>
        </a>
    );
}

export function CartBanner() {
    const originalCart = useAsyncValue() as CartApiQueryFragment | null;
    const cart = useOptimisticCart(originalCart);
    return <CartBadge count={cart?.totalQuantity ?? 0} />;
}


export function SearchToggle() {
    const { open } = useAside();
    return (
        <button className="reset" onClick={() => open('search')}>
            <img src={magnifyingGlass} alt="Search" />
        </button>
    );
}

export function WishlistLink() {
    return (
        <Link to="/wishlist">
            <button>
                <img src={heart} alt="Wishlist" />
            </button>
        </Link>
    );
}

export function CartToggle({ cart }: Pick<HeaderProps, 'cart'>) {
    return (
        <Suspense fallback={<CartBadge count={null} />}>
            <Await resolve={cart}>
                <CartBanner />
            </Await>
        </Suspense>
    );
}

export function HeaderMenuToggle() {
    const { open } = useAside();
    return (
        <button
            className='ml-4'
            onClick={() => open('mobile')}
        >
            <h3><img src={burgerMenu} alt="" /></h3>
        </button>
    );
}
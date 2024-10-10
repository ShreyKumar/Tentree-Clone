import useMobileViewport from "~/hooks/useMobileViewport";
import { HeaderProps } from "./types";

import magnifyingGlass from '~/assets/icons/search-bold.svg'
import shoppingBag from '~/assets/icons/shopping-bag-bold.svg'
import burgerMenu from '~/assets/icons/burger-menu-bold.svg'
import { useAside } from "../Aside";
import { Suspense } from "react";
import { Await } from "@remix-run/react";
import { CartToggle, SearchToggle, WishlistLink } from "./HeaderFragments";

export function HeaderCtas({
    isLoggedIn,
    cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
    const isMobile = useMobileViewport()

    return (
        <nav className="header-ctas" role="navigation">
            {/* <NavLink prefetch="intent" to="/account" style={activeLinkStyle}>
          <Suspense fallback="Sign in">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              {(isLoggedIn) => (isLoggedIn ? 'Account' : 'Sign in')}
            </Await>
          </Suspense>
        </NavLink> */}
            <WishlistLink />
            <SearchToggle />
            <CartToggle cart={cart} />
        </nav>
    );
}
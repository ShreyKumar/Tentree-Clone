import { NavLink } from "@remix-run/react";
import { HeaderCtas } from "./HeaderCtas";
import { HeaderProps } from "./types";

import logo from '~/assets/tentree-logo.svg'
import { HeaderMenuToggle } from "./HeaderFragments";
import { activeLinkStyle } from "./helpers";

export function HeaderMobile({ isLoggedIn, cart }: Pick<HeaderProps, 'cart' | 'isLoggedIn'>) {
    return (
        <header className="header h-12">
            <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
            <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
                <img src={logo} alt="Tentree" />
            </NavLink>
            <HeaderMenuToggle />
        </header>
    )
}

import { NavLink } from "@remix-run/react";
import { HeaderCtas } from "./HeaderCtas";
import { HeaderProps } from "./types";
import { activeLinkStyle } from "./helpers";

import logo from '~/assets/tentree-logo.svg'
import { HeaderMenuToggle } from "./HeaderFragments";
import { HeaderMenu } from "./HeaderMenu";

export function HeaderDesktop({ isLoggedIn, cart, header, publicStoreDomain }: HeaderProps) {
    const { shop, menu } = header;

    return (
        <header className="header h-20">
            <div className='flex'>
                <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
                    <img src={logo} alt="Tentree" />
                </NavLink>
                <HeaderMenu
                    menu={menu}
                    primaryDomainUrl={header.shop.primaryDomain.url}
                    publicStoreDomain={publicStoreDomain}
                />
            </div>
            <div className='flex'>
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
                <HeaderMenuToggle />
            </div>
        </header>
    )
}
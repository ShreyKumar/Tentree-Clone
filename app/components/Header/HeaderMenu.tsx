import { NavLink } from "@remix-run/react";
import { useAside } from "../Aside";
import { activeLinkStyle, FALLBACK_HEADER_MENU } from "./helpers";
import { HeaderProps } from "./types";

export function HeaderMenu({
    menu,
    primaryDomainUrl,
    publicStoreDomain,
}: {
    menu: HeaderProps['header']['menu'];
    primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
    publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
    const { close } = useAside();

    return (
        <nav className='flex ml-5' role="navigation">
            {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
                if (!item.url) return null;

                // if the url is internal, we strip the domain
                const url =
                    item.url.includes('myshopify.com') ||
                        item.url.includes(publicStoreDomain) ||
                        item.url.includes(primaryDomainUrl)
                        ? new URL(item.url).pathname
                        : item.url;
                return (
                    <NavLink
                        className="cursor-pointer mx-5 uppercase"
                        end
                        key={item.id}
                        onClick={close}
                        prefetch="intent"
                        style={activeLinkStyle}
                        to={url}
                    >
                        {item.title}
                    </NavLink>
                );
            })}
        </nav>
    );
}

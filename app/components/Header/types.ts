import { CartApiQueryFragment, HeaderQuery } from "storefrontapi.generated";

export interface HeaderProps {
    header: HeaderQuery;
    cart: Promise<CartApiQueryFragment | null>;
    isLoggedIn: Promise<boolean>;
    publicStoreDomain: string;
}
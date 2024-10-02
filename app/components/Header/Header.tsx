import { Suspense } from 'react';
import { Await, NavLink, useAsyncValue } from '@remix-run/react';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type { HeaderQuery, CartApiQueryFragment } from 'storefrontapi.generated';
import { useAside } from '~/components/Aside';

import logo from '~/assets/tentree-logo.svg'

import magnifyingGlass from '~/assets/icons/search-bold.svg'
import shoppingBag from '~/assets/icons/shopping-bag-bold.svg'
import burgerMenu from '~/assets/icons/burger-menu-bold.svg'
import useMobileViewport from '~/hooks/useMobileViewport';
import { CartBadge, SearchToggle } from './HeaderFragments';
import { HeaderMobile } from './HeaderMobile';
import { HeaderDesktop } from './HeaderDesktop';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const { shop, menu } = header;
  const isMobile = useMobileViewport()

  if (isMobile) {
    return <HeaderMobile cart={cart} isLoggedIn={isLoggedIn} />
  }

  return <HeaderDesktop isLoggedIn={isLoggedIn} cart={cart} header={header} publicStoreDomain={publicStoreDomain} />

}


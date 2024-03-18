"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, forwardRef } from "react";

export type CustomNextLinkProps = { activeClassName?: string } & ComponentProps<typeof NextLink>;

const CustomNextLink = forwardRef<HTMLAnchorElement, CustomNextLinkProps>(function CustomNextLink(
  { children, className, activeClassName = "active", ...props },
  ref,
) {
  const pathname = usePathname();

  let isActive = false;
  if (typeof props.href === "string") {
    isActive = pathname === props.href;
  } else {
    isActive = pathname === props.href.pathname;
  }

  return (
    <NextLink ref={ref} {...props} className={`${className ?? ""} ${isActive ? activeClassName : ""}`}>
      {children}
    </NextLink>
  );
});

export default CustomNextLink;

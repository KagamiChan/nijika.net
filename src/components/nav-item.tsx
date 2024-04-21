"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ComponentProps } from "react";
import { cn } from "~/lib/utils";

type NavItemProps = ComponentProps<typeof Link>;

export const NavItem = (props: NavItemProps) => {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={cn(
        {
          "text-foreground": pathname === props.href,
          "text-muted-foreground": pathname !== props.href,
        },
        "whitespace-nowrap transition-colors hover:text-foreground",
        props.className,
      )}
    >
      {props.children}
    </Link>
  );
};

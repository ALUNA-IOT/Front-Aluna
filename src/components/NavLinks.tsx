import Link from "next/link";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, href, children, onClick, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn("text-foreground hover:text-primary transition-colors", className)}
        onClick={onClick}
        {...props}
      >
        {children}
      </Link>
    );
  },
);

NavLink.displayName = "NavLink";

export default NavLink;

export { NavLink };
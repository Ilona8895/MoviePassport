import { type ReactNode } from "react";

type NavBarTypes = {
  children: ReactNode;
};

export function NavBar({ children }: NavBarTypes) {
  return <nav className="nav-bar">{children}</nav>;
}

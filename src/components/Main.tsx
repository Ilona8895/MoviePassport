import { ReactNode } from "react";

type MainTypes = {
  children: ReactNode;
};

export function Main({ children }: MainTypes) {
  return <main className="main">{children}</main>;
}

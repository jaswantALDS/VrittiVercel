import { ReactNode } from "react";

export default function SKAnimation({ children }: { children: ReactNode }) {
  return <div className="animate-pulse">{children}</div>;
}

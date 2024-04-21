import { type ReactNode } from "react";
import { Header } from "./header";
import { Footer } from "./footer";

export const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

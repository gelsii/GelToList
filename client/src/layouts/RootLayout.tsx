import TitleComponent from "@/components/ui/TitleComponent";
import { Outlet } from "react-router";
import ContextProvider from "@/components/ui/ContextProvider";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => {
  return (
    <ContextProvider>
      <main className="w-screen h-screen px-[clamp(1rem,10vw,18rem)] py-4 overflow-x-hidden gap-4 scrollbar-thumb-blue-950 flex flex-col justify-center items-center">
        <Outlet />
        <Toaster />
      </main>
    </ContextProvider>
  );
};

export default RootLayout;

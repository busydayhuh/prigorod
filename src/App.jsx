import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";
import { ScrollUpBtn } from "./components/ui";
import FormContextProvider from "./store/form/FormContextProvider";
import PrevSearchesProvider from "./store/form/PrevSearchesProvider";
import { IsDesktopProvider } from "./store/WindowSizeContext";

function App() {
  return (
    <FormContextProvider>
      <PrevSearchesProvider>
        <IsDesktopProvider>
          <div className="relative">
            <Header />
            <main className="mt-5 md:mt-10 overflow-hidden">
              <Outlet />
            </main>
            <Footer />
            <ScrollUpBtn />
          </div>
        </IsDesktopProvider>
      </PrevSearchesProvider>
    </FormContextProvider>
  );
}

export default App;

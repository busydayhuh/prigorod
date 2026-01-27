import Footer from "@/components/Footer";
import { Outlet } from "react-router";
import Hero from "./components/Hero";
import { ScrollUpBtn } from "./components/ui";
import FormContextProvider from "./store/form/FormContextProvider";
import PrevSearchesProvider from "./store/form/PrevSearchesProvider";
import { IsMobileProvider } from "./store/window-size/IsMobileProvider";

function App() {
  return (
    <FormContextProvider>
      <PrevSearchesProvider>
        <IsMobileProvider>
          <div className="relative">
            <Hero />
            <main className="mt-5 md:mt-10 overflow-hidden">
              <Outlet />
            </main>
            <Footer />
            <ScrollUpBtn />
          </div>
        </IsMobileProvider>
      </PrevSearchesProvider>
    </FormContextProvider>
  );
}

export default App;

import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ScrollUpBtn } from "./components/ui";

function App() {
  return (
    <div className="relative">
      <Header />
      <main className="flex flex-col justify-center gap-10">
        <Outlet />
      </main>
      <Footer />
      <ScrollUpBtn />
    </div>
  );
}

export default App;

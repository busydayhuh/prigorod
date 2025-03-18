import { Outlet } from "react-router";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function App() {
  return (
    <>
      <Header />
      <main className="flex flex-col justify-center gap-10">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
}

export default App;

import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ItemDetails from "./components/ItemDetails";
import CartMenu from "./components/CartMenu";
import Checkout from "./checkout/Checkout";
import Confirmation from "./checkout/Confirmation";
import { useEffect } from "react";

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);

    return null;
  };

  //''
  return (
    <div className="App" style={{background:"linear-gradient(180deg, rgba(247,240,222,1) 0%, rgba(246,235,225,1) 35%, rgba(255,255,255,1) 100%)"}} >
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navbar />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

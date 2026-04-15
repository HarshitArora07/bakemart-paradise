import Navbar from "./components/Navbar";
import AdminOrders from "./pages/AdminOrders";
import Home from "./pages/Home";
import About from "./pages/About";
import TabbedMenuPage from "./pages/TabbedMenuPage";
import Contact from "./pages/Contact";
import Footer from "./components/Footer";
import bgImage from "./assets/bg-main.png";

// Cart system
import { CartProvider } from "./context/CartContext";
import CartButton from "./components/CartButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import CheckoutPage from "./pages/CheckoutPage";

export default function App() {
  return (
    <CartProvider>
      <Router>
        {/* Floating Cart Button */}
        <CartButton />

        {/* Background */}
        <div
          className="relative h-screen bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <div className="absolute inset-0 bg-black/45"></div>

          <div className="relative h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <Navbar />

            <Routes>
              {/* HOME / SINGLE PAGE SCROLL */}
              <Route
                path="/"
                element={
                  <>
                    <section id="home" className="snap-start h-screen">
                      <Home />
                    </section>

                    <section id="about" className="snap-start h-screen">
                      <About />
                    </section>

                    <section id="menu" className="snap-start min-h-screen">
                      <TabbedMenuPage />
                    </section>

                    <section id="contact" className="snap-start h-screen">
                      <Contact />
                      <Footer />
                    </section>
                  </>
                }
              />

              {/* CART & USER ORDERS */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/orders" element={<OrderHistoryPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* ✅ ADMIN ORDERS PAGE */}
              <Route path="/admin/orders" element={<AdminOrders />} />
            </Routes>
          </div>
        </div>
      </Router>
    </CartProvider>
  );
}

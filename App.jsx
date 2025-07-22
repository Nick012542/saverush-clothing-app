import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Page/HomePage";
import ProductPage from "./Page/ProductPage";
import PrivacyPage from "./components/Privacy";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TermsPage from "./components/Terms";
import FAQPage from "./components/FaqPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="product/:productId" element={<ProductPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage/>} />
        <Route path="/faq" element={<FAQPage/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;

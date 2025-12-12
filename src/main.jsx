import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "../src/componentes/header";
import Footer from "./componentes/footer";
import Home from "../src/pages/home";
import ShoppingCart from "../src/pages/ShoppingCart";
import Shop from "../src/pages/Shop";
import ShopDetails from "./pages/ShopDetails";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./pages/painel";
import Dashboard from "./pages/dashboard";
import Usuarios from "./pages/usuarios";
import Produtos from "./pages/produtos";
import Login from "./pages/login";
import Signup from "./pages/cadastro";
import CreateProductPage from "./pages/produtosform";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shopcart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Signup/>} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopdetails" element={<ShopDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Layout />}>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/usuarios" element={<Usuarios/>}></Route>
        <Route path="/admin/produto" element={<Produtos/>}></Route>
        <Route path="/admin/produtoforms" element={<CreateProductPage/>}></Route>
        </Route>
      </Routes>

      <Footer />

    </BrowserRouter>
  </React.StrictMode>
);
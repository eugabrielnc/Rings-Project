import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Adheader from "./componentes/Adheader";
import Subheader from "./componentes/Subheader";
import Header from "../src/componentes/header";
import Footer from "./componentes/footer";
import Home from "../src/pages/home";
import ShoppingCart from "../src/pages/ShoppingCart";
import Layout2 from "./pages/painel2";
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
import MedidaNovo from "./pages/MedidaNovo";
import Vendas from "./pages/vendas";
import EditProductPage from "./pages/editar";
import Carrinho from "./pages/carrinho";
import DadosPessoais from "./pages/dados";
import MeusPedidos from "./pages/rastreio";
import SocialButtons from "./componentes/socialbutton";
import PoliticaGarantiaMain from "./pages/garantia";
import InformacoesPagamentoMain from "./pages/informaçoespagamento";
import TermosUsoMain from "./pages/termosdeuso";
import EditSalePage from "./pages/EditarVenda";
import PoliticaPrivacidadeMain from "./pages/politicap";
import NovaSenha from "./pages/novasenha";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Adheader />
      <Header />
      <Subheader />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/medida" element={<MedidaNovo />} />
        <Route path="/shopcart" element={<ShoppingCart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Signup />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/shopdetails/:id" element={<ShopDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/garantia" element={<PoliticaGarantiaMain />} />
        <Route path="/infopag" element={<InformacoesPagamentoMain/>} />
        <Route path="/termouser" element={<TermosUsoMain/>} />
        <Route path="/novasenha" element={<NovaSenha/>} />
        <Route path="/pag" element={<PoliticaPrivacidadeMain/>} />
        <Route path="/perfil" element={<Layout2/>}>
          <Route path="dados" element={<DadosPessoais />} />
          <Route path="rastreio" element={<MeusPedidos />} />
        </Route>
        <Route path="/admin" element={<Layout />}>
        <Route path="/admin/dashboard" element={<Dashboard/>}></Route>
        <Route path="/admin/usuarios" element={<Usuarios/>}></Route>
        <Route path="/admin/produto" element={<Produtos/>}></Route>
        <Route path="/admin/produtoforms" element={<CreateProductPage/>}></Route>
        <Route path="/admin/vendas" element={<Vendas/>}></Route>
        <Route path="/admin/vendas/editar/:id" element={<EditSalePage/>}></Route>
        <Route path="/admin/carrinho" element={<Carrinho/>}></Route>
        <Route path="/admin/produtos/editar/:id" element={<EditProductPage/>}></Route>

        </Route>
      </Routes>


      <SocialButtons />

      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

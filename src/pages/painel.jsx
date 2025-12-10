import Sidebar from "../componentes/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <main style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
      
      {/* Sidebar fixa no admin */}
      <Sidebar />

      {/* Conteúdo do admin */}
      <section style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </section>

    </main>
  );
}
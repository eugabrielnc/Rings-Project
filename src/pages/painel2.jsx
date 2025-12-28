import Sidebar2 from "../componentes/sidebar2";
import { Outlet } from "react-router-dom";

export default function Layout2() {
  return (
    <main style={{ display: "flex", minHeight: "100vh", background: "#fff" }}>
      
      
      <Sidebar2 />

      {/* Conteúdo do admin */}
      <section style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </section>

    </main>
  );
}
import { useState, useEffect } from "react";
import Sidebar2 from "../componentes/sidebar2";
import { Outlet } from "react-router-dom";

export default function Layout2() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px)");
    const handler = () => setIsMobile(media.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        minHeight: "100vh",
        background: "#fff",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      {/* SIDEBAR */}
      <div
        style={{
          width: isMobile ? "100%" : "260px",
          flexShrink: 0,
        }}
      >
        <Sidebar2 />
      </div>

      {/* CONTEÚDO */}
      <section
        style={{
          flex: 1,
          padding: "20px",
          width: "100%",
          minWidth: 0,
        }}
      >
        <Outlet />
      </section>
    </main>
  );
}
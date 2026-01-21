import { useEffect, useState } from "react";
import Sidebar from "../componentes/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 767
  );

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
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
        
      }}
    >
      <Sidebar />

      <section style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </section>
    </main>
  );
}
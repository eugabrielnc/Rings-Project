import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/Css/sidebar.css"
function Sidebar2() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const mainWrapperClass = isSidebarOpen
        ? "main-wrapper sidebar-open"
        : "main-wrapper";

    const isActive = (path) => {
        const currentPath = location.pathname;

        if (currentPath === path) return true;
        if (currentPath.startsWith(path + "/")) return true;

        return false;
    };

    const menuItems = [
        { label: "Dados Pessoais", icon: "fa-tachometer-alt", path: "/perfil/dados" },
        { label: "Pedidos", icon: "fa-box", path: "/perfil/rastreio" },
        
    ];

    return (
        <div className={mainWrapperClass}>

            <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="menu-title">Painel do Administrador</li>

                            {menuItems.map((item, index) => (
                                <li
                                    key={index}
                                    className={isActive(item.path) ? "active" : ""}
                                >
                                    <Link to={item.path}>
                                        <i className={`fa ${item.icon}`} />{" "}
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar2;

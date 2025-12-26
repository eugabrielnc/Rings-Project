import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../assets/Css/sidebar.css"
function Sidebar() {
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
        { label: "Dashboard", icon: "fa-tachometer-alt", path: "/admin/dashboard" },
        { label: "Produtos", icon: "fa-box", path: "/admin/produto" },
        { label: "Usuários", icon: "fa-users", path: "/admin/usuarios" },
        { label: "Vendas", icon: "fa-cash-register", path: "/admin/vendas" },
        { label: "Carrinho", icon: "fa-cart-shopping", path: "/admin/carrinho" },
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

export default Sidebar;

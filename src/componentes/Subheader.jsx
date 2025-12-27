import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import '../assets/Css/subheader.css';
import MegaMenu from './MegaMenu';

export default function Subheader() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <div 
      className="subheader"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="container-header">
        <div className="row">
          <div className="col-lg-12">
            <nav className="subheader__menu">
              <ul>
                <li className={currentPath === "/" ? "active" : ""}>
                  <Link to="/">Inicio</Link>
                </li>
                <li 
                  className={currentPath === "/shop" ? "active" : ""}
                  onMouseEnter={() => setActiveMenu('aliancas')}
                >
                  <Link to="/shop">
                    Alianças <span className={`arrow ${activeMenu === 'aliancas' ? 'rotate' : ''}`}>▼</span>
                  </Link>
                </li>
                <li 
                  className={currentPath === "/faq" ? "active" : ""}
                  onMouseEnter={() => setActiveMenu('aneis')}
                >
                  <Link to="/faq">
                    Anéis <span className={`arrow ${activeMenu === 'aneis' ? 'rotate' : ''}`}>▼</span>
                  </Link>
                </li>
                <li 
                  className={currentPath === "/about" ? "active" : ""}
                  onMouseEnter={() => setActiveMenu('brincos')}
                >
                  <Link to="/about">
                    Brincos <span className={`arrow ${activeMenu === 'brincos' ? 'rotate' : ''}`}>▼</span>
                  </Link>
                </li>
                <li 
                  className={currentPath === "/blog" ? "active" : ""}
                  onMouseEnter={() => setActiveMenu('pingentes')}
                >
                  <Link to="/blog">
                    Pingentes <span className={`arrow ${activeMenu === 'pingentes' ? 'rotate' : ''}`}>▼</span>
                  </Link>
                </li>
                <li className={currentPath === "/contact" ? "active" : ""}>
                  <Link to="/contact">Contato</Link>
                </li>
                <li className={currentPath === "/medida" ? "active" : ""}>
                  <Link to="/medida">Medidor Virtual</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      
      {/* Mega Menu fora do container */}
      <MegaMenu category={activeMenu} isOpen={activeMenu !== null} />
    </div>
  );
}
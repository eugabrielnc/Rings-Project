import { useLocation, Link } from "react-router-dom";

export default function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="header">
      {/* Top Bar */}
      <div className="header__top">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-7">
              <div className="header__top__left">
                <p>Free shipping, 30-day return or refund guarantee.</p>
              </div>
            </div>

            <div className="col-lg-6 col-md-5">
              <div className="header__top__right">
                <div className="header__top__links">
                  <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    Logar
                  </a>
                  <a href="#">FAQs</a>
                </div>

                <div className="header__top__hover">
                  <span>
                    USD <i className="arrow_carrot-down"></i>
                  </span>
                  <ul>
                    <li>USD</li>
                    <li>EUR</li>
                    <li>BRL</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <div className="row">
          {/* Logo */}
          <div className="col-lg-3 col-md-3">
            <div className="header__logo">
              <a href="/">
                <img src="/img/logo.png" alt="logo" />
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="col-lg-6 col-md-6">
            <nav className="header__menu mobile-menu">
              <ul>
                <li className={currentPath === "/" ? "active" : ""}>
                  <Link to="/">Inicio</Link>
                </li>

                <li className={currentPath === "/shop" ? "active" : ""}>
                  <Link to="/shop">Produtos</Link>
                </li>

                <li
                  className={
                    currentPath === "/about" ||
                    currentPath === "/shop-details" ||
                    currentPath === "/shopping-cart" ||
                    currentPath === "/checkout" ||
                    currentPath === "/blog-details"
                      ? "active"
                      : ""
                  }
                >
                  <a href="#">Paginas</a>
                  <ul className="dropdown">
                    <li><Link to="/about">Sobre nós</Link></li>
                    <li><Link to="/shop-details">Detalhes da Compra</Link></li>
                    <li><Link to="/shopping-cart">Carrinho</Link></li>
                    <li><Link to="/checkout">Check Out</Link></li>
                    <li><Link to="/blog-details">Blog Details</Link></li>
                  </ul>
                </li>

                <li className={currentPath === "/blog" ? "active" : ""}>
                  <Link to="/blog">Blog</Link>
                </li>

                <li className={currentPath === "/contact" ? "active" : ""}>
                  <Link to="/contact">Contato</Link>
                </li>
              </ul>
            </nav>
          </div>

          {/* Icons */}
          <div className="col-lg-3 col-md-3">
            <div className="header__nav__option">
              <a href="#" style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ verticalAlign: 'middle' }}
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </a>

              <a href="#" style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ verticalAlign: 'middle' }}
                >
                  <circle cx="11" cy="11" r="8"/>
                  <path d="m21 21-4.35-4.35"/>
                </svg>
              </a>

              <a href="#" style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ verticalAlign: 'middle' }}
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </a>
                  

              <a href="#" style={{ position: 'relative', display: 'inline-block', color: 'black' }}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{ verticalAlign: 'middle' }}
                >
                  <circle cx="9" cy="21" r="1"/>
                  <circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </a>
              <div className="price">$0.00</div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="canvas__open">
          <i className="fa fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

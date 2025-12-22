import { useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from '../utils/dadosuser'
export default function Header() {


  const navigate = useNavigate();
  const authData = getAuthData();
  const isLogged = !!authData?.token;
  const handleProfileClick = () => {
    const authData = getAuthData();

    if (!authData || !authData.token) {
      navigate("/login");
    } else {
      navigate("/perfil"); // ajuste se sua rota for outra
    }
  };
  const location = useLocation();
  const currentPath = location.pathname;

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const url = import.meta.env.VITE_API_URL;

  // Carregar produtos da API
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${url}/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log("Erro ao carregar produtos", err);
      }
    }

    loadProducts();
  }, [url]);

  // Filtro dos produtos conforme a pesquisa
  useEffect(() => {
    if (!query.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filtered.slice(0, 5));
  }, [query, products]);

  return (
    <header className="header">
      <div className="header__inner">
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

            {/* SEARCH BAR */}
            <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
              <div
                style={{
                  width: "100%",
                  maxWidth: "550px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    borderRadius: "30px",
                    background: "#fff",
                    border: "1px solid #ddd",
                    overflow: "hidden",
                  }}
                >
                  <input
                    type="text"
                    placeholder="Pesquise suas alianças..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: "none",
                      outline: "none",
                      fontSize: "15px",
                    }}
                  />

                  <button
                    style={{
                      background: "white",
                      border: "none",
                      width: "55px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                  </button>
                </div>

                {/* DROPDOWN MELHORADO */}
                {filteredProducts.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      top: "105%",
                      left: 0,
                      right: 0,
                      background: "#fff",
                      borderRadius: "20px",
                      boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      zIndex: 9999,
                      overflow: "hidden",
                    }}
                  >
                    {filteredProducts.map((product, index) => (
                      <Link
                        key={product.id}
                        to={`/shopdetails/${product.id}`}
                        onClick={() => setQuery("")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          padding: "12px 18px",
                          textDecoration: "none",
                          color: "#000",
                          background: "#fff",
                          borderBottom:
                            index !== filteredProducts.length - 1
                              ? "1px solid #f0f0f0"
                              : "none",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#faf7f2")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#fff")
                        }
                      >
                        <img
                          src={`${url}/products/${product.id}/image`}
                          alt={product.name}
                          style={{
                            width: "44px",
                            height: "44px",
                            objectFit: "cover",
                            borderRadius: "10px",
                            border: "1px solid #eee",
                          }}
                        />

                        <div style={{ lineHeight: "1.2" }}>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: 600,
                            }}
                          >
                            {product.name}
                          </div>
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#C9A86A",
                              marginTop: "4px",
                              fontWeight: 500,
                            }}
                          >
                            {product.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Icons */}
            <div className="col-lg-3 col-md-3">
              <div className="header__nav__option">

                {!isLogged ? (
                  <Link
                    to="/login"
                    style={{
                      padding: "8px 32px",
                      borderRadius: "18px",
                      background: "white",
                      color: "#8C6A2D",
                      fontSize: "13px",
                      fontWeight: "500",
                      textDecoration: "none",
                      border: "1px solid #E3D3B5",
                      transition: "all 0.25s ease"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "white";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "white";
                      e.currentTarget.style.borderColor = "white";
                    }}
                  >
                    Fazer login
                  </Link>
                ) : (
                  <>
                    <a href="/perfil">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </a>

                    <a href="#">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    </a>

                    <a href="/shopcart">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                    </a>

                    <div className="price">$0.00</div>
                  </>
                )}

              </div>
            </div>
          </div>

          {/* Menu */}
          <div className="row mt-3">
            <div className="col-lg-12">
              <nav className="header__menu mobile-menu">
                <ul>
                  <li className={currentPath === "/" ? "active" : ""}>
                    <Link to="/">Inicio</Link>
                  </li>
                  <li className={currentPath === "/shop" ? "active" : ""}>
                    <Link to="/shop">Produtos</Link>
                  </li>
                  <li className={currentPath === "/contact" ? "active" : ""}>
                    <Link to="/contact">Contato</Link>
                  </li>
                  <li className={currentPath === "/medida" ? "active" : ""}>
                    <Link to="/medida">Medida Virtual</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="canvas__open">
            <i className="fa fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  );
}

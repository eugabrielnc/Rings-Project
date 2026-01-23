import { useEffect, useState } from "react";
import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import '../assets/Css/elegant-icons.css';
import '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css';
import { getAuthData } from '../utils/dadosuser'
export default function ShoppingCart() {
  const pageStyle = {
    minHeight: "100vh",
    backgroundImage: "url('/img/fundo2.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center top",
    backgroundRepeat: "no-repeat",
    position: "relative",
  };


  const overlayStyle = {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.25)",
    zIndex: 0,
  };

  const contentStyle = {
    position: "relative",
    zIndex: 1,
  };
  const url = import.meta.env.VITE_API_URL;

  const authData = getAuthData();
  const token = authData?.token;
  const [cartTotal, setCartTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const handleDeleteFromCart = async (cartId) => {
    try {
      const response = await fetch(
        `${url}/sales/carts?cart_id=${cartId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: token,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao deletar item do carrinho");
      }

      // Atualiza o carrinho na tela
      setCart((prevCart) =>
        prevCart.filter((item) => item.id !== cartId)
      );
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };
  // 🔹 BUSCAR PRODUTOS
  useEffect(() => {
    fetch(`${url}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erro produtos:", err));
  }, [url]);

  // 🔹 BUSCAR CARRINHO
  useEffect(() => {
    if (!token) return;

    fetch(`${url}/sales/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart:", data);
        setCart(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error("Erro carrinho:", err));
  }, [url, token]);

  // 🔹 COMPARAR productId
  useEffect(() => {
    if (!Array.isArray(products) || !Array.isArray(cart)) {
      setCartProducts([]);
      return;
    }

    const cartIds = cart
      .filter(item => item.status === "cart")
      .map(item => item.product_id);

    const filtered = products.filter(product =>
      cartIds.includes(product.id)
    );

    setCartProducts(filtered);
  }, [products, cart]);

  useEffect(() => {
    if (!cart.length) {
      setCartTotal(0);
      return;
    }

    const total = cart.reduce((sum, item) => {
      const product = products.find(p => p.id === item.product_id);
      if (!product) return sum;

      const quantity = item.amount || 1;
      return sum + product.price * quantity;
    }, 0);

    setCartTotal(total);
  }, [cart, products]);


  return (
    <div style={pageStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>
      <div style={contentStyle}>
        <>



          {/* Shopping Cart */}
          <section className="shopping-cart spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-8">
                  <div className="shopping__cart__table">
                    <table>
                      <thead>
                        <tr>
                          <th>Produto</th>
                          <th>Quantidade</th>
                          <th>Total</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartProducts.length === 0 && (
                          <tr>
                            <td colSpan="4">Carrinho vazio</td>
                          </tr>
                        )}

                        {cartProducts.map((product) => {
                          const cartItem = cart.find(
                            (item) =>
                              item.product_id === product.id &&
                              item.status === "cart"
                          );

                          const quantity = cart.reduce((total, item) => {
                            if (item.product_id === product.id && item.status === "cart") {
                              return total + (item.amount || 1);
                            }
                            return total;
                          }, 0);

                          return (
                            <tr key={product.id} style={{ borderBottom: "1px solid #cfcfcf" }}>
                              <td className="product__cart__item">
                                <div
                                  className="product__cart__item__pic"
                                  style={{
                                    width: "90px",
                                    height: "90px",
                                    overflow: "hidden",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                  }}
                                >
                                  <img
                                    src={`${url}/products/${product.id}/image/1`}
                                    alt={product.name}
                                    style={{
                                      width: "100%",
                                      height: "100%",
                                      objectFit: "cover"
                                    }}
                                  />
                                </div>

                                <div
                                  className="product__cart__item__text"
                                  style={{
                                    paddingLeft: "20px",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center"
                                  }}
                                >
                                  <h6
                                    style={{
                                      color: "#111",
                                      fontSize: "15px",
                                      fontWeight: "600",
                                      marginBottom: "5px",
                                      lineHeight: "1.4",
                                      display: "block"
                                    }}
                                  >
                                    {product.name}
                                  </h6>

                                  <h5
                                    style={{
                                      color: "#111",
                                      fontSize: "16px",
                                      fontWeight: "700"
                                    }}
                                  >
                                    R$ {product.price}
                                  </h5>
                                </div>
                              </td>

                              <td className="quantity__item">
                                <div className="quantity">
                                  <div className="pro-qty-2">
                                    <input type="text" value={quantity} readOnly />
                                  </div>
                                </div>
                              </td>

                              <td className="cart__price">
                                R$ {(product.price * quantity).toFixed(2)}
                              </td>

                              <td className="cart__close" style={{ whiteSpace: "nowrap" }}>
                                {product.checkout_link && (
                                  <a
                                    href={product.checkout_link}
                                    style={{
                                      marginRight: "10px",
                                      padding: "6px 12px",
                                      backgroundColor: "#111",
                                      color: "#fff",
                                      fontSize: "12px",
                                      borderRadius: "4px",
                                      textDecoration: "none",
                                      display: "inline-block"
                                    }}
                                  >
                                    Comprar agora
                                  </a>
                                )}


                                <i
                                  className="fa fa-close"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleDeleteFromCart(cartItem.id)}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>


                    </table>
                  </div>

                  
                </div>

                <div className="col-lg-4">
                  <div className="product__details__option__frete" style={{ marginTop: "20px" }}>
                    <span style={{ display: "block", marginBottom: "10px", fontWeight: 600 }}>
                      Calcular Frete
                    </span>

                    <input
                      type="text"
                      placeholder="Digite seu CEP"
                      maxLength={8}
                      onInput={(e) => {
                        // aceita somente números
                        e.target.value = e.target.value.replace(/\D/g, "");

                        const dropdown = e.target.nextElementSibling;

                        if (e.target.value.length === 8) {
                          dropdown.style.display = "block";
                          dropdown.open = true;
                        } else {
                          dropdown.style.display = "none";
                          dropdown.open = false;
                        }
                      }}
                      style={{
                        width: "100%",
                        height: "45px",
                        padding: "0 15px",
                        border: "1px solid #e1e1e1",
                        borderRadius: "4px",
                        marginBottom: "10px"
                      }}
                    />

                    <details
                      style={{
                        display: "none",
                        border: "1px solid #e1e1e1",
                        borderRadius: "4px",
                        padding: "12px"
                      }}
                    >
                      <summary style={{ cursor: "pointer", fontWeight: 600 }}>
                        Opções de Entrega
                      </summary>

                      <div style={{ marginTop: "10px" }}>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          Frete grátis
                        </p>
                        <p style={{ margin: "4px 0 0", color: "#555" }}>
                          Correios Pac • Prazo estimado:  de 4 a 8 dias úteis a partir da conclusão da fabricação
                        </p>
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          Frete:R$ 20,00
                        </p>
                        <p style={{ margin: "4px 0 0", color: "#555" }}>
                          Correios Sedex • Prazo estimado: de 4 a 6  dias úteis a partir da conclusão da fabricação
                        </p>
                      </div>
                    </details>
                  </div>

                  <div className="cart__total">
                    <h6
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <span>Carrinho total</span>

                      <div
                        style={{
                          position: "relative",
                          display: "inline-block"
                        }}
                      >
                        <img
                          src="/img/png-transparent-background-green-padlock-text-messaging.png"
                          alt="Seguro"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "contain",
                            cursor: "pointer"
                          }}
                          onMouseEnter={(e) => {
                            const tooltip = e.currentTarget.nextSibling;
                            tooltip.style.opacity = "1";
                            tooltip.style.visibility = "visible";
                            tooltip.style.transform = "translateY(0)";
                          }}
                          onMouseLeave={(e) => {
                            const tooltip = e.currentTarget.nextSibling;
                            tooltip.style.opacity = "0";
                            tooltip.style.visibility = "hidden";
                            tooltip.style.transform = "translateY(6px)";
                          }}
                        />

                        <div
                          style={{
                            position: "absolute",
                            top: "110%",
                            right: "0",
                            background: "#f9f9f9",          // branco acinzentado
                            color: "#333",
                            padding: "12px 14px",
                            borderRadius: "8px",
                            fontSize: "12px",
                            lineHeight: "1.5",
                            whiteSpace: "nowrap",
                            border: "1px solid #e0e0e0",    // cinza claro
                            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            opacity: 0,
                            visibility: "hidden",
                            transform: "translateY(6px)",
                            transition: "all 0.2s ease",
                            zIndex: 999
                          }}
                        >
                          <span style={{ color: "#2ecc71", fontWeight: "600" }}>
                            🔒 Site seguro
                          </span>
                          <br />
                          <span>Pagamento protegido</span>
                          <br />
                          <span>Dados criptografados</span>
                        </div>
                      </div>
                    </h6>

                    <ul>
                      <li>
                        Subtotal <span>R$ {cartTotal.toFixed(2)}</span>
                      </li>
                      <li>
                        Total <span>R$ {cartTotal.toFixed(2)}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* Search */}
          <div className="search-model">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="search-close-switch">+</div>
              <form className="search-model-form">
                <input
                  type="text"
                  id="search-input"
                  placeholder="Search here....."
                />
              </form>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

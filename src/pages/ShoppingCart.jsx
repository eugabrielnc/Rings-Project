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

  const inputStyle = {
    width: "100%",
    height: "45px",
    padding: "0 12px",
    border: "1px solid #e1e1e1",
    borderRadius: "4px",
    marginBottom: "10px",
    fontSize: "14px"
  };

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
  const userId = authData?.id;
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState(null);
  const [loadingCep, setLoadingCep] = useState(false);
  const [freightError, setFreightError] = useState("");
  const [freightValue, setFreightValue] = useState(null);
  const [freightLoading, setFreightLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    street: "",
    neighboor: "",
    complement: "",
    city: "",
    state: "",
    sizes: ""
  });


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
    if (!token || !userId) return;

    fetch(`${url}/sales/carts/${userId}`, {
      method: "GET",
      headers: {

      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart:", data);
        setCart(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erro carrinho:", err));
  }, [url, token, userId]);

  // 🔹 COMPARAR productId
  useEffect(() => {
    if (!Array.isArray(products) || !Array.isArray(cart)) {
      setCartProducts([]);
      return;
    }

    // 1️⃣ Agrupa produtos iguais
    const grouped = {};

    cart
      .filter(item => item.status === "cart" && item.products_id)
      .forEach(item => {
        try {
          const parsed = JSON.parse(item.products_id);

          parsed.products_id.forEach((productId, index) => {
            const amount = Number(parsed.products_amount?.[index]) || 1;

            if (!grouped[productId]) {
              grouped[productId] = 0;
            }

            grouped[productId] += amount;
          });
        } catch (e) {
          console.error("Erro ao parsear products_id:", item.products_id);
        }
      });

    // 2️⃣ Junta com os dados reais do produto
    const mergedProducts = Object.entries(grouped)
      .map(([productId, quantity]) => {
        const product = products.find(p => p.id === productId);
        if (!product) return null;

        return {
          ...product,
          quantity
        };
      })
      .filter(Boolean);

    setCartProducts(mergedProducts);
  }, [products, cart]);




  useEffect(() => {
    const total = cartProducts.reduce((sum, product) => {
      return sum + product.price * product.quantity;
    }, 0);

    setCartTotal(total);
  }, [cartProducts]);




  const handleCepSearch = async (value) => {
  const cleanCep = value.replace(/\D/g, "");
  setCep(cleanCep);

  if (cleanCep.length !== 8) {
    setAddress(null);
    return;
  }

  try {
    setLoadingCep(true);
    setFreightError("");

    const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
    const data = await res.json(); // ✅ PRIMEIRO pega o JSON

    if (data.erro) {
      setFreightError("CEP não encontrado");
      setAddress(null);
      return;
    }

    // 🔥 endereço visual
    setAddress({
      city: data.localidade,
      state: data.uf
    });

    // 🔥 dados que vão pro checkout / API
    setCheckoutData(prev => ({
      ...prev,
      state: data.uf,
      city: data.localidade
    }));

    // 🔥 calcula frete
    calculateFreight(data.uf, data.localidade);

  } catch (err) {
    console.error(err);
    setFreightError("Erro ao buscar CEP");
  } finally {
    setLoadingCep(false);
  }
};




  const calculateFreight = async (state, city) => {
    try {
      setFreightLoading(true);

      const res = await fetch(`${url}/freight/calculate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({
          state: state.toLowerCase(),
          city: city.toLowerCase()
        })
      });

      const data = await res.json();
      console.log("Frete calculado:", data);

      // ⚠️ ajuste conforme o retorno real da API
      setFreightValue(Number(data.freight ?? data.value ?? 0));

    } catch (err) {
      console.error("Erro ao calcular frete:", err);
      setFreightValue(null);
    } finally {
      setFreightLoading(false);
    }
  };

  const handleCheckout = async () => {
  // 🔴 validações básicas
  if (
    !checkoutData.state ||
    !checkoutData.city ||
    !checkoutData.street ||
    !checkoutData.neighboor ||
    !cep
  ) {
    alert("Preencha todos os dados obrigatórios");
    return;
  }

  if (cartProducts.length === 0) {
    alert("Carrinho vazio");
    return;
  }

  // 🔹 API espera ARRAY DE STRING
  const products_id = cartProducts.map(p => String(p.id));
  const amounts = cartProducts.map(p => String(p.quantity));

  // 🔹 body FINAL exatamente como a API pede
  const body = {
    products_id,
    amounts,
    user_id: String(userId),
    user_cep: String(cep),
    sizes: checkoutData.sizes || "U",
    status: "finished",
    state: checkoutData.state,
    city: checkoutData.city,
    neighboor: checkoutData.neighboor,
    street: checkoutData.street,
    complement: checkoutData.complement || ""
  };

  console.log("📦 BODY ENVIADO PARA API:", body);

  try {
    const res = await fetch(`${url}/sales/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Erro da API:", data);
      alert(data?.message || "Erro ao finalizar pedido");
      return;
    }

    console.log("✅ Pedido criado:", data);
    alert("✅ Pedido finalizado com sucesso!");

    setShowCheckout(false);

  } catch (err) {
    console.error("❌ Erro checkout:", err);
    alert("Erro ao finalizar pedido");
  }
};





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

                        {cartProducts.map(product => (
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
                                <h6>{product.name}</h6>
                                <h5>R$ {product.price}</h5>
                              </div>
                            </td>

                            <td className="quantity__item">
                              <input
                                type="text"
                                value={product.quantity}
                                readOnly
                                style={{
                                  border: "none",
                                  outline: "none",
                                  background: "transparent",
                                  width: "40px",
                                  textAlign: "center",
                                  fontWeight: "600",
                                  fontSize: "14px",
                                  color: "#111",
                                  pointerEvents: "none" // impede clique
                                }}
                              />

                            </td>

                            <td className="cart__price">
                              R$ {(product.price * product.quantity).toFixed(2)}
                            </td>

                            <td className="cart__close">
                              <i
                                className="fa fa-close"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleDeleteFromCart(product.cartId)}
                              />
                            </td>
                          </tr>
                        ))}
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
                      value={cep}
                      onChange={(e) => handleCepSearch(e.target.value)}
                      style={{
                        width: "100%",
                        height: "45px",
                        padding: "0 15px",
                        border: "1px solid #e1e1e1",
                        borderRadius: "4px",
                        marginBottom: "10px"
                      }}
                    />


                    {loadingCep && (
                      <p style={{ fontSize: "13px", color: "#555" }}>
                        Buscando endereço...
                      </p>
                    )}

                    {freightError && (
                      <p style={{ fontSize: "13px", color: "red" }}>
                        {freightError}
                      </p>
                    )}

                    {address && (
                      <div
                        style={{
                          marginTop: "12px",
                          padding: "10px",
                          border: "1px solid #e1e1e1",
                          borderRadius: "6px",
                          background: "#fff"
                        }}
                      >
                        <p style={{ margin: 0, fontWeight: 600 }}>
                          🚚 Frete
                        </p>

                        {freightLoading ? (
                          <p style={{ fontSize: "13px", marginTop: "6px" }}>
                            Calculando frete...
                          </p>
                        ) : (
                          <p style={{ fontSize: "14px", marginTop: "6px" }}>
                            Correios —{" "}
                            {freightValue === 0 ? (
                              <strong style={{ color: "#2ecc71" }}>
                                Frete grátis
                              </strong>
                            ) : (
                              <strong>
                                R$ {freightValue.toFixed(2)}
                              </strong>
                            )}
                          </p>
                        )}
                      </div>
                    )}

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
                    <button
                      className="primary-btn"
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        padding: "14px",
                        fontSize: "15px",
                        fontWeight: "600"
                      }}
                      disabled={cartProducts.length === 0}
                      onClick={() => setShowCheckout(true)}

                    >
                      Finalizar compra
                    </button>

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



      {/* 🔥 MODAL CHECKOUT */}
      {showCheckout && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              width: "420px",
              background: "#fff",
              borderRadius: "8px",
              padding: "20px"
            }}
          >
            <h5 style={{ marginBottom: "15px" }}>
              📦 Dados de entrega
            </h5>

            <input
              placeholder="Estado"
              value={checkoutData.state}
              onChange={e =>
                setCheckoutData({ ...checkoutData, state: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Cidade"
              value={checkoutData.city}
              onChange={e =>
                setCheckoutData({ ...checkoutData, city: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Rua"
              value={checkoutData.street}
              onChange={e =>
                setCheckoutData({ ...checkoutData, street: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Bairro"
              value={checkoutData.neighboor}
              onChange={e =>
                setCheckoutData({ ...checkoutData, neighboor: e.target.value })
              }
              style={inputStyle}
            />

            <input
              placeholder="Complemento"
              value={checkoutData.complement}
              onChange={e =>
                setCheckoutData({ ...checkoutData, complement: e.target.value })
              }
              style={inputStyle}
            />

            <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
              <button onClick={() => setShowCheckout(false)}>
                Cancelar
              </button>

              <button onClick={handleCheckout}>
                Confirmar pedido
              </button>
            </div>
          </div>
        </div>
      )}

    </div>


  );
}

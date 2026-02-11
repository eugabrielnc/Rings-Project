import { useEffect, useState } from "react";
import Modal from "../componentes/Modal.jsx"
import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import Select from "react-select";
import '../assets/Css/elegant-icons.css';
import '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css';
import { getAuthData } from '../utils/dadosuser'
export default function ShoppingCart() {
  
  const [modalOpen, setModalOpen] = useState(false)
  const [valueFreight, setValueFreight] = useState(100)
  const [selectedProduct, setSelectProduct] = useState({id:"", name:"", productIndex:-1 , selectedIndex:-1 , totalIndex:0 })
  const [productToCheckout, setProductToCheckout] = useState({gravationFemale:"", gravationMascle:"", sizeMascle:0, sizeFemale:0, sizeUniqueRing:0})

  const [selectedStone,setSelectedStone] = useState("")
  const [isStone, setIsStone] = useState(0)
  const [isSoloRing, setIsSoloRing] = useState(true)
  const [isDualRing, setIsDualRing] = useState(false)
 
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '50px',
      borderColor: state.isFocused ? '#d4a574' : '#e1e1e1',
      boxShadow: state.isFocused ? '0 0 0 1px #d4a574' : 'none',
      '&:hover': {
        borderColor: '#d4a574'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#d4a574' : state.isFocused ? '#f5f5f5' : 'white',
      color: state.isSelected ? 'white' : '#111',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: state.isSelected ? '#d4a574' : '#f5f5f5'
      }
    })
  };
 
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
    number: "",
    complement: "",
    city: "",
    state: "",
    cpf: "",
    sizes: [], 
    gravations: [],
    products_id:[],
    stones:[],
    cep:""

  });



  const [cartTotal, setCartTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const handleDeleteFromCart = async (cartId) => {
    try {
      const response = await fetch(
        `${url}/sales/carts?user_id=${cartId}`,
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

  useEffect(() => {

    //console.log((checkoutData.cep)length == 8)

    if((checkoutData?.cep || "").length == 8){

      fetch(`https://viacep.com.br/ws/${checkoutData.cep}/json/`)
      .then(response => response.json())
      .then(data => {setCheckoutData(prev => (
        {...prev,
          street: data["logradouro"],
          city: data["localidade"],
          state:data["estado"],
          neighboor: data["bairro"]
        }))});

      fetch(`${url}/freight/calculate`, {method:'POST',   headers: {
    "Content-Type": "application/json"
  },body: JSON.stringify({state:checkoutData["state"], city:checkoutData["city"]}) })
      .then(res => res.json())
      .then(data => setValueFreight(data))
      .catch(error => console.error(error)) 
      console.log("CHEGOU")


    }



  }, [checkoutData?.cep])



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

  const grouped = {};

  cart
    .filter(item => item.status === "cart" && item.order_infos)
    .forEach(item => {
      let orderInfo;

      try {
        orderInfo = JSON.parse(item.order_infos);
      } catch (err) {
        console.error("Erro ao parsear order_infos:", item.order_infos);
        return;
      }

      const products_id = orderInfo.products_id || [];
      const products_amount = orderInfo.products_amount || [];

      products_id.forEach((productId, index) => {
        const quantity = Number(products_amount[index]) || 1;

        if (!grouped[productId]) {
          grouped[productId] = 0;
        }

        grouped[productId] += quantity;
      });
    });

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
  if (
    !checkoutData.state ||
    !checkoutData.city ||
    !checkoutData.street ||
    !checkoutData.neighboor 
  ) {
    alert("Preencha todos os dados obrigatórios");
    return;
  }

  if (cartProducts.length === 0) {
    alert("Carrinho vazio");
    return;
  }

  // 🔥 exatamente como a API espera
  const products_id = cartProducts.map(p => String(p.id));
const amounts = cartProducts.map(p => p.quantity);

// 🔥 sizes PRECISA ser array
const sizes = cartProducts.map(() => String(checkoutData.sizes || "U"));

  const body = {
  products_id,
  amounts,
  sizes: checkoutData.sizes, // agora é LISTA ✅
  user_id: String(userId),
  user_cep: checkoutData.cep,
  state: checkoutData.state,
  city: checkoutData.city,
  neighboor: checkoutData.neighboor,
  street: checkoutData.street,
  complement: checkoutData.complement || "",
  gravations: checkoutData.gravations,
  cpf: checkoutData.cpf,
  stone: checkoutData.stones,
  number: checkoutData.number

    
};

  console.log("📦 BODY ENVIADO:", body);

  try {
    const res = await fetch(`${url}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Erro API:", data);
      alert(data?.message || "Erro ao finalizar pedido");
      return;
    }

    alert("✅ Pedido finalizado com sucesso! Você será redirecionado para a página de pagamento");
    setShowCheckout(false);
      
    console.log(data)
    window.location.href = data;

  } catch (err) {
    console.error("Erro checkout:", err);
    alert("❌ Erro ao finalizar pedido");
  }
};

useEffect(() => { console.log(checkoutData)}, [checkoutData])


async function FinalizeCheckout(){

  setIsSoloRing(true)
  setIsDualRing(false)
 

  const index = selectedProduct["selectedIndex"] + 1
  const totalIndexCarts = cartProducts.length
   
  const res = await fetch(`${url}/products/${cartProducts[index]?.["id"]}`)
  const data = await res.json()
  const stone = data[0]?.stone
  const typeProduct = data[0]?.type
  console.log(typeProduct, "AQUI")
  setIsStone(stone)

  if(typeProduct == "Brincos" || typeProduct == "Pingentes"){
    setIsSoloRing(false)
  }

  if(cartProducts[index]?.["name"]?.includes("Par") || cartProducts[index]?.["name"]?.includes("par") ){
   setIsSoloRing(false) 
   setIsDualRing(true)
  } 
 if(cartProducts[index]?.["name"]?.includes("+") ){
   setIsSoloRing(true) 
   setIsDualRing(true)
  } 
  if(index > 0){
    const products_id_list = checkoutData.products_id
    const gravations_list = checkoutData.gravations
    const sizes_list = checkoutData.sizes
    const stones_list = checkoutData.stones

    gravations_list.push(`${productToCheckout.gravationMascle}|${productToCheckout.gravationFemale}`)
    sizes_list.push(`${productToCheckout.sizeMascle}|${productToCheckout.sizeFemale}|${productToCheckout.sizeUniqueRing}`)
    products_id_list.push(selectedProduct["id"])  
    stones_list.push(selectedStone)

    setCheckoutData((prev) => ({...prev, products_id:products_id_list, stones:stones_list,
      sizes:sizes_list, gravations:gravations_list }))   

  setSelectedStone("")
  setSelectProduct({id:"", name:"", productIndex:-1 , selectedIndex:-1 , totalIndex:0 })
 setProductToCheckout({gravationFemale:"", gravationMascle:"", sizeMascle:0, sizeFemale:0, sizeUniqueRing:0})
  }
  if(index == totalIndexCarts){
    setModalOpen(false)
    setShowCheckout(true)
    return
  }

 
  setSelectProduct(prev => ({...prev, totalIndex:totalIndexCarts, selectedIndex:index,
    id:cartProducts[index]["id"], name:cartProducts[index]["name"] }) )
  setModalOpen(true)

  }



  // Opções de tamanhos (Aro 10 até 35)
  const sizeOptions = [
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
    { value: 13, label: '13' },
    { value: 14, label: '14' },
    { value: 15, label: '15' },
    { value: 16, label: '16' },
    { value: 17, label: '17' },
    { value: 18, label: '18' },
    { value: 19, label: '19' },
    { value: 20, label: '20' },
    { value: 21, label: '21' },
    { value: 22, label: '22' },
    { value: 23, label: '23' },
    { value: 24, label: '24' },
   { value: 25, label: '25' },
    { value: 26, label: '26' },
    { value: 27, label: '27' },
    { value: 28, label: '28' },
    { value: 29, label: '29' },
    { value: 30, label: '30' },
    { value: 31, label: '31' },
    { value: 32, label: '32' },
    { value: 33, label: '33' },
    { value: 34, label: '34' },
    { value: 35, label: '35' }
  ];




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
                                onClick={() => handleDeleteFromCart(product.id)}
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
                      //onClick={() => setShowCheckout(true)}
                      onClick={() => FinalizeCheckout()}

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
      <Modal  className="Modal" isOpen={modalOpen} onClose={() => console.log()}>
         
          <h5 style={{ marginBottom: "15px" }}>
           Selecione o que foi pedido abaixo 
         </h5>
  
         <div className="container-modal-content">
           <img src={`${url}/products/${selectedProduct["id"]}/image/1`} width="100" height="100"  />
            <p>{selectedProduct["name"]} </p>
         </div>
        {isStone == 1 && (
        <div>

                <div style={{ marginTop: '30px' }}>
                            <h4 style={{
                              fontSize: '16px',
                              fontWeight: '600',
                              color: '#333',
                              marginBottom: '15px',
                              alignItems: 'center'
                            }}>
                              Escolha a cor de pedras
                            </h4>
                            <div className="pedras">
                              <div
                                className={`pedra-item ${selectedStone === 'CRISTAL' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('CRISTAL')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/cristal.png")' }}
                                ></div>

                                <span className="pedras-texto">Cristal</span>
                              </div>

                              <div
                                className={`pedra-item ${selectedStone === 'CITRINO' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('CITRINO')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/citrino.png")' }}
                                ></div>
                                <span className="pedras-texto">Citrino</span>
                              </div>

                              <div
                                className={`pedra-item ${selectedStone === 'AQUAMARINE' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('AQUAMARINE')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/aquamarine.png")' }}
                                ></div>
                                <span className="pedras-texto">Aquamarine</span>
                              </div>
                              <div
                                className={`pedra-item ${selectedStone === 'AMETISTA' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('AMETISTA')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/ametista.png")' }}
                                ></div>
                                <span className="pedras-texto">Ametista</span>
                              </div>
                              <div
                                className={`pedra-item ${selectedStone === 'PRETO' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('PRETO')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/preto.png")' }}
                                ></div>
                                <span className="pedras-texto">Preto</span>
                              </div>
                              <div
                                className={`pedra-item ${selectedStone === 'ROSA' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('ROSA')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/rosa.png")' }}
                                ></div>
                                <span className="pedras-texto">Rosa</span>
                              </div>
                              <div
                                className={`pedra-item ${selectedStone === 'VERDE' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('VERDE')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/verde.png")' }}
                                ></div>
                                <span className="pedras-texto">Verde</span>
                              </div>
                              <div
                                className={`pedra-item ${selectedStone === 'VERMELHO' ? 'selected' : ''}`}
                                onClick={() => setSelectedStone('VERMELHO')}
                              >
                                <div
                                  className="pedra-option"
                                  style={{ backgroundImage: 'url("/img/pedras/vermelho.png")' }}
                                ></div>
                                <span className="pedras-texto">Vermelho</span>
                              </div>
                            </div>
                          </div>
 
        </div>
        )}
    {isDualRing  ? (
        <div className="modal-grid-form">

          <div className="column-form">
              
            <div className="client-field">   
              <label>Tamanho (aliança feminina) </label>
              <Select
              styles={customStyles}
              options={sizeOptions}
              value={sizeOptions.find(
                opt => opt.value === checkoutData.sizeFemale
                )}

              onChange={(options) =>
                setProductToCheckout({ ...productToCheckout, sizeFemale: options.value})
              }
              />
          </div>  
              <div className="client-field">   
                <label>Gravação (aliança feminina) </label>
                <input
                placeholder="CEP"
              value={productToCheckout.gravationFemale }                
              onChange={(e) =>
                  setProductToCheckout({ ...productToCheckout, gravationFemale: e.target.value })
                   }
                  />
              </div>  
          </div>
      
          <div className="column-form">
              <div className="client-field">   
              <label>Tamanho (aliança masculina) </label>
              <Select
              styles={customStyles}
              options={sizeOptions}
              value={sizeOptions.find(
                opt => opt.value === checkoutData.sizeMascle
                )}
              onChange={options =>
                setProductToCheckout({ ...productToCheckout, sizeMascle: options.value })
              }
              />
               </div>  
          
              <div className="client-field">   
                 <label>Gavação (aliança masculina) </label>
                 <input
                 placeholder="Escolha a gravação"
                 value={productToCheckout.gravationMascle}
                 onChange={e =>
                   setProductToCheckout({ ...productToCheckout, gravationMascle: e.target.value })
                   }
                  />
              </div>  
            
            </div>

          </div>
    

    ): null}
    {isSoloRing  ? (

      <div  className="modal-grid-form" >
      <div className="client-field">   
              <label>Tamanho (aliança solitaria) </label>
              <Select
               styles={customStyles}
               placeholder="Escolha o tamanho..."
               options={sizeOptions}
               value={sizeOptions.find(
                opt => opt.value === checkoutData.sizeUniqueRing
                )}
              onChange={(option) =>
                setProductToCheckout({ ...productToCheckout, sizeUniqueRing: option.value })
              }
              isSearchable={false}
              />
          </div>
      </div>

    ): null}

        <section className="form-buttons">
          <button onClick={FinalizeCheckout}>
            Avançar
          </button>
 
          <button onClick={() => setModalOpen(false)}>
             Fechar
          </button>
        
        </section>
       
        
      </Modal>

           <Modal  className="Modal" isOpen={showCheckout} onClose={() => console.log()}>
         
          <h5 style={{ marginBottom: "15px" }}>
           📦 Dados de entrega
         </h5>
                  
        


        <div className="modal-grid-form">
          <div className="column-form">
              <div className="client-field">   
              <label>Cep </label>
              <input
              placeholder="CEP"
              value={checkoutData.cep}
              onChange={e =>
                setCheckoutData({ ...checkoutData, cep: e.target.value })
              }
              />
            <div className="client-field">   
              <label>Estado </label>
              <input 
              placeholder="Estado"
              value={checkoutData.state}
              onChange={e =>
              setCheckoutData({ ...checkoutData, state: e.target.value })
              }    
              />     
            </div>   
          </div>  

                   
          </div>
      
        <div className="column-form">
          <div className="client-field">   
            <label>Cidade </label>
            <input
              placeholder="Cidade"
              value={checkoutData.city}
              onChange={e =>
                setCheckoutData({ ...checkoutData, city: e.target.value })
              }
            />
          <div className="client-field">   
            <label>Bairro </label>         
            <input
              placeholder="Bairro"
              value={checkoutData.neighboor}
              onChange={e =>
                setCheckoutData({ ...checkoutData, neighboor: e.target.value })
              }
            />

          </div> 
         </div>  
          </div>  
          
          
          <div className="column-form">   
          <div className="client-field">   
            <label>Rua </label>
            <input
              placeholder="Rua"
              value={checkoutData.street}
              onChange={e =>
                setCheckoutData({ ...checkoutData, street: e.target.value })
              }
            />
          </div>  
 
          <div className="client-field">   
              <label>Número da casa </label>         
                <input
                placeholder="Número"
                value={checkoutData.number}
                onChange={e =>
                setCheckoutData({ ...checkoutData, number: e.target.value })
                 }
               />
            </div>  
          </div>  

          
          <div className="column-form">   
           

          <div className="client-field">   
            <label>Complemento</label>
            <input
              placeholder="Complemento (opcional)"
              value={checkoutData.complement}
              onChange={e =>
                setCheckoutData({ ...checkoutData, complement: e.target.value })
              }
            />
             <div className="client-field">   
                <label>CPF </label>
                <input
                placeholder="CPF"
                value={checkoutData.cpf}
                onChange={e =>
                   setCheckoutData({ ...checkoutData, cpf: e.target.value })
                   }
                />
             </div> 
          </div>  
          </div>  
            
        </div>


        <section className="form-buttons">
          <button onClick={() => handleCheckout()}>
           Comprar
          </button>
 
          <button onClick={() => setShowCheckout(false)}>
             Fechar
          </button>
        
        </section>
       
        
      </Modal>
    </div>

  );
}

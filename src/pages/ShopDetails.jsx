import React, { useEffect, useState } from "react";
import Modal from "../componentes/Modal.jsx"
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function ShopDetails() {

  const [valueFreight, setValueFreight] = useState(100)

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



  useEffect(() => {
    // set-bg -> transforma data-setbg em backgroundImage inline (substitui o script jQuery do template)
    const setBgElems = document.querySelectorAll(".set-bg");
    setBgElems.forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      if (bg) el.style.backgroundImage = `url(${bg})`;
    });
  }, []);
  const [product, setProduct] = useState({});
  const [selectedMascleSize, setSelectedMascleSize] = useState(null);
  const [selectedFemaleSize, setSelectedFemaleSize] = useState(null);

  const [selectedAmount, setSelectedAmount] = useState(1);

  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [gravacaoMasculino, setGravacaoMasculino] = useState('');
  const [gravacaoFeminino, setGravacaoFeminino] = useState('');
  const [selectedStone, setSelectedStone] = useState('');
  const [productImages, setProductImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const MAX_RETRIES = 10;
  const [thumbRetry, setThumbRetry] = useState({});
  const [thumbLoaded, setThumbLoaded] = useState({});
  const [thumbHidden, setThumbHidden] = useState({});
  const [thumbAttempts, setThumbAttempts] = useState({});

  const [checkoutData, setCheckoutData] = useState({})
  const [modalOpen, setModalOpen] = useState(false)

  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  function retryThumb(index) {
    setThumbAttempts(prev => {
      const attempts = (prev[index] || 0) + 1;

      if (attempts > MAX_RETRIES) {
        // parou de tentar → esconde
        setThumbHidden(h => ({ ...h, [index]: true }));
        return prev;
      }

      setThumbRetry(r => ({
        ...r,
        [index]: Date.now(),
      }));

      return { ...prev, [index]: attempts };
    });
  }




  const handleAddSimilarToCart = async (produto) => {
    try {
      const authData = getAuthData();

      if (!authData || !authData?.token) {
        alert("Você precisa estar logado para adicionar ao carrinho.");
        navigate("/login");
        return;
      }

      const body = {
        value: produto.price,
        product_id: produto.id,
        amount: 1,
        user_cep: "",
        authorization: authData.token,
        sizes: "",
        status: "cart",
        code: "",
        state: "",
        city: "",
        neighboor: "",
        street: "",
        complement: ""
      };

      const response = await fetch(`${url}/sales/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${authData.token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar ao carrinho");
      }

      const data = await response.json();
      console.log("Adicionado ao carrinho:", data);

    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar ao carrinho");
    }
  };

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


  useEffect(() => {

    //console.log((checkoutData.cep)length == 8)

    if((checkoutData?.cep || "").length == 8){

      fetch(`https://viacep.com.br/ws/${checkoutData.cep}/json/`)
      .then(response => response.json())
      .then(data => {setCheckoutData(prev => (
        {...prev,
          street: data["logradouro"],
          city: data["localidade"],
          state:data["estado"]
          
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



  // Estilos customizados para o react-select
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
  // Buscar produto atual e produtos relacionados em paralelo
  useEffect(() => {
    setLoading(true);

    // Fazer ambas requisições ao mesmo tempo
    Promise.all([
      fetch(`${url}/products/${id}`).then(res => res.json()),
      fetch(`${url}/products/`).then(res => res.json())
    ])
      .then(([productData, allProducts]) => {
        console.log("Product Details:", productData);
        console.log("Todos os produtos:", allProducts);

        setProduct(productData[0] || {});
        setProdutos(allProducts || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });



    if (!id) return;

    setProductImages([]);

    setProductImages([
      `${url}/products/${id}/image/1`,
      `${url}/products/${id}/image/2`,
      `${url}/products/${id}/image/3`,
      `${url}/products/${id}/image/4`,
    ]);
  },
    [id, url]);
  const navigate = useNavigate();

  const addToCart = async () => {
    try {
      const authData = getAuthData();

      if (!authData || !authData?.token) {
        alert("Você precisa estar logado para adicionar ao carrinho.");
        navigate("/login");
        return;
      }

      // validações básicas
      if (!selectedMascleSize || !selectedFemaleSize) {
        alert("Selecione os tamanhos antes de continuar.");
        return;
      }

      if (product.stone === 1 && !selectedStone) {
        alert("Selecione a cor da pedra.");
        return;
      }

      const body = {
        products_id: [product.id],
        amounts: [selectedAmount],
        sizes: [
          `masc:${selectedMascleSize.value}|fem:${selectedFemaleSize.value}`
        ],
        gravations:[`grav_m:${gravacaoMasculino}|grav_f:${gravacaoFeminino}`],
        stone:`pedra:${selectedStone}`,
        user_id: authData?.user?.id || authData?.id,
        user_cep: checkoutData?.cep || "",
        cpf: checkoutData?.state || "",
        state: checkoutData?.state || "",
        city: checkoutData?.city || "",
        neighboor:  checkoutData?.neighboor || "",
        street: checkoutData?.street || "",
        number:  checkoutData?.number || "",
        complement: checkoutData?.complement || ""
      };

      const response = await fetch(`${url}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          Authorization: `Bearer ${authData.token}`
        },
        body: JSON.stringify(body)
      });

      /*
      if (!response.ok) {
        throw new Error("Erro ao adicionar ao carrinho");
      }
      */

      const data = await response.json();
      console.log("Produto adicionado ao carrinho:", data);

      alert("Produto adicionado ao carrinho 🛒");

      window.location.href = data;
      //navigate("/shopcart");

    } catch (error) {
      console.error(error);
    }
  };


  // Mostrar loading enquanto carrega
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <div className="spinner-border text-warning" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="sr-only">Carregando...</span>
        </div>
        <p style={{ color: '#666', fontSize: '16px' }}>Carregando produto...</p>
      </div>
    );




    function retryImage(index) {
      setRetryCount((prev) => ({
        ...prev,
        [index]: (prev[index] || 0) + 1,
      }));
    }
  }
  return (

    <div style={pageStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>

      <Modal  className="Modal" isOpen={modalOpen} onClose={() => console.log()}>
         
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
          </div>  

           <div className="client-field">   
            <label>Valor do frete</label>
            <label>{valueFreight == 0 ? "Grátis" : valueFreight   }</label>
            
           </div>        
          </div>
      
        <div className="column-form">
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
          <div className="client-field">   
            <label>Cidade </label>
            <input
              placeholder="Cidade"
              value={checkoutData.city}
              onChange={e =>
                setCheckoutData({ ...checkoutData, city: e.target.value })
              }
            />
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
            <label>Bairro </label>         
            <input
              placeholder="Bairro"
              value={checkoutData.neighboor}
              onChange={e =>
                setCheckoutData({ ...checkoutData, neighboor: e.target.value })
              }
            />

          </div>  

          <div className="client-field">   
            <label>Complemento</label>
            <input
              placeholder="Complemento (opcional)"
              value={checkoutData.complement}
              onChange={e =>
                setCheckoutData({ ...checkoutData, complement: e.target.value })
              }
            />
          </div>  
          </div>  
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


        <section className="form-buttons">
          <button onClick={() => addToCart()}>
           Comprar
          </button>
 
          <button onClick={() => setModalOpen(false)}>
             Fechar
          </button>
        
        </section>
       
        
      </Modal>
      <div style={contentStyle}>
      
        <>
          {/* Shop Details Section Begin */}
          <section className="shop-details"
            style={{ background: "transparent" }}>
            <div className="product__details__pic"
              style={{ background: "transparent" }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="product__details__breadcrumb">
                      <a href="./index.html">Home</a>
                      <a href="./shop.html">Shop</a>
                      <span>Product Details</span>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-3 col-md-3">
                  </div>
                  <div className="col-lg-6 col-md-9">
                    <div className="tab-content">
                      <div className="tab-pane active" id="tabs-1" role="tabpanel">
                        <div className="product__details__pic__item">
                          <img
                            src={`${url}/products/${id}/image/${selectedImageIndex + 1}`}
                            alt={product.name}
                            style={{ width: "100%", borderRadius: 8 }}
                            onError={(e) => {
                              e.target.src = "/img/placeholder.png";
                            }}
                          />



                        </div>
                      </div>
                      {productImages.length > 0 && (
                        <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                          {productImages.map((img, index) => {
                            if (thumbHidden[index]) return null;

                            const retry = thumbRetry[index] || 0;
                            const loaded = thumbLoaded[index];

                            return (
                              <div
                                key={index}
                                onClick={() => {
                                  setSelectedImageIndex(index);
                                  retryThumb(index);
                                }}
                                style={{
                                  width: 70,
                                  height: 70,
                                  borderRadius: 6,
                                  overflow: "hidden",
                                  border:
                                    selectedImageIndex === index
                                      ? "2px solid #d4a574"
                                      : "1px solid #ccc",
                                  position: "relative",
                                  cursor: "pointer",
                                  background: "#f2f2f2",
                                }}
                              >
                                {!loaded && (
                                  <div
                                    style={{
                                      position: "absolute",
                                      inset: 0,
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: 11,
                                      color: "#999",
                                      background: "#f2f2f2",
                                    }}
                                  >
                                    carregando…
                                  </div>
                                )}

                                <img
                                  src={`${img}?r=${thumbRetry[index] || 0}`}
                                  alt={`Miniatura ${index + 1}`}
                                  onLoad={(e) => {
                                    const isEmpty =
                                      e.target.naturalWidth === 0 ||
                                      e.target.currentSrc.endsWith("/ ");

                                    if (isEmpty) {
                                      // imagem vazia → não tenta mais
                                      setThumbHidden(prev => ({ ...prev, [index]: true }));
                                      return;
                                    }

                                    // imagem válida
                                    setThumbLoaded(prev => ({ ...prev, [index]: true }));
                                  }}
                                  onError={() => {
                                    // erro real → tenta novamente
                                    setTimeout(() => retryThumb(index), 700);
                                  }}
                                  style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    opacity: thumbLoaded[index] ? 1 : 0,
                                    transition: "opacity 0.3s ease",
                                  }}
                                />


                              </div>
                            );
                          })}
                        </div>
                      )}






                    </div>

                    {/* Conteúdo do produto logo abaixo da foto */}
                    <div className="product__details__text" style={{ marginTop: '20px' }}>
                      <h4>{product.name || ""}</h4>
                      <div className="rating">
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star" />
                        <i className="fa fa-star-o" />
                        <span> - 5 Reviews</span>
                      </div>
                      <h3>
                        R$ {product.price ? Number(product.price).toFixed(2) : '0.00'}
                      </h3>
                      <div className="product__details__option">
                        <div className="products_details">
                          <div className="product__details__option__size">
                            <span style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                              Selecione o Tamanho  (Masculino):
                            </span>
                            <Select
                              options={sizeOptions}
                              value={selectedMascleSize}
                              onChange={setSelectedMascleSize}
                              styles={customStyles}
                              placeholder="Escolha o tamanho..."
                              isSearchable={false}
                            />
                            {selectedMascleSize && (
                              <p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                                <i className="fa fa-info-circle" style={{ marginRight: '5px' }}></i>
                                Não sabe seu tamanho? <a href="/medida" style={{ color: '#d4a574', fontWeight: '600' }}>Meça aqui!</a>
                              </p>
                            )}

                            {/* Campo de Gravação Masculino */}
                            <div style={{ marginTop: '20px' }}>
                              <p style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
                                Gravação (Masculino):
                              </p>
                              <input
                                type="text"
                                value={gravacaoMasculino}
                                onChange={(e) => setGravacaoMasculino(e.target.value)}
                                placeholder="Digite o texto para gravação..."
                                maxLength={15}
                                style={{
                                  width: '100%',
                                  padding: '12px 15px',
                                  border: '1px solid #e1e1e1',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  outline: 'none',
                                  boxShadow: 'none'
                                }}
                              />
                              <p style={{ marginTop: '5px', fontSize: '12px', color: '#999' }}>
                                Máximo 15 caracteres ({gravacaoMasculino.length}/15)
                              </p>
                            </div>
                          </div>

                          <div className="product__details__option__size">
                            <span style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                              Selecione o Tamanho  (Feminino):
                            </span>
                            <Select
                              options={sizeOptions}
                              value={selectedFemaleSize}
                              onChange={setSelectedFemaleSize}
                              styles={customStyles}
                              placeholder="Escolha o tamanho..."
                              isSearchable={false}
                            />

                            <p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                              <i className="fa fa-info-circle" style={{ marginRight: '5px' }}></i>
                              Não sabe seu tamanho? <a href="/medida" style={{ color: '#d4a574', fontWeight: '600' }}>Meça aqui!</a>
                            </p>


                            {/* Campo de Gravação Feminino */}
                            <div style={{ marginTop: '20px' }}>
                              <p style={{ display: 'block', marginBottom: '10px', fontWeight: '600', color: '#333' }}>
                                Gravação (Feminino):
                              </p>
                              <input
                                type="text"
                                value={gravacaoFeminino}
                                onChange={(e) => setGravacaoFeminino(e.target.value)}
                                placeholder="Digite o texto para gravação..."
                                maxLength={15}
                                style={{
                                  width: '100%',
                                  padding: '12px 15px',
                                  border: '1px solid #e1e1e1',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                  outline: 'none',
                                  boxShadow: 'none'
                                }}
                              />
                              <p style={{ marginTop: '5px', fontSize: '12px', color: '#999' }}>
                                Máximo 15 caracteres ({gravacaoFeminino.length}/15)
                              </p>
                            </div>
                          </div>
                        </div>
                        {product.stone === 1 && (

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
                        )}
                      </div>
                      <div className="product__details__cart__option">
                        <div className="quantity">
                          <div className="pro-qty">
                            <input type="text" defaultValue={1} onChange={(e) => setSelectedAmount(e.target.value)} />
                          </div>
                        </div>
                        <button
                          type="button"
                          className="primary-btn"
                          style={{ borderRadius: '10px' }}
                          onClick={() => setModalOpen(true)}
                        >
                          Comprar
                        </button>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Shop Details Section End */}

          {/* Related Section Begin */}
          <section className="related spad">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <h3 className="related-title">Produtos Semelhantes</h3>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={30}
                    slidesPerView={4}
                    navigation={{
                      nextEl: '.swiper-button-next-related',
                      prevEl: '.swiper-button-prev-related',
                    }}
                    breakpoints={{
                      320: {
                        slidesPerView: 2,
                        spaceBetween: 15
                      },
                      576: {
                        slidesPerView: 2,
                        spaceBetween: 20
                      },
                      768: {
                        slidesPerView: 3,
                        spaceBetween: 25
                      },
                      992: {
                        slidesPerView: 4,
                        spaceBetween: 30
                      }
                    }}
                    className="product-swiper"
                  >
                    {produtos
                      .slice()
                      .sort((a, b) => b.sales - a.sales)
                      .slice(0, 8)
                      .map((produtos) => (
                        <SwiperSlide key={produtos.id}>
                          <div className="product__item">
                            <div className="product__item__pic" style={{ position: 'relative', paddingBottom: '100%', background: '#f5f5f5' }}>
                              <img
                                src={`${url}/products/${produtos.id}/image/1`}
                                alt={produtos.name}
                                style={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  position: 'absolute',
                                  top: 0,
                                  left: 0
                                }}
                                onError={(e) => {
                                  e.target.src = "/img/placeholder.png";
                                }}
                              />

                              <span className="label">New</span>

                              <ul className="product__hover">
                                <li>
                                  <a href="#">
                                    <img src="/img/icon/heart.png" alt="" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <img src="/img/icon/compare.png" alt="" /> <span>Compare</span>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <img src="/img/icon/search.png" alt="" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div className="product__item__text">
                              <h6>{produtos.name}</h6>
                              <div className="rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                              <h5 className="old-price">R$ {(Math.floor(produtos.price * 2) + 0.90).toFixed(2)}</h5>
                              <h5>R$ {produtos.price ? Number(produtos.price).toFixed(2) : '0.00'}</h5>
                              <a onClick={() => navigate(`/shopdetails/${produtos.id}`)} className="add-cart">
                                Ver detalhes
                              </a>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>

                  {/* Navigation Arrows */}
                  <div className="swiper-button-prev-related swiper-nav-arrow">
                    <i className="fa fa-angle-left"></i>
                  </div>
                  <div className="swiper-button-next-related swiper-nav-arrow">
                    <i className="fa fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Related Section End */}



          {/* Search Begin */}
          <div className="search-model">
            <div className="h-100 d-flex align-items-center justify-content-center">
              <div className="search-close-switch">+</div>
              <form className="search-model-form">
                <input type="text" id="search-input" placeholder="Search here....." />
              </form>
            </div>
          </div>
          {/* Search End */}
        </>
      </div>
    
    </div>
  );
}

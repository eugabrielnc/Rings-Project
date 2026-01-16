import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../utils/dadosuser";

// NOTE:
// - This component is a direct JSX conversion of the original HTML template.
// - It does not include the original jQuery plugin initializations (owl.carousel, magnific-popup, etc.).
//   If you need those behaviors, import the corresponding libraries or implement React-friendly alternatives.
// - Add the CSS files (bootstrap, font-awesome, style.css, etc.) to your index.html or import them in your main entry.

export default function ShopDetails() {
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
  const url = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  // Opções de tamanhos (Aro 18 até 27)
  const sizeOptions = [
    { value: 18, label: 'Aro 18' },
    { value: 19, label: 'Aro 19' },
    { value: 20, label: 'Aro 20' },
    { value: 21, label: 'Aro 21' },
    { value: 22, label: 'Aro 22' },
    { value: 23, label: 'Aro 23' },
    { value: 24, label: 'Aro 24' },
    { value: 25, label: 'Aro 25' },
    { value: 26, label: 'Aro 26' },
    { value: 27, label: 'Aro 27' }
  ];

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
  }, [id, url]);
  const navigate = useNavigate();
  const imageUrl = `${url}/products/${id}/image`;
  const handleBuy = async () => {

    {
      const authData = getAuthData();

      if (!authData || !authData?.token) {
        alert("Você precisa estar logado para comprar.");
        navigate("/login");
        return;
      }

      const responseNewSale = await fetch(`${url}/sales`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          value: product.price * selectedAmount,
          product_id: product.id,
          amount: selectedAmount,
          user_cep: "",
          authorization: authData.token,
          sizes: `fem:${selectedFemaleSize.value},masc:${selectedMascleSize.value}/fem:${gravacaoFeminino},masc:${gravacaoMasculino}, pedra:${selectedStone}`,
          status: "aguardando pagamento",
          code: "",
          state: "",
          city: "",
          neighboor: "",
          street: "",
          complement: ""

        })


      });

      if (responseNewSale.status == 200) {
        const checkoutUrl = product.checkout_link || id;

        if (!checkoutUrl) {
          alert("Checkout indisponível.");
          return;
        }

        window.location.href = checkoutUrl;
      }
    };
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
  }

  return (
    <>
      {/* Shop Details Section Begin */}
      <section className="shop-details">
        <div className="product__details__pic">
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
                        src={imageUrl}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src = "/img/placeholder.png";
                        }}
                      />
                    </div>
                  </div>
                  
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
                      <span style={{ display: 'block', marginBottom: '10px', fontWeight: '600'  }}>
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
                      {selectedFemaleSize && (
                        <p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                          <i className="fa fa-info-circle" style={{ marginRight: '5px' }}></i>
                          Não sabe seu tamanho? <a href="/medida" style={{ color: '#d4a574', fontWeight: '600' }}>Meça aqui!</a>
                        </p>
                      )}

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
                  <div className="product__details__cart__option">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input type="text" defaultValue={1} onChange={(e) => setSelectedAmount(e.target.value)} />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primary-btn"
                      style={{borderRadius: '10px'}}
                      onClick={handleBuy}
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
            {produtos
              .slice()
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 4)
              .map((produtos) => (
                <div
                  key={produtos.id}
                  className="col-lg-3 col-md-6 col-sm-6 col-sm-6"
                >
                  <div className="product__item">
                    <div className="product__item__pic">
                      <img
                        src={`${url}/products/${produtos.id}/image`}
                        alt={produtos.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/img/placeholder.png";
                        }}
                      />

                      <span className="label">New</span>

                      <ul className="product__hover">
                        <li>
                          <a href="#">
                            <img src="img/icon/heart.png" alt="" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="img/icon/compare.png" alt="" /> <span>Compare</span>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <img src="img/icon/search.png" alt="" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="product__item__text">
                      <h6>{produtos.name}</h6>
                      <div className="rating">
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                        <i className="fa fa-star-o" />
                      </div>
                      <h5>${produtos.price ? Number(produtos.price).toFixed(2) : '0.00' || "Carregando"}</h5>
                      <a href="#" className="add-cart">
                        Adicionar ao carrinho
                      </a>
                      <br />
                      <a onClick={() => navigate(`/shopdetails/${produtos.id}`)} className="add-cart">
                        Ver
                      </a>
                    </div>
                  </div>
                </div>
              ))}
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
  );
}

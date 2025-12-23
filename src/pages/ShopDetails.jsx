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
  const [selectedSize, setSelectedSize] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
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
 const handleBuy = () => {
   {
    const authData = getAuthData();
    console.log("AuthData:", authData);
    if (!authData || !authData?.token ) {
      alert("Você precisa estar logado para comprar.");
      navigate("/login");
      return;
    }

     const checkoutUrl = product.checkout_link || id;

  if (!checkoutUrl) {
    alert("Checkout indisponível.");
    return;
  }

  window.location.href = checkoutUrl;
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
            product
            <div className="row">
              <div className="col-lg-3 col-md-3">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                      <div className="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-1.png"></div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                      <div className="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-2.png"></div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                      <div className="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-3.png"></div>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                      <div className="product__thumb__pic set-bg" data-setbg="img/shop-details/thumb-4.png">
                        <i className="fa fa-play" />
                      </div>
                    </a>
                  </li>
                </ul>
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
                  <div className="tab-pane" id="tabs-2" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src="img/shop-details/product-big-3.png" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-3" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src="img/shop-details/product-big.png" alt="" />
                    </div>
                  </div>
                  <div className="tab-pane" id="tabs-4" role="tabpanel">
                    <div className="product__details__pic__item">
                      <img src="img/shop-details/product-big-4.png" alt="" />
                      <a
                        href="https://www.youtube.com/watch?v=8PJ3_p7VqHw&list=RD8PJ3_p7VqHw&start_radio=1"
                        className="video-popup"
                      >
                        <i className="fa fa-play" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="product__details__content">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-lg-8">
                <div className="product__details__text">
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
                  <p>
                    Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable
                    cuff tabs, adjustable asymmetric hem with elastic side tabs and a front zip fastening with
                    placket.
                  </p>
                  <div className="product__details__option">
                    <div className="product__details__option__size">
                      <span style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
                        Selecione o Tamanho (Aro):
                      </span>
                      <Select
                        options={sizeOptions}
                        value={selectedSize}
                        onChange={setSelectedSize}
                        styles={customStyles}
                        placeholder="Escolha o tamanho..."
                        isSearchable={false}
                      />
                      {selectedSize && (
                        <p style={{ marginTop: '10px', fontSize: '13px', color: '#666' }}>
                          <i className="fa fa-info-circle" style={{ marginRight: '5px' }}></i>
                          Não sabe seu tamanho? <a href="/medida" style={{ color: '#d4a574', fontWeight: '600' }}>Meça aqui!</a>
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="product__details__cart__option">
                    <div className="quantity">
                      <div className="pro-qty">
                        <input type="text" defaultValue={1} />
                      </div>
                    </div>
                    <button
                      type="button"
                      className="primary-btn"
                      onClick={handleBuy}
                    >
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="product__details__tab">
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" data-toggle="tab" href="#tabs-5" role="tab">
                        Description
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#tabs-6" role="tab">
                        Customer Previews(5)
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" data-toggle="tab" href="#tabs-7" role="tab">
                        Additional information
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane active" id="tabs-5" role="tabpanel">
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                          Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus
                          faucibus an sullamcorper mattis drostique des commodo pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features many of the same capabilities as a
                            modern PC. These handy little devices allow individuals to retrieve and store e-mail
                            messages, create a contact file, coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is labeled as a Pocket PC must be accompanied
                            with specific software to operate the unit and must feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the cost of a Pocket PC was substantial
                            during it’s early release. For approximately $700.00, consumers could purchase one of
                            top-of-the-line Pocket PCs in 2003. These days, customers are finding that prices have
                            become much more reasonable now that the newness is wearing off. For approximately
                            $350.00, a new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none natural quality’s. Made from synthetic
                            materials, not natural like wool. Polyester suits become creased easily and are known for
                            not being breathable. Polyester suits tend to have a shine to them compared to wool and
                            cotton suits, this can make the suit look cheap. The texture of velvet is luxurious and
                            breathable. Velvet is a great choice for dinner party jacket and can be worn all year round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-6" role="tabpanel">
                      <div className="product__details__tab__content">
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features many of the same capabilities as a
                            modern PC. These handy little devices allow individuals to retrieve and store e-mail
                            messages, create a contact file, coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is labeled as a Pocket PC must be accompanied
                            with specific software to operate the unit and must feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the cost of a Pocket PC was substantial
                            during it’s early release. For approximately $700.00, consumers could purchase one of
                            top-of-the-line Pocket PCs in 2003. These days, customers are finding that prices have
                            become much more reasonable now that the newness is wearing off. For approximately
                            $350.00, a new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none natural quality’s. Made from synthetic
                            materials, not natural like wool. Polyester suits become creased easily and are known for
                            not being breathable. Polyester suits tend to have a shine to them compared to wool and
                            cotton suits, this can make the suit look cheap. The texture of velvet is luxurious and
                            breathable. Velvet is a great choice for dinner party jacket and can be worn all year round.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="tabs-7" role="tabpanel">
                      <div className="product__details__tab__content">
                        <p className="note">
                          Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                          Pellentesque diam dolor, elementum etos lobortis des mollis ut risus. Sedcus faucibus an
                          sullamcorper mattis drostique des commodo pharetras loremos.
                        </p>
                        <div className="product__details__tab__content__item">
                          <h5>Products Infomation</h5>
                          <p>
                            A Pocket PC is a handheld computer, which features many of the same capabilities as a
                            modern PC. These handy little devices allow individuals to retrieve and store e-mail
                            messages, create a contact file, coordinate appointments, surf the internet, exchange
                            text messages and more. Every product that is labeled as a Pocket PC must be accompanied
                            with specific software to operate the unit and must feature a touchscreen and touchpad.
                          </p>
                          <p>
                            As is the case with any new technology product, the cost of a Pocket PC was substantial
                            during it’s early release. For approximately $700.00, consumers could purchase one of
                            top-of-the-line Pocket PCs in 2003. These days, customers are finding that prices have
                            become much more reasonable now that the newness is wearing off. For approximately
                            $350.00, a new Pocket PC can now be purchased.
                          </p>
                        </div>
                        <div className="product__details__tab__content__item">
                          <h5>Material used</h5>
                          <p>
                            Polyester is deemed lower quality due to its none natural quality’s. Made from synthetic
                            materials, not natural like wool. Polyester suits become creased easily and are known for
                            not being breathable. Polyester suits tend to have a shine to them compared to wool and
                            cotton suits, this can make the suit look cheap. The texture of velvet is luxurious and
                            breathable. Velvet is a great choice for dinner party jacket and can be worn all year round.
                          </p>
                        </div>
                      </div>
                    </div>
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

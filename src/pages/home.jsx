import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import Swal from 'sweetalert2';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import '../assets/Css/elegant-icons.css';
import '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { getAuthData } from '../utils/dadosuser'
import { Link } from "react-router-dom";




export default function MaleFashion() {
  useEffect(() => {
    const setBgElements = document.querySelectorAll('[data-setbg]');
    setBgElements.forEach((el) => {
      const bg = el.getAttribute('data-setbg');
      if (bg) {
        el.style.backgroundImage = `url(/${bg})`;
        el.style.backgroundSize = 'cover';
        el.style.backgroundPosition = 'center';
      }
    });

  }, []);

  const currentYear = new Date().getFullYear();
  const [selectedColor, setSelectedColor] = useState("gold");
  const url = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
  
  // Cache de imagens
  const [imageCache, setImageCache] = useState({});
  const [loadingImages, setLoadingImages] = useState(new Set());

  const loadProductImage = async (productId, delay = 0, retryCount = 0) => {
    const MAX_RETRIES = 10; // tentativas
    const RETRY_DELAY = 100; // delay de tentativas

    if (imageCache[productId] || loadingImages.has(productId)) {
      return;
    }


    setLoadingImages(prev => new Set([...prev, productId]));


    await new Promise(resolve => setTimeout(resolve, delay));

    try {
      const response = await fetch(`${url}/products/${productId}/image`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);

      setImageCache(prev => ({
        ...prev,
        [productId]: imageUrl
      }));
      
    } catch (error) {
      
  
      if (retryCount < MAX_RETRIES) {
        setLoadingImages(prev => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        
      
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        
        
        return loadProductImage(productId, 0, retryCount + 1);
      } else {
        setImageCache(prev => ({
          ...prev,
          [productId]: 'https://via.placeholder.com/400x400.png?text=Sem+Imagem'
        }));
      }
    } finally {
      setLoadingImages(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  useEffect(() => {
    fetch(`${url}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "accept": "application/json"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
      });
  }, [url]);


  useEffect(() => {
    if (products.length > 0) {
      const bestSellers = [...products]
        .sort((a, b) => b.sales - a.sales)
        .slice(0, 15);
      
      const newProducts = [...products]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 15);
      
      // remove duplicados 
      const allProductsToLoad = [...new Map([...bestSellers, ...newProducts].map(p => [p.id, p])).values()];
      
      allProductsToLoad.forEach((product, index) => {
        // Delay 
        loadProductImage(product.id, index * 200);
      });
    }
  }, [products]);

  const navigate = useNavigate();

  const addToCart = async (product) => {
    try {
      const authData = getAuthData();

      if (!authData || !authData?.token) {
        Swal.fire({
          icon: 'warning',
          title: 'Ops!',
          text: 'Você precisa estar logado para adicionar produtos ao carrinho.',
          confirmButtonText: 'Fazer Login',
          confirmButtonColor: '#d4af37',
          showCancelButton: true,
          cancelButtonText: 'Cancelar',
          cancelButtonColor: '#999',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/login');
          }
        });
        return;
      }

      // Mostra loading enquanto adiciona
      Swal.fire({
        title: 'Adicionando ao carrinho...',
        html: 'Por favor, aguarde',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const body = {
        value: product.price,
        product_id: product.id,
        amount: 1,
        user_cep: "",
        authorization: authData?.token || "",
        sizes: "M",
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
          "accept": "application/json",
          "Authorization": `Bearer ${authData?.token}`
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error("Erro ao adicionar ao carrinho");
      }

      const data = await response.json();
      console.log("Adicionado ao carrinho:", data);
      
      // Modal de sucesso
      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        html: `
          <div style="text-align: center;">
            <p style="font-size: 16px; margin: 15px 0;">${product.name}</p>
            <p style="font-size: 14px; color: #666;">foi adicionado ao carrinho</p>
            <p style="font-size: 18px; font-weight: bold; color: #d4af37; margin-top: 10px;">
              R$ ${product.price.toFixed(2)}
            </p>
          </div>
        `,
        confirmButtonText: 'Continuar Comprando',
        confirmButtonColor: '#d4af37',
        showCancelButton: true,
        cancelButtonText: 'Ver Carrinho',
        cancelButtonColor: '#111',
        timer: 3000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/shopcart');
        }
      });

    } catch (error) {
      console.error(error);
      
      // Modal de erro
      Swal.fire({
        icon: 'error',
        title: 'Erro!',
        text: 'Não foi possível adicionar o produto ao carrinho. Tente novamente.',
        confirmButtonText: 'Ok',
        confirmButtonColor: '#d4af37',
      });
    }
  };

  return (
    <div>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Offcanvas Menu Begin */}
      <div className="offcanvas-menu-overlay"></div>
      <div className="offcanvas-menu-wrapper">
        <div className="offcanvas__option">
          <div className="offcanvas__links">
            <a href="#">Sign in</a>
            <a href="#">FAQs</a>
          </div>
          <div className="offcanvas__top__hover">
            <span>
              Usd <i className="arrow_carrot-down"></i>
            </span>
            <ul>
              <li>USD</li>
              <li>EUR</li>
              <li>USD</li>
            </ul>
          </div>
        </div>
        <div className="offcanvas__nav__option">
          <a href="#" className="search-switch">
            <img src={`/img/icon/search.png`} alt="" />

          </a>
          <a href="#">
            <img src={`/img/icon/heart.png`} alt="" />
          </a>
          <a href="#">
            <img src={`/img/icon/cart.png`} alt="" /> <span>0</span>
          </a>
          <div className="price">$0.00</div>
        </div>
        <div id="mobile-menu-wrap"></div>
        <div className="offcanvas__text">
          <p>Free shipping, 30-day return or refund guarantee.</p>
        </div>
      </div>
      {/* Offcanvas Menu End */}



      {/* Hero Section Begin */}
      <section className="hero">
        <Swiper
          modules={[Autoplay, Navigation, Pagination, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          navigation={true}
          pagination={{ clickable: true }}
          className="hero__slider"
        >

          {/* SLIDE 1 */}
        
          <SwiperSlide>
          <Link to={`/shop?title=Alianças&filter=Prata`}>
            <div
              className="hero__items"
              style={{
                backgroundImage: "url('/img/aliprata.png')",
              }}
            >
              
            </div>
            </Link>
          </SwiperSlide>

          {/* SLIDE 2 */}
         
          <SwiperSlide>
              <Link to={`/shop?title=Anéis`}>
            <div
              className="hero__items"
              style={{
                backgroundImage: "url('/img/aneis.png')",
              }}
            >
            </div>
             </Link>
          </SwiperSlide>
          {/* SLIDE 3 */}
          <SwiperSlide>
            <Link to={`/shop?title=Anéis&filter=Formatura`}>
            <div
              className="hero__items"
              style={{
                backgroundImage: "url('/img/formatura.png')",
              }}
            >

            </div>
            </Link>
          </SwiperSlide>

        </Swiper>
      </section>
      {/* Hero Section End */}

      {/* Banner Section Begin */}
      <section className="banner spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-4">
               <Link to={`/shop?title=Alianças&filter=Ouro 10k`}>
              <div className="banner__item">
                <div className="banner__item__pic">
                  <img src={`/img/hero/inicial.png`} alt="" />
                </div>
            
                      
                <div className="banner__item__text">

                  <h2>Alianças de ouro</h2>
                      <Link to={`/shop?title=Alianças&filter=Ouro 10k`}>
                        Compre agora
                      </Link>
                </div>
              </div>
              </Link>
            </div>
            <div className="col-lg-5">
               <Link to={`/shop?title=Anéis&filter=Prata`} >
              <div className="banner__item banner__item--middle">
                <div className="banner__item__pic">
                  <img src={`/img/hero/inicial-2.webp`} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Anel de prata</h2>
                  <Link to={`/shop?title=Anéis&filter=Prata`} >
                        Compre agora
                        </Link>
                      
                </div>
              </div>
              </Link>
            </div>
            <div className="col-lg-7">
              <div className="banner__item banner__item--last">
                <div className="banner__item__pic">
                  <img src={`/img/hero/inicial.png`} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Shoes Spring 2030</h2>
                  <a href="#">Shop now</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}

      {/* ================= MAIS Amados ================= */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active">Os modelos mais amados</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                navigation={{
                  nextEl: '.swiper-button-next-vendidos',
                  prevEl: '.swiper-button-prev-vendidos',
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
                {products
                  .slice()
                  .sort((a, b) => b.sales - a.sales)
                  .slice(0, 15)
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="product__item">
                        <div className="product__item__pic" style={{ position: 'relative', paddingBottom: '100%', background: '#f5f5f5' }}>
                          {imageCache[product.id] ? (
                            <img
                              src={imageCache[product.id]}
                              alt={product.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                            />
                          ) : (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f5f5f5'
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                              }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  border: '4px solid #d4af37',
                                  borderTopColor: 'transparent',
                                  borderRadius: '50%',
                                  animation: 'spin 1s linear infinite'
                                }}></div>
                                <span style={{ color: '#999', fontSize: '13px' }}>Carregando...</span>
                              </div>
                            </div>
                          )}
                          <span className="label">Top</span>
                          <ul className="product__hover">
                            <li>
                              <a href="#">
                                <img src="/img/icon/heart.png" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="/img/icon/compare.png" alt="" />
                                <span>Compare</span>
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
                          <h6>{product.name}</h6>
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <h5 className="old-price">R$ {(Math.floor(product.price * 2) + 0.90).toFixed(2)}</h5>
                          <h5>R$ {product.price.toFixed(2)}</h5>
                          <a onClick={() => navigate(`/shopdetails/${product.id}`)} className="add-cart">
                            Comprar
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              
              {/* Navigation Arrows */}
              <div className="swiper-button-prev-vendidos swiper-nav-arrow">
                <i className="fa fa-angle-left"></i>
              </div>
              <div className="swiper-button-next-vendidos swiper-nav-arrow">
                <i className="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ================= NOVIDADES ================= */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active">Novidades</li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12">
              <Swiper
                modules={[Navigation]}
                spaceBetween={30}
                slidesPerView={4}
                navigation={{
                  nextEl: '.swiper-button-next-novidades',
                  prevEl: '.swiper-button-prev-novidades',
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
                {products
                  .slice()
                  .sort(
                    (a, b) =>
                      new Date(b.created_at) - new Date(a.created_at)
                  )
                  .slice(0, 15)
                  .map((product) => (
                    <SwiperSlide key={product.id}>
                      <div className="product__item">
                        <div className="product__item__pic" style={{ position: 'relative', paddingBottom: '100%', background: '#f5f5f5' }}>
                          {imageCache[product.id] ? (
                            <img
                              src={imageCache[product.id]}
                              alt={product.name}
                              style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                position: 'absolute',
                                top: 0,
                                left: 0
                              }}
                            />
                          ) : (
                            <div style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              background: '#f5f5f5'
                            }}>
                              <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: '10px'
                              }}>
                                <div style={{
                                  width: '40px',
                                  height: '40px',
                                  border: '4px solid #d4af37',
                                  borderTopColor: 'transparent',
                                  borderRadius: '50%',
                                  animation: 'spin 1s linear infinite'
                                }}></div>
                                <span style={{ color: '#999', fontSize: '13px' }}>Carregando...</span>
                              </div>
                            </div>
                          )}
                          <span className="label">Novo</span>
                          <ul className="product__hover">
                            <li>
                              <a href="#">
                                <img src="/img/icon/heart.png" alt="" />
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <img src="/img/icon/compare.png" alt="" />
                                <span>Compare</span>
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
                          <h6>{product.name}</h6>
                         
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <h5 className="old-price">R$ {(Math.floor(product.price * 2) + 0.90).toFixed(2)}</h5>
                          <h5>R$ {product.price.toFixed(2)}</h5>
                           <a onClick={() => navigate(`/shopdetails/${product.id}`)} className="add-cart">
                            Comprar
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
              
              {/* Navigation Arrows */}
              <div className="swiper-button-prev-novidades swiper-nav-arrow">
                <i className="fa fa-angle-left"></i>
              </div>
              <div className="swiper-button-next-novidades swiper-nav-arrow">
                <i className="fa fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>



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


    </div>
  );
}

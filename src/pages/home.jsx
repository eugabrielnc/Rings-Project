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

    // If you want the preloader or JS-driven components to work exactly like the template,
    // include the template JS files (jQuery + plugins) in public/index.html or convert them to React.
  }, []);

  const currentYear = new Date().getFullYear();
  const [selectedColor, setSelectedColor] = useState("gold");
  const url = import.meta.env.VITE_API_URL;
  const [products, setProducts] = useState([]);
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
        console.log("Products:", data);
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [url]);
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
            <div
              className="hero__items set-bg"
              style={{
                backgroundImage: "url('/img/hero/aliancaof.png')",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      <h6>Alianças</h6>
                      <h2>Aliança com banho a ouro 18k</h2>
                      <p>
                        Par de alianças de moedas com banho a ouro 18k, anatômicas abauladas com anel solitário de pedra central
                      </p>
                      <Link to={`/shop?title=Alianças&filter=Moeda Antiga com Banho a Ouro 18k`} className="primary-btn">
                        Compre agora
                      </Link>
                      <div className="hero__social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* SLIDE 2 */}
          <SwiperSlide>
            <div
              className="hero__items set-bg"
              style={{
                backgroundImage: "url('/img/hero/alianca4.png')",
              }}
            >
              <div className="container">
                <div className="row">
                  <div className="col-xl-5 col-lg-7 col-md-8">
                    <div className="hero__text">
                      <h6>Winter</h6>
                      <h2>New Arrivals 2030</h2>
                      <p>
                        Comfortable, durable luxury pieces crafted with style and
                        minimalism in mind.
                      </p>
                      <a href="#" className="primary-btn">
                        Compre agora
                      </a>
                      <div className="hero__social">
                        <a href="#"><i className="fab fa-facebook"></i></a>
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-pinterest"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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

      {/* ================= MAIS VENDIDOS ================= */}
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
                <li className="active">Mais vendidos</li>
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
                    slidesPerView: 1,
                    spaceBetween: 20
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
                        <div
                          className="product__item__pic"
                          style={{
                            backgroundImage: `url(${url}/products/${product.id}/image)`,
                          }}
                        >
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
                          <a
                            href="#"
                            className="add-cart"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                          >
                            + Adicionar ao carrinho
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
                    slidesPerView: 1,
                    spaceBetween: 20
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
                        <div
                          className="product__item__pic"
                          style={{
                            backgroundImage: `url(${url}/products/${product.id}/image)`,
                          }}
                        >
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
                          <a onClick={() => navigate(`/shopdetails/${product.id}`)} className="add-cart">
                            Comprar
                          </a>
                          <a
                            href="#"
                            className="add-cart"
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product);
                            }}
                          >
                            + Adicionar ao carrinho
                          </a>
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </div>
                          <h5 className="old-price">R$ {(Math.floor(product.price * 2) + 0.90).toFixed(2)}</h5>
                          <h5>R$ {product.price.toFixed(2)}</h5>
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

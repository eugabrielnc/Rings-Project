import React, { useEffect } from "react";
import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
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

// NOTE:
// 1) Put the Google Font <link> tags and meta tags (charset/viewport) into your public/index.html head.
// 2) All CSS and image assets referenced below assume they're located in the public folder
//    (`public/css/...`, `public/img/...`). You can also import CSS from src if you prefer.
// 3) This component implements the markup in JSX and a small useEffect to apply `data-setbg`
//    backgrounds and the dynamic current year. Many interactive features in the original
//    template (menu, carousel, countdown, mixitup filtering, search modal) depend on jQuery
//    plugins and the JS files that came with the template. To keep this file React-only
//    I removed the <script> tags; if you still need the original behaviours, include the
//    template JS files in public/index.html or convert the behaviors to React.

// Example CSS imports (optional if you keep CSS in public and load via index.html):



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
    fetch(`${url}/products`, {
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

  return (
    <div>
      {/* Page Preloader (you can implement a React state to show/hide) */}


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
              <div className="banner__item">
                <div className="banner__item__pic">
                  <img src={`/img/hero/inicial.png`} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Aneis de ouro</h2>
                  <a href="#">Compre agora</a>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner__item banner__item--middle">
                <div className="banner__item__pic">
                  <img src={`/img/hero/inicial-2.webp`} alt="" />
                </div>
                <div className="banner__item__text">
                  <h2>Anel de prata</h2>
                  <a href="#">Compre agora</a>
                </div>
              </div>
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

          <div className="row product__filter">
            {products
              .slice()
              .sort((a, b) => b.sales - a.sales)
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-6 col-sm-6 mix hot-sales"
                >
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
                      <a href="#" className="add-cart">
                        + Adicionar ao carrinho
                      </a>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <h5>R$ {product.price.toFixed(2)}</h5>
                    </div>
                  </div>
                </div>
              ))}
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

          <div className="row product__filter">
            {products
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.created_at) - new Date(a.created_at)
              )
              .slice(0, 4)
              .map((product) => (
                <div
                  key={product.id}
                  className="col-lg-3 col-md-6 col-sm-6 mix new-arrivals"
                >
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
                      <a href="#" className="add-cart">
                        + Adicionar ao carrinho
                      </a>
                      <div className="rating">
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-o"></i>
                      </div>
                      <h5>R$ {product.price.toFixed(2)}</h5>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>


      {/* Categories Section Begin */}
      <section className="categories spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="categories__text">
                <h2>
                  Clothings Hot <br /> <span>Shoe Collection</span> <br /> Accessories
                </h2>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="categories__hot__deal">
                <img src={`/img/product-sale.png`} alt="" />
                <div className="hot__deal__sticker">
                  <span>Sale Of</span>
                  <h5>$29.99</h5>
                </div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-1">
              <div className="categories__deal__countdown">
                <span>Deal Of The Week</span>
                <h2>Multi-pocket Chest Bag Black</h2>
                <div className="categories__deal__countdown__timer" id="countdown">
                  <div className="cd-item">
                    <span>3</span>
                    <p>Dias</p>
                  </div>
                  <div className="cd-item">
                    <span>1</span>
                    <p>Hora</p>
                  </div>
                  <div className="cd-item">
                    <span>50</span>
                    <p>Minutes</p>
                  </div>
                  <div className="cd-item">
                    <span>18</span>
                    <p>Segundos</p>
                  </div>
                </div>
                <a href="#" className="primary-btn">
                  Compre agora
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section End */}

      {/* Instagram Section Begin */}
      <section className="instagram spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="instagram__pic">
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-1.jpg"></div>
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-2.jpg"></div>
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-3.jpg"></div>
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-4.jpg"></div>
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-5.jpg"></div>
                <div className="instagram__pic__item set-bg" data-setbg="img/instagram/instagram-6.jpg"></div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="instagram__text">
                <h2>Instagram</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                  labore et dolore magna aliqua.
                </p>
                <h3>#Male_Fashion</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Instagram Section End */}

      {/* Latest Blog Section Begin */}
      <section className="latest spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Ultimas Noticias</span>
                <h2>Fashion New Trends</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-1.jpg"></div>
                <div className="blog__item__text">
                  <span>
                    <img src={`/img/icon/calendar.png`} alt="" /> 16 February 2020
                  </span>
                  <h5>What Curling Irons Are The Best Ones</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-2.jpg"></div>
                <div className="blog__item__text">
                  <span>
                    <img src={`/img/icon/calendar.png`} alt="" /> 21 February 2020
                  </span>
                  <h5>Eternity Bands Do Last Forever</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="blog__item">
                <div className="blog__item__pic set-bg" data-setbg="img/blog/blog-3.jpg"></div>
                <div className="blog__item__text">
                  <span>
                    <img src={`/img/icon/calendar.png`} alt="" /> 28 February 2020
                  </span>
                  <h5>The Health Benefits Of Sunglasses</h5>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Latest Blog Section End */}



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

import { useEffect, useState } from "react";

import "../assets/Css/bootstrap.min.css";
import "../assets/Css/font-awesome.min.css";
import "../assets/Css/elegant-icons.css";
import "../assets/Css/magnific-popup.css";
import "../assets/Css/nice-select.css";
import "../assets/Css/owl.carousel.min.css";
import "../assets/Css/slicknav.min.css";
import "../assets/Css/style.css";

export default function Shop() {
  const url = import.meta.env.VITE_API_URL;

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sort, setSort] = useState("");

  useEffect(() => {
    async function carregarProdutos() {
      try {
        const res = await fetch(`${url}/products`);
        const data = await res.json();
        setProducts(data);
        setDisplayProducts(data);
      } catch (err) {
        console.error(err);
      }
    }

    carregarProdutos();
  }, [url]);

  function handleSort(value) {
  let lista = [...products];

  switch (value) {
    case "price_low":
      lista.sort((a, b) => Number(a.price) - Number(b.price));
      break;

    case "price_high":
      lista.sort((a, b) => Number(b.price) - Number(a.price));
      break;

    case "az":
      lista.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "sales":
      lista.sort((a, b) => Number(b.sales) - Number(a.sales));
      break;

    default:
      lista = [...products];
  }

  setSort(value);
  setDisplayProducts(lista);
}

  return (
    <>
      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">

            {/* ===== SIDEBAR (100% ORIGINAL) ===== */}
            <div className="col-lg-3 col-md-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">

                    {/* Categories */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseOne">
                          Categorias
                        </a>
                      </div>
                      <div
                        id="collapseOne"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul className="nice-scroll">
                              <li><a href="#">Men (20)</a></li>
                              <li><a href="#">Women (20)</a></li>
                              <li><a href="#">Bags (20)</a></li>
                              <li><a href="#">Clothing (20)</a></li>
                              <li><a href="#">Shoes (20)</a></li>
                              <li><a href="#">Accessories (20)</a></li>
                              <li><a href="#">Kids (20)</a></li>
                              <li><a href="#">Kids (20)</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brand */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseTwo">
                          Marca
                        </a>
                      </div>
                      <div
                        id="collapseTwo"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__brand">
                            <ul>
                              <li><a href="#">Louis Vuitton</a></li>
                              <li><a href="#">Chanel</a></li>
                              <li><a href="#">Hermes</a></li>
                              <li><a href="#">Gucci</a></li>
                              <li><a href="#">Prada</a></li>
                              <li><a href="#">Dolce & Gabbana</a></li>
                              <li><a href="#">Balenciaga</a></li>
                              <li><a href="#">Versace</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseThree">
                          Filtrar pelo preço
                        </a>
                      </div>
                      <div
                        id="collapseThree"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__price">
                            <ul>
                              <li><a href="#">$0.00 - $50.00</a></li>
                              <li><a href="#">$50.00 - $100.00</a></li>
                              <li><a href="#">$100.00 - $150.00</a></li>
                              <li><a href="#">$150.00 - $200.00</a></li>
                              <li><a href="#">$200.00 - $250.00</a></li>
                              <li><a href="#">250.00+</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFour">
                          Size
                        </a>
                      </div>
                      <div
                        id="collapseFour"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__size">
                            <label htmlFor="xs">xs<input type="radio" id="xs" /></label>
                            <label htmlFor="sm">s<input type="radio" id="sm" /></label>
                            <label htmlFor="md">m<input type="radio" id="md" /></label>
                            <label htmlFor="xl">xl<input type="radio" id="xl" /></label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Colors */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseFive">
                          Colors
                        </a>
                      </div>
                      <div
                        id="collapseFive"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__color">
                            <label className="c-1"><input type="radio" /></label>
                            <label className="c-2"><input type="radio" /></label>
                            <label className="c-3"><input type="radio" /></label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="card">
                      <div className="card-heading">
                        <a data-toggle="collapse" data-target="#collapseSix">
                          Tags
                        </a>
                      </div>
                      <div
                        id="collapseSix"
                        className="collapse show"
                        data-parent="#accordionExample"
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__tags">
                            <a href="#">Product</a>
                            <a href="#">Bags</a>
                            <a href="#">Shoes</a>
                            <a href="#">Fashion</a>
                            <a href="#">Clothing</a>
                            <a href="#">Hats</a>
                            <a href="#">Accessories</a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>

            {/* ===== PRODUCT LIST ===== */}
            <div className="col-lg-9 col-md-9">
              <div className="row">

                <div className="col-lg-12">
                  <div className="shop__product__option">
                    <div className="row">
                      <div className="col-lg-7 col-md-7">
                        <div className="shop__product__option__left">
                          <p>Showing {displayProducts.length} results</p>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5">
                        <div className="shop__product__option__right">
                          <p>Sort by:</p>
                          <select
                            value={sort}
                            onChange={(e) => handleSort(e.target.value)}
                          >
                            <option value="">Default</option>
                            <option value="az">A-Z</option>
                            <option value="price_low">Price: low to high</option>
                            <option value="price_high">Price: high to low</option>
                            <option value="sales">Best sellers</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS GRID */}
                {displayProducts.map((product) => (
                  <div key={product.id} className="col-lg-4 col-md-6 col-sm-6">
                    <div className="product__item">
                      <div
                        className="product__item__pic set-bg"
                        style={{
                          backgroundImage: `url(${url}/products/${product.id}/image)`,
                        }}
                      >
                        <ul className="product__hover">
                          <li><a href="#"><span className="arrow_expand" /></a></li>
                          <li><a href="#"><span className="icon_heart_alt" /></a></li>
                          <li><a href="#"><span className="icon_bag_alt" /></a></li>
                        </ul>
                      </div>
                      <div className="product__item__text">
                        <h6><a href="#">{product.name}</a></h6>
                        <div className="product__price">
                          R$ {product.price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                <div className="col-lg-12 text-center">
                  <div className="pagination__option">
                    <a href="#"><i className="fa fa-angle-left" /></a>
                    <a href="#">1</a>
                    <a href="#">2</a>
                    <a href="#">3</a>
                    <a href="#"><i className="fa fa-angle-right" /></a>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
      {/* Shop Section End */}
    </>
  );
}

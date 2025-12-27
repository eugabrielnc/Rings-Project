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
  const [renderKey, setRenderKey] = useState(0);
  
  // Filtros múltiplos
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [brandFilters, setBrandFilters] = useState([]);
  const [priceFilters, setPriceFilters] = useState([]);
  
  // Estados para controlar os acordeões
  const [openAccordions, setOpenAccordions] = useState({
    categories: true,
    brand: true,
    price: true,
    size: false,
    colors: false,
    tags: false
  });

  const toggleAccordion = (section) => {
    setOpenAccordions(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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

  function applyFiltersAndSort() {
    let lista = [...products];

    // Aplicar filtro de categorias
    if (categoryFilters.length > 0) {
      lista = lista.filter(product => 
        categoryFilters.includes(product.category)
      );
    }

    // Aplicar filtro de marcas
    if (brandFilters.length > 0) {
      lista = lista.filter(product => 
        brandFilters.includes(product.brand)
      );
    }

    // Aplicar filtros de preço
    if (priceFilters.length > 0) {
      lista = lista.filter(product => {
        const price = Number(product.price);
        return priceFilters.some(filter => 
          price >= filter.min && price <= filter.max
        );
      });
    }

    // Aplicar ordenação
    switch (sort) {
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
    }

    setDisplayProducts(lista);
    setRenderKey(prev => prev + 1);
  }

  useEffect(() => {
    applyFiltersAndSort();
  }, [categoryFilters, brandFilters, priceFilters, sort]);

  function handleSort(value) {
    setSort(value);
  }

  // Toggle de categoria
  function toggleCategoryFilter(category) {
    setCategoryFilters(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  }

  // Toggle de marca
  function toggleBrandFilter(brand) {
    setBrandFilters(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  }

  // Toggle de preço
  function togglePriceFilter(min, max) {
    setPriceFilters(prev => {
      const exists = prev.find(f => f.min === min && f.max === max);
      
      if (exists) {
        return prev.filter(f => !(f.min === min && f.max === max));
      } else {
        return [...prev, { min, max }];
      }
    });
  }

  function clearAllFilters() {
    setCategoryFilters([]);
    setBrandFilters([]);
    setPriceFilters([]);
  }

  const totalActiveFilters = categoryFilters.length + brandFilters.length + priceFilters.length;

  return (
    <>
      <style>{`
        .collapse {
          transition: all 0.3s ease-in-out;
          max-height: 0;
          overflow: hidden;
          opacity: 0;
        }
        
        .collapse.show {
          max-height: 2000px;
          opacity: 1;
        }
        
        .card-heading a {
          position: relative;
          display: block;
          transition: color 0.2s ease;
        }
        
        .card-heading a:hover {
          color: #d4a574 !important;
        }
        
        .card-heading a::after {
          content: '▼';
          position: absolute;
          right: 0;
          font-size: 12px;
          transition: transform 0.3s ease;
        }
        
        .card-heading a.open::after {
          transform: rotate(180deg);
        }

        .filter-checkbox {
          display: flex;
          align-items: center;
          margin-bottom: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .filter-checkbox:hover {
          color: #d4a574;
        }

        .filter-checkbox input[type="checkbox"] {
          width: 16px;
          height: 16px;
          margin-right: 10px;
          cursor: pointer;
          accent-color: #d4a574;
        }

        .shop__sidebar__categories ul,
        .shop__sidebar__brand ul,
        .shop__sidebar__price ul {
          list-style: none;
          padding: 0;
        }

        .shop__sidebar__categories ul li,
        .shop__sidebar__brand ul li,
        .shop__sidebar__price ul li {
          margin-bottom: 5px;
        }

        .clear-filters-btn {
          margin-top: 15px;
          padding: 8px 20px;
          background: #d4a574;
          color: #fff;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          fontSize: 14px;
          width: 100%;
          font-weight: 600;
        }

        .clear-filters-btn:hover {
          background: #c59563;
        }
      `}</style>
      
      {/* Shop Section Begin */}
      <section className="shop spad">
        <div className="container">
          <div className="row">

            {/* ===== SIDEBAR ===== */}
            <div className="col-lg-3 col-md-3">
              <div className="shop__sidebar">
                <div className="shop__sidebar__accordion">
                  <div className="accordion" id="accordionExample">
                    {console.log(products)}
                    {/* Categories */}
                    <div className="card">
                      <div className="card-heading">
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); toggleAccordion('categories'); }}
                          style={{ cursor: 'pointer' }}
                          className={openAccordions.categories ? 'open' : ''}
                        >
                          Categorias {categoryFilters.length > 0 && `(${categoryFilters.length})`}
                        </a>
                      </div>
                      <div
                        className={`collapse ${openAccordions.categories ? 'show' : ''}`}
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Men")}
                                    onChange={() => toggleCategoryFilter("Men")}
                                  />
                                  <span>Men (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Women")}
                                    onChange={() => toggleCategoryFilter("Women")}
                                  />
                                  <span>Women (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Bags")}
                                    onChange={() => toggleCategoryFilter("Bags")}
                                  />
                                  <span>Bags (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Clothing")}
                                    onChange={() => toggleCategoryFilter("Clothing")}
                                  />
                                  <span>Clothing (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Shoes")}
                                    onChange={() => toggleCategoryFilter("Shoes")}
                                  />
                                  <span>Shoes (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Accessories")}
                                    onChange={() => toggleCategoryFilter("Accessories")}
                                  />
                                  <span>Accessories (20)</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={categoryFilters.includes("Kids")}
                                    onChange={() => toggleCategoryFilter("Kids")}
                                  />
                                  <span>Kids (20)</span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Brand */}
                    <div className="card">
                      <div className="card-heading">
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); toggleAccordion('brand'); }}
                          style={{ cursor: 'pointer' }}
                          className={openAccordions.brand ? 'open' : ''}
                        >
                          Marca {brandFilters.length > 0 && `(${brandFilters.length})`}
                        </a>
                      </div>
                      <div
                        className={`collapse ${openAccordions.brand ? 'show' : ''}`}
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__brand">
                            <ul>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Louis Vuitton")}
                                    onChange={() => toggleBrandFilter("Louis Vuitton")}
                                  />
                                  <span>Louis Vuitton</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Chanel")}
                                    onChange={() => toggleBrandFilter("Chanel")}
                                  />
                                  <span>Chanel</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Hermes")}
                                    onChange={() => toggleBrandFilter("Hermes")}
                                  />
                                  <span>Hermes</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Gucci")}
                                    onChange={() => toggleBrandFilter("Gucci")}
                                  />
                                  <span>Gucci</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Prada")}
                                    onChange={() => toggleBrandFilter("Prada")}
                                  />
                                  <span>Prada</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Dolce & Gabbana")}
                                    onChange={() => toggleBrandFilter("Dolce & Gabbana")}
                                  />
                                  <span>Dolce & Gabbana</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Balenciaga")}
                                    onChange={() => toggleBrandFilter("Balenciaga")}
                                  />
                                  <span>Balenciaga</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={brandFilters.includes("Versace")}
                                    onChange={() => toggleBrandFilter("Versace")}
                                  />
                                  <span>Versace</span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="card">
                      <div className="card-heading">
                        <a 
                          href="#"
                          onClick={(e) => { e.preventDefault(); toggleAccordion('price'); }}
                          style={{ cursor: 'pointer' }}
                          className={openAccordions.price ? 'open' : ''}
                        >
                          Filtrar pelo preço {priceFilters.length > 0 && `(${priceFilters.length})`}
                        </a>
                      </div>
                      <div
                        className={`collapse ${openAccordions.price ? 'show' : ''}`}
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__price">
                            <ul>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 0 && f.max === 250)}
                                    onChange={() => togglePriceFilter(0, 250)}
                                  />
                                  <span>R$ 0,00 - R$ 250,00</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 250 && f.max === 400)}
                                    onChange={() => togglePriceFilter(250, 400)}
                                  />
                                  <span>R$ 250,00 - R$ 400,00</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 400 && f.max === 450)}
                                    onChange={() => togglePriceFilter(400, 450)}
                                  />
                                  <span>R$ 400,00 - R$ 450,00</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 450 && f.max === 600)}
                                    onChange={() => togglePriceFilter(450, 600)}
                                  />
                                  <span>R$ 450,00 - R$ 600,00</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 600 && f.max === 2000)}
                                    onChange={() => togglePriceFilter(600, 2000)}
                                  />
                                  <span>R$ 600,00 - R$ 2000,00</span>
                                </label>
                              </li>
                              <li>
                                <label className="filter-checkbox">
                                  <input
                                    type="checkbox"
                                    checked={priceFilters.some(f => f.min === 2500 && f.max === 999999)}
                                    onChange={() => togglePriceFilter(2500, 999999)}
                                  />
                                  <span>R$ 2000,00+</span>
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Botão de Limpar Filtros */}
                    {totalActiveFilters > 0 && (
                      <button 
                        onClick={clearAllFilters}
                        className="clear-filters-btn"
                      >
                        Limpar Todos os Filtros ({totalActiveFilters})
                      </button>
                    )}

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
                          <p>{displayProducts.length} Resultados</p>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-5">
                        <div className="shop__product__option__right">
                          <p>Ordenar por:</p>
                          <select
                            value={sort}
                            onChange={(e) => handleSort(e.target.value)}
                          >
                            <option value="">Padrão</option>
                            <option value="az">A-Z</option>
                            <option value="price_low">Do menor para o maior</option>
                            <option value="price_high">Do maior para o menor</option>
                            <option value="sales">Mais vendidos</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS GRID */}
                {displayProducts.map((product, index) => (
                  <div key={`${product.id}-${renderKey}-${index}`} className="col-lg-4 col-md-6 col-sm-6">
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
                        <h6><a href="#" style={{color: '#d4af37'}}>{product.name}</a></h6>
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
                    <a href="#" style={{color: '#d4af37'}}><i className="fa fa-angle-left" /></a>
                    <a href="#" style={{color: '#d4af37'}}>1</a>
                    <a href="#" style={{color: '#d4af37'}}>2</a>
                    <a href="#" style={{color: '#d4af37'}}>3</a>
                    <a href="#" style={{color: '#d4af37'}}><i className="fa fa-angle-right" /></a>
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

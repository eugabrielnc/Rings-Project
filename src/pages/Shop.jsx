import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";
import { FILTER_CONFIG } from "../utils/filters";
import { useNavigate } from "react-router-dom";
import { getAuthData } from '../utils/dadosuser'
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
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  console.log("Filtro da URL:", filter);
  const title = searchParams.get("title");
  console.log("Título da URL:", title);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [sort, setSort] = useState("");
  const [renderKey, setRenderKey] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9; // Quantidade de itens por página

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = displayProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(displayProducts.length / productsPerPage);

  // Função para mudar de página e rolar para o topo
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };
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
  const addToCart = async (product) => {
      try {
        const authData = getAuthData(); // supondo que aqui vem token, cep etc
  
        const body = {
          value: product.price,
          product_id: product.id,
          amount: 1,
          user_cep: "",
          authorization: authData?.token || "",
          sizes: "M", // ajuste se tiver tamanho dinâmico
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
        alert("Produto adicionado ao carrinho 🛒");
  
      } catch (error) {
        console.error(error);
        alert("Erro ao adicionar ao carrinho");
      }
    };
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

  // Marcar automaticamente o filtro quando vier da URL
  useEffect(() => {
    if (filter && !categoryFilters.includes(filter)) {
      setCategoryFilters([filter]);
    }
  }, [filter]);

  // Limpar filtros quando trocar de categoria (title)
  useEffect(() => {
    if (title) {
      setCategoryFilters([]);

      // Se ainda tiver filter na URL, adicionar novamente
      if (filter) {
        setCategoryFilters([filter]);
      }
    }
  }, [title]);

  function applyFiltersAndSort() {
    let lista = [...products];

    // 1. Filtrar por tipo (title) - Ex: "Alianças", "Anéis"
    if (title) {
      lista = lista.filter(product =>
        product.type && product.type.toLowerCase() === title.toLowerCase()
      );
    }

    // 2. Filtrar por material (apenas checkboxes manuais, ignorar filter da URL se houver mudanças)
    if (categoryFilters.length > 0) {
      lista = lista.filter(product => {
        if (!product.material) return false;
        return categoryFilters.includes(product.material);
      });
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
    setCurrentPage(1)
  }, [products, title, categoryFilters, brandFilters, priceFilters, sort]);

  function handleSort(value) {
    setSort(value);
  }

  // Opções para o React Select
  const sortOptions = [
    { value: "", label: "Padrão" },
    { value: "az", label: "A-Z" },
    { value: "price_low", label: "Preço: Menor para o Maior" },
    { value: "price_high", label: "Preço: Maior para o Menor" },
    { value: "sales", label: "Mais Vendidos" }
  ];

  // Estilo customizado para o React Select
  const customSelectStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: '38px',
      borderRadius: '8px',
      border: state.isFocused ? '2px solid #d4af37' : '2px solid #E3C58D',
      boxShadow: state.isFocused ? '0 0 0 3px rgba(212, 175, 55, 0.1)' : 'none',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s ease',
      '&:hover': {
        borderColor: '#d4af37'
      }
    }),
    container: (base) => ({
      ...base,
  
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected 
        ? '#d4af37' 
        : state.isFocused 
        ? 'rgba(212, 175, 55, 0.1)' 
        : 'white',
      color: state.isSelected ? 'white' : '#333',
      cursor: 'pointer',
      padding: '10px 15px',
      transition: 'all 0.2s ease',
      '&:active': {
        backgroundColor: '#d4af37'
      }
    }),
    singleValue: (base) => ({
      ...base,
      color: '#333',
      fontWeight: '500'
    }),
    placeholder: (base) => ({
      ...base,
      color: '#999',

    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isFocused ? '#d4af37' : '#999',
      transition: 'all 0.3s ease',
      '&:hover': {
        color: '#d4af37'
      }
    }),
    indicatorSeparator: () => ({
      display: 'none'
    })
  };

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

        .pagination__option {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 30px;
        }

        .pagination__option a {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          height: 40px;
          padding: 0 12px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          color: #666;
          font-weight: 500;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.3s ease;
          background: #fff;
        }

        .pagination__option a:hover {
          border-color: #d4af37;
          color: #d4af37;
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(212, 175, 55, 0.2);
        }

        .pagination__option a.active {
          background: linear-gradient(135deg, #d4af37 0%, #f4d03f 100%);
          border-color: #d4af37;
          color: #fff;
          font-weight: 700;
          box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
        }

        .pagination__option a.arrow {
          background: #f8f8f8;
          border-color: #ddd;
        }

        .pagination__option a.arrow:hover {
          background: #d4af37;
          border-color: #d4af37;
          color: #fff;
        }

        .pagination__option a.arrow i {
          font-size: 16px;
        }

        .pagination__option a:active {
          transform: translateY(0);
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
                    {/* Categories */}
                    <div className="card">
                      <div className="card-heading">
                        <a
                          href="#"
                          onClick={(e) => { e.preventDefault(); toggleAccordion('categories'); }}
                          style={{ cursor: 'pointer' }}
                          className={openAccordions.categories ? 'open' : ''}
                        >
                          {searchParams.get("title")}
                          {categoryFilters.length > 0 && `(${categoryFilters.length})`}
                        </a>
                      </div>
                      <div
                        className={`collapse ${openAccordions.categories ? 'show' : ''}`}
                      >
                        <div className="card-body">
                          <div className="shop__sidebar__categories">
                            <ul>
                              {FILTER_CONFIG[title]?.map(item => (
                                <li key={item}>
                                  <label className="filter-checkbox">
                                    <input
                                      type="checkbox"
                                      checked={categoryFilters.includes(item)}
                                      onChange={() => toggleCategoryFilter(item)}
                                    />
                                    <span>{item} </span>
                                  </label>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          <p style={{ marginBottom: '10px', fontWeight: '600', color: '#333' }}>Ordenar por:</p>
                          <Select
                            value={sortOptions.find(option => option.value === sort)}
                            onChange={(option) => handleSort(option.value)}
                            options={sortOptions}
                            styles={customSelectStyles}
                            placeholder="Selecione..."
                            isSearchable={false}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="row product-grid">
                {currentProducts.map((product, index) => (
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
                        <h6><a href="#" style={{ color: '#d4af37' }}>{product.name}</a></h6>
                        <h5 className="old-price">R$ {(Math.floor(product.price * 2) + 0.90).toFixed(2)}</h5>
                        <div className="product__price">
                          R$ {product.price.toFixed(2)} 
                        </div>
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
                  </div>
                ))}
                </div>

                {/* Pagination */}
                <div className="col-lg-12 text-center">
                  <div className="pagination__option">
                    {currentPage > 1 && (
                      <a 
                        href="#" 
                        className="arrow"
                        onClick={(e) => { e.preventDefault(); paginate(currentPage - 1); }}
                        title="Página anterior"
                      >
                        <i className="fa fa-angle-left" />
                      </a>
                    )}
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                      <a
                        key={num}
                        href="#"
                        onClick={(e) => { e.preventDefault(); paginate(num); }}
                        className={currentPage === num ? "active" : ""}
                        title={`Página ${num}`}
                      >
                        {num}
                      </a>
                    ))}
                    
                    {currentPage < totalPages && (
                      <a 
                        href="#" 
                        className="arrow"
                        onClick={(e) => { e.preventDefault(); paginate(currentPage + 1); }}
                        title="Próxima página"
                      >
                        <i className="fa fa-angle-right" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
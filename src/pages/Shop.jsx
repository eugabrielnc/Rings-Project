import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import  '../assets/Css/elegant-icons.css';
import  '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css'; 

export default function Shop() {
  return (
    <>
  {/* Breadcrumb Section Begin */}
  <section className="breadcrumb-option">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="breadcrumb__text">
            <h4>Shop</h4>
            <div className="breadcrumb__links">
              <a href="./index.html">Home</a>
              <span>Shop</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* Breadcrumb Section End */}

  {/* Shop Section Begin */}
  <section className="shop spad">
    <div className="container">
      <div className="row">
        {/* Sidebar */}
        <div className="col-lg-3 col-md-3">
          <div className="shop__sidebar">

            {/* Categories */}
            <div className="shop__sidebar__accordion">
              <div className="accordion" id="accordionExample">

                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
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

                {/* Branding */}
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
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
                    <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
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
                    <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                  </div>
                  <div
                    id="collapseFour"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__size">
                        <label htmlFor="xs">
                          xs
                          <input type="radio" id="xs" />
                        </label>
                        <label htmlFor="sm">
                          s
                          <input type="radio" id="sm" />
                        </label>
                        <label htmlFor="md">
                          m
                          <input type="radio" id="md" />
                        </label>
                        <label htmlFor="xl">
                          xl
                          <input type="radio" id="xl" />
                        </label>
                        <label htmlFor="2xl">
                          2xl
                          <input type="radio" id="2xl" />
                        </label>
                        <label htmlFor="xxl">
                          xxl
                          <input type="radio" id="xxl" />
                        </label>
                        <label htmlFor="3xl">
                          3xl
                          <input type="radio" id="3xl" />
                        </label>
                        <label htmlFor="4xl">
                          4xl
                          <input type="radio" id="4xl" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Colors */}
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                  </div>
                  <div
                    id="collapseFive"
                    className="collapse show"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      <div className="shop__sidebar__color">
                        <label className="c-1" htmlFor="sp-1">
                          <input type="radio" id="sp-1" />
                        </label>
                        <label className="c-2" htmlFor="sp-2">
                          <input type="radio" id="sp-2" />
                        </label>
                        <label className="c-3" htmlFor="sp-3">
                          <input type="radio" id="sp-3" />
                        </label>
                        <label className="c-4" htmlFor="sp-4">
                          <input type="radio" id="sp-4" />
                        </label>
                        <label className="c-5" htmlFor="sp-5">
                          <input type="radio" id="sp-5" />
                        </label>
                        <label className="c-6" htmlFor="sp-6">
                          <input type="radio" id="sp-6" />
                        </label>
                        <label className="c-7" htmlFor="sp-7">
                          <input type="radio" id="sp-7" />
                        </label>
                        <label className="c-8" htmlFor="sp-8">
                          <input type="radio" id="sp-8" />
                        </label>
                        <label className="c-9" htmlFor="sp-9">
                          <input type="radio" id="sp-9" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tags */}
                <div className="card">
                  <div className="card-heading">
                    <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
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

        {/* Product List */}
        <div className="col-lg-9 col-md-9">
          <div className="row">
            <div className="col-lg-12">
              <div className="shop__product__option">
                <div className="row">
                  <div className="col-lg-7 col-md-7">
                    <div className="shop__product__option__left">
                      <p>Showing 1–12 of 126 results</p>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-5">
                    <div className="shop__product__option__right">
                      <p>Sort by:</p>
                      <select>
                        <option value="">A-Z</option>
                        <option value="">1-10</option>
                        <option value="">10-50</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-1.jpg')" }}
                >
                  <div className="label new">New</div>
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Buttons tweed blazer</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>

            {/* Product 2 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-2.jpg')" }}
                >
                  <div className="label">Sale</div>
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Flowy striped skirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">
                    $ 49.0 <span>$ 59.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 3 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-3.jpg')" }}
                >
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Cotton T-shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">$ 29.0</div>
                </div>
              </div>
            </div>

            {/* Product 4 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-4.jpg')" }}
                >
                  <div className="label">Sale</div>
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Slim striped pocket shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">
                    $ 29.0 <span>$ 39.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 5 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-5.jpg')" }}
                >
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Fit micro corduroy shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">$ 59.0</div>
                </div>
              </div>
            </div>

            {/* Product 6 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-6.jpg')" }}
                >
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Tropical shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">$ 49.0</div>
                </div>
              </div>
            </div>
            {/* Product 7 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-7.jpg')" }}
                >
                  <div className="label">Sale</div>
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Pocket cotton shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">
                    $ 29.0 <span>$ 39.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Product 8 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-8.jpg')" }}
                >
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Shirt with bow</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">$ 39.0</div>
                </div>
              </div>
            </div>

            {/* Product 9 */}
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="product__item sale">
                <div
                  className="product__item__pic set-bg"
                  style={{ backgroundImage: "url('/img/product/product-9.jpg')" }}
                >
                  <div className="label">Sale</div>
                  <ul className="product__hover">
                    <li><a href="#"><span className="arrow_expand" /></a></li>
                    <li><a href="#"><span className="icon_heart_alt" /></a></li>
                    <li><a href="#"><span className="icon_bag_alt" /></a></li>
                  </ul>
                </div>
                <div className="product__item__text">
                  <h6><a href="#">Printed cotton T-shirt</a></h6>
                  <div className="rating">
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                    <i className="fa fa-star" />
                  </div>
                  <div className="product__price">
                    $ 21.0 <span>$ 29.0</span>
                  </div>
                </div>
              </div>
            </div>

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
        {/* End Product List */}

      </div>
    </div>
  </section>
  {/* Shop Section End */}
</>
    );
}


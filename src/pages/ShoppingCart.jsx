import { useEffect, useState } from "react";
import '../assets/Css/bootstrap.min.css';
import '../assets/Css/font-awesome.min.css';
import '../assets/Css/elegant-icons.css';
import '../assets/Css/magnific-popup.css';
import '../assets/Css/nice-select.css';
import '../assets/Css/owl.carousel.min.css';
import '../assets/Css/slicknav.min.css';
import '../assets/Css/style.css';
import { getAuthData } from '../utils/dadosuser'
export default function ShoppingCart() {
  const url = import.meta.env.VITE_API_URL;

  const authData = getAuthData();
  const token = authData?.token;
  const [cartTotal, setCartTotal] = useState(0);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  // 🔹 BUSCAR PRODUTOS
  useEffect(() => {
    fetch(`${url}/products/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Products:", data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Erro produtos:", err));
  }, [url]);

  // 🔹 BUSCAR CARRINHO
  useEffect(() => {
    if (!token) return;

    fetch(`${url}/sales/carts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        authorization: token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Cart:", data);
        setCart(Array.isArray(data) ? data : [data]);
      })
      .catch((err) => console.error("Erro carrinho:", err));
  }, [url, token]);

  // 🔹 COMPARAR productId
  useEffect(() => {
  if (!Array.isArray(products) || !Array.isArray(cart)) {
    setCartProducts([]);
    return;
  }

  const cartIds = cart
    .filter(item => item.status === "cart")
    .map(item => item.product_id);

  const filtered = products.filter(product =>
    cartIds.includes(product.id)
  );

  setCartProducts(filtered);
}, [products, cart]);

  useEffect(() => {
    if (!cartProducts.length || !cart.length) {
      setCartTotal(0);
      return;
    }

    const total = cartProducts.reduce((sum, product) => {
      const cartItem = cart.find(
        (item) => item.product_id === product.id
      );

      const quantity = cartItem?.amount || 1;

      return sum + product.price * quantity;
    }, 0);

    setCartTotal(total);
  }, [cartProducts, cart]);

  return (
    <>

      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Shopping Cart</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Shopping Cart</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart */}
      <section className="shopping-cart spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="shopping__cart__table">
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartProducts.length === 0 && (
                      <tr>
                        <td colSpan="4">Carrinho vazio</td>
                      </tr>
                    )}

                    {cartProducts.map((product) => {
                      const cartItem = cart.find(
                        (item) => item.product_id === product.id
                      );

                      const quantity = cartItem?.amount || 1;

                      return (
                        <tr key={product.id}>
                          <td className="product__cart__item">
                            <div className="product__cart__item__pic">
                              <img
                                src={product.image || `url(${url}/products/${product.id}/image)`}
                                alt={product.name}
                              />
                            </div>
                            <div className="product__cart__item__text">
                              <h6>{product.name}</h6>
                              <h5>R$ {product.price}</h5>
                            </div>
                          </td>

                          <td className="quantity__item">
                            <div className="quantity">
                              <div className="pro-qty-2">
                                <input
                                  type="text"
                                  value={quantity}
                                  readOnly
                                />
                              </div>
                            </div>
                          </td>

                          <td className="cart__price">
                            R$ {(product.price * quantity).toFixed(2)}
                          </td>

                          <td className="cart__close">
                            <i className="fa fa-close"></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>


                </table>
              </div>

              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn">
                    <a href="#">Continue Shopping</a>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6">
                  <div className="continue__btn update__btn">
                    <a href="#">
                      <i className="fa fa-spinner"></i> Update cart
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="cart__discount">
                <h6>Discount codes</h6>
                <form>
                  <input type="text" placeholder="Coupon code" />
                  <button type="submit">Apply</button>
                </form>
              </div>
              <div className="cart__total">
                <h6>Cart total</h6>
                <ul>
                  <li>
                    Subtotal <span>R$ {cartTotal.toFixed(2)}</span>
                  </li>
                  <li>
                    Total <span>R$ {cartTotal.toFixed(2)}</span>
                  </li>
                </ul>
                <a href="#" className="primary-btn">
                  Proceed to checkout
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Search */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">+</div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>
    </>
  );
}

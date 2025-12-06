import { useEffect } from "react";

export default function Checkout() {
  useEffect(() => {
    document.querySelectorAll(".set-bg").forEach((el) => {
      const bg = el.getAttribute("data-setbg");
      if (bg) el.style.backgroundImage = `url(${bg})`;
    });
  }, []);

  return (
    <div>
      {/* Breadcrumb Section */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>Checkout</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <a href="/shop">Shop</a>
                  <span>Checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checkout Section */}
      <section className="checkout spad">
        <div className="container">
          <div className="checkout__form">
            <h4>Billing Details</h4>
            <form>
              <div className="row">
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Fist Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="checkout__input">
                        <p>
                          Last Name<span>*</span>
                        </p>
                        <input type="text" />
                      </div>
                    </div>
                  </div>

                  <div className="checkout__input">
                    <p>
                      Country<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Address<span>*</span>
                    </p>
                    <input type="text" placeholder="Street Address" className="checkout__input__add" />
                    <input type="text" placeholder="Apartment, suite, unite ect (optinal)" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Town/City<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Country/State<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Postcode / ZIP<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Phone<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input">
                    <p>
                      Email<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input__checkbox">
                    <label htmlFor="acc">
                      Create an account?
                      <input type="checkbox" id="acc" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <p>Create an account by entering the information below.</p>

                  <div className="checkout__input">
                    <p>
                      Account Password<span>*</span>
                    </p>
                    <input type="text" />
                  </div>

                  <div className="checkout__input__checkbox">
                    <label htmlFor="diff-acc">
                      Ship to a different address?
                      <input type="checkbox" id="diff-acc" />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="checkout__input">
                    <p>Order notes</p>
                    <input type="text" placeholder="Notes about your order, e.g. special notes for delivery." />
                  </div>
                </div>

                <div className="col-lg-4 col-md-6">
                  <div className="checkout__order">
                    <h4>Your Order</h4>
                    <div className="checkout__order__products">
                      Products <span>Total</span>
                    </div>
                    <ul>
                      <li>
                        Vegetable's Package <span>$75.99</span>
                      </li>
                      <li>
                        Fresh Vegetable <span>$151.99</span>
                      </li>
                      <li>
                        Organic Bananas <span>$53.99</span>
                      </li>
                    </ul>
                    <div className="checkout__order__subtotal">
                      Subtotal <span>$750.99</span>
                    </div>
                    <div className="checkout__order__total">
                      Total <span>$750.99</span>
                    </div>

                    <div className="checkout__input__checkbox">
                      <label htmlFor="payment">
                        Check Payment
                        <input type="checkbox" id="payment" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <div className="checkout__input__checkbox">
                      <label htmlFor="paypal">
                        Paypal
                        <input type="checkbox" id="paypal" />
                        <span className="checkmark"></span>
                      </label>
                    </div>

                    <button type="submit" className="site-btn">
                      PLACE ORDER
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
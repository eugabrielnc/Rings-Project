import React from "react";

export default function About() {
  return (
    <>
      {/* Page Preloader */}
     

      {/* Breadcrumb */}
      <section className="breadcrumb-option">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4>About Us</h4>
                <div className="breadcrumb__links">
                  <a href="/">Home</a>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="about__pic">
                <img src="/img/about/about-us.jpg" alt="" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Who We Are ?</h4>
                <p>
                  Contextual advertising programs sometimes have strict policies that need to be
                  adhered too. Let’s take Google as an example.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Who We Do ?</h4>
                <p>
                  In this digital generation where information can be easily obtained within seconds,
                  business cards still have retained their importance.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Why Choose Us</h4>
                <p>
                  A two or three storey house is the ideal way to maximise the piece of earth on which
                  our home sits, but for older or infirm people.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
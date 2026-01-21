import React from "react";

export default function About() {

const pageStyle = {
  minHeight: "100vh",
  backgroundImage: "url('/img/fundo2.jpeg')",
  backgroundSize: "cover",
  backgroundPosition: "center top",
  backgroundRepeat: "no-repeat",
  position: "relative",
};


  const overlayStyle = {
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(255,255,255,0.25)", 
  zIndex: 0,
};

  const contentStyle = {
  position: "relative",
  zIndex: 1,
};




  return (
    <div style={pageStyle}>
      {/* Overlay */}
      <div style={overlayStyle}></div>
      <div style={contentStyle}></div>
    <>
      {/* Page Preloader */}
     


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
                <h4>Quem nós somos?</h4>
                <p>
                  Somos uma joalheria especializada na criação de alianças que representam momentos únicos e inesquecíveis. Nossa missão é transformar histórias de amor em peças exclusivas, combinando elegância, significado e qualidade superior. Cada aliança que produzimos carrega um propósito: celebrar união, compromisso e eternidade.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>O que nós fazemos?</h4>
                <p>
                  Produzimos alianças de noivado, casamento e compromisso com design refinado, acabamento impecável e materiais de alta durabilidade.
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-6">
              <div className="about__item">
                <h4>Porque nós escolher</h4>
                <p>
                  Porque oferecemos alianças de alta qualidade com design exclusivo, personalização completa e um atendimento dedicado que transforma cada escolha em um momento especial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
    </div>
  );
}
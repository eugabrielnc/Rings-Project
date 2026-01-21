import React from 'react';

const InstructionsPage = ({ onStart }) => {
  return (
      <div className="container">
          <div className="row align-items-center mb-5 pb-5" style={{ borderBottom: "1px solid #eee" }}>
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div style={{ paddingRight: "30px" }}>
              <h3 style={{ 
                fontSize: "clamp(22px, 5vw, 28px)", 
                color: "#111", 
                marginBottom: "15px",
                fontWeight: "600",
                marginTop: "25px"
              }}>
                <span style={{ 
                  background: "#d4af37", 
                  color: "#fff", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  1
                </span>
                Calibre a Tela
              </h3>
              <p style={{ fontSize: "clamp(16px, 4vw, 20px)", color: "#666", lineHeight: "1.8" }}>
                Você precisará de um <strong>cartão de crédito ou débito físico</strong> padrão. Vamos usar ele para calibrar a escala da tela, 
                garantindo que as medidas sejam precisas. Basta ajustar até que o cartão virtual tenha exatamente o mesmo 
                tamanho do cartão real.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div style={{
              borderRadius: "15px",
              padding: "clamp(20px, 5vw, 40px)",
              textAlign: "center"
            }}>
              <i className="fa fa-credit-card" style={{
                fontSize: "clamp(50px, 10vw, 80px)",
                color: "#d4af37",
                marginBottom: "15px"
              }}></i>
              <p style={{ color: "#999", fontSize: "14px", margin: "10px 0" }}>
                Cartão padrão: 85.6mm × 54mm
              </p>
            </div>
          </div>
          <div className="col-12">
           <div className="row mb-5">
          <div className="col-12">
            <div style={{
              background:  "linear-gradient(90deg, #ffffff 0%, #f7e9b3 10%, #d4af37 95%)",
              borderLeft: "4px solid #d4af37",
              padding: "clamp(15px, 3vw, 20px)",
              borderRadius: "5px",
              marginTop: "30px"
            }}>
              <h4 style={{ fontSize: "clamp(14px, 3vw, 16px)", color: "#111", marginBottom: "10px", fontWeight: "600" }}>
                  ⚠️ Avisos Importantes:
              </h4>
              <ul style={{ marginBottom: 0, paddingLeft: "20px", color: "#666", fontSize: "clamp(14px, 3vw, 18px)" }}>
                <li>Use um cartão de crédito padrão (não vale-alimentação ou outros formatos)</li>
                <li>Mantenha a tela na vertical durante a medição</li>
                <li>Certifique-se de que o brilho da tela está no máximo</li>
                <li>Se estiver entre dois tamanhos, escolha o maior para mais conforto</li>
              </ul>
            </div>
          </div>
        </div>
        </div>
        </div>
          
       
    
        <div className="row">
          {/* Logo e Título */}
          <div className="col-lg-5 col-md-12 mb-5 mb-lg-0" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <div style={{ textAlign: "center" }}>
              {/* Ícone de Anel */}
              <div style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                margin: "0 auto 20px"
              }}>
                <img 
                  src="/img/aliancas.png" 
                  alt="logo" 
                  style={{ 
                    width: "100%", 
                    height: "auto",
                    maxWidth: "500px"
                  }} 
                />
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="col-lg-7 col-md-12" style={{ paddingLeft: "0", paddingRight: "0" }}>
            <style>
              {`
                @media (min-width: 992px) {
                  .button-container-custom {
                    padding-left: 90px !important;
                    padding-right: 90px !important;
                  }
                }
              `}
            </style>
            <div className="button-container-custom" style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "stretch",
              gap: "20px",
              width: "100%",
              padding: "0 15px"
            }}>

              {/* Botão 1: Medir com anel na tela */}
            <button className='button-action'
              onClick={onStart}
              
            >
              Medir com anel na tela
            </button>

            {/* Botão 2: Assistir ao vídeo tutorial */}
            <button
              onClick={() => window.open('https://www.youtube.com/watch?v=YOUR_VIDEO_ID', '_blank')}
              className='button-action'
             
            >
              Assistir ao vídeo tutorial
            </button>

            {/* Botão 3: Falar no WhatsApp */}
            <button
              onClick={() => window.open('https://wa.me/5511999999999?text=Olá! Preciso de ajuda para medir meu anel', '_blank')}
              className='button-action'
              
            >
              Falar no WhatsApp
            </button>

            {/* Botão 4: Acessar a loja online */}
            <button
              onClick={() => window.location.href = '/shop'}
              className='button-action'
              
            >
              Ver alianças na loja
            </button>

            </div>
          </div>
        </div>
      </div>
  );
};

export default InstructionsPage;

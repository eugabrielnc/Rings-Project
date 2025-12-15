import React from 'react';

const InstructionsPage = ({ onStart }) => {
  return (
    <section className="contact spad">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 style={{ 
              fontSize: "36px", 
              color: "#111", 
              marginBottom: "20px",
              fontWeight: "700"
            }}>
              Como Medir Seu Anel
            </h2>
            <p style={{ fontSize: "18px", color: "#666", maxWidth: "700px", margin: "0 auto" }}>
              Descubra seu tamanho de anel de forma precisa usando apenas um cartão de crédito e sua tela.
            </p>
          </div>
        </div>

        {/* Step 1: Calibration */}
        <div className="row align-items-center mb-5 pb-5" style={{ borderBottom: "1px solid #eee" }}>
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div style={{ paddingRight: "30px" }}>
              <h3 style={{ 
                fontSize: "28px", 
                color: "#111", 
                marginBottom: "15px",
                fontWeight: "600"
              }}>
                <span style={{ 
                  background: "#d4a574", 
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
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.8" }}>
                Você precisará de um <strong>cartão de crédito</strong> padrão. Vamos usar ele para calibrar a escala da tela, 
                garantindo que as medidas sejam precisas. Basta ajustar até que o cartão virtual tenha exatamente o mesmo 
                tamanho do cartão real.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div style={{
              background: "#f8f8f8",
              borderRadius: "15px",
              padding: "40px",
              textAlign: "center"
            }}>
              <i className="fa fa-credit-card" style={{
                fontSize: "80px",
                color: "#d4a574",
                marginBottom: "15px"
              }}></i>
              <p style={{ color: "#999", fontSize: "14px", margin: "10px 0" }}>
                Cartão padrão: 85.6mm × 54mm
              </p>
            </div>
          </div>
        </div>

        {/* Step 2: Measure Ring */}
        <div className="row align-items-center mb-5 pb-5" style={{ borderBottom: "1px solid #eee" }}>
          <div className="col-lg-6 col-md-12 order-lg-2 mb-4 mb-lg-0">
            <div style={{ paddingLeft: "30px" }}>
              <h3 style={{ 
                fontSize: "28px", 
                color: "#111", 
                marginBottom: "15px",
                fontWeight: "600"
              }}>
                <span style={{ 
                  background: "#d4a574", 
                  color: "#fff", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  2
                </span>
                Meça o Anel
              </h3>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.8" }}>
                Coloque seu anel físico sobre o círculo virtual na tela. Ajuste o tamanho do círculo até que ele 
                fique <strong>exatamente do mesmo tamanho</strong> que o diâmetro interno do seu anel (onde o dedo passa).
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 order-lg-1">
            <div style={{
              background: "#f8f8f8",
              borderRadius: "15px",
              padding: "40px",
              textAlign: "center"
            }}>
              <div style={{
                width: "120px",
                height: "120px",
                border: "4px solid #d4a574",
                borderRadius: "50%",
                margin: "0 auto 15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                <div style={{
                  width: "80px",
                  height: "80px",
                  background: "rgba(212, 165, 116, 0.2)",
                  borderRadius: "50%"
                }}></div>
              </div>
              <p style={{ color: "#999", fontSize: "14px", margin: "10px 0" }}>
                Ajuste até coincidir
              </p>
            </div>
          </div>
        </div>

        {/* Step 3: Get Result */}
        <div className="row align-items-center mb-5">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <div style={{ paddingRight: "30px" }}>
              <h3 style={{ 
                fontSize: "28px", 
                color: "#111", 
                marginBottom: "15px",
                fontWeight: "600"
              }}>
                <span style={{ 
                  background: "#d4a574", 
                  color: "#fff", 
                  width: "40px", 
                  height: "40px", 
                  borderRadius: "50%", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center",
                  marginRight: "15px"
                }}>
                  3
                </span>
                Descubra Seu Tamanho
              </h3>
              <p style={{ fontSize: "16px", color: "#666", lineHeight: "1.8" }}>
                O sistema calculará automaticamente seu tamanho em <strong>Aro Brasileiro</strong>, 
                <strong> US</strong> e <strong>EU</strong>. Você verá o resultado em tempo real enquanto ajusta o anel.
              </p>
            </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div style={{
              background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
              border: "2px solid #d4a574",
              borderRadius: "15px",
              padding: "30px",
              textAlign: "center"
            }}>
              <div style={{ fontSize: "48px", color: "#d4a574", fontWeight: "bold" }}>20</div>
              <p style={{ color: "#666", fontSize: "14px", marginTop: "10px" }}>
                Aro Brasileiro (US 10, EU 62)
              </p>
            </div>
          </div>
        </div>

        {/* Important Notes */}
        <div className="row mb-4">
          <div className="col-12">
            <div style={{
              background: "#fff9e6",
              borderLeft: "4px solid #d4a574",
              padding: "20px",
              borderRadius: "5px"
            }}>
              <h4 style={{ fontSize: "16px", color: "#111", marginBottom: "10px", fontWeight: "600" }}>
                💡 Dicas Importantes:
              </h4>
              <ul style={{ marginBottom: 0, paddingLeft: "20px", color: "#666", fontSize: "14px" }}>
                <li>Use um cartão de crédito padrão (não vale-alimentação ou outros formatos)</li>
                <li>Mantenha a tela na vertical durante a medição</li>
                <li>Certifique-se de que o brilho da tela está no máximo</li>
                <li>Se estiver entre dois tamanhos, escolha o maior para mais conforto</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="row">
          <div className="col-12 text-center">
            <button
              onClick={onStart}
              className="site-btn"
              style={{
                background: "linear-gradient(135deg, #d4a574 0%, #c8935e 100%)",
                border: "none",
                padding: "16px 50px",
                fontSize: "16px",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "2px",
                cursor: "pointer",
                boxShadow: "0 4px 15px rgba(212, 165, 116, 0.3)"
              }}
            >
              Começar Medição
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructionsPage;

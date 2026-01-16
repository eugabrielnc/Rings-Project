import React from 'react';
const ScaleCalibration = ({
  cardHeightPx,
  onCardHeightChange,
  onCalibrate,
  onBack
}) => {
  // Calculate card width maintaining credit card aspect ratio (85.6 / 53.98)
  const cardWidthPx = cardHeightPx * (85.6 / 53.98);

  return (
    <section className="contact spad">
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h2 style={{
              fontSize: "32px",
              color: "#111",
              marginBottom: "15px",
              fontWeight: "700"
            }}>
              Calibrar a Tela
            </h2>
            <p style={{ fontSize: "16px", color: "#666", maxWidth: "600px", margin: "0 auto 30px" }}>
              Coloque um <strong>cartão de crédito</strong> sobre o retângulo abaixo e ajuste
              até que fiquem exatamente do mesmo tamanho.
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            {/* Calibration Area */}
            <div style={{
              background: "#f8f8f8",
              borderRadius: "20px",
              padding: "60px 20px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              marginBottom: "30px",
              minHeight: "400px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {/* Instruction Text */}
              <p style={{
                fontSize: "18px",
                color: "#111",
                fontWeight: "600",
                marginBottom: "40px"
              }}>
                Arraste até ficar do tamanho do cartão
              </p>

              {/* Two Horizontal Lines */}
              <div style={{
                position: "relative",
                width: "100%",
                maxWidth: "600px",
                marginBottom: "50px"
              }}>
                {/* Top Line */}
                <div style={{
                  width: "100%",
                  height: "3px",
                  background: "#d4a574",
                  marginBottom: `${cardHeightPx}px`,
                  boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)"
                }} />

                {/* Bottom Line */}
                <div style={{
                  width: "100%",
                  height: "3px",
                  background: "#d4a574",
                  boxShadow: "0 2px 8px rgba(212, 165, 116, 0.3)"
                }} />

                {/* Size indicator - just showing pixels during calibration */}
                <div style={{
                  position: "absolute",
                  right: "10px",      // nunca negativo
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "12px",
                  color: "#999",
                  maxWidth: "90%",
                  textAlign: "right",
                  whiteSpace: "nowrap"
                }}>
                  {cardHeightPx}px
                </div>

                {/* Target size reminder */}
                <div style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "-35px",
                  transform: "translateX(-50%)",
                  fontSize: "12px",
                  color: "#d4a574",
                  whiteSpace: "nowrap",
                  fontWeight: "600"
                }}>
                  ⬌ 53.98mm (altura do cartão)
                </div>
              </div>

              {/* Slider Control */}
              <div style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}>
                <input
                  type="range"
                  min="150"
                  max="600"
                  value={cardHeightPx}
                  onChange={(e) => onCardHeightChange(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "10px",
                    borderRadius: "5px",
                    outline: "none",
                    marginBottom: "40px",
                    cursor: "pointer",
                    WebkitAppearance: "none",
                    background: "linear-gradient(to right, #e0e0e0 0%, #d4a574 50%, #e0e0e0 100%)"
                  }}
                />

                <button
                  onClick={onCalibrate}
                  className="site-btn"
                  style={{
                    background: "linear-gradient(135deg, #d4a574 0%, #c8935e 100%)",
                    border: "none",
                    padding: "14px 40px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    cursor: "pointer"
                  }}
                >
                  Prontinho, já calibrei
                </button>
              </div>
            </div>

            {/* Helper Text */}
            <div style={{
              background: "#fff9e6",
              borderLeft: "4px solid #d4a574",
              padding: "15px 20px",
              borderRadius: "5px",
              marginBottom: "20px"
            }}>
              <p style={{
                fontSize: "14px",
                color: "#666",
                marginBottom: 0
              }}>
                <strong>💡 Dica:</strong> Coloque seu cartão de crédito sobre a tela e ajuste o slider
                até que a distância entre as duas linhas seja exatamente a altura do cartão (53.98mm).
              </p>
            </div>

            {/* Back Button */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={onBack}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4a574",
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                ← Voltar para instruções
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScaleCalibration;

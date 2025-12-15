import React, { useState } from "react";
import { useScaleCalibration } from "../hooks/useScaleCalibration";
import InstructionsPage from "../componentes/medidor/InstructionsPage";
import ScaleCalibration from "../componentes/medidor/ScaleCalibration";
import VirtualRingSizer from "../componentes/medidor/VirtualRingSizer";

export default function Medida() {
  const [step, setStep] = useState(1);
  

  const [finalRingSize, setFinalRingSize] = useState(null);
  
 
  const {
    isCalibrated,
    cardHeightPx,
    setCardHeightPx,
    calibrateScale,
    resetCalibration,
    pixelsToMm
  } = useScaleCalibration();
  const handleStart = () => {
    setStep(2); 
  };
  const handleCalibrate = () => {
    calibrateScale();
    setStep(3);
  };
  const handleComplete = (ringSize) => {
    setFinalRingSize(ringSize);
    setStep(4); 
  };

 
  const handleRecalibrate = () => {
    resetCalibration();
    setStep(2); 
  };

  
  const handleMeasureAgain = () => {
    resetCalibration();
    setFinalRingSize(null);
    setStep(1); 
  };

  return (
    <>
    
      <section 
        className="breadcrumb-option"
        style={{
          backgroundImage: "url(/img/breadcrumb-bg.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "60px 0"
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb__text">
                <h4 style={{ color: "#fff", fontSize: "36px", marginBottom: "10px" }}>
                  {step === 1 ? "Como Medir" : step === 2 ? "Calibragem" : step === 3 ? "Medição" : "Seu Tamanho"}
                </h4>
                <div className="breadcrumb__links">
                  <a href="/" style={{ color: "#fff" }}>Home</a>
                  <span style={{ color: "#fff", margin: "0 10px" }}>»</span>
                  <span style={{ color: "#ddd" }}>Medidor Virtual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Step 1: Instructions */}
      {step === 1 && (
        <InstructionsPage onStart={handleStart} />
      )}

      {/* Step 2: Scale Calibration */}
      {step === 2 && (
        <ScaleCalibration
          cardHeightPx={cardHeightPx}
          onCardHeightChange={setCardHeightPx}
          onCalibrate={handleCalibrate}
          onBack={() => setStep(1)}
        />
      )}

      {/* Step 3: Ring Measurement */}
      {step === 3 && isCalibrated && (
        <VirtualRingSizer
          pixelsToMm={pixelsToMm}
          onComplete={handleComplete}
          onRecalibrate={handleRecalibrate}
        />
      )}

      {/* Step 4: Result Display */}
      {step === 4 && finalRingSize && (
        <section className="contact spad">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div style={{
                  background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
                  border: "3px solid #d4a574",
                  borderRadius: "20px",
                  padding: "50px 30px",
                  textAlign: "center",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)"
                }}>
                  <i className="fa fa-check-circle" style={{
                    fontSize: "60px",
                    color: "#4CAF50",
                    marginBottom: "20px"
                  }}></i>
                  
                  <h2 style={{ 
                    fontSize: "32px", 
                    color: "#111", 
                    marginBottom: "30px",
                    fontWeight: "700"
                  }}>
                    Seu tamanho é:
                  </h2>

                  <div style={{
                    fontSize: "72px",
                    fontWeight: "bold",
                    color: "#d4a574",
                    marginBottom: "10px"
                  }}>
                    {finalRingSize.aro}
                  </div>
                  
                  <div style={{ fontSize: "18px", color: "#666", marginBottom: "20px" }}>
                    Aro Brasileiro
                  </div>

                  <div style={{
                    background: "#fff",
                    borderRadius: "15px",
                    padding: "25px",
                    marginBottom: "30px",
                    textAlign: "left"
                  }}>
                    <h4 style={{ 
                      fontSize: "18px", 
                      color: "#111", 
                      marginBottom: "15px",
                      fontWeight: "600",
                      textAlign: "center"
                    }}>
                      Conversões Internacionais:
                    </h4>
                    <div style={{ 
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      fontSize: "14px"
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <strong style={{ color: "#d4a574" }}>US Size:</strong>
                        <br />
                        {finalRingSize.us}
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <strong style={{ color: "#d4a574" }}>EU Size:</strong>
                        <br />
                        {finalRingSize.eu}
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: "#fff",
                    borderRadius: "15px",
                    padding: "25px",
                    marginBottom: "30px",
                    textAlign: "left"
                  }}>
                    <h4 style={{ 
                      fontSize: "18px", 
                      color: "#111", 
                      marginBottom: "15px",
                      fontWeight: "600",
                      textAlign: "center"
                    }}>
                      Medidas:
                    </h4>
                    <div style={{ 
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                      fontSize: "14px"
                    }}>
                      <div style={{ textAlign: "center" }}>
                        <strong style={{ color: "#d4a574" }}>Diâmetro:</strong>
                        <br />
                        {finalRingSize.diameter} mm
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <strong style={{ color: "#d4a574" }}>Circunferência:</strong>
                        <br />
                        {finalRingSize.circumference} mm
                      </div>
                    </div>
                  </div>

                  <div style={{
                    background: "#fff9e6",
                    borderLeft: "4px solid #d4a574",
                    padding: "15px",
                    marginBottom: "30px",
                    textAlign: "left",
                    fontSize: "14px",
                    color: "#666"
                  }}>
                    <strong style={{ color: "#111" }}>💡 Dica:</strong> Se estiver entre dois tamanhos ou em dúvida, recomendamos escolher o tamanho maior para maior conforto.
                  </div>

                  <div style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    marginBottom: "20px"
                  }}>
                    <button
                      onClick={() => window.location.href = '/shop'}
                      className="site-btn"
                      style={{
                        background: "linear-gradient(135deg, #d4a574 0%, #c8935e 100%)",
                        border: "none",
                        padding: "14px 30px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      <i className="fa fa-shopping-bag" style={{ marginRight: "8px" }}></i>
                      Ver Alianças
                    </button>
                    
                    <button
                      onClick={() => window.open(`https://wa.me/5511999999999?text=Olá! Descobri que meu tamanho de anel é Aro ${finalRingSize.aro}`, '_blank')}
                      className="site-btn"
                      style={{
                        background: "#25D366",
                        border: "none",
                        padding: "14px 30px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}
                    >
                      <i className="fab fa-whatsapp" style={{ marginRight: "8px" }}></i>
                      Compartilhar
                    </button>
                  </div>

                  <button
                    onClick={handleMeasureAgain}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#d4a574",
                      fontSize: "14px",
                      cursor: "pointer",
                      textDecoration: "underline"
                    }}
                  >
                    <i className="fa fa-redo" style={{ marginRight: "5px" }}></i>
                    Medir novamente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back Button */}
      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row mt-4">
            <div className="col-12 text-center">
              <a 
                href="/medida-virtual" 
                style={{
                  color: "#d4a574",
                  fontSize: "16px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <i className="fa fa-arrow-left"></i>
                Voltar ao Menu
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

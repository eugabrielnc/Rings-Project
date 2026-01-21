import React, { useState, useEffect } from 'react';
import { findClosestRingSize } from '../../utils/ringSizeUtils';
const VirtualRingSizer = ({ 
  pixelsToMm,
  onComplete,
  onRecalibrate 
}) => {
  // Ring inner diameter in pixels (user adjusts this)
  const [ringDiameterPx, setRingDiameterPx] = useState(150);
  
  // Calculated ring size based on diameter
  const [ringSize, setRingSize] = useState(null);
  
  /**
   * Real-time ring size calculation
   * Triggered whenever ring diameter changes
   */
  useEffect(() => {
    // Convert pixels to millimeters using calibration scale
    const diameterMm = pixelsToMm(ringDiameterPx);
    
    // Find closest ring size in Brazilian table
    const size = findClosestRingSize(diameterMm);
    setRingSize(size);
    
    console.log('📏 Ring measurement:', {
      diameterPx: ringDiameterPx,
      diameterMm: diameterMm.toFixed(2),
      aro: size?.aro,
      us: size?.us,
      eu: size?.eu
    });
  }, [ringDiameterPx, pixelsToMm]);
  
  // Ring thickness for visual representation (4mm ≈ typical ring width)
  const ringThicknessPx = 6;
  
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
              Agora é fácil!
            </h2>
            <p style={{ fontSize: "20px", color: "#666", maxWidth: "650px", margin: "0 auto 30px" }}>
              Coloque seu anel físico sobre o círculo virtual e ajuste até que{" "}
              <strong>o círculo interno fique exatamente do mesmo tamanho</strong> que o 
              diâmetro interno do seu anel (onde o dedo passa).
            </p>
          </div>
        </div>

            {/* Helper Text */}
            <div style={{
              background: "linear-gradient(90deg, #ffffff 0%, #f7e9b3 10%, #d4af37 95%)",
              borderLeft: "4px solid #f7e9b3",
              padding: "15px 20px",
              borderRadius: "5px",
              marginBottom: "20px"
            }}>
              <p style={{ 
                fontSize: "18px", 
                color: "#666",
                marginBottom: 0
              }}>
                <strong>💡 Dica:</strong> O círculo interno tracejado representa o diâmetro interno do anel. 
                Ajuste até que ele tenha exatamente o mesmo tamanho que a abertura do seu anel físico.
              </p>
            </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            {/* Ring Visualization */}
            <div style={{
              background: "#f8f8f8",
              borderRadius: "20px",
              padding: "40px 20px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              marginBottom: "30px"
            }}>
              {/* Virtual Ring (SVG) */}
              <div style={{
                position: "relative",
                display: "inline-block",
                marginBottom: "40px"
              }}>
                <svg 
                  width={Math.min(ringDiameterPx + 100, window.innerWidth * 0.8)} 
                  height={Math.min(ringDiameterPx + 100, window.innerHeight * 0.5)}
                  style={{
                    maxWidth: "90vw",
                    maxHeight: "70vh"
                  }}
                >
                  <defs>
    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="95%" style={{ stopColor: "#d4af37", stopOpacity: 1 }} />
    </linearGradient>
  </defs>
  <defs>
    <linearGradient id="Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style={{ stopColor: "#ffffff", stopOpacity: 1 }} />
      <stop offset="10%" style={{ stopColor: "#f7e9b3", stopOpacity: 1 }} />
      <stop offset="95%" style={{ stopColor: "#d4af37", stopOpacity: 1 }} />
    </linearGradient>
  </defs>

                  {/* Ring circle - single border */}
                  <circle
                    cx={(ringDiameterPx + 100) / 2}
                    cy={(ringDiameterPx + 100) / 2}
                    r={ringDiameterPx / 2}
                    fill="none"
                    stroke="url(#goldGradient)"
                    strokeWidth="3"
                  />
                </svg>
              </div>

              {/* Real-time Size Display */}
              {ringSize && (
                <div style={{
                  background: "linear-gradient(135deg, #fff9f0 0%, #fff5e6 100%)",
                  border: "5px solid #f7e9b3",
                  borderRadius: "15px",
                  padding: "20px",
                  marginBottom: "30px",
                  maxWidth: "400px",
                  margin: "0 auto 30px"
                }}>
                  <div style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
                    Seu tamanho é:
                  </div>
                  <div style={{ fontSize: "48px", color: "#d4af37", fontWeight: "bold", marginBottom: "10px" }}>
                    {ringSize.aro}
                  </div>
                  <div style={{ fontSize: "14px", color: "#666" }}>
                    Aro Brasileiro
                  </div>
                  <div style={{ 
                    fontSize: "12px", 
                    color: "#999",
                    marginTop: "10px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "15px"
                  }}>
                    <span>US {ringSize.us}</span>
                    <span>•</span>
                    <span>EU {ringSize.eu}</span>
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#999",
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid #e0e0e0"
                  }}>
                    Ø {ringSize.diameter}mm • ⌀ {ringSize.circumference}mm
                  </div>
                </div>
              )}

              {/* Slider Control */}
              <div style={{ maxWidth: "600px", margin: "0 auto" }}>
                <p style={{ 
                  fontSize: "14px", 
                  color: "#999", 
                  marginBottom: "15px",
                  fontStyle: "italic"
                }}>
                  Arraste para ajustar ↔
                </p>
                
                <input
                  type="range"
                  min="50"
                  max="400"
                  value={ringDiameterPx}
                  onChange={(e) => setRingDiameterPx(Number(e.target.value))}
                  style={{
                    width: "100%",
                    height: "8px",
                    borderRadius: "5px",
                    outline: "none",
                    marginBottom: "30px",
                    cursor: "pointer",
                    WebkitAppearance: "none",
                    background: "#ddd"
                  }}
                />

                <button
                  onClick={() => onComplete(ringSize)}
                  className="site-btn"
                  style={{
                    background: "linear-gradient(90deg, #ffffff 0%, #f7e9b3 10%, #d4af37 95%)",
                    border: "none",
                    padding: "14px 40px",
                    fontSize: "14px",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    cursor: "pointer",
                    marginRight: "10px"
                  }}
                >
                  Confirmar Tamanho
                </button>
              </div>
            </div>
            {/* Back Button */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={onRecalibrate}
                style={{
                  background: "none",
                  border: "none",
                  color: "#d4a574",
                  fontSize: "14px",
                  cursor: "pointer",
                  textDecoration: "underline"
                }}
              >
                ← Recalibrar tela
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualRingSizer;
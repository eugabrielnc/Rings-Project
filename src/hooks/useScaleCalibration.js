import { useState, useCallback } from 'react';
export const useScaleCalibration = () => {
  // Store the calibration scale factor (pixels per millimeter)
  const [pixelsPerMm, setPixelsPerMm] = useState(null);
  
  // Virtual card height in pixels (user adjusts this)
  const [cardHeightPx, setCardHeightPx] = useState(200);
  
  // Standard credit card dimensions in millimeters
  const CARD_HEIGHT_MM = 53.98;
  const CARD_WIDTH_MM = 85.60;
  
  /**
   * Calculate and save the calibration scale factor
   * This is called when user confirms the card calibration
   */
  const calibrateScale = useCallback(() => {
    // Calculate how many pixels represent 1 millimeter
    const scale = cardHeightPx / CARD_HEIGHT_MM;
    setPixelsPerMm(scale);
    
    console.log('🎯 Calibration complete:', {
      cardHeightPx,
      cardHeightMm: CARD_HEIGHT_MM,
      pixelsPerMm: scale,
      example: `100px = ${(100 / scale).toFixed(2)}mm`
    });
    
    return scale;
  }, [cardHeightPx, CARD_HEIGHT_MM]);
  
  /**
   * Convert pixels to millimeters using the calibration scale
   * @param {number} pixels - Value in pixels to convert
   * @returns {number} Value in millimeters
   */
  const pixelsToMm = useCallback((pixels) => {
    if (!pixelsPerMm) {
      console.warn('⚠️ Scale not calibrated yet');
      return 0;
    }
    return pixels / pixelsPerMm;
  }, [pixelsPerMm]);
  
  /**
   * Convert millimeters to pixels using the calibration scale
   * @param {number} mm - Value in millimeters to convert
   * @returns {number} Value in pixels
   */
  const mmToPixels = useCallback((mm) => {
    if (!pixelsPerMm) {
      console.warn('⚠️ Scale not calibrated yet');
      return 0;
    }
    return mm * pixelsPerMm;
  }, [pixelsPerMm]);
  
  /**
   * Reset calibration (useful for recalibration)
   */
  const resetCalibration = useCallback(() => {
    setPixelsPerMm(null);
    setCardHeightPx(200);
  }, []);
  
  return {
    // State
    isCalibrated: pixelsPerMm !== null,
    pixelsPerMm,
    cardHeightPx,
    
    // Card dimensions
    CARD_HEIGHT_MM,
    CARD_WIDTH_MM,
    
    // Actions
    setCardHeightPx,
    calibrateScale,
    resetCalibration,
    
    // Converters
    pixelsToMm,
    mmToPixels
  };
};

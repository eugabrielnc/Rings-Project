/**
 * Ring Size Conversion Utilities
 * 
 * This module handles conversion between ring inner diameter (mm) 
 * and standard ring sizes (Brazilian Aro, US, EU)
 */

// Brazilian ring sizes with corresponding inner diameter and circumference
export const BRAZILIAN_SIZES = [
  { aro: 12, diameter: 16.5, circumference: 51.9, us: 6, eu: 52 },
  { aro: 13, diameter: 17.0, circumference: 53.4, us: 6.5, eu: 53 },
  { aro: 14, diameter: 17.3, circumference: 54.4, us: 7, eu: 54 },
  { aro: 15, diameter: 17.7, circumference: 55.6, us: 7.5, eu: 55 },
  { aro: 16, diameter: 18.1, circumference: 56.9, us: 8, eu: 57 },
  { aro: 17, diameter: 18.5, circumference: 58.1, us: 8.5, eu: 58 },
  { aro: 18, diameter: 18.9, circumference: 59.5, us: 9, eu: 59 },
  { aro: 19, diameter: 19.4, circumference: 60.9, us: 9.5, eu: 61 },
  { aro: 20, diameter: 19.8, circumference: 62.1, us: 10, eu: 62 },
  { aro: 21, diameter: 20.2, circumference: 63.5, us: 10.5, eu: 64 },
  { aro: 22, diameter: 20.6, circumference: 64.6, us: 11, eu: 65 },
  { aro: 23, diameter: 21.0, circumference: 66.0, us: 11.5, eu: 66 },
  { aro: 24, diameter: 21.4, circumference: 67.2, us: 12, eu: 67 },
  { aro: 25, diameter: 21.8, circumference: 68.5, us: 12.5, eu: 69 },
  { aro: 26, diameter: 22.2, circumference: 69.7, us: 13, eu: 70 },
  { aro: 27, diameter: 22.6, circumference: 71.0, us: 13.5, eu: 71 },
  { aro: 28, diameter: 23.0, circumference: 72.3, us: 14, eu: 73 },
  { aro: 29, diameter: 23.4, circumference: 73.5, us: 14.5, eu: 74 },
  { aro: 30, diameter: 23.8, circumference: 74.8, us: 15, eu: 75 }
];

/**
 * Find the closest ring size based on inner diameter in millimeters
 * 
 * @param {number} diameterMm - Inner diameter of the ring in millimeters
 * @returns {object} Closest ring size with all conversions
 * 
 * Algorithm:
 * 1. Calculate absolute difference between measured diameter and each size
 * 2. Find the size with minimum difference
 * 3. Return complete size information (Aro, US, EU)
 */
export const findClosestRingSize = (diameterMm) => {
  if (!diameterMm || diameterMm <= 0) {
    return null;
  }
  
  let closestSize = BRAZILIAN_SIZES[0];
  let minDifference = Math.abs(diameterMm - closestSize.diameter);
  
  // Find closest match by comparing differences
  BRAZILIAN_SIZES.forEach(size => {
    const difference = Math.abs(diameterMm - size.diameter);
    if (difference < minDifference) {
      minDifference = difference;
      closestSize = size;
    }
  });
  
  console.log('💍 Ring size calculation:', {
    measuredDiameterMm: diameterMm.toFixed(2),
    closestAro: closestSize.aro,
    closestDiameter: closestSize.diameter,
    difference: minDifference.toFixed(2) + 'mm'
  });
  
  return closestSize;
};

/**
 * Format ring size for display
 * @param {object} sizeInfo - Ring size object
 * @returns {string} Formatted string
 */
export const formatRingSize = (sizeInfo) => {
  if (!sizeInfo) return '-';
  return `Aro ${sizeInfo.aro} (US ${sizeInfo.us}, EU ${sizeInfo.eu})`;
};

import { useMemo } from 'react';

export default function useSocksCalc(gaugeSts = 32, gaugeRows = 42, footLengthMm = 250, footCircCm = 23, method = 'toeup') {
  return useMemo(() => {
    // -2cm negative ease for snug fit
    const targetCirc = footCircCm - 2;
    const rawSts = Math.round((targetCirc * gaugeSts) / 10);

    // Multiple of 4
    let castOn = Math.round(rawSts / 4) * 4;
    if (castOn < 48) castOn = 48;
    if (castOn > 76) castOn = 76;

    const halfSts = castOn / 2;
    const footLenCm = footLengthMm / 10;
    const straightFootCm = (footLenCm - 5.5).toFixed(1);
    const totalRows = Math.round((footLenCm * gaugeRows) / 10);

    // Toeup specific
    const toeStartSts = Math.max(16, Math.round(castOn * 0.35 / 2) * 2);
    const toeIncTimes = Math.max(1, (castOn - toeStartSts) / 4);

    // Cuffdown specific
    const flapRows = halfSts;
    const pickupSts = Math.floor(flapRows / 2) + 1;

    return {
      castOn,
      halfSts,
      straightFootCm,
      totalRows,
      toeStartSts,
      toeIncTimes,
      flapRows,
      pickupSts,
      yarnBalls: '1~2볼 (50~100g 삭얀)'
    };
  }, [gaugeSts, gaugeRows, footLengthMm, footCircCm, method]);
}

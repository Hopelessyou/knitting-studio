import { useMemo } from 'react';

/**
 * useSocksCalc
 * @param {number} gaugeSts        10cm당 가로 코수 (기본 32)
 * @param {number} gaugeRows       10cm당 세로 단수 (기본 42)
 * @param {number} footLengthMm    발 길이 mm (기본 250)
 * @param {number} footCircCm      발등 둘레 cm (기본 23)
 * @param {string} method          뜨개 방식 ('toeup' | 'cuffdown')
 * @param {number} yarnBallWeight  실 1볼/콘 규격 g (기본 50g, 1000g 이상 콘사 지원)
 */
export default function useSocksCalc(
  gaugeSts = 32,
  gaugeRows = 42,
  footLengthMm = 250,
  footCircCm = 23,
  method = 'toeup',
  yarnBallWeight = 50
) {
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
    const toeStartSts = Math.max(16, Math.round((castOn * 0.35) / 2) * 2);
    const toeIncTimes = Math.max(1, (castOn - toeStartSts) / 4);

    // Cuffdown specific
    const flapRows = halfSts;
    const pickupSts = Math.floor(flapRows / 2) + 1;
    const legLengthCm = 15;
    const legRows = Math.round((legLengthCm * gaugeRows) / 10);

    // 성인 양말 1켤레 실 소요량 (약 65~95g)
    const sizeFactor = (footLengthMm / 250) * (footCircCm / 23);
    let estGrams = Math.round(80 * sizeFactor);
    if (estGrams < 50) estGrams = 50;

    const ballSize = (typeof yarnBallWeight === 'number' && yarnBallWeight > 0) ? yarnBallWeight : 50;
    let yarnBalls = '';
    if (ballSize >= 1000) {
      const neededCones = Math.max(1, Math.ceil(estGrams / ballSize));
      const kgLabel = (ballSize / 1000).toFixed(ballSize % 1000 === 0 ? 0 : 1);
      yarnBalls = `${neededCones}콘 (${estGrams}g · ${kgLabel}kg 콘사)`;
    } else {
      const ballsMin = Math.max(1, Math.round(estGrams / ballSize));
      const ballsMax = Math.max(ballsMin, Math.ceil(estGrams / ballSize));
      yarnBalls = (ballsMin === ballsMax)
        ? `${ballsMin}볼 (${estGrams}g · ${ballSize}g/볼)`
        : `${ballsMin}~${ballsMax}볼 (${estGrams}g · ${ballSize}g/볼)`;
    }

    // 삭얀 표준 (100g당 약 400~420m)
    const estMeters = Math.round(estGrams * 4.0);
    const estYards = Math.round(estMeters * 1.09361);
    const yarnMeters = `${estMeters.toLocaleString()}m (${estYards.toLocaleString()}yd)`;

    return {
      castOn,
      halfSts,
      straightFootCm,
      totalRows,
      toeStartSts,
      toeIncTimes,
      flapRows,
      pickupSts,
      legLengthCm,
      legRows,
      footLengthMm,
      footCircCm,
      method,
      estGrams,
      yarnBalls,
      yarnMeters
    };
  }, [gaugeSts, gaugeRows, footLengthMm, footCircCm, method, yarnBallWeight]);
}

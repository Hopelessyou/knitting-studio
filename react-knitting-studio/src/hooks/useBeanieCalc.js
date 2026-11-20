import { useMemo } from 'react';

/**
 * useBeanieCalc
 * @param {number} gaugeSts        10cm당 가로 코수 (기본 18)
 * @param {number} gaugeRows       10cm당 세로 단수 (기본 24)
 * @param {number} headCirc        실제 머리둘레 cm (기본 56)
 * @param {string} style           비니 스타일 ('classic' | 'watchcap' | 'slouchy')
 * @param {string} rib             고무단 ('1x1' | '2x2' | 'stockinette')
 * @param {number} yarnBallWeight  실 1볼/콘 규격 g (기본 50g, 1000g 이상 콘사 지원)
 */
export default function useBeanieCalc(
  gaugeSts = 18,
  gaugeRows = 24,
  headCirc = 56,
  style = 'classic',
  rib = '2x2',
  yarnBallWeight = 50
) {
  return useMemo(() => {
    // 5cm stretch negative ease
    const targetCirc = headCirc - 5;
    const rawSts = Math.round((targetCirc * gaugeSts) / 10);

    // Round to multiple of 8 for symmetric 8-wedge crown decrease
    let castOn = Math.round(rawSts / 8) * 8;
    if (castOn < 64) castOn = 64;

    let brimHeightCm = 7;
    let totalHeightCm = 20;
    let crownDecreaseCm = 5;

    if (style === 'watchcap') {
      brimHeightCm = 4;
      totalHeightCm = 14;
      crownDecreaseCm = 4;
    } else if (style === 'slouchy') {
      brimHeightCm = 3;
      totalHeightCm = 24;
      crownDecreaseCm = 6;
    }

    const crownStartHeightCm = totalHeightCm - crownDecreaseCm;
    const crownStartRows = Math.round((crownStartHeightCm * gaugeRows) / 10);
    const totalRows = Math.round((totalHeightCm * gaugeRows) / 10);
    const wedgeSts = castOn / 8;
    const kSts = Math.max(1, wedgeSts - 2);
    const ribName = (rib === '1x1') ? '1코 고무뜨기 (K1, P1)' : (rib === '2x2') ? '2코 고무뜨기 (K2, P2)' : '메리야스 겉뜨기';

    // 실 소요량 및 콘사/볼수 동적 연산
    const areaFactor = (headCirc / 56) * (totalHeightCm / 20);
    let estGrams = Math.round(85 * areaFactor * Math.pow(gaugeSts / 18, 0.3));
    if (style === 'watchcap') estGrams = Math.round(estGrams * 0.75);
    if (style === 'slouchy') estGrams = Math.round(estGrams * 1.2);
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

    // 실 총 길이 환산 (미터 및 야드)
    const estMeters = Math.round(estGrams * (gaugeSts * 0.11 + 0.5));
    const estYards = Math.round(estMeters * 1.09361);
    const yarnMeters = `${estMeters.toLocaleString()}m (${estYards.toLocaleString()}yd)`;

    return {
      castOn,
      wedgeSts,
      kSts,
      brimHeightCm,
      totalHeightCm,
      crownDecreaseCm,
      crownStartHeightCm,
      crownStartRows,
      totalRows,
      ribName,
      headCirc,
      style,
      rib,
      estGrams,
      yarnBalls,
      yarnMeters
    };
  }, [gaugeSts, gaugeRows, headCirc, style, rib, yarnBallWeight]);
}

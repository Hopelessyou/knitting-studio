import { useMemo } from 'react';

/**
 * useScarfCalc
 * @param {number} gaugeSts        10cm당 가로 코수 (기본 18)
 * @param {number} gaugeRows       10cm당 세로 단수 (기본 24)
 * @param {number} targetW         목도리 너비 cm (기본 25)
 * @param {number} targetL         목도리 총 길이 cm (기본 180)
 * @param {string} pattern         무늬 종류 ('brioche' | 'rib1' | 'rib2')
 * @param {string} edge            가장자리 ('icord' | 'garter')
 * @param {number} yarnBallWeight  실 1볼/콘 규격 g (기본 50g, 1000g 이상 콘사 지원)
 */
export default function useScarfCalc(
  gaugeSts = 18,
  gaugeRows = 24,
  targetW = 25,
  targetL = 180,
  pattern = 'brioche',
  edge = 'icord',
  yarnBallWeight = 50
) {
  return useMemo(() => {
    const rawSts = Math.round((targetW * gaugeSts) / 10);
    const edgeSts = (edge === 'icord') ? 4 : 2;

    let bodySts = rawSts - edgeSts;
    if (bodySts < 4) bodySts = 4;

    if (pattern === 'brioche') {
      bodySts = Math.round((bodySts - 2) / 3) * 3 + 2;
      if (bodySts < 5) bodySts = 5;
    } else if (pattern === 'rib1') {
      if (bodySts % 2 !== 0) bodySts += 1;
    } else if (pattern === 'rib2') {
      bodySts = Math.round((bodySts - 2) / 4) * 4 + 2;
      if (bodySts < 6) bodySts = 6;
    }

    const totalCastOn = bodySts + edgeSts;
    const totalRows = Math.round((targetL * gaugeRows) / 10);

    const areaM2 = (targetW / 100) * (targetL / 100);
    let estGrams = Math.round(areaM2 * 500);
    if (pattern === 'brioche') estGrams = Math.round(estGrams * 1.25);
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

    // 목도리 실 길이 환산
    const estMeters = Math.round(estGrams * (gaugeSts * 0.11 + 0.4));
    const estYards = Math.round(estMeters * 1.09361);
    const yarnMeters = `${estMeters.toLocaleString()}m (${estYards.toLocaleString()}yd)`;

    return {
      totalCastOn,
      bodySts,
      edgeSts,
      totalRows,
      targetW,
      targetL,
      pattern,
      edge,
      estGrams,
      yarnBalls,
      yarnMeters
    };
  }, [gaugeSts, gaugeRows, targetW, targetL, pattern, edge, yarnBallWeight]);
}

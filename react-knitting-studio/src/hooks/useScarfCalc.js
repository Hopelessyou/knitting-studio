import { useMemo } from 'react';

export default function useScarfCalc(gaugeSts = 18, gaugeRows = 24, targetW = 25, targetL = 180, pattern = 'brioche', edge = 'icord') {
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
    let estGrams = areaM2 * 500;
    if (pattern === 'brioche') estGrams *= 1.25;
    const balls = Math.ceil(estGrams / 40);

    return {
      totalCastOn,
      bodySts,
      edgeSts,
      totalRows,
      yarnBalls: `${balls}~${balls + 1}볼 (${balls * 40}g)`
    };
  }, [gaugeSts, gaugeRows, targetW, targetL, pattern, edge]);
}

import { useMemo } from 'react';

export default function useBeanieCalc(gaugeSts = 18, gaugeRows = 24, headCirc = 56, style = 'classic', rib = '2x2') {
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

    return {
      castOn,
      wedgeSts,
      brimHeightCm,
      totalHeightCm,
      crownDecreaseCm,
      crownStartHeightCm,
      crownStartRows,
      totalRows,
      yarnBalls: '2~3볼 (100~150g)'
    };
  }, [gaugeSts, gaugeRows, headCirc, style, rib]);
}

import { useMemo } from 'react';

export default function useSweaterCalc(gaugeSts = 20, gaugeRows = 28, chestBase = 100, fit = 'loose') {
  return useMemo(() => {
    const ease = (fit === 'tailored') ? 7 : 15;
    const targetChest = chestBase + ease;
    const totalBodySts = Math.round((targetChest * gaugeSts) / 10);

    // Cast-on for neckline (approx 44~48cm)
    const neckTargetCm = 46;
    let castOn = Math.round((neckTargetCm * gaugeSts) / 10);
    // Even number
    if (castOn % 2 !== 0) castOn += 1;
    if (castOn < 72) castOn = 72;
    if (castOn > 120) castOn = 120;

    // Raglan allocation: 4 lines x 2 sts = 8 raglan sts
    const netSts = castOn - 8;
    const backSts = Math.floor(netSts * 0.35);
    const frontSts = backSts;
    const sleeveSts = Math.floor((netSts - (backSts * 2)) / 2);

    // Yoke depth and raglan increase rounds
    const yokeDepthCm = (fit === 'tailored') ? 22 : 25;
    const yokeRows = Math.round((yokeDepthCm * gaugeRows) / 10);
    const increaseRounds = Math.floor(yokeRows / 2);

    // Total length and yarn
    const totalLengthCm = 62;
    const totalRows = Math.round((totalLengthCm * gaugeRows) / 10);
    const yarnBalls = (fit === 'tailored') ? '10~11볼 (500g)' : '12~13볼 (600g)';

    return {
      castOn,
      backSts,
      frontSts,
      sleeveSts,
      targetChest,
      totalBodySts,
      yokeDepthCm,
      yokeRows,
      increaseRounds,
      totalLengthCm,
      totalRows,
      yarnBalls
    };
  }, [gaugeSts, gaugeRows, chestBase, fit]);
}

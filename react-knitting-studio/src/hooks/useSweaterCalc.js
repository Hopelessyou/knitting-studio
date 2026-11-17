import { useMemo } from 'react';

export default function useSweaterCalc(gaugeSts = 20, gaugeRows = 28, chestBase = 100, fit = 'loose', gender = 'f') {
  return useMemo(() => {
    const stitchPerCm = gaugeSts / 10;
    const rowPerCm = gaugeRows / 10;

    // Ease delta
    const ease = (fit === 'tailored') ? 7 : 15;
    const targetChest = chestBase + ease;

    // Desired body stitches
    const totalChestStitches = Math.round(targetChest * stitchPerCm);

    // Standard Raglan Math
    // Neck circumference approx 41cm (Women) / 44cm (Men)
    const neckTargetCm = (gender === 'm') ? 44 : 41;
    let castOn = Math.round((neckTargetCm * stitchPerCm) / 2) * 2; // ensure even
    if (castOn % 4 !== 0) castOn += (4 - (castOn % 4)); // multiples of 4
    if (castOn < 72) castOn = 72;
    if (castOn > 120) castOn = 120;

    // 4 raglan marker lines (2 sts each line = 8 sts)
    const raglanLineSts = 8;
    const distributable = castOn - raglanLineSts;
    
    // Standard: 35% back, 35% front, 15% each sleeve
    let backSts = Math.round(distributable * 0.35);
    let frontSts = backSts;
    let sleeveSts = Math.floor((distributable - (backSts * 2)) / 2);
    // Ensure exact sum equals castOn
    const remainder = castOn - (backSts + frontSts + (sleeveSts * 2) + raglanLineSts);
    backSts += Math.floor(remainder / 2);
    frontSts = backSts;

    // Underarm cast on sts (approx 5~5.5cm each side, even number)
    const underarmSts = Math.max(8, Math.round((5.5 * stitchPerCm) / 2) * 2);

    // Back/front stitches needed after yoke = (totalChestStitches - 2 * underarmSts) / 2
    const targetHalfBodySts = (totalChestStitches - (2 * underarmSts)) / 2;
    const neededIncreases = Math.max(16, Math.round(targetHalfBodySts - backSts));
    const raglanRows = neededIncreases * 2;
    const armholeDepthCm = Math.round((raglanRows / rowPerCm) * 10) / 10;

    // Sleeve stitches at separation
    const finalSleeveSts = sleeveSts + (neededIncreases * 2);
    const totalInitialSleeveSts = finalSleeveSts + underarmSts;

    // Total body stitches after joining
    const totalFinalBodySts = Math.round((backSts + (neededIncreases * 2)) * 2 + (underarmSts * 2));

    // Estimated body rows (approx 34cm)
    const bodyRowsEst = Math.round(34 * rowPerCm);

    // Total length and yarn
    const totalLengthCm = (fit === 'tailored') ? 60 : 64;
    const totalRows = Math.round((totalLengthCm * gaugeRows) / 10);
    const yarnBalls = (fit === 'tailored') ? '10~11볼 (500g)' : '12~13볼 (600g)';

    // Wrist target sts (approx 19~21cm)
    const wristSts = Math.max(36, Math.round((20 * stitchPerCm) / 2) * 2);

    return {
      stitchPerCm,
      rowPerCm,
      ease,
      targetChest,
      castOn,
      backSts,
      frontSts,
      sleeveSts,
      underarmSts,
      neededIncreases,
      increaseRounds: neededIncreases,
      raglanRows,
      yokeRows: raglanRows,
      armholeDepthCm,
      yokeDepthCm: armholeDepthCm,
      finalSleeveSts,
      totalInitialSleeveSts,
      totalFinalBodySts,
      totalBodySts: totalFinalBodySts,
      bodyRowsEst,
      totalLengthCm,
      totalRows,
      yarnBalls,
      wristSts
    };
  }, [gaugeSts, gaugeRows, chestBase, fit, gender]);
}

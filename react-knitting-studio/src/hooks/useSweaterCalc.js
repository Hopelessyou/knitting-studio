import { useMemo } from 'react';

export default function useSweaterCalc(
  gaugeSts = 20,
  gaugeRows = 28,
  chestBase = 100,
  fit = 'loose',
  gender = 'f',
  type = 'crew' // 'crew' | 'vneck' | 'cardigan'
) {
  return useMemo(() => {
    const stitchPerCm = gaugeSts / 10;
    const rowPerCm = gaugeRows / 10;

    // Ease delta
    const ease = (fit === 'tailored') ? 7 : 15;
    const targetChest = chestBase + ease;

    // Desired body stitches
    const totalChestStitches = Math.round(targetChest * stitchPerCm);

    // Standard Raglan Math
    // Base neck circumference approx 41cm (Women) / 44cm (Men)
    const neckTargetCm = (gender === 'm') ? 44 : 41;
    let baseCastOn = Math.round((neckTargetCm * stitchPerCm) / 2) * 2; // ensure even
    if (baseCastOn % 4 !== 0) baseCastOn += (4 - (baseCastOn % 4)); // multiples of 4
    if (baseCastOn < 72) baseCastOn = 72;
    if (baseCastOn > 120) baseCastOn = 120;

    // 4 raglan marker lines (2 sts each line = 8 sts)
    const raglanLineSts = 8;
    const distributable = baseCastOn - raglanLineSts;
    
    // Standard: 35% back, 35% front, 15% each sleeve
    let backSts = Math.round(distributable * 0.35);
    let frontSts = backSts;
    let sleeveSts = Math.floor((distributable - (backSts * 2)) / 2);
    // Ensure exact sum equals baseCastOn
    const remainder = baseCastOn - (backSts + frontSts + (sleeveSts * 2) + raglanLineSts);
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

    // Total length and yarn
    const totalLengthCm = (fit === 'tailored') ? 60 : 64;
    const totalRows = Math.round((totalLengthCm * gaugeRows) / 10);
    const bodyLengthCm = Math.max(30, totalLengthCm - Math.round(armholeDepthCm));
    const bodyRowsEst = Math.round(bodyLengthCm * rowPerCm);

    // Wrist target sts (approx 19~21cm)
    const wristSts = Math.max(36, Math.round((20 * stitchPerCm) / 2) * 2);
    const sleeveLengthCm = (fit === 'tailored') ? 42 : 44;
    const sleeveDecreasesNeeded = Math.max(1, Math.round((totalInitialSleeveSts - wristSts) / 2));
    const sleeveDecRows = Math.max(4, Math.round(((sleeveLengthCm - 5) * rowPerCm) / sleeveDecreasesNeeded));

    // Type-specific variables
    let castOn = baseCastOn;
    let frontLeftSts = 0;
    let frontRightSts = 0;
    let vneckDepthCm = 0;
    let vneckJoinRow = 0;
    let vneckIncRows = 2; // every 2 rows (RS)
    let vneckIncCount = 0;
    let buttonCount = 0;
    let buttonSpacingCm = 0;
    let buttonbandPickSts = 0;
    let yarnBalls = (fit === 'tailored') ? '10~11볼 (500g)' : '12~13볼 (600g)';

    if (type === 'vneck') {
      // V-neck starts flat with 2 front edge stitches (1 on left front edge, 1 on right front edge)
      const frontEdgeSts = 2;
      castOn = backSts + (sleeveSts * 2) + raglanLineSts + frontEdgeSts;
      // Front shaping: needs to reach backSts before joining in the round
      // Each V-inc row increases 2 sts (1 on left edge, 1 on right edge)
      vneckIncCount = Math.max(8, Math.floor((backSts - 2) / 2));
      vneckJoinRow = vneckIncCount * 2;
      vneckDepthCm = Math.round((vneckJoinRow / rowPerCm) * 10) / 10;
      if (vneckDepthCm < 16) vneckDepthCm = 18;
      if (vneckDepthCm > 24) vneckDepthCm = 22;
      frontSts = 2; // initial front sts at cast on
      yarnBalls = (fit === 'tailored') ? '10~11볼 (500g)' : '11~12볼 (550~600g)';
    } else if (type === 'cardigan') {
      // Cardigan starts flat with split front panels
      frontLeftSts = Math.floor(backSts / 2);
      frontRightSts = frontLeftSts;
      castOn = backSts + (sleeveSts * 2) + raglanLineSts + (frontLeftSts * 2);
      frontSts = frontLeftSts * 2;
      buttonCount = (totalLengthCm >= 64) ? 6 : 5;
      buttonSpacingCm = Math.round((bodyLengthCm / (buttonCount - 1)) * 10) / 10;
      // Buttonband pickup: approx 3 sts per 4 rows along both front edges + back neck
      buttonbandPickSts = Math.round((totalLengthCm * rowPerCm * 0.75 * 2) + (backSts * 0.8));
      yarnBalls = (fit === 'tailored') ? '11~12볼 (550g)' : '13~14볼 (650g)';
    }

    return {
      type,
      stitchPerCm,
      rowPerCm,
      ease,
      targetChest,
      castOn,
      baseCastOn,
      backSts,
      frontSts,
      frontLeftSts,
      frontRightSts,
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
      wristSts,
      bodyLengthCm,
      sleeveLengthCm,
      sleeveDecRows,
      // V-neck specifics
      vneckDepthCm,
      vneckJoinRow,
      vneckIncRows,
      vneckIncCount,
      // Cardigan specifics
      buttonCount,
      buttonSpacingCm,
      buttonbandPickSts
    };
  }, [gaugeSts, gaugeRows, chestBase, fit, gender, type]);
}

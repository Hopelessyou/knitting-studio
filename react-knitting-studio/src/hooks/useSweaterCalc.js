import { useMemo } from 'react';

/**
 * useSweaterCalc
 * 탑다운 레글런 스웨터 (라운드넥, V넥, 가디건) 실시간 도안 수치 자동 연산 훅
 *
 * @param {number} gaugeSts       10cm당 가로 코수 (기본 20코)
 * @param {number} gaugeRows      10cm당 세로 단수 (기본 28단)
 * @param {number} chestBase      기준 실제 가슴둘레 cm (기본 100cm)
 * @param {string} fit            실루엣 핏 ('loose' = +15cm 여유, 'tailored' = +7cm 여유)
 * @param {string} gender         성별 ('f' = 여성 기준 목둘레, 'm' = 남성 기준 목둘레)
 * @param {string} type           제작 스타일 ('crew' = 라운드넥, 'vneck' = V넥, 'cardigan' = 가디건)
 * @param {number} yarnBallWeight 실 1볼 규격 무게 g (기본 50g)
 */
export default function useSweaterCalc(
  gaugeSts = 20,
  gaugeRows = 28,
  chestBase = 100,
  fit = 'loose',
  gender = 'f',
  type = 'crew',
  yarnBallWeight = 50
) {
  return useMemo(() => {
    // 1cm당 코수 및 단수
    const safeGaugeSts = Math.max(5, Number(gaugeSts) || 20);
    const safeGaugeRows = Math.max(5, Number(gaugeRows) || 28);
    const stitchPerCm = safeGaugeSts / 10;
    const rowPerCm = safeGaugeRows / 10;

    // 핏 여유분 및 목표 완성 가슴둘레
    const ease = (fit === 'tailored') ? 7 : 15;
    const targetChest = chestBase + ease;

    // 몸통 목표 총 코수 (가슴둘레 cm × 1cm당 코수)
    const totalChestStitches = Math.round(targetChest * stitchPerCm);

    // 1. 목둘레 그레이딩 (가슴둘레 및 게이지에 비례)
    // S(85): ~38.5cm, M(95): ~40cm, L(105): ~41.5cm, XL(115): ~43cm
    const baseNeckCm = (gender === 'm' ? 41 : 38.5) + ((chestBase - 85) * 0.15);
    const neckTargetCm = Math.max(34, Math.min(48, Math.round(baseNeckCm * 10) / 10));

    // 기본 목둘레 코잡기 (짝수 및 4의 배수 권장)
    let baseCastOn = Math.round((neckTargetCm * stitchPerCm) / 2) * 2;
    if (baseCastOn % 4 !== 0) baseCastOn += (4 - (baseCastOn % 4));
    // 게이지(굵은실 10코 ~ 얇은실 30코)에 따른 안전 최소/최대 클램핑
    baseCastOn = Math.max(Math.round(30 * stitchPerCm / 2) * 2, Math.min(140, baseCastOn));

    // 4개 레글런 라인 코수 (라인당 2코씩 = 총 8코)
    const raglanLineSts = 8;
    const distributable = Math.max(16, baseCastOn - raglanLineSts);

    // 초기 코 배분 (뒷판 35%, 앞판 35%, 양 소매 각 15%)
    let backSts = Math.round(distributable * 0.35);
    let frontSts = backSts;
    let sleeveSts = Math.max(4, Math.floor((distributable - (backSts * 2)) / 2));
    const remainder = baseCastOn - (backSts + frontSts + (sleeveSts * 2) + raglanLineSts);
    backSts += Math.floor(remainder / 2);
    frontSts = backSts;

    // 2. 겨드랑이 감아코 (각 쪽당 약 5~6cm 분량, 짝수)
    const underarmSts = Math.max(6, Math.round((5.5 * stitchPerCm) / 2) * 2);

    // 3. 레글런 요크 깊이 & 늘림 횟수 산출
    // 표준 성인 진동 깊이 (가슴둘레에 비례: S 19~20cm, M 21~22cm, L 23~24cm, XL 25~26cm)
    const standardArmholeDepthCm = Math.round((18.5 + ((chestBase - 85) * 0.18) + (fit === 'loose' ? 1.5 : 0)) * 10) / 10;
    let raglanRows = Math.round(standardArmholeDepthCm * rowPerCm);
    if (raglanRows % 2 !== 0) raglanRows += 1;
    const armholeDepthCm = Math.round((raglanRows / rowPerCm) * 10) / 10;

    // 레글런 1회 늘림(2단마다)마다 뒷판 2코, 앞판 2코, 각 소매 2코 증가
    // 목표 뒷판 코수 = (목표 가슴둘레 코수 - 겨드랑이 코수 2배) / 2
    const targetBackSts = Math.round((totalChestStitches - (2 * underarmSts)) / 2);
    let neededIncreases = Math.max(10, Math.round((targetBackSts - backSts) / 2));

    // 진동 단수와 늘림 횟수 밸런스 조정
    const maxRaglanIncreases = Math.floor(raglanRows / 2);
    if (neededIncreases > maxRaglanIncreases + 6) {
      raglanRows = (neededIncreases - 3) * 2;
    }

    // 요크 종료 후 실제 뒷판 코수
    const finalBackSts = backSts + (neededIncreases * 2);
    // 정확한 몸통 둘레(totalChestStitches)를 보장하도록 겨드랑이 코 미세 조율
    const adjustedUnderarmSts = Math.max(4, Math.round((totalChestStitches - (finalBackSts * 2)) / 4) * 2);
    const totalFinalBodySts = (finalBackSts * 2) + (adjustedUnderarmSts * 2);

    // 소매 분리 시 한쪽 소매 코수
    const finalSleeveSts = sleeveSts + (neededIncreases * 2);
    const totalInitialSleeveSts = finalSleeveSts + adjustedUnderarmSts;

    // 4. 옷 길이 및 소요량 산출
    const totalLengthCm = (fit === 'tailored')
      ? Math.round(58 + ((chestBase - 85) * 0.15))
      : Math.round(62 + ((chestBase - 85) * 0.15));
    const totalRows = Math.round(totalLengthCm * rowPerCm);
    const bodyLengthCm = Math.max(28, totalLengthCm - Math.round(armholeDepthCm));
    const bodyRowsEst = Math.round(bodyLengthCm * rowPerCm);

    // 소매통 및 손목 목표 코수 (손목 둘레 약 19~21cm)
    const wristSts = Math.max(28, Math.round((20 * stitchPerCm) / 2) * 2);
    const sleeveLengthCm = (fit === 'tailored') ? 43 : 46;
    const sleeveDecreasesNeeded = Math.max(1, Math.round((totalInitialSleeveSts - wristSts) / 2));
    const sleeveDecRows = Math.max(4, Math.round(((sleeveLengthCm - 6) * rowPerCm) / sleeveDecreasesNeeded));

    // 실 소요량 산출 (체형 및 옷 면적에 실시간 비례)
    const gramEst = Math.round(380 + ((chestBase - 85) * 7) + (fit === 'loose' ? 50 : 0) + (type === 'cardigan' ? 60 : 0));
    const ballSize = (typeof yarnBallWeight === 'number' && yarnBallWeight > 0) ? yarnBallWeight : 50;
    const ballsMin = Math.max(1, Math.round(gramEst / ballSize));
    const ballsMax = ballsMin + 1;
    let yarnBalls = `${ballsMin}~${ballsMax}볼 (${gramEst}g · ${ballSize}g/볼)`;

    // 5. 스타일별 (라운드넥, V넥, 가디건) 특화 파라미터
    let castOn = baseCastOn;
    let frontLeftSts = 0;
    let frontRightSts = 0;
    let vneckDepthCm = 0;
    let vneckJoinRow = 0;
    let vneckIncRows = 2;
    let vneckIncCount = 0;
    let buttonCount = 0;
    let buttonSpacingCm = 0;
    let buttonbandPickSts = 0;

    if (type === 'vneck') {
      // V넥: 앞판 좌우 각 1코(총 2코)로 평면 왕복 시작
      const frontEdgeSts = 2;
      castOn = backSts + (sleeveSts * 2) + raglanLineSts + frontEdgeSts;
      vneckIncCount = Math.max(6, Math.floor((backSts - 2) / 2));
      vneckJoinRow = vneckIncCount * 2;
      vneckDepthCm = Math.round((vneckJoinRow / rowPerCm) * 10) / 10;
      if (vneckDepthCm < 16) vneckDepthCm = 17;
      if (vneckDepthCm > 24) vneckDepthCm = 23;
      frontSts = 2;
    } else if (type === 'cardigan') {
      // 가디건: 앞판 좌우 패널로 분할된 평면 왕복 시작
      frontLeftSts = Math.floor(backSts / 2);
      frontRightSts = frontLeftSts;
      castOn = backSts + (sleeveSts * 2) + raglanLineSts + (frontLeftSts * 2);
      frontSts = frontLeftSts * 2;
      buttonCount = (totalLengthCm >= 64) ? 6 : 5;
      buttonSpacingCm = Math.round((bodyLengthCm / (buttonCount - 1)) * 10) / 10;
      buttonbandPickSts = Math.round((totalLengthCm * rowPerCm * 0.75 * 2) + (backSts * 0.8));
    }

    return {
      type,
      stitchPerCm,
      rowPerCm,
      ease,
      targetChest,
      totalChestStitches,
      castOn,
      baseCastOn,
      neckTargetCm,
      backSts,
      frontSts,
      frontLeftSts,
      frontRightSts,
      sleeveSts,
      underarmSts: adjustedUnderarmSts,
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
      bodyLengthCm,
      bodyRowsEst,
      totalLengthCm,
      totalRows,
      yarnBalls,
      wristSts,
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
  }, [gaugeSts, gaugeRows, chestBase, fit, gender, type, yarnBallWeight]);
}

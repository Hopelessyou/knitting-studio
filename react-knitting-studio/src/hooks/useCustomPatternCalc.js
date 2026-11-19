import { useMemo } from 'react';

/**
 * useCustomPatternCalc
 * 어깨 구조(레글런/드롭숄더) + 실루엣&기장(크롭/골반/롱) + 무늬 패턴(메리야스/꽈배기/멍석/스트라이프)
 * 실시간 파라메트릭 도안 연산 훅
 */
export default function useCustomPatternCalc({
  gaugeSts = 20,
  gaugeRows = 28,
  chestBase = 95,
  shoulderType = 'drop', // 'drop' | 'raglan'
  lengthType = 'regular', // 'crop' | 'regular' | 'long'
  fitType = 'regular',   // 'slim' (+5) | 'regular' (+10) | 'oversized' (+18)
  patternType = 'cable', // 'plain' | 'cable' | 'moss' | 'stripe'
  yarnBallWeight = 50,
}) {
  return useMemo(() => {
    const safeGaugeSts = Math.max(5, Number(gaugeSts) || 20);
    const safeGaugeRows = Math.max(5, Number(gaugeRows) || 28);
    const stitchPerCm = safeGaugeSts / 10;
    const rowPerCm = safeGaugeRows / 10;

    // 1. 핏(여유분) 및 목표 가슴둘레
    const ease = fitType === 'slim' ? 5 : fitType === 'oversized' ? 18 : 10;
    const targetChest = chestBase + ease;
    const rawChestSts = Math.round(targetChest * stitchPerCm);

    // 2. 패턴(무늬) 배수 스냅 연산 (Pattern Snapping)
    let patternMultiple = 2; // 기본 짝수
    let patternName = '메리야스 (플레인)';
    let patternDesc = '1코 단위 기본 겉뜨기 편물';

    if (patternType === 'cable') {
      patternMultiple = 8;
      patternName = '8코 클래식 꽈배기 (Cable)';
      patternDesc = '앞·뒤판 8코 대칭 꽈배기 반복 무늬';
    } else if (patternType === 'moss') {
      patternMultiple = 4;
      patternName = '더블 멍석뜨기 (Double Moss)';
      patternDesc = '겉2·안2 교차 오돌토돌 텍스처';
    } else if (patternType === 'stripe') {
      patternMultiple = 2;
      patternName = '투톤 스트라이프 (Stripe)';
      patternDesc = '8단 메인 / 8단 서브 교차 배색 (총 16단 사이클)';
    }

    // 앞뒤판 대칭을 위해 (몸통 ÷ 2)가 패턴 배수의 정수가 되도록 보정
    const halfRaw = Math.round(rawChestSts / 2);
    const halfSnapped = Math.round(halfRaw / patternMultiple) * patternMultiple;
    const totalBodySts = Math.max(40, halfSnapped * 2);
    const halfBodySts = totalBodySts / 2;
    const diffSts = totalBodySts - rawChestSts;
    const actualChestCm = Math.round((totalBodySts / stitchPerCm) * 10) / 10;

    // 3. 기장 연산 (총장, 진동, 몸통 길이)
    let totalLengthCm = 58;
    let lengthLabel = '스탠다드 골반선';

    if (lengthType === 'crop') {
      totalLengthCm = 46;
      lengthLabel = '트렌디 크롭 (~46cm)';
    } else if (lengthType === 'long') {
      totalLengthCm = 70;
      lengthLabel = '롱 힙커버 오버핏 (~70cm)';
    }

    // 진동 깊이 (Armhole Depth)
    // 드롭숄더는 어깨가 툭 떨어지므로 진동이 깊어야 편함 (~23~26cm)
    // 레글런은 어깨가 맞아야 하므로 표준 진동 (~21~23cm)
    const armholeDepthCm = shoulderType === 'drop'
      ? Math.round((21 + (chestBase - 85) * 0.12) * 10) / 10
      : Math.round((19.5 + (chestBase - 85) * 0.14) * 10) / 10;

    const armholeRows = Math.round(armholeDepthCm * rowPerCm);
    const bodyLengthCm = Math.max(20, totalLengthCm - Math.round(armholeDepthCm));
    const bodyRows = Math.round(bodyLengthCm * rowPerCm);
    const totalRows = armholeRows + bodyRows;

    // 4. 어깨 및 소매 구조 특화 수치
    let neckCm = Math.round((39 + (chestBase - 85) * 0.1) * 10) / 10;
    let neckCastOn = Math.round((neckCm * stitchPerCm) / 2) * 2;
    if (neckCastOn % 4 !== 0) neckCastOn += (4 - (neckCastOn % 4));

    let shoulderWidthCm = 0;
    let backCastOnSts = halfBodySts;
    let sleevePickSts = 0;
    let wristSts = Math.max(28, Math.round((19 * stitchPerCm) / 2) * 2);
    let sleeveLengthCm = 45;
    let structureTitle = '';
    let structureDesc = '';

    if (shoulderType === 'drop') {
      structureTitle = '드롭숄더 (Drop Shoulder)';
      structureDesc = '어깨선이 팔뚝으로 자연스럽게 떨어지는 박스핏. 앞·뒤판을 직사각형으로 떠서 잇거나 탑다운으로 내려뜨는 초보자 추천 1순위 구조.';
      shoulderWidthCm = Math.round((actualChestCm * 0.52) * 10) / 10; // 어깨너비가 가슴너비보다 약간 넓어 드롭됨
      backCastOnSts = halfBodySts;
      // 진동 둘레에서 4단마다 3코 픽업
      sleevePickSts = Math.round((armholeRows * 2 * 0.75) / 2) * 2;
      sleeveLengthCm = 43; // 드롭숄더는 어깨가 내려오므로 소매길이가 2~3cm 짧음
    } else {
      structureTitle = '탑다운 레글런 (Raglan)';
      structureDesc = '목둘레에서 시작해 4갈래 레글런 라인으로 사선 늘림을 진행하는 부드러운 유선형 어깨 구조.';
      shoulderWidthCm = Math.round((actualChestCm * 0.42) * 10) / 10;
      backCastOnSts = neckCastOn;
      // 레글런 소매는 겨드랑이 분리 코수
      const underarmSts = Math.max(6, Math.round((5.5 * stitchPerCm) / 2) * 2);
      sleevePickSts = Math.round((halfBodySts * 0.75) / 2) * 2 + underarmSts;
      sleeveLengthCm = 46;
    }

    // 소매 줄임 간격
    const sleeveDecSts = Math.max(2, Math.round((sleevePickSts - wristSts) / 2));
    const sleeveDecRows = Math.max(4, Math.round(((sleeveLengthCm - 6) * rowPerCm) / sleeveDecSts));

    // 실 소요량 (g & 볼)
    const baseWeight = lengthType === 'crop' ? 380 : lengthType === 'long' ? 580 : 480;
    const patternWeightBonus = patternType === 'cable' ? 70 : patternType === 'moss' ? 30 : 0;
    const estGrams = Math.round(baseWeight + ((chestBase - 85) * 5) + patternWeightBonus);
    const ballSize = (typeof yarnBallWeight === 'number' && yarnBallWeight > 0) ? yarnBallWeight : 50;

    let yarnBalls = '';
    let estBallsMax = 1;
    if (ballSize >= 1000) {
      const neededCones = Math.max(1, Math.ceil(estGrams / ballSize));
      const kgLabel = (ballSize / 1000).toFixed(ballSize % 1000 === 0 ? 0 : 1);
      yarnBalls = `${neededCones}콘 (${estGrams}g · ${kgLabel}kg 콘사)`;
      estBallsMax = neededCones;
    } else {
      const estBallsMin = Math.max(1, Math.round(estGrams / ballSize));
      estBallsMax = estBallsMin + 1;
      yarnBalls = `${estBallsMin}~${estBallsMax}볼 (${estGrams}g · ${ballSize}g/볼)`;
    }

    // 스트라이프 배색 시 컬러별 볼수
    const stripeColorA = Math.ceil(estBallsMax * 0.55);
    const stripeColorB = Math.floor(estBallsMax * 0.45);

    return {
      safeGaugeSts,
      safeGaugeRows,
      stitchPerCm,
      rowPerCm,
      chestBase,
      ease,
      targetChest,
      actualChestCm,
      shoulderType,
      structureTitle,
      structureDesc,
      lengthType,
      lengthLabel,
      fitType,
      patternType,
      patternName,
      patternDesc,
      patternMultiple,
      totalBodySts,
      halfBodySts,
      diffSts,
      totalLengthCm,
      armholeDepthCm,
      armholeRows,
      bodyLengthCm,
      bodyRows,
      totalRows,
      neckCm,
      neckCastOn,
      shoulderWidthCm,
      backCastOnSts,
      sleevePickSts,
      wristSts,
      sleeveLengthCm,
      sleeveDecRows,
      yarnBalls,
      estGrams,
      stripeColorA,
      stripeColorB
    };
  }, [gaugeSts, gaugeRows, chestBase, shoulderType, lengthType, fitType, patternType, yarnBallWeight]);
}

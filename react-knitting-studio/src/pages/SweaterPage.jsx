import React, { useState } from 'react';
import useSweaterCalc from '../hooks/useSweaterCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import SweaterRoadmap from '../components/roadmap/SweaterRoadmap';

export default function SweaterPage({ onOpenVideo, isAdmin, initialStyle = "crew" }) {
  const [gaugeSts, setGaugeSts] = useState(20);
  const [gaugeRows, setGaugeRows] = useState(28);
  const [ballWeight, setBallWeight] = useState(50);
  const [chestBase, setChestBase] = useState(100);
  const [fit, setFit] = useState('loose');
  const [sweaterType, setSweaterType] = useState(initialStyle || 'crew'); // 'crew', 'vneck', 'cardigan'

  React.useEffect(() => {
    if (initialStyle) {
      setSweaterType(initialStyle);
    }
  }, [initialStyle]);

  const calc = useSweaterCalc(gaugeSts, gaugeRows, chestBase, fit, 'f', sweaterType, ballWeight);

  // Dynamic summary text based on type
  let typeTitle = '라운드넥 크루 풀오버';
  let castOnLabel = '시작 목둘레 코잡기 (원형)';
  let castOnDesc = '목둘레 약 44cm 기준 · 3.5mm 바늘 넥밴드 3cm';
  let formula = `몸통 ${calc.totalFinalBodySts}코 (앞뒤 각 ${Math.round(calc.totalFinalBodySts / 2)}코)`;

  if (sweaterType === 'vneck') {
    typeTitle = '탑다운 V넥 레글런 풀오버';
    castOnLabel = '시작 코잡기 (평면 왕복 시작)';
    castOnDesc = `뒷목(${calc.backSts}) + 소매 2개(${calc.sleeveSts * 2}) + 레글런(8) + 앞목 2코 · V라인 사선 형성`;
    formula = `V점 합체 후 몸통 ${calc.totalFinalBodySts}코 (앞뒤 각 ${Math.round(calc.totalFinalBodySts / 2)}코)`;
  } else if (sweaterType === 'cardigan') {
    typeTitle = '탑다운 오픈 레글런 가디건';
    castOnLabel = '시작 코잡기 (앞트임 평면 시작)';
    castOnDesc = `뒷목(${calc.backSts}) + 소매 2개(${calc.sleeveSts * 2}) + 레글런(8) + 앞판 좌우(${calc.frontLeftSts * 2}코)`;
    formula = `몸통 ${calc.totalFinalBodySts}코 (평면 왕복 진행 · 단추 ${calc.buttonCount}개 단추단 별도)`;
  }

  const specs = [
    ...(sweaterType === 'vneck' ? [
      { label: 'V파임 깊이', value: `${calc.vneckDepthCm}cm`, sub: `${calc.vneckJoinRow}단 후 합체` }
    ] : sweaterType === 'cardigan' ? [
      { label: '앞판 패널', value: `각 ${calc.frontLeftSts}코`, sub: '평면 메리야스' }
    ] : [
      { label: '요크 깊이', value: `${calc.armholeDepthCm}cm`, sub: `${calc.raglanRows}단 직진` }
    ]),
    {
      label: '레글런 늘림',
      value: `${calc.neededIncreases}회`,
      sub: sweaterType === 'cardigan' ? '겉늘림/안뜨기' : sweaterType === 'vneck' ? '레글런+V늘림' : '2단마다 늘림'
    },
    ...(sweaterType === 'cardigan' ? [
      { label: '단추 구성', value: `${calc.buttonCount}개`, sub: `약 ${calc.buttonSpacingCm}cm 간격` }
    ] : [
      { label: '완성 총장', value: `${calc.totalLengthCm}cm`, sub: `${calc.totalRows}단` }
    ]),
    { label: '예상 실', value: calc.yarnBalls, sub: ballWeight >= 1000 ? `${(ballWeight/1000).toFixed(ballWeight % 1000 === 0 ? 0 : 1)}kg 콘사 기준` : `${ballWeight}g/볼 기준` }
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8">
      {/* 1. Preview with Type Selection & Fit Selection */}
      <ProductPreview
        category="sweater"
        style={sweaterType}
        onStyleChange={setSweaterType}
        fitBadge={`${typeTitle} · ${fit === 'tailored' ? '테일러드 정핏 (+7cm)' : '루즈 오버핏 (+15cm)'}`}
        options={[
          { id: 'crew', label: '👕 라운드넥', fullLabel: '👕 라운드넥 (기본)' },
          { id: 'vneck', label: '👔 V넥', fullLabel: '👔 V넥 스웨터 (V라인)' },
          { id: 'cardigan', label: '🧥 가디건', fullLabel: '🧥 오픈 가디건 (단추)' }
        ]}
        secondaryLabel="실루엣 핏"
        secondaryValue={fit}
        onSecondaryChange={setFit}
        secondaryOptions={[
          { id: 'loose', label: '루즈핏 (+15cm)', fullLabel: '루즈 오버핏 (+15cm 여유)' },
          { id: 'tailored', label: '정핏 (+7cm)', fullLabel: '테일러드 스탠다드 (+7cm 여유)' }
        ]}
      />

      {/* 2. Inputs & Results 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5 space-y-6">
          <GaugeInput
            gaugeSts={gaugeSts}
            gaugeRows={gaugeRows}
            onStsChange={setGaugeSts}
            onRowsChange={setGaugeRows}
            ballWeight={ballWeight}
            onBallWeightChange={setBallWeight}
          />

          <DimensionsInput
            title="기준 가슴둘레 (cm)"
            subtitle="실제 가슴둘레를 선택하시면 여유분이 자동 합산됩니다."
            value={chestBase}
            min={75}
            max={135}
            onChange={setChestBase}
            presets={[
              { label: 'S (85)', val: 85 },
              { label: 'M (95)', val: 95 },
              { label: 'L (105)', val: 105 },
              { label: 'XL (115)', val: 115 }
            ]}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            isAdmin={isAdmin}
            castOn={calc.castOn}
            castOnLabel={castOnLabel}
            castOnDesc={castOnDesc}
            bodySts={calc.totalFinalBodySts}
            bodyStsLabel={sweaterType === 'cardigan' ? '몸통 코수 (앞트임 평면)' : '완성 몸통 코수 (원형)'}
            bodyStsDesc={`앞뒤 각 ${Math.round(calc.totalFinalBodySts / 2)}코 · 완성 가슴둘레 ${calc.targetChest}cm (여유분 +${calc.ease}cm)`}
            formula={formula}
            ruleDesc={`완성 가슴둘레 ${calc.targetChest}cm = 실측 ${chestBase}cm + ${fit === 'tailored' ? '정핏 7cm' : '루즈핏 15cm'}`}
            specs={specs}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="sweater" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary onOpenVideo={onOpenVideo} />

      {/* 5. Masterclass Detailed Roadmap */}
      <SweaterRoadmap calc={calc} onOpenVideo={onOpenVideo} />
    </div>
  );
}

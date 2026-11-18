import React, { useState } from 'react';
import useSweaterCalc from '../hooks/useSweaterCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import SweaterRoadmap from '../components/roadmap/SweaterRoadmap';

export default function SweaterPage({ onOpenVideo, isAdmin }) {
  const [gaugeSts, setGaugeSts] = useState(20);
  const [gaugeRows, setGaugeRows] = useState(28);
  const [chestBase, setChestBase] = useState(100);
  const [fit, setFit] = useState('loose');

  const calc = useSweaterCalc(gaugeSts, gaugeRows, chestBase, fit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Preview */}
      <ProductPreview
        category="sweater"
        style={fit}
        onStyleChange={setFit}
        fitBadge={fit === 'tailored' ? '테일러드 정핏 (+7cm)' : '노르딕 루즈 오버핏 (+15cm)'}
        options={[
          { id: 'loose', label: '루즈 오버핏 (+15cm 여유)' },
          { id: 'tailored', label: '테일러드 스탠다드 (+7cm 여유)' }
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
            castOnLabel="시작 목둘레 캐스트온 코수"
            castOnDesc={`목둘레 둘레 약 46cm 기준 · 3.5mm 바늘로 튜블러 코잡기 권장`}
            formula={`몸통 ${calc.totalFinalBodySts}코 (앞뒤 각 ${Math.round(calc.totalFinalBodySts / 2)}코)`}
            ruleDesc={`완성 가슴둘레 ${calc.targetChest}cm (여유분 포함)`}
            specs={[
              { label: '요크 깊이', value: `${calc.armholeDepthCm}cm`, sub: `${calc.raglanRows}단` },
              { label: '레글런 늘림', value: `${calc.neededIncreases}회`, sub: '2단마다 양쪽 늘림' },
              { label: '완성 총장', value: `${calc.totalLengthCm}cm`, sub: `${calc.totalRows}단` },
              { label: '예상 실 소요량', value: calc.yarnBalls, sub: 'DK/워스티드 기준' }
            ]}
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

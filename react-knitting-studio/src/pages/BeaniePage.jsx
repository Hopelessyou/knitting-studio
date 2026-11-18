import React, { useState } from 'react';
import useBeanieCalc from '../hooks/useBeanieCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import BeanieRoadmap from '../components/roadmap/BeanieRoadmap';

export default function BeaniePage({ onOpenVideo, isAdmin }) {
  const [gaugeSts, setGaugeSts] = useState(18);
  const [gaugeRows, setGaugeRows] = useState(24);
  const [headCirc, setHeadCirc] = useState(56);
  const [style, setStyle] = useState('classic');

  const calc = useBeanieCalc(gaugeSts, gaugeRows, headCirc, style);

  const styleNames = {
    classic: '클래식 폴딩 비니 (7cm 턴업 롤업)',
    watchcap: '숏 와치캡 (4cm 슬림 롤업)',
    slouchy: '슬라우치 롱비니 (무롤업 루즈 드레이프)'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Preview */}
      <ProductPreview
        category="beanie"
        style={style}
        onStyleChange={setStyle}
        fitBadge={styleNames[style]}
        options={[
          { id: 'classic', label: '클래식 폴딩 비니 (7cm 롤업)' },
          { id: 'watchcap', label: '숏 와치캡 (도커핏)' },
          { id: 'slouchy', label: '슬라우치 롱비니' }
        ]}
      />

      {/* 2. Inputs & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5 space-y-6">
          <GaugeInput
            gaugeSts={gaugeSts}
            gaugeRows={gaugeRows}
            onStsChange={setGaugeSts}
            onRowsChange={setGaugeRows}
          />

          <DimensionsInput
            title="실제 머리둘레 (cm)"
            subtitle="이마와 귀 윗부분을 지난 둘레입니다. (신축성 -5cm 자동 차감)"
            value={headCirc}
            min={48}
            max={64}
            onChange={setHeadCirc}
            presets={[
              { label: '여성 평균 (55)', val: 55 },
              { label: '남성 평균 (58)', val: 58 },
              { label: '아동 (50)', val: 50 }
            ]}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            isAdmin={isAdmin}
            castOn={calc.castOn}
            castOnLabel="시작 원형 캐스트온 코수"
            castOnDesc={`머리둘레 ${headCirc}cm - 신축성 5cm 차감 = 목표둘레 ${headCirc - 5}cm 기준`}
            formula={`8의 배수 (${calc.wedgeSts}코 × 8섹션 = 총 ${calc.castOn}코)`}
            ruleDesc="정수리 8등분 쐐기 줄임 대칭 완벽 보장"
            specs={[
              { label: '롤업 브림 높이', value: `${calc.brimHeightCm}cm`, sub: '이마 고무단' },
              { label: '정수리 줄임 시작', value: `${calc.crownStartHeightCm}cm`, sub: `${calc.crownStartRows}단` },
              { label: '비니 완성 총장', value: `${calc.totalHeightCm}cm`, sub: `${calc.totalRows}단` },
              { label: '예상 실 소요량', value: '1~2볼 (80~100g)', sub: '울 100% 기준' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="beanie" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary onOpenVideo={onOpenVideo} />

      {/* 5. Masterclass Detailed Roadmap */}
      <BeanieRoadmap calc={calc} onOpenVideo={onOpenVideo} />
    </div>
  );
}

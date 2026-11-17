import React, { useState } from 'react';
import useSocksCalc from '../hooks/useSocksCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import SocksRoadmap from '../components/roadmap/SocksRoadmap';

export default function SocksPage({ onOpenVideo }) {
  const [gaugeSts, setGaugeSts] = useState(32);
  const [gaugeRows, setGaugeRows] = useState(42);
  const [footLengthMm, setFootLengthMm] = useState(250);
  const [footCircCm, setFootCircCm] = useState(23);
  const [method, setMethod] = useState('toeup');

  const calc = useSocksCalc(gaugeSts, gaugeRows, footLengthMm, footCircCm, method);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Preview */}
      <ProductPreview
        category="socks"
        style={method}
        onStyleChange={setMethod}
        fitBadge={method === 'toeup' ? '토업 - 주디스 매직 & 저먼쇼트로우' : '커프다운 - 힐플랩 정석 & 키치너'}
        options={[
          { id: 'toeup', label: '토업 (Toe-up 발가락부터)' },
          { id: 'cuffdown', label: '커프다운 (Cuff-down 발목부터)' }
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
            title="발 길이 (mm)"
            subtitle="발뒤꿈치 맨 끝부터 가장 긴 발가락 끝까지의 실측입니다."
            value={footLengthMm}
            min={210}
            max={295}
            step={5}
            unit="mm"
            onChange={setFootLengthMm}
            presets={[
              { label: '235mm', val: 235 },
              { label: '250mm', val: 250 },
              { label: '265mm', val: 265 },
              { label: '280mm', val: 280 }
            ]}
          />

          <DimensionsInput
            title="발등 둘레 (cm)"
            subtitle="발바닥 아치 중간 가장 튀어나온 둘레 (-2cm 여유분 자동 적용)"
            value={footCircCm}
            min={18}
            max={28}
            onChange={setFootCircCm}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            castOn={calc.castOn}
            castOnLabel="양말 총 코수 (4의 배수)"
            castOnDesc={`발등 ${calc.halfSts}코 + 발바닥 ${calc.halfSts}코 완벽 2등분 분할`}
            formula={`목표 둘레 ${footCircCm - 2}cm × 3.2코 = ${calc.castOn}코`}
            ruleDesc="발등 핏 주름 없이 발에 착 감기는 쫀쫀한 텐션"
            specs={[
              { label: '발등/발바닥 코수', value: `각 ${calc.halfSts}코`, sub: '매직루프 바늘별' },
              { label: '직진 평단 구간', value: `${calc.straightFootCm}cm`, sub: '뒤꿈치 시작 전' },
              { label: '전체 발 단수', value: `${calc.totalRows}단`, sub: '발가락~뒤꿈치' },
              { label: '예상 실 소요량', value: '1볼 (약 80~100g)', sub: '양말 1켤레 완제' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="socks" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary />

      {/* 5. Masterclass Detailed Roadmap */}
      <SocksRoadmap calc={calc} onOpenVideo={onOpenVideo} />
    </div>
  );
}

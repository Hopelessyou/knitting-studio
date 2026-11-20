import React, { useState } from 'react';
import useScarfCalc from '../hooks/useScarfCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import ScarfRoadmap from '../components/roadmap/ScarfRoadmap';

export default function ScarfPage({ onOpenVideo, isAdmin, currentUser, onOpenAuthModal }) {
  const [gaugeSts, setGaugeSts] = useState(18);
  const [gaugeRows, setGaugeRows] = useState(24);
  const [targetW, setTargetW] = useState(25);
  const [targetL, setTargetL] = useState(180);
  const [pattern, setPattern] = useState('brioche');
  const [edge, setEdge] = useState('icord');
  const [yarnBallWeight, setYarnBallWeight] = useState(50);

  const calc = useScarfCalc(gaugeSts, gaugeRows, targetW, targetL, pattern, edge, yarnBallWeight);

  const patternNames = {
    brioche: '변형고무뜨기 (Brioche - 폭신한 에어볼륨)',
    rib1: '1코 고무뜨기 (1x1 Rib)',
    rib2: '2코 고무뜨기 (2x2 Rib)',
    garter: '가터뜨기 (초보자 무한 직진)'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* 1. Preview */}
      <ProductPreview
        category="scarf"
        style={pattern === 'brioche' ? 'brioche' : 'rib'}
        onStyleChange={(p) => setPattern(p === 'rib' ? 'rib2' : p)}
        fitBadge={patternNames[pattern]}
        options={[
          { id: 'brioche', label: '변형고무뜨기 (브리오쉬)' },
          { id: 'rib', label: '고무뜨기 (리브 머플러)' }
        ]}
      />

      {/* 2. Inputs & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-5 space-y-5">
          <GaugeInput
            gaugeSts={gaugeSts}
            gaugeRows={gaugeRows}
            onStsChange={setGaugeSts}
            onRowsChange={setGaugeRows}
            ballWeight={yarnBallWeight}
            onBallWeightChange={setYarnBallWeight}
          />

          {/* 2.a: 2-Column Compact Dimensions Grid for Scarf */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <DimensionsInput
              title="목도리 너비 (cm)"
              subtitle="선호하는 머플러 가로 폭"
              value={targetW}
              min={15}
              max={45}
              onChange={setTargetW}
              presets={[
                { label: '슬림 (20)', val: 20 },
                { label: '표준 (25)', val: 25 },
                { label: '와이드 (32)', val: 32 }
              ]}
            />

            <DimensionsInput
              title="목도리 총 길이 (cm)"
              subtitle="목에 2번 감아 자연스럽게 늘어뜨리는 길이"
              value={targetL}
              min={120}
              max={240}
              step={5}
              onChange={setTargetL}
              presets={[
                { label: '미니 (140)', val: 140 },
                { label: '성인 (180)', val: 180 },
                { label: '롱 (210)', val: 210 }
              ]}
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            isAdmin={isAdmin}
            isPrintAllowed={isAdmin}
            castOn={calc.totalCastOn}
            castOnLabel="시작 캐스트온 코수"
            castOnDesc={`패턴 코수 ${calc.bodySts}코 + 엣지 ${calc.edgeSts}코 = 총 ${calc.totalCastOn}코`}
            bodySts={calc.totalCastOn}
            bodyStsLabel="평면 왕복 코수 유지"
            bodyStsDesc="목도리 끝까지 증감 없이 직진 왕복"
            yarnBalls={calc.yarnBalls}
            yarnMeters={calc.yarnMeters}
            formula={pattern === 'brioche' ? '3의 배수 + 2코' : (pattern === 'rib2' ? '4의 배수 + 2코' : '2의 배수')}
            ruleDesc="양 가장자리 말림 100% 방지 공식"
            specs={[
              { label: '너비 및 길이', value: `${targetW} × ${targetL}cm`, sub: '완성 치수' },
              { label: '총 진행 단수', value: `${calc.totalRows}단`, sub: '목표 길이 기준' },
              { label: '엣지 기법', value: edge === 'icord' ? '아이코드 4코' : '체인 걸러뜨기', sub: '좌우 대칭' },
              { label: '예상 실 중량', value: `${calc.estGrams}g`, sub: '도톰한 캐시미어 울' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="scarf" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary onOpenVideo={onOpenVideo} />

      {/* 5. Masterclass Detailed Roadmap */}
      <ScarfRoadmap
        calc={calc}
        onOpenVideo={onOpenVideo}
        currentUser={currentUser}
        onOpenAuthModal={onOpenAuthModal}
      />
    </div>
  );
}

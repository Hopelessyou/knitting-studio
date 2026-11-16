import React, { useState } from 'react';
import useBeanieCalc from '../hooks/useBeanieCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import RoadmapContainer from '../components/roadmap/RoadmapContainer';
import RoadmapStepCard from '../components/roadmap/RoadmapStepCard';

export default function BeaniePage({ onOpenVideo }) {
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
              { label: '여성 평균', val: 55 },
              { label: '남성 평균', val: 58 },
              { label: '아동', val: 50 }
            ]}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            castOn={calc.castOn}
            castOnLabel="시작 원형 캐스트온 코수"
            castOnDesc={`머리둘레 ${headCirc}cm - 신축성 5cm 차감 = 목표둘레 ${headCirc - 5}cm 기준`}
            formula={`8의 배수 (${calc.wedgeSts}코 × 8섹션 = 총 ${calc.castOn}코)`}
            ruleDesc="정수리 8등분 쐐기 줄임 대칭 완벽 보장"
            specs={[
              { label: '롤업 브림 높이', value: `${calc.brimHeightCm}cm`, sub: '이마 고무단' },
              { label: '정수리 줄임 시작', value: `${calc.crownStartHeightCm}cm`, sub: `${calc.crownStartRows}단` },
              { label: '비니 완성 총장', value: `${calc.totalHeightCm}cm`, sub: `${calc.totalRows}단` },
              { label: '예상 실 소요량', value: calc.yarnBalls, sub: '울 100% 기준' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="beanie" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary />

      {/* 5. Roadmap */}
      <RoadmapContainer
        title={`실전 비니 뜨개 5단계 가이드 (${styleNames[style]})`}
        badge="8등분 왕관 줄임 공식"
      >
        <RoadmapStepCard
          stepNumber="01"
          title="원형 코잡기 &amp; 꼬임 방지 링 연결"
          subtitle="초보자가 가장 많이 실패하는 첫 단 꼬임을 완벽 차단합니다."
          setup={<p>• <strong>바늘</strong>: 3.5mm (40cm 숏서큘러)<br/>• <strong>준비물</strong>: 시작 마커(BOR) 1개</p>}
          recipe={<p>• 독일식 트위스티드 코잡기로 <strong>{calc.castOn}코</strong>를 잡은 뒤 바늘을 원형으로 연결합니다.</p>}
          proTip={<p>• 바늘에 걸린 코들의 아랫단(매듭)이 모두 안쪽을 향하는지 점검 후 첫 코를 뜨세요.</p>}
          milestone={<p>• 첫 1단을 원형으로 꼬임 없이 성공적으로 연결합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="02"
          title="쫀쫀한 텐션의 고무단 (Brim) 직진"
          subtitle="이마를 조이지 않으면서 흘러내리지 않는 완벽한 립 탄력을 완성합니다."
          setup={<p>• <strong>바늘</strong>: 3.5mm 40cm</p>}
          recipe={<p>• 2코 고무뜨기(K2, P2)로 <strong>{calc.brimHeightCm}cm</strong> 높이까지 직진합니다.</p>}
          proTip={<p>• 안뜨기에서 겉뜨기로 넘어갈 때 실을 살짝 당겨주면 고무단 골이 늘어지지 않고 쫀쫀하게 정렬됩니다.</p>}
          milestone={<p>• 고무단 높이 {calc.brimHeightCm}cm 도달 시 메인 바늘(4.5mm)로 교체합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="03"
          title="메인 몸통 (Body) 편안한 직진 궤도"
          subtitle="메인 바늘로 볼륨감 있는 비니 실루엣을 시원하게 올리는 구간입니다."
          setup={<p>• <strong>바늘</strong>: 메인 4.5mm 40cm 숏서큘러</p>}
          recipe={<p>• 메리야스뜨기(모든 단 겉뜨기)로 총 높이 <strong>{calc.crownStartHeightCm}cm ({calc.crownStartRows}단)</strong>까지 직진합니다.</p>}
          proTip={<p>• 롤업 비니는 접었을 때 안쪽 면이 바깥으로 나오므로 고무단 배색 시 주의하세요.</p>}
          milestone={<p>• 바닥에 펼쳐 측정 시 시작단부터 바늘 밑단까지 {calc.crownStartHeightCm}cm에 도달하면 정수리 줄임에 돌입합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="04"
          title="정수리 8등분 쐐기 줄임 &amp; 바늘 전환 (매직루프)"
          subtitle="코수가 급격히 줄어들 때 편물이 당기지 않도록 바늘을 교체합니다."
          setup={<p>• <strong>필수 교체</strong>: 80cm 줄바늘(매직루프) 또는 장갑바늘(DPNs)<br/>• <strong>마커</strong>: {calc.wedgeSts}코마다 마커 8개 배치</p>}
          recipe={<p>• [겉 {calc.wedgeSts - 2}코 + K2tog]를 8회 반복 후, 다음 단은 평단으로 뜨며 정수리 높이 {calc.crownDecreaseCm}cm를 완성합니다.</p>}
          proTip={<p>• 40cm 케이블은 코가 30코 이하로 줄면 뜰 수 없습니다! 과감히 80cm 바늘로 매직루프를 구사하세요.</p>}
          milestone={<p>• 바늘에 최종 8코~16코만 남으면 실을 20cm 남기고 자릅니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="05"
          title="정수리 돗바늘 조임 &amp; 안쪽 매듭 마감"
          subtitle="가운데 구멍 없이 동그랗고 매끄러운 돔 형태의 정수리를 봉합합니다."
          setup={<p>• <strong>도구</strong>: 돗바늘</p>}
          recipe={<p>• 돗바늘에 실을 꿰어 남은 코들을 한 코씩 차례대로 통과시킨 뒤, 복주머니처럼 꽉 잡아당겨 안쪽으로 실을 빼서 매듭짓습니다.</p>}
          proTip={<p>• 정수리 실을 한 번 더 둘레를 따라 2중으로 통과시키면 세탁 후에도 절대 정수리가 벌어지지 않습니다.</p>}
          milestone={<p>• 롤업을 접어 머리에 써보고 완벽한 핏을 만끽하세요!</p>}
        />
      </RoadmapContainer>
    </div>
  );
}

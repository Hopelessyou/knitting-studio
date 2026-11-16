import React, { useState } from 'react';
import useScarfCalc from '../hooks/useScarfCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import RoadmapContainer from '../components/roadmap/RoadmapContainer';
import RoadmapStepCard from '../components/roadmap/RoadmapStepCard';

export default function ScarfPage({ onOpenVideo }) {
  const [gaugeSts, setGaugeSts] = useState(18);
  const [gaugeRows, setGaugeRows] = useState(24);
  const [targetW, setTargetW] = useState(25);
  const [targetL, setTargetL] = useState(180);
  const [pattern, setPattern] = useState('brioche');
  const [edge, setEdge] = useState('icord');

  const calc = useScarfCalc(gaugeSts, gaugeRows, targetW, targetL, pattern, edge);

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
        <div className="lg:col-span-5 space-y-6">
          <GaugeInput
            gaugeSts={gaugeSts}
            gaugeRows={gaugeRows}
            onStsChange={setGaugeSts}
            onRowsChange={setGaugeRows}
          />

          <DimensionsInput
            title="목도리 너비 (cm)"
            subtitle="선호하는 머플러 가로 폭을 설정합니다."
            value={targetW}
            min={15}
            max={45}
            onChange={setTargetW}
            presets={[
              { label: '슬림', val: 20 },
              { label: '스탠다드', val: 25 },
              { label: '와이드', val: 32 }
            ]}
          />

          <DimensionsInput
            title="목도리 총 길이 (cm)"
            subtitle="성인 목에 2번 감아 자연스럽게 늘어뜨리는 길이"
            value={targetL}
            min={120}
            max={240}
            step={5}
            onChange={setTargetL}
            presets={[
              { label: '미니 쁘띠', val: 140 },
              { label: '표준 성인', val: 180 },
              { label: '롱 머플러', val: 210 }
            ]}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            castOn={calc.totalCastOn}
            castOnLabel="시작 캐스트온 코수"
            castOnDesc={`패턴 코수 ${calc.bodySts}코 + 엣지 ${calc.edgeSts}코 = 총 ${calc.totalCastOn}코`}
            formula={pattern === 'brioche' ? '3의 배수 + 2코' : (pattern === 'rib2' ? '4의 배수 + 2코' : '2의 배수')}
            ruleDesc="양 가장자리 말림 100% 방지 공식"
            specs={[
              { label: '너비 및 길이', value: `${targetW} × ${targetL}cm`, sub: '완성 치수' },
              { label: '총 진행 단수', value: `${calc.totalRows}단`, sub: '목표 길이 기준' },
              { label: '엣지 기법', value: edge === 'icord' ? '아이코드 4코' : '체인 걸러뜨기', sub: '양 끝 대칭' },
              { label: '예상 실 소요량', value: calc.yarnBalls, sub: '도톰한 울/캐시미어' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="scarf" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary />

      {/* 5. Roadmap */}
      <RoadmapContainer
        title={`실전 목도리 뜨개 5단계 가이드 (${patternNames[pattern]})`}
        badge="사방 말림 방지 프리미엄 공식"
      >
        <RoadmapStepCard
          stepNumber="01"
          title="느슨하고 신축성 있는 코잡기"
          subtitle="끝단이 오그라들지 않는 신축성 캐스트온"
          setup={<p>• <strong>바늘</strong>: 5.5mm~6.0mm (평면 줄바늘)<br/>• <strong>마커</strong>: 엣지 경계 표시 마커 2개</p>}
          recipe={<p>• 롱테일 코잡기를 할 때 바늘 2개를 겹쳐 쥐고 총 <strong>{calc.totalCastOn}코</strong>를 잡은 뒤 한 바늘을 뺍니다.</p>}
          proTip={<p>• 코잡기가 팽팽하면 목도리 첫 단만 가로 폭이 좁아지는 호리병 현상이 발생합니다. 넉넉하게 잡으세요.</p>}
          milestone={<p>• 균일한 간격으로 {calc.totalCastOn}코가 바늘에 자리 잡았습니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="02"
          title="엣지 세팅 &amp; 패턴 반복 직진"
          subtitle="양 끝이 돌돌 말리지 않는 명품 엣지 튜브를 형성합니다."
          setup={<p>• 양 끝 2코씩 엣지 마커 배치</p>}
          recipe={<p>• 시작 2코 겉뜨기 → 마커 넘김 → 패턴 반복 → 마커 넘김 → 끝 2코 실 앞에 두고 걸러뜨기를 무한 반복합니다.</p>}
          proTip={<p>• 변형고무뜨기는 바늘비우기 루프와 다음 코가 X자로 만나는 지점을 한꺼번에 찔러 겉뜨기(K2tog)하면 도톰한 볼륨이 살아납니다.</p>}
          milestone={<p>• 패턴 10단 이상 진행 시 가장자리가 말리지 않고 통통한 튜브 엣지가 완성되는 것을 눈으로 확인합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="03"
          title="일정한 손장력 유지 &amp; 길이 측정"
          subtitle="가장자리 선이 삐뚤빼뚤해지지 않는 장력 유지 팁"
          setup={<p>• <strong>도구</strong>: 줄자</p>}
          recipe={<p>• 바닥에 목도리를 편평하게 펴고 목표 길이 <strong>{targetL}cm ({calc.totalRows}단)</strong>까지 직진합니다.</p>}
          proTip={<p>• 목도리를 들고 재면 무게 때문에 늘어납니다. 반드시 평평한 테이블에 내려놓고 살살 펴서 길이를 재세요.</p>}
          milestone={<p>• 목표 길이 {targetL}cm에 도달하면 코막음 준비를 합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="04"
          title="신축성 있는 탄력 바인드오프 (코막음)"
          subtitle="시작단과 동일한 너비로 똑 떨어지는 마감"
          setup={<p>• <strong>바늘</strong>: 0.5mm 더 굵은 바늘 사용 권장</p>}
          recipe={<p>• 겉뜨기 코에는 겉뜨기, 안뜨기 코에는 안뜨기를 뜨며 덮어씌우는 고무단 코막음(Ribbed BO)을 진행합니다.</p>}
          proTip={<p>• 코를 넘길 때 실을 세게 당기면 끝단이 팽팽하게 오그라듭니다. 루프 높이를 여유 있게 유지하세요.</p>}
          milestone={<p>• 마지막 1코에 실을 통과시켜 20cm 남기고 자릅니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="05"
          title="꼬리실 정리 &amp; 스팀 블로킹 (Blocking)"
          subtitle="털실 결이 정돈되고 가장자리가 반듯해지는 기적의 마법"
          setup={<p>• <strong>도구</strong>: 굵은 돗바늘, 스팀다리미 (또는 분무기 &amp; T핀)</p>}
          recipe={<p>• 시작과 끝 꼬리실을 아이코드 튜브 안쪽으로 쏙 집어넣어 숨깁니다. 다리미를 편물에 직접 대지 않고 2cm 위에서 스팀만 쐬어줍니다.</p>}
          proTip={<p>• 스팀을 쐬어주면 울 섬유가 숨을 쉬며 올록볼록했던 기복이 기성복 매장 제품처럼 매끄럽게 펴집니다.</p>}
          milestone={<p>• 포근하고 부드러운 핸드메이드 목도리가 완성되었습니다!</p>}
        />
      </RoadmapContainer>
    </div>
  );
}

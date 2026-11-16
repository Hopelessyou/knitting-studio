import React, { useState } from 'react';
import useSweaterCalc from '../hooks/useSweaterCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import RoadmapContainer from '../components/roadmap/RoadmapContainer';
import RoadmapStepCard from '../components/roadmap/RoadmapStepCard';

export default function SweaterPage({ onOpenVideo }) {
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
        fitBadge={fit === 'tailored' ? '테일러드 슬림핏 (+7cm)' : '루즈 오버핏 (+15cm)'}
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
              { label: 'S', val: 85 },
              { label: 'M', val: 95 },
              { label: 'L', val: 105 },
              { label: 'XL', val: 115 }
            ]}
          />
        </div>

        <div className="lg:col-span-7">
          <ResultSummaryCard
            castOn={calc.castOn}
            castOnLabel="시작 목둘레 캐스트온 코수"
            castOnDesc={`목둘레 둘레 약 46cm 기준 · 3.5mm 바늘로 튜블러 코잡기 권장`}
            formula={`몸통 ${calc.totalBodySts}코 (앞뒤 각 ${Math.round(calc.totalBodySts / 2)}코)`}
            ruleDesc={`완성 가슴둘레 ${calc.targetChest}cm (여유분 포함)`}
            specs={[
              { label: '요크 깊이', value: `${calc.yokeDepthCm}cm`, sub: `${calc.yokeRows}단` },
              { label: '레글런 늘림', value: `${calc.increaseRounds}회`, sub: '2단마다 양쪽 늘림' },
              { label: '완성 총장', value: `${calc.totalLengthCm}cm`, sub: `${calc.totalRows}단` },
              { label: '예상 실 소요량', value: calc.yarnBalls, sub: 'DK/워스티드 기준' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="sweater" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary />

      {/* 5. Roadmap */}
      <RoadmapContainer
        title="탑다운 레글런 스웨터 5단계 실전 로드맵"
        badge="실측 게이지 100% 자동 대입"
      >
        <RoadmapStepCard
          stepNumber="01"
          title="목둘레 튜블러 코잡기 &amp; 넥밴드 립 고무단"
          subtitle="늘어짐 없는 명품 니트의 완성은 목둘레 탄력 코잡기에서 결정됩니다."
          setup={<p>• <strong>바늘</strong>: 3.5mm (40cm 숏서큘러)<br/>• <strong>준비물</strong>: 시작 마커(BOR) 1개</p>}
          recipe={<p>• <strong>코잡기</strong>: 이탈리안 튜블러로 <strong>{calc.castOn}코</strong>를 잡습니다.<br/>• <strong>진행</strong>: 1코 고무뜨기(K1, P1)로 3~4cm 높이까지 원형으로 뜹니다.</p>}
          proTip={<p>• 첫 단 연결 시 편물이 꽈배기처럼 꼬이지 않았는지 바늘 안쪽으로 가지런히 정리한 후 원형을 연결하세요.</p>}
          milestone={<p>• 넥밴드 높이 3.5cm 도달 시 메인 바늘(4.5mm)로 교체합니다.</p>}
          videoTitle="튜블러 코잡기"
          onVideoOpen={() => onOpenVideo('00u88Q6z3bA', '이탈리안 튜블러 코잡기')}
        />

        <RoadmapStepCard
          stepNumber="02"
          title="레글런 마커 세팅 &amp; 사선 늘림 (M1R / M1L)"
          subtitle="4개 레글런 라인을 따라 입체적인 어깨와 가슴 품을 확장합니다."
          setup={<p>• <strong>바늘</strong>: 메인 4.5mm (60~80cm 줄바늘)<br/>• <strong>마커 8개 배분</strong>: 뒷판 {calc.backSts}코, 앞판 {calc.frontSts}코, 양 소매 각 {calc.sleeveSts}코</p>}
          recipe={<p>• <strong>늘림 공식</strong>: 2단마다 레글런 선 양쪽에서 [M1R + 겉2 + M1L]로 한 라운드당 8코씩 총 <strong>{calc.increaseRounds}회</strong> 늘립니다.</p>}
          proTip={<p>• 구멍이 생기지 않도록 싱커루프를 들어올릴 때 뒤쪽 코는 앞에서, 앞쪽 코는 뒤에서 꼬아뜨는 방향을 엄수하세요.</p>}
          milestone={<p>• 뒷목 중심에서 잰 요크 깊이가 <strong>{calc.yokeDepthCm}cm ({calc.yokeRows}단)</strong>에 도달하면 소매를 분리합니다.</p>}
          videoTitle="레글런 M1R/M1L 늘림"
          onVideoOpen={() => onOpenVideo('1v3x4a5b6c', '레글런 M1R / M1L 정석')}
        />

        <RoadmapStepCard
          stepNumber="03"
          title="소매 코 분리 &amp; 겨드랑이 감아코(Cast on) 연결"
          subtitle="양쪽 소매 코를 별실에 잠시 쉬게 걸어두고, 몸통 원통을 하나로 연결합니다."
          setup={<p>• <strong>준비물</strong>: 별실 1m 2줄 또는 실리콘 코드</p>}
          recipe={<p>• 양 소매 코를 별실에 꿰어 쉬어두고, 겨드랑이 밑에 감아코 6~8코를 만든 뒤 앞·뒤판을 연결하여 몸통 총 <strong>{calc.totalBodySts}코</strong>를 완성합니다.</p>}
          proTip={<p>• 몸통과 소매 경계에서 실을 살짝 단단하게 당겨주면 겨드랑이 구멍을 미연에 방지할 수 있습니다.</p>}
          milestone={<p>• 몸통 바늘이 하나로 연결되어 편안한 메리야스 원형뜨기 직진 궤도에 진입합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="04"
          title="몸통 메리야스 무한 직진 &amp; 밑단 고무단 바인드오프"
          subtitle="넷플릭스를 보며 가장 편안하게 뜨는 직진 구간과 탄력 있는 밑단 마감입니다."
          setup={<p>• <strong>바늘</strong>: 80cm 줄바늘 (메리야스 구간) → 3.5mm (밑단 고무단)</p>}
          recipe={<p>• 겨드랑이 분리점부터 36cm 직진 후, 3.5mm 바늘로 2코 고무뜨기 6cm를 뜨고 돗바늘로 탄력 코막음합니다.</p>}
          proTip={<p>• 입어보며 골반 라인 선호 길이에 맞춰 언제든 단수를 2~3cm 조절할 수 있습니다.</p>}
          milestone={<p>• 밑단 코막음 완료 시 몸통이 100% 완성되며 양 소매만 남습니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="05"
          title="소매 코 줍기 &amp; 손목 줄임 &amp; 소매단 바인드오프"
          subtitle="쉬어두었던 소매 코를 바늘에 옮겨 손목까지 자연스럽게 좁아지는 테이퍼드 핏을 완성합니다."
          setup={<p>• <strong>바늘</strong>: 4.5mm 줄바늘 (80cm 매직루프 or 숏팁) → 3.5mm (소매단)</p>}
          recipe={<p>• 별실의 소매 코와 겨드랑이 감아코를 주워 40cm 직진하며 8단마다 2코씩 손목 줄임을 진행합니다.</p>}
          proTip={<p>• 겨드랑이 모서리 틈새에서 1코를 더 주워 다음 단에서 모아뜨면 절대 겨드랑이에 구멍이 남지 않습니다.</p>}
          milestone={<p>• 양쪽 소매를 모두 마치고 실꼬리를 정리한 뒤 미온수에 울샴푸로 가볍게 세탁하여 평평하게 뉘어 건조(블로킹)하면 완벽한 스웨터가 탄생합니다.</p>}
        />
      </RoadmapContainer>
    </div>
  );
}

import React, { useState } from 'react';
import useSocksCalc from '../hooks/useSocksCalc';
import ProductPreview from '../components/common/ProductPreview';
import ToolChecklist from '../components/common/ToolChecklist';
import VocabDictionary from '../components/common/VocabDictionary';
import GaugeInput from '../components/inputs/GaugeInput';
import DimensionsInput from '../components/inputs/DimensionsInput';
import ResultSummaryCard from '../components/results/ResultSummaryCard';
import RoadmapContainer from '../components/roadmap/RoadmapContainer';
import RoadmapStepCard from '../components/roadmap/RoadmapStepCard';

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
              { label: '예상 실 소요량', value: calc.yarnBalls, sub: '양말 1켤레 완제' }
            ]}
          />
        </div>
      </div>

      {/* 3. Tools Checklist */}
      <ToolChecklist category="socks" />

      {/* 4. Vocab Dictionary */}
      <VocabDictionary />

      {/* 5. Roadmap */}
      <RoadmapContainer
        title={`실전 맞춤 양말 뜨개 5단계 (${method === 'toeup' ? '토업' : '커프다운'})`}
        badge="닳지 않는 뒤꿈치 특급 공식"
      >
        <RoadmapStepCard
          stepNumber="01"
          title={method === 'toeup' ? "주디스 매직 캐스트온 & 발가락 증코" : "발목 튜블러 코잡기 & 1x1 립 고무단"}
          subtitle={method === 'toeup' ? "발끝 솔기 없이 매끄럽게 시작하는 마법의 코잡기" : "늘어남 없는 탄력 발목 밴드"}
          setup={<p>• <strong>바늘</strong>: 2.5mm (80~100cm 부드러운 줄바늘 매직루프)</p>}
          recipe={<p>{method === 'toeup' ? `양쪽 바늘에 각 ${calc.toeStartSts / 2}코씩 총 ${calc.toeStartSts}코를 잡고, 1단 걸러 양 끝 M1R/M1L로 총 ${calc.castOn}코까지 늘립니다.` : `독일식 트위스티드 코잡기로 ${calc.castOn}코를 잡고 1코 고무뜨기로 4~5cm 직진합니다.`}</p>}
          proTip={<p>• 매직루프 시 케이블이 꺾이지 않도록 바늘 팁을 부드럽게 뽑아주세요.</p>}
          milestone={<p>{method === 'toeup' ? `총 ${calc.castOn}코 도달 시 발가락이 완성됩니다.` : `발목 고무단 4cm 완성 시 메리야스 레그로 진입합니다.`}</p>}
          videoTitle="주디스 매직 캐스트온"
          onVideoOpen={() => onOpenVideo('00u88Q6z3bA', '주디스 매직 캐스트온')}
        />

        <RoadmapStepCard
          stepNumber="02"
          title="발바닥 &amp; 발등 직진 (Foot)"
          subtitle="뒤꿈치 시작점까지 오차 없이 편안하게 달리는 평단 구간입니다."
          setup={<p>• <strong>도구</strong>: 양말 게이지 자 (Sock Ruler)</p>}
          recipe={<p>• 코 늘림 없이 앞뒤 메리야스로 <strong>{calc.straightFootCm}cm</strong> 직진합니다.</p>}
          proTip={<p>• 틈틈이 발을 넣어보며 새끼발가락 뿌리뼈가 완전히 덮이는지 확인하세요.</p>}
          milestone={<p>• 발가락 끝부터 바늘까지 {calc.straightFootCm}cm 도달 시 뒤꿈치 작업에 착수합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="03"
          title={method === 'toeup' ? "저먼 숏로우(GSR) 뒤꿈치 회전" : "힐플랩(Heel Flap) & 힐턴(Heel Turn)"}
          subtitle="양말에서 가장 닳기 쉬운 뒤꿈치를 두툼하고 입체적으로 만드는 핵심 공정입니다."
          setup={<p>• <strong>준비물</strong>: 개폐형 옷핀 마커 4개</p>}
          recipe={<p>{method === 'toeup' ? `발바닥 ${calc.halfSts}코로 더블스티치(DS)를 만들며 뒤꿈치 컵을 형성합니다.` : `아이 오브 패트리지(Eye of Partridge) 엠보싱 조직으로 플랩 ${calc.flapRows}단을 뜬 뒤 3등분 힐턴을 합니다.`}</p>}
          proTip={<p>• 더블스티치를 뜰 때 실을 위로 힘껏 당겨 2개의 다리가 바늘에 팽팽히 걸리게 하세요.</p>}
          milestone={<p>• 뒤꿈치 입체 컵이 완성되고 다시 원형 원통으로 복귀합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="04"
          title="발목 &amp; 거셋(Gusset) 직진"
          subtitle="종아리로 올라가는 다리 라인을 완성합니다."
          setup={<p>• <strong>바늘</strong>: 2.5mm 매직루프</p>}
          recipe={<p>• 원형으로 발목 레그(Leg) 구간을 14~18cm 원하는 길이까지 직진합니다.</p>}
          proTip={<p>• 뒤꿈치와 발등 연결 경계에서 틈새 코를 1코 더 주워 다음 단에서 모아뜨면 양말 옆구멍이 100% 예방됩니다.</p>}
          milestone={<p>• 발목 밴드 시작점까지 도달합니다.</p>}
        />

        <RoadmapStepCard
          stepNumber="05"
          title={method === 'toeup' ? "제니의 놀라운 탄력 코막음 (Jeny's Stretchy BO)" : "발가락 키치너 스티치 (Kitchener Stitch)"}
          subtitle="발이 들어갈 때 절대 찢어지지 않는 최고의 신축성 바인드오프"
          setup={<p>• <strong>도구</strong>: 돗바늘</p>}
          recipe={<p>{method === 'toeup' ? `바늘비우기를 걸며 코막음하는 Jeny's Stretchy Bind-Off로 발목 고무단을 마감합니다.` : `발등과 발바닥 각 ${calc.halfSts / 2}코를 돗바늘로 솔기 없이 겉뜨기 메리야스로 이어붙입니다.`}</p>}
          proTip={<p>• 일반 코막음을 하면 발목이 안 들어가 신을 수 없게 됩니다. 반드시 신축성 마감을 사용하세요.</p>}
          milestone={<p>• 돗바늘로 꼬리실을 숨기고, 발 모형 블로커에 끼워 미온수 스팀을 쐬어주면 백화점 양말보다 멋진 맞춤 양말 완성!</p>}
        />
      </RoadmapContainer>
    </div>
  );
}

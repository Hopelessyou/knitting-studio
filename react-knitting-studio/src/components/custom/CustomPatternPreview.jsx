import React from 'react';

/**
 * CustomPatternPreview
 * 어깨 구조, 실루엣 기장, 무늬 패턴에 따라 형태가 실시간으로 변형되는 2D 편물 인터랙티브 도면
 */
export default function CustomPatternPreview({ calc }) {
  const isDrop = calc.shoulderType === 'drop';
  const isCrop = calc.lengthType === 'crop';
  const isLong = calc.lengthType === 'long';

  // SVG viewBox and coordinates
  // Proportions change dynamically based on crop/long and drop/raglan
  const bodyHeight = isCrop ? 180 : isLong ? 280 : 230;
  const armholeY = isDrop ? 120 : 105;
  const shoulderWidth = isDrop ? 170 : 135;
  const hemWidth = isDrop ? 160 : 145;

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 border border-on-surface/[0.08] shadow-sm mb-6 relative overflow-hidden">
      {/* Top Header Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-on-surface/[0.06]">
        <div>
          <span className="text-[10px] sm:text-[11px] font-bold text-secondary uppercase tracking-wider block mb-0.5">
            2D INTERACTIVE BLUEPRINT
          </span>
          <h3 className="text-base font-bold font-serif text-on-surface flex items-center gap-1.5">
            <span>실시간 2D 맞춤 도면 전개도</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">
              {calc.structureTitle.split(' ')[0]}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-bold">
              {calc.patternName.split(' ')[0]}
            </span>
          </h3>
        </div>
        <div className="text-xs text-on-surface-variant flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>실측 치수 100% 자동 매핑 중</span>
        </div>
      </div>

      {/* Interactive Blueprint Canvas (SVG) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-surface-container-low/60 rounded-2xl border border-on-surface/[0.06] flex items-center justify-center p-4 overflow-hidden">
        {/* Subtle Background Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#1b1712_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <svg
          viewBox="0 0 500 380"
          className="w-full h-full max-h-[350px] drop-shadow-md select-none transition-all duration-300"
        >
          <defs>
            {/* Pattern Fill: Cable */}
            <pattern id="cableTexture" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 6,0 C 18,8 6,16 18,24" fill="none" stroke="#c46243" strokeWidth="1.2" strokeOpacity="0.25" />
              <path d="M 18,0 C 6,8 18,16 6,24" fill="none" stroke="#c46243" strokeWidth="1.2" strokeOpacity="0.25" />
            </pattern>
            {/* Pattern Fill: Moss */}
            <pattern id="mossTexture" width="12" height="12" patternUnits="userSpaceOnUse">
              <rect x="2" y="2" width="3" height="3" fill="#2c3a47" fillOpacity="0.15" rx="1" />
              <rect x="8" y="8" width="3" height="3" fill="#2c3a47" fillOpacity="0.15" rx="1" />
            </pattern>
            {/* Pattern Fill: Stripe */}
            <pattern id="stripeTexture" width="40" height="24" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="40" height="12" fill="#c46243" fillOpacity="0.12" />
              <rect x="0" y="12" width="40" height="12" fill="#2c3a47" fillOpacity="0.08" />
            </pattern>
          </defs>

          {/* Torso & Sleeves Group centered at (250, 40) */}
          <g id="garmentBody">
            {/* Main Torso Polygon */}
            {isDrop ? (
              // Drop Shoulder: Boxy straight silhouette with dropped sleeves
              <path
                d={`
                  M ${250 - 45},50 
                  Q 250,65 ${250 + 45},50 
                  L ${250 + shoulderWidth},70 
                  L ${250 + shoulderWidth - 10},${armholeY} 
                  L ${250 + hemWidth},${50 + bodyHeight} 
                  L ${250 - hemWidth},${50 + bodyHeight} 
                  L ${250 - shoulderWidth + 10},${armholeY} 
                  L ${250 - shoulderWidth},70 
                  Z
                `}
                fill={calc.patternType === 'cable' ? 'url(#cableTexture)' : calc.patternType === 'moss' ? 'url(#mossTexture)' : calc.patternType === 'stripe' ? 'url(#stripeTexture)' : '#ffffff'}
                stroke="#c46243"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            ) : (
              // Raglan: Angled diagonal yoke seam lines from neck to armpit
              <path
                d={`
                  M ${250 - 40},50 
                  Q 250,62 ${250 + 40},50 
                  L ${250 + shoulderWidth},${armholeY} 
                  L ${250 + hemWidth},${50 + bodyHeight} 
                  L ${250 - hemWidth},${50 + bodyHeight} 
                  L ${250 - shoulderWidth},${armholeY} 
                  Z
                `}
                fill={calc.patternType === 'cable' ? 'url(#cableTexture)' : calc.patternType === 'moss' ? 'url(#mossTexture)' : calc.patternType === 'stripe' ? 'url(#stripeTexture)' : '#ffffff'}
                stroke="#c46243"
                strokeWidth="2.5"
                strokeLinejoin="round"
                className="transition-all duration-300"
              />
            )}

            {/* Raglan Diagonal Seam Lines */}
            {!isDrop && (
              <>
                <line x1={250 - 32} y1="52" x2={250 - shoulderWidth + 15} y2={armholeY} stroke="#c46243" strokeWidth="2" strokeDasharray="3 3" />
                <line x1={250 + 32} y1="52" x2={250 + shoulderWidth - 15} y2={armholeY} stroke="#c46243" strokeWidth="2" strokeDasharray="3 3" />
              </>
            )}

            {/* Dropped Shoulder Seam Marker */}
            {isDrop && (
              <>
                <line x1={250 - 110} y1="62" x2={250 - 110} y2="105" stroke="#2c3a47" strokeWidth="1.5" strokeDasharray="3 2" />
                <line x1={250 + 110} y1="62" x2={250 + 110} y2="105" stroke="#2c3a47" strokeWidth="1.5" strokeDasharray="3 2" />
              </>
            )}

            {/* Left Sleeve */}
            <path
              d={`
                M ${250 - shoulderWidth},${isDrop ? 70 : armholeY - 20}
                L ${250 - shoulderWidth - 55},${armholeY + 110}
                L ${250 - shoulderWidth - 32},${armholeY + 115}
                L ${250 - shoulderWidth + (isDrop ? 10 : 0)},${armholeY}
                Z
              `}
              fill="#ffffff"
              stroke="#c46243"
              strokeWidth="2"
              strokeLinejoin="round"
              fillOpacity="0.9"
            />

            {/* Right Sleeve */}
            <path
              d={`
                M ${250 + shoulderWidth},${isDrop ? 70 : armholeY - 20}
                L ${250 + shoulderWidth + 55},${armholeY + 110}
                L ${250 + shoulderWidth + 32},${armholeY + 115}
                L ${250 + shoulderWidth - (isDrop ? 10 : 0)},${armholeY}
                Z
              `}
              fill="#ffffff"
              stroke="#c46243"
              strokeWidth="2"
              strokeLinejoin="round"
              fillOpacity="0.9"
            />

            {/* Neckline Ribbing arc */}
            <ellipse cx="250" cy="50" rx="35" ry="12" fill="none" stroke="#c46243" strokeWidth="2" strokeDasharray="2 2" />

            {/* Bottom Hem Ribbing */}
            <line
              x1={250 - hemWidth + 2}
              y1={50 + bodyHeight - 12}
              x2={250 + hemWidth - 2}
              y2={50 + bodyHeight - 12}
              stroke="#c46243"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
          </g>

          {/* ========================================================== */}
          {/* Dimension Lines & Real-time Calculation Badges */}
          {/* ========================================================== */}
          {/* 1. Neck Circumference Measurement Badge */}
          <g>
            <rect x="205" y="15" width="90" height="22" rx="11" fill="#c46243" />
            <text x="250" y="30" textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              목 {calc.neckCastOn}코 ({calc.neckCm}cm)
            </text>
          </g>

          {/* 2. Body Bust Width Measurement Badge */}
          <g>
            <line x1={250 - hemWidth - 10} y1={armholeY + 35} x2={250 + hemWidth + 10} y2={armholeY + 35} stroke="#2c3a47" strokeWidth="1" strokeDasharray="3 3" />
            <rect x="185" y={armholeY + 23} width="130" height="24" rx="12" fill="#2c3a47" />
            <text x="250" y={armholeY + 39} textAnchor="middle" fill="#ffffff" fontSize="11" fontWeight="bold">
              앞·뒤 각 {calc.halfBodySts}코 ({calc.actualChestCm / 2}cm)
            </text>
          </g>

          {/* 3. Total Length Measurement Badge (Right vertical line) */}
          <g>
            <line x1={250 + hemWidth + 20} y1="50" x2={250 + hemWidth + 20} y2={50 + bodyHeight} stroke="#7c6660" strokeWidth="1.2" />
            <line x1={250 + hemWidth + 15} y1="50" x2={250 + hemWidth + 25} y2="50" stroke="#7c6660" strokeWidth="1.5" />
            <line x1={250 + hemWidth + 15} y1={50 + bodyHeight} x2={250 + hemWidth + 25} y2={50 + bodyHeight} stroke="#7c6660" strokeWidth="1.5" />
            <rect x={250 + hemWidth + 12} y={50 + bodyHeight / 2 - 12} width="85" height="24" rx="6" fill="#f8ecdf" stroke="#7c6660" strokeWidth="1" />
            <text x={250 + hemWidth + 54} y={50 + bodyHeight / 2 + 4} textAnchor="middle" fill="#1b1712" fontSize="10.5" fontWeight="bold">
              총 {calc.totalLengthCm}cm ({calc.totalRows}단)
            </text>
          </g>

          {/* 4. Armhole Depth Measurement Badge (Left vertical line) */}
          <g>
            <line x1={250 - hemWidth - 20} y1="50" x2={250 - hemWidth - 20} y2={armholeY} stroke="#7c6660" strokeWidth="1.2" />
            <line x1={250 - hemWidth - 25} y1="50" x2={250 - hemWidth - 15} y2="50" stroke="#7c6660" strokeWidth="1.5" />
            <line x1={250 - hemWidth - 25} y1={armholeY} x2={250 - hemWidth - 15} y2={armholeY} stroke="#7c6660" strokeWidth="1.5" />
            <rect x={250 - hemWidth - 95} y={50 + (armholeY - 50) / 2 - 11} width="85" height="22" rx="6" fill="#f8ecdf" stroke="#7c6660" strokeWidth="1" />
            <text x={250 - hemWidth - 52} y={50 + (armholeY - 50) / 2 + 4} textAnchor="middle" fill="#1b1712" fontSize="10" fontWeight="bold">
              진동 {calc.armholeDepthCm}cm ({calc.armholeRows}단)
            </text>
          </g>
        </svg>
      </div>

      {/* Pattern Snapping Notice Banner */}
      <div className="mt-4 p-3 bg-primary/5 rounded-2xl border border-primary/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span>
          <span className="font-bold text-on-surface">
            {calc.patternName} 배수 스냅:
          </span>
          <span className="text-on-surface-variant font-medium">
            앞·뒤판 각 <strong className="text-primary font-bold">{calc.halfBodySts}코</strong> ({calc.halfBodySts / calc.patternMultiple}세트 완벽 대칭)
          </span>
        </div>
        {calc.diffSts !== 0 && (
          <span className="text-[11px] font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
            무늬 균형을 위해 {calc.diffSts > 0 ? `+${calc.diffSts}코` : `${calc.diffSts}코`} 자동 조율됨
          </span>
        )}
      </div>
    </div>
  );
}

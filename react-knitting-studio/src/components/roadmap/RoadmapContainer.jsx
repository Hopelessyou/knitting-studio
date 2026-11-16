import React from 'react';

export default function RoadmapContainer({ title, badge, children }) {
  return (
    <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-on-surface/[0.08] shadow-sm mb-12">
      <div className="mb-6 pb-4 border-b border-on-surface/[0.06] flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-secondary uppercase tracking-wider block mb-1">
            PRACTICAL ROADMAP
          </span>
          <h2 className="text-xl font-bold font-serif text-on-surface">{title}</h2>
        </div>
        {badge && (
          <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      <div className="space-y-6">
        {children}
      </div>
    </section>
  );
}

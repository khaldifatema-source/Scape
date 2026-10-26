import React from 'react';
import { Lock, Unlock, CheckCircle2, ChevronLeft } from 'lucide-react';
import { GameProgress } from '../types/game';

interface LockProgressBarProps {
  progress: GameProgress;
  activeTab: 1 | 2 | 3 | 4;
  onSelectTab: (lockNum: 1 | 2 | 3 | 4) => void;
}

export const LockProgressBar: React.FC<LockProgressBarProps> = ({
  progress,
  activeTab,
  onSelectTab,
}) => {
  const locks = [
    {
      num: 1 as const,
      name: 'سر البيانات',
      subtitle: 'جودة البيانات وتمثيلها',
      isSolved: progress.lock1Solved,
      isAccessible: true,
    },
    {
      num: 2 as const,
      name: 'شفرة الآلة',
      subtitle: 'ترتيب مراحل تعلم الآلة',
      isSolved: progress.lock2Solved,
      isAccessible: progress.lock1Solved,
    },
    {
      num: 3 as const,
      name: 'اختبار الذكاء',
      subtitle: 'تقييم دقة النموذج',
      isSolved: progress.lock3Solved,
      isAccessible: progress.lock1Solved && progress.lock2Solved,
    },
    {
      num: 4 as const,
      name: 'تطبيقات تعلم الآلة',
      subtitle: 'النماذج في الحياة الواقعية',
      isSolved: progress.lock4Solved,
      isAccessible: progress.lock1Solved && progress.lock2Solved && progress.lock3Solved,
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto mb-8 px-4">
      <div className="bg-[#0b1328]/80 border border-cyan-950/80 rounded-2xl p-3 sm:p-4 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">خريطة أقفال المختبر الذكي</span>
            <span aria-hidden="true">·</span>
            <span>فكّي الشفرات الأربعة بالتسلسل لفتح الباب الرئيسي</span>
          </div>
          <span className="font-mono text-cyan-300">
            {progress.currentLock === 'completed'
              ? 'تم فك جميع الأقفال الأربعة'
              : `القفل النشط: ${activeTab} من 4`}
          </span>
        </div>

        {/* Lock Cards Grid - 4 columns on large, 2 on tablet/mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {locks.map((lock) => {
            const isActive = activeTab === lock.num;
            const isSolved = lock.isSolved;
            const isLocked = !lock.isAccessible;

            return (
              <button
                key={lock.num}
                type="button"
                disabled={isLocked}
                onClick={() => onSelectTab(lock.num)}
                className={`group relative text-right p-3 rounded-xl border transition-all duration-200 flex items-center justify-between gap-2.5 ${
                  isSolved
                    ? isActive
                      ? 'bg-emerald-950/40 border-emerald-500/70 shadow-sm shadow-emerald-900/30 ring-1 ring-emerald-500/30'
                      : 'bg-emerald-950/20 border-emerald-800/40 hover:border-emerald-600/50'
                    : isActive
                    ? 'bg-cyan-950/50 border-cyan-400/80 shadow-md shadow-cyan-950/50 ring-1 ring-cyan-400/40'
                    : isLocked
                    ? 'bg-slate-900/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                    : 'bg-slate-900/70 border-slate-700/60 hover:border-slate-500'
                }`}
              >
                {/* Status Icon */}
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 border transition-transform duration-200 group-hover:scale-105 ${
                    isSolved
                      ? 'bg-emerald-900/40 border-emerald-500/50 text-emerald-400'
                      : isActive
                      ? 'bg-cyan-900/50 border-cyan-400 text-cyan-300 animate-pulse'
                      : isLocked
                      ? 'bg-slate-800/50 border-slate-700 text-slate-500'
                      : 'bg-slate-800 border-slate-600 text-slate-300'
                  }`}
                >
                  {isSolved ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isActive ? (
                    <Unlock className="w-4 h-4 text-cyan-400" />
                  ) : (
                    <Lock className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-mono text-cyan-400 font-bold">
                      0{lock.num}
                    </span>
                    <h3
                      className={`font-bold text-xs sm:text-sm truncate ${
                        isSolved
                          ? 'text-emerald-300'
                          : isActive
                          ? 'text-white'
                          : 'text-slate-300'
                      }`}
                    >
                      {lock.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {isSolved
                      ? 'تم الفك ✓'
                      : isLocked
                      ? 'مغلق'
                      : lock.subtitle}
                  </p>
                </div>

                {/* Arrow indicator */}
                {!isLocked && (
                  <ChevronLeft
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isActive ? 'text-cyan-400 translate-x-[-2px]' : 'text-slate-600'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

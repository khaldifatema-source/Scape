import React from 'react';
import { Volume2, VolumeX, Settings, RotateCcw, Clock, ShieldCheck, Cpu } from 'lucide-react';
import { GameProgress, GameSettings } from '../types/game';

interface HeaderProps {
  progress: GameProgress;
  settings: GameSettings;
  onToggleSound: () => void;
  onOpenSettings: () => void;
  onResetGame: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  progress,
  settings,
  onToggleSound,
  onOpenSettings,
  onResetGame,
}) => {
  // Format elapsed or remaining time
  const formatTime = () => {
    let displaySec = progress.elapsedSeconds;
    if (settings.timerMode === 'countdown') {
      displaySec = Math.max(0, settings.countdownDurationSeconds - progress.elapsedSeconds);
    }
    const mins = Math.floor(displaySec / 60);
    const secs = displaySec % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const solvedCount =
    (progress.lock1Solved ? 1 : 0) +
    (progress.lock2Solved ? 1 : 0) +
    (progress.lock3Solved ? 1 : 0) +
    (progress.lock4Solved ? 1 : 0);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cyan-950/50 bg-[#060a17]/90 backdrop-blur-md px-4 sm:px-6 py-3 transition-colors no-print">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm shadow-cyan-950">
            <Cpu className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
              الهروب من مختبر الذكاء الاصطناعي
            </span>
            <span className="text-[11px] text-cyan-400/80 hidden sm:inline whitespace-nowrap">
              مادة التقنية الرقمية · المرحلة الثانوية
            </span>
          </div>
        </div>

        {/* Zone 2: Game telemetry info (unboxed, clean tabular numbers) */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300">
          {/* Locks Progress */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400 hidden md:inline">الأقفال:</span>
            <span className="font-mono tabular-nums text-cyan-300 font-semibold">{solvedCount} / 4</span>
          </div>

          <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>

          {/* Points */}
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <span className="text-slate-400 hidden md:inline">النقاط:</span>
            <span className="font-mono tabular-nums text-emerald-400 font-semibold">{progress.score} / 4</span>
          </div>

          {settings.timerMode !== 'off' && (
            <>
              <span className="text-slate-700 hidden sm:inline" aria-hidden="true">·</span>
              {/* Timer */}
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="font-mono tabular-nums text-purple-300 font-semibold tracking-wider">
                  {formatTime()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Zone 3: Functional tool actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={settings.soundEnabled ? 'كتم المؤثرات الصوتية' : 'تفعيل المؤثرات الصوتية'}
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="تبديل الصوت"
          >
            {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Teacher Settings */}
          <button
            onClick={onOpenSettings}
            title="لوحة إعدادات المعلمة"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/40 border border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
            aria-label="لوحة تحكم المعلمة"
          >
            <Settings className="w-4 h-4" />
          </button>

          {/* Restart */}
          <button
            onClick={onResetGame}
            title="إعادة تشغيل المهمة"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>البداية</span>
          </button>
        </div>
      </div>
    </header>
  );
};

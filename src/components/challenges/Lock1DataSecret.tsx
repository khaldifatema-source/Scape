import React, { useState } from 'react';
import { Database, CheckCircle2, AlertCircle, ArrowLeft, RotateCcw, Lightbulb, ShieldAlert, Sparkles } from 'lucide-react';
import { QuestionChallenge } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface Lock1DataSecretProps {
  challenge: QuestionChallenge;
  isAlreadySolved: boolean;
  onSuccess: () => void;
  onNextLock: () => void;
}

export const Lock1DataSecret: React.FC<Lock1DataSecretProps> = ({
  challenge,
  isAlreadySolved,
  onSuccess,
  onNextLock,
}) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(isAlreadySolved);
  const [isCorrect, setIsCorrect] = useState<boolean>(isAlreadySolved);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleSelect = (optionId: string) => {
    if (isCorrect) return;
    soundManager.playClick();
    setSelectedOptionId(optionId);
    setShowHint(false);
  };

  const handleSubmit = () => {
    if (!selectedOptionId || isCorrect) return;

    if (selectedOptionId === challenge.correctOptionId) {
      setIsCorrect(true);
      setIsAnswered(true);
      setShowHint(false);
      soundManager.playUnlock();
      onSuccess();
    } else {
      setIsCorrect(false);
      setIsAnswered(true);
      setShowHint(true);
      soundManager.playHintNotice();
    }
  };

  const handleRetry = () => {
    setSelectedOptionId(null);
    setIsAnswered(false);
    setShowHint(false);
    soundManager.playClick();
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal Container */}
      <div className="bg-[#091024]/90 border border-cyan-900/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Top Header Badge */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-cyan-400 font-bold">القفل الأول</span>
                <span className="text-slate-600">·</span>
                <h2 className="text-lg font-bold text-white">{challenge.title}</h2>
              </div>
              <p className="text-xs text-slate-400">تحليل جودة وملاءمة بيانات التدريب</p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800/40 text-cyan-300">
            {isCorrect ? 'تم فك التشفير ✓' : 'نظام مغلق 🔒'}
          </div>
        </div>

        {/* Visual Lab Scenario Card */}
        <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-[#060a17]/90 border border-cyan-950 relative">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-800/50 flex items-center justify-center text-cyan-300 shrink-0 mt-0.5">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div className="space-y-3 flex-1">
              <span className="text-xs font-semibold text-cyan-400 tracking-wide">
                الموقف الأمني في نظام الذكاء الاصطناعي:
              </span>
              <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                «{challenge.scenario}»
              </p>
            </div>
          </div>

          {/* Interactive mini visual metaphor */}
          <div className="mt-4 pt-4 border-t border-cyan-950/70 grid grid-cols-2 gap-3 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-[#0a1428] border border-cyan-900/40">
              <span className="text-slate-400 block text-[11px] mb-1">بيانات التدريب السابقة</span>
              <span className="text-amber-300 font-medium">🌸 صور زهور فقط (Flowers)</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#0a1428] border border-cyan-900/40">
              <span className="text-slate-400 block text-[11px] mb-1">المهمة المطلوبة حاليًا</span>
              <span className="text-rose-300 font-medium">🌲 التعرّف على أشجار (Trees)</span>
            </div>
          </div>
        </div>

        {/* Options List */}
        <div className="space-y-3 mb-6">
          <p className="text-sm font-bold text-slate-300 mb-2">
            اختاري التفسير العلمي الدقيق للمشكلة الأساسية:
          </p>

          {challenge.options.map((option) => {
            const isSelected = selectedOptionId === option.id;
            const isRight = isAnswered && option.id === challenge.correctOptionId;
            const isWrong = isAnswered && isSelected && option.id !== challenge.correctOptionId;

            return (
              <button
                key={option.id}
                type="button"
                disabled={isCorrect}
                onClick={() => handleSelect(option.id)}
                className={`w-full text-right p-4 rounded-2xl border text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-between gap-4 cursor-pointer ${
                  isRight
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-100 ring-2 ring-emerald-500/30'
                    : isWrong
                    ? 'bg-rose-950/50 border-rose-500 text-rose-200'
                    : isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 text-white ring-2 ring-cyan-400/30'
                    : 'bg-[#060a17]/70 border-slate-800 text-slate-200 hover:border-cyan-700/60 hover:bg-[#0a1126]'
                }`}
              >
                <span className="flex-1 leading-relaxed">{option.text}</span>

                <div
                  className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 ${
                    isRight
                      ? 'border-emerald-400 bg-emerald-500/20 text-emerald-400'
                      : isWrong
                      ? 'border-rose-400 bg-rose-500/20 text-rose-400'
                      : isSelected
                      ? 'border-cyan-400 bg-cyan-500/20 text-cyan-400'
                      : 'border-slate-600 bg-slate-900/40 text-transparent'
                  }`}
                >
                  {isRight ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isWrong ? (
                    <AlertCircle className="w-4 h-4" />
                  ) : (
                    isSelected && <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback / Hint Section */}
        {showHint && !isCorrect && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3 animate-fade-in">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-300">محاولة غير دقيقة، لكن لا بأس!</h4>
              <p className="text-sm leading-relaxed">{challenge.hintMessage}</p>
            </div>
          </div>
        )}

        {isCorrect && (
          <div className="mb-6 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-100 flex items-start gap-3.5 animate-fade-in">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-emerald-300">{challenge.successMessage}</h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed">{challenge.educationalNote}</p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {!isCorrect ? (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleSubmit}
                disabled={!selectedOptionId}
                className={`flex-1 sm:flex-none px-6 py-3.5 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                  selectedOptionId
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                }`}
              >
                <span>تأكيد الإجابة وفك القفل</span>
              </button>

              {isAnswered && !isCorrect && (
                <button
                  onClick={handleRetry}
                  className="px-4 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>إعادة المحاولة</span>
                </button>
              )}
            </div>
          ) : (
            <button
              onClick={onNextLock}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>الانتقال إلى القفل الثاني: شفرة الآلة</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <div className="text-xs text-slate-400 hidden sm:block">
            <span>التقييم: 1 نقطة عند فك القفل</span>
          </div>
        </div>
      </div>
    </div>
  );
};

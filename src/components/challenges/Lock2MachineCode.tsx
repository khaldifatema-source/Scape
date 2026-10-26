import React, { useState, useEffect } from 'react';
import { Layers, ArrowUp, ArrowDown, CheckCircle2, RotateCcw, Lightbulb, Sparkles, ArrowLeft, ArrowDownUp } from 'lucide-react';
import { MLStage } from '../../types/game';
import { soundManager } from '../../utils/audio';

interface Lock2MachineCodeProps {
  stages: MLStage[];
  isAlreadySolved: boolean;
  onSuccess: () => void;
  onNextLock: () => void;
}

export const Lock2MachineCode: React.FC<Lock2MachineCodeProps> = ({
  stages,
  isAlreadySolved,
  onSuccess,
  onNextLock,
}) => {
  // Scramble the stages initially so the student actually has to solve it
  const [currentOrder, setCurrentOrder] = useState<MLStage[]>(() => {
    if (isAlreadySolved) {
      return [...stages].sort((a, b) => a.correctIndex - b.correctIndex);
    }
    // Deterministic shuffle that is definitely not in correct order
    const copy = [...stages];
    if (copy.length >= 4) {
      return [copy[2], copy[0], copy[3], copy[1]];
    }
    return copy.reverse();
  });

  const [isAnswered, setIsAnswered] = useState<boolean>(isAlreadySolved);
  const [isCorrect, setIsCorrect] = useState<boolean>(isAlreadySolved);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Sync if stages changed in settings
  useEffect(() => {
    if (isAlreadySolved) {
      setCurrentOrder([...stages].sort((a, b) => a.correctIndex - b.correctIndex));
    }
  }, [stages, isAlreadySolved]);

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if (isCorrect) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentOrder.length) return;

    soundManager.playClick();
    const newItems = [...currentOrder];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;

    setCurrentOrder(newItems);
    setShowHint(false);
  };

  const handleVerify = () => {
    if (isCorrect) return;

    // Check if every stage is at its correct index
    const isAllCorrect = currentOrder.every((item, idx) => item.correctIndex === idx);

    if (isAllCorrect) {
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

  const handleResetOrder = () => {
    soundManager.playClick();
    const copy = [...stages];
    if (copy.length >= 4) {
      setCurrentOrder([copy[1], copy[3], copy[0], copy[2]]);
    } else {
      setCurrentOrder(copy.reverse());
    }
    setIsAnswered(false);
    setShowHint(false);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Terminal Container */}
      <div className="bg-[#091024]/90 border border-cyan-900/60 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-cyan-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-purple-400 font-bold">القفل الثاني</span>
                <span className="text-slate-600">·</span>
                <h2 className="text-lg font-bold text-white">شفرة الآلة</h2>
              </div>
              <p className="text-xs text-slate-400">ترتيب تسلسل دورة حياة نموذج تعلم الآلة</p>
            </div>
          </div>

          <div className="text-xs font-mono px-3 py-1 rounded-full bg-purple-950/50 border border-purple-800/40 text-purple-300">
            {isCorrect ? 'فُكّت الشفرة ✓' : 'نظام مغلق 🔒'}
          </div>
        </div>

        {/* Task Explanation */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-[#060a17]/90 border border-purple-950/70">
          <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
            «رتّبي مراحل تعلم الآلة وفقًا للتسلسل العلمي المعتمد في الدرس لتوليد شفرة التشغيل وإلغاء القفل الثاني.»
          </p>
          <p className="text-xs text-cyan-400/90 mt-2 flex items-center gap-1.5">
            <ArrowDownUp className="w-3.5 h-3.5" />
            <span>استخدمي أزرار الصعود والنزول (▲ ▼) لتعديل الترتيب من المرحلة الأولى إلى الأخيرة.</span>
          </p>
        </div>

        {/* Re-orderable Stages List */}
        <div className="space-y-3 mb-6">
          {currentOrder.map((stage, index) => {
            const stepNum = index + 1;
            const isMatch = isAnswered && stage.correctIndex === index;

            return (
              <div
                key={stage.id}
                className={`p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isCorrect
                    ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-100'
                    : isMatch
                    ? 'bg-cyan-950/40 border-cyan-500/50 text-slate-100'
                    : 'bg-[#060a17]/70 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                {/* Step Index Badge */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-8 h-8 rounded-xl font-mono text-sm font-bold flex items-center justify-center shrink-0 border ${
                      isCorrect
                        ? 'bg-emerald-900/60 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-700 text-cyan-400'
                    }`}
                  >
                    {stepNum}
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-sm sm:text-base text-white tracking-wide truncate">
                      {stage.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                      {stage.description}
                    </p>
                  </div>
                </div>

                {/* Tactile Control Buttons (Great for iPad touch targets!) */}
                {!isCorrect && (
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveItem(index, 'up')}
                      aria-label="تحريك لأعلى"
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      disabled={index === currentOrder.length - 1}
                      onClick={() => moveItem(index, 'down')}
                      aria-label="تحريك لأسفل"
                      className="p-2 sm:p-2.5 rounded-xl bg-slate-800/80 hover:bg-cyan-950 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-600 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {isCorrect && (
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback / Hint Section */}
        {showHint && !isCorrect && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 flex items-start gap-3 animate-fade-in">
            <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-amber-300">ترتيب غير مكتمل، تلميح تعليمي:</h4>
              <p className="text-sm leading-relaxed">
                هل يمكن تدريب النموذج قبل تجهيز وتنظيف البيانات؟ تذكّري دائمًا أننا نبدأ بجمع البيانات الخام، ثم معالجتها وتنقيتها، ثم تدريب الخوارزمية، وأخيرًا اختبار الدقة وتقييم النموذج!
              </p>
            </div>
          </div>
        )}

        {isCorrect && (
          <div className="mb-6 p-5 rounded-2xl bg-emerald-950/50 border border-emerald-500/50 text-emerald-100 flex items-start gap-3.5 animate-fade-in">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <h4 className="text-sm font-bold text-emerald-300">رائع! فككتِ شفرة الآلة، فُتح القفل الثاني.</h4>
              <p className="text-xs text-emerald-200/90 leading-relaxed">
                التسلسل المنطقي يبدأ بـ «جمع البيانات»، يليه «معالجة البيانات وتجهيزها»، ثم «تدريب النموذج»، وينتهي بـ «تقييم النموذج».
              </p>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          {!isCorrect ? (
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handleVerify}
                className="flex-1 sm:flex-none px-6 py-3.5 rounded-xl font-bold text-sm bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-lg shadow-purple-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>تحقق من الشفرة وفك القفل</span>
              </button>

              <button
                onClick={handleResetOrder}
                title="إعادة الترتيب عشوائيًا"
                className="px-4 py-3.5 rounded-xl font-medium text-sm text-slate-300 hover:text-white bg-slate-900 border border-slate-700/80 hover:bg-slate-800 transition-colors flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="hidden sm:inline">إعادة ضبط</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onNextLock}
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-500 to-purple-500 hover:from-emerald-400 hover:to-purple-400 text-slate-950 font-black text-sm sm:text-base rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>الانتقال إلى القفل الثالث: اختبار الذكاء</span>
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

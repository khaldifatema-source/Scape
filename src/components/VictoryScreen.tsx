import React, { useEffect, useState } from 'react';
import { Award, RotateCcw, CheckCircle2, FileText, Share2, Sparkles, Clock, Check } from 'lucide-react';
import { GameProgress } from '../types/game';
import { soundManager } from '../utils/audio';
import { fireVictoryConfetti } from '../utils/confetti';

interface VictoryScreenProps {
  progress: GameProgress;
  onRestart: () => void;
  onOpenCertificate: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  progress,
  onRestart,
  onOpenCertificate,
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Play celebratory sound and fire cyber confetti
    soundManager.playDoorOpening();
    fireVictoryConfetti();

    // Secondary burst for extra classroom excitement
    const timer = setTimeout(() => {
      fireVictoryConfetti();
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const formatElapsed = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const secs = sec % 60;
    return `${mins} دقيقة و ${secs} ثانية`;
  };

  const handleShare = () => {
    const text = `🎉 أنجزتُ مهمة «الهروب من مختبر الذكاء الاصطناعي» بنجاح وحققتُ 4/4 نقاط في نشاط التقويم الختامي لمادة التقنية الرقمية! 🚀`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-8 animate-fade-in">
      {/* Hero Blast Door Opening Showcase */}
      <div className="relative rounded-3xl overflow-hidden border-2 border-cyan-400/60 bg-[#091024]/90 shadow-2xl shadow-cyan-500/20 mb-8 backdrop-blur-md">
        {/* Futuristic Opened Blast Door Image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src="/src/assets/images/lab_doors_unlocking_1793034239935.jpg"
            alt="فتح أبواب مختبر الذكاء الاصطناعي بنجاح"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.9] contrast-[1.15]"
          />
          {/* Subtle luminous cyan and dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091024] via-[#091024]/40 to-transparent" />

          {/* Success Status Badge */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-emerald-950/90 border border-emerald-400 text-emerald-300 px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-md">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>نظام الأمان: تم فك الأقفال الأربعة وفتح البوابة</span>
          </div>
        </div>

        {/* Victory Congratulations Content */}
        <div className="relative px-6 sm:px-10 pb-8 sm:pb-10 pt-2 text-center">
          <div className="inline-flex items-center gap-2 text-cyan-300 text-sm font-semibold bg-cyan-950/70 border border-cyan-700/50 px-4 py-1 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>تم إنجاز المهمة بنجاح باهر</span>
          </div>

          {/* Mandatory Prompt Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-lg">
            تم فتح المختبر بنجاح!
          </h1>

          {/* Mandatory Congratulatory Text */}
          <p className="text-base sm:text-xl text-cyan-200 max-w-2xl mx-auto font-medium leading-relaxed mb-6">
            تهانينا لخبيرات الذكاء الاصطناعي؛ لقد نجحتن في تحليل البيانات، وفهم تدريب الآلة، وتقييم النماذج، واستيعاب تطبيقاتها في الحياة اليومية.
          </p>

          {/* Mandatory Closing Quote */}
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-[#050816]/80 border border-cyan-900/60 mb-8">
            <p className="text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-teal-200 to-emerald-300">
              «بالعلم والتفكير الناقد، نصنع مستقبلًا ذكيًا.»
            </p>
          </div>

          {/* Final Results Statistics Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-8 text-right">
            {/* Score */}
            <div className="p-4 rounded-2xl bg-[#060a18] border border-emerald-900/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">النتيجة النهائية</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  {progress.score} / 4 نقاط
                </span>
                <span className="text-[10px] text-emerald-300 block">نسبة الإتقان 100%</span>
              </div>
            </div>

            {/* Time */}
            <div className="p-4 rounded-2xl bg-[#060a18] border border-purple-900/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/50 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">الوقت المستغرق</span>
                <span className="text-sm font-bold text-purple-300 block mt-0.5">
                  {formatElapsed(progress.elapsedSeconds)}
                </span>
                <span className="text-[10px] text-purple-400/80 block">ضمن المدة القياسية</span>
              </div>
            </div>

            {/* Title / Badge */}
            <div className="p-4 rounded-2xl bg-[#060a18] border border-cyan-900/50 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block">اللقب المستحق</span>
                <span className="text-sm font-bold text-cyan-300 block mt-0.5">
                  خبيرة ذكاء اصطناعي
                </span>
                <span className="text-[10px] text-cyan-400/80 block">معتمدة للمهمة</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            {/* Restart Button (Mandatory) */}
            <button
              onClick={() => {
                soundManager.playClick();
                onRestart();
              }}
              className="px-7 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>إعادة التجربة</span>
            </button>

            {/* Certificate of Achievement Modal */}
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenCertificate();
              }}
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-purple-900/60 hover:bg-purple-800 text-purple-100 border border-purple-500/50 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-purple-300" />
              <span>عرض شهادة الإنجاز</span>
            </button>

            {/* Share Success */}
            <button
              onClick={handleShare}
              className="px-5 py-3.5 rounded-xl font-medium text-sm bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 transition-colors flex items-center gap-2 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copied ? 'تم نسخ التهنئة!' : 'مشاركة الإنجاز'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Applied Lesson Summary Review (خلاصة الدرس التطبيقي) */}
      <div className="bg-[#091024]/70 border border-cyan-950/80 rounded-2xl p-6 backdrop-blur-md">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>المفاهيم المحققة في نشاط التقويم الختامي:</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-right">
          <div className="p-3.5 rounded-xl bg-[#060a17]/80 border border-cyan-950">
            <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">01. جودة البيانات</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              النموذج يحتاج لبيانات شاملة وممثلة للمهمة؛ فتدريبه على الزهور لا يمنحه القدرة على التعرف على الأشجار.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#060a17]/80 border border-purple-950">
            <span className="text-xs font-mono text-purple-400 font-bold block mb-1">02. مراحل تعلم الآلة</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              تسلسل علمي محكم: جمع البيانات ➔ معالجة البيانات وتجهيزها ➔ تدريب النموذج ➔ تقييم أداء النموذج.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#060a17]/80 border border-emerald-950">
            <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">03. التقييم والتعميم</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              النجاح الحقيقي لنموذج الذكاء الاصطناعي يقاس ببيانات اختبار جديدة مستقلة لم يرها أثناء التدريب.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#060a17]/80 border border-cyan-500/40">
            <span className="text-xs font-mono text-cyan-300 font-bold block mb-1">04. تطبيقات تعلم الآلة</span>
            <p className="text-xs text-slate-300 leading-relaxed">
              تطبيقات واقعية: الترجمة الآلية، التعلم المخصص، التعرف على الكلام، والتعرف على الصور (مثل النظارات الناطقة).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

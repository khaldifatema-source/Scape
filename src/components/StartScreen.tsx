import React from 'react';
import { Play, ShieldAlert, Cpu, Sparkles, BookOpen, Target, Clock, Award } from 'lucide-react';
import { soundManager } from '../utils/audio';
import heroLabImage from '../assets/images/hero_ai_lab_futuristic_1793034238191.jpg';

interface StartScreenProps {
  onStart: () => void;
  onOpenSettings: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart, onOpenSettings }) => {
  const handleStart = () => {
    soundManager.playClick();
    onStart();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 md:py-10 animate-fade-in">
      {/* Top Context Indicator */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 text-xs text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 rounded-full px-4 py-1.5 backdrop-blur-md">
          <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
          <span>مادة التقنية الرقمية</span>
          <span aria-hidden="true">·</span>
          <span>المرحلة الثانوية</span>
          <span aria-hidden="true">·</span>
          <span>نشاط التقويم الختامي</span>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-900/60 bg-[#091024]/90 shadow-2xl shadow-cyan-950/80 mb-8 backdrop-blur-md">
        {/* Futuristic Lab Background Image */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          <img
            src={heroLabImage}
            alt="مختبر الذكاء الاصطناعي المستقبلي"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.75] contrast-[1.1] scale-105 hover:scale-100 transition-transform duration-700"
          />
          {/* Measured gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#091024] via-[#091024]/60 to-transparent" />

          {/* Warning Banner Overlay */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 bg-rose-950/80 border border-rose-500/40 text-rose-300 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm backdrop-blur-md shadow-lg">
            <ShieldAlert className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="font-semibold">حالة الطوارئ: نظام الحماية نشط</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="relative px-6 sm:px-10 pb-8 sm:pb-10 pt-2 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            الهروب من مختبر الذكاء الاصطناعي
          </h1>

          <p className="text-base sm:text-xl text-cyan-200 max-w-2xl mx-auto font-medium leading-relaxed mb-8">
            تم إغلاق المختبر! هل تمتلكين المهارة الكافية لفك الشفرات وإعادة تشغيل النظام؟
          </p>

          {/* Mission Guidelines Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-2xl mx-auto mb-8 text-right">
            <div className="bg-[#050917]/80 border border-cyan-950 p-3.5 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-800/60 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                <Target className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">4 أقفال أمنية</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">تحديات متتابعة: سر البيانات، شفرة الآلة، اختبار الذكاء، وتطبيقات تعلم الآلة.</p>
              </div>
            </div>

            <div className="bg-[#050917]/80 border border-cyan-950 p-3.5 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950 border border-purple-800/60 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">3 - 5 دقائق</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">تجربة مكثفة وممتعة لقياس الفهم العميق لمهارات الدرس.</p>
              </div>
            </div>

            <div className="bg-[#050917]/80 border border-cyan-950 p-3.5 rounded-xl flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800/60 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">وسام خبيرة AI</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">شهادة اجتياز وفتح البوابة الرئيسية مع تسجيل النقاط.</p>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleStart}
              className="w-full sm:w-auto min-w-[260px] px-8 py-4 bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-400 hover:to-cyan-300 text-slate-950 font-black text-lg sm:text-xl rounded-2xl shadow-xl shadow-cyan-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 cursor-pointer"
            >
              <Play className="w-6 h-6 fill-current" />
              <span>ابدئي المهمة</span>
            </button>

            <button
              onClick={onOpenSettings}
              className="w-full sm:w-auto px-6 py-4 bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 font-medium text-sm rounded-2xl transition-colors flex items-center justify-center gap-2"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>إعدادات وتخصيص الدرس</span>
            </button>
          </div>
        </div>
      </div>

      {/* Roleplay Prompt Footer Note */}
      <div className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>أنتِ الآن خبيرة الذكاء الاصطناعي المسؤولة عن إعادة الاستقرار للمختبر وإلغاء نظام الإغلاق التلقائي.</span>
      </div>
    </div>
  );
};

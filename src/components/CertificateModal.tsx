import React, { useState } from 'react';
import { X, Printer, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface CertificateModalProps {
  score: number;
  elapsedSeconds: number;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  score,
  elapsedSeconds,
  onClose,
}) => {
  const [studentName, setStudentName] = useState<string>('طالبة متميزة');

  const handlePrint = () => {
    soundManager.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#091024] border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors no-print"
          aria-label="إغلاق"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Input for Student Name (Non-print) */}
        <div className="mb-6 p-4 rounded-2xl bg-[#060a18] border border-cyan-950 no-print">
          <label className="block text-xs font-semibold text-cyan-400 mb-2">
            اسم الطالبة / المجموعة (اختياري للعرض والطباعة):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="اكتبي اسم الطالبة أو المجموعة هنا..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الشهادة</span>
            </button>
          </div>
        </div>

        {/* The Printable Certificate Design */}
        <div className="border-4 border-double border-cyan-500/60 rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-[#070d1e] to-[#040711] text-center relative overflow-hidden shadow-inner">
          {/* Subtle watermark / corner ornaments */}
          <div className="absolute top-2 right-2 w-12 h-12 border-t-2 border-r-2 border-cyan-400/40" />
          <div className="absolute top-2 left-2 w-12 h-12 border-t-2 border-l-2 border-cyan-400/40" />
          <div className="absolute bottom-2 right-2 w-12 h-12 border-b-2 border-r-2 border-cyan-400/40" />
          <div className="absolute bottom-2 left-2 w-12 h-12 border-b-2 border-l-2 border-cyan-400/40" />

          {/* Ministry Context */}
          <div className="flex items-center justify-between text-xs text-slate-400 mb-4 px-2 border-b border-cyan-950 pb-3">
            <span>المملكة العربية السعودية · وزارة التعليم</span>
            <span>مادة التقنية الرقمية · المرحلة الثانوية</span>
          </div>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300 shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-wide mb-1">
            شهادة اجتياز مهمة الذكاء الاصطناعي
          </h2>
          <p className="text-xs text-cyan-300 font-semibold mb-6">
            نشاط التقويم الختامي: الهروب من مختبر الذكاء الاصطناعي
          </p>

          <p className="text-sm text-slate-300 mb-2">يشهد مختبر التقنية الرقمية بأن الطالبة المبدعة:</p>

          <div className="my-3 py-2 px-6 inline-block bg-cyan-950/40 border-b-2 border-cyan-400 rounded-lg">
            <span className="text-xl sm:text-2xl font-black text-cyan-200">
              {studentName || 'طالبة متميزة'}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed my-4">
            قد أتمت بنجاح فك جميع الشفرات الأمنية الأربعة، وتفوقت في تحليل جودة البيانات، وإتقان مراحل تعلم الآلة، ومعايير تقييم النماذج، واستيعاب تطبيقات تعلم الآلة الواقعية بكفاءة عالية.
          </p>

          {/* Certificate Metrics */}
          <div className="flex items-center justify-center gap-6 my-6 text-xs border-y border-cyan-950 py-3">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>الدرجة: {score} من 4 (100%)</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="text-purple-300 font-medium">
              <span>الوقت: {minutes} د {seconds} ث</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="text-cyan-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>التقدير: ممتاز مرتفع</span>
            </div>
          </div>

          {/* Signatures & Date */}
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mt-6 pt-2">
            <div>
              <span className="block mb-1 text-slate-400">تاريخ الإنجاز</span>
              <span className="font-semibold text-slate-200">{currentDate}</span>
            </div>
            <div>
              <span className="block mb-1 text-slate-400">معلمة المادة</span>
              <span className="font-semibold text-slate-200">معلمة التقنية الرقمية</span>
            </div>
          </div>

          <p className="text-[11px] text-cyan-400/80 italic mt-6">
            «بالعلم والتفكير الناقد، نصنع مستقبلًا ذكيًا.»
          </p>
        </div>
      </div>
    </div>
  );
};

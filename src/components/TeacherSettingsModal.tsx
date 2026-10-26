import React, { useState } from 'react';
import { X, Save, RotateCcw, Volume2, Clock, BookOpen, Check } from 'lucide-react';
import { MLStage, QuestionChallenge, GameSettings } from '../types/game';
import { soundManager } from '../utils/audio';

interface TeacherSettingsModalProps {
  stages: MLStage[];
  challenge1: QuestionChallenge;
  challenge3: QuestionChallenge;
  challenge4: QuestionChallenge;
  settings: GameSettings;
  onSave: (
    newStages: MLStage[],
    newC1: QuestionChallenge,
    newC3: QuestionChallenge,
    newC4: QuestionChallenge,
    newSettings: GameSettings
  ) => void;
  onResetDefaults: () => void;
  onClose: () => void;
}

export const TeacherSettingsModal: React.FC<TeacherSettingsModalProps> = ({
  stages,
  challenge1,
  challenge3,
  challenge4,
  settings,
  onSave,
  onResetDefaults,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'stages' | 'questions' | 'settings'>('stages');
  const [localStages, setLocalStages] = useState<MLStage[]>(JSON.parse(JSON.stringify(stages)));
  const [localC1, setLocalC1] = useState<QuestionChallenge>(JSON.parse(JSON.stringify(challenge1)));
  const [localC3, setLocalC3] = useState<QuestionChallenge>(JSON.parse(JSON.stringify(challenge3)));
  const [localC4, setLocalC4] = useState<QuestionChallenge>(JSON.parse(JSON.stringify(challenge4)));
  const [localSettings, setLocalSettings] = useState<GameSettings>({ ...settings });
  const [savedNotice, setSavedNotice] = useState(false);

  const handleStageNameChange = (id: string, newName: string) => {
    setLocalStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, name: newName } : s))
    );
  };

  const handleStageDescChange = (id: string, newDesc: string) => {
    setLocalStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, description: newDesc } : s))
    );
  };

  const handleSave = () => {
    soundManager.playClick();
    onSave(localStages, localC1, localC3, localC4, localSettings);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleTestAudio = () => {
    soundManager.playUnlock();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-[#091024] border border-cyan-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-cyan-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-600/40 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">لوحة إعدادات وتخصيص الدرس للمعلمة</h2>
              <p className="text-xs text-slate-400">تعديل مسميات المراحل، نصوص التحديات، وخيارات العرض</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 p-1.5 bg-[#060a17] rounded-xl mb-4 shrink-0">
          <button
            onClick={() => setActiveTab('stages')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'stages'
                ? 'bg-purple-900/60 text-purple-200 border border-purple-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            مراحل تعلم الآلة (القفل 2)
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'questions'
                ? 'bg-cyan-900/60 text-cyan-200 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            الأسئلة والمواقف (1 و 3 و 4)
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors ${
              activeTab === 'settings'
                ? 'bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            الوقت والمؤثرات
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-sm">
          {/* TAB 1: STAGES */}
          {activeTab === 'stages' && (
            <div className="space-y-4">
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/40 rounded-xl text-xs text-cyan-200">
                يمكنكِ تعديل مسميات ووصف مراحل تعلم الآلة الأربعة لتطابق تمامًا النسخة المعتمدة في كتاب التقنية الرقمية لديكِ.
              </div>

              {localStages.map((stage, idx) => (
                <div key={stage.id} className="p-4 rounded-xl bg-[#060a17] border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>المرحلة رقم {idx + 1} (الترتيب الصحيح)</span>
                    <span className="font-mono text-cyan-400">ID: {stage.id}</span>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">اسم المرحلة:</label>
                    <input
                      type="text"
                      value={stage.name}
                      onChange={(e) => handleStageNameChange(stage.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 block mb-1">الوصف التعليمي المختصر:</label>
                    <input
                      type="text"
                      value={stage.description}
                      onChange={(e) => handleStageDescChange(stage.id, e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: QUESTIONS */}
          {activeTab === 'questions' && (
            <div className="space-y-6">
              {/* Question 1 */}
              <div className="p-4 rounded-xl bg-[#060a17] border border-cyan-900/60 space-y-3">
                <span className="text-xs font-bold text-cyan-400 block">القفل الأول: سر البيانات</span>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">نص الموقف التعليمي:</label>
                  <textarea
                    rows={2}
                    value={localC1.scenario}
                    onChange={(e) => setLocalC1({ ...localC1, scenario: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">نص التلميح التوجيهي عند الخطأ:</label>
                  <input
                    type="text"
                    value={localC1.hintMessage}
                    onChange={(e) => setLocalC1({ ...localC1, hintMessage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-4 rounded-xl bg-[#060a17] border border-cyan-900/60 space-y-3">
                <span className="text-xs font-bold text-cyan-400 block">القفل الثالث: اختبار الذكاء (تقييم النموذج)</span>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">نص الموقف التعليمي:</label>
                  <textarea
                    rows={2}
                    value={localC3.scenario}
                    onChange={(e) => setLocalC3({ ...localC3, scenario: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">نص التلميح التوجيهي عند الخطأ:</label>
                  <input
                    type="text"
                    value={localC3.hintMessage}
                    onChange={(e) => setLocalC3({ ...localC3, hintMessage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Question 4 (New!) */}
              <div className="p-4 rounded-xl bg-[#060a17] border border-cyan-500/50 space-y-3 ring-1 ring-cyan-500/20">
                <span className="text-xs font-bold text-cyan-300 block">القفل الرابع: تطبيقات تعلم الآلة (منهج التقنية الرقمية)</span>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">نص السؤال أو الموقف:</label>
                  <textarea
                    rows={2}
                    value={localC4.scenario}
                    onChange={(e) => setLocalC4({ ...localC4, scenario: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs text-slate-400 block mb-1">نص التلميح التوجيهي عند الخطأ:</label>
                  <input
                    type="text"
                    value={localC4.hintMessage}
                    onChange={(e) => setLocalC4({ ...localC4, hintMessage: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-300 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-[#060a17] border border-slate-800 space-y-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>نظام المؤقت وإدارة الوقت</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setLocalSettings({ ...localSettings, timerMode: 'countdown', countdownDurationSeconds: 180 })}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-colors ${
                      localSettings.timerMode === 'countdown' && localSettings.countdownDurationSeconds === 180
                        ? 'bg-purple-950 border-purple-400 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    عد تنازلي (3 دقائق)
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalSettings({ ...localSettings, timerMode: 'countdown', countdownDurationSeconds: 300 })}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-colors ${
                      localSettings.timerMode === 'countdown' && localSettings.countdownDurationSeconds === 300
                        ? 'bg-purple-950 border-purple-400 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    عد تنازلي (5 دقائق)
                  </button>

                  <button
                    type="button"
                    onClick={() => setLocalSettings({ ...localSettings, timerMode: 'stopwatch' })}
                    className={`p-3 rounded-xl border text-center text-xs font-medium transition-colors ${
                      localSettings.timerMode === 'stopwatch'
                        ? 'bg-purple-950 border-purple-400 text-purple-200'
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    ساعة إيقاف مفتوحة
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#060a17] border border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-cyan-400" />
                    <span>المؤثرات الصوتية الرقمية</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">مؤثرات إلكترونية هادئة بدون ضوضاء في الفصل</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestAudio}
                    className="px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-lg text-slate-300"
                  >
                    تجربة نغمة الفك
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocalSettings({ ...localSettings, soundEnabled: !localSettings.soundEnabled })}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg border ${
                      localSettings.soundEnabled
                        ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    {localSettings.soundEnabled ? 'مفعّلة ✓' : 'معطّلة'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Buttons */}
        <div className="pt-4 mt-4 border-t border-cyan-950 flex items-center justify-between gap-3 shrink-0">
          <button
            onClick={() => {
              soundManager.playClick();
              onResetDefaults();
              onClose();
            }}
            className="px-4 py-2.5 rounded-xl text-xs font-medium text-rose-300 hover:text-rose-100 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/50 flex items-center gap-2 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الإعدادات الأصلية</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition-colors"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-400/20 flex items-center gap-2 cursor-pointer transition-colors"
            >
              {savedNotice ? <Check className="w-4 h-4 text-slate-950" /> : <Save className="w-4 h-4" />}
              <span>{savedNotice ? 'تم الحفظ!' : 'حفظ التعديلات'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Header } from './components/Header';
import { StartScreen } from './components/StartScreen';
import { LockProgressBar } from './components/LockProgressBar';
import { Lock1DataSecret } from './components/challenges/Lock1DataSecret';
import { Lock2MachineCode } from './components/challenges/Lock2MachineCode';
import { Lock3ModelEvaluation } from './components/challenges/Lock3ModelEvaluation';
import { Lock4MLApplications } from './components/challenges/Lock4MLApplications';
import { VictoryScreen } from './components/VictoryScreen';
import { TeacherSettingsModal } from './components/TeacherSettingsModal';
import { CertificateModal } from './components/CertificateModal';
import {
  DEFAULT_CHALLENGE_1,
  DEFAULT_ML_STAGES,
  DEFAULT_CHALLENGE_3,
  DEFAULT_CHALLENGE_4,
  DEFAULT_GAME_SETTINGS,
} from './data/defaultGameData';
import { MLStage, QuestionChallenge, GameSettings, GameProgress } from './types/game';
import { soundManager } from './utils/audio';

const STORAGE_KEY_SETTINGS = 'ai_lab_escape_settings_v2';
const STORAGE_KEY_DATA = 'ai_lab_escape_data_v2';

export default function App() {
  // Game Configuration State
  const [settings, setSettings] = useState<GameSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_GAME_SETTINGS;
  });

  const [challenge1, setChallenge1] = useState<QuestionChallenge>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challenge1) return parsed.challenge1;
      }
    } catch {
      // fallback
    }
    return DEFAULT_CHALLENGE_1;
  });

  const [stages, setStages] = useState<MLStage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.stages) return parsed.stages;
      }
    } catch {
      // fallback
    }
    return DEFAULT_ML_STAGES;
  });

  const [challenge3, setChallenge3] = useState<QuestionChallenge>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challenge3) return parsed.challenge3;
      }
    } catch {
      // fallback
    }
    return DEFAULT_CHALLENGE_3;
  });

  const [challenge4, setChallenge4] = useState<QuestionChallenge>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DATA);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.challenge4) return parsed.challenge4;
      }
    } catch {
      // fallback
    }
    return DEFAULT_CHALLENGE_4;
  });

  // App Navigation View
  const [view, setView] = useState<'start' | 'game' | 'victory'>('start');
  const [activeLockTab, setActiveLockTab] = useState<1 | 2 | 3 | 4>(1);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);

  // Game Progress State
  const [progress, setProgress] = useState<GameProgress>({
    currentLock: 1,
    lock1Solved: false,
    lock2Solved: false,
    lock3Solved: false,
    lock4Solved: false,
    score: 0,
    attempts: { lock1: 0, lock2: 0, lock3: 0, lock4: 0 },
    startedAt: null,
    completedAt: null,
    elapsedSeconds: 0,
  });

  // Sound sync
  useEffect(() => {
    soundManager.setMuted(!settings.soundEnabled);
  }, [settings.soundEnabled]);

  // Timer Tick
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (view === 'game') {
      timerRef.current = window.setInterval(() => {
        setProgress((prev) => ({
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1,
        }));
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [view]);

  // Start game handler
  const handleStartGame = () => {
    setProgress({
      currentLock: 1,
      lock1Solved: false,
      lock2Solved: false,
      lock3Solved: false,
      lock4Solved: false,
      score: 0,
      attempts: { lock1: 0, lock2: 0, lock3: 0, lock4: 0 },
      startedAt: Date.now(),
      completedAt: null,
      elapsedSeconds: 0,
    });
    setActiveLockTab(1);
    setView('game');
  };

  // Reset / Return to Start
  const handleResetGame = () => {
    soundManager.playClick();
    setView('start');
    setActiveLockTab(1);
  };

  // Toggle Sound
  const handleToggleSound = () => {
    const updated = !settings.soundEnabled;
    const newSettings = { ...settings, soundEnabled: updated };
    setSettings(newSettings);
    soundManager.setMuted(!updated);
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  // Lock 1 Success
  const handleLock1Success = () => {
    setProgress((prev) => ({
      ...prev,
      lock1Solved: true,
      currentLock: prev.lock2Solved ? (prev.lock3Solved ? (prev.lock4Solved ? 'completed' : 4) : 3) : 2,
      score: Math.max(prev.score, 1),
    }));
  };

  // Lock 2 Success
  const handleLock2Success = () => {
    setProgress((prev) => ({
      ...prev,
      lock2Solved: true,
      currentLock: prev.lock3Solved ? (prev.lock4Solved ? 'completed' : 4) : 3,
      score: Math.max(prev.score, 2),
    }));
  };

  // Lock 3 Success
  const handleLock3Success = () => {
    setProgress((prev) => ({
      ...prev,
      lock3Solved: true,
      currentLock: prev.lock4Solved ? 'completed' : 4,
      score: Math.max(prev.score, 3),
    }));
  };

  // Lock 4 Success
  const handleLock4Success = () => {
    setProgress((prev) => ({
      ...prev,
      lock4Solved: true,
      currentLock: 'completed',
      score: 4,
    }));
  };

  // Open Exit Doors & Complete Mission
  const handleOpenExitDoors = () => {
    setProgress((prev) => ({
      ...prev,
      completedAt: Date.now(),
    }));
    setView('victory');
  };

  // Save Teacher Customizations
  const handleSaveSettings = (
    newStages: MLStage[],
    newC1: QuestionChallenge,
    newC3: QuestionChallenge,
    newC4: QuestionChallenge,
    newSettings: GameSettings
  ) => {
    setStages(newStages);
    setChallenge1(newC1);
    setChallenge3(newC3);
    setChallenge4(newC4);
    setSettings(newSettings);

    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(newSettings));
      localStorage.setItem(
        STORAGE_KEY_DATA,
        JSON.stringify({
          stages: newStages,
          challenge1: newC1,
          challenge3: newC3,
          challenge4: newC4,
        })
      );
    } catch {
      // ignore
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    setStages(DEFAULT_ML_STAGES);
    setChallenge1(DEFAULT_CHALLENGE_1);
    setChallenge3(DEFAULT_CHALLENGE_3);
    setChallenge4(DEFAULT_CHALLENGE_4);
    setSettings(DEFAULT_GAME_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY_SETTINGS);
      localStorage.removeItem(STORAGE_KEY_DATA);
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col relative selection:bg-cyan-500 selection:text-black">
      {/* Dynamic Cyber & Neural Canvas Background */}
      <CyberBackground />

      {/* Top Bar Header */}
      <Header
        progress={progress}
        settings={settings}
        onToggleSound={handleToggleSound}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onResetGame={handleResetGame}
      />

      {/* Main Container */}
      <main className="flex-1 flex flex-col justify-center relative z-10 py-6 md:py-10">
        {view === 'start' && (
          <StartScreen
            onStart={handleStartGame}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        )}

        {view === 'game' && (
          <div className="w-full">
            {/* Sequential Lock Progress Map (4 Locks) */}
            <LockProgressBar
              progress={progress}
              activeTab={activeLockTab}
              onSelectTab={(lockNum) => setActiveLockTab(lockNum)}
            />

            {/* Active Lock Challenges */}
            {activeLockTab === 1 && (
              <Lock1DataSecret
                challenge={challenge1}
                isAlreadySolved={progress.lock1Solved}
                onSuccess={handleLock1Success}
                onNextLock={() => setActiveLockTab(2)}
              />
            )}

            {activeLockTab === 2 && (
              <Lock2MachineCode
                stages={stages}
                isAlreadySolved={progress.lock2Solved}
                onSuccess={handleLock2Success}
                onNextLock={() => setActiveLockTab(3)}
              />
            )}

            {activeLockTab === 3 && (
              <Lock3ModelEvaluation
                challenge={challenge3}
                isAlreadySolved={progress.lock3Solved}
                onSuccess={handleLock3Success}
                onNextLock={() => setActiveLockTab(4)}
              />
            )}

            {activeLockTab === 4 && (
              <Lock4MLApplications
                challenge={challenge4}
                isAlreadySolved={progress.lock4Solved}
                onSuccess={handleLock4Success}
                onOpenExitDoors={handleOpenExitDoors}
              />
            )}
          </div>
        )}

        {view === 'victory' && (
          <VictoryScreen
            progress={progress}
            onRestart={handleStartGame}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isSettingsOpen && (
        <TeacherSettingsModal
          stages={stages}
          challenge1={challenge1}
          challenge3={challenge3}
          challenge4={challenge4}
          settings={settings}
          onSave={handleSaveSettings}
          onResetDefaults={handleResetDefaults}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isCertificateOpen && (
        <CertificateModal
          score={progress.score}
          elapsedSeconds={progress.elapsedSeconds}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Quiet Footer for Classroom Context */}
      <footer className="w-full border-t border-cyan-950/40 py-3 text-center text-xs text-slate-300 no-print relative z-10">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>الهروب من مختبر الذكاء الاصطناعي · نشاط التقويم الختامي لمادة التقنية الرقمية</span>
          <span className="text-slate-400">تصميم تفاعلي متجاوب مخصص للحواسيب والأجهزة اللوحية (iPad)</span>
        </div>
      </footer>
    </div>
  );
}

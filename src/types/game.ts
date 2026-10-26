export interface MLStage {
  id: string;
  name: string;
  description: string;
  correctIndex: number;
}

export interface QuestionChallenge {
  id: string;
  title: string;
  lockNumber: 1 | 2 | 3 | 4;
  scenario: string;
  options: {
    id: string;
    text: string;
  }[];
  correctOptionId: string;
  successMessage: string;
  hintMessage: string;
  educationalNote: string;
}

export interface GameSettings {
  soundEnabled: boolean;
  timerMode: 'countdown' | 'stopwatch' | 'off';
  countdownDurationSeconds: number; // default 300 (5 minutes)
}

export interface GameProgress {
  currentLock: 1 | 2 | 3 | 4 | 'completed';
  lock1Solved: boolean;
  lock2Solved: boolean;
  lock3Solved: boolean;
  lock4Solved: boolean;
  score: number;
  attempts: {
    lock1: number;
    lock2: number;
    lock3: number;
    lock4: number;
  };
  startedAt: number | null;
  completedAt: number | null;
  elapsedSeconds: number;
}

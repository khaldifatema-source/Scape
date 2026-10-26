import confetti from 'canvas-confetti';

export function fireVictoryConfetti() {
  const colors = ['#06b6d4', '#38bdf8', '#8b5cf6', '#a855f7', '#34d399', '#ffffff'];

  // Left burst
  confetti({
    particleCount: 70,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0.7 },
    colors,
    ticks: 300,
    gravity: 0.9,
    scalar: 1.1,
  });

  // Right burst
  confetti({
    particleCount: 70,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0.7 },
    colors,
    ticks: 300,
    gravity: 0.9,
    scalar: 1.1,
  });

  // Center celebration fountain after a slight delay
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 100,
      origin: { x: 0.5, y: 0.6 },
      colors,
      ticks: 350,
      gravity: 0.8,
      scalar: 1.2,
    });
  }, 250);
}

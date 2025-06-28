import { useEffect, useState } from 'react';

export function useCountSequenceOnView(counts: number[], trigger: boolean) {
  const [activeIndex, setActiveIndex] = useState(-1); // which card is currently counting
  const [currentCounts, setCurrentCounts] = useState(counts.map(() => 0));

  useEffect(() => {
    if (!trigger || counts.length === 0) return;

    const totalDuration = 5000; // total 5 seconds
    const perCardDuration = totalDuration / counts.length;

    let currentIndex = 0;

    const startCounting = () => {
      if (currentIndex >= counts.length) return;

      const target = counts[currentIndex];
      const duration = perCardDuration;
      const steps = 60;
      const intervalTime = duration / steps;
      const increment = target / steps;
      let progress = 0;

      const interval = setInterval(() => {
        progress += increment;
        setCurrentCounts(prev => {
          const updated = [...prev];
          updated[currentIndex] = Math.min(Math.round(progress), target);
          return updated;
        });

        if (progress >= target) {
          clearInterval(interval);
          currentIndex++;
          startCounting(); // Start next
        }
      }, intervalTime);
    };

    setActiveIndex(0);
    startCounting();
  }, [trigger]);

  return currentCounts;
}

import { useEffect, useState } from "react";

export function useCountUp(
  targetValue: number,
  isActive: boolean,
  duration = 2000
) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let animationFrame: number;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(easedProgress * targetValue);
      setCurrentValue(value);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [targetValue, isActive, duration]);

  return currentValue;
}

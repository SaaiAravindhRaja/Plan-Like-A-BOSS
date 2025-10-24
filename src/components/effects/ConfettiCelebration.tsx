/**
 * Confetti Celebration Component
 * Triggers confetti when schedule has no conflicts
 */

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useStore } from '@/store/useStore';

export function ConfettiCelebration() {
  const getConflicts = useStore((state) => state.getConflicts);
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);

  useEffect(() => {
    const schedule = getCurrentSchedule();
    if (!schedule) return;

    // Check if there are any selected sections
    const hasSelectedSections = schedule.courses.some(course =>
      course.sections.some(section => section.isSelected)
    );

    if (!hasSelectedSections) return;

    // Check for conflicts
    const conflicts = getConflicts();

    // Celebrate if no conflicts and has selections
    if (conflicts.length === 0 && hasSelectedSections) {
      const celebrate = () => {
        // Fire from left
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: ['#C3002F', '#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'],
        });

        // Fire from right
        confetti({
          particleCount: 100,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: ['#C3002F', '#8B5CF6', '#3B82F6', '#06B6D4', '#10B981'],
        });

        // Center burst
        confetti({
          particleCount: 50,
          angle: 90,
          spread: 360,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#C3002F', '#8B5CF6', '#3B82F6', '#06B6D4'],
          startVelocity: 45,
          gravity: 1.2,
        });
      };

      // Delay celebration slightly so user sees it
      const timer = setTimeout(celebrate, 300);
      return () => clearTimeout(timer);
    }
  }, [getCurrentSchedule, getConflicts]);

  return null; // This component doesn't render anything
}

/**
 * Main App Component
 * Orchestrates all components and handles URL-based schedule loading
 */

import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { CalendarGrid } from '@/components/layout/CalendarGrid';
import { CommandPalette } from '@/components/features/CommandPalette';
import { AnimatedBackground } from '@/components/effects/AnimatedBackground';
import { ConfettiCelebration } from '@/components/effects/ConfettiCelebration';

function App() {
  const schedules = useStore((state) => state.schedules);
  const createSchedule = useStore((state) => state.createSchedule);
  const loadFromURL = useStore((state) => state.loadFromURL);
  const currentScheduleId = useStore((state) => state.currentScheduleId);

  // Check for shared schedule in URL on mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scheduleParam = urlParams.get('schedule');

    if (scheduleParam) {
      loadFromURL(scheduleParam);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [loadFromURL]);

  // Create default schedule if none exists
  useEffect(() => {
    if (schedules.length === 0) {
      createSchedule('My Schedule');
    }
  }, [schedules, createSchedule]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-dark-bg dark:bg-dark-bg relative">
      {/* EPIC BACKGROUND EFFECTS */}
      <AnimatedBackground />

      {/* Confetti Celebration */}
      <ConfettiCelebration />

      {/* Main Layout */}
      <div className="relative z-10 h-full flex flex-col">
        <Header />

        <div className="flex-1 flex overflow-hidden">
          <Sidebar />

          <main className="flex-1 flex flex-col overflow-hidden">
            {currentScheduleId ? (
              <CalendarGrid />
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md">
                  <h2 className="text-4xl font-bold text-white mb-2">
                    Welcome to Plan-Like-A-BOSS
                  </h2>
                  <p className="text-lg text-dark-text-secondary">
                    The smart course planner for SMU students
                  </p>
                  <p className="text-sm text-dark-text-secondary">
                    Create a schedule to start planning your courses
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Command Palette */}
      <CommandPalette />
    </div>
  );
}

export default App;

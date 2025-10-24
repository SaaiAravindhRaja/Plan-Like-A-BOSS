/**
 * Header Component - PRODUCTION READY
 * Top navigation bar with SMU branding, schedule selector and actions
 * Enhanced for Singapore Management University
 */

import { useState } from 'react';
import {
  Command,
  Download,
  Share2,
  Plus,
  Menu,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Select';
import { ScheduleManager } from '@/components/features/ScheduleManager';
import { ExportMenu } from '@/components/features/ExportMenu';
import { ShareModal } from '@/components/features/ShareModal';
import { COURSE_STATS } from '@/data/scis-courses';

export function Header() {
  const toggleCommandPalette = useStore((state) => state.toggleCommandPalette);
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const schedules = useStore((state) => state.schedules);
  const currentScheduleId = useStore((state) => state.currentScheduleId);
  const setCurrentSchedule = useStore((state) => state.setCurrentSchedule);
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);

  const [isScheduleManagerOpen, setIsScheduleManagerOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const currentSchedule = getCurrentSchedule();

  return (
    <>
      <header className="h-16 border-b border-dark-border backdrop-blur-md bg-dark-bg/80">
        <div className="h-full px-4 flex items-center justify-between gap-4">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5 text-dark-text dark:text-dark-text" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-smu-red to-accent-purple flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-white leading-none mb-1">
                  Plan-Like-A-BOSS
                </h1>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="text-xs py-0.5 px-2">
                    <GraduationCap className="w-3 h-3" />
                    SMU SCIS
                  </Badge>
                  <span className="text-xs text-dark-text-secondary">
                    {COURSE_STATS.totalCourses} courses
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Section - Schedule Selector */}
          <div className="flex-1 max-w-md">
            {schedules.length > 0 && currentScheduleId ? (
              <div className="flex items-center gap-2">
                <Select
                  value={currentScheduleId}
                  onChange={(e) => setCurrentSchedule(e.target.value)}
                  options={schedules.map((s) => ({
                    value: s.id,
                    label: s.name,
                  }))}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsScheduleManagerOpen(true)}
                >
                  Manage
                </Button>
              </div>
            ) : (
              <Button
                icon={<Plus className="w-4 h-4" />}
                onClick={() => setIsScheduleManagerOpen(true)}
                size="sm"
              >
                Create Schedule
              </Button>
            )}
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Command Palette */}
            <button
              onClick={toggleCommandPalette}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-elevated dark:bg-dark-elevated hover:bg-dark-border dark:hover:bg-dark-border transition-colors"
              title="Open command palette"
            >
              <Command className="w-4 h-4 text-dark-text-secondary" />
              <span className="text-xs text-dark-text-secondary">
                {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
              </span>
            </button>

            {/* Export */}
            {currentSchedule && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Download className="w-4 h-4" />}
                  onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
                  className="relative"
                />

                <Button
                  variant="ghost"
                  size="sm"
                  icon={<Share2 className="w-4 h-4" />}
                  onClick={() => setIsShareModalOpen(true)}
                />
              </>
            )}

          </div>
        </div>

        {/* Export Menu Dropdown */}
        {isExportMenuOpen && (
          <ExportMenu onClose={() => setIsExportMenuOpen(false)} />
        )}
      </header>

      {/* Modals */}
      <ScheduleManager
        isOpen={isScheduleManagerOpen}
        onClose={() => setIsScheduleManagerOpen(false)}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </>
  );
}

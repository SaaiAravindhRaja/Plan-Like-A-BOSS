/**
 * ExportMenu Component
 * Dropdown menu for exporting schedules in various formats
 */

import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileImage, Calendar as CalendarIcon } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { generateICSFile, downloadFile } from '@/utils/exportUtils';
import { toPng } from 'html-to-image';

interface ExportMenuProps {
  onClose: () => void;
}

export function ExportMenu({ onClose }: ExportMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleExportPNG = async () => {
    const schedule = getCurrentSchedule();
    if (!schedule) return;

    try {
      // Find the calendar grid element
      const calendarElement = document.querySelector('[data-calendar-grid]') as HTMLElement;
      if (!calendarElement) {
        alert('Could not find calendar to export');
        return;
      }

      const dataUrl = await toPng(calendarElement, {
        quality: 1.0,
        pixelRatio: 2,
      });

      // Download the image
      const link = document.createElement('a');
      link.download = `${schedule.name.replace(/\s+/g, '-')}-schedule.png`;
      link.href = dataUrl;
      link.click();

      onClose();
    } catch (err) {
      console.error('Failed to export PNG:', err);
      alert('Failed to export image. Please try again.');
    }
  };

  const handleExportICS = () => {
    const schedule = getCurrentSchedule();
    if (!schedule) return;

    try {
      const icsContent = generateICSFile(schedule);
      downloadFile(
        icsContent,
        `${schedule.name.replace(/\s+/g, '-')}-schedule.ics`,
        'text/calendar'
      );
      onClose();
    } catch (err) {
      console.error('Failed to export ICS:', err);
      alert('Failed to export calendar file. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="absolute top-full right-4 mt-2 w-64 glass rounded-xl shadow-xl border border-dark-border dark:border-dark-border overflow-hidden z-50"
      >
        <div className="p-2">
          <button
            onClick={handleExportPNG}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors text-left"
          >
            <FileImage className="w-5 h-5 text-accent-blue" />
            <div>
              <div className="text-sm font-medium text-dark-text dark:text-dark-text">
                Export as PNG
              </div>
              <div className="text-xs text-dark-text-secondary dark:text-dark-text-secondary">
                Save calendar as an image
              </div>
            </div>
          </button>

          <button
            onClick={handleExportICS}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors text-left"
          >
            <CalendarIcon className="w-5 h-5 text-accent-purple" />
            <div>
              <div className="text-sm font-medium text-dark-text dark:text-dark-text">
                Export as ICS
              </div>
              <div className="text-xs text-dark-text-secondary dark:text-dark-text-secondary">
                Import to Google Calendar, Outlook
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

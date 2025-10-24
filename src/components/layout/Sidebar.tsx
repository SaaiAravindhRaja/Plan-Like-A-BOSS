/**
 * Sidebar Component
 * Left sidebar containing the course list
 */

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CourseList } from '@/components/features/CourseList';

export function Sidebar() {
  const isSidebarCollapsed = useStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useStore((state) => state.toggleSidebar);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {!isSidebarCollapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isSidebarCollapsed ? -400 : 0,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed lg:relative top-0 left-0 h-full w-[400px] glass border-r border-dark-border dark:border-dark-border z-40"
      >
        {/* Mobile Close Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors lg:hidden"
        >
          <X className="w-5 h-5 text-dark-text-secondary" />
        </button>

        <CourseList />
      </motion.aside>
    </>
  );
}

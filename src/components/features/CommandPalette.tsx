/**
 * CommandPalette Component
 * Keyboard-driven command palette (Ctrl/Cmd + K)
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Calendar,
  Download,
  Share2,
  Command,
  BookOpen,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { CommandAction } from '@/types';

export function CommandPalette() {
  const isOpen = useStore((state) => state.isCommandPaletteOpen);
  const toggleCommandPalette = useStore((state) => state.toggleCommandPalette);
  const createSchedule = useStore((state) => state.createSchedule);

  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Define available commands
  const commands: CommandAction[] = [
    {
      id: 'new-schedule',
      label: 'Create New Schedule',
      shortcut: 'Ctrl+N',
      icon: 'Plus',
      action: () => {
        const name = prompt('Enter schedule name:');
        if (name) {
          createSchedule(name);
        }
        toggleCommandPalette();
      },
      category: 'schedule',
    },
    {
      id: 'browse-courses',
      label: 'Browse SCIS Courses',
      shortcut: 'Ctrl+B',
      icon: 'BookOpen',
      action: () => {
        toggleCommandPalette();
        // This will be handled by the modal state
      },
      category: 'course',
    },
  ];

  // Filter commands based on search
  const filteredCommands = commands.filter((cmd) =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open/close with Ctrl+K or Cmd+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        toggleCommandPalette();
      }

      if (!isOpen) return;

      // Close with Escape
      if (e.key === 'Escape') {
        toggleCommandPalette();
      }

      // Navigation with arrow keys
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      }

      // Execute with Enter
      if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, toggleCommandPalette, filteredCommands, selectedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  const iconMap: Record<string, React.ReactNode> = {
    Plus: <Plus className="w-4 h-4" />,
    Calendar: <Calendar className="w-4 h-4" />,
    Download: <Download className="w-4 h-4" />,
    Share2: <Share2 className="w-4 h-4" />,
    BookOpen: <BookOpen className="w-4 h-4" />,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCommandPalette}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Command Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl glass rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 p-5 border-b border-dark-border">
              <Search className="w-5 h-5 text-dark-text-secondary" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search commands..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder:text-dark-text-secondary focus:outline-none text-lg"
              />
              <kbd className="hidden sm:block px-2 py-1 text-xs bg-dark-elevated rounded border border-dark-border text-dark-text-secondary">
                ESC
              </kbd>
            </div>

            {/* Commands List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredCommands.length === 0 ? (
                <div className="p-12 text-center">
                  <Search className="w-12 h-12 mx-auto mb-3 text-dark-text-secondary opacity-50" />
                  <p className="text-dark-text-secondary">No commands found</p>
                </div>
              ) : (
                <div className="p-2">
                  {filteredCommands.map((command, index) => (
                    <button
                      key={command.id}
                      onClick={command.action}
                      className={`
                        w-full flex items-center gap-4 px-4 py-3 rounded-lg
                        transition-all text-left
                        ${
                          index === selectedIndex
                            ? 'bg-accent-blue text-white'
                            : 'text-dark-text-secondary hover:bg-dark-elevated hover:text-white'
                        }
                      `}
                    >
                      <div className="flex-shrink-0">
                        {command.icon && iconMap[command.icon]}
                      </div>
                      <span className="flex-1 font-medium">{command.label}</span>
                      {command.shortcut && (
                        <kbd className="px-2 py-1 text-xs bg-dark-surface/50 rounded border border-dark-border">
                          {command.shortcut}
                        </kbd>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-dark-border bg-dark-elevated/30">
              <div className="flex items-center gap-4 text-xs text-dark-text-secondary">
                <div className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-dark-elevated rounded border border-dark-border">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <kbd className="px-2 py-0.5 bg-dark-elevated rounded border border-dark-border">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-dark-text-secondary">
                <Command className="w-3 h-3" />
                <span>⌘K</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

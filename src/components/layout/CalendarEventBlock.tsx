/**
 * CalendarEventBlock Component
 * Represents a single class session on the calendar
 */

import { motion } from 'framer-motion';
import { MapPin, User, AlertCircle, X } from 'lucide-react';
import { CalendarEvent } from '@/types';
import { formatTimeDisplay } from '@/utils/timeUtils';
import { useStore } from '@/store/useStore';

interface CalendarEventBlockProps {
  event: CalendarEvent;
  top: number; // Percentage
  height: number; // Percentage
  column?: number; // Column index for side-by-side layout
  totalColumns?: number; // Total columns in the overlap group
}

export function CalendarEventBlock({ event, top, height, column = 0, totalColumns = 1 }: CalendarEventBlockProps) {
  const isSmall = height < 8; // Less than ~1 hour
  const toggleSectionSelection = useStore((state) => state.toggleSectionSelection);

  // Calculate width and left offset for side-by-side layout
  const widthPercent = 100 / totalColumns;
  const leftPercent = (column * 100) / totalColumns;

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSectionSelection(event.courseId, event.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{
        opacity: 1,
        scale: 1,
        backgroundColor: event.hasConflict ? '#C3002F' : event.color,
      }}
      transition={{
        duration: 0.3,
        backgroundColor: { duration: 0.5 },
      }}
      className={`
        absolute rounded-lg
        overflow-hidden shadow-lg
        pointer-events-auto cursor-pointer
        border-2
        ${event.hasConflict ? 'border-red-400 shadow-red-500/50 animate-pulse' : 'border-white/20'}
        hover:shadow-xl
        transition-all duration-200
      `}
      style={{
        top: `${top}%`,
        height: `${height}%`,
        left: `${leftPercent}%`,
        width: `${widthPercent}%`,
        paddingLeft: column > 0 ? '2px' : '4px',
        paddingRight: column < totalColumns - 1 ? '2px' : '4px',
      }}
      whileHover={{ scale: 1.02, zIndex: 10 }}
    >
      <div className="relative h-full p-2 text-white group">
        {/* Remove button - visible on hover */}
        <motion.button
          onClick={handleRemove}
          className="absolute top-1 right-1 z-10 bg-red-500 hover:bg-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Remove from schedule"
        >
          <X className="w-3 h-3" />
        </motion.button>

        {/* Conflict indicator */}
        {event.hasConflict && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            className="absolute top-1 right-7 group-hover:opacity-0 transition-opacity"
          >
            <AlertCircle className="w-4 h-4" />
          </motion.div>
        )}

        {/* Content */}
        <div className="flex flex-col h-full">
          <div className="font-semibold text-sm truncate">
            {event.courseCode}
          </div>

          {!isSmall && (
            <>
              <div className="text-xs opacity-90 truncate">
                {event.sectionId}
              </div>

              <div className="flex-1 min-h-0 mt-1 space-y-0.5 text-xs opacity-80">
                <div className="flex items-center gap-1 truncate">
                  <User className="w-3 h-3 flex-shrink-0" />
                  <span className="truncate">{event.instructor}</span>
                </div>

                {event.venue && (
                  <div className="flex items-center gap-1 truncate">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{event.venue}</span>
                  </div>
                )}
              </div>

              <div className="text-xs opacity-70 mt-auto">
                {formatTimeDisplay(event.startTime)} - {formatTimeDisplay(event.endTime)}
              </div>
            </>
          )}
        </div>

        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 -z-10 rounded-lg" />
      </div>
    </motion.div>
  );
}

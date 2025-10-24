/**
 * CalendarGrid Component
 * The main interactive weekly calendar view
 */

import { useRef, useMemo } from 'react';
import { DayOfWeek, CalendarEvent } from '@/types';
import { useStore } from '@/store/useStore';
import { formatTimeDisplay, generateTimeSlots, calculateEventPosition } from '@/utils/timeUtils';
import { CalendarEventBlock } from './CalendarEventBlock';
import { Clock, Users, AlertTriangle, BookOpen } from 'lucide-react';

const DAYS: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const START_HOUR = 8;
const END_HOUR = 23;

export function CalendarGrid() {
  const calendarRef = useRef<HTMLDivElement>(null);
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);
  const schedule = getCurrentSchedule();

  // Generate time slots
  const timeSlots = generateTimeSlots(START_HOUR, END_HOUR, 60);

  // Convert selected sections to calendar events
  const events: CalendarEvent[] = [];
  if (schedule) {
    schedule.courses.forEach((course) => {
      course.sections
        .filter((section) => section.isSelected)
        .forEach((section) => {
          events.push({
            id: section.id,
            courseId: course.id,
            courseCode: course.courseCode,
            courseName: course.courseName,
            sectionId: section.sectionId,
            instructor: section.instructor,
            venue: section.venue,
            day: section.day,
            startTime: section.startTime,
            endTime: section.endTime,
            color: course.color,
            hasConflict: section.hasConflict,
          });
        });
    });
  }

  // Group events by day
  const eventsByDay: Record<DayOfWeek, CalendarEvent[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  events.forEach((event) => {
    eventsByDay[event.day].push(event);
  });

  // Helper function to detect time overlap between two events
  const eventsOverlap = (event1: CalendarEvent, event2: CalendarEvent) => {
    const [start1Hour, start1Min] = event1.startTime.split(':').map(Number);
    const [end1Hour, end1Min] = event1.endTime.split(':').map(Number);
    const [start2Hour, start2Min] = event2.startTime.split(':').map(Number);
    const [end2Hour, end2Min] = event2.endTime.split(':').map(Number);

    const start1 = start1Hour * 60 + start1Min;
    const end1 = end1Hour * 60 + end1Min;
    const start2 = start2Hour * 60 + start2Min;
    const end2 = end2Hour * 60 + end2Min;

    return start1 < end2 && end1 > start2;
  };

  // Calculate layout for overlapping events (side-by-side positioning)
  interface EventLayout {
    event: CalendarEvent;
    position: { top: number; height: number };
    column: number;
    totalColumns: number;
  }

  const eventLayoutsByDay: Record<DayOfWeek, EventLayout[]> = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  // For each day, calculate layout
  DAYS.forEach((day) => {
    const dayEvents = eventsByDay[day];

    // Calculate positions first
    const eventsWithPositions = dayEvents.map((event) => ({
      event,
      position: calculateEventPosition(event.startTime, event.endTime, START_HOUR, END_HOUR),
    }));

    // Group overlapping events
    const groups: typeof eventsWithPositions[] = [];
    const processed = new Set<number>();

    eventsWithPositions.forEach((eventData, idx) => {
      if (processed.has(idx)) return;

      const group = [eventData];
      processed.add(idx);

      // Find all events that overlap with any event in the current group
      for (let i = 0; i < group.length; i++) {
        eventsWithPositions.forEach((otherEventData, otherIdx) => {
          if (processed.has(otherIdx)) return;
          if (eventsOverlap(group[i].event, otherEventData.event)) {
            group.push(otherEventData);
            processed.add(otherIdx);
          }
        });
      }

      groups.push(group);
    });

    // Assign columns to events in each group
    groups.forEach((group) => {
      group.forEach((eventData, idx) => {
        eventLayoutsByDay[day].push({
          event: eventData.event,
          position: eventData.position,
          column: idx,
          totalColumns: group.length,
        });
      });
    });
  });

  // Calculate statistics
  const stats = useMemo(() => {
    const totalCourses = schedule?.courses.length || 0;
    const totalSections = schedule?.courses.reduce((sum, c) => sum + c.sections.filter(s => s.isSelected).length, 0) || 0;
    const conflicts = events.filter(e => e.hasConflict).length;

    // Calculate total hours
    let totalMinutes = 0;
    events.forEach(event => {
      const [startHour, startMin] = event.startTime.split(':').map(Number);
      const [endHour, endMin] = event.endTime.split(':').map(Number);
      const duration = (endHour * 60 + endMin) - (startHour * 60 + startMin);
      totalMinutes += duration;
    });
    const totalHours = (totalMinutes / 60).toFixed(1);

    return { totalCourses, totalSections, conflicts, totalHours };
  }, [schedule, events]);

  if (!schedule) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-dark-text-secondary">
            No schedule selected. Create one to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Statistics Bar */}
      {events.length > 0 && (
        <div className="h-16 border-b border-dark-border bg-dark-elevated/30 px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-accent-blue" />
              <span className="text-sm text-dark-text-secondary">
                <span className="font-bold text-white">{stats.totalCourses}</span> course{stats.totalCourses !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-accent-purple" />
              <span className="text-sm text-dark-text-secondary">
                <span className="font-bold text-white">{stats.totalSections}</span> section{stats.totalSections !== 1 ? 's' : ''}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-cyan" />
              <span className="text-sm text-dark-text-secondary">
                <span className="font-bold text-white">{stats.totalHours}</span> hours/week
              </span>
            </div>

            {stats.conflicts > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-red-950/50 rounded-full border border-red-500/30">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-sm text-red-400 font-medium">
                  {stats.conflicts} conflict{stats.conflicts !== 1 ? 's' : ''}
                </span>
              </div>
            )}
          </div>

          <div className="text-xs text-dark-text-secondary">
            {schedule.name}
          </div>
        </div>
      )}
    <div ref={calendarRef} className="flex-1 overflow-auto">
      <div className="min-w-[1000px] h-full" data-calendar-grid>
        {/* Calendar Grid */}
        <div className="grid grid-cols-[80px_repeat(7,1fr)] h-full">
          {/* Time labels column */}
          <div className="border-r border-dark-border bg-dark-elevated/20">
            <div className="h-14 border-b border-dark-border" />
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-20 border-b border-dark-border flex items-start justify-end pr-3 pt-1"
              >
                <span className="text-xs text-dark-text-secondary font-medium">
                  {formatTimeDisplay(time)}
                </span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {DAYS.map((day) => (
            <div key={day} className="border-r border-dark-border">
              {/* Day header */}
              <div className="h-14 border-b border-dark-border flex items-center justify-center bg-dark-elevated/30">
                <span className="text-sm font-bold text-white">
                  {day}
                </span>
              </div>

              {/* Day content - relative container for absolute positioned events */}
              <div className="relative">
                {/* Time slot dividers */}
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    className="h-20 border-b border-dark-border hover:bg-dark-elevated/20 transition-colors"
                  />
                ))}

                {/* Events overlay */}
                <div className="absolute inset-0 pointer-events-none">
                  {eventLayoutsByDay[day].map((layout) => (
                    <CalendarEventBlock
                      key={layout.event.id}
                      event={layout.event}
                      top={layout.position.top}
                      height={layout.position.height}
                      column={layout.column}
                      totalColumns={layout.totalColumns}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
  );
}

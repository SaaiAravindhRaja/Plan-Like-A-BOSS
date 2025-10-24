/**
 * Time Utility Functions
 * Handles all time-related conversions and calculations for conflict detection
 */

import { DayOfWeek, TimeBlock, Section } from '@/types';

/**
 * Maps day names to numerical indices (Monday = 0, Sunday = 6)
 */
export const DAY_TO_INDEX: Record<DayOfWeek, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
  Sunday: 6,
};

/**
 * Converts a time string (HH:mm) to minutes from midnight
 * @param time - Time string in "HH:mm" format (e.g., "14:30")
 * @returns Number of minutes from midnight (0-1439)
 */
export function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

/**
 * Converts minutes back to time string (HH:mm)
 * @param minutes - Minutes from midnight
 * @returns Time string in "HH:mm" format
 */
export function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

/**
 * Converts a day + time to minutes from the start of the week
 * This is the key function for conflict detection
 * @param day - Day of the week
 * @param time - Time string in "HH:mm" format
 * @returns Minutes from the start of the week (Monday 00:00)
 */
export function dayTimeToWeekMinutes(day: DayOfWeek, time: string): number {
  const dayIndex = DAY_TO_INDEX[day];
  const minutesInDay = timeToMinutes(time);
  return dayIndex * 1440 + minutesInDay; // 1440 minutes in a day
}

/**
 * Converts a section to a TimeBlock for conflict detection
 * @param section - The section to convert
 * @param courseId - ID of the course this section belongs to
 * @returns TimeBlock representation
 */
export function sectionToTimeBlock(section: Section, courseId: string): TimeBlock {
  return {
    day: section.day,
    dayIndex: DAY_TO_INDEX[section.day],
    startMinutes: dayTimeToWeekMinutes(section.day, section.startTime),
    endMinutes: dayTimeToWeekMinutes(section.day, section.endTime),
    courseId,
    sectionId: section.id,
  };
}

/**
 * Checks if two time blocks overlap
 * Two blocks overlap if they share any time in common
 * @param block1 - First time block
 * @param block2 - Second time block
 * @returns true if blocks overlap
 */
export function timeBlocksOverlap(block1: TimeBlock, block2: TimeBlock): boolean {
  // Must be on the same day
  if (block1.day !== block2.day) {
    return false;
  }

  // Check for overlap: blocks overlap if one starts before the other ends
  // and ends after the other starts
  return (
    block1.startMinutes < block2.endMinutes &&
    block1.endMinutes > block2.startMinutes
  );
}

/**
 * Formats time for display (e.g., "14:30" -> "2:30 PM")
 * @param time - Time string in "HH:mm" format
 * @returns Formatted time string
 */
export function formatTimeDisplay(time: string): string {
  const [hours, minutes] = time.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

/**
 * Generates an array of time slots for calendar grid
 * @param startHour - Starting hour (default: 8)
 * @param endHour - Ending hour (default: 23)
 * @param intervalMinutes - Interval in minutes (default: 30)
 * @returns Array of time strings
 */
export function generateTimeSlots(
  startHour: number = 8,
  endHour: number = 23,
  intervalMinutes: number = 30
): string[] {
  const slots: string[] = [];
  let currentMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  while (currentMinutes <= endMinutes) {
    slots.push(minutesToTime(currentMinutes));
    currentMinutes += intervalMinutes;
  }

  return slots;
}

/**
 * Calculates the position and height for a calendar event block
 * @param startTime - Start time in "HH:mm" format
 * @param endTime - End time in "HH:mm" format
 * @param gridStartHour - The starting hour of the calendar grid
 * @param gridEndHour - The ending hour of the calendar grid
 * @returns Object with top position (%) and height (%)
 */
export function calculateEventPosition(
  startTime: string,
  endTime: string,
  gridStartHour: number = 8,
  gridEndHour: number = 23
): { top: number; height: number } {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const gridStartMinutes = gridStartHour * 60;
  const gridTotalMinutes = (gridEndHour - gridStartHour) * 60;

  // Calculate position as percentage
  const top = ((startMinutes - gridStartMinutes) / gridTotalMinutes) * 100;
  const height = ((endMinutes - startMinutes) / gridTotalMinutes) * 100;

  return {
    top: Math.max(0, Math.min(100, top)),
    height: Math.max(0, Math.min(100 - top, height)),
  };
}

/**
 * Validates a time string format
 * @param time - Time string to validate
 * @returns true if valid "HH:mm" format
 */
export function isValidTimeFormat(time: string): boolean {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
}

/**
 * Checks if end time is after start time
 * @param startTime - Start time in "HH:mm" format
 * @param endTime - End time in "HH:mm" format
 * @returns true if valid time range
 */
export function isValidTimeRange(startTime: string, endTime: string): boolean {
  return timeToMinutes(endTime) > timeToMinutes(startTime);
}

/**
 * Export Utility Functions
 * Handles exporting schedules to various formats (ICS, URL encoding)
 */

import { Schedule, Section, DayOfWeek } from '@/types';
import { DAY_TO_INDEX } from './timeUtils';

/**
 * Generates an ICS (iCalendar) file content for a schedule
 * @param schedule - The schedule to export
 * @returns ICS file content as a string
 */
export function generateICSFile(schedule: Schedule): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Plan-Like-A-BOSS//SMU Course Planner//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${schedule.name}`,
    'X-WR-TIMEZONE:Asia/Singapore',
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Singapore',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0800',
    'TZOFFSETTO:+0800',
    'TZNAME:+08',
    'END:STANDARD',
    'END:VTIMEZONE',
  ];

  // Get the start of the current academic week (next Monday)
  const today = new Date();
  const currentDay = today.getDay();
  const daysUntilMonday = currentDay === 0 ? 1 : 8 - currentDay;
  const nextMonday = new Date(today);
  nextMonday.setDate(today.getDate() + daysUntilMonday);
  nextMonday.setHours(0, 0, 0, 0);

  // Add events for each selected section
  schedule.courses.forEach((course) => {
    course.sections
      .filter((section) => section.isSelected)
      .forEach((section) => {
        const event = generateICSEvent(course.courseCode, course.courseName, section, nextMonday);
        lines.push(...event);
      });
  });

  lines.push('END:VCALENDAR');

  return lines.join('\r\n');
}

/**
 * Generates an ICS event for a single section
 */
function generateICSEvent(
  courseCode: string,
  courseName: string,
  section: Section,
  weekStart: Date
): string[] {
  // Calculate the date for this event
  const eventDate = new Date(weekStart);
  const dayOffset = DAY_TO_INDEX[section.day];
  eventDate.setDate(weekStart.getDate() + dayOffset);

  // Parse times
  const [startHour, startMinute] = section.startTime.split(':').map(Number);
  const [endHour, endMinute] = section.endTime.split(':').map(Number);

  // Create start and end datetime
  const startDateTime = new Date(eventDate);
  startDateTime.setHours(startHour, startMinute, 0, 0);

  const endDateTime = new Date(eventDate);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  // Format dates for ICS (YYYYMMDDTHHMMSS)
  const formatICSDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
  };

  const dtstart = formatICSDate(startDateTime);
  const dtend = formatICSDate(endDateTime);
  const dtstamp = formatICSDate(new Date());

  // Generate unique ID
  const uid = `${courseCode}-${section.sectionId}-${dtstart}@plan-like-a-boss.app`;

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Asia/Singapore:${dtstart}`,
    `DTEND;TZID=Asia/Singapore:${dtend}`,
    `SUMMARY:${courseCode} - ${section.sectionId}`,
    `DESCRIPTION:${courseName}\\nInstructor: ${section.instructor}${section.notes ? '\\nNotes: ' + section.notes : ''}`,
  ];

  if (section.venue) {
    lines.push(`LOCATION:${section.venue}`);
  }

  // Add recurrence rule (repeat weekly for 13 weeks - typical semester length)
  lines.push(`RRULE:FREQ=WEEKLY;COUNT=13;BYDAY=${getDayAbbreviation(section.day)}`);

  lines.push('END:VEVENT');

  return lines;
}

/**
 * Gets the ICS day abbreviation (MO, TU, WE, etc.)
 */
function getDayAbbreviation(day: DayOfWeek): string {
  const abbrev: Record<DayOfWeek, string> = {
    Monday: 'MO',
    Tuesday: 'TU',
    Wednesday: 'WE',
    Thursday: 'TH',
    Friday: 'FR',
    Saturday: 'SA',
    Sunday: 'SU',
  };
  return abbrev[day];
}

/**
 * Downloads a file with the given content
 * @param content - File content
 * @param filename - Name of the file
 * @param mimeType - MIME type of the file
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Encodes a schedule into a URL-safe string
 * @param schedule - The schedule to encode
 * @returns Base64 encoded string
 */
export function encodeScheduleToURL(schedule: Schedule): string {
  try {
    const json = JSON.stringify(schedule);
    // Use base64 encoding for URL safety
    const base64 = btoa(encodeURIComponent(json));
    return base64;
  } catch (error) {
    console.error('Error encoding schedule:', error);
    return '';
  }
}

/**
 * Decodes a schedule from a URL-safe string
 * @param encoded - The encoded string
 * @returns Decoded schedule or null if invalid
 */
export function decodeScheduleFromURL(encoded: string): Schedule | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    const schedule = JSON.parse(json) as Schedule;
    return schedule;
  } catch (error) {
    console.error('Error decoding schedule:', error);
    return null;
  }
}

/**
 * Generates a shareable URL for a schedule
 * @param schedule - The schedule to share
 * @returns Full URL with encoded schedule data
 */
export function generateShareableURL(schedule: Schedule): string {
  const encoded = encodeScheduleToURL(schedule);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?schedule=${encoded}`;
}

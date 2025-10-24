/**
 * Core Type Definitions for Plan-Like-A-BOSS
 * Defines all the interfaces and types for courses, sections, schedules, and state management
 */

export type DayOfWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export type Theme = 'light' | 'dark';

/**
 * Represents a single section of a course (e.g., G1, G2, L1)
 */
export interface Section {
  id: string; // Unique identifier for the section
  sectionId: string; // Display ID (e.g., "G1", "G2")
  day: DayOfWeek;
  startTime: string; // Format: "HH:mm" (24-hour format)
  endTime: string; // Format: "HH:mm" (24-hour format)
  instructor: string;
  venue?: string; // Optional venue/location
  notes?: string; // Optional notes (e.g., bidding price, preferences)
  isSelected: boolean; // Whether this section is currently selected for the schedule
  hasConflict: boolean; // Whether this section has a time conflict with another
}

/**
 * Represents a course/module (e.g., CS202)
 */
export interface Course {
  id: string; // Unique identifier
  courseCode: string; // e.g., "CS202"
  courseName: string; // e.g., "Design and Analysis of Algorithms"
  sections: Section[]; // Array of all available sections
  color: string; // Hex color for visual representation on calendar
}

/**
 * Represents a complete schedule/timetable draft
 */
export interface Schedule {
  id: string; // Unique identifier
  name: string; // User-defined name (e.g., "Dream Schedule", "Backup Plan")
  courses: Course[]; // All courses in this schedule
  createdAt: number; // Timestamp
  updatedAt: number; // Timestamp
}

/**
 * Time block representation for conflict detection
 * Converts day + time into a numerical range for easy comparison
 */
export interface TimeBlock {
  day: DayOfWeek;
  dayIndex: number; // 0-6 (Monday = 0)
  startMinutes: number; // Minutes from start of week (0-10080)
  endMinutes: number; // Minutes from start of week (0-10080)
  courseId: string;
  sectionId: string;
}

/**
 * Represents a conflict between two or more sections
 */
export interface Conflict {
  sectionIds: string[]; // Array of section IDs that are conflicting
  courseIds: string[]; // Array of course IDs involved
  timeBlock: TimeBlock; // The overlapping time block
}

/**
 * Application state structure for Zustand store
 */
export interface AppState {
  // Schedules
  schedules: Schedule[];
  currentScheduleId: string | null;

  // Theme
  theme: Theme;

  // UI State
  isCommandPaletteOpen: boolean;
  isSidebarCollapsed: boolean;

  // Actions - Schedule Management
  createSchedule: (name: string) => void;
  deleteSchedule: (scheduleId: string) => void;
  renameSchedule: (scheduleId: string, name: string) => void;
  setCurrentSchedule: (scheduleId: string) => void;
  duplicateSchedule: (scheduleId: string) => void;

  // Actions - Course Management
  addCourse: (courseCode: string, courseName: string) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;

  // Actions - Section Management
  addSection: (courseId: string, section: Omit<Section, 'id' | 'isSelected' | 'hasConflict'>) => void;
  deleteSection: (courseId: string, sectionId: string) => void;
  updateSection: (courseId: string, sectionId: string, updates: Partial<Section>) => void;
  toggleSectionSelection: (courseId: string, sectionId: string) => void;

  // Actions - Theme
  toggleTheme: () => void;

  // Actions - UI
  toggleCommandPalette: () => void;
  toggleSidebar: () => void;

  // Actions - Data Management
  loadFromURL: (encodedData: string) => void;
  exportToURL: () => string;
  clearAllData: () => void;

  // Computed - Get current schedule
  getCurrentSchedule: () => Schedule | null;

  // Computed - Get all conflicts in current schedule
  getConflicts: () => Conflict[];

  // Internal - Check and update conflicts (not part of public API but needed for implementation)
  checkAndUpdateConflicts?: () => void;
}

/**
 * Props for calendar event blocks
 */
export interface CalendarEvent {
  id: string;
  courseCode: string;
  courseName: string;
  sectionId: string;
  instructor: string;
  venue?: string;
  day: DayOfWeek;
  startTime: string;
  endTime: string;
  color: string;
  hasConflict: boolean;
}

/**
 * Command palette action type
 */
export interface CommandAction {
  id: string;
  label: string;
  shortcut?: string;
  icon?: string;
  action: () => void;
  category: 'schedule' | 'course' | 'view' | 'export';
}

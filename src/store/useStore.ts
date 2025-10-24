/**
 * Zustand Store - Central State Management
 * Manages all application state with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Schedule, Course, Section, Conflict, TimeBlock } from '@/types';
import { sectionToTimeBlock, timeBlocksOverlap } from '@/utils/timeUtils';
import { getColorForCourseCode } from '@/utils/colorUtils';
import { decodeScheduleFromURL } from '@/utils/exportUtils';

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Create the Zustand store with persistence
 */
export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Initial State
      schedules: [],
      currentScheduleId: null,
      theme: 'dark',
      isCommandPaletteOpen: false,
      isSidebarCollapsed: false,

      // Schedule Management Actions
      createSchedule: (name: string) => {
        const newSchedule: Schedule = {
          id: generateId(),
          name,
          courses: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          schedules: [...state.schedules, newSchedule],
          currentScheduleId: newSchedule.id,
        }));
      },

      deleteSchedule: (scheduleId: string) => {
        set((state) => {
          const newSchedules = state.schedules.filter((s) => s.id !== scheduleId);
          const newCurrentId =
            state.currentScheduleId === scheduleId
              ? newSchedules[0]?.id || null
              : state.currentScheduleId;

          return {
            schedules: newSchedules,
            currentScheduleId: newCurrentId,
          };
        });
      },

      renameSchedule: (scheduleId: string, name: string) => {
        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === scheduleId
              ? { ...schedule, name, updatedAt: Date.now() }
              : schedule
          ),
        }));
      },

      setCurrentSchedule: (scheduleId: string) => {
        set({ currentScheduleId: scheduleId });
      },

      duplicateSchedule: (scheduleId: string) => {
        const schedule = get().schedules.find((s) => s.id === scheduleId);
        if (!schedule) return;

        const duplicated: Schedule = {
          ...schedule,
          id: generateId(),
          name: `${schedule.name} (Copy)`,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          courses: schedule.courses.map((course) => ({
            ...course,
            id: generateId(),
            sections: course.sections.map((section) => ({
              ...section,
              id: generateId(),
            })),
          })),
        };

        set((state) => ({
          schedules: [...state.schedules, duplicated],
          currentScheduleId: duplicated.id,
        }));
      },

      // Course Management Actions
      addCourse: (courseCode: string, courseName: string) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        const newCourse: Course = {
          id: generateId(),
          courseCode,
          courseName,
          sections: [],
          color: getColorForCourseCode(courseCode),
        };

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: [...schedule.courses, newCourse],
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));
      },

      deleteCourse: (courseId: string) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.filter((c) => c.id !== courseId),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));
      },

      updateCourse: (courseId: string, updates: Partial<Course>) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) =>
                    course.id === courseId ? { ...course, ...updates } : course
                  ),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));
      },

      // Section Management Actions
      addSection: (
        courseId: string,
        section: Omit<Section, 'id' | 'isSelected' | 'hasConflict'>
      ) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        const newSection: Section = {
          ...section,
          id: generateId(),
          isSelected: false,
          hasConflict: false,
        };

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) =>
                    course.id === courseId
                      ? { ...course, sections: [...course.sections, newSection] }
                      : course
                  ),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));
      },

      deleteSection: (courseId: string, sectionId: string) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) =>
                    course.id === courseId
                      ? {
                          ...course,
                          sections: course.sections.filter((s) => s.id !== sectionId),
                        }
                      : course
                  ),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));

        // Recheck conflicts after deletion
        get().checkAndUpdateConflicts?.();
      },

      updateSection: (courseId: string, sectionId: string, updates: Partial<Section>) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) =>
                    course.id === courseId
                      ? {
                          ...course,
                          sections: course.sections.map((section) =>
                            section.id === sectionId ? { ...section, ...updates } : section
                          ),
                        }
                      : course
                  ),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));

        // Recheck conflicts after update
        get().checkAndUpdateConflicts?.();
      },

      toggleSectionSelection: (courseId: string, sectionId: string) => {
        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) =>
                    course.id === courseId
                      ? {
                          ...course,
                          sections: course.sections.map((section) =>
                            section.id === sectionId
                              ? { ...section, isSelected: !section.isSelected }
                              : section
                          ),
                        }
                      : course
                  ),
                  updatedAt: Date.now(),
                }
              : schedule
          ),
        }));

        // Check for conflicts after toggling
        get().checkAndUpdateConflicts?.();
      },

      // Helper method to check and update conflicts (not exposed in AppState interface)
      checkAndUpdateConflicts: () => {
        const conflicts = get().getConflicts();
        const conflictingSectionIds = new Set<string>();

        conflicts.forEach((conflict) => {
          conflict.sectionIds.forEach((id) => conflictingSectionIds.add(id));
        });

        const currentScheduleId = get().currentScheduleId;
        if (!currentScheduleId) return;

        set((state) => ({
          schedules: state.schedules.map((schedule) =>
            schedule.id === currentScheduleId
              ? {
                  ...schedule,
                  courses: schedule.courses.map((course) => ({
                    ...course,
                    sections: course.sections.map((section) => ({
                      ...section,
                      hasConflict: conflictingSectionIds.has(section.id),
                    })),
                  })),
                }
              : schedule
          ),
        }));
      },

      // Theme Actions
      toggleTheme: () => {
        set((state) => ({
          theme: state.theme === 'dark' ? 'light' : 'dark',
        }));

        // Update document class
        const newTheme = get().theme;
        if (newTheme === 'light') {
          document.body.classList.add('light');
        } else {
          document.body.classList.remove('light');
        }
      },

      // UI Actions
      toggleCommandPalette: () => {
        set((state) => ({
          isCommandPaletteOpen: !state.isCommandPaletteOpen,
        }));
      },

      toggleSidebar: () => {
        set((state) => ({
          isSidebarCollapsed: !state.isSidebarCollapsed,
        }));
      },

      // Data Management Actions
      loadFromURL: (encodedData: string) => {
        const schedule = decodeScheduleFromURL(encodedData);
        if (schedule) {
          // Give it a new ID and mark as imported
          const importedSchedule: Schedule = {
            ...schedule,
            id: generateId(),
            name: `${schedule.name} (Imported)`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          };

          set((state) => ({
            schedules: [...state.schedules, importedSchedule],
            currentScheduleId: importedSchedule.id,
          }));
        }
      },

      exportToURL: () => {
        const schedule = get().getCurrentSchedule();
        if (!schedule) return '';

        try {
          const json = JSON.stringify(schedule);
          return btoa(encodeURIComponent(json));
        } catch {
          return '';
        }
      },

      clearAllData: () => {
        set({
          schedules: [],
          currentScheduleId: null,
        });
      },

      // Computed Methods
      getCurrentSchedule: () => {
        const state = get();
        return state.schedules.find((s) => s.id === state.currentScheduleId) || null;
      },

      getConflicts: () => {
        const schedule = get().getCurrentSchedule();
        if (!schedule) return [];

        const conflicts: Conflict[] = [];
        const timeBlocks: TimeBlock[] = [];

        // Collect all selected sections as time blocks
        schedule.courses.forEach((course) => {
          course.sections
            .filter((section) => section.isSelected)
            .forEach((section) => {
              timeBlocks.push(sectionToTimeBlock(section, course.id));
            });
        });

        // Check for overlaps
        for (let i = 0; i < timeBlocks.length; i++) {
          for (let j = i + 1; j < timeBlocks.length; j++) {
            if (timeBlocksOverlap(timeBlocks[i], timeBlocks[j])) {
              conflicts.push({
                sectionIds: [timeBlocks[i].sectionId, timeBlocks[j].sectionId],
                courseIds: [timeBlocks[i].courseId, timeBlocks[j].courseId],
                timeBlock: timeBlocks[i],
              });
            }
          }
        }

        return conflicts;
      },
    }),
    {
      name: 'plan-like-a-boss-storage',
      // Only persist certain fields
      partialize: (state) => ({
        schedules: state.schedules,
        currentScheduleId: state.currentScheduleId,
        theme: state.theme,
        isSidebarCollapsed: state.isSidebarCollapsed,
      }),
    }
  )
);

// Initialize theme on load
if (useStore.getState().theme === 'light') {
  document.body.classList.add('light');
}

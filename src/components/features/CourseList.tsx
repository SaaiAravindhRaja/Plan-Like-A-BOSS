/**
 * CourseList Component
 * Displays all courses and their sections with management capabilities
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle,
  Info,
  DollarSign,
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Course, Section } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatTimeDisplay } from '@/utils/timeUtils';
import { AddCourseModal } from './AddCourseModal';
import { AddSectionModal } from './AddSectionModal';
import { CourseBrowser } from './CourseBrowser';
import { CourseDetailModal } from '@/components/CourseDetailModal';

export function CourseList() {
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);
  const deleteCourse = useStore((state) => state.deleteCourse);
  const toggleSectionSelection = useStore((state) => state.toggleSectionSelection);
  const deleteSection = useStore((state) => state.deleteSection);

  const [expandedCourses, setExpandedCourses] = useState<Set<string>>(new Set());
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isCourseBrowserOpen, setIsCourseBrowserOpen] = useState(false);
  const [addSectionCourseId, setAddSectionCourseId] = useState<string | null>(null);
  const [detailCourse, setDetailCourse] = useState<{ code: string; name: string } | null>(null);

  const schedule = getCurrentSchedule();

  const toggleCourse = (courseId: string) => {
    const newExpanded = new Set(expandedCourses);
    if (newExpanded.has(courseId)) {
      newExpanded.delete(courseId);
    } else {
      newExpanded.add(courseId);
    }
    setExpandedCourses(newExpanded);
  };

  if (!schedule) {
    return null;
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-dark-border">
        <h2 className="text-xl font-bold text-white mb-4">
          My Courses
        </h2>

        <div className="space-y-2">
          <Button
            variant="secondary"
            size="md"
            fullWidth
            onClick={() => setIsCourseBrowserOpen(true)}
          >
            Browse SCIS Courses
          </Button>
          <Button
            variant="ghost"
            size="md"
            fullWidth
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsAddCourseOpen(true)}
          >
            Add Custom Course
          </Button>
        </div>

        {schedule.courses.length > 0 && (
          <div className="mt-4 text-sm text-dark-text-secondary">
            {schedule.courses.length} course{schedule.courses.length !== 1 ? 's' : ''} added
          </div>
        )}
      </div>

      {/* Course List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {schedule.courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-elevated flex items-center justify-center">
              <Plus className="w-8 h-8 text-dark-text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              No courses yet
            </h3>
            <p className="text-sm text-dark-text-secondary mb-6 max-w-xs mx-auto">
              Start building your schedule by browsing SCIS courses or adding a custom course
            </p>
            <div className="space-y-2 max-w-xs mx-auto">
              <Button
                fullWidth
                onClick={() => setIsCourseBrowserOpen(true)}
              >
                Browse SCIS Courses
              </Button>
              <Button
                fullWidth
                variant="ghost"
                onClick={() => setIsAddCourseOpen(true)}
              >
                Add Custom Course
              </Button>
            </div>
          </div>
        ) : (
          <AnimatePresence>
            {schedule.courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isExpanded={expandedCourses.has(course.id)}
                onToggle={() => toggleCourse(course.id)}
                onDelete={() => deleteCourse(course.id)}
                onAddSection={() => setAddSectionCourseId(course.id)}
                onToggleSection={(sectionId) =>
                  toggleSectionSelection(course.id, sectionId)
                }
                onDeleteSection={(sectionId) => deleteSection(course.id, sectionId)}
                onViewDetails={() => setDetailCourse({ code: course.courseCode, name: course.courseName })}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Modals */}
      <CourseBrowser
        isOpen={isCourseBrowserOpen}
        onClose={() => setIsCourseBrowserOpen(false)}
      />

      <AddCourseModal
        isOpen={isAddCourseOpen}
        onClose={() => setIsAddCourseOpen(false)}
      />

      {addSectionCourseId && (
        <AddSectionModal
          courseId={addSectionCourseId}
          isOpen={true}
          onClose={() => setAddSectionCourseId(null)}
        />
      )}

      {detailCourse && (
        <CourseDetailModal
          isOpen={true}
          onClose={() => setDetailCourse(null)}
          courseCode={detailCourse.code}
          courseName={detailCourse.name}
        />
      )}
    </div>
  );
}

interface CourseCardProps {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onAddSection: () => void;
  onToggleSection: (sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onViewDetails: () => void;
}

function CourseCard({
  course,
  isExpanded,
  onToggle,
  onDelete,
  onAddSection,
  onToggleSection,
  onDeleteSection,
  onViewDetails,
}: CourseCardProps) {
  const selectedSections = course.sections.filter((s) => s.isSelected);
  const conflictingSections = course.sections.filter((s) => s.hasConflict);

  return (
    <Card padding="none" className="overflow-hidden border-dark-border">
      {/* Course Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <button
            onClick={onToggle}
            className="flex-1 flex items-start gap-2 text-left group"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 0 : -90 }}
              className="mt-0.5 text-dark-text-secondary group-hover:text-dark-text transition-colors"
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: course.color }}
                />
                <h3 className="font-bold text-white truncate">
                  {course.courseCode}
                </h3>
              </div>
              <p className="text-sm text-dark-text-secondary truncate mb-2">
                {course.courseName}
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge variant="info">
                  {selectedSections.length} selected
                </Badge>
                {conflictingSections.length > 0 && (
                  <Badge variant="error">
                    <AlertCircle className="w-3 h-3" />
                    {conflictingSections.length} conflict{conflictingSections.length !== 1 ? 's' : ''}
                  </Badge>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                  }}
                  className="flex items-center gap-1 px-2 py-1 text-xs bg-accent-blue/20 text-accent-blue rounded hover:bg-accent-blue/30 transition-colors"
                >
                  <Info className="w-3 h-3" />
                  <span>BOSS Data</span>
                </button>
              </div>
            </div>
          </button>

          <button
            onClick={onDelete}
            className="p-2 text-dark-text-secondary hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sections */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-dark-border bg-dark-elevated/20 p-5 space-y-2">
              {course.sections.length === 0 ? (
                <p className="text-sm text-dark-text-secondary dark:text-dark-text-secondary text-center py-4">
                  No sections added
                </p>
              ) : (
                course.sections.map((section) => (
                  <SectionItem
                    key={section.id}
                    section={section}
                    courseId={course.id}
                    courseColor={course.color}
                    onToggle={() => onToggleSection(section.id)}
                    onDelete={() => onDeleteSection(section.id)}
                  />
                ))
              )}

              <Button
                variant="ghost"
                size="sm"
                fullWidth
                icon={<Plus className="w-4 h-4" />}
                onClick={onAddSection}
              >
                Add Section
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

interface SectionItemProps {
  section: Section;
  courseId: string;
  courseColor: string;
  onToggle: () => void;
  onDelete: () => void;
}

function SectionItem({ section, courseId, courseColor, onToggle, onDelete }: SectionItemProps) {
  const updateSection = useStore((state) => state.updateSection);

  const handleBidChange = (value: string) => {
    const bidAmount = value === '' ? undefined : parseInt(value, 10);
    if (value !== '' && (isNaN(bidAmount!) || bidAmount! < 0)) return;
    updateSection(courseId, section.id, { bidAmount });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      className={`
        p-3 rounded-lg border transition-all cursor-pointer
        ${
          section.isSelected
            ? 'bg-dark-elevated border-accent-blue'
            : 'bg-dark-surface/50 border-dark-border hover:border-dark-text-secondary/30'
        }
        ${section.hasConflict ? 'border-red-500 bg-red-950/20' : ''}
      `}
    >
      <div className="flex items-start justify-between gap-3">
        <button onClick={onToggle} className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: section.isSelected ? courseColor : '#666' }}
            />
            <span className="font-bold text-sm text-white">
              {section.sectionId}
            </span>
            {section.isSelected && (
              <CheckCircle className="w-4 h-4 text-accent-blue" />
            )}
            {section.hasConflict && (
              <AlertCircle className="w-4 h-4 text-smu-red" />
            )}
          </div>

          <div className="text-xs space-y-1 text-dark-text-secondary">
            <div className="font-medium">
              {section.day}, {formatTimeDisplay(section.startTime)} -{' '}
              {formatTimeDisplay(section.endTime)}
            </div>
            <div>{section.instructor}</div>
            {section.venue && <div>{section.venue}</div>}
          </div>
        </button>

        <button
          onClick={onDelete}
          className="p-1 text-dark-text-secondary hover:text-red-500 transition-colors"
        >
          <Trash2 className="w-3 h-3" />
        </button>
      </div>

      {/* Bid Amount Input */}
      {section.isSelected && (
        <div className="mt-2 pt-2 border-t border-dark-border/50">
          <label className="flex items-center gap-2 text-xs text-dark-text-secondary mb-1">
            <DollarSign className="w-3 h-3" />
            <span>Bid Amount (e-dollars)</span>
          </label>
          <input
            type="number"
            min="0"
            value={section.bidAmount ?? ''}
            onChange={(e) => handleBidChange(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            placeholder="Enter your bid"
            className="w-full px-3 py-2 bg-dark-surface border border-dark-border rounded-lg text-white text-sm
                     focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue
                     placeholder:text-dark-text-secondary"
          />
        </div>
      )}
    </motion.div>
  );
}

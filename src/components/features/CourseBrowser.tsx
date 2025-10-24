/**
 * Course Browser Component - PRODUCTION READY
 * Browse and add pre-loaded SCIS courses with REAL section timings
 * Enhanced with advanced filtering, statistics, and SMU-ready features
 */

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, BookOpen, Users, X, Filter, DollarSign, Info } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import {
  searchCourses,
  PreloadedCourse,
  getCoursesByPrefix,
  COURSE_STATS
} from '@/data/scis-courses';
import { getCourseData } from '@/data/boss-data';
import { CourseDetailModal } from '@/components/CourseDetailModal';

interface CourseBrowserProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CourseBrowser({ isOpen, onClose }: CourseBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<PreloadedCourse | null>(null);
  const [prefixFilter, setPrefixFilter] = useState<string>('all');
  const [detailCourse, setDetailCourse] = useState<{ code: string; name: string } | null>(null);

  const addCourse = useStore((state) => state.addCourse);
  const addSection = useStore((state) => state.addSection);

  const filteredCourses = useMemo(() => {
    let courses = searchCourses(searchQuery);

    // Filter by prefix
    if (prefixFilter !== 'all') {
      courses = getCoursesByPrefix(prefixFilter);
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        courses = courses.filter(c =>
          c.courseCode.toLowerCase().includes(query) ||
          c.courseName.toLowerCase().includes(query)
        );
      }
    }

    return courses;
  }, [searchQuery, prefixFilter]);

  const handleAddCourse = (course: PreloadedCourse) => {
    // Add the course
    addCourse(course.courseCode, course.courseName);

    // Get the course ID (it's the last one added)
    const getCurrentSchedule = useStore.getState().getCurrentSchedule;
    const schedule = getCurrentSchedule();
    if (!schedule) return;

    const addedCourse = schedule.courses[schedule.courses.length - 1];

    // Add all sections
    course.sections.forEach((section) => {
      addSection(addedCourse.id, {
        sectionId: section.sectionId,
        day: section.day,
        startTime: section.startTime,
        endTime: section.endTime,
        instructor: section.instructor,
        venue: section.venue,
        notes: section.notes,
      });
    });

    setSelectedCourse(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Browse SCIS Courses (2025-2026)"
      size="xl"
    >
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-white mb-1">
              SCIS Course Catalog
            </h3>
            <p className="text-sm text-dark-text-secondary">
              {COURSE_STATS.totalCourses} courses available for Term 2 2025-2026
            </p>
          </div>
          <div className="text-xs text-dark-text-secondary">
            Last updated: {new Date(COURSE_STATS.lastUpdated).toLocaleDateString('en-SG', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative group">
          <Input
            placeholder="Search by course code or name... (e.g., CS202, Data Analytics)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            icon={<Search className="w-4 h-4" />}
            className="pr-20"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-dark-elevated transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-text-secondary pointer-events-none z-10" />
          <select
            value={prefixFilter}
            onChange={(e) => setPrefixFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-dark-elevated border border-dark-border text-dark-text focus:outline-none focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="all">All Departments</option>
            <option value="CS">CS - Computer Science</option>
            <option value="IS">IS - Information Systems</option>
            <option value="SE">SE - Software Engineering</option>
            <option value="COR">COR - Core Courses</option>
            <option value="SMT">SMT - Smart-City Mgmt</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-dark-text-secondary">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} with{' '}
            {filteredCourses.reduce((sum, c) => sum + c.sections.length, 0)} section{filteredCourses.reduce((sum, c) => sum + c.sections.length, 0) !== 1 ? 's' : ''}
          </div>
          {(prefixFilter !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setPrefixFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-accent-blue hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Course List */}
        <div className="max-h-96 overflow-y-auto space-y-2 pr-2">
          <AnimatePresence>
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.courseCode}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.02 }}
              >
                <Card
                  padding="sm"
                  className="hover:border-dark-text-secondary/30 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                  onClick={() => setSelectedCourse(course)}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >

                  <div className="relative flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h4 className="font-bold text-white">
                          {course.courseCode}
                        </h4>
                        <Badge variant="default">
                          <Users className="w-3 h-3" />
                          {course.sections.length} section{course.sections.length !== 1 ? 's' : ''}
                        </Badge>
                        {(() => {
                          const bossData = getCourseData(course.courseCode);
                          if (bossData) {
                            const allRecords = bossData.sections.flatMap(s => s.biddingHistory);
                            const medianBids = allRecords.map(r => r.medianBid).filter(b => b > 0);
                            if (medianBids.length > 0) {
                              const avgBid = Math.round(medianBids.reduce((a, b) => a + b, 0) / medianBids.length);
                              return (
                                <Badge variant="success" className="flex items-center gap-1">
                                  <DollarSign className="w-3 h-3" />
                                  {avgBid}
                                </Badge>
                              );
                            }
                          }
                          return null;
                        })()}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDetailCourse({ code: course.courseCode, name: course.courseName });
                          }}
                          className="flex items-center gap-1 px-2 py-0.5 text-xs bg-accent-blue/20 text-accent-blue rounded hover:bg-accent-blue/30 transition-colors"
                        >
                          <Info className="w-3 h-3" />
                          <span>View Bids</span>
                        </button>
                      </div>
                      <p className="text-sm text-dark-text-secondary dark:text-dark-text-secondary line-clamp-1">
                        {course.courseName}
                      </p>

                      {/* Show instructors */}
                      <div className="mt-2 flex flex-wrap gap-1">
                        {Array.from(new Set(course.sections.map(s => s.instructor).filter(i => i !== 'TBA')))
                          .slice(0, 3)
                          .map((instructor) => (
                            <span
                              key={instructor}
                              className="text-xs px-2 py-0.5 bg-dark-elevated dark:bg-dark-elevated rounded-full text-dark-text-secondary"
                            >
                              {instructor}
                            </span>
                          ))}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      icon={<Plus className="w-4 h-4" />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddCourse(course);
                      }}
                      className="flex-shrink-0"
                    >
                      Add
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-dark-text-secondary mx-auto mb-3 opacity-50" />
              <p className="text-dark-text-secondary dark:text-dark-text-secondary">
                No courses found matching "{searchQuery}"
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Course Details Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedCourse(null)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative glass rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedCourse.courseCode}
                </h3>
                <p className="text-dark-text-secondary">
                  {selectedCourse.courseName}
                </p>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="p-2 rounded-lg hover:bg-dark-elevated transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 mb-6">
              <h4 className="font-semibold text-white mb-3">
                Available Sections ({selectedCourse.sections.length})
              </h4>
              {selectedCourse.sections.map((section) => (
                <Card key={section.sectionId} padding="sm" className="text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-smu-red">{section.sectionId}</span>
                        <span className="text-white">
                          {section.day}, {section.startTime} - {section.endTime}
                        </span>
                      </div>
                      <span className="text-dark-text-secondary">{section.instructor}</span>
                    </div>
                    {section.venue && (
                      <div className="text-xs text-dark-text-secondary">
                        {section.venue}
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>

            <Button fullWidth onClick={() => handleAddCourse(selectedCourse)}>
              Add {selectedCourse.courseCode} to Schedule
            </Button>
          </motion.div>
        </div>
      )}

      {/* BOSS Data Detail Modal */}
      {detailCourse && (
        <CourseDetailModal
          isOpen={true}
          onClose={() => setDetailCourse(null)}
          courseCode={detailCourse.code}
          courseName={detailCourse.name}
        />
      )}
    </Modal>
  );
}

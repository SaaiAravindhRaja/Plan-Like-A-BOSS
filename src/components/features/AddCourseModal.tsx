/**
 * AddCourseModal Component
 * Modal for adding a new course
 */

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { BookOpen } from 'lucide-react';

interface AddCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddCourseModal({ isOpen, onClose }: AddCourseModalProps) {
  const addCourse = useStore((state) => state.addCourse);
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [errors, setErrors] = useState<{ code?: string; name?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: { code?: string; name?: string } = {};
    if (!courseCode.trim()) {
      newErrors.code = 'Course code is required';
    }
    if (!courseName.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add course
    addCourse(courseCode.trim(), courseName.trim());

    // Reset and close
    setCourseCode('');
    setCourseName('');
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setCourseCode('');
    setCourseName('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Custom Course"
      footer={
        <div className="flex gap-3">
          <Button variant="ghost" onClick={handleClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="flex-1">Add Course</Button>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Course Code"
          placeholder="e.g., CS202"
          value={courseCode}
          onChange={(e) => setCourseCode(e.target.value)}
          error={errors.code}
          icon={<BookOpen className="w-4 h-4" />}
          autoFocus
        />

        <Input
          label="Course Name"
          placeholder="e.g., Design and Analysis of Algorithms"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          error={errors.name}
        />

        <div className="bg-dark-elevated border border-dark-border rounded-lg p-4">
          <p className="text-xs text-dark-text-secondary leading-relaxed">
            💡 Tip: After adding the course, you can add sections with specific timings, instructors, and venues.
          </p>
        </div>
      </form>
    </Modal>
  );
}

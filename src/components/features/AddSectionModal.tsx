/**
 * AddSectionModal Component
 * Modal for adding a new section to a course
 */

import { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useStore } from '@/store/useStore';
import { DayOfWeek } from '@/types';
import { isValidTimeFormat, isValidTimeRange } from '@/utils/timeUtils';
import { Hash, User, MapPin, DollarSign } from 'lucide-react';

interface AddSectionModalProps {
  courseId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DAYS: DayOfWeek[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export function AddSectionModal({ courseId, isOpen, onClose }: AddSectionModalProps) {
  const addSection = useStore((state) => state.addSection);

  const [sectionId, setSectionId] = useState('');
  const [day, setDay] = useState<DayOfWeek>('Monday');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:30');
  const [instructor, setInstructor] = useState('');
  const [venue, setVenue] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const newErrors: Record<string, string> = {};

    if (!sectionId.trim()) {
      newErrors.sectionId = 'Section ID is required';
    }

    if (!isValidTimeFormat(startTime)) {
      newErrors.startTime = 'Invalid time format (use HH:mm)';
    }

    if (!isValidTimeFormat(endTime)) {
      newErrors.endTime = 'Invalid time format (use HH:mm)';
    }

    if (
      isValidTimeFormat(startTime) &&
      isValidTimeFormat(endTime) &&
      !isValidTimeRange(startTime, endTime)
    ) {
      newErrors.endTime = 'End time must be after start time';
    }

    if (!instructor.trim()) {
      newErrors.instructor = 'Instructor name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Add section
    addSection(courseId, {
      sectionId: sectionId.trim(),
      day,
      startTime,
      endTime,
      instructor: instructor.trim(),
      venue: venue.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    // Reset and close
    handleClose();
  };

  const handleClose = () => {
    setSectionId('');
    setDay('Monday');
    setStartTime('09:00');
    setEndTime('10:30');
    setInstructor('');
    setVenue('');
    setNotes('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Section"
      size="lg"
      footer={
        <>
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Section</Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Section ID"
            placeholder="e.g., G1, G2, L1"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
            error={errors.sectionId}
            icon={<Hash className="w-4 h-4" />}
            autoFocus
          />

          <Select
            label="Day of Week"
            value={day}
            onChange={(e) => setDay(e.target.value as DayOfWeek)}
            options={DAYS.map((d) => ({ value: d, label: d }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="time"
            label="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            error={errors.startTime}
          />

          <Input
            type="time"
            label="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            error={errors.endTime}
          />
        </div>

        <Input
          label="Instructor"
          placeholder="e.g., Prof. John Doe"
          value={instructor}
          onChange={(e) => setInstructor(e.target.value)}
          error={errors.instructor}
          icon={<User className="w-4 h-4" />}
        />

        <Input
          label="Venue (Optional)"
          placeholder="e.g., SOE/SOSS GSR 2-1"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          icon={<MapPin className="w-4 h-4" />}
        />

        <Input
          label="Notes / Bidding Price (Optional)"
          placeholder="e.g., $50, High priority"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          icon={<DollarSign className="w-4 h-4" />}
          helperText="Add any notes or bidding estimates for BOSS"
        />

        <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-lg p-3">
          <p className="text-sm text-dark-text-secondary dark:text-dark-text-secondary">
            <strong>Tip:</strong> Add multiple sections to compare different timing options.
            The conflict detector will help you identify overlaps!
          </p>
        </div>
      </form>
    </Modal>
  );
}

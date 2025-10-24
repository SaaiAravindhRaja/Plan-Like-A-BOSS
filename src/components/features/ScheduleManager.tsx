/**
 * ScheduleManager Component
 * Modal for creating, renaming, duplicating, and deleting schedules
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Copy, Trash2, Edit2, Calendar } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { useStore } from '@/store/useStore';
import { Schedule } from '@/types';

interface ScheduleManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleManager({ isOpen, onClose }: ScheduleManagerProps) {
  const schedules = useStore((state) => state.schedules);
  const currentScheduleId = useStore((state) => state.currentScheduleId);
  const createSchedule = useStore((state) => state.createSchedule);
  const deleteSchedule = useStore((state) => state.deleteSchedule);
  const renameSchedule = useStore((state) => state.renameSchedule);
  const duplicateSchedule = useStore((state) => state.duplicateSchedule);
  const setCurrentSchedule = useStore((state) => state.setCurrentSchedule);

  const [newScheduleName, setNewScheduleName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleCreate = () => {
    if (newScheduleName.trim()) {
      createSchedule(newScheduleName.trim());
      setNewScheduleName('');
    }
  };

  const handleRename = (scheduleId: string) => {
    if (editingName.trim()) {
      renameSchedule(scheduleId, editingName.trim());
      setEditingId(null);
      setEditingName('');
    }
  };

  const handleDelete = (scheduleId: string) => {
    if (confirm('Are you sure you want to delete this schedule? This cannot be undone.')) {
      deleteSchedule(scheduleId);
    }
  };

  const startEditing = (schedule: Schedule) => {
    setEditingId(schedule.id);
    setEditingName(schedule.name);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Manage Schedules"
      size="lg"
    >
      <div className="space-y-6">
        {/* Create New Schedule */}
        <div>
          <h3 className="text-sm font-medium text-dark-text dark:text-dark-text mb-3">
            Create New Schedule
          </h3>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Dream Schedule, Backup Plan"
              value={newScheduleName}
              onChange={(e) => setNewScheduleName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleCreate();
                }
              }}
            />
            <Button
              icon={<Plus className="w-4 h-4" />}
              onClick={handleCreate}
              disabled={!newScheduleName.trim()}
            >
              Create
            </Button>
          </div>
        </div>

        {/* Existing Schedules */}
        <div>
          <h3 className="text-sm font-medium text-dark-text dark:text-dark-text mb-3">
            Your Schedules ({schedules.length})
          </h3>

          {schedules.length === 0 ? (
            <Card className="text-center py-8">
              <Calendar className="w-12 h-12 text-dark-text-secondary mx-auto mb-3" />
              <p className="text-dark-text-secondary dark:text-dark-text-secondary">
                No schedules yet. Create one to get started!
              </p>
            </Card>
          ) : (
            <div className="space-y-2">
              <AnimatePresence>
                {schedules.map((schedule) => (
                  <motion.div
                    key={schedule.id}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <Card
                      padding="sm"
                      className={`
                        transition-all
                        ${
                          currentScheduleId === schedule.id
                            ? 'ring-2 ring-accent-blue'
                            : ''
                        }
                      `}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          {editingId === schedule.id ? (
                            <div className="flex gap-2">
                              <Input
                                value={editingName}
                                onChange={(e) => setEditingName(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') {
                                    handleRename(schedule.id);
                                  } else if (e.key === 'Escape') {
                                    setEditingId(null);
                                    setEditingName('');
                                  }
                                }}
                                autoFocus
                              />
                              <Button
                                size="sm"
                                onClick={() => handleRename(schedule.id)}
                              >
                                Save
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => {
                                  setEditingId(null);
                                  setEditingName('');
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                setCurrentSchedule(schedule.id);
                                onClose();
                              }}
                              className="text-left w-full"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium text-dark-text dark:text-dark-text truncate">
                                  {schedule.name}
                                </h4>
                                {currentScheduleId === schedule.id && (
                                  <Badge variant="info">Active</Badge>
                                )}
                              </div>
                              <div className="text-sm text-dark-text-secondary dark:text-dark-text-secondary">
                                {schedule.courses.length} course
                                {schedule.courses.length !== 1 ? 's' : ''} •{' '}
                                {new Date(schedule.updatedAt).toLocaleDateString()}
                              </div>
                            </button>
                          )}
                        </div>

                        {editingId !== schedule.id && (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => startEditing(schedule)}
                              className="p-2 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors"
                              title="Rename"
                            >
                              <Edit2 className="w-4 h-4 text-dark-text-secondary" />
                            </button>

                            <button
                              onClick={() => {
                                duplicateSchedule(schedule.id);
                              }}
                              className="p-2 rounded-lg hover:bg-dark-elevated dark:hover:bg-dark-elevated transition-colors"
                              title="Duplicate"
                            >
                              <Copy className="w-4 h-4 text-dark-text-secondary" />
                            </button>

                            <button
                              onClick={() => handleDelete(schedule.id)}
                              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4 text-dark-text-secondary hover:text-red-500" />
                            </button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

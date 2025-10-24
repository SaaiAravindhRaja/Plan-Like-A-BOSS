/**
 * Course Detail Modal
 * Displays comprehensive course information including BOSS bidding history
 */

import { useState, useMemo } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Badge } from './ui/Badge';
import {
  TrendingUp, TrendingDown, Users, DollarSign,
  User, Info, BarChart3
} from 'lucide-react';
import { getCourseData, BiddingRecord } from '@/data/boss-data';

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseCode: string;
  courseName: string;
}

export function CourseDetailModal({ isOpen, onClose, courseCode, courseName }: CourseDetailModalProps) {
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);

  // Get BOSS bidding data
  const bossData = useMemo(() => getCourseData(courseCode), [courseCode]);

  // Calculate aggregate statistics
  const stats = useMemo(() => {
    if (!bossData) return null;

    const allRecords: BiddingRecord[] = [];
    bossData.sections.forEach(section => {
      allRecords.push(...section.biddingHistory);
    });

    if (allRecords.length === 0) return null;

    const medianBids = allRecords.map(r => r.medianBid).filter(b => b > 0);
    const minBids = allRecords.map(r => r.minBid).filter(b => b > 0);

    return {
      avgMedianBid: medianBids.length > 0
        ? Math.round(medianBids.reduce((a, b) => a + b, 0) / medianBids.length)
        : 0,
      maxMedianBid: medianBids.length > 0 ? Math.max(...medianBids) : 0,
      minMedianBid: medianBids.length > 0 ? Math.min(...medianBids) : 0,
      avgMinBid: minBids.length > 0
        ? Math.round(minBids.reduce((a, b) => a + b, 0) / minBids.length)
        : 0,
      totalSections: bossData.sections.length,
    };
  }, [bossData]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="space-y-6">
        {/* Course Header */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <div>
              <Badge variant="info" className="mb-2">{courseCode}</Badge>
              <h2 className="text-2xl font-bold text-white">{courseName}</h2>
            </div>
          </div>

          {bossData && stats && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="glass-card p-3 rounded-lg">
                <div className="flex items-center gap-2 text-dark-text-secondary text-xs mb-1">
                  <DollarSign className="w-3 h-3" />
                  <span>Avg Median Bid</span>
                </div>
                <div className="text-xl font-bold text-white">{stats.avgMedianBid}</div>
              </div>

              <div className="glass-card p-3 rounded-lg">
                <div className="flex items-center gap-2 text-dark-text-secondary text-xs mb-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>Max Median</span>
                </div>
                <div className="text-xl font-bold text-accent-cyan">{stats.maxMedianBid}</div>
              </div>

              <div className="glass-card p-3 rounded-lg">
                <div className="flex items-center gap-2 text-dark-text-secondary text-xs mb-1">
                  <TrendingDown className="w-3 h-3" />
                  <span>Min Median</span>
                </div>
                <div className="text-xl font-bold text-accent-green">{stats.minMedianBid}</div>
              </div>

              <div className="glass-card p-3 rounded-lg">
                <div className="flex items-center gap-2 text-dark-text-secondary text-xs mb-1">
                  <Users className="w-3 h-3" />
                  <span>Total Sections</span>
                </div>
                <div className="text-xl font-bold text-accent-purple">{stats.totalSections}</div>
              </div>
            </div>
          )}
        </div>

        {/* No data message */}
        {!bossData && (
          <div className="glass-card p-6 rounded-lg text-center">
            <Info className="w-12 h-12 text-dark-text-secondary mx-auto mb-3" />
            <p className="text-dark-text-secondary">
              No BOSS bidding data available for this course.
            </p>
          </div>
        )}

        {/* Sections List */}
        {bossData && bossData.sections.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-accent-blue" />
              <h3 className="text-lg font-semibold text-white">Section Bidding History</h3>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {bossData.sections.map((section) => {
                const latestRecord = section.biddingHistory[section.biddingHistory.length - 1];
                const isSelected = selectedSectionId === section.sectionId;

                return (
                  <div key={section.sectionId} className="glass-card rounded-lg overflow-hidden">
                    <button
                      onClick={() => setSelectedSectionId(isSelected ? null : section.sectionId)}
                      className="w-full p-4 text-left hover:bg-dark-elevated/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <Badge variant="default">{section.sectionId}</Badge>
                          <div className="flex items-center gap-2 text-sm text-dark-text-secondary">
                            <User className="w-4 h-4" />
                            <span>{section.instructor}</span>
                          </div>
                        </div>

                        {latestRecord && (
                          <div className="flex items-center gap-4 text-sm">
                            <div className="text-right">
                              <div className="text-xs text-dark-text-secondary">Median Bid</div>
                              <div className="text-lg font-bold text-accent-cyan">
                                {latestRecord.medianBid}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-dark-text-secondary">Min Bid</div>
                              <div className="text-lg font-bold text-accent-green">
                                {latestRecord.minBid}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {latestRecord && (
                        <div className="flex items-center gap-4 text-xs text-dark-text-secondary">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{latestRecord.enrolledStudents} enrolled</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>Vacancy: {latestRecord.vacancy}</span>
                          </div>
                        </div>
                      )}
                    </button>

                    {/* Expanded section details */}
                    {isSelected && section.biddingHistory.length > 0 && (
                      <div className="border-t border-dark-border p-4 bg-dark-bg/50">
                        <h4 className="text-sm font-semibold text-white mb-3">Bidding History</h4>
                        <div className="space-y-2">
                          {section.biddingHistory.map((record, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between p-3 rounded bg-dark-elevated/30 text-sm"
                            >
                              <div>
                                <div className="font-medium text-white">{record.term}</div>
                                <div className="text-xs text-dark-text-secondary">{record.biddingWindow}</div>
                              </div>

                              <div className="flex items-center gap-6">
                                <div className="text-right">
                                  <div className="text-xs text-dark-text-secondary">Median</div>
                                  <div className="font-bold text-accent-cyan">{record.medianBid}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-dark-text-secondary">Min</div>
                                  <div className="font-bold text-accent-green">{record.minBid}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-dark-text-secondary">Enrolled</div>
                                  <div className="font-bold text-white">{record.enrolledStudents}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs text-dark-text-secondary">Vacancy</div>
                                  <div className="font-bold text-dark-text-secondary">{record.vacancy}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-border">
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </Modal>
  );
}

/**
 * ShareModal Component
 * Modal for generating and sharing schedule URLs
 */

import { useState, useEffect } from 'react';
import { Check, Copy, Share2 } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useStore } from '@/store/useStore';
import { generateShareableURL } from '@/utils/exportUtils';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const getCurrentSchedule = useStore((state) => state.getCurrentSchedule);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const schedule = getCurrentSchedule();
      if (schedule) {
        const url = generateShareableURL(schedule);
        setShareUrl(url);
      }
    }
  }, [isOpen, getCurrentSchedule]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share Schedule"
      footer={
        <Button onClick={onClose}>Done</Button>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 p-4 bg-accent-blue/10 border border-accent-blue/30 rounded-lg">
          <Share2 className="w-5 h-5 text-accent-blue flex-shrink-0" />
          <div className="text-sm text-dark-text-secondary dark:text-dark-text-secondary">
            Share this link with your friends! They'll be able to view and import your
            schedule into their own planner.
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-dark-text dark:text-dark-text">
            Shareable Link
          </label>
          <div className="flex gap-2">
            <Input
              value={shareUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              onClick={handleCopy}
              variant={copied ? 'secondary' : 'primary'}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>

        <div className="bg-dark-elevated/50 dark:bg-dark-elevated/50 rounded-lg p-4">
          <h4 className="font-medium text-sm text-dark-text dark:text-dark-text mb-2">
            How it works
          </h4>
          <ul className="text-sm text-dark-text-secondary dark:text-dark-text-secondary space-y-1">
            <li>• The link contains your complete schedule data</li>
            <li>• Anyone with the link can view your schedule</li>
            <li>• They can import it and make their own modifications</li>
            <li>• Changes they make won't affect your original schedule</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
}

/**
 * Button Component
 * A beautiful, accessible button with multiple variants and animations
 */

import { forwardRef } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-smu-red text-white hover:bg-smu-red-light dark:hover:bg-smu-red-light shadow-lg shadow-smu-red/20',
  secondary:
    'bg-accent-blue text-white hover:bg-blue-600 dark:hover:bg-blue-600 shadow-lg shadow-accent-blue/20',
  ghost:
    'bg-transparent text-dark-text hover:bg-dark-elevated dark:text-dark-text dark:hover:bg-dark-elevated border border-dark-border',
  danger:
    'bg-red-600 text-white hover:bg-red-700 dark:hover:bg-red-700 shadow-lg shadow-red-600/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      icon,
      fullWidth = false,
      children,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`
          inline-flex items-center justify-center gap-2
          rounded-lg font-medium
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent-blue focus:ring-offset-2
          dark:focus:ring-offset-dark-bg
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : icon ? (
          <span className="flex-shrink-0">{icon}</span>
        ) : null}
        {children as React.ReactNode}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

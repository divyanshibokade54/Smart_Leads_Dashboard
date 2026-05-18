import { cn } from '../utils/helpers';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'w-full px-4 py-2.5 rounded-xl text-sm transition-all duration-200',
            'bg-white dark:bg-surface-800 border',
            'text-surface-900 dark:text-surface-100',
            'placeholder:text-surface-400 dark:placeholder:text-surface-500',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            error
              ? 'border-red-300 dark:border-red-700 focus:ring-red-500/20 focus:border-red-500'
              : 'border-surface-200 dark:border-surface-700 focus:ring-primary-500/20 focus:border-primary-500',
            className,
          )}
          {...props}
        />
        {error && <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">{error}</p>}
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-surface-500 dark:text-surface-400">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

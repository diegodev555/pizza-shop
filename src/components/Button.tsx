import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const MotionButton = motion('button');

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      isLoading = false,
      children,
      disabled,
      type = 'button',
      onClick,
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variants: Record<string, string> = {
      primary:
        'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 shadow-lg hover:shadow-xl',
      secondary:
        'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-500 shadow-md',
      outline:
        'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white focus:ring-red-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizes: Record<string, string> = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    return (
      <MotionButton
        // @ts-ignore - ref type conflict between React and Framer Motion
        ref={ref}
        type={type}
        className={`
          ${baseStyles}
          ${variants[variant]}
          ${sizes[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
        // @ts-ignore - motion props
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        // @ts-ignore - motion props
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        disabled={disabled || isLoading}
        onClick={onClick}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </MotionButton>
    );
  }
);

Button.displayName = 'Button';
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'new' | 'spicy';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge = ({
  children,
  variant = 'default',
  size = 'sm',
  className = '',
}: BadgeProps) => {
  const baseStyles = 'inline-flex items-center font-semibold rounded-full';

  const variants: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    error: 'bg-red-100 text-red-700',
    new: 'bg-blue-100 text-blue-700',
    spicy: 'bg-orange-100 text-orange-700',
  };

  const sizes: Record<string, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};
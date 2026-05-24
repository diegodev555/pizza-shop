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
  const baseStyles = 'inline-flex items-center font-semibold rounded-full backdrop-blur-md border';

  const variants: Record<string, string> = {
    default: 'bg-white/10 border-white/15 text-white/80',
    success: 'bg-green-500/15 border-green-400/20 text-green-300',
    warning: 'bg-amber-500/15 border-amber-400/20 text-amber-300',
    error: 'bg-red-500/15 border-red-400/20 text-red-300',
    new: 'bg-blue-500/15 border-blue-400/20 text-blue-300',
    spicy: 'bg-orange-500/15 border-orange-400/20 text-orange-300',
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
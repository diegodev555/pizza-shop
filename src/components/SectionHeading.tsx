interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export const SectionHeading = ({
  title,
  subtitle,
  centered = true,
  className = '',
}: SectionHeadingProps) => {
  return (
    <div
      className={`mb-12 ${centered ? 'text-center' : 'text-left'} ${className}`}
    >
      {subtitle && (
        <p className="text-red-600 font-semibold uppercase tracking-wider text-sm mb-2">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div
        className={`h-1 w-24 bg-red-600 rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
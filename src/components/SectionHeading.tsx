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
        <p className="text-red-400 font-semibold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 mb-4 leading-tight">
        {title}
      </h2>
      <div
        className={`h-0.5 w-20 bg-gradient-to-r from-red-500/70 to-amber-400/50 rounded-full ${
          centered ? 'mx-auto' : ''
        }`}
      />
    </div>
  );
};
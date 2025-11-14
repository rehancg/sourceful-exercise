export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center p-2">
      <div className="max-w-4xl w-full">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-medium text-[var(--color-text-primary-light)] mb-4">
          Create your brand in seconds,{' '}
          <span className="inline-block bg-[var(--color-text-primary-light)] text-white px-4 py-1 rounded-full">
            not weeks.
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="text-lg font-medium px-4 md:text-xl text-[var(--color-text-secondary-light)] max-w-2xl mx-auto">
          Bring your brand to life with professional visuals that are ready for launch.
        </p>
      </div>
    </section>
  );
}


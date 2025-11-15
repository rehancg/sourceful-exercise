export function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center p-2">
      <div className="max-w-4xl w-full">
        {/* Main Headline */}
        <h1 className="text-3xl md:text-5xl font-medium text-[var(--color-text-primary-light)] mb-4">
          Hi Rehan, create something {' '}
          <span className="inline-block bg-[var(--color-text-primary-light)] text-white px-4 py-1 rounded-full">
            iconic {' '}
          </span>
          {' '}today.
        </h1>
      </div>
    </section>
  );
}


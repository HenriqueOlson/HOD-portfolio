import { useEffect, useRef, useState, type FocusEvent } from 'react';

interface CarouselImage {
  src: string;
  alt: string;
}

interface Props {
  images: CarouselImage[];
  autoAdvanceMs?: number;
}

export default function PrototypeCarousel({ images, autoAdvanceMs = 5600 }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setPrefersReducedMotion(motionPreference.matches);
    updatePreference();
    motionPreference.addEventListener('change', updatePreference);

    return () => motionPreference.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    if (images.length < 2 || isPaused || isExpanded || prefersReducedMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % images.length);
    }, autoAdvanceMs);

    return () => window.clearInterval(intervalId);
  }, [activeIndex, autoAdvanceMs, images.length, isExpanded, isPaused, prefersReducedMotion]);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsExpanded(false);
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActiveIndex((index) => (index + 1) % images.length);
      }
      if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        if (!focusable?.length) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      expandButtonRef.current?.focus();
    };
  }, [images.length, isExpanded]);

  if (images.length === 0) return null;

  const activeImage = images[activeIndex];
  const slideCount =
    String(activeIndex + 1).padStart(2, '0') + ' / ' + String(images.length).padStart(2, '0');

  const showNextImage = () => {
    setActiveIndex((index) => (index + 1) % images.length);
  };

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    const nextTarget = event.relatedTarget as Node | null;
    if (!nextTarget || !event.currentTarget.contains(nextTarget)) setIsPaused(false);
  };

  return (
    <div
      className="prototype-carousel my-8"
      role="region"
      aria-label="Sales prototype carousel"
      aria-roledescription="carousel"
      data-paused={isPaused || isExpanded || prefersReducedMotion}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={handleBlur}
    >
      <div className="prototype-carousel-stage relative isolate aspect-[16/9] min-h-[17rem] w-full overflow-hidden rounded-3xl sm:min-h-[22rem] lg:min-h-[26rem]">
        {images.map((image, index) => {
          const relativePosition = (index - activeIndex + images.length) % images.length;
          const position = relativePosition === 0 ? 'center' : relativePosition === 1 ? 'right' : 'left';
          const isActive = index === activeIndex;

          return (
            <button
              key={image.src}
              ref={isActive ? expandButtonRef : undefined}
              type="button"
              className="prototype-carousel-card absolute left-1/2 top-1/2 h-[84%] w-[82%] overflow-hidden rounded-2xl bg-[#101010] shadow-2xl outline-none focus-visible:ring-2 focus-visible:ring-white sm:w-[78%]"
              data-position={position}
              onClick={() => isActive && setIsExpanded(true)}
              aria-label={isActive ? 'Expand image ' + (index + 1) + ' of ' + images.length + ': ' + image.alt : undefined}
              aria-hidden={!isActive}
              tabIndex={isActive ? 0 : -1}
              disabled={!isActive}
            >
              <img
                src={image.src}
                alt={isActive ? image.alt : ''}
                className="h-full w-full object-contain"
                draggable={false}
              />
              {!isActive && <span className="prototype-carousel-card-shade" aria-hidden="true" />}
              {isActive && (
                <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/65 px-3 py-1.5 font-proxima text-xs tracking-wide text-white backdrop-blur-md sm:bottom-4 sm:left-4">
                  {slideCount}
                </span>
              )}
            </button>
          );
        })}

        {images.length > 1 && (
          <button
            type="button"
            onClick={showNextImage}
            className="prototype-carousel-next absolute right-3 top-1/2 z-40 flex h-12 w-12 items-center justify-center rounded-full text-[#171717] shadow-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-5 sm:h-14 sm:w-14"
            aria-label="Show next image"
            title="Show next image"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
              <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {images.length > 1 && !prefersReducedMotion && (
          <div className="prototype-carousel-progress" aria-hidden="true">
            <span
              key={activeIndex}
              className="prototype-carousel-progress-bar"
              style={{ animationDuration: autoAdvanceMs + 'ms' }}
            />
          </div>
        )}
      </div>

      {isExpanded && (
        <div
          className="prototype-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setIsExpanded(false)}
        >
          <div
            ref={dialogRef}
            className="relative flex h-full w-full max-w-[96rem] items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={'Expanded prototype image ' + (activeIndex + 1) + ' of ' + images.length}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={'expanded-' + activeImage.src}
              src={activeImage.src}
              alt={activeImage.alt}
              className="prototype-lightbox-image max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-proxima text-sm text-white backdrop-blur-lg">
                {slideCount}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsExpanded(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close expanded image"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {images.length > 1 && (
              <button
                type="button"
                onClick={showNextImage}
                className="prototype-carousel-next absolute right-0 top-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-[#171717] shadow-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-2 sm:h-14 sm:w-14"
                aria-label="Show next image"
                title="Show next image"
              >
                <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
                  <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

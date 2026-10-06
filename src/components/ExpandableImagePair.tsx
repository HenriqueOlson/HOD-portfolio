import { useEffect, useRef, useState } from 'react';
import './ExpandableImagePair.css';

interface ImageItem {
  src: string;
  alt: string;
}

interface Props {
  images: [ImageItem, ImageItem];
  tagline: string;
}

export default function ExpandableImagePair({ images, tagline }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setOpenIndex(null);
      } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        setOpenIndex((index) => index === null ? null : (index + direction + images.length) % images.length);
      } else if (event.key === 'Tab') {
        const buttons = dialogRef.current?.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
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
      triggerRef.current?.focus();
    };
  }, [isOpen, images.length]);

  const openImage = (index: number, button: HTMLButtonElement) => {
    triggerRef.current = button;
    setOpenIndex(index);
  };

  return (
    <figure className="expandable-image-pair my-8">
      <div className="expandable-image-pair-grid" role="group" aria-label="Kore UI patterns">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            className="expandable-image-pair-tile"
            onClick={(event) => openImage(index, event.currentTarget)}
            aria-label={`Expand image ${index + 1} of ${images.length}: ${image.alt}`}
          >
            <img src={image.src} alt={image.alt} width={1710} height={1777} loading="lazy" decoding="async" draggable={false} />
          </button>
        ))}
      </div>

      <figcaption className="mt-3 font-seravek text-base text-muted-foreground">{tagline}</figcaption>

      {openIndex !== null && (
        <div
          className="prototype-lightbox fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 backdrop-blur-xl sm:p-8"
          onClick={() => setOpenIndex(null)}
        >
          <div
            ref={dialogRef}
            className="relative flex h-full w-full max-w-[96rem] items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label={`Expanded Kore UI pattern ${openIndex + 1} of ${images.length}`}
            onClick={(event) => event.stopPropagation()}
          >
            <img
              key={images[openIndex].src}
              src={images[openIndex].src}
              alt={images[openIndex].alt}
              className="prototype-lightbox-image max-h-[88vh] max-w-full rounded-xl object-contain shadow-2xl"
              draggable={false}
            />

            <div className="absolute inset-x-0 top-0 flex items-center justify-between">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-proxima text-sm text-white backdrop-blur-lg">
                {String(openIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpenIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                aria-label="Close expanded image"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOpenIndex((index) => index === null ? null : (index + 1) % images.length)}
              className="prototype-carousel-next absolute right-0 top-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full text-[#171717] shadow-xl transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:right-2 sm:h-14 sm:w-14"
              aria-label="Show next image"
              title="Show next image"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
                <path d="M5 12h14m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </figure>
  );
}

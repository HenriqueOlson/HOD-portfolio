import { useRef, useState } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  label: string;
}

interface Props {
  images: [GalleryImage, GalleryImage];
  groupLabel?: string;
}

export default function PairedMediaGallery({ images, groupLabel = 'Master prototypes and reusable feature modules' }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const clearWhenUnfocused = () => {
    if (!galleryRef.current?.contains(document.activeElement)) setActiveIndex(null);
  };

  return (
    <div
      ref={galleryRef}
      className="dealroom-ai-gallery"
      data-active={activeIndex === null ? 'none' : activeIndex}
      role="group"
      aria-label={groupLabel}
      onMouseLeave={clearWhenUnfocused}
      onBlurCapture={(event) => {
        const nextTarget = event.relatedTarget as Node | null;
        if (!nextTarget || !event.currentTarget.contains(nextTarget)) setActiveIndex(null);
      }}
    >
      {images.map((image, index) => (
        <button
          key={image.src}
          type="button"
          className="dealroom-ai-gallery-panel"
          onMouseEnter={() => setActiveIndex(index)}
          onFocus={() => setActiveIndex(index)}
          onClick={() => setActiveIndex(index)}
          aria-label={'Focus image: ' + image.label}
        >
          <img src={image.src} alt={image.alt} draggable={false} />
          <span className="dealroom-ai-gallery-label">
            <span className="dealroom-ai-gallery-label-mark" aria-hidden="true" />
            <span className="dealroom-ai-gallery-label-text">{image.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

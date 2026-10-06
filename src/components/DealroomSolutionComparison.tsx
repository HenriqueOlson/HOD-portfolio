import { useState } from 'react';
import './DealroomSolutionComparison.css';

type Version = 'old' | 'new';

const images: Record<Version, { src: string; alt: string }> = {
  old: {
    src: '/images/projects/dealroom-offering-old.png',
    alt: 'Old DealRoom offering setup with a dense sidebar, tabs, and a long overview of information.',
  },
  new: {
    src: '/images/projects/dealroom-offering-new.png',
    alt: 'New Issuance wizard with a step list and a focused Company Information form.',
  },
};

export default function DealroomSolutionComparison() {
  const [version, setVersion] = useState<Version>('new');

  return (
    <figure className="dealroom-solution-comparison my-8">
      <div className="dealroom-solution-switch" role="group" aria-label="Offering setup comparison">
        {(['old', 'new'] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={version === option}
            onClick={() => setVersion(option)}
          >
            {option === 'old' ? 'Old' : 'New'}
          </button>
        ))}
      </div>

      <div className="dealroom-solution-stage">
        {(['old', 'new'] as const).map((option) => (
          <img
            key={option}
            className="dealroom-solution-image"
            data-active={version === option}
            aria-hidden={version !== option}
            src={images[option].src}
            alt={images[option].alt}
            width={1710}
            height={952}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ))}
      </div>

      <figcaption className="mt-3 font-seravek text-base text-muted-foreground">
        What before was counterintuitive becomes a guided process.
      </figcaption>
    </figure>
  );
}

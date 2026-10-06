import { useEffect, useRef, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import ShellPreviewFrame from './ShellPreviewFrame';
import './WhiteLabelMorph.css';

type Surface = 'shell' | 'cmp';

const LOOP_INTERVAL = 4800;

export default function WhiteLabelMorph() {
  const [surface, setSurface] = useState<Surface>('shell');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const playing = visible && documentVisible && !paused && !reducedMotion;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.15 });
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReducedMotion(motionPreference.matches);
    const updateDocumentVisibility = () => setDocumentVisible(!document.hidden);

    intersectionObserver.observe(stage);
    updateMotionPreference();
    updateDocumentVisibility();
    motionPreference.addEventListener('change', updateMotionPreference);
    document.addEventListener('visibilitychange', updateDocumentVisibility);

    return () => {
      intersectionObserver.disconnect();
      motionPreference.removeEventListener('change', updateMotionPreference);
      document.removeEventListener('visibilitychange', updateDocumentVisibility);
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      setSurface((current) => current === 'shell' ? 'cmp' : 'shell');
    }, LOOP_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [playing, surface]);

  const chooseSurface = (next: Surface) => {
    setSurface(next);
  };

  return (
    <figure className="white-label-demo my-8" aria-label="Shell to white-label layout demonstration">
      <div className="white-label-demo-toolbar">
        <div className="white-label-demo-switch" role="group" aria-label="Preview layout">
          {(['shell', 'cmp'] as const).map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={surface === option}
              onClick={() => chooseSurface(option)}
            >
              {option === 'shell' ? 'Shell' : 'CMP'}
            </button>
          ))}
        </div>
        {!reducedMotion && (
          <button
            type="button"
            className="white-label-demo-playback"
            aria-label={paused ? 'Play Shell to CMP loop' : 'Pause Shell to CMP loop'}
            onClick={() => setPaused((current) => !current)}
          >
            {paused ? <Play size={15} aria-hidden="true" /> : <Pause size={15} aria-hidden="true" />}
            <span>{paused ? 'Play' : 'Pause'}</span>
          </button>
        )}
      </div>

      <ShellPreviewFrame
        ref={stageRef}
        surface={surface}
        interactive={false}
      />

      <div className="white-label-demo-progress" aria-hidden="true">
        <span
          key={`${surface}-${playing}`}
          data-playing={playing}
          style={{ animationDuration: `${LOOP_INTERVAL}ms` }}
        />
      </div>
      <figcaption className="mt-3 font-seravek text-base text-muted-foreground">
        Consistent reusable layout.
      </figcaption>
    </figure>
  );
}

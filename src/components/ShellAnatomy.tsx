import { useState } from 'react';
import type { CSSProperties } from 'react';
import ShellPreviewFrame from './ShellPreviewFrame';
import './ShellAnatomy.css';

const layers = {
  header: {
    name: 'Header LOB (Level 1)',
    purpose: 'Lines of business selector and profile entry points.',
  },
  navigation: {
    name: 'Navigation (Level 2)',
    purpose: 'Where features live and also selector of companies.',
  },
  content: {
    name: 'Content (Level 3)',
    purpose: 'Content of all features. Also reused part for White-labels.',
  },
} as const;

type LayerId = keyof typeof layers;
type ActiveLayer = { id: LayerId; bottom: number; right: number; frameWidth: number };

function LayerCard({ active }: { active: ActiveLayer }) {
  const layer = layers[active.id];
  const cardWidth = Math.min(320, active.frameWidth - 32);
  const style: CSSProperties = active.id === 'header'
    ? { top: active.bottom + 12, left: 16 }
    : active.id === 'navigation'
      ? { bottom: 16, left: Math.max(16, Math.min(active.right + 12, active.frameWidth - cardWidth - 16)) }
      : { bottom: 16, right: 16 };

  return (
    <span className="shell-anatomy-callout" style={style} aria-hidden="true">
      <span className="shell-anatomy-callout-eyebrow">INFORMATION ARCHITECTURE</span>
      <span className="shell-anatomy-callout-title">{layer.name}</span>
      <span className="shell-anatomy-callout-purpose">{layer.purpose}</span>
    </span>
  );
}

export default function ShellAnatomy() {
  const [activeLayer, setActiveLayer] = useState<ActiveLayer | null>(null);

  const selectLayer = (region: HTMLElement | null, frame: HTMLDivElement) => {
    const id = region?.dataset.shellRegion as LayerId | undefined;
    if (!region || !id || !(id in layers) || !frame.contains(region)) {
      setActiveLayer(null);
      return;
    }
    const frameBounds = frame.getBoundingClientRect();
    const regionBounds = region.getBoundingClientRect();
    const next = {
      id,
      bottom: Math.round(regionBounds.bottom - frameBounds.top),
      right: Math.round(regionBounds.right - frameBounds.left),
      frameWidth: Math.round(frameBounds.width),
    };
    setActiveLayer((current) => (
      current?.id === next.id && current.bottom === next.bottom &&
      current.right === next.right && current.frameWidth === next.frameWidth
    ) ? current : next);
  };

  const selectLayerAtPoint = (x: number, y: number, frame: HTMLDivElement) => {
    const region = [...frame.querySelectorAll<HTMLElement>('[data-shell-region]')].find((element) => {
      const bounds = element.getBoundingClientRect();
      return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
    });
    selectLayer(region ?? null, frame);
  };

  return (
    <figure className="shell-anatomy my-8">
      <ShellPreviewFrame
        className="shell-anatomy-frame"
        role="img"
        aria-label={`Shell information architecture. ${Object.values(layers).map((layer) => `${layer.name}: ${layer.purpose}`).join(' ')}`}
        data-active-layer={activeLayer?.id}
        interactive={false}
        onPointerMove={(event) => selectLayerAtPoint(event.clientX, event.clientY, event.currentTarget)}
        onPointerLeave={() => setActiveLayer(null)}
      >
        {activeLayer && <LayerCard key={activeLayer.id} active={activeLayer} />}
      </ShellPreviewFrame>
      <figcaption className="mt-3 font-seravek text-base text-muted-foreground">
        Hover a layer to explore the 3 levels of the Shell anatomy.
      </figcaption>
    </figure>
  );
}

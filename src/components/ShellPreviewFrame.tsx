import { useCallback, useEffect, useRef, useState } from 'react';
import type { HTMLAttributes, Ref } from 'react';
import { ShellPreview } from './v3shell/ShellPreview';
import type { ShellRegionProps } from './v3shell/ShellPreview';
import './ShellPreviewFrame.css';

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;

type Props = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<HTMLDivElement>;
  surface?: 'shell' | 'cmp';
  regionProps?: ShellRegionProps;
  interactive?: boolean;
};

export default function ShellPreviewFrame({
  ref: forwardedRef,
  surface = 'shell',
  regionProps,
  interactive = true,
  className = '',
  children,
  ...frameProps
}: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [previewWidth, setPreviewWidth] = useState(0);
  const attachRef = useCallback((node: HTMLDivElement | null) => {
    frameRef.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  }, [forwardedRef]);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    setPreviewWidth(frame.clientWidth);
    const observer = new ResizeObserver(([entry]) => setPreviewWidth(entry.contentRect.width));
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={attachRef} className={`v3-shell-frame ${className}`} {...frameProps}>
      <div
        className="v3-shell-preview"
        inert={!interactive}
        style={{
          width: PREVIEW_WIDTH,
          height: PREVIEW_HEIGHT,
          transform: `scale(${previewWidth / PREVIEW_WIDTH})`,
          visibility: previewWidth ? 'visible' : 'hidden',
        }}
      >
        <ShellPreview
          fullPage
          showContent
          simulation="waffle"
          breakpoint="xl"
          width={PREVIEW_WIDTH}
          surface={surface}
          regionProps={regionProps}
        />
      </div>
      {children}
    </div>
  );
}

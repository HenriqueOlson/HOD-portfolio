# v3shell case-study embed

Adapted from the user-supplied `v3shell.zip`. `ShellPreview.tsx` contains the
Shell/CMP renderer and its supporting components extracted from the original
design-system registry. Documentation pages and application routing are omitted.

The original Shell/CMP layout, Northbank header and footer, content components,
and 600ms easing are retained. The portfolio adapter starts on the Dealroom
screen, keeps transitions defined in both directions, and makes hidden chrome
inert. `ShellPreviewFrame.tsx` scales both media to the case-study grid.
`WhiteLabelMorph.tsx` controls playback, and `ShellAnatomy.tsx` adds hover/focus
explanations to the original header, navigation, and content regions.

The original design tokens are scoped in `tokens.css`. `icon-paths.json` contains
only the original Material Symbols used by this embed. The dashboard chart uses
the original data with an SVG renderer to avoid adding a charting dependency.

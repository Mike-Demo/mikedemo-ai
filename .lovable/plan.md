# Restore the retro look on the live site

## What's wrong

The chunky pixel styling from the retro component set is no longer being loaded by the browser. I checked both the preview and your live site at mikedemo.dev: the page pulls in your own stylesheet and the Web Awesome/Font Awesome ones, but the 307 KB retro stylesheet that draws the pixel borders, buttons, panels and dialogs is missing entirely.

That's why panels show as thin plain boxes, buttons look flat, and the whole page reads as "half designed".

Cause: a recent change removed the direct stylesheet reference from the page head and relied on the component package pulling it in by itself. That indirect path doesn't end up in the page for the built site, so the styles never arrive.

## The fix

1. Put the retro stylesheet reference back in the page head, loaded before your own stylesheet so your fonts and colors still win.
2. Keep the existing safeguard that pins body copy to the readable Work Sans font, so long text does not flip to the pixel font (the problem reported earlier).
3. Confirm nothing loads the same stylesheet twice in a way that flips the cascade back.

## Checks before I call it done

- Homepage, Level Select, a project page, Bugle Crowns and Credits all show pixel borders/buttons again.
- Body paragraphs stay in Work Sans; only headings, labels and buttons use the pixel font.
- Screenshots at desktop and mobile widths, no console errors, clean build.
- After you publish, verify the live page includes the stylesheet.

## Technical detail

- `src/routes/__root.tsx`: re-add the `head().links` entry for `@/design-system/nes-229931/styles/nes.css?url`, placed before `appCss`.
- `src/styles.css`: keep the `html body` font/background rule that outranks the library's `html,body{font-family:"Press Start 2P"}`.
- No files under `src/design-system/nes-229931/` will be touched (vendor copy).
- Verified evidence: `https://mikedemo.dev/assets/styles--jH7a0fM.css` is the only site CSS asset and contains zero `.nes-container` rules; runtime probe of the preview found only project-authored `.nes-*` selectors, none from the library sheet.

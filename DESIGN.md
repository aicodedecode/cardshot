# Cardshot design direction

Cardshot is a maker tool: the canvas is the product and the chrome recedes.

- Palette: neutral slate surfaces plus one violet accent (#7c5cff). The accent is the
  user's recolor target inside the exports, and a single accent keeps the tool chrome
  out of the way of whatever the user is designing.
- Brand mark: flat violet aperture. It reads at 18px and carries no gradient; the
  purple-to-cyan gradient default was removed deliberately.
- Typography: system sans for the tool chrome. Zero webfont weight, and the fonts that
  matter (the card's) are the user's own choice at export time.
- Dark chrome default: a design surface tool stays dark so the card being designed is
  the brightest object on screen, whatever theme that card uses.
- Radius scale: 8px on the canvas, 9 to 14px on panels and inputs. Nothing pill-shaped;
  one consistent scale instead of uniform rounding.
- Templates: the Browser mock exists because the product's core job is framing URL
  screenshots. Its traffic lights and URL bar are informational, not decoration.
- Copy: honest defaults. Placeholders say what they are ("Drop your screenshot here",
  "Your Brand"). No invented stats, testimonials or claims anywhere.
- Accessibility: visible focus outline on every control, 44px tap targets on touch
  devices, AA contrast for muted text.
- Motion: none beyond the toast fade. A working tool, not a landing page.

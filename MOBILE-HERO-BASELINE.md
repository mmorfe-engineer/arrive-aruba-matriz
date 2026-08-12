# Mobile Hero Baseline (before Motion)

This repository checkpoint locks the **approved Safari iPhone / Mobile hero** static composition before any Journey Motion work.

## Commit

```
chore: lock approved mobile hero baseline before motion
```

## Locked

- Logo, HOME / MENU
- `atmosphere-mobile` crop / `object-position`
- Window size and position
- “What you felt” + subtitle + CTA positions (including the approved +15px copy lift)
- Bottom seam fade → Cannoli Cream
- Desktop hero unchanged
- Journey Organic **off** on the homepage

## Motion rules (next phase)

1. Start from this commit.
2. Do not change the static layout to produce Motion.
3. Add Motion as an independent layer; animated offsets must return to this baseline.
4. Respect `prefers-reduced-motion`.
5. Re-validate Safari iPhone (normal tab) and Desktop after each change.

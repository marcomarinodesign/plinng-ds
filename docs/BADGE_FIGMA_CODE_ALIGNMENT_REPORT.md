# Badge Component — Figma vs Code Alignment Report

**Date:** 2025-02-19  
**Figma file:** [Design System — Badge (node 189-16355)](https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=189-16355&m=dev)  
**Codebase:** `src/components/Badge/`

---

## Section 1 — Figma Structure (Checklist)

> ⚠️ **Note:** The Figma file could not be fetched directly (requires authentication). Use this checklist to manually extract specs from Figma and fill in the values. Compare with Section 2 afterward.

### 1.1 Variants / Types

| Variant | In Figma? | Notes |
|---------|-----------|-------|
| Default / Neutral | ☐ | |
| Success | ☐ | |
| Warning | ☐ | |
| Error | ☐ | |
| Info | ☐ | |
| Other: ________ | ☐ | |

### 1.2 Sizes

| Size | Height | Padding H | Padding V | Font size | Font weight |
|------|--------|-----------|-----------|-----------|-------------|
| Small | ___ px | ___ px | ___ px | ___ px | ___ |
| Medium | ___ px | ___ px | ___ px | ___ px | ___ |
| Large (if any) | ___ px | ___ px | ___ px | ___ px | ___ |

### 1.3 States

| State | In Figma? | Visual change |
|-------|-----------|---------------|
| Default | ☐ | |
| Hover | ☐ | |
| Disabled | ☐ | |
| Focus | ☐ | |

### 1.4 Typography

- **Font family:** ________ (DS uses Inter)
- **Font sizes:** ________
- **Font weights:** ________
- **Line height:** ________

### 1.5 Spacing

- **Padding horizontal:** ________
- **Padding vertical:** ________
- **Gap (text ↔ dot/icon):** ________

### 1.6 Border radius

- **Value:** ________ (DS tokens: `--radius-full` = 9999px, `--radius-md` = 8px, etc.)

### 1.7 Colors (map to DS tokens if possible)

| Variant | Background | Text | Dot |
|---------|------------|------|-----|
| Default | ________ | ________ | ________ |
| Success | ________ | ________ | ________ |
| Warning | ________ | ________ | ________ |
| Error | ________ | ________ | ________ |
| Info | ________ | ________ | ________ |

### 1.8 Icon / Dot

- **Dot present?** ☐ Yes ☐ No
- **Dot size (md / sm):** ________
- **Icon support?** ☐ Yes ☐ No

---

## Section 2 — Code Structure

### 2.1 Tech Stack

| Aspect | Implementation |
|--------|----------------|
| **Styling** | Tailwind CSS (utility classes) — **not** CSS Modules |
| **Composition** | `clsx` + `tailwind-merge` |
| **Element** | `<span>` (inline-flex) |

### 2.2 Props API

```ts
interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "md" | "sm";
  dot?: boolean;
}
```

### 2.3 Variant Classes (Current)

| Variant | Background | Text | Dot |
|---------|------------|------|-----|
| default | `bg-gray-100` | `text-gray-700` | `bg-gray-500` |
| success | `bg-green-100` | `text-green-700` | `bg-green-500` |
| warning | `bg-yellow-100` | `text-yellow-800` | `bg-yellow-500` |
| error | `bg-red-100` | `text-red-700` | `bg-red-500` |
| info | `bg-blue-100` | `text-blue-700` | `bg-blue-500` |

### 2.4 Size Classes

| Size | Padding | Font |
|------|---------|------|
| md | `px-2.5 py-1` (10px 4px) | `text-xs` (12px) |
| sm | `px-2 py-0.5` (8px 2px) | `text-[11px]` |

### 2.5 Shared Base Classes

```
inline-flex items-center gap-1.5 rounded-full font-semibold leading-none
```

### 2.6 Dot Sizing

| Size | Dot dimensions |
|------|----------------|
| md | `w-1.5 h-1.5` (6px) |
| sm | `w-1 h-1` (4px) |

### 2.7 Token Usage

| Category | Used in Badge? | DS Tokens Available |
|----------|----------------|---------------------|
| Colors | ❌ No | `--color-error-1/2/3`, `--color-warning-1/2`, `--color-beige-*`, `--color-grey-*`, `--color-accent-*` |
| Spacing | ❌ No | `--space-1` (4px) through `--space-24` |
| Radius | ❌ No | `--radius-full`, `--radius-md`, etc. |
| Typography | ❌ No | `--font-sans` (Inter) |

### 2.8 Missing in Code

- No Figma design link in `Badge.stories.tsx` (Button/LinkWeb have `parameters.design`)
- No hover/disabled/focus states
- No `size="lg"` option

---

## Section 3 — Key Differences

### 3.1 Color Mismatch (High)

| Issue | Current | DS Foundation |
|-------|---------|---------------|
| Badge uses generic Tailwind colors | `gray-100`, `green-100`, `yellow-100`, `red-100`, `blue-100` | Status: `--color-error-1/2/3`, `--color-warning-1/2`; no explicit success/info |
| Error variant | `red-100` / `red-700` | Should use `--color-error-2` (bg) / `--color-error-1` (text) |
| Warning variant | `yellow-100` / `yellow-800` | Should use `--color-warning-2` (bg) / `--color-warning-1` (text) |
| Success / Info | No DS tokens | Need design decision: use Accent for success? Grey/Beige for info? |

### 3.2 Token Alignment (High)

- **Button** and **Input** use DS tokens (`bg-primary`, `text-primary-text`, `border-tertiary-border`, `text-disabled`, etc.).
- **Badge** uses raw Tailwind palette → inconsistent with the rest of the DS.

### 3.3 Typography (Medium)

- Badge uses `text-xs` (12px) and `text-[11px]` — not mapped to DS type scale.
- DS has `caption` (12px), `overline` (12px bold), etc. in `Text` component.

### 3.4 Spacing (Medium)

- Badge: `px-2.5 py-1` (10px, 4px) and `px-2 py-0.5` (8px, 2px).
- DS grid: 4px base (`--space-1` = 4px). 10px and 2px are off-grid; consider `--space-2` (8px), `--space-3` (12px).

### 3.5 States (Medium)

- No hover, disabled, or focus styles in code.
- Figma may define these — verify in Section 1.

### 3.6 Naming Consistency (Low)

- Code: `default`, `success`, `warning`, `error`, `info`
- Figma: verify naming (e.g. "Neutral" vs "Default", "Critical" vs "Error").

---

## Section 4 — Recommended Fixes

### High priority

1. **Replace Tailwind colors with DS tokens**
   - Map error → `--color-error-2` (bg), `--color-error-1` (text)
   - Map warning → `--color-warning-2` (bg), `--color-warning-1` (text)
   - Define success/info in Figma + DS tokens, then implement

2. **Add Figma design link to Badge stories**
   ```ts
   parameters: {
     design: {
       type: "figma",
       url: "https://www.figma.com/design/wVzc4wbNrfKR9awe8UU401/Design-System?node-id=189-16355",
     },
   },
   ```

3. **Align spacing to 4px grid**
   - md: e.g. `px-3 py-1` (12px, 4px) or `px-2 py-1` (8px, 4px)
   - sm: e.g. `px-2 py-0.5` → consider `px-2 py-1` (8px, 4px) if design allows

### Medium priority

4. **Add hover/focus/disabled states** (if present in Figma)
   - Use `focus-visible:outline` for accessibility
   - Disabled: reduce opacity or use `--color-disabled`

5. **Map typography to DS**
   - Use `text-caption` or equivalent from `Text` if available, or ensure `text-xs` / `text-[11px]` match Figma specs

6. **Define success/info in design tokens**
   - Add `--color-success-*` and `--color-info-*` in `index.css` if Figma uses them

### Low priority

7. **Consider `size="lg"`** if Figma defines it
8. **Standardize variant names** with Figma (e.g. "Neutral" vs "Default")

---

## Section 5 — Suggested Final API for Badge

```ts
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Visual variant. Maps to DS status/neutral tokens. */
  variant?: "default" | "success" | "warning" | "error" | "info";
  /** Size. Aligned to 4px grid. */
  size?: "sm" | "md"; // add "lg" if Figma has it
  /** Show status dot before label. */
  dot?: boolean;
  /** Disabled state (reduced opacity, no interaction). */
  disabled?: boolean;
}
```

### Suggested token mapping (after DS tokens are defined)

| Variant | Background | Text | Dot |
|---------|------------|------|-----|
| default | `bg-beige-100` or `bg-grey-soft` | `text-beige-300` or `text-grey-dark` | same as text |
| success | `bg-accent-100` | `text-accent-700` | `bg-accent-500` |
| warning | `bg-warning-2` | `text-warning-1` | `bg-warning-1` |
| error | `bg-error-2` | `text-error-1` | `bg-error-1` |
| info | `bg-grey-soft` or `bg-beige-100` | `text-grey-dark` | `bg-grey-dark` |

### Suggested size values (4px grid)

| Size | Padding | Font |
|------|---------|------|
| sm | `px-2 py-1` (8px, 4px) | 11px or `caption` |
| md | `px-3 py-1` (12px, 4px) | 12px or `caption` |

### Tailwind config extension (if using arbitrary values)

Ensure DS colors are available as Tailwind utilities, e.g.:

```css
/* In @theme or tailwind config */
--color-badge-default-bg: var(--color-beige-100);
--color-badge-default-text: var(--color-beige-300);
--color-badge-error-bg: var(--color-error-2);
--color-badge-error-text: var(--color-error-1);
/* etc. */
```

---

## Next Steps

1. Fill Section 1 from Figma (Dev mode or Inspect).
2. Add missing DS tokens for success/info if needed.
3. Implement high-priority fixes (colors, Figma link, spacing).
4. Add states (hover, disabled, focus) if defined in Figma.
5. Run visual regression tests (e.g. Chromatic) after changes.

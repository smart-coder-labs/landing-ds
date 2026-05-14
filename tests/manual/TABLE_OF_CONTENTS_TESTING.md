# Table of Contents — Manual Testing Guide

## Overview

This document provides comprehensive manual testing procedures for the Table of Contents (ToC) feature across all browsers and accessibility scenarios.

**Feature**: Sticky right-side table of contents with smooth scroll animation, keyboard navigation, and accessibility enhancements.

---

## Prerequisites

- ✅ Run dev server: `npm run dev` (or `pnpm dev`)
- ✅ Open component documentation page (e.g., `/components/button`)
- ✅ Test on multiple screen sizes (desktop 1280px+, tablet 768-1024px, mobile <768px)
- ✅ Test across browsers: Chrome, Firefox, Safari, Edge

---

## Test Scenarios

### 1. Visual Presentation & Responsive Behavior

#### 1.1 Desktop View (≥1024px)
**Expected**: ToC visible on right side, sticky positioned

```
Steps:
1. Set viewport to 1280x720 (desktop)
2. Navigate to /components/button
3. Observe right side of screen

Verify:
✓ ToC appears on right side with "On this page" header
✓ ToC is sticky (stays visible when scrolling)
✓ ToC shows hierarchical structure (h2 = bold, h3 = indented, h4 = more indented)
✓ Headings extract correctly: "Installation", "Examples", "Props", etc.
✓ No layout shift or jank
✓ Border on left side of ToC is visible
```

#### 1.2 Tablet View (768–1024px)
**Expected**: ToC hidden, main content full-width

```
Steps:
1. Set viewport to 900x1024 (tablet)
2. Navigate to /components/button
3. Observe right side

Verify:
✓ ToC is completely hidden
✓ Main content spans full width
✓ No placeholder or empty space where ToC would be
✓ Layout is responsive (no overflow)
```

#### 1.3 Mobile View (<768px)
**Expected**: ToC hidden, full-width content with drawer sidebar

```
Steps:
1. Set viewport to 375x667 (mobile)
2. Navigate to /components/button
3. Observe layout

Verify:
✓ ToC is hidden
✓ Content is full-width
✓ Sidebar converted to drawer/hamburger menu
```

#### 1.4 Resize Responsiveness
**Expected**: Layout adapts smoothly without jank

```
Steps:
1. Start at desktop (1280px)
2. Slowly drag right window border to 900px (tablet)
3. Observe ToC behavior
4. Continue to 400px (mobile)
5. Resize back to 1280px

Verify:
✓ ToC disappears smoothly at <1024px
✓ ToC reappears smoothly at ≥1024px
✓ No console errors
✓ No visual jank or flickering
✓ Page maintains scroll position
```

---

### 2. Smooth Scroll Animation

#### 2.1 Smooth Scroll Works (Normal Motion)
**Expected**: Smooth animated scroll to heading

```
Steps:
1. Desktop view (1280x720)
2. Navigate to /components/button
3. Click "Examples" link in ToC
4. Watch scroll animation

Verify:
✓ Page smoothly scrolls to "Examples" section
✓ Animation is fluid (not instant)
✓ Scroll duration ~500ms
✓ Heading appears near top of viewport (not fully scrolled off)
✓ Active link updates when scroll completes
```

#### 2.2 Respect Reduced Motion (Accessibility)
**Expected**: Instant scroll when reduced motion enabled

**On macOS:**
```
Steps:
1. Desktop view (1280x720)
2. System Preferences → Accessibility → Display
3. Enable "Reduce motion"
4. Return to browser
5. Reload page (hard refresh)
6. Click "Examples" link in ToC

Verify:
✓ Scroll is INSTANT (no animation)
✓ Page jumps to heading immediately
✓ No animation delay
```

**On Windows:**
```
Steps:
1. Desktop view (1280x720)
2. Settings → Ease of Access → Display
3. Enable "Show animations"
4. Return to browser, reload page
5. Click ToC link

Verify:
✓ Scroll is instant
```

**On Linux (Chrome DevTools):**
```
Steps:
1. Open DevTools (F12)
2. Esc → Rendering → Emulate CSS media feature prefers-reduced-motion: reduce
3. In ToC, click any link
4. Verify scroll is instant

Verify:
✓ Scroll happens immediately (no smooth animation)
```

**Revert Reduced Motion:**
```
Steps:
1. Disable reduced motion (repeat step 2/3 above but toggle OFF)
2. Reload page
3. Click ToC link

Verify:
✓ Smooth scroll animation returns
```

---

### 3. Active Heading Highlight

#### 3.1 Scroll Tracking
**Expected**: Active link in ToC updates as you scroll

```
Steps:
1. Desktop view, /components/button
2. ToC shows all headings
3. Scroll down slowly through page

Verify:
✓ As "Installation" section comes into view, its ToC link becomes bold + highlighted
✓ Text color changes to accent-blue
✓ Left border (2px) appears on active link
✓ When scrolling to "Examples", previous active link resets
✓ "Examples" link becomes active (bold, blue, bordered)
✓ Tracking works smoothly (not jerky)
```

#### 3.2 Multiple Heading Levels
**Expected**: Active highlight shows most-visible heading

```
Steps:
1. Scroll so multiple h2 sections are visible
2. Observe which heading is active in ToC

Verify:
✓ ToC highlights the topmost visible heading
✓ Only ONE heading is highlighted at a time
✓ highlight uses `aria-current="page"` attribute
```

#### 3.3 Intersection Observer Accuracy
**Expected**: Heading becomes active when partially visible

```
Steps:
1. Scroll up to position "Examples" heading 50% visible
2. Observe which ToC link is active

Verify:
✓ "Examples" link becomes active when heading is ≥25% visible
✓ No flickering between active states
✓ Performance is smooth (no lag)
```

---

### 4. Keyboard Navigation

#### 4.1 Tab Navigation
**Expected**: Keyboard users can tab through ToC links

```
Steps:
1. Desktop view, /components/button
2. Press Tab multiple times to focus ToC
3. Continue pressing Tab through ToC links

Verify:
✓ Focus outline is visible on each link
✓ Outline uses ring-2 ring-accent-blue styling (visible 2px ring)
✓ Focus order is logical (top-to-bottom, nested depth first)
✓ Can tab past all ToC links
```

#### 4.2 Enter to Activate
**Expected**: Pressing Enter on focused link navigates

```
Steps:
1. Tab to a ToC link (e.g., "Examples")
2. Link has focus (visible outline)
3. Press Enter

Verify:
✓ Page scrolls to the corresponding heading
✓ Smooth scroll animation plays
✓ Heading appears near top of viewport
✓ Active link highlights correctly
```

#### 4.3 Focus Visible Styling
**Expected**: Focus outline clearly visible with contrast

```
Steps:
1. Tab through ToC links
2. Observe focus ring on each link

Verify:
✓ Focus outline has 2px width (ring-2)
✓ Color is accent-blue (#007aff or #0a84ff)
✓ Has 1px offset (ring-offset-1)
✓ Contrast ratio ≥3:1 against background
✓ Outline is not covered/hidden by any element
```

---

### 5. Screen Reader Accessibility

#### 5.1 VoiceOver (macOS)
**Expected**: Screen reader announces ToC navigation

```
Steps:
1. Desktop view, /components/button
2. Enable VoiceOver: Cmd + F5
3. Navigate to ToC area

Verify:
✓ VoiceOver announces: "Navigation, On this page"
✓ When tabbing to links: "[link name], current page" (for active link)
✓ Example: "Installation, current page" when Installation is active
✓ List structure announced: "List, 3 items" (or appropriate count)
✓ Can tab through links (VO + Right arrow)
✓ Can activate link with VO + Space
```

#### 5.2 NVDA (Windows)
**Expected**: Screen reader announces ToC navigation

```
Steps:
1. Desktop view, /components/button
2. Start NVDA
3. Navigate to ToC

Verify:
✓ NVDA announces: "Navigation landmark, On this page"
✓ When on active link: "[link name], current page"
✓ List structure: "List with X items"
✓ Can navigate with arrow keys
✓ Can activate link with Enter
```

#### 5.3 Semantic HTML
**Expected**: Nav element has proper ARIA labels

```
Steps:
1. Open DevTools Inspector
2. Inspect ToC <nav> element

Verify:
✓ Element has: <nav aria-label="On this page">
✓ Active link has: aria-current="page"
✓ Links are within <ul> list
✓ Each link is in <li> item
✓ Heading IDs match link href values
```

---

### 6. Color Contrast & Accessibility

#### 6.1 WCAG AA Compliance
**Expected**: All text meets 4.5:1 contrast ratio

```
Steps:
1. Open browser DevTools
2. Select each ToC link element
3. Use DevTools accessibility panel or axe DevTools extension

Verify:
✓ Default text (tertiary): 4.5:1+ contrast on background
✓ Hover text (secondary): 4.5:1+ contrast
✓ Active text (accent-blue): 4.5:1+ contrast on background/highlight
✓ No color is used alone to convey meaning
```

#### 6.2 Dark Mode Support
**Expected**: ToC colors adapt to dark mode

```
Steps:
1. If dark mode is supported, enable it (usually system preference)
2. Navigate to /components/button
3. Observe ToC colors

Verify:
✓ Text remains readable in dark mode
✓ Contrast ratios still ≥4.5:1
✓ Active/hover states are visible
✓ No visual regression
```

---

### 7. Cross-Browser Testing

| Browser | Desktop | Tablet | Mobile | Smooth Scroll | Focus Ring | Screen Reader |
|---------|---------|--------|--------|---------------|-----------|---------------|
| Chrome  | ✓       | ✓      | ✓      | ✓             | ✓         | ✓ (Chrome Vox) |
| Firefox | ✓       | ✓      | ✓      | ✓             | ✓         | ✓ (NVDA)      |
| Safari  | ✓       | ✓      | ✓      | ✓             | ✓         | ✓ (VoiceOver) |
| Edge    | ✓       | ✓      | ✓      | ✓             | ✓         | ✓ (NVDA)      |

**Testing Steps per Browser:**
1. Open /components/button
2. Verify ToC displays correctly
3. Click ToC links → verify smooth scroll
4. Tab through links → verify focus outline
5. Test on tablet/mobile views
6. Check console for errors (F12)

---

### 8. Error Scenarios

#### 8.1 Page Without Headings
**Expected**: ToC gracefully hidden

```
Steps:
1. Navigate to a page without h2/h3/h4 headings
2. Observe ToC

Verify:
✓ ToC is completely hidden (not shown as empty)
✓ No console errors
✓ No blank space where ToC would be
```

#### 8.2 Heading with Missing ID
**Expected**: ToC skips heading gracefully

```
Steps:
1. Navigate to /components/button
2. Check all headings have IDs (DevTools inspector)

Verify:
✓ All headings have id attributes
✓ IDs follow pattern: doc-[component]-[section]
✓ No duplicate IDs
✓ No console warnings
```

#### 8.3 Very Long Component Name
**Expected**: ToC text doesn't overflow

```
Steps:
1. Navigate to component with long heading (e.g., "HyperpersonalizedWidgetFeed")
2. Desktop view (1280px)
3. Observe ToC text

Verify:
✓ Text wraps or truncates gracefully
✓ No horizontal overflow on ToC
✓ Text remains readable
```

---

### 9. Performance

#### 9.1 No Layout Shift
**Expected**: Cumulative Layout Shift (CLS) is minimal

```
Steps:
1. Open DevTools → Lighthouse
2. Run audit on /components/button
3. Check CLS metric

Verify:
✓ CLS score ≤0.1 (good)
✓ ToC doesn't cause layout shift on scroll
✓ No jank during scroll tracking
```

#### 9.2 Intersection Observer Memory
**Expected**: No memory leaks

```
Steps:
1. DevTools → Memory → Take heap snapshot
2. Navigate to /components/button
3. Scroll up/down rapidly for 10 seconds
4. Take another heap snapshot
5. Compare

Verify:
✓ Memory doesn't balloon (should stay stable)
✓ No leaked DOM nodes from observers
```

---

### 10. Rapid Click Stress Test

#### 10.1 Click Multiple ToC Links Quickly
**Expected**: No race conditions or animation stalls

```
Steps:
1. Desktop view, /components/button
2. Rapidly click different ToC links (5+ clicks in 2 seconds)
3. Observe page behavior

Verify:
✓ Page responds to all clicks
✓ Active highlight follows clicks
✓ Scroll animations don't stall
✓ No console errors
✓ Page remains responsive
```

---

### 11. Accessibility Audit Checklist

- [ ] ToC is keyboard navigable (Tab, Enter)
- [ ] Focus outline is visible on all links
- [ ] ARIA labels present (`aria-label="On this page"`)
- [ ] Active link has `aria-current="page"`
- [ ] Semantic HTML: `<nav>`, `<ul>`, `<li>`, `<a>`
- [ ] Color contrast ≥4.5:1 (WCAG AA)
- [ ] Screen reader announces navigation
- [ ] prefers-reduced-motion is respected
- [ ] No placeholder text for missing content
- [ ] Links have descriptive text (not generic "link")

---

## Test Report Template

```
## Testing Results — Table of Contents

**Date**: [TODAY]
**Tester**: [YOUR NAME]
**Component Pages Tested**: Button, Alert, Card, Dialog, Tabs (5+ pages)

### Summary
✓ All tests passed
❌ Issues found: [X issues]

### By Scenario
- [Scenario 1]: ✓ PASS / ❌ FAIL
- [Scenario 2]: ✓ PASS / ❌ FAIL
- ...

### Issues
1. **Issue Title**: Description
   - Browser: Chrome/Firefox/Safari/Edge
   - Steps: How to reproduce
   - Expected: What should happen
   - Actual: What happens
   - Severity: Critical/High/Medium/Low

### Sign-Off
✓ Ready for production
❌ Blocked by issues (see above)
```

---

## Automated Testing (Future)

For future CI/CD integration, consider:
- **Playwright**: E2E testing for scroll tracking, keyboard nav, responsive behavior
- **Axe**: Automated accessibility scanning
- **Lighthouse**: Performance & CLS metrics
- **Percy**: Visual regression testing

---

**Last Updated**: 2026-05-14  
**Feature**: Table of Contents (Phase 4, Polish & Accessibility)  
**Status**: ✅ Ready for manual testing

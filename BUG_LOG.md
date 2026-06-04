# Kombat Analyst Bug Log

## 1. Sean Strickland Image Not Showing on GitHub Pages

**Bug:**  
Sean Strickland's image worked locally but failed on the deployed GitHub Pages site.

**Cause:**  
GitHub Pages is case-sensitive with file names. Local Mac development was more forgiving.

**Fix:**  
Matched the JavaScript image path exactly with the deployed filename: `Strickland.jpg`.

**Why this fix:**  
The browser must request the exact file name that exists in the GitHub repository.

**Lesson:**  
Production environments can behave differently from local environments, especially with file casing.

---

## 2. Compare Button Not Working on Live Site

**Bug:**  
The Compare button worked locally but failed on the live GitHub Pages site.

**Cause:**  
Multiple overlapping event systems existed:
- inline `onclick`
- direct button listener
- `DOMContentLoaded` listener
- global `window.compareFighters`

**Fix:**  
Simplified to one clean event system using document-level click handling.

**Why this fix:**  
A single event system is easier to debug and more stable across environments.

**Lesson:**  
As frontend apps grow, avoid stacking event-handling patches.

---

## 3. Search Not Working After Compare Fix

**Bug:**  
Search stopped filtering fighters after event listener cleanup.

**Cause:**  
The search listener was removed along with the old event architecture.

**Fix:**  
Created a direct `searchFighters()` function and connected it to the search input with `oninput`.

**Why this fix:**  
For this static frontend app, direct input handling is simple, clear, and reliable.

**Lesson:**  
When removing old systems, check whether multiple features depend on them.

---

## 4. Navbar Layout Broke Hero and Fighter Grid

**Bug:**  
After adding the navbar, the hero section spacing broke and fighter cards shifted sideways.

**Cause:**  
Duplicate CSS blocks and negative hero margins created layout overflow.

**Fix:**  
Removed duplicate hero wrapper in `index.html` and cleaned conflicting layout CSS.

**Why this fix:**  
The HTML had nested duplicate hero sections, causing large parts of the page to be wrapped incorrectly.

**Lesson:**  
When layout looks impossible to fix with CSS, inspect HTML structure for missing or duplicated tags.

---

## 5. Compare and Fighters Navbar Links Went to Similar Area

**Bug:**  
Navbar Compare and Fighters links appeared to scroll to the same section.

**Cause:**  
The Compare link pointed to `#comparison-results`, which is empty before a comparison is generated.

**Fix:**  
Changed Compare link to `#compare-section` and added that ID to the Command Center.

**Why this fix:**  
Navigation links should target stable visible sections.

**Lesson:**  
Do not anchor navigation to dynamic containers that may be empty.

---

## 6. Back-to-Top Button Visible at Top

**Bug:**  
Back-to-top button appeared even when the user was already at the top of the page.

**Cause:**  
Button was always visible by default.

**Fix:**  
Added scroll detection and only showed the button after the user scrolled down.

**Why this fix:**  
A back-to-top button is only useful after scrolling.

**Lesson:**  
Floating UI should appear only when contextually useful.

---

## 7. Mobile Search Bar Overflow Bug

**Bug:**  
The search bar extended outside the Command Center container on mobile devices.

**Cause:**  
A global CSS rule forced the search input to maintain `min-width: 300px`, which prevented it from shrinking properly on smaller screens.

**Fix:**  
Added a mobile-specific override:

**Why this fix:**  
`min-width: 0` releases the forced width constraint, allowing the search bar to scale correctly inside the mobile container.

**Lesson:**  
Global minimum widths can silently break responsive layouts. Mobile-specific overrides are often necessary for proper scaling.
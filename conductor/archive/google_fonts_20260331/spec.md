# Specification: Google Font Pairs Integration

## Overview
This track implements the ability for users to select from 10 professional Google Font combinations (as defined in `fontpairs.md`) to enhance the visual appeal of their business cards. Selected fonts will be fetched dynamically from the Google Fonts CDN, applied in real-time to the preview card, and persisted in Local Storage.

## Scope
- **Font Selection UI:** A new dropdown menu in the editor allowing users to choose one of the 10 pre-defined font pairs.
- **Dynamic Font Loading:** A utility to generate and inject `<link>` tags for the selected Google Fonts into the document head.
- **Live Preview:** Real-time application of the selected font pair to the Name, Title, and Contact Information on the business card.
- **State Persistence:** Integration with the existing `localStorage` system to save and restore the user's font pair preference.

## Functional Requirements
- **Font Dropdown:** Add a `<select>` element to the `editor` section containing labels for the 10 font pairs (e.g., "Montserrat + Merriweather").
- **Font Injection Logic:**
  - Map each selection to its corresponding Google Fonts URL.
  - Dynamically create and append/replace `<link rel="stylesheet">` tags in the `<head>`.
  - Handle font family application via inline styles or dynamic CSS classes.
- **Hierarchical Application:**
  - Apply the **Heading** font to Name and Title elements.
  - Apply the **Body** font to Email, Phone, and Website elements.
- **Integration with Layout Engine:** Ensure the auto-scaling layout engine correctly recalculates font sizes after new fonts are loaded and applied.
- **Session Persistence:** Update the `saveToLocalStorage` and `loadFromLocalStorage` functions to include the `fontPairId`.

## Non-Functional Requirements
- **Performance:** Avoid cumulative layout shift (CLS) by applying fonts efficiently.
- **Robustness:** Fallback to system fonts if the CDN is unreachable or the font fails to load.

## Acceptance Criteria
- User can select a font pair from the dropdown and see the card preview update instantly.
- The correct heading and body fonts are applied to their respective elements.
- After a page refresh, the previously selected font pair is automatically reloaded and applied.
- The sophisticated layout engine still prevents overlaps regardless of the chosen font's dimensions.

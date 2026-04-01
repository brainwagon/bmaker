# Specification: Optional Company Name

## Overview
This track introduces the ability for users to specify an optional company name. This name will be displayed on the business card, providing more context about the professional's affiliation.

## Functional Requirements
- **Editor Input:** Add a "Company Name" text input field (`#input-company`) within the "Contact Information" section of the editor.
- **Card Display:** Display the company name on the business card in a new element (`#card-company-display`), positioned directly below the user's name.
- **Optionality:** If the input is empty, the company name element should be hidden or removed from the card layout to avoid unnecessary gaps.
- **Styling:** The company name should use a smaller font size than the primary name to maintain visual hierarchy.
- **Layout Integration:** The company name must be integrated into the existing Layout Engine. It should be subject to the same iterative scaling logic as the Name and Title to prevent collisions with Logo/QR elements and ensure vertical fit.
- **Persistence:** Ensure the company name is included in the application's state serialization, saving to and loading from `localStorage`.

## Non-Functional Requirements
- **Real-time Feedback:** Updates to the company name in the editor should be reflected on the card preview immediately.
- **Consistency:** The company name should follow the selected template's general aesthetic and font pairs.

## Acceptance Criteria
- [ ] A "Company Name" input field exists in the "Contact Information" section of the editor.
- [ ] Entering a company name displays it correctly below the name on the business card.
- [ ] The company name scales down dynamically alongside the name and title when content is long.
- [ ] The company name is correctly saved to and restored from `localStorage`.
- [ ] Leaving the company name blank results in no extra space being taken up on the card.

## Out of Scope
- Support for company logos (already handled by the general logo upload).
- Multiple company affiliations.

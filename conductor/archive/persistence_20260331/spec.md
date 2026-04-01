# Specification: Local Storage Persistence

## Overview
This track covers the implementation of local storage persistence for the Business Card Generator. The goal is to provide a seamless user experience by saving the current state of the application to the browser's local storage so that it's restored upon revisiting the page.

## Scope
- **Data Persistence:**
  - All text fields (Name, Title, Email, Phone, Website).
  - Selected template and orientation.
  - QR code toggle state.
  - Uploaded logo (encoded as base64).
- **Triggers:** Real-time (debounced) saving of data as the user interacts with the editor.
- **Loading Logic:** Automatic restoration of the last saved state upon page initialization.

## Functional Requirements
- **Save State:** A robust mechanism to serialize the current editor state (including text, UI settings, and branding) and store it in a single `localStorage` key.
- **Debounce Mechanism:** Implementation of a debounced save function (e.g., 500ms) to avoid performance issues during rapid text input.
- **Load State:** logic to deserialize and apply the stored state back into the HTML inputs and the preview card.
- **Branding Persistence:** Specific handling for the base64-encoded logo image to ensure it's stored and retrieved correctly.

## Non-Functional Requirements
- **Performance:** Debounced saving must not interfere with the smoothness of the live preview.
- **Privacy:** All data is stored purely on the client's device.
- **Robustness:** Graceful handling of missing or corrupted storage data.

## Acceptance Criteria
- User can enter their information, change templates, and upload a logo.
- After a refresh or closing the browser, all data and UI settings are automatically restored.
- The real-time preview matches the restored data immediately on page load.
- No perceptible lag during text input while data is being saved.

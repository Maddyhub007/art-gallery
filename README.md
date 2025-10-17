Artworks Table React App

This project is a React + TypeScript application that displays artworks from the Art Institute of Chicago API
. It demonstrates server-side pagination, custom row selection, and dynamic row selection via user input using PrimeReact components.

Features

Fetches artworks page by page using server-side pagination.

Displays 5 artworks per page.

Row selection using checkboxes, with persistent selection across pages.

Select All / Deselect All on the current page.

Custom selection panel displaying selected rows.

Remove rows from selection panel.

Custom input to select the first N rows on the current page.

Submit button to process selected rows.

PrimeReact ProgressSpinner while loading API data.

Clean and professional UI without overlays or flickers.

Tech Stack

React 18 (with Vite)

TypeScript

PrimeReact (Checkbox, Paginator, ProgressSpinner)

CSS Modules / Custom CSS

Art Institute of Chicago API

Installation

Clone the repository:

git clone <your-repo-url>
cd <repo-folder>


Install dependencies:

npm install


Run the app:

npm run dev


The app should now be running at http://localhost:5173 (Vite default).

Usage

Navigate pages using the paginator at the bottom.

Select individual rows using checkboxes.

Select all rows on current page with the header checkbox.

Custom selection input:

Enter a number in the input field.

Click Submit to select the first N rows on the current page.

Remove rows from the custom selection panel if needed.

Click Submit All Selected to process all selected rows (currently shows an alert, replace with API call as needed).

Project Structure
src/
│
├─ components/
│   ├─ ArtworksTable.tsx   # Main component with table and selection panel
│   └─ ArtworksTable.css   # Custom CSS for table and selection panel
│
├─ App.tsx                 # App entry component
├─ main.tsx                # Vite entry
└─ ...

Notes

This project uses server-side pagination, meaning every page change triggers an API call.

Row selection persists across pages without storing all page data locally, avoiding memory issues.

PrimeReact components are used for UI elements, ensuring responsiveness and a professional look.

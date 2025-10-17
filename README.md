Artworks Table Assignment

This React + TypeScript project displays artworks from the Art Institute of Chicago API. It includes server-side pagination, custom row selection, and a custom input to select rows as per assignment requirements.

Features

Fetches 5 artworks per page from API.

Server-side pagination: every page change fetches data from the API.

Select/deselect rows with checkboxes.

Select all rows on current page.

Custom selection panel showing selected rows.

Remove rows from selection panel.

Custom input: user types a number, clicks submit, and the first N rows on the page get selected.

Submit button to process all selected rows.

Shows loading spinner when fetching data.

Selection persists across pages.

Tech Stack

React + TypeScript

PrimeReact (Checkbox, Paginator, ProgressSpinner)

Vite (for project setup)

Art Institute of Chicago API

How to Run

Clone the project:

git clone <repo-url>
cd <project-folder>


Install dependencies:

npm install


Start the app:

npm run dev


Open http://localhost:5173 in your browser.

How to Use

Navigate pages using the paginator.

Select rows with checkboxes or select all on the page.

Use the input field to type a number and click Submit to select first N rows.

Remove rows from the panel if needed.

Click Submit All Selected to process the selected artworks.

Notes

Every page fetches fresh data from the API to avoid memory issues.

Selection panel persists selections even when switching pages.

No gray overlay appears when selecting rows for a professional UI.

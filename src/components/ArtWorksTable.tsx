import React, { useEffect, useState } from "react";
import { Checkbox } from "primereact/checkbox";
import { Paginator } from "primereact/paginator";
import type { PaginatorPageChangeEvent } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../ArtworksTable.css"
    import type { Artwork } from "../type";


const rowsPerPage = 5; 

const ArtworksTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectionMap, setSelectionMap] = useState<Record<number, Artwork>>({});
  const [rowsToSelect, setRowsToSelect] = useState<number>(0); // number input for selecting rows

  // Fetch API data for current page
  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.artic.edu/api/v1/artworks?page=${pageNumber + 1}`
      );
      const data = await res.json();
      setArtworks(data.data);
      setTotalRecords(data.pagination.total || 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Page change handler
  const onPageChange = (e: PaginatorPageChangeEvent) => setPage(e.page);

  // Check if artwork is selected globally
  const isSelected = (art: Artwork) => !!selectionMap[art.id];

  // Toggle row selection
  const toggleRow = (art: Artwork) => {
    setSelectionMap((prev) => {
      const updated = { ...prev };
      if (updated[art.id]) delete updated[art.id];
      else updated[art.id] = art;
      return updated;
    });
  };

  // Select / deselect all rows on page
  const toggleSelectAll = (checked: boolean) => {
    setSelectionMap((prev) => {
      const updated = { ...prev };
      artworks.forEach((art) => {
        if (checked) updated[art.id] = art;
        else delete updated[art.id];
      });
      return updated;
    });
  };

  const allSelectedOnPage = artworks.length > 0 && artworks.every(isSelected);

  // Remove artwork from custom panel
  const removeFromSelection = (id: number) => {
    setSelectionMap((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  // Select first N rows on current page based on input
  const handleSelectRows = () => {
    const n = Math.min(rowsToSelect, artworks.length); // limit to available rows
    setSelectionMap((prev) => {
      const updated = { ...prev };
      for (let i = 0; i < n; i++) {
        updated[artworks[i].id] = artworks[i];
      }
      return updated;
    });
  };



  const selectedRows = Object.values(selectionMap);

  return (
    <div className="artworks-container" style={{ display: "flex", gap: "20px" }}>
      {/* Table Section */}
      <div style={{ flex: 3 }}>
        <div className="table-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>
                  <Checkbox
                    checked={allSelectedOnPage}
                    onChange={(e) => toggleSelectAll(!!e.checked)}
                  />
                </th>
                <th>Title</th>
                <th>Origin</th>
                <th>Artist</th>
                <th>Inscriptions</th>
                <th>Start</th>
                <th>End</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="loading-cell">
                    <ProgressSpinner style={{ width: "40px", height: "40px" }} strokeWidth="5" />
                  </td>
                </tr>
              ) : (
                artworks.map((art) => (
                  <tr key={art.id} className={isSelected(art) ? "selected" : ""}>
                    <td>
                      <Checkbox
                        checked={isSelected(art)}
                        onChange={() => toggleRow(art)}
                      />
                    </td>
                    <td>{art.title}</td>
                    <td>{art.place_of_origin}</td>
                    <td>{art.artist_display}</td>
                    <td>{art.inscriptions}</td>
                    <td>{art.date_start}</td>
                    <td>{art.date_end}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <Paginator
            first={page * rowsPerPage}
            rows={rowsPerPage}
            totalRecords={totalRecords}
            onPageChange={onPageChange}
            className="custom-paginator"
          />
        </div>
      </div>

      {/* Custom Selection Panel */}
      <div
        style={{
          flex: 1,
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "10px",
        }}
      >
        <h4>Selected Artworks ({selectedRows.length})</h4>
        {selectedRows.length === 0 ? (
          <p>No rows selected</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            {selectedRows.map((art) => (
              <li
                key={art.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "4px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span>{art.title}</span>
                <button
                  onClick={() => removeFromSelection(art.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                    padding: "2px 6px",
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* Custom input for selecting rows */}
        <div style={{ marginTop: "10px" }}>
          <label>
            Select first{" "}
            <input
              type="number"
              value={rowsToSelect}
              onChange={(e) => setRowsToSelect(Number(e.target.value))}
              style={{ width: "60px", margin: "0 5px" }}
              min={1}
              max={artworks.length}
            />{" "}
            rows
          </label>
          <button
            onClick={handleSelectRows}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit
          </button>
        </div>

      
      </div>
    </div>
  );
};

export default ArtworksTable;

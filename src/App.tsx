import React, { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import ArtworksTable from './components/ArtWorksTable'


export default function App() {
return (
<div className="app-container">
<div className="header">
<h1>Artworks Explorer — PrimeReact DataTable</h1>
<div>Data from Art Institute of Chicago API</div>
</div>


<div className="card">
<ArtworksTable />
</div>
</div>
)
}
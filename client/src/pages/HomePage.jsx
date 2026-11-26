import { useCallback, useEffect, useState } from 'react'
import API_BASE_URL from '../api'
import BookGrid from '../components/BookGrid'
import SearchBar from '../components/SearchBar'

function HomePage() {
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  const handleSearch = useCallback((value) => {
    setSearch(value)
  }, [])

  useEffect(() => {
    fetch(`${API_BASE_URL}/genres`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load genres')
        return response.json()
      })
      .then(setGenres)
      .catch(() => setError('Unable to load genres.'))
  }, [])

  return (
    <main>
      <h2>Our Library</h2>
      <p>Discover and explore our collection of books.</p>

      <div className="library-filters">
        <SearchBar onSearch={handleSearch} />

        <select
          value={selectedGenre}
          onChange={(event) => setSelectedGenre(event.target.value)}
          aria-label="Filter books by genre"
        >
          <option value="">All genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>

      {error && <p role="alert">{error}</p>}

      <BookGrid genreId={selectedGenre} search={search} />
    </main>
  )
}

export default HomePage
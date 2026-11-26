import { useCallback, useEffect, useState } from 'react'
import API_BASE_URL from '../api'
import BookGrid from '../components/BookGrid'
import SearchBar from '../components/SearchBar'

function HomePage() {
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    const params = new URLSearchParams()

    if (selectedGenre) params.set('genreId', selectedGenre)
    if (search) params.set('search', search)

    setLoading(true)
    setError('')

    fetch(`${API_BASE_URL}/books?${params.toString()}`)
      .then((response) => {
        if (!response.ok) throw new Error('Could not load books')
        return response.json()
      })
      .then((result) => {
        setBooks(result.data || [])
      })
      .catch(() => setError('Unable to load books. Please try again.'))
      .finally(() => setLoading(false))
  }, [selectedGenre, search])

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

      {loading && <p>Loading books...</p>}
      {error && <p role="alert">{error}</p>}
      {!loading && !error && <BookGrid books={books} />}
    </main>
  )
}

export default HomePage
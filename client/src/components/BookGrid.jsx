import { useEffect, useState } from 'react'
import API_BASE_URL from '../api'
import BookCard from './BookCard'

function BookGrid({ genreId, search }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams()

    if (genreId) params.set('genreId', genreId)
    if (search) params.set('search', search)

    setLoading(true)
    setError('')

    fetch(`${API_BASE_URL}/books?${params.toString()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not load books')
        }
        return response.json()
      })
      .then((result) => {
        setBooks(result.data || [])
      })
      .catch(() => {
        setError('Unable to load books. Please try again.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [genreId, search])

  if (loading) return <p>Loading books...</p>

  if (error) return <p role="alert">{error}</p>

  if (books.length === 0) return <p>No books found.</p>

  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  )
}

export default BookGrid
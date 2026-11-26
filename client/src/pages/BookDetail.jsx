import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import API_BASE_URL from '../api'

function BookDetail() {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`${API_BASE_URL}/books/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Book not found')
        }
        return response.json()
      })
      .then((result) => {
        setBook(result)
      })
      .catch(() => {
        setError('Unable to load this book.')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [id])

  if (loading) return <main><p>Loading book details...</p></main>
  if (error) return <main><p role="alert">{error}</p><Link to="/">Back to library</Link></main>

  return (
    <main className="book-detail">
      <Link to="/">← Back to library</Link>

      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>ISBN:</strong> {book.isbn}</p>
      <p><strong>Genre:</strong> {book.genre?.name || 'Uncategorized'}</p>
      <p><strong>Total copies:</strong> {book.totalCopies}</p>
      <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
    </main>
  )
}

export default BookDetail
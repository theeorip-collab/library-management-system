import { Link } from 'react-router-dom'

function BookCard({ book }) {
  return (
    <article className="book-card">
      <h3>
        <Link to={`/books/${book.id}`}>
          {book.title}
        </Link>
      </h3>

      <p>Author: {book.author}</p>
      <p>Genre: {book.genre?.name || 'Uncategorized'}</p>
    </article>
  )
}

export default BookCard
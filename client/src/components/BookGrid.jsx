
import BookCard from './BookCard'

function BookGrid({ books }) {
  if (!books || books.length === 0) {
    return <p>No books found.</p>
  }

  return (
    <section className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </section>
  )
}

export default BookGrid

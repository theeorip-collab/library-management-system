
import { useEffect, useState } from 'react'

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchTerm)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchTerm, onSearch])

  return (
    <input
      type="search"
      placeholder="Search by book title or author..."
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      aria-label="Search books by title or author"
    />
  )
}

export default SearchBar

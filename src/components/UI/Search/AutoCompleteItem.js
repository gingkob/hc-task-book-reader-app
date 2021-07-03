import React from 'react'
import { Link } from 'react-router-dom'

function AutoCompleteItem({ book }) {
  return (
    <Link className="auto-complete-link" to={`book${book.key}`}>
      <h4>{book.title}</h4>
      {book.authorName}&nbsp;{book.year}
    </Link>
  )
}

export default AutoCompleteItem

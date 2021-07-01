import React from 'react'
import AutoCompleteItem from './AutoCompleteItem'
import './Search.css'

function AutoCompleteBox({ books }) {

  return (
    <div className="auto-complete-box">
      {books.map(book => <AutoCompleteItem key={book.key} book={book} />)}
    </div>
  )
}

export default AutoCompleteBox

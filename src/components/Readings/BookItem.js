import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CommentsList } from '../Comment'
import './Readings.css'

function BookItem({ book, onFinished }) {
  const [showComments, setShowComments] = useState(false)

  const handleClick = () => {
    setShowComments((prevState) => !prevState)
  }

  return (
    <div className="book-container">
      <div className="book-item-container">
        <div className="book-item__info">
          <h3>{book.title}</h3>
          <p>{book.authorName}</p>
        </div>
        <div className="book-item__finished">
          <button onClick={() => onFinished(book._id)}>Finish</button>
        </div>
        <div className="book-item__add-comment">
          <Link to={`add-comment/${book._id}`}>
            <button>Add Comment</button>
          </Link>
        </div>
      </div>
      {!!book.comments.length && (
        <div className="book-item__show-comment">
          <button onClick={handleClick}>
            {showComments ? 'Hide Comments' : 'Show Comments'}
          </button>{' '}
        </div>
      )}
      {showComments && <CommentsList comments={book.comments} />}
    </div>
  )
}

export default BookItem

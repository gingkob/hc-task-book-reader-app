import React, { useRef } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { IoChevronBackCircle } from 'react-icons/io5'
import Store from '../../store/Store'
import './NewComment.css'

function CommentComponent() {
  const textArea = useRef(null)
  const { bookId } = useParams()
  let book = Store.getBook(bookId)
  let history = useHistory()

  const handleClick = () => {
    const comment = textArea.current.value
    Store.saveComment(bookId, comment)
    textArea.current.value = ''
    history.replace('/my-readings')
  }

  const handleClickBack = () => {
    history.goBack()
  }

  return (
    <div className="new-comment-container">
      <div className="new-comment__heading">
        <h1>{book.title}</h1>
        <p>{book.authorName}</p>
      </div>
      <textarea
        className="new-comment__textarea"
        ref={textArea}
        rows={8}
        cols={50}
        spellcheck="false"
      />
      <div className="new-comment__btn-container">
        <button
          type="button"
          className="new-comment__btn"
          onClick={handleClick}
        >
          Save Comment
        </button>
        <button
          type="button"
          className="new-comment__btn"
          onClick={handleClickBack}
        >
          <IoChevronBackCircle className="new-comment__btn--icon" />
          <span>Back</span>
        </button>
      </div>
    </div>
  )
}

export default CommentComponent

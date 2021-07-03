import React from 'react'

function CommentItem({ comment }) {
  return (
    <div className="comment-list__item">
      <p>{comment.text}</p>
      <p>{comment.date}</p>
    </div>
  )
}

export default CommentItem

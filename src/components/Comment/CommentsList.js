import React from 'react'
import { observer } from 'mobx-react'
import CommentItem from './CommentItem'

const CommentsList = observer(({ comments }) => {
  return (
    <div className="comment-list__container">
      {comments.map((comment) => (
        <CommentItem key={comment._id} comment={comment} />
      ))}
    </div>
  )
})

export default CommentsList

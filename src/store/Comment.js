import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'

class Comment {
  _id
  bookId // id in our system
  text
  date

  constructor(bookId, text) {
    makeAutoObservable(this)
    this.bookId = bookId
    this.text = text
    this._id = uuid()
    this.date = new Date().toLocaleDateString()
  }
}

export default Comment

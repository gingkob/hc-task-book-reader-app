import { makeAutoObservable } from 'mobx'
import { v4 as uuid } from 'uuid'
import Comment from './Comment'

class Book {
  _id
  bookId // from API
  title
  authorId // from API
  authorName
  coverURLs
  comments = []
  finished = false
  excerpts
  links
  subjectPeople
  subjectPlaces
  subjects
  authors

  constructor(
    bookId,
    title,
    authorId,
    authorName,
    description,
    coverURLs,
    excerpts,
    links,
    subjectPeople,
    subjectPlaces,
    subjects,
    authors
  ) {
    makeAutoObservable(this)
    this._id = uuid()
    this.bookId = bookId
    this.title = title
    this.authorId = authorId
    this.description = description
    this.coverURLs = coverURLs
    this.excerpts = excerpts
    this.links = links
    this.subjectPeople = subjectPeople
    this.subjectPlaces = subjectPlaces
    this.subjects = subjects
    this.authors = authors
    this.authorName = authorName
  }

  addComment(text) {
    this.comments.unshift(new Comment(this._id, text))
  }

  get showComments() {
    return this.comments
  }
}

export default Book
